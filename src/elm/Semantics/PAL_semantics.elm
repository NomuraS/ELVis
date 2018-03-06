-- example
-- PAL>> PAL.emodel2vis EpistemicMode.muddyModel                   
-- PAL>> PAL.point_emodel2vis EModel.muddyModel  (EModel.World "100")               
--> P.valueF P.muddymodel0 "000" (Imply (Sy.Atom "a") (Sy.Atom "a"))
module PAL_semantics exposing (..)

import AgentAtom exposing (Agent,State)
import Util exposing ((==>),(@>>=))
import Common_syntax as Sy exposing (Formula(..),AtomBool,FormulaBool)
import EModel exposing (EModel,World,EMRelation)
import Result
import Result.Extra

type alias Msg = String
--------------------------------------------------------------------
-- semantics
--------------------------------------------------------------------

valueF : EModel->World->Formula -> Result Msg Bool
valueF mo w f = 
 if not <| List.member w mo.em_domain 
 then Err (w++" is not a member of the domain of " ++ mo.em_name)
 else
  case f of 
    Top            -> Ok True
    Bot            -> Ok False
    Atom p         -> Ok <| List.member w (Util.lookVal p mo.em_value)
    AnyFormula p   -> Err <| "not allowed to include any formula " ++p
    Not p1         -> Result.map  (not) (valueF mo w p1)
    And p1 p2      -> Result.map2 (&&) (valueF mo w p1)  (valueF mo w p2)
    Or p1 p2       -> Result.map2 (||)  (valueF mo w p1)  (valueF mo w p2)
    Imply p1 p2    -> Result.map2 (==>) (valueF mo w p1) (valueF mo w p2)
    Imply2 p1 p2   -> Result.map2 (==>) (valueF mo w p2) (valueF mo w p1)
    Iff p1 p2      -> Result.map2 (==)  (valueF mo w p2)  (valueF mo w p1)
    Box ag p       -> Util.forallResult
                        mo.em_domain  
                            (\z ->  Result.map2 (==>) 
                                  (Ok (List.member (w,z) (Util.lookRel ag mo.em_relation)))
                                  (valueF mo z p)
                            )

    Dia ag p       -> Util.existsResult
                        mo.em_domain  
                            (\z ->  Result.map2 (&&) 
                                  (Ok (List.member (w,z) (Util.lookRel ag mo.em_relation)))
                                  (valueF mo z p)
                            )
    Announce p1 p2 -> Result.map2 (==>) (valueF mo w p1) ( (modifyEModel mo p1) @>>= \km->(valueF km w p2))
    Announce2 p1 p2-> valueF mo w (Not (Announce p1 (Not p2)))
    _-> Err "undefined in valueF of PAL"


validInModel :EModel->Formula -> Result Msg Bool
validInModel mo f = Util.forallResult mo.em_domain (\x-> valueF mo x f)

trueWorld: EModel->Formula-> Result Msg (List World)
trueWorld mo f =
           Util.filterR (\w-> valueF mo w f) mo.em_domain

trueEMRelation: EModel->Formula-> Result Msg EMRelation
trueEMRelation mo f =
  case  trueWorld mo f of
    Err a -> Err a 
    Ok li ->
        let
          gg (ag,x,y)=  if List.member (ag,x,y) mo.em_relation  && List.member x li  && List.member y li 
                        then [(ag,x,y)]
                        else []
        in
          Ok <| List.concatMap gg mo.em_relation

modifyEModel: EModel->Formula-> Result Msg EModel
modifyEModel  mo f =
        let
          mtrueW = trueWorld mo f
          mtrueR = trueEMRelation mo f
        in
         Result.map2 
         (\x y->
          {  em_name=mo.em_name ++"," ++ Sy.outputForm 0 f
            ,em_domain=x
            ,em_relation= y
            ,em_value=mo.em_value}
          )
         mtrueW
         mtrueR

checkEachAtoms :EModel->World-> Formula -> List  AtomBool
checkEachAtoms em w f =
 let
  hoge a= if w=="any" then validInModel em a else valueF em w a
  ff a =  case  hoge a of 
    Ok tf -> {  atom = atom2string a, 
                maybeBool= truFalse2string (Ok tf)
              }
    Err err -> {  atom = atom2string a, 
                  maybeBool= err
                }
 in
  List.map ff (formula2atoms f)

truFalse2string a = case a of
    Ok True -> "true"
    Ok False -> "false"
    Err a ->  a

atom2string atm = case atm of 
    Top -> "top"
    Bot -> "bot"
    Atom p -> p
    AnyFormula a -> a
    _ -> "parse error"


formula2atoms:Formula -> List Formula
formula2atoms f = case f of 
    Top            -> [Top]
    Bot            -> [Bot]
    Atom p         -> [Atom p]
    AnyFormula p   -> [AnyFormula p ]
    Not p1         -> Util.nub <| formula2atoms p1
    And p1 p2      -> Util.nub <| formula2atoms p1 ++ formula2atoms p2
    Or p1 p2       -> Util.nub <| formula2atoms p1 ++ formula2atoms p2
    Imply p1 p2    -> Util.nub <| formula2atoms p1 ++ formula2atoms p2
    Imply2 p1 p2   -> Util.nub <| formula2atoms p1 ++ formula2atoms p2
    Iff p1 p2      -> Util.nub <| formula2atoms p1 ++ formula2atoms p2
    Box ag p       -> Util.nub <| formula2atoms p
    Dia ag p       -> Util.nub <| formula2atoms p
    Announce p1 p2 -> Util.nub <| formula2atoms p1 ++ formula2atoms p2
    Announce2 p1 p2-> Util.nub <| formula2atoms p1 ++ formula2atoms p2
    _->Debug.crash "undefined in valueF of PAL"

--------------------------------------------------------------------
-- examples of announcements
-- >> import PAL
-- >> import EModel
-- >> PAL.modifyEModel  EModel.muddyModel PAL.announceMuddy1
-- >> EModel.point_emodel2vis PAL.muddymodel1 (EModel.World "100")

-- >> EModel.emodel2vis PAL.muddymodel0
-- >> EModel.emodel2vis PAL.muddymodel1
-- >> EModel.emodel2vis PAL.muddymodel2
-- >> EModel.emodel2vis PAL.muddymodel3

-- >> EModel.emodel2vis PAL.hexamodel0
-- >> EModel.emodel2vis PAL.hexamodel1
-- >> EModel.emodel2vis PAL.hexamodel2
-- >> EModel.emodel2vis PAL.hexamodel3

---------------------------------------------------------------------------------------
--formulas for muddy model
---------------------------------------------------------------------------------------
muddymodel0 : Result a EModel
muddymodel0 = Ok EModel.muddyModel
muddymodel1 =  muddymodel0 @>>= \em -> modifyEModel em announceMuddy1
muddymodel2 =  muddymodel1 @>>= \em -> modifyEModel em announceMuddy2
muddymodel3 =  muddymodel2 @>>= \em -> modifyEModel em announceMuddy3

knowEither4muddy : Agent -> Formula
knowEither4muddy x = Sy.knowEither x (Atom ("0"++x))

knowNeither4muddy : Agent -> Formula
knowNeither4muddy ag = Not (knowEither4muddy ag)

announceMuddy1 : Formula
announceMuddy1 = Sy.bigOr [ (Atom "0a")
                        ,(Atom "0b")
                        ,(Atom "0c")]

announceMuddy2 : Formula
announceMuddy2 = Sy.bigAnd [  (Sy.knowNeither "a" (Atom "0a"))
                             ,(Sy.knowNeither "b" (Atom "0b"))
                             ,(Sy.knowNeither "c" (Atom "0c"))]

announceMuddy3 : Formula
announceMuddy3 = Sy.bigAnd [ (Sy.knowNeither "a" (Atom "0a")) 
                            ,(Sy.knowEither "b" (Atom "0b"))
                            ,(Sy.knowEither "c" (Atom "0c"))]
---------------------------------------------------------------------------------------
--formula for hexa model
---------------------------------------------------------------------------------------
hexamodel0 : Result a EModel
hexamodel0 = Ok EModel.hexaModel
hexamodel1 = hexamodel0  @>>= \x-> modifyEModel x announceHexa1
hexamodel2 = hexamodel1  @>>= \x-> modifyEModel x announceHexa2
hexamodel3 = hexamodel2  @>>= \x-> modifyEModel x announceHexa3

announceHexa1 :Formula
announceHexa1 = Not (Atom "1a")

announceHexa2 :Formula
announceHexa2 = Sy.bigOr [ Sy.notknow "b" (Atom "0a")
                       ,Sy.know "b" (Atom "1a") 
                       ,Sy.know "b" (Atom "2a")]

announceHexa3 :Formula
announceHexa3 = Sy.bigAnd [ (Atom "0a") 
                        ,(Atom "1b") 
                        ,(Atom "2c")]

------------------------------------------------------------------------------
--formulas for sum & product model 
------------------------------------------------------------------------------

--atom (x,y) = (Atom (fromInt x ++ "," ++ fromInt y))
--knowSP ag (x,y)= (Box ag (Atom (fromInt x ++ "," ++fromInt y)))
--notknowSP ag (x,y)= Not (knowSP ag (x,y))

--toAnnounce : (( Int, Int ) -> Formula) -> Formula
--toAnnounce   gg = 
--  let range1 = List.range 2 98  --[2..98]
--      range2 = List.range 3 97  --[3..97]
--      cartesianW = cartesian range1 range2
--  in bigAnd <| map gg cartesianW

--announceNumber1 (x,y)= Imply (atom (x,y))  (notknowSP "a" (x,y))
--announceNumber2 (x,y)= Imply (atom (x,y))  (Box "b" (notknowSP "a" (x,y)))
--announceNumber3 (x,y)= Imply (atom (x,y))  (knowSP "b" (x,y)) 

--announceSumpro1 = toAnnounce announceNumber1
--announceSumpro2 = toAnnounce announceNumber2
--announceSumpro3 = toAnnounce announceNumber3

