port module ElmFunctions_reduction exposing (..)

import String
import Html exposing (Html)
import Json.Encode as Encoder exposing (Value)
import Json.Decode as Decoder exposing (Decoder)
import Platform.Sub
import Parser_Formula as Parser
import Common_syntax as Syntax


type alias JSON =
   {  system :String,
      formula : String
   }

port input1 :(Value -> msg) -> Sub msg
port input2 :(Value -> msg) -> Sub msg

port output1 :Model -> Cmd msg

-- data from js (input)
decodeJSON : Decoder JSON
decodeJSON =
    Decoder.map2 JSON
        (Decoder.field "system" Decoder.string)
        (Decoder.field "formula" Decoder.string)

-- MODEL (output)
type alias Model =
    { result : String
    }

-- initmodel
initModel : ( Model, Cmd Msg )
initModel = ( Model "" 
            , Cmd.none
            )

-- UPDATE
type Msg =    JsonFromJS1 Value

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = case msg of
        JsonFromJS1 json -> 
                let 
                    decodedJSON  =Decoder.decodeValue decodeJSON json 
                    decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update(1):" ++ errorMsg)
                    resultOfCheck2 =   decodedJSON2
                    aaa=Debug.log "log: ElmFunctions_syntaxChecker.elm(0)" (Parser.parseFormula decodedJSON2.formula)
                    formula = case Parser.parseFormula decodedJSON2.formula of 
                     --Just a  ->Syntax.outputForm 0 a
                     --Nothing -> "parseError"
                       Ok a  ->Syntax.outputForm 0 a
                       Err a -> "parseError"
                    resultOfCheck = case  decodedJSON2.system of 
                      "EL"-> if String.contains "[" formula then "parseError" else formula
                      "PAL" -> if String.contains "[(" formula then "parseError" else formula
                      "DEL" ->  formula
                      _-> "parseError"
                in
                   {result=resultOfCheck} ! [ output1 {result=resultOfCheck} ]


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