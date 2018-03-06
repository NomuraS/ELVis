--module for truth check and  modifying models for PAL and DEL

port module ElmFunctions_truthChecker exposing (..)

import Util exposing ((@>>=))
import Html exposing (Html)
import Json.Encode as Encoder exposing (Value)
import Json.Decode as Decoder exposing (Decoder)
import Platform.Sub
import Common_syntax exposing (AtomBool,FormulaBool,Formula(..),Pre)
import PAL_semantics  as PAL
import DEL_semantics  as DEL
import DEL_sequent  as GDEL
import Parser_Formula as Parser
import Result
import Result.Extra
import Applicative exposing (..)

type alias JSON =
   {  kripkeModel : KModelJSON,
      actionModel : AModelJSON,
      world : String,
      formula : String,
      actionList : List AModelJSON
   }

type alias AModelJSON =
    { name : String
    , domain : List String
    , relation : List KModelJSON_rel
    , precondition : List AModelJSON_pre
    , comment : String
    }

type alias AModelJSON_pre =
  {  from: String
    ,to: String
  }

type alias KModelJSON =
    { name : String
    , domain : List String
    , relation : List KModelJSON_rel
    , valuation : List KModelJSON_val
    , comment : String
    }
type alias KModelJSON_rel =
  {  agent: String
    ,from: String
    ,to: String
  }
type alias KModelJSON_val =
  {  prop: String
    ,worlds: List String
  }

port input1_truthCheck_PAL :(Value -> msg) -> Sub msg
port input2_modifyKM_PAL :(Value -> msg) -> Sub msg
port input3_modifyKM_DEL :(Value -> msg) -> Sub msg

port output1_truthCheck_PAL :Model -> Cmd msg
port output2_modifyKM_PAL :Model -> Cmd msg
port output3_modifyKM_DEL :Model -> Cmd msg

-- data from js (input)
decodeJSON : Decoder JSON
decodeJSON =
    Decoder.map5 JSON
        (Decoder.field "kripkeModel" decodeJSON4kripke)
        (Decoder.field "actionModel" decodeJSON4action)
        (Decoder.field "world" Decoder.string)
        (Decoder.field "formula" Decoder.string)
        (Decoder.field "actionList" (Decoder.list decodeJSON4action))

decodeJSON4kripke : Decoder KModelJSON
decodeJSON4kripke =
    Decoder.map5 KModelJSON
        (Decoder.field "name" Decoder.string)
        (Decoder.field "domain" (Decoder.list Decoder.string))
        (Decoder.field "relation" (Decoder.list decodeJSON4kripke_rel))
        (Decoder.field "valuation" (Decoder.list decodeJSON4kripke_val))
        (Decoder.field "comment" Decoder.string)

decodeJSON4action : Decoder AModelJSON
decodeJSON4action =
    Decoder.map5 AModelJSON
        (Decoder.field "name" Decoder.string)
        (Decoder.field "domain" (Decoder.list Decoder.string))
        (Decoder.field "relation" (Decoder.list decodeJSON4kripke_rel))
        (Decoder.field "precondition" (Decoder.list decodeJSON4action_pre))
        (Decoder.field "comment" Decoder.string)

decodeJSON4action_pre : Decoder AModelJSON_pre
decodeJSON4action_pre =       
      Decoder.map2 AModelJSON_pre
        (Decoder.field "from" Decoder.string)
        (Decoder.field "to" Decoder.string)


decodeJSON4kripke_rel : Decoder KModelJSON_rel
decodeJSON4kripke_rel =       
      Decoder.map3 KModelJSON_rel
        (Decoder.field "agent" Decoder.string)
        (Decoder.field "from" Decoder.string)
        (Decoder.field "to" Decoder.string)

decodeJSON4kripke_val : Decoder KModelJSON_val
decodeJSON4kripke_val =       
      Decoder.map2 KModelJSON_val
        (Decoder.field "prop" Decoder.string)
        (Decoder.field "worlds" (Decoder.list Decoder.string))

-- MODEL (output)
type alias Model =
    { modelName : String
    , world : String
    , atomBool : List AtomBool
    , formulaBool : FormulaBool
    , error : String
    , modifiedKM: List KModelJSON
    }

-- initmodel
initModel : ( Model, Cmd Msg )
initModel = ( Model ""  "" [] {formula="",maybeBool=""} "" []
            , Cmd.none
            )

-- UPDATE
type Msg =    JsonFromJS1 Value
            | JsonFromJS2_modifyKM_PAL Value
            | JsonFromJS3_modifyKM_DEL Value

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model = case msg of
        JsonFromJS1 json -> 
                let 
                    decodedJSON2 = case Decoder.decodeValue decodeJSON json  of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update ElmFunctions_truthChecker (1):" ++ errorMsg)
                    kmodel = {em_name=decodedJSON2.kripkeModel.name
                            , em_domain=decodedJSON2.kripkeModel.domain
                            , em_relation= List.map (\x-> (x.agent,x.from,x.to)) decodedJSON2.kripkeModel.relation
                            , em_value= List.map (\x-> (x.prop,x.worlds)) decodedJSON2.kripkeModel.valuation
                            }
                    wo = decodedJSON2.world
                    formula =  Parser.parseFormula decodedJSON2.formula
                    formulaChecked_ = formula @>>=
                                       \f->  if wo == "any"
                                             then PAL.validInModel kmodel f
                                             else PAL.valueF  kmodel wo f
                    atomsChecked_= Result.map (\f-> PAL.checkEachAtoms kmodel wo f) formula
                    newModel0 ={ formulaBool= {formula="",maybeBool=""},
                                 modelName=decodedJSON2.kripkeModel.name,
                                 world=decodedJSON2.world,
                                 atomBool=[],
                                 error = "",
                                 modifiedKM =[]
                                } 
                    newModel= case (formulaChecked_, atomsChecked_) of
                        (Ok form, Ok atom) ->
                               { newModel0 | formulaBool= { formula=decodedJSON2.formula,
                                                            maybeBool= (if form == True then "true" else "false") },
                                             atomBool=atom
                                }
                        (Ok form,Err b)->  
                               {newModel0 | error = b}
                        (Err a, _)->  
                               {newModel0 | error = a}
                in 
                    newModel ! [ output1_truthCheck_PAL newModel ]
        JsonFromJS2_modifyKM_PAL json -> 
                let 
                    decodedJSON2 = case Decoder.decodeValue decodeJSON json  of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update ElmFunctions_truthChecker (2):" ++ errorMsg)
                    kmodel = {em_name=decodedJSON2.kripkeModel.name
                            , em_domain=decodedJSON2.kripkeModel.domain
                            , em_relation= List.map (\x-> (x.agent,x.from,x.to)) decodedJSON2.kripkeModel.relation
                            , em_value= List.map (\x-> (x.prop,x.worlds)) decodedJSON2.kripkeModel.valuation
                            }
                    wo = decodedJSON2.world
                    formula =  Parser.parseFormula decodedJSON2.formula
                    kmModified_ =  formula @>>= (\x->PAL.modifyEModel kmodel x)
                    newModel0 ={ formulaBool= {formula="",maybeBool=""},
                                 modelName = "",
                                 world="",
                                 atomBool=[],
                                 error = "",
                                 modifiedKM =[]
                                } 
                    newModel= case kmModified_ of
                        Ok km ->
                               let km_model = { 
                                                --name ="(" ++ decodedJSON2.kripkeModel.name ++ "|" ++ decodedJSON2.formula ++")"
                                                name = decodedJSON2.kripkeModel.name ++ "|" ++ decodedJSON2.formula
                                              , domain=km.em_domain-- : List String
                                              , relation=List.map (\(a,x,y)->{agent=a,from=x,to=y}) km.em_relation
                                              , valuation=List.map (\(p,ws)->{prop=p,worlds=ws}) km.em_value
                                              , comment= "This is the KM restricted by formula "++ decodedJSON2.formula-- : String
                                              }

                               in { newModel0 | modifiedKM = [km_model]}
                        Err b->  
                               {newModel0 | error = b}
                in 
                    newModel ! [ output2_modifyKM_PAL newModel ]

        JsonFromJS3_modifyKM_DEL json -> 
                let 
                    decodedJSON2 = case Decoder.decodeValue decodeJSON json  of 
                        Ok a -> a
                        Err errorMsg-> Debug.crash ("error in update ElmFunctions_truthChecker (2):" ++ errorMsg)
                    kmName = decodedJSON2.kripkeModel.name
                    kmDomain =decodedJSON2.kripkeModel.domain 
                    kmRelaton = decodedJSON2.kripkeModel.relation
                    kmValuation = decodedJSON2.kripkeModel.valuation
                    amName =decodedJSON2.actionModel.name
                    amDomain =decodedJSON2.actionModel.domain
                    amRelation =decodedJSON2.actionModel.relation
                    amPrecondition =decodedJSON2.actionModel.precondition
                    kmodel = {em_name=kmName
                            , em_domain=kmDomain
                            , em_relation= List.map (\x-> (x.agent,x.from,x.to)) kmRelaton
                            , em_value= List.map (\x-> (x.prop,x.worlds)) kmValuation
                            }
                    parse2 x =  case Parser.parseFormula x.to of 
                       Ok a -> Ok  (x.from, a)
                       Err a-> Err <| "parseError:" ++a  
                    --precon :  Result String Pre
                    precon = Result.Extra.combine <| List.map (\x-> parse2 x) amPrecondition
                    actionList = List.map Parser.object2listOfActions decodedJSON2.actionList 
                    actionList2 = GDEL.substitution4AModel4list_AModels actionList actionList 

                    --preconSubst : Result String Pre
                    preconSubst = case precon of 
                      Err a -> Err a
                      Ok forms -> 
                            let 
                              ff x = (Util.fst x, GDEL.substitution4AModel4list (Util.snd x) actionList2)
                            in 
                              Ok <| List.map ff forms
                --  maybeFormula2_syntaxChecked = case maybeFormula_parsed of 
                --  Err  a-> Nothing
                --  Ok f -> case object.elSystem of
                --            "EL" -> if Syntax.isELformula f then Just f else Nothing
                --            "PAL"-> if Syntax.isPALformula f then Just f else Nothing
                --            "IntPAL"-> if Syntax.isPALformula f then Just f else Nothing
                --            "DEL" -> if Syntax.isDELformula f then Just f else Nothing
                --            _ -> Debug.crash "error in update (5)"
                --maybeFormula3_AModelChanged = 
                --       actionList 
                --    |>  \listOfAM-> (\x->DEL.substitution4AModel4list x listOfAM)
                --    |>  \func->  Maybe.map func  maybeFormula2_syntaxChecked
                    amodel = preconSubst @>
                       \x-> {am_name=amName
                            , am_domain=amDomain
                            , am_relation= List.map (\x-> (x.agent,x.from,x.to)) amRelation
                            , am_pre=x
                            }       
                    wo = decodedJSON2.world
                    kmModified_ = DEL.composeKM kmodel <@ amodel
                    --comme1 = Debug.log "comm1:formula" precon
                    --comme2 = Debug.log "comm2:kmodel" kmodel
                    --comme3 = Debug.log "comm3:amodel" amodel
                    newModel0 ={ formulaBool= {formula="",maybeBool=""},
                                 modelName = "",
                                 world="",
                                 atomBool=[],
                                 error = "",
                                 modifiedKM =[]
                                } 
                    newModel= case kmModified_ of
                        Ok km ->
                               let km_model = { 
                                                --name ="(" ++ kmName ++ "*" ++ amName ++")"
                                                name = km.em_name
                                              , domain=km.em_domain
                                              , relation=List.map (\(a,x,y)->{agent=a,from=x,to=y}) km.em_relation
                                              , valuation=List.map (\(p,ws)->{prop=p,worlds=ws}) km.em_value
                                              , comment= "This is the KM "++ kmName++" restricted by AM "++ amName-- : String
                                              }

                               in { newModel0 | modifiedKM = [km_model]}
                        Err b->  
                               {newModel0 | error = b}
                in 
                    newModel ! [ output3_modifyKM_DEL newModel ]

-- VIEW
view : Model -> Html Msg
view model = Html.div [] []

-- SUBSCRIPTIONS
subscriptions model = Platform.Sub.batch
                    [ input1_truthCheck_PAL JsonFromJS1
                    , input2_modifyKM_PAL JsonFromJS2_modifyKM_PAL
                    , input3_modifyKM_DEL JsonFromJS3_modifyKM_DEL
                    ]
-- main
main = Html.program
        { init = initModel
        , view = view
        , update = update
        , subscriptions = subscriptions
        }





--{ am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] },
--{ am_name = "Crash", am_domain = ["e0"], am_relation = [("a","e0","e0")], am_pre = [("e0",Bot)] },
--{ am_name = "Crash", am_domain = ["e0"], am_relation = [("a","e0","e0")], am_pre = [("e0",Bot)] },
--{ am_name = "Reada", am_domain = ["e0","e1"], am_relation = [("a","e0","e0"),("a","e1","e1"),("b","e0","e0"),("b","e1","e1"),("b","e0","e1"),("b","e1","e0")], am_pre = [("e0",Not (Atom "p")),("e1",Atom "p")] },
--{ am_name = "Reada", am_domain = ["e0","e1"], am_relation = [("a","e0","e0"),("a","e1","e1"),("b","e0","e0"),("b","e1","e1"),("b","e0","e1"),("b","e1","e0")], am_pre = [("e0",Not (Atom "p")),("e1",Atom "p")] },
--{ am_name = "Reada", am_domain = ["e0","e1"], am_relation = [("a","e0","e0"),("a","e1","e1"),("b","e0","e0"),("b","e1","e1"),("b","e0","e1"),("b","e1","e0")], am_pre = [("e0",Not (Atom "p")),("e1",Atom "p")] },

--{ am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1") (Precon { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1")))] },
--{ am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },
--{ am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },
--{ am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },
--{ am_name = "((Skip;Skip);Skip)", am_domain = ["((e1,e1),e1)"], am_relation = [("a","((e1,e1),e1)","((e1,e1),e1)")], am_pre = [("((e1,e1),e1)",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1")))] },
--{ am_name = "((Skip;Skip);Skip)", am_domain = ["((e1,e1),e1)"], am_relation = [("a","((e1,e1),e1)","((e1,e1),e1)")], am_pre = [("((e1,e1),e1)",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },
--{ am_name = "((Skip;Skip);Skip)", am_domain = ["((e1,e1),e1)"], am_relation = [("a","((e1,e1),e1)","((e1,e1),e1)")], am_pre = [("((e1,e1),e1)",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },
--{ am_name = "((Skip;Skip);Skip)", am_domain = ["((e1,e1),e1)"], am_relation = [("a","((e1,e1),e1)","((e1,e1),e1)")], am_pre = [("((e1,e1),e1)",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },
--{ am_name = "((Skip;Skip);Skip)", am_domain = ["((e1,e1),e1)"], am_relation = [("a","((e1,e1),e1)","((e1,e1),e1)")], am_pre = [("((e1,e1),e1)",And (Precon { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },
--{ am_name = "((Skip;Skip);((Skip;Skip);Skip))", am_domain = ["((e1,e1),((e1,e1),e1))"], am_relation = [("a","((e1,e1),((e1,e1),e1))","((e1,e1),((e1,e1),e1))")], am_pre = [("((e1,e1),((e1,e1),e1))",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "((Skip;Skip);Skip)", am_domain = [], am_relation = [], am_pre = [] } "((e1,e1),e1)")))] },
--{ am_name = "((Skip;Skip);((Skip;Skip);Skip))", am_domain = ["((e1,e1),((e1,e1),e1))"], am_relation = [("a","((e1,e1),((e1,e1),e1))","((e1,e1),((e1,e1),e1))")], am_pre = [("((e1,e1),((e1,e1),e1))",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "((Skip;Skip);Skip)", am_domain = [], am_relation = [], am_pre = [] } "((e1,e1),e1)")))] },
--{ am_name = "((Skip;Skip);((Skip;Skip);Skip))", am_domain = ["((e1,e1),((e1,e1),e1))"], am_relation = [("a","((e1,e1),((e1,e1),e1))","((e1,e1),((e1,e1),e1))")], am_pre = [("((e1,e1),((e1,e1),e1))",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "((Skip;Skip);Skip)", am_domain = [], am_relation = [], am_pre = [] } "((e1,e1),e1)")))] },
--{ am_name = "((Skip;Skip);((Skip;Skip);Skip))", am_domain = ["((e1,e1),((e1,e1),e1))"], am_relation = [("a","((e1,e1),((e1,e1),e1))","((e1,e1),((e1,e1),e1))")], am_pre = [("((e1,e1),((e1,e1),e1))",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "((Skip;Skip);Skip)", am_domain = [], am_relation = [], am_pre = [] } "((e1,e1),e1)")))] },
--{ am_name = "((Skip;Skip);((Skip;Skip);Skip))", am_domain = ["((e1,e1),((e1,e1),e1))"], am_relation = [("a","((e1,e1),((e1,e1),e1))","((e1,e1),((e1,e1),e1))")], am_pre = [("((e1,e1),((e1,e1),e1))",And (Precon { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (Precon { am_name = "((Skip;Skip);Skip)", am_domain = [], am_relation = [], am_pre = [] } "((e1,e1),e1)")))] },
--{ am_name = "((Skip;Skip);((Skip;Skip);Skip))", am_domain = ["((e1,e1),((e1,e1),e1))"], am_relation = [("a","((e1,e1),((e1,e1),e1))","((e1,e1),((e1,e1),e1))")], am_pre = [("((e1,e1),((e1,e1),e1))",And (Precon { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (Precon { am_name = "((Skip;Skip);Skip)", am_domain = ["((e1,e1),e1)"], am_relation = [("a","((e1,e1),e1)","((e1,e1),e1)")], am_pre = [("((e1,e1),e1)",And (Precon { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "(e1,e1)") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] } "((e1,e1),e1)")))] }]

--kripke.bundle.js:80686 actionList_asaf4: 

--  { am_name = "Skip", 
--      am_domain = ["e1"], 
--      am_relation = [("a","e1","e1")], 
--      am_pre = [("e1",Top)] },
--  { am_name = "Crash", 
--  am_domain = ["e0"], 
--      am_relation = [("a","e0","e0")], 
--      am_pre = [("e0",Bot)] },
--  { am_name = "Reada", 
--      am_domain = ["e0","e1"], 
--      am_relation = [("a","e0","e0"),("a","e1","e1"),("b","e0","e0"),("b","e1","e1"),("b","e0","e1"),("b","e1","e0")], 
--      am_pre = [("e0",Not (Atom "p")),("e1",Atom "p")] },
--  { am_name = "(Skip;Skip)", 
--      am_domain = ["(e1,e1)"], 
--      am_relation = [("a","(e1,e1)","(e1,e1)")], 
--      am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1") (Precon { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1")))] },
--  { am_name = "((Skip;Skip);Skip)", 
--      am_domain = ["((e1,e1),e1)"], 
--      am_relation = [("a","((e1,e1),e1)","((e1,e1),e1)")], 
--      am_pre = [("((e1,e1),e1)",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "Skip", am_domain = [], am_relation = [], am_pre = [] } "e1")))] },
--  { am_name = "((Skip;Skip);((Skip;Skip);Skip))", 
--      am_domain = ["((e1,e1),((e1,e1),e1))"], 
--      am_relation = [("a","((e1,e1),((e1,e1),e1))","((e1,e1),((e1,e1),e1))")], 
--      am_pre = [("((e1,e1),((e1,e1),e1))",And (Precon { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (BoxAction (PointAModel { am_name = "(Skip;Skip)", am_domain = [], am_relation = [], am_pre = [] } "(e1,e1)") (Precon { am_name = "((Skip;Skip);Skip)", am_domain = [], am_relation = [], am_pre = [] } "((e1,e1),e1)")))] 
--  }]


--kripke.bundle.js:80686 actionList_asaf42: [

--{ am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] },
--{ am_name = "Crash", am_domain = ["e0"], am_relation = [("a","e0","e0")], am_pre = [("e0",Bot)] },
--{ am_name = "Reada", am_domain = ["e0","e1"], am_relation = [("a","e0","e0"),("a","e1","e1"),("b","e0","e0"),("b","e1","e1"),("b","e0","e1"),("b","e1","e0")], am_pre = [("e0",Not (Atom "p")),("e1",Atom "p")] },
--{ am_name = "(Skip;Skip)", am_domain = ["(e1,e1)"], am_relation = [("a","(e1,e1)","(e1,e1)")], am_pre = [("(e1,e1)",And (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (BoxAction (PointAModel { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1") (Precon { am_name = "Skip", am_domain = ["e1"], am_relation = [("a","e1","e1")], am_pre = [("e1",Top)] } "e1")))] },

--]