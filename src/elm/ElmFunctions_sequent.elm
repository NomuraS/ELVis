--port module Main exposing (main)
port module ElmFunctions_sequent exposing (main)

import Util
import Applicative exposing (..)

import Html exposing (Attribute,Html)
import Json.Decode as Decoder exposing (Decoder)
import Json.Encode as Encoder exposing (Value)

import AgentAtom exposing (Agent,State)
import Common_sequent as CommonSeq exposing (..) 
import Common_syntax as Syntax exposing (Formula(..))
import Int_sequent as IntEL
import PAL_sequent as GPAL
import DEL_sequent as GDEL 
import IntPAL_sequent as IntPAL
import Int_sequent_BiRel as IntEL
import Parser_Formula as Parser exposing (AModelJSON,AModelJSON_rel,AModelJSON_pre)
import Platform.Sub
import Random exposing (Seed,Generator)
import Random_formula as RandomF


type alias JSON =
    { formula : String
    , action : List AModelJSON
    , modalSystem : String
    , elSystem : String
    , maxNumberOfExpressionsAppearingInANode : Int
    , randomSeed : RandomSeed
    }

type alias RandomSeed =
    { randomNumber : Int
    , maxLengthOfRandomFormula : Int
    , maxNumberOfAgents : Int
    , maxNumberOfActions : Int
    }

-------------------------------------------------------------------------------------------
---- inference rules
-------------------------------------------------------------------------------------------
basicRules : List Rule
basicRules = axiomRule ++ ruleClassic

basicRules_int = axiomRule ++ IntEL.ruleInt2 -- maxNum ruleSet

--------------------------------------------------------------------------------------------
-- createRandomFormula
--------------------------------------------------------------------------------------------
json2formula:JSON ->  Formula
json2formula json = 
  let 
    num4agent = json.randomSeed.maxNumberOfAgents
    num4act=json.randomSeed.maxNumberOfActions
    gg json = case json.elSystem of 
            "EL" -> RandomF.connectiveList4EL  num4agent
            "PAL"-> RandomF.connectiveList4PAL  num4agent
            --"IntPAL"-> Random.connectiveList4EL  
            "DEL" -> RandomF.connectiveList4DEL num4act num4agent
            _->  RandomF.connectiveList4EL  num4agent
  in
    Util.fst <| RandomF.createRandomFormula 
                    json.randomSeed.maxLengthOfRandomFormula 
                    (gg json)
                    (Random.initialSeed json.randomSeed.randomNumber) 

checkIncludingConnective : JSON ->  Formula -> Maybe Formula
checkIncludingConnective json f = 
  let 
    gg json = case json.elSystem of 
            "EL" -> "#"
            "PAL"-> "["
            "IntPAL"-> "<"
            "DEL" -> "["
            _->  ""
  in
            if String.contains (gg json) <| Syntax.outputForm 0  f
            then Just f
            else Nothing

retryForConnective : JSON  -> Maybe Formula -> Maybe Formula
retryForConnective json mf =  
  let
    json2 = { json | randomSeed= {  randomNumber=json.randomSeed.randomNumber+1
                                   , maxLengthOfRandomFormula=json.randomSeed.maxLengthOfRandomFormula
                                   , maxNumberOfAgents=json.randomSeed.maxNumberOfAgents
                                   , maxNumberOfActions=json.randomSeed.maxNumberOfActions
                                   }
                                 }
  in
   case mf of 
    Just a -> Just a 
    Nothing ->   createRandomFormulaFromJSON json2
                            
createRandomFormulaFromJSON : JSON  -> Maybe Formula
createRandomFormulaFromJSON  json = 
           json2formula json
        |> checkIncludingConnective json 
        |> retryForConnective json


proofSystemfromJSON : JSON -> List Rule
proofSystemfromJSON json =  
          let 
            maxNum = json.maxNumberOfExpressionsAppearingInANode
            --proofSystem = modal_system json ++ proofSystemfromJSON json ---- loopp
          in 
            case json.elSystem of  --(Debug.log "Provable_formula" )
                "EL" -> basicRules++ ruleK
                "PAL"-> basicRules++ ruleK++GPAL.ruleGPAL
                "IntPAL"-> basicRules_int--  ++ IntEL.ruleK_int ++IntPAL.ruleGIntPAL 
                "DEL"-> basicRules++ ruleK++GDEL.ruleK_DEL++GDEL.ruleDEL
                _->     basicRules++ ruleK

modal_system : JSON -> List Rule
modal_system json = 
  let 
     modalSystemString  = String.toList <| json.modalSystem
     modal_system x = case x  of 
        'T' -> ruleT
        'D' -> ruleD
        'B' -> ruleB
        '4' -> rule4
        '5' -> rule5
        _->[]
  in
   Util.nub <| List.concatMap modal_system modalSystemString

createRandomFormulaFromJSON_provable : JSON -> Maybe Formula
createRandomFormulaFromJSON_provable  json =
  let 
    json2 = { json | randomSeed= { randomNumber=json.randomSeed.randomNumber+1
                                 , maxLengthOfRandomFormula=json.randomSeed.maxLengthOfRandomFormula
                                 , maxNumberOfAgents=json.randomSeed.maxNumberOfAgents
                                 , maxNumberOfActions=json.randomSeed.maxNumberOfActions
                                 }}
  in
        createRandomFormulaFromJSON json 
      |> Maybe.withDefault Top 
      |> \p->  modal_system json++proofSystemfromJSON json 
            |> \sy-> makeProofTree 15 sy (formula2seq p)
            |> \pr->  if CommonSeq.isProvable pr == 1 then Just p 
                      else createRandomFormulaFromJSON_provable json2 

----------------------------------------------
-- Decodeing JSON
----------------------------------------------

type alias  Node  = 
                { id: Int
                 ,label : String
                 ,color : Int
                 }

type alias  Edge  = 
                { id: Int
                 ,from: Int
                 ,to : Int
                 ,label : String
                 }
----------------------------------------------
-- port setting
----------------------------------------------

port loadMap : () -> Cmd msg

-- Ports: Incoming
port input4prove : (Value -> msg) -> Sub msg
port input4randomFormula : (Value -> msg) -> Sub msg
port input4randomFormula_provable : (Value -> msg) -> Sub msg
port input4syntaxCheck : (Value -> msg) -> Sub msg

-- Ports : Outgoing2
port output4prove : Model -> Cmd msg
port output4randomFormula : Model -> Cmd msg
port output4randomFormula_provable : Model -> Cmd msg
port output4syntaxCheck : Model -> Cmd msg

----------------------------------------------
-- Decodeing  JSON (input from JS)
----------------------------------------------
decodeJSON4prove : Decoder JSON
decodeJSON4prove =
    Decoder.map6 JSON
        (Decoder.field "formula" Decoder.string)
        (Decoder.field "action" (Decoder.list decodeJSON4action))
        (Decoder.field "modalSystem" Decoder.string)
        (Decoder.field "elSystem" Decoder.string)
        (Decoder.field "maxNumberOfExpressionsAppearingInANode" Decoder.int)
        (Decoder.field "randomSeed" decodeJSON4randomFormula)

decodeJSON4randomFormula : Decoder RandomSeed
decodeJSON4randomFormula =
    Decoder.map4 RandomSeed
        (Decoder.field "randomNumber" Decoder.int)
        (Decoder.field "maxLengthOfRandomFormula" Decoder.int)
        (Decoder.field "maxNumberOfAgents" Decoder.int)
        (Decoder.field "maxNumberOfActions" Decoder.int)

---------------------------

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

----------------------------------------------
-- MODEL (output to JS)
----------------------------------------------

type alias Model = --Graph
    {   formula : String
       ,nodes : List  Node
       ,edges : List  Edge
       ,provable : Int
       ,system : String 
    }

----------------------------------------------
-- initmodel
----------------------------------------------
initModel : ( Model, Cmd Msg )
initModel = ( Model "" [] [] 0 ""
            , Cmd.none
            )

testAModels : List Syntax.AModel
testAModels = [Syntax.reada,Syntax.skip]
----------------------------------------------
-- UPDATE
----------------------------------------------

type Msg = JsonFromJS_prove Value 
            | JsonFromJS2_randomFormula Value 
            | JsonFromJS3_randomFormulaProvable Value 
            | JsonFromJS4_syntaxChecker Value 

update : Msg -> Model -> ( Model, Cmd Msg )
update message model =
    case message of
        JsonFromJS_prove json ->
           let
                object = case Decoder.decodeValue decodeJSON4prove json of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error (1) in ElmFunctions_sequent.elm: " ++ errorMsg)
                modal_system =  object.modalSystem
                               |> CommonSeq.proofSystem
                limitNum= object.maxNumberOfExpressionsAppearingInANode
                el_system = case object.elSystem of 
                        "EL" -> basicRules++ CommonSeq.ruleK
                        "PAL"-> basicRules++ CommonSeq.ruleK++GPAL.ruleGPAL
                        "IntPAL"-> basicRules_int ++ IntEL.ruleK_int ++IntPAL.ruleGIntPAL -- limitNum proofSystem -- 
                        "DEL" ->basicRules++ GDEL.ruleK_DEL ++ GDEL.ruleDEL ++GDEL.ruleAModel -- change rules here
                        _ -> []      
                maybeFormula_parsed = Parser.parseFormula object.formula
                maybeFormula2_syntaxChecked = case maybeFormula_parsed of 
                  Err  a-> Nothing
                  Ok f -> case object.elSystem of
                            "EL" -> if Syntax.isELformula f then Just f else Nothing
                            "PAL"-> if Syntax.isPALformula f then Just f else Nothing
                            "IntPAL"-> if Syntax.isPALformula f then Just f else Nothing
                            "DEL" -> if Syntax.isDELformula f then Just f else Nothing
                            _ -> Debug.crash "error (3) in ElmFunctions_sequent.elm: "
                actionList=List.map Parser.object2listOfActions object.action
                maybeFormula3_AModelChanged = 
                       actionList 
                    |>  \listOfAM-> (\x->GDEL.substitution4AModel4list x listOfAM)
                    |>  \func->  Maybe.map func  maybeFormula2_syntaxChecked
                newModel = case   maybeFormula3_AModelChanged  of
                  Nothing -> {model | nodes=[],edges=[]}
                  Just f ->
                    let 
                      bottom_sequent = CommonSeq.formula2seq f
                      graph =  CommonSeq.drawProof limitNum  (modal_system++el_system)  bottom_sequent 
                    in 
                      { formula=Syntax.outputForm 0 f
                      , nodes=graph.nodes
                      , edges=graph.edges
                      , provable=graph.provable 
                      , system="  ("++object.elSystem ++", "++ object.modalSystem++")"
                      }         
          in
              newModel ! [ output4prove newModel ]

        JsonFromJS2_randomFormula json -> 
          let
            aaa =  (json |> Debug.log "check(3)")
            decodedJSON  =Decoder.decodeValue decodeJSON4prove json
            decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update (2):" ++ errorMsg)
            maybeFormula = createRandomFormulaFromJSON decodedJSON2
            newModel = case (Debug.log "Main-2:" <| maybeFormula ) of 
              Nothing -> {model | nodes=[],edges=[]}
              Just f ->
                  { model | formula=Syntax.outputForm 0 f}
          in
              newModel ! [ output4randomFormula newModel ]

        JsonFromJS3_randomFormulaProvable json -> 
          let
            aaa =  (json |> Debug.log "check(4)")
            decodedJSON  =Decoder.decodeValue decodeJSON4prove json 
            decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update (3):" ++ errorMsg)
            maybeFormula = createRandomFormulaFromJSON_provable decodedJSON2
            newModel = case maybeFormula  of
              Nothing -> {model | nodes=[],edges=[]}
              Just f ->
                  { model | formula=Syntax.outputForm 0 f
                    }         
          in
              newModel ! [ output4randomFormula_provable newModel ]
        JsonFromJS4_syntaxChecker json -> 
          let
            decodedJSON  =Decoder.decodeValue decodeJSON4prove json
            decodedJSON2 = case decodedJSON of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update (4):" ++ errorMsg)
            maybeFormula = Parser.parseFormula  decodedJSON2.formula
            newModel = case (Debug.log "Main-input-string:" <| maybeFormula ) of 
              Ok f ->  { model | formula=Syntax.outputForm 0 f}
                             
              Err a -> {model | formula="parseError in " ++  a}
          in
              newModel ! [ output4syntaxCheck newModel ]


----------------------------------------------
-- VIEW
----------------------------------------------
view : Model -> Html Msg
view model = Html.div [] [ ]

----------------------------------------------
-- subscription
--------------------------{---------------------
subscriptions model = Platform.Sub.batch
                    [ input4prove JsonFromJS_prove
                    , input4randomFormula JsonFromJS2_randomFormula
                    , input4randomFormula_provable JsonFromJS3_randomFormulaProvable
                    , input4syntaxCheck JsonFromJS4_syntaxChecker
                    ]

----------------------------------------------
-- main
----------------------------------------------

main =
    Html.program
        { init = initModel
        , update = update
        , view = view
        , subscriptions = subscriptions
        }

