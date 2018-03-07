module Common_syntax   exposing (..) 

import Util
import AgentAtom exposing (AtomString,Agent,State)


type alias AtomBool = {   
             atom:String
            ,maybeBool: String
           }

type alias FormulaBool = {   
             formula:String
            ,maybeBool: String
           }
           
type Formula = Top
         | Bot
         | Atom AtomString
         | AnyFormula String
         | Not Formula
         | And Formula Formula
         | Or Formula Formula
         | Imply Formula Formula
         | Imply2 Formula Formula
         | Iff Formula Formula
         | Dia Agent Formula
         | Box Agent Formula
         --| Common (List Agent)   Formula -- C[ab]A
         | Announce Formula Formula    -- PAL
         | Announce2 Formula Formula   -- PAL        
         | Bigwedge (List State) (AModel,(Agent,State,State)) Formula   -- DEL (List State) is for labelled seq.
         | Bigvee   (List State) (AModel,(Agent,State,State)) Formula   -- DEL
         | BoxAction Action Formula -- [α]A   -- DEL
         | DiaAction Action Formula -- <α>A   -- DEL
         | Precon AModel State         -- pre(s) -- DEL


isELformula : Formula -> Bool
isELformula f =
  case f of 
  Not f1-> isELformula f1
  And f1 f2 -> isELformula f1 && isELformula f2
  Imply f1 f2 -> isELformula f1 && isELformula f2
  Imply2 f1 f2 -> isELformula f1 && isELformula f2
  Iff f1 f2 -> isELformula f1 && isELformula f2
  Dia ag f1 -> isELformula f1
  Box ag f1 -> isELformula f1
  Announce f1 f2 -> False
  Announce2 f1 f2 -> False
  Bigwedge listOfStat (am,(ag,s1,s2)) f1 -> False
  Bigvee listOfStat (am,(ag,s1,s2)) f1 -> False
  BoxAction ac f1 -> False
  DiaAction ac f1 -> False
  Precon listOfAM f1 -> False 
  _-> True

isPALformula : Formula -> Bool
isPALformula f = case f of 
  Not f1-> isPALformula f1
  And f1 f2 -> isPALformula f1 && isPALformula f2
  Imply f1 f2 -> isPALformula f1 && isPALformula f2
  Imply2 f1 f2 -> isPALformula f1 && isPALformula f2
  Iff f1 f2 -> isPALformula f1 && isPALformula f2
  Dia ag f1 -> isPALformula f1
  Box ag f1 -> isPALformula f1
  Announce f1 f2 -> isPALformula f1 && isPALformula f2
  Announce2 f1 f2 -> isPALformula f1 && isPALformula f2
  Bigwedge listOfStat (am,(ag,s1,s2)) f1 -> False
  Bigvee listOfStat (am,(ag,s1,s2)) f1 -> False
  BoxAction ac f1 -> False
  DiaAction ac f1 -> False
  Precon listOfAM f1 -> False 
  _-> True

isDELformula : Formula -> Bool
isDELformula f = case f of 
  Not f1-> isDELformula f1
  And f1 f2 -> isDELformula f1 && isDELformula f2
  Imply f1 f2 -> isDELformula f1 && isDELformula f2
  Imply2 f1 f2 -> isDELformula f1 && isDELformula f2
  Iff f1 f2 -> isDELformula f1 && isDELformula f2
  Dia ag f1 -> isDELformula f1
  Box ag f1 -> isDELformula f1
  Announce f1 f2 -> False
  Announce2 f1 f2 -> False
  Bigwedge listOfStat (am,(ag,s1,s2)) f1 -> isDELformula f1
  Bigvee listOfStat (am,(ag,s1,s2)) f1 -> isDELformula f1
  BoxAction ac f1 -> isDELformula f1
  DiaAction ac f1 -> isDELformula f1
  Precon listOfAM f1 -> True 
  _-> True

formula2Int : Formula -> Int
formula2Int f = 
  case f of
    Bot             -> 0
    Top             -> 1
    Atom ( a)          -> 2  + (String.length a)
    AnyFormula a    -> 3  + (String.length a)
    Not f           -> 4  + (formula2Int f)
    And f1 f2       -> 5  + (formula2Int f1) + (formula2Int f2)
    Or f1 f2        -> 6  + (formula2Int f1) + (formula2Int f2)
    Imply f1 f2     -> 7  + (formula2Int f1) + (formula2Int f2)
    Imply2 f1 f2    -> 8  + (formula2Int f1) + (formula2Int f2)
    Iff f1 f2     -> 9  + (formula2Int f1) + (formula2Int f2)
    Dia a f         -> 10 + (String.length a) + (formula2Int f)
    Box a f         -> 11 + (String.length a) + (formula2Int f)
    Announce f1 f2  -> 12 + (formula2Int f1) + (formula2Int f2)
    Announce2 f1 f2 -> 13 + (formula2Int f1) + (formula2Int f2)
    Bigwedge states (am,(ag,s1,s2)) f1 -> 14
    Bigvee   states (am,(ag,s1,s2)) f1  -> 15-- DEL
    BoxAction action f1 ->16
    DiaAction action f1 ->17
    Precon  pre s ->18

----------------------------------------------
  -- macros for formulas
----------------------------------------------
bigAnd : List Formula ->Formula
bigAnd li =
  case li of 
  []-> Top 
  f::lii-> List.foldr (\x y-> And x y) f lii

bigOr : List Formula ->Formula
bigOr li =
  case li of 
  []-> Bot 
  f::lii-> List.foldr (\x-> \y-> Or x y) f lii

know : Agent-> Formula -> Formula
know ag f = Box ag f

notknow : Agent-> Formula -> Formula
notknow ag f = Not (know ag f)

knowEither : Agent-> Formula -> Formula
knowEither ag f = bigOr [ Box ag f
                         ,Box ag (Not f)]

knowNeither : Agent-> Formula -> Formula
knowNeither ag f =  Not (knowEither ag f)

------------------------------------------------------------------------------------------
  -- action model
------------------------------------------------------------------------------------------

type alias Pre = List  (State, Formula)

type alias AMRelation = List (Agent,State,State)
type alias AMRelation4Sequent = List (Agent,List AModel,State,State)
type alias AModel = { am_name:String
                     ,am_domain:List State
                     ,am_relation:AMRelation
                     ,am_pre:Pre}

type Action = PointAModel AModel State
                   | Cup Action Action 
                   | ComposePoAM Action Action 

--settings
amodel2agentlist:AModel->List Agent
amodel2agentlist ac = List.map (\(ag,x,y)->ag) ac.am_relation


----(+++)
 --composition for action

composeAM : AModel ->AModel ->AModel
composeAM e1 e2 =
        let  
           agents = Util.nub2 <| amodel2agentlist e1 ++  amodel2agentlist e2 
           name2 = "("++(e1.am_name)++";"++(e2.am_name)++")"
           -- domain
           domain1 = Util.cartesian (e1.am_domain) (e2.am_domain)
           domain2 = List.map (\(x,y)-> ("("++x++","++y++")")) domain1
           -- relation
           relation1= Util.cartesian2 agents domain1 domain1
           ff = (\(ag,(x1,y1),(x2,y2))->   (List.member (ag,x1,x2) (e1.am_relation))  
                                        && (List.member (ag,y1,y2) (e2.am_relation)))
           relation2 = List.filter ff relation1
           relation3 = List.map (\(ag,(x1,y1),(x2,y2))-> (ag,  ("("++x1++","++y1++")"), ("("++x2++","++y2++")"))) relation2
            --precondition
           form x y =And (Precon e1 x) (BoxAction (PointAModel e1 x) (Precon e2 y))
           mapF (x,y) = (("("++x++","++y++")"),form x y)
           pre2  = List.map mapF domain1
        in 
          { am_name = name2,
            am_domain = domain2,
            am_relation = relation3,
            am_pre = pre2--[("(e1,e2)", Bot)]
          }

-- def of E;E (Action composition)
composeAction : Action -> Action -> Action 
composeAction a b =  case (a,b) of 
        (PointAModel e1 s1, PointAModel e2 s2) ->  PointAModel (composeAM e1 e2) (("("++s1++","++s2++")"))
        (PointAModel e1 s1, ComposePoAM ac2 ac3) ->  composeAction 
                                                                    (PointAModel e1 s1)
                                                                    (composeAction ac2 ac3)
        (ComposePoAM ac2 ac3,PointAModel e1 s1) ->  composeAction 
                                                                    (composeAction ac2 ac3)                                                            
                                                                    (PointAModel e1 s1)
        (ComposePoAM ac5 ac6,ComposePoAM ac3 ac4) ->  composeAction 
                                                        (composeAction ac5 ac6)
                                                        (composeAction ac3 ac4)
        _ -> Debug.crash "error in composeAction"


-- def of E;E (Action composition)
(+++) : Action -> Action -> Action
(+++) = composeAction

lookPre:  List (a, Formula)-> a ->  Maybe Formula 
lookPre li at = case li of
  [] -> Nothing
  (x,f)::lii-> if at==x  then Just f
               else lookPre lii at


lookPre2:  List (a, Formula)-> a ->   Formula 
lookPre2 li at = case li of
  [] ->Bot 
  (x,f)::lii-> if at==x  then  f
               else lookPre2 lii at
--------------------------------------------------------------------------------------------
-- output (Formula, Action, State)
--------------------------------------------------------------------------------------------
infixr 3 ++++

(++++) : String -> String -> String
(++++) a b  = a++ " "++b

outputForm : Int -> Formula -> String
outputForm n f = 
  let
    paren k s = if n > k then "(" ++ s ++ ")" else s
  in
    case f of
    Atom i            -> i
    AnyFormula i      -> i
    Top               -> "top"
    Bot               -> "bot"
    Not  a            -> "~" ++ outputForm 3 a
    Dia ag a          -> "$"  ++ag++++  outputForm 3 a
    Box ag a          -> "#" ++ag++ outputForm 3 a
    Imply a b         -> paren 1 <| outputForm 2 a ++++ "-> " ++++ outputForm 2 b
    Imply2 a b        -> paren 1 <| outputForm 2 a ++++ "<-"  ++++ outputForm 2 b
    Iff a b         -> paren 1 <| outputForm 2 a ++++ "<->" ++++ outputForm 2 b
    And a b           -> paren 2 <| outputForm 3 a ++++  "&"  ++++ outputForm 3 b
    Or a b            -> paren 2 <| outputForm 3 a ++++  "v"  ++++ outputForm 3 b
    --Bigwedge states (am,(ag,e1,e2)) f -> "@{"++ e1++"~"++ag++"("++am.am_name ++")"++  e2++"}"++ outputForm 3 f
    --Bigvee states (am,(ag,e1,e2)) f ->   "vvR^"++am.am_name++"_"++ag++ "("++ e1++","++  e2++")"++ outputForm 3 f
    Bigwedge states (am,(ag,e1,e2)) f -> "&&(Rel"++"("++am.am_name++")("++ag++")("++e1++","++e2++"))"++ outputForm 3 f
    Bigvee   states (am,(ag,e1,e2)) f -> "vv(Rel"++"("++am.am_name++")("++ag++")("++e1++","++e2++"))"++ outputForm 3 f
    BoxAction action p-> paren 3 ("["  ++ outputAction action ++ "]"  ++ outputForm 3 p) 
    DiaAction action p-> paren 3 ("<"  ++ outputAction action ++ ">"  ++ outputForm 3 p) 
    Precon am e ->  "Pre(" ++ am.am_name ++")(" ++ e ++")"
    Announce a b      -> paren 3 <| "[" ++outputForm 3 a ++ "]"  ++ outputForm 3 b
    Announce2 a b     -> paren 3 <| "<" ++outputForm 3 a ++ ">"  ++ outputForm 3 b

outputAction : Action -> String
outputAction f = 
    case  f of
      PointAModel mo s    -> "("  ++  mo.am_name ++ ","++ s ++")"
      Cup ac1 ac2     ->  outputAction ac1 ++ "U" ++ outputAction ac2   
      ComposePoAM ac1 ac2     ->  outputAction ac1 ++ ";" ++ outputAction ac2   
      
----------------------------------------------------------------------------------
--Def of EModel  (Letter)
----------------------------------------------------------------------------------

---- skip
--skip_point   : Action
--skip_point = PointAModel skip ("s1")

--skip : AModel
--skip  = 
--  let 
--    e1= "e1"   
--    skipS = [e1]
--    refl ag = List.map (\x->(ag ,x,x)) skipS
--    skipR = [("a",e1,e1)]
--    skipPre  =
--      [("e1", Top)]
--  in 
--     { am_name="Skip"
--      ,am_domain=skipS
--      ,am_relation=skipR
--      ,am_pre=skipPre}

---- reada
--reada : AModel
--reada = 
--  let  npa = "e0"
--       pa  = "e1"
--       name = "Reada"
--       readaS = [npa,pa]
--       readaR  =  [("a",npa,npa),("a",pa,pa)]
--                ++[("b",npa,npa),("b",pa,pa)]++ [("b",npa,pa),("b",pa,npa)]
--       readaPre = [("e1" , Atom "p"),
--                   ("e0" , Not (Atom "p"))]
--  in 
--     { am_name=name
--      ,am_domain=readaS
--      ,am_relation=readaR
--      ,am_pre=readaPre}

--reada_po: Action
--reada_po = PointAModel reada ("pa")
     

---- readb
--readb : AModel
--readb = 
--  let  npb = "npb"
--       pb  = "pb"
--       name = "Readb"
--       readaS = [npb,pb]
--       readaR =   [("a",npb,npb),("a",pb,pb)]++ [("a",npb,pb),("a",pb,npb)]
--                ++[("b",npb,npb),("b",pb,pb)]
--       readaPre = [
--                          ("pb" ,Atom "p"),
--                          ("npb" ,Not (Atom "p"))]
--  in 
--     { am_name=name
--      ,am_domain=readaS
--      ,am_relation=readaR
--      ,am_pre=readaPre}

--readb_po: Action
--readb_po = PointAModel readb ("pb")
  
---- mayReada
--mayReada : Action
--mayReada = 
--  let  npa = "npa"
--       pa  = "pa"
--       t  = "t"
--       name = "MayReada"
--       readaS = [npa,pa,t]
--       readaR  =    [("a", npa,npa),("a",pa,pa),("a",t,t)]
--                 ++ [("b", npa,npa),("b",pa,pa),("b",t,t)]

--                 ++ [("b", npa,pa),("b",pa,npa)]
--                 ++ [("b", npa,t),("b",t,npa)]
--                 ++ [("b",pa,t),("b",t,pa)]
--       readaPre = [ ("pa", Atom "p"),
--                    ("npa", Not (Atom "p")),
--                    ("t", Top)]
--  in PointAModel
--     { am_name=name
--       ,am_domain=readaS
--       ,am_relation=readaR
--       ,am_pre=readaPre}
--     pa

