module Int_sequent_BiRel exposing (..)

--import AgentAtom exposing (..)
import Util exposing (..)
import Common_syntax exposing (..)
import Common_sequent exposing (..)

--import List exposing (..)
--import Char exposing (isDigit)
import List.Extra exposing (last)
import Maybe exposing (withDefault)
--import Maybe.Extra exposing (combine)
--import String exposing (join)
--import String.Extra exposing (clean)
--import Compare exposing (ascending, by, thenBy)
--import Either exposing (Either(..))
import Applicative exposing (..)
--import Random exposing (step,initialSeed, int,Seed,Generator)
--import Guards exposing (..)


-------------------------------------------------------------------------------------
-- classical rules
-------------------------------------------------------------------------------------

axiomRule_int  : List Rule
axiomRule_int  =[
  {  priority=initN
    ,category=Rule4Other
    ,rulename="init_int"
    ,rule = \seq ->
             let
              deleteBoxHistoty (LabelForm (a,b,c,d)) =  LabelForm ([],b,c,d)
             in 
              if   
                 (exists seq.leftForm (\x-> exists seq.rightForm (\y-> deleteBoxHistoty x==deleteBoxHistoty y)))
              || (exists seq.leftRel (\x-> exists seq.rightRel (\y-> x==y)))
              then Just []
              else Nothing}

  ,{ priority=initN
    ,category=Rule4Other
    ,rulename="Top"
    ,rule = \seq ->
                  if exists seq.rightForm (\a->case a of
                                    LabelForm (_,_,_,Top) -> True
                                    otherwise -> False)
                  then Just []
                  else Nothing}

  ,{ priority=initN
    ,category=Rule4Other
    ,rulename="Bot"
    ,rule = \seq ->
                  if exists seq.leftForm (\a->case a of
                                    LabelForm (_,_,_,Bot) -> True
                                    otherwise -> False)
                  then Just []
                  else Nothing}
                  ]




ruleInt2  : List Rule
ruleInt2 =[
   { priority=negLN
    ,category=Rule4LeftFormula
    ,rulename="L~"
    ,rule = \seq -> case seq.leftForm of
                LabelForm (boxhis,annf, la, Not p)::leftt ->
                  let
                   add1=LabelForm (boxhis,annf, la, Imply p Bot)
                  in
                   Just [{ seq |  leftForm=[add1]++leftt
                         }
                        ]
                otherwise -> Nothing}

  ,{ priority=negRN
    ,category=Rule4RightFormula
    ,rulename="R~"
    ,rule = \seq -> case seq.rightForm of
                LabelForm(boxhis,annf, la, Not p)::rightt ->
                  let
                   add1=LabelForm(boxhis,annf, la, Imply p Bot)
                  in
                   Just [ {seq | rightForm = [add1]++rightt
                          }
                        ]
                otherwise -> Nothing}

  ,{ priority=conjLN
    ,category=Rule4LeftFormula
    ,rulename="L&"
    ,rule = \seq -> case seq.leftForm of
                LabelForm (boxhis,annf, la, And p q)::leftt ->
                  let
                   add1 =LabelForm (boxhis,annf, la, p)
                   add2 =LabelForm (boxhis,annf, la, q)
                  in
                   Just [ {seq | leftForm=[add1,add2]++leftt
                          }
                        ]
                otherwise -> Nothing}

  ,{ priority=conjRN
    ,category=Rule4RightFormula
    ,rulename="R&"
    ,rule = \seq -> case seq.rightForm of
                LabelForm(boxhis,annf, la, And p q)::rightt ->
                 let
                   f1 =LabelForm(boxhis,annf, la, p)
                   f2 =LabelForm(boxhis,annf, la, q)
                 in
                   Just [  {seq | rightForm=[f1]++rightt}
                          ,{seq | rightForm=[f2]++rightt}
                        ]
                otherwise -> Nothing}

  ,{ priority=disjLN
    ,category=Rule4LeftFormula
    ,rulename="Lv"
    ,rule = \seq -> case seq.leftForm of
              LabelForm (boxhis,annf, la, Or p q)::leftt ->
               let
                 add1 =LabelForm(boxhis,annf, la, p)
                 add2 =LabelForm(boxhis,annf, la, q)
               in Just [ {seq | leftForm=[add1]++leftt}
                        ,{seq | leftForm=[add2]++leftt}                
                       ]
              otherwise -> Nothing}

  ,{ priority=disjRN
    ,category=Rule4RightFormula
    ,rulename="Rv"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,annf, la, (Or p q))::rightt ->
               let
                 add1=LabelForm(boxhis,annf, la, p)
                 add2=LabelForm(boxhis,annf, la, q)
               in Just [ {seq | rightForm=[add1,add2]++rightt}
                       ]
              otherwise -> Nothing}

  --,{ priority=implLN
  --  ,category=Rule4Other
  --  ,rulename="mon"
  --  ,rule = \seq -> case seq.leftRel of
  --            RelAtom_int (w1, w2)::leftt ->
  --              if w2
  --               Just [
  --                       {seq | leftForm = []++seq.leftForm}
  --                    ]
  --            otherwise -> Nothing}

  ,{ priority=implLN
    ,category=Rule4LeftFormula
    ,rulename="L->1_int"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,la, annf, Imply p q)::leftt ->
               let
                 justlabel =  wholeLabel seq
                             |> List.map (\n-> (n,[])) 
                             |> \wholeLabel2-> Util.difference wholeLabel2 boxhis
                             |> List.Extra.last
                 add1 (x,_) = LabelForm(boxhis,x, annf, p)
                 add2 (x,_) = LabelForm(boxhis,x, annf, q)
                 add3 (x,_) = RelAtom_int (la, x)
                 orig (x,xs) = LabelForm((x,xs)::boxhis,la, annf, Imply p q)
               in
                case justlabel of 
                  Nothing ->Nothing
                  Just (x,xs) -> if not (la <=x)  then Nothing else 
                 Just [
                         {seq | leftForm = [orig (x,xs),add2 (x,xs)]++leftt}
                        ,{seq | leftForm = [orig (x,xs)]++leftt
                               ,rightForm =[add1 (x,xs)]++seq.rightForm
                               ,rightRel = [add3 (x,xs)]++seq.rightRel
                         }
                      ]
              otherwise -> Nothing}

 ,{ priority= boxRN
   ,category=Rule4RightFormula
   ,rulename="R->1_int"
   ,rule = \seq -> case seq.rightForm of
               LabelForm (boxhis,la,annf, Imply p q)::rightt  ->
                let
                 new = freshLabel seq
                 add1 = RelAtom_int (la,new)
                 add2 = LabelForm (boxhis,new,annf,p)
                 add3 = LabelForm (boxhis,new,annf,q)
                in Just [ {seq | leftRel  =sortRelAtom ([add1]++seq.leftRel)
                                ,leftForm =([add2]++seq.leftForm)
                                ,rightForm =[add3]++rightt
                                 
                          }
                        ]                
               otherwise -> Nothing}



  ,{ priority=impl2LN
    ,category=Rule4LeftFormula
    ,rulename="L->2"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,annf, la, Imply2 p q)::leftt ->
                let
                 add1=LabelForm(boxhis,annf, la, Imply q p)
                in Just [{seq | leftForm =[add1]++leftt}
                        ]
              otherwise -> Nothing}

  ,{ priority=impl2RN
    ,category=Rule4RightFormula
    ,rulename="R->2"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,annf, la, Imply2 p q)::rightt ->
                let
                 add1=LabelForm(boxhis,annf, la, Imply q p)
                in 
                 Just [{seq |  leftForm =[add1]++rightt
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
                LabelForm(boxhis,annf, la, (Iff p q))::rightt ->
                 let
                  add1 =LabelForm(boxhis,annf, la, And (Imply p q)  (Imply q p))
                 in
                  Just [{seq |  rightForm =[add1]++rightt
                        }
                       ]
                otherwise -> Nothing}]

