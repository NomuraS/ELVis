module EModel exposing (..)

import Util
import AgentAtom exposing (AtomString,Agent,State)
import List.Extra exposing ((!!))
import Applicative exposing ((<$))
--------------------------------------------------------------------
-- types for Epistemic model
--------------------------------------------------------------------


type alias World  = String

type alias EMRelation =
    List ( Agent, World, World )

type alias Valuation =
    List ( AtomString, List World )

type alias EModel =
    { em_name : String
    , em_domain : List World
    , em_relation : EMRelation
    , em_value : Valuation
    }

type PointEModel = PointEModel EModel World

-------------------------------------------------------------
-- model2vis
------------------------------------------------------------
-- main functions

point_emodel2vis : PointEModel -> ( List String, List String )
point_emodel2vis (PointEModel mo w) =
    let a = List.map (\x -> drawNode4model mo x w) mo.em_domain
        b =drawEdge4model mo
    in ( a, b )

emodel2vis : EModel -> ( List String, List String )
emodel2vis mo = 
    point_emodel2vis (PointEModel mo "")

-- settings
listOfAgentColor : List String
listOfAgentColor =
    [ "lime", "blue", "red", "green", "orange", "turquoise", "darkviolet", "olive" ]


drawNode4model : EModel -> World -> World -> String
drawNode4model mo w w2 =
            if w == w2 
            then
                "{id: \"" ++ w ++ "\", label:\"" ++ w ++ "\", color: 'red'" ++ ",title:\"" ++ atoms2string (world2atoms mo w) ++ "\"},"
            else
                "{id: \"" ++ w ++ "\", label:\"" ++ w ++ "\", color: 'skyblue'" ++ ",title:\"" ++ atoms2string (world2atoms mo w) ++ "\"},"

drawEdge4model : EModel -> List String
drawEdge4model mo =
    let
        ags =
            model2agentlist mo

        rel =
            mo.em_relation

        ( single, double ) =
            singleAndDoubleArrow rel ( [], [] )

        singleArrow =
            \( ag, x, y ) ->
                "{from: \""
                    ++  x
                    ++ "\", to:\""
                    ++  y
                    ++ "\", color:'"
                    ++ agentColor ag ags
                    ++ "'"
                    ++ ", label:\""
                    ++ ag
                    ++ "\",arrows: { to:{type:'arrow'}}},"

        doubleArrow =
            \( ag, x, y ) ->
                "{from: \""
                    ++  x
                    ++ "\", to:\""
                    ++  y
                    ++ "\", color:'"
                    ++ agentColor ag ags
                    ++ "'"
                    ++ ", label:\""
                    ++ ag
                    ++ "\",arrows: { to:{type:'arrow'},from:{type:'arrow'} }},"

        a =
            singleArrow <$ (combineAgt single [])

        b =
            doubleArrow <$ (combineAgt double [])
    in
        a ++ b


agentColor : Agent -> List Agent -> String
agentColor ag ags =
    case (List.Extra.elemIndex) ag ags of
        Nothing ->
            "black"

        Just n ->
            case listOfAgentColor !! n of
                Nothing ->
                    "gray"

                Just color ->
                    color


combineAgt : EMRelation -> EMRelation -> EMRelation
combineAgt rels result =
    case rels of
        ( ag, w1, w2 ) :: relss ->
            let
                list_ags =
                    List.filter (\( ag, x, y ) -> x == w1 && y == w2) rels

                ags =
                    String.join "," <| Util.nsort <| List.map (\a -> Util.fst3 a) list_ags
            in
                combineAgt (Util.difference relss list_ags) (( ags, w1, w2 ) :: result)

        [] ->
            result


singleAndDoubleArrow : EMRelation -> ( EMRelation, EMRelation ) -> ( EMRelation, EMRelation )
singleAndDoubleArrow rels ( single, double ) =
    case rels of
        ( ag, w1, w2 ) :: relss ->
            if List.member ( ag, w2, w1 ) relss then
                singleAndDoubleArrow (Util.delete ( ag, w2, w1 ) relss) ( single, ( ag, w1, w2 ) :: double )
            else
                singleAndDoubleArrow relss ( ( ag, w1, w2 ) :: single, double )

        [] ->
            ( single, double )



---- to string


world2atoms : EModel -> World -> List AtomString
world2atoms mo w =
    let
        gg =
            \p -> ( p, Util.lookup p mo.em_value )

        pairPropW =
            List.map gg (model2atomlist mo)

        filterPairPropW =
            List.filter
                (\( p, ws ) ->
                    case ws of
                        Nothing ->
                            False

                        Just wss ->
                            List.member w wss
                )
                pairPropW
    in
        List.map (\( p, ws ) -> p) filterPairPropW


atoms2string : List AtomString -> String
atoms2string proplist =
    String.join "," proplist

model2agentlist : EModel -> List Agent
model2agentlist mo =
     List.map (\( ag, x, y ) -> ag) mo.em_relation
    |> Util.nub2


model2atomlist : EModel -> List AtomString
model2atomlist mo =
     List.map (\( p, x ) -> p) mo.em_value
    |> Util.nub

--------------------------------------------------------------------
-- example1 : muddy children
--------------------------------------------------------------------
muddyModel_w100 : PointEModel
muddyModel_w100 =
    PointEModel muddyModel ( "100")


muddyModel : EModel
muddyModel =
    let
        w000 = "000"
        w001 = "001"
        w010 = "010"
        w100 = "100"
        w011 = "011"
        w110 = "110"
        w101 = "101"
        w111 = "111"

        muddyW =
            [ w000, w100, w001, w010, w011, w110, w101, w111 ]

        refl ag =
            List.map (\x -> ( ag, x, x )) muddyW

        muddyR =
            refl "a"
                ++ refl "b"
                ++ refl "c"
                ++ [ ( "a", w000, w100 )
                   , ( "a", w100, w000 )
                   , ( "a", w010, w110 )
                   , ( "a", w110, w010 )
                   , ( "a", w001, w101 )
                   , ( "a", w101, w001 )
                   , ( "a", w011, w111 )
                   , ( "a", w111, w011 )
                   ]
                ++ [ ( "b", w000, w010 )
                   , ( "b", w010, w000 )
                   , ( "b", w100, w110 )
                   , ( "b", w110, w100 )
                   , ( "b", w001, w011 )
                   , ( "b", w011, w001 )
                   , ( "b", w101, w111 )
                   , ( "b", w111, w101 )
                   ]
                ++ [ ( "c", w000, w001 )
                   , ( "c", w001, w000 )
                   , ( "c", w010, w011 )
                   , ( "c", w011, w010 )
                   , ( "c", w100, w101 )
                   , ( "c", w101, w100 )
                   , ( "c", w110, w111 )
                   , ( "c", w111, w110 )
                   ]

        muddyV =
            [ ( "1a", [ w111, w101, w100, w110 ] )
            , ( "0a", [ w011, w001, w000, w010 ] )
            , ( "1b", [ w010, w111, w110, w011 ] )
            , ( "0b", [ w000, w101, w100, w001 ] )
            , ( "1c", [ w001, w011, w101, w111 ] )
            , ( "0c", [ w000, w100, w010, w110 ] )
            ]
    in
        { em_name = "muddy_children"
        , em_domain = muddyW
        , em_relation = muddyR
        , em_value = muddyV
        }

--------------------------------------------------------------------
-- example2 : hexa
--------------------------------------------------------------------


hexaModel_w120 : PointEModel
hexaModel_w120 =
    PointEModel hexaModel ( "120")


hexaModel : EModel
hexaModel =
    let
        w012 =
             "012"

        w021 =
             "021"

        w102 =
             "102"

        w201 =
             "201"

        w210 =
             "210"

        w120 =
             "120"

        hexaW =
            [ w012, w021, w102, w201, w210, w120 ]

        refl ag =
            List.map (\x -> ( ag, x, x )) hexaW

        hexaR =
            refl "a"
                ++ refl "b"
                ++ refl "c"
                ++ [ ( "a", w012, w021 )
                   , ( "a", w102, w120 )
                   , ( "a", w201, w210 )
                   , ( "a", w021, w012 )
                   , ( "a", w120, w102 )
                   , ( "a", w210, w201 )
                   ]
                ++ [ ( "b", w021, w120 )
                   , ( "b", w012, w210 )
                   , ( "b", w102, w201 )
                   , ( "b", w120, w021 )
                   , ( "b", w210, w012 )
                   , ( "b", w201, w102 )
                   ]
                ++ [ ( "c", w012, w102 )
                   , ( "c", w021, w201 )
                   , ( "c", w120, w210 )
                   , ( "c", w102, w012 )
                   , ( "c", w201, w021 )
                   , ( "c", w210, w120 )
                   ]

        hexaV =
            [ ( "0a", [ w012, w021 ] )
            , ( "1a", [ w102, w120 ] )
            , ( "2a", [ w201, w210 ] )
            , ( "0b", [ w102, w201 ] )
            , ( "1b", [ w012, w210 ] )
            , ( "2b", [ w021, w120 ] )
            , ( "0c", [ w120, w210 ] )
            , ( "1c", [ w021, w201 ] )
            , ( "2c", [ w012, w102 ] )
            ]
    in
        { em_name = "hexa_model"
        , em_domain = hexaW
        , em_relation = hexaR
        , em_value = hexaV
        }


makeRefl : Agent -> List World -> EMRelation
makeRefl ag dom =
    List.map (\x -> ( ag, x, x )) dom

--------------------------------------------------------------------
-- example3 :  Sum & Product
----------------------------------------------------------------------
--func4sum : (Int, Int )-> EMRelation --ist ( String, Int, Int )
--func4sum (n,m) =
--  let k = n+m
--      rangek = List.range 2 k
--      car = cartesian rangek rangek
--      ff = \(x,y)-> x+y==k
--      gg = \(x,y)->("a",World <| toString x,World <| toString y)
--  in List.map gg (List.filter ff car )
--func4pro: (Int, Int )-> EMRelation --ist ( String, Int, Int )
--func4pro (n,m) =
--  let k = n*m
--      l = round (toFloat k/2)
--      rangek = List.range 2 k
--      car = cartesian rangek rangek  --- problematic　これのせいで止まる
--      ee = \(x,y)-> x+y <=10
--                --&& x <=l && y <=l
--      ff = \(x,y)-> x*y==k  --- problematic　これのせいで止まる
--      gg = \(x,y)->("b",World <| toString x,World <| toString y)
--  in List.map gg (List.filter ff (List.filter ee car ))
--sumProModel : EModel
--sumProModel  =
--  let
--    range1 = List.range 2 98  --[2..98]
--    range2 = List.range 3 97  --[3..97]
--    --domain
--    aaa = range1 >>= \x->
--          range2 >>= \y->
--            if x/=y && x<y && (x + y) <= 100
--            then [World (toString x++","++toString y)]
--            else []
--    worldlist= List.filter  -- [(Int,Int)]
--                (\(x,y)-> x/=y && x<y && (x + y) <= 100)
--                (cartesian range1 range2)
--    sumProW= List.map (\(x,y)-> World (toString x++","++toString y)) worldlist
--    relation
--    List.filter_sum_relation = {-Util.nub <| -} concatMap func4sum worldlist
--    List.filter_pro_relation = {-Util.nub <| -} concatMap func4pro worldlist
--    sumProR =    List.filter_sum_relation
--              ++ List.filter_pro_relation
--              ++ makeRefl "a" sumProW
--              ++ makeRefl "b" sumProW
--    --valuation
--    ff = \(x,y)-> (toString x++","++toString y)
--    gg = \(x,y)-> (Atom2value (ff (x,y)),[World (ff (x,y))])
--    sumProV = List.map gg worldlist
--  in
--     { em_name="sum_and_product"
--      ,em_domain=sumProW
--      ,em_relation=[]
--      ,em_value=sumProV}
--------------------------------------------------------------------
-- example4 : letter
----------------------------------------------------------------------


letter_w1 : PointEModel
letter_w1 =
    PointEModel letter "1"


letter : EModel
letter =
    let
        w0 =
             "0"

        w1 =
             "1"

        name =
            "letter"

        letterS =
            [ w0, w1 ]

        letterR =
            [ ( "a", w0, w0 ), ( "a", w1, w1 ), ( "a", w0, w1 ), ( "a", w1, w0 ) ]
                ++ [ ( "b", w0, w0 ), ( "b", w1, w1 ), ( "b", w0, w1 ), ( "b", w1, w0 ) ]

        letterV =
            [ ( "p", [ w1 ] ) ]
    in
        { em_name = name
        , em_domain = letterS
        , em_relation = letterR
        , em_value = letterV
        }
