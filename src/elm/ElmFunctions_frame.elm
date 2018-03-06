port module ElmFunctions_frame exposing (..)

--import Util
import AgentAtom exposing (Agent,State)
import Html exposing (Html)
import Json.Encode as Encoder exposing (Value)
import Json.Decode as Decoder exposing (Decoder)
import Platform.Sub
import Common_syntax as Common exposing (Formula(..),AMRelation,AModel)
import FrameProperties as FP


plusDefinedInElm : Int->  Int->  Int
plusDefinedInElm x y = x + y 

timesDefinedInElm : Int->  Int->  Int
timesDefinedInElm x y = x * y


type alias RelationJSON =
    { agent : String
    , from : String
    , to : String
    }

type alias JSON =
   {  frame : List RelationJSON,
     property : String,
     agents : List String,
     domain : List String
   }

port input1 :(Value -> msg) -> Sub msg
port input2 :(Value -> msg) -> Sub msg

port output1 :Model -> Cmd msg
port output2 :Model -> Cmd msg

-- data from js (input)
decodeJSON : Decoder JSON
decodeJSON =
    Decoder.map4 JSON
        (Decoder.field "frame" (Decoder.list decodeJSON4relation))
        (Decoder.field "property" Decoder.string)
        (Decoder.field "agents" (Decoder.list Decoder.string))
        (Decoder.field "domain" (Decoder.list Decoder.string))

decodeJSON4relation : Decoder RelationJSON 
decodeJSON4relation =
    Decoder.map3 RelationJSON 
        (Decoder.field "agent" Decoder.string)
        (Decoder.field "from" Decoder.string)
        (Decoder.field "to" Decoder.string)


-- MODEL (output)
type alias Model =
    { resultProperty : List RelationJSON
    , checkRef : Bool
    , checkSym : Bool
    , checkTra : Bool
    , checkEuc : Bool
    , checkSer : Bool
    }

-- initmodel
initModel : ( Model, Cmd Msg )
initModel = ( { resultProperty= [{agent="",from="",to=""}]
               , checkRef =False
               , checkSym =False
               , checkTra =False
               , checkEuc =False
               , checkSer =False
                }
            , Cmd.none
            )

relationJSON2amrelation: List RelationJSON -> AMRelation
relationJSON2amrelation r =  
  let 
   ff : RelationJSON->(Agent,State,State)
   ff r = (r.agent,r.from,r.to)
  in
  List.map ff r

amrelation2relationJSON: AMRelation-> List RelationJSON 
amrelation2relationJSON r =  
  let 
   ff : (Agent,State,State)->RelationJSON
   ff (a,e1,e2) = {agent=a,from=e1,to=e2}
  in
  List.map ff r

-- UPDATE
type Msg =    MakeItProperty Value
            | CheckProperty Value

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = case msg of
        MakeItProperty json -> 
                let 
                    decodedJSON  =Decoder.decodeValue decodeJSON json 
                    decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update(1):" ++ errorMsg)
                    amRelation = relationJSON2amrelation decodedJSON2.frame
                    agents = decodedJSON2.agents
                    domain = decodedJSON2.domain
                    sendingFrame  = case decodedJSON2.property of 
                      "T" -> FP.makeItReflexive agents domain
                      "B" -> FP.makeItSymmetric amRelation 
                      "4" -> FP.makeItTransitive amRelation 
                      "5" -> FP.makeItEucleadian amRelation 
                      _ -> []
                      
                    newModel=  { resultProperty = (amrelation2relationJSON sendingFrame)
                                , checkRef =False
                                , checkSym =False
                                , checkTra =False
                                , checkEuc =False
                                , checkSer =False
                                }
                in 
                    newModel ! [ output1 newModel ]

        CheckProperty json -> 
                let 
                    decodedJSON  =Decoder.decodeValue decodeJSON json 
                    decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update (2):" ++ errorMsg)
                    amRelation = relationJSON2amrelation decodedJSON2.frame
                    agents = decodedJSON2.agents
                    domain = decodedJSON2.domain
                    newModel=  { resultProperty = []
                                , checkRef =FP.isReflexive  agents domain amRelation
                                , checkSym =FP.isSymmetric amRelation
                                , checkTra = FP.isTransitive amRelation 
                                , checkEuc =FP.isEucleadian amRelation 
                                , checkSer =FP.isSerial  agents domain amRelation 
                                }
                in 
                    newModel ! [ output2 newModel ]
-- VIEW
view : Model -> Html Msg
view model = Html.div [] [ ]

-- SUBSCRIPTIONS
subscriptions model = Platform.Sub.batch
                    [ input1 MakeItProperty 
                    , input2 CheckProperty 
                    ]
-- main
main = Html.program
        { init = initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }