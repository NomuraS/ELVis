module FrameProperties   exposing (..) 

import Util exposing (..)
import List exposing (..)

type alias Agent =  String
type alias Domain = List String
type alias Agents = List Agent
type alias Relation = List (Agent,String,String)

--Admissibility of Logical Inference Rules, p171
--4.1
--\forall x \exists y(xRy & yRy & \forall(yRz \to z=y))
--4.2
--\forall x,y,z(xRy & xRy \to \exists (yRw & xRw))
--4.3
--weekly connected
--\forall x,y,z(xRy & xRz\to yRz v zRy)
--(connected)
--\forall x,y(xRy & xRz)



-----------------------------------------------------------------
  -- functions for action relations
-----------------------------------------------------------------

--settings
wholeString : Relation -> List String
wholeString rels =
    let 
      gg= \(_,s1,s2) -> [s1,s2]
    in 
      nub <|
      concatMap gg rels

wholeAgentFromRel : Relation -> List Agent
wholeAgentFromRel rels=
    let 
      gg= \(a,_,_) -> [a]
    in 
      nub <|
      concatMap gg rels

-- check property
isReflexive : Agents->Domain->Relation ->Bool 
isReflexive ags dom rels =
  --
    forall dom ( \s-> 
    forall ags ( \a-> 
    member (a,s,s) rels ))


isSymmetric : Relation ->Bool 
isSymmetric rels =
  let
    rotateS =  rotate rels
    wholeA = wholeAgentFromRel rels
    gg = \arel->
         \(a1,s1,t1)->
          member (a1,t1,s1) arel 
  in 
   forall rels (\(ag,w,v)->
   gg rels (ag,w,v))


isTransitive : Relation ->Bool 
isTransitive rels =
  let
    rotateS =  rotate rels
    wholeA = wholeAgentFromRel rels
    gg = \arel->
         \(a1,s1,t1)->
         \(a2,s2,t2)->  
          if a1 == a2 && t1 == s2
          then member (a1,s1,t2)  arel 
          else True
  in 
   forall rotateS (\rel->
    case rel of 
      []-> True
      (ag,w,v)::rell-> and<|map (gg rel (ag,w,v)) rel
    )

isEucleadian : Relation ->Bool 
isEucleadian rels =
  let
    rotateS =  rotate rels
    wholeA = wholeAgentFromRel rels
    gg = \arel->
         \(a1,s1,t1)->
         \(a2,s2,t2)->  
          if a1 == a2 && s1 == s2
          then member (a1,t1,t2)  arel 
               && member (a1,t2,t1)  arel 
               && member (a1,t2,t2)  arel
          else True
  in 
   forall rotateS (\rel->
    case rel of 
      []-> True
      (ag,w,v)::rell-> and<|map (gg rel (ag,w,v)) rel
    )

isSerial : Agents->Domain->Relation ->Bool 
isSerial ags dom rels =
    forall dom ( \s-> 
    forall ags ( \a-> 
    exists dom ( \x-> 
      (member (a,s,x) rels )
    )))

-- make property
makeItReflexive : Agents->Domain->Relation
makeItReflexive agts dom = 
  agts $>>= \ag->
  dom $>>= \x->
  [(ag,x,x)] 

makeItSymmetric : Relation -> Relation
makeItSymmetric rel =
 let 
   gg =\(a,x,y)-> 
         [(a,x,y),(a,y,x)]
 in
   nub <| concatMap gg rel


makeItTransitive : Relation -> Relation
makeItTransitive rel =
 let 
   gg =\(a,x,y) (a2,x2,y2)-> 
         tran (a,x,y) (a2,x2,y2)
   rels = rotate rel
 in
   nub <|
   rels $>>= \rel1->
   case rel1 of 
    [] -> []
    (ag,s1,s2)::rel11 -> concatMap (gg (ag,s1,s2)) rel1

tran:  (Agent,String,String) -> (Agent,String,String) -> Relation
tran exp1 exp2 = case (exp1,exp2) of
    ((ag1,x1,y1),(ag2,x2,y2)) ->
                if y1==x2 && ag1==ag2
                then [exp1,exp2]++[(ag1,x1,y2)]
                else [exp1,exp2]

makeItEucleadian : Relation -> Relation
makeItEucleadian rel =
 let 
   gg (a,x,y) =\(a2,x2,y2)-> eucl (a,x,y) (a2,x2,y2)
   rels = rotate rel
 in
   nub <|
   rels $>>= \rel1->
   case rel1 of 
    [] -> []
    (ag,s1,s2)::rel11 -> concatMap (gg (ag,s1,s2)) rel1


eucl:  (Agent,String,String) -> (Agent,String,String) -> Relation
eucl exp1 exp2 = case (exp1,exp2) of
    ((ag1,x1,y),(ag2,x2,z)) ->
                if x1==x2 && ag1==ag2
                then [exp1,exp2]++[(ag1,y,z),(ag1,z,y)]
                else [exp1,exp2]

