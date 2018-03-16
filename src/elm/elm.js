
(function() {
'use strict';

function F2(fun)
{
  function wrapper(a) { return function(b) { return fun(a,b); }; }
  wrapper.arity = 2;
  wrapper.func = fun;
  return wrapper;
}

function F3(fun)
{
  function wrapper(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  }
  wrapper.arity = 3;
  wrapper.func = fun;
  return wrapper;
}

function F4(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  }
  wrapper.arity = 4;
  wrapper.func = fun;
  return wrapper;
}

function F5(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  }
  wrapper.arity = 5;
  wrapper.func = fun;
  return wrapper;
}

function F6(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  }
  wrapper.arity = 6;
  wrapper.func = fun;
  return wrapper;
}

function F7(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  }
  wrapper.arity = 7;
  wrapper.func = fun;
  return wrapper;
}

function F8(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  }
  wrapper.arity = 8;
  wrapper.func = fun;
  return wrapper;
}

function F9(fun)
{
  function wrapper(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  }
  wrapper.arity = 9;
  wrapper.func = fun;
  return wrapper;
}

function A2(fun, a, b)
{
  return fun.arity === 2
    ? fun.func(a, b)
    : fun(a)(b);
}
function A3(fun, a, b, c)
{
  return fun.arity === 3
    ? fun.func(a, b, c)
    : fun(a)(b)(c);
}
function A4(fun, a, b, c, d)
{
  return fun.arity === 4
    ? fun.func(a, b, c, d)
    : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e)
{
  return fun.arity === 5
    ? fun.func(a, b, c, d, e)
    : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f)
{
  return fun.arity === 6
    ? fun.func(a, b, c, d, e, f)
    : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g)
{
  return fun.arity === 7
    ? fun.func(a, b, c, d, e, f, g)
    : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h)
{
  return fun.arity === 8
    ? fun.func(a, b, c, d, e, f, g, h)
    : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i)
{
  return fun.arity === 9
    ? fun.func(a, b, c, d, e, f, g, h, i)
    : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

//import Native.Utils //

var _elm_lang$core$Native_Basics = function() {

function div(a, b)
{
	return (a / b) | 0;
}
function rem(a, b)
{
	return a % b;
}
function mod(a, b)
{
	if (b === 0)
	{
		throw new Error('Cannot perform mod 0. Division by zero error.');
	}
	var r = a % b;
	var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r + b) : -mod(-a, -b));

	return m === b ? 0 : m;
}
function logBase(base, n)
{
	return Math.log(n) / Math.log(base);
}
function negate(n)
{
	return -n;
}
function abs(n)
{
	return n < 0 ? -n : n;
}

function min(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) < 0 ? a : b;
}
function max(a, b)
{
	return _elm_lang$core$Native_Utils.cmp(a, b) > 0 ? a : b;
}
function clamp(lo, hi, n)
{
	return _elm_lang$core$Native_Utils.cmp(n, lo) < 0
		? lo
		: _elm_lang$core$Native_Utils.cmp(n, hi) > 0
			? hi
			: n;
}

var ord = ['LT', 'EQ', 'GT'];

function compare(x, y)
{
	return { ctor: ord[_elm_lang$core$Native_Utils.cmp(x, y) + 1] };
}

function xor(a, b)
{
	return a !== b;
}
function not(b)
{
	return !b;
}
function isInfinite(n)
{
	return n === Infinity || n === -Infinity;
}

function truncate(n)
{
	return n | 0;
}

function degrees(d)
{
	return d * Math.PI / 180;
}
function turns(t)
{
	return 2 * Math.PI * t;
}
function fromPolar(point)
{
	var r = point._0;
	var t = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
}
function toPolar(point)
{
	var x = point._0;
	var y = point._1;
	return _elm_lang$core$Native_Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y, x));
}

return {
	div: F2(div),
	rem: F2(rem),
	mod: F2(mod),

	pi: Math.PI,
	e: Math.E,
	cos: Math.cos,
	sin: Math.sin,
	tan: Math.tan,
	acos: Math.acos,
	asin: Math.asin,
	atan: Math.atan,
	atan2: F2(Math.atan2),

	degrees: degrees,
	turns: turns,
	fromPolar: fromPolar,
	toPolar: toPolar,

	sqrt: Math.sqrt,
	logBase: F2(logBase),
	negate: negate,
	abs: abs,
	min: F2(min),
	max: F2(max),
	clamp: F3(clamp),
	compare: F2(compare),

	xor: F2(xor),
	not: not,

	truncate: truncate,
	ceiling: Math.ceil,
	floor: Math.floor,
	round: Math.round,
	toFloat: function(x) { return x; },
	isNaN: isNaN,
	isInfinite: isInfinite
};

}();
//import //

var _elm_lang$core$Native_Utils = function() {

// COMPARISONS

function eq(x, y)
{
	var stack = [];
	var isEqual = eqHelp(x, y, 0, stack);
	var pair;
	while (isEqual && (pair = stack.pop()))
	{
		isEqual = eqHelp(pair.x, pair.y, 0, stack);
	}
	return isEqual;
}


function eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push({ x: x, y: y });
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object')
	{
		if (typeof x === 'function')
		{
			throw new Error(
				'Trying to use `(==)` on functions. There is no way to know if functions are "the same" in the Elm sense.'
				+ ' Read more about this at http://package.elm-lang.org/packages/elm-lang/core/latest/Basics#=='
				+ ' which describes why it is this way and what the better version will look like.'
			);
		}
		return false;
	}

	if (x === null || y === null)
	{
		return false
	}

	if (x instanceof Date)
	{
		return x.getTime() === y.getTime();
	}

	if (!('ctor' in x))
	{
		for (var key in x)
		{
			if (!eqHelp(x[key], y[key], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	// convert Dicts and Sets to lists
	if (x.ctor === 'RBNode_elm_builtin' || x.ctor === 'RBEmpty_elm_builtin')
	{
		x = _elm_lang$core$Dict$toList(x);
		y = _elm_lang$core$Dict$toList(y);
	}
	if (x.ctor === 'Set_elm_builtin')
	{
		x = _elm_lang$core$Set$toList(x);
		y = _elm_lang$core$Set$toList(y);
	}

	// check if lists are equal without recursion
	if (x.ctor === '::')
	{
		var a = x;
		var b = y;
		while (a.ctor === '::' && b.ctor === '::')
		{
			if (!eqHelp(a._0, b._0, depth + 1, stack))
			{
				return false;
			}
			a = a._1;
			b = b._1;
		}
		return a.ctor === b.ctor;
	}

	// check if Arrays are equal
	if (x.ctor === '_Array')
	{
		var xs = _elm_lang$core$Native_Array.toJSArray(x);
		var ys = _elm_lang$core$Native_Array.toJSArray(y);
		if (xs.length !== ys.length)
		{
			return false;
		}
		for (var i = 0; i < xs.length; i++)
		{
			if (!eqHelp(xs[i], ys[i], depth + 1, stack))
			{
				return false;
			}
		}
		return true;
	}

	if (!eqHelp(x.ctor, y.ctor, depth + 1, stack))
	{
		return false;
	}

	for (var key in x)
	{
		if (!eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

var LT = -1, EQ = 0, GT = 1;

function cmp(x, y)
{
	if (typeof x !== 'object')
	{
		return x === y ? EQ : x < y ? LT : GT;
	}

	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? EQ : a < b ? LT : GT;
	}

	if (x.ctor === '::' || x.ctor === '[]')
	{
		while (x.ctor === '::' && y.ctor === '::')
		{
			var ord = cmp(x._0, y._0);
			if (ord !== EQ)
			{
				return ord;
			}
			x = x._1;
			y = y._1;
		}
		return x.ctor === y.ctor ? EQ : x.ctor === '[]' ? LT : GT;
	}

	if (x.ctor.slice(0, 6) === '_Tuple')
	{
		var ord;
		var n = x.ctor.slice(6) - 0;
		var err = 'cannot compare tuples with more than 6 elements.';
		if (n === 0) return EQ;
		if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
		if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
		if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
		if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
		if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
		if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
		if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
		return EQ;
	}

	throw new Error(
		'Comparison error: comparison is only defined on ints, '
		+ 'floats, times, chars, strings, lists of comparable values, '
		+ 'and tuples of comparable values.'
	);
}


// COMMON VALUES

var Tuple0 = {
	ctor: '_Tuple0'
};

function Tuple2(x, y)
{
	return {
		ctor: '_Tuple2',
		_0: x,
		_1: y
	};
}

function chr(c)
{
	return new String(c);
}


// GUID

var count = 0;
function guid(_)
{
	return count++;
}


// RECORDS

function update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


//// LIST STUFF ////

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return {
		ctor: '::',
		_0: hd,
		_1: tl
	};
}

function append(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (xs.ctor === '[]')
	{
		return ys;
	}
	var root = Cons(xs._0, Nil);
	var curr = root;
	xs = xs._1;
	while (xs.ctor !== '[]')
	{
		curr._1 = Cons(xs._0, Nil);
		xs = xs._1;
		curr = curr._1;
	}
	curr._1 = ys;
	return root;
}


// CRASHES

function crash(moduleName, region)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '` ' + regionToString(region) + '\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function crashCase(moduleName, region, value)
{
	return function(message) {
		throw new Error(
			'Ran into a `Debug.crash` in module `' + moduleName + '`\n\n'
			+ 'This was caused by the `case` expression ' + regionToString(region) + '.\n'
			+ 'One of the branches ended with a crash and the following value got through:\n\n    ' + toString(value) + '\n\n'
			+ 'The message provided by the code author is:\n\n    '
			+ message
		);
	};
}

function regionToString(region)
{
	if (region.start.line == region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'between lines ' + region.start.line + ' and ' + region.end.line;
}


// TO STRING

function toString(v)
{
	var type = typeof v;
	if (type === 'function')
	{
		return '<function>';
	}

	if (type === 'boolean')
	{
		return v ? 'True' : 'False';
	}

	if (type === 'number')
	{
		return v + '';
	}

	if (v instanceof String)
	{
		return '\'' + addSlashes(v, true) + '\'';
	}

	if (type === 'string')
	{
		return '"' + addSlashes(v, false) + '"';
	}

	if (v === null)
	{
		return 'null';
	}

	if (type === 'object' && 'ctor' in v)
	{
		var ctorStarter = v.ctor.substring(0, 5);

		if (ctorStarter === '_Tupl')
		{
			var output = [];
			for (var k in v)
			{
				if (k === 'ctor') continue;
				output.push(toString(v[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (ctorStarter === '_Task')
		{
			return '<task>'
		}

		if (v.ctor === '_Array')
		{
			var list = _elm_lang$core$Array$toList(v);
			return 'Array.fromList ' + toString(list);
		}

		if (v.ctor === '<decoder>')
		{
			return '<decoder>';
		}

		if (v.ctor === '_Process')
		{
			return '<process:' + v.id + '>';
		}

		if (v.ctor === '::')
		{
			var output = '[' + toString(v._0);
			v = v._1;
			while (v.ctor === '::')
			{
				output += ',' + toString(v._0);
				v = v._1;
			}
			return output + ']';
		}

		if (v.ctor === '[]')
		{
			return '[]';
		}

		if (v.ctor === 'Set_elm_builtin')
		{
			return 'Set.fromList ' + toString(_elm_lang$core$Set$toList(v));
		}

		if (v.ctor === 'RBNode_elm_builtin' || v.ctor === 'RBEmpty_elm_builtin')
		{
			return 'Dict.fromList ' + toString(_elm_lang$core$Dict$toList(v));
		}

		var output = '';
		for (var i in v)
		{
			if (i === 'ctor') continue;
			var str = toString(v[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return v.ctor + output;
	}

	if (type === 'object')
	{
		if (v instanceof Date)
		{
			return '<' + v.toString() + '>';
		}

		if (v.elm_web_socket)
		{
			return '<websocket>';
		}

		var output = [];
		for (var k in v)
		{
			output.push(k + ' = ' + toString(v[k]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return '<internal structure>';
}

function addSlashes(str, isChar)
{
	var s = str.replace(/\\/g, '\\\\')
			  .replace(/\n/g, '\\n')
			  .replace(/\t/g, '\\t')
			  .replace(/\r/g, '\\r')
			  .replace(/\v/g, '\\v')
			  .replace(/\0/g, '\\0');
	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}


return {
	eq: eq,
	cmp: cmp,
	Tuple0: Tuple0,
	Tuple2: Tuple2,
	chr: chr,
	update: update,
	guid: guid,

	append: F2(append),

	crash: crash,
	crashCase: crashCase,

	toString: toString
};

}();
var _elm_lang$core$Basics$never = function (_p0) {
	never:
	while (true) {
		var _p1 = _p0;
		var _v1 = _p1._0;
		_p0 = _v1;
		continue never;
	}
};
var _elm_lang$core$Basics$uncurry = F2(
	function (f, _p2) {
		var _p3 = _p2;
		return A2(f, _p3._0, _p3._1);
	});
var _elm_lang$core$Basics$curry = F3(
	function (f, a, b) {
		return f(
			{ctor: '_Tuple2', _0: a, _1: b});
	});
var _elm_lang$core$Basics$flip = F3(
	function (f, b, a) {
		return A2(f, a, b);
	});
var _elm_lang$core$Basics$always = F2(
	function (a, _p4) {
		return a;
	});
var _elm_lang$core$Basics$identity = function (x) {
	return x;
};
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<|'] = F2(
	function (f, x) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['|>'] = F2(
	function (x, f) {
		return f(x);
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>>'] = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<<'] = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['++'] = _elm_lang$core$Native_Utils.append;
var _elm_lang$core$Basics$toString = _elm_lang$core$Native_Utils.toString;
var _elm_lang$core$Basics$isInfinite = _elm_lang$core$Native_Basics.isInfinite;
var _elm_lang$core$Basics$isNaN = _elm_lang$core$Native_Basics.isNaN;
var _elm_lang$core$Basics$toFloat = _elm_lang$core$Native_Basics.toFloat;
var _elm_lang$core$Basics$ceiling = _elm_lang$core$Native_Basics.ceiling;
var _elm_lang$core$Basics$floor = _elm_lang$core$Native_Basics.floor;
var _elm_lang$core$Basics$truncate = _elm_lang$core$Native_Basics.truncate;
var _elm_lang$core$Basics$round = _elm_lang$core$Native_Basics.round;
var _elm_lang$core$Basics$not = _elm_lang$core$Native_Basics.not;
var _elm_lang$core$Basics$xor = _elm_lang$core$Native_Basics.xor;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['||'] = _elm_lang$core$Native_Basics.or;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['&&'] = _elm_lang$core$Native_Basics.and;
var _elm_lang$core$Basics$max = _elm_lang$core$Native_Basics.max;
var _elm_lang$core$Basics$min = _elm_lang$core$Native_Basics.min;
var _elm_lang$core$Basics$compare = _elm_lang$core$Native_Basics.compare;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>='] = _elm_lang$core$Native_Basics.ge;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<='] = _elm_lang$core$Native_Basics.le;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['>'] = _elm_lang$core$Native_Basics.gt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['<'] = _elm_lang$core$Native_Basics.lt;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/='] = _elm_lang$core$Native_Basics.neq;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['=='] = _elm_lang$core$Native_Basics.eq;
var _elm_lang$core$Basics$e = _elm_lang$core$Native_Basics.e;
var _elm_lang$core$Basics$pi = _elm_lang$core$Native_Basics.pi;
var _elm_lang$core$Basics$clamp = _elm_lang$core$Native_Basics.clamp;
var _elm_lang$core$Basics$logBase = _elm_lang$core$Native_Basics.logBase;
var _elm_lang$core$Basics$abs = _elm_lang$core$Native_Basics.abs;
var _elm_lang$core$Basics$negate = _elm_lang$core$Native_Basics.negate;
var _elm_lang$core$Basics$sqrt = _elm_lang$core$Native_Basics.sqrt;
var _elm_lang$core$Basics$atan2 = _elm_lang$core$Native_Basics.atan2;
var _elm_lang$core$Basics$atan = _elm_lang$core$Native_Basics.atan;
var _elm_lang$core$Basics$asin = _elm_lang$core$Native_Basics.asin;
var _elm_lang$core$Basics$acos = _elm_lang$core$Native_Basics.acos;
var _elm_lang$core$Basics$tan = _elm_lang$core$Native_Basics.tan;
var _elm_lang$core$Basics$sin = _elm_lang$core$Native_Basics.sin;
var _elm_lang$core$Basics$cos = _elm_lang$core$Native_Basics.cos;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['^'] = _elm_lang$core$Native_Basics.exp;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['%'] = _elm_lang$core$Native_Basics.mod;
var _elm_lang$core$Basics$rem = _elm_lang$core$Native_Basics.rem;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['//'] = _elm_lang$core$Native_Basics.div;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['/'] = _elm_lang$core$Native_Basics.floatDiv;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['*'] = _elm_lang$core$Native_Basics.mul;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['-'] = _elm_lang$core$Native_Basics.sub;
var _elm_lang$core$Basics_ops = _elm_lang$core$Basics_ops || {};
_elm_lang$core$Basics_ops['+'] = _elm_lang$core$Native_Basics.add;
var _elm_lang$core$Basics$toPolar = _elm_lang$core$Native_Basics.toPolar;
var _elm_lang$core$Basics$fromPolar = _elm_lang$core$Native_Basics.fromPolar;
var _elm_lang$core$Basics$turns = _elm_lang$core$Native_Basics.turns;
var _elm_lang$core$Basics$degrees = _elm_lang$core$Native_Basics.degrees;
var _elm_lang$core$Basics$radians = function (t) {
	return t;
};
var _elm_lang$core$Basics$GT = {ctor: 'GT'};
var _elm_lang$core$Basics$EQ = {ctor: 'EQ'};
var _elm_lang$core$Basics$LT = {ctor: 'LT'};
var _elm_lang$core$Basics$JustOneMore = function (a) {
	return {ctor: 'JustOneMore', _0: a};
};

//import Native.Utils //

var _elm_lang$core$Native_Debug = function() {

function log(tag, value)
{
	var msg = tag + ': ' + _elm_lang$core$Native_Utils.toString(value);
	var process = process || {};
	if (process.stdout)
	{
		process.stdout.write(msg);
	}
	else
	{
		console.log(msg);
	}
	return value;
}

function crash(message)
{
	throw new Error(message);
}

return {
	crash: crash,
	log: F2(log)
};

}();
var _elm_lang$core$Debug$crash = _elm_lang$core$Native_Debug.crash;
var _elm_lang$core$Debug$log = _elm_lang$core$Native_Debug.log;

var _elm_lang$core$Maybe$withDefault = F2(
	function ($default, maybe) {
		var _p0 = maybe;
		if (_p0.ctor === 'Just') {
			return _p0._0;
		} else {
			return $default;
		}
	});
var _elm_lang$core$Maybe$Nothing = {ctor: 'Nothing'};
var _elm_lang$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		var _p1 = maybeValue;
		if (_p1.ctor === 'Just') {
			return callback(_p1._0);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$Just = function (a) {
	return {ctor: 'Just', _0: a};
};
var _elm_lang$core$Maybe$map = F2(
	function (f, maybe) {
		var _p2 = maybe;
		if (_p2.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map2 = F3(
	function (func, ma, mb) {
		var _p3 = {ctor: '_Tuple2', _0: ma, _1: mb};
		if (((_p3.ctor === '_Tuple2') && (_p3._0.ctor === 'Just')) && (_p3._1.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A2(func, _p3._0._0, _p3._1._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map3 = F4(
	function (func, ma, mb, mc) {
		var _p4 = {ctor: '_Tuple3', _0: ma, _1: mb, _2: mc};
		if ((((_p4.ctor === '_Tuple3') && (_p4._0.ctor === 'Just')) && (_p4._1.ctor === 'Just')) && (_p4._2.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A3(func, _p4._0._0, _p4._1._0, _p4._2._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map4 = F5(
	function (func, ma, mb, mc, md) {
		var _p5 = {ctor: '_Tuple4', _0: ma, _1: mb, _2: mc, _3: md};
		if (((((_p5.ctor === '_Tuple4') && (_p5._0.ctor === 'Just')) && (_p5._1.ctor === 'Just')) && (_p5._2.ctor === 'Just')) && (_p5._3.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A4(func, _p5._0._0, _p5._1._0, _p5._2._0, _p5._3._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_lang$core$Maybe$map5 = F6(
	function (func, ma, mb, mc, md, me) {
		var _p6 = {ctor: '_Tuple5', _0: ma, _1: mb, _2: mc, _3: md, _4: me};
		if ((((((_p6.ctor === '_Tuple5') && (_p6._0.ctor === 'Just')) && (_p6._1.ctor === 'Just')) && (_p6._2.ctor === 'Just')) && (_p6._3.ctor === 'Just')) && (_p6._4.ctor === 'Just')) {
			return _elm_lang$core$Maybe$Just(
				A5(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0, _p6._4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});

//import Native.Utils //

var _elm_lang$core$Native_List = function() {

var Nil = { ctor: '[]' };

function Cons(hd, tl)
{
	return { ctor: '::', _0: hd, _1: tl };
}

function fromArray(arr)
{
	var out = Nil;
	for (var i = arr.length; i--; )
	{
		out = Cons(arr[i], out);
	}
	return out;
}

function toArray(xs)
{
	var out = [];
	while (xs.ctor !== '[]')
	{
		out.push(xs._0);
		xs = xs._1;
	}
	return out;
}

function foldr(f, b, xs)
{
	var arr = toArray(xs);
	var acc = b;
	for (var i = arr.length; i--; )
	{
		acc = A2(f, arr[i], acc);
	}
	return acc;
}

function map2(f, xs, ys)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]')
	{
		arr.push(A2(f, xs._0, ys._0));
		xs = xs._1;
		ys = ys._1;
	}
	return fromArray(arr);
}

function map3(f, xs, ys, zs)
{
	var arr = [];
	while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
	{
		arr.push(A3(f, xs._0, ys._0, zs._0));
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map4(f, ws, xs, ys, zs)
{
	var arr = [];
	while (   ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function map5(f, vs, ws, xs, ys, zs)
{
	var arr = [];
	while (   vs.ctor !== '[]'
		   && ws.ctor !== '[]'
		   && xs.ctor !== '[]'
		   && ys.ctor !== '[]'
		   && zs.ctor !== '[]')
	{
		arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
		vs = vs._1;
		ws = ws._1;
		xs = xs._1;
		ys = ys._1;
		zs = zs._1;
	}
	return fromArray(arr);
}

function sortBy(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		return _elm_lang$core$Native_Utils.cmp(f(a), f(b));
	}));
}

function sortWith(f, xs)
{
	return fromArray(toArray(xs).sort(function(a, b) {
		var ord = f(a)(b).ctor;
		return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
	}));
}

return {
	Nil: Nil,
	Cons: Cons,
	cons: F2(Cons),
	toArray: toArray,
	fromArray: fromArray,

	foldr: F3(foldr),

	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	sortBy: F2(sortBy),
	sortWith: F2(sortWith)
};

}();
var _elm_lang$core$List$sortWith = _elm_lang$core$Native_List.sortWith;
var _elm_lang$core$List$sortBy = _elm_lang$core$Native_List.sortBy;
var _elm_lang$core$List$sort = function (xs) {
	return A2(_elm_lang$core$List$sortBy, _elm_lang$core$Basics$identity, xs);
};
var _elm_lang$core$List$singleton = function (value) {
	return {
		ctor: '::',
		_0: value,
		_1: {ctor: '[]'}
	};
};
var _elm_lang$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return list;
			} else {
				var _p0 = list;
				if (_p0.ctor === '[]') {
					return list;
				} else {
					var _v1 = n - 1,
						_v2 = _p0._1;
					n = _v1;
					list = _v2;
					continue drop;
				}
			}
		}
	});
var _elm_lang$core$List$map5 = _elm_lang$core$Native_List.map5;
var _elm_lang$core$List$map4 = _elm_lang$core$Native_List.map4;
var _elm_lang$core$List$map3 = _elm_lang$core$Native_List.map3;
var _elm_lang$core$List$map2 = _elm_lang$core$Native_List.map2;
var _elm_lang$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			var _p1 = list;
			if (_p1.ctor === '[]') {
				return false;
			} else {
				if (isOkay(_p1._0)) {
					return true;
				} else {
					var _v4 = isOkay,
						_v5 = _p1._1;
					isOkay = _v4;
					list = _v5;
					continue any;
				}
			}
		}
	});
var _elm_lang$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			_elm_lang$core$List$any,
			function (_p2) {
				return !isOkay(_p2);
			},
			list);
	});
var _elm_lang$core$List$foldr = _elm_lang$core$Native_List.foldr;
var _elm_lang$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			var _p3 = list;
			if (_p3.ctor === '[]') {
				return acc;
			} else {
				var _v7 = func,
					_v8 = A2(func, _p3._0, acc),
					_v9 = _p3._1;
				func = _v7;
				acc = _v8;
				list = _v9;
				continue foldl;
			}
		}
	});
var _elm_lang$core$List$length = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p4, i) {
				return i + 1;
			}),
		0,
		xs);
};
var _elm_lang$core$List$sum = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x + y;
			}),
		0,
		numbers);
};
var _elm_lang$core$List$product = function (numbers) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return x * y;
			}),
		1,
		numbers);
};
var _elm_lang$core$List$maximum = function (list) {
	var _p5 = list;
	if (_p5.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$max, _p5._0, _p5._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$minimum = function (list) {
	var _p6 = list;
	if (_p6.ctor === '::') {
		return _elm_lang$core$Maybe$Just(
			A3(_elm_lang$core$List$foldl, _elm_lang$core$Basics$min, _p6._0, _p6._1));
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$member = F2(
	function (x, xs) {
		return A2(
			_elm_lang$core$List$any,
			function (a) {
				return _elm_lang$core$Native_Utils.eq(a, x);
			},
			xs);
	});
var _elm_lang$core$List$isEmpty = function (xs) {
	var _p7 = xs;
	if (_p7.ctor === '[]') {
		return true;
	} else {
		return false;
	}
};
var _elm_lang$core$List$tail = function (list) {
	var _p8 = list;
	if (_p8.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p8._1);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List$head = function (list) {
	var _p9 = list;
	if (_p9.ctor === '::') {
		return _elm_lang$core$Maybe$Just(_p9._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$List_ops = _elm_lang$core$List_ops || {};
_elm_lang$core$List_ops['::'] = _elm_lang$core$Native_List.cons;
var _elm_lang$core$List$map = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, acc) {
					return {
						ctor: '::',
						_0: f(x),
						_1: acc
					};
				}),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$filter = F2(
	function (pred, xs) {
		var conditionalCons = F2(
			function (front, back) {
				return pred(front) ? {ctor: '::', _0: front, _1: back} : back;
			});
		return A3(
			_elm_lang$core$List$foldr,
			conditionalCons,
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _p10 = f(mx);
		if (_p10.ctor === 'Just') {
			return {ctor: '::', _0: _p10._0, _1: xs};
		} else {
			return xs;
		}
	});
var _elm_lang$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$foldr,
			_elm_lang$core$List$maybeCons(f),
			{ctor: '[]'},
			xs);
	});
var _elm_lang$core$List$reverse = function (list) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			}),
		{ctor: '[]'},
		list);
};
var _elm_lang$core$List$scanl = F3(
	function (f, b, xs) {
		var scan1 = F2(
			function (x, accAcc) {
				var _p11 = accAcc;
				if (_p11.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, x, _p11._0),
						_1: accAcc
					};
				} else {
					return {ctor: '[]'};
				}
			});
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$foldl,
				scan1,
				{
					ctor: '::',
					_0: b,
					_1: {ctor: '[]'}
				},
				xs));
	});
var _elm_lang$core$List$append = F2(
	function (xs, ys) {
		var _p12 = ys;
		if (_p12.ctor === '[]') {
			return xs;
		} else {
			return A3(
				_elm_lang$core$List$foldr,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				ys,
				xs);
		}
	});
var _elm_lang$core$List$concat = function (lists) {
	return A3(
		_elm_lang$core$List$foldr,
		_elm_lang$core$List$append,
		{ctor: '[]'},
		lists);
};
var _elm_lang$core$List$concatMap = F2(
	function (f, list) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$map, f, list));
	});
var _elm_lang$core$List$partition = F2(
	function (pred, list) {
		var step = F2(
			function (x, _p13) {
				var _p14 = _p13;
				var _p16 = _p14._0;
				var _p15 = _p14._1;
				return pred(x) ? {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: x, _1: _p16},
					_1: _p15
				} : {
					ctor: '_Tuple2',
					_0: _p16,
					_1: {ctor: '::', _0: x, _1: _p15}
				};
			});
		return A3(
			_elm_lang$core$List$foldr,
			step,
			{
				ctor: '_Tuple2',
				_0: {ctor: '[]'},
				_1: {ctor: '[]'}
			},
			list);
	});
var _elm_lang$core$List$unzip = function (pairs) {
	var step = F2(
		function (_p18, _p17) {
			var _p19 = _p18;
			var _p20 = _p17;
			return {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: _p19._0, _1: _p20._0},
				_1: {ctor: '::', _0: _p19._1, _1: _p20._1}
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		step,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _elm_lang$core$List$intersperse = F2(
	function (sep, xs) {
		var _p21 = xs;
		if (_p21.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var step = F2(
				function (x, rest) {
					return {
						ctor: '::',
						_0: sep,
						_1: {ctor: '::', _0: x, _1: rest}
					};
				});
			var spersed = A3(
				_elm_lang$core$List$foldr,
				step,
				{ctor: '[]'},
				_p21._1);
			return {ctor: '::', _0: _p21._0, _1: spersed};
		}
	});
var _elm_lang$core$List$takeReverse = F3(
	function (n, list, taken) {
		takeReverse:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return taken;
			} else {
				var _p22 = list;
				if (_p22.ctor === '[]') {
					return taken;
				} else {
					var _v23 = n - 1,
						_v24 = _p22._1,
						_v25 = {ctor: '::', _0: _p22._0, _1: taken};
					n = _v23;
					list = _v24;
					taken = _v25;
					continue takeReverse;
				}
			}
		}
	});
var _elm_lang$core$List$takeTailRec = F2(
	function (n, list) {
		return _elm_lang$core$List$reverse(
			A3(
				_elm_lang$core$List$takeReverse,
				n,
				list,
				{ctor: '[]'}));
	});
var _elm_lang$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
			return {ctor: '[]'};
		} else {
			var _p23 = {ctor: '_Tuple2', _0: n, _1: list};
			_v26_5:
			do {
				_v26_1:
				do {
					if (_p23.ctor === '_Tuple2') {
						if (_p23._1.ctor === '[]') {
							return list;
						} else {
							if (_p23._1._1.ctor === '::') {
								switch (_p23._0) {
									case 1:
										break _v26_1;
									case 2:
										return {
											ctor: '::',
											_0: _p23._1._0,
											_1: {
												ctor: '::',
												_0: _p23._1._1._0,
												_1: {ctor: '[]'}
											}
										};
									case 3:
										if (_p23._1._1._1.ctor === '::') {
											return {
												ctor: '::',
												_0: _p23._1._0,
												_1: {
													ctor: '::',
													_0: _p23._1._1._0,
													_1: {
														ctor: '::',
														_0: _p23._1._1._1._0,
														_1: {ctor: '[]'}
													}
												}
											};
										} else {
											break _v26_5;
										}
									default:
										if ((_p23._1._1._1.ctor === '::') && (_p23._1._1._1._1.ctor === '::')) {
											var _p28 = _p23._1._1._1._0;
											var _p27 = _p23._1._1._0;
											var _p26 = _p23._1._0;
											var _p25 = _p23._1._1._1._1._0;
											var _p24 = _p23._1._1._1._1._1;
											return (_elm_lang$core$Native_Utils.cmp(ctr, 1000) > 0) ? {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A2(_elm_lang$core$List$takeTailRec, n - 4, _p24)
														}
													}
												}
											} : {
												ctor: '::',
												_0: _p26,
												_1: {
													ctor: '::',
													_0: _p27,
													_1: {
														ctor: '::',
														_0: _p28,
														_1: {
															ctor: '::',
															_0: _p25,
															_1: A3(_elm_lang$core$List$takeFast, ctr + 1, n - 4, _p24)
														}
													}
												}
											};
										} else {
											break _v26_5;
										}
								}
							} else {
								if (_p23._0 === 1) {
									break _v26_1;
								} else {
									break _v26_5;
								}
							}
						}
					} else {
						break _v26_5;
					}
				} while(false);
				return {
					ctor: '::',
					_0: _p23._1._0,
					_1: {ctor: '[]'}
				};
			} while(false);
			return list;
		}
	});
var _elm_lang$core$List$take = F2(
	function (n, list) {
		return A3(_elm_lang$core$List$takeFast, 0, n, list);
	});
var _elm_lang$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(n, 0) < 1) {
				return result;
			} else {
				var _v27 = {ctor: '::', _0: value, _1: result},
					_v28 = n - 1,
					_v29 = value;
				result = _v27;
				n = _v28;
				value = _v29;
				continue repeatHelp;
			}
		}
	});
var _elm_lang$core$List$repeat = F2(
	function (n, value) {
		return A3(
			_elm_lang$core$List$repeatHelp,
			{ctor: '[]'},
			n,
			value);
	});
var _elm_lang$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_elm_lang$core$Native_Utils.cmp(lo, hi) < 1) {
				var _v30 = lo,
					_v31 = hi - 1,
					_v32 = {ctor: '::', _0: hi, _1: list};
				lo = _v30;
				hi = _v31;
				list = _v32;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var _elm_lang$core$List$range = F2(
	function (lo, hi) {
		return A3(
			_elm_lang$core$List$rangeHelp,
			lo,
			hi,
			{ctor: '[]'});
	});
var _elm_lang$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			_elm_lang$core$List$map2,
			f,
			A2(
				_elm_lang$core$List$range,
				0,
				_elm_lang$core$List$length(xs) - 1),
			xs);
	});

var _elm_lang$core$Result$toMaybe = function (result) {
	var _p0 = result;
	if (_p0.ctor === 'Ok') {
		return _elm_lang$core$Maybe$Just(_p0._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_lang$core$Result$withDefault = F2(
	function (def, result) {
		var _p1 = result;
		if (_p1.ctor === 'Ok') {
			return _p1._0;
		} else {
			return def;
		}
	});
var _elm_lang$core$Result$Err = function (a) {
	return {ctor: 'Err', _0: a};
};
var _elm_lang$core$Result$andThen = F2(
	function (callback, result) {
		var _p2 = result;
		if (_p2.ctor === 'Ok') {
			return callback(_p2._0);
		} else {
			return _elm_lang$core$Result$Err(_p2._0);
		}
	});
var _elm_lang$core$Result$Ok = function (a) {
	return {ctor: 'Ok', _0: a};
};
var _elm_lang$core$Result$map = F2(
	function (func, ra) {
		var _p3 = ra;
		if (_p3.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				func(_p3._0));
		} else {
			return _elm_lang$core$Result$Err(_p3._0);
		}
	});
var _elm_lang$core$Result$map2 = F3(
	function (func, ra, rb) {
		var _p4 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p4._0.ctor === 'Ok') {
			if (_p4._1.ctor === 'Ok') {
				return _elm_lang$core$Result$Ok(
					A2(func, _p4._0._0, _p4._1._0));
			} else {
				return _elm_lang$core$Result$Err(_p4._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p4._0._0);
		}
	});
var _elm_lang$core$Result$map3 = F4(
	function (func, ra, rb, rc) {
		var _p5 = {ctor: '_Tuple3', _0: ra, _1: rb, _2: rc};
		if (_p5._0.ctor === 'Ok') {
			if (_p5._1.ctor === 'Ok') {
				if (_p5._2.ctor === 'Ok') {
					return _elm_lang$core$Result$Ok(
						A3(func, _p5._0._0, _p5._1._0, _p5._2._0));
				} else {
					return _elm_lang$core$Result$Err(_p5._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p5._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p5._0._0);
		}
	});
var _elm_lang$core$Result$map4 = F5(
	function (func, ra, rb, rc, rd) {
		var _p6 = {ctor: '_Tuple4', _0: ra, _1: rb, _2: rc, _3: rd};
		if (_p6._0.ctor === 'Ok') {
			if (_p6._1.ctor === 'Ok') {
				if (_p6._2.ctor === 'Ok') {
					if (_p6._3.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							A4(func, _p6._0._0, _p6._1._0, _p6._2._0, _p6._3._0));
					} else {
						return _elm_lang$core$Result$Err(_p6._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p6._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p6._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p6._0._0);
		}
	});
var _elm_lang$core$Result$map5 = F6(
	function (func, ra, rb, rc, rd, re) {
		var _p7 = {ctor: '_Tuple5', _0: ra, _1: rb, _2: rc, _3: rd, _4: re};
		if (_p7._0.ctor === 'Ok') {
			if (_p7._1.ctor === 'Ok') {
				if (_p7._2.ctor === 'Ok') {
					if (_p7._3.ctor === 'Ok') {
						if (_p7._4.ctor === 'Ok') {
							return _elm_lang$core$Result$Ok(
								A5(func, _p7._0._0, _p7._1._0, _p7._2._0, _p7._3._0, _p7._4._0));
						} else {
							return _elm_lang$core$Result$Err(_p7._4._0);
						}
					} else {
						return _elm_lang$core$Result$Err(_p7._3._0);
					}
				} else {
					return _elm_lang$core$Result$Err(_p7._2._0);
				}
			} else {
				return _elm_lang$core$Result$Err(_p7._1._0);
			}
		} else {
			return _elm_lang$core$Result$Err(_p7._0._0);
		}
	});
var _elm_lang$core$Result$mapError = F2(
	function (f, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(_p8._0);
		} else {
			return _elm_lang$core$Result$Err(
				f(_p8._0));
		}
	});
var _elm_lang$core$Result$fromMaybe = F2(
	function (err, maybe) {
		var _p9 = maybe;
		if (_p9.ctor === 'Just') {
			return _elm_lang$core$Result$Ok(_p9._0);
		} else {
			return _elm_lang$core$Result$Err(err);
		}
	});

//import Maybe, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_String = function() {

function isEmpty(str)
{
	return str.length === 0;
}
function cons(chr, str)
{
	return chr + str;
}
function uncons(str)
{
	var hd = str[0];
	if (hd)
	{
		return _elm_lang$core$Maybe$Just(_elm_lang$core$Native_Utils.Tuple2(_elm_lang$core$Native_Utils.chr(hd), str.slice(1)));
	}
	return _elm_lang$core$Maybe$Nothing;
}
function append(a, b)
{
	return a + b;
}
function concat(strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join('');
}
function length(str)
{
	return str.length;
}
function map(f, str)
{
	var out = str.split('');
	for (var i = out.length; i--; )
	{
		out[i] = f(_elm_lang$core$Native_Utils.chr(out[i]));
	}
	return out.join('');
}
function filter(pred, str)
{
	return str.split('').map(_elm_lang$core$Native_Utils.chr).filter(pred).join('');
}
function reverse(str)
{
	return str.split('').reverse().join('');
}
function foldl(f, b, str)
{
	var len = str.length;
	for (var i = 0; i < len; ++i)
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function foldr(f, b, str)
{
	for (var i = str.length; i--; )
	{
		b = A2(f, _elm_lang$core$Native_Utils.chr(str[i]), b);
	}
	return b;
}
function split(sep, str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(sep));
}
function join(sep, strs)
{
	return _elm_lang$core$Native_List.toArray(strs).join(sep);
}
function repeat(n, str)
{
	var result = '';
	while (n > 0)
	{
		if (n & 1)
		{
			result += str;
		}
		n >>= 1, str += str;
	}
	return result;
}
function slice(start, end, str)
{
	return str.slice(start, end);
}
function left(n, str)
{
	return n < 1 ? '' : str.slice(0, n);
}
function right(n, str)
{
	return n < 1 ? '' : str.slice(-n);
}
function dropLeft(n, str)
{
	return n < 1 ? str : str.slice(n);
}
function dropRight(n, str)
{
	return n < 1 ? str : str.slice(0, -n);
}
function pad(n, chr, str)
{
	var half = (n - str.length) / 2;
	return repeat(Math.ceil(half), chr) + str + repeat(half | 0, chr);
}
function padRight(n, chr, str)
{
	return str + repeat(n - str.length, chr);
}
function padLeft(n, chr, str)
{
	return repeat(n - str.length, chr) + str;
}

function trim(str)
{
	return str.trim();
}
function trimLeft(str)
{
	return str.replace(/^\s+/, '');
}
function trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function words(str)
{
	return _elm_lang$core$Native_List.fromArray(str.trim().split(/\s+/g));
}
function lines(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split(/\r\n|\r|\n/g));
}

function toUpper(str)
{
	return str.toUpperCase();
}
function toLower(str)
{
	return str.toLowerCase();
}

function any(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return true;
		}
	}
	return false;
}
function all(pred, str)
{
	for (var i = str.length; i--; )
	{
		if (!pred(_elm_lang$core$Native_Utils.chr(str[i])))
		{
			return false;
		}
	}
	return true;
}

function contains(sub, str)
{
	return str.indexOf(sub) > -1;
}
function startsWith(sub, str)
{
	return str.indexOf(sub) === 0;
}
function endsWith(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
}
function indexes(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _elm_lang$core$Native_List.Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _elm_lang$core$Native_List.fromArray(is);
}


function toInt(s)
{
	var len = s.length;

	// if empty
	if (len === 0)
	{
		return intErr(s);
	}

	// if hex
	var c = s[0];
	if (c === '0' && s[1] === 'x')
	{
		for (var i = 2; i < len; ++i)
		{
			var c = s[i];
			if (('0' <= c && c <= '9') || ('A' <= c && c <= 'F') || ('a' <= c && c <= 'f'))
			{
				continue;
			}
			return intErr(s);
		}
		return _elm_lang$core$Result$Ok(parseInt(s, 16));
	}

	// is decimal
	if (c > '9' || (c < '0' && c !== '-' && c !== '+'))
	{
		return intErr(s);
	}
	for (var i = 1; i < len; ++i)
	{
		var c = s[i];
		if (c < '0' || '9' < c)
		{
			return intErr(s);
		}
	}

	return _elm_lang$core$Result$Ok(parseInt(s, 10));
}

function intErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to an Int");
}


function toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return floatErr(s);
	}
	var n = +s;
	// faster isNaN check
	return n === n ? _elm_lang$core$Result$Ok(n) : floatErr(s);
}

function floatErr(s)
{
	return _elm_lang$core$Result$Err("could not convert string '" + s + "' to a Float");
}


function toList(str)
{
	return _elm_lang$core$Native_List.fromArray(str.split('').map(_elm_lang$core$Native_Utils.chr));
}
function fromList(chars)
{
	return _elm_lang$core$Native_List.toArray(chars).join('');
}

return {
	isEmpty: isEmpty,
	cons: F2(cons),
	uncons: uncons,
	append: F2(append),
	concat: concat,
	length: length,
	map: F2(map),
	filter: F2(filter),
	reverse: reverse,
	foldl: F3(foldl),
	foldr: F3(foldr),

	split: F2(split),
	join: F2(join),
	repeat: F2(repeat),

	slice: F3(slice),
	left: F2(left),
	right: F2(right),
	dropLeft: F2(dropLeft),
	dropRight: F2(dropRight),

	pad: F3(pad),
	padLeft: F3(padLeft),
	padRight: F3(padRight),

	trim: trim,
	trimLeft: trimLeft,
	trimRight: trimRight,

	words: words,
	lines: lines,

	toUpper: toUpper,
	toLower: toLower,

	any: F2(any),
	all: F2(all),

	contains: F2(contains),
	startsWith: F2(startsWith),
	endsWith: F2(endsWith),
	indexes: F2(indexes),

	toInt: toInt,
	toFloat: toFloat,
	toList: toList,
	fromList: fromList
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Char = function() {

return {
	fromCode: function(c) { return _elm_lang$core$Native_Utils.chr(String.fromCharCode(c)); },
	toCode: function(c) { return c.charCodeAt(0); },
	toUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toUpperCase()); },
	toLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLowerCase()); },
	toLocaleUpper: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleUpperCase()); },
	toLocaleLower: function(c) { return _elm_lang$core$Native_Utils.chr(c.toLocaleLowerCase()); }
};

}();
var _elm_lang$core$Char$fromCode = _elm_lang$core$Native_Char.fromCode;
var _elm_lang$core$Char$toCode = _elm_lang$core$Native_Char.toCode;
var _elm_lang$core$Char$toLocaleLower = _elm_lang$core$Native_Char.toLocaleLower;
var _elm_lang$core$Char$toLocaleUpper = _elm_lang$core$Native_Char.toLocaleUpper;
var _elm_lang$core$Char$toLower = _elm_lang$core$Native_Char.toLower;
var _elm_lang$core$Char$toUpper = _elm_lang$core$Native_Char.toUpper;
var _elm_lang$core$Char$isBetween = F3(
	function (low, high, $char) {
		var code = _elm_lang$core$Char$toCode($char);
		return (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(low)) > -1) && (_elm_lang$core$Native_Utils.cmp(
			code,
			_elm_lang$core$Char$toCode(high)) < 1);
	});
var _elm_lang$core$Char$isUpper = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('A'),
	_elm_lang$core$Native_Utils.chr('Z'));
var _elm_lang$core$Char$isLower = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('a'),
	_elm_lang$core$Native_Utils.chr('z'));
var _elm_lang$core$Char$isDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('9'));
var _elm_lang$core$Char$isOctDigit = A2(
	_elm_lang$core$Char$isBetween,
	_elm_lang$core$Native_Utils.chr('0'),
	_elm_lang$core$Native_Utils.chr('7'));
var _elm_lang$core$Char$isHexDigit = function ($char) {
	return _elm_lang$core$Char$isDigit($char) || (A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('a'),
		_elm_lang$core$Native_Utils.chr('f'),
		$char) || A3(
		_elm_lang$core$Char$isBetween,
		_elm_lang$core$Native_Utils.chr('A'),
		_elm_lang$core$Native_Utils.chr('F'),
		$char));
};

var _elm_lang$core$String$fromList = _elm_lang$core$Native_String.fromList;
var _elm_lang$core$String$toList = _elm_lang$core$Native_String.toList;
var _elm_lang$core$String$toFloat = _elm_lang$core$Native_String.toFloat;
var _elm_lang$core$String$toInt = _elm_lang$core$Native_String.toInt;
var _elm_lang$core$String$indices = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$indexes = _elm_lang$core$Native_String.indexes;
var _elm_lang$core$String$endsWith = _elm_lang$core$Native_String.endsWith;
var _elm_lang$core$String$startsWith = _elm_lang$core$Native_String.startsWith;
var _elm_lang$core$String$contains = _elm_lang$core$Native_String.contains;
var _elm_lang$core$String$all = _elm_lang$core$Native_String.all;
var _elm_lang$core$String$any = _elm_lang$core$Native_String.any;
var _elm_lang$core$String$toLower = _elm_lang$core$Native_String.toLower;
var _elm_lang$core$String$toUpper = _elm_lang$core$Native_String.toUpper;
var _elm_lang$core$String$lines = _elm_lang$core$Native_String.lines;
var _elm_lang$core$String$words = _elm_lang$core$Native_String.words;
var _elm_lang$core$String$trimRight = _elm_lang$core$Native_String.trimRight;
var _elm_lang$core$String$trimLeft = _elm_lang$core$Native_String.trimLeft;
var _elm_lang$core$String$trim = _elm_lang$core$Native_String.trim;
var _elm_lang$core$String$padRight = _elm_lang$core$Native_String.padRight;
var _elm_lang$core$String$padLeft = _elm_lang$core$Native_String.padLeft;
var _elm_lang$core$String$pad = _elm_lang$core$Native_String.pad;
var _elm_lang$core$String$dropRight = _elm_lang$core$Native_String.dropRight;
var _elm_lang$core$String$dropLeft = _elm_lang$core$Native_String.dropLeft;
var _elm_lang$core$String$right = _elm_lang$core$Native_String.right;
var _elm_lang$core$String$left = _elm_lang$core$Native_String.left;
var _elm_lang$core$String$slice = _elm_lang$core$Native_String.slice;
var _elm_lang$core$String$repeat = _elm_lang$core$Native_String.repeat;
var _elm_lang$core$String$join = _elm_lang$core$Native_String.join;
var _elm_lang$core$String$split = _elm_lang$core$Native_String.split;
var _elm_lang$core$String$foldr = _elm_lang$core$Native_String.foldr;
var _elm_lang$core$String$foldl = _elm_lang$core$Native_String.foldl;
var _elm_lang$core$String$reverse = _elm_lang$core$Native_String.reverse;
var _elm_lang$core$String$filter = _elm_lang$core$Native_String.filter;
var _elm_lang$core$String$map = _elm_lang$core$Native_String.map;
var _elm_lang$core$String$length = _elm_lang$core$Native_String.length;
var _elm_lang$core$String$concat = _elm_lang$core$Native_String.concat;
var _elm_lang$core$String$append = _elm_lang$core$Native_String.append;
var _elm_lang$core$String$uncons = _elm_lang$core$Native_String.uncons;
var _elm_lang$core$String$cons = _elm_lang$core$Native_String.cons;
var _elm_lang$core$String$fromChar = function ($char) {
	return A2(_elm_lang$core$String$cons, $char, '');
};
var _elm_lang$core$String$isEmpty = _elm_lang$core$Native_String.isEmpty;

var _elm_lang$core$Tuple$mapSecond = F2(
	function (func, _p0) {
		var _p1 = _p0;
		return {
			ctor: '_Tuple2',
			_0: _p1._0,
			_1: func(_p1._1)
		};
	});
var _elm_lang$core$Tuple$mapFirst = F2(
	function (func, _p2) {
		var _p3 = _p2;
		return {
			ctor: '_Tuple2',
			_0: func(_p3._0),
			_1: _p3._1
		};
	});
var _elm_lang$core$Tuple$second = function (_p4) {
	var _p5 = _p4;
	return _p5._1;
};
var _elm_lang$core$Tuple$first = function (_p6) {
	var _p7 = _p6;
	return _p7._0;
};

//import //

var _elm_lang$core$Native_Platform = function() {


// PROGRAMS

function program(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flags !== 'undefined')
				{
					throw new Error(
						'The `' + moduleName + '` module does not need flags.\n'
						+ 'Call ' + moduleName + '.worker() with no arguments and you should be all set!'
					);
				}

				return initialize(
					impl.init,
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function programWithFlags(impl)
{
	return function(flagDecoder)
	{
		return function(object, moduleName)
		{
			object['worker'] = function worker(flags)
			{
				if (typeof flagDecoder === 'undefined')
				{
					throw new Error(
						'Are you trying to sneak a Never value into Elm? Trickster!\n'
						+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
						+ 'Use `program` instead if you do not want flags.'
					);
				}

				var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
				if (result.ctor === 'Err')
				{
					throw new Error(
						moduleName + '.worker(...) was called with an unexpected argument.\n'
						+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
						+ result._0
					);
				}

				return initialize(
					impl.init(result._0),
					impl.update,
					impl.subscriptions,
					renderer
				);
			};
		};
	};
}

function renderer(enqueue, _)
{
	return function(_) {};
}


// HTML TO PROGRAM

function htmlToProgram(vnode)
{
	var emptyBag = batch(_elm_lang$core$Native_List.Nil);
	var noChange = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		emptyBag
	);

	return _elm_lang$virtual_dom$VirtualDom$program({
		init: noChange,
		view: function(model) { return main; },
		update: F2(function(msg, model) { return noChange; }),
		subscriptions: function (model) { return emptyBag; }
	});
}


// INITIALIZE A PROGRAM

function initialize(init, update, subscriptions, renderer)
{
	// ambient state
	var managers = {};
	var updateView;

	// init and update state in main process
	var initApp = _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
		var model = init._0;
		updateView = renderer(enqueue, model);
		var cmds = init._1;
		var subs = subscriptions(model);
		dispatchEffects(managers, cmds, subs);
		callback(_elm_lang$core$Native_Scheduler.succeed(model));
	});

	function onMessage(msg, model)
	{
		return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
			var results = A2(update, msg, model);
			model = results._0;
			updateView(model);
			var cmds = results._1;
			var subs = subscriptions(model);
			dispatchEffects(managers, cmds, subs);
			callback(_elm_lang$core$Native_Scheduler.succeed(model));
		});
	}

	var mainProcess = spawnLoop(initApp, onMessage);

	function enqueue(msg)
	{
		_elm_lang$core$Native_Scheduler.rawSend(mainProcess, msg);
	}

	var ports = setupEffects(managers, enqueue);

	return ports ? { ports: ports } : {};
}


// EFFECT MANAGERS

var effectManagers = {};

function setupEffects(managers, callback)
{
	var ports;

	// setup all necessary effect managers
	for (var key in effectManagers)
	{
		var manager = effectManagers[key];

		if (manager.isForeign)
		{
			ports = ports || {};
			ports[key] = manager.tag === 'cmd'
				? setupOutgoingPort(key)
				: setupIncomingPort(key, callback);
		}

		managers[key] = makeManager(manager, callback);
	}

	return ports;
}

function makeManager(info, callback)
{
	var router = {
		main: callback,
		self: undefined
	};

	var tag = info.tag;
	var onEffects = info.onEffects;
	var onSelfMsg = info.onSelfMsg;

	function onMessage(msg, state)
	{
		if (msg.ctor === 'self')
		{
			return A3(onSelfMsg, router, msg._0, state);
		}

		var fx = msg._0;
		switch (tag)
		{
			case 'cmd':
				return A3(onEffects, router, fx.cmds, state);

			case 'sub':
				return A3(onEffects, router, fx.subs, state);

			case 'fx':
				return A4(onEffects, router, fx.cmds, fx.subs, state);
		}
	}

	var process = spawnLoop(info.init, onMessage);
	router.self = process;
	return process;
}

function sendToApp(router, msg)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		router.main(msg);
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sendToSelf(router, msg)
{
	return A2(_elm_lang$core$Native_Scheduler.send, router.self, {
		ctor: 'self',
		_0: msg
	});
}


// HELPER for STATEFUL LOOPS

function spawnLoop(init, onMessage)
{
	var andThen = _elm_lang$core$Native_Scheduler.andThen;

	function loop(state)
	{
		var handleMsg = _elm_lang$core$Native_Scheduler.receive(function(msg) {
			return onMessage(msg, state);
		});
		return A2(andThen, loop, handleMsg);
	}

	var task = A2(andThen, loop, init);

	return _elm_lang$core$Native_Scheduler.rawSpawn(task);
}


// BAGS

function leaf(home)
{
	return function(value)
	{
		return {
			type: 'leaf',
			home: home,
			value: value
		};
	};
}

function batch(list)
{
	return {
		type: 'node',
		branches: list
	};
}

function map(tagger, bag)
{
	return {
		type: 'map',
		tagger: tagger,
		tree: bag
	}
}


// PIPE BAGS INTO EFFECT MANAGERS

function dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	gatherEffects(true, cmdBag, effectsDict, null);
	gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		var fx = home in effectsDict
			? effectsDict[home]
			: {
				cmds: _elm_lang$core$Native_List.Nil,
				subs: _elm_lang$core$Native_List.Nil
			};

		_elm_lang$core$Native_Scheduler.rawSend(managers[home], { ctor: 'fx', _0: fx });
	}
}

function gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.type)
	{
		case 'leaf':
			var home = bag.home;
			var effect = toEffect(isCmd, home, taggers, bag.value);
			effectsDict[home] = insert(isCmd, effect, effectsDict[home]);
			return;

		case 'node':
			var list = bag.branches;
			while (list.ctor !== '[]')
			{
				gatherEffects(isCmd, list._0, effectsDict, taggers);
				list = list._1;
			}
			return;

		case 'map':
			gatherEffects(isCmd, bag.tree, effectsDict, {
				tagger: bag.tagger,
				rest: taggers
			});
			return;
	}
}

function toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		var temp = taggers;
		while (temp)
		{
			x = temp.tagger(x);
			temp = temp.rest;
		}
		return x;
	}

	var map = isCmd
		? effectManagers[home].cmdMap
		: effectManagers[home].subMap;

	return A2(map, applyTaggers, value)
}

function insert(isCmd, newEffect, effects)
{
	effects = effects || {
		cmds: _elm_lang$core$Native_List.Nil,
		subs: _elm_lang$core$Native_List.Nil
	};
	if (isCmd)
	{
		effects.cmds = _elm_lang$core$Native_List.Cons(newEffect, effects.cmds);
		return effects;
	}
	effects.subs = _elm_lang$core$Native_List.Cons(newEffect, effects.subs);
	return effects;
}


// PORTS

function checkPortName(name)
{
	if (name in effectManagers)
	{
		throw new Error('There can only be one port named `' + name + '`, but your program has multiple.');
	}
}


// OUTGOING PORTS

function outgoingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'cmd',
		cmdMap: outgoingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var outgoingPortMap = F2(function cmdMap(tagger, value) {
	return value;
});

function setupOutgoingPort(name)
{
	var subs = [];
	var converter = effectManagers[name].converter;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function onEffects(router, cmdList, state)
	{
		while (cmdList.ctor !== '[]')
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = converter(cmdList._0);
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
			cmdList = cmdList._1;
		}
		return init;
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}


// INCOMING PORTS

function incomingPort(name, converter)
{
	checkPortName(name);
	effectManagers[name] = {
		tag: 'sub',
		subMap: incomingPortMap,
		converter: converter,
		isForeign: true
	};
	return leaf(name);
}

var incomingPortMap = F2(function subMap(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});

function setupIncomingPort(name, callback)
{
	var sentBeforeInit = [];
	var subs = _elm_lang$core$Native_List.Nil;
	var converter = effectManagers[name].converter;
	var currentOnEffects = preInitOnEffects;
	var currentSend = preInitSend;

	// CREATE MANAGER

	var init = _elm_lang$core$Native_Scheduler.succeed(null);

	function preInitOnEffects(router, subList, state)
	{
		var postInitResult = postInitOnEffects(router, subList, state);

		for(var i = 0; i < sentBeforeInit.length; i++)
		{
			postInitSend(sentBeforeInit[i]);
		}

		sentBeforeInit = null; // to release objects held in queue
		currentSend = postInitSend;
		currentOnEffects = postInitOnEffects;
		return postInitResult;
	}

	function postInitOnEffects(router, subList, state)
	{
		subs = subList;
		return init;
	}

	function onEffects(router, subList, state)
	{
		return currentOnEffects(router, subList, state);
	}

	effectManagers[name].init = init;
	effectManagers[name].onEffects = F3(onEffects);

	// PUBLIC API

	function preInitSend(value)
	{
		sentBeforeInit.push(value);
	}

	function postInitSend(value)
	{
		var temp = subs;
		while (temp.ctor !== '[]')
		{
			callback(temp._0(value));
			temp = temp._1;
		}
	}

	function send(incomingValue)
	{
		var result = A2(_elm_lang$core$Json_Decode$decodeValue, converter, incomingValue);
		if (result.ctor === 'Err')
		{
			throw new Error('Trying to send an unexpected type of value through port `' + name + '`:\n' + result._0);
		}

		currentSend(result._0);
	}

	return { send: send };
}

return {
	// routers
	sendToApp: F2(sendToApp),
	sendToSelf: F2(sendToSelf),

	// global setup
	effectManagers: effectManagers,
	outgoingPort: outgoingPort,
	incomingPort: incomingPort,

	htmlToProgram: htmlToProgram,
	program: program,
	programWithFlags: programWithFlags,
	initialize: initialize,

	// effect bags
	leaf: leaf,
	batch: batch,
	map: F2(map)
};

}();

//import Native.Utils //

var _elm_lang$core$Native_Scheduler = function() {

var MAX_STEPS = 10000;


// TASKS

function succeed(value)
{
	return {
		ctor: '_Task_succeed',
		value: value
	};
}

function fail(error)
{
	return {
		ctor: '_Task_fail',
		value: error
	};
}

function nativeBinding(callback)
{
	return {
		ctor: '_Task_nativeBinding',
		callback: callback,
		cancel: null
	};
}

function andThen(callback, task)
{
	return {
		ctor: '_Task_andThen',
		callback: callback,
		task: task
	};
}

function onError(callback, task)
{
	return {
		ctor: '_Task_onError',
		callback: callback,
		task: task
	};
}

function receive(callback)
{
	return {
		ctor: '_Task_receive',
		callback: callback
	};
}


// PROCESSES

function rawSpawn(task)
{
	var process = {
		ctor: '_Process',
		id: _elm_lang$core$Native_Utils.guid(),
		root: task,
		stack: null,
		mailbox: []
	};

	enqueue(process);

	return process;
}

function spawn(task)
{
	return nativeBinding(function(callback) {
		var process = rawSpawn(task);
		callback(succeed(process));
	});
}

function rawSend(process, msg)
{
	process.mailbox.push(msg);
	enqueue(process);
}

function send(process, msg)
{
	return nativeBinding(function(callback) {
		rawSend(process, msg);
		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function kill(process)
{
	return nativeBinding(function(callback) {
		var root = process.root;
		if (root.ctor === '_Task_nativeBinding' && root.cancel)
		{
			root.cancel();
		}

		process.root = null;

		callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}

function sleep(time)
{
	return nativeBinding(function(callback) {
		var id = setTimeout(function() {
			callback(succeed(_elm_lang$core$Native_Utils.Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}


// STEP PROCESSES

function step(numSteps, process)
{
	while (numSteps < MAX_STEPS)
	{
		var ctor = process.root.ctor;

		if (ctor === '_Task_succeed')
		{
			while (process.stack && process.stack.ctor === '_Task_onError')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_fail')
		{
			while (process.stack && process.stack.ctor === '_Task_andThen')
			{
				process.stack = process.stack.rest;
			}
			if (process.stack === null)
			{
				break;
			}
			process.root = process.stack.callback(process.root.value);
			process.stack = process.stack.rest;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_andThen')
		{
			process.stack = {
				ctor: '_Task_andThen',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_onError')
		{
			process.stack = {
				ctor: '_Task_onError',
				callback: process.root.callback,
				rest: process.stack
			};
			process.root = process.root.task;
			++numSteps;
			continue;
		}

		if (ctor === '_Task_nativeBinding')
		{
			process.root.cancel = process.root.callback(function(newRoot) {
				process.root = newRoot;
				enqueue(process);
			});

			break;
		}

		if (ctor === '_Task_receive')
		{
			var mailbox = process.mailbox;
			if (mailbox.length === 0)
			{
				break;
			}

			process.root = process.root.callback(mailbox.shift());
			++numSteps;
			continue;
		}

		throw new Error(ctor);
	}

	if (numSteps < MAX_STEPS)
	{
		return numSteps + 1;
	}
	enqueue(process);

	return numSteps;
}


// WORK QUEUE

var working = false;
var workQueue = [];

function enqueue(process)
{
	workQueue.push(process);

	if (!working)
	{
		setTimeout(work, 0);
		working = true;
	}
}

function work()
{
	var numSteps = 0;
	var process;
	while (numSteps < MAX_STEPS && (process = workQueue.shift()))
	{
		if (process.root)
		{
			numSteps = step(numSteps, process);
		}
	}
	if (!process)
	{
		working = false;
		return;
	}
	setTimeout(work, 0);
}


return {
	succeed: succeed,
	fail: fail,
	nativeBinding: nativeBinding,
	andThen: F2(andThen),
	onError: F2(onError),
	receive: receive,

	spawn: spawn,
	kill: kill,
	sleep: sleep,
	send: F2(send),

	rawSpawn: rawSpawn,
	rawSend: rawSend
};

}();
var _elm_lang$core$Platform_Cmd$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Cmd$none = _elm_lang$core$Platform_Cmd$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Cmd_ops = _elm_lang$core$Platform_Cmd_ops || {};
_elm_lang$core$Platform_Cmd_ops['!'] = F2(
	function (model, commands) {
		return {
			ctor: '_Tuple2',
			_0: model,
			_1: _elm_lang$core$Platform_Cmd$batch(commands)
		};
	});
var _elm_lang$core$Platform_Cmd$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Cmd$Cmd = {ctor: 'Cmd'};

var _elm_lang$core$Platform_Sub$batch = _elm_lang$core$Native_Platform.batch;
var _elm_lang$core$Platform_Sub$none = _elm_lang$core$Platform_Sub$batch(
	{ctor: '[]'});
var _elm_lang$core$Platform_Sub$map = _elm_lang$core$Native_Platform.map;
var _elm_lang$core$Platform_Sub$Sub = {ctor: 'Sub'};

var _elm_lang$core$Platform$hack = _elm_lang$core$Native_Scheduler.succeed;
var _elm_lang$core$Platform$sendToSelf = _elm_lang$core$Native_Platform.sendToSelf;
var _elm_lang$core$Platform$sendToApp = _elm_lang$core$Native_Platform.sendToApp;
var _elm_lang$core$Platform$programWithFlags = _elm_lang$core$Native_Platform.programWithFlags;
var _elm_lang$core$Platform$program = _elm_lang$core$Native_Platform.program;
var _elm_lang$core$Platform$Program = {ctor: 'Program'};
var _elm_lang$core$Platform$Task = {ctor: 'Task'};
var _elm_lang$core$Platform$ProcessId = {ctor: 'ProcessId'};
var _elm_lang$core$Platform$Router = {ctor: 'Router'};

var _toastal$either$Either$unwrap = F3(
	function (d, f, e) {
		var _p0 = e;
		if (_p0.ctor === 'Right') {
			return f(_p0._0);
		} else {
			return d;
		}
	});
var _toastal$either$Either$unpack = F3(
	function (f, g, e) {
		var _p1 = e;
		if (_p1.ctor === 'Left') {
			return f(_p1._0);
		} else {
			return g(_p1._0);
		}
	});
var _toastal$either$Either$fromRight = F2(
	function (d, e) {
		var _p2 = e;
		if (_p2.ctor === 'Right') {
			return _p2._0;
		} else {
			return d;
		}
	});
var _toastal$either$Either$withDefault = _toastal$either$Either$fromRight;
var _toastal$either$Either$fromLeft = F2(
	function (d, e) {
		var _p3 = e;
		if (_p3.ctor === 'Left') {
			return _p3._0;
		} else {
			return d;
		}
	});
var _toastal$either$Either$isRight = function (e) {
	var _p4 = e;
	if (_p4.ctor === 'Right') {
		return true;
	} else {
		return false;
	}
};
var _toastal$either$Either$isLeft = function (e) {
	var _p5 = e;
	if (_p5.ctor === 'Left') {
		return true;
	} else {
		return false;
	}
};
var _toastal$either$Either$toResult = function (e) {
	var _p6 = e;
	if (_p6.ctor === 'Left') {
		return _elm_lang$core$Result$Err(_p6._0);
	} else {
		return _elm_lang$core$Result$Ok(_p6._0);
	}
};
var _toastal$either$Either$leftToMaybe = function (e) {
	var _p7 = e;
	if (_p7.ctor === 'Left') {
		return _elm_lang$core$Maybe$Just(_p7._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _toastal$either$Either$toMaybe = function (e) {
	var _p8 = e;
	if (_p8.ctor === 'Right') {
		return _elm_lang$core$Maybe$Just(_p8._0);
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _toastal$either$Either$rightToMaybe = _toastal$either$Either$toMaybe;
var _toastal$either$Either$biList = A2(_toastal$either$Either$unpack, _elm_lang$core$List$singleton, _elm_lang$core$List$singleton);
var _toastal$either$Either$partition = function () {
	var fun = F2(
		function (e, _p9) {
			var _p10 = _p9;
			var _p13 = _p10._1;
			var _p12 = _p10._0;
			var _p11 = e;
			if (_p11.ctor === 'Left') {
				return {
					ctor: '_Tuple2',
					_0: {ctor: '::', _0: _p11._0, _1: _p12},
					_1: _p13
				};
			} else {
				return {
					ctor: '_Tuple2',
					_0: _p12,
					_1: {ctor: '::', _0: _p11._0, _1: _p13}
				};
			}
		});
	return A2(
		_elm_lang$core$List$foldr,
		fun,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		});
}();
var _toastal$either$Either$rights = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			var _p14 = e;
			if (_p14.ctor === 'Right') {
				return {ctor: '::', _0: _p14._0, _1: acc};
			} else {
				return acc;
			}
		}),
	{ctor: '[]'});
var _toastal$either$Either$lefts = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			var _p15 = e;
			if (_p15.ctor === 'Left') {
				return {ctor: '::', _0: _p15._0, _1: acc};
			} else {
				return acc;
			}
		}),
	{ctor: '[]'});
var _toastal$either$Either$foldr = F3(
	function (f, acc, e) {
		var _p16 = e;
		if (_p16.ctor === 'Left') {
			return acc;
		} else {
			return A2(f, _p16._0, acc);
		}
	});
var _toastal$either$Either$foldl = F3(
	function (f, acc, e) {
		var _p17 = e;
		if (_p17.ctor === 'Right') {
			return acc;
		} else {
			return A2(f, _p17._0, acc);
		}
	});
var _toastal$either$Either$length = function (e) {
	var _p18 = e;
	if (_p18.ctor === 'Left') {
		return 0;
	} else {
		return 1;
	}
};
var _toastal$either$Either$Right = function (a) {
	return {ctor: 'Right', _0: a};
};
var _toastal$either$Either$singleton = _toastal$either$Either$Right;
var _toastal$either$Either$andThenLeft = F2(
	function (f, e) {
		var _p19 = e;
		if (_p19.ctor === 'Left') {
			return f(_p19._0);
		} else {
			return _toastal$either$Either$Right(_p19._0);
		}
	});
var _toastal$either$Either$Left = function (a) {
	return {ctor: 'Left', _0: a};
};
var _toastal$either$Either$map = F2(
	function (f, e) {
		var _p20 = e;
		if (_p20.ctor === 'Right') {
			return _toastal$either$Either$Right(
				f(_p20._0));
		} else {
			return _toastal$either$Either$Left(_p20._0);
		}
	});
var _toastal$either$Either$mapRight = _toastal$either$Either$map;
var _toastal$either$Either$voidRight = function (f) {
	return _toastal$either$Either$map(
		_elm_lang$core$Basics$always(f));
};
var _toastal$either$Either$mapLeft = F2(
	function (f, e) {
		var _p21 = e;
		if (_p21.ctor === 'Left') {
			return _toastal$either$Either$Left(
				f(_p21._0));
		} else {
			return _toastal$either$Either$Right(_p21._0);
		}
	});
var _toastal$either$Either$voidLeft = function (f) {
	return _toastal$either$Either$mapLeft(
		_elm_lang$core$Basics$always(f));
};
var _toastal$either$Either$andMapLeft = F2(
	function (e, e1) {
		var _p22 = {ctor: '_Tuple2', _0: e, _1: e1};
		if (_p22._1.ctor === 'Right') {
			return _toastal$either$Either$Right(_p22._1._0);
		} else {
			return A2(_toastal$either$Either$mapLeft, _p22._1._0, _p22._0);
		}
	});
var _toastal$either$Either$mapBoth = F3(
	function (f, g, e) {
		var _p23 = e;
		if (_p23.ctor === 'Left') {
			return _toastal$either$Either$Left(
				f(_p23._0));
		} else {
			return _toastal$either$Either$Right(
				g(_p23._0));
		}
	});
var _toastal$either$Either$mapEach = F2(
	function (f, e) {
		var _p24 = e;
		if (_p24.ctor === 'Left') {
			return _toastal$either$Either$Left(
				f(_p24._0));
		} else {
			return _toastal$either$Either$Right(
				f(_p24._0));
		}
	});
var _toastal$either$Either$andMap = F2(
	function (e, e1) {
		var _p25 = {ctor: '_Tuple2', _0: e, _1: e1};
		if (_p25._1.ctor === 'Left') {
			return _toastal$either$Either$Left(_p25._1._0);
		} else {
			return A2(_toastal$either$Either$map, _p25._1._0, _p25._0);
		}
	});
var _toastal$either$Either$andMapRight = _toastal$either$Either$andMap;
var _toastal$either$Either$map2 = F3(
	function (f, e, e1) {
		var _p26 = {ctor: '_Tuple2', _0: e, _1: e1};
		if (_p26._0.ctor === 'Right') {
			if (_p26._1.ctor === 'Right') {
				return _toastal$either$Either$Right(
					A2(f, _p26._0._0, _p26._1._0));
			} else {
				return _toastal$either$Either$Left(_p26._1._0);
			}
		} else {
			return _toastal$either$Either$Left(_p26._0._0);
		}
	});
var _toastal$either$Either$map3 = F4(
	function (f, e, e1, e2) {
		var _p27 = {ctor: '_Tuple3', _0: e, _1: e1, _2: e2};
		if (_p27._0.ctor === 'Right') {
			if (_p27._1.ctor === 'Right') {
				if (_p27._2.ctor === 'Right') {
					return _toastal$either$Either$Right(
						A3(f, _p27._0._0, _p27._1._0, _p27._2._0));
				} else {
					return _toastal$either$Either$Left(_p27._2._0);
				}
			} else {
				return _toastal$either$Either$Left(_p27._1._0);
			}
		} else {
			return _toastal$either$Either$Left(_p27._0._0);
		}
	});
var _toastal$either$Either$map4 = F5(
	function (f, e, e1, e2, e3) {
		var _p28 = {ctor: '_Tuple4', _0: e, _1: e1, _2: e2, _3: e3};
		if (_p28._0.ctor === 'Right') {
			if (_p28._1.ctor === 'Right') {
				if (_p28._2.ctor === 'Right') {
					if (_p28._3.ctor === 'Right') {
						return _toastal$either$Either$Right(
							A4(f, _p28._0._0, _p28._1._0, _p28._2._0, _p28._3._0));
					} else {
						return _toastal$either$Either$Left(_p28._3._0);
					}
				} else {
					return _toastal$either$Either$Left(_p28._2._0);
				}
			} else {
				return _toastal$either$Either$Left(_p28._1._0);
			}
		} else {
			return _toastal$either$Either$Left(_p28._0._0);
		}
	});
var _toastal$either$Either$andThen = F2(
	function (f, e) {
		var _p29 = e;
		if (_p29.ctor === 'Right') {
			return f(_p29._0);
		} else {
			return _toastal$either$Either$Left(_p29._0);
		}
	});
var _toastal$either$Either$andThenRight = _toastal$either$Either$andThen;
var _toastal$either$Either$fromMaybe = F2(
	function (d, m) {
		var _p30 = m;
		if (_p30.ctor === 'Just') {
			return _toastal$either$Either$Right(_p30._0);
		} else {
			return _toastal$either$Either$Left(d);
		}
	});
var _toastal$either$Either$rightFromMaybe = _toastal$either$Either$fromMaybe;
var _toastal$either$Either$leftFromMaybe = F2(
	function (d, m) {
		var _p31 = m;
		if (_p31.ctor === 'Just') {
			return _toastal$either$Either$Left(_p31._0);
		} else {
			return _toastal$either$Either$Right(d);
		}
	});
var _toastal$either$Either$fromResult = function (r) {
	var _p32 = r;
	if (_p32.ctor === 'Err') {
		return _toastal$either$Either$Left(_p32._0);
	} else {
		return _toastal$either$Either$Right(_p32._0);
	}
};
var _toastal$either$Either$swap = function (e) {
	var _p33 = e;
	if (_p33.ctor === 'Left') {
		return _toastal$either$Either$Right(_p33._0);
	} else {
		return _toastal$either$Either$Left(_p33._0);
	}
};

var _elm_lang$core$Native_Bitwise = function() {

return {
	and: F2(function and(a, b) { return a & b; }),
	or: F2(function or(a, b) { return a | b; }),
	xor: F2(function xor(a, b) { return a ^ b; }),
	complement: function complement(a) { return ~a; },
	shiftLeftBy: F2(function(offset, a) { return a << offset; }),
	shiftRightBy: F2(function(offset, a) { return a >> offset; }),
	shiftRightZfBy: F2(function(offset, a) { return a >>> offset; })
};

}();

var _elm_lang$core$Bitwise$shiftRightZfBy = _elm_lang$core$Native_Bitwise.shiftRightZfBy;
var _elm_lang$core$Bitwise$shiftRightBy = _elm_lang$core$Native_Bitwise.shiftRightBy;
var _elm_lang$core$Bitwise$shiftLeftBy = _elm_lang$core$Native_Bitwise.shiftLeftBy;
var _elm_lang$core$Bitwise$complement = _elm_lang$core$Native_Bitwise.complement;
var _elm_lang$core$Bitwise$xor = _elm_lang$core$Native_Bitwise.xor;
var _elm_lang$core$Bitwise$or = _elm_lang$core$Native_Bitwise.or;
var _elm_lang$core$Bitwise$and = _elm_lang$core$Native_Bitwise.and;

var _Skinney$fnv$FNV$fnvPrime = (Math.pow(2, 24) + Math.pow(2, 8)) + 147;
var _Skinney$fnv$FNV$hashHelp = F2(
	function (c, hash) {
		return ((hash ^ _elm_lang$core$Char$toCode(c)) * _Skinney$fnv$FNV$fnvPrime) >>> 0;
	});
var _Skinney$fnv$FNV$hashString = function (str) {
	return A3(_elm_lang$core$String$foldl, _Skinney$fnv$FNV$hashHelp, 0, str);
};

var _TSFoster$elm_compare$Compare$comp = F3(
	function (fn, x, y) {
		return A2(
			_elm_lang$core$Basics$compare,
			fn(x),
			fn(y));
	});
var _TSFoster$elm_compare$Compare$descending = F3(
	function (fn, a, b) {
		return A2(fn, b, a);
	});
var _TSFoster$elm_compare$Compare$ascending = F3(
	function (fn, a, b) {
		return A2(fn, a, b);
	});
var _TSFoster$elm_compare$Compare$thenWithReverse = F3(
	function (ord, fn, next) {
		return next(
			F2(
				function (x, y) {
					var _p0 = A2(ord, x, y);
					if (_p0.ctor === 'EQ') {
						return A2(fn, y, x);
					} else {
						return _p0;
					}
				}));
	});
var _TSFoster$elm_compare$Compare$thenByReverse = F2(
	function (ord, fn) {
		return A2(
			_TSFoster$elm_compare$Compare$thenWithReverse,
			ord,
			_TSFoster$elm_compare$Compare$comp(fn));
	});
var _TSFoster$elm_compare$Compare$thenWith = F3(
	function (ord, fn, next) {
		return next(
			F2(
				function (x, y) {
					var _p1 = A2(ord, x, y);
					if (_p1.ctor === 'EQ') {
						return A2(fn, x, y);
					} else {
						return _p1;
					}
				}));
	});
var _TSFoster$elm_compare$Compare$thenBy = F2(
	function (ord, fn) {
		return A2(
			_TSFoster$elm_compare$Compare$thenWith,
			ord,
			_TSFoster$elm_compare$Compare$comp(fn));
	});
var _TSFoster$elm_compare$Compare$with = F2(
	function (fn, next) {
		return next(fn);
	});
var _TSFoster$elm_compare$Compare$by = function (fn) {
	return _TSFoster$elm_compare$Compare$with(
		_TSFoster$elm_compare$Compare$comp(fn));
};

//import Native.List //

var _elm_lang$core$Native_Array = function() {

// A RRB-Tree has two distinct data types.
// Leaf -> "height"  is always 0
//         "table"   is an array of elements
// Node -> "height"  is always greater than 0
//         "table"   is an array of child nodes
//         "lengths" is an array of accumulated lengths of the child nodes

// M is the maximal table size. 32 seems fast. E is the allowed increase
// of search steps when concatting to find an index. Lower values will
// decrease balancing, but will increase search steps.
var M = 32;
var E = 2;

// An empty array.
var empty = {
	ctor: '_Array',
	height: 0,
	table: []
};


function get(i, array)
{
	if (i < 0 || i >= length(array))
	{
		throw new Error(
			'Index ' + i + ' is out of range. Check the length of ' +
			'your array first or use getMaybe or getWithDefault.');
	}
	return unsafeGet(i, array);
}


function unsafeGet(i, array)
{
	for (var x = array.height; x > 0; x--)
	{
		var slot = i >> (x * 5);
		while (array.lengths[slot] <= i)
		{
			slot++;
		}
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array = array.table[slot];
	}
	return array.table[i];
}


// Sets the value at the index i. Only the nodes leading to i will get
// copied and updated.
function set(i, item, array)
{
	if (i < 0 || length(array) <= i)
	{
		return array;
	}
	return unsafeSet(i, item, array);
}


function unsafeSet(i, item, array)
{
	array = nodeCopy(array);

	if (array.height === 0)
	{
		array.table[i] = item;
	}
	else
	{
		var slot = getSlot(i, array);
		if (slot > 0)
		{
			i -= array.lengths[slot - 1];
		}
		array.table[slot] = unsafeSet(i, item, array.table[slot]);
	}
	return array;
}


function initialize(len, f)
{
	if (len <= 0)
	{
		return empty;
	}
	var h = Math.floor( Math.log(len) / Math.log(M) );
	return initialize_(f, h, 0, len);
}

function initialize_(f, h, from, to)
{
	if (h === 0)
	{
		var table = new Array((to - from) % (M + 1));
		for (var i = 0; i < table.length; i++)
		{
		  table[i] = f(from + i);
		}
		return {
			ctor: '_Array',
			height: 0,
			table: table
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = initialize_(f, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i-1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

function fromList(list)
{
	if (list.ctor === '[]')
	{
		return empty;
	}

	// Allocate M sized blocks (table) and write list elements to it.
	var table = new Array(M);
	var nodes = [];
	var i = 0;

	while (list.ctor !== '[]')
	{
		table[i] = list._0;
		list = list._1;
		i++;

		// table is full, so we can push a leaf containing it into the
		// next node.
		if (i === M)
		{
			var leaf = {
				ctor: '_Array',
				height: 0,
				table: table
			};
			fromListPush(leaf, nodes);
			table = new Array(M);
			i = 0;
		}
	}

	// Maybe there is something left on the table.
	if (i > 0)
	{
		var leaf = {
			ctor: '_Array',
			height: 0,
			table: table.splice(0, i)
		};
		fromListPush(leaf, nodes);
	}

	// Go through all of the nodes and eventually push them into higher nodes.
	for (var h = 0; h < nodes.length - 1; h++)
	{
		if (nodes[h].table.length > 0)
		{
			fromListPush(nodes[h], nodes);
		}
	}

	var head = nodes[nodes.length - 1];
	if (head.height > 0 && head.table.length === 1)
	{
		return head.table[0];
	}
	else
	{
		return head;
	}
}

// Push a node into a higher node as a child.
function fromListPush(toPush, nodes)
{
	var h = toPush.height;

	// Maybe the node on this height does not exist.
	if (nodes.length === h)
	{
		var node = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
		nodes.push(node);
	}

	nodes[h].table.push(toPush);
	var len = length(toPush);
	if (nodes[h].lengths.length > 0)
	{
		len += nodes[h].lengths[nodes[h].lengths.length - 1];
	}
	nodes[h].lengths.push(len);

	if (nodes[h].table.length === M)
	{
		fromListPush(nodes[h], nodes);
		nodes[h] = {
			ctor: '_Array',
			height: h + 1,
			table: [],
			lengths: []
		};
	}
}

// Pushes an item via push_ to the bottom right of a tree.
function push(item, a)
{
	var pushed = push_(item, a);
	if (pushed !== null)
	{
		return pushed;
	}

	var newTree = create(item, a.height);
	return siblise(a, newTree);
}

// Recursively tries to push an item to the bottom-right most
// tree possible. If there is no space left for the item,
// null will be returned.
function push_(item, a)
{
	// Handle resursion stop at leaf level.
	if (a.height === 0)
	{
		if (a.table.length < M)
		{
			var newA = {
				ctor: '_Array',
				height: 0,
				table: a.table.slice()
			};
			newA.table.push(item);
			return newA;
		}
		else
		{
		  return null;
		}
	}

	// Recursively push
	var pushed = push_(item, botRight(a));

	// There was space in the bottom right tree, so the slot will
	// be updated.
	if (pushed !== null)
	{
		var newA = nodeCopy(a);
		newA.table[newA.table.length - 1] = pushed;
		newA.lengths[newA.lengths.length - 1]++;
		return newA;
	}

	// When there was no space left, check if there is space left
	// for a new slot with a tree which contains only the item
	// at the bottom.
	if (a.table.length < M)
	{
		var newSlot = create(item, a.height - 1);
		var newA = nodeCopy(a);
		newA.table.push(newSlot);
		newA.lengths.push(newA.lengths[newA.lengths.length - 1] + length(newSlot));
		return newA;
	}
	else
	{
		return null;
	}
}

// Converts an array into a list of elements.
function toList(a)
{
	return toList_(_elm_lang$core$Native_List.Nil, a);
}

function toList_(list, a)
{
	for (var i = a.table.length - 1; i >= 0; i--)
	{
		list =
			a.height === 0
				? _elm_lang$core$Native_List.Cons(a.table[i], list)
				: toList_(list, a.table[i]);
	}
	return list;
}

// Maps a function over the elements of an array.
function map(f, a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? f(a.table[i])
				: map(f, a.table[i]);
	}
	return newA;
}

// Maps a function over the elements with their index as first argument.
function indexedMap(f, a)
{
	return indexedMap_(f, a, 0);
}

function indexedMap_(f, a, from)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: new Array(a.table.length)
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths;
	}
	for (var i = 0; i < a.table.length; i++)
	{
		newA.table[i] =
			a.height === 0
				? A2(f, from + i, a.table[i])
				: indexedMap_(f, a.table[i], i == 0 ? from : from + a.lengths[i - 1]);
	}
	return newA;
}

function foldl(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = 0; i < a.table.length; i++)
		{
			b = foldl(f, b, a.table[i]);
		}
	}
	return b;
}

function foldr(f, b, a)
{
	if (a.height === 0)
	{
		for (var i = a.table.length; i--; )
		{
			b = A2(f, a.table[i], b);
		}
	}
	else
	{
		for (var i = a.table.length; i--; )
		{
			b = foldr(f, b, a.table[i]);
		}
	}
	return b;
}

// TODO: currently, it slices the right, then the left. This can be
// optimized.
function slice(from, to, a)
{
	if (from < 0)
	{
		from += length(a);
	}
	if (to < 0)
	{
		to += length(a);
	}
	return sliceLeft(from, sliceRight(to, a));
}

function sliceRight(to, a)
{
	if (to === length(a))
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(0, to);
		return newA;
	}

	// Slice the right recursively.
	var right = getSlot(to, a);
	var sliced = sliceRight(to - (right > 0 ? a.lengths[right - 1] : 0), a.table[right]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (right === 0)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(0, right),
		lengths: a.lengths.slice(0, right)
	};
	if (sliced.table.length > 0)
	{
		newA.table[right] = sliced;
		newA.lengths[right] = length(sliced) + (right > 0 ? newA.lengths[right - 1] : 0);
	}
	return newA;
}

function sliceLeft(from, a)
{
	if (from === 0)
	{
		return a;
	}

	// Handle leaf level.
	if (a.height === 0)
	{
		var newA = { ctor:'_Array', height:0 };
		newA.table = a.table.slice(from, a.table.length + 1);
		return newA;
	}

	// Slice the left recursively.
	var left = getSlot(from, a);
	var sliced = sliceLeft(from - (left > 0 ? a.lengths[left - 1] : 0), a.table[left]);

	// Maybe the a node is not even needed, as sliced contains the whole slice.
	if (left === a.table.length - 1)
	{
		return sliced;
	}

	// Create new node.
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice(left, a.table.length + 1),
		lengths: new Array(a.table.length - left)
	};
	newA.table[0] = sliced;
	var len = 0;
	for (var i = 0; i < newA.table.length; i++)
	{
		len += length(newA.table[i]);
		newA.lengths[i] = len;
	}

	return newA;
}

// Appends two trees.
function append(a,b)
{
	if (a.table.length === 0)
	{
		return b;
	}
	if (b.table.length === 0)
	{
		return a;
	}

	var c = append_(a, b);

	// Check if both nodes can be crunshed together.
	if (c[0].table.length + c[1].table.length <= M)
	{
		if (c[0].table.length === 0)
		{
			return c[1];
		}
		if (c[1].table.length === 0)
		{
			return c[0];
		}

		// Adjust .table and .lengths
		c[0].table = c[0].table.concat(c[1].table);
		if (c[0].height > 0)
		{
			var len = length(c[0]);
			for (var i = 0; i < c[1].lengths.length; i++)
			{
				c[1].lengths[i] += len;
			}
			c[0].lengths = c[0].lengths.concat(c[1].lengths);
		}

		return c[0];
	}

	if (c[0].height > 0)
	{
		var toRemove = calcToRemove(a, b);
		if (toRemove > E)
		{
			c = shuffle(c[0], c[1], toRemove);
		}
	}

	return siblise(c[0], c[1]);
}

// Returns an array of two nodes; right and left. One node _may_ be empty.
function append_(a, b)
{
	if (a.height === 0 && b.height === 0)
	{
		return [a, b];
	}

	if (a.height !== 1 || b.height !== 1)
	{
		if (a.height === b.height)
		{
			a = nodeCopy(a);
			b = nodeCopy(b);
			var appended = append_(botRight(a), botLeft(b));

			insertRight(a, appended[1]);
			insertLeft(b, appended[0]);
		}
		else if (a.height > b.height)
		{
			a = nodeCopy(a);
			var appended = append_(botRight(a), b);

			insertRight(a, appended[0]);
			b = parentise(appended[1], appended[1].height + 1);
		}
		else
		{
			b = nodeCopy(b);
			var appended = append_(a, botLeft(b));

			var left = appended[0].table.length === 0 ? 0 : 1;
			var right = left === 0 ? 1 : 0;
			insertLeft(b, appended[left]);
			a = parentise(appended[right], appended[right].height + 1);
		}
	}

	// Check if balancing is needed and return based on that.
	if (a.table.length === 0 || b.table.length === 0)
	{
		return [a, b];
	}

	var toRemove = calcToRemove(a, b);
	if (toRemove <= E)
	{
		return [a, b];
	}
	return shuffle(a, b, toRemove);
}

// Helperfunctions for append_. Replaces a child node at the side of the parent.
function insertRight(parent, node)
{
	var index = parent.table.length - 1;
	parent.table[index] = node;
	parent.lengths[index] = length(node);
	parent.lengths[index] += index > 0 ? parent.lengths[index - 1] : 0;
}

function insertLeft(parent, node)
{
	if (node.table.length > 0)
	{
		parent.table[0] = node;
		parent.lengths[0] = length(node);

		var len = length(parent.table[0]);
		for (var i = 1; i < parent.lengths.length; i++)
		{
			len += length(parent.table[i]);
			parent.lengths[i] = len;
		}
	}
	else
	{
		parent.table.shift();
		for (var i = 1; i < parent.lengths.length; i++)
		{
			parent.lengths[i] = parent.lengths[i] - parent.lengths[0];
		}
		parent.lengths.shift();
	}
}

// Returns the extra search steps for E. Refer to the paper.
function calcToRemove(a, b)
{
	var subLengths = 0;
	for (var i = 0; i < a.table.length; i++)
	{
		subLengths += a.table[i].table.length;
	}
	for (var i = 0; i < b.table.length; i++)
	{
		subLengths += b.table[i].table.length;
	}

	var toRemove = a.table.length + b.table.length;
	return toRemove - (Math.floor((subLengths - 1) / M) + 1);
}

// get2, set2 and saveSlot are helpers for accessing elements over two arrays.
function get2(a, b, index)
{
	return index < a.length
		? a[index]
		: b[index - a.length];
}

function set2(a, b, index, value)
{
	if (index < a.length)
	{
		a[index] = value;
	}
	else
	{
		b[index - a.length] = value;
	}
}

function saveSlot(a, b, index, slot)
{
	set2(a.table, b.table, index, slot);

	var l = (index === 0 || index === a.lengths.length)
		? 0
		: get2(a.lengths, a.lengths, index - 1);

	set2(a.lengths, b.lengths, index, l + length(slot));
}

// Creates a node or leaf with a given length at their arrays for perfomance.
// Is only used by shuffle.
function createNode(h, length)
{
	if (length < 0)
	{
		length = 0;
	}
	var a = {
		ctor: '_Array',
		height: h,
		table: new Array(length)
	};
	if (h > 0)
	{
		a.lengths = new Array(length);
	}
	return a;
}

// Returns an array of two balanced nodes.
function shuffle(a, b, toRemove)
{
	var newA = createNode(a.height, Math.min(M, a.table.length + b.table.length - toRemove));
	var newB = createNode(a.height, newA.table.length - (a.table.length + b.table.length - toRemove));

	// Skip the slots with size M. More precise: copy the slot references
	// to the new node
	var read = 0;
	while (get2(a.table, b.table, read).table.length % M === 0)
	{
		set2(newA.table, newB.table, read, get2(a.table, b.table, read));
		set2(newA.lengths, newB.lengths, read, get2(a.lengths, b.lengths, read));
		read++;
	}

	// Pulling items from left to right, caching in a slot before writing
	// it into the new nodes.
	var write = read;
	var slot = new createNode(a.height - 1, 0);
	var from = 0;

	// If the current slot is still containing data, then there will be at
	// least one more write, so we do not break this loop yet.
	while (read - write - (slot.table.length > 0 ? 1 : 0) < toRemove)
	{
		// Find out the max possible items for copying.
		var source = get2(a.table, b.table, read);
		var to = Math.min(M - slot.table.length, source.table.length);

		// Copy and adjust size table.
		slot.table = slot.table.concat(source.table.slice(from, to));
		if (slot.height > 0)
		{
			var len = slot.lengths.length;
			for (var i = len; i < len + to - from; i++)
			{
				slot.lengths[i] = length(slot.table[i]);
				slot.lengths[i] += (i > 0 ? slot.lengths[i - 1] : 0);
			}
		}

		from += to;

		// Only proceed to next slots[i] if the current one was
		// fully copied.
		if (source.table.length <= to)
		{
			read++; from = 0;
		}

		// Only create a new slot if the current one is filled up.
		if (slot.table.length === M)
		{
			saveSlot(newA, newB, write, slot);
			slot = createNode(a.height - 1, 0);
			write++;
		}
	}

	// Cleanup after the loop. Copy the last slot into the new nodes.
	if (slot.table.length > 0)
	{
		saveSlot(newA, newB, write, slot);
		write++;
	}

	// Shift the untouched slots to the left
	while (read < a.table.length + b.table.length )
	{
		saveSlot(newA, newB, write, get2(a.table, b.table, read));
		read++;
		write++;
	}

	return [newA, newB];
}

// Navigation functions
function botRight(a)
{
	return a.table[a.table.length - 1];
}
function botLeft(a)
{
	return a.table[0];
}

// Copies a node for updating. Note that you should not use this if
// only updating only one of "table" or "lengths" for performance reasons.
function nodeCopy(a)
{
	var newA = {
		ctor: '_Array',
		height: a.height,
		table: a.table.slice()
	};
	if (a.height > 0)
	{
		newA.lengths = a.lengths.slice();
	}
	return newA;
}

// Returns how many items are in the tree.
function length(array)
{
	if (array.height === 0)
	{
		return array.table.length;
	}
	else
	{
		return array.lengths[array.lengths.length - 1];
	}
}

// Calculates in which slot of "table" the item probably is, then
// find the exact slot via forward searching in  "lengths". Returns the index.
function getSlot(i, a)
{
	var slot = i >> (5 * a.height);
	while (a.lengths[slot] <= i)
	{
		slot++;
	}
	return slot;
}

// Recursively creates a tree with a given height containing
// only the given item.
function create(item, h)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: [item]
		};
	}
	return {
		ctor: '_Array',
		height: h,
		table: [create(item, h - 1)],
		lengths: [1]
	};
}

// Recursively creates a tree that contains the given tree.
function parentise(tree, h)
{
	if (h === tree.height)
	{
		return tree;
	}

	return {
		ctor: '_Array',
		height: h,
		table: [parentise(tree, h - 1)],
		lengths: [length(tree)]
	};
}

// Emphasizes blood brotherhood beneath two trees.
function siblise(a, b)
{
	return {
		ctor: '_Array',
		height: a.height + 1,
		table: [a, b],
		lengths: [length(a), length(a) + length(b)]
	};
}

function toJSArray(a)
{
	var jsArray = new Array(length(a));
	toJSArray_(jsArray, 0, a);
	return jsArray;
}

function toJSArray_(jsArray, i, a)
{
	for (var t = 0; t < a.table.length; t++)
	{
		if (a.height === 0)
		{
			jsArray[i + t] = a.table[t];
		}
		else
		{
			var inc = t === 0 ? 0 : a.lengths[t - 1];
			toJSArray_(jsArray, i + inc, a.table[t]);
		}
	}
}

function fromJSArray(jsArray)
{
	if (jsArray.length === 0)
	{
		return empty;
	}
	var h = Math.floor(Math.log(jsArray.length) / Math.log(M));
	return fromJSArray_(jsArray, h, 0, jsArray.length);
}

function fromJSArray_(jsArray, h, from, to)
{
	if (h === 0)
	{
		return {
			ctor: '_Array',
			height: 0,
			table: jsArray.slice(from, to)
		};
	}

	var step = Math.pow(M, h);
	var table = new Array(Math.ceil((to - from) / step));
	var lengths = new Array(table.length);
	for (var i = 0; i < table.length; i++)
	{
		table[i] = fromJSArray_(jsArray, h - 1, from + (i * step), Math.min(from + ((i + 1) * step), to));
		lengths[i] = length(table[i]) + (i > 0 ? lengths[i - 1] : 0);
	}
	return {
		ctor: '_Array',
		height: h,
		table: table,
		lengths: lengths
	};
}

return {
	empty: empty,
	fromList: fromList,
	toList: toList,
	initialize: F2(initialize),
	append: F2(append),
	push: F2(push),
	slice: F3(slice),
	get: F2(get),
	set: F3(set),
	map: F2(map),
	indexedMap: F2(indexedMap),
	foldl: F3(foldl),
	foldr: F3(foldr),
	length: length,

	toJSArray: toJSArray,
	fromJSArray: fromJSArray
};

}();
var _elm_lang$core$Array$append = _elm_lang$core$Native_Array.append;
var _elm_lang$core$Array$length = _elm_lang$core$Native_Array.length;
var _elm_lang$core$Array$isEmpty = function (array) {
	return _elm_lang$core$Native_Utils.eq(
		_elm_lang$core$Array$length(array),
		0);
};
var _elm_lang$core$Array$slice = _elm_lang$core$Native_Array.slice;
var _elm_lang$core$Array$set = _elm_lang$core$Native_Array.set;
var _elm_lang$core$Array$get = F2(
	function (i, array) {
		return ((_elm_lang$core$Native_Utils.cmp(0, i) < 1) && (_elm_lang$core$Native_Utils.cmp(
			i,
			_elm_lang$core$Native_Array.length(array)) < 0)) ? _elm_lang$core$Maybe$Just(
			A2(_elm_lang$core$Native_Array.get, i, array)) : _elm_lang$core$Maybe$Nothing;
	});
var _elm_lang$core$Array$push = _elm_lang$core$Native_Array.push;
var _elm_lang$core$Array$empty = _elm_lang$core$Native_Array.empty;
var _elm_lang$core$Array$filter = F2(
	function (isOkay, arr) {
		var update = F2(
			function (x, xs) {
				return isOkay(x) ? A2(_elm_lang$core$Native_Array.push, x, xs) : xs;
			});
		return A3(_elm_lang$core$Native_Array.foldl, update, _elm_lang$core$Native_Array.empty, arr);
	});
var _elm_lang$core$Array$foldr = _elm_lang$core$Native_Array.foldr;
var _elm_lang$core$Array$foldl = _elm_lang$core$Native_Array.foldl;
var _elm_lang$core$Array$indexedMap = _elm_lang$core$Native_Array.indexedMap;
var _elm_lang$core$Array$map = _elm_lang$core$Native_Array.map;
var _elm_lang$core$Array$toIndexedList = function (array) {
	return A3(
		_elm_lang$core$List$map2,
		F2(
			function (v0, v1) {
				return {ctor: '_Tuple2', _0: v0, _1: v1};
			}),
		A2(
			_elm_lang$core$List$range,
			0,
			_elm_lang$core$Native_Array.length(array) - 1),
		_elm_lang$core$Native_Array.toList(array));
};
var _elm_lang$core$Array$toList = _elm_lang$core$Native_Array.toList;
var _elm_lang$core$Array$fromList = _elm_lang$core$Native_Array.fromList;
var _elm_lang$core$Array$initialize = _elm_lang$core$Native_Array.initialize;
var _elm_lang$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			_elm_lang$core$Array$initialize,
			n,
			_elm_lang$core$Basics$always(e));
	});
var _elm_lang$core$Array$Array = {ctor: 'Array'};

var _elm_lang$core$Dict$foldr = F3(
	function (f, acc, t) {
		foldr:
		while (true) {
			var _p0 = t;
			if (_p0.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v1 = f,
					_v2 = A3(
					f,
					_p0._1,
					_p0._2,
					A3(_elm_lang$core$Dict$foldr, f, acc, _p0._4)),
					_v3 = _p0._3;
				f = _v1;
				acc = _v2;
				t = _v3;
				continue foldr;
			}
		}
	});
var _elm_lang$core$Dict$keys = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return {ctor: '::', _0: key, _1: keyList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$values = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return {ctor: '::', _0: value, _1: valueList};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$toList = function (dict) {
	return A3(
		_elm_lang$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: key, _1: value},
					_1: list
				};
			}),
		{ctor: '[]'},
		dict);
};
var _elm_lang$core$Dict$foldl = F3(
	function (f, acc, dict) {
		foldl:
		while (true) {
			var _p1 = dict;
			if (_p1.ctor === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var _v5 = f,
					_v6 = A3(
					f,
					_p1._1,
					_p1._2,
					A3(_elm_lang$core$Dict$foldl, f, acc, _p1._3)),
					_v7 = _p1._4;
				f = _v5;
				acc = _v6;
				dict = _v7;
				continue foldl;
			}
		}
	});
var _elm_lang$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _p2) {
				stepState:
				while (true) {
					var _p3 = _p2;
					var _p9 = _p3._1;
					var _p8 = _p3._0;
					var _p4 = _p8;
					if (_p4.ctor === '[]') {
						return {
							ctor: '_Tuple2',
							_0: _p8,
							_1: A3(rightStep, rKey, rValue, _p9)
						};
					} else {
						var _p7 = _p4._1;
						var _p6 = _p4._0._1;
						var _p5 = _p4._0._0;
						if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) < 0) {
							var _v10 = rKey,
								_v11 = rValue,
								_v12 = {
								ctor: '_Tuple2',
								_0: _p7,
								_1: A3(leftStep, _p5, _p6, _p9)
							};
							rKey = _v10;
							rValue = _v11;
							_p2 = _v12;
							continue stepState;
						} else {
							if (_elm_lang$core$Native_Utils.cmp(_p5, rKey) > 0) {
								return {
									ctor: '_Tuple2',
									_0: _p8,
									_1: A3(rightStep, rKey, rValue, _p9)
								};
							} else {
								return {
									ctor: '_Tuple2',
									_0: _p7,
									_1: A4(bothStep, _p5, _p6, rValue, _p9)
								};
							}
						}
					}
				}
			});
		var _p10 = A3(
			_elm_lang$core$Dict$foldl,
			stepState,
			{
				ctor: '_Tuple2',
				_0: _elm_lang$core$Dict$toList(leftDict),
				_1: initialResult
			},
			rightDict);
		var leftovers = _p10._0;
		var intermediateResult = _p10._1;
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (_p11, result) {
					var _p12 = _p11;
					return A3(leftStep, _p12._0, _p12._1, result);
				}),
			intermediateResult,
			leftovers);
	});
var _elm_lang$core$Dict$reportRemBug = F4(
	function (msg, c, lgot, rgot) {
		return _elm_lang$core$Native_Debug.crash(
			_elm_lang$core$String$concat(
				{
					ctor: '::',
					_0: 'Internal red-black tree invariant violated, expected ',
					_1: {
						ctor: '::',
						_0: msg,
						_1: {
							ctor: '::',
							_0: ' and got ',
							_1: {
								ctor: '::',
								_0: _elm_lang$core$Basics$toString(c),
								_1: {
									ctor: '::',
									_0: '/',
									_1: {
										ctor: '::',
										_0: lgot,
										_1: {
											ctor: '::',
											_0: '/',
											_1: {
												ctor: '::',
												_0: rgot,
												_1: {
													ctor: '::',
													_0: '\nPlease report this bug to <https://github.com/elm-lang/core/issues>',
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					}
				}));
	});
var _elm_lang$core$Dict$isBBlack = function (dict) {
	var _p13 = dict;
	_v14_2:
	do {
		if (_p13.ctor === 'RBNode_elm_builtin') {
			if (_p13._0.ctor === 'BBlack') {
				return true;
			} else {
				break _v14_2;
			}
		} else {
			if (_p13._0.ctor === 'LBBlack') {
				return true;
			} else {
				break _v14_2;
			}
		}
	} while(false);
	return false;
};
var _elm_lang$core$Dict$sizeHelp = F2(
	function (n, dict) {
		sizeHelp:
		while (true) {
			var _p14 = dict;
			if (_p14.ctor === 'RBEmpty_elm_builtin') {
				return n;
			} else {
				var _v16 = A2(_elm_lang$core$Dict$sizeHelp, n + 1, _p14._4),
					_v17 = _p14._3;
				n = _v16;
				dict = _v17;
				continue sizeHelp;
			}
		}
	});
var _elm_lang$core$Dict$size = function (dict) {
	return A2(_elm_lang$core$Dict$sizeHelp, 0, dict);
};
var _elm_lang$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			var _p15 = dict;
			if (_p15.ctor === 'RBEmpty_elm_builtin') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p16 = A2(_elm_lang$core$Basics$compare, targetKey, _p15._1);
				switch (_p16.ctor) {
					case 'LT':
						var _v20 = targetKey,
							_v21 = _p15._3;
						targetKey = _v20;
						dict = _v21;
						continue get;
					case 'EQ':
						return _elm_lang$core$Maybe$Just(_p15._2);
					default:
						var _v22 = targetKey,
							_v23 = _p15._4;
						targetKey = _v22;
						dict = _v23;
						continue get;
				}
			}
		}
	});
var _elm_lang$core$Dict$member = F2(
	function (key, dict) {
		var _p17 = A2(_elm_lang$core$Dict$get, key, dict);
		if (_p17.ctor === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var _elm_lang$core$Dict$maxWithDefault = F3(
	function (k, v, r) {
		maxWithDefault:
		while (true) {
			var _p18 = r;
			if (_p18.ctor === 'RBEmpty_elm_builtin') {
				return {ctor: '_Tuple2', _0: k, _1: v};
			} else {
				var _v26 = _p18._1,
					_v27 = _p18._2,
					_v28 = _p18._4;
				k = _v26;
				v = _v27;
				r = _v28;
				continue maxWithDefault;
			}
		}
	});
var _elm_lang$core$Dict$NBlack = {ctor: 'NBlack'};
var _elm_lang$core$Dict$BBlack = {ctor: 'BBlack'};
var _elm_lang$core$Dict$Black = {ctor: 'Black'};
var _elm_lang$core$Dict$blackish = function (t) {
	var _p19 = t;
	if (_p19.ctor === 'RBNode_elm_builtin') {
		var _p20 = _p19._0;
		return _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$Black) || _elm_lang$core$Native_Utils.eq(_p20, _elm_lang$core$Dict$BBlack);
	} else {
		return true;
	}
};
var _elm_lang$core$Dict$Red = {ctor: 'Red'};
var _elm_lang$core$Dict$moreBlack = function (color) {
	var _p21 = color;
	switch (_p21.ctor) {
		case 'Black':
			return _elm_lang$core$Dict$BBlack;
		case 'Red':
			return _elm_lang$core$Dict$Black;
		case 'NBlack':
			return _elm_lang$core$Dict$Red;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a double black node more black!');
	}
};
var _elm_lang$core$Dict$lessBlack = function (color) {
	var _p22 = color;
	switch (_p22.ctor) {
		case 'BBlack':
			return _elm_lang$core$Dict$Black;
		case 'Black':
			return _elm_lang$core$Dict$Red;
		case 'Red':
			return _elm_lang$core$Dict$NBlack;
		default:
			return _elm_lang$core$Native_Debug.crash('Can\'t make a negative black node less black!');
	}
};
var _elm_lang$core$Dict$LBBlack = {ctor: 'LBBlack'};
var _elm_lang$core$Dict$LBlack = {ctor: 'LBlack'};
var _elm_lang$core$Dict$RBEmpty_elm_builtin = function (a) {
	return {ctor: 'RBEmpty_elm_builtin', _0: a};
};
var _elm_lang$core$Dict$empty = _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
var _elm_lang$core$Dict$isEmpty = function (dict) {
	return _elm_lang$core$Native_Utils.eq(dict, _elm_lang$core$Dict$empty);
};
var _elm_lang$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {ctor: 'RBNode_elm_builtin', _0: a, _1: b, _2: c, _3: d, _4: e};
	});
var _elm_lang$core$Dict$ensureBlackRoot = function (dict) {
	var _p23 = dict;
	if ((_p23.ctor === 'RBNode_elm_builtin') && (_p23._0.ctor === 'Red')) {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p23._1, _p23._2, _p23._3, _p23._4);
	} else {
		return dict;
	}
};
var _elm_lang$core$Dict$lessBlackTree = function (dict) {
	var _p24 = dict;
	if (_p24.ctor === 'RBNode_elm_builtin') {
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$lessBlack(_p24._0),
			_p24._1,
			_p24._2,
			_p24._3,
			_p24._4);
	} else {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	}
};
var _elm_lang$core$Dict$balancedTree = function (col) {
	return function (xk) {
		return function (xv) {
			return function (yk) {
				return function (yv) {
					return function (zk) {
						return function (zv) {
							return function (a) {
								return function (b) {
									return function (c) {
										return function (d) {
											return A5(
												_elm_lang$core$Dict$RBNode_elm_builtin,
												_elm_lang$core$Dict$lessBlack(col),
												yk,
												yv,
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, xk, xv, a, b),
												A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, zk, zv, c, d));
										};
									};
								};
							};
						};
					};
				};
			};
		};
	};
};
var _elm_lang$core$Dict$blacken = function (t) {
	var _p25 = t;
	if (_p25.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p25._1, _p25._2, _p25._3, _p25._4);
	}
};
var _elm_lang$core$Dict$redden = function (t) {
	var _p26 = t;
	if (_p26.ctor === 'RBEmpty_elm_builtin') {
		return _elm_lang$core$Native_Debug.crash('can\'t make a Leaf red');
	} else {
		return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, _p26._1, _p26._2, _p26._3, _p26._4);
	}
};
var _elm_lang$core$Dict$balanceHelp = function (tree) {
	var _p27 = tree;
	_v36_6:
	do {
		_v36_5:
		do {
			_v36_4:
			do {
				_v36_3:
				do {
					_v36_2:
					do {
						_v36_1:
						do {
							_v36_0:
							do {
								if (_p27.ctor === 'RBNode_elm_builtin') {
									if (_p27._3.ctor === 'RBNode_elm_builtin') {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._3._0.ctor) {
												case 'Red':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																		break _v36_2;
																	} else {
																		if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																			break _v36_3;
																		} else {
																			break _v36_6;
																		}
																	}
																}
															}
														case 'NBlack':
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																		break _v36_4;
																	} else {
																		break _v36_6;
																	}
																}
															}
														default:
															if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
																break _v36_0;
															} else {
																if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
																	break _v36_1;
																} else {
																	break _v36_6;
																}
															}
													}
												case 'NBlack':
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															}
														case 'NBlack':
															if (_p27._0.ctor === 'BBlack') {
																if ((((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																	break _v36_4;
																} else {
																	if ((((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																		break _v36_5;
																	} else {
																		break _v36_6;
																	}
																}
															} else {
																break _v36_6;
															}
														default:
															if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
																break _v36_5;
															} else {
																break _v36_6;
															}
													}
												default:
													switch (_p27._4._0.ctor) {
														case 'Red':
															if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
																break _v36_2;
															} else {
																if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
																	break _v36_3;
																} else {
																	break _v36_6;
																}
															}
														case 'NBlack':
															if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
																break _v36_4;
															} else {
																break _v36_6;
															}
														default:
															break _v36_6;
													}
											}
										} else {
											switch (_p27._3._0.ctor) {
												case 'Red':
													if ((_p27._3._3.ctor === 'RBNode_elm_builtin') && (_p27._3._3._0.ctor === 'Red')) {
														break _v36_0;
													} else {
														if ((_p27._3._4.ctor === 'RBNode_elm_builtin') && (_p27._3._4._0.ctor === 'Red')) {
															break _v36_1;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._3._3.ctor === 'RBNode_elm_builtin')) && (_p27._3._3._0.ctor === 'Black')) && (_p27._3._4.ctor === 'RBNode_elm_builtin')) && (_p27._3._4._0.ctor === 'Black')) {
														break _v36_5;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										}
									} else {
										if (_p27._4.ctor === 'RBNode_elm_builtin') {
											switch (_p27._4._0.ctor) {
												case 'Red':
													if ((_p27._4._3.ctor === 'RBNode_elm_builtin') && (_p27._4._3._0.ctor === 'Red')) {
														break _v36_2;
													} else {
														if ((_p27._4._4.ctor === 'RBNode_elm_builtin') && (_p27._4._4._0.ctor === 'Red')) {
															break _v36_3;
														} else {
															break _v36_6;
														}
													}
												case 'NBlack':
													if (((((_p27._0.ctor === 'BBlack') && (_p27._4._3.ctor === 'RBNode_elm_builtin')) && (_p27._4._3._0.ctor === 'Black')) && (_p27._4._4.ctor === 'RBNode_elm_builtin')) && (_p27._4._4._0.ctor === 'Black')) {
														break _v36_4;
													} else {
														break _v36_6;
													}
												default:
													break _v36_6;
											}
										} else {
											break _v36_6;
										}
									}
								} else {
									break _v36_6;
								}
							} while(false);
							return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._3._1)(_p27._3._3._2)(_p27._3._1)(_p27._3._2)(_p27._1)(_p27._2)(_p27._3._3._3)(_p27._3._3._4)(_p27._3._4)(_p27._4);
						} while(false);
						return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._3._1)(_p27._3._2)(_p27._3._4._1)(_p27._3._4._2)(_p27._1)(_p27._2)(_p27._3._3)(_p27._3._4._3)(_p27._3._4._4)(_p27._4);
					} while(false);
					return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._3._1)(_p27._4._3._2)(_p27._4._1)(_p27._4._2)(_p27._3)(_p27._4._3._3)(_p27._4._3._4)(_p27._4._4);
				} while(false);
				return _elm_lang$core$Dict$balancedTree(_p27._0)(_p27._1)(_p27._2)(_p27._4._1)(_p27._4._2)(_p27._4._4._1)(_p27._4._4._2)(_p27._3)(_p27._4._3)(_p27._4._4._3)(_p27._4._4._4);
			} while(false);
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_elm_lang$core$Dict$Black,
				_p27._4._3._1,
				_p27._4._3._2,
				A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3, _p27._4._3._3),
				A5(
					_elm_lang$core$Dict$balance,
					_elm_lang$core$Dict$Black,
					_p27._4._1,
					_p27._4._2,
					_p27._4._3._4,
					_elm_lang$core$Dict$redden(_p27._4._4)));
		} while(false);
		return A5(
			_elm_lang$core$Dict$RBNode_elm_builtin,
			_elm_lang$core$Dict$Black,
			_p27._3._4._1,
			_p27._3._4._2,
			A5(
				_elm_lang$core$Dict$balance,
				_elm_lang$core$Dict$Black,
				_p27._3._1,
				_p27._3._2,
				_elm_lang$core$Dict$redden(_p27._3._3),
				_p27._3._4._3),
			A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p27._1, _p27._2, _p27._3._4._4, _p27._4));
	} while(false);
	return tree;
};
var _elm_lang$core$Dict$balance = F5(
	function (c, k, v, l, r) {
		var tree = A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
		return _elm_lang$core$Dict$blackish(tree) ? _elm_lang$core$Dict$balanceHelp(tree) : tree;
	});
var _elm_lang$core$Dict$bubble = F5(
	function (c, k, v, l, r) {
		return (_elm_lang$core$Dict$isBBlack(l) || _elm_lang$core$Dict$isBBlack(r)) ? A5(
			_elm_lang$core$Dict$balance,
			_elm_lang$core$Dict$moreBlack(c),
			k,
			v,
			_elm_lang$core$Dict$lessBlackTree(l),
			_elm_lang$core$Dict$lessBlackTree(r)) : A5(_elm_lang$core$Dict$RBNode_elm_builtin, c, k, v, l, r);
	});
var _elm_lang$core$Dict$removeMax = F5(
	function (c, k, v, l, r) {
		var _p28 = r;
		if (_p28.ctor === 'RBEmpty_elm_builtin') {
			return A3(_elm_lang$core$Dict$rem, c, l, r);
		} else {
			return A5(
				_elm_lang$core$Dict$bubble,
				c,
				k,
				v,
				l,
				A5(_elm_lang$core$Dict$removeMax, _p28._0, _p28._1, _p28._2, _p28._3, _p28._4));
		}
	});
var _elm_lang$core$Dict$rem = F3(
	function (color, left, right) {
		var _p29 = {ctor: '_Tuple2', _0: left, _1: right};
		if (_p29._0.ctor === 'RBEmpty_elm_builtin') {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p30 = color;
				switch (_p30.ctor) {
					case 'Red':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
					case 'Black':
						return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBBlack);
					default:
						return _elm_lang$core$Native_Debug.crash('cannot have bblack or nblack nodes at this point');
				}
			} else {
				var _p33 = _p29._1._0;
				var _p32 = _p29._0._0;
				var _p31 = {ctor: '_Tuple3', _0: color, _1: _p32, _2: _p33};
				if ((((_p31.ctor === '_Tuple3') && (_p31._0.ctor === 'Black')) && (_p31._1.ctor === 'LBlack')) && (_p31._2.ctor === 'Red')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._1._1, _p29._1._2, _p29._1._3, _p29._1._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/LBlack/Red',
						color,
						_elm_lang$core$Basics$toString(_p32),
						_elm_lang$core$Basics$toString(_p33));
				}
			}
		} else {
			if (_p29._1.ctor === 'RBEmpty_elm_builtin') {
				var _p36 = _p29._1._0;
				var _p35 = _p29._0._0;
				var _p34 = {ctor: '_Tuple3', _0: color, _1: _p35, _2: _p36};
				if ((((_p34.ctor === '_Tuple3') && (_p34._0.ctor === 'Black')) && (_p34._1.ctor === 'Red')) && (_p34._2.ctor === 'LBlack')) {
					return A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Black, _p29._0._1, _p29._0._2, _p29._0._3, _p29._0._4);
				} else {
					return A4(
						_elm_lang$core$Dict$reportRemBug,
						'Black/Red/LBlack',
						color,
						_elm_lang$core$Basics$toString(_p35),
						_elm_lang$core$Basics$toString(_p36));
				}
			} else {
				var _p40 = _p29._0._2;
				var _p39 = _p29._0._4;
				var _p38 = _p29._0._1;
				var newLeft = A5(_elm_lang$core$Dict$removeMax, _p29._0._0, _p38, _p40, _p29._0._3, _p39);
				var _p37 = A3(_elm_lang$core$Dict$maxWithDefault, _p38, _p40, _p39);
				var k = _p37._0;
				var v = _p37._1;
				return A5(_elm_lang$core$Dict$bubble, color, k, v, newLeft, right);
			}
		}
	});
var _elm_lang$core$Dict$map = F2(
	function (f, dict) {
		var _p41 = dict;
		if (_p41.ctor === 'RBEmpty_elm_builtin') {
			return _elm_lang$core$Dict$RBEmpty_elm_builtin(_elm_lang$core$Dict$LBlack);
		} else {
			var _p42 = _p41._1;
			return A5(
				_elm_lang$core$Dict$RBNode_elm_builtin,
				_p41._0,
				_p42,
				A2(f, _p42, _p41._2),
				A2(_elm_lang$core$Dict$map, f, _p41._3),
				A2(_elm_lang$core$Dict$map, f, _p41._4));
		}
	});
var _elm_lang$core$Dict$Same = {ctor: 'Same'};
var _elm_lang$core$Dict$Remove = {ctor: 'Remove'};
var _elm_lang$core$Dict$Insert = {ctor: 'Insert'};
var _elm_lang$core$Dict$update = F3(
	function (k, alter, dict) {
		var up = function (dict) {
			var _p43 = dict;
			if (_p43.ctor === 'RBEmpty_elm_builtin') {
				var _p44 = alter(_elm_lang$core$Maybe$Nothing);
				if (_p44.ctor === 'Nothing') {
					return {ctor: '_Tuple2', _0: _elm_lang$core$Dict$Same, _1: _elm_lang$core$Dict$empty};
				} else {
					return {
						ctor: '_Tuple2',
						_0: _elm_lang$core$Dict$Insert,
						_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _elm_lang$core$Dict$Red, k, _p44._0, _elm_lang$core$Dict$empty, _elm_lang$core$Dict$empty)
					};
				}
			} else {
				var _p55 = _p43._2;
				var _p54 = _p43._4;
				var _p53 = _p43._3;
				var _p52 = _p43._1;
				var _p51 = _p43._0;
				var _p45 = A2(_elm_lang$core$Basics$compare, k, _p52);
				switch (_p45.ctor) {
					case 'EQ':
						var _p46 = alter(
							_elm_lang$core$Maybe$Just(_p55));
						if (_p46.ctor === 'Nothing') {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Remove,
								_1: A3(_elm_lang$core$Dict$rem, _p51, _p53, _p54)
							};
						} else {
							return {
								ctor: '_Tuple2',
								_0: _elm_lang$core$Dict$Same,
								_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p46._0, _p53, _p54)
							};
						}
					case 'LT':
						var _p47 = up(_p53);
						var flag = _p47._0;
						var newLeft = _p47._1;
						var _p48 = flag;
						switch (_p48.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, newLeft, _p54)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, newLeft, _p54)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, newLeft, _p54)
								};
						}
					default:
						var _p49 = up(_p54);
						var flag = _p49._0;
						var newRight = _p49._1;
						var _p50 = flag;
						switch (_p50.ctor) {
							case 'Same':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Same,
									_1: A5(_elm_lang$core$Dict$RBNode_elm_builtin, _p51, _p52, _p55, _p53, newRight)
								};
							case 'Insert':
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Insert,
									_1: A5(_elm_lang$core$Dict$balance, _p51, _p52, _p55, _p53, newRight)
								};
							default:
								return {
									ctor: '_Tuple2',
									_0: _elm_lang$core$Dict$Remove,
									_1: A5(_elm_lang$core$Dict$bubble, _p51, _p52, _p55, _p53, newRight)
								};
						}
				}
			}
		};
		var _p56 = up(dict);
		var flag = _p56._0;
		var updatedDict = _p56._1;
		var _p57 = flag;
		switch (_p57.ctor) {
			case 'Same':
				return updatedDict;
			case 'Insert':
				return _elm_lang$core$Dict$ensureBlackRoot(updatedDict);
			default:
				return _elm_lang$core$Dict$blacken(updatedDict);
		}
	});
var _elm_lang$core$Dict$insert = F3(
	function (key, value, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(
				_elm_lang$core$Maybe$Just(value)),
			dict);
	});
var _elm_lang$core$Dict$singleton = F2(
	function (key, value) {
		return A3(_elm_lang$core$Dict$insert, key, value, _elm_lang$core$Dict$empty);
	});
var _elm_lang$core$Dict$union = F2(
	function (t1, t2) {
		return A3(_elm_lang$core$Dict$foldl, _elm_lang$core$Dict$insert, t2, t1);
	});
var _elm_lang$core$Dict$filter = F2(
	function (predicate, dictionary) {
		var add = F3(
			function (key, value, dict) {
				return A2(predicate, key, value) ? A3(_elm_lang$core$Dict$insert, key, value, dict) : dict;
			});
		return A3(_elm_lang$core$Dict$foldl, add, _elm_lang$core$Dict$empty, dictionary);
	});
var _elm_lang$core$Dict$intersect = F2(
	function (t1, t2) {
		return A2(
			_elm_lang$core$Dict$filter,
			F2(
				function (k, _p58) {
					return A2(_elm_lang$core$Dict$member, k, t2);
				}),
			t1);
	});
var _elm_lang$core$Dict$partition = F2(
	function (predicate, dict) {
		var add = F3(
			function (key, value, _p59) {
				var _p60 = _p59;
				var _p62 = _p60._1;
				var _p61 = _p60._0;
				return A2(predicate, key, value) ? {
					ctor: '_Tuple2',
					_0: A3(_elm_lang$core$Dict$insert, key, value, _p61),
					_1: _p62
				} : {
					ctor: '_Tuple2',
					_0: _p61,
					_1: A3(_elm_lang$core$Dict$insert, key, value, _p62)
				};
			});
		return A3(
			_elm_lang$core$Dict$foldl,
			add,
			{ctor: '_Tuple2', _0: _elm_lang$core$Dict$empty, _1: _elm_lang$core$Dict$empty},
			dict);
	});
var _elm_lang$core$Dict$fromList = function (assocs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (_p63, dict) {
				var _p64 = _p63;
				return A3(_elm_lang$core$Dict$insert, _p64._0, _p64._1, dict);
			}),
		_elm_lang$core$Dict$empty,
		assocs);
};
var _elm_lang$core$Dict$remove = F2(
	function (key, dict) {
		return A3(
			_elm_lang$core$Dict$update,
			key,
			_elm_lang$core$Basics$always(_elm_lang$core$Maybe$Nothing),
			dict);
	});
var _elm_lang$core$Dict$diff = F2(
	function (t1, t2) {
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, v, t) {
					return A2(_elm_lang$core$Dict$remove, k, t);
				}),
			t1,
			t2);
	});

var _elm_lang$core$Set$foldr = F3(
	function (f, b, _p0) {
		var _p1 = _p0;
		return A3(
			_elm_lang$core$Dict$foldr,
			F3(
				function (k, _p2, b) {
					return A2(f, k, b);
				}),
			b,
			_p1._0);
	});
var _elm_lang$core$Set$foldl = F3(
	function (f, b, _p3) {
		var _p4 = _p3;
		return A3(
			_elm_lang$core$Dict$foldl,
			F3(
				function (k, _p5, b) {
					return A2(f, k, b);
				}),
			b,
			_p4._0);
	});
var _elm_lang$core$Set$toList = function (_p6) {
	var _p7 = _p6;
	return _elm_lang$core$Dict$keys(_p7._0);
};
var _elm_lang$core$Set$size = function (_p8) {
	var _p9 = _p8;
	return _elm_lang$core$Dict$size(_p9._0);
};
var _elm_lang$core$Set$member = F2(
	function (k, _p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Dict$member, k, _p11._0);
	});
var _elm_lang$core$Set$isEmpty = function (_p12) {
	var _p13 = _p12;
	return _elm_lang$core$Dict$isEmpty(_p13._0);
};
var _elm_lang$core$Set$Set_elm_builtin = function (a) {
	return {ctor: 'Set_elm_builtin', _0: a};
};
var _elm_lang$core$Set$empty = _elm_lang$core$Set$Set_elm_builtin(_elm_lang$core$Dict$empty);
var _elm_lang$core$Set$singleton = function (k) {
	return _elm_lang$core$Set$Set_elm_builtin(
		A2(
			_elm_lang$core$Dict$singleton,
			k,
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Set$insert = F2(
	function (k, _p14) {
		var _p15 = _p14;
		return _elm_lang$core$Set$Set_elm_builtin(
			A3(
				_elm_lang$core$Dict$insert,
				k,
				{ctor: '_Tuple0'},
				_p15._0));
	});
var _elm_lang$core$Set$fromList = function (xs) {
	return A3(_elm_lang$core$List$foldl, _elm_lang$core$Set$insert, _elm_lang$core$Set$empty, xs);
};
var _elm_lang$core$Set$map = F2(
	function (f, s) {
		return _elm_lang$core$Set$fromList(
			A2(
				_elm_lang$core$List$map,
				f,
				_elm_lang$core$Set$toList(s)));
	});
var _elm_lang$core$Set$remove = F2(
	function (k, _p16) {
		var _p17 = _p16;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$remove, k, _p17._0));
	});
var _elm_lang$core$Set$union = F2(
	function (_p19, _p18) {
		var _p20 = _p19;
		var _p21 = _p18;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$union, _p20._0, _p21._0));
	});
var _elm_lang$core$Set$intersect = F2(
	function (_p23, _p22) {
		var _p24 = _p23;
		var _p25 = _p22;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$intersect, _p24._0, _p25._0));
	});
var _elm_lang$core$Set$diff = F2(
	function (_p27, _p26) {
		var _p28 = _p27;
		var _p29 = _p26;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(_elm_lang$core$Dict$diff, _p28._0, _p29._0));
	});
var _elm_lang$core$Set$filter = F2(
	function (p, _p30) {
		var _p31 = _p30;
		return _elm_lang$core$Set$Set_elm_builtin(
			A2(
				_elm_lang$core$Dict$filter,
				F2(
					function (k, _p32) {
						return p(k);
					}),
				_p31._0));
	});
var _elm_lang$core$Set$partition = F2(
	function (p, _p33) {
		var _p34 = _p33;
		var _p35 = A2(
			_elm_lang$core$Dict$partition,
			F2(
				function (k, _p36) {
					return p(k);
				}),
			_p34._0);
		var p1 = _p35._0;
		var p2 = _p35._1;
		return {
			ctor: '_Tuple2',
			_0: _elm_lang$core$Set$Set_elm_builtin(p1),
			_1: _elm_lang$core$Set$Set_elm_builtin(p2)
		};
	});

var _elm_community$list_extra$List_Extra$greedyGroupsOfWithStep = F3(
	function (size, step, xs) {
		var okayXs = _elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(xs),
			0) > 0;
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		return (okayArgs && okayXs) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$greedyGroupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$greedyGroupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$groupsOfWithStep = F3(
	function (size, step, xs) {
		var okayArgs = (_elm_lang$core$Native_Utils.cmp(size, 0) > 0) && (_elm_lang$core$Native_Utils.cmp(step, 0) > 0);
		var xs_ = A2(_elm_lang$core$List$drop, step, xs);
		var group = A2(_elm_lang$core$List$take, size, xs);
		var okayLength = _elm_lang$core$Native_Utils.eq(
			size,
			_elm_lang$core$List$length(group));
		return (okayArgs && okayLength) ? {
			ctor: '::',
			_0: group,
			_1: A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, step, xs_)
		} : {ctor: '[]'};
	});
var _elm_community$list_extra$List_Extra$groupsOf = F2(
	function (size, xs) {
		return A3(_elm_community$list_extra$List_Extra$groupsOfWithStep, size, size, xs);
	});
var _elm_community$list_extra$List_Extra$zip5 = _elm_lang$core$List$map5(
	F5(
		function (v0, v1, v2, v3, v4) {
			return {ctor: '_Tuple5', _0: v0, _1: v1, _2: v2, _3: v3, _4: v4};
		}));
var _elm_community$list_extra$List_Extra$zip4 = _elm_lang$core$List$map4(
	F4(
		function (v0, v1, v2, v3) {
			return {ctor: '_Tuple4', _0: v0, _1: v1, _2: v2, _3: v3};
		}));
var _elm_community$list_extra$List_Extra$zip3 = _elm_lang$core$List$map3(
	F3(
		function (v0, v1, v2) {
			return {ctor: '_Tuple3', _0: v0, _1: v1, _2: v2};
		}));
var _elm_community$list_extra$List_Extra$zip = _elm_lang$core$List$map2(
	F2(
		function (v0, v1) {
			return {ctor: '_Tuple2', _0: v0, _1: v1};
		}));
var _elm_community$list_extra$List_Extra$isPrefixOf = F2(
	function (prefix, xs) {
		var _p0 = {ctor: '_Tuple2', _0: prefix, _1: xs};
		if (_p0._0.ctor === '[]') {
			return true;
		} else {
			if (_p0._1.ctor === '[]') {
				return false;
			} else {
				return _elm_lang$core$Native_Utils.eq(_p0._0._0, _p0._1._0) && A2(_elm_community$list_extra$List_Extra$isPrefixOf, _p0._0._1, _p0._1._1);
			}
		}
	});
var _elm_community$list_extra$List_Extra$isSuffixOf = F2(
	function (suffix, xs) {
		return A2(
			_elm_community$list_extra$List_Extra$isPrefixOf,
			_elm_lang$core$List$reverse(suffix),
			_elm_lang$core$List$reverse(xs));
	});
var _elm_community$list_extra$List_Extra$selectSplit = function (xs) {
	var _p1 = xs;
	if (_p1.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p5 = _p1._1;
		var _p4 = _p1._0;
		return {
			ctor: '::',
			_0: {
				ctor: '_Tuple3',
				_0: {ctor: '[]'},
				_1: _p4,
				_2: _p5
			},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p2) {
					var _p3 = _p2;
					return {
						ctor: '_Tuple3',
						_0: {ctor: '::', _0: _p4, _1: _p3._0},
						_1: _p3._1,
						_2: _p3._2
					};
				},
				_elm_community$list_extra$List_Extra$selectSplit(_p5))
		};
	}
};
var _elm_community$list_extra$List_Extra$select = function (xs) {
	var _p6 = xs;
	if (_p6.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p10 = _p6._1;
		var _p9 = _p6._0;
		return {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: _p9, _1: _p10},
			_1: A2(
				_elm_lang$core$List$map,
				function (_p7) {
					var _p8 = _p7;
					return {
						ctor: '_Tuple2',
						_0: _p8._0,
						_1: {ctor: '::', _0: _p9, _1: _p8._1}
					};
				},
				_elm_community$list_extra$List_Extra$select(_p10))
		};
	}
};
var _elm_community$list_extra$List_Extra$tailsHelp = F2(
	function (e, list) {
		var _p11 = list;
		if (_p11.ctor === '::') {
			var _p12 = _p11._0;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: e, _1: _p12},
				_1: {ctor: '::', _0: _p12, _1: _p11._1}
			};
		} else {
			return {ctor: '[]'};
		}
	});
var _elm_community$list_extra$List_Extra$tails = A2(
	_elm_lang$core$List$foldr,
	_elm_community$list_extra$List_Extra$tailsHelp,
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$isInfixOf = F2(
	function (infix, xs) {
		return A2(
			_elm_lang$core$List$any,
			_elm_community$list_extra$List_Extra$isPrefixOf(infix),
			_elm_community$list_extra$List_Extra$tails(xs));
	});
var _elm_community$list_extra$List_Extra$inits = A2(
	_elm_lang$core$List$foldr,
	F2(
		function (e, acc) {
			return {
				ctor: '::',
				_0: {ctor: '[]'},
				_1: A2(
					_elm_lang$core$List$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(e),
					acc)
			};
		}),
	{
		ctor: '::',
		_0: {ctor: '[]'},
		_1: {ctor: '[]'}
	});
var _elm_community$list_extra$List_Extra$groupWhileTransitively = F2(
	function (cmp, xs_) {
		var _p13 = xs_;
		if (_p13.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p13._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: {
						ctor: '::',
						_0: _p13._0,
						_1: {ctor: '[]'}
					},
					_1: {ctor: '[]'}
				};
			} else {
				var _p15 = _p13._0;
				var _p14 = A2(_elm_community$list_extra$List_Extra$groupWhileTransitively, cmp, _p13._1);
				if (_p14.ctor === '::') {
					return A2(cmp, _p15, _p13._1._0) ? {
						ctor: '::',
						_0: {ctor: '::', _0: _p15, _1: _p14._0},
						_1: _p14._1
					} : {
						ctor: '::',
						_0: {
							ctor: '::',
							_0: _p15,
							_1: {ctor: '[]'}
						},
						_1: _p14
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$stripPrefix = F2(
	function (prefix, xs) {
		var step = F2(
			function (e, m) {
				var _p16 = m;
				if (_p16.ctor === 'Nothing') {
					return _elm_lang$core$Maybe$Nothing;
				} else {
					if (_p16._0.ctor === '[]') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Native_Utils.eq(e, _p16._0._0) ? _elm_lang$core$Maybe$Just(_p16._0._1) : _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		return A3(
			_elm_lang$core$List$foldl,
			step,
			_elm_lang$core$Maybe$Just(xs),
			prefix);
	});
var _elm_community$list_extra$List_Extra$dropWhileRight = function (p) {
	return A2(
		_elm_lang$core$List$foldr,
		F2(
			function (x, xs) {
				return (p(x) && _elm_lang$core$List$isEmpty(xs)) ? {ctor: '[]'} : {ctor: '::', _0: x, _1: xs};
			}),
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$takeWhileRight = function (p) {
	var step = F2(
		function (x, _p17) {
			var _p18 = _p17;
			var _p19 = _p18._0;
			return (p(x) && _p18._1) ? {
				ctor: '_Tuple2',
				_0: {ctor: '::', _0: x, _1: _p19},
				_1: true
			} : {ctor: '_Tuple2', _0: _p19, _1: false};
		});
	return function (_p20) {
		return _elm_lang$core$Tuple$first(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: {ctor: '[]'},
					_1: true
				},
				_p20));
	};
};
var _elm_community$list_extra$List_Extra$splitAt = F2(
	function (n, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_lang$core$List$take, n, xs),
			_1: A2(_elm_lang$core$List$drop, n, xs)
		};
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying_ = F3(
	function (listOflengths, list, accu) {
		groupsOfVarying_:
		while (true) {
			var _p21 = {ctor: '_Tuple2', _0: listOflengths, _1: list};
			if (((_p21.ctor === '_Tuple2') && (_p21._0.ctor === '::')) && (_p21._1.ctor === '::')) {
				var _p22 = A2(_elm_community$list_extra$List_Extra$splitAt, _p21._0._0, list);
				var head = _p22._0;
				var tail = _p22._1;
				var _v11 = _p21._0._1,
					_v12 = tail,
					_v13 = {ctor: '::', _0: head, _1: accu};
				listOflengths = _v11;
				list = _v12;
				accu = _v13;
				continue groupsOfVarying_;
			} else {
				return _elm_lang$core$List$reverse(accu);
			}
		}
	});
var _elm_community$list_extra$List_Extra$groupsOfVarying = F2(
	function (listOflengths, list) {
		return A3(
			_elm_community$list_extra$List_Extra$groupsOfVarying_,
			listOflengths,
			list,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$unfoldr = F2(
	function (f, seed) {
		var _p23 = f(seed);
		if (_p23.ctor === 'Nothing') {
			return {ctor: '[]'};
		} else {
			return {
				ctor: '::',
				_0: _p23._0._0,
				_1: A2(_elm_community$list_extra$List_Extra$unfoldr, f, _p23._0._1)
			};
		}
	});
var _elm_community$list_extra$List_Extra$scanr1 = F2(
	function (f, xs_) {
		var _p24 = xs_;
		if (_p24.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p24._1.ctor === '[]') {
				return {
					ctor: '::',
					_0: _p24._0,
					_1: {ctor: '[]'}
				};
			} else {
				var _p25 = A2(_elm_community$list_extra$List_Extra$scanr1, f, _p24._1);
				if (_p25.ctor === '::') {
					return {
						ctor: '::',
						_0: A2(f, _p24._0, _p25._0),
						_1: _p25
					};
				} else {
					return {ctor: '[]'};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanr = F3(
	function (f, acc, xs_) {
		var _p26 = xs_;
		if (_p26.ctor === '[]') {
			return {
				ctor: '::',
				_0: acc,
				_1: {ctor: '[]'}
			};
		} else {
			var _p27 = A3(_elm_community$list_extra$List_Extra$scanr, f, acc, _p26._1);
			if (_p27.ctor === '::') {
				return {
					ctor: '::',
					_0: A2(f, _p26._0, _p27._0),
					_1: _p27
				};
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _elm_community$list_extra$List_Extra$scanl1 = F2(
	function (f, xs_) {
		var _p28 = xs_;
		if (_p28.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return A3(_elm_lang$core$List$scanl, f, _p28._0, _p28._1);
		}
	});
var _elm_community$list_extra$List_Extra$indexedFoldr = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p29) {
				var _p30 = _p29;
				var _p31 = _p30._0;
				return {
					ctor: '_Tuple2',
					_0: _p31 - 1,
					_1: A3(func, _p31, x, _p30._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldr,
				step,
				{
					ctor: '_Tuple2',
					_0: _elm_lang$core$List$length(list) - 1,
					_1: acc
				},
				list));
	});
var _elm_community$list_extra$List_Extra$indexedFoldl = F3(
	function (func, acc, list) {
		var step = F2(
			function (x, _p32) {
				var _p33 = _p32;
				var _p34 = _p33._0;
				return {
					ctor: '_Tuple2',
					_0: _p34 + 1,
					_1: A3(func, _p34, x, _p33._1)
				};
			});
		return _elm_lang$core$Tuple$second(
			A3(
				_elm_lang$core$List$foldl,
				step,
				{ctor: '_Tuple2', _0: 0, _1: acc},
				list));
	});
var _elm_community$list_extra$List_Extra$foldr1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p35 = m;
						if (_p35.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, x, _p35._0);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldr, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$foldl1 = F2(
	function (f, xs) {
		var mf = F2(
			function (x, m) {
				return _elm_lang$core$Maybe$Just(
					function () {
						var _p36 = m;
						if (_p36.ctor === 'Nothing') {
							return x;
						} else {
							return A2(f, _p36._0, x);
						}
					}());
			});
		return A3(_elm_lang$core$List$foldl, mf, _elm_lang$core$Maybe$Nothing, xs);
	});
var _elm_community$list_extra$List_Extra$interweaveHelp = F3(
	function (l1, l2, acc) {
		interweaveHelp:
		while (true) {
			var _p37 = {ctor: '_Tuple2', _0: l1, _1: l2};
			_v24_1:
			do {
				if (_p37._0.ctor === '::') {
					if (_p37._1.ctor === '::') {
						var _v25 = _p37._0._1,
							_v26 = _p37._1._1,
							_v27 = A2(
							_elm_lang$core$Basics_ops['++'],
							acc,
							{
								ctor: '::',
								_0: _p37._0._0,
								_1: {
									ctor: '::',
									_0: _p37._1._0,
									_1: {ctor: '[]'}
								}
							});
						l1 = _v25;
						l2 = _v26;
						acc = _v27;
						continue interweaveHelp;
					} else {
						break _v24_1;
					}
				} else {
					if (_p37._1.ctor === '[]') {
						break _v24_1;
					} else {
						return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._1);
					}
				}
			} while(false);
			return A2(_elm_lang$core$Basics_ops['++'], acc, _p37._0);
		}
	});
var _elm_community$list_extra$List_Extra$interweave = F2(
	function (l1, l2) {
		return A3(
			_elm_community$list_extra$List_Extra$interweaveHelp,
			l1,
			l2,
			{ctor: '[]'});
	});
var _elm_community$list_extra$List_Extra$permutations = function (xs_) {
	var _p38 = xs_;
	if (_p38.ctor === '[]') {
		return {
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		};
	} else {
		var f = function (_p39) {
			var _p40 = _p39;
			return A2(
				_elm_lang$core$List$map,
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					})(_p40._0),
				_elm_community$list_extra$List_Extra$permutations(_p40._1));
		};
		return A2(
			_elm_lang$core$List$concatMap,
			f,
			_elm_community$list_extra$List_Extra$select(_p38));
	}
};
var _elm_community$list_extra$List_Extra$isPermutationOf = F2(
	function (permut, xs) {
		return A2(
			_elm_lang$core$List$member,
			permut,
			_elm_community$list_extra$List_Extra$permutations(xs));
	});
var _elm_community$list_extra$List_Extra$subsequencesNonEmpty = function (xs) {
	var _p41 = xs;
	if (_p41.ctor === '[]') {
		return {ctor: '[]'};
	} else {
		var _p42 = _p41._0;
		var f = F2(
			function (ys, r) {
				return {
					ctor: '::',
					_0: ys,
					_1: {
						ctor: '::',
						_0: {ctor: '::', _0: _p42, _1: ys},
						_1: r
					}
				};
			});
		return {
			ctor: '::',
			_0: {
				ctor: '::',
				_0: _p42,
				_1: {ctor: '[]'}
			},
			_1: A3(
				_elm_lang$core$List$foldr,
				f,
				{ctor: '[]'},
				_elm_community$list_extra$List_Extra$subsequencesNonEmpty(_p41._1))
		};
	}
};
var _elm_community$list_extra$List_Extra$subsequences = function (xs) {
	return {
		ctor: '::',
		_0: {ctor: '[]'},
		_1: _elm_community$list_extra$List_Extra$subsequencesNonEmpty(xs)
	};
};
var _elm_community$list_extra$List_Extra$isSubsequenceOf = F2(
	function (subseq, xs) {
		return A2(
			_elm_lang$core$List$member,
			subseq,
			_elm_community$list_extra$List_Extra$subsequences(xs));
	});
var _elm_community$list_extra$List_Extra$transpose = function (ll) {
	transpose:
	while (true) {
		var _p43 = ll;
		if (_p43.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			if (_p43._0.ctor === '[]') {
				var _v32 = _p43._1;
				ll = _v32;
				continue transpose;
			} else {
				var _p44 = _p43._1;
				var tails = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$tail, _p44);
				var heads = A2(_elm_lang$core$List$filterMap, _elm_lang$core$List$head, _p44);
				return {
					ctor: '::',
					_0: {ctor: '::', _0: _p43._0._0, _1: heads},
					_1: _elm_community$list_extra$List_Extra$transpose(
						{ctor: '::', _0: _p43._0._1, _1: tails})
				};
			}
		}
	}
};
var _elm_community$list_extra$List_Extra$intercalate = function (xs) {
	return function (_p45) {
		return _elm_lang$core$List$concat(
			A2(_elm_lang$core$List$intersperse, xs, _p45));
	};
};
var _elm_community$list_extra$List_Extra$filterNot = F2(
	function (pred, list) {
		return A2(
			_elm_lang$core$List$filter,
			function (_p46) {
				return !pred(_p46);
			},
			list);
	});
var _elm_community$list_extra$List_Extra$removeAt = F2(
	function (index, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return l;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p47 = tail;
			if (_p47.ctor === 'Nothing') {
				return l;
			} else {
				return A2(_elm_lang$core$List$append, head, _p47._0);
			}
		}
	});
var _elm_community$list_extra$List_Extra$stableSortWith = F2(
	function (pred, list) {
		var predWithIndex = F2(
			function (_p49, _p48) {
				var _p50 = _p49;
				var _p51 = _p48;
				var result = A2(pred, _p50._0, _p51._0);
				var _p52 = result;
				if (_p52.ctor === 'EQ') {
					return A2(_elm_lang$core$Basics$compare, _p50._1, _p51._1);
				} else {
					return result;
				}
			});
		var listWithIndex = A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, a) {
					return {ctor: '_Tuple2', _0: a, _1: i};
				}),
			list);
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(_elm_lang$core$List$sortWith, predWithIndex, listWithIndex));
	});
var _elm_community$list_extra$List_Extra$setAt = F3(
	function (index, value, l) {
		if (_elm_lang$core$Native_Utils.cmp(index, 0) < 0) {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var tail = _elm_lang$core$List$tail(
				A2(_elm_lang$core$List$drop, index, l));
			var head = A2(_elm_lang$core$List$take, index, l);
			var _p53 = tail;
			if (_p53.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return _elm_lang$core$Maybe$Just(
					A2(
						_elm_lang$core$List$append,
						head,
						{ctor: '::', _0: value, _1: _p53._0}));
			}
		}
	});
var _elm_community$list_extra$List_Extra$remove = F2(
	function (x, xs) {
		var _p54 = xs;
		if (_p54.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p56 = _p54._1;
			var _p55 = _p54._0;
			return _elm_lang$core$Native_Utils.eq(x, _p55) ? _p56 : {
				ctor: '::',
				_0: _p55,
				_1: A2(_elm_community$list_extra$List_Extra$remove, x, _p56)
			};
		}
	});
var _elm_community$list_extra$List_Extra$updateIfIndex = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$indexedMap,
			F2(
				function (i, x) {
					return predicate(i) ? update(x) : x;
				}),
			list);
	});
var _elm_community$list_extra$List_Extra$updateAt = F3(
	function (index, update, list) {
		return ((_elm_lang$core$Native_Utils.cmp(index, 0) < 0) || (_elm_lang$core$Native_Utils.cmp(
			index,
			_elm_lang$core$List$length(list)) > -1)) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
			A3(
				_elm_community$list_extra$List_Extra$updateIfIndex,
				F2(
					function (x, y) {
						return _elm_lang$core$Native_Utils.eq(x, y);
					})(index),
				update,
				list));
	});
var _elm_community$list_extra$List_Extra$updateIf = F3(
	function (predicate, update, list) {
		return A2(
			_elm_lang$core$List$map,
			function (item) {
				return predicate(item) ? update(item) : item;
			},
			list);
	});
var _elm_community$list_extra$List_Extra$replaceIf = F3(
	function (predicate, replacement, list) {
		return A3(
			_elm_community$list_extra$List_Extra$updateIf,
			predicate,
			_elm_lang$core$Basics$always(replacement),
			list);
	});
var _elm_community$list_extra$List_Extra$findIndices = function (p) {
	return function (_p57) {
		return A2(
			_elm_lang$core$List$map,
			_elm_lang$core$Tuple$first,
			A2(
				_elm_lang$core$List$filter,
				function (_p58) {
					var _p59 = _p58;
					return p(_p59._1);
				},
				A2(
					_elm_lang$core$List$indexedMap,
					F2(
						function (v0, v1) {
							return {ctor: '_Tuple2', _0: v0, _1: v1};
						}),
					_p57)));
	};
};
var _elm_community$list_extra$List_Extra$findIndex = function (p) {
	return function (_p60) {
		return _elm_lang$core$List$head(
			A2(_elm_community$list_extra$List_Extra$findIndices, p, _p60));
	};
};
var _elm_community$list_extra$List_Extra$splitWhen = F2(
	function (predicate, list) {
		return A2(
			_elm_lang$core$Maybe$map,
			function (i) {
				return A2(_elm_community$list_extra$List_Extra$splitAt, i, list);
			},
			A2(_elm_community$list_extra$List_Extra$findIndex, predicate, list));
	});
var _elm_community$list_extra$List_Extra$elemIndices = function (x) {
	return _elm_community$list_extra$List_Extra$findIndices(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$elemIndex = function (x) {
	return _elm_community$list_extra$List_Extra$findIndex(
		F2(
			function (x, y) {
				return _elm_lang$core$Native_Utils.eq(x, y);
			})(x));
};
var _elm_community$list_extra$List_Extra$find = F2(
	function (predicate, list) {
		find:
		while (true) {
			var _p61 = list;
			if (_p61.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var _p62 = _p61._0;
				if (predicate(_p62)) {
					return _elm_lang$core$Maybe$Just(_p62);
				} else {
					var _v41 = predicate,
						_v42 = _p61._1;
					predicate = _v41;
					list = _v42;
					continue find;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$notMember = function (x) {
	return function (_p63) {
		return !A2(_elm_lang$core$List$member, x, _p63);
	};
};
var _elm_community$list_extra$List_Extra$andThen = _elm_lang$core$List$concatMap;
var _elm_community$list_extra$List_Extra$lift2 = F3(
	function (f, la, lb) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return {
							ctor: '::',
							_0: A2(f, a, b),
							_1: {ctor: '[]'}
						};
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift3 = F4(
	function (f, la, lb, lc) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return {
									ctor: '::',
									_0: A3(f, a, b, c),
									_1: {ctor: '[]'}
								};
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$lift4 = F5(
	function (f, la, lb, lc, ld) {
		return A2(
			_elm_community$list_extra$List_Extra$andThen,
			function (a) {
				return A2(
					_elm_community$list_extra$List_Extra$andThen,
					function (b) {
						return A2(
							_elm_community$list_extra$List_Extra$andThen,
							function (c) {
								return A2(
									_elm_community$list_extra$List_Extra$andThen,
									function (d) {
										return {
											ctor: '::',
											_0: A4(f, a, b, c, d),
											_1: {ctor: '[]'}
										};
									},
									ld);
							},
							lc);
					},
					lb);
			},
			la);
	});
var _elm_community$list_extra$List_Extra$andMap = F2(
	function (l, fl) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (x, y) {
					return x(y);
				}),
			fl,
			l);
	});
var _elm_community$list_extra$List_Extra$uniqueHelp = F3(
	function (f, existing, remaining) {
		uniqueHelp:
		while (true) {
			var _p64 = remaining;
			if (_p64.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				var _p66 = _p64._1;
				var _p65 = _p64._0;
				var computedFirst = f(_p65);
				if (A2(_elm_lang$core$Set$member, computedFirst, existing)) {
					var _v44 = f,
						_v45 = existing,
						_v46 = _p66;
					f = _v44;
					existing = _v45;
					remaining = _v46;
					continue uniqueHelp;
				} else {
					return {
						ctor: '::',
						_0: _p65,
						_1: A3(
							_elm_community$list_extra$List_Extra$uniqueHelp,
							f,
							A2(_elm_lang$core$Set$insert, computedFirst, existing),
							_p66)
					};
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$uniqueBy = F2(
	function (f, list) {
		return A3(_elm_community$list_extra$List_Extra$uniqueHelp, f, _elm_lang$core$Set$empty, list);
	});
var _elm_community$list_extra$List_Extra$allDifferentBy = F2(
	function (f, list) {
		return _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$List$length(list),
			_elm_lang$core$List$length(
				A2(_elm_community$list_extra$List_Extra$uniqueBy, f, list)));
	});
var _elm_community$list_extra$List_Extra$allDifferent = function (list) {
	return A2(_elm_community$list_extra$List_Extra$allDifferentBy, _elm_lang$core$Basics$identity, list);
};
var _elm_community$list_extra$List_Extra$unique = function (list) {
	return A3(_elm_community$list_extra$List_Extra$uniqueHelp, _elm_lang$core$Basics$identity, _elm_lang$core$Set$empty, list);
};
var _elm_community$list_extra$List_Extra$dropWhile = F2(
	function (predicate, list) {
		dropWhile:
		while (true) {
			var _p67 = list;
			if (_p67.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (predicate(_p67._0)) {
					var _v48 = predicate,
						_v49 = _p67._1;
					predicate = _v48;
					list = _v49;
					continue dropWhile;
				} else {
					return list;
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$takeWhile = function (predicate) {
	var takeWhileMemo = F2(
		function (memo, list) {
			takeWhileMemo:
			while (true) {
				var _p68 = list;
				if (_p68.ctor === '[]') {
					return _elm_lang$core$List$reverse(memo);
				} else {
					var _p69 = _p68._0;
					if (predicate(_p69)) {
						var _v51 = {ctor: '::', _0: _p69, _1: memo},
							_v52 = _p68._1;
						memo = _v51;
						list = _v52;
						continue takeWhileMemo;
					} else {
						return _elm_lang$core$List$reverse(memo);
					}
				}
			}
		});
	return takeWhileMemo(
		{ctor: '[]'});
};
var _elm_community$list_extra$List_Extra$span = F2(
	function (p, xs) {
		return {
			ctor: '_Tuple2',
			_0: A2(_elm_community$list_extra$List_Extra$takeWhile, p, xs),
			_1: A2(_elm_community$list_extra$List_Extra$dropWhile, p, xs)
		};
	});
var _elm_community$list_extra$List_Extra$break = function (p) {
	return _elm_community$list_extra$List_Extra$span(
		function (_p70) {
			return !p(_p70);
		});
};
var _elm_community$list_extra$List_Extra$groupWhile = F2(
	function (eq, xs_) {
		var _p71 = xs_;
		if (_p71.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p73 = _p71._0;
			var _p72 = A2(
				_elm_community$list_extra$List_Extra$span,
				eq(_p73),
				_p71._1);
			var ys = _p72._0;
			var zs = _p72._1;
			return {
				ctor: '::',
				_0: {ctor: '::', _0: _p73, _1: ys},
				_1: A2(_elm_community$list_extra$List_Extra$groupWhile, eq, zs)
			};
		}
	});
var _elm_community$list_extra$List_Extra$group = _elm_community$list_extra$List_Extra$groupWhile(
	F2(
		function (x, y) {
			return _elm_lang$core$Native_Utils.eq(x, y);
		}));
var _elm_community$list_extra$List_Extra$minimumBy = F2(
	function (f, ls) {
		var minBy = F2(
			function (x, _p74) {
				var _p75 = _p74;
				var _p76 = _p75._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p76) < 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p75._0, _1: _p76};
			});
		var _p77 = ls;
		if (_p77.ctor === '::') {
			if (_p77._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p77._0);
			} else {
				var _p78 = _p77._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							minBy,
							{
								ctor: '_Tuple2',
								_0: _p78,
								_1: f(_p78)
							},
							_p77._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$maximumBy = F2(
	function (f, ls) {
		var maxBy = F2(
			function (x, _p79) {
				var _p80 = _p79;
				var _p81 = _p80._1;
				var fx = f(x);
				return (_elm_lang$core$Native_Utils.cmp(fx, _p81) > 0) ? {ctor: '_Tuple2', _0: x, _1: fx} : {ctor: '_Tuple2', _0: _p80._0, _1: _p81};
			});
		var _p82 = ls;
		if (_p82.ctor === '::') {
			if (_p82._1.ctor === '[]') {
				return _elm_lang$core$Maybe$Just(_p82._0);
			} else {
				var _p83 = _p82._0;
				return _elm_lang$core$Maybe$Just(
					_elm_lang$core$Tuple$first(
						A3(
							_elm_lang$core$List$foldl,
							maxBy,
							{
								ctor: '_Tuple2',
								_0: _p83,
								_1: f(_p83)
							},
							_p82._1)));
			}
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$list_extra$List_Extra$uncons = function (xs) {
	var _p84 = xs;
	if (_p84.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return _elm_lang$core$Maybe$Just(
			{ctor: '_Tuple2', _0: _p84._0, _1: _p84._1});
	}
};
var _elm_community$list_extra$List_Extra$swapAt = F3(
	function (index1, index2, l) {
		swapAt:
		while (true) {
			if (_elm_lang$core$Native_Utils.eq(index1, index2)) {
				return _elm_lang$core$Maybe$Just(l);
			} else {
				if (_elm_lang$core$Native_Utils.cmp(index1, index2) > 0) {
					var _v59 = index2,
						_v60 = index1,
						_v61 = l;
					index1 = _v59;
					index2 = _v60;
					l = _v61;
					continue swapAt;
				} else {
					if (_elm_lang$core$Native_Utils.cmp(index1, 0) < 0) {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						var _p85 = A2(_elm_community$list_extra$List_Extra$splitAt, index1, l);
						var part1 = _p85._0;
						var tail1 = _p85._1;
						var _p86 = A2(_elm_community$list_extra$List_Extra$splitAt, index2 - index1, tail1);
						var head2 = _p86._0;
						var tail2 = _p86._1;
						return A3(
							_elm_lang$core$Maybe$map2,
							F2(
								function (_p88, _p87) {
									var _p89 = _p88;
									var _p90 = _p87;
									return _elm_lang$core$List$concat(
										{
											ctor: '::',
											_0: part1,
											_1: {
												ctor: '::',
												_0: {ctor: '::', _0: _p90._0, _1: _p89._1},
												_1: {
													ctor: '::',
													_0: {ctor: '::', _0: _p89._0, _1: _p90._1},
													_1: {ctor: '[]'}
												}
											}
										});
								}),
							_elm_community$list_extra$List_Extra$uncons(head2),
							_elm_community$list_extra$List_Extra$uncons(tail2));
					}
				}
			}
		}
	});
var _elm_community$list_extra$List_Extra$iterate = F2(
	function (f, x) {
		var _p91 = f(x);
		if (_p91.ctor === 'Just') {
			return {
				ctor: '::',
				_0: x,
				_1: A2(_elm_community$list_extra$List_Extra$iterate, f, _p91._0)
			};
		} else {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
		}
	});
var _elm_community$list_extra$List_Extra$getAt = F2(
	function (idx, xs) {
		return (_elm_lang$core$Native_Utils.cmp(idx, 0) < 0) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$List$head(
			A2(_elm_lang$core$List$drop, idx, xs));
	});
var _elm_community$list_extra$List_Extra_ops = _elm_community$list_extra$List_Extra_ops || {};
_elm_community$list_extra$List_Extra_ops['!!'] = _elm_lang$core$Basics$flip(_elm_community$list_extra$List_Extra$getAt);
var _elm_community$list_extra$List_Extra$init = function () {
	var maybe = F2(
		function (d, f) {
			return function (_p92) {
				return A2(
					_elm_lang$core$Maybe$withDefault,
					d,
					A2(_elm_lang$core$Maybe$map, f, _p92));
			};
		});
	return A2(
		_elm_lang$core$List$foldr,
		function (x) {
			return function (_p93) {
				return _elm_lang$core$Maybe$Just(
					A3(
						maybe,
						{ctor: '[]'},
						F2(
							function (x, y) {
								return {ctor: '::', _0: x, _1: y};
							})(x),
						_p93));
			};
		},
		_elm_lang$core$Maybe$Nothing);
}();
var _elm_community$list_extra$List_Extra$last = _elm_community$list_extra$List_Extra$foldl1(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));

var _elm_community$maybe_extra$Maybe_Extra$foldrValues = F2(
	function (item, list) {
		var _p0 = item;
		if (_p0.ctor === 'Nothing') {
			return list;
		} else {
			return {ctor: '::', _0: _p0._0, _1: list};
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$values = A2(
	_elm_lang$core$List$foldr,
	_elm_community$maybe_extra$Maybe_Extra$foldrValues,
	{ctor: '[]'});
var _elm_community$maybe_extra$Maybe_Extra$filter = F2(
	function (f, m) {
		var _p1 = A2(_elm_lang$core$Maybe$map, f, m);
		if ((_p1.ctor === 'Just') && (_p1._0 === true)) {
			return m;
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$traverseArray = function (f) {
	var step = F2(
		function (e, acc) {
			var _p2 = f(e);
			if (_p2.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					_elm_lang$core$Array$push(_p2._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$Array$foldl,
		step,
		_elm_lang$core$Maybe$Just(_elm_lang$core$Array$empty));
};
var _elm_community$maybe_extra$Maybe_Extra$combineArray = _elm_community$maybe_extra$Maybe_Extra$traverseArray(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$traverse = function (f) {
	var step = F2(
		function (e, acc) {
			var _p3 = f(e);
			if (_p3.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				return A2(
					_elm_lang$core$Maybe$map,
					F2(
						function (x, y) {
							return {ctor: '::', _0: x, _1: y};
						})(_p3._0),
					acc);
			}
		});
	return A2(
		_elm_lang$core$List$foldr,
		step,
		_elm_lang$core$Maybe$Just(
			{ctor: '[]'}));
};
var _elm_community$maybe_extra$Maybe_Extra$combine = _elm_community$maybe_extra$Maybe_Extra$traverse(_elm_lang$core$Basics$identity);
var _elm_community$maybe_extra$Maybe_Extra$toArray = function (m) {
	var _p4 = m;
	if (_p4.ctor === 'Nothing') {
		return _elm_lang$core$Array$empty;
	} else {
		return A2(_elm_lang$core$Array$repeat, 1, _p4._0);
	}
};
var _elm_community$maybe_extra$Maybe_Extra$toList = function (m) {
	var _p5 = m;
	if (_p5.ctor === 'Nothing') {
		return {ctor: '[]'};
	} else {
		return {
			ctor: '::',
			_0: _p5._0,
			_1: {ctor: '[]'}
		};
	}
};
var _elm_community$maybe_extra$Maybe_Extra$orElse = F2(
	function (ma, mb) {
		var _p6 = mb;
		if (_p6.ctor === 'Nothing') {
			return ma;
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orElseLazy = F2(
	function (fma, mb) {
		var _p7 = mb;
		if (_p7.ctor === 'Nothing') {
			return fma(
				{ctor: '_Tuple0'});
		} else {
			return mb;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$orLazy = F2(
	function (ma, fmb) {
		var _p8 = ma;
		if (_p8.ctor === 'Nothing') {
			return fmb(
				{ctor: '_Tuple0'});
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$or = F2(
	function (ma, mb) {
		var _p9 = ma;
		if (_p9.ctor === 'Nothing') {
			return mb;
		} else {
			return ma;
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$prev = _elm_lang$core$Maybe$map2(_elm_lang$core$Basics$always);
var _elm_community$maybe_extra$Maybe_Extra$next = _elm_lang$core$Maybe$map2(
	_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always));
var _elm_community$maybe_extra$Maybe_Extra$andMap = _elm_lang$core$Maybe$map2(
	F2(
		function (x, y) {
			return y(x);
		}));
var _elm_community$maybe_extra$Maybe_Extra$unpack = F3(
	function (d, f, m) {
		var _p10 = m;
		if (_p10.ctor === 'Nothing') {
			return d(
				{ctor: '_Tuple0'});
		} else {
			return f(_p10._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$unwrap = F3(
	function (d, f, m) {
		var _p11 = m;
		if (_p11.ctor === 'Nothing') {
			return d;
		} else {
			return f(_p11._0);
		}
	});
var _elm_community$maybe_extra$Maybe_Extra$isJust = function (m) {
	var _p12 = m;
	if (_p12.ctor === 'Nothing') {
		return false;
	} else {
		return true;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$isNothing = function (m) {
	var _p13 = m;
	if (_p13.ctor === 'Nothing') {
		return true;
	} else {
		return false;
	}
};
var _elm_community$maybe_extra$Maybe_Extra$join = function (mx) {
	var _p14 = mx;
	if (_p14.ctor === 'Just') {
		return _p14._0;
	} else {
		return _elm_lang$core$Maybe$Nothing;
	}
};
var _elm_community$maybe_extra$Maybe_Extra_ops = _elm_community$maybe_extra$Maybe_Extra_ops || {};
_elm_community$maybe_extra$Maybe_Extra_ops['?'] = F2(
	function (mx, x) {
		return A2(_elm_lang$core$Maybe$withDefault, x, mx);
	});

//import Maybe, Native.List //

var _elm_lang$core$Native_Regex = function() {

function escape(str)
{
	return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
function caseInsensitive(re)
{
	return new RegExp(re.source, 'gi');
}
function regex(raw)
{
	return new RegExp(raw, 'g');
}

function contains(re, string)
{
	return string.match(re) !== null;
}

function find(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex === re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		out.push({
			match: result[0],
			submatches: _elm_lang$core$Native_List.fromArray(subs),
			index: result.index,
			number: number
		});
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

function replace(n, re, replacer, string)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch === undefined
				? _elm_lang$core$Maybe$Nothing
				: _elm_lang$core$Maybe$Just(submatch);
		}
		return replacer({
			match: match,
			submatches: _elm_lang$core$Native_List.fromArray(submatches),
			index: arguments[arguments.length - 2],
			number: count
		});
	}
	return string.replace(re, jsReplacer);
}

function split(n, re, str)
{
	n = n.ctor === 'All' ? Infinity : n._0;
	if (n === Infinity)
	{
		return _elm_lang$core$Native_List.fromArray(str.split(re));
	}
	var string = str;
	var result;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		if (!(result = re.exec(string))) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _elm_lang$core$Native_List.fromArray(out);
}

return {
	regex: regex,
	caseInsensitive: caseInsensitive,
	escape: escape,

	contains: F2(contains),
	find: F3(find),
	replace: F4(replace),
	split: F3(split)
};

}();

var _elm_lang$core$Regex$split = _elm_lang$core$Native_Regex.split;
var _elm_lang$core$Regex$replace = _elm_lang$core$Native_Regex.replace;
var _elm_lang$core$Regex$find = _elm_lang$core$Native_Regex.find;
var _elm_lang$core$Regex$contains = _elm_lang$core$Native_Regex.contains;
var _elm_lang$core$Regex$caseInsensitive = _elm_lang$core$Native_Regex.caseInsensitive;
var _elm_lang$core$Regex$regex = _elm_lang$core$Native_Regex.regex;
var _elm_lang$core$Regex$escape = _elm_lang$core$Native_Regex.escape;
var _elm_lang$core$Regex$Match = F4(
	function (a, b, c, d) {
		return {match: a, submatches: b, index: c, number: d};
	});
var _elm_lang$core$Regex$Regex = {ctor: 'Regex'};
var _elm_lang$core$Regex$AtMost = function (a) {
	return {ctor: 'AtMost', _0: a};
};
var _elm_lang$core$Regex$All = {ctor: 'All'};

var _elm_community$result_extra$Result_Extra$merge = function (r) {
	var _p0 = r;
	if (_p0.ctor === 'Ok') {
		return _p0._0;
	} else {
		return _p0._0;
	}
};
var _elm_community$result_extra$Result_Extra$orElse = F2(
	function (ra, rb) {
		var _p1 = rb;
		if (_p1.ctor === 'Err') {
			return ra;
		} else {
			return rb;
		}
	});
var _elm_community$result_extra$Result_Extra$orElseLazy = F2(
	function (fra, rb) {
		var _p2 = rb;
		if (_p2.ctor === 'Err') {
			return fra(
				{ctor: '_Tuple0'});
		} else {
			return rb;
		}
	});
var _elm_community$result_extra$Result_Extra$orLazy = F2(
	function (ra, frb) {
		var _p3 = ra;
		if (_p3.ctor === 'Err') {
			return frb(
				{ctor: '_Tuple0'});
		} else {
			return ra;
		}
	});
var _elm_community$result_extra$Result_Extra$or = F2(
	function (ra, rb) {
		var _p4 = ra;
		if (_p4.ctor === 'Err') {
			return rb;
		} else {
			return ra;
		}
	});
var _elm_community$result_extra$Result_Extra$andMap = F2(
	function (ra, rb) {
		var _p5 = {ctor: '_Tuple2', _0: ra, _1: rb};
		if (_p5._1.ctor === 'Err') {
			return _elm_lang$core$Result$Err(_p5._1._0);
		} else {
			return A2(_elm_lang$core$Result$map, _p5._1._0, _p5._0);
		}
	});
var _elm_community$result_extra$Result_Extra$singleton = _elm_lang$core$Result$Ok;
var _elm_community$result_extra$Result_Extra$combine = A2(
	_elm_lang$core$List$foldr,
	_elm_lang$core$Result$map2(
		F2(
			function (x, y) {
				return {ctor: '::', _0: x, _1: y};
			})),
	_elm_lang$core$Result$Ok(
		{ctor: '[]'}));
var _elm_community$result_extra$Result_Extra$mapBoth = F3(
	function (errFunc, okFunc, result) {
		var _p6 = result;
		if (_p6.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				okFunc(_p6._0));
		} else {
			return _elm_lang$core$Result$Err(
				errFunc(_p6._0));
		}
	});
var _elm_community$result_extra$Result_Extra$unpack = F3(
	function (errFunc, okFunc, result) {
		var _p7 = result;
		if (_p7.ctor === 'Ok') {
			return okFunc(_p7._0);
		} else {
			return errFunc(_p7._0);
		}
	});
var _elm_community$result_extra$Result_Extra$unwrap = F3(
	function (defaultValue, okFunc, result) {
		var _p8 = result;
		if (_p8.ctor === 'Ok') {
			return okFunc(_p8._0);
		} else {
			return defaultValue;
		}
	});
var _elm_community$result_extra$Result_Extra$extract = F2(
	function (f, x) {
		var _p9 = x;
		if (_p9.ctor === 'Ok') {
			return _p9._0;
		} else {
			return f(_p9._0);
		}
	});
var _elm_community$result_extra$Result_Extra$isErr = function (x) {
	var _p10 = x;
	if (_p10.ctor === 'Ok') {
		return false;
	} else {
		return true;
	}
};
var _elm_community$result_extra$Result_Extra$isOk = function (x) {
	var _p11 = x;
	if (_p11.ctor === 'Ok') {
		return true;
	} else {
		return false;
	}
};

var _elm_community$string_extra$String_Extra$accentRegex = function () {
	var matches = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: '[à-æ]', _1: 'a'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: '[À-Æ]', _1: 'A'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 'ç', _1: 'c'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple2', _0: 'Ç', _1: 'C'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: '[è-ë]', _1: 'e'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: '[È-Ë]', _1: 'E'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: '[ì-ï]', _1: 'i'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: '[Ì-Ï]', _1: 'I'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: 'ñ', _1: 'n'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple2', _0: 'Ñ', _1: 'N'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: '[ò-ö]', _1: 'o'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: '[Ò-Ö]', _1: 'O'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple2', _0: '[ù-ü]', _1: 'u'},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple2', _0: '[Ù-Ü]', _1: 'U'},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple2', _0: 'ý', _1: 'y'},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple2', _0: 'ÿ', _1: 'y'},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple2', _0: 'Ý', _1: 'Y'},
																		_1: {ctor: '[]'}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	};
	return A2(
		_elm_lang$core$List$map,
		function (_p0) {
			var _p1 = _p0;
			return {
				ctor: '_Tuple2',
				_0: _elm_lang$core$Regex$regex(_p1._0),
				_1: _p1._1
			};
		},
		matches);
}();
var _elm_community$string_extra$String_Extra$removeAccents = function (string) {
	if (_elm_lang$core$String$isEmpty(string)) {
		return string;
	} else {
		var do_regex_to_remove_acents = function (_p2) {
			var _p3 = _p2;
			return A3(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_p3._0,
				function (_p4) {
					return _p3._1;
				});
		};
		return A3(_elm_lang$core$List$foldl, do_regex_to_remove_acents, string, _elm_community$string_extra$String_Extra$accentRegex);
	}
};
var _elm_community$string_extra$String_Extra$nonEmpty = function (string) {
	return _elm_lang$core$String$isEmpty(string) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(string);
};
var _elm_community$string_extra$String_Extra$replacementCodePoint = 65533;
var _elm_community$string_extra$String_Extra$toCodePoints = function (string) {
	var allCodeUnits = A2(
		_elm_lang$core$List$map,
		_elm_lang$core$Char$toCode,
		_elm_lang$core$String$toList(string));
	var combineAndReverse = F2(
		function (codeUnits, accumulated) {
			combineAndReverse:
			while (true) {
				var _p5 = codeUnits;
				if (_p5.ctor === '[]') {
					return accumulated;
				} else {
					var _p9 = _p5._0;
					var _p8 = _p5._1;
					if ((_elm_lang$core$Native_Utils.cmp(_p9, 0) > -1) && (_elm_lang$core$Native_Utils.cmp(_p9, 55295) < 1)) {
						var _v3 = _p8,
							_v4 = {ctor: '::', _0: _p9, _1: accumulated};
						codeUnits = _v3;
						accumulated = _v4;
						continue combineAndReverse;
					} else {
						if ((_elm_lang$core$Native_Utils.cmp(_p9, 55296) > -1) && (_elm_lang$core$Native_Utils.cmp(_p9, 56319) < 1)) {
							var _p6 = _p8;
							if (_p6.ctor === '[]') {
								return {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
							} else {
								var _p7 = _p6._0;
								if ((_elm_lang$core$Native_Utils.cmp(_p7, 56320) > -1) && (_elm_lang$core$Native_Utils.cmp(_p7, 57343) < 1)) {
									var codePoint = (65536 + ((_p9 - 55296) * 1024)) + (_p7 - 56320);
									var _v6 = _p6._1,
										_v7 = {ctor: '::', _0: codePoint, _1: accumulated};
									codeUnits = _v6;
									accumulated = _v7;
									continue combineAndReverse;
								} else {
									var _v8 = _p8,
										_v9 = {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
									codeUnits = _v8;
									accumulated = _v9;
									continue combineAndReverse;
								}
							}
						} else {
							if ((_elm_lang$core$Native_Utils.cmp(_p9, 57344) > -1) && (_elm_lang$core$Native_Utils.cmp(_p9, 65535) < 1)) {
								var _v10 = _p8,
									_v11 = {ctor: '::', _0: _p9, _1: accumulated};
								codeUnits = _v10;
								accumulated = _v11;
								continue combineAndReverse;
							} else {
								var _v12 = _p8,
									_v13 = {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
								codeUnits = _v12;
								accumulated = _v13;
								continue combineAndReverse;
							}
						}
					}
				}
			}
		});
	return _elm_lang$core$List$reverse(
		A2(
			combineAndReverse,
			allCodeUnits,
			{ctor: '[]'}));
};
var _elm_community$string_extra$String_Extra$fromCodePoints = function (allCodePoints) {
	var splitAndReverse = F2(
		function (codePoints, accumulated) {
			splitAndReverse:
			while (true) {
				var _p10 = codePoints;
				if (_p10.ctor === '[]') {
					return accumulated;
				} else {
					var _p12 = _p10._1;
					var _p11 = _p10._0;
					if ((_elm_lang$core$Native_Utils.cmp(_p11, 0) > -1) && (_elm_lang$core$Native_Utils.cmp(_p11, 55295) < 1)) {
						var _v15 = _p12,
							_v16 = {ctor: '::', _0: _p11, _1: accumulated};
						codePoints = _v15;
						accumulated = _v16;
						continue splitAndReverse;
					} else {
						if ((_elm_lang$core$Native_Utils.cmp(_p11, 65536) > -1) && (_elm_lang$core$Native_Utils.cmp(_p11, 1114111) < 1)) {
							var subtracted = _p11 - 65536;
							var leading = (subtracted >> 10) + 55296;
							var trailing = (subtracted & 1023) + 56320;
							var _v17 = _p12,
								_v18 = {
								ctor: '::',
								_0: trailing,
								_1: {ctor: '::', _0: leading, _1: accumulated}
							};
							codePoints = _v17;
							accumulated = _v18;
							continue splitAndReverse;
						} else {
							if ((_elm_lang$core$Native_Utils.cmp(_p11, 57344) > -1) && (_elm_lang$core$Native_Utils.cmp(_p11, 65535) < 1)) {
								var _v19 = _p12,
									_v20 = {ctor: '::', _0: _p11, _1: accumulated};
								codePoints = _v19;
								accumulated = _v20;
								continue splitAndReverse;
							} else {
								var _v21 = _p12,
									_v22 = {ctor: '::', _0: _elm_community$string_extra$String_Extra$replacementCodePoint, _1: accumulated};
								codePoints = _v21;
								accumulated = _v22;
								continue splitAndReverse;
							}
						}
					}
				}
			}
		});
	var allCodeUnits = _elm_lang$core$List$reverse(
		A2(
			splitAndReverse,
			allCodePoints,
			{ctor: '[]'}));
	return _elm_lang$core$String$fromList(
		A2(_elm_lang$core$List$map, _elm_lang$core$Char$fromCode, allCodeUnits));
};
var _elm_community$string_extra$String_Extra$fromFloat = _elm_lang$core$Basics$toString;
var _elm_community$string_extra$String_Extra$fromInt = _elm_lang$core$Basics$toString;
var _elm_community$string_extra$String_Extra$leftOfBack = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				A2(_elm_lang$core$Basics$flip, _elm_lang$core$String$left, string),
				_elm_lang$core$List$head(
					_elm_lang$core$List$reverse(
						A2(_elm_lang$core$String$indexes, pattern, string)))));
	});
var _elm_community$string_extra$String_Extra$rightOfBack = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				function (_p13) {
					return A3(
						_elm_lang$core$Basics$flip,
						_elm_lang$core$String$dropLeft,
						string,
						A2(
							F2(
								function (x, y) {
									return x + y;
								}),
							_elm_lang$core$String$length(pattern),
							_p13));
				},
				_elm_lang$core$List$head(
					_elm_lang$core$List$reverse(
						A2(_elm_lang$core$String$indexes, pattern, string)))));
	});
var _elm_community$string_extra$String_Extra$firstResultHelp = F2(
	function ($default, list) {
		firstResultHelp:
		while (true) {
			var _p14 = list;
			if (_p14.ctor === '[]') {
				return $default;
			} else {
				if (_p14._0.ctor === 'Just') {
					return _p14._0._0;
				} else {
					var _v24 = $default,
						_v25 = _p14._1;
					$default = _v24;
					list = _v25;
					continue firstResultHelp;
				}
			}
		}
	});
var _elm_community$string_extra$String_Extra$firstResult = function (list) {
	return A2(_elm_community$string_extra$String_Extra$firstResultHelp, '', list);
};
var _elm_community$string_extra$String_Extra$leftOf = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$String$join,
			'',
			A2(
				_elm_lang$core$List$map,
				function (_p15) {
					return _elm_community$string_extra$String_Extra$firstResult(
						function (_) {
							return _.submatches;
						}(_p15));
				},
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(
						A2(
							_elm_lang$core$Basics_ops['++'],
							'^(.*?)',
							_elm_lang$core$Regex$escape(pattern))),
					string)));
	});
var _elm_community$string_extra$String_Extra$rightOf = F2(
	function (pattern, string) {
		return A2(
			_elm_lang$core$String$join,
			'',
			A2(
				_elm_lang$core$List$map,
				function (_p16) {
					return _elm_community$string_extra$String_Extra$firstResult(
						function (_) {
							return _.submatches;
						}(_p16));
				},
				A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(
						A2(
							_elm_lang$core$Basics_ops['++'],
							_elm_lang$core$Regex$escape(pattern),
							'(.*)$')),
					string)));
	});
var _elm_community$string_extra$String_Extra$pluralize = F3(
	function (singular, plural, count) {
		return _elm_lang$core$Native_Utils.eq(count, 1) ? A2(_elm_lang$core$Basics_ops['++'], '1 ', singular) : A2(
			_elm_lang$core$Basics_ops['++'],
			_elm_lang$core$Basics$toString(count),
			A2(_elm_lang$core$Basics_ops['++'], ' ', plural));
	});
var _elm_community$string_extra$String_Extra$stripTags = function (string) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('<\\/?[^>]+>'),
		_elm_lang$core$Basics$always(''),
		string);
};
var _elm_community$string_extra$String_Extra$toSentenceHelper = F3(
	function (lastPart, sentence, list) {
		toSentenceHelper:
		while (true) {
			var _p17 = list;
			if (_p17.ctor === '[]') {
				return sentence;
			} else {
				if (_p17._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						sentence,
						A2(_elm_lang$core$Basics_ops['++'], lastPart, _p17._0));
				} else {
					var _v27 = lastPart,
						_v28 = A2(
						_elm_lang$core$Basics_ops['++'],
						sentence,
						A2(_elm_lang$core$Basics_ops['++'], ', ', _p17._0)),
						_v29 = _p17._1;
					lastPart = _v27;
					sentence = _v28;
					list = _v29;
					continue toSentenceHelper;
				}
			}
		}
	});
var _elm_community$string_extra$String_Extra$toSentenceBaseCase = function (list) {
	var _p18 = list;
	_v30_2:
	do {
		if (_p18.ctor === '::') {
			if (_p18._1.ctor === '[]') {
				return _p18._0;
			} else {
				if (_p18._1._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_p18._0,
						A2(_elm_lang$core$Basics_ops['++'], ' and ', _p18._1._0));
				} else {
					break _v30_2;
				}
			}
		} else {
			break _v30_2;
		}
	} while(false);
	return '';
};
var _elm_community$string_extra$String_Extra$toSentenceOxford = function (list) {
	var _p19 = list;
	if (((_p19.ctor === '::') && (_p19._1.ctor === '::')) && (_p19._1._1.ctor === '::')) {
		return A3(
			_elm_community$string_extra$String_Extra$toSentenceHelper,
			', and ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p19._0,
				A2(_elm_lang$core$Basics_ops['++'], ', ', _p19._1._0)),
			{ctor: '::', _0: _p19._1._1._0, _1: _p19._1._1._1});
	} else {
		return _elm_community$string_extra$String_Extra$toSentenceBaseCase(list);
	}
};
var _elm_community$string_extra$String_Extra$toSentence = function (list) {
	var _p20 = list;
	if (((_p20.ctor === '::') && (_p20._1.ctor === '::')) && (_p20._1._1.ctor === '::')) {
		return A3(
			_elm_community$string_extra$String_Extra$toSentenceHelper,
			' and ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p20._0,
				A2(_elm_lang$core$Basics_ops['++'], ', ', _p20._1._0)),
			{ctor: '::', _0: _p20._1._1._0, _1: _p20._1._1._1});
	} else {
		return _elm_community$string_extra$String_Extra$toSentenceBaseCase(list);
	}
};
var _elm_community$string_extra$String_Extra$ellipsisWith = F3(
	function (howLong, append, string) {
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$String$length(string),
			howLong) < 1) ? string : A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$String$left,
				howLong - _elm_lang$core$String$length(append),
				string),
			append);
	});
var _elm_community$string_extra$String_Extra$ellipsis = F2(
	function (howLong, string) {
		return A3(_elm_community$string_extra$String_Extra$ellipsisWith, howLong, '...', string);
	});
var _elm_community$string_extra$String_Extra$countOccurrences = F2(
	function (needle, haystack) {
		return (_elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(needle),
			0) || _elm_lang$core$Native_Utils.eq(
			_elm_lang$core$String$length(haystack),
			0)) ? 0 : _elm_lang$core$List$length(
			A2(_elm_lang$core$String$indexes, needle, haystack));
	});
var _elm_community$string_extra$String_Extra$unindent = function (multilineSting) {
	var isNotWhitespace = function ($char) {
		return (!_elm_lang$core$Native_Utils.eq(
			$char,
			_elm_lang$core$Native_Utils.chr(' '))) && (!_elm_lang$core$Native_Utils.eq(
			$char,
			_elm_lang$core$Native_Utils.chr('\t')));
	};
	var countLeadingWhitespace = F2(
		function (count, line) {
			countLeadingWhitespace:
			while (true) {
				var _p21 = _elm_lang$core$String$uncons(line);
				if (_p21.ctor === 'Nothing') {
					return count;
				} else {
					var _p23 = _p21._0._1;
					var _p22 = _p21._0._0;
					switch (_p22.valueOf()) {
						case ' ':
							var _v35 = count + 1,
								_v36 = _p23;
							count = _v35;
							line = _v36;
							continue countLeadingWhitespace;
						case '\t':
							var _v37 = count + 1,
								_v38 = _p23;
							count = _v37;
							line = _v38;
							continue countLeadingWhitespace;
						default:
							return count;
					}
				}
			}
		});
	var lines = _elm_lang$core$String$lines(multilineSting);
	var minLead = A2(
		_elm_lang$core$Maybe$withDefault,
		0,
		_elm_lang$core$List$minimum(
			A2(
				_elm_lang$core$List$map,
				countLeadingWhitespace(0),
				A2(
					_elm_lang$core$List$filter,
					_elm_lang$core$String$any(isNotWhitespace),
					lines))));
	return A2(
		_elm_lang$core$String$join,
		'\n',
		A2(
			_elm_lang$core$List$map,
			_elm_lang$core$String$dropLeft(minLead),
			lines));
};
var _elm_community$string_extra$String_Extra$dasherize = function (string) {
	return _elm_lang$core$String$toLower(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('[_-\\s]+'),
			_elm_lang$core$Basics$always('-'),
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('([A-Z])'),
				function (_p24) {
					return A2(
						_elm_lang$core$String$append,
						'-',
						function (_) {
							return _.match;
						}(_p24));
				},
				_elm_lang$core$String$trim(string))));
};
var _elm_community$string_extra$String_Extra$underscored = function (string) {
	return _elm_lang$core$String$toLower(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('[_-\\s]+'),
			_elm_lang$core$Basics$always('_'),
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('([a-z\\d])([A-Z]+)'),
				function (_p25) {
					return A2(
						_elm_lang$core$String$join,
						'_',
						A2(
							_elm_lang$core$List$filterMap,
							_elm_lang$core$Basics$identity,
							function (_) {
								return _.submatches;
							}(_p25)));
				},
				_elm_lang$core$String$trim(string))));
};
var _elm_community$string_extra$String_Extra$unsurround = F2(
	function (wrap, string) {
		if (A2(_elm_lang$core$String$startsWith, wrap, string) && A2(_elm_lang$core$String$endsWith, wrap, string)) {
			var length = _elm_lang$core$String$length(wrap);
			return A2(
				_elm_lang$core$String$dropRight,
				length,
				A2(_elm_lang$core$String$dropLeft, length, string));
		} else {
			return string;
		}
	});
var _elm_community$string_extra$String_Extra$unquote = function (string) {
	return A2(_elm_community$string_extra$String_Extra$unsurround, '\"', string);
};
var _elm_community$string_extra$String_Extra$surround = F2(
	function (wrap, string) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			wrap,
			A2(_elm_lang$core$Basics_ops['++'], string, wrap));
	});
var _elm_community$string_extra$String_Extra$quote = function (string) {
	return A2(_elm_community$string_extra$String_Extra$surround, '\"', string);
};
var _elm_community$string_extra$String_Extra$camelize = function (string) {
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('[-_\\s]+(.)?'),
		function (_p26) {
			var _p27 = _p26;
			var _p28 = _p27.submatches;
			if ((_p28.ctor === '::') && (_p28._0.ctor === 'Just')) {
				return _elm_lang$core$String$toUpper(_p28._0._0);
			} else {
				return '';
			}
		},
		_elm_lang$core$String$trim(string));
};
var _elm_community$string_extra$String_Extra$isBlank = function (string) {
	return A2(
		_elm_lang$core$Regex$contains,
		_elm_lang$core$Regex$regex('^\\s*$'),
		string);
};
var _elm_community$string_extra$String_Extra$clean = function (string) {
	return _elm_lang$core$String$trim(
		A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex('\\s\\s+'),
			_elm_lang$core$Basics$always(' '),
			string));
};
var _elm_community$string_extra$String_Extra$softBreakRegexp = function (width) {
	return _elm_lang$core$Regex$regex(
		A2(
			_elm_lang$core$Basics_ops['++'],
			'.{1,',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(width),
				'}(\\s+|$)|\\S+?(\\s+|$)')));
};
var _elm_community$string_extra$String_Extra$softEllipsis = F2(
	function (howLong, string) {
		return (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$String$length(string),
			howLong) < 1) ? string : A3(
			_elm_lang$core$Basics$flip,
			_elm_lang$core$String$append,
			'...',
			A4(
				_elm_lang$core$Regex$replace,
				_elm_lang$core$Regex$All,
				_elm_lang$core$Regex$regex('([\\.,;:\\s])+$'),
				_elm_lang$core$Basics$always(''),
				A2(
					_elm_lang$core$String$join,
					'',
					A2(
						_elm_lang$core$List$map,
						function (_) {
							return _.match;
						},
						A3(
							_elm_lang$core$Regex$find,
							_elm_lang$core$Regex$AtMost(1),
							_elm_community$string_extra$String_Extra$softBreakRegexp(howLong),
							string)))));
	});
var _elm_community$string_extra$String_Extra$softBreak = F2(
	function (width, string) {
		return (_elm_lang$core$Native_Utils.cmp(width, 0) < 1) ? {ctor: '[]'} : A2(
			_elm_lang$core$List$map,
			function (_) {
				return _.match;
			},
			A3(
				_elm_lang$core$Regex$find,
				_elm_lang$core$Regex$All,
				_elm_community$string_extra$String_Extra$softBreakRegexp(width),
				string));
	});
var _elm_community$string_extra$String_Extra$softWrapWith = F3(
	function (width, separator, string) {
		return A2(
			_elm_lang$core$String$join,
			separator,
			A2(_elm_community$string_extra$String_Extra$softBreak, width, string));
	});
var _elm_community$string_extra$String_Extra$softWrap = F2(
	function (width, string) {
		return A3(_elm_community$string_extra$String_Extra$softWrapWith, width, '\n', string);
	});
var _elm_community$string_extra$String_Extra$breaker = F3(
	function (width, string, acc) {
		breaker:
		while (true) {
			var _p29 = string;
			if (_p29 === '') {
				return _elm_lang$core$List$reverse(acc);
			} else {
				var _v42 = width,
					_v43 = A2(_elm_lang$core$String$dropLeft, width, string),
					_v44 = {
					ctor: '::',
					_0: A3(_elm_lang$core$String$slice, 0, width, string),
					_1: acc
				};
				width = _v42;
				string = _v43;
				acc = _v44;
				continue breaker;
			}
		}
	});
var _elm_community$string_extra$String_Extra$break = F2(
	function (width, string) {
		return (_elm_lang$core$Native_Utils.eq(width, 0) || _elm_lang$core$Native_Utils.eq(string, '')) ? {
			ctor: '::',
			_0: string,
			_1: {ctor: '[]'}
		} : A3(
			_elm_community$string_extra$String_Extra$breaker,
			width,
			string,
			{ctor: '[]'});
	});
var _elm_community$string_extra$String_Extra$wrapWith = F3(
	function (width, separator, string) {
		return A2(
			_elm_lang$core$String$join,
			separator,
			A2(_elm_community$string_extra$String_Extra$break, width, string));
	});
var _elm_community$string_extra$String_Extra$wrap = F2(
	function (width, string) {
		return A3(_elm_community$string_extra$String_Extra$wrapWith, width, '\n', string);
	});
var _elm_community$string_extra$String_Extra$replaceSlice = F4(
	function (substitution, start, end, string) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A3(_elm_lang$core$String$slice, 0, start, string),
			A2(
				_elm_lang$core$Basics_ops['++'],
				substitution,
				A3(
					_elm_lang$core$String$slice,
					end,
					_elm_lang$core$String$length(string),
					string)));
	});
var _elm_community$string_extra$String_Extra$insertAt = F3(
	function (insert, pos, string) {
		return A4(_elm_community$string_extra$String_Extra$replaceSlice, insert, pos, pos, string);
	});
var _elm_community$string_extra$String_Extra$replace = F3(
	function (search, substitution, string) {
		return A4(
			_elm_lang$core$Regex$replace,
			_elm_lang$core$Regex$All,
			_elm_lang$core$Regex$regex(
				_elm_lang$core$Regex$escape(search)),
			function (_p30) {
				return substitution;
			},
			string);
	});
var _elm_community$string_extra$String_Extra$changeCase = F2(
	function (mutator, word) {
		return A2(
			_elm_lang$core$Maybe$withDefault,
			'',
			A2(
				_elm_lang$core$Maybe$map,
				function (_p31) {
					var _p32 = _p31;
					return A2(
						_elm_lang$core$String$cons,
						mutator(_p32._0),
						_p32._1);
				},
				_elm_lang$core$String$uncons(word)));
	});
var _elm_community$string_extra$String_Extra$toSentenceCase = function (word) {
	return A2(_elm_community$string_extra$String_Extra$changeCase, _elm_lang$core$Char$toUpper, word);
};
var _elm_community$string_extra$String_Extra$toTitleCase = function (ws) {
	var uppercaseMatch = A3(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('\\w+'),
		function (_p33) {
			return _elm_community$string_extra$String_Extra$toSentenceCase(
				function (_) {
					return _.match;
				}(_p33));
		});
	return A4(
		_elm_lang$core$Regex$replace,
		_elm_lang$core$Regex$All,
		_elm_lang$core$Regex$regex('^([a-z])|\\s+([a-z])'),
		function (_p34) {
			return uppercaseMatch(
				function (_) {
					return _.match;
				}(_p34));
		},
		ws);
};
var _elm_community$string_extra$String_Extra$classify = function (string) {
	return _elm_community$string_extra$String_Extra$toSentenceCase(
		A3(
			_elm_community$string_extra$String_Extra$replace,
			' ',
			'',
			_elm_community$string_extra$String_Extra$camelize(
				A4(
					_elm_lang$core$Regex$replace,
					_elm_lang$core$Regex$All,
					_elm_lang$core$Regex$regex('[\\W_]'),
					_elm_lang$core$Basics$always(' '),
					string))));
};
var _elm_community$string_extra$String_Extra$humanize = function (string) {
	return _elm_community$string_extra$String_Extra$toSentenceCase(
		_elm_lang$core$String$toLower(
			_elm_lang$core$String$trim(
				A4(
					_elm_lang$core$Regex$replace,
					_elm_lang$core$Regex$All,
					_elm_lang$core$Regex$regex('_id$|[-_\\s]+'),
					_elm_lang$core$Basics$always(' '),
					A4(
						_elm_lang$core$Regex$replace,
						_elm_lang$core$Regex$All,
						_elm_lang$core$Regex$regex('[A-Z]'),
						function (_p35) {
							return A2(
								_elm_lang$core$String$append,
								'-',
								function (_) {
									return _.match;
								}(_p35));
						},
						string)))));
};
var _elm_community$string_extra$String_Extra$decapitalize = function (word) {
	return A2(_elm_community$string_extra$String_Extra$changeCase, _elm_lang$core$Char$toLower, word);
};


var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['@@>'] = F2(
	function (mx, mf) {
		return A2(_elm_community$result_extra$Result_Extra$andMap, mx, mf);
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['<@@'] = F2(
	function (mf, mx) {
		return A2(_elm_community$result_extra$Result_Extra$andMap, mx, mf);
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['@>'] = F2(
	function (mx, f) {
		var _p0 = mx;
		if (_p0.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				f(_p0._0));
		} else {
			return _elm_lang$core$Result$Err(_p0._0);
		}
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['<@'] = F2(
	function (f, mx) {
		var _p1 = mx;
		if (_p1.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				f(_p1._0));
		} else {
			return _elm_lang$core$Result$Err(_p1._0);
		}
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['!>'] = F2(
	function (mx, f) {
		var _p2 = mx;
		if (_p2.ctor === 'Right') {
			return _toastal$either$Either$Right(
				f(_p2._0));
		} else {
			return _toastal$either$Either$Left(_p2._0);
		}
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['<!'] = F2(
	function (f, mx) {
		var _p3 = mx;
		if (_p3.ctor === 'Right') {
			return _toastal$either$Either$Right(
				f(_p3._0));
		} else {
			return _toastal$either$Either$Left(_p3._0);
		}
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['??>'] = F2(
	function (mx, mf) {
		return A2(_elm_community$maybe_extra$Maybe_Extra$andMap, mx, mf);
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['<??'] = F2(
	function (mf, mx) {
		return A2(_elm_community$maybe_extra$Maybe_Extra$andMap, mx, mf);
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['?>'] = F2(
	function (mx, f) {
		var _p4 = mx;
		if (_p4.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p4._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['<?'] = F2(
	function (f, mx) {
		var _p5 = mx;
		if (_p5.ctor === 'Just') {
			return _elm_lang$core$Maybe$Just(
				f(_p5._0));
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['$$>'] = F2(
	function (lx, lf) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (f, x) {
					return f(x);
				}),
			lf,
			lx);
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['<$$'] = F2(
	function (lf, lx) {
		return A3(
			_elm_lang$core$List$map2,
			F2(
				function (f, x) {
					return f(x);
				}),
			lf,
			lx);
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['$>'] = F2(
	function (lx, f) {
		return A2(_elm_lang$core$List$map, f, lx);
	});
var _user$project$Applicative_ops = _user$project$Applicative_ops || {};
_user$project$Applicative_ops['<$'] = F2(
	function (f, lx) {
		return A2(_elm_lang$core$List$map, f, lx);
	});

var _user$project$Util$thd3 = function (_p0) {
	var _p1 = _p0;
	return _p1._2;
};
var _user$project$Util$snd3 = function (_p2) {
	var _p3 = _p2;
	return _p3._1;
};
var _user$project$Util$fst3 = function (_p4) {
	var _p5 = _p4;
	return _p5._0;
};
var _user$project$Util$snd = function (_p6) {
	var _p7 = _p6;
	return _p7._1;
};
var _user$project$Util$fst = function (_p8) {
	var _p9 = _p8;
	return _p9._0;
};
var _user$project$Util$removeComma = _elm_lang$core$List$filter(
	function (x) {
		return !_elm_lang$core$Native_Utils.eq(
			x,
			_elm_lang$core$Native_Utils.chr(','));
	});
var _user$project$Util$delete = F2(
	function (a, li) {
		return A2(
			_elm_lang$core$List$filter,
			function (x) {
				return !_elm_lang$core$Native_Utils.eq(a, x);
			},
			li);
	});
var _user$project$Util$removeWhiteSpace = _user$project$Util$delete(
	_elm_lang$core$Native_Utils.chr(' '));
var _user$project$Util$removeWhiteSpaceFromString = function (a) {
	return _elm_lang$core$String$fromList(
		_user$project$Util$removeWhiteSpace(
			_elm_lang$core$String$toList(a)));
};
var _user$project$Util$string2num = function (x) {
	return _elm_lang$core$Basics$toString(
		_Skinney$fnv$FNV$hashString(x));
};
var _user$project$Util$concatComma = function (a) {
	return _elm_lang$core$String$concat(
		A2(_elm_lang$core$List$intersperse, ' , ', a));
};
var _user$project$Util$powerList = function (xs) {
	return _elm_community$list_extra$List_Extra$subsequences(xs);
};
var _user$project$Util$subList = F2(
	function (a, b) {
		return A2(
			_elm_lang$core$List$member,
			a,
			_user$project$Util$powerList(b));
	});
var _user$project$Util$difference = F2(
	function (xs, ys) {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, a) {
					return A2(_elm_lang$core$List$member, x, ys) ? a : {ctor: '::', _0: x, _1: a};
				}),
			{ctor: '[]'},
			xs);
	});
var _user$project$Util$exists = F2(
	function (xs, p) {
		return A2(_elm_lang$core$List$any, p, xs);
	});
var _user$project$Util$forall = F2(
	function (xs, p) {
		return A2(_elm_lang$core$List$all, p, xs);
	});
var _user$project$Util$nub2 = _elm_community$list_extra$List_Extra$unique;
var _user$project$Util$nsort = function (x) {
	return _elm_lang$core$List$sort(
		_user$project$Util$nub2(x));
};
var _user$project$Util$nub = function (xs) {
	return A3(
		_elm_lang$core$List$foldl,
		F2(
			function (a, xss) {
				return A2(_elm_lang$core$List$member, a, xss) ? xss : {ctor: '::', _0: a, _1: xss};
			}),
		{ctor: '[]'},
		xs);
};
var _user$project$Util$rotate = function (li) {
	var ff = function (_p10) {
		var _p11 = _p10;
		return A2(_elm_lang$core$Basics_ops['++'], _p11._0, _p11._1);
	};
	var tai = _elm_community$list_extra$List_Extra$tails(li);
	var ini = _elm_community$list_extra$List_Extra$inits(li);
	return _user$project$Util$nub(
		A2(
			_elm_lang$core$List$map,
			ff,
			A2(_elm_community$list_extra$List_Extra$zip, tai, ini)));
};
var _user$project$Util$intersectL = F2(
	function (xs1, xs2) {
		return A3(
			_elm_lang$core$List$foldl,
			F2(
				function (a, ax) {
					return A2(_elm_lang$core$List$member, a, xs1) ? {ctor: '::', _0: a, _1: ax} : ax;
				}),
			{ctor: '[]'},
			xs2);
	});
var _user$project$Util_ops = _user$project$Util_ops || {};
_user$project$Util_ops['==>'] = F2(
	function (b1, b2) {
		return (!b1) || b2;
	});
var _user$project$Util$unwords = _elm_lang$core$String$concat;
var _user$project$Util$initTail = function (a) {
	return A2(
		_elm_lang$core$Maybe$withDefault,
		{ctor: '[]'},
		_elm_community$list_extra$List_Extra$init(
			A2(
				_elm_lang$core$Maybe$withDefault,
				{ctor: '[]'},
				_elm_lang$core$List$tail(a))));
};
var _user$project$Util$lookup = F2(
	function (a, li) {
		lookup:
		while (true) {
			var _p12 = li;
			if (_p12.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				if (_elm_lang$core$Native_Utils.eq(_p12._0._0, a)) {
					return _elm_lang$core$Maybe$Just(_p12._0._1);
				} else {
					var _v7 = a,
						_v8 = _p12._1;
					a = _v7;
					li = _v8;
					continue lookup;
				}
			}
		}
	});
var _user$project$Util$lookVal = F2(
	function (at, li) {
		lookVal:
		while (true) {
			var _p13 = li;
			if (_p13.ctor === '[]') {
				return {ctor: '[]'};
			} else {
				if (_elm_lang$core$Native_Utils.eq(at, _p13._0._0)) {
					return _p13._0._1;
				} else {
					var _v10 = at,
						_v11 = _p13._1;
					at = _v10;
					li = _v11;
					continue lookVal;
				}
			}
		}
	});
var _user$project$Util$lookRel = F2(
	function (at, li) {
		var gg = function (_p14) {
			var _p15 = _p14;
			return {ctor: '_Tuple2', _0: _p15._1, _1: _p15._2};
		};
		return A2(_elm_lang$core$List$map, gg, li);
	});
var _user$project$Util_ops = _user$project$Util_ops || {};
_user$project$Util_ops['$>>='] = F2(
	function (x, y) {
		return A2(_elm_lang$core$List$concatMap, y, x);
	});
var _user$project$Util$cartesian = F2(
	function (xs, ys) {
		return A2(
			_user$project$Util_ops['$>>='],
			xs,
			function (x) {
				return A2(
					_user$project$Util_ops['$>>='],
					ys,
					function (y) {
						return {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: x, _1: y},
							_1: {ctor: '[]'}
						};
					});
			});
	});
var _user$project$Util$cartesian2 = F3(
	function (xs, ys, zs) {
		return A2(
			_user$project$Util_ops['$>>='],
			xs,
			function (x) {
				return A2(
					_user$project$Util_ops['$>>='],
					ys,
					function (y) {
						return A2(
							_user$project$Util_ops['$>>='],
							zs,
							function (z) {
								return {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: x, _1: y, _2: z},
									_1: {ctor: '[]'}
								};
							});
					});
			});
	});
var _user$project$Util_ops = _user$project$Util_ops || {};
_user$project$Util_ops['?>>='] = _elm_lang$core$Basics$flip(_elm_lang$core$Maybe$andThen);
var _user$project$Util_ops = _user$project$Util_ops || {};
_user$project$Util_ops['@>>='] = _elm_lang$core$Basics$flip(_elm_lang$core$Result$andThen);
var _user$project$Util$unzip2 = function (pairs) {
	var ff = F2(
		function (_p17, _p16) {
			var _p18 = _p17;
			var _p19 = _p16;
			return {
				ctor: '_Tuple2',
				_0: A2(_elm_lang$core$Basics_ops['++'], _p18._0, _p19._0),
				_1: A2(_elm_lang$core$Basics_ops['++'], _p18._1, _p19._1)
			};
		});
	return A3(
		_elm_lang$core$List$foldr,
		ff,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		pairs);
};
var _user$project$Util$maybeBigOr = function (li) {
	var _p20 = li;
	if (_p20.ctor === '[]') {
		return _elm_lang$core$Maybe$Nothing;
	} else {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, y) {
					return A2(_elm_community$maybe_extra$Maybe_Extra$or, x, y);
				}),
			_p20._0,
			_p20._1);
	}
};
var _user$project$Util$show = _elm_lang$core$Basics$toString;
var _user$project$Util$isSingleton = function (li) {
	var _p21 = li;
	if ((_p21.ctor === '::') && (_p21._1.ctor === '[]')) {
		return true;
	} else {
		return false;
	}
};
var _user$project$Util$or = function (li) {
	return A2(
		_user$project$Util$exists,
		li,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		});
};
var _user$project$Util$and = function (li) {
	return A2(
		_user$project$Util$forall,
		li,
		function (x) {
			return _elm_lang$core$Native_Utils.eq(x, true);
		});
};
var _user$project$Util$maybelist2list = function (mli) {
	maybelist2list:
	while (true) {
		var _p22 = mli;
		if (_p22.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p24 = _p22._1;
			var _p23 = _p22._0;
			if (_p23.ctor === 'Nothing') {
				var _v19 = _p24;
				mli = _v19;
				continue maybelist2list;
			} else {
				return {
					ctor: '::',
					_0: _p23._0,
					_1: _user$project$Util$maybelist2list(_p24)
				};
			}
		}
	}
};
var _user$project$Util$int2list = function (n) {
	return _elm_lang$core$Native_Utils.eq(n, 0) ? {ctor: '[]'} : A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: n,
			_1: {ctor: '[]'}
		},
		_user$project$Util$int2list(n - 1));
};
var _user$project$Util$forallResult = F2(
	function (list, func) {
		var biOp = F2(
			function (x, y) {
				var _p25 = {ctor: '_Tuple2', _0: x, _1: y};
				if (_p25._0.ctor === 'Ok') {
					if (_p25._1.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(_p25._0._0 && _p25._1._0);
					} else {
						return _elm_lang$core$Result$Err(_p25._1._0);
					}
				} else {
					if (_p25._1.ctor === 'Ok') {
						return _elm_lang$core$Result$Err(_p25._0._0);
					} else {
						return _elm_lang$core$Result$Err(_p25._0._0);
					}
				}
			});
		var listOfResult = A2(_elm_lang$core$List$map, func, list);
		return A3(
			_elm_lang$core$List$foldl,
			biOp,
			_elm_lang$core$Result$Ok(true),
			listOfResult);
	});
var _user$project$Util$forallEither = F2(
	function (list, func) {
		var biOp = F2(
			function (x, y) {
				var _p26 = {ctor: '_Tuple2', _0: x, _1: y};
				if (_p26._0.ctor === 'Right') {
					if (_p26._1.ctor === 'Right') {
						return _toastal$either$Either$Right(_p26._0._0 && _p26._1._0);
					} else {
						return _toastal$either$Either$Left(_p26._1._0);
					}
				} else {
					if (_p26._1.ctor === 'Right') {
						return _toastal$either$Either$Left(_p26._0._0);
					} else {
						return _toastal$either$Either$Left(_p26._0._0);
					}
				}
			});
		var listOfEither = A2(_elm_lang$core$List$map, func, list);
		return A3(
			_elm_lang$core$List$foldl,
			biOp,
			_toastal$either$Either$Right(true),
			listOfEither);
	});
var _user$project$Util$existsResult = F2(
	function (list, func) {
		var biOp = F2(
			function (x, y) {
				var _p27 = {ctor: '_Tuple2', _0: x, _1: y};
				if (_p27._0.ctor === 'Ok') {
					if (_p27._1.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(_p27._0._0 || _p27._1._0);
					} else {
						return _elm_lang$core$Result$Ok(_p27._0._0);
					}
				} else {
					if (_p27._1.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(_p27._1._0);
					} else {
						return _elm_lang$core$Result$Err(_p27._0._0);
					}
				}
			});
		var listOfResult = A2(_elm_lang$core$List$map, func, list);
		return A3(
			_elm_lang$core$List$foldl,
			biOp,
			_elm_lang$core$Result$Ok(true),
			listOfResult);
	});
var _user$project$Util$existsEither = F2(
	function (list, func) {
		var biOp = F2(
			function (x, y) {
				var _p28 = {ctor: '_Tuple2', _0: x, _1: y};
				if (_p28._0.ctor === 'Right') {
					if (_p28._1.ctor === 'Right') {
						return _toastal$either$Either$Right(_p28._0._0 || _p28._1._0);
					} else {
						return _toastal$either$Either$Right(_p28._0._0);
					}
				} else {
					if (_p28._1.ctor === 'Right') {
						return _toastal$either$Either$Right(_p28._1._0);
					} else {
						return _toastal$either$Either$Left(_p28._0._0);
					}
				}
			});
		var listOfEither = A2(_elm_lang$core$List$map, func, list);
		return A3(
			_elm_lang$core$List$foldl,
			biOp,
			_toastal$either$Either$Right(false),
			listOfEither);
	});
var _user$project$Util$forallMaybe = F2(
	function (list, func) {
		var biOp = F2(
			function (x, y) {
				var _p29 = {ctor: '_Tuple2', _0: x, _1: y};
				if (_p29._0.ctor === 'Just') {
					if (_p29._1.ctor === 'Just') {
						return _elm_lang$core$Maybe$Just(_p29._0._0 && _p29._1._0);
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				} else {
					if (_p29._1.ctor === 'Just') {
						return _elm_lang$core$Maybe$Nothing;
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		var listOfEither = A2(_elm_lang$core$List$map, func, list);
		return A3(
			_elm_lang$core$List$foldl,
			biOp,
			_elm_lang$core$Maybe$Just(true),
			listOfEither);
	});
var _user$project$Util$existsMaybe = F2(
	function (list, func) {
		var biOp = F2(
			function (x, y) {
				var _p30 = {ctor: '_Tuple2', _0: x, _1: y};
				if (_p30._0.ctor === 'Just') {
					if (_p30._1.ctor === 'Just') {
						return _elm_lang$core$Maybe$Just(_p30._0._0 || _p30._1._0);
					} else {
						return _elm_lang$core$Maybe$Just(_p30._0._0);
					}
				} else {
					if (_p30._1.ctor === 'Just') {
						return _elm_lang$core$Maybe$Just(_p30._1._0);
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			});
		var listOfEither = A2(_elm_lang$core$List$map, func, list);
		return A3(_elm_lang$core$List$foldl, biOp, _elm_lang$core$Maybe$Nothing, listOfEither);
	});
var _user$project$Util$filterR2 = F3(
	function (func, li, res) {
		filterR2:
		while (true) {
			var _p31 = li;
			if (_p31.ctor === '[]') {
				return res;
			} else {
				var _p34 = _p31._1;
				var _p33 = _p31._0;
				var _p32 = func(_p33);
				if (_p32.ctor === 'Ok') {
					if (_p32._0 === true) {
						var _v28 = func,
							_v29 = _p34,
							_v30 = A2(
							_elm_lang$core$Result$map,
							function (y) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$Util$nub(y),
									{
										ctor: '::',
										_0: _p33,
										_1: {ctor: '[]'}
									});
							},
							res);
						func = _v28;
						li = _v29;
						res = _v30;
						continue filterR2;
					} else {
						var _v31 = func,
							_v32 = _p34,
							_v33 = res;
						func = _v31;
						li = _v32;
						res = _v33;
						continue filterR2;
					}
				} else {
					return _elm_lang$core$Result$Err(_p32._0);
				}
			}
		}
	});
var _user$project$Util$filterR = F2(
	function (func, li) {
		return A3(
			_user$project$Util$filterR2,
			func,
			li,
			_elm_lang$core$Result$Ok(
				{ctor: '[]'}));
	});
var _user$project$Util$toSentenceHelper = F3(
	function (lastPart, sentence, list) {
		toSentenceHelper:
		while (true) {
			var _p35 = list;
			if (_p35.ctor === '[]') {
				return sentence;
			} else {
				if (_p35._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						sentence,
						A2(_elm_lang$core$Basics_ops['++'], lastPart, _p35._0));
				} else {
					var _v35 = lastPart,
						_v36 = A2(
						_elm_lang$core$Basics_ops['++'],
						sentence,
						A2(_elm_lang$core$Basics_ops['++'], ',', _p35._0)),
						_v37 = _p35._1;
					lastPart = _v35;
					sentence = _v36;
					list = _v37;
					continue toSentenceHelper;
				}
			}
		}
	});
var _user$project$Util$toSentenceBaseCase = function (list) {
	var _p36 = list;
	_v38_2:
	do {
		if (_p36.ctor === '::') {
			if (_p36._1.ctor === '[]') {
				return _p36._0;
			} else {
				if (_p36._1._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_p36._0,
						A2(_elm_lang$core$Basics_ops['++'], ',', _p36._1._0));
				} else {
					break _v38_2;
				}
			}
		} else {
			break _v38_2;
		}
	} while(false);
	return '';
};
var _user$project$Util$toSentenceComma = function (list) {
	var _p37 = list;
	if (((_p37.ctor === '::') && (_p37._1.ctor === '::')) && (_p37._1._1.ctor === '::')) {
		return A3(
			_user$project$Util$toSentenceHelper,
			',',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p37._0,
				A2(_elm_lang$core$Basics_ops['++'], ',', _p37._1._0)),
			{ctor: '::', _0: _p37._1._1._0, _1: _p37._1._1._1});
	} else {
		return _user$project$Util$toSentenceBaseCase(list);
	}
};

var _user$project$Common_syntax$outputAction = function (f) {
	var _p0 = f;
	switch (_p0.ctor) {
		case 'PointAModel':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p0._0.am_name,
					A2(
						_elm_lang$core$Basics_ops['++'],
						',',
						A2(_elm_lang$core$Basics_ops['++'], _p0._1, ')'))));
		case 'Cup':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_syntax$outputAction(_p0._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'U',
					_user$project$Common_syntax$outputAction(_p0._1)));
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_syntax$outputAction(_p0._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					';',
					_user$project$Common_syntax$outputAction(_p0._1)));
	}
};
var _user$project$Common_syntax_ops = _user$project$Common_syntax_ops || {};
_user$project$Common_syntax_ops['++++'] = F2(
	function (a, b) {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			a,
			A2(_elm_lang$core$Basics_ops['++'], ' ', b));
	});
var _user$project$Common_syntax$outputForm = F2(
	function (n, f) {
		var paren = F2(
			function (k, s) {
				return (_elm_lang$core$Native_Utils.cmp(n, k) > 0) ? A2(
					_elm_lang$core$Basics_ops['++'],
					'(',
					A2(_elm_lang$core$Basics_ops['++'], s, ')')) : s;
			});
		var _p1 = f;
		switch (_p1.ctor) {
			case 'Atom':
				return _p1._0;
			case 'AnyFormula':
				return _p1._0;
			case 'Top':
				return 'top';
			case 'Bot':
				return 'bot';
			case 'Not':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'~',
					A2(_user$project$Common_syntax$outputForm, 3, _p1._0));
			case 'Dia':
				return A2(
					_user$project$Common_syntax_ops['++++'],
					A2(_elm_lang$core$Basics_ops['++'], '$', _p1._0),
					A2(_user$project$Common_syntax$outputForm, 3, _p1._1));
			case 'Box':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'#',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p1._0,
						A2(_user$project$Common_syntax$outputForm, 3, _p1._1)));
			case 'Imply':
				return A2(
					paren,
					1,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_syntax$outputForm, 2, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'-> ',
							A2(_user$project$Common_syntax$outputForm, 2, _p1._1))));
			case 'Imply2':
				return A2(
					paren,
					1,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_syntax$outputForm, 2, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'<-',
							A2(_user$project$Common_syntax$outputForm, 2, _p1._1))));
			case 'Iff':
				return A2(
					paren,
					1,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_syntax$outputForm, 2, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'<->',
							A2(_user$project$Common_syntax$outputForm, 2, _p1._1))));
			case 'And':
				return A2(
					paren,
					2,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_syntax$outputForm, 3, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'&',
							A2(_user$project$Common_syntax$outputForm, 3, _p1._1))));
			case 'Or':
				return A2(
					paren,
					2,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_syntax$outputForm, 3, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'v',
							A2(_user$project$Common_syntax$outputForm, 3, _p1._1))));
			case 'Bigwedge':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'&&(Rel',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p1._1._0.am_name,
							A2(
								_elm_lang$core$Basics_ops['++'],
								')(',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_p1._1._1._0,
									A2(
										_elm_lang$core$Basics_ops['++'],
										')(',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_p1._1._1._1,
											A2(
												_elm_lang$core$Basics_ops['++'],
												',',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_p1._1._1._2,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'))',
														A2(_user$project$Common_syntax$outputForm, 3, _p1._2)))))))))));
			case 'Bigvee':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'vv(Rel',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p1._1._0.am_name,
							A2(
								_elm_lang$core$Basics_ops['++'],
								')(',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_p1._1._1._0,
									A2(
										_elm_lang$core$Basics_ops['++'],
										')(',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_p1._1._1._1,
											A2(
												_elm_lang$core$Basics_ops['++'],
												',',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_p1._1._1._2,
													A2(
														_elm_lang$core$Basics_ops['++'],
														'))',
														A2(_user$project$Common_syntax$outputForm, 3, _p1._2)))))))))));
			case 'BoxAction':
				return A2(
					paren,
					3,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'[',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_syntax$outputAction(_p1._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								']',
								A2(_user$project$Common_syntax$outputForm, 3, _p1._1)))));
			case 'DiaAction':
				return A2(
					paren,
					3,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'<',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_syntax$outputAction(_p1._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'>',
								A2(_user$project$Common_syntax$outputForm, 3, _p1._1)))));
			case 'Precon':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'Pre(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p1._0.am_name,
						A2(
							_elm_lang$core$Basics_ops['++'],
							')(',
							A2(_elm_lang$core$Basics_ops['++'], _p1._1, ')'))));
			case 'Announce':
				return A2(
					paren,
					3,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'[',
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$Common_syntax$outputForm, 3, _p1._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								']',
								A2(_user$project$Common_syntax$outputForm, 3, _p1._1)))));
			default:
				return A2(
					paren,
					3,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'<',
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$Common_syntax$outputForm, 3, _p1._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'>',
								A2(_user$project$Common_syntax$outputForm, 3, _p1._1)))));
		}
	});
var _user$project$Common_syntax$lookPre = F2(
	function (li, at) {
		lookPre:
		while (true) {
			var _p2 = li;
			if (_p2.ctor === '[]') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				if (_elm_lang$core$Native_Utils.eq(at, _p2._0._0)) {
					return _elm_lang$core$Maybe$Just(_p2._0._1);
				} else {
					var _v3 = _p2._1,
						_v4 = at;
					li = _v3;
					at = _v4;
					continue lookPre;
				}
			}
		}
	});
var _user$project$Common_syntax$amodel2agentlist = function (ac) {
	return A2(
		_elm_lang$core$List$map,
		function (_p3) {
			var _p4 = _p3;
			return _p4._0;
		},
		ac.am_relation);
};
var _user$project$Common_syntax$formula2Int = function (f) {
	var _p5 = f;
	switch (_p5.ctor) {
		case 'Bot':
			return 0;
		case 'Top':
			return 1;
		case 'Atom':
			return 2 + _elm_lang$core$String$length(_p5._0);
		case 'AnyFormula':
			return 3 + _elm_lang$core$String$length(_p5._0);
		case 'Not':
			return 4 + _user$project$Common_syntax$formula2Int(_p5._0);
		case 'And':
			return (5 + _user$project$Common_syntax$formula2Int(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Or':
			return (6 + _user$project$Common_syntax$formula2Int(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Imply':
			return (7 + _user$project$Common_syntax$formula2Int(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Imply2':
			return (8 + _user$project$Common_syntax$formula2Int(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Iff':
			return (9 + _user$project$Common_syntax$formula2Int(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Dia':
			return (10 + _elm_lang$core$String$length(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Box':
			return (11 + _elm_lang$core$String$length(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Announce':
			return (12 + _user$project$Common_syntax$formula2Int(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Announce2':
			return (13 + _user$project$Common_syntax$formula2Int(_p5._0)) + _user$project$Common_syntax$formula2Int(_p5._1);
		case 'Bigwedge':
			return 14;
		case 'Bigvee':
			return 15;
		case 'BoxAction':
			return 16;
		case 'DiaAction':
			return 17;
		default:
			return 18;
	}
};
var _user$project$Common_syntax$isDELformula = function (f) {
	isDELformula:
	while (true) {
		var _p6 = f;
		_v7_14:
		do {
			switch (_p6.ctor) {
				case 'Not':
					var _v8 = _p6._0;
					f = _v8;
					continue isDELformula;
				case 'And':
					return _user$project$Common_syntax$isDELformula(_p6._0) && _user$project$Common_syntax$isDELformula(_p6._1);
				case 'Imply':
					return _user$project$Common_syntax$isDELformula(_p6._0) && _user$project$Common_syntax$isDELformula(_p6._1);
				case 'Imply2':
					return _user$project$Common_syntax$isDELformula(_p6._0) && _user$project$Common_syntax$isDELformula(_p6._1);
				case 'Iff':
					return _user$project$Common_syntax$isDELformula(_p6._0) && _user$project$Common_syntax$isDELformula(_p6._1);
				case 'Dia':
					var _v9 = _p6._1;
					f = _v9;
					continue isDELformula;
				case 'Box':
					var _v10 = _p6._1;
					f = _v10;
					continue isDELformula;
				case 'Announce':
					return false;
				case 'Announce2':
					return false;
				case 'Bigwedge':
					if ((_p6._1.ctor === '_Tuple2') && (_p6._1._1.ctor === '_Tuple3')) {
						var _v11 = _p6._2;
						f = _v11;
						continue isDELformula;
					} else {
						break _v7_14;
					}
				case 'Bigvee':
					if ((_p6._1.ctor === '_Tuple2') && (_p6._1._1.ctor === '_Tuple3')) {
						var _v12 = _p6._2;
						f = _v12;
						continue isDELformula;
					} else {
						break _v7_14;
					}
				case 'BoxAction':
					var _v13 = _p6._1;
					f = _v13;
					continue isDELformula;
				case 'DiaAction':
					var _v14 = _p6._1;
					f = _v14;
					continue isDELformula;
				case 'Precon':
					return true;
				default:
					break _v7_14;
			}
		} while(false);
		return true;
	}
};
var _user$project$Common_syntax$isPALformula = function (f) {
	isPALformula:
	while (true) {
		var _p7 = f;
		_v15_14:
		do {
			switch (_p7.ctor) {
				case 'Not':
					var _v16 = _p7._0;
					f = _v16;
					continue isPALformula;
				case 'And':
					return _user$project$Common_syntax$isPALformula(_p7._0) && _user$project$Common_syntax$isPALformula(_p7._1);
				case 'Imply':
					return _user$project$Common_syntax$isPALformula(_p7._0) && _user$project$Common_syntax$isPALformula(_p7._1);
				case 'Imply2':
					return _user$project$Common_syntax$isPALformula(_p7._0) && _user$project$Common_syntax$isPALformula(_p7._1);
				case 'Iff':
					return _user$project$Common_syntax$isPALformula(_p7._0) && _user$project$Common_syntax$isPALformula(_p7._1);
				case 'Dia':
					var _v17 = _p7._1;
					f = _v17;
					continue isPALformula;
				case 'Box':
					var _v18 = _p7._1;
					f = _v18;
					continue isPALformula;
				case 'Announce':
					return _user$project$Common_syntax$isPALformula(_p7._0) && _user$project$Common_syntax$isPALformula(_p7._1);
				case 'Announce2':
					return _user$project$Common_syntax$isPALformula(_p7._0) && _user$project$Common_syntax$isPALformula(_p7._1);
				case 'Bigwedge':
					if ((_p7._1.ctor === '_Tuple2') && (_p7._1._1.ctor === '_Tuple3')) {
						return false;
					} else {
						break _v15_14;
					}
				case 'Bigvee':
					if ((_p7._1.ctor === '_Tuple2') && (_p7._1._1.ctor === '_Tuple3')) {
						return false;
					} else {
						break _v15_14;
					}
				case 'BoxAction':
					return false;
				case 'DiaAction':
					return false;
				case 'Precon':
					return false;
				default:
					break _v15_14;
			}
		} while(false);
		return true;
	}
};
var _user$project$Common_syntax$isELformula = function (f) {
	isELformula:
	while (true) {
		var _p8 = f;
		_v19_14:
		do {
			switch (_p8.ctor) {
				case 'Not':
					var _v20 = _p8._0;
					f = _v20;
					continue isELformula;
				case 'And':
					return _user$project$Common_syntax$isELformula(_p8._0) && _user$project$Common_syntax$isELformula(_p8._1);
				case 'Imply':
					return _user$project$Common_syntax$isELformula(_p8._0) && _user$project$Common_syntax$isELformula(_p8._1);
				case 'Imply2':
					return _user$project$Common_syntax$isELformula(_p8._0) && _user$project$Common_syntax$isELformula(_p8._1);
				case 'Iff':
					return _user$project$Common_syntax$isELformula(_p8._0) && _user$project$Common_syntax$isELformula(_p8._1);
				case 'Dia':
					var _v21 = _p8._1;
					f = _v21;
					continue isELformula;
				case 'Box':
					var _v22 = _p8._1;
					f = _v22;
					continue isELformula;
				case 'Announce':
					return false;
				case 'Announce2':
					return false;
				case 'Bigwedge':
					if ((_p8._1.ctor === '_Tuple2') && (_p8._1._1.ctor === '_Tuple3')) {
						return false;
					} else {
						break _v19_14;
					}
				case 'Bigvee':
					if ((_p8._1.ctor === '_Tuple2') && (_p8._1._1.ctor === '_Tuple3')) {
						return false;
					} else {
						break _v19_14;
					}
				case 'BoxAction':
					return false;
				case 'DiaAction':
					return false;
				case 'Precon':
					return false;
				default:
					break _v19_14;
			}
		} while(false);
		return true;
	}
};
var _user$project$Common_syntax$AtomBool = F2(
	function (a, b) {
		return {atom: a, maybeBool: b};
	});
var _user$project$Common_syntax$FormulaBool = F2(
	function (a, b) {
		return {formula: a, maybeBool: b};
	});
var _user$project$Common_syntax$AModel = F4(
	function (a, b, c, d) {
		return {am_name: a, am_domain: b, am_relation: c, am_pre: d};
	});
var _user$project$Common_syntax$Precon = F2(
	function (a, b) {
		return {ctor: 'Precon', _0: a, _1: b};
	});
var _user$project$Common_syntax$DiaAction = F2(
	function (a, b) {
		return {ctor: 'DiaAction', _0: a, _1: b};
	});
var _user$project$Common_syntax$BoxAction = F2(
	function (a, b) {
		return {ctor: 'BoxAction', _0: a, _1: b};
	});
var _user$project$Common_syntax$Bigvee = F3(
	function (a, b, c) {
		return {ctor: 'Bigvee', _0: a, _1: b, _2: c};
	});
var _user$project$Common_syntax$Bigwedge = F3(
	function (a, b, c) {
		return {ctor: 'Bigwedge', _0: a, _1: b, _2: c};
	});
var _user$project$Common_syntax$Announce2 = F2(
	function (a, b) {
		return {ctor: 'Announce2', _0: a, _1: b};
	});
var _user$project$Common_syntax$Announce = F2(
	function (a, b) {
		return {ctor: 'Announce', _0: a, _1: b};
	});
var _user$project$Common_syntax$Box = F2(
	function (a, b) {
		return {ctor: 'Box', _0: a, _1: b};
	});
var _user$project$Common_syntax$know = F2(
	function (ag, f) {
		return A2(_user$project$Common_syntax$Box, ag, f);
	});
var _user$project$Common_syntax$Dia = F2(
	function (a, b) {
		return {ctor: 'Dia', _0: a, _1: b};
	});
var _user$project$Common_syntax$Iff = F2(
	function (a, b) {
		return {ctor: 'Iff', _0: a, _1: b};
	});
var _user$project$Common_syntax$Imply2 = F2(
	function (a, b) {
		return {ctor: 'Imply2', _0: a, _1: b};
	});
var _user$project$Common_syntax$Imply = F2(
	function (a, b) {
		return {ctor: 'Imply', _0: a, _1: b};
	});
var _user$project$Common_syntax$Or = F2(
	function (a, b) {
		return {ctor: 'Or', _0: a, _1: b};
	});
var _user$project$Common_syntax$And = F2(
	function (a, b) {
		return {ctor: 'And', _0: a, _1: b};
	});
var _user$project$Common_syntax$Not = function (a) {
	return {ctor: 'Not', _0: a};
};
var _user$project$Common_syntax$notknow = F2(
	function (ag, f) {
		return _user$project$Common_syntax$Not(
			A2(_user$project$Common_syntax$know, ag, f));
	});
var _user$project$Common_syntax$AnyFormula = function (a) {
	return {ctor: 'AnyFormula', _0: a};
};
var _user$project$Common_syntax$Atom = function (a) {
	return {ctor: 'Atom', _0: a};
};
var _user$project$Common_syntax$reada = function () {
	var readaPre = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'e1',
			_1: _user$project$Common_syntax$Atom('p')
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'e0',
				_1: _user$project$Common_syntax$Not(
					_user$project$Common_syntax$Atom('p'))
			},
			_1: {ctor: '[]'}
		}
	};
	var name = 'Reada';
	var pa = 'e1';
	var npa = 'e0';
	var readaS = {
		ctor: '::',
		_0: npa,
		_1: {
			ctor: '::',
			_0: pa,
			_1: {ctor: '[]'}
		}
	};
	var readaR = A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: {ctor: '_Tuple3', _0: 'a', _1: npa, _2: npa},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'a', _1: pa, _2: pa},
				_1: {ctor: '[]'}
			}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'b', _1: npa, _2: npa},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'b', _1: pa, _2: pa},
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'b', _1: npa, _2: pa},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'b', _1: pa, _2: npa},
					_1: {ctor: '[]'}
				}
			}));
	return {am_name: name, am_domain: readaS, am_relation: readaR, am_pre: readaPre};
}();
var _user$project$Common_syntax$readb = function () {
	var readaPre = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'pb',
			_1: _user$project$Common_syntax$Atom('p')
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'npb',
				_1: _user$project$Common_syntax$Not(
					_user$project$Common_syntax$Atom('p'))
			},
			_1: {ctor: '[]'}
		}
	};
	var name = 'Readb';
	var pb = 'pb';
	var npb = 'npb';
	var readaS = {
		ctor: '::',
		_0: npb,
		_1: {
			ctor: '::',
			_0: pb,
			_1: {ctor: '[]'}
		}
	};
	var readaR = A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: {ctor: '_Tuple3', _0: 'a', _1: npb, _2: npb},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'a', _1: pb, _2: pb},
				_1: {ctor: '[]'}
			}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'a', _1: npb, _2: pb},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'a', _1: pb, _2: npb},
					_1: {ctor: '[]'}
				}
			},
			{
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'b', _1: npb, _2: npb},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'b', _1: pb, _2: pb},
					_1: {ctor: '[]'}
				}
			}));
	return {am_name: name, am_domain: readaS, am_relation: readaR, am_pre: readaPre};
}();
var _user$project$Common_syntax$Bot = {ctor: 'Bot'};
var _user$project$Common_syntax$bigOr = function (li) {
	var _p9 = li;
	if (_p9.ctor === '[]') {
		return _user$project$Common_syntax$Bot;
	} else {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, y) {
					return A2(_user$project$Common_syntax$Or, x, y);
				}),
			_p9._0,
			_p9._1);
	}
};
var _user$project$Common_syntax$knowEither = F2(
	function (ag, f) {
		return _user$project$Common_syntax$bigOr(
			{
				ctor: '::',
				_0: A2(_user$project$Common_syntax$Box, ag, f),
				_1: {
					ctor: '::',
					_0: A2(
						_user$project$Common_syntax$Box,
						ag,
						_user$project$Common_syntax$Not(f)),
					_1: {ctor: '[]'}
				}
			});
	});
var _user$project$Common_syntax$knowNeither = F2(
	function (ag, f) {
		return _user$project$Common_syntax$Not(
			A2(_user$project$Common_syntax$knowEither, ag, f));
	});
var _user$project$Common_syntax$lookPre2 = F2(
	function (li, at) {
		lookPre2:
		while (true) {
			var _p10 = li;
			if (_p10.ctor === '[]') {
				return _user$project$Common_syntax$Bot;
			} else {
				if (_elm_lang$core$Native_Utils.eq(at, _p10._0._0)) {
					return _p10._0._1;
				} else {
					var _v25 = _p10._1,
						_v26 = at;
					li = _v25;
					at = _v26;
					continue lookPre2;
				}
			}
		}
	});
var _user$project$Common_syntax$Top = {ctor: 'Top'};
var _user$project$Common_syntax$bigAnd = function (li) {
	var _p11 = li;
	if (_p11.ctor === '[]') {
		return _user$project$Common_syntax$Top;
	} else {
		return A3(
			_elm_lang$core$List$foldr,
			F2(
				function (x, y) {
					return A2(_user$project$Common_syntax$And, x, y);
				}),
			_p11._0,
			_p11._1);
	}
};
var _user$project$Common_syntax$skip = function () {
	var skipPre = {
		ctor: '::',
		_0: {ctor: '_Tuple2', _0: 'e1', _1: _user$project$Common_syntax$Top},
		_1: {ctor: '[]'}
	};
	var e1 = 'e1';
	var skipS = {
		ctor: '::',
		_0: e1,
		_1: {ctor: '[]'}
	};
	var refl = function (ag) {
		return A2(
			_elm_lang$core$List$map,
			function (x) {
				return {ctor: '_Tuple3', _0: ag, _1: x, _2: x};
			},
			skipS);
	};
	var skipR = {
		ctor: '::',
		_0: {ctor: '_Tuple3', _0: 'a', _1: e1, _2: e1},
		_1: {ctor: '[]'}
	};
	return {am_name: 'Skip', am_domain: skipS, am_relation: skipR, am_pre: skipPre};
}();
var _user$project$Common_syntax$ComposePoAM = F2(
	function (a, b) {
		return {ctor: 'ComposePoAM', _0: a, _1: b};
	});
var _user$project$Common_syntax$Cup = F2(
	function (a, b) {
		return {ctor: 'Cup', _0: a, _1: b};
	});
var _user$project$Common_syntax$PointAModel = F2(
	function (a, b) {
		return {ctor: 'PointAModel', _0: a, _1: b};
	});
var _user$project$Common_syntax$composeAM = F2(
	function (e1, e2) {
		var form = F2(
			function (x, y) {
				return A2(
					_user$project$Common_syntax$And,
					A2(_user$project$Common_syntax$Precon, e1, x),
					A2(
						_user$project$Common_syntax$BoxAction,
						A2(_user$project$Common_syntax$PointAModel, e1, x),
						A2(_user$project$Common_syntax$Precon, e2, y)));
			});
		var mapF = function (_p12) {
			var _p13 = _p12;
			var _p15 = _p13._1;
			var _p14 = _p13._0;
			return {
				ctor: '_Tuple2',
				_0: A2(
					_elm_lang$core$Basics_ops['++'],
					'(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p14,
						A2(
							_elm_lang$core$Basics_ops['++'],
							',',
							A2(_elm_lang$core$Basics_ops['++'], _p15, ')')))),
				_1: A2(form, _p14, _p15)
			};
		};
		var ff = function (_p16) {
			var _p17 = _p16;
			var _p18 = _p17._0;
			return A2(
				_elm_lang$core$List$member,
				{ctor: '_Tuple3', _0: _p18, _1: _p17._1._0, _2: _p17._2._0},
				e1.am_relation) && A2(
				_elm_lang$core$List$member,
				{ctor: '_Tuple3', _0: _p18, _1: _p17._1._1, _2: _p17._2._1},
				e2.am_relation);
		};
		var domain1 = A2(_user$project$Util$cartesian, e1.am_domain, e2.am_domain);
		var domain2 = A2(
			_elm_lang$core$List$map,
			function (_p19) {
				var _p20 = _p19;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p20._0,
						A2(
							_elm_lang$core$Basics_ops['++'],
							',',
							A2(_elm_lang$core$Basics_ops['++'], _p20._1, ')'))));
			},
			domain1);
		var pre2 = A2(_elm_lang$core$List$map, mapF, domain1);
		var name2 = A2(
			_elm_lang$core$Basics_ops['++'],
			'(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				e1.am_name,
				A2(
					_elm_lang$core$Basics_ops['++'],
					';',
					A2(_elm_lang$core$Basics_ops['++'], e2.am_name, ')'))));
		var agents = _user$project$Util$nub2(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_syntax$amodel2agentlist(e1),
				_user$project$Common_syntax$amodel2agentlist(e2)));
		var relation1 = A3(_user$project$Util$cartesian2, agents, domain1, domain1);
		var relation2 = A2(_elm_lang$core$List$filter, ff, relation1);
		var relation3 = A2(
			_elm_lang$core$List$map,
			function (_p21) {
				var _p22 = _p21;
				return {
					ctor: '_Tuple3',
					_0: _p22._0,
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p22._1._0,
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								A2(_elm_lang$core$Basics_ops['++'], _p22._1._1, ')')))),
					_2: A2(
						_elm_lang$core$Basics_ops['++'],
						'(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p22._2._0,
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								A2(_elm_lang$core$Basics_ops['++'], _p22._2._1, ')'))))
				};
			},
			relation2);
		return {am_name: name2, am_domain: domain2, am_relation: relation3, am_pre: pre2};
	});
var _user$project$Common_syntax$composeAction = F2(
	function (a, b) {
		composeAction:
		while (true) {
			var _p23 = {ctor: '_Tuple2', _0: a, _1: b};
			_v32_4:
			do {
				if (_p23.ctor === '_Tuple2') {
					switch (_p23._0.ctor) {
						case 'PointAModel':
							switch (_p23._1.ctor) {
								case 'PointAModel':
									return A2(
										_user$project$Common_syntax$PointAModel,
										A2(_user$project$Common_syntax$composeAM, _p23._0._0, _p23._1._0),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'(',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p23._0._1,
												A2(
													_elm_lang$core$Basics_ops['++'],
													',',
													A2(_elm_lang$core$Basics_ops['++'], _p23._1._1, ')')))));
								case 'ComposePoAM':
									var _v33 = A2(_user$project$Common_syntax$PointAModel, _p23._0._0, _p23._0._1),
										_v34 = A2(_user$project$Common_syntax$composeAction, _p23._1._0, _p23._1._1);
									a = _v33;
									b = _v34;
									continue composeAction;
								default:
									break _v32_4;
							}
						case 'ComposePoAM':
							switch (_p23._1.ctor) {
								case 'PointAModel':
									var _v35 = A2(_user$project$Common_syntax$composeAction, _p23._0._0, _p23._0._1),
										_v36 = A2(_user$project$Common_syntax$PointAModel, _p23._1._0, _p23._1._1);
									a = _v35;
									b = _v36;
									continue composeAction;
								case 'ComposePoAM':
									var _v37 = A2(_user$project$Common_syntax$composeAction, _p23._0._0, _p23._0._1),
										_v38 = A2(_user$project$Common_syntax$composeAction, _p23._1._0, _p23._1._1);
									a = _v37;
									b = _v38;
									continue composeAction;
								default:
									break _v32_4;
							}
						default:
							break _v32_4;
					}
				} else {
					break _v32_4;
				}
			} while(false);
			return _elm_lang$core$Native_Utils.crashCase(
				'Common_syntax',
				{
					start: {line: 197, column: 22},
					end: {line: 208, column: 50}
				},
				_p23)('error in composeAction');
		}
	});
var _user$project$Common_syntax_ops = _user$project$Common_syntax_ops || {};
_user$project$Common_syntax_ops['+++'] = _user$project$Common_syntax$composeAction;
var _user$project$Common_syntax$skip_point = A2(_user$project$Common_syntax$PointAModel, _user$project$Common_syntax$skip, 's1');
var _user$project$Common_syntax$reada_po = A2(_user$project$Common_syntax$PointAModel, _user$project$Common_syntax$reada, 'pa');
var _user$project$Common_syntax$readb_po = A2(_user$project$Common_syntax$PointAModel, _user$project$Common_syntax$readb, 'pb');
var _user$project$Common_syntax$mayReada = function () {
	var readaPre = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'pa',
			_1: _user$project$Common_syntax$Atom('p')
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'npa',
				_1: _user$project$Common_syntax$Not(
					_user$project$Common_syntax$Atom('p'))
			},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple2', _0: 't', _1: _user$project$Common_syntax$Top},
				_1: {ctor: '[]'}
			}
		}
	};
	var name = 'MayReada';
	var t = 't';
	var pa = 'pa';
	var npa = 'npa';
	var readaS = {
		ctor: '::',
		_0: npa,
		_1: {
			ctor: '::',
			_0: pa,
			_1: {
				ctor: '::',
				_0: t,
				_1: {ctor: '[]'}
			}
		}
	};
	var readaR = A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: {ctor: '_Tuple3', _0: 'a', _1: npa, _2: npa},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'a', _1: pa, _2: pa},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'a', _1: t, _2: t},
					_1: {ctor: '[]'}
				}
			}
		},
		A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'b', _1: npa, _2: npa},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'b', _1: pa, _2: pa},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'b', _1: t, _2: t},
						_1: {ctor: '[]'}
					}
				}
			},
			A2(
				_elm_lang$core$Basics_ops['++'],
				{
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'b', _1: npa, _2: pa},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'b', _1: pa, _2: npa},
						_1: {ctor: '[]'}
					}
				},
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'b', _1: npa, _2: t},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'b', _1: t, _2: npa},
							_1: {ctor: '[]'}
						}
					},
					{
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'b', _1: pa, _2: t},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'b', _1: t, _2: pa},
							_1: {ctor: '[]'}
						}
					}))));
	return A2(
		_user$project$Common_syntax$PointAModel,
		{am_name: name, am_domain: readaS, am_relation: readaR, am_pre: readaPre},
		pa);
}();

var _user$project$Common_sequent$texRule = function (r) {
	var _p0 = r;
	switch (_p0) {
		case 'R~':
			return 'R\\neg ';
		case 'L~':
			return 'L\\neg ';
		case 'R&':
			return 'R\\wedge ';
		case 'L&':
			return 'L\\wedge ';
		case 'Rv':
			return 'R\\vee ';
		case 'Lv':
			return 'L\\vee ';
		case 'R->':
			return 'R\\to ';
		case 'R->2':
			return 'R\\to ';
		case 'L->':
			return 'L\\to ';
		case 'R<->':
			return 'R\\leftrightarrow ';
		case 'L<->':
			return 'L\\leftrightarrow ';
		case 'R<.>':
			return 'L\\langle . \\rangle ';
		case 'L<.>':
			return 'R\\langle . \\rangle ';
		case 'R#':
			return 'R\\Box ';
		case 'R#1':
			return 'R\\Box1 ';
		case 'R#2':
			return 'R\\Box2 ';
		case 'L#':
			return 'L\\Box ';
		case 'L#1':
			return 'L\\Box1 ';
		case 'L#2':
			return 'L\\Box2 ';
		case 'R$':
			return 'R\\lozenge ';
		case 'L$':
			return 'L\\lozenge ';
		case 'Bot':
			return 'L\\bot ';
		case 'Top':
			return 'R\\top ';
		case 'R&&':
			return 'R\\wedge\'  ';
		case 'L&&':
			return 'L\\wedge\' ';
		default:
			return _p0;
	}
};
var _user$project$Common_sequent$drawTexFormula = F2(
	function (n, f) {
		var kakko = F2(
			function (k, s) {
				return (_elm_lang$core$Native_Utils.cmp(n, k) > 0) ? A2(
					_elm_lang$core$Basics_ops['++'],
					'(',
					A2(_elm_lang$core$Basics_ops['++'], s, ')')) : s;
			});
		var _p1 = f;
		switch (_p1.ctor) {
			case 'Atom':
				return _p1._0;
			case 'AnyFormula':
				return _p1._0;
			case 'Top':
				return ' \\top ';
			case 'Bot':
				return ' \\bot ';
			case 'Not':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					' \\neg ',
					A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._0));
			case 'Box':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'\\Box_{',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p1._0,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'}',
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1))));
			case 'Dia':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'\\lozenge_{',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p1._0,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'}',
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1))));
			case 'Announce':
				return A2(
					kakko,
					3,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'[',
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								']',
								A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1)))));
			case 'Announce2':
				return A2(
					kakko,
					3,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\\langle ',
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._0),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\\rangle ',
								A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1)))));
			case 'And':
				return A2(
					kakko,
					2,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\wedge',
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1))));
			case 'Or':
				return A2(
					kakko,
					2,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\vee',
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1))));
			case 'Imply':
				return A2(
					kakko,
					1,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_sequent$drawTexFormula, 2, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\to',
							A2(_user$project$Common_sequent$drawTexFormula, 2, _p1._1))));
			case 'Imply2':
				return A2(
					kakko,
					1,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_sequent$drawTexFormula, 2, _p1._1),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\to',
							A2(_user$project$Common_sequent$drawTexFormula, 2, _p1._0))));
			case 'Iff':
				return A2(
					kakko,
					1,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_user$project$Common_sequent$drawTexFormula, 2, _p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\leftrightarrow',
							A2(_user$project$Common_sequent$drawTexFormula, 2, _p1._1))));
			case 'Bigwedge':
				return A2(
					_user$project$Common_syntax_ops['++++'],
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\\bigwedge_{',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p1._1._1._1,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\\sim_',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_p1._1._1._0,
									A2(_elm_lang$core$Basics_ops['++'], '^', _p1._1._0.am_name))))),
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(_elm_lang$core$Basics_ops['++'], _p1._1._1._2, '}'),
						A2(_user$project$Common_sequent$drawTexFormula, 1, _p1._2)));
			case 'Bigvee':
				return A2(
					_user$project$Common_syntax_ops['++++'],
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\\bigvee{',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p1._1._1._1,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\\sim_',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_p1._1._1._0,
									A2(_elm_lang$core$Basics_ops['++'], '^', _p1._1._0.am_name))))),
					A2(
						_user$project$Common_syntax_ops['++++'],
						_p1._1._1._2,
						A2(
							_user$project$Common_syntax_ops['++++'],
							'}',
							A2(_user$project$Common_sequent$drawTexFormula, 1, _p1._2))));
			case 'BoxAction':
				return A2(
					_user$project$Common_syntax_ops['++++'],
					A2(
						_elm_lang$core$Basics_ops['++'],
						'[',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_syntax$outputAction(_p1._0),
							']')),
					A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1));
			case 'DiaAction':
				return A2(
					_user$project$Common_syntax_ops['++++'],
					'\\langle',
					A2(
						_user$project$Common_syntax_ops['++++'],
						_user$project$Common_syntax$outputAction(_p1._0),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\rangle',
							A2(_user$project$Common_sequent$drawTexFormula, 3, f))));
			default:
				return A2(
					_user$project$Common_syntax_ops['++++'],
					'pre^{',
					A2(
						_user$project$Common_syntax_ops['++++'],
						_p1._0.am_name,
						A2(
							_user$project$Common_syntax_ops['++++'],
							'}(',
							A2(_user$project$Common_syntax_ops['++++'], _p1._1, ')'))));
		}
	});
var _user$project$Common_sequent$words = _user$project$Util$concatComma;
var _user$project$Common_sequent$drawTexLabelForm = function (l) {
	var gg = function (x) {
		var _p2 = x;
		if (_p2.ctor === 'Left') {
			return A2(_user$project$Common_sequent$drawTexFormula, 0, _p2._0);
		} else {
			return _user$project$Common_syntax$outputAction(_p2._0);
		}
	};
	var forml = function (fs) {
		return _user$project$Common_sequent$words(
			A2(
				_elm_lang$core$List$map,
				function (f) {
					return A2(_user$project$Common_sequent$drawTexFormula, 1, f);
				},
				fs));
	};
	var _p3 = l;
	return A2(
		_elm_lang$core$Basics_ops['++'],
		_user$project$Util$show(_p3._0._1),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'{:}^{',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$words(
					A2(_elm_lang$core$List$map, gg, _p3._0._2)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'}',
					A2(_user$project$Common_sequent$drawTexFormula, 1, _p3._0._3)))));
};
var _user$project$Common_sequent$showla = function (_p4) {
	var _p5 = _p4;
	var _p8 = _p5._1;
	var _p7 = _p5._0;
	var ff = _user$project$Common_sequent$words(
		A2(_elm_lang$core$List$map, _user$project$Common_syntax$outputAction, _p8));
	var _p6 = _p8;
	if (_p6.ctor === '[]') {
		return _user$project$Util$show(_p7);
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Util$show(_p7),
				A2(
					_elm_lang$core$Basics_ops['++'],
					',',
					A2(_elm_lang$core$Basics_ops['++'], ff, ')'))));
	}
};
var _user$project$Common_sequent$drawTexLabelForm2 = function (r) {
	var gg = function (a) {
		return A2(_user$project$Common_sequent$drawTexFormula, 0, a);
	};
	var _p9 = r;
	if (_p9.ctor === 'RelAtom') {
		if (_p9._0._1.ctor === '[]') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$showla(_p9._0._2),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\\mathsf{R}^{}_{',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p9._0._0,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'}',
							_user$project$Common_sequent$showla(_p9._0._3)))));
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$showla(_p9._0._2),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\\mathsf{R}^{',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$words(
							A2(_elm_lang$core$List$map, gg, _p9._0._1)),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'}_{',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p9._0._0,
								A2(
									_elm_lang$core$Basics_ops['++'],
									'}',
									_user$project$Common_sequent$showla(_p9._0._3)))))));
		}
	} else {
		return A2(
			_user$project$Common_syntax_ops['++++'],
			_user$project$Util$show(_p9._0._0),
			A2(
				_user$project$Common_syntax_ops['++++'],
				'\\leq',
				_user$project$Util$show(_p9._0._1)));
	}
};
var _user$project$Common_sequent$toGraph = F2(
	function (pairs, result) {
		toGraph:
		while (true) {
			var _p10 = pairs;
			if (_p10.ctor === '[]') {
				return result;
			} else {
				var _v8 = _p10._1,
					_v9 = _elm_lang$core$Native_Utils.update(
					result,
					{
						nodes: _user$project$Util$nub(
							A2(_elm_lang$core$Basics_ops['++'], result.nodes, _p10._0._0)),
						edges: _user$project$Util$nub(
							A2(_elm_lang$core$Basics_ops['++'], result.edges, _p10._0._1))
					});
				pairs = _v8;
				result = _v9;
				continue toGraph;
			}
		}
	});
var _user$project$Common_sequent$splitStringByRoundBraket = function (string) {
	var maybe_n = _elm_lang$core$List$head(
		A2(_elm_lang$core$String$indexes, ')', string));
	var a = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		A2(
			_elm_lang$core$Maybe$map,
			function (n) {
				return A2(_elm_lang$core$String$left, n + 1, string);
			},
			maybe_n));
	var b = A2(
		_elm_lang$core$Maybe$withDefault,
		'',
		A2(
			_elm_lang$core$Maybe$map,
			function (n) {
				return A2(_elm_lang$core$String$dropLeft, n + 1, string);
			},
			maybe_n));
	return {ctor: '_Tuple2', _0: a, _1: b};
};
var _user$project$Common_sequent$drawNodeElm = function (string) {
	var _p11 = _user$project$Common_sequent$splitStringByRoundBraket(string);
	var stringCut = _p11._0;
	var stringCut2 = _p11._1;
	var _p12 = stringCut;
	switch (_p12) {
		case '(init)':
			return {
				id: _Skinney$fnv$FNV$hashString(string),
				label: string,
				color: 1
			};
		case '(Top)':
			return {
				id: _Skinney$fnv$FNV$hashString(string),
				label: string,
				color: 1
			};
		case '(Bot)':
			return {
				id: _Skinney$fnv$FNV$hashString(string),
				label: string,
				color: 1
			};
		case '(end)':
			return {
				id: _Skinney$fnv$FNV$hashString(string),
				label: string,
				color: 0
			};
		case '(limit)':
			return {
				id: _Skinney$fnv$FNV$hashString(string),
				label: string,
				color: 2
			};
		case '(stop)':
			return {
				id: _Skinney$fnv$FNV$hashString(string),
				label: string,
				color: 9
			};
		default:
			return {
				id: _Skinney$fnv$FNV$hashString(string),
				label: stringCut2,
				color: 3
			};
	}
};
var _user$project$Common_sequent$drawEdgeElm = function (_p13) {
	var _p14 = _p13;
	var _p17 = _p14._1;
	var _p16 = _p14._0;
	var a = {
		ctor: '::',
		_0: _user$project$Common_sequent$drawNodeElm(_p16),
		_1: {
			ctor: '::',
			_0: _user$project$Common_sequent$drawNodeElm(_p17),
			_1: {ctor: '[]'}
		}
	};
	var _p15 = _user$project$Common_sequent$splitStringByRoundBraket(_p16);
	var stringCut = _p15._0;
	var stringCut2 = _p15._1;
	var b = {
		ctor: '::',
		_0: {
			id: _Skinney$fnv$FNV$hashString(
				A2(_elm_lang$core$Basics_ops['++'], _p16, _p17)),
			from: _Skinney$fnv$FNV$hashString(_p16),
			to: _Skinney$fnv$FNV$hashString(_p17),
			label: stringCut
		},
		_1: {ctor: '[]'}
	};
	return {ctor: '_Tuple2', _0: a, _1: b};
};
var _user$project$Common_sequent$list2pairElm = F2(
	function (xs, provable) {
		return function (x) {
			return A2(
				_user$project$Common_sequent$toGraph,
				x,
				{
					nodes: {ctor: '[]'},
					edges: {ctor: '[]'},
					provable: provable
				});
		}(
			_user$project$Util$nub(
				A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawEdgeElm, xs)));
	});
var _user$project$Common_sequent$addBlank = F2(
	function (li, res) {
		addBlank:
		while (true) {
			var wholeseq = A2(
				_elm_lang$core$List$concatMap,
				function (_p18) {
					var _p19 = _p18;
					return {
						ctor: '::',
						_0: _p19._0,
						_1: {
							ctor: '::',
							_0: _p19._1,
							_1: {ctor: '[]'}
						}
					};
				},
				li);
			var _p20 = li;
			if (_p20.ctor === '[]') {
				return res;
			} else {
				var _p23 = _p20._0._1;
				var _p22 = _p20._1;
				var _p21 = _p20._0._0;
				if (A2(
					_user$project$Util$exists,
					wholeseq,
					function (z) {
						return A2(
							_elm_lang$core$List$member,
							{ctor: '_Tuple2', _0: z, _1: _p23},
							_p22);
					})) {
					var _v14 = _p22,
						_v15 = {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _p21,
							_1: A2(_elm_lang$core$Basics_ops['++'], _p23, ' ')
						},
						_1: res
					};
					li = _v14;
					res = _v15;
					continue addBlank;
				} else {
					var _v16 = _p22,
						_v17 = {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p21, _1: _p23},
						_1: res
					};
					li = _v16;
					res = _v17;
					continue addBlank;
				}
			}
		}
	});
var _user$project$Common_sequent$tree2vis = F2(
	function (_p24, list_tofrom) {
		var _p25 = _p24;
		var _p29 = _p25._1;
		var _p26 = _p29;
		if (_p26.ctor === '[]') {
			return list_tofrom;
		} else {
			return function (x) {
				return function (list) {
					return function (f) {
						return _user$project$Util$nub2(
							A2(_elm_lang$core$List$concatMap, f, _p29));
					}(
						function (tree) {
							return A2(_user$project$Common_sequent$tree2vis, tree, list);
						});
				}(
					A2(_elm_lang$core$Basics_ops['++'], list_tofrom, x));
			}(
				A2(
					_elm_lang$core$List$map,
					function (_p27) {
						var _p28 = _p27;
						return {ctor: '_Tuple2', _0: _p25._0, _1: _p28._0};
					},
					_p26));
		}
	});
var _user$project$Common_sequent$outputLabelExp3tex = function (f) {
	var gg = function (_p30) {
		var _p31 = _p30;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_p31._2,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'\\sim_{',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p31._0,
					A2(
						_elm_lang$core$Basics_ops['++'],
						'}^{',
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(
								_elm_lang$core$String$join,
								';',
								A2(
									_elm_lang$core$List$map,
									function (_) {
										return _.am_name;
									},
									_p31._1)),
							A2(_elm_lang$core$Basics_ops['++'], '}', _p31._3))))));
	};
	return _user$project$Util$concatComma(
		A2(_elm_lang$core$List$map, gg, f));
};
var _user$project$Common_sequent$drawTexSequent = F2(
	function (seq, a) {
		var forDEL = seq.forDEL;
		var rightRel = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm2, seq.rightRel);
		var rightForm = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm, seq.rightForm);
		var leftRel = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm2, seq.leftRel);
		var leftForm = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm, seq.leftForm);
		var _p32 = a;
		if (_p32.ctor === 'Proofsty') {
			return _elm_lang$core$Native_Utils.eq(
				forDEL,
				{ctor: '[]'}) ? A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$words(
					A2(_elm_lang$core$Basics_ops['++'], leftForm, leftRel)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\\Longrightarrow ',
					_user$project$Common_sequent$words(
						A2(_elm_lang$core$Basics_ops['++'], rightForm, rightRel)))) : A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$words(
					A2(_elm_lang$core$Basics_ops['++'], leftForm, leftRel)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\\Longrightarrow ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$words(
							A2(_elm_lang$core$Basics_ops['++'], rightForm, rightRel)),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\\| ',
							_user$project$Common_sequent$outputLabelExp3tex(forDEL)))));
		} else {
			return _elm_lang$core$Native_Utils.eq(
				forDEL,
				{ctor: '[]'}) ? A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$words(
					A2(_elm_lang$core$Basics_ops['++'], leftForm, leftRel)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'&\\Longrightarrow ',
					_user$project$Common_sequent$words(
						A2(_elm_lang$core$Basics_ops['++'], rightForm, rightRel)))) : A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$words(
					A2(_elm_lang$core$Basics_ops['++'], leftForm, leftRel)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'&\\Longrightarrow ',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$words(
							A2(_elm_lang$core$Basics_ops['++'], rightForm, rightRel)),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\\| ',
							_user$project$Common_sequent$outputLabelExp3tex(forDEL)))));
		}
	});
var _user$project$Common_sequent$outputLabelExp3 = function (f) {
	var gg = function (_p33) {
		var _p34 = _p33;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'Rel(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$String$join,
					';',
					A2(
						_elm_lang$core$List$map,
						function (_) {
							return _.am_name;
						},
						_p34._1)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					')(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p34._0,
						A2(
							_elm_lang$core$Basics_ops['++'],
							')(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p34._2,
								A2(
									_elm_lang$core$Basics_ops['++'],
									',',
									A2(_elm_lang$core$Basics_ops['++'], _p34._3, ')'))))))));
	};
	return _user$project$Util$concatComma(
		A2(_elm_lang$core$List$map, gg, f));
};
var _user$project$Common_sequent$outputLabelExp2 = F2(
	function (n, f) {
		var gg = function (annouceform) {
			return _user$project$Util$concatComma(
				A2(
					_elm_lang$core$List$map,
					_user$project$Common_syntax$outputForm(n),
					annouceform));
		};
		var _p35 = f;
		_v24_4:
		do {
			if (_p35.ctor === 'RelAtom') {
				if (_p35._0.ctor === '_Tuple4') {
					if (_p35._0._1.ctor === '::') {
						if ((((_p35._0._2.ctor === '_Tuple2') && (_p35._0._2._1.ctor === '[]')) && (_p35._0._3.ctor === '_Tuple2')) && (_p35._0._3._1.ctor === '[]')) {
							return A2(
								_elm_lang$core$Basics_ops['++'],
								'<i>',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$Util$show(_p35._0._2._0),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'R',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_p35._0._0,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'(',
												A2(
													_elm_lang$core$Basics_ops['++'],
													gg(
														{ctor: '::', _0: _p35._0._1._0, _1: _p35._0._1._1}),
													A2(
														_elm_lang$core$Basics_ops['++'],
														')',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_user$project$Util$show(_p35._0._3._0),
															'</i>'))))))));
						} else {
							break _v24_4;
						}
					} else {
						if ((_p35._0._2.ctor === '_Tuple2') && (_p35._0._3.ctor === '_Tuple2')) {
							if ((_p35._0._2._1.ctor === '[]') && (_p35._0._3._1.ctor === '[]')) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'<i>',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_user$project$Util$show(_p35._0._2._0),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'R',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p35._0._0,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_user$project$Util$show(_p35._0._3._0),
													'</i>')))));
							} else {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'<i>',
									A2(
										_elm_lang$core$Basics_ops['++'],
										'(',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_user$project$Util$show(_p35._0._2._0),
											A2(
												_elm_lang$core$Basics_ops['++'],
												',',
												A2(
													_elm_lang$core$Basics_ops['++'],
													A2(
														_elm_lang$core$String$join,
														',',
														A2(_elm_lang$core$List$map, _user$project$Common_syntax$outputAction, _p35._0._2._1)),
													A2(
														_elm_lang$core$Basics_ops['++'],
														')',
														A2(
															_elm_lang$core$Basics_ops['++'],
															'R',
															A2(
																_elm_lang$core$Basics_ops['++'],
																_p35._0._0,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'(',
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_user$project$Util$show(_p35._0._3._0),
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			',',
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				A2(
																					_elm_lang$core$String$join,
																					',',
																					A2(_elm_lang$core$List$map, _user$project$Common_syntax$outputAction, _p35._0._3._1)),
																				A2(_elm_lang$core$Basics_ops['++'], ')', '</i>')))))))))))));
							}
						} else {
							break _v24_4;
						}
					}
				} else {
					break _v24_4;
				}
			} else {
				if (_p35._0.ctor === '_Tuple2') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Util$show(_p35._0._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'=<',
							_user$project$Util$show(_p35._0._1)));
				} else {
					break _v24_4;
				}
			}
		} while(false);
		return _elm_lang$core$Native_Utils.crashCase(
			'Common_sequent',
			{
				start: {line: 938, column: 5},
				end: {line: 946, column: 58}
			},
			_p35)('error in outputLabelExp2');
	});
var _user$project$Common_sequent$action2string = function (pam) {
	var _p37 = pam;
	switch (_p37.ctor) {
		case 'PointAModel':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p37._0.am_name,
					A2(
						_elm_lang$core$Basics_ops['++'],
						',',
						A2(_elm_lang$core$Basics_ops['++'], _p37._1, ')'))));
		case 'Cup':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$action2string(_p37._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'U',
					_user$project$Common_sequent$action2string(_p37._1)));
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$action2string(_p37._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					';',
					_user$project$Common_sequent$action2string(_p37._1)));
	}
};
var _user$project$Common_sequent$outputLabelExp = F2(
	function (n, _p38) {
		var _p39 = _p38;
		var _p51 = _p39._0._1;
		var _p50 = _p39._0._3;
		var _p49 = _p39._0._0;
		var _p48 = _p39._0._2;
		var addhistory2 = function (x) {
			return _elm_lang$core$Native_Utils.eq(x, '') ? x : A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(_elm_lang$core$Basics_ops['++'], x, ')'));
		}(
			_user$project$Util$toSentenceComma(
				A2(
					_elm_lang$core$List$map,
					function (x) {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Util$show(
								_user$project$Util$fst(x)),
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								_user$project$Util$toSentenceComma(
									A2(
										_elm_lang$core$List$map,
										_user$project$Common_sequent$action2string,
										_user$project$Util$snd(x)))));
					},
					_p49)));
		var addhistory1 = function (x) {
			return _elm_lang$core$Native_Utils.eq(x, '') ? x : A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(_elm_lang$core$Basics_ops['++'], x, ')'));
		}(
			_user$project$Util$toSentenceComma(
				A2(
					_elm_lang$core$List$map,
					function (x) {
						return _user$project$Util$show(
							_user$project$Util$fst(x));
					},
					_p49)));
		var ff = function (_p40) {
			return _user$project$Util$concatComma(
				A2(
					_elm_lang$core$List$map,
					function (y) {
						var _p41 = y;
						if (_p41.ctor === 'PointAModel') {
							return _user$project$Common_syntax$outputAction(
								A2(_user$project$Common_syntax$PointAModel, _p41._0, _p41._1));
						} else {
							return _elm_lang$core$Native_Utils.crashCase(
								'Common_sequent',
								{
									start: {line: 904, column: 48},
									end: {line: 906, column: 97}
								},
								_p41)('error in error in outputLabelExp (1)');
						}
					},
					_p40));
		};
		var gg = function (_p43) {
			return _user$project$Util$concatComma(
				A2(
					_elm_lang$core$List$map,
					_user$project$Common_syntax$outputForm(n),
					_p43));
		};
		var _p44 = _p48;
		if (_p44.ctor === '[]') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'<b>',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p51),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'</b>:',
						A2(
							_elm_lang$core$Basics_ops['++'],
							addhistory1,
							A2(
								_elm_lang$core$Basics_ops['++'],
								'<code>',
								A2(
									_elm_lang$core$Basics_ops['++'],
									A2(_user$project$Common_syntax$outputForm, n, _p50),
									'</code>'))))));
		} else {
			var _p45 = _p44._0;
			if (_p45.ctor === 'Left') {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'<b>',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p51),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								gg(
									_toastal$either$Either$lefts(_p48)),
								A2(
									_elm_lang$core$Basics_ops['++'],
									')</b>:',
									A2(
										_elm_lang$core$Basics_ops['++'],
										addhistory1,
										A2(
											_elm_lang$core$Basics_ops['++'],
											'<code>',
											A2(
												_elm_lang$core$Basics_ops['++'],
												A2(_user$project$Common_syntax$outputForm, n, _p50),
												'</code>'))))))));
			} else {
				var _p46 = _p45._0;
				if (_p46.ctor === 'PointAModel') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'<b>',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p51),
								A2(
									_elm_lang$core$Basics_ops['++'],
									',',
									A2(
										_elm_lang$core$Basics_ops['++'],
										ff(
											_toastal$either$Either$rights(_p48)),
										A2(
											_elm_lang$core$Basics_ops['++'],
											')</b>:',
											A2(
												_elm_lang$core$Basics_ops['++'],
												addhistory2,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'<code>',
													A2(
														_elm_lang$core$Basics_ops['++'],
														A2(_user$project$Common_syntax$outputForm, n, _p50),
														'</code>')))))))));
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Common_sequent',
						{
							start: {line: 921, column: 20},
							end: {line: 923, column: 59}
						},
						_p46)('error in outputLabelExp (2)');
				}
			}
		}
	});
var _user$project$Common_sequent$outputSequent = function (seq) {
	var ff = F2(
		function (x, y) {
			return (_elm_lang$core$List$isEmpty(x) || _elm_lang$core$List$isEmpty(y)) ? '' : ',';
		});
	var r2 = _user$project$Util$concatComma(
		A2(
			_elm_lang$core$List$map,
			_user$project$Common_sequent$outputLabelExp(1),
			seq.rightForm));
	var r1 = _user$project$Util$concatComma(
		A2(
			_elm_lang$core$List$map,
			_user$project$Common_sequent$outputLabelExp2(1),
			seq.rightRel));
	var l2 = _user$project$Util$concatComma(
		A2(
			_elm_lang$core$List$map,
			_user$project$Common_sequent$outputLabelExp(1),
			seq.leftForm));
	var l1 = _user$project$Util$concatComma(
		A2(
			_elm_lang$core$List$map,
			_user$project$Common_sequent$outputLabelExp2(1),
			seq.leftRel));
	var _p52 = _elm_lang$core$List$isEmpty(seq.forDEL);
	if (_p52 === true) {
		return _elm_community$string_extra$String_Extra$clean(
			A2(
				_user$project$Common_syntax_ops['++++'],
				l1,
				A2(
					_user$project$Common_syntax_ops['++++'],
					A2(ff, seq.leftRel, seq.leftForm),
					A2(
						_user$project$Common_syntax_ops['++++'],
						l2,
						A2(
							_user$project$Common_syntax_ops['++++'],
							'<i><b>==></b></i>',
							A2(
								_user$project$Common_syntax_ops['++++'],
								r1,
								A2(
									_user$project$Common_syntax_ops['++++'],
									A2(ff, seq.rightRel, seq.rightForm),
									r2)))))));
	} else {
		return _elm_community$string_extra$String_Extra$clean(
			A2(
				_user$project$Common_syntax_ops['++++'],
				l1,
				A2(
					_user$project$Common_syntax_ops['++++'],
					A2(ff, seq.leftRel, seq.leftForm),
					A2(
						_user$project$Common_syntax_ops['++++'],
						l2,
						A2(
							_user$project$Common_syntax_ops['++++'],
							'<i><b>==></b></i>',
							A2(
								_user$project$Common_syntax_ops['++++'],
								r1,
								A2(
									_user$project$Common_syntax_ops['++++'],
									A2(ff, seq.rightRel, seq.rightForm),
									A2(
										_user$project$Common_syntax_ops['++++'],
										r2,
										A2(
											_user$project$Common_syntax_ops['++++'],
											'||',
											_user$project$Common_sequent$outputLabelExp3(seq.forDEL))))))))));
	}
};
var _user$project$Common_sequent$divideRules = F2(
	function (listrule, _p53) {
		divideRules:
		while (true) {
			var _p54 = _p53;
			var _p64 = _p54._2;
			var _p63 = _p54._3;
			var _p62 = _p54._4;
			var _p61 = _p54._5;
			var _p60 = _p54._0;
			var _p59 = _p54._1;
			var _p55 = listrule;
			if (_p55.ctor === '::') {
				var _p58 = _p55._1;
				var _p57 = _p55._0;
				var _p56 = _p57.category;
				switch (_p56.ctor) {
					case 'Rule4LeftFormula':
						var _v35 = _p58,
							_v36 = {
							ctor: '_Tuple6',
							_0: _p60,
							_1: {ctor: '::', _0: _p57, _1: _p59},
							_2: _p64,
							_3: _p63,
							_4: _p62,
							_5: _p61
						};
						listrule = _v35;
						_p53 = _v36;
						continue divideRules;
					case 'Rule4LeftRel':
						var _v37 = _p58,
							_v38 = {
							ctor: '_Tuple6',
							_0: {ctor: '::', _0: _p57, _1: _p60},
							_1: _p59,
							_2: _p64,
							_3: _p63,
							_4: _p62,
							_5: _p61
						};
						listrule = _v37;
						_p53 = _v38;
						continue divideRules;
					case 'Rule4RightFormula':
						var _v39 = _p58,
							_v40 = {
							ctor: '_Tuple6',
							_0: _p60,
							_1: _p59,
							_2: _p64,
							_3: {ctor: '::', _0: _p57, _1: _p63},
							_4: _p62,
							_5: _p61
						};
						listrule = _v39;
						_p53 = _v40;
						continue divideRules;
					case 'Rule4RightRel':
						var _v41 = _p58,
							_v42 = {
							ctor: '_Tuple6',
							_0: _p60,
							_1: _p59,
							_2: {ctor: '::', _0: _p57, _1: _p64},
							_3: _p63,
							_4: _p62,
							_5: _p61
						};
						listrule = _v41;
						_p53 = _v42;
						continue divideRules;
					case 'Rule4DEL':
						var _v43 = _p58,
							_v44 = {
							ctor: '_Tuple6',
							_0: _p60,
							_1: _p59,
							_2: _p64,
							_3: _p63,
							_4: {ctor: '::', _0: _p57, _1: _p62},
							_5: _p61
						};
						listrule = _v43;
						_p53 = _v44;
						continue divideRules;
					default:
						var _v45 = _p58,
							_v46 = {
							ctor: '_Tuple6',
							_0: _p60,
							_1: _p59,
							_2: _p64,
							_3: _p63,
							_4: _p62,
							_5: {ctor: '::', _0: _p57, _1: _p61}
						};
						listrule = _v45;
						_p53 = _v46;
						continue divideRules;
				}
			} else {
				return {ctor: '_Tuple6', _0: _p60, _1: _p59, _2: _p64, _3: _p63, _4: _p62, _5: _p61};
			}
		}
	});
var _user$project$Common_sequent$seq2branch = F2(
	function (seq, rule) {
		return A2(
			_user$project$Applicative_ops['?>'],
			rule.rule(seq),
			function (x) {
				return {causeSequent: seq, appliedRule: rule, resultSequents: x};
			});
	});
var _user$project$Common_sequent$anyFormulaCheck = function (seq) {
	var gg = function (f) {
		var _p65 = f;
		if (_p65.ctor === 'AnyFormula') {
			return true;
		} else {
			return false;
		}
	};
	var ff = function (_p66) {
		var _p67 = _p66;
		return _p67._0._3;
	};
	return _user$project$Util$or(
		A2(
			_elm_lang$core$List$map,
			function (_p68) {
				return gg(
					ff(_p68));
			},
			A2(_elm_lang$core$Basics_ops['++'], seq.leftForm, seq.rightForm)));
};
var _user$project$Common_sequent$isProvable = function (pr) {
	var gg = function (_p69) {
		var _p70 = _p69;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _p70._1,
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$concatMap, gg, _p70._2));
	};
	var ruleList = gg(pr);
	return A2(_elm_lang$core$List$member, 'end', ruleList) ? 0 : (A2(_elm_lang$core$List$member, 'stop', ruleList) ? 9 : (A2(_elm_lang$core$List$member, 'limit', ruleList) ? 2 : 1));
};
var _user$project$Common_sequent$sortRelAtom = function (li) {
	var gg3 = function (x) {
		var _p71 = x;
		if (_p71.ctor === 'RelAtom') {
			return _p71._0._3._0;
		} else {
			return _p71._0._0;
		}
	};
	var gg2 = function (x) {
		var _p72 = x;
		if (_p72.ctor === 'RelAtom') {
			return _p72._0._2._0;
		} else {
			return _p72._0._0;
		}
	};
	var gg1 = function (x) {
		var _p73 = x;
		if (_p73.ctor === 'RelAtom') {
			return _p73._0._0;
		} else {
			return _user$project$Util$show(_p73._0._0);
		}
	};
	return function (x) {
		return A2(_elm_lang$core$List$sortWith, x, li);
	}(
		A6(_TSFoster$elm_compare$Compare$by, gg1, _TSFoster$elm_compare$Compare$thenBy, gg2, _TSFoster$elm_compare$Compare$thenBy, gg3, _TSFoster$elm_compare$Compare$ascending));
};
var _user$project$Common_sequent$sortLabelForm = function (li) {
	var gg3 = function (_p74) {
		var _p75 = _p74;
		return _elm_lang$core$List$length(_p75._0._2);
	};
	var gg2 = function (_p76) {
		var _p77 = _p76;
		return _user$project$Common_syntax$formula2Int(_p77._0._3);
	};
	var gg1 = function (_p78) {
		var _p79 = _p78;
		return _p79._0._1;
	};
	return A2(
		_elm_lang$core$List$sortWith,
		A6(_TSFoster$elm_compare$Compare$by, gg1, _TSFoster$elm_compare$Compare$thenBy, gg2, _TSFoster$elm_compare$Compare$thenBy, gg3, _TSFoster$elm_compare$Compare$ascending),
		li);
};
var _user$project$Common_sequent$sortLeftRightOfSeq = function (seq) {
	var ff = function (_p80) {
		return _user$project$Util$nub(
			_user$project$Common_sequent$sortLabelForm(_p80));
	};
	var gg = function (_p81) {
		return _user$project$Util$nub(
			_user$project$Common_sequent$sortRelAtom(_p81));
	};
	return _elm_lang$core$Native_Utils.update(
		seq,
		{
			leftRel: gg(seq.leftRel),
			leftForm: ff(seq.leftForm),
			rightRel: gg(seq.rightRel),
			rightForm: ff(seq.rightForm)
		});
};
var _user$project$Common_sequent$sortSeqOfBranch = function (bra) {
	return {
		causeSequent: bra.causeSequent,
		appliedRule: bra.appliedRule,
		resultSequents: A2(_elm_lang$core$List$map, _user$project$Common_sequent$sortLeftRightOfSeq, bra.resultSequents)
	};
};
var _user$project$Common_sequent$sameSeq = F2(
	function (seq1, seq2) {
		var d = A2(
			_elm_community$list_extra$List_Extra$isPermutationOf,
			_user$project$Util$nub(seq1.rightForm),
			_user$project$Util$nub(seq2.rightForm));
		var c = A2(
			_elm_community$list_extra$List_Extra$isPermutationOf,
			_user$project$Util$nub(seq1.leftForm),
			_user$project$Util$nub(seq2.leftForm));
		var b = _elm_lang$core$Native_Utils.eq(
			_user$project$Common_sequent$sortRelAtom(
				_user$project$Util$nub(seq1.rightRel)),
			_user$project$Common_sequent$sortRelAtom(
				_user$project$Util$nub(seq2.rightRel)));
		var a = _elm_lang$core$Native_Utils.eq(
			_user$project$Common_sequent$sortRelAtom(
				_user$project$Util$nub(seq1.leftRel)),
			_user$project$Common_sequent$sortRelAtom(
				_user$project$Util$nub(seq2.leftRel)));
		return A2(
			_user$project$Util$forall,
			{
				ctor: '::',
				_0: a,
				_1: {
					ctor: '::',
					_0: b,
					_1: {
						ctor: '::',
						_0: c,
						_1: {
							ctor: '::',
							_0: d,
							_1: {ctor: '[]'}
						}
					}
				}
			},
			function (x) {
				return _elm_lang$core$Native_Utils.eq(x, true);
			});
	});
var _user$project$Common_sequent$agentInLabelExpression2 = F2(
	function (x, li) {
		var _p82 = x;
		if (_p82.ctor === 'RelAtom') {
			return {ctor: '::', _0: _p82._0._0, _1: li};
		} else {
			return li;
		}
	});
var _user$project$Common_sequent$agentInLabelExpression = F2(
	function (x, ags) {
		var gg = F2(
			function (y, zs) {
				gg:
				while (true) {
					var _p83 = y;
					switch (_p83.ctor) {
						case 'Box':
							var _v58 = _p83._1,
								_v59 = {ctor: '::', _0: _p83._0, _1: zs};
							y = _v58;
							zs = _v59;
							continue gg;
						case 'Dia':
							var _v60 = _p83._1,
								_v61 = {ctor: '::', _0: _p83._0, _1: zs};
							y = _v60;
							zs = _v61;
							continue gg;
						case 'Not':
							var _v62 = _p83._0,
								_v63 = zs;
							y = _v62;
							zs = _v63;
							continue gg;
						case 'And':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p83._0, zs),
								A2(gg, _p83._1, zs));
						case 'Or':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p83._0, zs),
								A2(gg, _p83._1, zs));
						case 'Imply':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p83._0, zs),
								A2(gg, _p83._1, zs));
						case 'Iff':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p83._0, zs),
								A2(gg, _p83._1, zs));
						case 'Announce':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p83._0, zs),
								A2(gg, _p83._1, zs));
						case 'Announce2':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p83._0, zs),
								A2(gg, _p83._1, zs));
						default:
							return zs;
					}
				}
			});
		var _p84 = x;
		if (_p84.ctor === 'Left') {
			return A2(gg, _p84._0._0._3, ags);
		} else {
			if (_p84._0.ctor === 'RelAtom') {
				return {ctor: '::', _0: _p84._0._0._0, _1: ags};
			} else {
				return ags;
			}
		}
	});
var _user$project$Common_sequent$wholeAgent = function (seq) {
	var rels = A2(
		_elm_lang$core$List$map,
		function (x) {
			return _toastal$either$Either$Right(x);
		},
		A2(_elm_lang$core$Basics_ops['++'], seq.leftRel, seq.rightRel));
	var forms = A2(
		_elm_lang$core$List$map,
		function (x) {
			return _toastal$either$Either$Left(x);
		},
		A2(_elm_lang$core$Basics_ops['++'], seq.leftForm, seq.rightForm));
	return _user$project$Util$nsort(
		A2(
			_elm_lang$core$List$concatMap,
			function (x) {
				return A2(
					_user$project$Common_sequent$agentInLabelExpression,
					x,
					{ctor: '[]'});
			},
			A2(_elm_lang$core$Basics_ops['++'], forms, rels)));
};
var _user$project$Common_sequent$wholeLabel = function (seq) {
	var gg_ = function (s) {
		return function (x) {
			return {
				ctor: '::',
				_0: x,
				_1: {ctor: '[]'}
			};
		}(
			A2(
				_elm_lang$core$Result$withDefault,
				0,
				_elm_lang$core$String$toInt(
					A2(_elm_lang$core$String$filter, _elm_lang$core$Char$isDigit, s))));
	};
	var gg3 = function (_p85) {
		var _p86 = _p85;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			gg_(_p86._2),
			gg_(_p86._3));
	};
	var gg2 = function (x) {
		var _p87 = x;
		if (_p87.ctor === 'RelAtom') {
			return {
				ctor: '::',
				_0: _p87._0._2._0,
				_1: {
					ctor: '::',
					_0: _p87._0._3._0,
					_1: {ctor: '[]'}
				}
			};
		} else {
			return {
				ctor: '::',
				_0: _p87._0._0,
				_1: {
					ctor: '::',
					_0: _p87._0._1,
					_1: {ctor: '[]'}
				}
			};
		}
	};
	var gg1 = function (_p88) {
		var _p89 = _p88;
		return {
			ctor: '::',
			_0: _p89._0._1,
			_1: {ctor: '[]'}
		};
	};
	return _user$project$Util$nsort(
		A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$List$concatMap,
				gg1,
				A2(_elm_lang$core$Basics_ops['++'], seq.leftForm, seq.rightForm)),
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(
					_elm_lang$core$List$concatMap,
					gg2,
					A2(_elm_lang$core$Basics_ops['++'], seq.leftRel, seq.rightRel)),
				A2(_elm_lang$core$List$concatMap, gg3, seq.forDEL))));
};
var _user$project$Common_sequent$freshLabel = function (sq) {
	var n = function (_p90) {
		return _elm_lang$core$List$maximum(
			_user$project$Common_sequent$wholeLabel(_p90));
	}(sq);
	var _p91 = n;
	if (_p91.ctor === 'Nothing') {
		return 0;
	} else {
		return _p91._0 + 1;
	}
};
var _user$project$Common_sequent$deadEnd = function (seq) {
	var ff = function (n) {
		return A2(
			_elm_lang$core$List$map,
			function (z) {
				var _p92 = z;
				if ((((_p92.ctor === 'RelAtom') && (_p92._0.ctor === '_Tuple4')) && (_p92._0._3.ctor === '_Tuple2')) && (_p92._0._3._1.ctor === '[]')) {
					var _p95 = _p92._0._3._0;
					return ((!_elm_lang$core$Native_Utils.eq(
						_p92._0._2,
						{
							ctor: '_Tuple2',
							_0: _p95,
							_1: {ctor: '[]'}
						})) && (!A2(
						_user$project$Util$exists,
						seq.leftRel,
						function (w) {
							var _p93 = w;
							if ((((((_p93.ctor === 'RelAtom') && (_p93._0.ctor === '_Tuple4')) && (_p93._0._2.ctor === '_Tuple2')) && (_p93._0._2._1.ctor === '[]')) && (_p93._0._3.ctor === '_Tuple2')) && (_p93._0._3._1.ctor === '[]')) {
								return _elm_lang$core$Native_Utils.eq(
									_toastal$either$Either$Left(_p95),
									_toastal$either$Either$Left(_p93._0._2._0));
							} else {
								return _elm_lang$core$Native_Utils.crashCase(
									'Common_sequent',
									{
										start: {line: 619, column: 68},
										end: {line: 621, column: 63}
									},
									_p93)('error in deadEnd (1)');
							}
						}))) ? _elm_lang$core$Maybe$Just(_p95) : _elm_lang$core$Maybe$Nothing;
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Common_sequent',
						{
							start: {line: 617, column: 18},
							end: {line: 624, column: 52}
						},
						_p92)('error in deadEnd (2)');
				}
			},
			seq.leftRel);
	};
	var wl = _user$project$Common_sequent$wholeLabel(seq);
	return _elm_lang$core$List$isEmpty(seq.leftRel) ? _elm_lang$core$List$head(wl) : _user$project$Util$maybeBigOr(
		_user$project$Util$nub(
			A2(_elm_lang$core$List$concatMap, ff, wl)));
};
var _user$project$Common_sequent$serR = 20;
var _user$project$Common_sequent$symR = 9;
var _user$project$Common_sequent$eucR = 9;
var _user$project$Common_sequent$traR = 9;
var _user$project$Common_sequent$refR = 9;
var _user$project$Common_sequent$boxLN = 16;
var _user$project$Common_sequent$boxRN = 15;
var _user$project$Common_sequent$diaLN = 6;
var _user$project$Common_sequent$diaRN = 6;
var _user$project$Common_sequent$amodelDefN_DEL = 30;
var _user$project$Common_sequent$boxLN2_DEL = 16;
var _user$project$Common_sequent$boxLN1_DEL = 16;
var _user$project$Common_sequent$boxRN2_DEL = 15;
var _user$project$Common_sequent$boxRN1_DEL = 15;
var _user$project$Common_sequent$bigAndLN_DEL = 20;
var _user$project$Common_sequent$bigAndRN_DEL = 5;
var _user$project$Common_sequent$cupLN_DEL = 2;
var _user$project$Common_sequent$cupRN_DEL = 5;
var _user$project$Common_sequent$action2RN_DEL = 9;
var _user$project$Common_sequent$action2LN_DEL = 3;
var _user$project$Common_sequent$actionLN_DEL = 9;
var _user$project$Common_sequent$actionRN_DEL = 3;
var _user$project$Common_sequent$atRN_DEL = 1;
var _user$project$Common_sequent$atLN_DEL = 1;
var _user$project$Common_sequent$cmpRN = 4;
var _user$project$Common_sequent$cmpLN = 4;
var _user$project$Common_sequent$ann2RN = 2;
var _user$project$Common_sequent$ann2LN = 2;
var _user$project$Common_sequent$annLN = 9;
var _user$project$Common_sequent$relLN = 4;
var _user$project$Common_sequent$relLN_DEL = _user$project$Common_sequent$relLN;
var _user$project$Common_sequent$annRN = 3;
var _user$project$Common_sequent$atRN = 1;
var _user$project$Common_sequent$atLN = 1;
var _user$project$Common_sequent$classicalTwo = 5;
var _user$project$Common_sequent$relRN = _user$project$Common_sequent$classicalTwo;
var _user$project$Common_sequent$relRN_DEL = _user$project$Common_sequent$relRN;
var _user$project$Common_sequent$disjLN = _user$project$Common_sequent$classicalTwo;
var _user$project$Common_sequent$conjRN = _user$project$Common_sequent$classicalTwo;
var _user$project$Common_sequent$implLN = _user$project$Common_sequent$classicalTwo;
var _user$project$Common_sequent$impl2LN = _user$project$Common_sequent$classicalTwo;
var _user$project$Common_sequent$classicalOne = 2;
var _user$project$Common_sequent$conjLN = _user$project$Common_sequent$classicalOne;
var _user$project$Common_sequent$disjRN = _user$project$Common_sequent$classicalOne;
var _user$project$Common_sequent$implRN = _user$project$Common_sequent$classicalOne;
var _user$project$Common_sequent$impl2RN = _user$project$Common_sequent$classicalOne;
var _user$project$Common_sequent$equiRN = _user$project$Common_sequent$classicalOne;
var _user$project$Common_sequent$equiLN = _user$project$Common_sequent$classicalOne;
var _user$project$Common_sequent$negLN = 1;
var _user$project$Common_sequent$negRN = 1;
var _user$project$Common_sequent$initN = 0;
var _user$project$Common_sequent$limitOfSearching = 15;
var _user$project$Common_sequent$dd = _user$project$Common_syntax$AnyFormula('D');
var _user$project$Common_sequent$cc = _user$project$Common_syntax$AnyFormula('C');
var _user$project$Common_sequent$bb = _user$project$Common_syntax$AnyFormula('B');
var _user$project$Common_sequent$aa = _user$project$Common_syntax$AnyFormula('A');
var _user$project$Common_sequent$p3 = _user$project$Common_syntax$Atom('p3');
var _user$project$Common_sequent$p2 = _user$project$Common_syntax$Atom('p2');
var _user$project$Common_sequent$p1 = _user$project$Common_syntax$Atom('p1');
var _user$project$Common_sequent$ca123 = A2(
	_user$project$Common_syntax$And,
	A2(
		_user$project$Common_syntax$Imply,
		_user$project$Common_sequent$p1,
		A2(_user$project$Common_syntax$Imply, _user$project$Common_sequent$p2, _user$project$Common_sequent$p1)),
	A2(
		_user$project$Common_syntax$And,
		A2(
			_user$project$Common_syntax$Imply,
			A2(
				_user$project$Common_syntax$Imply,
				_user$project$Common_sequent$p1,
				A2(_user$project$Common_syntax$Imply, _user$project$Common_sequent$p2, _user$project$Common_sequent$p3)),
			A2(
				_user$project$Common_syntax$Imply,
				A2(_user$project$Common_syntax$Imply, _user$project$Common_sequent$p1, _user$project$Common_sequent$p2),
				A2(_user$project$Common_syntax$Imply, _user$project$Common_sequent$p1, _user$project$Common_sequent$p3))),
		A2(
			_user$project$Common_syntax$Imply,
			A2(
				_user$project$Common_syntax$Imply,
				_user$project$Common_syntax$Not(_user$project$Common_sequent$p2),
				_user$project$Common_syntax$Not(_user$project$Common_sequent$p1)),
			A2(_user$project$Common_syntax$Imply, _user$project$Common_sequent$p1, _user$project$Common_sequent$p2))));
var _user$project$Common_sequent$Sequent = F5(
	function (a, b, c, d, e) {
		return {leftRel: a, leftForm: b, rightRel: c, rightForm: d, forDEL: e};
	});
var _user$project$Common_sequent$Rule = F4(
	function (a, b, c, d) {
		return {priority: a, category: b, rulename: c, rule: d};
	});
var _user$project$Common_sequent$Branch = F3(
	function (a, b, c) {
		return {causeSequent: a, appliedRule: b, resultSequents: c};
	});
var _user$project$Common_sequent$RandomSeed = F2(
	function (a, b) {
		return {randomNumber: a, maxLengthOfRandomFormula: b};
	});
var _user$project$Common_sequent$Node = F3(
	function (a, b, c) {
		return {id: a, label: b, color: c};
	});
var _user$project$Common_sequent$Edge = F4(
	function (a, b, c, d) {
		return {id: a, from: b, to: c, label: d};
	});
var _user$project$Common_sequent$Graph = F3(
	function (a, b, c) {
		return {nodes: a, edges: b, provable: c};
	});
var _user$project$Common_sequent$LabelForm = function (a) {
	return {ctor: 'LabelForm', _0: a};
};
var _user$project$Common_sequent$formula2seq = function (f) {
	return {
		leftRel: {ctor: '[]'},
		leftForm: {ctor: '[]'},
		rightRel: {ctor: '[]'},
		rightForm: {
			ctor: '::',
			_0: _user$project$Common_sequent$LabelForm(
				{
					ctor: '_Tuple4',
					_0: {ctor: '[]'},
					_1: 0,
					_2: {ctor: '[]'},
					_3: f
				}),
			_1: {ctor: '[]'}
		},
		forDEL: {ctor: '[]'}
	};
};
var _user$project$Common_sequent$axK = _user$project$Common_sequent$formula2seq(
	A2(
		_user$project$Common_syntax$Imply,
		A2(
			_user$project$Common_syntax$Box,
			'a',
			A2(_user$project$Common_syntax$Imply, _user$project$Common_sequent$aa, _user$project$Common_sequent$bb)),
		A2(
			_user$project$Common_syntax$Imply,
			A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa),
			A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$bb))));
var _user$project$Common_sequent$axT = _user$project$Common_sequent$formula2seq(
	A2(
		_user$project$Common_syntax$Imply,
		A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa),
		_user$project$Common_sequent$aa));
var _user$project$Common_sequent$ax4 = _user$project$Common_sequent$formula2seq(
	A2(
		_user$project$Common_syntax$Imply,
		A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa),
		A2(
			_user$project$Common_syntax$Box,
			'a',
			A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa))));
var _user$project$Common_sequent$ax5 = _user$project$Common_sequent$formula2seq(
	A2(
		_user$project$Common_syntax$Imply,
		_user$project$Common_syntax$Not(
			A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa)),
		A2(
			_user$project$Common_syntax$Box,
			'a',
			_user$project$Common_syntax$Not(
				A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa)))));
var _user$project$Common_sequent$ax5p = _user$project$Common_sequent$formula2seq(
	_user$project$Common_syntax$Not(
		A2(
			_user$project$Common_syntax$Imply,
			A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa),
			A2(
				_user$project$Common_syntax$Box,
				'a',
				_user$project$Common_syntax$Not(
					A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_sequent$aa))))));
var _user$project$Common_sequent$axB = _user$project$Common_sequent$formula2seq(
	A2(
		_user$project$Common_syntax$Imply,
		_user$project$Common_sequent$aa,
		A2(
			_user$project$Common_syntax$Box,
			'a',
			A2(_user$project$Common_syntax$Dia, 'a', _user$project$Common_sequent$aa))));
var _user$project$Common_sequent$axD = _user$project$Common_sequent$formula2seq(
	_user$project$Common_syntax$Not(
		A2(_user$project$Common_syntax$Box, 'a', _user$project$Common_syntax$Bot)));
var _user$project$Common_sequent$RelAtom_int = function (a) {
	return {ctor: 'RelAtom_int', _0: a};
};
var _user$project$Common_sequent$RelAtom = function (a) {
	return {ctor: 'RelAtom', _0: a};
};
var _user$project$Common_sequent$tran = F2(
	function (exp1, exp2) {
		var _p97 = {ctor: '_Tuple2', _0: exp1, _1: exp2};
		if (((((((_p97.ctor === '_Tuple2') && (_p97._0.ctor === 'RelAtom')) && (_p97._0._0.ctor === '_Tuple4')) && (_p97._0._0._1.ctor === '[]')) && (_p97._1.ctor === 'RelAtom')) && (_p97._1._0.ctor === '_Tuple4')) && (_p97._1._0._1.ctor === '[]')) {
			var _p98 = _p97._0._0._0;
			return (_elm_lang$core$Native_Utils.eq(_p98, _p97._1._0._0) && _elm_lang$core$Native_Utils.eq(_p97._0._0._3, _p97._1._0._2)) ? {
				ctor: '::',
				_0: exp1,
				_1: {
					ctor: '::',
					_0: exp2,
					_1: {
						ctor: '::',
						_0: _user$project$Common_sequent$RelAtom(
							{
								ctor: '_Tuple4',
								_0: _p98,
								_1: {ctor: '[]'},
								_2: _p97._0._0._2,
								_3: _p97._1._0._3
							}),
						_1: {ctor: '[]'}
					}
				}
			} : {
				ctor: '::',
				_0: exp1,
				_1: {
					ctor: '::',
					_0: exp2,
					_1: {ctor: '[]'}
				}
			};
		} else {
			return {
				ctor: '::',
				_0: exp1,
				_1: {
					ctor: '::',
					_0: exp2,
					_1: {ctor: '[]'}
				}
			};
		}
	});
var _user$project$Common_sequent$eucl = F2(
	function (exp1, exp2) {
		var _p99 = {ctor: '_Tuple2', _0: exp1, _1: exp2};
		if (((((((_p99.ctor === '_Tuple2') && (_p99._0.ctor === 'RelAtom')) && (_p99._0._0.ctor === '_Tuple4')) && (_p99._0._0._1.ctor === '[]')) && (_p99._1.ctor === 'RelAtom')) && (_p99._1._0.ctor === '_Tuple4')) && (_p99._1._0._1.ctor === '[]')) {
			var _p102 = _p99._1._0._3;
			var _p101 = _p99._0._0._3;
			var _p100 = _p99._0._0._0;
			return (_elm_lang$core$Native_Utils.eq(_p99._0._0._2, _p99._1._0._2) && _elm_lang$core$Native_Utils.eq(_p100, _p99._1._0._0)) ? {
				ctor: '::',
				_0: exp1,
				_1: {
					ctor: '::',
					_0: exp2,
					_1: {
						ctor: '::',
						_0: _user$project$Common_sequent$RelAtom(
							{
								ctor: '_Tuple4',
								_0: _p100,
								_1: {ctor: '[]'},
								_2: _p101,
								_3: _p102
							}),
						_1: {
							ctor: '::',
							_0: _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p100,
									_1: {ctor: '[]'},
									_2: _p102,
									_3: _p101
								}),
							_1: {ctor: '[]'}
						}
					}
				}
			} : {
				ctor: '::',
				_0: exp1,
				_1: {
					ctor: '::',
					_0: exp2,
					_1: {ctor: '[]'}
				}
			};
		} else {
			return _user$project$Util$nub(
				{
					ctor: '::',
					_0: exp1,
					_1: {
						ctor: '::',
						_0: exp2,
						_1: {ctor: '[]'}
					}
				});
		}
	});
var _user$project$Common_sequent$Proof = F3(
	function (a, b, c) {
		return {ctor: 'Proof', _0: a, _1: b, _2: c};
	});
var _user$project$Common_sequent$Rule4Other = {ctor: 'Rule4Other'};
var _user$project$Common_sequent$axiomRule = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$initN,
		category: _user$project$Common_sequent$Rule4Other,
		rulename: 'init',
		rule: function (seq) {
			var deleteBoxHistoty = function (_p103) {
				var _p104 = _p103;
				return _user$project$Common_sequent$LabelForm(
					{
						ctor: '_Tuple4',
						_0: {ctor: '[]'},
						_1: _p104._0._1,
						_2: _p104._0._2,
						_3: _p104._0._3
					});
			};
			return (A2(
				_user$project$Util$exists,
				seq.leftForm,
				function (x) {
					return A2(
						_user$project$Util$exists,
						seq.rightForm,
						function (y) {
							return _elm_lang$core$Native_Utils.eq(
								deleteBoxHistoty(x),
								deleteBoxHistoty(y));
						});
				}) || A2(
				_user$project$Util$exists,
				seq.leftRel,
				function (x) {
					return A2(
						_user$project$Util$exists,
						seq.rightRel,
						function (y) {
							return _elm_lang$core$Native_Utils.eq(x, y);
						});
				})) ? _elm_lang$core$Maybe$Just(
				{ctor: '[]'}) : _elm_lang$core$Maybe$Nothing;
		}
	},
	_1: {
		ctor: '::',
		_0: {
			priority: _user$project$Common_sequent$initN,
			category: _user$project$Common_sequent$Rule4Other,
			rulename: 'Top',
			rule: function (seq) {
				return A2(
					_user$project$Util$exists,
					seq.rightForm,
					function (a) {
						var _p105 = a;
						if ((_p105._0.ctor === '_Tuple4') && (_p105._0._3.ctor === 'Top')) {
							return true;
						} else {
							return false;
						}
					}) ? _elm_lang$core$Maybe$Just(
					{ctor: '[]'}) : _elm_lang$core$Maybe$Nothing;
			}
		},
		_1: {
			ctor: '::',
			_0: {
				priority: _user$project$Common_sequent$initN,
				category: _user$project$Common_sequent$Rule4Other,
				rulename: 'Bot',
				rule: function (seq) {
					return A2(
						_user$project$Util$exists,
						seq.leftForm,
						function (a) {
							var _p106 = a;
							if ((_p106._0.ctor === '_Tuple4') && (_p106._0._3.ctor === 'Bot')) {
								return true;
							} else {
								return false;
							}
						}) ? _elm_lang$core$Maybe$Just(
						{ctor: '[]'}) : _elm_lang$core$Maybe$Nothing;
				}
			},
			_1: {ctor: '[]'}
		}
	}
};
var _user$project$Common_sequent$initCheck = function (li) {
	initCheck:
	while (true) {
		var _p107 = li;
		if (_p107.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p108 = _p107._0;
			if (A2(
				_user$project$Util$forall,
				_user$project$Common_sequent$axiomRule,
				function (x) {
					return function (y) {
						return _elm_lang$core$Native_Utils.eq(_elm_lang$core$Maybe$Nothing, y);
					}(
						_elm_community$maybe_extra$Maybe_Extra$combine(
							A2(_elm_lang$core$List$map, x.rule, _p108.resultSequents)));
				})) {
				var _v77 = _p107._1;
				li = _v77;
				continue initCheck;
			} else {
				return _elm_lang$core$Maybe$Just(_p108);
			}
		}
	}
};
var _user$project$Common_sequent$ruleEnd = {
	priority: _user$project$Common_sequent$initN,
	category: _user$project$Common_sequent$Rule4Other,
	rulename: 'end',
	rule: function (x) {
		return _elm_lang$core$Maybe$Just(
			{ctor: '[]'});
	}
};
var _user$project$Common_sequent$ruleLimit = {
	priority: _user$project$Common_sequent$initN,
	category: _user$project$Common_sequent$Rule4Other,
	rulename: 'limit',
	rule: function (x) {
		return _elm_lang$core$Maybe$Just(
			{ctor: '[]'});
	}
};
var _user$project$Common_sequent$ruleStop = {
	priority: _user$project$Common_sequent$initN,
	category: _user$project$Common_sequent$Rule4Other,
	rulename: 'stop',
	rule: function (x) {
		return _elm_lang$core$Maybe$Just(
			{ctor: '[]'});
	}
};
var _user$project$Common_sequent$makeProofBranch = F3(
	function (maxNum, ruleSet, seq) {
		var stopBranch = {
			causeSequent: seq,
			appliedRule: _user$project$Common_sequent$ruleStop,
			resultSequents: {ctor: '[]'}
		};
		var endBranch = {
			causeSequent: seq,
			appliedRule: _user$project$Common_sequent$ruleEnd,
			resultSequents: {ctor: '[]'}
		};
		var limitBranch = {
			causeSequent: seq,
			appliedRule: _user$project$Common_sequent$ruleLimit,
			resultSequents: {ctor: '[]'}
		};
		var forDEL1 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _elm_lang$core$Native_Utils.update(
					seq,
					{forDEL: x});
			},
			_user$project$Util$rotate(seq.forDEL));
		var rightSeqs2 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _elm_lang$core$Native_Utils.update(
					seq,
					{rightForm: x});
			},
			_user$project$Util$rotate(seq.rightForm));
		var rightSeqs1 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _elm_lang$core$Native_Utils.update(
					seq,
					{rightRel: x});
			},
			_user$project$Util$rotate(seq.rightRel));
		var leftSeqs2 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _elm_lang$core$Native_Utils.update(
					seq,
					{leftForm: x});
			},
			_user$project$Util$rotate(seq.leftForm));
		var leftSeqs1 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _elm_lang$core$Native_Utils.update(
					seq,
					{leftRel: x});
			},
			_user$project$Util$rotate(seq.leftRel));
		var applyrule = function (s) {
			return A2(
				_elm_lang$core$List$filterMap,
				function (r) {
					return A2(_user$project$Common_sequent$seq2branch, s, r);
				},
				ruleSet);
		};
		var branches = _user$project$Util$nub(
			A2(
				_elm_lang$core$List$concatMap,
				applyrule,
				_user$project$Util$nub(
					_elm_lang$core$List$concat(
						{
							ctor: '::',
							_0: leftSeqs1,
							_1: {
								ctor: '::',
								_0: leftSeqs2,
								_1: {
									ctor: '::',
									_0: rightSeqs1,
									_1: {
										ctor: '::',
										_0: rightSeqs2,
										_1: {
											ctor: '::',
											_0: forDEL1,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}))));
		var branchesSorted = A2(
			_elm_lang$core$List$sortBy,
			function (_p109) {
				return function (_) {
					return _.priority;
				}(
					function (_) {
						return _.appliedRule;
					}(_p109));
			},
			branches);
		if (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(
				A2(_elm_lang$core$Basics_ops['++'], seq.leftRel, seq.rightRel)) + _elm_lang$core$List$length(
				A2(_elm_lang$core$Basics_ops['++'], seq.leftForm, seq.rightForm)),
			maxNum) > 0) {
			return limitBranch;
		} else {
			var _p110 = branchesSorted;
			if (_p110.ctor === '[]') {
				return _user$project$Common_sequent$anyFormulaCheck(seq) ? stopBranch : endBranch;
			} else {
				var _p111 = _user$project$Common_sequent$initCheck(branchesSorted);
				if (_p111.ctor === 'Just') {
					return _user$project$Common_sequent$sortSeqOfBranch(_p111._0);
				} else {
					return _user$project$Common_sequent$sortSeqOfBranch(_p110._0);
				}
			}
		}
	});
var _user$project$Common_sequent$makeProofTree = F3(
	function (maxNum, ruleSet, seq) {
		var move = A3(_user$project$Common_sequent$makeProofBranch, maxNum, ruleSet, seq);
		return A3(
			_user$project$Common_sequent$Proof,
			seq,
			move.appliedRule.rulename,
			A2(
				_elm_lang$core$List$map,
				A2(_user$project$Common_sequent$makeProofTree, maxNum, ruleSet),
				move.resultSequents));
	});
var _user$project$Common_sequent$isProvableSeq = F3(
	function (maxNum, ruleSet, seq) {
		var _p112 = seq;
		if (_p112.ctor === 'Nothing') {
			return false;
		} else {
			var prf = A3(_user$project$Common_sequent$makeProofTree, maxNum, ruleSet, _p112._0);
			var _p113 = _user$project$Common_sequent$isProvable(prf);
			if (_p113 === 1) {
				return true;
			} else {
				return false;
			}
		}
	});
var _user$project$Common_sequent$ruleT = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$refR,
		category: _user$project$Common_sequent$Rule4Other,
		rulename: 'ref',
		rule: function (seq) {
			var ref = A2(
				_user$project$Util_ops['$>>='],
				_user$project$Common_sequent$wholeAgent(seq),
				function (ag) {
					return A2(
						_user$project$Util_ops['$>>='],
						_user$project$Common_sequent$wholeLabel(seq),
						function (w) {
							return {
								ctor: '::',
								_0: _user$project$Common_sequent$RelAtom(
									{
										ctor: '_Tuple4',
										_0: ag,
										_1: {ctor: '[]'},
										_2: {
											ctor: '_Tuple2',
											_0: w,
											_1: {ctor: '[]'}
										},
										_3: {
											ctor: '_Tuple2',
											_0: w,
											_1: {ctor: '[]'}
										}
									}),
								_1: {ctor: '[]'}
							};
						});
				});
			var seq2 = _elm_lang$core$Native_Utils.update(
				seq,
				{
					leftRel: _user$project$Util$nub(
						A2(_elm_lang$core$Basics_ops['++'], ref, seq.leftRel))
				});
			return A2(_user$project$Common_sequent$sameSeq, seq, seq2) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: seq2,
					_1: {ctor: '[]'}
				});
		}
	},
	_1: {ctor: '[]'}
};
var _user$project$Common_sequent$ruleD = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$serR,
		category: _user$project$Common_sequent$Rule4Other,
		rulename: 'ser',
		rule: function (seq) {
			var fresh = _user$project$Common_sequent$freshLabel(seq);
			var headLa = _user$project$Common_sequent$deadEnd(seq);
			var wholeAg = _user$project$Common_sequent$wholeAgent(seq);
			var _p114 = headLa;
			if (_p114.ctor === 'Nothing') {
				return _elm_lang$core$Maybe$Nothing;
			} else {
				var gg = A2(
					_elm_lang$core$List$concatMap,
					function (ag) {
						return {
							ctor: '::',
							_0: _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: ag,
									_1: {ctor: '[]'},
									_2: {
										ctor: '_Tuple2',
										_0: _p114._0,
										_1: {ctor: '[]'}
									},
									_3: {
										ctor: '_Tuple2',
										_0: fresh,
										_1: {ctor: '[]'}
									}
								}),
							_1: {ctor: '[]'}
						};
					},
					wholeAg);
				return A2(
					_user$project$Common_sequent$sameSeq,
					seq,
					_elm_lang$core$Native_Utils.update(
						seq,
						{
							leftRel: A2(_elm_lang$core$Basics_ops['++'], seq.leftRel, gg)
						})) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							seq,
							{
								leftRel: A2(_elm_lang$core$Basics_ops['++'], seq.leftRel, gg)
							}),
						_1: {ctor: '[]'}
					});
			}
		}
	},
	_1: {ctor: '[]'}
};
var _user$project$Common_sequent$Rule4DEL = {ctor: 'Rule4DEL'};
var _user$project$Common_sequent$Rule4RightFormula = {ctor: 'Rule4RightFormula'};
var _user$project$Common_sequent$Rule4RightRel = {ctor: 'Rule4RightRel'};
var _user$project$Common_sequent$Rule4LeftFormula = {ctor: 'Rule4LeftFormula'};
var _user$project$Common_sequent$ruleClassic = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$negLN,
		category: _user$project$Common_sequent$Rule4LeftFormula,
		rulename: 'L~',
		rule: function (seq) {
			var _p115 = seq.leftForm;
			if (((_p115.ctor === '::') && (_p115._0._0.ctor === '_Tuple4')) && (_p115._0._0._3.ctor === 'Not')) {
				var add1 = _user$project$Common_sequent$LabelForm(
					{ctor: '_Tuple4', _0: _p115._0._0._0, _1: _p115._0._0._1, _2: _p115._0._0._2, _3: _p115._0._0._3._0});
				return _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							seq,
							{
								leftForm: _p115._1,
								rightForm: A2(
									_elm_lang$core$Basics_ops['++'],
									{
										ctor: '::',
										_0: add1,
										_1: {ctor: '[]'}
									},
									seq.rightForm)
							}),
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			priority: _user$project$Common_sequent$negRN,
			category: _user$project$Common_sequent$Rule4RightFormula,
			rulename: 'R~',
			rule: function (seq) {
				var _p116 = seq.rightForm;
				if (((_p116.ctor === '::') && (_p116._0._0.ctor === '_Tuple4')) && (_p116._0._0._3.ctor === 'Not')) {
					var add1 = _user$project$Common_sequent$LabelForm(
						{ctor: '_Tuple4', _0: _p116._0._0._0, _1: _p116._0._0._1, _2: _p116._0._0._2, _3: _p116._0._0._3._0});
					return _elm_lang$core$Maybe$Just(
						{
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								seq,
								{
									leftForm: A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: add1,
											_1: {ctor: '[]'}
										},
										seq.leftForm),
									rightForm: _p116._1
								}),
							_1: {ctor: '[]'}
						});
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				priority: _user$project$Common_sequent$conjLN,
				category: _user$project$Common_sequent$Rule4LeftFormula,
				rulename: 'L&',
				rule: function (seq) {
					var _p117 = seq.leftForm;
					if (((_p117.ctor === '::') && (_p117._0._0.ctor === '_Tuple4')) && (_p117._0._0._3.ctor === 'And')) {
						var _p120 = _p117._0._0._1;
						var _p119 = _p117._0._0._0;
						var _p118 = _p117._0._0._2;
						var add2 = _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p119, _1: _p120, _2: _p118, _3: _p117._0._0._3._1});
						var add1 = _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p119, _1: _p120, _2: _p118, _3: _p117._0._0._3._0});
						return _elm_lang$core$Maybe$Just(
							{
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									seq,
									{
										leftForm: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: add1,
												_1: {
													ctor: '::',
													_0: add2,
													_1: {ctor: '[]'}
												}
											},
											_p117._1)
									}),
								_1: {ctor: '[]'}
							});
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					priority: _user$project$Common_sequent$conjRN,
					category: _user$project$Common_sequent$Rule4RightFormula,
					rulename: 'R&',
					rule: function (seq) {
						var _p121 = seq.rightForm;
						if (((_p121.ctor === '::') && (_p121._0._0.ctor === '_Tuple4')) && (_p121._0._0._3.ctor === 'And')) {
							var _p125 = _p121._1;
							var _p124 = _p121._0._0._1;
							var _p123 = _p121._0._0._0;
							var _p122 = _p121._0._0._2;
							var f2 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p123, _1: _p124, _2: _p122, _3: _p121._0._0._3._1});
							var f1 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p123, _1: _p124, _2: _p122, _3: _p121._0._0._3._0});
							return _elm_lang$core$Maybe$Just(
								{
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											rightForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: f1,
													_1: {ctor: '[]'}
												},
												_p125)
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											seq,
											{
												rightForm: A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: f2,
														_1: {ctor: '[]'}
													},
													_p125)
											}),
										_1: {ctor: '[]'}
									}
								});
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						priority: _user$project$Common_sequent$disjLN,
						category: _user$project$Common_sequent$Rule4LeftFormula,
						rulename: 'Lv',
						rule: function (seq) {
							var _p126 = seq.leftForm;
							if (((_p126.ctor === '::') && (_p126._0._0.ctor === '_Tuple4')) && (_p126._0._0._3.ctor === 'Or')) {
								var _p130 = _p126._1;
								var _p129 = _p126._0._0._1;
								var _p128 = _p126._0._0._0;
								var _p127 = _p126._0._0._2;
								var add2 = _user$project$Common_sequent$LabelForm(
									{ctor: '_Tuple4', _0: _p128, _1: _p129, _2: _p127, _3: _p126._0._0._3._1});
								var add1 = _user$project$Common_sequent$LabelForm(
									{ctor: '_Tuple4', _0: _p128, _1: _p129, _2: _p127, _3: _p126._0._0._3._0});
								return _elm_lang$core$Maybe$Just(
									{
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											seq,
											{
												leftForm: A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: add1,
														_1: {ctor: '[]'}
													},
													_p130)
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												seq,
												{
													leftForm: A2(
														_elm_lang$core$Basics_ops['++'],
														{
															ctor: '::',
															_0: add2,
															_1: {ctor: '[]'}
														},
														_p130)
												}),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return _elm_lang$core$Maybe$Nothing;
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							priority: _user$project$Common_sequent$disjRN,
							category: _user$project$Common_sequent$Rule4RightFormula,
							rulename: 'Rv',
							rule: function (seq) {
								var _p131 = seq.rightForm;
								if (((_p131.ctor === '::') && (_p131._0._0.ctor === '_Tuple4')) && (_p131._0._0._3.ctor === 'Or')) {
									var _p134 = _p131._0._0._1;
									var _p133 = _p131._0._0._0;
									var _p132 = _p131._0._0._2;
									var add2 = _user$project$Common_sequent$LabelForm(
										{ctor: '_Tuple4', _0: _p133, _1: _p134, _2: _p132, _3: _p131._0._0._3._1});
									var add1 = _user$project$Common_sequent$LabelForm(
										{ctor: '_Tuple4', _0: _p133, _1: _p134, _2: _p132, _3: _p131._0._0._3._0});
									return _elm_lang$core$Maybe$Just(
										{
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												seq,
												{
													rightForm: A2(
														_elm_lang$core$Basics_ops['++'],
														{
															ctor: '::',
															_0: add1,
															_1: {
																ctor: '::',
																_0: add2,
																_1: {ctor: '[]'}
															}
														},
														_p131._1)
												}),
											_1: {ctor: '[]'}
										});
								} else {
									return _elm_lang$core$Maybe$Nothing;
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								priority: _user$project$Common_sequent$implLN,
								category: _user$project$Common_sequent$Rule4LeftFormula,
								rulename: 'L->',
								rule: function (seq) {
									var _p135 = seq.leftForm;
									if (((_p135.ctor === '::') && (_p135._0._0.ctor === '_Tuple4')) && (_p135._0._0._3.ctor === 'Imply')) {
										var _p139 = _p135._1;
										var _p138 = _p135._0._0._1;
										var _p137 = _p135._0._0._0;
										var _p136 = _p135._0._0._2;
										var add2 = _user$project$Common_sequent$LabelForm(
											{ctor: '_Tuple4', _0: _p137, _1: _p138, _2: _p136, _3: _p135._0._0._3._1});
										var add1 = _user$project$Common_sequent$LabelForm(
											{ctor: '_Tuple4', _0: _p137, _1: _p138, _2: _p136, _3: _p135._0._0._3._0});
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													seq,
													{
														leftForm: _p139,
														rightForm: A2(
															_elm_lang$core$Basics_ops['++'],
															{
																ctor: '::',
																_0: add1,
																_1: {ctor: '[]'}
															},
															seq.rightForm)
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														seq,
														{
															leftForm: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add2,
																	_1: {ctor: '[]'}
																},
																_p139)
														}),
													_1: {ctor: '[]'}
												}
											});
									} else {
										return _elm_lang$core$Maybe$Nothing;
									}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									priority: _user$project$Common_sequent$implRN,
									category: _user$project$Common_sequent$Rule4RightFormula,
									rulename: 'R->',
									rule: function (seq) {
										var _p140 = seq.rightForm;
										if (((_p140.ctor === '::') && (_p140._0._0.ctor === '_Tuple4')) && (_p140._0._0._3.ctor === 'Imply')) {
											var _p143 = _p140._0._0._1;
											var _p142 = _p140._0._0._0;
											var _p141 = _p140._0._0._2;
											var add2 = _user$project$Common_sequent$LabelForm(
												{ctor: '_Tuple4', _0: _p142, _1: _p143, _2: _p141, _3: _p140._0._0._3._1});
											var add1 = _user$project$Common_sequent$LabelForm(
												{ctor: '_Tuple4', _0: _p142, _1: _p143, _2: _p141, _3: _p140._0._0._3._0});
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														seq,
														{
															leftForm: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add1,
																	_1: {ctor: '[]'}
																},
																seq.leftForm),
															rightForm: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add2,
																	_1: {ctor: '[]'}
																},
																_p140._1)
														}),
													_1: {ctor: '[]'}
												});
										} else {
											return _elm_lang$core$Maybe$Nothing;
										}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										priority: _user$project$Common_sequent$impl2LN,
										category: _user$project$Common_sequent$Rule4LeftFormula,
										rulename: 'L->2',
										rule: function (seq) {
											var _p144 = seq.leftForm;
											if (((_p144.ctor === '::') && (_p144._0._0.ctor === '_Tuple4')) && (_p144._0._0._3.ctor === 'Imply2')) {
												var _p148 = _p144._1;
												var _p147 = _p144._0._0._1;
												var _p146 = _p144._0._0._0;
												var _p145 = _p144._0._0._2;
												var add2 = _user$project$Common_sequent$LabelForm(
													{ctor: '_Tuple4', _0: _p146, _1: _p147, _2: _p145, _3: _p144._0._0._3._0});
												var add1 = _user$project$Common_sequent$LabelForm(
													{ctor: '_Tuple4', _0: _p146, _1: _p147, _2: _p145, _3: _p144._0._0._3._1});
												return _elm_lang$core$Maybe$Just(
													{
														ctor: '::',
														_0: _elm_lang$core$Native_Utils.update(
															seq,
															{
																leftForm: A2(
																	_elm_lang$core$Basics_ops['++'],
																	{
																		ctor: '::',
																		_0: add2,
																		_1: {ctor: '[]'}
																	},
																	_p148)
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$core$Native_Utils.update(
																seq,
																{
																	leftForm: _p148,
																	rightForm: A2(
																		_elm_lang$core$Basics_ops['++'],
																		{
																			ctor: '::',
																			_0: add1,
																			_1: {ctor: '[]'}
																		},
																		seq.rightForm)
																}),
															_1: {ctor: '[]'}
														}
													});
											} else {
												return _elm_lang$core$Maybe$Nothing;
											}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											priority: _user$project$Common_sequent$impl2RN,
											category: _user$project$Common_sequent$Rule4RightFormula,
											rulename: 'R->2',
											rule: function (seq) {
												var _p149 = seq.rightForm;
												if (((_p149.ctor === '::') && (_p149._0._0.ctor === '_Tuple4')) && (_p149._0._0._3.ctor === 'Imply2')) {
													var _p152 = _p149._0._0._1;
													var _p151 = _p149._0._0._0;
													var _p150 = _p149._0._0._2;
													var add2 = _user$project$Common_sequent$LabelForm(
														{ctor: '_Tuple4', _0: _p151, _1: _p152, _2: _p150, _3: _p149._0._0._3._1});
													var add1 = _user$project$Common_sequent$LabelForm(
														{ctor: '_Tuple4', _0: _p151, _1: _p152, _2: _p150, _3: _p149._0._0._3._0});
													return _elm_lang$core$Maybe$Just(
														{
															ctor: '::',
															_0: _elm_lang$core$Native_Utils.update(
																seq,
																{
																	leftForm: A2(
																		_elm_lang$core$Basics_ops['++'],
																		{
																			ctor: '::',
																			_0: add2,
																			_1: {ctor: '[]'}
																		},
																		seq.leftForm),
																	rightForm: A2(
																		_elm_lang$core$Basics_ops['++'],
																		{
																			ctor: '::',
																			_0: add1,
																			_1: {ctor: '[]'}
																		},
																		_p149._1)
																}),
															_1: {ctor: '[]'}
														});
												} else {
													return _elm_lang$core$Maybe$Nothing;
												}
											}
										},
										_1: {
											ctor: '::',
											_0: {
												priority: _user$project$Common_sequent$equiLN,
												category: _user$project$Common_sequent$Rule4LeftFormula,
												rulename: 'L<->',
												rule: function (seq) {
													var _p153 = seq.leftForm;
													if (((_p153.ctor === '::') && (_p153._0._0.ctor === '_Tuple4')) && (_p153._0._0._3.ctor === 'Iff')) {
														var _p155 = _p153._0._0._3._1;
														var _p154 = _p153._0._0._3._0;
														var add1 = _user$project$Common_sequent$LabelForm(
															{
																ctor: '_Tuple4',
																_0: _p153._0._0._0,
																_1: _p153._0._0._1,
																_2: _p153._0._0._2,
																_3: A2(
																	_user$project$Common_syntax$And,
																	A2(_user$project$Common_syntax$Imply, _p154, _p155),
																	A2(_user$project$Common_syntax$Imply, _p155, _p154))
															});
														return _elm_lang$core$Maybe$Just(
															{
																ctor: '::',
																_0: _elm_lang$core$Native_Utils.update(
																	seq,
																	{
																		leftForm: A2(
																			_elm_lang$core$Basics_ops['++'],
																			{
																				ctor: '::',
																				_0: add1,
																				_1: {ctor: '[]'}
																			},
																			_p153._1)
																	}),
																_1: {ctor: '[]'}
															});
													} else {
														return _elm_lang$core$Maybe$Nothing;
													}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													priority: _user$project$Common_sequent$equiRN,
													category: _user$project$Common_sequent$Rule4RightFormula,
													rulename: 'R<->',
													rule: function (seq) {
														var _p156 = seq.rightForm;
														if (((_p156.ctor === '::') && (_p156._0._0.ctor === '_Tuple4')) && (_p156._0._0._3.ctor === 'Iff')) {
															var _p158 = _p156._0._0._3._1;
															var _p157 = _p156._0._0._3._0;
															var add1 = _user$project$Common_sequent$LabelForm(
																{
																	ctor: '_Tuple4',
																	_0: _p156._0._0._0,
																	_1: _p156._0._0._1,
																	_2: _p156._0._0._2,
																	_3: A2(
																		_user$project$Common_syntax$And,
																		A2(_user$project$Common_syntax$Imply, _p157, _p158),
																		A2(_user$project$Common_syntax$Imply, _p158, _p157))
																});
															return _elm_lang$core$Maybe$Just(
																{
																	ctor: '::',
																	_0: _elm_lang$core$Native_Utils.update(
																		seq,
																		{
																			rightForm: A2(
																				_elm_lang$core$Basics_ops['++'],
																				{
																					ctor: '::',
																					_0: add1,
																					_1: {ctor: '[]'}
																				},
																				_p156._1)
																		}),
																	_1: {ctor: '[]'}
																});
														} else {
															return _elm_lang$core$Maybe$Nothing;
														}
													}
												},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$Common_sequent$ruleK = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$boxRN,
		category: _user$project$Common_sequent$Rule4RightFormula,
		rulename: 'R#',
		rule: function (seq) {
			var _p159 = seq.rightForm;
			if (((_p159.ctor === '::') && (_p159._0._0.ctor === '_Tuple4')) && (_p159._0._0._3.ctor === 'Box')) {
				var _p160 = _p159._0._0._2;
				var $new = _user$project$Common_sequent$freshLabel(seq);
				var add1 = _user$project$Common_sequent$RelAtom(
					{
						ctor: '_Tuple4',
						_0: _p159._0._0._3._0,
						_1: _toastal$either$Either$lefts(_p160),
						_2: {
							ctor: '_Tuple2',
							_0: _p159._0._0._1,
							_1: {ctor: '[]'}
						},
						_3: {
							ctor: '_Tuple2',
							_0: $new,
							_1: {ctor: '[]'}
						}
					});
				var add2 = _user$project$Common_sequent$LabelForm(
					{ctor: '_Tuple4', _0: _p159._0._0._0, _1: $new, _2: _p160, _3: _p159._0._0._3._1});
				return _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							seq,
							{
								rightForm: A2(
									_elm_lang$core$Basics_ops['++'],
									{
										ctor: '::',
										_0: add2,
										_1: {ctor: '[]'}
									},
									_p159._1),
								leftRel: _user$project$Common_sequent$sortRelAtom(
									A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: add1,
											_1: {ctor: '[]'}
										},
										seq.leftRel))
							}),
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			priority: _user$project$Common_sequent$boxLN,
			category: _user$project$Common_sequent$Rule4LeftFormula,
			rulename: 'L#',
			rule: function (seq) {
				var _p161 = seq.leftForm;
				if (((_p161.ctor === '::') && (_p161._0._0.ctor === '_Tuple4')) && (_p161._0._0._3.ctor === 'Box')) {
					var _p173 = _p161._0._0._1;
					var _p172 = _p161._0._0._3._1;
					var _p171 = _p161._1;
					var _p170 = _p161._0._0._0;
					var _p169 = _p161._0._0._2;
					var _p168 = _p161._0._0._3._0;
					var orig = function (_p162) {
						var _p163 = _p162;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p163._0, _1: _p163._1},
									_1: _p170
								},
								_1: _p173,
								_2: _p169,
								_3: A2(_user$project$Common_syntax$Box, _p168, _p172)
							});
					};
					var add2 = function (_p164) {
						var _p165 = _p164;
						return _user$project$Common_sequent$RelAtom(
							{
								ctor: '_Tuple4',
								_0: _p168,
								_1: _toastal$either$Either$lefts(_p169),
								_2: {
									ctor: '_Tuple2',
									_0: _p173,
									_1: {ctor: '[]'}
								},
								_3: {
									ctor: '_Tuple2',
									_0: _p165._0,
									_1: {ctor: '[]'}
								}
							});
					};
					var add1 = function (_p166) {
						var _p167 = _p166;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: {ctor: '[]'},
								_1: _p167._0,
								_2: _p169,
								_3: _p172
							});
					};
					var justlabel = function (wholeLabel2) {
						return _elm_community$list_extra$List_Extra$last(
							A2(_user$project$Util$difference, wholeLabel2, _p170));
					}(
						A2(
							_elm_lang$core$List$map,
							function (n) {
								return {
									ctor: '_Tuple2',
									_0: n,
									_1: {ctor: '[]'}
								};
							},
							_user$project$Common_sequent$wholeLabel(seq)));
					return A2(
						_user$project$Applicative_ops['?>'],
						justlabel,
						function (x) {
							return {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									seq,
									{
										leftForm: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: orig(x),
												_1: {
													ctor: '::',
													_0: add1(x),
													_1: {ctor: '[]'}
												}
											},
											_p171)
									}),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											leftForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: orig(x),
													_1: {ctor: '[]'}
												},
												_p171),
											rightRel: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add2(x),
													_1: {ctor: '[]'}
												},
												seq.rightRel)
										}),
									_1: {ctor: '[]'}
								}
							};
						});
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				priority: _user$project$Common_sequent$boxLN,
				category: _user$project$Common_sequent$Rule4RightFormula,
				rulename: 'R$',
				rule: function (seq) {
					var _p174 = seq.rightForm;
					if (((_p174.ctor === '::') && (_p174._0._0.ctor === '_Tuple4')) && (_p174._0._0._3.ctor === 'Dia')) {
						var _p186 = _p174._0._0._1;
						var _p185 = _p174._1;
						var _p184 = _p174._0._0._3._1;
						var _p183 = _p174._0._0._0;
						var _p182 = _p174._0._0._2;
						var _p181 = _p174._0._0._3._0;
						var orig = function (_p175) {
							var _p176 = _p175;
							return _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: _p176._0, _1: _p176._1},
										_1: _p183
									},
									_1: _p186,
									_2: _p182,
									_3: A2(_user$project$Common_syntax$Dia, _p181, _p184)
								});
						};
						var add2 = function (_p177) {
							var _p178 = _p177;
							return _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p181,
									_1: _toastal$either$Either$lefts(_p182),
									_2: {
										ctor: '_Tuple2',
										_0: _p186,
										_1: {ctor: '[]'}
									},
									_3: {
										ctor: '_Tuple2',
										_0: _p178._0,
										_1: {ctor: '[]'}
									}
								});
						};
						var add1 = function (_p179) {
							var _p180 = _p179;
							return _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: {ctor: '[]'},
									_1: _p180._0,
									_2: _p182,
									_3: _p184
								});
						};
						var justlabel = function (wholeLabel2) {
							return _elm_lang$core$List$head(
								A2(_user$project$Util$difference, wholeLabel2, _p183));
						}(
							A2(
								_elm_lang$core$List$map,
								function (n) {
									return {
										ctor: '_Tuple2',
										_0: n,
										_1: {ctor: '[]'}
									};
								},
								_user$project$Common_sequent$wholeLabel(seq)));
						return A2(
							_user$project$Applicative_ops['?>'],
							justlabel,
							function (x) {
								return {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											rightForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: orig(x),
													_1: {
														ctor: '::',
														_0: add1(x),
														_1: {ctor: '[]'}
													}
												},
												_p185)
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											seq,
											{
												rightForm: A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: orig(x),
														_1: {ctor: '[]'}
													},
													_p185),
												rightRel: A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: add2(x),
														_1: {ctor: '[]'}
													},
													seq.rightRel)
											}),
										_1: {ctor: '[]'}
									}
								};
							});
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					priority: _user$project$Common_sequent$boxRN,
					category: _user$project$Common_sequent$Rule4LeftFormula,
					rulename: 'L$',
					rule: function (seq) {
						var _p187 = seq.leftForm;
						if (((_p187.ctor === '::') && (_p187._0._0.ctor === '_Tuple4')) && (_p187._0._0._3.ctor === 'Dia')) {
							var _p188 = _p187._0._0._2;
							var $new = _user$project$Common_sequent$freshLabel(seq);
							var add1 = _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p187._0._0._3._0,
									_1: _toastal$either$Either$lefts(_p188),
									_2: {
										ctor: '_Tuple2',
										_0: _p187._0._0._1,
										_1: {ctor: '[]'}
									},
									_3: {
										ctor: '_Tuple2',
										_0: $new,
										_1: {ctor: '[]'}
									}
								});
							var add2 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p187._0._0._0, _1: $new, _2: _p188, _3: _p187._0._0._3._1});
							return _elm_lang$core$Maybe$Just(
								{
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											leftForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add2,
													_1: {ctor: '[]'}
												},
												_p187._1),
											leftRel: _user$project$Common_sequent$sortRelAtom(
												A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: add1,
														_1: {ctor: '[]'}
													},
													seq.leftRel))
										}),
									_1: {ctor: '[]'}
								});
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					}
				},
				_1: {ctor: '[]'}
			}
		}
	}
};
var _user$project$Common_sequent$Rule4LeftRel = {ctor: 'Rule4LeftRel'};
var _user$project$Common_sequent$rule4 = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$traR,
		category: _user$project$Common_sequent$Rule4LeftRel,
		rulename: 'tran',
		rule: function (seq) {
			var _p189 = seq.leftRel;
			if ((((_p189.ctor === '::') && (_p189._0.ctor === 'RelAtom')) && (_p189._0._0.ctor === '_Tuple4')) && (_p189._0._0._1.ctor === '[]')) {
				var ff = _user$project$Common_sequent$tran(
					_user$project$Common_sequent$RelAtom(
						{
							ctor: '_Tuple4',
							_0: _p189._0._0._0,
							_1: {ctor: '[]'},
							_2: _p189._0._0._2,
							_3: _p189._0._0._3
						}));
				var le2 = _user$project$Util$nub(
					A2(_elm_lang$core$List$concatMap, ff, seq.leftRel));
				var seq2 = _elm_lang$core$Native_Utils.update(
					seq,
					{leftRel: le2});
				return A2(_user$project$Common_sequent$sameSeq, seq, seq2) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: seq2,
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {ctor: '[]'}
};
var _user$project$Common_sequent$rule5 = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$eucR,
		category: _user$project$Common_sequent$Rule4LeftRel,
		rulename: 'eucl',
		rule: function (seq) {
			var _p190 = seq.leftRel;
			if ((((_p190.ctor === '::') && (_p190._0.ctor === 'RelAtom')) && (_p190._0._0.ctor === '_Tuple4')) && (_p190._0._0._1.ctor === '[]')) {
				var ff = _user$project$Common_sequent$eucl(
					_user$project$Common_sequent$RelAtom(
						{
							ctor: '_Tuple4',
							_0: _p190._0._0._0,
							_1: {ctor: '[]'},
							_2: _p190._0._0._2,
							_3: _p190._0._0._3
						}));
				var le2 = _user$project$Util$nub(
					A2(_elm_lang$core$List$concatMap, ff, seq.leftRel));
				var seq2 = _elm_lang$core$Native_Utils.update(
					seq,
					{leftRel: le2});
				return A2(_user$project$Common_sequent$sameSeq, seq, seq2) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: seq2,
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {ctor: '[]'}
};
var _user$project$Common_sequent$ruleB = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$symR,
		category: _user$project$Common_sequent$Rule4LeftRel,
		rulename: 'symm',
		rule: function (seq) {
			var _p191 = seq.leftRel;
			if ((((_p191.ctor === '::') && (_p191._0.ctor === 'RelAtom')) && (_p191._0._0.ctor === '_Tuple4')) && (_p191._0._0._1.ctor === '[]')) {
				var le2 = _user$project$Util$nub(
					A2(
						_elm_lang$core$Basics_ops['++'],
						seq.leftRel,
						{
							ctor: '::',
							_0: _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p191._0._0._0,
									_1: {ctor: '[]'},
									_2: _p191._0._0._3,
									_3: _p191._0._0._2
								}),
							_1: {ctor: '[]'}
						}));
				return A2(
					_user$project$Common_sequent$sameSeq,
					seq,
					_elm_lang$core$Native_Utils.update(
						seq,
						{leftRel: le2})) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							seq,
							{leftRel: le2}),
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {ctor: '[]'}
};
var _user$project$Common_sequent$proofSystem = function (str) {
	proofSystem:
	while (true) {
		var _p192 = _elm_lang$core$String$toList(str);
		if (_p192.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p196 = _p192._1;
			var _p193 = _p192._0;
			switch (_p193.valueOf()) {
				case 'K':
					var _v110 = _elm_lang$core$String$fromList(_p196);
					str = _v110;
					continue proofSystem;
				case 'T':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$ruleT,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p196)));
				case 'B':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$ruleB,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p196)));
				case 'D':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$ruleD,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p196)));
				case '4':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$rule4,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p196)));
				case '5':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$rule5,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p196)));
				case 'S':
					var _p194 = _p196;
					if (_p194.ctor === '[]') {
						return {ctor: '[]'};
					} else {
						var _p195 = _p194._0;
						switch (_p195.valueOf()) {
							case '5':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$Common_sequent$ruleK,
									A2(_elm_lang$core$Basics_ops['++'], _user$project$Common_sequent$ruleT, _user$project$Common_sequent$rule5));
							case '4':
								return A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$Common_sequent$ruleK,
									A2(_elm_lang$core$Basics_ops['++'], _user$project$Common_sequent$ruleT, _user$project$Common_sequent$rule4));
							default:
								return {ctor: '[]'};
						}
					}
				default:
					return {ctor: '[]'};
			}
		}
	}
};
var _user$project$Common_sequent$EbProofsty = {ctor: 'EbProofsty'};
var _user$project$Common_sequent$drawTexProof_ebproofsty2 = function (q) {
	var _p197 = q;
	if ((_p197.ctor === '::') && (_p197._1.ctor === '[]')) {
		var _p200 = _p197._0._0;
		var _p199 = _p197._0._1;
		var _p198 = _p197._0._2;
		if (_p198.ctor === '[]') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'\\Hypo{($',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$Common_sequent$texRule(_p199),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'$)}',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\n \\Infer1[]{',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_user$project$Common_sequent$drawTexSequent, _p200, _user$project$Common_sequent$EbProofsty),
								'}')))));
		} else {
			if (_p198._1.ctor === '[]') {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$Common_sequent$drawTexProof_ebproofsty2(
						{
							ctor: '::',
							_0: A3(_user$project$Common_sequent$Proof, _p198._0._0, _p198._0._1, _p198._0._2),
							_1: {ctor: '[]'}
						}),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'\n \\Infer1[\\mbox{($',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_sequent$texRule(_p199),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'$)}]{',
								A2(
									_elm_lang$core$Basics_ops['++'],
									A2(_user$project$Common_sequent$drawTexSequent, _p200, _user$project$Common_sequent$EbProofsty),
									'}')))));
			} else {
				if (_p198._1._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$drawTexProof_ebproofsty2(
							{
								ctor: '::',
								_0: A3(_user$project$Common_sequent$Proof, _p198._0._0, _p198._0._1, _p198._0._2),
								_1: {ctor: '[]'}
							}),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\n',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_user$project$Common_sequent$drawTexProof_ebproofsty2(
									{
										ctor: '::',
										_0: A3(_user$project$Common_sequent$Proof, _p198._1._0._0, _p198._1._0._1, _p198._1._0._2),
										_1: {ctor: '[]'}
									}),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\n \\Infer2[\\mbox{($',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_user$project$Common_sequent$texRule(_p199),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'$)}]{',
											A2(
												_elm_lang$core$Basics_ops['++'],
												A2(_user$project$Common_sequent$drawTexSequent, _p200, _user$project$Common_sequent$EbProofsty),
												'}')))))));
				} else {
					if (_p198._1._1._1.ctor === '[]') {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_sequent$drawTexProof_ebproofsty2(
								{
									ctor: '::',
									_0: A3(_user$project$Common_sequent$Proof, _p198._0._0, _p198._0._1, _p198._0._2),
									_1: {ctor: '[]'}
								}),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'\n',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$Common_sequent$drawTexProof_ebproofsty2(
										{
											ctor: '::',
											_0: A3(_user$project$Common_sequent$Proof, _p198._1._0._0, _p198._1._0._1, _p198._1._0._2),
											_1: {ctor: '[]'}
										}),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'\n',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_user$project$Common_sequent$drawTexProof_ebproofsty2(
												{
													ctor: '::',
													_0: A3(_user$project$Common_sequent$Proof, _p198._1._1._0._0, _p198._1._1._0._1, _p198._1._1._0._2),
													_1: {ctor: '[]'}
												}),
											A2(
												_elm_lang$core$Basics_ops['++'],
												'\n \\Infer3[\\mbox{($',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_user$project$Common_sequent$texRule(_p199),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'$)}]{',
														A2(
															_elm_lang$core$Basics_ops['++'],
															A2(_user$project$Common_sequent$drawTexSequent, _p200, _user$project$Common_sequent$EbProofsty),
															'}')))))))));
					} else {
						return 'error in drawTexProof_ebproofsty2 (1)';
					}
				}
			}
		}
	} else {
		return 'error in drawTexProof_ebproofsty2 (2)';
	}
};
var _user$project$Common_sequent$drawTexProof_ebproofsty = function (q) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'<div>\\documentclass{article}</div>',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'<div>\\usepackage{amsmath,amssymb,amsthm}</div>',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'<div>\\usepackage{ebproof}</div>',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'<div>\\begin{document}</div>',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'<div>\\begin{tiny}</div>',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'<div>\\begin{prooftree}</div>',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_user$project$Common_sequent$drawTexProof_ebproofsty2(q),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'<div>\\end{prooftree}</div>',
									A2(_elm_lang$core$Basics_ops['++'], '<div>\\end{tiny}</div>', '<div>\\end{document}</div>')))))))));
};
var _user$project$Common_sequent$Proofsty = {ctor: 'Proofsty'};
var _user$project$Common_sequent$drawTexProof_proofsty2 = function (q) {
	var _p201 = q;
	if ((_p201.ctor === '::') && (_p201._1.ctor === '[]')) {
		var _p204 = _p201._0._0;
		var _p203 = _p201._0._1;
		var _p202 = _p201._0._2;
		if (_p202.ctor === '[]') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'\n \\infer[\\mbox{($',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$Common_sequent$texRule(_p203),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'$)}]{',
						A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$Common_sequent$drawTexSequent, _p204, _user$project$Common_sequent$Proofsty),
							'}{}'))));
		} else {
			if (_p202._1.ctor === '[]') {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'\n \\infer[\\mbox{($',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$texRule(_p203),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'$)}]{',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_user$project$Common_sequent$drawTexSequent, _p204, _user$project$Common_sequent$Proofsty),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'}{',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_user$project$Common_sequent$drawTexProof_proofsty2(
											{
												ctor: '::',
												_0: A3(_user$project$Common_sequent$Proof, _p202._0._0, _p202._0._1, _p202._0._2),
												_1: {ctor: '[]'}
											}),
										'}'))))));
			} else {
				if (_p202._1._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'\n \\infer[\\mbox{($',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_sequent$texRule(_p203),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'$)}]{',
								A2(
									_elm_lang$core$Basics_ops['++'],
									A2(_user$project$Common_sequent$drawTexSequent, _p204, _user$project$Common_sequent$Proofsty),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'}',
										A2(
											_elm_lang$core$Basics_ops['++'],
											'{',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_user$project$Common_sequent$drawTexProof_proofsty2(
													{
														ctor: '::',
														_0: A3(_user$project$Common_sequent$Proof, _p202._0._0, _p202._0._1, _p202._0._2),
														_1: {ctor: '[]'}
													}),
												A2(
													_elm_lang$core$Basics_ops['++'],
													'\n &',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_user$project$Common_sequent$drawTexProof_proofsty2(
															{
																ctor: '::',
																_0: A3(_user$project$Common_sequent$Proof, _p202._1._0._0, _p202._1._0._1, _p202._1._0._2),
																_1: {ctor: '[]'}
															}),
														'}')))))))));
				} else {
					if (_p202._1._1._1.ctor === '[]') {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							'\n \\infer[\\mbox{($',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_user$project$Common_sequent$texRule(_p203),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'$)}]{',
									A2(
										_elm_lang$core$Basics_ops['++'],
										A2(_user$project$Common_sequent$drawTexSequent, _p204, _user$project$Common_sequent$Proofsty),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'}',
											A2(
												_elm_lang$core$Basics_ops['++'],
												'{',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_user$project$Common_sequent$drawTexProof_proofsty2(
														{
															ctor: '::',
															_0: A3(_user$project$Common_sequent$Proof, _p202._0._0, _p202._0._1, _p202._0._2),
															_1: {ctor: '[]'}
														}),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'\n &',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_user$project$Common_sequent$drawTexProof_proofsty2(
																{
																	ctor: '::',
																	_0: A3(_user$project$Common_sequent$Proof, _p202._1._0._0, _p202._1._0._1, _p202._1._0._2),
																	_1: {ctor: '[]'}
																}),
															A2(
																_elm_lang$core$Basics_ops['++'],
																'\n &',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_user$project$Common_sequent$drawTexProof_proofsty2(
																		{
																			ctor: '::',
																			_0: A3(_user$project$Common_sequent$Proof, _p202._1._1._0._0, _p202._1._1._0._1, _p202._1._1._0._2),
																			_1: {ctor: '[]'}
																		}),
																	'}')))))))))));
					} else {
						return 'error in drawTexProof_proofsty2 (1)';
					}
				}
			}
		}
	} else {
		return 'error in drawTexProof_proofsty2 (2)';
	}
};
var _user$project$Common_sequent$drawTexProof_proofsty = function (q) {
	return A2(
		_elm_lang$core$Basics_ops['++'],
		'<div>\\documentclass{article}</div>',
		A2(
			_elm_lang$core$Basics_ops['++'],
			'<div>\\usepackage{amsmath,amssymb,amsthm}</div>',
			A2(
				_elm_lang$core$Basics_ops['++'],
				'<div>\\usepackage{proof}</div>',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'<div>\\begin{document}</div>',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'<div>\\begin{tiny}</div>',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_sequent$drawTexProof_proofsty2(q),
							A2(_elm_lang$core$Basics_ops['++'], '<div>\\end{tiny}</div>', '<div>\\end{document}</div>')))))));
};
var _user$project$Common_sequent$Tree = F2(
	function (a, b) {
		return {ctor: 'Tree', _0: a, _1: b};
	});
var _user$project$Common_sequent$proof2tree = function (_p205) {
	var _p206 = _p205;
	return function (w) {
		return A2(
			_user$project$Common_sequent$Tree,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p206._1,
					A2(_elm_lang$core$Basics_ops['++'], ')  ', w))),
			A2(_elm_lang$core$List$map, _user$project$Common_sequent$proof2tree, _p206._2));
	}(
		_user$project$Common_sequent$outputSequent(_p206._0));
};
var _user$project$Common_sequent$drawProof = function (derivation) {
	var isPro = _user$project$Common_sequent$isProvable(derivation);
	return function (z) {
		return A2(_user$project$Common_sequent$list2pairElm, z, isPro);
	}(
		function (y) {
			return A2(
				_user$project$Common_sequent$addBlank,
				y,
				{ctor: '[]'});
		}(
			function (y) {
				return A2(
					_user$project$Common_sequent$addBlank,
					y,
					{ctor: '[]'});
			}(
				function (y) {
					return A2(
						_user$project$Common_sequent$addBlank,
						y,
						{ctor: '[]'});
				}(
					function (x) {
						return A2(
							_user$project$Common_sequent$tree2vis,
							x,
							{ctor: '[]'});
					}(
						_user$project$Common_sequent$proof2tree(derivation))))));
};

var _user$project$Int_sequent$lookEachDiamond = F3(
	function (maxNum, ruleSet, seq) {
		var _p0 = seq.rightForm;
		if ((((_p0.ctor === '::') && (_p0._0._0.ctor === '_Tuple4')) && (_p0._0._0._3.ctor === 'Dia')) && (_p0._1.ctor === '[]')) {
			var _p11 = _p0._0._0._1;
			var _p10 = _p0._0._0._3._1;
			var _p9 = _p0._0._0._0;
			var _p8 = _p0._0._0._2;
			var _p7 = _p0._0._0._3._0;
			var orig = function (_p1) {
				var _p2 = _p1;
				return _user$project$Common_sequent$LabelForm(
					{
						ctor: '_Tuple4',
						_0: {
							ctor: '::',
							_0: {ctor: '_Tuple2', _0: _p2._0, _1: _p2._1},
							_1: _p9
						},
						_1: _p11,
						_2: _p8,
						_3: A2(_user$project$Common_syntax$Dia, _p7, _p10)
					});
			};
			var add2 = function (_p3) {
				var _p4 = _p3;
				return _user$project$Common_sequent$RelAtom(
					{
						ctor: '_Tuple4',
						_0: _p7,
						_1: _toastal$either$Either$lefts(_p8),
						_2: {
							ctor: '_Tuple2',
							_0: _p11,
							_1: {ctor: '[]'}
						},
						_3: {
							ctor: '_Tuple2',
							_0: _p4._0,
							_1: {ctor: '[]'}
						}
					});
			};
			var add1 = function (_p5) {
				var _p6 = _p5;
				return _user$project$Common_sequent$LabelForm(
					{
						ctor: '_Tuple4',
						_0: {ctor: '[]'},
						_1: _p6._0,
						_2: _p8,
						_3: _p10
					});
			};
			var justlabel = function (wholeLabel2) {
				return _elm_lang$core$List$head(
					A2(_user$project$Util$difference, wholeLabel2, _p9));
			}(
				A2(
					_elm_lang$core$List$map,
					function (n) {
						return {
							ctor: '_Tuple2',
							_0: n,
							_1: {ctor: '[]'}
						};
					},
					_user$project$Common_sequent$wholeLabel(seq)));
			var seq1 = A2(
				_user$project$Applicative_ops['?>'],
				justlabel,
				function (x) {
					return _elm_lang$core$Native_Utils.update(
						seq,
						{
							rightForm: A2(
								_elm_lang$core$Basics_ops['++'],
								{
									ctor: '::',
									_0: add1(x),
									_1: {ctor: '[]'}
								},
								{ctor: '[]'})
						});
				});
			var seq2 = A2(
				_user$project$Applicative_ops['?>'],
				justlabel,
				function (x) {
					return _elm_lang$core$Native_Utils.update(
						seq,
						{
							rightRel: A2(
								_elm_lang$core$Basics_ops['++'],
								{
									ctor: '::',
									_0: add2(x),
									_1: {ctor: '[]'}
								},
								{ctor: '[]'})
						});
				});
			return A3(_user$project$Common_sequent$isProvableSeq, maxNum, ruleSet, seq1) ? _elm_community$maybe_extra$Maybe_Extra$combine(
				{
					ctor: '::',
					_0: seq1,
					_1: {ctor: '[]'}
				}) : (A3(_user$project$Common_sequent$isProvableSeq, maxNum, ruleSet, seq2) ? _elm_community$maybe_extra$Maybe_Extra$combine(
				{
					ctor: '::',
					_0: seq2,
					_1: {ctor: '[]'}
				}) : _elm_lang$core$Maybe$Nothing);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _user$project$Int_sequent$lookEachDisjunct = F3(
	function (maxNum, ruleSet, seq) {
		var _p12 = seq.rightForm;
		if ((((_p12.ctor === '::') && (_p12._0._0.ctor === '_Tuple4')) && (_p12._0._0._3.ctor === 'Or')) && (_p12._1.ctor === '[]')) {
			var _p15 = _p12._0._0._1;
			var _p14 = _p12._0._0._0;
			var _p13 = _p12._0._0._2;
			var seq2 = _elm_lang$core$Native_Utils.update(
				seq,
				{
					rightForm: {
						ctor: '::',
						_0: _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p14, _1: _p15, _2: _p13, _3: _p12._0._0._3._1}),
						_1: {ctor: '[]'}
					}
				});
			var seq1 = _elm_lang$core$Native_Utils.update(
				seq,
				{
					rightForm: {
						ctor: '::',
						_0: _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p14, _1: _p15, _2: _p13, _3: _p12._0._0._3._0}),
						_1: {ctor: '[]'}
					}
				});
			return A3(
				_user$project$Common_sequent$isProvableSeq,
				maxNum,
				ruleSet,
				_elm_lang$core$Maybe$Just(seq1)) ? _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: seq1,
					_1: {ctor: '[]'}
				}) : (A3(
				_user$project$Common_sequent$isProvableSeq,
				maxNum,
				ruleSet,
				_elm_lang$core$Maybe$Just(seq2)) ? _elm_lang$core$Maybe$Just(
				{
					ctor: '::',
					_0: seq2,
					_1: {ctor: '[]'}
				}) : _elm_lang$core$Maybe$Nothing);
		} else {
			return _elm_lang$core$Maybe$Nothing;
		}
	});
var _user$project$Int_sequent$ruleK_int = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$boxRN,
		category: _user$project$Common_sequent$Rule4RightFormula,
		rulename: 'R#',
		rule: function (seq) {
			var _p16 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
			if ((((((_p16.ctor === '_Tuple2') && (_p16._0.ctor === '::')) && (_p16._0._0._0.ctor === '_Tuple4')) && (_p16._0._0._0._3.ctor === 'Box')) && (_p16._0._1.ctor === '[]')) && (_p16._1.ctor === '[]')) {
				var _p17 = _p16._0._0._0._2;
				var $new = _user$project$Common_sequent$freshLabel(seq);
				var add1 = _user$project$Common_sequent$RelAtom(
					{
						ctor: '_Tuple4',
						_0: _p16._0._0._0._3._0,
						_1: _toastal$either$Either$lefts(_p17),
						_2: {
							ctor: '_Tuple2',
							_0: _p16._0._0._0._1,
							_1: {ctor: '[]'}
						},
						_3: {
							ctor: '_Tuple2',
							_0: $new,
							_1: {ctor: '[]'}
						}
					});
				var add2 = _user$project$Common_sequent$LabelForm(
					{ctor: '_Tuple4', _0: _p16._0._0._0._0, _1: $new, _2: _p17, _3: _p16._0._0._0._3._1});
				return _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							seq,
							{
								rightForm: A2(
									_elm_lang$core$Basics_ops['++'],
									{
										ctor: '::',
										_0: add2,
										_1: {ctor: '[]'}
									},
									{ctor: '[]'}),
								leftRel: _user$project$Common_sequent$sortRelAtom(
									A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: add1,
											_1: {ctor: '[]'}
										},
										seq.leftRel))
							}),
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			priority: 99,
			category: _user$project$Common_sequent$Rule4LeftFormula,
			rulename: 'L#_int',
			rule: function (seq) {
				var _p18 = seq.leftForm;
				if (((_p18.ctor === '::') && (_p18._0._0.ctor === '_Tuple4')) && (_p18._0._0._3.ctor === 'Box')) {
					var _p30 = _p18._0._0._1;
					var _p29 = _p18._0._0._3._1;
					var _p28 = _p18._1;
					var _p27 = _p18._0._0._0;
					var _p26 = _p18._0._0._2;
					var _p25 = _p18._0._0._3._0;
					var orig = function (_p19) {
						var _p20 = _p19;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p20._0, _1: _p20._1},
									_1: _p27
								},
								_1: _p30,
								_2: _p26,
								_3: A2(_user$project$Common_syntax$Box, _p25, _p29)
							});
					};
					var add2 = function (_p21) {
						var _p22 = _p21;
						return _user$project$Common_sequent$RelAtom(
							{
								ctor: '_Tuple4',
								_0: _p25,
								_1: _toastal$either$Either$lefts(_p26),
								_2: {
									ctor: '_Tuple2',
									_0: _p30,
									_1: {ctor: '[]'}
								},
								_3: {
									ctor: '_Tuple2',
									_0: _p22._0,
									_1: {ctor: '[]'}
								}
							});
					};
					var add1 = function (_p23) {
						var _p24 = _p23;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: {ctor: '[]'},
								_1: _p24._0,
								_2: _p26,
								_3: _p29
							});
					};
					var justlabel = function (wholeLabel2) {
						return _elm_community$list_extra$List_Extra$last(
							A2(_user$project$Util$difference, wholeLabel2, _p27));
					}(
						A2(
							_elm_lang$core$List$map,
							function (n) {
								return {
									ctor: '_Tuple2',
									_0: n,
									_1: {ctor: '[]'}
								};
							},
							_user$project$Common_sequent$wholeLabel(seq)));
					return A2(
						_user$project$Applicative_ops['?>'],
						justlabel,
						function (x) {
							return {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									seq,
									{
										leftForm: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: add1(x),
												_1: {ctor: '[]'}
											},
											_p28)
									}),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											leftForm: _p28,
											rightRel: {
												ctor: '::',
												_0: add2(x),
												_1: {ctor: '[]'}
											},
											rightForm: {ctor: '[]'}
										}),
									_1: {ctor: '[]'}
								}
							};
						});
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				priority: _user$project$Common_sequent$boxLN,
				category: _user$project$Common_sequent$Rule4RightFormula,
				rulename: 'R$_int',
				rule: function (seq) {
					var _p31 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
					if ((((((_p31.ctor === '_Tuple2') && (_p31._0.ctor === '::')) && (_p31._0._0._0.ctor === '_Tuple4')) && (_p31._0._0._0._3.ctor === 'Dia')) && (_p31._0._1.ctor === '[]')) && (_p31._1.ctor === '[]')) {
						var _p42 = _p31._0._0._0._1;
						var _p41 = _p31._0._0._0._3._1;
						var _p40 = _p31._0._0._0._0;
						var _p39 = _p31._0._0._0._2;
						var _p38 = _p31._0._0._0._3._0;
						var orig = function (_p32) {
							var _p33 = _p32;
							return _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: _p33._0, _1: _p33._1},
										_1: _p40
									},
									_1: _p42,
									_2: _p39,
									_3: A2(_user$project$Common_syntax$Dia, _p38, _p41)
								});
						};
						var add2 = function (_p34) {
							var _p35 = _p34;
							return _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p38,
									_1: _toastal$either$Either$lefts(_p39),
									_2: {
										ctor: '_Tuple2',
										_0: _p42,
										_1: {ctor: '[]'}
									},
									_3: {
										ctor: '_Tuple2',
										_0: _p35._0,
										_1: {ctor: '[]'}
									}
								});
						};
						var add1 = function (_p36) {
							var _p37 = _p36;
							return _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: {ctor: '[]'},
									_1: _p37._0,
									_2: _p39,
									_3: _p41
								});
						};
						var justlabel = function (wholeLabel2) {
							return _elm_community$list_extra$List_Extra$last(
								A2(_user$project$Util$difference, wholeLabel2, _p40));
						}(
							A2(
								_elm_lang$core$List$map,
								function (n) {
									return {
										ctor: '_Tuple2',
										_0: n,
										_1: {ctor: '[]'}
									};
								},
								_user$project$Common_sequent$wholeLabel(seq)));
						return A2(
							_user$project$Applicative_ops['?>'],
							justlabel,
							function (x) {
								return {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											rightForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add1(x),
													_1: {ctor: '[]'}
												},
												{ctor: '[]'})
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											seq,
											{
												rightRel: A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: add2(x),
														_1: {ctor: '[]'}
													},
													{ctor: '[]'}),
												rightForm: {ctor: '[]'}
											}),
										_1: {ctor: '[]'}
									}
								};
							});
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					priority: _user$project$Common_sequent$boxRN,
					category: _user$project$Common_sequent$Rule4LeftFormula,
					rulename: 'L$',
					rule: function (seq) {
						var _p43 = seq.leftForm;
						if (((_p43.ctor === '::') && (_p43._0._0.ctor === '_Tuple4')) && (_p43._0._0._3.ctor === 'Dia')) {
							var _p44 = _p43._0._0._2;
							var $new = _user$project$Common_sequent$freshLabel(seq);
							var add1 = _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p43._0._0._3._0,
									_1: _toastal$either$Either$lefts(_p44),
									_2: {
										ctor: '_Tuple2',
										_0: _p43._0._0._1,
										_1: {ctor: '[]'}
									},
									_3: {
										ctor: '_Tuple2',
										_0: $new,
										_1: {ctor: '[]'}
									}
								});
							var add2 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p43._0._0._0, _1: $new, _2: _p44, _3: _p43._0._0._3._1});
							return _elm_lang$core$Maybe$Just(
								{
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											leftForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add2,
													_1: {ctor: '[]'}
												},
												_p43._1),
											leftRel: _user$project$Common_sequent$sortRelAtom(
												A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: add1,
														_1: {ctor: '[]'}
													},
													seq.leftRel))
										}),
									_1: {ctor: '[]'}
								});
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					}
				},
				_1: {ctor: '[]'}
			}
		}
	}
};
var _user$project$Int_sequent$ruleInt = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$negLN,
		category: _user$project$Common_sequent$Rule4LeftFormula,
		rulename: 'L~',
		rule: function (seq) {
			var _p45 = seq.leftForm;
			if (((_p45.ctor === '::') && (_p45._0._0.ctor === '_Tuple4')) && (_p45._0._0._3.ctor === 'Not')) {
				var add1 = _user$project$Common_sequent$LabelForm(
					{ctor: '_Tuple4', _0: _p45._0._0._0, _1: _p45._0._0._1, _2: _p45._0._0._2, _3: _p45._0._0._3._0});
				return _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							seq,
							{
								leftForm: _p45._1,
								rightForm: A2(
									_elm_lang$core$Basics_ops['++'],
									{
										ctor: '::',
										_0: add1,
										_1: {ctor: '[]'}
									},
									{ctor: '[]'})
							}),
						_1: {ctor: '[]'}
					});
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			priority: 99,
			category: _user$project$Common_sequent$Rule4RightFormula,
			rulename: 'R~',
			rule: function (seq) {
				var _p46 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
				if ((((((_p46.ctor === '_Tuple2') && (_p46._0.ctor === '::')) && (_p46._0._0._0.ctor === '_Tuple4')) && (_p46._0._0._0._3.ctor === 'Not')) && (_p46._0._1.ctor === '[]')) && (_p46._1.ctor === '[]')) {
					var add1 = _user$project$Common_sequent$LabelForm(
						{ctor: '_Tuple4', _0: _p46._0._0._0._0, _1: _p46._0._0._0._1, _2: _p46._0._0._0._2, _3: _p46._0._0._0._3._0});
					return _elm_lang$core$Maybe$Just(
						{
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								seq,
								{
									leftForm: A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: add1,
											_1: {ctor: '[]'}
										},
										seq.leftForm),
									rightForm: {ctor: '[]'}
								}),
							_1: {ctor: '[]'}
						});
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				priority: _user$project$Common_sequent$conjLN,
				category: _user$project$Common_sequent$Rule4LeftFormula,
				rulename: 'L&',
				rule: function (seq) {
					var _p47 = seq.leftForm;
					if (((_p47.ctor === '::') && (_p47._0._0.ctor === '_Tuple4')) && (_p47._0._0._3.ctor === 'And')) {
						var _p50 = _p47._0._0._2;
						var _p49 = _p47._0._0._0;
						var _p48 = _p47._0._0._1;
						var add2 = _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p49, _1: _p48, _2: _p50, _3: _p47._0._0._3._1});
						var add1 = _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p49, _1: _p48, _2: _p50, _3: _p47._0._0._3._0});
						return _elm_lang$core$Maybe$Just(
							{
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									seq,
									{
										leftForm: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: add1,
												_1: {
													ctor: '::',
													_0: add2,
													_1: {ctor: '[]'}
												}
											},
											_p47._1)
									}),
								_1: {ctor: '[]'}
							});
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					priority: _user$project$Common_sequent$conjRN,
					category: _user$project$Common_sequent$Rule4RightFormula,
					rulename: 'R&',
					rule: function (seq) {
						var _p51 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
						if ((((((_p51.ctor === '_Tuple2') && (_p51._0.ctor === '::')) && (_p51._0._0._0.ctor === '_Tuple4')) && (_p51._0._0._0._3.ctor === 'And')) && (_p51._0._1.ctor === '[]')) && (_p51._1.ctor === '[]')) {
							var _p54 = _p51._0._0._0._2;
							var _p53 = _p51._0._0._0._0;
							var _p52 = _p51._0._0._0._1;
							var f2 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p53, _1: _p52, _2: _p54, _3: _p51._0._0._0._3._1});
							var f1 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p53, _1: _p52, _2: _p54, _3: _p51._0._0._0._3._0});
							return _elm_lang$core$Maybe$Just(
								{
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											rightForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: f1,
													_1: {ctor: '[]'}
												},
												{ctor: '[]'})
										}),
									_1: {
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											seq,
											{
												rightForm: A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: f2,
														_1: {ctor: '[]'}
													},
													{ctor: '[]'})
											}),
										_1: {ctor: '[]'}
									}
								});
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						priority: _user$project$Common_sequent$disjLN,
						category: _user$project$Common_sequent$Rule4LeftFormula,
						rulename: 'Lv',
						rule: function (seq) {
							var _p55 = seq.leftForm;
							if (((_p55.ctor === '::') && (_p55._0._0.ctor === '_Tuple4')) && (_p55._0._0._3.ctor === 'Or')) {
								var _p59 = _p55._1;
								var _p58 = _p55._0._0._2;
								var _p57 = _p55._0._0._0;
								var _p56 = _p55._0._0._1;
								var add2 = _user$project$Common_sequent$LabelForm(
									{ctor: '_Tuple4', _0: _p57, _1: _p56, _2: _p58, _3: _p55._0._0._3._1});
								var add1 = _user$project$Common_sequent$LabelForm(
									{ctor: '_Tuple4', _0: _p57, _1: _p56, _2: _p58, _3: _p55._0._0._3._0});
								return _elm_lang$core$Maybe$Just(
									{
										ctor: '::',
										_0: _elm_lang$core$Native_Utils.update(
											seq,
											{
												leftForm: A2(
													_elm_lang$core$Basics_ops['++'],
													{
														ctor: '::',
														_0: add1,
														_1: {ctor: '[]'}
													},
													_p59)
											}),
										_1: {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												seq,
												{
													leftForm: A2(
														_elm_lang$core$Basics_ops['++'],
														{
															ctor: '::',
															_0: add2,
															_1: {ctor: '[]'}
														},
														_p59)
												}),
											_1: {ctor: '[]'}
										}
									});
							} else {
								return _elm_lang$core$Maybe$Nothing;
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							priority: _user$project$Common_sequent$disjRN,
							category: _user$project$Common_sequent$Rule4RightFormula,
							rulename: 'Rv_int',
							rule: function (seq) {
								var _p60 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
								if ((((((_p60.ctor === '_Tuple2') && (_p60._0.ctor === '::')) && (_p60._0._0._0.ctor === '_Tuple4')) && (_p60._0._0._0._3.ctor === 'Or')) && (_p60._0._1.ctor === '[]')) && (_p60._1.ctor === '[]')) {
									var _p63 = _p60._0._0._0._2;
									var _p62 = _p60._0._0._0._0;
									var _p61 = _p60._0._0._0._1;
									var add2 = _user$project$Common_sequent$LabelForm(
										{ctor: '_Tuple4', _0: _p62, _1: _p61, _2: _p63, _3: _p60._0._0._0._3._1});
									var add1 = _user$project$Common_sequent$LabelForm(
										{ctor: '_Tuple4', _0: _p62, _1: _p61, _2: _p63, _3: _p60._0._0._0._3._0});
									return _elm_lang$core$Maybe$Just(
										{
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												seq,
												{
													rightForm: A2(
														_elm_lang$core$Basics_ops['++'],
														{
															ctor: '::',
															_0: add1,
															_1: {ctor: '[]'}
														},
														{ctor: '[]'})
												}),
											_1: {
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													seq,
													{
														rightForm: A2(
															_elm_lang$core$Basics_ops['++'],
															{
																ctor: '::',
																_0: add2,
																_1: {ctor: '[]'}
															},
															{ctor: '[]'})
													}),
												_1: {ctor: '[]'}
											}
										});
								} else {
									return _elm_lang$core$Maybe$Nothing;
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								priority: 99,
								category: _user$project$Common_sequent$Rule4LeftFormula,
								rulename: 'L->',
								rule: function (seq) {
									var _p64 = seq.leftForm;
									if (((_p64.ctor === '::') && (_p64._0._0.ctor === '_Tuple4')) && (_p64._0._0._3.ctor === 'Imply')) {
										var _p68 = _p64._1;
										var _p67 = _p64._0._0._2;
										var _p66 = _p64._0._0._0;
										var _p65 = _p64._0._0._1;
										var add2 = _user$project$Common_sequent$LabelForm(
											{ctor: '_Tuple4', _0: _p66, _1: _p65, _2: _p67, _3: _p64._0._0._3._1});
										var add1 = _user$project$Common_sequent$LabelForm(
											{ctor: '_Tuple4', _0: _p66, _1: _p65, _2: _p67, _3: _p64._0._0._3._0});
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													seq,
													{
														leftForm: _p68,
														rightForm: {
															ctor: '::',
															_0: add1,
															_1: {ctor: '[]'}
														},
														rightRel: {ctor: '[]'}
													}),
												_1: {
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														seq,
														{
															leftForm: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add2,
																	_1: {ctor: '[]'}
																},
																_p68)
														}),
													_1: {ctor: '[]'}
												}
											});
									} else {
										return _elm_lang$core$Maybe$Nothing;
									}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									priority: _user$project$Common_sequent$implRN,
									category: _user$project$Common_sequent$Rule4RightFormula,
									rulename: 'R->',
									rule: function (seq) {
										var _p69 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
										if ((((((_p69.ctor === '_Tuple2') && (_p69._0.ctor === '::')) && (_p69._0._0._0.ctor === '_Tuple4')) && (_p69._0._0._0._3.ctor === 'Imply')) && (_p69._0._1.ctor === '[]')) && (_p69._1.ctor === '[]')) {
											var _p72 = _p69._0._0._0._1;
											var _p71 = _p69._0._0._0._0;
											var _p70 = _p69._0._0._0._2;
											var add2 = _user$project$Common_sequent$LabelForm(
												{ctor: '_Tuple4', _0: _p71, _1: _p72, _2: _p70, _3: _p69._0._0._0._3._1});
											var add1 = _user$project$Common_sequent$LabelForm(
												{ctor: '_Tuple4', _0: _p71, _1: _p72, _2: _p70, _3: _p69._0._0._0._3._0});
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														seq,
														{
															leftForm: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add1,
																	_1: {ctor: '[]'}
																},
																seq.leftForm),
															rightForm: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add2,
																	_1: {ctor: '[]'}
																},
																{ctor: '[]'})
														}),
													_1: {ctor: '[]'}
												});
										} else {
											return _elm_lang$core$Maybe$Nothing;
										}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										priority: 99,
										category: _user$project$Common_sequent$Rule4LeftFormula,
										rulename: 'L->2',
										rule: function (seq) {
											var _p73 = seq.leftForm;
											if (((_p73.ctor === '::') && (_p73._0._0.ctor === '_Tuple4')) && (_p73._0._0._3.ctor === 'Imply2')) {
												var _p77 = _p73._1;
												var _p76 = _p73._0._0._2;
												var _p75 = _p73._0._0._0;
												var _p74 = _p73._0._0._1;
												var add2 = _user$project$Common_sequent$LabelForm(
													{ctor: '_Tuple4', _0: _p75, _1: _p74, _2: _p76, _3: _p73._0._0._3._0});
												var add1 = _user$project$Common_sequent$LabelForm(
													{ctor: '_Tuple4', _0: _p75, _1: _p74, _2: _p76, _3: _p73._0._0._3._1});
												return _elm_lang$core$Maybe$Just(
													{
														ctor: '::',
														_0: _elm_lang$core$Native_Utils.update(
															seq,
															{
																leftForm: _p77,
																rightForm: {
																	ctor: '::',
																	_0: add1,
																	_1: {ctor: '[]'}
																},
																rightRel: {ctor: '[]'}
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$core$Native_Utils.update(
																seq,
																{
																	leftForm: A2(
																		_elm_lang$core$Basics_ops['++'],
																		{
																			ctor: '::',
																			_0: add2,
																			_1: {ctor: '[]'}
																		},
																		_p77)
																}),
															_1: {ctor: '[]'}
														}
													});
											} else {
												return _elm_lang$core$Maybe$Nothing;
											}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											priority: _user$project$Common_sequent$implRN,
											category: _user$project$Common_sequent$Rule4RightFormula,
											rulename: 'R->2',
											rule: function (seq) {
												var _p78 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
												if ((((((_p78.ctor === '_Tuple2') && (_p78._0.ctor === '::')) && (_p78._0._0._0.ctor === '_Tuple4')) && (_p78._0._0._0._3.ctor === 'Imply2')) && (_p78._0._1.ctor === '[]')) && (_p78._1.ctor === '[]')) {
													var _p81 = _p78._0._0._0._1;
													var _p80 = _p78._0._0._0._0;
													var _p79 = _p78._0._0._0._2;
													var add2 = _user$project$Common_sequent$LabelForm(
														{ctor: '_Tuple4', _0: _p80, _1: _p81, _2: _p79, _3: _p78._0._0._0._3._0});
													var add1 = _user$project$Common_sequent$LabelForm(
														{ctor: '_Tuple4', _0: _p80, _1: _p81, _2: _p79, _3: _p78._0._0._0._3._1});
													return _elm_lang$core$Maybe$Just(
														{
															ctor: '::',
															_0: _elm_lang$core$Native_Utils.update(
																seq,
																{
																	leftForm: A2(
																		_elm_lang$core$Basics_ops['++'],
																		{
																			ctor: '::',
																			_0: add1,
																			_1: {ctor: '[]'}
																		},
																		seq.leftForm),
																	rightForm: A2(
																		_elm_lang$core$Basics_ops['++'],
																		{
																			ctor: '::',
																			_0: add2,
																			_1: {ctor: '[]'}
																		},
																		{ctor: '[]'})
																}),
															_1: {ctor: '[]'}
														});
												} else {
													return _elm_lang$core$Maybe$Nothing;
												}
											}
										},
										_1: {
											ctor: '::',
											_0: {
												priority: _user$project$Common_sequent$equiLN,
												category: _user$project$Common_sequent$Rule4LeftFormula,
												rulename: 'L<->',
												rule: function (seq) {
													var _p82 = seq.leftForm;
													if (((_p82.ctor === '::') && (_p82._0._0.ctor === '_Tuple4')) && (_p82._0._0._3.ctor === 'Iff')) {
														var _p84 = _p82._0._0._3._1;
														var _p83 = _p82._0._0._3._0;
														var add1 = _user$project$Common_sequent$LabelForm(
															{
																ctor: '_Tuple4',
																_0: _p82._0._0._0,
																_1: _p82._0._0._1,
																_2: _p82._0._0._2,
																_3: A2(
																	_user$project$Common_syntax$And,
																	A2(_user$project$Common_syntax$Imply, _p83, _p84),
																	A2(_user$project$Common_syntax$Imply, _p84, _p83))
															});
														return _elm_lang$core$Maybe$Just(
															{
																ctor: '::',
																_0: _elm_lang$core$Native_Utils.update(
																	seq,
																	{
																		leftForm: A2(
																			_elm_lang$core$Basics_ops['++'],
																			{
																				ctor: '::',
																				_0: add1,
																				_1: {ctor: '[]'}
																			},
																			_p82._1)
																	}),
																_1: {ctor: '[]'}
															});
													} else {
														return _elm_lang$core$Maybe$Nothing;
													}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													priority: _user$project$Common_sequent$equiRN,
													category: _user$project$Common_sequent$Rule4RightFormula,
													rulename: 'R<->',
													rule: function (seq) {
														var _p85 = {ctor: '_Tuple2', _0: seq.rightForm, _1: seq.rightRel};
														if ((((((_p85.ctor === '_Tuple2') && (_p85._0.ctor === '::')) && (_p85._0._0._0.ctor === '_Tuple4')) && (_p85._0._0._0._3.ctor === 'Iff')) && (_p85._0._1.ctor === '[]')) && (_p85._1.ctor === '[]')) {
															var _p87 = _p85._0._0._0._3._1;
															var _p86 = _p85._0._0._0._3._0;
															var add1 = _user$project$Common_sequent$LabelForm(
																{
																	ctor: '_Tuple4',
																	_0: _p85._0._0._0._0,
																	_1: _p85._0._0._0._1,
																	_2: _p85._0._0._0._2,
																	_3: A2(
																		_user$project$Common_syntax$And,
																		A2(_user$project$Common_syntax$Imply, _p86, _p87),
																		A2(_user$project$Common_syntax$Imply, _p87, _p86))
																});
															return _elm_lang$core$Maybe$Just(
																{
																	ctor: '::',
																	_0: _elm_lang$core$Native_Utils.update(
																		seq,
																		{
																			rightForm: A2(
																				_elm_lang$core$Basics_ops['++'],
																				{
																					ctor: '::',
																					_0: add1,
																					_1: {ctor: '[]'}
																				},
																				{ctor: '[]'})
																		}),
																	_1: {ctor: '[]'}
																});
														} else {
															return _elm_lang$core$Maybe$Nothing;
														}
													}
												},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
};

var Elm = {};
Elm['Int_sequent'] = Elm['Int_sequent'] || {};
if (typeof _user$project$Int_sequent$main !== 'undefined') {
    _user$project$Int_sequent$main(Elm['Int_sequent'], 'Int_sequent', undefined);
}

if (typeof define === "function" && define['amd'])
{
  define([], function() { return Elm; });
  return;
}

if (typeof module === "object")
{
  module['exports'] = Elm;
  return;
}

var globalElm = this['Elm'];
if (typeof globalElm === "undefined")
{
  this['Elm'] = Elm;
  return;
}

for (var publicModule in Elm)
{
  if (publicModule in globalElm)
  {
    throw new Error('There are two Elm modules called `' + publicModule + '` on this page! Rename one of them.');
  }
  globalElm[publicModule] = Elm[publicModule];
}

}).call(this);

