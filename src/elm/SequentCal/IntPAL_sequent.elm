module IntPAL_sequent exposing (..)

import Common_syntax exposing (Formula(..))
import Common_sequent as CommonSeq exposing (Rule,LabelForm(..),RuleCategory(..),RelAtom(..))
import List 
import Either exposing (Either(..))
--import Common_sequent exposing (..)
--import Maybe --exposing (withDefault)


--drawProof_GPAL: String->Formula -> (List String, List String)
--drawProof_GPAL string f = -- e.g. string == "KB4"
--            if isPALformula f
--            then drawProof (proofSystem (String.toList string)++ruleGIntPAL) (formula2seq f)
--            else Debug.crash "not PAL-formula"


--tesa modeltype n =
--    let 
--        (f, _) = createRandomFormula  modeltype (initialSeed n)
--    in
--        drawProof_GPAL_K f
--drawProof_GPAL_K: Formula -> (List String, List String)
--drawProof_GPAL_K  f =drawProof_GPAL "K" f

--makeDerivation_GPAL = makeDerivation (ruleK++ruleGIntPAL)


-------------------------------------------------------------------------------------
-- GPAL rules
-------------------------------------------------------------------------------------

ruleGIntPAL  : List Rule
ruleGIntPAL =[
   { priority=CommonSeq.atLN
    ,category=Rule4LeftFormula
    ,rulename="Lat.i"
    ,rule = \seq  -> case seq.leftForm of
                  LabelForm (boxhis,la,k::restw,Atom p)::leftt ->
                   let
                    add1 = LabelForm (boxhis,la,restw,Atom p)
                   in Just [{seq|leftForm= [add1]++leftt}
                   ]
                  otherwise -> Nothing }

  ,{ priority=CommonSeq.atRN
    ,category=Rule4RightFormula
    ,rulename="Rat.i"
    ,rule = \seq -> case (seq.rightForm,seq.rightRel) of
                   (LabelForm(boxhis,la,k::restw,Atom p)::[],[])  ->
                    let
                     add1 =LabelForm (boxhis,la,restw,Atom p)
                    in
                     Just [{seq|rightForm= [add1]++[]}
                            ]
                   otherwise -> Nothing}

  ,{ priority=99
    ,category=Rule4LeftFormula
    ,rulename="L[.].i"
    ,rule = \seq  -> case seq.leftForm of
                LabelForm(boxhis,la,annf,  Announce p q)::leftt->
                    let
                     add1 =LabelForm(boxhis,la,annf,p)
                     add2 =LabelForm(boxhis,la,annf++[Left p],q)
                    in
                      Just [  
                              {seq | leftForm =leftt
                                    ,rightForm=[add1]++[]}
                             ,{seq | leftForm =[add2]++leftt}
                           ]
                otherwise -> Nothing}
  ,{ priority=CommonSeq.annRN
    ,category=Rule4RightFormula
    ,rulename="R[.].i"
    ,rule = \seq  -> case  (seq.rightForm, seq.rightRel) of
                (LabelForm(boxhis,la,annf,Announce p q)::[],[]) ->
                    let
                     add1 =LabelForm(boxhis,la,annf,p)
                     add2 =LabelForm(boxhis,la,annf++[Left p],q)
                    in
                       Just [{seq |   leftForm =[add1]++seq.leftForm
                                     ,rightForm=[add2]++[]
                           }
                          ]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.ann2LN
    ,category=Rule4LeftFormula
    ,rulename="L<.>.i"
    ,rule = \seq  -> case seq.leftForm of
                LabelForm(boxhis,la,annf,  Announce2 p q)::leftt ->
                    let
                     add1=LabelForm(boxhis,la,annf,  p)
                     add2=LabelForm(boxhis,la,annf++[Left p],q)
                    in
                      Just [{seq|leftForm=[add1,add2]++leftt

                      }]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.ann2RN
    ,category=Rule4RightFormula
    ,rulename="R<.>.i"
    ,rule = \seq  -> case  (seq.rightForm, seq.rightRel) of
                (LabelForm(boxhis,la,annf,  Announce2 p q)::[],[]) ->
                    let
                     add1=LabelForm(boxhis,la,annf,  p)
                     add2=LabelForm(boxhis,la,annf++[Left p],q)
                    in
                      Just [ {seq|rightForm=[add1]++[]}
                            ,{seq|rightForm=[add2]++[]}
                      ]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.relLN
    ,category=Rule4LeftRel
    ,rulename="Lrel.i"
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
    ,rulename="Rrel.i"
    ,rule = \seq -> case (seq.rightRel,seq.rightForm)  of
                (RelAtom (ag, (f::annf),(w1,[]),(w2,[]))::[],[])  ->
                    let
                     add1=LabelForm ([],w1,List.map (\x->Left x) annf, f)
                     add2=LabelForm ([],w2,List.map (\x->Left x) annf, f)
                     add3=RelAtom (ag, annf, (w1,[]),(w2,[]))
                    in
                      Just [   {seq | rightRel=[],rightForm=[add1]}
                              ,{seq | rightRel=[],rightForm=[add2]}
                              ,{seq | rightRel=[add3],rightForm=[]}
                      ]
                otherwise -> Nothing}

  ,{ priority=CommonSeq.cmpLN
    ,category=Rule4LeftFormula
    ,rulename="Lcmp.i"
    ,rule = \seq  -> case seq.leftForm of
               LabelForm(boxhis,w,x::annf,f)::leftt -> case x of
                Left (And p (Announce p1 q)) ->
                   if p == p1
                   then let
                     add1 =LabelForm([],w,(annf++[Left p,Left q]), f)
                    in
                      Just [{seq| leftForm=[add1]++leftt}]
                   else Nothing 
                otherwise -> Nothing
               otherwise -> Nothing}

  ,{ priority=CommonSeq.cmpRN
    ,category=Rule4RightFormula
    ,rulename="Rcmp.i"
    ,rule = \seq  -> case  (seq.rightForm,seq.rightRel)  of
                (LabelForm(boxhis,w,x::annf,f)::[],[]) -> case x of
                 Left (And p (Announce p1 q))->
                    if p == p1
                    then
                     let
                      add1 =LabelForm([], w,annf++[Left p,Left q],f)
                     in
                      Just [{seq | rightForm=[add1]++[]}]
                    else Nothing
                 otherwise -> Nothing
                otherwise -> Nothing}]

