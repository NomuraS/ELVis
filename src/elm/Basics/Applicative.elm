module Applicative exposing (..)

import Maybe.Extra exposing (isJust,andMap)
import Maybe exposing (andThen)
import List exposing (map,map2)
import Either exposing (Either(..))
import Result
import Result.Extra 

-- Shorthand map over List-like
(<$) : (a -> b) -> List a -> List b
(<$) f lx = map f lx                        -- <$> in Haskell

($>) : List a -> (a -> b) -> List b
($>) lx f = map f lx


-- Shorthand sequential application 
(<$$) : List (a -> b) -> List a -> List b
(<$$) lf lx = map2 (\f x -> f x) lf lx   -- <*> in Haskell

($$>) : List a -> List (a -> b) -> List b
($$>) lx lf = map2 (\f x -> f x) lf lx   -- <**> in Haskell
infixr 1 <$$
infixr 1 $$>

--Shorthand map over Maybe
(<?) : (b -> a) -> Maybe b -> Maybe a
(<?) f mx = case mx of                      -- <$> in Haskell
  (Just x) -> Just (f x)
  Nothing  -> Nothing

(?>) : Maybe b -> (b -> a) -> Maybe a
(?>) mx f = case mx of 
  Just x  -> Just (f x)
  Nothing -> Nothing
infixr 2 <?
infixr 2 ?>

-- Shorthand sequential application
(<??) : Maybe (a -> b) -> Maybe a -> Maybe b
(<??) mf mx = Maybe.Extra.andMap mx mf

(??>) : Maybe a -> Maybe (a -> a1) -> Maybe a1
(??>) mx mf = Maybe.Extra.andMap mx mf
----if isJust mx && isJust mf     -- <**> in Haskell
----              then Just <| (\(Just f) (Just x) -> f x) mf mx
--              else Nothing
infixr 1 <??
infixr 1 ??>

--Shorthand map over Maybe
(<!) : (b -> a) -> Either x b -> Either x a
(<!) f mx = case mx of                      -- <$> in Haskell
  Right x -> Right (f x)
  Left y -> Left y

(!>) : Either x b -> (b -> a) -> Either x a
(!>) mx f = case mx of 
  Right x -> Right (f x)
  Left y -> Left y

infixr 2 <!
infixr 2 !>

--Shorthand map over Maybe
(<@) : (b -> a) -> Result x b -> Result x a
(<@) f mx = case mx of                      -- <$> in Haskell
  Ok x -> Ok (f x)
  Err y -> Err y

(@>) : Result x b -> (b -> a) -> Result x a
(@>) mx f = case mx of 
  Ok x -> Ok (f x)
  Err y -> Err y

infixr 2 <@
infixr 2 @>

    -- Shorthand sequential application
(<@@) : Result x (a -> b) -> Result x a -> Result x b
(<@@) mf mx = Result.Extra.andMap mx mf

(@@>) : Result x a -> Result x (a -> a1) -> Result x a1
(@@>) mx mf = Result.Extra.andMap mx mf
----if isJust mx && isJust mf     -- <**> in Haskell
----              then Just <| (\(Just f) (Just x) -> f x) mf mx
--              else Nothing
infixr 1 <@@
infixr 1 @@>
