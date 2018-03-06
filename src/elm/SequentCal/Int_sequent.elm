module Int_sequent exposing (..)

import Util exposing (..)
import Common_syntax exposing (..)
import Common_sequent exposing (..)
import List exposing (..)
import List.Extra exposing (last)
import Maybe exposing (withDefault)
import Maybe.Extra exposing (combine)
import Either exposing (Either(..))
import Applicative exposing (..)



-------------------------------------------------------------------------------------
-- intuitionistic rules
-------------------------------------------------------------------------------------
ruleInt  :  List Rule
ruleInt  =[
   { priority=negLN
    ,category=Rule4LeftFormula
    ,rulename="L~"
    ,rule = \seq -> case seq.leftForm of
                LabelForm (boxhis,annf, la, Not p)::leftt ->
                  let
                   add1=LabelForm (boxhis,annf, la, p)
                  in
                   Just [{ seq |  leftForm=leftt
                                 ,rightForm=[add1]++[]
                         }
                        ]
                otherwise -> Nothing}

  ,{ priority=99
    ,category=Rule4RightFormula
    ,rulename="R~"
    ,rule = \seq -> case seq.rightForm of
                LabelForm(boxhis,annf, la, Not p)::[] ->
                  let
                   add1=LabelForm(boxhis,annf, la, p)
                  in
                   Just [ {seq | leftForm = [add1]++seq.leftForm
                                ,rightForm=[] 
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
                LabelForm(boxhis,annf, la, And p q)::[] ->
                 let
                   f1 =LabelForm(boxhis,annf, la, p)
                   f2 =LabelForm(boxhis,annf, la, q)
                 in
                   Just [  {seq | rightForm=[f1]++[]}
                          ,{seq | rightForm=[f2]++[]}
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
    ,rulename="Rv_int"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,annf, la, (Or p q))::[] ->
               let
                 add1=LabelForm(boxhis,annf, la, p)
                 add2=LabelForm(boxhis,annf, la, q)
               in Just [ {seq | rightForm=[add1]++[]}
                        ,{seq | rightForm=[add2]++[]}
                       ]
              otherwise -> Nothing}


  ,{ priority= 99
    ,category=Rule4LeftFormula
    ,rulename="L->"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,annf, la, Imply p q)::leftt ->
               let
                 add1=LabelForm(boxhis,annf, la, p)
                 add2=LabelForm(boxhis,annf, la, q)
               in
                 Just [  {seq |  leftForm =leftt
                               , rightForm=[add1]}
                        ,{seq | leftForm =[add2]++leftt}
                      ]
              otherwise -> Nothing}

  ,{ priority=implRN
    ,category=Rule4RightFormula
    ,rulename="R->"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,annf, la, Imply p q)::[] ->
                let
                 add1=LabelForm(boxhis,annf, la, p)
                 add2= LabelForm(boxhis,annf, la, q)
                in
                 Just [{seq |  leftForm =[add1]++seq.leftForm
                              ,rightForm=[add2]++[]
                       }
                      ]
              otherwise -> Nothing}

  ,{ priority=impl2LN
    ,category=Rule4LeftFormula
    ,rulename="L->2"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,annf, la, Imply2 p q)::leftt ->
                let
                 add1=LabelForm(boxhis,annf, la, q)
                 add2=LabelForm(boxhis,annf, la, p)
                in Just [{seq | leftForm =[add2]++leftt}
                        ,{seq |  leftForm =leftt
                                ,rightForm=[add1]++[]}
                        ]
              otherwise -> Nothing}

  ,{ priority=impl2RN
    ,category=Rule4RightFormula
    ,rulename="R->2"
    ,rule = \seq -> case seq.rightForm of
              LabelForm(boxhis,annf, la, Imply2 p q)::[]->
                let
                 add1=LabelForm(boxhis,annf, la, p)
                 add2=LabelForm(boxhis,annf, la, q)
                in 
                 Just [{seq |  leftForm =[add2]++seq.leftForm
                              ,rightForm=[add1]++[]
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
                LabelForm(boxhis,annf, la, (Iff p q))::[] ->
                 let
                  add1 =LabelForm(boxhis,annf, la, And (Imply p q)  (Imply q p))
                 in
                  Just [{seq |  rightForm =[add1]++[]
                        }
                       ]
                otherwise -> Nothing}]

-------------
--ruleK_int  :MaxNumberOfExpressionsInANode-> List Rule -> List Rule
ruleK_int  : List Rule
ruleK_int  =[
  { priority=boxRN
   ,category=Rule4RightFormula
   ,rulename="R#"
   ,rule = \seq -> case seq.rightForm of
               LabelForm (boxhis,la,annf, Box ag p)::[]  ->
                let
                 new = freshLabel seq
                 add1 = RelAtom (ag,Either.lefts annf,(la,[]),(new,[]))
                 add2 = LabelForm (boxhis,new,annf,p)
                in Just [ {seq |  rightForm =[add2]++[]
                                 ,leftRel =sortRelAtom ([add1]++seq.leftRel)
                          }
                        ]                
               otherwise -> Nothing}

 ,{ priority=99
   ,category=Rule4LeftFormula
   ,rulename="L#_int"
   ,rule = \seq -> case seq.leftForm of
              LabelForm (boxhis,w,annf,Box ag p)::leftt ->
                let
                 justlabel =  wholeLabel seq
                             |> List.map (\n-> (n,[])) 
                             |> \wholeLabel2-> difference wholeLabel2 boxhis
                             |> List.Extra.last
                 add1 (x,_) = LabelForm ([],x,annf,p)
                 add2 (x,_) = RelAtom (ag,Either.lefts annf,(w,[]),(x,[]))
                 orig (x,xs) = LabelForm ((x,xs)::boxhis,w,annf,Box ag p)
                in
                 justlabel ?> (\x->[
                         {seq | leftForm =[add1 x]++leftt}
                        ,{seq | leftForm=leftt
                               ,rightRel=[add2 x]
                               , rightForm=[]
                         }
                        ])
              otherwise -> Nothing}

  ,{ priority=boxLN
    ,category=Rule4RightFormula
    ,rulename="R$_int"
    ,rule = \seq -> case seq.rightForm of
              LabelForm (boxhis,w,annf,Dia ag p):: []->
                let
                 justlabel =  wholeLabel seq
                             |> List.map (\n-> (n,[])) 
                             |> \wholeLabel2 -> difference wholeLabel2 boxhis
                             |> List.Extra.last 
                 add1 (x,_) = LabelForm ([],x,annf,p)
                 add2 (x,_) = RelAtom (ag,Either.lefts annf,(w,[]),(x,[]))
                 orig (x,xs) = LabelForm ((x,xs)::boxhis,w,annf,Dia ag p)
                in
                 justlabel ?> (\x->[
                         {seq | rightForm =[add1 x]++[]}
                         --{seq | rightForm =[orig x,add1 x]++[]}
                        ,{seq | rightRel=[add2 x]++[]
                                ,rightForm =[]
                         }
                        ])
              otherwise -> Nothing}

  --,{ priority=boxLN
  --  ,category=Rule4RightFormula
  --  ,rulename="R$"
  --  ,rule = \seq -> case seq.rightForm of
  --            LabelForm (boxhis,w,annf,Dia ag p)::[] ->
  --              lookEachDiamond maxNum ruleSet seq
  --            otherwise -> Nothing}

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








lookEachDisjunct : MaxNumberOfExpressionsInANode-> List Rule -> Sequent-> Maybe (List Sequent)
lookEachDisjunct maxNum ruleSet  seq=
    case seq.rightForm of 
      [LabelForm(hist, la,annf, (Or p q))] -> 
        let 
          seq1 = {seq |rightForm=[LabelForm(hist, la,annf, p)]}   
          seq2 = {seq |rightForm=[LabelForm(hist, la,annf, q)]}   
        in 
          if      isProvableSeq maxNum ruleSet (Just seq1) then Just [seq1]
          else if isProvableSeq maxNum ruleSet (Just seq2) then Just [seq2]
          else Nothing
      otherwise -> Nothing              


  --,{ priority=boxLN
  --  ,category=Rule4RightFormula
  --  ,rulename="R$"
  --  ,rule = \seq -> case seq.rightForm of
  --            LabelForm (boxhis,w,annf,Dia ag p)::[] ->
  --              let
  --               justlabel =  wholeLabel seq
  --                           |> List.map (\n-> (n,[])) 
  --                           |> \wholeLabel2 -> difference wholeLabel2 boxhis
  --                           |> head
  --               add1 (x,_) = LabelForm ([],x,annf,p)
  --               add2 (x,_) = RelAtom (ag,Either.lefts annf,(w,[]),(x,[]))
  --               orig (x,xs) = LabelForm ((x,xs)::boxhis,w,annf,Dia ag p)
  --              in
  --               justlabel ?> (\x->[
  --                       {seq | rightForm =[add1 x]++[]}
  --                      ,{seq | rightRel=[add2 x]++[]
  --                       }
  --                      ])
  --            otherwise -> Nothing}

lookEachDiamond : MaxNumberOfExpressionsInANode-> List Rule -> Sequent-> Maybe (List Sequent)
lookEachDiamond maxNum ruleSet  seq=
    case seq.rightForm of 
      [LabelForm(boxhis,w,annf,Dia ag p)] -> 
        let 
           justlabel =  wholeLabel seq
                       |> List.map (\n-> (n,[])) 
                       |> \wholeLabel2 -> difference wholeLabel2 boxhis
                       |> head
           add1 (x,_) = LabelForm ([],x,annf,p)
           add2 (x,_) = RelAtom (ag,Either.lefts annf,(w,[]),(x,[]))
           orig (x,xs) = LabelForm ((x,xs)::boxhis,w,annf,Dia ag p)

           seq1 =justlabel ?> \x->{seq | rightForm =[add1 x]++[]}
           seq2 =justlabel ?> \x->{seq | rightRel=[add2 x]++[]}
        in 
          if      isProvableSeq maxNum ruleSet seq1 then Maybe.Extra.combine [seq1]
          else if isProvableSeq maxNum ruleSet seq2 then Maybe.Extra.combine [seq2]
          else Nothing
      otherwise -> Nothing                   



