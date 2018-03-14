module PAL_sequent exposing (..)

import Common_syntax exposing (Formula(..))
import Common_sequent as CommonSeq exposing (Rule,LabelForm(..),RuleCategory(..),RelAtom(..))
import List 
import Either exposing (Either(..)) 

aa = CommonSeq.aa
bb = CommonSeq.bb
cc = CommonSeq.cc
dd = CommonSeq.dd
p1 = CommonSeq.p1
p2 = CommonSeq.p2
p3 = CommonSeq.p3

isPALformula : Formula -> Bool
isPALformula f = case f of
         Top             -> True
         Bot             -> True
         Atom _          -> True
         AnyFormula _    -> True
         Not f           -> isPALformula f
         And f1 f2       -> (isPALformula f1) && (isPALformula f2)
         Or f1 f2        -> (isPALformula f1) && (isPALformula f2)
         Imply f1 f2     -> (isPALformula f1) && (isPALformula f2)
         Imply2 f1 f2    -> (isPALformula f1) && (isPALformula f2)
         Iff f1 f2     -> (isPALformula f1) && (isPALformula f2)
         Dia ag f2       -> (isPALformula f2)
         Box ag f2       -> (isPALformula f2)
         Announce f1 f2  -> (isPALformula f1) && (isPALformula f2)
         Announce2 f1 f2 -> (isPALformula f1) && (isPALformula f2)
         _               -> False
-------------------------------------------------------------------------------------
-- PAL formulas
-------------------------------------------------------------------------------------
--ra1 : Formula
ra1          =  CommonSeq.formula2seq <| Iff (Announce aa p2) (Imply aa p2)
ra2          =  CommonSeq.formula2seq <| Iff (Announce aa (Imply bb cc)) (Imply (Announce aa bb) (Announce aa cc))
ra3          =  CommonSeq.formula2seq <| Iff (Announce aa (Not bb)) (Imply aa (Not (Announce aa bb)))
ra4          =  CommonSeq.formula2seq <| Iff (Announce aa (Box "a"  bb)) (Imply aa (Box "a"  (Announce aa bb)))
ra5 {-x-}    =  CommonSeq.formula2seq <| Iff (Announce aa (Announce bb cc)) (Announce (And aa (Announce aa bb)) cc)
ra5p         =  CommonSeq.formula2seq <| Iff (Announce p1 (Announce p2 p3)) (Announce (And p1 (Announce p1 p2)) p3)

prop1 {-x-}  =  CommonSeq.formula2seq <| Iff (Announce (And aa aa) bb) (Announce aa bb)
prop1p       =  CommonSeq.formula2seq <| Iff (Announce (And p1 p1) p2) (Announce p1 p2)
prop2        =  CommonSeq.formula2seq <| Iff (Announce aa (Announce bb (And (Box "a"  cc) dd))) (Announce (And aa (Announce aa bb)) (And (Box "a"  cc) dd))
prop3        =  CommonSeq.formula2seq <| Iff (Announce aa bb) (Not (Announce2 aa (Not bb)))
prop419a     =  CommonSeq.formula2seq <| Iff (Announce aa (Box "a"  bb)) (Imply aa (Box "a"  (Announce aa bb)))
prop419b     =  CommonSeq.formula2seq <| Iff (Announce2 aa (Box "a"  bb)) (And aa (Box "a"  (Imply aa (Announce2 aa bb))))
prop419c     =  CommonSeq.formula2seq <| Iff (Announce2 aa (Dia "a" bb)) (And aa (Dia "a" (Announce2 aa bb)))
prop421 {-x-}=  CommonSeq.formula2seq <| Announce2 (And aa (Not (Box "b"  aa))) (Dia "a" (Dia "b"  (Not aa)))
prop425      =  CommonSeq.formula2seq <| Iff (And aa (Not (Announce2 aa bb))) (Announce2 aa (Not bb))

-------------------------------------------------------------------------------------
-- GPAL rules
-------------------------------------------------------------------------------------

ruleGPAL  : List Rule
ruleGPAL =[
   { priority=CommonSeq.atLN
    ,category=Rule4LeftFormula
    ,rulename="Lat"
    ,rule = \seq  -> case seq.leftForm of
                  LabelForm (boxhis,la,k::restw,Atom p)::leftt ->
                   let
                    add1 = LabelForm (boxhis,la,restw,Atom p)
                   in Just [{seq|leftForm= [add1]++leftt}
                   ]
                  otherwise -> Nothing }

  ,{ priority=CommonSeq.atRN
    ,category=Rule4RightFormula
    ,rulename="Rat"
    ,rule = \seq -> case seq.rightForm of
                   LabelForm(boxhis,la,k::restw,Atom p)::rightt  ->
                    let
                     add1 =LabelForm (boxhis,la,restw,Atom p)
                    in
                     Just [{seq|rightForm= [add1]++rightt}
                            --{-1-} lefts,
                            --{-2-} (ri,[add1]++rightt),
                            --{-3-} forDEL
                            --)
                            ]
                   otherwise -> Nothing}

  ,{ priority=CommonSeq.annLN
    ,category=Rule4LeftFormula
    ,rulename="L[.]"
    ,rule = \seq  -> case seq.leftForm of
                LabelForm(boxhis,la,annf,  Announce p q)::leftt->
                    let
                     add1 =LabelForm(boxhis,la,annf++[Left p],q)
                     add2 =LabelForm(boxhis,la,annf,p)
                    in
                      Just [
                             {seq | leftForm =leftt
                                    ,rightForm=[add2]++seq.rightForm},
                             {seq | leftForm =[add1]++leftt}
                           ]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.annRN
    ,category=Rule4RightFormula
    ,rulename="R[.]"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,la,annf,Announce p q)::rightt ->
                    let
                     add1 =LabelForm(boxhis,la,annf,p)
                     add2 =LabelForm(boxhis,la,annf++[Left p],q)
                    in
                       Just [
                              {seq |   leftForm =[add1]++seq.leftForm
                                      ,rightForm=[add2]++rightt
                           }
                          ]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.ann2LN
    ,category=Rule4LeftFormula
    ,rulename="L<.>"
    ,rule = \seq  -> case seq.leftForm of
                LabelForm(boxhis,la,annf,  Announce2 p q)::leftt ->
                    let
                     add1=LabelForm(boxhis,la,annf,  p)
                     add2=LabelForm(boxhis,la,annf++[Left p],q)
                    in
                      Just [{seq|leftForm=[add1,add2]++leftt

                      }]
                      --(
                      --      {-1-} (le,[add1,add2]++leftt),
                      --      {-2-} (ri,right),
                      --      {-3-} forDEL
                      --      )]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.ann2RN
    ,category=Rule4RightFormula
    ,rulename="R<.>"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,la,annf,  Announce2 p q)::rightt ->
                    let
                     add1=LabelForm(boxhis,la,annf,  p)
                     add2=LabelForm(boxhis,la,annf++[Left p],q)
                    in
                      Just [ {seq|rightForm=[add1]++rightt}
                            ,{seq|rightForm=[add2]++rightt}
                      ]
                      --(
                      --      {-1-}  lefts,
                      --      {-2-} (ri,[add1]++rightt),
                      --      {-3-} forDEL
                      --      ),(
                      --      {-1-} lefts,
                      --      {-2-} (ri,[add2]++rightt),
                      --      {-3-} forDEL
                      --      )]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.relLN
    ,category=Rule4LeftRel
    ,rulename="Lrel"
    ,rule = \seq -> case seq.leftRel of
                RelAtom (ag,(f::annf),(w1,[]),(w2,[]))::lee ->
                    let
                     add1 =RelAtom (ag, annf, (w1,[]), (w2,[]))
                     add2 =LabelForm ([],w1,List.map (\x->Left x) annf, f)
                     add3 =LabelForm ([],w2,List.map (\x->Left x) annf, f)
                    in
                      Just [{seq | leftRel=[add1]++lee
                                  ,leftForm=[add2,add3]++seq.leftForm
                      }]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.relRN
    ,category=Rule4RightRel
    ,rulename="Rrel"
    ,rule = \seq -> case seq.rightRel of
                RelAtom (ag, (f::annf),(w1,[]),(w2,[]))::rii  ->
                    let
                     add1=LabelForm ([],w1,List.map (\x->Left x) annf, f)
                     add2=LabelForm ([],w2,List.map (\x->Left x) annf, f)
                     add3=RelAtom (ag, annf, (w1,[]),(w2,[]))
                    in
                      Just [   {seq | rightRel=rii,rightForm=[add1]++seq.rightForm}
                              ,{seq | rightRel=rii,rightForm=[add2]++seq.rightForm}
                              ,{seq | rightRel=[add3]++rii}
                      ]
                      --(
                      --      {-1-} lefts,
                      --      {-2-} (rii,[add1]++right),
                      --      {-3-} forDEL
                      --      ),(
                      --      {-1-} lefts,
                      --      {-2-} (rii,[add2]++right),
                      --      {-3-} forDEL
                      --      ),(
                      --      {-1-} lefts,
                      --      {-2-} ([add3]++rii,right),
                      --      {-3-} forDEL
                      --      )]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.cmpLN
    ,category=Rule4LeftFormula
    ,rulename="Lcmp"
    ,rule = \seq  -> case seq.leftForm of
               LabelForm(boxhis,w,x::annf,f)::leftt -> case x of
                Left (And p (Announce p1 q)) ->
                   if p == p1
                   then 
                    let
                     add1 =LabelForm([],w,(annf++[Left p,Left q]), f)
                    in
                      Just [{seq| leftForm=[add1]++leftt}]
                   else Nothing 

                otherwise -> Nothing
               otherwise -> Nothing}

  ,{ priority=CommonSeq.cmpRN
    ,category=Rule4RightFormula
    ,rulename="Rcmp"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,w,x::annf,f)::rightt -> case x of
                 Left (And p (Announce p1 q))->
                    if p == p1
                    then
                     let
                      add1 =LabelForm([], w,annf++[Left p,Left q],f)
                     in
                      Just [{seq | rightForm=[add1]++rightt}]
                    else Nothing 
                 otherwise -> Nothing
                otherwise -> Nothing}]

