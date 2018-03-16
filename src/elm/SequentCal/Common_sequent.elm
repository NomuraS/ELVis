module Common_sequent exposing (..)

import AgentAtom exposing (Agent,State)
import Util  exposing (($>>=))
import Common_syntax as Sy exposing (Action(..),Formula(..),(++++),AMRelation4Sequent)
import Either exposing (Either(..))
import FNV 
import Applicative exposing ((?>))
import Char 
import List.Extra 
import Maybe.Extra
import String.Extra 
import Compare 
 
p1 =(Atom "p1")
p2 =(Atom "p2")
p3 =(Atom "p3")
aa =(AnyFormula "A")
bb =(AnyFormula "B")
cc =(AnyFormula "C")
dd =(AnyFormula "D")

---- classical logic
ca123= And (Imply p1 (Imply p2 p1)) (And (Imply (Imply p1 (Imply p2 p3)) (Imply (Imply p1 p2) (Imply p1 p3))) (Imply (Imply (Not p2) (Not p1)) (Imply p1 p2)))
--- modal logics
axK= formula2seq <| Imply (Box "a"(Imply aa bb)) (Imply (Box "a"aa) (Box "a"bb))
axT=  formula2seq <| Imply (Box "a"  aa) aa
ax4=  formula2seq <| Imply (Box "a"  aa) (Box "a"  (Box "a"  aa))
ax5= formula2seq <| Imply (Not (Box "a"  aa))(Box "a"  (Not (Box "a"  aa)))
ax5p= formula2seq <| Not (Imply (Box "a"  aa) (Box "a"  (Not (Box "a"  aa))))
axB=  formula2seq <| Imply aa (Box "a"  (Dia "a" aa))
axD=  formula2seq <| Not(Box "a" Bot)

---------------------------------------------------------------------------------------
-- type & data
---------------------------------------------------------------------------------------
type alias Label = Int
type alias BoxHistory = List LabelAct
type alias RuleName = String
type alias FormOrAct = Either Formula Action
type alias LabelAct = (Label, List Action)

type       LabelForm  =  LabelForm (BoxHistory,Label,List FormOrAct,Formula)
type       RelAtom   =   RelAtom (Agent,List Formula,LabelAct,LabelAct)
                       | RelAtom_int (Label,Label)
type alias Sequent  =   { leftRel:List RelAtom
                         ,leftForm:List LabelForm
                         ,rightRel:List RelAtom
                         ,rightForm:List LabelForm
                         ,forDEL:AMRelation4Sequent
                        }
type       Proof =  Proof Sequent RuleName (List Proof)
type       RuleCategory =   Rule4LeftRel 
                          | Rule4LeftFormula
                          | Rule4RightRel
                          | Rule4RightFormula
                          | Rule4DEL
                          | Rule4Other
type ProofTex = Proofsty | EbProofsty
type alias Rule = {   
             priority:Int
            ,category:RuleCategory
            ,rulename:String
            ,rule:Sequent -> Maybe (List Sequent)
           }

type alias Branch = { 
             causeSequent:Sequent
            ,appliedRule:Rule
            ,resultSequents:List Sequent
           } 

type       Tree = Tree String (List Tree)

type alias StateA = Proof
-- type alias RuleEx = Proof->Proof
type alias MoveA = Branch 
type alias PathA = (List MoveA, StateA)
type alias FrontierA = List PathA

-- ~#a#b#b~#b~(p1 v p1)

-- moves x =  []
-- moves   : StateA -> List MoveA
moves   : Proof -> List Branch
moves pr =  
  let 
    edges = lookProofEdge pr []
    edgesSeqs = List.map (\(Proof x y z)-> x) edges
  in 
    List.map (makeProofBranch 10 (axiomRule++ruleClassic)) edgesSeqs
    
-- move    : StateA -> MoveA -> StateA
move : Proof -> Branch -> Proof
move pr bran = --(seq1 rule resultseq) =
      -- Proof (Sequent [] [] [] [] []) "" ([])
 let
    edges = lookProofEdge pr []
 in
  pr
  --  List.map (\x-> if x == seq1 then ) edges
  -- (Proof seq rule.name )


-- type       Proof =  Proof Sequent RuleName (List Proof)
-- type alias Rule = {   
--              priority:Int
--             ,category:RuleCategory
--             ,rulename:String
--             ,rule:Sequent -> Maybe (List Sequent)
--            }
-- type alias Branch = { 
--              causeSequent:Sequent
--             ,appliedRule:Rule
--             ,resultSequents:List Sequent
--            } 

-- stable
-- moves   : Proof -> List Rule
-- makeProofBranch :MaxNumberOfExpressionsInANode-> List Rule->  Sequent -> Branch
-- moves : MaxNumberOfExpressionsInANode -> List Rule -> 
--         Proof -> List Rule
-- moves maxNum ruleSet pr =
--   let
--   -- lookProofEdge:Proof->List Proof->List Proof
--     edges = lookProofEdge pr []
--     applyrule s = List.filterMap
--                   (\r->seq2branch s r)
--                   ruleSet
--     leftSeqs1  = List.map (\x-> {seq | leftRel=x}) (Util.rotate seq.leftRel)
--     leftSeqs2  = List.map (\x-> {seq | leftForm=x}) (Util.rotate seq.leftForm)
--     rightSeqs1 = List.map (\x-> {seq | rightRel=x}) (Util.rotate seq.rightRel)
--     rightSeqs2 = List.map (\x-> {seq | rightForm=x})  (Util.rotate seq.rightForm)
--     forDEL1    = List.map (\x-> {seq | forDEL=x})  (Util.rotate seq.forDEL)
--     rules = 
--     branches   = List.concat [leftSeqs1,leftSeqs2,rightSeqs1,rightSeqs2,forDEL1] 
--                 |> Util.nub 
--                 |> List.concatMap applyrule 
--                 |> Util.nub 
--     branchesSorted = List.sortBy (.priority << .appliedRule) branches
--     limitBranch = {causeSequent=seq,appliedRule=ruleLimit,resultSequents=[]}
--     endBranch   = {causeSequent=seq,appliedRule=ruleEnd,  resultSequents=[]}
--     stopBranch  = {causeSequent=seq,appliedRule=ruleStop, resultSequents=[]}
--   in
--      if List.length (seq.leftRel++seq.rightRel) +List.length (seq.leftForm++seq.rightForm)> maxNum
--      then limitBranch
--      else case  branchesSorted of 
--             [] -> if  anyFormulaCheck seq
--                   then stopBranch
--                   else endBranch
--             (a::xs) -> case initCheck branchesSorted of
--                Just b -> sortSeqOfBranch b
--                Nothing->  sortSeqOfBranch a 

-- solved  : Proof -> Bool
solved  : StateA -> Bool
solved pr = 
  let 
    names = lookProofEdgeRules pr
  in
    if List.member "end" names 
    then True 
    else if List.all (\x-> x=="init" || x=="limit" || x=="stop") names
    then True 
    else False


lookProofEdge:Proof->List Proof->List Proof
lookProofEdge (Proof seq name li) results = 
    case li of  
        [] -> (Proof seq name [])::results
        li -> List.concatMap (\a->lookProofEdge a results) li


lookProofEdgeRules : Proof -> List RuleName
lookProofEdgeRules pr = 
    let
     edgePrs =  lookProofEdge pr []
    in 
     List.map (\(Proof x name li)-> name) edgePrs

-- lookProofEdgeRules:Proof->List RuleName->List RuleName
-- lookProofEdgeRules (Proof seq name li) results = 
--     case li of  
--         [] -> name::results
--         li -> List.concatMap (\a->lookProofEdgeRules a results) li

-- solved: StateA -> Bool 
-- solved pr =  
--   let
--     gg (Proof seq rulename rest) = [rulename ]++  (List.concatMap gg rest)
--     ruleList = gg pr
--   in
--     if List.member "end" ruleList  then True
--     else if List.member "stop" ruleList then 9
--     else if List.member "limit" ruleList then 2
--     else 1



  
bfsearch : List StateA -> FrontierA-> Maybe (List MoveA)
bfsearch qs a = case a of 
     [] -> Nothing
     (ms,q)::ps -> if (solved q)
                   then Just ms
                   else if (List.member q  qs)
                   then bfsearch qs ps
                   else bfsearch (q::qs) (ps ++ succs (ms,q))
 
succs :  PathA -> List PathA
succs (ms,q) =  List.map (\m->(ms++[m], move q m)) (moves q)

type alias RandomSeed =
    { randomNumber : Int 
    , maxLengthOfRandomFormula : Int
    }

formula2seq : Formula ->Sequent
formula2seq f = {  leftRel=[]
                  ,leftForm=[]
                  ,rightRel=[]
                  ,rightForm=[LabelForm ([],0,[],f)]
                  ,forDEL=[] 
                }

----------------------------------------------------------------------------------------------
-- inference rules
----------------------------------------------------------------------------------------------

proofSystem : String -> List Rule
proofSystem str = case String.toList str of
 [] ->  []
 a::xs -> case a of
  'K' -> (proofSystem (String.fromList xs))
  'T' -> ruleT++ (proofSystem (String.fromList xs))
  'B' -> ruleB++ (proofSystem (String.fromList xs))
  'D' -> ruleD++ (proofSystem (String.fromList xs))
  '4' -> rule4++ (proofSystem (String.fromList xs))
  '5' -> rule5++ (proofSystem (String.fromList xs))
  'S' ->  case xs of
      [] -> []
      b::ys -> case b of
        '5' -> ruleK++ruleT++rule5
        '4' -> ruleK++ruleT++rule4
        _-> []
  _-> []



----------------------------------------------------------------------------------------------
-- rule priority
----------------------------------------------------------------------------------------------
limitOfSearching =15


-- initial sequents
initN = 0

-- rules for classical logic
negRN = 1
negLN = 1
classicalOne= 2
conjLN  = classicalOne
disjRN  = classicalOne
implRN  = classicalOne
impl2RN = classicalOne
equiRN  = classicalOne
equiLN  = classicalOne
classicalTwo = 5 -- fork
relRN   =classicalTwo -- fork
disjLN  =classicalTwo -- fork
conjRN  =classicalTwo -- fork
implLN  =classicalTwo -- fork
impl2LN =classicalTwo -- fork

-- rules for PAL
atLN  = 1
atRN  = 1
annRN = 3
relLN = 4
annLN = 9 -- fork
ann2LN = 2
ann2RN = 2
cmpLN = 4
cmpRN = 4

-- rules for DEL
atLN_DEL = 1
atRN_DEL = 1
actionRN_DEL = 3
actionLN_DEL = 9 -- fork
action2LN_DEL = 3
action2RN_DEL = 9
cupRN_DEL = 5
cupLN_DEL = 2
relRN_DEL = relRN
relLN_DEL = relLN
bigAndRN_DEL =5
bigAndLN_DEL =20

boxRN1_DEL = 15 -- fresh
boxRN2_DEL = 15 -- fresh
boxLN1_DEL = 16 -- fork
boxLN2_DEL = 16 -- fork
--diaRN_DEL = 16 -- fork
--diaLN_DEL = 16 -- fork
--compRN_DEL =5
--compLN_DEL =2
amodelDefN_DEL =30


-- rules for modal logic
diaRN = 6
diaLN = 6
boxRN = 15 -- fresh
boxLN = 16 -- fork

-- rules for frame properties
refR  = 9
traR  = 9
eucR  = 9
symR  = 9
serR  = 20

-------------------------------------------------------------------------------------
-- initial sequents
-------------------------------------------------------------------------------------

axiomRule  : List Rule
axiomRule  =[
  {  priority=initN
    ,category=Rule4Other
    ,rulename="init"
    ,rule = \seq ->
             let
              deleteBoxHistoty (LabelForm (a,b,c,d)) =  LabelForm ([],b,c,d)
             in 
              if   
                 (Util.exists seq.leftForm (\x-> Util.exists seq.rightForm (\y-> deleteBoxHistoty x==deleteBoxHistoty y)))  -- checkk 合成actionの比較ができない
              || (Util.exists seq.leftRel (\x-> Util.exists seq.rightRel (\y-> x==y)))
              then Just []
              else Nothing}
  ,{ priority=initN
    ,category=Rule4Other
    ,rulename="Top"
    ,rule = \seq ->
                  if Util.exists seq.rightForm (\a->case a of
                                    LabelForm (_,_,_,Top) -> True
                                    otherwise -> False)
                  then Just []
                  else Nothing}

  ,{ priority=initN
    ,category=Rule4Other
    ,rulename="Bot"
    ,rule = \seq ->
                  if Util.exists seq.leftForm (\a->case a of
                                    LabelForm (_,_,_,Bot) -> True
                                    otherwise -> False)
                  then Just []
                  else Nothing}
                  ]

-------------------------------------------------------------------------------------
-- end rules
-------------------------------------------------------------------------------------

ruleEnd : Rule
ruleEnd =
  {  priority=initN
    ,category=Rule4Other
    ,rulename="end"
    ,rule = \x -> Just []}

ruleLimit : Rule 
ruleLimit =
  {  priority=initN
    ,category=Rule4Other
    ,rulename="limit"
    ,rule = \x -> Just []}
ruleStop : Rule
ruleStop =
  {  priority=initN
    ,category=Rule4Other
    ,rulename="stop"
    ,rule = \x -> Just []}

-------------------------------------------------------------------------------------
-- classical rules
-------------------------------------------------------------------------------------
ruleClassic  : List Rule
ruleClassic =[
   { priority=negLN
    ,category=Rule4LeftFormula
    ,rulename="L~"
    ,rule = \seq -> case seq.leftForm of
                LabelForm (boxhis,la, annf, Not p)::leftt ->
                  let
                   add1=LabelForm (boxhis,la, annf, p)
                  in
                   Just [{ seq |  leftForm=leftt
                                 ,rightForm=[add1]++seq.rightForm
                         }
                        ]
                otherwise -> Nothing}

  ,{ priority=negRN
    ,category=Rule4RightFormula
    ,rulename="R~"
    ,rule = \seq -> case seq.rightForm of
                LabelForm(boxhis,la, annf, Not p)::rightt ->
                  let
                   add1=LabelForm(boxhis,la, annf, p)
                  in
                   Just [ {seq | leftForm = [add1]++seq.leftForm
                                ,rightForm= rightt
                          }
                        ]
                otherwise -> Nothing}

  ,{ priority=conjLN
    ,category=Rule4LeftFormula
    ,rulename="L&"
    ,rule = \seq -> case seq.leftForm of
                LabelForm (boxhis,la, annf, And p q)::leftt ->
                  let
                   add1 =LabelForm (boxhis,la, annf, p)
                   add2 =LabelForm (boxhis,la, annf, q)
                  in
                   Just [ {seq | leftForm=[add1,add2]++leftt
                          }
                        ]
                otherwise -> Nothing}

  ,{ priority=conjRN
    ,category=Rule4RightFormula
    ,rulename="R&"
    ,rule = \seq -> case seq.rightForm of
                LabelForm(boxhis,la, annf, And p q)::rightt ->
                 let
                   f1 =LabelForm(boxhis,la, annf, p)
                   f2 =LabelForm(boxhis,la, annf, q)
                 in
                   Just [  {seq | rightForm=[f1]++rightt}
                          ,{seq | rightForm=[f2]++rightt}
                        ]
                otherwise -> Nothing}

  ,{ priority=disjLN
    ,category=Rule4LeftFormula
    ,rulename="Lv"
    ,rule = \seq -> case seq.leftForm of
              LabelForm (boxhis,la, annf, Or p q)::leftt ->
               let
                 add1 =LabelForm(boxhis,la, annf, p)
                 add2 =LabelForm(boxhis,la, annf, q)
               in Just [ {seq | leftForm=[add1]++leftt}
                        ,{seq | leftForm=[add2]++leftt}                
                       ]
              otherwise -> Nothing}

  ,{ priority=disjRN
    ,category=Rule4RightFormula
    ,rulename="Rv"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,la, annf, (Or p q))::rightt ->
               let
                 add1=LabelForm(boxhis,la, annf, p)
                 add2=LabelForm(boxhis,la, annf, q)
               in Just [ {seq | rightForm=[add1,add2]++rightt}
                       ]
              otherwise -> Nothing}

  ,{ priority=implLN
    ,category=Rule4LeftFormula
    ,rulename="L->"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,la, annf, Imply p q)::leftt ->
               let
                 add1=LabelForm(boxhis,la, annf, p)
                 add2=LabelForm(boxhis,la, annf, q)
               in
                 Just [  {seq |  leftForm =leftt
                               , rightForm=[add1]++seq.rightForm}
                        ,{seq | leftForm =[add2]++leftt}
                      ]
              otherwise -> Nothing}

  ,{ priority=implRN
    ,category=Rule4RightFormula
    ,rulename="R->"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,la, annf, Imply p q)::rightt ->
                let
                 add1=LabelForm(boxhis,la, annf, p)
                 add2= LabelForm(boxhis,la, annf, q)
                in
                 Just [{seq |  leftForm =[add1]++seq.leftForm
                              ,rightForm=[add2]++rightt
                       }
                      ]
              otherwise -> Nothing}

  ,{ priority=impl2LN
    ,category=Rule4LeftFormula
    ,rulename="L->2"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,la, annf, Imply2 p q)::leftt ->
                let
                 add1=LabelForm(boxhis,la, annf, q)
                 add2=LabelForm(boxhis,la, annf, p)
                in Just [{seq | leftForm =[add2]++leftt}
                        ,{seq |  leftForm =leftt
                                ,rightForm=[add1]++seq.rightForm}
                        ]
              otherwise -> Nothing}

  ,{ priority=impl2RN
    ,category=Rule4RightFormula
    ,rulename="R->2"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,la, annf, Imply2 p q)::rightt ->
                let
                 add1=LabelForm(boxhis,la, annf, p)
                 add2=LabelForm(boxhis,la, annf, q)
                in 
                 Just [{seq |  leftForm =[add2]++seq.leftForm
                              ,rightForm=[add1]++rightt
                       }
                      ]
              otherwise -> Nothing}

  ,{ priority=equiLN
    ,category=Rule4LeftFormula
    ,rulename="L<->"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,la,annf,(Iff p q))::leftt ->
               let
                 add1=LabelForm(boxhis,la,annf, And (Imply p q)  (Imply q p))
               in Just [ {seq |  leftForm =[add1]++leftt
                         }
                       ]
              otherwise -> Nothing}

  ,{ priority=equiRN
    ,category=Rule4RightFormula
    ,rulename="R<->"
    ,rule = \seq -> case seq.rightForm of
                LabelForm(boxhis,la, annf, (Iff p q))::rightt ->
                 let
                  add1 =LabelForm(boxhis,la, annf, And (Imply p q)  (Imply q p))
                 in
                  Just [{seq |  rightForm =[add1]++rightt
                        }
                       ]
                otherwise -> Nothing}]


--------------------------------------------------------------------
-- ruleK  :: [InferenceRule]
--------------------------------------------------------------------

ruleK  : List Rule
ruleK =[
  { priority= boxRN
   ,category=Rule4RightFormula
   ,rulename="R#"
   ,rule = \seq -> case seq.rightForm of
               LabelForm (boxhis,la,annf, Box ag p)::rightt  ->
                let
                 new = freshLabel seq
                 add1 = RelAtom (ag,Either.lefts annf,(la,[]),(new,[]))
                 add2 = LabelForm (boxhis,new,annf,p)
                in Just [ {seq |  rightForm =[add2]++rightt
                                 ,leftRel =sortRelAtom ([add1]++seq.leftRel)
                          }
                        ]                
               otherwise -> Nothing}

 ,{ priority=boxLN
   ,category=Rule4LeftFormula
   ,rulename="L#"
   ,rule = \seq -> case seq.leftForm of
              LabelForm (boxhis,w,annf,Box ag p)::leftt ->
                let
                 justlabel =  wholeLabel seq
                             |> List.map (\n-> (n,[])) 
                             |> \wholeLabel2-> Util.difference wholeLabel2 boxhis
                             |> List.Extra.last
                 add1 (x,_) = LabelForm ([],x,annf,p)
                 add2 (x,_) = RelAtom (ag,Either.lefts annf,(w,[]),(x,[]))
                 orig (x,xs) = LabelForm ((x,xs)::boxhis,w,annf,Box ag p)
                in
                 justlabel ?> (\x->[
                         {seq | leftForm =[orig x,add1 x]++leftt}
                        ,{seq | leftForm=[orig x]++leftt
                               ,rightRel=[add2 x]++seq.rightRel
                         }
                        ])
              otherwise -> Nothing}

  ,{ priority=boxLN
    ,category=Rule4RightFormula
    ,rulename="R$"
    ,rule = \seq -> case seq.rightForm of
              LabelForm (boxhis,w,annf,Dia ag p)::rightt ->
                let
                 justlabel =  wholeLabel seq
                             |> List.map (\n-> (n,[])) 
                             |> \wholeLabel2 -> Util.difference wholeLabel2 boxhis
                             |> List.head
                 add1 (x,_) = LabelForm ([],x,annf,p)
                 add2 (x,_) = RelAtom (ag,Either.lefts annf,(w,[]),(x,[]))
                 orig (x,xs) = LabelForm ((x,xs)::boxhis,w,annf,Dia ag p)
                in
                 justlabel ?> (\x->[
                         {seq | rightForm =[orig x,add1 x]++rightt}
                        ,{seq | rightForm=[orig x]++rightt
                               ,rightRel=[add2 x]++seq.rightRel
                         }
                        ])
              otherwise -> Nothing}

  ,{ priority=boxRN
    ,category=Rule4LeftFormula
    ,rulename="L$"
    ,rule = \seq -> case seq.leftForm of
               LabelForm (boxhis,la,annf, Dia ag p)::leftt  ->
                let
                 new = freshLabel seq
                 add1 = RelAtom (ag,Either.lefts annf,(la,[]),(new,[]))
                 add2 = LabelForm (boxhis,new,annf,p)
                in Just [ {seq |  leftForm =[add2]++leftt
                                 ,leftRel =sortRelAtom ([add1]++seq.leftRel)
                          }
                        ]                
               otherwise -> Nothing}]


---- functions for rules --------------------------------------------------------------------------------------------
wholeLabel : Sequent->List Int
wholeLabel seq =
    let gg1 = \(LabelForm (_,w,_,_)) -> [w]
        gg2= \x-> case x of
                  (RelAtom (_,_,(w,_),(v,_))) -> [w,v]
                  (RelAtom_int ((w,v))) -> [w,v]
        gg_ :State -> List Int
        gg_  s = 
              String.filter Char.isDigit s
                       |> String.toInt  
                       |> Result.withDefault 0
                       |> \x->[x]
        gg3 = \(ag,am,s1,s2)-> gg_ s1 ++ gg_ s2 
    in Util.nsort <|
          List.concatMap gg1 (seq.leftForm++seq.rightForm)
       ++ List.concatMap gg2 (seq.leftRel++seq.rightRel)
       ++ List.concatMap gg3 seq.forDEL

freshLabel : Sequent->Int -- Label
freshLabel sq =
    let n =  (List.maximum << wholeLabel) sq
    in case n of
        Nothing -> 0
        Just k -> k + 1

---- modal rules ----------------------------------------------------

ruleT : List Rule
ruleT = [
  {  priority=refR
    ,category=Rule4Other
    ,rulename="ref"
    ,rule = \seq ->
          let 
           ref = wholeAgent seq $>>= \ag->
                 wholeLabel seq $>>= \w->
                 [RelAtom (ag,[],(w,[]),(w,[]))]
           seq2 ={seq | leftRel =Util.nub (ref++seq.leftRel) }
          in if sameSeq seq seq2
             then Nothing
             else Just [seq2]
  }
        ]

rule4 : List Rule
rule4 =[
  {  priority=traR
    ,category=Rule4LeftRel
    ,rulename="tran"
    ,rule = \seq -> case seq.leftRel of
            RelAtom (ag,[],x,y)::restl->
                        let
                          ff = tran (RelAtom (ag,[],x,y))
                          le2 = Util.nub <| List.concatMap ff seq.leftRel
                          seq2 ={seq | leftRel =le2}
                        in
                          if sameSeq seq seq2 
                          then Nothing
                          else Just [seq2]
            otherwise -> Nothing}]

tran: RelAtom->RelAtom->List RelAtom
tran exp1 exp2 = case (exp1,exp2) of
    (RelAtom (ag1,[],x,y1),RelAtom (ag2,[],y2,z)) ->
          if ag1==ag2 && y1==y2
          then [exp1,exp2,(RelAtom (ag1,[],x,z))]
          else [exp1,exp2]
    otherwise -> [exp1,exp2]

rule5 : List Rule
rule5 =[
  { priority=eucR
    ,category=Rule4LeftRel
    ,rulename="eucl"
    ,rule = \seq -> case seq.leftRel of
          RelAtom (ag,[],x,y)::restl->
                        let
                         ff = eucl (RelAtom (ag,[],x,y))
                         le2 = Util.nub <| List.concatMap ff seq.leftRel
                         seq2= {seq | leftRel=le2}
                        in
                         if sameSeq seq seq2 
                         then Nothing
                         else Just [seq2]
          otherwise -> Nothing}]

eucl:  RelAtom-> RelAtom->List RelAtom
eucl exp1 exp2 = case (exp1,exp2) of
    (RelAtom (ag1,[],x1,y),RelAtom (ag2,[],x2,z)) ->
                if x1==x2 && ag1==ag2 --&& y/=z
                then [exp1,exp2, RelAtom (ag1,[],y,z),RelAtom (ag1,[],z,y)]
                else [exp1,exp2]
    otherwise -> Util.nub <|[exp1,exp2]

ruleB : List Rule
ruleB =[
  { priority=symR
    ,category=Rule4LeftRel
    ,rulename="symm"
    ,rule = \seq -> case seq.leftRel of
            RelAtom (ag,[],x,y)::restl->
                        let
                         le2 =Util.nub <| seq.leftRel ++[(RelAtom (ag,[],y,x))]
                        in
                         if sameSeq seq {seq | leftRel=le2}
                         then Nothing
                         else Just [{seq | leftRel=le2}]
            otherwise -> Nothing}]

deadEnd :  Sequent -> Maybe Label
deadEnd seq =
  let
    wl = wholeLabel seq
    ff n=List.map
            (\z->case z of
              (RelAtom (_,_,n,(x,[])))->
                if n/=(x,[]) && not (Util.exists seq.leftRel  (\w->case w of --check
                        (RelAtom (_,_,(x1,[]),(x2,[])))-> Left x==Left x1
                        _-> Debug.crash "error in deadEnd (1)"))
                then Just x
                else Nothing
              _->Debug.crash "error in deadEnd (2)"
            )
            seq.leftRel
  in if List.isEmpty seq.leftRel
     then List.head wl
     else Util.maybeBigOr(Util.nub<|List.concatMap ff wl)
-- (0:A ==> ) to (0R1,0:A ==> )
-- (0R1 ==> ) to (0R1,1R2==> )
-- (==> 0R1 ) to (0R2 ==> 0R1)

ruleD : List Rule
ruleD =[
  { priority=serR
    ,category=Rule4Other
    ,rulename="ser"
    ,rule = \seq -> 
                let
                  wholeAg= wholeAgent seq
                  headLa = (deadEnd seq)
                  fresh = freshLabel seq 
                in
                 case headLa of 
                  Nothing -> Nothing
                  Just headLa2 -> 
                    let
                        gg = List.concatMap (\ag->[RelAtom (ag,[], (headLa2,[]), (fresh,[]))]) wholeAg
                    in 
                      if sameSeq seq {seq | leftRel =seq.leftRel++gg}
                      then Nothing
                      else Just [{seq | leftRel =seq.leftRel++gg} ]
  }
 ]
--------------------------------------------------------------------

wholeAgent : Sequent -> List Agent
wholeAgent seq =
--wholeAgent seq =
  let 
   forms =(List.map (\x-> Left x) (seq.leftForm++seq.rightForm))
   rels =(List.map (\x-> Right x) (seq.leftRel++seq.rightRel))
  in 
   Util.nsort <|
   List.concatMap (\x->agentInLabelExpression x []) (forms++rels)

agentInLabelExpression:Either LabelForm RelAtom -> List Agent -> List Agent
agentInLabelExpression x ags =
    let
      gg = \y zs->case y of
              Box ag p ->  gg p (ag::zs)
              Dia ag p -> gg p (ag::zs)
              Not p -> (gg p zs)
              And p q -> (gg p zs) ++ (gg q zs)
              Or p q -> (gg p zs) ++ (gg q zs)
              Imply p q -> (gg p zs) ++ (gg q zs)
              Iff p q -> (gg p zs) ++ (gg q zs)
              Announce p q -> (gg p zs) ++ (gg q zs)
              Announce2 p q -> (gg p zs) ++ (gg q zs)
              otherwise -> zs
    in
      case x of
       Left (LabelForm (boxhist,la,annf,y)) -> gg y ags
       Right (RelAtom (ag,annf, w1, w2))  -> (ag::ags)
       Right (RelAtom_int _)  -> ags


agentInLabelExpression2:RelAtom -> List Agent -> List Agent
agentInLabelExpression2 x li = case x of
       (RelAtom (ag,annf, w1, w2))  ->  (ag::li)
       (RelAtom_int (w1, w2))  ->  li

---------------------------------------------------------------------------------------------
-- sort / compare
---------------------------------------------------------------------------------------------

sameSeq : Sequent -> Sequent -> Bool
sameSeq seq1 seq2=
 let
   a=sortRelAtom (Util.nub seq1.leftRel) ==sortRelAtom (Util.nub seq2.leftRel)
   b=sortRelAtom (Util.nub seq1.rightRel) ==sortRelAtom (Util.nub seq2.rightRel)
   c=List.Extra.isPermutationOf (Util.nub seq1.leftForm) (Util.nub seq2.leftForm)
   d=List.Extra.isPermutationOf (Util.nub seq1.rightForm) (Util.nub seq2.rightForm)
 in
   Util.forall [a,b,c,d] (\x-> x==True)

sortLabelForm: List LabelForm ->List LabelForm
sortLabelForm li =
  let
    gg1 (LabelForm (hist,la,ann,f)) = la
    gg2 (LabelForm (hist,la,ann,f)) = Sy.formula2Int f
    gg3 (LabelForm (hist,la,ann,f)) = List.length ann
  in
    List.sortWith (Compare.by gg1 Compare.thenBy gg2 Compare.thenBy gg3 Compare.ascending) li


sortRelAtom: List RelAtom ->List RelAtom
sortRelAtom li =
  let
    gg1 x = case x of 
            (RelAtom (a,b,c,d)) ->  a
            (RelAtom_int (a,b)) -> Util.show a
    gg2 x = case x of 
            (RelAtom (a,forPAL, (n,lia), d))  -> n
            (RelAtom_int (a,b)) ->  a
    gg3 x = case x of 
            (RelAtom (a,forPAL, d, (n,lia)))  -> n
            (RelAtom_int (a,b)) ->  a
  in
    Compare.by gg1 Compare.thenBy gg2 Compare.thenBy gg3 Compare.ascending 
    |> \x-> List.sortWith x li

sortLeftRightOfSeq: Sequent->Sequent
sortLeftRightOfSeq seq =
  let
    gg = Util.nub << sortRelAtom
    ff = Util.nub << sortLabelForm
  in
    {seq |  leftRel= gg seq.leftRel
           ,leftForm=ff seq.leftForm
           ,rightRel=gg seq.rightRel
           ,rightForm=ff seq.rightForm
    }

sortSeqOfBranch: Branch->Branch
sortSeqOfBranch bra =
 { causeSequent=bra.causeSequent,
   appliedRule=bra.appliedRule,
   resultSequents=List.map sortLeftRightOfSeq  bra.resultSequents}
---------------------------------------------------------------------------------------------
-- inference rule
---------------------------------------------------------------------------------------------

isProvableSeq : MaxNumberOfExpressionsInANode-> List Rule -> Maybe Sequent -> Bool
isProvableSeq maxNum ruleSet seq =  
  case seq of 
    Nothing -> False
    Just seq2 -> 
        let 
          prf = makeProofTree maxNum ruleSet seq2
        in 
          case isProvable prf of  
                1 -> True
                _ -> False
---------------------------------------------------------------------------------------------

type alias Provable = Int -- 0 = not provable, 1=provable, 2=limit

isProvable: Proof -> Provable 
isProvable pr =  
  let
    gg (Proof seq rulename rest) = [rulename ]++  (List.concatMap gg rest)
    ruleList = gg pr
  in
    if List.member "end" ruleList  then 0
    else if List.member "stop" ruleList then 9
    else if List.member "limit" ruleList then 2
    else 1

makeProofTree :MaxNumberOfExpressionsInANode-> List Rule-> Sequent ->Proof
makeProofTree maxNum ruleSet seq =
  let
   move = makeProofBranch maxNum ruleSet seq
  in
   Proof seq
         move.appliedRule.rulename
         (List.map (makeProofTree maxNum ruleSet) move.resultSequents)

anyFormulaCheck:  Sequent -> Bool
anyFormulaCheck  seq = 
  let
    ff (LabelForm (boxHistory,label,ann,formula)) = formula 
    gg f= case f of 
        AnyFormula a -> True
        _ -> False
  in
    Util.or <| List.map (gg<<ff) (seq.leftForm++seq.rightForm)

-- stable
makeProofBranch :MaxNumberOfExpressionsInANode-> List Rule->  Sequent -> Branch
makeProofBranch maxNum ruleSet seq =
  let
    applyrule = \s-> List.filterMap
                  (\r->seq2branch s r)
                  ruleSet
    leftSeqs1  = List.map (\x-> {seq | leftRel=x}) (Util.rotate seq.leftRel)
    leftSeqs2  = List.map (\x-> {seq | leftForm=x}) (Util.rotate seq.leftForm)
    rightSeqs1 = List.map (\x-> {seq | rightRel=x}) (Util.rotate seq.rightRel)
    rightSeqs2 = List.map (\x-> {seq | rightForm=x})  (Util.rotate seq.rightForm)
    forDEL1    = List.map (\x-> {seq | forDEL=x})  (Util.rotate seq.forDEL)
    branches   = List.concat [leftSeqs1,leftSeqs2,rightSeqs1,rightSeqs2,forDEL1] 
                |> Util.nub 
                |> List.concatMap applyrule 
                |> Util.nub 
    branchesSorted = List.sortBy (.priority << .appliedRule) branches
    -- aaa = Debug.log "common_seq 817" branchesSorted 
    limitBranch = {causeSequent=seq,appliedRule=ruleLimit,resultSequents=[]}
    endBranch   = {causeSequent=seq,appliedRule=ruleEnd,  resultSequents=[]}
    stopBranch  = {causeSequent=seq,appliedRule=ruleStop, resultSequents=[]}
  in
     if List.length (seq.leftRel++seq.rightRel) +List.length (seq.leftForm++seq.rightForm)> maxNum
     then limitBranch
     else case  branchesSorted of 
            [] -> if  anyFormulaCheck seq
                  then stopBranch
                  else endBranch
            (a::xs) -> case initCheck branchesSorted of
               Just b -> sortSeqOfBranch b
               Nothing->  sortSeqOfBranch a 
              --  Nothing-> 
              --    let ff = if List.any (\x->noApplicableRule ruleSet x) (Debug.log "aaeaea" a.resultSequents)
              --             then  {a |resultSequents=[]}--a.resultSequents}
              --             else sortSeqOfBranch a
              --    in case a.appliedRule.rulename of
              --       "R&" ->ff              
              --       "Lv" ->ff 
              --       "L#" ->ff 
              --       "R$" ->ff 
              --       otherwise -> sortSeqOfBranch a

-- noApplicableRule : List Rule->   Sequent -> Bool
-- noApplicableRule ruleSet seq =
--   let
--     applyrule = \s-> List.filterMap
--                   (\r->seq2branch s r)
--                   ruleSet
--     leftSeqs1  = List.map (\x-> {seq | leftRel=x}) (Util.rotate seq.leftRel)
--     leftSeqs2  = List.map (\x-> {seq | leftForm=x}) (Util.rotate seq.leftForm)
--     rightSeqs1 = List.map (\x-> {seq | rightRel=x}) (Util.rotate seq.rightRel)
--     rightSeqs2 = List.map (\x-> {seq | rightForm=x})  (Util.rotate seq.rightForm)
--     forDEL1    = List.map (\x-> {seq | forDEL=x})  (Util.rotate seq.forDEL)
--     branches   = List.concat [leftSeqs1,leftSeqs2,rightSeqs1,rightSeqs2,forDEL1] 
--                 |> Util.nub 
--                 |> List.concatMap applyrule 
--                 |> Util.nub 
--   in
--     branches == []
-- faster?
--makeProofBranch :MaxNumberOfExpressionsInANode-> List Rule->  Sequent -> Branch
--makeProofBranch maxNum ruleSet seq =
--  let
--    (leftrel,leftform,rightrel,rightform,rdel,other) = divideRules (basicRules++ruleSet) ([],[],[],[],[],[])
--    applyrule rule = \s-> List.filterMap
--                      (\r->seq2branch s r)
--                     rule 
--    inits  = List.map  (applyrule other) [seq]
--    leftSeqs1  = List.map  (applyrule leftrel)  (List.map (\x-> {seq | leftRel=x}) (Util.rotate seq.leftRel))
--    leftSeqs2  = List.map (applyrule leftform) (List.map (\x-> {seq | leftForm=x}) (Util.rotate seq.leftForm))
--    rightSeqs1 = List.map  (applyrule rightrel)  (List.map (\x-> {seq | rightRel=x}) (Util.rotate seq.rightRel))
--    rightSeqs2 = List.map (applyrule rightform)(List.map (\x-> {seq | rightForm=x})  (Util.rotate seq.rightForm))
--    dELSeqs = List.map (applyrule rdel)(List.map (\x-> {seq | forDEL=x})  (Util.rotate seq.forDEL))
--    branches   = Util.nub <| concat (++leftSeqs1++leftSeqs2++ rightSeqs1++ rightSeqs2)
--    branchesSorted = List.sortBy (.priority << .appliedRule) branches
--    limitBranch = {causeSequent=seq,appliedRule=ruleLimit,resultSequents=[]}
--    endBranch  = {causeSequent=seq,appliedRule=ruleEnd,resultSequents=[]}
--  in
--     if List.length (seq.leftRel++seq.rightRel) +List.length (seq.leftForm++seq.rightForm)> maxNum
--     then limitBranch
--     else case branchesSorted of
--            [] -> endBranch
--            (a::xs) -> case initCheck branchesSorted of
--               Just b -> sortSeqOfBranch b
--               Nothing-> sortSeqOfBranch a


initCheck : List Branch -> Maybe Branch
initCheck li = case li of
  [] -> Nothing
  a::lii ->
          if  Util.forall axiomRule (\x-> 
                  a.resultSequents 
                |>List.map x.rule
                |> Maybe.Extra.combine
                |> \y-> Nothing == y )
          then initCheck lii
          else Just a


seq2branch : Sequent -> Rule -> Maybe Branch
seq2branch seq  rule =
        rule.rule seq ?>
           \x->{causeSequent=seq,
                appliedRule=rule,
                resultSequents=x}

-- divideRules: List Rule
--     -> (List Rule,List Rule,List Rule,List Rule,List Rule,List Rule)
--     -> (List Rule,List Rule,List Rule,List Rule,List Rule,List Rule)
-- divideRules listrule (lrel,lform,rrel,rform,rdel,other)= 
--   case listrule of 
--     x::xs ->  case x.category of 
--         Rule4LeftFormula ->  divideRules xs (lrel,x::lform,rrel,rform,rdel,other)
--         Rule4LeftRel ->      divideRules xs (x::lrel,lform,rrel,rform,rdel,other)
--         Rule4RightFormula -> divideRules xs (lrel,lform,rrel,x::rform,rdel,other)
--         Rule4RightRel ->     divideRules xs (lrel,lform,x::rrel,rform,rdel,other)
--         Rule4DEL ->          divideRules xs (lrel,lform,rrel,rform,x::rdel,other)
--         Rule4Other ->        divideRules xs (lrel,lform,rrel,rform,rdel,x::other)

--     [] -> (lrel,lform,rrel,rform,rdel,other)

--------------------------------------------------------------------------------------------
-- output (labelled expression)
--------------------------------------------------------------------------------------------
outputLabelExp : Int -> LabelForm -> String
outputLabelExp n (LabelForm(boxhist,la,annf,f)) =
  let
    gg  = Util.concatComma  <<  List.map (Sy.outputForm n)
    ff  = Util.concatComma  <<  List.map (\y-> case y of 
                                          PointAModel am s -> Sy.outputAction (PointAModel am s)
                                          _-> Debug.crash "error in error in outputLabelExp (1)") 
    --addhistory = String.repeat (List.length boxhist) "_ " -- add blank space to distinguish sequents which are the same without boxhist
    addhistory1 =  boxhist
                |> List.map (\x-> Util.show (Util.fst x))
                |> Util.toSentenceComma
                |> \x-> if x == "" then x else "(" ++x++")"
    addhistory2 =  boxhist
                |> List.map (\x-> ((Util.fst x |> Util.show) ++","++ (Util.snd x |> List.map action2string |> Util.toSentenceComma )))
                |> Util.toSentenceComma
                |> \x-> if x == "" then x else "(" ++x++")"               
  in
     case  annf of 
      [] -> "<b>"++(toString la)++"</b>:"++addhistory1++"<code>"++(Sy.outputForm n f) ++"</code>"
      a::ax -> case a of
        Left f1 ->  "<b>"++(toString la)++"("++gg (Either.lefts annf)++")</b>:"++addhistory1++"<code>"++(Sy.outputForm n f)++"</code>"
        Right a -> case a of
             PointAModel am s ->  "<b>"++"("++(toString la)++","++ff (Either.rights annf)++")</b>:"++addhistory2++"<code>"++(Sy.outputForm n f)++"</code>"
             _-> Debug.crash "error in outputLabelExp (2)"


action2string : Action -> String
action2string pam = case pam of 
  PointAModel am s-> "("++am.am_name ++","++s++")"
  Cup am1 am2-> action2string am1 ++"U"++ action2string am2
  ComposePoAM am1 am2 -> action2string am1 ++";"++ action2string am2

outputLabelExp2 : Int -> RelAtom -> String
outputLabelExp2 n f =
  let
    gg annouceform = List.map (Sy.outputForm n) annouceform
                    |> Util.concatComma
  in
    case f of
      RelAtom(ag, (a::annf),(w1,[]), (w2,[]))->  "<i>"++(Util.show w1)++"R" ++ag ++ "("++gg (a::annf)++")"++(Util.show w2)++"</i>"
      RelAtom(ag, [], (w1,[]), (w2,[]))-> "<i>"++Util.show w1 ++"R"++ag++Util.show w2++"</i>"
      RelAtom(ag, [], (w1,actions1), (w2,actions2))-> 
                     "<i>"++"("++Util.show w1++","++String.join ","(List.map Sy.outputAction actions1)++")"
                   ++"R"++ag
                   ++"("++Util.show w2++","++String.join ","(List.map Sy.outputAction actions2)++")"++"</i>"
      RelAtom_int (w1,w2)-> Util.show w1 ++"=<"++Util.show w2
      otherwise -> Debug.crash "error in outputLabelExp2"

outputLabelExp3 : AMRelation4Sequent -> String
outputLabelExp3 f =
  let
    gg (ag,ams,x, y) =  "Rel("++String.join ";" (List.map .am_name ams)++")("++ag++")("++ x++","++y++")"
  in
    Util.concatComma <| List.map gg f

outputLabelExp3tex : AMRelation4Sequent -> String
outputLabelExp3tex f =
  let
    gg (ag,ams,x, y) =  x++"\\sim_{"++ag++"}^{"++String.join ";" (List.map .am_name ams)++"}"++y
  in
    Util.concatComma <| List.map gg f

outputSequent : Sequent -> String
outputSequent seq =
  let
    l1 = Util.concatComma (List.map (outputLabelExp2 1) seq.leftRel)
    l2 = Util.concatComma (List.map (outputLabelExp 1) seq.leftForm)
    r1 = Util.concatComma (List.map (outputLabelExp2 1) seq.rightRel)
    r2 = Util.concatComma (List.map (outputLabelExp 1) seq.rightForm)
    ff x y= if (List.isEmpty x) || (List.isEmpty y)
            then ""
            else ","
  in
   case List.isEmpty seq.forDEL of 
    True ->  l1++++(ff seq.leftRel seq.leftForm)++++l2++++"<i><b>==></b></i>"++++r1++++(ff seq.rightRel seq.rightForm)++++r2
            |> String.Extra.clean

    False ->l1++++(ff seq.leftRel seq.leftForm)++++l2++++"<i><b>==></b></i>"++++r1++++(ff seq.rightRel seq.rightForm)++++r2++++"||" ++++ outputLabelExp3 seq.forDEL
            |>  String.Extra.clean

----- ver3
type alias MaxNumberOfExpressionsInANode=Int

drawProof : Proof -> Graph
drawProof derivation =
    let
        --derivation = makeProofTree maxNum ruleSet seq
        isPro =  isProvable derivation
    in
        derivation
      |> proof2tree 
      |> (\x-> tree2vis x []) 
      |> (\y-> addBlank y [])
      |> (\y-> addBlank y [])
      |> (\y-> addBlank y [])
      |> (\z-> list2pairElm z isPro)

--------------------------------x))

proof2tree : Proof -> Tree
proof2tree (Proof x y z) =
  outputSequent x 
  |> \w-> Tree 
          ("(" ++ y ++ ")  " ++ w)
          (List.map proof2tree z)


tree2vis:Tree -> List (String, String)-> List (String, String)
tree2vis (Tree seq results) list_tofrom =
  case results of 
    []-> list_tofrom
    resultss -> resultss
              |> List.map (\(Tree a b)->(seq,a)) 
              |> \x->list_tofrom++ x
              |> \list->(\tree-> tree2vis tree list)
              |> \f-> List.concatMap f results
              |> Util.nub2 


addBlank: List (String, String) ->List (String, String) ->List (String, String)
addBlank li res=
  let
   wholeseq = List.concatMap (\(a,b)-> [a,b])  li
  in
   case li of
    [] -> res
    (from,to)::lii -> if Util.exists wholeseq (\z-> List.member (z,to) lii)
                  then addBlank lii ((from,to++" ")::res)
                  else addBlank lii ((from,to)::res)


---------------------------------------------------------------
  -- for elm
---------------------------------------------------------------

type alias  Node  =
                     { id: Int
                     , label : String
                     , color : Int
                     }

type alias  Edge  = 
                     { id: Int
                     , from: Int
                     , to : Int
                     , label : String
                     }

type alias  Graph  =  { nodes:List Node
                      , edges: List Edge
                      , provable: Int
                      }

splitStringByRoundBraket: String -> (String,String)
splitStringByRoundBraket string  = 
  let
    maybe_n =List.head <| String.indexes ")" string
    a =  maybe_n 
         |> Maybe.map (\n->String.left (n+1) string) 
         |> Maybe.withDefault ""
    b = maybe_n
         |> Maybe.map (\n->String.dropLeft (n+1) string) 
         |> Maybe.withDefault ""
  in
     (a,b) 


drawNodeElm : String -> Node
drawNodeElm string = -- 0 end, 1 init top bot, 2 limit, 3 not end node, 9 stop
    let
        (stringCut, stringCut2)= splitStringByRoundBraket string
    in
        case stringCut of
          "(init)" -> {id=(FNV.hashString string),label=string,color=1} 
          "(Top)" -> {id=(FNV.hashString string),label=string,color=1}
          "(Bot)" -> {id=(FNV.hashString string),label=string,color=1}
          "(end)" -> {id=(FNV.hashString string),label=string,color=0}
          "(limit)" -> {id=(FNV.hashString string),label=string,color=2}
          "(stop)" -> {id=(FNV.hashString string),label=string,color=9}
          otherwise -> {id=(FNV.hashString string),label=stringCut2,color=3}

drawEdgeElm : ( String, String ) -> (List Node, List Edge) 
drawEdgeElm ( string, string1 ) =
    let
        (stringCut, stringCut2)= splitStringByRoundBraket string
        a = [ drawNodeElm string, drawNodeElm string1 ] -- node
        b = [ { id=FNV.hashString (string ++ string1)
              , from=FNV.hashString string
              , to=FNV.hashString string1
              , label=stringCut
              }
            ]
    in
        (a, b)

toGraph : List (List Node,List Edge) -> Graph -> Graph
toGraph pairs result =
  case pairs of  
    [] -> result
    (no,ed)::pairs_ -> toGraph pairs_ {result |  nodes=Util.nub <| result.nodes++no
                                               , edges=Util.nub <| result.edges++ed}

list2pairElm : List ( String, String ) -> Provable -> Graph
list2pairElm xs provable =
  List.map drawEdgeElm xs
  |> Util.nub
  |> \x-> toGraph x { nodes=[]
                    , edges=[]
                    , provable=provable
                    }

--------------------------------------------------------------------------------------------
-- Parser(output/ TeX)
--------------------------------------------------------------------------------------------
drawTexSequent : Sequent->ProofTex -> String
drawTexSequent seq a = 
  let
    leftForm = List.map drawTexLabelForm seq.leftForm
    leftRel = List.map drawTexLabelForm2 seq.leftRel
    rightForm =List.map drawTexLabelForm seq.rightForm
    rightRel = List.map drawTexLabelForm2 seq.rightRel
    forDEL = seq.forDEL
  in
   case a of 
    Proofsty -> 
      if forDEL ==[]
      then (words <| leftForm++leftRel)++"\\Longrightarrow " ++ (words <| rightForm++rightRel)
      else   (words <| leftForm++leftRel)++"\\Longrightarrow " ++ (words <| rightForm++rightRel) ++"\\| "++ (outputLabelExp3tex forDEL) 
    EbProofsty -> 
      if forDEL ==[]
      then (words <| leftForm++leftRel)++"&\\Longrightarrow " ++ (words <| rightForm++rightRel)
      else   (words <| leftForm++leftRel)++"&\\Longrightarrow " ++ (words <| rightForm++rightRel) ++"\\| "++ (outputLabelExp3tex forDEL) 


words : List String -> String
words = Util.concatComma

drawTexLabelForm : LabelForm -> String
drawTexLabelForm l = 
  let
   forml fs = List.map (\f-> drawTexFormula 1 f) fs
              |> words
   gg x = case x of 
    Left a -> drawTexFormula 0 a
    Right a -> Sy.outputAction a
  in 
    case l of 
            LabelForm (hist, w, annf, f) -> (Util.show w )++ "{:}^{" ++ (List.map gg annf |> words)++"}"++ (drawTexFormula 1 f) --++ (forml (List.reverse annf) ) here1

--type alias FormOrAct = Either Formula Action

--type alias LabelAct = (Label, List Action)
showla : LabelAct -> String
showla (a,li) =
  let
    ff = List.map Sy.outputAction li |> words
  in
       case li of 
          []-> Util.show a
          li -> "("++Util.show a++","++ ff++")"

drawTexLabelForm2 : RelAtom -> String
drawTexLabelForm2 r = 
  let
   gg a =  drawTexFormula 0 a
  in
   case r of 
            RelAtom (ag, [], w1,w2) -> showla w1 ++ "\\mathsf{R}^{}_{"++ag++"}"++ showla w2 --(forml annf )++ 
            RelAtom (ag, annf, w1,w2) -> showla w1 ++ "\\mathsf{R}^{"++(List.map gg annf |> words)++ "}_{"++ag++"}"++ showla w2 --(forml annf )++ 
            RelAtom_int (w1,w2) -> (Util.show w1)++++"\\leq"++++ (Util.show w2)

drawTexFormula : Int-> Formula -> String
drawTexFormula n f =
  let 
     kakko k s = if n > k then "(" ++ s ++ ")" else s
  in
    case f of
    Atom i   -> i
    AnyFormula i   -> i
    Top             -> " \\top "
    Bot             -> " \\bot "
    Not  a          -> " \\neg " ++ drawTexFormula 3 a
    Box ag   a          -> "\\Box_{" ++ag++ "}" ++ drawTexFormula 3 a
    Dia ag  a          -> "\\lozenge_{" ++ag++ "}" ++ drawTexFormula 3 a
    Announce a b    -> kakko 3 ("["  ++drawTexFormula 3 a ++ "]"  ++ drawTexFormula 3 b)
    Announce2 a b   -> kakko 3 ("\\langle "  ++drawTexFormula 3 a ++ "\\rangle "  ++ drawTexFormula 3 b)
    And a b        -> kakko 2 (drawTexFormula 3 a ++++ "\\wedge"  ++++ drawTexFormula 3 b)
    Or a b        -> kakko 2 (drawTexFormula 3 a ++++ "\\vee"  ++++ drawTexFormula 3 b)
    Imply a b        -> kakko 1 (drawTexFormula 2 a ++++ "\\to" ++++ drawTexFormula 2 b)
    Imply2 a b        -> kakko 1 (drawTexFormula 2 b ++++ "\\to" ++++ drawTexFormula 2 a)
    Iff a b        -> kakko 1 (drawTexFormula 2 a ++++ "\\leftrightarrow" ++++ drawTexFormula 2 b)
    Bigwedge sts (am,(ag,s1,s2)) f1-> "\\bigwedge_{"++s1++"\\sim_"++ag++"^"++am.am_name++++s2++"}" ++++ (drawTexFormula 1 f1)
    Bigvee   sts (am,(ag,s1,s2)) f1-> "\\bigvee{"++s1++"\\sim_"++ag++"^"++am.am_name++++s2++++"}" ++++ (drawTexFormula 1 f1)
    BoxAction act f-> "["++Sy.outputAction act++"]" ++++ (drawTexFormula 3 f)
    DiaAction act f1 -> "\\langle"++++Sy.outputAction act++++"\\rangle" ++++ (drawTexFormula 3 f)
    Precon am st -> "pre^{"++++ am.am_name ++++"}("++++ st ++++")"

drawTexProof_proofsty : List Proof -> String
drawTexProof_proofsty q =
        "<div>\\documentclass{article}</div>"++
        "<div>\\usepackage{amsmath,amssymb,amsthm}</div>"++
        "<div>\\usepackage{proof}</div>"++
        "<div>\\begin{document}</div>" ++
        "<div>\\begin{tiny}</div>" ++
           (drawTexProof_proofsty2 q)++
        "<div>\\end{tiny}</div>" ++
        "<div>\\end{document}</div>"

drawTexProof_proofsty2 : List Proof -> String
drawTexProof_proofsty2 q = 
  case q of 
    [Proof sq rule next] -> 
      case next of  
        [] -> "\n \\infer[\\mbox{($" ++ (texRule rule) ++"$)}]{"++ (drawTexSequent sq Proofsty) ++"}{}"
        [(Proof sq2 rule2 pr2)] -> "\n \\infer[\\mbox{($" ++  (texRule rule)  ++"$)}]{"++ (drawTexSequent sq Proofsty) ++"}{"++ drawTexProof_proofsty2 [(Proof sq2 rule2 pr2)] ++"}"
        [(Proof sq2 rule2 pr2),(Proof sq3 rule3 pr3)] -> "\n \\infer[\\mbox{($" ++ (texRule rule)  ++"$)}]{"++ (drawTexSequent sq Proofsty) ++"}"++ "{"++ drawTexProof_proofsty2 [(Proof sq2 rule2 pr2)] ++ "\n &"++ drawTexProof_proofsty2 [(Proof sq3 rule3 pr3)] ++"}"
        [(Proof sq2 rule2 pr2),(Proof sq3 rule3 pr3),(Proof sq4 rule4 pr4)] -> "\n \\infer[\\mbox{($" ++ (texRule rule)  ++"$)}]{"++ (drawTexSequent sq Proofsty) ++"}"++ "{"++ drawTexProof_proofsty2 [(Proof sq2 rule2 pr2)] ++ "\n &"++ drawTexProof_proofsty2 [(Proof sq3 rule3 pr3)]++ "\n &"++ drawTexProof_proofsty2 [(Proof sq4 rule4 pr4)] ++"}"
        _->"error in drawTexProof_proofsty2 (1)"
    _->"error in drawTexProof_proofsty2 (2)"

drawTexProof_ebproofsty : List Proof -> String
drawTexProof_ebproofsty  q = 
    "<div>\\documentclass{article}</div>" ++
    "<div>\\usepackage{amsmath,amssymb,amsthm}</div>" ++
    "<div>\\usepackage{ebproof}</div>" ++
    "<div>\\begin{document}</div>"++
    "<div>\\begin{tiny}</div>" ++
    "<div>\\begin{prooftree}</div>" ++
      (drawTexProof_ebproofsty2 q)++
    "<div>\\end{prooftree}</div>" ++
    "<div>\\end{tiny}</div>" ++
    "<div>\\end{document}</div>"


drawTexProof_ebproofsty2 : List Proof -> String
drawTexProof_ebproofsty2 q = 
  case q of 
    [Proof sq rule next] -> 
      case next of  
        [] -> 
                                  "\\Hypo{($" ++ (texRule rule) ++"$)}" ++
                                  "\n \\Infer1[]{"++ (drawTexSequent sq EbProofsty) ++"}"
        [(Proof sq2 rule2 pr2)] -> 
                                  drawTexProof_ebproofsty2 [(Proof sq2 rule2 pr2)] ++
                                  "\n \\Infer1[\\mbox{($" ++  (texRule rule)  ++"$)}]{"++ (drawTexSequent sq EbProofsty) ++"}"
        [(Proof sq2 rule2 pr2),(Proof sq3 rule3 pr3)] -> 
                                  drawTexProof_ebproofsty2 [(Proof sq2 rule2 pr2)] ++ "\n"++
                                  drawTexProof_ebproofsty2 [(Proof sq3 rule3 pr3)] ++
                                  "\n \\Infer2[\\mbox{($" ++ (texRule rule)  ++"$)}]{"++ (drawTexSequent sq EbProofsty) ++"}"
        [(Proof sq2 rule2 pr2),(Proof sq3 rule3 pr3),(Proof sq4 rule4 pr4)] -> 
                                 drawTexProof_ebproofsty2 [(Proof sq2 rule2 pr2)]++ "\n"++ 
                                 drawTexProof_ebproofsty2 [(Proof sq3 rule3 pr3)]++ "\n"++ 
                                 drawTexProof_ebproofsty2 [(Proof sq4 rule4 pr4)]++
                                 "\n \\Infer3[\\mbox{($" ++ (texRule rule)  ++"$)}]{"++ (drawTexSequent sq EbProofsty) ++"}"
        _->"error in drawTexProof_ebproofsty2 (1)"
    _->"error in drawTexProof_ebproofsty2 (2)"

--writeP  x= writeFile
-- "figureTeX.tex" 
-- ("\\documentclass[landscape,a0b,final]{article}\n\\usepackage{amsmath, amssymb,amsthm}\n\\usepackage{proof}\n\\usepackage[truedimen,b4j,landscape,dvipdfm]{geometry}\n\\begin{document}\\tiny{" 
--  ++ x ++ "}\\end{document}")

texRule r = case   r of 
       "R~" -> "R\\neg "
       "L~" -> "L\\neg "
       "R&" -> "R\\wedge "
       "L&" -> "L\\wedge "
       "Rv" -> "R\\vee "
       "Lv" -> "L\\vee "
       "R->" -> "R\\to "
       "R->2" -> "R\\to "
       "L->"  -> "L\\to "
       "R<->" -> "R\\leftrightarrow "
       "L<->" -> "L\\leftrightarrow "
       "R<.>" -> "L\\langle . \\rangle "
       "L<.>" -> "R\\langle . \\rangle "
       "R#" -> "R\\Box "
       "R#1" -> "R\\Box1 "
       "R#2" -> "R\\Box2 "
       "L#" -> "L\\Box "
       "L#1" -> "L\\Box1 "
       "L#2" -> "L\\Box2 "
       "R$" -> "R\\lozenge "
       "L$" -> "L\\lozenge "
       "Bot" -> "L\\bot "
       "Top" -> "R\\top "
       "R&&" -> "R\\wedge'  "
       "L&&" -> "L\\wedge' "
       x -> x






