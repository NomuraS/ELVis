module DEL_semantics exposing (..)

import AgentAtom exposing (Agent,State)
import Util exposing ((==>),($>>=))
import Common_syntax as Sy exposing (AModel, Formula(..),Action(..),(+++),AtomBool,FormulaBool)
import EModel exposing (EModel,PointEModel(..),World)
import Result
import Applicative exposing (..)


-- error
--D.composeKM D.testKM D.testAM
-- ok
--D.composeKM D.testKM D.testAM2

testKM:EModel
testKM=
   { 
   em_name = "MuddyChildren", 
   em_domain = ["000","100","001","010","011","110","101","111"], 
   em_relation = [("a","000","100"),("a","100","000"),("a","010","110"),("a","110","010"),("a","001","101"),("a","101","001"),("a","011","111"),("a","111","011"),("b","000","010"),("b","010","000"),("b","100","110"),("b","110","100"),("b","001","011"),("b","011","001"),("b","101","111"),("b","111","101"),("c","000","001"),("c","001","000"),("c","010","011"),("c","011","010"),("c","100","101"),("c","101","100"),("c","110","111"),("c","111","110"),("a","000","000"),("a","100","100"),("a","001","001"),("a","010","010"),("a","011","011"),("a","110","110"),("a","111","111")], 
   em_value = [("p1",["111","101","100","110"]),("p0",["011","001","000","010"]),("q1",["010","111","110","011"]),("q0",["000","101","100","001"]),("r1",["001","011","101","111"]),("r0",["000","100","010","110"])] 
 }

testAM: AModel
testAM ={ 
  am_name = "(Skip;Skip)", 
  am_domain = ["(e1,e1)"], 
  am_relation = [("a","(e1,e1)","(e1,e1)")], 
  am_pre = [("(e1,e1)",
    And 
      (Precon { am_name = "Skip", am_domain = ["skip"], am_relation = [], am_pre = [] } "e1") 
      (BoxAction 
          (PointAModel { am_name = "Skip", am_domain = ["skip"], am_relation = [], am_pre = [] } "e1") 
          (Precon { am_name = "Skip", am_domain = ["skip"], am_relation = [], am_pre = [] } "e1")
      )
   )
  ] 
  --am_pre = [("(e1,e1)",
  --  And 
  --    (Precon { am_name = "Skip", am_domain = ["skip"], am_relation = [], am_pre = [("skip",Top)] } "e1") 
  --    (BoxAction 
  --        (PointAModel { am_name = "Skip", am_domain = ["skip"], am_relation = [], am_pre = [("skip",Top)] } "e1") 
  --        (Precon { am_name = "Skip", am_domain = ["skip"], am_relation = [], am_pre = [("skip",Top)] } "e1")
  --    )
  -- )
  --]
 }

testAM2: AModel
testAM2 ={ 
  am_name = "(Skip;Skip)", 
  am_domain = ["(e1,e1)"], 
  am_relation = [("a","(e1,e1)","(e1,e1)")], 
  am_pre = [("(e1,e1)",
      (Precon { am_name = "Skip", am_domain = ["skip"], am_relation = [], am_pre = [] } "e1")
     )] 
 }
----------------------------------------------------------------------
---- semantics
----------------------------------------------------------------------

emodel2agentlist:EModel->List Agent
emodel2agentlist ac = List.map (\(ag,x,y)->ag) ac.em_relation

type alias DomVal =
  { dom : String,
    prop: (String, List World )
  }
 


composeKM : EModel -> AModel -> EModel 
composeKM mo1 am2 =
        let  
           agents = Util.nub2 <| emodel2agentlist mo1 ++  Sy.amodel2agentlist am2 
            --name2 = "("++(mo1.em_name)++"*"++(am2.am_name)++")"
           name2 = (mo1.em_name)++"*"++(am2.am_name)
           -- domain
           domain1 = Util.cartesian (mo1.em_domain) (am2.am_domain)
           domain2= case   Util.filterR (\(w,e)-> valueF (PointEModel mo1 w) (Precon am2 e)) domain1  of
              Ok a -> a
              Err a -> Debug.crash a
           pair2dom = List.map (\(x,y)-> ("("++x++","++y++")"))
           val2 = let ff (prop,ws1) = ( prop,
                                        ws1 
                                       $>>= (\w-> List.filter (\(a,b)->w==a) domain2)  
                                       |> pair2dom
                                     )
                  in List.map ff mo1.em_value
           -- relation
           relation1= Util.cartesian2 agents domain2 domain2
           ff = (\(ag,(x1,y1),(x2,y2))->   (List.member (ag,x1,x2) (mo1.em_relation))  
                                        && (List.member (ag,y1,y2) (am2.am_relation)))
           relation2 = List.filter ff relation1
           relation3 = List.map (\(ag,(x1,y1),(x2,y2))-> (ag,  ("("++x1++","++y1++")"), ("("++x2++","++y2++")"))) relation2
        in 
          { em_name = name2,
            em_domain = pair2dom domain2,
            em_relation = relation3,
            em_value = val2
          }


composePoKM : PointEModel -> Action -> PointEModel
composePoKM a b =  case (a,b) of 
        (PointEModel e1 s1, PointAModel e2 s2) ->  PointEModel (composeKM e1 e2) (("("++s1++","++s2++")"))
        --(ComposePoAM ac2 ac3,PointAModel e1 s1) ->  composePoKM 
        --                                                            (composePoKM ac2 ac3)                                                            
        --                                                            (PointAModel e1 s1)
        --(ComposePoAM ac5 ac6,ComposePoAM ac3 ac4) ->  composePoKM 
        --                                                (composePoKM ac5 ac6)
        --                                                (composePoKM ac3 ac4)
        _ -> Debug.crash "error in composePoKM"


infixl 9 **
(**) : PointEModel -> Action -> PointEModel
(**) = composePoKM

type alias Msg = String

-------------------------------------------------------------------------------------------
  -- Satisfaction Relation
-------------------------------------------------------------------------------------------
valueF : PointEModel-> Formula -> Result Msg Bool
valueF ((PointEModel mo w) as pmo) f =
  case f of 
    Top            -> Ok True
    Bot            -> Ok  False
    Atom p         -> Ok <|List.member w (Util.lookVal p mo.em_value) 
    AnyFormula p   -> Err <| "not allowed to include any formula " ++p
    Not p1         -> Result.map not (valueF pmo p1)
    And p1 p2      -> Result.map2 (&&) (valueF pmo p1) (valueF pmo p2)
    Or p1 p2       -> (||) <@ (valueF pmo p1) <@@ (valueF pmo p2)
    Imply p1 p2    -> Result.map2 (==>) (valueF pmo p1) (valueF pmo p2)
    Imply2 p1 p2   -> Result.map2 (==>) (valueF pmo p2) (valueF pmo p1)
    Iff p1 p2    -> Result.map2 (==) (valueF pmo p1) (valueF pmo p2)
    Box ag p       -> Util.forallResult 
                        mo.em_domain  
                           (\z -> Result.map2 (==>)
                              (Ok (List.member (w,z) (Util.lookRel ag mo.em_relation)) )
                              (valueF (PointEModel mo z) p)
                           )
    Dia ag p       -> Util.existsResult 
                          mo.em_domain  
                            (\z -> Result.map2 (&&)
                               (Ok (List.member (w,z) (Util.lookRel ag mo.em_relation)))
                              (valueF (PointEModel mo z) p)
                             )
    BoxAction action p  -> case action of 
                        PointAModel e s -> 
                            Result.map2 (==>) 
                              (valueF pmo (Sy.lookPre2 e.am_pre s)) 
                              (valueF (composePoKM pmo (PointAModel e s)) p)
                        Cup b1 b2 -> 
                            Result.map2 (&&) 
                              (valueF pmo (BoxAction b1 p))
                              (valueF pmo (BoxAction b2 p))
                        ComposePoAM am1 am2 -> 
                            valueF pmo <| BoxAction (Sy.composeAction am1 am2) p
    DiaAction a p  -> valueF pmo (Not (BoxAction a (Not p))) 
    Precon am s   -> valueF pmo (Sy.lookPre2 am.am_pre s) 
    _ -> Debug.crash "undefined in valueF of DEL"


validInModel :EModel->Formula -> Result Msg Bool
validInModel mo f = Util.forallResult mo.em_domain (\x-> valueF (PointEModel mo x) f)

-----------------------------------------------------------------------------------
-- public Announcement
-----------------------------------------------------------------------------------
publicAnnouncement : List Agent-> Formula -> Action
publicAnnouncement ags x = 
  let
    name = "pub(" ++ (Sy.outputForm 1 x) ++ ")" 
    pubS = ["pub"]
    pubR = List.map (\ag->(ag,"pub","pub")) ags --checkk
    pubPre  = [("pub" , x)]
  in
    PointAModel
     { am_name=name
      ,am_domain=pubS
      ,am_relation=pubR
      ,am_pre=pubPre}
     ("pub")
----------------------------------------------------------------------------------
---- examples

---- *DEL> DEL.muddyModel0
---- *DEL> DEL.muddyModel1
---- *DEL> DEL.muddyModel2
---- *DEL> DEL.muddyModel3
---- *DEL> DEL.hexamodel0
---- *DEL> DEL.hexamodel1
---- *DEL> DEL.hexamodel2
---- *DEL> DEL.hexamodel3

---- muddy children ------------------------
--mo1 = EModel.point_emodel2vis (EModel.letter_w1 ***  Sy.reada_po)
--mo2 = EModel.point_emodel2vis (EModel.letter_w1 *** (Sy.reada_po +++ Sy.readb_po))
--mo3 = EModel.point_emodel2vis((EModel.letter_w1 ***  Sy.reada_po) *** Sy.readb_po)
----mo4 = EModel.point_emodel2vis (EModel.letter_w1*** bothMayRead)
--mo5 = EModel.point_emodel2vis (EModel.letter_w1 ***  Sy.mayReada)
----mo6 = EModel.point_emodel2vis (EModel.letter_w1*** mayReadb)

----ac1 = EModel.point_emodel2vis2action (bothMayRead)
----ac2 = EModel.point_emodel2vis2action (bothMayRead+++readb) 


--muddyModel0 : ( List String, List String )
--muddyModel0 = EModel.point_emodel2vis <| EModel.muddyModel_w100
--muddyModel1 = EModel.point_emodel2vis <| EModel.muddyModel_w100 ** muddyAnn1
--muddyModel2 = EModel.point_emodel2vis <| EModel.muddyModel_w100 ** muddyAnn1 ** muddyAnn2
--muddyModel3 = EModel.point_emodel2vis <| EModel.muddyModel_w100 ** muddyAnn1 ** muddyAnn2 ** muddyAnn3

muddyModel0 : ( List String, List String )
muddyModel0 = EModel.point_emodel2vis <| EModel.muddyModel_w100
muddyModel1 = EModel.point_emodel2vis <| EModel.muddyModel_w100 ** muddyAnn1
muddyModel2 = EModel.point_emodel2vis <| EModel.muddyModel_w100 ** muddyAnn1 ** muddyAnn2
muddyModel3 = EModel.point_emodel2vis <| EModel.muddyModel_w100 ** muddyAnn1 ** muddyAnn2 ** muddyAnn3

agentList4muddy : List Agent
agentList4muddy = ["a","b","c"]

muddyAnn1 : Action
muddyAnn1 = publicAnnouncement  
             agentList4muddy 
             (Sy.bigOr [ (Atom "0a")
                     ,(Atom "0b")
                     ,(Atom  "0c")])

muddyAnn2 : Action
muddyAnn2 = publicAnnouncement 
              agentList4muddy 
              <| Sy.bigAnd[ (Sy.knowNeither "a" (Atom "0a"))
                         ,(Sy.knowNeither "b" (Atom "0b"))
                        ,(Sy.knowNeither "c" (Atom "0c"))]

muddyAnn3 : Action
muddyAnn3 = publicAnnouncement 
              agentList4muddy 
              <| Sy.bigAnd [ (Sy.knowNeither "a" (Atom "0a")) 
                         ,(Sy.knowEither "b" (Atom "0b"))
                         ,(Sy.knowEither "c" (Atom "0c"))]

-- hexa -------------------

hexamodel0 = EModel.point_emodel2vis EModel.hexaModel_w120
hexamodel1 = EModel.point_emodel2vis <| EModel.hexaModel_w120 ** announceHexa1
hexamodel2 = EModel.point_emodel2vis <| EModel.hexaModel_w120 ** announceHexa1 ** announceHexa2
hexamodel3 = EModel.point_emodel2vis <| EModel.hexaModel_w120 ** announceHexa1 ** announceHexa2 ** announceHexa3

agentList4hexa : List Agent
agentList4hexa = ["a","b","c"]

announceHexa1 :Action
announceHexa1 = publicAnnouncement 
                agentList4hexa 
                (Not (Atom "1a"))

announceHexa2 :Action
announceHexa2 = publicAnnouncement 
                agentList4hexa 
                <|Sy.bigOr [ Sy.notknow "b" (Atom "0a")
                         ,Sy.know "b" (Atom "1a") 
                         ,Sy.know "b" (Atom "2a")]

announceHexa3 :Action
announceHexa3 =  publicAnnouncement 
                 agentList4hexa 
                 <|Sy.bigAnd [ (Atom "0a") 
                           ,(Atom "1b") 
                           ,(Atom "2c")]



---- mayRead
--mayReadb : Action
--mayReadb = 
--  let  npb =  "npb"
--       pb  =  "pb"
--       t  =  "t"
--       name = "mayReadb"
--       readaS = [npb,pb,t]
--       readaR  =   [("b",npb,npb),("b",pb,pb),("b",t,t)]
--                ++ [("a",npb,npb),("a",pb,pb),("a",t,t)]
--                ++ [("a",npb,pb),("a",pb,npb)]
--                ++ [("a",npb,t),("a",t,npb)]
--                ++ [("a",pb,t),("a",t,pb)]
--       readaPre = [ ( "pb", Atom ( "p")),
--                    ( "npb", Not (Atom ( "p"))),
--                    ( "t", Top)]
--  in PointAModel
--     { am_name=name
--      ,am_domain=readaS
--      ,am_relation=readaR
--      ,am_pre=readaPre}
--     pb


---- bothMayRead
--bothMayRead : Action
--bothMayRead =  (mayReada) +++ mayReadb
