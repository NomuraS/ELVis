
module Parser_Formula exposing (..)

import AgentAtom exposing (Agent,State)
import Common_syntax exposing (Formula(..),AModel,Action(..))
import Util 
import Applicative exposing ((@>))
import Combine as Par exposing (Parser,InputStream,(<?>),(<*),(*>),(<*>),(<$>),(<$),(<|>),(>>=))


type StatePar = StateAt String  -- for DEL
              | StateVar String
              | MixState StatePar StatePar

type AModelPar = AModelAt  String 
               | MixAModel AModelPar AModelPar


--------------------------------------------------------------------------------------------
------ test 
--------------------------------------------------------------------------------------------

testall = Util.forall 
       [test2,test3,test4,test5,test6,test7,test8,test9,test10,test11,test12,test91,test92,test80] 
      (\x-> case x of 
        Ok a-> True
        Err a -> False)

test21 = Par.parse parseAModel2 "(((E1;E2);E3))"--(((e2,e1),e3))"
test14 = parseFormula "[((Skip;Skip),(e1,e1))]Pre(Skip)(e1)"
test15 = parseFormula "[((Skip;Skip),(e1,e1))]top"

test11 = parseFormula "Pre(((Skip;Ski);Crash))(((e2,e1),e3))"
test13 = parseFormula "Pre((Crash;(Skip;Ski)))((e3,(e2,e1)))"
test12 = parseFormula "Pre(Skip)(((e2,e1),e3))"


test80 = parseFormula "Pre((Skip;Skip))((e2,e1))"

test91 = parseFormula "Pre(Skip)(e1)"
test92 = parseFormula "[(Skip,e1)]Pre(Skip)(e1)"

test02 = parseFormula2 "&&(~(E)(a)(e,x))A"
test03 = parseFormula2 "&&(~(E)(a)(e,x))[(E,x)]A"
test04 = parseFormula2 "&&(~(E)(a)(e,x))#aA"
test05 = parseFormula2 "[(E,e)]A"
test06 = parseFormula2 "&&(~(E)(a)(e,x))#a[(E,e)]A"
test07 = parseFormula2 "&&(~(E)(a)(e,x))#a[(E,x1)]A"
test08 = parseFormula2 "[(E,e)]#aA <->(Pre(E)(e)->&&(~(E)(a)(e,x))#a[(E,x)]A)"

test0 = parseFormula "[p1 & [q]p2]r"
test1 = parseFormula "(A -> (B -> C)) -> ((A -> B)->(A -> C))"
test2 = parseFormula "(p1 -> p9) v (p8 & ~top)"
test3 = parseFormula "p1 & p9 -> (p8 <-> ~top)"
test4 = parseFormula "#a~#a~#ap4"
test5 = parseFormula "~#a1 (p1 v ~p4)"
test6 = parseFormula "~#a~#b~ (p1 v ~p4)"
test7 =  parseFormula "[~#a<#ap5 v ~p8>p1]p2"
test8 = parseFormula "#b8p"
test9 = parseFormula "[(E,e)]p"
test10 = parseFormula "[(E1,e1)U(E2,e2)]p"
test111 = parseFormula "knows(a,p)"
test112 = parseFormula "knows_if(a,p)"




----------------------------------------------------------------------------------------------------------
-- parseFormula
----------------------------------------------------------------------------------------------------------

--parseFormula2 : String -> Result String (Formula)
parseFormula2 s = 
   let 
     ss = Util.removeWhiteSpaceFromString s
   in  Par.parse (programFormula <* Par.end) ss

parseFormula : String -> Result String (Formula)
parseFormula s = 
   let 
     ss = Util.removeWhiteSpaceFromString s
   in case Par.parse (programFormula <* Par.end) ss of
        Ok ( _, x, es ) ->   Ok es 
        Err ( _, stream, ms ) ->  Err <| parseFormatError ms stream


programFormula: Parser x Formula
programFormula=     Par.lazy <|\() ->
        parseForm7_expr 
                <?> "error in parseForm7_expression" 

parseForm7_expr : Parser x Formula
parseForm7_expr =  Par.lazy <|\() ->
    let
      binaryOp : Parser x (Formula -> Formula -> Formula)
      binaryOp = Iff <$ Par.string "<->"
    in
      Par.lazy (\() -> Par.chainl binaryOp parseForm6_impl2 )

parseForm6_impl2 : Parser s Formula
parseForm6_impl2 =  Par.lazy <|\() ->
    let 
     binaryOp = Imply2 <$ Par.string "<-"
    in
     Par.lazy (\() -> Par.chainl binaryOp parseForm5_impl)


parseForm5_impl : Parser s Formula
parseForm5_impl =  Par.lazy <|\() ->
    let 
     binaryOp = Imply <$ Par.string "->"
    in
     Par.lazy (\() -> Par.chainl binaryOp parseForm4_or)

parseForm4_or : Parser s Formula
parseForm4_or =  Par.lazy <|\() ->
    let
      binaryOp = Or <$ Par.string "v"
    in
      Par.lazy (\() -> Par.chainl binaryOp parseForm3_and)

parseForm3_and : Parser s Formula
parseForm3_and =  Par.lazy <|\() ->
    let 
     --binaryOp : Parser s (Formula -> Formula -> Formula)
     binaryOp = And <$ Par.string "&"
    in
     Par.lazy (\() -> Par.chainl binaryOp parseForm2_unary)


parseForm2_unary : Parser s Formula
parseForm2_unary =
     Par.lazy <|
        \() -> Par.choice [knowp,knowifp,boxp,diap,notp]
               <|> parseForm1_term


knowp : Parser s Formula
knowp =  Par.lazy <| \() ->
       (\(x,y) -> Box x y)
           <$ Par.string "knows"
           <*> 
           Par.parens knowp2


knowifp : Parser s Formula
knowifp =  Par.lazy <| \() ->
       (\(x,y) -> Or (Box x y) (Not (Box x y)))
           <$ Par.string "knows_if"
           <*> 
           Par.parens knowp2

knowp2 : Parser s (Agent,Formula)
knowp2  =  Par.lazy <| \() ->
            (\x y->(x,y))
               <$> parseAgent_identifire_agent <* Par.string ","
               <*> parseForm2_unary


diap : Parser s Formula
diap =  Par.lazy <|\() ->
    let
       unaryOp = (\x y-> Dia x y ) <$ Par.string "$"
    in
       unaryOp <*> parseAgent_identifire_agent <*> parseForm2_unary

boxp : Parser s Formula
boxp =  Par.lazy <|\() ->
    Box  <$ Par.string "#" <*> parseAgent_identifire_agent <*> parseForm2_unary

notp : Parser s Formula
notp =  Par.lazy <|\() ->
 Not <$> (Par.string "~" *> parseForm2_unary)
            

parse_pair_states: Parser s (Agent,State,State)
parse_pair_states = Par.lazy <|\() ->
     (\a (y,z) -> (a,y,z))
        <$> Par.parens parseAgent_identifire_agent
        <*> Par.parens 
            (  (\x y->(x,y)) 
                <$> identifier_state <* Par.string "," 
                <*> identifier_state_var)

parseAModel_amodel_p : Parser s (AModel,(Agent,State,State))
parseAModel_amodel_p =  Par.lazy <|\() ->
        (\ e a-> (e,a))
             <$> (Par.string "Rel" *> (Par.parens identifier_AModel ))
             <*>  parse_pair_states 



parseForm10_bigWedgep : Parser s Formula
parseForm10_bigWedgep = Par.lazy <|\() ->
 (\mo f-> Bigwedge [] mo f)  
              <$ Par.string "&&" <*> Par.parens parseAModel_amodel_p <*> parseForm2_unary

parseForm10_bigVee : Parser s Formula
parseForm10_bigVee = Par.lazy <|\() ->
 (\mo f-> Bigwedge [] mo f)  
              <$ Par.string "vv" <*> Par.parens parseAModel_amodel_p <*> parseForm2_unary

parseForm1_term : Parser s Formula
parseForm1_term =   Par.lazy <|\() ->  
    Par.parens parseForm7_expr <|> parseForm_atom

parseForm_atom : Parser s Formula
parseForm_atom =
    Par.lazy <|
        \() -> Par.choice [  
                         parseForm0_boolForm
                        ,parseForm10_bigWedgep
                        ,parseForm10_bigVee
                        ,parseForm8_announce_p
                        ,parseForm9_announce2_p
                        ,parseForm11_action_p
                        ,parseForm0_identifier_precon
                        ,parseForm0_identifier_formula
                        ,parseForm0_identifier_atom ]

parseForm8_announce_p : Parser s Formula
parseForm8_announce_p =
    Par.lazy <|
        \() ->
            Announce <$> Par.brackets parseForm7_expr <*> parseForm2_unary
            <?> "parseForm8_announce_p"

parseForm9_announce2_p : Parser s Formula
parseForm9_announce2_p = Par.lazy <|\() ->
    let 
     brackets2 =  Par.between (Par.string "<") (Par.string ">")
    in
            Announce2 <$> brackets2 parseForm7_expr <*> parseForm2_unary
            <?> "parseForm9_announce2_p"

parseForm0_boolForm : Parser s Formula
parseForm0_boolForm = Par.lazy <|\() ->
    Par.choice [   Top <$ Par.string "top"
                 , Bot <$ Par.string "bot"  ]
        <?> "parseForm0_boolForm"

parseAgent_identifire_agent : Parser s Agent
parseAgent_identifire_agent =  Par.lazy <|\() ->
 let 
   name = Par.regex "[a-e][a0-9]*"
 in
   name <?> "agent"

parseForm0_identifier_formula : Parser s Formula
parseForm0_identifier_formula =  Par.lazy <|\() ->
    AnyFormula <$> Par.regex "[_A-D][_A-D0-9]*" 
               <?> "parseForm0_identifier_formula"

parseForm0_identifier_atom : Parser s Formula
parseForm0_identifier_atom = 
    Atom <$> Par.regex "[_p-r][_p-r0-9]*" 
    <?> "parseForm0_identifier_atom"

parseForm11_action_p : Parser s Formula
parseForm11_action_p =
    Par.lazy <|
        \() ->
            BoxAction <$> Par.brackets parseAction4_cup <*> parseForm2_unary
            <?> "parseForm11_action_p"

----------------------------------------------------------------------
-- action model
----------------------------------------------------------------------

parseAction4_cup : Parser s Action
parseAction4_cup =  Par.lazy <|\() ->
    let 
     --binaryOp : Parser s (Action -> Action -> Action)
     binaryOp = Cup <$ Par.string "U"
    in
     Par.chainl binaryOp parseAction3_composition
        <?> "parseAction4_cup"


parseAction3_composition : Parser s Action
parseAction3_composition =   Par.lazy <|\() ->
    let 
     --binaryOp = (+++) <$ string ";"
     binaryOp = ComposePoAM <$ Par.string ";"
    in
     Par.chainl binaryOp parseAction2_anyAction
        <?> "parseAction4_cup"

parseAction2_anyAction : Parser s Action
parseAction2_anyAction  =
     Par.lazy <|
        \() ->
            Par.parens  parseAction1_identifier_actionModel
            <?> "parseAction2_anyAction_p"

parseAction1_identifier_actionModel : Parser s Action
parseAction1_identifier_actionModel = Par.lazy <|\() ->
    PointAModel <$> (mixAM2AM <$> parseAModel2 ) <*  Par.string "," <*> (mixState2state <$> parseState)
    <?> "parseAction1_identifier_actionModel"

---------------------------------------------------------------------
    -- state and Amodel
---------------------------------------------------------------------
parseAModel2 : Parser s AModelPar
parseAModel2 = Par.lazy <|\() ->
    let 
     binaryOp = MixAModel <$ Par.string ";"
    in
     Par.chainl binaryOp parseAModelSelect

parseAModelSelect : Parser s AModelPar
parseAModelSelect =
    Par.lazy <|
        \() -> Par.parens parseAModel2  
                <|>identifier_AModel1 

identifier_AModel1: Parser s AModelPar
identifier_AModel1 = Par.lazy <|\() ->
    AModelAt
    <$>
     Par.regex "[A-Za-z0-9]+"
    <?> "identifier_AModel1"

mixState2state:StatePar->State
mixState2state st = case st of 
    StateAt a -> a
    StateVar a -> a
    MixState a b -> "("++mixState2state a ++","++ mixState2state b++")"

mixAM2AM : AModelPar -> AModel
mixAM2AM st = 
    let
     ff x = case x of 
             AModelAt a -> a
             MixAModel a b -> "("++ff a ++";"++ ff b++")"
    in 
     {am_name=ff st,am_domain=[],am_relation=[],am_pre=[]}

parseForm0_identifier_precon : Parser s Formula
parseForm0_identifier_precon = 
      Par.lazy <|
        \() ->
    Precon <$ Par.string "Pre" <*> (mixAM2AM <$> parseAModel2 ) <*> (mixState2state <$> parseState)
    <?> "parseForm0_identifier_atom"


parseStateSelect : Parser s StatePar
parseStateSelect =  Par.lazy <| 
                    \() ->  (Par.parens parseState)
                                <|> identifier_State1 
                                --<|> identifier_State2

parseState = Par.lazy <|\() ->
    let 
     binaryOp : Parser x (StatePar -> StatePar -> StatePar)
     binaryOp = MixState <$ Par.string ","
    in
     Par.chainl binaryOp parseStateSelect

identifier_State1: Parser s StatePar
identifier_State1 = Par.lazy <|\() ->
     (\x->StateAt x) <$> (Par.regex "[e-gx-z0-9]+")
    <?> "identifier_State1"

identifier_State2: Parser s StatePar
identifier_State2 = Par.lazy <|\() ->
     (\x->StateVar x) <$> (Par.regex "[x-z0-9]+")
    <?> "identifier_Stete2"


------------------
------------------

identifier_AModel : Parser s AModel
identifier_AModel = Par.lazy <|\() ->
    (\x->{am_name=x,am_domain= [],am_relation=[],am_pre=[]}) 
     <$> Par.regex "[A-Za-z0-9]+"
     <?> "identifier_AModel"

identifier_state : Parser s State
identifier_state = Par.lazy <|\() ->
    --Par.regex "\\([e-g0-9,()]*\\)" 
    --Par.regex "((\\(*[e-g0-9]*\\)*)\\,*)*"
    --<|>
    Par.regex "[e-g0-9]+"
    <?> "identifier_state"

identifier_state_var : Parser s State
identifier_state_var = Par.lazy <|\() ->
    --Par.regex "\\([x-z0-9,()]*\\)"
    --<|>
    Par.regex "[x-z0-9]+" 
    <?> "identifier_state"

-- end action
parseFormatError : List String -> InputStream -> String
parseFormatError ms stream =
    let
        location = Par.currentLocation stream
        separator = "| "
        expectationSeparator = "\n  * "
        lineNumberOffset = floor (logBase 10 (toFloat location.line)) + 1
        separatorOffset = String.length separator
        padding = location.column + separatorOffset + 2
    in
        "Parse error around line:\n\n"
            ++ toString location.line
            ++ separator
            ++ location.source
            ++ "\n"
            ++ String.padLeft padding ' ' "^"
            ++ "\nI expected one of the following:\n"
            ++ expectationSeparator
            ++ String.join expectationSeparator ms

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
 
jsonRel2AMRelation: AModelJSON_rel-> (Agent,State,State)
jsonRel2AMRelation x =(x.agent,x.from,x.to)
        
jsonPre2precondition :  AModelJSON_pre -> (State, Formula)
jsonPre2precondition pre  =   parseFormula pre.to
                             @> (\x->( pre.from, x )) 
                             |> \x-> case x of 
                              Ok (a,fo) -> (a,fo)
                              Err a-> Debug.crash "error in jsonPre2precondition" 

object2listOfActions : AModelJSON ->  AModel
object2listOfActions actionJSON = 
            {  am_name=actionJSON.name
              ,am_domain=actionJSON.domain
              ,am_relation= List.map jsonRel2AMRelation actionJSON.relation
              ,am_pre= List.map jsonPre2precondition actionJSON.precondition
            }
 
