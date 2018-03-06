module PAL_sequent exposing (..)

import Common_syntax exposing (..)
import Common_sequent exposing (..)
import Random_formula exposing (createRandomFormula)
import Random exposing (initialSeed)
import List exposing (..)
import Maybe exposing (withDefault)
import Either exposing (Either(..))

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
ra1          =  formula2seq <| Iff (Announce aa p2) (Imply aa p2)
ra2          =  formula2seq <| Iff (Announce aa (Imply bb cc)) (Imply (Announce aa bb) (Announce aa cc))
ra3          =  formula2seq <| Iff (Announce aa (Not bb)) (Imply aa (Not (Announce aa bb)))
ra4          =  formula2seq <| Iff (Announce aa (Box "a"  bb)) (Imply aa (Box "a"  (Announce aa bb)))
ra5 {-x-}    =  formula2seq <| Iff (Announce aa (Announce bb cc)) (Announce (And aa (Announce aa bb)) cc)
ra5p         =  formula2seq <| Iff (Announce p1 (Announce p2 p3)) (Announce (And p1 (Announce p1 p2)) p3)

prop1 {-x-}  =  formula2seq <| Iff (Announce (And aa aa) bb) (Announce aa bb)
prop1p       =  formula2seq <| Iff (Announce (And p1 p1) p2) (Announce p1 p2)
prop2        =  formula2seq <| Iff (Announce aa (Announce bb (And (Box "a"  cc) dd))) (Announce (And aa (Announce aa bb)) (And (Box "a"  cc) dd))
prop3        =  formula2seq <| Iff (Announce aa bb) (Not (Announce2 aa (Not bb)))
prop419a     =  formula2seq <| Iff (Announce aa (Box "a"  bb)) (Imply aa (Box "a"  (Announce aa bb)))
prop419b     =  formula2seq <| Iff (Announce2 aa (Box "a"  bb)) (And aa (Box "a"  (Imply aa (Announce2 aa bb))))
prop419c     =  formula2seq <| Iff (Announce2 aa (Dia "a" bb)) (And aa (Dia "a" (Announce2 aa bb)))
prop421 {-x-}=  formula2seq <| Announce2 (And aa (Not (Box "b"  aa))) (Dia "a" (Dia "b"  (Not aa)))
prop425      =  formula2seq <| Iff (And aa (Not (Announce2 aa bb))) (Announce2 aa (Not bb))

-------------------------------------------------------------------------------------
-- GPAL rules
-------------------------------------------------------------------------------------

ruleGPAL  : List Rule
ruleGPAL =[
   { priority=atLN
    ,category=Rule4LeftFormula
    ,rulename="Lat"
    ,rule = \seq  -> case seq.leftForm of
                  LabelForm (boxhis,la,k::restw,Atom p)::leftt ->
                   let
                    add1 = LabelForm (boxhis,la,restw,Atom p)
                   in Just [{seq|leftForm= [add1]++leftt}
                   ]
                  otherwise -> Nothing }

  ,{ priority=atRN
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

  ,{ priority=annLN
    ,category=Rule4LeftFormula
    ,rulename="L[.]"
    ,rule = \seq  -> case seq.leftForm of
                LabelForm(boxhis,la,annf,  Announce p q)::leftt->
                    let
                     add1 =LabelForm(boxhis,la,annf++[Left p],q)
                     add2 =LabelForm(boxhis,la,annf,p)
                    in
                      Just [  {seq | leftForm =[add1]++leftt}
                             ,{seq | leftForm =leftt
                                    ,rightForm=[add2]++seq.rightForm}
                           ]
                otherwise -> Nothing}

  ,{ priority=annRN
    ,category=Rule4RightFormula
    ,rulename="R[.]"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,la,annf,Announce p q)::rightt ->
                    let
                     add1 =LabelForm(boxhis,la,annf,p)
                     add2 =LabelForm(boxhis,la,annf++[Left p],q)
                    in
                       Just [{seq |   leftForm =[add1]++seq.leftForm
                                     ,rightForm=[add2]++rightt
                           }
                          ]
                otherwise -> Nothing}

  ,{ priority=ann2LN
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

  ,{ priority=ann2RN
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

  ,{ priority=relLN
    ,category=Rule4LeftRel
    ,rulename="Lrel"
    ,rule = \seq -> case seq.leftRel of
                RelAtom (ag,(f::annf),(w1,[]),(w2,[]))::lee ->
                    let
                     add1 =RelAtom (ag, annf, (w1,[]), (w2,[]))
                     add2 =LabelForm ([],w1,map (\x->Left x) annf, f)
                     add3 =LabelForm ([],w2,map (\x->Left x) annf, f)
                    in
                      Just [{seq | leftRel=[add1]++lee
                                  ,leftForm=[add2,add3]++seq.leftForm
                      }]
                      --(
                      --      {-1-} ([add1]++lee,[add2,add3]++left),
                      --      {-2-} rights,
                      --      {-3-} forDEL
                      --      )]
                otherwise -> Nothing}

  ,{ priority=relRN
    ,category=Rule4RightRel
    ,rulename="Rrel"
    ,rule = \seq -> case seq.rightRel of
                RelAtom (ag, (f::annf),(w1,[]),(w2,[]))::rii  ->
                    let
                     add1=LabelForm ([],w1,map (\x->Left x) annf, f)
                     add2=LabelForm ([],w2,map (\x->Left x) annf, f)
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

  ,{ priority=cmpLN
    ,category=Rule4LeftFormula
    ,rulename="Lcmp"
    ,rule = \seq  -> case seq.leftForm of
               LabelForm(boxhis,w,x::annf,f)::leftt -> case x of
                Left (And p (Announce p1 q)) ->
                   if p == p1
                   then Nothing else
                    let
                     add1 =LabelForm([],w,(annf++[Left p,Left q]), f)
                    in
                      Just [{seq| leftForm=[add1]++leftt}]
                      --(
                      --      {-1-} (le,[add1]++leftt),
                      --      {-2-} rights,
                      --      {-3-} forDEL
                      --      )]
                otherwise -> Nothing
               otherwise -> Nothing}

  ,{ priority=cmpRN
    ,category=Rule4RightFormula
    ,rulename="Rcmp"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,w,x::annf,f)::rightt -> case x of
                 Left (And p (Announce p1 q))->
                    if p == p1
                    then Nothing else
                     let
                      add1 =LabelForm([], w,annf++[Left p,Left q],f)
                     in
                      Just [{seq | rightForm=[add1]++rightt}]
                      --(
                      --      {-1-} lefts,
                      --      {-2-} (ri,[add1]++rightt),
                      --      {-3-} forDEL
                      --      )]
                 otherwise -> Nothing
                otherwise -> Nothing}]

