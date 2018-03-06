module Main exposing (main)

import Benchmark.Runner exposing (BenchmarkProgram, program)
import Benchmark exposing (Benchmark, describe, benchmark1)
import FNV


main : BenchmarkProgram
main =
    program suite


suite : Benchmark
suite =
    describe "FNV"
        [ benchmark1 "String key" FNV.hashString "DictKey" ]
