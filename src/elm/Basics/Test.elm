module Test   exposing (..) 

import AgentAtom exposing (..)
import Common_syntax exposing (..)
import DEL_semantics exposing (..)
import Util exposing (..)
import FrameProperties exposing (..)
import PAL_semantics exposing (..)
import Random_formula exposing (..)
 
import EModel exposing (..)

import PAL_sequent  exposing (..)
import DEL_sequent exposing (..)

import Parser_Formula exposing (..)
import Random_model exposing (..)
import Common_sequent exposing (..)
import ElmFunctions_action exposing (..)
import ElmFunctions_frame exposing (..)
import ElmFunctions_randomAM exposing (..)
import ElmFunctions_sequent exposing (..)
import ElmFunctions_syntaxChecker exposing (..)
import ElmFunctions_truthChecker  exposing (..)

f1 = "(p1 -> p9) v (p8 & ~top)"

--test : ( List String, List String )
--test = case parse f1 of 
--    Ok a -> case List.head a of 
--        Just b ->  drawProof_K (formula2seq b)
--        Nothing -> ([],[])
--    Err _ -> ([],[])