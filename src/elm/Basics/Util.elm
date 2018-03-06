module Util
    exposing
        (
            (?>>=)
            ,(@>>=)
            ,($>>=)
            ,toSentenceComma
            ,filterR
            ,and
            ,or
            ,show
            ,unzip2
            ,lookRel
            ,lookVal
            ,lookup
            ,(==>)
            ,intersectL
            ,nub
            ,nub2
            ,nsort
            ,cartesian
            ,cartesian2
            ,forall
            ,forallEither
            ,forallMaybe
            ,forallResult
            ,exists
            ,existsEither
            ,existsResult
            ,existsMaybe
            ,difference
            ,powerList
            ,subList
            ,rotate
            ,concatComma
            ,string2num
            ,delete
            ,removeWhiteSpace 
            ,removeWhiteSpaceFromString
            ,removeComma
            ,unwords
            ,initTail
            ,fst
            ,snd
            ,fst3
            ,snd3
            ,thd3
            ,maybeBigOr 
            ,isSingleton
            ,maybelist2list
            ,int2list
        ) 
import List exposing (..)
import List.Extra exposing (..)
import Maybe exposing (withDefault)
import Maybe.Extra exposing (or)
import Result
import Result.Extra
import FNV exposing (hashString)
import Either exposing (Either(..))

--------------------------------------------------------------------
-- utils
--------------------------------------------------------------------
toSentenceComma : List String -> String
toSentenceComma list =
    case list of
        x :: y :: z :: more ->
            toSentenceHelper "," (x ++ "," ++ y) (z :: more)

        _ ->
            toSentenceBaseCase list


toSentenceBaseCase : List String -> String
toSentenceBaseCase list =
    case list of
        x :: [] ->
            x

        x :: y :: [] ->
            x ++ "," ++ y

        _ ->
            ""


toSentenceHelper : String -> String -> List String -> String
toSentenceHelper lastPart sentence list =
    case list of
        [] ->
            sentence

        x :: [] ->
            sentence ++ lastPart ++ x

        x :: xs ->
            toSentenceHelper lastPart (sentence ++ "," ++ x) xs

filterR : (a-> Result z Bool)  ->List a -> Result z (List a)
filterR func li  = filterR2 func li (Ok [])

filterR2 : (a-> Result z Bool) -> List a -> Result z (List a) -> Result z (List a)
filterR2 func li res = case li of
   []->  res
   x::xs -> case  func x of
      Ok True ->  filterR2 func xs (Result.map (\y->nub y++[x]) res) 
      Ok False ->  filterR2 func xs res
      Err err ->  Err err


existsMaybe :  List a -> (a -> Maybe   Bool) -> Maybe  Bool
existsMaybe  list func = 
  let 
     listOfEither =  List.map func list
     biOp x y= case (x,y) of
      (Just a, Just b) -> Just (a || b)
      (Just a, Nothing) -> Just a
      (Nothing, Just b) -> Just b
      (Nothing, Nothing) -> Nothing
  in
     List.foldl biOp (Nothing) listOfEither 

forallMaybe :  List a -> (a -> Maybe  Bool) -> Maybe Bool
forallMaybe  list func =
   let 
     listOfEither =  List.map func list
     biOp x y= case (x,y) of
      (Just a, Just b) -> Just (a && b)
      (Just a, Nothing) ->  Nothing
      (Nothing, Just b) -> Nothing
      (Nothing, Nothing) -> Nothing
   in
     List.foldl biOp (Just True) listOfEither 


existsEither :  List a -> (a -> Either b  Bool) -> Either b Bool
existsEither  list func = 
  let 
     listOfEither =  List.map func list
     biOp x y= case (x,y) of
      (Right a, Right b) -> Right (a || b)
      (Right a, Left b) -> Right a
      (Left a, Right b) -> Right b
      (Left a, Left b) -> Left a
  in
     List.foldl biOp (Right False) listOfEither 

existsResult :  List a -> (a -> Result b  Bool) -> Result b Bool
existsResult  list func = 
  let 
     listOfResult =  List.map func list
     biOp x y= case (x,y) of
      (Ok a, Ok b) -> Ok (a || b)
      (Ok a, Err b) -> Ok a
      (Err a, Ok b) -> Ok b
      (Err a, Err b) -> Err a
  in
     List.foldl biOp (Ok True) listOfResult 

forallEither :  List a -> (a -> Either b  Bool) -> Either b Bool
forallEither  list func =
   let 
     listOfEither =  List.map func list
     biOp x y= case (x,y) of
      (Right a, Right b) -> Right (a && b)
      (Right a, Left b) -> Left b
      (Left a, Right b) -> Left a
      (Left a, Left b) -> Left a
   in
     List.foldl biOp (Right True) listOfEither 


forallResult :  List a -> (a -> Result b  Bool) -> Result b Bool
forallResult  list func =
   let 
     listOfResult =  List.map func list
     biOp x y= case (x,y) of
      (Ok a, Ok b) -> Ok (a && b)
      (Ok a, Err b) -> Err b
      (Err a, Ok b) -> Err a
      (Err a, Err b) -> Err a
   in
     List.foldl biOp (Ok True) listOfResult 




int2list n= 
  if n==0 
  then [] 
  else [n]++int2list (n-1)

maybelist2list :List (Maybe a) -> List a
maybelist2list mli =
  case mli of 
    [] -> []
    a::mlii -> case a of 
      Nothing -> maybelist2list mlii 
      Just b -> b:: maybelist2list mlii



and :List Bool->Bool
and li = 
  forall li (\x-> x==True)
  
or :List Bool->Bool
or li = 
  exists li (\x-> x==True) 

isSingleton : List a -> Bool
isSingleton li = case li of 
  a::[] -> True
  _ -> False

show = toString

maybeBigOr : List (Maybe a) -> Maybe a
maybeBigOr li =
  case li of 
  []-> Nothing
  f::lii-> foldr (\x-> \y-> Maybe.Extra.or x y) f lii

unzip2 : List (List a, List b) -> (List a, List b)
unzip2 pairs =
  let ff (x,y) (xs,ys) = (x++xs, y++ys)
  in foldr ff ([], []) pairs

(@>>=) : Result x a -> (a -> Result x b) -> Result x b
(@>>=) = flip Result.andThen 


(?>>=) : Maybe a -> (a -> Maybe b) -> Maybe b
(?>>=) = flip Maybe.andThen 

($>>=) : List a -> (a -> List b) -> List b
($>>=) x y= concatMap  y x

lookRel : a -> List ( b, c, d ) -> List ( c, d )
lookRel at li = 
  let gg = \(ag,x,y)-> (x,y)
  in map gg li

lookVal:  a -> List (a, List b)-> List b 
lookVal at li = case li of
  [] -> [] 
  (x,y)::lii-> if at==x 
               then y
               else lookVal at lii


lookup: a -> List (a, b) -> Maybe b
lookup a li = case li of
  [] ->  Nothing
  (x,y)::lii-> if x==a 
               then Just y 
               else lookup a lii

initTail : List a -> (List a) 
initTail a =     withDefault [] 
              <| init 
              <| withDefault [] 
              <| tail a

unwords :List String -> String
unwords = String.concat

(==>) : Bool -> Bool -> Bool
(==>) b1 b2 =  (not b1) || b2

intersectL:  List a -> List a -> List a
intersectL xs1 xs2 = List.foldl
                  (\a ax -> if List.member a xs1 then a::ax else ax)
                  []
                  xs2

nub: List a -> List a 
nub xs = List.foldl
            (\a xss-> if List.member a xss then xss else a::xss)
            []
            xs

nub2 : List comparable -> List comparable
nub2 = unique

nsort : List comparable -> List comparable 
nsort x  = sort (nub2 x)


cartesian : List a -> List b -> List (a,b)
cartesian xs ys = 
  xs $>>= \x-> 
  ys $>>= \y->
  [(x,y)]

cartesian2 : List a ->List b -> List c -> List (a,b,c)
cartesian2 xs ys zs = 
  xs $>>= \x-> 
  ys $>>= \y->
  zs $>>= \z->
  [(x,y,z)]

forall : List a -> (a -> Bool) -> Bool
forall xs p = List.all p xs 

exists : List a  -> (a -> Bool) -> Bool
exists xs p = List.any p xs

difference : List a -> List a -> List a
difference xs ys = List.foldr 
                   (\x a -> if List.member x ys then a else x::a) 
                   [] 
                   xs

powerList : List a  -> List(List a)
powerList xs = subsequences xs

subList : List a -> List a -> Bool
subList a b = List.member a (powerList b)

concatComma : List String -> String
concatComma a = String.concat <| intersperse " , " a

rotate : List a -> List (List a)
rotate li = 
    let ini= inits li
        tai= tails li
        ff = \(x,y)-> x++y
    in nub<| map ff (zip tai ini)

string2num : String ->String
string2num x =  toString <| hashString x

delete : a -> List a -> List a
delete a li = filter (\x-> a/=x) li

removeWhiteSpace : List Char  -> List Char 
removeWhiteSpace  = delete ' '

removeWhiteSpaceFromString : String->String
removeWhiteSpaceFromString a =
                a |>  String.toList
                |> removeWhiteSpace
                |> String.fromList



removeComma : List Char  -> List Char 
removeComma  = List.filter (\x->x /=',')

fst : (a,b) -> a
fst ( s, _) = s
snd : (a,b) -> b
snd ( _ ,s) = s

fst3 : (a,b,c) -> a
fst3 (a,b,c) = a
snd3 : (a,b,c) -> b
snd3 (a,b,c) = b
thd3 : (a,b,c) -> c
thd3 (a,b,c) = c