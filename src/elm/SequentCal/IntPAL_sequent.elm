-- drawProofVis ca4


module IntPAL_sequent exposing (..)

import Common_syntax exposing (..)
import Common_sequent exposing (..)
import Random_formula exposing (createRandomFormula)

import Random exposing (initialSeed)
import List exposing (..)
import Maybe exposing (withDefault)
import Either exposing (Either(..))
--import Debug exposing (Nothing


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
         --| Common (List Agent)   Formula -- C[ab]A
         --| Bigwedge hist (am,ag,e1,e2) a      -- DEL
         --| Bigvee  hist (am,ag,e1,e2) a       -- DEL
         --BoxAction Action Formula -- [α]A-- DEL
         --DiaAction Action Formula -- 〈α〉A-- DEL
         --Precon Pre State         --   pre(s)-- DEL

-------------------------------------------------------------------------------------
-- GPAL rules
-------------------------------------------------------------------------------------

ruleGIntPAL  : List Rule
ruleGIntPAL =[
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
                   LabelForm(boxhis,la,k::restw,Atom p)::[]  ->
                    let
                     add1 =LabelForm (boxhis,la,restw,Atom p)
                    in
                     Just [{seq|rightForm= [add1]++[]}
                            --{-1-} lefts,
                            --{-2-} (ri,[add1]++rightt),
                            --{-3-} forDEL
                            --)
                            ]
                   otherwise -> Nothing}

  ,{ priority=5
    ,category=Rule4LeftFormula
    ,rulename="L[.]"
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
  --,{ priority= 99
  --  ,category=Rule4LeftFormula
  --  ,rulename="L->"
  --  ,rule = \seq -> case seq.leftForm of
  --            LabelForm(boxhis,annf, la, Imply p q)::leftt ->
  --             let
  --               add1=LabelForm(boxhis,annf, la, p)
  --               add2=LabelForm(boxhis,annf, la, q)
  --             in
  --               Just [  {seq |  leftForm =leftt
  --                             , rightForm=[add1]}
  --                      ,{seq | leftForm =[add2]++leftt}
  --                    ]
  --            otherwise -> Nothing}



  ,{ priority=annRN
    ,category=Rule4RightFormula
    ,rulename="R[.]"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,la,annf,Announce p q)::[] ->
                    let
                     add1 =LabelForm(boxhis,la,annf,p)
                     add2 =LabelForm(boxhis,la,annf++[Left p],q)
                    in
                       Just [{seq |   leftForm =[add1]++seq.leftForm
                                     ,rightForm=[add2]++[]
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
                otherwise -> Nothing}

  ,{ priority=ann2RN
    ,category=Rule4RightFormula
    ,rulename="R<.>"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,la,annf,  Announce2 p q)::[] ->
                    let
                     add1=LabelForm(boxhis,la,annf,  p)
                     add2=LabelForm(boxhis,la,annf++[Left p],q)
                    in
                      Just [ {seq|rightForm=[add1]++[]}
                            ,{seq|rightForm=[add2]++[]}
                      ]
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
                RelAtom (ag, (f::annf),(w1,[]),(w2,[]))::[]  ->
                    let
                     add1=LabelForm ([],w1,map (\x->Left x) annf, f)
                     add2=LabelForm ([],w2,map (\x->Left x) annf, f)
                     add3=RelAtom (ag, annf, (w1,[]),(w2,[]))
                    in
                      Just [   {seq | rightRel=[],rightForm=[add1]}
                              ,{seq | rightRel=[],rightForm=[add2]}
                              ,{seq | rightRel=[add3],rightForm=[]}
                      ]
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
                otherwise -> Nothing
               otherwise -> Nothing}

  ,{ priority=cmpRN
    ,category=Rule4RightFormula
    ,rulename="Rcmp"
    ,rule = \seq  -> case seq.rightForm of
                LabelForm(boxhis,w,x::annf,f)::[] -> case x of
                 Left (And p (Announce p1 q))->
                    if p == p1
                    then Nothing else
                     let
                      add1 =LabelForm([], w,annf++[Left p,Left q],f)
                     in
                      Just [{seq | rightForm=[add1]++[]}]
                 otherwise -> Nothing
                otherwise -> Nothing}]

