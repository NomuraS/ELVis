port module ElmFunctions_action exposing (..)

import AgentAtom exposing (Agent,State)
import Html exposing (Html)
import Json.Encode as Encoder exposing (Value)
import Json.Decode as Decoder exposing (Decoder)
import Platform.Sub
import Common_syntax as Common exposing (Formula(..),AModel)
import Parser_Formula as Parser

type alias JSON =
    { action1 : AModelJSON
    , action2 : AModelJSON
    }

type alias AModelJSON =
    { name : String
    , domain : List String
    , relation : List AModelJSON_rel
    , precondition : List AModelJSON_pre
    , comment : String
    }

type alias AModelJSON_rel =
  {  agent: String
    ,from: String
    ,to: String
  }

type alias AModelJSON_pre =
  {  from: String
    ,to: String
  }

decodeJSON4actionList : Decoder JSON
decodeJSON4actionList =
    Decoder.map2 JSON
        (Decoder.field "action1" decodeJSON4action)
        (Decoder.field "action2" decodeJSON4action)

decodeJSON4action : Decoder AModelJSON
decodeJSON4action =
    Decoder.map5 AModelJSON
        (Decoder.field "name" Decoder.string)
        (Decoder.field "domain" (Decoder.list Decoder.string))
        (Decoder.field "relation" (Decoder.list decodeJSON4action_rel))
        (Decoder.field "precondition" (Decoder.list decodeJSON4action_pre))
        (Decoder.field "comment" Decoder.string)

decodeJSON4action_rel : Decoder AModelJSON_rel
decodeJSON4action_rel =       
      Decoder.map3 AModelJSON_rel
        (Decoder.field "agent" Decoder.string)
        (Decoder.field "from" Decoder.string)
        (Decoder.field "to" Decoder.string)

decodeJSON4action_pre : Decoder AModelJSON_pre
decodeJSON4action_pre =       
      Decoder.map2 AModelJSON_pre
        (Decoder.field "from" Decoder.string)
        (Decoder.field "to" Decoder.string)

-------------------------------------------------------
---- functions -----------------------------------------
json2action:AModelJSON->AModel
json2action a = 
    let
        json2pair amRel = (amRel.agent,amRel.from,amRel.to)
        json2pre amRel = (amRel.from, Result.withDefault Bot (Parser.parseFormula amRel.to))
    in
     {  am_name = a.name
       ,am_domain = a.domain
       ,am_relation = List.map json2pair a.relation
       ,am_pre = List.map json2pre a.precondition
     }

action2json:AModel->AModelJSON
action2json a = 
    let
        pair2json : (Agent,State,State) -> AModelJSON_rel
        pair2json (a,s1,s2) = { agent = a,from = s1,to=s2}
        pre2json : (State, Formula)-> AModelJSON_pre
        pre2json (s,f) =  {  from=s, to=Common.outputForm 0 f }
    in
     {  name = a.am_name
       ,domain = a.am_domain
       ,relation = List.map pair2json a.am_relation
       ,precondition = List.map pre2json a.am_pre
       ,comment = ""
     }

-------------------------------------------------------
-------------------------------------------------------

port input1 :(Value -> msg) -> Sub msg
port output1 :Model -> Cmd msg

-- MODEL (output)
type alias Model = AModelJSON

-- initmodel
initModel : ( Model, Cmd Msg )
initModel = ( AModelJSON "" [] [] [] ""
            , Cmd.none
            )

-- UPDATE
type Msg = JsonFromJS1 Value

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = case msg of
        JsonFromJS1 json -> 
                let 
                    decodedJSON = Decoder.decodeValue decodeJSON4actionList json
                    decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update(1):" ++ errorMsg)
                    action1 = json2action <| decodedJSON2.action1
                    action2 = json2action <| decodedJSON2.action2
                    composedAModel = action2json <| Common.composeAM action1 action2
                    newModel = {composedAModel | comment =   "composition of "
                                                          ++ action1.am_name 
                                                          ++ " and "
                                                          ++ action2.am_name }
                in 
                    newModel ! [ output1 newModel ]
 
-- VIEW
view : Model -> Html Msg
view model = Html.div [] []


-- SUBSCRIPTIONS
subscriptions model = Platform.Sub.batch
                    [ input1 JsonFromJS1
                    ]
-- main
main = Html.program
        { init = initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

