module Int_sequent exposing (..)

import Util
import Common_syntax exposing (Formula(..))
import Common_sequent as CommonSeq exposing (RuleCategory(..),Rule,LabelForm(..),RelAtom(..),Rule,Sequent,MaxNumberOfExpressionsInANode)
import List 
import List.Extra  
import Maybe.Extra 
import Either exposing (Either(..))
import Applicative exposing ((?>))

-------------------------------------------------------------------------------------
-- intuitionistic rules
-------------------------------------------------------------------------------------
ruleInt  :  List Rule
ruleInt  =[
   { priority=CommonSeq.negLN
    ,category=Rule4LeftFormula  
    ,rulename="L~"
    ,rule = \seq -> case seq.leftForm of
                LabelForm (boxhis,annf, la, Not p)::leftt ->
                  let
                   add1=LabelForm (boxhis,annf, la, p)
                  in
                   Just [{ seq |  leftForm=leftt
                                 ,rightForm=[add1]
                                 ,rightRel=[]
                         }
                        ]
                otherwise -> Nothing}

  ,{ priority=99
    ,category=Rule4RightFormula
    ,rulename="R~"
    ,rule = \seq -> case (seq.rightForm,seq.rightRel) of
                (LabelForm(boxhis,annf, la, Not p)::[],[]) ->
                  let
                   add1=LabelForm(boxhis,annf, la, p)
                  in
                   Just [ {seq | leftForm = [add1]++seq.leftForm
                                ,rightForm=[] 
                          }
                        ]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.conjLN
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

  ,{ priority=CommonSeq.conjRN
    ,category=Rule4RightFormula
    ,rulename="R&"
    ,rule = \seq -> case (seq.rightForm,seq.rightRel) of
                (LabelForm(boxhis,annf, la, And p q)::[],[]) ->
                 let
                   f1 =LabelForm(boxhis,annf, la, p)
                   f2 =LabelForm(boxhis,annf, la, q)
                 in
                   Just [  {seq | rightForm=[f1]++[]}
                          ,{seq | rightForm=[f2]++[]}
                        ]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.disjLN
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

  ,{ priority=CommonSeq.disjRN
    ,category=Rule4RightFormula
    ,rulename="Rv_int"
    ,rule = \seq -> case (seq.rightForm,seq.rightRel) of
              (LabelForm(boxhis,annf, la, (Or p q))::[],[]) ->
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
                               , rightForm=[add1]
                               , rightRel=[]
                         }
                        ,{seq | leftForm =[add2]++leftt}
                      ]
              otherwise -> Nothing}
  ,{ priority=CommonSeq.implRN
    ,category=Rule4RightFormula
    ,rulename="R->"
    ,rule = \seq -> case (seq.rightForm, seq.rightRel) of
              (LabelForm(boxhis,la, annf, Imply p q)::[],[]) ->
                let
                 add1=LabelForm(boxhis,la, annf, p)
                 add2= LabelForm(boxhis,la, annf, q)
                in
                 Just [{seq |  leftForm =[add1]++seq.leftForm
                              ,rightForm=[add2]++[]
                       }
                      ]
              otherwise -> Nothing}
  ,{ priority= 99
    ,category=Rule4LeftFormula
    ,rulename="L->2"
    ,rule = \seq -> case seq.leftForm of
              LabelForm(boxhis,annf, la, Imply2 p q)::leftt ->
               let
                 add1=LabelForm(boxhis,annf, la, q)
                 add2=LabelForm(boxhis,annf, la, p)
               in
                 Just [  {seq |  leftForm =leftt
                               , rightForm=[add1]
                               , rightRel=[]
                         }
                        ,{seq | leftForm =[add2]++leftt}
                      ]
              otherwise -> Nothing}
  ,{ priority=CommonSeq.implRN
    ,category=Rule4RightFormula
    ,rulename="R->2"
    ,rule = \seq -> case (seq.rightForm, seq.rightRel) of
              (LabelForm(boxhis,la, annf, Imply2 p q)::[],[]) ->
                let
                 add1=LabelForm(boxhis,la, annf, q)
                 add2= LabelForm(boxhis,la, annf, p)
                in
                 Just [{seq |  leftForm =[add1]++seq.leftForm
                              ,rightForm=[add2]++[]
                       }
                      ]
              otherwise -> Nothing}



  ,{ priority=CommonSeq.equiLN
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

  ,{ priority=CommonSeq.equiRN
    ,category=Rule4RightFormula
    ,rulename="R<->"
    ,rule = \seq -> case (seq.rightForm,seq.rightRel) of
                (LabelForm(boxhis,annf, la, (Iff p q))::[],[]) ->
                 let
                  add1 =LabelForm(boxhis,annf, la, And (Imply p q) (Imply q p))
                 in
                  Just [{seq |  rightForm =[add1]++[]
                        }
                       ]
                otherwise -> Nothing}]

-------------
ruleK_int  : List Rule
ruleK_int  =[
  { priority=CommonSeq.boxRN
   ,category=Rule4RightFormula
   ,rulename="R#"
   ,rule = \seq -> case (seq.rightForm,seq.rightRel) of
               (LabelForm (boxhis,la,annf, Box ag p)::[],[])  ->
                let
                 new = CommonSeq.freshLabel seq
                 add1 = RelAtom (ag,Either.lefts annf,(la,[]),(new,[]))
                 add2 = LabelForm (boxhis,new,annf,p)
                in Just [ {seq |  rightForm =[add2]++[]
                                 ,leftRel =CommonSeq.sortRelAtom ([add1]++seq.leftRel)
                          }
                        ]                
               otherwise -> Nothing}

 ,{ priority=99
   ,category=Rule4LeftFormula
   ,rulename="L#_int"
   ,rule = \seq -> case seq.leftForm of
              LabelForm (boxhis,w,annf,Box ag p)::leftt ->
                let
                 justlabel =  CommonSeq.wholeLabel seq
                             |> List.map (\n-> (n,[])) 
                             |> \wholeLabel2-> Util.difference wholeLabel2 boxhis
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

  ,{ priority=CommonSeq.boxLN
    ,category=Rule4RightFormula
    ,rulename="R$_int"
    ,rule = \seq -> case (seq.rightForm,seq.rightRel) of
              (LabelForm (boxhis,w,annf,Dia ag p)::[],[])->
                let
                 justlabel =  CommonSeq.wholeLabel seq
                             |> List.map (\n-> (n,[])) 
                             |> \wholeLabel2 -> Util.difference wholeLabel2 boxhis
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

  --,{ priority=CommonSeq.boxLN
  --  ,category=Rule4RightFormula
  --  ,rulename="R$"
  --  ,rule = \seq -> case seq.rightForm of
  --            LabelForm (boxhis,w,annf,Dia ag p)::[] ->
  --              lookEachDiamond maxNum ruleSet seq
  --            otherwise -> Nothing}

  ,{ priority=CommonSeq.boxRN
    ,category=Rule4LeftFormula
    ,rulename="L$"
    ,rule = \seq -> case seq.leftForm of
               LabelForm (boxhis,la,annf, Dia ag p)::leftt  ->
                let
                 new = CommonSeq.freshLabel seq
                 add1 = RelAtom (ag,Either.lefts annf,(la,[]),(new,[]))
                 add2 = LabelForm (boxhis,new,annf,p)
                in Just [ {seq |  leftForm =[add2]++leftt
                                 ,leftRel =CommonSeq.sortRelAtom ([add1]++seq.leftRel)
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
          if      CommonSeq.isProvableSeq maxNum ruleSet (Just seq1) then Just [seq1]
          else if CommonSeq.isProvableSeq maxNum ruleSet (Just seq2) then Just [seq2]
          else Nothing
      otherwise -> Nothing              


  --,{ priority=CommonSeq.boxLN
  --  ,category=Rule4RightFormula
  --  ,rulename="R$"
  --  ,rule = \seq -> case seq.rightForm of
  --            LabelForm (boxhis,w,annf,Dia ag p)::[] ->
  --              let
  --               justlabel =  CommonSeq.wholeLabel seq
  --                           |> List.map (\n-> (n,[])) 
  --                           |> \CommonSeq.wholeLabel2 -> Util.difference CommonSeq.wholeLabel2 boxhis
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
           justlabel =  CommonSeq.wholeLabel seq
                       |> List.map (\n-> (n,[])) 
                       |> \wholeLabel2 -> Util.difference wholeLabel2 boxhis
                       |> List.head
           add1 (x,_) = LabelForm ([],x,annf,p)
           add2 (x,_) = RelAtom (ag,Either.lefts annf,(w,[]),(x,[]))
           orig (x,xs) = LabelForm ((x,xs)::boxhis,w,annf,Dia ag p)

           seq1 =justlabel ?> \x->{seq | rightForm =[add1 x]++[]}
           seq2 =justlabel ?> \x->{seq | rightRel=[add2 x]++[]}
        in 
          if      CommonSeq.isProvableSeq maxNum ruleSet seq1 then Maybe.Extra.combine [seq1]
          else if CommonSeq.isProvableSeq maxNum ruleSet seq2 then Maybe.Extra.combine [seq2]
          else Nothing
      otherwise -> Nothing                   



