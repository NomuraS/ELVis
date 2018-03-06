--common among PAL and DEL
module Reduction   exposing (..) 

import Util
import AgentAtom exposing (AtomString,Agent,State)
import Common_syntax exposing (Action,AModel)

type alias AtomBool = {   
             atom:String
            ,maybeBool: String
           }

type alias FormulaBool = {   
             formula:String
            ,maybeBool: String
           }
           
type Formula = Top
         | Bot
         | Atom AtomString
         | AnyFormula String
         | Not Formula
         | And Formula Formula
         | Or Formula Formula
         | Imply Formula Formula
         | Imply2 Formula Formula
         | Iff Formula Formula
         | Dia Agent Formula
         | Box Agent Formula
         --| Common (List Agent)   Formula -- C[ab]A
         | Announce Formula Formula    -- PAL
         | Announce2 Formula Formula   -- PAL        
         | Bigwedge (List State) (AModel,(Agent,State,State)) Formula   -- DEL (List State) is for labelled seq.
         | Bigvee   (List State) (AModel,(Agent,State,State)) Formula   -- DEL
         | BoxAction Action Formula -- [α]A   -- DEL
         | DiaAction Action Formula -- <α>A   -- DEL
         | Precon AModel State         -- pre(s) -- DEL

toELformula : Formula -> Formula
toELformula f = --not <|  isPALformula f || isDELformula f
  case f of 
  Not f1-> Not (toELformula f1)
  And f1 f2 -> And (toELformula f1) (toELformula f2)
  Imply f1 f2 -> Imply (toELformula f1) (toELformula f2)
  Imply2 f1 f2 -> Imply2 (toELformula f1) (toELformula f2)
  Iff f1 f2 -> Iff (toELformula f1) (toELformula f2)
  Dia ag f1-> Dia ag (toELformula f1)
  Box ag f1-> Box ag (toELformula f1)
  Announce2 f1 f2 -> toELformula (Not (Announce (Not f1) f2))
  Announce f1 f2 -> case f2 of 
    Atom p -> Imply (toELformula f2) (Atom p)
    Top -> Imply (toELformula f2) Top 
    Bot -> Imply (toELformula f2) Bot 
    Not g1 -> Imply (toELformula g1) (Not (toELformula (Announce f2 g1)))
    And g1 g2 -> And (Announce f1 g1) (Announce f2 g2)
    Imply g1 g2 -> Imply (Announce f1 g1) (Announce f2 g2)
    Imply2 g1 g2 -> Imply2 (Announce f1 g1) (Announce f2 g2)
    Iff g1 g2 -> Iff (Announce f1 g1) (Announce f2 g2)
    Dia ag g1 -> And (toELformula g1) (Dia ag (toELformula (Announce f2 g1)))
    Box ag g1 -> Imply (toELformula g1) (Box ag (toELformula (Announce f2 g1)))
    Announce g1 g2 -> toELformula (Announce (And f1 (Announce f1 g1)) g2)
    _->Top
  DiaAction f1 f2 -> toELformula (Not (DiaAction (Not f1) f2))
  BoxAction ac f2 -> case f1 of 
    Atom p -> Imply (toELformula f2) (Atom p)
    Top -> Imply (toELformula f2) Top 
    Bot -> Imply (toELformula f2) Bot
  Bigwedge listOfStat (am,(ag,s1,s2)) f1 -> Top 
  Bigvee listOfStat (am,(ag,s1,s2)) f1 -> Top 
  Precon listOfAM f1 ->  Top 
  _-> Top
