module DEL_sequent exposing (..)

import AgentAtom exposing (Agent,State)
import Util exposing (($>>=))
import Common_syntax as Sy exposing (Action(..),Formula(..),AMRelation4Sequent,AModel)
import Common_sequent as Seq exposing (LabelForm(..),RelAtom(..),Sequent,RuleCategory(..),Rule)
import List.Extra
import Either exposing (Either(..))
import Applicative exposing ((?>))
import List exposing (..)

-------------------------------------------------------------------------------------
-- DEL formulas
-------------------------------------------------------------------------------------
--ra1 : Formula
--ra1  =    -- ok
--  Iff 
--    (BoxAction Sy.skip_point p1)
--    (Imply  (Precon  [skip] (State "s1")) p1 )
--ra2  =    -- ok
--  Iff 
--    (BoxAction Sy.skip_point (Not(AnyFormula "A")))
--    (Imply  (Precon  [skip] (State "s1")) (Not (BoxAction Sy.skip_point (AnyFormula "A")))   )
--ra3imp =  -- ok
--   Iff 
--    (BoxAction Sy.skip_point (Imply (AnyFormula "A") (AnyFormula "B")))
--    (Imply (BoxAction Sy.skip_point (AnyFormula "A")) (BoxAction Sy.skip_point ( (AnyFormula "B")))) 
--ra3and =  -- ok
--   Iff 
--    (BoxAction Sy.skip_point (And (AnyFormula "A") (AnyFormula "B")))
--    (And (BoxAction Sy.skip_point (AnyFormula "A")) (BoxAction Sy.skip_point ( (AnyFormula "B")))) 

--ra4  =    -- 
--  Iff 
--    (BoxAction Sy.skip_point (Box "a" (AnyFormula "A")))
--    (Imply  (Precon  [skip] (State "s1")) 
--            (Bigwedge [] (skip,("a",State "s1",State "x")) (Box "a" (BoxAction (PointAModel skip (State "x")) (AnyFormula "A"))))   )
--ra4a  =    --
--  Imply
--    (BoxAction Sy.skip_point (Box "a" (AnyFormula "A")))
--    (Imply  (Precon  [skip] (State "s1")) 
--            (Bigwedge [] (skip,("a",State "s1",State "x")) 
--              (Box "a" (BoxAction (PointAModel skip (State "x")) (AnyFormula "A"))))   )
--ra4b  =    --
--  Imply2
--    (BoxAction Sy.skip_point (Box "a" (AnyFormula "A")))
--    (Imply  (Precon  [skip] (State "s1")) 
--            (Bigwedge [] (skip,("a",State "s1",State "x")) (Box "a" (BoxAction (PointAModel skip (State "x")) (AnyFormula "A"))))   )

--ra4x =
--  let
--   skipp = { am_name = "E", am_domain = [], am_relation = [], am_pre = [] }
--   skipp_point= (PointAModel skipp (State "s1")) 
--  in
-- Imply 
--  (BoxAction (skipp_point) (Box "a" (AnyFormula "A"))) 
--  (Imply  (Precon [skipp] (State "s1")) 
--      (Bigwedge [] (skipp,("a",State "s1",State "x")) 
--              (Box "a" (BoxAction (PointAModel skipp (State "x")) (AnyFormula "A")))))

--ra4x =
-- Imply 
--  (BoxAction Sy.skip_point (Box "a" (AnyFormula "A"))) 
--  (Imply  (Precon [skip] (State "s1")) 
--      (Bigwedge [] ({ am_name = "E", am_domain = [], am_relation = [], am_pre = [] },("a",State "s1",State "x")) 
--              (Box "a" (BoxAction (PointAModel skip (State "x")) (AnyFormula "A")))))

p1 =(Atom "p1")
p2 =(Atom "p2")
p3 =(Atom "p3")
aa =(AnyFormula "A")
bb =(AnyFormula "B")
cc =(AnyFormula "C")
dd =(AnyFormula "D")

--ra5   =   -- ok
--  Imply  
--    (BoxAction Sy.skip_point (BoxAction Sy.reada_po (AnyFormula "A")))
--    (BoxAction (Sy.skip_point +++ Sy.reada_po) (AnyFormula "A")) 
ra6  =    -- ok (parser x)
  Iff 
   (BoxAction (Cup Sy.skip_point Sy.reada_po) (AnyFormula "A")) 
   (And (BoxAction Sy.skip_point (AnyFormula "A"))    (BoxAction Sy.reada_po (AnyFormula "A")))

ex638  =  BoxAction Sy.reada_po (Box "a"  p1)
ex639a =  BoxAction Sy.reada_po (Box "b" (Or (Box "a"  p1)  
                                             (Box "a"  (Not p1))))
ex639b =  BoxAction Sy.reada_po (Or (Box "a" p1) 
                                    (Not (Box "a" p1))) 

-------------------------------------------------------------------------------------
-- settings
-------------------------------------------------------------------------------------

forPAL : List Formula
forPAL = [] 

am_relation_f rel ag s = concatMap (\(ag1,s1,s2)->if s==s1 && ag==ag1 then [s2] else []) rel

--------------------------------------------------------------------
  -- rule for knowldge
--------------------------------------------------------------------
substitution4AModel4list_AModels  : List AModel ->List AModel ->List AModel
substitution4AModel4list_AModels listOfAM result =  case listOfAM of 
  []-> result
  amo::rest ->
     let subst = List.map (substPrecondition amo) rest 
     in substitution4AModel4list_AModels subst (amNub result++subst)

substPrecondition : AModel -> AModel-> AModel
substPrecondition amWith amNothing = 
    {amNothing |am_pre=  List.map (\(a,f)-> (a,substitution4AModel f amWith)) (amNothing.am_pre)  }
                
amNub  : List AModel -> List AModel --bug contain?
amNub  xs =  List.foldr
            (\a xss-> 
               if List.member a.am_name (List.map (\x->x.am_name) xss ) 
               then xss 
               else a::xss
            )
            []
            xs

substitution4AModel4list  : Formula -> List AModel -> Formula
substitution4AModel4list f listOfAM = case listOfAM of
  []-> f 
  a::ax-> 
    let
      changed = substitution4AModel f a
    in
      substitution4AModel4list changed ax



substitution4Action  : Action -> AModel -> Action
substitution4Action act ({am_name,am_domain,am_relation,am_pre} as amWith) = 
  let
    gg am = 
        if am.am_name ==amWith.am_name 
        then amWith 
        else am
  in
     case act of 
       PointAModel am2 s ->  (PointAModel (gg am2) s)
       Cup ac1 ac2 -> Cup (substitution4Action ac1 amWith) (substitution4Action ac2 amWith)
       ComposePoAM ac1 ac2 -> ComposePoAM (substitution4Action ac1 amWith) (substitution4Action ac2 amWith)

substitution4AModel  : Formula -> AModel -> Formula
substitution4AModel f  amWith = 
  let
    gg am = if am.am_name == amWith.am_name 
            then amWith 
            else am
  in
      case f of 
        Bigwedge history (amNothing,(ag,s1,s2)) f1->  
          if amNothing.am_name == amWith.am_name
          then  Bigwedge history (amWith,(ag,s1,s2)) (substitution4AModel f1 amWith)
          else  Bigwedge history (amNothing,(ag,s1,s2)) (substitution4AModel f1 amWith)
        Bigvee   history (amNothing,(ag,s1,s2)) f1 -> 
          if amNothing.am_name == amWith.am_name
          then  Bigvee history (amWith,(ag,s1,s2)) (substitution4AModel f1 amWith)
          else  Bigvee history (amNothing,(ag,s1,s2)) (substitution4AModel f1 amWith)
        Precon amNothing s1 -> 
          if amNothing.am_name == amWith.am_name
          then  Precon amWith s1
          else  Precon amNothing s1

        And f1 f2 -> And (substitution4AModel f1 amWith) (substitution4AModel f2 amWith)
        Or f1 f2 -> Or (substitution4AModel f1 amWith) (substitution4AModel f2 amWith)
        Iff f1 f2 -> Iff (substitution4AModel f1 amWith) (substitution4AModel f2 amWith)
        Imply f1 f2 -> Imply (substitution4AModel f1 amWith) (substitution4AModel f2 amWith)
        Imply2 f1 f2 -> Imply2 (substitution4AModel f1 amWith) (substitution4AModel f2 amWith)
        Not f1 -> Not (substitution4AModel f1 amWith)
        Box ag f1 -> Box ag (substitution4AModel f1 amWith)
        Dia ag f1 -> Dia ag (substitution4AModel f1 amWith)
        BoxAction act f1 ->  (BoxAction (substitution4Action act amWith) (substitution4AModel f1 amWith))
        DiaAction act f1 ->  (DiaAction (substitution4Action act amWith) (substitution4AModel f1 amWith))
        _->f
--------------------------------------------------------------------
  -- rule for knowledge
--------------------------------------------------------------------

ruleK_DEL: List Rule
ruleK_DEL =[
   --{ priority=Seq.boxRN1_DEL
   { priority=Seq.boxLN
    ,category=Rule4LeftFormula
    ,rulename="L#1"
    ,rule = \seq  -> case seq.leftForm of
                    LabelForm(boxhis,la,[], Box ag f)::leftt->
                     let
                       justlabel =    Seq.wholeLabel seq
                                     |> List.map (\n-> (n,[])) 
                                     |> \wholeLabel2-> Util.difference wholeLabel2 boxhis
                                     |> List.Extra.last
                       orig (x,xs)= LabelForm ((x,xs)::boxhis,la,[],  Box ag f)                     
                       add1 (x,_) = RelAtom (ag,[], (la,[]), (x,[]))
                       add2 (x,_) = LabelForm([], x,[], f)
                     in
                       justlabel ?> \new-> [ {seq| leftForm=[add2 new]++[orig new]++leftt}
                                            ,{seq| leftForm=[orig new]++leftt
                                                  ,rightRel=[add1 new]++seq.rightRel}
                                           ]
                    otherwise -> Nothing },

   { priority=Seq.boxLN2_DEL
    ,category=Rule4LeftFormula
    ,rulename="L#2"
    ,rule = \seq -> case seq.leftForm of
                LabelForm(boxhis,la,a::actss, Box ag f)::leftt->
                      let 
                        acts = a::actss
                        original (x,ac)=LabelForm((x,ac)::boxhis, la,acts, Box ag f)
                        wholeLabel2 = Util.nub <| Util.cartesian (Seq.wholeLabel seq)  (wholeActions acts ag seq)
                        justLabel = head <| Util.difference wholeLabel2 boxhis
                        add1 (j,ac)= RelAtom (ag,forPAL,( (la,Either.rights acts)), (j,ac))
                        add2 (j,ac)= LabelForm(boxhis, j,map (\x-> Right x) ac,f)    
                      in 
                        justLabel ?> \(x,ac)->[
                                               {seq| leftForm=[original (x,ac)]++[add2 (x,ac)]++leftt}
                                              ,{seq| leftForm=[original (x,ac)]++leftt
                                                    , rightRel=[add1 (x,ac)]++seq.rightRel}
                                              ]
                otherwise -> Nothing },

   { priority=Seq.boxRN
    ,category=Rule4RightFormula
    ,rulename="R#1"
    ,rule = \seq  -> case seq.rightForm of
                    LabelForm(boxhis,la,[],Box ag f)::rightt->
                     let
                       new = Seq.freshLabel seq
                       add1 = RelAtom (ag,forPAL, (la,[]), (new,[]))
                       add2 = LabelForm(boxhis,new,[],f)
                     in 
                       Just [ {seq | leftRel=[add1]++seq.leftRel
                                    ,rightForm=[add2]++rightt }
                            ]
                    otherwise -> Nothing },

   { priority=Seq.boxRN2_DEL
    ,category=Rule4RightFormula
    ,rulename="R#2"
    ,rule = \seq  -> case seq.rightForm of
                    LabelForm(boxhis,la,(Right (PointAModel amodel state))::actss, Box ag f)::rightt->
                      let
                       acts = (Right (PointAModel amodel state))::actss
                       new = Seq.freshLabel seq
                       ooo =  --(Debug.log "DEL_seq1" <| freshVariable forDEL)
                                new
                              |> \newVar-> range newVar (newVar+length acts)
                              |> List.Extra.zip acts
                              |> map (\(x,n) -> case  x of 
                                         Right (PointAModel am s1) -> PointAModel am ("x"++Util.show n)
                                         _-> Debug.crash "error in R#2 (1)"  )
                       add1 = RelAtom (ag,forPAL, (la,Either.rights acts), (new,ooo))
                       add2 = LabelForm([],new,map (\x->Right x) ooo,f)
                       add3 = ooo
                        |> List.map  (\act-> case act  of 
                                             (PointAModel am s1) -> s1
                                             _-> Debug.crash "error in R#2 (2)" )
                        |> List.map (\state2 -> (ag,[amodel], state,state2)) 
                      in
                          Just [{seq|   leftRel=[add1]++seq.leftRel
                                      , rightForm=[add2]++rightt 
                                      , forDEL= add3++seq.forDEL}]
                    otherwise -> Nothing }


  ,{ priority=Seq.diaRN
    ,category=Rule4RightFormula
    ,rulename="R$1"
    ,rule = \seq  -> case seq.rightForm of
                    LabelForm(boxhis,la,[], Dia ag f)::rightt->
                     let
                       justlabel =    Seq.wholeLabel seq
                                     |> List.map (\n-> (n,[])) 
                                     |> \wholeLabel2-> Util.difference wholeLabel2 boxhis
                                     |> head
                       orig (x,xs)= LabelForm ((x,xs)::boxhis,la,[],  Dia ag f)                     
                       add1 (x,_) = RelAtom (ag,[], (la,[]), (x,[]))
                       add2 (x,_) = LabelForm([], x,[], f)
                     in
                       justlabel ?> \new-> [ {seq| rightForm=[add2 new]++[orig new]++rightt}
                                            ,{seq| rightForm=[orig new]++rightt
                                                  ,rightRel=[add1 new]++seq.rightRel}
                                           ]
                    otherwise -> Nothing }


  ,{ priority=Seq.boxLN2_DEL
    ,category=Rule4RightFormula
    ,rulename="R$2"
    ,rule = \seq -> case seq.rightForm of
                LabelForm(boxhis,la,a::actss, Dia ag f)::rightt->
                      let 
                        acts = a::actss
                        original (x,ac)=LabelForm((x,ac)::boxhis, la,acts, Dia ag f)
                        wholeLabel2 = Util.nub <| Util.cartesian (Seq.wholeLabel seq)  (wholeActions acts ag seq)
                        justLabel = head <| Util.difference wholeLabel2 boxhis
                        add1 (j,ac)= RelAtom (ag,forPAL,( (la,Either.rights acts)), (j,ac))
                        add2 (j,ac)= LabelForm(boxhis, j,map (\x-> Right x) ac,f)    
                      in 
                        justLabel ?> \(x,ac)->[
                                               {seq| rightForm=[original (x,ac)]++[add2 (x,ac)]++rightt}
                                              ,{seq| rightForm=[original (x,ac)]++rightt
                                                    , rightRel=[add1 (x,ac)]++seq.rightRel}
                                              ]
                otherwise -> Nothing }




  ,{ priority=Seq.diaLN
    ,category=Rule4LeftFormula
    ,rulename="L$1"
    ,rule = \seq  -> case seq.leftForm of
                    LabelForm(boxhis,la,[],Dia ag f)::leftt->
                     let
                       new = Seq.freshLabel seq
                       add1 = RelAtom (ag,forPAL, (la,[]), (new,[]))
                       add2 = LabelForm(boxhis,new,[],f)
                     in 
                       Just [ {seq | leftRel=[add1]++seq.leftRel
                                    ,leftForm=[add2]++leftt }
                            ]
                    otherwise -> Nothing }

  ,{ priority=Seq.boxRN2_DEL
    ,category=Rule4LeftFormula
    ,rulename="L$2"
    ,rule = \seq  -> case seq.leftForm of
                    LabelForm(boxhis,la,(Right (PointAModel amodel state))::actss, Dia ag f)::leftt->
                      let
                       acts = (Right (PointAModel amodel state))::actss
                       new = Seq.freshLabel seq
                       ooo =  --(Debug.log "DEL_seq1" <| freshVariable forDEL)
                                new
                              |> \newVar-> range newVar (newVar+length acts)
                              |> List.Extra.zip acts
                              |> map (\(x,n) -> case  x of 
                                         Right (PointAModel am s1) -> PointAModel am ("x"++Util.show n)
                                         _-> Debug.crash "error in R#2 (1)"  )
                       add1 = RelAtom (ag,forPAL, (la,Either.rights acts), (new,ooo))
                       add2 = LabelForm([],new,map (\x->Right x) ooo,f)
                       add3 = ooo
                        |> List.map  (\act-> case act  of 
                                             (PointAModel am s1) -> s1
                                             _-> Debug.crash "error in R#2 (2)" )
                        |> List.map (\state2 -> (ag,[amodel], state,state2)) 
                      in
                          Just [{seq|   leftRel=[add1]++seq.leftRel
                                      , leftForm=[add2]++leftt 
                                      , forDEL= add3++seq.forDEL}]
                    otherwise -> Nothing }
        ]


wholeActions: List (Either a Action) -> Agent -> Sequent-> List (List Action)
wholeActions acts ag  seq= 
      let
       gg (ag0,forDEL0) k0 = case k0 of 
        Right (PointAModel am s1) ->
          (List.map (\(ag,amname,e1,e2)-> (amname,e2)) forDEL0) $>>= \(na,s2)-> 
              if member (ag0,na,s1,s2) forDEL0
              then [PointAModel am s2]
              else []
        otherwise-> []
      in 
       case  List.map (gg (ag,seq.forDEL)) acts of --Just [   [(M,s2),(M,s3),(M,s4)],  [(M,s5)],  [(M,s7),(M,s9)]   ]
        [] -> []
        xs ->actionCombi xs --- [   [(M,s2),(M,s5),(M,s7)],  [(M,s2),(M,s5),(M,s9)],  [(M,s3),(M,s5),(M,s7)], ...   ]

actionCombi: List (List a ) ->  List (List a ) 
actionCombi list = 
  let 
   ff xs ys= 
       map singleton xs $>>= \x-> 
       ys $>>= \y->
       [x++y]
  in 
   foldr ff [[]] list

--------------------------------------------------------------------
  -- rules for DEL
--------------------------------------------------------------------

ruleDEL : List Rule
ruleDEL =[
   { priority=Seq.atLN_DEL
    ,category=Rule4LeftFormula
    ,rulename="Lat"
    ,rule = \seq  -> case seq.leftForm of
                    LabelForm (boxhis,la,acts,Atom p)::leftt-> 
                     let 
                      add1 ini=LabelForm (boxhis,la,ini,Atom p)
                     in 
                      (List.Extra.init acts)?>\ini -> [{seq|leftForm=[add1 ini]++leftt}]
                    otherwise -> Nothing },

   { priority=Seq.atRN_DEL
    ,category=Rule4RightFormula
    ,rulename="Rat"
    ,rule = \seq  -> case seq.rightForm of
                    LabelForm (boxhis,la,acts,Atom p)::rightt->
                     let 
                      add1 ini =LabelForm (boxhis,la,ini,Atom p)
                     in 
                      (List.Extra.init acts) ?> \ini -> [{seq|rightForm=[add1 ini]++rightt}]
                    otherwise -> Nothing },

   { priority=Seq.actionLN_DEL
    ,category=Rule4LeftFormula
    ,rulename="L[.]"
    ,rule = \seq  -> case seq.leftForm of
                    LabelForm(boxhis, la,acts, (BoxAction (PointAModel am s) f))::leftt-> 
                      let
                       add1 = LabelForm (boxhis, la,acts, Precon am s)
                       add2 = LabelForm(boxhis, la,[Right (PointAModel am s)]++acts,f)
                      in
                          Just [{seq | leftForm=[add2]++leftt}
                               ,{seq | leftForm=leftt
                                      ,rightForm =[add1]++seq.rightForm}
                          ]
                    otherwise -> Nothing },
    { priority=Seq.actionRN_DEL
    ,category=Rule4RightFormula
    ,rulename="R[.]"
    ,rule = \seq -> case seq.rightForm of
                    LabelForm(boxhis, la,acts, (BoxAction (PointAModel am s) f))::rightt-> 
                      let
                        add1 = LabelForm (boxhis, la,acts, Precon am s)
                        add2 = LabelForm(boxhis, la,[Right (PointAModel am s)]++acts, f)
                      in
                          Just [ {seq | leftForm=[add1]++seq.leftForm
                                        ,rightForm = [add2]++rightt}]
                    otherwise -> Nothing },

   { priority=Seq.action2LN_DEL
    ,category=Rule4LeftFormula
    ,rulename="L<.>"
    ,rule = \seq -> case seq.leftForm of
                    LabelForm(boxhis, la,acts, (DiaAction (PointAModel am s) f))::leftt-> 
                      let 
                        add1 = LabelForm (boxhis, la,acts, Precon am s)
                        add2 = LabelForm(boxhis, la,[Right (PointAModel am s)]++acts, f)
                      in 
                          Just [{seq | leftForm=[add1,add2]++leftt}]
                    otherwise -> Nothing },

   { priority=Seq.action2RN_DEL
    ,category=Rule4RightFormula
    ,rulename="R<.>"
    ,rule = \seq  -> case seq.rightForm of
                    LabelForm(boxhis, la,acts, (DiaAction (PointAModel am s) f))::rightt-> 
                      let 
                       add1 = LabelForm (boxhis, la,acts, Precon am s)
                       add2 = LabelForm(boxhis, la,[Right (PointAModel am s)]++acts,f)                     
                      in 
                          Just [ {seq | rightForm=[add1]++rightt}
                                ,{seq | rightForm=[add2]++rightt}
                               ]
                    otherwise -> Nothing },

   { priority=Seq.cupLN_DEL
    ,category=Rule4LeftFormula
    ,rulename="LU"
    ,rule = \seq  -> case seq.leftForm of
                    LabelForm(boxhis, la,acts, (BoxAction (Cup a b) f))::leftt-> 
                      let
                       add1 =LabelForm(boxhis, la,acts, BoxAction a f)
                       add2 =LabelForm(boxhis, la,acts, BoxAction b f)
                      in
                          Just [{seq | leftForm=[add1,add2]++leftt}]
                    otherwise -> Nothing },

   { priority=Seq.cupRN_DEL
    ,category=Rule4RightFormula
    ,rulename="RU"
    ,rule = \seq  -> case seq.rightForm of
                    LabelForm(boxhis, la,acts, (BoxAction (Cup a b) f))::rightt-> 
                      let 
                       add1=LabelForm(boxhis, la,acts, (BoxAction a f))
                       add2=LabelForm(boxhis, la,acts, (BoxAction b f))
                      in
                          Just [ {seq | rightForm = [add1]++rightt}
                                ,{seq | rightForm = [add2]++rightt}
                          ]
                    otherwise -> Nothing },


   { priority=Seq.cupLN_DEL
    ,category=Rule4LeftFormula
    ,rulename="L;"
    ,rule = \seq -> case seq.leftForm of
                    LabelForm(boxhis, la,acts, (BoxAction (ComposePoAM ac1 ac2) f))::leftt-> 
                      let
                       add1 =LabelForm(boxhis, la,acts, BoxAction (Sy.composeAction ac1 ac2) f)
                      in
                          Just [{seq | leftForm = [add1]++leftt}]
                    otherwise -> Nothing },

   { priority=Seq.cupRN_DEL
    ,category=Rule4RightFormula
    ,rulename="R;"
    ,rule = \seq  -> case seq.rightForm of
                    LabelForm(boxhis, la,acts, (BoxAction (ComposePoAM ac1 ac2) f))::rightt-> 
                      let 
                       add1=LabelForm(boxhis, la,acts, (BoxAction ((Sy.composeAction ac1 ac2)) f))
                      in
                          Just [{seq | rightForm = [add1]++rightt}]
                    otherwise -> Nothing },

   { priority=Seq.relLN_DEL
    ,category=Rule4LeftRel
    ,rulename="Lrel"
    ,rule = \seq  -> case seq.leftRel of
                    RelAtom (ag,[],n,m)::lee -> case (n,m) of
                      ( 
                         (l1,(PointAModel am1 s1)::acs1),
                         (l2,(PointAModel am2 s2)::acs2)
                      ) ->
                        let 
                          add1 =RelAtom (ag,[], (l1, acs1), (l2, acs2))
                          add2 =LabelForm([],l1,map (\x-> Right x) acs1, Precon am1 s1)
                          add3 =LabelForm([],l2,map (\x-> Right x) acs2, Precon am2 s2)
                        in 
                          Just [{seq |  leftRel= [add1]++lee
                                      , leftForm=[add2,add3]++seq.leftForm}]
                      otherwise -> Nothing
                    otherwise -> Nothing },

   { priority=Seq.relRN_DEL
    ,category=Rule4RightRel
    ,rulename="Rrel"
    ,rule = \seq  -> case seq.rightRel of
                    RelAtom (ag,[],n,m)::rii -> case (n,m) of
                        (
                           (l1,(PointAModel am1 s1)::acs1),
                           (l2,(PointAModel am2 s2)::acs2)
                        ) -> 
                          let 
                           add1 =RelAtom (ag,[], (l1, acs1), (l2, acs2)) 
                           add2 =LabelForm([],l1,map (\x-> Right x) acs1, Precon am1 s1)
                           add3 =LabelForm([],l2,map (\x-> Right x) acs2, Precon am2 s2)
                          in 
                          Just [{seq | rightRel=[add1]++rii}
                               ,{seq | rightForm=[add2]++seq.rightForm}
                               ,{seq | rightForm=[add3]++seq.rightForm}
                          ]
                        otherwise -> Nothing
                    otherwise -> Nothing },

   { priority=Seq.bigAndRN_DEL
    ,category=Rule4RightFormula
    ,rulename="R&&"
    ,rule = \seq  -> case seq.rightForm of
               LabelForm(boxhist, w, formOrAct, Bigwedge histR (am,(ag,e1,x)) q)::rightt->
                     let 
                        new =   Seq.freshLabel seq
                              |> Util.show 
                              |> \n-> ("x"++n)
                        add1= LabelForm(boxhist,w,formOrAct, substF (q,(x,new)))
                        add2= (ag,[am],e1,new)
                     in Just [{seq | rightForm = [add1]++rightt
                                    ,forDEL = [add2]++seq.forDEL}]
               otherwise -> Nothing},

   { priority= Seq.bigAndLN_DEL
    ,category=Rule4LeftFormula
    ,rulename="L&&"
    ,rule = \seq  -> case seq.leftForm of
               LabelForm(boxhist, w, formOrAct, Bigwedge histR (am,(ag,e1,e3)) q)::leftt->
                      let 
                        wholeVar = sequent2freevar [] seq
                        justLabel = head<| reverse<|Util.difference  wholeVar histR
                        add1 sel= LabelForm(boxhist,w,formOrAct, substF (q,(e3,sel)))
                        orig z= LabelForm(boxhist, w, formOrAct, Bigwedge (z::histR) (am,(ag,e1,e3)) q)
                      in 
                          justLabel ?>  \x-> [{seq | leftForm=[add1 x]++[orig x]++leftt}]
                          --( 
                          --   {-1-} (le,[add1 x]++[orig x]++leftt),
                          --   {-2-} rights, 
                          --   {-3-} forDEL
                          --        )]
               otherwise -> Nothing},

   { priority=Seq.bigAndRN_DEL
    ,category=Rule4RightFormula
    ,rulename="Rpre"
    ,rule = \seq -> case seq.rightForm of
               LabelForm(boxhist, w, formOrAct, Precon am1 s1)::rightt->
                if String.contains "," s1
                then   let 
                         add1 = Maybe.map (\x-> LabelForm(boxhist, w, formOrAct, (x))) (Sy.lookPre am1.am_pre s1)
                       in Maybe.map (\x-> [{seq | rightForm=[x]++rightt}]) add1
                else Nothing
               otherwise -> Nothing},

   { priority=Seq.bigAndLN_DEL
    ,category=Rule4LeftFormula
    ,rulename="Lpre"
    ,rule = \seq -> case seq.leftForm of
               LabelForm(boxhist, w, formOrAct, Precon am1 s1)::leftt->
                     let 
                         add1 = Maybe.map (\x-> LabelForm(boxhist, w, formOrAct, (x))) (Sy.lookPre am1.am_pre s1)
                         --add1 = LabelForm(boxhist, w, formOrAct, (Sy.lookPre am1.am_pre (State s1)))
                     in Maybe.map (\x->[{seq | leftForm=[x]++leftt}]) add1
               otherwise -> Nothing}
               ]
-------------------------------------------------------------------------------
  --- free and bound variables
-------------------------------------------------------------------------------
action2freevar : List State -> Action -> List State
action2freevar listBoundVar a =case a of 
          PointAModel am a -> state2freevar listBoundVar a
          Cup ac1 ac2 -> (action2freevar listBoundVar ac1) ++ (action2freevar listBoundVar ac2)
          ComposePoAM ac1 ac2 -> (action2freevar listBoundVar ac1) ++ (action2freevar listBoundVar ac2)

state2freevar:List State -> State ->List State
state2freevar listBoundVar s = 
          if not <| member s listBoundVar
                      then [s]

                      else [] 
form2freevar: List State ->Formula ->  List State
form2freevar listBoundVar f = case f of 
                --Atom p ->  Atom p
                --AnyFormula p ->  AnyFormula p
                Not f1 -> (form2freevar listBoundVar f1)
                And f1 f2 ->  (form2freevar listBoundVar f1)++ (form2freevar listBoundVar f2)
                Or f1 f2  ->  (form2freevar listBoundVar f1)++ (form2freevar listBoundVar f2)
                Iff f1 f2  -> (form2freevar listBoundVar f1)++ (form2freevar listBoundVar f2)
                Imply f1 f2  -> (form2freevar listBoundVar f1)++ (form2freevar listBoundVar f2)
                Imply2 f1 f2 -> (form2freevar listBoundVar f1)++ (form2freevar listBoundVar f2)
                Box ag f1    -> (form2freevar listBoundVar f1)
                Dia ag f1    -> (form2freevar listBoundVar f1)
                Bigwedge _ (_,(_,e1,e2)) f1  -> if not <| member e1 listBoundVar
                                                then e1::  (form2freevar (e2::listBoundVar) f1)
                                                else  (form2freevar (e2::listBoundVar) f1)
                Bigvee _ (_,(_,e1,e2)) f1    -> if not <| member e1 listBoundVar
                                                then e1::  (form2freevar (e2::listBoundVar) f1)
                                                else  (form2freevar (e2::listBoundVar) f1)                               
                BoxAction action f1  -> (action2freevar listBoundVar action)++  (form2freevar listBoundVar f1)
                DiaAction action f1  -> (action2freevar listBoundVar action)++  (form2freevar listBoundVar f1)
                Precon pre s   -> state2freevar listBoundVar s
                _-> [] 

labelExp2freevar :  List State->Either LabelForm RelAtom ->  List State
labelExp2freevar listBoundVar a = 
   case a of 
      Left (LabelForm (_,_,acts,f1)) ->
           (concatMap (\a->action2freevar listBoundVar a) (Either.rights acts))
           |>\x->(\y-> x++y)
           <| (form2freevar listBoundVar f1)

      Right (RelAtom(_,forPAL, (_,acts1), (_,acts2))) ->  
           Util.nub <|    concatMap (\a->action2freevar listBoundVar a) (acts1++acts2) 
                  ++ concatMap (\f->form2freevar listBoundVar f) forPAL
      Right (RelAtom_int _) -> [] 

sequent2freevar :  List State->Sequent-> List State
sequent2freevar listBoundVar seq=
  let 
    relatoms= map (\x->Right x) (seq.leftRel++seq.rightRel)
    labelforms = map (\x->Left x) (seq.leftForm++seq.rightForm)
  in
    concatMap (\x->labelExp2freevar listBoundVar x) relatoms
    ++concatMap (\x->labelExp2freevar listBoundVar x) labelforms
--------------------------------------------------------------------
  -- rules with definition of Action models
--------------------------------------------------------------------

ruleAModel : List Rule
ruleAModel = [
   { priority=Seq.amodelDefN_DEL
    ,category=Rule4RightFormula
    ,rulename="R.Definition of AModel_pre"
    ,rule = \seq  -> case seq.rightForm of
               LabelForm(boxhist, w, formOrAct, Precon am s)::rightt->
                 (Debug.log "DEL_seq" <|Sy.lookPre am.am_pre s)
                 |> Maybe.map (\a-> LabelForm (boxhist, w, formOrAct, a))
                 |> Maybe.map (\add1->
                       [{seq | rightForm=[add1]++rightt}
                       ])
               otherwise -> Nothing},

   { priority=Seq.amodelDefN_DEL
    ,category=Rule4LeftFormula
    ,rulename="L.Definition of AModel_pre"
    ,rule = \seq -> case seq.leftForm of
               LabelForm(boxhist, w, formOrAct, Precon am s)::leftt->
                 Sy.lookPre am.am_pre s --(Debug.log "DEL_seq2" <|s) --
                 |> Maybe.map (\f-> LabelForm (boxhist, w, formOrAct, f))
                 |> Maybe.map (\add1->  
                        [{seq | leftForm = [add1]++leftt}
                        ])
               otherwise -> Nothing},

   { priority=Seq.amodelDefN_DEL
    ,category=Rule4DEL
    ,rulename="Definition of AModel_Rel"
    ,rule = \seq  -> case seq.forDEL of
               (ag,ams::amlist,  s1, s2)::forDELL->
                if String.contains "x" s2
                then let  listOfStatesFrom_s1 = 
                              (ams.am_relation) $>>= \(a,x,y)->
                                if x ==s1 && a==ag then [y] else []

                          from_s2 (a,name,x,y) = 
                              (Util.nub listOfStatesFrom_s1) $>>=  \t-> 
                                  [substSeq {seq | forDEL=forDELL} (s2,t)] 
                     in
                        List.map from_s2 seq.forDEL
                            |> \y-> List.concat y
                            |> \x-> if isEmpty  x  then Nothing 
                                    else Just x
                else Nothing                    
               otherwise -> Nothing}
  ]

--------------------------------------------------------------------------------------------
--substitution
--------------------------------------------------------------------------------------------

substSeq : Sequent -> (State, State) -> Sequent 
substSeq seq sp =
  let
    le2=List.map (\x->substRel (x,sp)) seq.leftRel
    ri2=List.map (\x->substRel (x,sp)) seq.rightRel
    left2=List.map (\x->substLabel (x,sp)) seq.leftForm 
    right2=List.map (\x->substLabel (x,sp)) seq.rightForm 
    forDEL2= substForDEL (seq.forDEL,sp)
  in
   { leftRel=le2
    ,leftForm=left2
    ,rightRel=ri2
    ,rightForm=right2
    ,forDEL=forDEL2 
   }


substForDEL : (AMRelation4Sequent, (State, State)) ->AMRelation4Sequent 
substForDEL (forDEL, sp) =  
  let
   ff  (ag, am,s1,s2) =(ag,am, substVar (s1,sp), substVar (s2,sp))
  in
   List.map ff forDEL
      
substRel : (RelAtom, (State, State)) -> RelAtom 
substRel xx =
 case xx of  
  ((RelAtom (agent,forPAL,s1,s2)),sp) ->
    let
      ff  x = case x of 
        PointAModel (listOfAModel) st -> (PointAModel (listOfAModel) (substVar (st,sp)))
        Cup act1 act2 -> Cup (ff act1) (ff act1)
        ComposePoAM act1 act2 -> ComposePoAM (ff act1) (ff act1)
      gg (n, listOfActionn) =  (n, List.map ff listOfActionn)
    in
        RelAtom (agent,forPAL, gg s1, gg s2)
  ((RelAtom_int (s1,s2)),sp) ->(RelAtom_int (s1,s2))


substLabel : (LabelForm, (State, State)) -> LabelForm 
substLabel  
  (LabelForm (boxhis,label,announece,f),sp) =   LabelForm (boxhis,label,announece, substF (f,sp))  

substF : (Formula , (State, State)) -> Formula  --f(v3)[v2/v1]
substF (f,sp) = case f of
                Atom p ->  Atom p
                AnyFormula p ->  AnyFormula p
                Not f1 -> Not (substF (f1,sp))
                And f1 f2 -> And (substF (f1,sp)) (substF (f2,sp))
                Or f1 f2  -> Or (substF (f1,sp)) (substF (f2,sp))
                Iff f1 f2  -> Iff  (substF (f1,sp)) (substF (f2,sp))
                Imply f1 f2  -> Imply  (substF (f1,sp)) (substF (f2,sp))
                Imply2 f1 f2 -> Imply2 (substF (f1,sp)) (substF (f2,sp))
                Box ag f1    -> Box ag (substF (f1,sp))
                Dia ag f1    -> Dia ag (substF (f1,sp))
                Bigwedge states (am,(ag,e1,e2)) f1  ->  Bigwedge states (am,(ag,e1,e2)) (substF (f1,(e1,e2)) )
                Bigvee states (am,(ag,e1,e2)) f1  ->  Bigvee states (am,(ag,e1,e2)) (substF (f1,(e1,e2)) )
                BoxAction ac f1  -> BoxAction (substAM (ac,sp)) (substF (f1,sp))
                Precon listOfAM state -> Precon listOfAM (substVar (state,sp))
            ----    Common ags evs  f1  ->  Common ags evs  (substF f1 sp)
                _ -> Debug.crash "error in substF" 

substAM : (Action , (State, State)) -> Action  --f(v3)[v1/v2]
substAM (ac,(x,y)) = case ac of
                PointAModel am z ->  PointAModel  am (substVar (z,(x,y)))
                Cup a b ->  Cup  (substAM (a,(x,y))) (substAM (b,(x,y)))
                ComposePoAM a b ->  ComposePoAM  (substAM (a,(x,y))) (substAM (b,(x,y)))

substVar : (State , (State, State)) -> State
substVar (v3, (v2,v1)) = 
      if v2 == v3 
      then v1 
      else v3

