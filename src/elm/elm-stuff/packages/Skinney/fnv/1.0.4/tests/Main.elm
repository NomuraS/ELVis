port module Main exposing (main, emit)

import Test.Runner.Node exposing (run, TestProgram)
import Test exposing (Test, describe, test)
import Expect
import Json.Encode exposing (Value)
import FNV


main : TestProgram
main =
    run emit tests


port emit : ( String, Value ) -> Cmd msg


hashFn : a -> Int
hashFn =
    toString >> FNV.hashString


tests : Test
tests =
    describe "Hashing"
        [ test "int" <| \() -> Expect.equal 1922428388 <| hashFn -102433675
        , test "float" <| \() -> Expect.equal 1565963606 <| hashFn 4.32
        , test "rec" <| \() -> Expect.equal 1777930592 <| hashFn { name = "Robin", age = "27", male = True }
        , test "tuple" <| \() -> Expect.equal 1184144936 <| hashFn ( "Robin", 27, True )
        , test "ls" <| \() -> Expect.equal 2604163289 <| hashFn (List.range 1 6)
        , test "bool" <| \() -> Expect.equal 4175628588 <| hashFn False
        , test "example" <| \() -> Expect.equal 4201504952 <| hashFn "Turn me into a hash"
        ]
