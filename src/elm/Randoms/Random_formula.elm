module Random_formula   exposing (..) 

import Util
import Common_syntax exposing (Formula(..),Action(..),AModel)
import List exposing (..)
import Random exposing (Seed)
import Random.List
import FNV --exposing (hashString)

type Connectives = List String
---------------------------------------------------------------------------
--random Formula maker
-- example *> createRandomFormula_s numOfAModels (Random.initialSeed 0)
numOfFormulas =100
maxLengthOfRandomFormula = 5
---------------------------------------------------------------------------

--createRandomFormula_s_of_CL : Int -> List Formula
--createRandomFormula_s_of_CL  seed = createRandomFormula_s  100 connectiveList4CL (Random.initialSeed seed)
--createRandomFormula_s_of_EL  seed = createRandomFormula_s  100 connectiveList4EL seed
--createRandomFormula_s_of_PAL seed = createRandomFormula_s  100 connectiveList4PAL seed
--createRandomFormula_s_of_DEL seed = createRandomFormula_s  100 connectiveList4DEL seed

connectiveList4CL :List String
connectiveList4CL =[ "~", "->" ]{-"&","v","<->"-}

makeBox : Int-> List String
makeBox n = 
  let
    gg = \x-> "#" ++x
  in 
    (List.take n ["a","b","c","d"])
    |>  List.map gg 



makeAct : Int-> List String
makeAct n = 
  let
   gg =  (\x-> "[" ++  x ++ "]") 
  in 
    (List.take n ["a","b","c","d"])
    |>  List.map gg 


connectiveList4EL : NumOfAgents->  List String
connectiveList4EL  maxNumberOfAgents = 
                  [ "~", "->" ,"&","v"] --,"<->"
                  ++ makeBox maxNumberOfAgents --"$a"

connectiveList4PAL : NumOfAgents->  List String
connectiveList4PAL  maxNumberOfAgents =
                  [ "~", "->" ,"&","v"] --,"<->"
                  ++ makeBox maxNumberOfAgents --"$a"
                  ++ ["[.]"]  -- "<.>"

type alias NumOfAgents = Int
type alias NumOfActions = Int
connectiveList4DEL :  NumOfActions-> NumOfAgents-> List String
connectiveList4DEL maxNumberOfActions maxNumberOfAgents =
                  [ "~", "->" ,"&","v"] --,"<->"
                  ++ makeBox maxNumberOfAgents --"$a"
                  ++ makeAct maxNumberOfActions --"$a"
                  --++ ["[a]"]  -- "<a>"


createRandomFormula_s : Int-> List String->  Seed -> List Formula  -- Int == the number of Formulas, List String == List of connectives
createRandomFormula_s n connects seed0  =
  let
    li = Util.int2list n 
    (f,seed1) = (createRandomFormula maxLengthOfRandomFormula  connects seed0)
  in 
    case n of 
      0 -> []
      m -> Util.nub <| 
           [f] ++ (createRandomFormula_s (n-1) connects seed1)



createRandomFormula :Int-> List String-> Seed -> (Formula,Seed)
createRandomFormula num conneList seed0 = 
  let 
    randomConnects = randomConnectives seed0 num conneList

    atom = randomConnects
          |> atomLists
          |> map (\x->Zero x)

    randomf =  randomConnects
          |> string2connective
          |> \listOfConnective-> atom++listOfConnective
          |>  randomFormula seed0 
    (bool,seed1) = Random.step (Random.bool) seed0 
  in
    (randomf,seed1)

randomConnectives : Seed -> number -> List String -> List String
randomConnectives seed0 n conneList =
  if n ==0 then [] else 
  let
   (shufflelist,seed1) = Random.step (Random.List.shuffle conneList) seed0
  in
   case shufflelist of 
    [] -> Debug.crash "error in randomConnectives"
    a::xs -> (randomConnectives seed1 (n-1) conneList) ++ [a]

atomLists : List String -> List Formula
atomLists listOfConnectives = 
  let
    gg x = case x of 
        "&" -> 1
        "v" -> 1
        "->" -> 1
        "<->" -> 1
        "[.]" -> 1
        "<.>"  -> 1
        _ -> 0
    nn =  (sum (map gg listOfConnectives))  + 1
    plist = repeat nn "p"
    pn= \n->\p -> Atom <| String.append p (Util.show n)
    listpn = indexedMap pn plist   -- [p0,p1,p2]
    shuf = Random.List.shuffle <| concat <| repeat nn listpn -- [p0,p1,p2,p0,p1,p2,p0,p1,p2]
    n4shuffle= FNV.hashString <| String.join "" listOfConnectives
    (aa,s) = Random.step shuf (Random.initialSeed n4shuffle)  -- [p1,p0,p0,p1,p2,p1,p2,p0,p2]
  in 
    take nn aa   -- [p1,p0,p0]

type LogicalConnective = 
                Two (Formula -> Formula -> Formula) 
              --| TwoAct (Action -> Formula -> Formula) 
              | One (Formula -> Formula)
              | Zero Formula

--
--skip_point2   : Action
--skip_point2 = PointAModel [skip2] (State "s1")

--skip2 : AModel
--skip2  = 
--  let 
--    s1= State "s1"   
--    skipS = [s1]
--    refl ag = map (\x->(ag ,x,x)) skipS
--    skipR = [("a",s1,s1)]
--    skipPre  =
--      [(State "s1", Top)]
--  in 
--     { am_name="Skip"
--      ,am_domain=skipS
--      ,am_relation=skipR
--      ,am_pre=skipPre}

emptyAction string = PointAModel (AModel string [] [] []) (String.toLower string)

string2connective : List String-> List LogicalConnective
string2connective li =
  let 
    gg b = case  b of --(Debug.log "this2" <|b)
      "~" -> [One (\x->Not x)]
      "&" -> [Two (\x y->And x y)]
      "v" -> [Two (\x y->Or x y)]
      "->" -> [Two (\x y->Imply x y)]
      "<->" -> [Two (\x y->Iff x y)]
      "[.]" -> [Two (\x y->Announce x y)]
      "<.>" -> [Two (\x y->Announce2 x y)]
      "[a]" -> [One (\x->BoxAction (emptyAction "E1") x)]
      "[b]" -> [One (\x->BoxAction (emptyAction "E2") x)]
      "[c]" -> [One (\x->BoxAction (emptyAction "E3") x)]
      "[d]" -> [One (\x->BoxAction (emptyAction "E4") x)]
      "<a>" -> [One (\x->DiaAction (emptyAction "E1") x)]
      "<b>" -> [One (\x->DiaAction (emptyAction "E2") x)]
      "<c>" -> [One (\x->DiaAction (emptyAction "E3") x)]
      "<d>" -> [One (\x->DiaAction (emptyAction "E4") x)]    
      "#a" -> [One (\x->Box "a" x)]
      "#b" -> [One (\x->Box "b" x)]
      "#c" -> [One (\x->Box "c" x)]
      "#d" -> [One (\x->Box "d" x)]
      "$a" -> [One (\x->Dia "a" x)]
      "$b" -> [One (\x->Dia "b" x)]
      "$c" -> [One (\x->Dia "c" x)]
      "$d" -> [One (\x->Dia "d" x)]
      --"[a]" -> [Two announcef]
      --"<a>" -> [Two announcef]
      _-> Debug.crash "error in string2connective"
  in case li of 
    []-> []
    a::lii ->  gg a ++ string2connective lii





randomFormula : Seed ->  List LogicalConnective -> Formula
randomFormula seed0 connectivelist =
  case connectivelist of 
    [Zero x] ->x
    y::z::yss  -> case (y,z) of 
                       (One f,_) -> randomFormula seed0 (z::yss++[y])

                       (Two f,_) -> randomFormula seed0 (z::yss++[y])

                       (Zero f,Zero bb) -> randomFormula seed0 (z::yss++[y])

                       (Zero f,One bb) -> 
                                let (shufflexs,seed1) = Random.step (Random.List.shuffle (Zero (bb f)::yss)) seed0 -- bb f の部分もランダムにする
                                in randomFormula seed1 shufflexs

                       (Zero f,Two bb) -> 
                                let (shufflexs,seed1) = Random.step (Random.List.shuffle (One (bb f)::yss)) seed0
                                in randomFormula seed1 shufflexs            

    _ -> Debug.crash "error in randomFormula"



