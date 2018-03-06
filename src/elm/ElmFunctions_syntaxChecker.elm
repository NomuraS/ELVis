port module ElmFunctions_syntaxChecker exposing (..)

import Util exposing ((?>>=))
import Html exposing (Html)
import Json.Encode as Encoder exposing (Value)
import Json.Decode as Decoder exposing (Decoder)
import Platform.Sub
import Parser_Formula as Parser
import Common_syntax as Syntax exposing (Formula(..))


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
                    resultOfCheck = Result.toMaybe decodedJSON
                                  ?>>= (\x-> case Parser.parseFormula x.formula of
                                                     Ok a  -> Just (a, x.system)
                                                     Err a -> Nothing)
                                  ?>>= (\(fr,sys) -> 
                                            if syntaxCheck fr sys
                                            then Just (Syntax.outputForm 0 fr)
                                            else Nothing)
                                  |>   (\x-> Maybe.withDefault "parseError"  x)
                in
                   {result=resultOfCheck} ! [ output1 {result=resultOfCheck} ]
        --JsonFromJS1 json -> 
        --        let 
        --            decodedJSON  =Decoder.decodeValue decodeJSON json 
        --            decodedJSON2 = case decodedJSON of 
        --                Ok a -> a
        --                Err errorMsg-> Debug.crash ("error in update(1):" ++ errorMsg)
        --            formula = Parser.parseFormula decodedJSON2.formula
        --            stringformula = case formula of 
        --               Ok a  ->Syntax.outputForm 0 a 
        --               Err a -> "parseError"
        --            --resultOfCheck = case Debug.log "formula" formula of 
        --            --   Ok a  -> case syntaxCheck decodedJSON2.system a of
        --            --     True->Syntax.outputForm 0 a 
        --            --     False-> "parseError"
        --            --   Err a -> "parseError"  
        --            resultOfCheck = case   decodedJSON2.system of 
        --              "EL"-> if String.contains "[" stringformula then "parseError" else stringformula
        --              "PAL" -> if String.contains "[(" stringformula then "parseError" else stringformula
        --              "DEL" ->  stringformula
        --              _-> "parseError"
        --        in
        --           {result=resultOfCheck} ! [ output1 {result=resultOfCheck} ]




syntaxCheck : Formula -> String -> Bool
syntaxCheck fr st = 
  case st of 
  "EL" -> (checkPAL fr) && (checkDEL fr)
  "PAL" -> checkPAL fr
  "DEL" -> checkDEL fr
  _ -> False


checkPAL: Formula ->Bool
checkPAL fr = case fr of 
         Top -> True 
         Bot -> True 
         Atom st  -> True 
         AnyFormula st -> True 
         Not f1 -> checkPAL f1
         And f1  f2 -> checkPAL f1 && checkPAL f2
         Or f1  f2 -> checkPAL f1 && checkPAL f2
         Imply f1  f2 -> checkPAL f1 && checkPAL f2
         Imply2 f1 f2 -> checkPAL f1 && checkPAL f2
         Iff f1  f2 -> checkPAL f1 && checkPAL f2
         Dia ag f1 -> checkPAL f1 
         Box ag f1 -> checkPAL f1
         Announce f1 f2  -> checkPAL f1 && checkPAL f2
         Announce2 f1 f2  -> checkPAL f1 && checkPAL f2
         Bigwedge sts a f1  -> False
         Bigvee   sts a f1 -> False
         BoxAction ac f1 -> False
         DiaAction ac f1 -> False
         Precon am st     -> False

checkDEL: Formula ->Bool
checkDEL fr = case fr of 
         Top -> True 
         Bot -> True 
         Atom st  -> True 
         AnyFormula st -> True 
         Not f1 -> checkDEL f1
         And f1  f2 -> checkDEL f1 && checkDEL f2
         Or f1  f2 -> checkDEL f1 && checkDEL f2
         Imply f1  f2 -> checkDEL f1 && checkDEL f2
         Imply2 f1 f2 -> checkDEL f1 && checkDEL f2
         Iff f1  f2 -> checkDEL f1 && checkDEL f2
         Dia ag f1 -> checkDEL f1 
         Box ag f1 -> checkDEL f1
         Announce f1 f2  ->False 
         Announce2 f1 f2  ->False 
         Bigwedge sts a f1  -> checkDEL f1
         Bigvee   sts a f1 ->  checkDEL f1
         BoxAction ac f1 ->  checkDEL f1
         DiaAction ac f1 ->  checkDEL f1
         Precon am st     -> True



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