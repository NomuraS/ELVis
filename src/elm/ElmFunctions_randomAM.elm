port module ElmFunctions_randomAM exposing (..)

import Html exposing (Html)
import Json.Encode as Encoder exposing (Value)
import Json.Decode as Decoder exposing (Decoder)
import Platform.Sub
import Random_model as Ra
import Util 
import Random exposing ( Seed,Generator)
import Common_syntax as Syntax 
import AgentAtom exposing (State)

type alias JSON =
   {  numOfAgt : Int,
      numOfAct : Int,
      randomSeed : Int
   }

type alias Relation =
            { agent:String,
              from:String,
              to:String
            }

type alias Precondition =
            { from:String,
              to:String
            }

type alias Valuation =
            { prop:String,
              worlds:List String
            }

port input1 :(Value -> msg) -> Sub msg
port input2 :(Value -> msg) -> Sub msg
port output1 :Model -> Cmd msg
port output2 :Model -> Cmd msg

-- data from js (input)
decodeJSON : Decoder JSON
decodeJSON =
    Decoder.map3 JSON
        (Decoder.field "numOfAgt" Decoder.int)
        (Decoder.field "numOfAct" Decoder.int)
        (Decoder.field "randomSeed" Decoder.int)

-- MODEL (output)
type alias Model =
    { name : String
    , domain : List State
    , relation : List Relation
    , precondition : List Precondition --List (String, String) -- (State, Formula)
    , valuation : List Valuation
    }


-- initmodel
initModel : ( Model, Cmd Msg ) 
initModel = ( Model "" [] [] [] []
            , Cmd.none
            )

-- UPDATE
type Msg =    JsonFromJS1 Value
            | JsonFromJS2 Value

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = case msg of
        JsonFromJS1 json -> 
                let 
                    decodedJSON  =Decoder.decodeValue decodeJSON json 
                    decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update(1):" ++ errorMsg)
                    randomModel =Util.fst <| Ra.createRandomAModel 
                                        decodedJSON2.numOfAgt 
                                        decodedJSON2.numOfAct 
                                        1
                                        (Random.initialSeed decodedJSON2.randomSeed)  
                    relationC = 
                      let 
                        ff :(String,String,String)->Relation
                        ff x = {
                                agent=Util.fst3 x,
                                from=Util.snd3 x,
                                to=Util.thd3 x
                              }
                      in   List.map ff randomModel.am_relation
                    preconC = 
                        let 
                         ff : (String, Syntax.Formula) -> Precondition
                         ff x = {from= Util.fst x,
                                 to= Syntax.outputForm 0 (Util.snd x)
                                } 
                        in   List.map ff randomModel.am_pre
                    newModel = { name =  randomModel.am_name,
                                 domain = randomModel.am_domain,
                                 relation = relationC,
                                 precondition = preconC,
                                 valuation = []
                                }
                in 
                    newModel ! [ output1 newModel ]

        JsonFromJS2 json -> 
                let 
                    decodedJSON  =Decoder.decodeValue decodeJSON json 
                    decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update(2):" ++ errorMsg)
                    randomModel =Util.fst <| Ra.createRandomKModel 
                                        decodedJSON2.numOfAgt 
                                        decodedJSON2.numOfAct 
                                        1
                                        (Random.initialSeed decodedJSON2.randomSeed)  
                    relationC = 
                      let 
                        ff :(String,String,String)->Relation
                        ff x = {
                                agent=Util.fst3 x,
                                from=Util.snd3 x,
                                to=Util.thd3 x
                              }
                      in   List.map ff randomModel.em_relation
                    val = 
                      let
                        ff x = {
                                  prop= Util.fst x,
                                  worlds= Util.snd x 
                               }
                      in List.map ff randomModel.em_value
                    newModel = { name =  randomModel.em_name,
                                 domain = randomModel.em_domain,
                                 relation = relationC,
                                 precondition = [],
                                 valuation = val 
                                }
                in 
                    newModel ! [ output2 newModel ]
-- VIEW
view : Model -> Html Msg
view model = Html.div [] [ ]

-- SUBSCRIPTIONS
subscriptions model = Platform.Sub.batch
                    [ input1 JsonFromJS1,
                     input2 JsonFromJS2
                    ]
-- main
main = Html.program
        { init = initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
