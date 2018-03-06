module AgentAtom   exposing (..) 

--------------------------------------------
-- initial setting
--------------------------------------------
type alias AtomString =  String
type alias Agent = String
type alias State = String  -- for DEL
                   --| StateVar String
                   --| MixState (State,State)
