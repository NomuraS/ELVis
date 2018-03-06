module Random_model   exposing (..) 

import AgentAtom exposing (Agent,AtomString,State)
import Util
import Common_syntax exposing (AModel,Pre,AMRelation,Formula(..))
import EModel exposing (EModel,World,Valuation,EMRelation)
import Random exposing (Seed,Generator)
import Random.List 
import Random.Int 
import Applicative exposing ((?>),(??>))
import List exposing (..)

type alias NumOfAgent = Int
type alias NumOfState = Int
type alias NumOfAtom = Int
----------------------------------------------------------------------
-- random Action model
-- example *> createRandomAModel_s numOfAModels (Random.initialSeed 0)
numOfAModels = 20 
maxNumOfStates = 5 
maxNumOfAgents = 2 
----------------------------------------------------------------------

createRandomAModel : NumOfAgent->NumOfState-> Int -> Seed -> (AModel,Seed)
createRandomAModel numAgt numSt n seed0 =
  let 
    domain =List.indexedMap (\int->\x-> x++(toString int)) (List.repeat numSt "s") 
    model_name = "RandomAM"
    (randomR,seed2)= randomRelations4AM numAgt domain (domain,seed0)
    (randomPre,seed3)= randomPrecondition4AM (domain,seed2)
  in 
     ({ 
       am_name= model_name
      ,am_domain = domain
      ,am_relation=randomR
      ,am_pre=randomPre},
      seed3)

createRandomAModel_s :NumOfAgent->NumOfState->  Int-> Seed -> List AModel  -- Int == the number of AModels
createRandomAModel_s numAgt numSt n seed0  =
  let
    li = Util.int2list n 
    (am,seed1) = (createRandomAModel numAgt numSt n seed0)
  in 
    case n of 
      0 -> []
      m -> nubAModel <| 
        [am] ++ (createRandomAModel_s numAgt numSt (n-1) seed1)


randomRelations4AM: NumOfAgent->List State-> (List State, Seed)-> (AMRelation, Seed)
randomRelations4AM numAgt dom (sts,seed0) = 
  let
    agt = indexedMap (\n->\a->a ++ toString n) (repeat 10 "a")
    agents = List.take numAgt  (["a","b","c","d"] ++agt)
    cartesianOfAgtState = Util.cartesian2 agents dom dom
    (randomNum, seed1)= Random.step (Random.int 0 (List.length cartesianOfAgtState)) seed0 -- <|  Random.shuffle <| 
    (cartesianOfAgtStateShuffled,seed2) = cartesianOfAgtState 
        |> Random.List.shuffle
        |> \x-> Random.step x seed1
  in
    (List.take randomNum cartesianOfAgtStateShuffled,seed2)
    --(List.take randomNum (Debug.log "Common_sequent" <|cartesianOfAgtStateShuffled),seed2)


randomPrecondition4AM: (List State, Seed)-> (Pre,Seed) --List (State,Formula)
randomPrecondition4AM (lis,seed0) =
  let 
    gg = \n->\s->(s,AnyFormula <| String.append "A" (toString n))
  in 
    (indexedMap gg lis,seed0)

nubAModel : List AModel -> List AModel 
nubAModel  li =
  let
    gg {am_name,am_domain,am_relation,am_pre} = (am_domain,am_relation,am_pre)
  in 
    List.foldr
      (\a xss-> case a of 
            {am_name,am_domain,am_relation,am_pre}->
            if member (am_domain,am_relation,am_pre) (map gg xss) then xss else a::xss) 
      []
      li

----------------------------------------------------------------------
-- random Epistemic model
-- example *> createRandomEModel_s numOfEModels (Random.initialSeed 0)
numOfEModels = 20 
maxNumOfWorlds = 5 
maxNumOfAtoms =  3
----------------------------------------------------------------------

createRandomKModel : NumOfAgent->NumOfState-> Int -> Seed -> (EModel,Seed)
createRandomKModel numAgt numSt n seed0 =
  let 
    domain =List.indexedMap (\int->\x-> x++(toString int)) (List.repeat numSt "w") 
    model_name = "RandomKM"
    (randomR,seed2)= randomRelations4AM numAgt domain (domain,seed0)
    (randomV,seed3)= randomValue4EM (atomlist maxNumOfAtoms) domain seed2
    --(randomPre,seed3)= randomPrecondition4AM (domain,seed2)
  in 
     ({ 
       em_name= model_name
      ,em_domain = domain
      ,em_relation=randomR
      ,em_value=randomV},
      seed3)



atomlist n =
  let
    gg = \n-> (String.append "p" (toString n))
  in
    map gg (Util.int2list n)


randomValue4EM : List AtomString -> List World -> Seed ->(Valuation,Seed)
randomValue4EM atomL lisW seed0 =
  let 
    powW =Util.powerList lisW
    (k,seed1) = Random.step Random.Int.anyInt seed0
    atomL2 = indexedMap (\n p-> (Random.initialSeed (k+n), p)) atomL
    gg (seedx,p) = 
          let 
            ((maybea,_),_) = Random.step (Random.List.choose powW) seedx
          in
            maybea ?> \x->(p,x)
  in 
    (filterMap gg atomL2, seed1)



nubEModel : List EModel -> List EModel 
nubEModel  li =
  let
    gg {em_name,em_domain,em_relation,em_value} = (em_domain,em_relation,em_value)
  in 
    List.foldr
      (\a xss-> case a of 
            {em_name,em_domain,em_relation,em_value}-> -- xss )
            if member (em_domain,em_relation,em_value) (map gg xss) then xss else a::xss) 
      []
      li
