
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

var _elm_lang$lazy$Native_Lazy = function() {

function memoize(thunk)
{
    var value;
    var isForced = false;
    return function(tuple0) {
        if (!isForced) {
            value = thunk(tuple0);
            isForced = true;
        }
        return value;
    };
}

return {
    memoize: memoize
};

}();

var _elm_lang$lazy$Lazy$force = function (_p0) {
	var _p1 = _p0;
	return _p1._0(
		{ctor: '_Tuple0'});
};
var _elm_lang$lazy$Lazy$Lazy = function (a) {
	return {ctor: 'Lazy', _0: a};
};
var _elm_lang$lazy$Lazy$lazy = function (thunk) {
	return _elm_lang$lazy$Lazy$Lazy(
		_elm_lang$lazy$Native_Lazy.memoize(thunk));
};
var _elm_lang$lazy$Lazy$map = F2(
	function (f, a) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p2) {
				var _p3 = _p2;
				return f(
					_elm_lang$lazy$Lazy$force(a));
			});
	});
var _elm_lang$lazy$Lazy$map2 = F3(
	function (f, a, b) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p4) {
				var _p5 = _p4;
				return A2(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b));
			});
	});
var _elm_lang$lazy$Lazy$map3 = F4(
	function (f, a, b, c) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p6) {
				var _p7 = _p6;
				return A3(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c));
			});
	});
var _elm_lang$lazy$Lazy$map4 = F5(
	function (f, a, b, c, d) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p8) {
				var _p9 = _p8;
				return A4(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d));
			});
	});
var _elm_lang$lazy$Lazy$map5 = F6(
	function (f, a, b, c, d, e) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p10) {
				var _p11 = _p10;
				return A5(
					f,
					_elm_lang$lazy$Lazy$force(a),
					_elm_lang$lazy$Lazy$force(b),
					_elm_lang$lazy$Lazy$force(c),
					_elm_lang$lazy$Lazy$force(d),
					_elm_lang$lazy$Lazy$force(e));
			});
	});
var _elm_lang$lazy$Lazy$apply = F2(
	function (f, x) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p12) {
				var _p13 = _p12;
				return A2(
					_elm_lang$lazy$Lazy$force,
					f,
					_elm_lang$lazy$Lazy$force(x));
			});
	});
var _elm_lang$lazy$Lazy$andThen = F2(
	function (callback, a) {
		return _elm_lang$lazy$Lazy$lazy(
			function (_p14) {
				var _p15 = _p14;
				return _elm_lang$lazy$Lazy$force(
					callback(
						_elm_lang$lazy$Lazy$force(a)));
			});
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

var _elm_community$parser_combinators$Combine$app = function (p) {
	var _p0 = p;
	if (_p0.ctor === 'Parser') {
		return _p0._0;
	} else {
		return _elm_lang$lazy$Lazy$force(_p0._0);
	}
};
var _elm_community$parser_combinators$Combine$InputStream = F3(
	function (a, b, c) {
		return {data: a, input: b, position: c};
	});
var _elm_community$parser_combinators$Combine$initStream = function (s) {
	return A3(_elm_community$parser_combinators$Combine$InputStream, s, s, 0);
};
var _elm_community$parser_combinators$Combine$runParser = F3(
	function (p, st, s) {
		var _p1 = A3(
			_elm_community$parser_combinators$Combine$app,
			p,
			st,
			_elm_community$parser_combinators$Combine$initStream(s));
		if (_p1._2.ctor === 'Ok') {
			return _elm_lang$core$Result$Ok(
				{ctor: '_Tuple3', _0: _p1._0, _1: _p1._1, _2: _p1._2._0});
		} else {
			return _elm_lang$core$Result$Err(
				{ctor: '_Tuple3', _0: _p1._0, _1: _p1._1, _2: _p1._2._0});
		}
	});
var _elm_community$parser_combinators$Combine$parse = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine$runParser,
		p,
		{ctor: '_Tuple0'});
};
var _elm_community$parser_combinators$Combine$ParseLocation = F3(
	function (a, b, c) {
		return {source: a, line: b, column: c};
	});
var _elm_community$parser_combinators$Combine$currentLocation = function (stream) {
	var find = F3(
		function (position, currentLine, lines) {
			find:
			while (true) {
				var _p2 = lines;
				if (_p2.ctor === '[]') {
					return A3(_elm_community$parser_combinators$Combine$ParseLocation, '', 1, position);
				} else {
					if (_p2._1.ctor === '[]') {
						return A3(_elm_community$parser_combinators$Combine$ParseLocation, _p2._0, currentLine + 1, position);
					} else {
						var _p3 = _p2._0;
						var length = _elm_lang$core$String$length(_p3);
						if (_elm_lang$core$Native_Utils.cmp(position, length) > -1) {
							var _v3 = (position - length) - 1,
								_v4 = currentLine + 1,
								_v5 = _p2._1;
							position = _v3;
							currentLine = _v4;
							lines = _v5;
							continue find;
						} else {
							if (_elm_lang$core$Native_Utils.eq(currentLine, 0)) {
								return A3(_elm_community$parser_combinators$Combine$ParseLocation, _p3, 1, position);
							} else {
								return A3(_elm_community$parser_combinators$Combine$ParseLocation, _p3, currentLine, position - 1);
							}
						}
					}
				}
			}
		});
	return A3(
		find,
		stream.position,
		0,
		A2(_elm_lang$core$String$split, '\n', stream.data));
};
var _elm_community$parser_combinators$Combine$currentSourceLine = function (_p4) {
	return function (_) {
		return _.source;
	}(
		_elm_community$parser_combinators$Combine$currentLocation(_p4));
};
var _elm_community$parser_combinators$Combine$currentLine = function (_p5) {
	return function (_) {
		return _.line;
	}(
		_elm_community$parser_combinators$Combine$currentLocation(_p5));
};
var _elm_community$parser_combinators$Combine$currentColumn = function (_p6) {
	return function (_) {
		return _.column;
	}(
		_elm_community$parser_combinators$Combine$currentLocation(_p6));
};
var _elm_community$parser_combinators$Combine$RecursiveParser = function (a) {
	return {ctor: 'RecursiveParser', _0: a};
};
var _elm_community$parser_combinators$Combine$lazy = function (t) {
	return _elm_community$parser_combinators$Combine$RecursiveParser(
		_elm_lang$lazy$Lazy$lazy(
			function (_p7) {
				var _p8 = _p7;
				return _elm_community$parser_combinators$Combine$app(
					t(
						{ctor: '_Tuple0'}));
			}));
};
var _elm_community$parser_combinators$Combine$Parser = function (a) {
	return {ctor: 'Parser', _0: a};
};
var _elm_community$parser_combinators$Combine$primitive = _elm_community$parser_combinators$Combine$Parser;
var _elm_community$parser_combinators$Combine$bimap = F3(
	function (fok, ferr, p) {
		return _elm_community$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _p9 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
					if (_p9._2.ctor === 'Ok') {
						return {
							ctor: '_Tuple3',
							_0: _p9._0,
							_1: _p9._1,
							_2: _elm_lang$core$Result$Ok(
								fok(_p9._2._0))
						};
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p9._0,
							_1: _p9._1,
							_2: _elm_lang$core$Result$Err(
								ferr(_p9._2._0))
						};
					}
				}));
	});
var _elm_community$parser_combinators$Combine$map = F2(
	function (f, p) {
		return A3(_elm_community$parser_combinators$Combine$bimap, f, _elm_lang$core$Basics$identity, p);
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<$>'] = _elm_community$parser_combinators$Combine$map;
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<$'] = function (res) {
	return _elm_community$parser_combinators$Combine$map(
		_elm_lang$core$Basics$always(res));
};
var _elm_community$parser_combinators$Combine$skip = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		p);
};
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['$>'] = _elm_lang$core$Basics$flip(
	F2(
		function (x, y) {
			return A2(_elm_community$parser_combinators$Combine_ops['<$'], x, y);
		}));
var _elm_community$parser_combinators$Combine$mapError = _elm_community$parser_combinators$Combine$bimap(_elm_lang$core$Basics$identity);
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<?>'] = F2(
	function (p, m) {
		return A2(
			_elm_community$parser_combinators$Combine$mapError,
			_elm_lang$core$Basics$always(
				{
					ctor: '::',
					_0: m,
					_1: {ctor: '[]'}
				}),
			p);
	});
var _elm_community$parser_combinators$Combine$withState = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(state),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$withLocation = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(
						_elm_community$parser_combinators$Combine$currentLocation(stream)),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$withLine = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(
						_elm_community$parser_combinators$Combine$currentLine(stream)),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$withColumn = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					f(
						_elm_community$parser_combinators$Combine$currentColumn(stream)),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$andThen = F2(
	function (f, p) {
		return _elm_community$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _p10 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
					if (_p10._2.ctor === 'Ok') {
						return A3(
							_elm_community$parser_combinators$Combine$app,
							f(_p10._2._0),
							_p10._0,
							_p10._1);
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p10._0,
							_1: _p10._1,
							_2: _elm_lang$core$Result$Err(_p10._2._0)
						};
					}
				}));
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['>>='] = _elm_lang$core$Basics$flip(_elm_community$parser_combinators$Combine$andThen);
var _elm_community$parser_combinators$Combine$andMap = F2(
	function (rp, lp) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['>>='],
			lp,
			A2(_elm_lang$core$Basics$flip, _elm_community$parser_combinators$Combine$map, rp));
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<*>'] = _elm_lang$core$Basics$flip(_elm_community$parser_combinators$Combine$andMap);
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<*'] = F2(
	function (lp, rp) {
		return A2(
			_elm_community$parser_combinators$Combine$andMap,
			rp,
			A2(_elm_community$parser_combinators$Combine$map, _elm_lang$core$Basics$always, lp));
	});
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['*>'] = F2(
	function (lp, rp) {
		return A2(
			_elm_community$parser_combinators$Combine$andMap,
			rp,
			A2(
				_elm_community$parser_combinators$Combine$map,
				_elm_lang$core$Basics$flip(_elm_lang$core$Basics$always),
				lp));
	});
var _elm_community$parser_combinators$Combine$between = F3(
	function (lp, rp, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			A2(_elm_community$parser_combinators$Combine_ops['*>'], lp, p),
			rp);
	});
var _elm_community$parser_combinators$Combine$sequence = function (parsers) {
	var accumulate = F4(
		function (acc, ps, state, stream) {
			accumulate:
			while (true) {
				var _p11 = ps;
				if (_p11.ctor === '[]') {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(
							_elm_lang$core$List$reverse(acc))
					};
				} else {
					var _p12 = A3(_elm_community$parser_combinators$Combine$app, _p11._0, state, stream);
					if (_p12._2.ctor === 'Ok') {
						var _v11 = {ctor: '::', _0: _p12._2._0, _1: acc},
							_v12 = _p11._1,
							_v13 = _p12._0,
							_v14 = _p12._1;
						acc = _v11;
						ps = _v12;
						state = _v13;
						stream = _v14;
						continue accumulate;
					} else {
						return {
							ctor: '_Tuple3',
							_0: _p12._0,
							_1: _p12._1,
							_2: _elm_lang$core$Result$Err(_p12._2._0)
						};
					}
				}
			}
		});
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A4(
					accumulate,
					{ctor: '[]'},
					parsers,
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$fail = function (m) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return {
					ctor: '_Tuple3',
					_0: state,
					_1: stream,
					_2: _elm_lang$core$Result$Err(
						{
							ctor: '::',
							_0: m,
							_1: {ctor: '[]'}
						})
				};
			}));
};
var _elm_community$parser_combinators$Combine$emptyErr = _elm_community$parser_combinators$Combine$Parser(
	F2(
		function (state, stream) {
			return {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Err(
					{ctor: '[]'})
			};
		}));
var _elm_community$parser_combinators$Combine$succeed = function (res) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return {
					ctor: '_Tuple3',
					_0: state,
					_1: stream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _elm_community$parser_combinators$Combine$putState = function (state) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (_p13, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					_elm_community$parser_combinators$Combine$succeed(
						{ctor: '_Tuple0'}),
					state,
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$modifyState = function (f) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return A3(
					_elm_community$parser_combinators$Combine$app,
					_elm_community$parser_combinators$Combine$succeed(
						{ctor: '_Tuple0'}),
					f(state),
					stream);
			}));
};
var _elm_community$parser_combinators$Combine$count = F2(
	function (n, p) {
		var accumulate = F2(
			function (x, acc) {
				return (_elm_lang$core$Native_Utils.cmp(x, 0) < 1) ? _elm_community$parser_combinators$Combine$succeed(
					_elm_lang$core$List$reverse(acc)) : A2(
					_elm_community$parser_combinators$Combine$andThen,
					function (res) {
						return A2(
							accumulate,
							x - 1,
							{ctor: '::', _0: res, _1: acc});
					},
					p);
			});
		return A2(
			accumulate,
			n,
			{ctor: '[]'});
	});
var _elm_community$parser_combinators$Combine$string = function (s) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				if (A2(_elm_lang$core$String$startsWith, s, stream.input)) {
					var len = _elm_lang$core$String$length(s);
					var rem = A2(_elm_lang$core$String$dropLeft, len, stream.input);
					var pos = stream.position + len;
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: rem, position: pos}),
						_2: _elm_lang$core$Result$Ok(s)
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									'expected ',
									_elm_lang$core$Basics$toString(s)),
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _elm_community$parser_combinators$Combine$parens = A2(
	_elm_community$parser_combinators$Combine$between,
	_elm_community$parser_combinators$Combine$string('('),
	_elm_community$parser_combinators$Combine$string(')'));
var _elm_community$parser_combinators$Combine$braces = A2(
	_elm_community$parser_combinators$Combine$between,
	_elm_community$parser_combinators$Combine$string('{'),
	_elm_community$parser_combinators$Combine$string('}'));
var _elm_community$parser_combinators$Combine$brackets = A2(
	_elm_community$parser_combinators$Combine$between,
	_elm_community$parser_combinators$Combine$string('['),
	_elm_community$parser_combinators$Combine$string(']'));
var _elm_community$parser_combinators$Combine$regex = function (pat) {
	var pattern = A2(_elm_lang$core$String$startsWith, '^', pat) ? pat : A2(_elm_lang$core$Basics_ops['++'], '^', pat);
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p14 = A3(
					_elm_lang$core$Regex$find,
					_elm_lang$core$Regex$AtMost(1),
					_elm_lang$core$Regex$regex(pattern),
					stream.input);
				if ((_p14.ctor === '::') && (_p14._1.ctor === '[]')) {
					var _p15 = _p14._0;
					var len = _elm_lang$core$String$length(_p15.match);
					var rem = A2(_elm_lang$core$String$dropLeft, len, stream.input);
					var pos = stream.position + len;
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: _elm_lang$core$Native_Utils.update(
							stream,
							{input: rem, position: pos}),
						_2: _elm_lang$core$Result$Ok(_p15.match)
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Err(
							{
								ctor: '::',
								_0: A2(
									_elm_lang$core$Basics_ops['++'],
									'expected input matching Regexp /',
									A2(_elm_lang$core$Basics_ops['++'], pattern, '/')),
								_1: {ctor: '[]'}
							})
					};
				}
			}));
};
var _elm_community$parser_combinators$Combine$whitespace = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine$regex('[ \t\r\n]*'),
	'whitespace');
var _elm_community$parser_combinators$Combine$whitespace1 = A2(
	_elm_community$parser_combinators$Combine_ops['<?>'],
	_elm_community$parser_combinators$Combine$regex('[ \t\r\n]+'),
	'whitespace');
var _elm_community$parser_combinators$Combine$while = function (pred) {
	var accumulate = F3(
		function (acc, state, stream) {
			accumulate:
			while (true) {
				var _p16 = _elm_lang$core$String$uncons(stream.input);
				if (_p16.ctor === 'Just') {
					var _p17 = _p16._0._0;
					if (pred(_p17)) {
						var pos = stream.position + 1;
						var c = A2(_elm_lang$core$String$cons, _p17, '');
						var _v17 = A2(_elm_lang$core$Basics_ops['++'], acc, c),
							_v18 = state,
							_v19 = _elm_lang$core$Native_Utils.update(
							stream,
							{input: _p16._0._1, position: pos});
						acc = _v17;
						state = _v18;
						stream = _v19;
						continue accumulate;
					} else {
						return {ctor: '_Tuple3', _0: state, _1: stream, _2: acc};
					}
				} else {
					return {ctor: '_Tuple3', _0: state, _1: stream, _2: acc};
				}
			}
		});
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p18 = A3(accumulate, '', state, stream);
				var rstate = _p18._0;
				var rstream = _p18._1;
				var res = _p18._2;
				return {
					ctor: '_Tuple3',
					_0: rstate,
					_1: rstream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _elm_community$parser_combinators$Combine$end = _elm_community$parser_combinators$Combine$Parser(
	F2(
		function (state, stream) {
			return _elm_lang$core$Native_Utils.eq(stream.input, '') ? {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Ok(
					{ctor: '_Tuple0'})
			} : {
				ctor: '_Tuple3',
				_0: state,
				_1: stream,
				_2: _elm_lang$core$Result$Err(
					{
						ctor: '::',
						_0: 'expected end of input',
						_1: {ctor: '[]'}
					})
			};
		}));
var _elm_community$parser_combinators$Combine$lookAhead = function (p) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p19 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
				if ((_p19.ctor === '_Tuple3') && (_p19._2.ctor === 'Ok')) {
					return {
						ctor: '_Tuple3',
						_0: _p19._0,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(_p19._2._0)
					};
				} else {
					return _p19;
				}
			}));
};
var _elm_community$parser_combinators$Combine$or = F2(
	function (lp, rp) {
		return _elm_community$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _p20 = A3(_elm_community$parser_combinators$Combine$app, lp, state, stream);
					if (_p20._2.ctor === 'Ok') {
						return _p20;
					} else {
						var _p21 = A3(_elm_community$parser_combinators$Combine$app, rp, state, stream);
						if (_p21._2.ctor === 'Ok') {
							return _p21;
						} else {
							return {
								ctor: '_Tuple3',
								_0: state,
								_1: stream,
								_2: _elm_lang$core$Result$Err(
									A2(_elm_lang$core$Basics_ops['++'], _p20._2._0, _p21._2._0))
							};
						}
					}
				}));
	});
var _elm_community$parser_combinators$Combine$choice = function (xs) {
	return A3(_elm_lang$core$List$foldr, _elm_community$parser_combinators$Combine$or, _elm_community$parser_combinators$Combine$emptyErr, xs);
};
var _elm_community$parser_combinators$Combine_ops = _elm_community$parser_combinators$Combine_ops || {};
_elm_community$parser_combinators$Combine_ops['<|>'] = _elm_community$parser_combinators$Combine$or;
var _elm_community$parser_combinators$Combine$optional = F2(
	function (res, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			p,
			_elm_community$parser_combinators$Combine$succeed(res));
	});
var _elm_community$parser_combinators$Combine$chainl = F2(
	function (op, p) {
		var accumulate = function (x) {
			return A2(
				_elm_community$parser_combinators$Combine_ops['<|>'],
				A2(
					_elm_community$parser_combinators$Combine$andThen,
					function (f) {
						return A2(
							_elm_community$parser_combinators$Combine$andThen,
							function (y) {
								return accumulate(
									A2(f, x, y));
							},
							p);
					},
					op),
				_elm_community$parser_combinators$Combine$succeed(x));
		};
		return A2(_elm_community$parser_combinators$Combine$andThen, accumulate, p);
	});
var _elm_community$parser_combinators$Combine$chainr = F2(
	function (op, p) {
		var accumulate = function (x) {
			return A2(
				_elm_community$parser_combinators$Combine_ops['<|>'],
				A2(
					_elm_community$parser_combinators$Combine$andThen,
					function (f) {
						return A2(
							_elm_community$parser_combinators$Combine$andThen,
							function (y) {
								return _elm_community$parser_combinators$Combine$succeed(
									A2(f, x, y));
							},
							A2(_elm_community$parser_combinators$Combine$andThen, accumulate, p));
					},
					op),
				_elm_community$parser_combinators$Combine$succeed(x));
		};
		return A2(_elm_community$parser_combinators$Combine$andThen, accumulate, p);
	});
var _elm_community$parser_combinators$Combine$maybe = function (p) {
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p22 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
				if ((_p22.ctor === '_Tuple3') && (_p22._2.ctor === 'Ok')) {
					return {
						ctor: '_Tuple3',
						_0: _p22._0,
						_1: _p22._1,
						_2: _elm_lang$core$Result$Ok(
							_elm_lang$core$Maybe$Just(_p22._2._0))
					};
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$Result$Ok(_elm_lang$core$Maybe$Nothing)
					};
				}
			}));
};
var _elm_community$parser_combinators$Combine$many = function (p) {
	var accumulate = F3(
		function (acc, state, stream) {
			accumulate:
			while (true) {
				var _p23 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
				if ((_p23.ctor === '_Tuple3') && (_p23._2.ctor === 'Ok')) {
					var _p25 = _p23._1;
					var _p24 = _p23._0;
					if (_elm_lang$core$Native_Utils.eq(stream, _p25)) {
						return {
							ctor: '_Tuple3',
							_0: _p24,
							_1: _p25,
							_2: _elm_lang$core$List$reverse(acc)
						};
					} else {
						var _v25 = {ctor: '::', _0: _p23._2._0, _1: acc},
							_v26 = _p24,
							_v27 = _p25;
						acc = _v25;
						state = _v26;
						stream = _v27;
						continue accumulate;
					}
				} else {
					return {
						ctor: '_Tuple3',
						_0: state,
						_1: stream,
						_2: _elm_lang$core$List$reverse(acc)
					};
				}
			}
		});
	return _elm_community$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _p26 = A3(
					accumulate,
					{ctor: '[]'},
					state,
					stream);
				var rstate = _p26._0;
				var rstream = _p26._1;
				var res = _p26._2;
				return {
					ctor: '_Tuple3',
					_0: rstate,
					_1: rstream,
					_2: _elm_lang$core$Result$Ok(res)
				};
			}));
};
var _elm_community$parser_combinators$Combine$many1 = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<*>'],
		A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			F2(
				function (x, y) {
					return {ctor: '::', _0: x, _1: y};
				}),
			p),
		_elm_community$parser_combinators$Combine$many(p));
};
var _elm_community$parser_combinators$Combine$skipMany1 = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		_elm_community$parser_combinators$Combine$many1(
			_elm_community$parser_combinators$Combine$skip(p)));
};
var _elm_community$parser_combinators$Combine$sepBy1 = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				F2(
					function (x, y) {
						return {ctor: '::', _0: x, _1: y};
					}),
				p),
			_elm_community$parser_combinators$Combine$many(
				A2(_elm_community$parser_combinators$Combine_ops['*>'], sep, p)));
	});
var _elm_community$parser_combinators$Combine$sepBy = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			A2(_elm_community$parser_combinators$Combine$sepBy1, sep, p),
			_elm_community$parser_combinators$Combine$succeed(
				{ctor: '[]'}));
	});
var _elm_community$parser_combinators$Combine$sepEndBy1 = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*'],
			A2(_elm_community$parser_combinators$Combine$sepBy1, sep, p),
			_elm_community$parser_combinators$Combine$maybe(sep));
	});
var _elm_community$parser_combinators$Combine$sepEndBy = F2(
	function (sep, p) {
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			A2(_elm_community$parser_combinators$Combine$sepEndBy1, sep, p),
			_elm_community$parser_combinators$Combine$succeed(
				{ctor: '[]'}));
	});
var _elm_community$parser_combinators$Combine$skipMany = function (p) {
	return A2(
		_elm_community$parser_combinators$Combine_ops['<$'],
		{ctor: '_Tuple0'},
		_elm_community$parser_combinators$Combine$many(
			_elm_community$parser_combinators$Combine$skip(p)));
};
var _elm_community$parser_combinators$Combine$manyTill = F2(
	function (p, end) {
		var accumulate = F3(
			function (acc, state, stream) {
				accumulate:
				while (true) {
					var _p27 = A3(_elm_community$parser_combinators$Combine$app, end, state, stream);
					if (_p27._2.ctor === 'Ok') {
						return {
							ctor: '_Tuple3',
							_0: _p27._0,
							_1: _p27._1,
							_2: _elm_lang$core$Result$Ok(
								_elm_lang$core$List$reverse(acc))
						};
					} else {
						var _p28 = A3(_elm_community$parser_combinators$Combine$app, p, state, stream);
						if ((_p28.ctor === '_Tuple3') && (_p28._2.ctor === 'Ok')) {
							var _v30 = {ctor: '::', _0: _p28._2._0, _1: acc},
								_v31 = _p28._0,
								_v32 = _p28._1;
							acc = _v30;
							state = _v31;
							stream = _v32;
							continue accumulate;
						} else {
							return {
								ctor: '_Tuple3',
								_0: _p27._0,
								_1: _p27._1,
								_2: _elm_lang$core$Result$Err(_p27._2._0)
							};
						}
					}
				}
			});
		return _elm_community$parser_combinators$Combine$Parser(
			accumulate(
				{ctor: '[]'}));
	});

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

//import Maybe, Native.Array, Native.List, Native.Utils, Result //

var _elm_lang$core$Native_Json = function() {


// CORE DECODERS

function succeed(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'succeed',
		msg: msg
	};
}

function fail(msg)
{
	return {
		ctor: '<decoder>',
		tag: 'fail',
		msg: msg
	};
}

function decodePrimitive(tag)
{
	return {
		ctor: '<decoder>',
		tag: tag
	};
}

function decodeContainer(tag, decoder)
{
	return {
		ctor: '<decoder>',
		tag: tag,
		decoder: decoder
	};
}

function decodeNull(value)
{
	return {
		ctor: '<decoder>',
		tag: 'null',
		value: value
	};
}

function decodeField(field, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'field',
		field: field,
		decoder: decoder
	};
}

function decodeIndex(index, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'index',
		index: index,
		decoder: decoder
	};
}

function decodeKeyValuePairs(decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'key-value',
		decoder: decoder
	};
}

function mapMany(f, decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'map-many',
		func: f,
		decoders: decoders
	};
}

function andThen(callback, decoder)
{
	return {
		ctor: '<decoder>',
		tag: 'andThen',
		decoder: decoder,
		callback: callback
	};
}

function oneOf(decoders)
{
	return {
		ctor: '<decoder>',
		tag: 'oneOf',
		decoders: decoders
	};
}


// DECODING OBJECTS

function map1(f, d1)
{
	return mapMany(f, [d1]);
}

function map2(f, d1, d2)
{
	return mapMany(f, [d1, d2]);
}

function map3(f, d1, d2, d3)
{
	return mapMany(f, [d1, d2, d3]);
}

function map4(f, d1, d2, d3, d4)
{
	return mapMany(f, [d1, d2, d3, d4]);
}

function map5(f, d1, d2, d3, d4, d5)
{
	return mapMany(f, [d1, d2, d3, d4, d5]);
}

function map6(f, d1, d2, d3, d4, d5, d6)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6]);
}

function map7(f, d1, d2, d3, d4, d5, d6, d7)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
}

function map8(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
}


// DECODE HELPERS

function ok(value)
{
	return { tag: 'ok', value: value };
}

function badPrimitive(type, value)
{
	return { tag: 'primitive', type: type, value: value };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badField(field, nestedProblems)
{
	return { tag: 'field', field: field, rest: nestedProblems };
}

function badIndex(index, nestedProblems)
{
	return { tag: 'index', index: index, rest: nestedProblems };
}

function badOneOf(problems)
{
	return { tag: 'oneOf', problems: problems };
}

function bad(msg)
{
	return { tag: 'fail', msg: msg };
}

function badToString(problem)
{
	var context = '_';
	while (problem)
	{
		switch (problem.tag)
		{
			case 'primitive':
				return 'Expecting ' + problem.type
					+ (context === '_' ? '' : ' at ' + context)
					+ ' but instead got: ' + jsToString(problem.value);

			case 'index':
				context += '[' + problem.index + ']';
				problem = problem.rest;
				break;

			case 'field':
				context += '.' + problem.field;
				problem = problem.rest;
				break;

			case 'oneOf':
				var problems = problem.problems;
				for (var i = 0; i < problems.length; i++)
				{
					problems[i] = badToString(problems[i]);
				}
				return 'I ran into the following problems'
					+ (context === '_' ? '' : ' at ' + context)
					+ ':\n\n' + problems.join('\n');

			case 'fail':
				return 'I ran into a `fail` decoder'
					+ (context === '_' ? '' : ' at ' + context)
					+ ': ' + problem.msg;
		}
	}
}

function jsToString(value)
{
	return value === undefined
		? 'undefined'
		: JSON.stringify(value);
}


// DECODE

function runOnString(decoder, string)
{
	var json;
	try
	{
		json = JSON.parse(string);
	}
	catch (e)
	{
		return _elm_lang$core$Result$Err('Given an invalid JSON: ' + e.message);
	}
	return run(decoder, json);
}

function run(decoder, value)
{
	var result = runHelp(decoder, value);
	return (result.tag === 'ok')
		? _elm_lang$core$Result$Ok(result.value)
		: _elm_lang$core$Result$Err(badToString(result));
}

function runHelp(decoder, value)
{
	switch (decoder.tag)
	{
		case 'bool':
			return (typeof value === 'boolean')
				? ok(value)
				: badPrimitive('a Bool', value);

		case 'int':
			if (typeof value !== 'number') {
				return badPrimitive('an Int', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return ok(value);
			}

			return badPrimitive('an Int', value);

		case 'float':
			return (typeof value === 'number')
				? ok(value)
				: badPrimitive('a Float', value);

		case 'string':
			return (typeof value === 'string')
				? ok(value)
				: (value instanceof String)
					? ok(value + '')
					: badPrimitive('a String', value);

		case 'null':
			return (value === null)
				? ok(decoder.value)
				: badPrimitive('null', value);

		case 'value':
			return ok(value);

		case 'list':
			if (!(value instanceof Array))
			{
				return badPrimitive('a List', value);
			}

			var list = _elm_lang$core$Native_List.Nil;
			for (var i = value.length; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result)
				}
				list = _elm_lang$core$Native_List.Cons(result.value, list);
			}
			return ok(list);

		case 'array':
			if (!(value instanceof Array))
			{
				return badPrimitive('an Array', value);
			}

			var len = value.length;
			var array = new Array(len);
			for (var i = len; i--; )
			{
				var result = runHelp(decoder.decoder, value[i]);
				if (result.tag !== 'ok')
				{
					return badIndex(i, result);
				}
				array[i] = result.value;
			}
			return ok(_elm_lang$core$Native_Array.fromJSArray(array));

		case 'maybe':
			var result = runHelp(decoder.decoder, value);
			return (result.tag === 'ok')
				? ok(_elm_lang$core$Maybe$Just(result.value))
				: ok(_elm_lang$core$Maybe$Nothing);

		case 'field':
			var field = decoder.field;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return badPrimitive('an object with a field named `' + field + '`', value);
			}

			var result = runHelp(decoder.decoder, value[field]);
			return (result.tag === 'ok') ? result : badField(field, result);

		case 'index':
			var index = decoder.index;
			if (!(value instanceof Array))
			{
				return badPrimitive('an array', value);
			}
			if (index >= value.length)
			{
				return badPrimitive('a longer array. Need index ' + index + ' but there are only ' + value.length + ' entries', value);
			}

			var result = runHelp(decoder.decoder, value[index]);
			return (result.tag === 'ok') ? result : badIndex(index, result);

		case 'key-value':
			if (typeof value !== 'object' || value === null || value instanceof Array)
			{
				return badPrimitive('an object', value);
			}

			var keyValuePairs = _elm_lang$core$Native_List.Nil;
			for (var key in value)
			{
				var result = runHelp(decoder.decoder, value[key]);
				if (result.tag !== 'ok')
				{
					return badField(key, result);
				}
				var pair = _elm_lang$core$Native_Utils.Tuple2(key, result.value);
				keyValuePairs = _elm_lang$core$Native_List.Cons(pair, keyValuePairs);
			}
			return ok(keyValuePairs);

		case 'map-many':
			var answer = decoder.func;
			var decoders = decoder.decoders;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = runHelp(decoders[i], value);
				if (result.tag !== 'ok')
				{
					return result;
				}
				answer = answer(result.value);
			}
			return ok(answer);

		case 'andThen':
			var result = runHelp(decoder.decoder, value);
			return (result.tag !== 'ok')
				? result
				: runHelp(decoder.callback(result.value), value);

		case 'oneOf':
			var errors = [];
			var temp = decoder.decoders;
			while (temp.ctor !== '[]')
			{
				var result = runHelp(temp._0, value);

				if (result.tag === 'ok')
				{
					return result;
				}

				errors.push(result);

				temp = temp._1;
			}
			return badOneOf(errors);

		case 'fail':
			return bad(decoder.msg);

		case 'succeed':
			return ok(decoder.msg);
	}
}


// EQUALITY

function equality(a, b)
{
	if (a === b)
	{
		return true;
	}

	if (a.tag !== b.tag)
	{
		return false;
	}

	switch (a.tag)
	{
		case 'succeed':
		case 'fail':
			return a.msg === b.msg;

		case 'bool':
		case 'int':
		case 'float':
		case 'string':
		case 'value':
			return true;

		case 'null':
			return a.value === b.value;

		case 'list':
		case 'array':
		case 'maybe':
		case 'key-value':
			return equality(a.decoder, b.decoder);

		case 'field':
			return a.field === b.field && equality(a.decoder, b.decoder);

		case 'index':
			return a.index === b.index && equality(a.decoder, b.decoder);

		case 'map-many':
			if (a.func !== b.func)
			{
				return false;
			}
			return listEquality(a.decoders, b.decoders);

		case 'andThen':
			return a.callback === b.callback && equality(a.decoder, b.decoder);

		case 'oneOf':
			return listEquality(a.decoders, b.decoders);
	}
}

function listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

function encode(indentLevel, value)
{
	return JSON.stringify(value, null, indentLevel);
}

function identity(value)
{
	return value;
}

function encodeObject(keyValuePairs)
{
	var obj = {};
	while (keyValuePairs.ctor !== '[]')
	{
		var pair = keyValuePairs._0;
		obj[pair._0] = pair._1;
		keyValuePairs = keyValuePairs._1;
	}
	return obj;
}

return {
	encode: F2(encode),
	runOnString: F2(runOnString),
	run: F2(run),

	decodeNull: decodeNull,
	decodePrimitive: decodePrimitive,
	decodeContainer: F2(decodeContainer),

	decodeField: F2(decodeField),
	decodeIndex: F2(decodeIndex),

	map1: F2(map1),
	map2: F3(map2),
	map3: F4(map3),
	map4: F5(map4),
	map5: F6(map5),
	map6: F7(map6),
	map7: F8(map7),
	map8: F9(map8),
	decodeKeyValuePairs: decodeKeyValuePairs,

	andThen: F2(andThen),
	fail: fail,
	succeed: succeed,
	oneOf: oneOf,

	identity: identity,
	encodeNull: null,
	encodeArray: _elm_lang$core$Native_Array.toJSArray,
	encodeList: _elm_lang$core$Native_List.toArray,
	encodeObject: encodeObject,

	equality: equality
};

}();

var _elm_lang$core$Json_Encode$list = _elm_lang$core$Native_Json.encodeList;
var _elm_lang$core$Json_Encode$array = _elm_lang$core$Native_Json.encodeArray;
var _elm_lang$core$Json_Encode$object = _elm_lang$core$Native_Json.encodeObject;
var _elm_lang$core$Json_Encode$null = _elm_lang$core$Native_Json.encodeNull;
var _elm_lang$core$Json_Encode$bool = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$float = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$int = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$string = _elm_lang$core$Native_Json.identity;
var _elm_lang$core$Json_Encode$encode = _elm_lang$core$Native_Json.encode;
var _elm_lang$core$Json_Encode$Value = {ctor: 'Value'};

var _elm_lang$core$Json_Decode$null = _elm_lang$core$Native_Json.decodeNull;
var _elm_lang$core$Json_Decode$value = _elm_lang$core$Native_Json.decodePrimitive('value');
var _elm_lang$core$Json_Decode$andThen = _elm_lang$core$Native_Json.andThen;
var _elm_lang$core$Json_Decode$fail = _elm_lang$core$Native_Json.fail;
var _elm_lang$core$Json_Decode$succeed = _elm_lang$core$Native_Json.succeed;
var _elm_lang$core$Json_Decode$lazy = function (thunk) {
	return A2(
		_elm_lang$core$Json_Decode$andThen,
		thunk,
		_elm_lang$core$Json_Decode$succeed(
			{ctor: '_Tuple0'}));
};
var _elm_lang$core$Json_Decode$decodeValue = _elm_lang$core$Native_Json.run;
var _elm_lang$core$Json_Decode$decodeString = _elm_lang$core$Native_Json.runOnString;
var _elm_lang$core$Json_Decode$map8 = _elm_lang$core$Native_Json.map8;
var _elm_lang$core$Json_Decode$map7 = _elm_lang$core$Native_Json.map7;
var _elm_lang$core$Json_Decode$map6 = _elm_lang$core$Native_Json.map6;
var _elm_lang$core$Json_Decode$map5 = _elm_lang$core$Native_Json.map5;
var _elm_lang$core$Json_Decode$map4 = _elm_lang$core$Native_Json.map4;
var _elm_lang$core$Json_Decode$map3 = _elm_lang$core$Native_Json.map3;
var _elm_lang$core$Json_Decode$map2 = _elm_lang$core$Native_Json.map2;
var _elm_lang$core$Json_Decode$map = _elm_lang$core$Native_Json.map1;
var _elm_lang$core$Json_Decode$oneOf = _elm_lang$core$Native_Json.oneOf;
var _elm_lang$core$Json_Decode$maybe = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'maybe', decoder);
};
var _elm_lang$core$Json_Decode$index = _elm_lang$core$Native_Json.decodeIndex;
var _elm_lang$core$Json_Decode$field = _elm_lang$core$Native_Json.decodeField;
var _elm_lang$core$Json_Decode$at = F2(
	function (fields, decoder) {
		return A3(_elm_lang$core$List$foldr, _elm_lang$core$Json_Decode$field, decoder, fields);
	});
var _elm_lang$core$Json_Decode$keyValuePairs = _elm_lang$core$Native_Json.decodeKeyValuePairs;
var _elm_lang$core$Json_Decode$dict = function (decoder) {
	return A2(
		_elm_lang$core$Json_Decode$map,
		_elm_lang$core$Dict$fromList,
		_elm_lang$core$Json_Decode$keyValuePairs(decoder));
};
var _elm_lang$core$Json_Decode$array = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'array', decoder);
};
var _elm_lang$core$Json_Decode$list = function (decoder) {
	return A2(_elm_lang$core$Native_Json.decodeContainer, 'list', decoder);
};
var _elm_lang$core$Json_Decode$nullable = function (decoder) {
	return _elm_lang$core$Json_Decode$oneOf(
		{
			ctor: '::',
			_0: _elm_lang$core$Json_Decode$null(_elm_lang$core$Maybe$Nothing),
			_1: {
				ctor: '::',
				_0: A2(_elm_lang$core$Json_Decode$map, _elm_lang$core$Maybe$Just, decoder),
				_1: {ctor: '[]'}
			}
		});
};
var _elm_lang$core$Json_Decode$float = _elm_lang$core$Native_Json.decodePrimitive('float');
var _elm_lang$core$Json_Decode$int = _elm_lang$core$Native_Json.decodePrimitive('int');
var _elm_lang$core$Json_Decode$bool = _elm_lang$core$Native_Json.decodePrimitive('bool');
var _elm_lang$core$Json_Decode$string = _elm_lang$core$Native_Json.decodePrimitive('string');
var _elm_lang$core$Json_Decode$Decoder = {ctor: 'Decoder'};

var _elm_lang$virtual_dom$VirtualDom_Debug$wrap;
var _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags;

var _elm_lang$virtual_dom$Native_VirtualDom = function() {

var STYLE_KEY = 'STYLE';
var EVENT_KEY = 'EVENT';
var ATTR_KEY = 'ATTR';
var ATTR_NS_KEY = 'ATTR_NS';

var localDoc = typeof document !== 'undefined' ? document : {};


////////////  VIRTUAL DOM NODES  ////////////


function text(string)
{
	return {
		type: 'text',
		text: string
	};
}


function node(tag)
{
	return F2(function(factList, kidList) {
		return nodeHelp(tag, factList, kidList);
	});
}


function nodeHelp(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function keyedNode(tag, factList, kidList)
{
	var organized = organizeFacts(factList);
	var namespace = organized.namespace;
	var facts = organized.facts;

	var children = [];
	var descendantsCount = 0;
	while (kidList.ctor !== '[]')
	{
		var kid = kidList._0;
		descendantsCount += (kid._1.descendantsCount || 0);
		children.push(kid);
		kidList = kidList._1;
	}
	descendantsCount += children.length;

	return {
		type: 'keyed-node',
		tag: tag,
		facts: facts,
		children: children,
		namespace: namespace,
		descendantsCount: descendantsCount
	};
}


function custom(factList, model, impl)
{
	var facts = organizeFacts(factList).facts;

	return {
		type: 'custom',
		facts: facts,
		model: model,
		impl: impl
	};
}


function map(tagger, node)
{
	return {
		type: 'tagger',
		tagger: tagger,
		node: node,
		descendantsCount: 1 + (node.descendantsCount || 0)
	};
}


function thunk(func, args, thunk)
{
	return {
		type: 'thunk',
		func: func,
		args: args,
		thunk: thunk,
		node: undefined
	};
}

function lazy(fn, a)
{
	return thunk(fn, [a], function() {
		return fn(a);
	});
}

function lazy2(fn, a, b)
{
	return thunk(fn, [a,b], function() {
		return A2(fn, a, b);
	});
}

function lazy3(fn, a, b, c)
{
	return thunk(fn, [a,b,c], function() {
		return A3(fn, a, b, c);
	});
}



// FACTS


function organizeFacts(factList)
{
	var namespace, facts = {};

	while (factList.ctor !== '[]')
	{
		var entry = factList._0;
		var key = entry.key;

		if (key === ATTR_KEY || key === ATTR_NS_KEY || key === EVENT_KEY)
		{
			var subFacts = facts[key] || {};
			subFacts[entry.realKey] = entry.value;
			facts[key] = subFacts;
		}
		else if (key === STYLE_KEY)
		{
			var styles = facts[key] || {};
			var styleList = entry.value;
			while (styleList.ctor !== '[]')
			{
				var style = styleList._0;
				styles[style._0] = style._1;
				styleList = styleList._1;
			}
			facts[key] = styles;
		}
		else if (key === 'namespace')
		{
			namespace = entry.value;
		}
		else if (key === 'className')
		{
			var classes = facts[key];
			facts[key] = typeof classes === 'undefined'
				? entry.value
				: classes + ' ' + entry.value;
		}
 		else
		{
			facts[key] = entry.value;
		}
		factList = factList._1;
	}

	return {
		facts: facts,
		namespace: namespace
	};
}



////////////  PROPERTIES AND ATTRIBUTES  ////////////


function style(value)
{
	return {
		key: STYLE_KEY,
		value: value
	};
}


function property(key, value)
{
	return {
		key: key,
		value: value
	};
}


function attribute(key, value)
{
	return {
		key: ATTR_KEY,
		realKey: key,
		value: value
	};
}


function attributeNS(namespace, key, value)
{
	return {
		key: ATTR_NS_KEY,
		realKey: key,
		value: {
			value: value,
			namespace: namespace
		}
	};
}


function on(name, options, decoder)
{
	return {
		key: EVENT_KEY,
		realKey: name,
		value: {
			options: options,
			decoder: decoder
		}
	};
}


function equalEvents(a, b)
{
	if (a.options !== b.options)
	{
		if (a.options.stopPropagation !== b.options.stopPropagation || a.options.preventDefault !== b.options.preventDefault)
		{
			return false;
		}
	}
	return _elm_lang$core$Native_Json.equality(a.decoder, b.decoder);
}


function mapProperty(func, property)
{
	if (property.key !== EVENT_KEY)
	{
		return property;
	}
	return on(
		property.realKey,
		property.value.options,
		A2(_elm_lang$core$Json_Decode$map, func, property.value.decoder)
	);
}


////////////  RENDER  ////////////


function render(vNode, eventNode)
{
	switch (vNode.type)
	{
		case 'thunk':
			if (!vNode.node)
			{
				vNode.node = vNode.thunk();
			}
			return render(vNode.node, eventNode);

		case 'tagger':
			var subNode = vNode.node;
			var tagger = vNode.tagger;

			while (subNode.type === 'tagger')
			{
				typeof tagger !== 'object'
					? tagger = [tagger, subNode.tagger]
					: tagger.push(subNode.tagger);

				subNode = subNode.node;
			}

			var subEventRoot = { tagger: tagger, parent: eventNode };
			var domNode = render(subNode, subEventRoot);
			domNode.elm_event_node_ref = subEventRoot;
			return domNode;

		case 'text':
			return localDoc.createTextNode(vNode.text);

		case 'node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i], eventNode));
			}

			return domNode;

		case 'keyed-node':
			var domNode = vNode.namespace
				? localDoc.createElementNS(vNode.namespace, vNode.tag)
				: localDoc.createElement(vNode.tag);

			applyFacts(domNode, eventNode, vNode.facts);

			var children = vNode.children;

			for (var i = 0; i < children.length; i++)
			{
				domNode.appendChild(render(children[i]._1, eventNode));
			}

			return domNode;

		case 'custom':
			var domNode = vNode.impl.render(vNode.model);
			applyFacts(domNode, eventNode, vNode.facts);
			return domNode;
	}
}



////////////  APPLY FACTS  ////////////


function applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		switch (key)
		{
			case STYLE_KEY:
				applyStyles(domNode, value);
				break;

			case EVENT_KEY:
				applyEvents(domNode, eventNode, value);
				break;

			case ATTR_KEY:
				applyAttrs(domNode, value);
				break;

			case ATTR_NS_KEY:
				applyAttrsNS(domNode, value);
				break;

			case 'value':
				if (domNode[key] !== value)
				{
					domNode[key] = value;
				}
				break;

			default:
				domNode[key] = value;
				break;
		}
	}
}

function applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}

function applyEvents(domNode, eventNode, events)
{
	var allHandlers = domNode.elm_handlers || {};

	for (var key in events)
	{
		var handler = allHandlers[key];
		var value = events[key];

		if (typeof value === 'undefined')
		{
			domNode.removeEventListener(key, handler);
			allHandlers[key] = undefined;
		}
		else if (typeof handler === 'undefined')
		{
			var handler = makeEventHandler(eventNode, value);
			domNode.addEventListener(key, handler);
			allHandlers[key] = handler;
		}
		else
		{
			handler.info = value;
		}
	}

	domNode.elm_handlers = allHandlers;
}

function makeEventHandler(eventNode, info)
{
	function eventHandler(event)
	{
		var info = eventHandler.info;

		var value = A2(_elm_lang$core$Native_Json.run, info.decoder, event);

		if (value.ctor === 'Ok')
		{
			var options = info.options;
			if (options.stopPropagation)
			{
				event.stopPropagation();
			}
			if (options.preventDefault)
			{
				event.preventDefault();
			}

			var message = value._0;

			var currentEventNode = eventNode;
			while (currentEventNode)
			{
				var tagger = currentEventNode.tagger;
				if (typeof tagger === 'function')
				{
					message = tagger(message);
				}
				else
				{
					for (var i = tagger.length; i--; )
					{
						message = tagger[i](message);
					}
				}
				currentEventNode = currentEventNode.parent;
			}
		}
	};

	eventHandler.info = info;

	return eventHandler;
}

function applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		if (typeof value === 'undefined')
		{
			domNode.removeAttribute(key);
		}
		else
		{
			domNode.setAttribute(key, value);
		}
	}
}

function applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.namespace;
		var value = pair.value;

		if (typeof value === 'undefined')
		{
			domNode.removeAttributeNS(namespace, key);
		}
		else
		{
			domNode.setAttributeNS(namespace, key, value);
		}
	}
}



////////////  DIFF  ////////////


function diff(a, b)
{
	var patches = [];
	diffHelp(a, b, patches, 0);
	return patches;
}


function makePatch(type, index, data)
{
	return {
		index: index,
		type: type,
		data: data,
		domNode: undefined,
		eventNode: undefined
	};
}


function diffHelp(a, b, patches, index)
{
	if (a === b)
	{
		return;
	}

	var aType = a.type;
	var bType = b.type;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (aType !== bType)
	{
		patches.push(makePatch('p-redraw', index, b));
		return;
	}

	// Now we know that both nodes are the same type.
	switch (bType)
	{
		case 'thunk':
			var aArgs = a.args;
			var bArgs = b.args;
			var i = aArgs.length;
			var same = a.func === b.func && i === bArgs.length;
			while (same && i--)
			{
				same = aArgs[i] === bArgs[i];
			}
			if (same)
			{
				b.node = a.node;
				return;
			}
			b.node = b.thunk();
			var subPatches = [];
			diffHelp(a.node, b.node, subPatches, 0);
			if (subPatches.length > 0)
			{
				patches.push(makePatch('p-thunk', index, subPatches));
			}
			return;

		case 'tagger':
			// gather nested taggers
			var aTaggers = a.tagger;
			var bTaggers = b.tagger;
			var nesting = false;

			var aSubNode = a.node;
			while (aSubNode.type === 'tagger')
			{
				nesting = true;

				typeof aTaggers !== 'object'
					? aTaggers = [aTaggers, aSubNode.tagger]
					: aTaggers.push(aSubNode.tagger);

				aSubNode = aSubNode.node;
			}

			var bSubNode = b.node;
			while (bSubNode.type === 'tagger')
			{
				nesting = true;

				typeof bTaggers !== 'object'
					? bTaggers = [bTaggers, bSubNode.tagger]
					: bTaggers.push(bSubNode.tagger);

				bSubNode = bSubNode.node;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && aTaggers.length !== bTaggers.length)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !pairwiseRefEqual(aTaggers, bTaggers) : aTaggers !== bTaggers)
			{
				patches.push(makePatch('p-tagger', index, bTaggers));
			}

			// diff everything below the taggers
			diffHelp(aSubNode, bSubNode, patches, index + 1);
			return;

		case 'text':
			if (a.text !== b.text)
			{
				patches.push(makePatch('p-text', index, b.text));
				return;
			}

			return;

		case 'node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffChildren(a, b, patches, index);
			return;

		case 'keyed-node':
			// Bail if obvious indicators have changed. Implies more serious
			// structural changes such that it's not worth it to diff.
			if (a.tag !== b.tag || a.namespace !== b.namespace)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);

			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			diffKeyedChildren(a, b, patches, index);
			return;

		case 'custom':
			if (a.impl !== b.impl)
			{
				patches.push(makePatch('p-redraw', index, b));
				return;
			}

			var factsDiff = diffFacts(a.facts, b.facts);
			if (typeof factsDiff !== 'undefined')
			{
				patches.push(makePatch('p-facts', index, factsDiff));
			}

			var patch = b.impl.diff(a,b);
			if (patch)
			{
				patches.push(makePatch('p-custom', index, patch));
				return;
			}

			return;
	}
}


// assumes the incoming arrays are the same length
function pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function diffFacts(a, b, category)
{
	var diff;

	// look for changes and removals
	for (var aKey in a)
	{
		if (aKey === STYLE_KEY || aKey === EVENT_KEY || aKey === ATTR_KEY || aKey === ATTR_NS_KEY)
		{
			var subDiff = diffFacts(a[aKey], b[aKey] || {}, aKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[aKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(aKey in b))
		{
			diff = diff || {};
			diff[aKey] =
				(typeof category === 'undefined')
					? (typeof a[aKey] === 'string' ? '' : null)
					:
				(category === STYLE_KEY)
					? ''
					:
				(category === EVENT_KEY || category === ATTR_KEY)
					? undefined
					:
				{ namespace: a[aKey].namespace, value: undefined };

			continue;
		}

		var aValue = a[aKey];
		var bValue = b[aKey];

		// reference equal, so don't worry about it
		if (aValue === bValue && aKey !== 'value'
			|| category === EVENT_KEY && equalEvents(aValue, bValue))
		{
			continue;
		}

		diff = diff || {};
		diff[aKey] = bValue;
	}

	// add new stuff
	for (var bKey in b)
	{
		if (!(bKey in a))
		{
			diff = diff || {};
			diff[bKey] = b[bKey];
		}
	}

	return diff;
}


function diffChildren(aParent, bParent, patches, rootIndex)
{
	var aChildren = aParent.children;
	var bChildren = bParent.children;

	var aLen = aChildren.length;
	var bLen = bChildren.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (aLen > bLen)
	{
		patches.push(makePatch('p-remove-last', rootIndex, aLen - bLen));
	}
	else if (aLen < bLen)
	{
		patches.push(makePatch('p-append', rootIndex, bChildren.slice(aLen)));
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	var index = rootIndex;
	var minLen = aLen < bLen ? aLen : bLen;
	for (var i = 0; i < minLen; i++)
	{
		index++;
		var aChild = aChildren[i];
		diffHelp(aChild, bChildren[i], patches, index);
		index += aChild.descendantsCount || 0;
	}
}



////////////  KEYED DIFF  ////////////


function diffKeyedChildren(aParent, bParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var aChildren = aParent.children;
	var bChildren = bParent.children;
	var aLen = aChildren.length;
	var bLen = bChildren.length;
	var aIndex = 0;
	var bIndex = 0;

	var index = rootIndex;

	while (aIndex < aLen && bIndex < bLen)
	{
		var a = aChildren[aIndex];
		var b = bChildren[bIndex];

		var aKey = a._0;
		var bKey = b._0;
		var aNode = a._1;
		var bNode = b._1;

		// check if keys match

		if (aKey === bKey)
		{
			index++;
			diffHelp(aNode, bNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex++;
			bIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var aLookAhead = aIndex + 1 < aLen;
		var bLookAhead = bIndex + 1 < bLen;

		if (aLookAhead)
		{
			var aNext = aChildren[aIndex + 1];
			var aNextKey = aNext._0;
			var aNextNode = aNext._1;
			var oldMatch = bKey === aNextKey;
		}

		if (bLookAhead)
		{
			var bNext = bChildren[bIndex + 1];
			var bNextKey = bNext._0;
			var bNextNode = bNext._1;
			var newMatch = aKey === bNextKey;
		}


		// swap a and b
		if (aLookAhead && bLookAhead && newMatch && oldMatch)
		{
			index++;
			diffHelp(aNode, bNextNode, localPatches, index);
			insertNode(changes, localPatches, aKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			removeNode(changes, localPatches, aKey, aNextNode, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		// insert b
		if (bLookAhead && newMatch)
		{
			index++;
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			diffHelp(aNode, bNextNode, localPatches, index);
			index += aNode.descendantsCount || 0;

			aIndex += 1;
			bIndex += 2;
			continue;
		}

		// remove a
		if (aLookAhead && oldMatch)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 1;
			continue;
		}

		// remove a, insert b
		if (aLookAhead && bLookAhead && aNextKey === bNextKey)
		{
			index++;
			removeNode(changes, localPatches, aKey, aNode, index);
			insertNode(changes, localPatches, bKey, bNode, bIndex, inserts);
			index += aNode.descendantsCount || 0;

			index++;
			diffHelp(aNextNode, bNextNode, localPatches, index);
			index += aNextNode.descendantsCount || 0;

			aIndex += 2;
			bIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (aIndex < aLen)
	{
		index++;
		var a = aChildren[aIndex];
		var aNode = a._1;
		removeNode(changes, localPatches, a._0, aNode, index);
		index += aNode.descendantsCount || 0;
		aIndex++;
	}

	var endInserts;
	while (bIndex < bLen)
	{
		endInserts = endInserts || [];
		var b = bChildren[bIndex];
		insertNode(changes, localPatches, b._0, b._1, undefined, endInserts);
		bIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || typeof endInserts !== 'undefined')
	{
		patches.push(makePatch('p-reorder', rootIndex, {
			patches: localPatches,
			inserts: inserts,
			endInserts: endInserts
		}));
	}
}



////////////  CHANGES FROM KEYED DIFF  ////////////


var POSTFIX = '_elmW6BL';


function insertNode(changes, localPatches, key, vnode, bIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		entry = {
			tag: 'insert',
			vnode: vnode,
			index: bIndex,
			data: undefined
		};

		inserts.push({ index: bIndex, entry: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.tag === 'remove')
	{
		inserts.push({ index: bIndex, entry: entry });

		entry.tag = 'move';
		var subPatches = [];
		diffHelp(entry.vnode, vnode, subPatches, entry.index);
		entry.index = bIndex;
		entry.data.data = {
			patches: subPatches,
			entry: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	insertNode(changes, localPatches, key + POSTFIX, vnode, bIndex, inserts);
}


function removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (typeof entry === 'undefined')
	{
		var patch = makePatch('p-remove', index, undefined);
		localPatches.push(patch);

		changes[key] = {
			tag: 'remove',
			vnode: vnode,
			index: index,
			data: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.tag === 'insert')
	{
		entry.tag = 'move';
		var subPatches = [];
		diffHelp(vnode, entry.vnode, subPatches, index);

		var patch = makePatch('p-remove', index, {
			patches: subPatches,
			entry: entry
		});
		localPatches.push(patch);

		return;
	}

	// this key has already been removed or moved, a duplicate!
	removeNode(changes, localPatches, key + POSTFIX, vnode, index);
}



////////////  ADD DOM NODES  ////////////
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function addDomNodes(domNode, vNode, patches, eventNode)
{
	addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.descendantsCount, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.index;

	while (index === low)
	{
		var patchType = patch.type;

		if (patchType === 'p-thunk')
		{
			addDomNodes(domNode, vNode.node, patch.data, eventNode);
		}
		else if (patchType === 'p-reorder')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var subPatches = patch.data.patches;
			if (subPatches.length > 0)
			{
				addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 'p-remove')
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;

			var data = patch.data;
			if (typeof data !== 'undefined')
			{
				data.entry.data = domNode;
				var subPatches = data.patches;
				if (subPatches.length > 0)
				{
					addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.domNode = domNode;
			patch.eventNode = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.index) > high)
		{
			return i;
		}
	}

	switch (vNode.type)
	{
		case 'tagger':
			var subNode = vNode.node;

			while (subNode.type === "tagger")
			{
				subNode = subNode.node;
			}

			return addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);

		case 'node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j];
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'keyed-node':
			var vChildren = vNode.children;
			var childNodes = domNode.childNodes;
			for (var j = 0; j < vChildren.length; j++)
			{
				low++;
				var vChild = vChildren[j]._1;
				var nextLow = low + (vChild.descendantsCount || 0);
				if (low <= index && index <= nextLow)
				{
					i = addDomNodesHelp(childNodes[j], vChild, patches, i, low, nextLow, eventNode);
					if (!(patch = patches[i]) || (index = patch.index) > high)
					{
						return i;
					}
				}
				low = nextLow;
			}
			return i;

		case 'text':
		case 'thunk':
			throw new Error('should never traverse `text` or `thunk` nodes like this');
	}
}



////////////  APPLY PATCHES  ////////////


function applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return applyPatchesHelp(rootDomNode, patches);
}

function applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.domNode
		var newNode = applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function applyPatch(domNode, patch)
{
	switch (patch.type)
	{
		case 'p-redraw':
			return applyPatchRedraw(domNode, patch.data, patch.eventNode);

		case 'p-facts':
			applyFacts(domNode, patch.eventNode, patch.data);
			return domNode;

		case 'p-text':
			domNode.replaceData(0, domNode.length, patch.data);
			return domNode;

		case 'p-thunk':
			return applyPatchesHelp(domNode, patch.data);

		case 'p-tagger':
			if (typeof domNode.elm_event_node_ref !== 'undefined')
			{
				domNode.elm_event_node_ref.tagger = patch.data;
			}
			else
			{
				domNode.elm_event_node_ref = { tagger: patch.data, parent: patch.eventNode };
			}
			return domNode;

		case 'p-remove-last':
			var i = patch.data;
			while (i--)
			{
				domNode.removeChild(domNode.lastChild);
			}
			return domNode;

		case 'p-append':
			var newNodes = patch.data;
			for (var i = 0; i < newNodes.length; i++)
			{
				domNode.appendChild(render(newNodes[i], patch.eventNode));
			}
			return domNode;

		case 'p-remove':
			var data = patch.data;
			if (typeof data === 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.entry;
			if (typeof entry.index !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.data = applyPatchesHelp(domNode, data.patches);
			return domNode;

		case 'p-reorder':
			return applyPatchReorder(domNode, patch);

		case 'p-custom':
			var impl = patch.data;
			return impl.applyPatch(domNode, impl.data);

		default:
			throw new Error('Ran into an unknown patch!');
	}
}


function applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = render(vNode, eventNode);

	if (typeof newNode.elm_event_node_ref === 'undefined')
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function applyPatchReorder(domNode, patch)
{
	var data = patch.data;

	// remove end inserts
	var frag = applyPatchReorderEndInsertsHelp(data.endInserts, patch);

	// removals
	domNode = applyPatchesHelp(domNode, data.patches);

	// inserts
	var inserts = data.inserts;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.entry;
		var node = entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode);
		domNode.insertBefore(node, domNode.childNodes[insert.index]);
	}

	// add end inserts
	if (typeof frag !== 'undefined')
	{
		domNode.appendChild(frag);
	}

	return domNode;
}


function applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (typeof endInserts === 'undefined')
	{
		return;
	}

	var frag = localDoc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.entry;
		frag.appendChild(entry.tag === 'move'
			? entry.data
			: render(entry.vnode, patch.eventNode)
		);
	}
	return frag;
}


// PROGRAMS

var program = makeProgram(checkNoFlags);
var programWithFlags = makeProgram(checkYesFlags);

function makeProgram(flagChecker)
{
	return F2(function(debugWrap, impl)
	{
		return function(flagDecoder)
		{
			return function(object, moduleName, debugMetadata)
			{
				var checker = flagChecker(flagDecoder, moduleName);
				if (typeof debugMetadata === 'undefined')
				{
					normalSetup(impl, object, moduleName, checker);
				}
				else
				{
					debugSetup(A2(debugWrap, debugMetadata, impl), object, moduleName, checker);
				}
			};
		};
	});
}

function staticProgram(vNode)
{
	var nothing = _elm_lang$core$Native_Utils.Tuple2(
		_elm_lang$core$Native_Utils.Tuple0,
		_elm_lang$core$Platform_Cmd$none
	);
	return A2(program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, {
		init: nothing,
		view: function() { return vNode; },
		update: F2(function() { return nothing; }),
		subscriptions: function() { return _elm_lang$core$Platform_Sub$none; }
	})();
}


// FLAG CHECKERS

function checkNoFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flags === 'undefined')
		{
			return init;
		}

		var errorMessage =
			'The `' + moduleName + '` module does not need flags.\n'
			+ 'Initialize it with no arguments and you should be all set!';

		crash(errorMessage, domNode);
	};
}

function checkYesFlags(flagDecoder, moduleName)
{
	return function(init, flags, domNode)
	{
		if (typeof flagDecoder === 'undefined')
		{
			var errorMessage =
				'Are you trying to sneak a Never value into Elm? Trickster!\n'
				+ 'It looks like ' + moduleName + '.main is defined with `programWithFlags` but has type `Program Never`.\n'
				+ 'Use `program` instead if you do not want flags.'

			crash(errorMessage, domNode);
		}

		var result = A2(_elm_lang$core$Native_Json.run, flagDecoder, flags);
		if (result.ctor === 'Ok')
		{
			return init(result._0);
		}

		var errorMessage =
			'Trying to initialize the `' + moduleName + '` module with an unexpected flag.\n'
			+ 'I tried to convert it to an Elm value, but ran into this problem:\n\n'
			+ result._0;

		crash(errorMessage, domNode);
	};
}

function crash(errorMessage, domNode)
{
	if (domNode)
	{
		domNode.innerHTML =
			'<div style="padding-left:1em;">'
			+ '<h2 style="font-weight:normal;"><b>Oops!</b> Something went wrong when starting your Elm program.</h2>'
			+ '<pre style="padding-left:1em;">' + errorMessage + '</pre>'
			+ '</div>';
	}

	throw new Error(errorMessage);
}


//  NORMAL SETUP

function normalSetup(impl, object, moduleName, flagChecker)
{
	object['embed'] = function embed(node, flags)
	{
		while (node.lastChild)
		{
			node.removeChild(node.lastChild);
		}

		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update,
			impl.subscriptions,
			normalRenderer(node, impl.view)
		);
	};

	object['fullscreen'] = function fullscreen(flags)
	{
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update,
			impl.subscriptions,
			normalRenderer(document.body, impl.view)
		);
	};
}

function normalRenderer(parentNode, view)
{
	return function(tagger, initialModel)
	{
		var eventNode = { tagger: tagger, parent: undefined };
		var initialVirtualNode = view(initialModel);
		var domNode = render(initialVirtualNode, eventNode);
		parentNode.appendChild(domNode);
		return makeStepper(domNode, view, initialVirtualNode, eventNode);
	};
}


// STEPPER

var rAF =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };

function makeStepper(domNode, view, initialVirtualNode, eventNode)
{
	var state = 'NO_REQUEST';
	var currNode = initialVirtualNode;
	var nextModel;

	function updateIfNeeded()
	{
		switch (state)
		{
			case 'NO_REQUEST':
				throw new Error(
					'Unexpected draw callback.\n' +
					'Please report this to <https://github.com/elm-lang/virtual-dom/issues>.'
				);

			case 'PENDING_REQUEST':
				rAF(updateIfNeeded);
				state = 'EXTRA_REQUEST';

				var nextNode = view(nextModel);
				var patches = diff(currNode, nextNode);
				domNode = applyPatches(domNode, currNode, patches, eventNode);
				currNode = nextNode;

				return;

			case 'EXTRA_REQUEST':
				state = 'NO_REQUEST';
				return;
		}
	}

	return function stepper(model)
	{
		if (state === 'NO_REQUEST')
		{
			rAF(updateIfNeeded);
		}
		state = 'PENDING_REQUEST';
		nextModel = model;
	};
}


// DEBUG SETUP

function debugSetup(impl, object, moduleName, flagChecker)
{
	object['fullscreen'] = function fullscreen(flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, document.body),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, document.body, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};

	object['embed'] = function fullscreen(node, flags)
	{
		var popoutRef = { doc: undefined };
		return _elm_lang$core$Native_Platform.initialize(
			flagChecker(impl.init, flags, node),
			impl.update(scrollTask(popoutRef)),
			impl.subscriptions,
			debugRenderer(moduleName, node, popoutRef, impl.view, impl.viewIn, impl.viewOut)
		);
	};
}

function scrollTask(popoutRef)
{
	return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback)
	{
		var doc = popoutRef.doc;
		if (doc)
		{
			var msgs = doc.getElementsByClassName('debugger-sidebar-messages')[0];
			if (msgs)
			{
				msgs.scrollTop = msgs.scrollHeight;
			}
		}
		callback(_elm_lang$core$Native_Scheduler.succeed(_elm_lang$core$Native_Utils.Tuple0));
	});
}


function debugRenderer(moduleName, parentNode, popoutRef, view, viewIn, viewOut)
{
	return function(tagger, initialModel)
	{
		var appEventNode = { tagger: tagger, parent: undefined };
		var eventNode = { tagger: tagger, parent: undefined };

		// make normal stepper
		var appVirtualNode = view(initialModel);
		var appNode = render(appVirtualNode, appEventNode);
		parentNode.appendChild(appNode);
		var appStepper = makeStepper(appNode, view, appVirtualNode, appEventNode);

		// make overlay stepper
		var overVirtualNode = viewIn(initialModel)._1;
		var overNode = render(overVirtualNode, eventNode);
		parentNode.appendChild(overNode);
		var wrappedViewIn = wrapViewIn(appEventNode, overNode, viewIn);
		var overStepper = makeStepper(overNode, wrappedViewIn, overVirtualNode, eventNode);

		// make debugger stepper
		var debugStepper = makeDebugStepper(initialModel, viewOut, eventNode, parentNode, moduleName, popoutRef);

		return function stepper(model)
		{
			appStepper(model);
			overStepper(model);
			debugStepper(model);
		}
	};
}

function makeDebugStepper(initialModel, view, eventNode, parentNode, moduleName, popoutRef)
{
	var curr;
	var domNode;

	return function stepper(model)
	{
		if (!model.isDebuggerOpen)
		{
			return;
		}

		if (!popoutRef.doc)
		{
			curr = view(model);
			domNode = openDebugWindow(moduleName, popoutRef, curr, eventNode);
			return;
		}

		// switch to document of popout
		localDoc = popoutRef.doc;

		var next = view(model);
		var patches = diff(curr, next);
		domNode = applyPatches(domNode, curr, patches, eventNode);
		curr = next;

		// switch back to normal document
		localDoc = document;
	};
}

function openDebugWindow(moduleName, popoutRef, virtualNode, eventNode)
{
	var w = 900;
	var h = 360;
	var x = screen.width - w;
	var y = screen.height - h;
	var debugWindow = window.open('', '', 'width=' + w + ',height=' + h + ',left=' + x + ',top=' + y);

	// switch to window document
	localDoc = debugWindow.document;

	popoutRef.doc = localDoc;
	localDoc.title = 'Debugger - ' + moduleName;
	localDoc.body.style.margin = '0';
	localDoc.body.style.padding = '0';
	var domNode = render(virtualNode, eventNode);
	localDoc.body.appendChild(domNode);

	localDoc.addEventListener('keydown', function(event) {
		if (event.metaKey && event.which === 82)
		{
			window.location.reload();
		}
		if (event.which === 38)
		{
			eventNode.tagger({ ctor: 'Up' });
			event.preventDefault();
		}
		if (event.which === 40)
		{
			eventNode.tagger({ ctor: 'Down' });
			event.preventDefault();
		}
	});

	function close()
	{
		popoutRef.doc = undefined;
		debugWindow.close();
	}
	window.addEventListener('unload', close);
	debugWindow.addEventListener('unload', function() {
		popoutRef.doc = undefined;
		window.removeEventListener('unload', close);
		eventNode.tagger({ ctor: 'Close' });
	});

	// switch back to the normal document
	localDoc = document;

	return domNode;
}


// BLOCK EVENTS

function wrapViewIn(appEventNode, overlayNode, viewIn)
{
	var ignorer = makeIgnorer(overlayNode);
	var blocking = 'Normal';
	var overflow;

	var normalTagger = appEventNode.tagger;
	var blockTagger = function() {};

	return function(model)
	{
		var tuple = viewIn(model);
		var newBlocking = tuple._0.ctor;
		appEventNode.tagger = newBlocking === 'Normal' ? normalTagger : blockTagger;
		if (blocking !== newBlocking)
		{
			traverse('removeEventListener', ignorer, blocking);
			traverse('addEventListener', ignorer, newBlocking);

			if (blocking === 'Normal')
			{
				overflow = document.body.style.overflow;
				document.body.style.overflow = 'hidden';
			}

			if (newBlocking === 'Normal')
			{
				document.body.style.overflow = overflow;
			}

			blocking = newBlocking;
		}
		return tuple._1;
	}
}

function traverse(verbEventListener, ignorer, blocking)
{
	switch(blocking)
	{
		case 'Normal':
			return;

		case 'Pause':
			return traverseHelp(verbEventListener, ignorer, mostEvents);

		case 'Message':
			return traverseHelp(verbEventListener, ignorer, allEvents);
	}
}

function traverseHelp(verbEventListener, handler, eventNames)
{
	for (var i = 0; i < eventNames.length; i++)
	{
		document.body[verbEventListener](eventNames[i], handler, true);
	}
}

function makeIgnorer(overlayNode)
{
	return function(event)
	{
		if (event.type === 'keydown' && event.metaKey && event.which === 82)
		{
			return;
		}

		var isScroll = event.type === 'scroll' || event.type === 'wheel';

		var node = event.target;
		while (node !== null)
		{
			if (node.className === 'elm-overlay-message-details' && isScroll)
			{
				return;
			}

			if (node === overlayNode && !isScroll)
			{
				return;
			}
			node = node.parentNode;
		}

		event.stopPropagation();
		event.preventDefault();
	}
}

var mostEvents = [
	'click', 'dblclick', 'mousemove',
	'mouseup', 'mousedown', 'mouseenter', 'mouseleave',
	'touchstart', 'touchend', 'touchcancel', 'touchmove',
	'pointerdown', 'pointerup', 'pointerover', 'pointerout',
	'pointerenter', 'pointerleave', 'pointermove', 'pointercancel',
	'dragstart', 'drag', 'dragend', 'dragenter', 'dragover', 'dragleave', 'drop',
	'keyup', 'keydown', 'keypress',
	'input', 'change',
	'focus', 'blur'
];

var allEvents = mostEvents.concat('wheel', 'scroll');


return {
	node: node,
	text: text,
	custom: custom,
	map: F2(map),

	on: F3(on),
	style: style,
	property: F2(property),
	attribute: F2(attribute),
	attributeNS: F3(attributeNS),
	mapProperty: F2(mapProperty),

	lazy: F2(lazy),
	lazy2: F3(lazy2),
	lazy3: F4(lazy3),
	keyedNode: F3(keyedNode),

	program: program,
	programWithFlags: programWithFlags,
	staticProgram: staticProgram
};

}();

var _elm_lang$virtual_dom$VirtualDom$programWithFlags = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.programWithFlags, _elm_lang$virtual_dom$VirtualDom_Debug$wrapWithFlags, impl);
};
var _elm_lang$virtual_dom$VirtualDom$program = function (impl) {
	return A2(_elm_lang$virtual_dom$Native_VirtualDom.program, _elm_lang$virtual_dom$VirtualDom_Debug$wrap, impl);
};
var _elm_lang$virtual_dom$VirtualDom$keyedNode = _elm_lang$virtual_dom$Native_VirtualDom.keyedNode;
var _elm_lang$virtual_dom$VirtualDom$lazy3 = _elm_lang$virtual_dom$Native_VirtualDom.lazy3;
var _elm_lang$virtual_dom$VirtualDom$lazy2 = _elm_lang$virtual_dom$Native_VirtualDom.lazy2;
var _elm_lang$virtual_dom$VirtualDom$lazy = _elm_lang$virtual_dom$Native_VirtualDom.lazy;
var _elm_lang$virtual_dom$VirtualDom$defaultOptions = {stopPropagation: false, preventDefault: false};
var _elm_lang$virtual_dom$VirtualDom$onWithOptions = _elm_lang$virtual_dom$Native_VirtualDom.on;
var _elm_lang$virtual_dom$VirtualDom$on = F2(
	function (eventName, decoder) {
		return A3(_elm_lang$virtual_dom$VirtualDom$onWithOptions, eventName, _elm_lang$virtual_dom$VirtualDom$defaultOptions, decoder);
	});
var _elm_lang$virtual_dom$VirtualDom$style = _elm_lang$virtual_dom$Native_VirtualDom.style;
var _elm_lang$virtual_dom$VirtualDom$mapProperty = _elm_lang$virtual_dom$Native_VirtualDom.mapProperty;
var _elm_lang$virtual_dom$VirtualDom$attributeNS = _elm_lang$virtual_dom$Native_VirtualDom.attributeNS;
var _elm_lang$virtual_dom$VirtualDom$attribute = _elm_lang$virtual_dom$Native_VirtualDom.attribute;
var _elm_lang$virtual_dom$VirtualDom$property = _elm_lang$virtual_dom$Native_VirtualDom.property;
var _elm_lang$virtual_dom$VirtualDom$map = _elm_lang$virtual_dom$Native_VirtualDom.map;
var _elm_lang$virtual_dom$VirtualDom$text = _elm_lang$virtual_dom$Native_VirtualDom.text;
var _elm_lang$virtual_dom$VirtualDom$node = _elm_lang$virtual_dom$Native_VirtualDom.node;
var _elm_lang$virtual_dom$VirtualDom$Options = F2(
	function (a, b) {
		return {stopPropagation: a, preventDefault: b};
	});
var _elm_lang$virtual_dom$VirtualDom$Node = {ctor: 'Node'};
var _elm_lang$virtual_dom$VirtualDom$Property = {ctor: 'Property'};

var _elm_lang$html$Html$programWithFlags = _elm_lang$virtual_dom$VirtualDom$programWithFlags;
var _elm_lang$html$Html$program = _elm_lang$virtual_dom$VirtualDom$program;
var _elm_lang$html$Html$beginnerProgram = function (_p0) {
	var _p1 = _p0;
	return _elm_lang$html$Html$program(
		{
			init: A2(
				_elm_lang$core$Platform_Cmd_ops['!'],
				_p1.model,
				{ctor: '[]'}),
			update: F2(
				function (msg, model) {
					return A2(
						_elm_lang$core$Platform_Cmd_ops['!'],
						A2(_p1.update, msg, model),
						{ctor: '[]'});
				}),
			view: _p1.view,
			subscriptions: function (_p2) {
				return _elm_lang$core$Platform_Sub$none;
			}
		});
};
var _elm_lang$html$Html$map = _elm_lang$virtual_dom$VirtualDom$map;
var _elm_lang$html$Html$text = _elm_lang$virtual_dom$VirtualDom$text;
var _elm_lang$html$Html$node = _elm_lang$virtual_dom$VirtualDom$node;
var _elm_lang$html$Html$body = _elm_lang$html$Html$node('body');
var _elm_lang$html$Html$section = _elm_lang$html$Html$node('section');
var _elm_lang$html$Html$nav = _elm_lang$html$Html$node('nav');
var _elm_lang$html$Html$article = _elm_lang$html$Html$node('article');
var _elm_lang$html$Html$aside = _elm_lang$html$Html$node('aside');
var _elm_lang$html$Html$h1 = _elm_lang$html$Html$node('h1');
var _elm_lang$html$Html$h2 = _elm_lang$html$Html$node('h2');
var _elm_lang$html$Html$h3 = _elm_lang$html$Html$node('h3');
var _elm_lang$html$Html$h4 = _elm_lang$html$Html$node('h4');
var _elm_lang$html$Html$h5 = _elm_lang$html$Html$node('h5');
var _elm_lang$html$Html$h6 = _elm_lang$html$Html$node('h6');
var _elm_lang$html$Html$header = _elm_lang$html$Html$node('header');
var _elm_lang$html$Html$footer = _elm_lang$html$Html$node('footer');
var _elm_lang$html$Html$address = _elm_lang$html$Html$node('address');
var _elm_lang$html$Html$main_ = _elm_lang$html$Html$node('main');
var _elm_lang$html$Html$p = _elm_lang$html$Html$node('p');
var _elm_lang$html$Html$hr = _elm_lang$html$Html$node('hr');
var _elm_lang$html$Html$pre = _elm_lang$html$Html$node('pre');
var _elm_lang$html$Html$blockquote = _elm_lang$html$Html$node('blockquote');
var _elm_lang$html$Html$ol = _elm_lang$html$Html$node('ol');
var _elm_lang$html$Html$ul = _elm_lang$html$Html$node('ul');
var _elm_lang$html$Html$li = _elm_lang$html$Html$node('li');
var _elm_lang$html$Html$dl = _elm_lang$html$Html$node('dl');
var _elm_lang$html$Html$dt = _elm_lang$html$Html$node('dt');
var _elm_lang$html$Html$dd = _elm_lang$html$Html$node('dd');
var _elm_lang$html$Html$figure = _elm_lang$html$Html$node('figure');
var _elm_lang$html$Html$figcaption = _elm_lang$html$Html$node('figcaption');
var _elm_lang$html$Html$div = _elm_lang$html$Html$node('div');
var _elm_lang$html$Html$a = _elm_lang$html$Html$node('a');
var _elm_lang$html$Html$em = _elm_lang$html$Html$node('em');
var _elm_lang$html$Html$strong = _elm_lang$html$Html$node('strong');
var _elm_lang$html$Html$small = _elm_lang$html$Html$node('small');
var _elm_lang$html$Html$s = _elm_lang$html$Html$node('s');
var _elm_lang$html$Html$cite = _elm_lang$html$Html$node('cite');
var _elm_lang$html$Html$q = _elm_lang$html$Html$node('q');
var _elm_lang$html$Html$dfn = _elm_lang$html$Html$node('dfn');
var _elm_lang$html$Html$abbr = _elm_lang$html$Html$node('abbr');
var _elm_lang$html$Html$time = _elm_lang$html$Html$node('time');
var _elm_lang$html$Html$code = _elm_lang$html$Html$node('code');
var _elm_lang$html$Html$var = _elm_lang$html$Html$node('var');
var _elm_lang$html$Html$samp = _elm_lang$html$Html$node('samp');
var _elm_lang$html$Html$kbd = _elm_lang$html$Html$node('kbd');
var _elm_lang$html$Html$sub = _elm_lang$html$Html$node('sub');
var _elm_lang$html$Html$sup = _elm_lang$html$Html$node('sup');
var _elm_lang$html$Html$i = _elm_lang$html$Html$node('i');
var _elm_lang$html$Html$b = _elm_lang$html$Html$node('b');
var _elm_lang$html$Html$u = _elm_lang$html$Html$node('u');
var _elm_lang$html$Html$mark = _elm_lang$html$Html$node('mark');
var _elm_lang$html$Html$ruby = _elm_lang$html$Html$node('ruby');
var _elm_lang$html$Html$rt = _elm_lang$html$Html$node('rt');
var _elm_lang$html$Html$rp = _elm_lang$html$Html$node('rp');
var _elm_lang$html$Html$bdi = _elm_lang$html$Html$node('bdi');
var _elm_lang$html$Html$bdo = _elm_lang$html$Html$node('bdo');
var _elm_lang$html$Html$span = _elm_lang$html$Html$node('span');
var _elm_lang$html$Html$br = _elm_lang$html$Html$node('br');
var _elm_lang$html$Html$wbr = _elm_lang$html$Html$node('wbr');
var _elm_lang$html$Html$ins = _elm_lang$html$Html$node('ins');
var _elm_lang$html$Html$del = _elm_lang$html$Html$node('del');
var _elm_lang$html$Html$img = _elm_lang$html$Html$node('img');
var _elm_lang$html$Html$iframe = _elm_lang$html$Html$node('iframe');
var _elm_lang$html$Html$embed = _elm_lang$html$Html$node('embed');
var _elm_lang$html$Html$object = _elm_lang$html$Html$node('object');
var _elm_lang$html$Html$param = _elm_lang$html$Html$node('param');
var _elm_lang$html$Html$video = _elm_lang$html$Html$node('video');
var _elm_lang$html$Html$audio = _elm_lang$html$Html$node('audio');
var _elm_lang$html$Html$source = _elm_lang$html$Html$node('source');
var _elm_lang$html$Html$track = _elm_lang$html$Html$node('track');
var _elm_lang$html$Html$canvas = _elm_lang$html$Html$node('canvas');
var _elm_lang$html$Html$math = _elm_lang$html$Html$node('math');
var _elm_lang$html$Html$table = _elm_lang$html$Html$node('table');
var _elm_lang$html$Html$caption = _elm_lang$html$Html$node('caption');
var _elm_lang$html$Html$colgroup = _elm_lang$html$Html$node('colgroup');
var _elm_lang$html$Html$col = _elm_lang$html$Html$node('col');
var _elm_lang$html$Html$tbody = _elm_lang$html$Html$node('tbody');
var _elm_lang$html$Html$thead = _elm_lang$html$Html$node('thead');
var _elm_lang$html$Html$tfoot = _elm_lang$html$Html$node('tfoot');
var _elm_lang$html$Html$tr = _elm_lang$html$Html$node('tr');
var _elm_lang$html$Html$td = _elm_lang$html$Html$node('td');
var _elm_lang$html$Html$th = _elm_lang$html$Html$node('th');
var _elm_lang$html$Html$form = _elm_lang$html$Html$node('form');
var _elm_lang$html$Html$fieldset = _elm_lang$html$Html$node('fieldset');
var _elm_lang$html$Html$legend = _elm_lang$html$Html$node('legend');
var _elm_lang$html$Html$label = _elm_lang$html$Html$node('label');
var _elm_lang$html$Html$input = _elm_lang$html$Html$node('input');
var _elm_lang$html$Html$button = _elm_lang$html$Html$node('button');
var _elm_lang$html$Html$select = _elm_lang$html$Html$node('select');
var _elm_lang$html$Html$datalist = _elm_lang$html$Html$node('datalist');
var _elm_lang$html$Html$optgroup = _elm_lang$html$Html$node('optgroup');
var _elm_lang$html$Html$option = _elm_lang$html$Html$node('option');
var _elm_lang$html$Html$textarea = _elm_lang$html$Html$node('textarea');
var _elm_lang$html$Html$keygen = _elm_lang$html$Html$node('keygen');
var _elm_lang$html$Html$output = _elm_lang$html$Html$node('output');
var _elm_lang$html$Html$progress = _elm_lang$html$Html$node('progress');
var _elm_lang$html$Html$meter = _elm_lang$html$Html$node('meter');
var _elm_lang$html$Html$details = _elm_lang$html$Html$node('details');
var _elm_lang$html$Html$summary = _elm_lang$html$Html$node('summary');
var _elm_lang$html$Html$menuitem = _elm_lang$html$Html$node('menuitem');
var _elm_lang$html$Html$menu = _elm_lang$html$Html$node('menu');


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
		case 'L#':
			return 'L\\Box ';
		case 'R$':
			return 'R\\lozenge ';
		case 'L$':
			return 'L\\lozenge ';
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
						A2(
							_elm_lang$core$Basics_ops['++'],
							'(',
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._0)),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\wedge',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1),
								')'))));
			case 'Or':
				return A2(
					kakko,
					2,
					A2(
						_user$project$Common_syntax_ops['++++'],
						A2(
							_elm_lang$core$Basics_ops['++'],
							'(',
							A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._0)),
						A2(
							_user$project$Common_syntax_ops['++++'],
							'\\vee',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_user$project$Common_sequent$drawTexFormula, 3, _p1._1),
								')'))));
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
					A2(_user$project$Common_sequent$drawTexFormula, 1, _p1._1));
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
							A2(_user$project$Common_sequent$drawTexFormula, 1, f))));
			default:
				return A2(
					_user$project$Common_syntax_ops['++++'],
					'pre(',
					A2(
						_user$project$Common_syntax_ops['++++'],
						_p1._0.am_name,
						A2(
							_user$project$Common_syntax_ops['++++'],
							')(',
							A2(_user$project$Common_syntax_ops['++++'], _p1._1, ')('))));
		}
	});
var _user$project$Common_sequent$showla = function (_p2) {
	var _p3 = _p2;
	return _user$project$Util$show(_p3._0);
};
var _user$project$Common_sequent$drawTexLabelForm2 = function (r) {
	var _p4 = r;
	if (_p4.ctor === 'RelAtom') {
		if (_p4._0._1.ctor === '[]') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$showla(_p4._0._2),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\\mathsf{R}^{}_',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p4._0._0,
						_user$project$Common_sequent$showla(_p4._0._3))));
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$showla(_p4._0._2),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\\mathsf{R}^{',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'here2',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'}_',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p4._0._0,
								_user$project$Common_sequent$showla(_p4._0._3))))));
		}
	} else {
		return A2(
			_user$project$Common_syntax_ops['++++'],
			_user$project$Util$show(_p4._0._0),
			A2(
				_user$project$Common_syntax_ops['++++'],
				'here3',
				_user$project$Util$show(_p4._0._1)));
	}
};
var _user$project$Common_sequent$words2 = function (x) {
	var _p5 = x;
	if (_p5.ctor === '[]') {
		return '';
	} else {
		if (_p5._1.ctor === '[]') {
			return _p5._0;
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_p5._0,
				A2(
					_elm_lang$core$Basics_ops['++'],
					',',
					_user$project$Common_sequent$words2(_p5._1)));
		}
	}
};
var _user$project$Common_sequent$drawTexLabelForm = function (l) {
	var forml = function (fs) {
		return function (x) {
			return _user$project$Common_sequent$words2(x);
		}(
			A2(
				_elm_lang$core$List$map,
				function (f) {
					return A2(_user$project$Common_sequent$drawTexFormula, 1, f);
				},
				fs));
	};
	var _p6 = l;
	if (_p6._0._0.ctor === '[]') {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_user$project$Util$show(_p6._0._1),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'{:}^{}',
				A2(_user$project$Common_sequent$drawTexFormula, 1, _p6._0._3)));
	} else {
		return A2(
			_elm_lang$core$Basics_ops['++'],
			_user$project$Util$show(_p6._0._1),
			A2(
				_elm_lang$core$Basics_ops['++'],
				'{:}^{',
				A2(
					_elm_lang$core$Basics_ops['++'],
					'here1',
					A2(
						_elm_lang$core$Basics_ops['++'],
						'}',
						A2(_user$project$Common_sequent$drawTexFormula, 1, _p6._0._3)))));
	}
};
var _user$project$Common_sequent$drawTexSequent = function (seq) {
	var forDEL = seq.forDEL;
	var rightRel = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm2, seq.rightRel);
	var rightForm = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm, seq.rightForm);
	var leftRel = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm2, seq.leftRel);
	var leftForm = A2(_elm_lang$core$List$map, _user$project$Common_sequent$drawTexLabelForm, seq.leftForm);
	return _elm_lang$core$Native_Utils.eq(
		forDEL,
		{ctor: '[]'}) ? A2(
		_elm_lang$core$Basics_ops['++'],
		_user$project$Common_sequent$words2(
			A2(_elm_lang$core$Basics_ops['++'], leftForm, leftRel)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'\\Rightarrow ',
			_user$project$Common_sequent$words2(
				A2(_elm_lang$core$Basics_ops['++'], rightForm, rightRel)))) : A2(
		_elm_lang$core$Basics_ops['++'],
		_user$project$Common_sequent$words2(
			A2(_elm_lang$core$Basics_ops['++'], leftForm, leftRel)),
		A2(
			_elm_lang$core$Basics_ops['++'],
			'\\Rightarrow ',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$words2(
					A2(_elm_lang$core$Basics_ops['++'], rightForm, rightRel)),
				A2(_elm_lang$core$Basics_ops['++'], '||', 'here4'))));
};
var _user$project$Common_sequent$toGraph = F2(
	function (pairs, result) {
		toGraph:
		while (true) {
			var _p7 = pairs;
			if (_p7.ctor === '[]') {
				return result;
			} else {
				var _v7 = _p7._1,
					_v8 = _elm_lang$core$Native_Utils.update(
					result,
					{
						nodes: _user$project$Util$nub(
							A2(_elm_lang$core$Basics_ops['++'], result.nodes, _p7._0._0)),
						edges: _user$project$Util$nub(
							A2(_elm_lang$core$Basics_ops['++'], result.edges, _p7._0._1))
					});
				pairs = _v7;
				result = _v8;
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
	var _p8 = _user$project$Common_sequent$splitStringByRoundBraket(string);
	var stringCut = _p8._0;
	var stringCut2 = _p8._1;
	var _p9 = stringCut;
	switch (_p9) {
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
var _user$project$Common_sequent$drawEdgeElm = function (_p10) {
	var _p11 = _p10;
	var _p14 = _p11._1;
	var _p13 = _p11._0;
	var a = {
		ctor: '::',
		_0: _user$project$Common_sequent$drawNodeElm(_p13),
		_1: {
			ctor: '::',
			_0: _user$project$Common_sequent$drawNodeElm(_p14),
			_1: {ctor: '[]'}
		}
	};
	var _p12 = _user$project$Common_sequent$splitStringByRoundBraket(_p13);
	var stringCut = _p12._0;
	var stringCut2 = _p12._1;
	var b = {
		ctor: '::',
		_0: {
			id: _Skinney$fnv$FNV$hashString(
				A2(_elm_lang$core$Basics_ops['++'], _p13, _p14)),
			from: _Skinney$fnv$FNV$hashString(_p13),
			to: _Skinney$fnv$FNV$hashString(_p14),
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
				function (_p15) {
					var _p16 = _p15;
					return {
						ctor: '::',
						_0: _p16._0,
						_1: {
							ctor: '::',
							_0: _p16._1,
							_1: {ctor: '[]'}
						}
					};
				},
				li);
			var _p17 = li;
			if (_p17.ctor === '[]') {
				return res;
			} else {
				var _p20 = _p17._0._1;
				var _p19 = _p17._1;
				var _p18 = _p17._0._0;
				if (A2(
					_user$project$Util$exists,
					wholeseq,
					function (z) {
						return A2(
							_elm_lang$core$List$member,
							{ctor: '_Tuple2', _0: z, _1: _p20},
							_p19);
					})) {
					var _v13 = _p19,
						_v14 = {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: _p18,
							_1: A2(_elm_lang$core$Basics_ops['++'], _p20, ' ')
						},
						_1: res
					};
					li = _v13;
					res = _v14;
					continue addBlank;
				} else {
					var _v15 = _p19,
						_v16 = {
						ctor: '::',
						_0: {ctor: '_Tuple2', _0: _p18, _1: _p20},
						_1: res
					};
					li = _v15;
					res = _v16;
					continue addBlank;
				}
			}
		}
	});
var _user$project$Common_sequent$tree2vis = F2(
	function (_p21, list_tofrom) {
		var _p22 = _p21;
		var _p26 = _p22._1;
		var _p23 = _p26;
		if (_p23.ctor === '[]') {
			return list_tofrom;
		} else {
			return function (x) {
				return function (list) {
					return function (f) {
						return _user$project$Util$nub2(
							A2(_elm_lang$core$List$concatMap, f, _p26));
					}(
						function (tree) {
							return A2(_user$project$Common_sequent$tree2vis, tree, list);
						});
				}(
					A2(_elm_lang$core$Basics_ops['++'], list_tofrom, x));
			}(
				A2(
					_elm_lang$core$List$map,
					function (_p24) {
						var _p25 = _p24;
						return {ctor: '_Tuple2', _0: _p22._0, _1: _p25._0};
					},
					_p23));
		}
	});
var _user$project$Common_sequent$outputLabelExp3 = function (f) {
	var gg = function (_p27) {
		var _p28 = _p27;
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
						_p28._1)),
				A2(
					_elm_lang$core$Basics_ops['++'],
					')(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p28._0,
						A2(
							_elm_lang$core$Basics_ops['++'],
							')(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_p28._2,
								A2(
									_elm_lang$core$Basics_ops['++'],
									',',
									A2(_elm_lang$core$Basics_ops['++'], _p28._3, ')'))))))));
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
		var _p29 = f;
		_v21_4:
		do {
			if (_p29.ctor === 'RelAtom') {
				if (_p29._0.ctor === '_Tuple4') {
					if (_p29._0._1.ctor === '::') {
						if ((((_p29._0._2.ctor === '_Tuple2') && (_p29._0._2._1.ctor === '[]')) && (_p29._0._3.ctor === '_Tuple2')) && (_p29._0._3._1.ctor === '[]')) {
							return A2(
								_elm_lang$core$Basics_ops['++'],
								'<i>',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$Util$show(_p29._0._2._0),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'R',
										A2(
											_elm_lang$core$Basics_ops['++'],
											_p29._0._0,
											A2(
												_elm_lang$core$Basics_ops['++'],
												'(',
												A2(
													_elm_lang$core$Basics_ops['++'],
													gg(
														{ctor: '::', _0: _p29._0._1._0, _1: _p29._0._1._1}),
													A2(
														_elm_lang$core$Basics_ops['++'],
														')',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_user$project$Util$show(_p29._0._3._0),
															'</i>'))))))));
						} else {
							break _v21_4;
						}
					} else {
						if ((_p29._0._2.ctor === '_Tuple2') && (_p29._0._3.ctor === '_Tuple2')) {
							if ((_p29._0._2._1.ctor === '[]') && (_p29._0._3._1.ctor === '[]')) {
								return A2(
									_elm_lang$core$Basics_ops['++'],
									'<i>',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_user$project$Util$show(_p29._0._2._0),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'R',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_p29._0._0,
												A2(
													_elm_lang$core$Basics_ops['++'],
													_user$project$Util$show(_p29._0._3._0),
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
											_user$project$Util$show(_p29._0._2._0),
											A2(
												_elm_lang$core$Basics_ops['++'],
												',',
												A2(
													_elm_lang$core$Basics_ops['++'],
													A2(
														_elm_lang$core$String$join,
														',',
														A2(_elm_lang$core$List$map, _user$project$Common_syntax$outputAction, _p29._0._2._1)),
													A2(
														_elm_lang$core$Basics_ops['++'],
														')',
														A2(
															_elm_lang$core$Basics_ops['++'],
															'R',
															A2(
																_elm_lang$core$Basics_ops['++'],
																_p29._0._0,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'(',
																	A2(
																		_elm_lang$core$Basics_ops['++'],
																		_user$project$Util$show(_p29._0._3._0),
																		A2(
																			_elm_lang$core$Basics_ops['++'],
																			',',
																			A2(
																				_elm_lang$core$Basics_ops['++'],
																				A2(
																					_elm_lang$core$String$join,
																					',',
																					A2(_elm_lang$core$List$map, _user$project$Common_syntax$outputAction, _p29._0._3._1)),
																				A2(_elm_lang$core$Basics_ops['++'], ')', '</i>')))))))))))));
							}
						} else {
							break _v21_4;
						}
					}
				} else {
					break _v21_4;
				}
			} else {
				if (_p29._0.ctor === '_Tuple2') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Util$show(_p29._0._0),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'=<',
							_user$project$Util$show(_p29._0._1)));
				} else {
					break _v21_4;
				}
			}
		} while(false);
		return _elm_lang$core$Native_Utils.crashCase(
			'Common_sequent',
			{
				start: {line: 936, column: 5},
				end: {line: 944, column: 58}
			},
			_p29)('error in outputLabelExp2');
	});
var _user$project$Common_sequent$action2string = function (pam) {
	var _p31 = pam;
	switch (_p31.ctor) {
		case 'PointAModel':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p31._0.am_name,
					A2(
						_elm_lang$core$Basics_ops['++'],
						',',
						A2(_elm_lang$core$Basics_ops['++'], _p31._1, ')'))));
		case 'Cup':
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$action2string(_p31._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'U',
					_user$project$Common_sequent$action2string(_p31._1)));
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$Common_sequent$action2string(_p31._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					';',
					_user$project$Common_sequent$action2string(_p31._1)));
	}
};
var _user$project$Common_sequent$outputLabelExp = F2(
	function (n, _p32) {
		var _p33 = _p32;
		var _p45 = _p33._0._1;
		var _p44 = _p33._0._3;
		var _p43 = _p33._0._0;
		var _p42 = _p33._0._2;
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
					_p43)));
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
					_p43)));
		var ff = function (_p34) {
			return _user$project$Util$concatComma(
				A2(
					_elm_lang$core$List$map,
					function (y) {
						var _p35 = y;
						if (_p35.ctor === 'PointAModel') {
							return _user$project$Common_syntax$outputAction(
								A2(_user$project$Common_syntax$PointAModel, _p35._0, _p35._1));
						} else {
							return _elm_lang$core$Native_Utils.crashCase(
								'Common_sequent',
								{
									start: {line: 902, column: 48},
									end: {line: 904, column: 97}
								},
								_p35)('error in error in outputLabelExp (1)');
						}
					},
					_p34));
		};
		var gg = function (_p37) {
			return _user$project$Util$concatComma(
				A2(
					_elm_lang$core$List$map,
					_user$project$Common_syntax$outputForm(n),
					_p37));
		};
		var _p38 = _p42;
		if (_p38.ctor === '[]') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'<b>',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_elm_lang$core$Basics$toString(_p45),
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
									A2(_user$project$Common_syntax$outputForm, n, _p44),
									'</code>'))))));
		} else {
			var _p39 = _p38._0;
			if (_p39.ctor === 'Left') {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'<b>',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_elm_lang$core$Basics$toString(_p45),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								gg(
									_toastal$either$Either$lefts(_p42)),
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
												A2(_user$project$Common_syntax$outputForm, n, _p44),
												'</code>'))))))));
			} else {
				var _p40 = _p39._0;
				if (_p40.ctor === 'PointAModel') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'<b>',
						A2(
							_elm_lang$core$Basics_ops['++'],
							'(',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_elm_lang$core$Basics$toString(_p45),
								A2(
									_elm_lang$core$Basics_ops['++'],
									',',
									A2(
										_elm_lang$core$Basics_ops['++'],
										ff(
											_toastal$either$Either$rights(_p42)),
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
														A2(_user$project$Common_syntax$outputForm, n, _p44),
														'</code>')))))))));
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Common_sequent',
						{
							start: {line: 919, column: 20},
							end: {line: 921, column: 59}
						},
						_p40)('error in outputLabelExp (2)');
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
	var _p46 = _elm_lang$core$List$isEmpty(seq.forDEL);
	if (_p46 === true) {
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
	function (listrule, _p47) {
		divideRules:
		while (true) {
			var _p48 = _p47;
			var _p58 = _p48._2;
			var _p57 = _p48._3;
			var _p56 = _p48._4;
			var _p55 = _p48._5;
			var _p54 = _p48._0;
			var _p53 = _p48._1;
			var _p49 = listrule;
			if (_p49.ctor === '::') {
				var _p52 = _p49._1;
				var _p51 = _p49._0;
				var _p50 = _p51.category;
				switch (_p50.ctor) {
					case 'Rule4LeftFormula':
						var _v32 = _p52,
							_v33 = {
							ctor: '_Tuple6',
							_0: _p54,
							_1: {ctor: '::', _0: _p51, _1: _p53},
							_2: _p58,
							_3: _p57,
							_4: _p56,
							_5: _p55
						};
						listrule = _v32;
						_p47 = _v33;
						continue divideRules;
					case 'Rule4LeftRel':
						var _v34 = _p52,
							_v35 = {
							ctor: '_Tuple6',
							_0: {ctor: '::', _0: _p51, _1: _p54},
							_1: _p53,
							_2: _p58,
							_3: _p57,
							_4: _p56,
							_5: _p55
						};
						listrule = _v34;
						_p47 = _v35;
						continue divideRules;
					case 'Rule4RightFormula':
						var _v36 = _p52,
							_v37 = {
							ctor: '_Tuple6',
							_0: _p54,
							_1: _p53,
							_2: _p58,
							_3: {ctor: '::', _0: _p51, _1: _p57},
							_4: _p56,
							_5: _p55
						};
						listrule = _v36;
						_p47 = _v37;
						continue divideRules;
					case 'Rule4RightRel':
						var _v38 = _p52,
							_v39 = {
							ctor: '_Tuple6',
							_0: _p54,
							_1: _p53,
							_2: {ctor: '::', _0: _p51, _1: _p58},
							_3: _p57,
							_4: _p56,
							_5: _p55
						};
						listrule = _v38;
						_p47 = _v39;
						continue divideRules;
					case 'Rule4DEL':
						var _v40 = _p52,
							_v41 = {
							ctor: '_Tuple6',
							_0: _p54,
							_1: _p53,
							_2: _p58,
							_3: _p57,
							_4: {ctor: '::', _0: _p51, _1: _p56},
							_5: _p55
						};
						listrule = _v40;
						_p47 = _v41;
						continue divideRules;
					default:
						var _v42 = _p52,
							_v43 = {
							ctor: '_Tuple6',
							_0: _p54,
							_1: _p53,
							_2: _p58,
							_3: _p57,
							_4: _p56,
							_5: {ctor: '::', _0: _p51, _1: _p55}
						};
						listrule = _v42;
						_p47 = _v43;
						continue divideRules;
				}
			} else {
				return {ctor: '_Tuple6', _0: _p54, _1: _p53, _2: _p58, _3: _p57, _4: _p56, _5: _p55};
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
		var _p59 = f;
		if (_p59.ctor === 'AnyFormula') {
			return true;
		} else {
			return false;
		}
	};
	var ff = function (_p60) {
		var _p61 = _p60;
		return _p61._0._3;
	};
	return _user$project$Util$or(
		A2(
			_elm_lang$core$List$map,
			function (_p62) {
				return gg(
					ff(_p62));
			},
			A2(_elm_lang$core$Basics_ops['++'], seq.leftForm, seq.rightForm)));
};
var _user$project$Common_sequent$isProvable = function (pr) {
	var gg = function (_p63) {
		var _p64 = _p63;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			{
				ctor: '::',
				_0: _p64._1,
				_1: {ctor: '[]'}
			},
			A2(_elm_lang$core$List$concatMap, gg, _p64._2));
	};
	var ruleList = gg(pr);
	return A2(_elm_lang$core$List$member, 'end', ruleList) ? 0 : (A2(_elm_lang$core$List$member, 'stop', ruleList) ? 9 : (A2(_elm_lang$core$List$member, 'limit', ruleList) ? 2 : 1));
};
var _user$project$Common_sequent$sortRelAtom = function (li) {
	var gg3 = function (x) {
		var _p65 = x;
		if (_p65.ctor === 'RelAtom') {
			return _p65._0._3._0;
		} else {
			return _p65._0._0;
		}
	};
	var gg2 = function (x) {
		var _p66 = x;
		if (_p66.ctor === 'RelAtom') {
			return _p66._0._2._0;
		} else {
			return _p66._0._0;
		}
	};
	var gg1 = function (x) {
		var _p67 = x;
		if (_p67.ctor === 'RelAtom') {
			return _p67._0._0;
		} else {
			return _user$project$Util$show(_p67._0._0);
		}
	};
	return function (x) {
		return A2(_elm_lang$core$List$sortWith, x, li);
	}(
		A6(_TSFoster$elm_compare$Compare$by, gg1, _TSFoster$elm_compare$Compare$thenBy, gg2, _TSFoster$elm_compare$Compare$thenBy, gg3, _TSFoster$elm_compare$Compare$ascending));
};
var _user$project$Common_sequent$sortLabelForm = function (li) {
	var gg3 = function (_p68) {
		var _p69 = _p68;
		return _elm_lang$core$List$length(_p69._0._2);
	};
	var gg2 = function (_p70) {
		var _p71 = _p70;
		return _user$project$Common_syntax$formula2Int(_p71._0._3);
	};
	var gg1 = function (_p72) {
		var _p73 = _p72;
		return _p73._0._1;
	};
	return A2(
		_elm_lang$core$List$sortWith,
		A6(_TSFoster$elm_compare$Compare$by, gg1, _TSFoster$elm_compare$Compare$thenBy, gg2, _TSFoster$elm_compare$Compare$thenBy, gg3, _TSFoster$elm_compare$Compare$ascending),
		li);
};
var _user$project$Common_sequent$sortLeftRightOfSeq = function (seq) {
	var ff = function (_p74) {
		return _user$project$Util$nub(
			_user$project$Common_sequent$sortLabelForm(_p74));
	};
	var gg = function (_p75) {
		return _user$project$Util$nub(
			_user$project$Common_sequent$sortRelAtom(_p75));
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
		var _p76 = x;
		if (_p76.ctor === 'RelAtom') {
			return {ctor: '::', _0: _p76._0._0, _1: li};
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
					var _p77 = y;
					switch (_p77.ctor) {
						case 'Box':
							var _v55 = _p77._1,
								_v56 = {ctor: '::', _0: _p77._0, _1: zs};
							y = _v55;
							zs = _v56;
							continue gg;
						case 'Dia':
							var _v57 = _p77._1,
								_v58 = {ctor: '::', _0: _p77._0, _1: zs};
							y = _v57;
							zs = _v58;
							continue gg;
						case 'Not':
							var _v59 = _p77._0,
								_v60 = zs;
							y = _v59;
							zs = _v60;
							continue gg;
						case 'And':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p77._0, zs),
								A2(gg, _p77._1, zs));
						case 'Or':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p77._0, zs),
								A2(gg, _p77._1, zs));
						case 'Imply':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p77._0, zs),
								A2(gg, _p77._1, zs));
						case 'Iff':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p77._0, zs),
								A2(gg, _p77._1, zs));
						case 'Announce':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p77._0, zs),
								A2(gg, _p77._1, zs));
						case 'Announce2':
							return A2(
								_elm_lang$core$Basics_ops['++'],
								A2(gg, _p77._0, zs),
								A2(gg, _p77._1, zs));
						default:
							return zs;
					}
				}
			});
		var _p78 = x;
		if (_p78.ctor === 'Left') {
			return A2(gg, _p78._0._0._3, ags);
		} else {
			if (_p78._0.ctor === 'RelAtom') {
				return {ctor: '::', _0: _p78._0._0._0, _1: ags};
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
	var gg3 = function (_p79) {
		var _p80 = _p79;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			gg_(_p80._2),
			gg_(_p80._3));
	};
	var gg2 = function (x) {
		var _p81 = x;
		if (_p81.ctor === 'RelAtom') {
			return {
				ctor: '::',
				_0: _p81._0._2._0,
				_1: {
					ctor: '::',
					_0: _p81._0._3._0,
					_1: {ctor: '[]'}
				}
			};
		} else {
			return {
				ctor: '::',
				_0: _p81._0._0,
				_1: {
					ctor: '::',
					_0: _p81._0._1,
					_1: {ctor: '[]'}
				}
			};
		}
	};
	var gg1 = function (_p82) {
		var _p83 = _p82;
		return {
			ctor: '::',
			_0: _p83._0._1,
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
	var n = function (_p84) {
		return _elm_lang$core$List$maximum(
			_user$project$Common_sequent$wholeLabel(_p84));
	}(sq);
	var _p85 = n;
	if (_p85.ctor === 'Nothing') {
		return 0;
	} else {
		return _p85._0 + 1;
	}
};
var _user$project$Common_sequent$deadEnd = function (seq) {
	var ff = function (n) {
		return A2(
			_elm_lang$core$List$map,
			function (z) {
				var _p86 = z;
				if ((((_p86.ctor === 'RelAtom') && (_p86._0.ctor === '_Tuple4')) && (_p86._0._3.ctor === '_Tuple2')) && (_p86._0._3._1.ctor === '[]')) {
					var _p89 = _p86._0._3._0;
					return ((!_elm_lang$core$Native_Utils.eq(
						_p86._0._2,
						{
							ctor: '_Tuple2',
							_0: _p89,
							_1: {ctor: '[]'}
						})) && (!A2(
						_user$project$Util$exists,
						seq.leftRel,
						function (w) {
							var _p87 = w;
							if ((((((_p87.ctor === 'RelAtom') && (_p87._0.ctor === '_Tuple4')) && (_p87._0._2.ctor === '_Tuple2')) && (_p87._0._2._1.ctor === '[]')) && (_p87._0._3.ctor === '_Tuple2')) && (_p87._0._3._1.ctor === '[]')) {
								return _elm_lang$core$Native_Utils.eq(
									_toastal$either$Either$Left(_p89),
									_toastal$either$Either$Left(_p87._0._2._0));
							} else {
								return _elm_lang$core$Native_Utils.crashCase(
									'Common_sequent',
									{
										start: {line: 618, column: 68},
										end: {line: 620, column: 63}
									},
									_p87)('error in deadEnd (1)');
							}
						}))) ? _elm_lang$core$Maybe$Just(_p89) : _elm_lang$core$Maybe$Nothing;
				} else {
					return _elm_lang$core$Native_Utils.crashCase(
						'Common_sequent',
						{
							start: {line: 616, column: 18},
							end: {line: 623, column: 52}
						},
						_p86)('error in deadEnd (2)');
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
		var _p91 = {ctor: '_Tuple2', _0: exp1, _1: exp2};
		if (((((((_p91.ctor === '_Tuple2') && (_p91._0.ctor === 'RelAtom')) && (_p91._0._0.ctor === '_Tuple4')) && (_p91._0._0._1.ctor === '[]')) && (_p91._1.ctor === 'RelAtom')) && (_p91._1._0.ctor === '_Tuple4')) && (_p91._1._0._1.ctor === '[]')) {
			var _p92 = _p91._0._0._0;
			return (_elm_lang$core$Native_Utils.eq(_p92, _p91._1._0._0) && _elm_lang$core$Native_Utils.eq(_p91._0._0._3, _p91._1._0._2)) ? {
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
								_0: _p92,
								_1: {ctor: '[]'},
								_2: _p91._0._0._2,
								_3: _p91._1._0._3
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
		var _p93 = {ctor: '_Tuple2', _0: exp1, _1: exp2};
		if (((((((_p93.ctor === '_Tuple2') && (_p93._0.ctor === 'RelAtom')) && (_p93._0._0.ctor === '_Tuple4')) && (_p93._0._0._1.ctor === '[]')) && (_p93._1.ctor === 'RelAtom')) && (_p93._1._0.ctor === '_Tuple4')) && (_p93._1._0._1.ctor === '[]')) {
			var _p96 = _p93._1._0._3;
			var _p95 = _p93._0._0._3;
			var _p94 = _p93._0._0._0;
			return (_elm_lang$core$Native_Utils.eq(_p93._0._0._2, _p93._1._0._2) && _elm_lang$core$Native_Utils.eq(_p94, _p93._1._0._0)) ? {
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
								_0: _p94,
								_1: {ctor: '[]'},
								_2: _p95,
								_3: _p96
							}),
						_1: {
							ctor: '::',
							_0: _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p94,
									_1: {ctor: '[]'},
									_2: _p96,
									_3: _p95
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
var _user$project$Common_sequent$drawTexProof = function (q) {
	var _p97 = q;
	if ((_p97.ctor === '::') && (_p97._1.ctor === '[]')) {
		var _p100 = _p97._0._0;
		var _p99 = _p97._0._1;
		var _p98 = _p97._0._2;
		if (_p98.ctor === '[]') {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'\\infer[\\mbox{($',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$Common_sequent$texRule(_p99),
					A2(
						_elm_lang$core$Basics_ops['++'],
						'$)}]{',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_sequent$drawTexSequent(_p100),
							'}{}'))));
		} else {
			if (_p98._1.ctor === '[]') {
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'\\infer[\\mbox{($',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$texRule(_p99),
						A2(
							_elm_lang$core$Basics_ops['++'],
							'$)}]{',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_user$project$Common_sequent$drawTexSequent(_p100),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'}{',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_user$project$Common_sequent$drawTexProof(
											{
												ctor: '::',
												_0: A3(_user$project$Common_sequent$Proof, _p98._0._0, _p98._0._1, _p98._0._2),
												_1: {ctor: '[]'}
											}),
										'}'))))));
			} else {
				if (_p98._1._1.ctor === '[]') {
					return A2(
						_elm_lang$core$Basics_ops['++'],
						'\\infer[\\mbox{($',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Common_sequent$texRule(_p99),
							A2(
								_elm_lang$core$Basics_ops['++'],
								'$)}]{',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$Common_sequent$drawTexSequent(_p100),
									A2(
										_elm_lang$core$Basics_ops['++'],
										'}',
										A2(
											_elm_lang$core$Basics_ops['++'],
											'{',
											A2(
												_elm_lang$core$Basics_ops['++'],
												_user$project$Common_sequent$drawTexProof(
													{
														ctor: '::',
														_0: A3(_user$project$Common_sequent$Proof, _p98._0._0, _p98._0._1, _p98._0._2),
														_1: {ctor: '[]'}
													}),
												A2(
													_elm_lang$core$Basics_ops['++'],
													'&',
													A2(
														_elm_lang$core$Basics_ops['++'],
														_user$project$Common_sequent$drawTexProof(
															{
																ctor: '::',
																_0: A3(_user$project$Common_sequent$Proof, _p98._1._0._0, _p98._1._0._1, _p98._1._0._2),
																_1: {ctor: '[]'}
															}),
														'}')))))))));
				} else {
					if (_p98._1._1._1.ctor === '[]') {
						return A2(
							_elm_lang$core$Basics_ops['++'],
							'\\infer[\\mbox{($',
							A2(
								_elm_lang$core$Basics_ops['++'],
								_user$project$Common_sequent$texRule(_p99),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'$)}]{',
									A2(
										_elm_lang$core$Basics_ops['++'],
										_user$project$Common_sequent$drawTexSequent(_p100),
										A2(
											_elm_lang$core$Basics_ops['++'],
											'}',
											A2(
												_elm_lang$core$Basics_ops['++'],
												'{',
												A2(
													_elm_lang$core$Basics_ops['++'],
													_user$project$Common_sequent$drawTexProof(
														{
															ctor: '::',
															_0: A3(_user$project$Common_sequent$Proof, _p98._0._0, _p98._0._1, _p98._0._2),
															_1: {ctor: '[]'}
														}),
													A2(
														_elm_lang$core$Basics_ops['++'],
														'&',
														A2(
															_elm_lang$core$Basics_ops['++'],
															_user$project$Common_sequent$drawTexProof(
																{
																	ctor: '::',
																	_0: A3(_user$project$Common_sequent$Proof, _p98._1._0._0, _p98._1._0._1, _p98._1._0._2),
																	_1: {ctor: '[]'}
																}),
															A2(
																_elm_lang$core$Basics_ops['++'],
																'&',
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	_user$project$Common_sequent$drawTexProof(
																		{
																			ctor: '::',
																			_0: A3(_user$project$Common_sequent$Proof, _p98._1._1._0._0, _p98._1._1._0._1, _p98._1._1._0._2),
																			_1: {ctor: '[]'}
																		}),
																	'}')))))))))));
					} else {
						return 'error in drawTexProof (1)';
					}
				}
			}
		}
	} else {
		return 'error in drawTexProof (2)';
	}
};
var _user$project$Common_sequent$Rule4Other = {ctor: 'Rule4Other'};
var _user$project$Common_sequent$axiomRule = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$initN,
		category: _user$project$Common_sequent$Rule4Other,
		rulename: 'init',
		rule: function (seq) {
			var deleteBoxHistoty = function (_p101) {
				var _p102 = _p101;
				return _user$project$Common_sequent$LabelForm(
					{
						ctor: '_Tuple4',
						_0: {ctor: '[]'},
						_1: _p102._0._1,
						_2: _p102._0._2,
						_3: _p102._0._3
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
						var _p103 = a;
						if ((_p103._0.ctor === '_Tuple4') && (_p103._0._3.ctor === 'Top')) {
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
							var _p104 = a;
							if ((_p104._0.ctor === '_Tuple4') && (_p104._0._3.ctor === 'Bot')) {
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
		var _p105 = li;
		if (_p105.ctor === '[]') {
			return _elm_lang$core$Maybe$Nothing;
		} else {
			var _p106 = _p105._0;
			if (A2(
				_user$project$Util$forall,
				_user$project$Common_sequent$axiomRule,
				function (x) {
					return function (y) {
						return _elm_lang$core$Native_Utils.eq(_elm_lang$core$Maybe$Nothing, y);
					}(
						_elm_community$maybe_extra$Maybe_Extra$combine(
							A2(_elm_lang$core$List$map, x.rule, _p106.resultSequents)));
				})) {
				var _v76 = _p105._1;
				li = _v76;
				continue initCheck;
			} else {
				return _elm_lang$core$Maybe$Just(_p106);
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
			function (_p107) {
				return function (_) {
					return _.priority;
				}(
					function (_) {
						return _.appliedRule;
					}(_p107));
			},
			branches);
		if (_elm_lang$core$Native_Utils.cmp(
			_elm_lang$core$List$length(
				A2(_elm_lang$core$Basics_ops['++'], seq.leftRel, seq.rightRel)) + _elm_lang$core$List$length(
				A2(_elm_lang$core$Basics_ops['++'], seq.leftForm, seq.rightForm)),
			maxNum) > 0) {
			return limitBranch;
		} else {
			var _p108 = branchesSorted;
			if (_p108.ctor === '[]') {
				return _user$project$Common_sequent$anyFormulaCheck(seq) ? stopBranch : endBranch;
			} else {
				var _p109 = _user$project$Common_sequent$initCheck(branchesSorted);
				if (_p109.ctor === 'Just') {
					return _user$project$Common_sequent$sortSeqOfBranch(_p109._0);
				} else {
					return _user$project$Common_sequent$sortSeqOfBranch(_p108._0);
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
		var _p110 = seq;
		if (_p110.ctor === 'Nothing') {
			return false;
		} else {
			var prf = A3(_user$project$Common_sequent$makeProofTree, maxNum, ruleSet, _p110._0);
			var _p111 = _user$project$Common_sequent$isProvable(prf);
			if (_p111 === 1) {
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
			var _p112 = headLa;
			if (_p112.ctor === 'Nothing') {
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
										_0: _p112._0,
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
			var _p113 = seq.leftForm;
			if (((_p113.ctor === '::') && (_p113._0._0.ctor === '_Tuple4')) && (_p113._0._0._3.ctor === 'Not')) {
				var add1 = _user$project$Common_sequent$LabelForm(
					{ctor: '_Tuple4', _0: _p113._0._0._0, _1: _p113._0._0._1, _2: _p113._0._0._2, _3: _p113._0._0._3._0});
				return _elm_lang$core$Maybe$Just(
					{
						ctor: '::',
						_0: _elm_lang$core$Native_Utils.update(
							seq,
							{
								leftForm: _p113._1,
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
				var _p114 = seq.rightForm;
				if (((_p114.ctor === '::') && (_p114._0._0.ctor === '_Tuple4')) && (_p114._0._0._3.ctor === 'Not')) {
					var add1 = _user$project$Common_sequent$LabelForm(
						{ctor: '_Tuple4', _0: _p114._0._0._0, _1: _p114._0._0._1, _2: _p114._0._0._2, _3: _p114._0._0._3._0});
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
									rightForm: _p114._1
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
					var _p115 = seq.leftForm;
					if (((_p115.ctor === '::') && (_p115._0._0.ctor === '_Tuple4')) && (_p115._0._0._3.ctor === 'And')) {
						var _p118 = _p115._0._0._1;
						var _p117 = _p115._0._0._0;
						var _p116 = _p115._0._0._2;
						var add2 = _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p117, _1: _p118, _2: _p116, _3: _p115._0._0._3._1});
						var add1 = _user$project$Common_sequent$LabelForm(
							{ctor: '_Tuple4', _0: _p117, _1: _p118, _2: _p116, _3: _p115._0._0._3._0});
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
											_p115._1)
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
						var _p119 = seq.rightForm;
						if (((_p119.ctor === '::') && (_p119._0._0.ctor === '_Tuple4')) && (_p119._0._0._3.ctor === 'And')) {
							var _p123 = _p119._1;
							var _p122 = _p119._0._0._1;
							var _p121 = _p119._0._0._0;
							var _p120 = _p119._0._0._2;
							var f2 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p121, _1: _p122, _2: _p120, _3: _p119._0._0._3._1});
							var f1 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p121, _1: _p122, _2: _p120, _3: _p119._0._0._3._0});
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
												_p123)
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
													_p123)
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
							var _p124 = seq.leftForm;
							if (((_p124.ctor === '::') && (_p124._0._0.ctor === '_Tuple4')) && (_p124._0._0._3.ctor === 'Or')) {
								var _p128 = _p124._1;
								var _p127 = _p124._0._0._1;
								var _p126 = _p124._0._0._0;
								var _p125 = _p124._0._0._2;
								var add2 = _user$project$Common_sequent$LabelForm(
									{ctor: '_Tuple4', _0: _p126, _1: _p127, _2: _p125, _3: _p124._0._0._3._1});
								var add1 = _user$project$Common_sequent$LabelForm(
									{ctor: '_Tuple4', _0: _p126, _1: _p127, _2: _p125, _3: _p124._0._0._3._0});
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
													_p128)
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
														_p128)
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
								var _p129 = seq.rightForm;
								if (((_p129.ctor === '::') && (_p129._0._0.ctor === '_Tuple4')) && (_p129._0._0._3.ctor === 'Or')) {
									var _p132 = _p129._0._0._1;
									var _p131 = _p129._0._0._0;
									var _p130 = _p129._0._0._2;
									var add2 = _user$project$Common_sequent$LabelForm(
										{ctor: '_Tuple4', _0: _p131, _1: _p132, _2: _p130, _3: _p129._0._0._3._1});
									var add1 = _user$project$Common_sequent$LabelForm(
										{ctor: '_Tuple4', _0: _p131, _1: _p132, _2: _p130, _3: _p129._0._0._3._0});
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
														_p129._1)
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
									var _p133 = seq.leftForm;
									if (((_p133.ctor === '::') && (_p133._0._0.ctor === '_Tuple4')) && (_p133._0._0._3.ctor === 'Imply')) {
										var _p137 = _p133._1;
										var _p136 = _p133._0._0._1;
										var _p135 = _p133._0._0._0;
										var _p134 = _p133._0._0._2;
										var add2 = _user$project$Common_sequent$LabelForm(
											{ctor: '_Tuple4', _0: _p135, _1: _p136, _2: _p134, _3: _p133._0._0._3._1});
										var add1 = _user$project$Common_sequent$LabelForm(
											{ctor: '_Tuple4', _0: _p135, _1: _p136, _2: _p134, _3: _p133._0._0._3._0});
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													seq,
													{
														leftForm: _p137,
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
																_p137)
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
										var _p138 = seq.rightForm;
										if (((_p138.ctor === '::') && (_p138._0._0.ctor === '_Tuple4')) && (_p138._0._0._3.ctor === 'Imply')) {
											var _p141 = _p138._0._0._1;
											var _p140 = _p138._0._0._0;
											var _p139 = _p138._0._0._2;
											var add2 = _user$project$Common_sequent$LabelForm(
												{ctor: '_Tuple4', _0: _p140, _1: _p141, _2: _p139, _3: _p138._0._0._3._1});
											var add1 = _user$project$Common_sequent$LabelForm(
												{ctor: '_Tuple4', _0: _p140, _1: _p141, _2: _p139, _3: _p138._0._0._3._0});
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
																_p138._1)
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
											var _p142 = seq.leftForm;
											if (((_p142.ctor === '::') && (_p142._0._0.ctor === '_Tuple4')) && (_p142._0._0._3.ctor === 'Imply2')) {
												var _p146 = _p142._1;
												var _p145 = _p142._0._0._1;
												var _p144 = _p142._0._0._0;
												var _p143 = _p142._0._0._2;
												var add2 = _user$project$Common_sequent$LabelForm(
													{ctor: '_Tuple4', _0: _p144, _1: _p145, _2: _p143, _3: _p142._0._0._3._0});
												var add1 = _user$project$Common_sequent$LabelForm(
													{ctor: '_Tuple4', _0: _p144, _1: _p145, _2: _p143, _3: _p142._0._0._3._1});
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
																	_p146)
															}),
														_1: {
															ctor: '::',
															_0: _elm_lang$core$Native_Utils.update(
																seq,
																{
																	leftForm: _p146,
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
												var _p147 = seq.rightForm;
												if (((_p147.ctor === '::') && (_p147._0._0.ctor === '_Tuple4')) && (_p147._0._0._3.ctor === 'Imply2')) {
													var _p150 = _p147._0._0._1;
													var _p149 = _p147._0._0._0;
													var _p148 = _p147._0._0._2;
													var add2 = _user$project$Common_sequent$LabelForm(
														{ctor: '_Tuple4', _0: _p149, _1: _p150, _2: _p148, _3: _p147._0._0._3._1});
													var add1 = _user$project$Common_sequent$LabelForm(
														{ctor: '_Tuple4', _0: _p149, _1: _p150, _2: _p148, _3: _p147._0._0._3._0});
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
																		_p147._1)
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
													var _p151 = seq.leftForm;
													if (((_p151.ctor === '::') && (_p151._0._0.ctor === '_Tuple4')) && (_p151._0._0._3.ctor === 'Iff')) {
														var _p153 = _p151._0._0._3._1;
														var _p152 = _p151._0._0._3._0;
														var add1 = _user$project$Common_sequent$LabelForm(
															{
																ctor: '_Tuple4',
																_0: _p151._0._0._0,
																_1: _p151._0._0._1,
																_2: _p151._0._0._2,
																_3: A2(
																	_user$project$Common_syntax$And,
																	A2(_user$project$Common_syntax$Imply, _p152, _p153),
																	A2(_user$project$Common_syntax$Imply, _p153, _p152))
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
																			_p151._1)
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
														var _p154 = seq.rightForm;
														if (((_p154.ctor === '::') && (_p154._0._0.ctor === '_Tuple4')) && (_p154._0._0._3.ctor === 'Iff')) {
															var _p156 = _p154._0._0._3._1;
															var _p155 = _p154._0._0._3._0;
															var add1 = _user$project$Common_sequent$LabelForm(
																{
																	ctor: '_Tuple4',
																	_0: _p154._0._0._0,
																	_1: _p154._0._0._1,
																	_2: _p154._0._0._2,
																	_3: A2(
																		_user$project$Common_syntax$And,
																		A2(_user$project$Common_syntax$Imply, _p155, _p156),
																		A2(_user$project$Common_syntax$Imply, _p156, _p155))
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
																				_p154._1)
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
			var _p157 = seq.rightForm;
			if (((_p157.ctor === '::') && (_p157._0._0.ctor === '_Tuple4')) && (_p157._0._0._3.ctor === 'Box')) {
				var _p158 = _p157._0._0._2;
				var $new = _user$project$Common_sequent$freshLabel(seq);
				var add1 = _user$project$Common_sequent$RelAtom(
					{
						ctor: '_Tuple4',
						_0: _p157._0._0._3._0,
						_1: _toastal$either$Either$lefts(_p158),
						_2: {
							ctor: '_Tuple2',
							_0: _p157._0._0._1,
							_1: {ctor: '[]'}
						},
						_3: {
							ctor: '_Tuple2',
							_0: $new,
							_1: {ctor: '[]'}
						}
					});
				var add2 = _user$project$Common_sequent$LabelForm(
					{ctor: '_Tuple4', _0: _p157._0._0._0, _1: $new, _2: _p158, _3: _p157._0._0._3._1});
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
									_p157._1),
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
				var _p159 = seq.leftForm;
				if (((_p159.ctor === '::') && (_p159._0._0.ctor === '_Tuple4')) && (_p159._0._0._3.ctor === 'Box')) {
					var _p171 = _p159._0._0._1;
					var _p170 = _p159._0._0._3._1;
					var _p169 = _p159._1;
					var _p168 = _p159._0._0._0;
					var _p167 = _p159._0._0._2;
					var _p166 = _p159._0._0._3._0;
					var orig = function (_p160) {
						var _p161 = _p160;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p161._0, _1: _p161._1},
									_1: _p168
								},
								_1: _p171,
								_2: _p167,
								_3: A2(_user$project$Common_syntax$Box, _p166, _p170)
							});
					};
					var add2 = function (_p162) {
						var _p163 = _p162;
						return _user$project$Common_sequent$RelAtom(
							{
								ctor: '_Tuple4',
								_0: _p166,
								_1: _toastal$either$Either$lefts(_p167),
								_2: {
									ctor: '_Tuple2',
									_0: _p171,
									_1: {ctor: '[]'}
								},
								_3: {
									ctor: '_Tuple2',
									_0: _p163._0,
									_1: {ctor: '[]'}
								}
							});
					};
					var add1 = function (_p164) {
						var _p165 = _p164;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: {ctor: '[]'},
								_1: _p165._0,
								_2: _p167,
								_3: _p170
							});
					};
					var justlabel = function (wholeLabel2) {
						return _elm_community$list_extra$List_Extra$last(
							A2(_user$project$Util$difference, wholeLabel2, _p168));
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
											_p169)
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
												_p169),
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
					var _p172 = seq.rightForm;
					if (((_p172.ctor === '::') && (_p172._0._0.ctor === '_Tuple4')) && (_p172._0._0._3.ctor === 'Dia')) {
						var _p184 = _p172._0._0._1;
						var _p183 = _p172._1;
						var _p182 = _p172._0._0._3._1;
						var _p181 = _p172._0._0._0;
						var _p180 = _p172._0._0._2;
						var _p179 = _p172._0._0._3._0;
						var orig = function (_p173) {
							var _p174 = _p173;
							return _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: {
										ctor: '::',
										_0: {ctor: '_Tuple2', _0: _p174._0, _1: _p174._1},
										_1: _p181
									},
									_1: _p184,
									_2: _p180,
									_3: A2(_user$project$Common_syntax$Dia, _p179, _p182)
								});
						};
						var add2 = function (_p175) {
							var _p176 = _p175;
							return _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p179,
									_1: _toastal$either$Either$lefts(_p180),
									_2: {
										ctor: '_Tuple2',
										_0: _p184,
										_1: {ctor: '[]'}
									},
									_3: {
										ctor: '_Tuple2',
										_0: _p176._0,
										_1: {ctor: '[]'}
									}
								});
						};
						var add1 = function (_p177) {
							var _p178 = _p177;
							return _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: {ctor: '[]'},
									_1: _p178._0,
									_2: _p180,
									_3: _p182
								});
						};
						var justlabel = function (wholeLabel2) {
							return _elm_lang$core$List$head(
								A2(_user$project$Util$difference, wholeLabel2, _p181));
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
												_p183)
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
													_p183),
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
						var _p185 = seq.leftForm;
						if (((_p185.ctor === '::') && (_p185._0._0.ctor === '_Tuple4')) && (_p185._0._0._3.ctor === 'Dia')) {
							var _p186 = _p185._0._0._2;
							var $new = _user$project$Common_sequent$freshLabel(seq);
							var add1 = _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p185._0._0._3._0,
									_1: _toastal$either$Either$lefts(_p186),
									_2: {
										ctor: '_Tuple2',
										_0: _p185._0._0._1,
										_1: {ctor: '[]'}
									},
									_3: {
										ctor: '_Tuple2',
										_0: $new,
										_1: {ctor: '[]'}
									}
								});
							var add2 = _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p185._0._0._0, _1: $new, _2: _p186, _3: _p185._0._0._3._1});
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
												_p185._1),
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
			var _p187 = seq.leftRel;
			if ((((_p187.ctor === '::') && (_p187._0.ctor === 'RelAtom')) && (_p187._0._0.ctor === '_Tuple4')) && (_p187._0._0._1.ctor === '[]')) {
				var ff = _user$project$Common_sequent$tran(
					_user$project$Common_sequent$RelAtom(
						{
							ctor: '_Tuple4',
							_0: _p187._0._0._0,
							_1: {ctor: '[]'},
							_2: _p187._0._0._2,
							_3: _p187._0._0._3
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
			var _p188 = seq.leftRel;
			if ((((_p188.ctor === '::') && (_p188._0.ctor === 'RelAtom')) && (_p188._0._0.ctor === '_Tuple4')) && (_p188._0._0._1.ctor === '[]')) {
				var ff = _user$project$Common_sequent$eucl(
					_user$project$Common_sequent$RelAtom(
						{
							ctor: '_Tuple4',
							_0: _p188._0._0._0,
							_1: {ctor: '[]'},
							_2: _p188._0._0._2,
							_3: _p188._0._0._3
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
			var _p189 = seq.leftRel;
			if ((((_p189.ctor === '::') && (_p189._0.ctor === 'RelAtom')) && (_p189._0._0.ctor === '_Tuple4')) && (_p189._0._0._1.ctor === '[]')) {
				var le2 = _user$project$Util$nub(
					A2(
						_elm_lang$core$Basics_ops['++'],
						seq.leftRel,
						{
							ctor: '::',
							_0: _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p189._0._0._0,
									_1: {ctor: '[]'},
									_2: _p189._0._0._3,
									_3: _p189._0._0._2
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
		var _p190 = _elm_lang$core$String$toList(str);
		if (_p190.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			var _p194 = _p190._1;
			var _p191 = _p190._0;
			switch (_p191.valueOf()) {
				case 'K':
					var _v109 = _elm_lang$core$String$fromList(_p194);
					str = _v109;
					continue proofSystem;
				case 'T':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$ruleT,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p194)));
				case 'B':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$ruleB,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p194)));
				case 'D':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$ruleD,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p194)));
				case '4':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$rule4,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p194)));
				case '5':
					return A2(
						_elm_lang$core$Basics_ops['++'],
						_user$project$Common_sequent$rule5,
						_user$project$Common_sequent$proofSystem(
							_elm_lang$core$String$fromList(_p194)));
				case 'S':
					var _p192 = _p194;
					if (_p192.ctor === '[]') {
						return {ctor: '[]'};
					} else {
						var _p193 = _p192._0;
						switch (_p193.valueOf()) {
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
var _user$project$Common_sequent$Tree = F2(
	function (a, b) {
		return {ctor: 'Tree', _0: a, _1: b};
	});
var _user$project$Common_sequent$proof2tree = function (_p195) {
	var _p196 = _p195;
	return function (w) {
		return A2(
			_user$project$Common_sequent$Tree,
			A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_p196._1,
					A2(_elm_lang$core$Basics_ops['++'], ')  ', w))),
			A2(_elm_lang$core$List$map, _user$project$Common_sequent$proof2tree, _p196._2));
	}(
		_user$project$Common_sequent$outputSequent(_p196._0));
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

var _user$project$EModel$letter = function () {
	var name = 'letter';
	var w1 = '1';
	var letterV = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'p',
			_1: {
				ctor: '::',
				_0: w1,
				_1: {ctor: '[]'}
			}
		},
		_1: {ctor: '[]'}
	};
	var w0 = '0';
	var letterS = {
		ctor: '::',
		_0: w0,
		_1: {
			ctor: '::',
			_0: w1,
			_1: {ctor: '[]'}
		}
	};
	var letterR = A2(
		_elm_lang$core$Basics_ops['++'],
		{
			ctor: '::',
			_0: {ctor: '_Tuple3', _0: 'a', _1: w0, _2: w0},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'a', _1: w1, _2: w1},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'a', _1: w0, _2: w1},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'a', _1: w1, _2: w0},
						_1: {ctor: '[]'}
					}
				}
			}
		},
		{
			ctor: '::',
			_0: {ctor: '_Tuple3', _0: 'b', _1: w0, _2: w0},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'b', _1: w1, _2: w1},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'b', _1: w0, _2: w1},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'b', _1: w1, _2: w0},
						_1: {ctor: '[]'}
					}
				}
			}
		});
	return {em_name: name, em_domain: letterS, em_relation: letterR, em_value: letterV};
}();
var _user$project$EModel$makeRefl = F2(
	function (ag, dom) {
		return A2(
			_elm_lang$core$List$map,
			function (x) {
				return {ctor: '_Tuple3', _0: ag, _1: x, _2: x};
			},
			dom);
	});
var _user$project$EModel$hexaModel = function () {
	var w120 = '120';
	var w210 = '210';
	var w201 = '201';
	var w102 = '102';
	var w021 = '021';
	var w012 = '012';
	var hexaW = {
		ctor: '::',
		_0: w012,
		_1: {
			ctor: '::',
			_0: w021,
			_1: {
				ctor: '::',
				_0: w102,
				_1: {
					ctor: '::',
					_0: w201,
					_1: {
						ctor: '::',
						_0: w210,
						_1: {
							ctor: '::',
							_0: w120,
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	};
	var refl = function (ag) {
		return A2(
			_elm_lang$core$List$map,
			function (x) {
				return {ctor: '_Tuple3', _0: ag, _1: x, _2: x};
			},
			hexaW);
	};
	var hexaR = A2(
		_elm_lang$core$Basics_ops['++'],
		refl('a'),
		A2(
			_elm_lang$core$Basics_ops['++'],
			refl('b'),
			A2(
				_elm_lang$core$Basics_ops['++'],
				refl('c'),
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'a', _1: w012, _2: w021},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'a', _1: w102, _2: w120},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple3', _0: 'a', _1: w201, _2: w210},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: 'a', _1: w021, _2: w012},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple3', _0: 'a', _1: w120, _2: w102},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple3', _0: 'a', _1: w210, _2: w201},
											_1: {ctor: '[]'}
										}
									}
								}
							}
						}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						{
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'b', _1: w021, _2: w120},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple3', _0: 'b', _1: w012, _2: w210},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: 'b', _1: w102, _2: w201},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple3', _0: 'b', _1: w120, _2: w021},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple3', _0: 'b', _1: w210, _2: w012},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple3', _0: 'b', _1: w201, _2: w102},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						},
						{
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'c', _1: w012, _2: w102},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple3', _0: 'c', _1: w021, _2: w201},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: 'c', _1: w120, _2: w210},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple3', _0: 'c', _1: w102, _2: w012},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple3', _0: 'c', _1: w201, _2: w021},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple3', _0: 'c', _1: w210, _2: w120},
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						})))));
	var hexaV = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: '0a',
			_1: {
				ctor: '::',
				_0: w012,
				_1: {
					ctor: '::',
					_0: w021,
					_1: {ctor: '[]'}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: '1a',
				_1: {
					ctor: '::',
					_0: w102,
					_1: {
						ctor: '::',
						_0: w120,
						_1: {ctor: '[]'}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: '2a',
					_1: {
						ctor: '::',
						_0: w201,
						_1: {
							ctor: '::',
							_0: w210,
							_1: {ctor: '[]'}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: '0b',
						_1: {
							ctor: '::',
							_0: w102,
							_1: {
								ctor: '::',
								_0: w201,
								_1: {ctor: '[]'}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: '1b',
							_1: {
								ctor: '::',
								_0: w012,
								_1: {
									ctor: '::',
									_0: w210,
									_1: {ctor: '[]'}
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: '2b',
								_1: {
									ctor: '::',
									_0: w021,
									_1: {
										ctor: '::',
										_0: w120,
										_1: {ctor: '[]'}
									}
								}
							},
							_1: {
								ctor: '::',
								_0: {
									ctor: '_Tuple2',
									_0: '0c',
									_1: {
										ctor: '::',
										_0: w120,
										_1: {
											ctor: '::',
											_0: w210,
											_1: {ctor: '[]'}
										}
									}
								},
								_1: {
									ctor: '::',
									_0: {
										ctor: '_Tuple2',
										_0: '1c',
										_1: {
											ctor: '::',
											_0: w021,
											_1: {
												ctor: '::',
												_0: w201,
												_1: {ctor: '[]'}
											}
										}
									},
									_1: {
										ctor: '::',
										_0: {
											ctor: '_Tuple2',
											_0: '2c',
											_1: {
												ctor: '::',
												_0: w012,
												_1: {
													ctor: '::',
													_0: w102,
													_1: {ctor: '[]'}
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
	};
	return {em_name: 'hexa_model', em_domain: hexaW, em_relation: hexaR, em_value: hexaV};
}();
var _user$project$EModel$muddyModel = function () {
	var w111 = '111';
	var w101 = '101';
	var w110 = '110';
	var w011 = '011';
	var w100 = '100';
	var w010 = '010';
	var w001 = '001';
	var w000 = '000';
	var muddyW = {
		ctor: '::',
		_0: w000,
		_1: {
			ctor: '::',
			_0: w100,
			_1: {
				ctor: '::',
				_0: w001,
				_1: {
					ctor: '::',
					_0: w010,
					_1: {
						ctor: '::',
						_0: w011,
						_1: {
							ctor: '::',
							_0: w110,
							_1: {
								ctor: '::',
								_0: w101,
								_1: {
									ctor: '::',
									_0: w111,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	};
	var refl = function (ag) {
		return A2(
			_elm_lang$core$List$map,
			function (x) {
				return {ctor: '_Tuple3', _0: ag, _1: x, _2: x};
			},
			muddyW);
	};
	var muddyR = A2(
		_elm_lang$core$Basics_ops['++'],
		refl('a'),
		A2(
			_elm_lang$core$Basics_ops['++'],
			refl('b'),
			A2(
				_elm_lang$core$Basics_ops['++'],
				refl('c'),
				A2(
					_elm_lang$core$Basics_ops['++'],
					{
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'a', _1: w000, _2: w100},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'a', _1: w100, _2: w000},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple3', _0: 'a', _1: w010, _2: w110},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: 'a', _1: w110, _2: w010},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple3', _0: 'a', _1: w001, _2: w101},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple3', _0: 'a', _1: w101, _2: w001},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple3', _0: 'a', _1: w011, _2: w111},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple3', _0: 'a', _1: w111, _2: w011},
													_1: {ctor: '[]'}
												}
											}
										}
									}
								}
							}
						}
					},
					A2(
						_elm_lang$core$Basics_ops['++'],
						{
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'b', _1: w000, _2: w010},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple3', _0: 'b', _1: w010, _2: w000},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: 'b', _1: w100, _2: w110},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple3', _0: 'b', _1: w110, _2: w100},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple3', _0: 'b', _1: w001, _2: w011},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple3', _0: 'b', _1: w011, _2: w001},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple3', _0: 'b', _1: w101, _2: w111},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple3', _0: 'b', _1: w111, _2: w101},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						},
						{
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'c', _1: w000, _2: w001},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple3', _0: 'c', _1: w001, _2: w000},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: 'c', _1: w010, _2: w011},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple3', _0: 'c', _1: w011, _2: w010},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple3', _0: 'c', _1: w100, _2: w101},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple3', _0: 'c', _1: w101, _2: w100},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple3', _0: 'c', _1: w110, _2: w111},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple3', _0: 'c', _1: w111, _2: w110},
														_1: {ctor: '[]'}
													}
												}
											}
										}
									}
								}
							}
						})))));
	var muddyV = {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: '1a',
			_1: {
				ctor: '::',
				_0: w111,
				_1: {
					ctor: '::',
					_0: w101,
					_1: {
						ctor: '::',
						_0: w100,
						_1: {
							ctor: '::',
							_0: w110,
							_1: {ctor: '[]'}
						}
					}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: '0a',
				_1: {
					ctor: '::',
					_0: w011,
					_1: {
						ctor: '::',
						_0: w001,
						_1: {
							ctor: '::',
							_0: w000,
							_1: {
								ctor: '::',
								_0: w010,
								_1: {ctor: '[]'}
							}
						}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: '1b',
					_1: {
						ctor: '::',
						_0: w010,
						_1: {
							ctor: '::',
							_0: w111,
							_1: {
								ctor: '::',
								_0: w110,
								_1: {
									ctor: '::',
									_0: w011,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: '0b',
						_1: {
							ctor: '::',
							_0: w000,
							_1: {
								ctor: '::',
								_0: w101,
								_1: {
									ctor: '::',
									_0: w100,
									_1: {
										ctor: '::',
										_0: w001,
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: '1c',
							_1: {
								ctor: '::',
								_0: w001,
								_1: {
									ctor: '::',
									_0: w011,
									_1: {
										ctor: '::',
										_0: w101,
										_1: {
											ctor: '::',
											_0: w111,
											_1: {ctor: '[]'}
										}
									}
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: '0c',
								_1: {
									ctor: '::',
									_0: w000,
									_1: {
										ctor: '::',
										_0: w100,
										_1: {
											ctor: '::',
											_0: w010,
											_1: {
												ctor: '::',
												_0: w110,
												_1: {ctor: '[]'}
											}
										}
									}
								}
							},
							_1: {ctor: '[]'}
						}
					}
				}
			}
		}
	};
	return {em_name: 'muddy_children', em_domain: muddyW, em_relation: muddyR, em_value: muddyV};
}();
var _user$project$EModel$model2atomlist = function (mo) {
	return _user$project$Util$nub(
		A2(
			_elm_lang$core$List$map,
			function (_p0) {
				var _p1 = _p0;
				return _p1._0;
			},
			mo.em_value));
};
var _user$project$EModel$model2agentlist = function (mo) {
	return _user$project$Util$nub2(
		A2(
			_elm_lang$core$List$map,
			function (_p2) {
				var _p3 = _p2;
				return _p3._0;
			},
			mo.em_relation));
};
var _user$project$EModel$atoms2string = function (proplist) {
	return A2(_elm_lang$core$String$join, ',', proplist);
};
var _user$project$EModel$world2atoms = F2(
	function (mo, w) {
		var gg = function (p) {
			return {
				ctor: '_Tuple2',
				_0: p,
				_1: A2(_user$project$Util$lookup, p, mo.em_value)
			};
		};
		var pairPropW = A2(
			_elm_lang$core$List$map,
			gg,
			_user$project$EModel$model2atomlist(mo));
		var filterPairPropW = A2(
			_elm_lang$core$List$filter,
			function (_p4) {
				var _p5 = _p4;
				var _p6 = _p5._1;
				if (_p6.ctor === 'Nothing') {
					return false;
				} else {
					return A2(_elm_lang$core$List$member, w, _p6._0);
				}
			},
			pairPropW);
		return A2(
			_elm_lang$core$List$map,
			function (_p7) {
				var _p8 = _p7;
				return _p8._0;
			},
			filterPairPropW);
	});
var _user$project$EModel$singleAndDoubleArrow = F2(
	function (rels, _p9) {
		singleAndDoubleArrow:
		while (true) {
			var _p10 = _p9;
			var _p17 = _p10._0;
			var _p16 = _p10._1;
			var _p11 = rels;
			if (_p11.ctor === '::') {
				var _p15 = _p11._0._2;
				var _p14 = _p11._0._1;
				var _p13 = _p11._1;
				var _p12 = _p11._0._0;
				if (A2(
					_elm_lang$core$List$member,
					{ctor: '_Tuple3', _0: _p12, _1: _p15, _2: _p14},
					_p13)) {
					var _v7 = A2(
						_user$project$Util$delete,
						{ctor: '_Tuple3', _0: _p12, _1: _p15, _2: _p14},
						_p13),
						_v8 = {
						ctor: '_Tuple2',
						_0: _p17,
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: _p12, _1: _p14, _2: _p15},
							_1: _p16
						}
					};
					rels = _v7;
					_p9 = _v8;
					continue singleAndDoubleArrow;
				} else {
					var _v9 = _p13,
						_v10 = {
						ctor: '_Tuple2',
						_0: {
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: _p12, _1: _p14, _2: _p15},
							_1: _p17
						},
						_1: _p16
					};
					rels = _v9;
					_p9 = _v10;
					continue singleAndDoubleArrow;
				}
			} else {
				return {ctor: '_Tuple2', _0: _p17, _1: _p16};
			}
		}
	});
var _user$project$EModel$combineAgt = F2(
	function (rels, result) {
		combineAgt:
		while (true) {
			var _p18 = rels;
			if (_p18.ctor === '::') {
				var _p22 = _p18._0._2;
				var _p21 = _p18._0._1;
				var list_ags = A2(
					_elm_lang$core$List$filter,
					function (_p19) {
						var _p20 = _p19;
						return _elm_lang$core$Native_Utils.eq(_p20._1, _p21) && _elm_lang$core$Native_Utils.eq(_p20._2, _p22);
					},
					rels);
				var ags = A2(
					_elm_lang$core$String$join,
					',',
					_user$project$Util$nsort(
						A2(
							_elm_lang$core$List$map,
							function (a) {
								return _user$project$Util$fst3(a);
							},
							list_ags)));
				var _v13 = A2(_user$project$Util$difference, _p18._1, list_ags),
					_v14 = {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: ags, _1: _p21, _2: _p22},
					_1: result
				};
				rels = _v13;
				result = _v14;
				continue combineAgt;
			} else {
				return result;
			}
		}
	});
var _user$project$EModel$drawNode4model = F3(
	function (mo, w, w2) {
		return _elm_lang$core$Native_Utils.eq(w, w2) ? A2(
			_elm_lang$core$Basics_ops['++'],
			'{id: \"',
			A2(
				_elm_lang$core$Basics_ops['++'],
				w,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\", label:\"',
					A2(
						_elm_lang$core$Basics_ops['++'],
						w,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\", color: \'red\'',
							A2(
								_elm_lang$core$Basics_ops['++'],
								',title:\"',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$EModel$atoms2string(
										A2(_user$project$EModel$world2atoms, mo, w)),
									'\"},'))))))) : A2(
			_elm_lang$core$Basics_ops['++'],
			'{id: \"',
			A2(
				_elm_lang$core$Basics_ops['++'],
				w,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\", label:\"',
					A2(
						_elm_lang$core$Basics_ops['++'],
						w,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\", color: \'skyblue\'',
							A2(
								_elm_lang$core$Basics_ops['++'],
								',title:\"',
								A2(
									_elm_lang$core$Basics_ops['++'],
									_user$project$EModel$atoms2string(
										A2(_user$project$EModel$world2atoms, mo, w)),
									'\"},')))))));
	});
var _user$project$EModel$listOfAgentColor = {
	ctor: '::',
	_0: 'lime',
	_1: {
		ctor: '::',
		_0: 'blue',
		_1: {
			ctor: '::',
			_0: 'red',
			_1: {
				ctor: '::',
				_0: 'green',
				_1: {
					ctor: '::',
					_0: 'orange',
					_1: {
						ctor: '::',
						_0: 'turquoise',
						_1: {
							ctor: '::',
							_0: 'darkviolet',
							_1: {
								ctor: '::',
								_0: 'olive',
								_1: {ctor: '[]'}
							}
						}
					}
				}
			}
		}
	}
};
var _user$project$EModel$agentColor = F2(
	function (ag, ags) {
		var _p23 = A2(_elm_community$list_extra$List_Extra$elemIndex, ag, ags);
		if (_p23.ctor === 'Nothing') {
			return 'black';
		} else {
			var _p24 = A2(_elm_community$list_extra$List_Extra_ops['!!'], _user$project$EModel$listOfAgentColor, _p23._0);
			if (_p24.ctor === 'Nothing') {
				return 'gray';
			} else {
				return _p24._0;
			}
		}
	});
var _user$project$EModel$drawEdge4model = function (mo) {
	var rel = mo.em_relation;
	var _p25 = A2(
		_user$project$EModel$singleAndDoubleArrow,
		rel,
		{
			ctor: '_Tuple2',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		});
	var single = _p25._0;
	var $double = _p25._1;
	var ags = _user$project$EModel$model2agentlist(mo);
	var singleArrow = function (_p26) {
		var _p27 = _p26;
		var _p28 = _p27._0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'{from: \"',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p27._1,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\", to:\"',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p27._2,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\", color:\'',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_user$project$EModel$agentColor, _p28, ags),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\'',
									A2(
										_elm_lang$core$Basics_ops['++'],
										', label:\"',
										A2(_elm_lang$core$Basics_ops['++'], _p28, '\",arrows: { to:{type:\'arrow\'}}},')))))))));
	};
	var a = A2(
		_user$project$Applicative_ops['<$'],
		singleArrow,
		A2(
			_user$project$EModel$combineAgt,
			single,
			{ctor: '[]'}));
	var doubleArrow = function (_p29) {
		var _p30 = _p29;
		var _p31 = _p30._0;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'{from: \"',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_p30._1,
				A2(
					_elm_lang$core$Basics_ops['++'],
					'\", to:\"',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p30._2,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\", color:\'',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A2(_user$project$EModel$agentColor, _p31, ags),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\'',
									A2(
										_elm_lang$core$Basics_ops['++'],
										', label:\"',
										A2(_elm_lang$core$Basics_ops['++'], _p31, '\",arrows: { to:{type:\'arrow\'},from:{type:\'arrow\'} }},')))))))));
	};
	var b = A2(
		_user$project$Applicative_ops['<$'],
		doubleArrow,
		A2(
			_user$project$EModel$combineAgt,
			$double,
			{ctor: '[]'}));
	return A2(_elm_lang$core$Basics_ops['++'], a, b);
};
var _user$project$EModel$point_emodel2vis = function (_p32) {
	var _p33 = _p32;
	var _p34 = _p33._0;
	var b = _user$project$EModel$drawEdge4model(_p34);
	var a = A2(
		_elm_lang$core$List$map,
		function (x) {
			return A3(_user$project$EModel$drawNode4model, _p34, x, _p33._1);
		},
		_p34.em_domain);
	return {ctor: '_Tuple2', _0: a, _1: b};
};
var _user$project$EModel$EModel = F4(
	function (a, b, c, d) {
		return {em_name: a, em_domain: b, em_relation: c, em_value: d};
	});
var _user$project$EModel$PointEModel = F2(
	function (a, b) {
		return {ctor: 'PointEModel', _0: a, _1: b};
	});
var _user$project$EModel$emodel2vis = function (mo) {
	return _user$project$EModel$point_emodel2vis(
		A2(_user$project$EModel$PointEModel, mo, ''));
};
var _user$project$EModel$muddyModel_w100 = A2(_user$project$EModel$PointEModel, _user$project$EModel$muddyModel, '100');
var _user$project$EModel$hexaModel_w120 = A2(_user$project$EModel$PointEModel, _user$project$EModel$hexaModel, '120');
var _user$project$EModel$letter_w1 = A2(_user$project$EModel$PointEModel, _user$project$EModel$letter, '1');

var _user$project$DEL_semantics$agentList4hexa = {
	ctor: '::',
	_0: 'a',
	_1: {
		ctor: '::',
		_0: 'b',
		_1: {
			ctor: '::',
			_0: 'c',
			_1: {ctor: '[]'}
		}
	}
};
var _user$project$DEL_semantics$hexamodel0 = _user$project$EModel$point_emodel2vis(_user$project$EModel$hexaModel_w120);
var _user$project$DEL_semantics$agentList4muddy = {
	ctor: '::',
	_0: 'a',
	_1: {
		ctor: '::',
		_0: 'b',
		_1: {
			ctor: '::',
			_0: 'c',
			_1: {ctor: '[]'}
		}
	}
};
var _user$project$DEL_semantics$muddyModel0 = _user$project$EModel$point_emodel2vis(_user$project$EModel$muddyModel_w100);
var _user$project$DEL_semantics$publicAnnouncement = F2(
	function (ags, x) {
		var pubPre = {
			ctor: '::',
			_0: {ctor: '_Tuple2', _0: 'pub', _1: x},
			_1: {ctor: '[]'}
		};
		var pubR = A2(
			_elm_lang$core$List$map,
			function (ag) {
				return {ctor: '_Tuple3', _0: ag, _1: 'pub', _2: 'pub'};
			},
			ags);
		var pubS = {
			ctor: '::',
			_0: 'pub',
			_1: {ctor: '[]'}
		};
		var name = A2(
			_elm_lang$core$Basics_ops['++'],
			'pub(',
			A2(
				_elm_lang$core$Basics_ops['++'],
				A2(_user$project$Common_syntax$outputForm, 1, x),
				')'));
		return A2(
			_user$project$Common_syntax$PointAModel,
			{am_name: name, am_domain: pubS, am_relation: pubR, am_pre: pubPre},
			'pub');
	});
var _user$project$DEL_semantics$muddyAnn1 = A2(
	_user$project$DEL_semantics$publicAnnouncement,
	_user$project$DEL_semantics$agentList4muddy,
	_user$project$Common_syntax$bigOr(
		{
			ctor: '::',
			_0: _user$project$Common_syntax$Atom('0a'),
			_1: {
				ctor: '::',
				_0: _user$project$Common_syntax$Atom('0b'),
				_1: {
					ctor: '::',
					_0: _user$project$Common_syntax$Atom('0c'),
					_1: {ctor: '[]'}
				}
			}
		}));
var _user$project$DEL_semantics$muddyAnn2 = A2(
	_user$project$DEL_semantics$publicAnnouncement,
	_user$project$DEL_semantics$agentList4muddy,
	_user$project$Common_syntax$bigAnd(
		{
			ctor: '::',
			_0: A2(
				_user$project$Common_syntax$knowNeither,
				'a',
				_user$project$Common_syntax$Atom('0a')),
			_1: {
				ctor: '::',
				_0: A2(
					_user$project$Common_syntax$knowNeither,
					'b',
					_user$project$Common_syntax$Atom('0b')),
				_1: {
					ctor: '::',
					_0: A2(
						_user$project$Common_syntax$knowNeither,
						'c',
						_user$project$Common_syntax$Atom('0c')),
					_1: {ctor: '[]'}
				}
			}
		}));
var _user$project$DEL_semantics$muddyAnn3 = A2(
	_user$project$DEL_semantics$publicAnnouncement,
	_user$project$DEL_semantics$agentList4muddy,
	_user$project$Common_syntax$bigAnd(
		{
			ctor: '::',
			_0: A2(
				_user$project$Common_syntax$knowNeither,
				'a',
				_user$project$Common_syntax$Atom('0a')),
			_1: {
				ctor: '::',
				_0: A2(
					_user$project$Common_syntax$knowEither,
					'b',
					_user$project$Common_syntax$Atom('0b')),
				_1: {
					ctor: '::',
					_0: A2(
						_user$project$Common_syntax$knowEither,
						'c',
						_user$project$Common_syntax$Atom('0c')),
					_1: {ctor: '[]'}
				}
			}
		}));
var _user$project$DEL_semantics$announceHexa1 = A2(
	_user$project$DEL_semantics$publicAnnouncement,
	_user$project$DEL_semantics$agentList4hexa,
	_user$project$Common_syntax$Not(
		_user$project$Common_syntax$Atom('1a')));
var _user$project$DEL_semantics$announceHexa2 = A2(
	_user$project$DEL_semantics$publicAnnouncement,
	_user$project$DEL_semantics$agentList4hexa,
	_user$project$Common_syntax$bigOr(
		{
			ctor: '::',
			_0: A2(
				_user$project$Common_syntax$notknow,
				'b',
				_user$project$Common_syntax$Atom('0a')),
			_1: {
				ctor: '::',
				_0: A2(
					_user$project$Common_syntax$know,
					'b',
					_user$project$Common_syntax$Atom('1a')),
				_1: {
					ctor: '::',
					_0: A2(
						_user$project$Common_syntax$know,
						'b',
						_user$project$Common_syntax$Atom('2a')),
					_1: {ctor: '[]'}
				}
			}
		}));
var _user$project$DEL_semantics$announceHexa3 = A2(
	_user$project$DEL_semantics$publicAnnouncement,
	_user$project$DEL_semantics$agentList4hexa,
	_user$project$Common_syntax$bigAnd(
		{
			ctor: '::',
			_0: _user$project$Common_syntax$Atom('0a'),
			_1: {
				ctor: '::',
				_0: _user$project$Common_syntax$Atom('1b'),
				_1: {
					ctor: '::',
					_0: _user$project$Common_syntax$Atom('2c'),
					_1: {ctor: '[]'}
				}
			}
		}));
var _user$project$DEL_semantics$emodel2agentlist = function (ac) {
	return A2(
		_elm_lang$core$List$map,
		function (_p0) {
			var _p1 = _p0;
			return _p1._0;
		},
		ac.em_relation);
};
var _user$project$DEL_semantics$composeKM = F2(
	function (mo1, am2) {
		var ff = function (_p2) {
			var _p3 = _p2;
			var _p4 = _p3._0;
			return A2(
				_elm_lang$core$List$member,
				{ctor: '_Tuple3', _0: _p4, _1: _p3._1._0, _2: _p3._2._0},
				mo1.em_relation) && A2(
				_elm_lang$core$List$member,
				{ctor: '_Tuple3', _0: _p4, _1: _p3._1._1, _2: _p3._2._1},
				am2.am_relation);
		};
		var pair2dom = _elm_lang$core$List$map(
			function (_p5) {
				var _p6 = _p5;
				return A2(
					_elm_lang$core$Basics_ops['++'],
					'(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p6._0,
						A2(
							_elm_lang$core$Basics_ops['++'],
							',',
							A2(_elm_lang$core$Basics_ops['++'], _p6._1, ')'))));
			});
		var domain1 = A2(_user$project$Util$cartesian, mo1.em_domain, am2.am_domain);
		var domain2 = function () {
			var _p9 = A2(
				_user$project$Util$filterR,
				function (_p7) {
					var _p8 = _p7;
					return A2(
						_user$project$DEL_semantics$valueF,
						A2(_user$project$EModel$PointEModel, mo1, _p8._0),
						A2(_user$project$Common_syntax$Precon, am2, _p8._1));
				},
				domain1);
			if (_p9.ctor === 'Ok') {
				return _p9._0;
			} else {
				return _elm_lang$core$Native_Utils.crashCase(
					'DEL_semantics',
					{
						start: {line: 81, column: 21},
						end: {line: 83, column: 37}
					},
					_p9)(_p9._0);
			}
		}();
		var val2 = function () {
			var ff = function (_p11) {
				var _p12 = _p11;
				return {
					ctor: '_Tuple2',
					_0: _p12._0,
					_1: pair2dom(
						A2(
							_user$project$Util_ops['$>>='],
							_p12._1,
							function (w) {
								return A2(
									_elm_lang$core$List$filter,
									function (_p13) {
										var _p14 = _p13;
										return _elm_lang$core$Native_Utils.eq(w, _p14._0);
									},
									domain2);
							}))
				};
			};
			return A2(_elm_lang$core$List$map, ff, mo1.em_value);
		}();
		var name2 = A2(
			_elm_lang$core$Basics_ops['++'],
			mo1.em_name,
			A2(_elm_lang$core$Basics_ops['++'], '*', am2.am_name));
		var agents = _user$project$Util$nub2(
			A2(
				_elm_lang$core$Basics_ops['++'],
				_user$project$DEL_semantics$emodel2agentlist(mo1),
				_user$project$Common_syntax$amodel2agentlist(am2)));
		var relation1 = A3(_user$project$Util$cartesian2, agents, domain2, domain2);
		var relation2 = A2(_elm_lang$core$List$filter, ff, relation1);
		var relation3 = A2(
			_elm_lang$core$List$map,
			function (_p15) {
				var _p16 = _p15;
				return {
					ctor: '_Tuple3',
					_0: _p16._0,
					_1: A2(
						_elm_lang$core$Basics_ops['++'],
						'(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p16._1._0,
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								A2(_elm_lang$core$Basics_ops['++'], _p16._1._1, ')')))),
					_2: A2(
						_elm_lang$core$Basics_ops['++'],
						'(',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_p16._2._0,
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								A2(_elm_lang$core$Basics_ops['++'], _p16._2._1, ')'))))
				};
			},
			relation2);
		return {
			em_name: name2,
			em_domain: pair2dom(domain2),
			em_relation: relation3,
			em_value: val2
		};
	});
var _user$project$DEL_semantics$valueF = F2(
	function (_p17, f) {
		valueF:
		while (true) {
			var _p18 = _p17;
			var _p27 = _p18._1;
			var _p26 = _p18;
			var _p25 = _p18._0;
			var _p19 = f;
			switch (_p19.ctor) {
				case 'Top':
					return _elm_lang$core$Result$Ok(true);
				case 'Bot':
					return _elm_lang$core$Result$Ok(false);
				case 'Atom':
					return _elm_lang$core$Result$Ok(
						A2(
							_elm_lang$core$List$member,
							_p27,
							A2(_user$project$Util$lookVal, _p19._0, _p25.em_value)));
				case 'AnyFormula':
					return _elm_lang$core$Result$Err(
						A2(_elm_lang$core$Basics_ops['++'], 'not allowed to include any formula ', _p19._0));
				case 'Not':
					return A2(
						_elm_lang$core$Result$map,
						_elm_lang$core$Basics$not,
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._0));
				case 'And':
					return A3(
						_elm_lang$core$Result$map2,
						F2(
							function (x, y) {
								return x && y;
							}),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._0),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._1));
				case 'Or':
					return A2(
						_user$project$Applicative_ops['<@@'],
						A2(
							_user$project$Applicative_ops['<@'],
							F2(
								function (x, y) {
									return x || y;
								}),
							A2(_user$project$DEL_semantics$valueF, _p26, _p19._0)),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._1));
				case 'Imply':
					return A3(
						_elm_lang$core$Result$map2,
						F2(
							function (x, y) {
								return A2(_user$project$Util_ops['==>'], x, y);
							}),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._0),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._1));
				case 'Imply2':
					return A3(
						_elm_lang$core$Result$map2,
						F2(
							function (x, y) {
								return A2(_user$project$Util_ops['==>'], x, y);
							}),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._1),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._0));
				case 'Iff':
					return A3(
						_elm_lang$core$Result$map2,
						F2(
							function (x, y) {
								return _elm_lang$core$Native_Utils.eq(x, y);
							}),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._0),
						A2(_user$project$DEL_semantics$valueF, _p26, _p19._1));
				case 'Box':
					return A2(
						_user$project$Util$forallResult,
						_p25.em_domain,
						function (z) {
							return A3(
								_elm_lang$core$Result$map2,
								F2(
									function (x, y) {
										return A2(_user$project$Util_ops['==>'], x, y);
									}),
								_elm_lang$core$Result$Ok(
									A2(
										_elm_lang$core$List$member,
										{ctor: '_Tuple2', _0: _p27, _1: z},
										A2(_user$project$Util$lookRel, _p19._0, _p25.em_relation))),
								A2(
									_user$project$DEL_semantics$valueF,
									A2(_user$project$EModel$PointEModel, _p25, z),
									_p19._1));
						});
				case 'Dia':
					return A2(
						_user$project$Util$existsResult,
						_p25.em_domain,
						function (z) {
							return A3(
								_elm_lang$core$Result$map2,
								F2(
									function (x, y) {
										return x && y;
									}),
								_elm_lang$core$Result$Ok(
									A2(
										_elm_lang$core$List$member,
										{ctor: '_Tuple2', _0: _p27, _1: z},
										A2(_user$project$Util$lookRel, _p19._0, _p25.em_relation))),
								A2(
									_user$project$DEL_semantics$valueF,
									A2(_user$project$EModel$PointEModel, _p25, z),
									_p19._1));
						});
				case 'BoxAction':
					var _p23 = _p19._1;
					var _p20 = _p19._0;
					switch (_p20.ctor) {
						case 'PointAModel':
							var _p22 = _p20._1;
							var _p21 = _p20._0;
							return A3(
								_elm_lang$core$Result$map2,
								F2(
									function (x, y) {
										return A2(_user$project$Util_ops['==>'], x, y);
									}),
								A2(
									_user$project$DEL_semantics$valueF,
									_p26,
									A2(_user$project$Common_syntax$lookPre2, _p21.am_pre, _p22)),
								A2(
									_user$project$DEL_semantics$valueF,
									A2(
										_user$project$DEL_semantics$composePoKM,
										_p26,
										A2(_user$project$Common_syntax$PointAModel, _p21, _p22)),
									_p23));
						case 'Cup':
							return A3(
								_elm_lang$core$Result$map2,
								F2(
									function (x, y) {
										return x && y;
									}),
								A2(
									_user$project$DEL_semantics$valueF,
									_p26,
									A2(_user$project$Common_syntax$BoxAction, _p20._0, _p23)),
								A2(
									_user$project$DEL_semantics$valueF,
									_p26,
									A2(_user$project$Common_syntax$BoxAction, _p20._1, _p23)));
						default:
							var _v11 = _p26,
								_v12 = A2(
								_user$project$Common_syntax$BoxAction,
								A2(_user$project$Common_syntax$composeAction, _p20._0, _p20._1),
								_p23);
							_p17 = _v11;
							f = _v12;
							continue valueF;
					}
				case 'DiaAction':
					var _v13 = _p26,
						_v14 = _user$project$Common_syntax$Not(
						A2(
							_user$project$Common_syntax$BoxAction,
							_p19._0,
							_user$project$Common_syntax$Not(_p19._1)));
					_p17 = _v13;
					f = _v14;
					continue valueF;
				case 'Precon':
					var _v15 = _p26,
						_v16 = A2(_user$project$Common_syntax$lookPre2, _p19._0.am_pre, _p19._1);
					_p17 = _v15;
					f = _v16;
					continue valueF;
				default:
					return _elm_lang$core$Native_Utils.crashCase(
						'DEL_semantics',
						{
							start: {line: 128, column: 3},
							end: {line: 164, column: 50}
						},
						_p19)('undefined in valueF of DEL');
			}
		}
	});
var _user$project$DEL_semantics$composePoKM = F2(
	function (a, b) {
		var _p28 = {ctor: '_Tuple2', _0: a, _1: b};
		if ((_p28.ctor === '_Tuple2') && (_p28._1.ctor === 'PointAModel')) {
			return A2(
				_user$project$EModel$PointEModel,
				A2(_user$project$DEL_semantics$composeKM, _p28._0._0, _p28._1._0),
				A2(
					_elm_lang$core$Basics_ops['++'],
					'(',
					A2(
						_elm_lang$core$Basics_ops['++'],
						_p28._0._1,
						A2(
							_elm_lang$core$Basics_ops['++'],
							',',
							A2(_elm_lang$core$Basics_ops['++'], _p28._1._1, ')')))));
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'DEL_semantics',
				{
					start: {line: 106, column: 20},
					end: {line: 114, column: 48}
				},
				_p28)('error in composePoKM');
		}
	});
var _user$project$DEL_semantics_ops = _user$project$DEL_semantics_ops || {};
_user$project$DEL_semantics_ops['**'] = _user$project$DEL_semantics$composePoKM;
var _user$project$DEL_semantics$muddyModel1 = _user$project$EModel$point_emodel2vis(
	A2(_user$project$DEL_semantics_ops['**'], _user$project$EModel$muddyModel_w100, _user$project$DEL_semantics$muddyAnn1));
var _user$project$DEL_semantics$muddyModel2 = _user$project$EModel$point_emodel2vis(
	A2(
		_user$project$DEL_semantics_ops['**'],
		A2(_user$project$DEL_semantics_ops['**'], _user$project$EModel$muddyModel_w100, _user$project$DEL_semantics$muddyAnn1),
		_user$project$DEL_semantics$muddyAnn2));
var _user$project$DEL_semantics$muddyModel3 = _user$project$EModel$point_emodel2vis(
	A2(
		_user$project$DEL_semantics_ops['**'],
		A2(
			_user$project$DEL_semantics_ops['**'],
			A2(_user$project$DEL_semantics_ops['**'], _user$project$EModel$muddyModel_w100, _user$project$DEL_semantics$muddyAnn1),
			_user$project$DEL_semantics$muddyAnn2),
		_user$project$DEL_semantics$muddyAnn3));
var _user$project$DEL_semantics$hexamodel1 = _user$project$EModel$point_emodel2vis(
	A2(_user$project$DEL_semantics_ops['**'], _user$project$EModel$hexaModel_w120, _user$project$DEL_semantics$announceHexa1));
var _user$project$DEL_semantics$hexamodel2 = _user$project$EModel$point_emodel2vis(
	A2(
		_user$project$DEL_semantics_ops['**'],
		A2(_user$project$DEL_semantics_ops['**'], _user$project$EModel$hexaModel_w120, _user$project$DEL_semantics$announceHexa1),
		_user$project$DEL_semantics$announceHexa2));
var _user$project$DEL_semantics$hexamodel3 = _user$project$EModel$point_emodel2vis(
	A2(
		_user$project$DEL_semantics_ops['**'],
		A2(
			_user$project$DEL_semantics_ops['**'],
			A2(_user$project$DEL_semantics_ops['**'], _user$project$EModel$hexaModel_w120, _user$project$DEL_semantics$announceHexa1),
			_user$project$DEL_semantics$announceHexa2),
		_user$project$DEL_semantics$announceHexa3));
var _user$project$DEL_semantics$validInModel = F2(
	function (mo, f) {
		return A2(
			_user$project$Util$forallResult,
			mo.em_domain,
			function (x) {
				return A2(
					_user$project$DEL_semantics$valueF,
					A2(_user$project$EModel$PointEModel, mo, x),
					f);
			});
	});
var _user$project$DEL_semantics$testAM2 = {
	am_name: '(Skip;Skip)',
	am_domain: {
		ctor: '::',
		_0: '(e1,e1)',
		_1: {ctor: '[]'}
	},
	am_relation: {
		ctor: '::',
		_0: {ctor: '_Tuple3', _0: 'a', _1: '(e1,e1)', _2: '(e1,e1)'},
		_1: {ctor: '[]'}
	},
	am_pre: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: '(e1,e1)',
			_1: A2(
				_user$project$Common_syntax$Precon,
				{
					am_name: 'Skip',
					am_domain: {
						ctor: '::',
						_0: 'skip',
						_1: {ctor: '[]'}
					},
					am_relation: {ctor: '[]'},
					am_pre: {ctor: '[]'}
				},
				'e1')
		},
		_1: {ctor: '[]'}
	}
};
var _user$project$DEL_semantics$testAM = {
	am_name: '(Skip;Skip)',
	am_domain: {
		ctor: '::',
		_0: '(e1,e1)',
		_1: {ctor: '[]'}
	},
	am_relation: {
		ctor: '::',
		_0: {ctor: '_Tuple3', _0: 'a', _1: '(e1,e1)', _2: '(e1,e1)'},
		_1: {ctor: '[]'}
	},
	am_pre: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: '(e1,e1)',
			_1: A2(
				_user$project$Common_syntax$And,
				A2(
					_user$project$Common_syntax$Precon,
					{
						am_name: 'Skip',
						am_domain: {
							ctor: '::',
							_0: 'skip',
							_1: {ctor: '[]'}
						},
						am_relation: {ctor: '[]'},
						am_pre: {ctor: '[]'}
					},
					'e1'),
				A2(
					_user$project$Common_syntax$BoxAction,
					A2(
						_user$project$Common_syntax$PointAModel,
						{
							am_name: 'Skip',
							am_domain: {
								ctor: '::',
								_0: 'skip',
								_1: {ctor: '[]'}
							},
							am_relation: {ctor: '[]'},
							am_pre: {ctor: '[]'}
						},
						'e1'),
					A2(
						_user$project$Common_syntax$Precon,
						{
							am_name: 'Skip',
							am_domain: {
								ctor: '::',
								_0: 'skip',
								_1: {ctor: '[]'}
							},
							am_relation: {ctor: '[]'},
							am_pre: {ctor: '[]'}
						},
						'e1')))
		},
		_1: {ctor: '[]'}
	}
};
var _user$project$DEL_semantics$testKM = {
	em_name: 'MuddyChildren',
	em_domain: {
		ctor: '::',
		_0: '000',
		_1: {
			ctor: '::',
			_0: '100',
			_1: {
				ctor: '::',
				_0: '001',
				_1: {
					ctor: '::',
					_0: '010',
					_1: {
						ctor: '::',
						_0: '011',
						_1: {
							ctor: '::',
							_0: '110',
							_1: {
								ctor: '::',
								_0: '101',
								_1: {
									ctor: '::',
									_0: '111',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}
			}
		}
	},
	em_relation: {
		ctor: '::',
		_0: {ctor: '_Tuple3', _0: 'a', _1: '000', _2: '100'},
		_1: {
			ctor: '::',
			_0: {ctor: '_Tuple3', _0: 'a', _1: '100', _2: '000'},
			_1: {
				ctor: '::',
				_0: {ctor: '_Tuple3', _0: 'a', _1: '010', _2: '110'},
				_1: {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: 'a', _1: '110', _2: '010'},
					_1: {
						ctor: '::',
						_0: {ctor: '_Tuple3', _0: 'a', _1: '001', _2: '101'},
						_1: {
							ctor: '::',
							_0: {ctor: '_Tuple3', _0: 'a', _1: '101', _2: '001'},
							_1: {
								ctor: '::',
								_0: {ctor: '_Tuple3', _0: 'a', _1: '011', _2: '111'},
								_1: {
									ctor: '::',
									_0: {ctor: '_Tuple3', _0: 'a', _1: '111', _2: '011'},
									_1: {
										ctor: '::',
										_0: {ctor: '_Tuple3', _0: 'b', _1: '000', _2: '010'},
										_1: {
											ctor: '::',
											_0: {ctor: '_Tuple3', _0: 'b', _1: '010', _2: '000'},
											_1: {
												ctor: '::',
												_0: {ctor: '_Tuple3', _0: 'b', _1: '100', _2: '110'},
												_1: {
													ctor: '::',
													_0: {ctor: '_Tuple3', _0: 'b', _1: '110', _2: '100'},
													_1: {
														ctor: '::',
														_0: {ctor: '_Tuple3', _0: 'b', _1: '001', _2: '011'},
														_1: {
															ctor: '::',
															_0: {ctor: '_Tuple3', _0: 'b', _1: '011', _2: '001'},
															_1: {
																ctor: '::',
																_0: {ctor: '_Tuple3', _0: 'b', _1: '101', _2: '111'},
																_1: {
																	ctor: '::',
																	_0: {ctor: '_Tuple3', _0: 'b', _1: '111', _2: '101'},
																	_1: {
																		ctor: '::',
																		_0: {ctor: '_Tuple3', _0: 'c', _1: '000', _2: '001'},
																		_1: {
																			ctor: '::',
																			_0: {ctor: '_Tuple3', _0: 'c', _1: '001', _2: '000'},
																			_1: {
																				ctor: '::',
																				_0: {ctor: '_Tuple3', _0: 'c', _1: '010', _2: '011'},
																				_1: {
																					ctor: '::',
																					_0: {ctor: '_Tuple3', _0: 'c', _1: '011', _2: '010'},
																					_1: {
																						ctor: '::',
																						_0: {ctor: '_Tuple3', _0: 'c', _1: '100', _2: '101'},
																						_1: {
																							ctor: '::',
																							_0: {ctor: '_Tuple3', _0: 'c', _1: '101', _2: '100'},
																							_1: {
																								ctor: '::',
																								_0: {ctor: '_Tuple3', _0: 'c', _1: '110', _2: '111'},
																								_1: {
																									ctor: '::',
																									_0: {ctor: '_Tuple3', _0: 'c', _1: '111', _2: '110'},
																									_1: {
																										ctor: '::',
																										_0: {ctor: '_Tuple3', _0: 'a', _1: '000', _2: '000'},
																										_1: {
																											ctor: '::',
																											_0: {ctor: '_Tuple3', _0: 'a', _1: '100', _2: '100'},
																											_1: {
																												ctor: '::',
																												_0: {ctor: '_Tuple3', _0: 'a', _1: '001', _2: '001'},
																												_1: {
																													ctor: '::',
																													_0: {ctor: '_Tuple3', _0: 'a', _1: '010', _2: '010'},
																													_1: {
																														ctor: '::',
																														_0: {ctor: '_Tuple3', _0: 'a', _1: '011', _2: '011'},
																														_1: {
																															ctor: '::',
																															_0: {ctor: '_Tuple3', _0: 'a', _1: '110', _2: '110'},
																															_1: {
																																ctor: '::',
																																_0: {ctor: '_Tuple3', _0: 'a', _1: '111', _2: '111'},
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
	},
	em_value: {
		ctor: '::',
		_0: {
			ctor: '_Tuple2',
			_0: 'p1',
			_1: {
				ctor: '::',
				_0: '111',
				_1: {
					ctor: '::',
					_0: '101',
					_1: {
						ctor: '::',
						_0: '100',
						_1: {
							ctor: '::',
							_0: '110',
							_1: {ctor: '[]'}
						}
					}
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				ctor: '_Tuple2',
				_0: 'p0',
				_1: {
					ctor: '::',
					_0: '011',
					_1: {
						ctor: '::',
						_0: '001',
						_1: {
							ctor: '::',
							_0: '000',
							_1: {
								ctor: '::',
								_0: '010',
								_1: {ctor: '[]'}
							}
						}
					}
				}
			},
			_1: {
				ctor: '::',
				_0: {
					ctor: '_Tuple2',
					_0: 'q1',
					_1: {
						ctor: '::',
						_0: '010',
						_1: {
							ctor: '::',
							_0: '111',
							_1: {
								ctor: '::',
								_0: '110',
								_1: {
									ctor: '::',
									_0: '011',
									_1: {ctor: '[]'}
								}
							}
						}
					}
				},
				_1: {
					ctor: '::',
					_0: {
						ctor: '_Tuple2',
						_0: 'q0',
						_1: {
							ctor: '::',
							_0: '000',
							_1: {
								ctor: '::',
								_0: '101',
								_1: {
									ctor: '::',
									_0: '100',
									_1: {
										ctor: '::',
										_0: '001',
										_1: {ctor: '[]'}
									}
								}
							}
						}
					},
					_1: {
						ctor: '::',
						_0: {
							ctor: '_Tuple2',
							_0: 'r1',
							_1: {
								ctor: '::',
								_0: '001',
								_1: {
									ctor: '::',
									_0: '011',
									_1: {
										ctor: '::',
										_0: '101',
										_1: {
											ctor: '::',
											_0: '111',
											_1: {ctor: '[]'}
										}
									}
								}
							}
						},
						_1: {
							ctor: '::',
							_0: {
								ctor: '_Tuple2',
								_0: 'r0',
								_1: {
									ctor: '::',
									_0: '000',
									_1: {
										ctor: '::',
										_0: '100',
										_1: {
											ctor: '::',
											_0: '010',
											_1: {
												ctor: '::',
												_0: '110',
												_1: {ctor: '[]'}
											}
										}
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
};
var _user$project$DEL_semantics$DomVal = F2(
	function (a, b) {
		return {dom: a, prop: b};
	});

var _user$project$DEL_sequent$substVar = function (_p0) {
	var _p1 = _p0;
	var _p2 = _p1._0;
	return _elm_lang$core$Native_Utils.eq(_p1._1._0, _p2) ? _p1._1._1 : _p2;
};
var _user$project$DEL_sequent$substAM = function (_p3) {
	var _p4 = _p3;
	var _p7 = _p4._1._1;
	var _p6 = _p4._1._0;
	var _p5 = _p4._0;
	switch (_p5.ctor) {
		case 'PointAModel':
			return A2(
				_user$project$Common_syntax$PointAModel,
				_p5._0,
				_user$project$DEL_sequent$substVar(
					{
						ctor: '_Tuple2',
						_0: _p5._1,
						_1: {ctor: '_Tuple2', _0: _p6, _1: _p7}
					}));
		case 'Cup':
			return A2(
				_user$project$Common_syntax$Cup,
				_user$project$DEL_sequent$substAM(
					{
						ctor: '_Tuple2',
						_0: _p5._0,
						_1: {ctor: '_Tuple2', _0: _p6, _1: _p7}
					}),
				_user$project$DEL_sequent$substAM(
					{
						ctor: '_Tuple2',
						_0: _p5._1,
						_1: {ctor: '_Tuple2', _0: _p6, _1: _p7}
					}));
		default:
			return A2(
				_user$project$Common_syntax$ComposePoAM,
				_user$project$DEL_sequent$substAM(
					{
						ctor: '_Tuple2',
						_0: _p5._0,
						_1: {ctor: '_Tuple2', _0: _p6, _1: _p7}
					}),
				_user$project$DEL_sequent$substAM(
					{
						ctor: '_Tuple2',
						_0: _p5._1,
						_1: {ctor: '_Tuple2', _0: _p6, _1: _p7}
					}));
	}
};
var _user$project$DEL_sequent$substF = function (_p8) {
	var _p9 = _p8;
	var _p16 = _p9._1;
	var _p10 = _p9._0;
	_v4_14:
	do {
		switch (_p10.ctor) {
			case 'Atom':
				return _user$project$Common_syntax$Atom(_p10._0);
			case 'AnyFormula':
				return _user$project$Common_syntax$AnyFormula(_p10._0);
			case 'Not':
				return _user$project$Common_syntax$Not(
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._0, _1: _p16}));
			case 'And':
				return A2(
					_user$project$Common_syntax$And,
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._0, _1: _p16}),
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Or':
				return A2(
					_user$project$Common_syntax$Or,
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._0, _1: _p16}),
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Iff':
				return A2(
					_user$project$Common_syntax$Iff,
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._0, _1: _p16}),
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Imply':
				return A2(
					_user$project$Common_syntax$Imply,
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._0, _1: _p16}),
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Imply2':
				return A2(
					_user$project$Common_syntax$Imply2,
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._0, _1: _p16}),
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Box':
				return A2(
					_user$project$Common_syntax$Box,
					_p10._0,
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Dia':
				return A2(
					_user$project$Common_syntax$Dia,
					_p10._0,
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Bigwedge':
				if ((_p10._1.ctor === '_Tuple2') && (_p10._1._1.ctor === '_Tuple3')) {
					var _p12 = _p10._1._1._2;
					var _p11 = _p10._1._1._1;
					return A3(
						_user$project$Common_syntax$Bigwedge,
						_p10._0,
						{
							ctor: '_Tuple2',
							_0: _p10._1._0,
							_1: {ctor: '_Tuple3', _0: _p10._1._1._0, _1: _p11, _2: _p12}
						},
						_user$project$DEL_sequent$substF(
							{
								ctor: '_Tuple2',
								_0: _p10._2,
								_1: {ctor: '_Tuple2', _0: _p11, _1: _p12}
							}));
				} else {
					break _v4_14;
				}
			case 'Bigvee':
				if ((_p10._1.ctor === '_Tuple2') && (_p10._1._1.ctor === '_Tuple3')) {
					var _p14 = _p10._1._1._2;
					var _p13 = _p10._1._1._1;
					return A3(
						_user$project$Common_syntax$Bigvee,
						_p10._0,
						{
							ctor: '_Tuple2',
							_0: _p10._1._0,
							_1: {ctor: '_Tuple3', _0: _p10._1._1._0, _1: _p13, _2: _p14}
						},
						_user$project$DEL_sequent$substF(
							{
								ctor: '_Tuple2',
								_0: _p10._2,
								_1: {ctor: '_Tuple2', _0: _p13, _1: _p14}
							}));
				} else {
					break _v4_14;
				}
			case 'BoxAction':
				return A2(
					_user$project$Common_syntax$BoxAction,
					_user$project$DEL_sequent$substAM(
						{ctor: '_Tuple2', _0: _p10._0, _1: _p16}),
					_user$project$DEL_sequent$substF(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			case 'Precon':
				return A2(
					_user$project$Common_syntax$Precon,
					_p10._0,
					_user$project$DEL_sequent$substVar(
						{ctor: '_Tuple2', _0: _p10._1, _1: _p16}));
			default:
				break _v4_14;
		}
	} while(false);
	return _elm_lang$core$Native_Utils.crashCase(
		'DEL_sequent',
		{
			start: {line: 771, column: 17},
			end: {line: 787, column: 51}
		},
		_p10)('error in substF');
};
var _user$project$DEL_sequent$substLabel = function (_p17) {
	var _p18 = _p17;
	return _user$project$Common_sequent$LabelForm(
		{
			ctor: '_Tuple4',
			_0: _p18._0._0._0,
			_1: _p18._0._0._1,
			_2: _p18._0._0._2,
			_3: _user$project$DEL_sequent$substF(
				{ctor: '_Tuple2', _0: _p18._0._0._3, _1: _p18._1})
		});
};
var _user$project$DEL_sequent$substRel = function (xx) {
	var _p19 = xx;
	if (_p19._0.ctor === 'RelAtom') {
		var ff = function (x) {
			var _p20 = x;
			switch (_p20.ctor) {
				case 'PointAModel':
					return A2(
						_user$project$Common_syntax$PointAModel,
						_p20._0,
						_user$project$DEL_sequent$substVar(
							{ctor: '_Tuple2', _0: _p20._1, _1: _p19._1}));
				case 'Cup':
					var _p21 = _p20._0;
					return A2(
						_user$project$Common_syntax$Cup,
						ff(_p21),
						ff(_p21));
				default:
					var _p22 = _p20._0;
					return A2(
						_user$project$Common_syntax$ComposePoAM,
						ff(_p22),
						ff(_p22));
			}
		};
		var gg = function (_p23) {
			var _p24 = _p23;
			return {
				ctor: '_Tuple2',
				_0: _p24._0,
				_1: A2(_elm_lang$core$List$map, ff, _p24._1)
			};
		};
		return _user$project$Common_sequent$RelAtom(
			{
				ctor: '_Tuple4',
				_0: _p19._0._0._0,
				_1: _p19._0._0._1,
				_2: gg(_p19._0._0._2),
				_3: gg(_p19._0._0._3)
			});
	} else {
		return _user$project$Common_sequent$RelAtom_int(
			{ctor: '_Tuple2', _0: _p19._0._0._0, _1: _p19._0._0._1});
	}
};
var _user$project$DEL_sequent$substForDEL = function (_p25) {
	var _p26 = _p25;
	var _p29 = _p26._1;
	var ff = function (_p27) {
		var _p28 = _p27;
		return {
			ctor: '_Tuple4',
			_0: _p28._0,
			_1: _p28._1,
			_2: _user$project$DEL_sequent$substVar(
				{ctor: '_Tuple2', _0: _p28._2, _1: _p29}),
			_3: _user$project$DEL_sequent$substVar(
				{ctor: '_Tuple2', _0: _p28._3, _1: _p29})
		};
	};
	return A2(_elm_lang$core$List$map, ff, _p26._0);
};
var _user$project$DEL_sequent$substSeq = F2(
	function (seq, sp) {
		var forDEL2 = _user$project$DEL_sequent$substForDEL(
			{ctor: '_Tuple2', _0: seq.forDEL, _1: sp});
		var right2 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _user$project$DEL_sequent$substLabel(
					{ctor: '_Tuple2', _0: x, _1: sp});
			},
			seq.rightForm);
		var left2 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _user$project$DEL_sequent$substLabel(
					{ctor: '_Tuple2', _0: x, _1: sp});
			},
			seq.leftForm);
		var ri2 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _user$project$DEL_sequent$substRel(
					{ctor: '_Tuple2', _0: x, _1: sp});
			},
			seq.rightRel);
		var le2 = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _user$project$DEL_sequent$substRel(
					{ctor: '_Tuple2', _0: x, _1: sp});
			},
			seq.leftRel);
		return {leftRel: le2, leftForm: left2, rightRel: ri2, rightForm: right2, forDEL: forDEL2};
	});
var _user$project$DEL_sequent$ruleAModel = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$amodelDefN_DEL,
		category: _user$project$Common_sequent$Rule4RightFormula,
		rulename: 'R.Definition of AModel_pre',
		rule: function (seq) {
			var _p30 = seq.rightForm;
			if (((_p30.ctor === '::') && (_p30._0._0.ctor === '_Tuple4')) && (_p30._0._0._3.ctor === 'Precon')) {
				return A2(
					_elm_lang$core$Maybe$map,
					function (add1) {
						return {
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
										_p30._1)
								}),
							_1: {ctor: '[]'}
						};
					},
					A2(
						_elm_lang$core$Maybe$map,
						function (a) {
							return _user$project$Common_sequent$LabelForm(
								{ctor: '_Tuple4', _0: _p30._0._0._0, _1: _p30._0._0._1, _2: _p30._0._0._2, _3: a});
						},
						A2(_user$project$Common_syntax$lookPre, _p30._0._0._3._0.am_pre, _p30._0._0._3._1)));
			} else {
				return _elm_lang$core$Maybe$Nothing;
			}
		}
	},
	_1: {
		ctor: '::',
		_0: {
			priority: _user$project$Common_sequent$amodelDefN_DEL,
			category: _user$project$Common_sequent$Rule4LeftFormula,
			rulename: 'L.Definition of AModel_pre',
			rule: function (seq) {
				var _p31 = seq.leftForm;
				if (((_p31.ctor === '::') && (_p31._0._0.ctor === '_Tuple4')) && (_p31._0._0._3.ctor === 'Precon')) {
					return A2(
						_elm_lang$core$Maybe$map,
						function (add1) {
							return {
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
											_p31._1)
									}),
								_1: {ctor: '[]'}
							};
						},
						A2(
							_elm_lang$core$Maybe$map,
							function (f) {
								return _user$project$Common_sequent$LabelForm(
									{ctor: '_Tuple4', _0: _p31._0._0._0, _1: _p31._0._0._1, _2: _p31._0._0._2, _3: f});
							},
							A2(_user$project$Common_syntax$lookPre, _p31._0._0._3._0.am_pre, _p31._0._0._3._1)));
				} else {
					return _elm_lang$core$Maybe$Nothing;
				}
			}
		},
		_1: {
			ctor: '::',
			_0: {
				priority: _user$project$Common_sequent$amodelDefN_DEL,
				category: _user$project$Common_sequent$Rule4DEL,
				rulename: 'Definition of AModel_Rel',
				rule: function (seq) {
					var _p32 = seq.forDEL;
					if (((_p32.ctor === '::') && (_p32._0.ctor === '_Tuple4')) && (_p32._0._1.ctor === '::')) {
						var _p37 = _p32._0._3;
						if (A2(_elm_lang$core$String$contains, 'x', _p37)) {
							var listOfStatesFrom_s1 = A2(
								_user$project$Util_ops['$>>='],
								_p32._0._1._0.am_relation,
								function (_p33) {
									var _p34 = _p33;
									return (_elm_lang$core$Native_Utils.eq(_p34._1, _p32._0._2) && _elm_lang$core$Native_Utils.eq(_p34._0, _p32._0._0)) ? {
										ctor: '::',
										_0: _p34._2,
										_1: {ctor: '[]'}
									} : {ctor: '[]'};
								});
							var from_s2 = function (_p35) {
								var _p36 = _p35;
								return A2(
									_user$project$Util_ops['$>>='],
									_user$project$Util$nub(listOfStatesFrom_s1),
									function (t) {
										return {
											ctor: '::',
											_0: A2(
												_user$project$DEL_sequent$substSeq,
												_elm_lang$core$Native_Utils.update(
													seq,
													{forDEL: _p32._1}),
												{ctor: '_Tuple2', _0: _p37, _1: t}),
											_1: {ctor: '[]'}
										};
									});
							};
							return function (y) {
								return function (x) {
									return _elm_lang$core$List$isEmpty(x) ? _elm_lang$core$Maybe$Nothing : _elm_lang$core$Maybe$Just(x);
								}(
									_elm_lang$core$List$concat(y));
							}(
								A2(_elm_lang$core$List$map, from_s2, seq.forDEL));
						} else {
							return _elm_lang$core$Maybe$Nothing;
						}
					} else {
						return _elm_lang$core$Maybe$Nothing;
					}
				}
			},
			_1: {ctor: '[]'}
		}
	}
};
var _user$project$DEL_sequent$state2freevar = F2(
	function (listBoundVar, s) {
		return (!A2(_elm_lang$core$List$member, s, listBoundVar)) ? {
			ctor: '::',
			_0: s,
			_1: {ctor: '[]'}
		} : {ctor: '[]'};
	});
var _user$project$DEL_sequent$action2freevar = F2(
	function (listBoundVar, a) {
		var _p38 = a;
		switch (_p38.ctor) {
			case 'PointAModel':
				return A2(_user$project$DEL_sequent$state2freevar, listBoundVar, _p38._1);
			case 'Cup':
				return A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_user$project$DEL_sequent$action2freevar, listBoundVar, _p38._0),
					A2(_user$project$DEL_sequent$action2freevar, listBoundVar, _p38._1));
			default:
				return A2(
					_elm_lang$core$Basics_ops['++'],
					A2(_user$project$DEL_sequent$action2freevar, listBoundVar, _p38._0),
					A2(_user$project$DEL_sequent$action2freevar, listBoundVar, _p38._1));
		}
	});
var _user$project$DEL_sequent$form2freevar = F2(
	function (listBoundVar, f) {
		form2freevar:
		while (true) {
			var _p39 = f;
			_v17_13:
			do {
				switch (_p39.ctor) {
					case 'Not':
						var _v18 = listBoundVar,
							_v19 = _p39._0;
						listBoundVar = _v18;
						f = _v19;
						continue form2freevar;
					case 'And':
						return A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._0),
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._1));
					case 'Or':
						return A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._0),
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._1));
					case 'Iff':
						return A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._0),
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._1));
					case 'Imply':
						return A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._0),
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._1));
					case 'Imply2':
						return A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._0),
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._1));
					case 'Box':
						var _v20 = listBoundVar,
							_v21 = _p39._1;
						listBoundVar = _v20;
						f = _v21;
						continue form2freevar;
					case 'Dia':
						var _v22 = listBoundVar,
							_v23 = _p39._1;
						listBoundVar = _v22;
						f = _v23;
						continue form2freevar;
					case 'Bigwedge':
						if ((_p39._1.ctor === '_Tuple2') && (_p39._1._1.ctor === '_Tuple3')) {
							var _p42 = _p39._2;
							var _p41 = _p39._1._1._2;
							var _p40 = _p39._1._1._1;
							if (!A2(_elm_lang$core$List$member, _p40, listBoundVar)) {
								return {
									ctor: '::',
									_0: _p40,
									_1: A2(
										_user$project$DEL_sequent$form2freevar,
										{ctor: '::', _0: _p41, _1: listBoundVar},
										_p42)
								};
							} else {
								var _v24 = {ctor: '::', _0: _p41, _1: listBoundVar},
									_v25 = _p42;
								listBoundVar = _v24;
								f = _v25;
								continue form2freevar;
							}
						} else {
							break _v17_13;
						}
					case 'Bigvee':
						if ((_p39._1.ctor === '_Tuple2') && (_p39._1._1.ctor === '_Tuple3')) {
							var _p45 = _p39._2;
							var _p44 = _p39._1._1._2;
							var _p43 = _p39._1._1._1;
							if (!A2(_elm_lang$core$List$member, _p43, listBoundVar)) {
								return {
									ctor: '::',
									_0: _p43,
									_1: A2(
										_user$project$DEL_sequent$form2freevar,
										{ctor: '::', _0: _p44, _1: listBoundVar},
										_p45)
								};
							} else {
								var _v26 = {ctor: '::', _0: _p44, _1: listBoundVar},
									_v27 = _p45;
								listBoundVar = _v26;
								f = _v27;
								continue form2freevar;
							}
						} else {
							break _v17_13;
						}
					case 'BoxAction':
						return A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$DEL_sequent$action2freevar, listBoundVar, _p39._0),
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._1));
					case 'DiaAction':
						return A2(
							_elm_lang$core$Basics_ops['++'],
							A2(_user$project$DEL_sequent$action2freevar, listBoundVar, _p39._0),
							A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p39._1));
					case 'Precon':
						return A2(_user$project$DEL_sequent$state2freevar, listBoundVar, _p39._1);
					default:
						break _v17_13;
				}
			} while(false);
			return {ctor: '[]'};
		}
	});
var _user$project$DEL_sequent$labelExp2freevar = F2(
	function (listBoundVar, a) {
		var _p46 = a;
		if (_p46.ctor === 'Left') {
			return function (x) {
				return function (y) {
					return A2(_elm_lang$core$Basics_ops['++'], x, y);
				}(
					A2(_user$project$DEL_sequent$form2freevar, listBoundVar, _p46._0._0._3));
			}(
				A2(
					_elm_lang$core$List$concatMap,
					function (a) {
						return A2(_user$project$DEL_sequent$action2freevar, listBoundVar, a);
					},
					_toastal$either$Either$rights(_p46._0._0._2)));
		} else {
			if (_p46._0.ctor === 'RelAtom') {
				return _user$project$Util$nub(
					A2(
						_elm_lang$core$Basics_ops['++'],
						A2(
							_elm_lang$core$List$concatMap,
							function (a) {
								return A2(_user$project$DEL_sequent$action2freevar, listBoundVar, a);
							},
							A2(_elm_lang$core$Basics_ops['++'], _p46._0._0._2._1, _p46._0._0._3._1)),
						A2(
							_elm_lang$core$List$concatMap,
							function (f) {
								return A2(_user$project$DEL_sequent$form2freevar, listBoundVar, f);
							},
							_p46._0._0._1)));
			} else {
				return {ctor: '[]'};
			}
		}
	});
var _user$project$DEL_sequent$sequent2freevar = F2(
	function (listBoundVar, seq) {
		var labelforms = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _toastal$either$Either$Left(x);
			},
			A2(_elm_lang$core$Basics_ops['++'], seq.leftForm, seq.rightForm));
		var relatoms = A2(
			_elm_lang$core$List$map,
			function (x) {
				return _toastal$either$Either$Right(x);
			},
			A2(_elm_lang$core$Basics_ops['++'], seq.leftRel, seq.rightRel));
		return A2(
			_elm_lang$core$Basics_ops['++'],
			A2(
				_elm_lang$core$List$concatMap,
				function (x) {
					return A2(_user$project$DEL_sequent$labelExp2freevar, listBoundVar, x);
				},
				relatoms),
			A2(
				_elm_lang$core$List$concatMap,
				function (x) {
					return A2(_user$project$DEL_sequent$labelExp2freevar, listBoundVar, x);
				},
				labelforms));
	});
var _user$project$DEL_sequent$ruleDEL = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$atLN_DEL,
		category: _user$project$Common_sequent$Rule4LeftFormula,
		rulename: 'Lat',
		rule: function (seq) {
			var _p47 = seq.leftForm;
			if (((_p47.ctor === '::') && (_p47._0._0.ctor === '_Tuple4')) && (_p47._0._0._3.ctor === 'Atom')) {
				var add1 = function (ini) {
					return _user$project$Common_sequent$LabelForm(
						{
							ctor: '_Tuple4',
							_0: _p47._0._0._0,
							_1: _p47._0._0._1,
							_2: ini,
							_3: _user$project$Common_syntax$Atom(_p47._0._0._3._0)
						});
				};
				return A2(
					_user$project$Applicative_ops['?>'],
					_elm_community$list_extra$List_Extra$init(_p47._0._0._2),
					function (ini) {
						return {
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								seq,
								{
									leftForm: A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: add1(ini),
											_1: {ctor: '[]'}
										},
										_p47._1)
								}),
							_1: {ctor: '[]'}
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
			priority: _user$project$Common_sequent$atRN_DEL,
			category: _user$project$Common_sequent$Rule4RightFormula,
			rulename: 'Rat',
			rule: function (seq) {
				var _p48 = seq.rightForm;
				if (((_p48.ctor === '::') && (_p48._0._0.ctor === '_Tuple4')) && (_p48._0._0._3.ctor === 'Atom')) {
					var add1 = function (ini) {
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: _p48._0._0._0,
								_1: _p48._0._0._1,
								_2: ini,
								_3: _user$project$Common_syntax$Atom(_p48._0._0._3._0)
							});
					};
					return A2(
						_user$project$Applicative_ops['?>'],
						_elm_community$list_extra$List_Extra$init(_p48._0._0._2),
						function (ini) {
							return {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									seq,
									{
										rightForm: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: add1(ini),
												_1: {ctor: '[]'}
											},
											_p48._1)
									}),
								_1: {ctor: '[]'}
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
				priority: _user$project$Common_sequent$actionLN_DEL,
				category: _user$project$Common_sequent$Rule4LeftFormula,
				rulename: 'L[.]',
				rule: function (seq) {
					var _p49 = seq.leftForm;
					if ((((_p49.ctor === '::') && (_p49._0._0.ctor === '_Tuple4')) && (_p49._0._0._3.ctor === 'BoxAction')) && (_p49._0._0._3._0.ctor === 'PointAModel')) {
						var _p55 = _p49._0._0._3._0._1;
						var _p54 = _p49._1;
						var _p53 = _p49._0._0._1;
						var _p52 = _p49._0._0._0;
						var _p51 = _p49._0._0._3._0._0;
						var _p50 = _p49._0._0._2;
						var add2 = _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: _p52,
								_1: _p53,
								_2: A2(
									_elm_lang$core$Basics_ops['++'],
									{
										ctor: '::',
										_0: _toastal$either$Either$Right(
											A2(_user$project$Common_syntax$PointAModel, _p51, _p55)),
										_1: {ctor: '[]'}
									},
									_p50),
								_3: _p49._0._0._3._1
							});
						var add1 = _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: _p52,
								_1: _p53,
								_2: _p50,
								_3: A2(_user$project$Common_syntax$Precon, _p51, _p55)
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
												_0: add2,
												_1: {ctor: '[]'}
											},
											_p54)
									}),
								_1: {
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											leftForm: _p54,
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
					priority: _user$project$Common_sequent$actionRN_DEL,
					category: _user$project$Common_sequent$Rule4RightFormula,
					rulename: 'R[.]',
					rule: function (seq) {
						var _p56 = seq.rightForm;
						if ((((_p56.ctor === '::') && (_p56._0._0.ctor === '_Tuple4')) && (_p56._0._0._3.ctor === 'BoxAction')) && (_p56._0._0._3._0.ctor === 'PointAModel')) {
							var _p61 = _p56._0._0._3._0._1;
							var _p60 = _p56._0._0._1;
							var _p59 = _p56._0._0._0;
							var _p58 = _p56._0._0._3._0._0;
							var _p57 = _p56._0._0._2;
							var add2 = _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: _p59,
									_1: _p60,
									_2: A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: _toastal$either$Either$Right(
												A2(_user$project$Common_syntax$PointAModel, _p58, _p61)),
											_1: {ctor: '[]'}
										},
										_p57),
									_3: _p56._0._0._3._1
								});
							var add1 = _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: _p59,
									_1: _p60,
									_2: _p57,
									_3: A2(_user$project$Common_syntax$Precon, _p58, _p61)
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
												seq.leftForm),
											rightForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add2,
													_1: {ctor: '[]'}
												},
												_p56._1)
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
						priority: _user$project$Common_sequent$action2LN_DEL,
						category: _user$project$Common_sequent$Rule4LeftFormula,
						rulename: 'L<.>',
						rule: function (seq) {
							var _p62 = seq.leftForm;
							if ((((_p62.ctor === '::') && (_p62._0._0.ctor === '_Tuple4')) && (_p62._0._0._3.ctor === 'DiaAction')) && (_p62._0._0._3._0.ctor === 'PointAModel')) {
								var _p67 = _p62._0._0._3._0._1;
								var _p66 = _p62._0._0._1;
								var _p65 = _p62._0._0._0;
								var _p64 = _p62._0._0._3._0._0;
								var _p63 = _p62._0._0._2;
								var add2 = _user$project$Common_sequent$LabelForm(
									{
										ctor: '_Tuple4',
										_0: _p65,
										_1: _p66,
										_2: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: _toastal$either$Either$Right(
													A2(_user$project$Common_syntax$PointAModel, _p64, _p67)),
												_1: {ctor: '[]'}
											},
											_p63),
										_3: _p62._0._0._3._1
									});
								var add1 = _user$project$Common_sequent$LabelForm(
									{
										ctor: '_Tuple4',
										_0: _p65,
										_1: _p66,
										_2: _p63,
										_3: A2(_user$project$Common_syntax$Precon, _p64, _p67)
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
														_1: {
															ctor: '::',
															_0: add2,
															_1: {ctor: '[]'}
														}
													},
													_p62._1)
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
							priority: _user$project$Common_sequent$action2RN_DEL,
							category: _user$project$Common_sequent$Rule4RightFormula,
							rulename: 'R<.>',
							rule: function (seq) {
								var _p68 = seq.rightForm;
								if ((((_p68.ctor === '::') && (_p68._0._0.ctor === '_Tuple4')) && (_p68._0._0._3.ctor === 'DiaAction')) && (_p68._0._0._3._0.ctor === 'PointAModel')) {
									var _p74 = _p68._0._0._3._0._1;
									var _p73 = _p68._1;
									var _p72 = _p68._0._0._1;
									var _p71 = _p68._0._0._0;
									var _p70 = _p68._0._0._3._0._0;
									var _p69 = _p68._0._0._2;
									var add2 = _user$project$Common_sequent$LabelForm(
										{
											ctor: '_Tuple4',
											_0: _p71,
											_1: _p72,
											_2: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: _toastal$either$Either$Right(
														A2(_user$project$Common_syntax$PointAModel, _p70, _p74)),
													_1: {ctor: '[]'}
												},
												_p69),
											_3: _p68._0._0._3._1
										});
									var add1 = _user$project$Common_sequent$LabelForm(
										{
											ctor: '_Tuple4',
											_0: _p71,
											_1: _p72,
											_2: _p69,
											_3: A2(_user$project$Common_syntax$Precon, _p70, _p74)
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
														_p73)
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
															_p73)
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
								priority: _user$project$Common_sequent$cupLN_DEL,
								category: _user$project$Common_sequent$Rule4LeftFormula,
								rulename: 'LU',
								rule: function (seq) {
									var _p75 = seq.leftForm;
									if ((((_p75.ctor === '::') && (_p75._0._0.ctor === '_Tuple4')) && (_p75._0._0._3.ctor === 'BoxAction')) && (_p75._0._0._3._0.ctor === 'Cup')) {
										var _p79 = _p75._0._0._1;
										var _p78 = _p75._0._0._3._1;
										var _p77 = _p75._0._0._0;
										var _p76 = _p75._0._0._2;
										var add2 = _user$project$Common_sequent$LabelForm(
											{
												ctor: '_Tuple4',
												_0: _p77,
												_1: _p79,
												_2: _p76,
												_3: A2(_user$project$Common_syntax$BoxAction, _p75._0._0._3._0._1, _p78)
											});
										var add1 = _user$project$Common_sequent$LabelForm(
											{
												ctor: '_Tuple4',
												_0: _p77,
												_1: _p79,
												_2: _p76,
												_3: A2(_user$project$Common_syntax$BoxAction, _p75._0._0._3._0._0, _p78)
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
																_1: {
																	ctor: '::',
																	_0: add2,
																	_1: {ctor: '[]'}
																}
															},
															_p75._1)
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
									priority: _user$project$Common_sequent$cupRN_DEL,
									category: _user$project$Common_sequent$Rule4RightFormula,
									rulename: 'RU',
									rule: function (seq) {
										var _p80 = seq.rightForm;
										if ((((_p80.ctor === '::') && (_p80._0._0.ctor === '_Tuple4')) && (_p80._0._0._3.ctor === 'BoxAction')) && (_p80._0._0._3._0.ctor === 'Cup')) {
											var _p85 = _p80._1;
											var _p84 = _p80._0._0._1;
											var _p83 = _p80._0._0._3._1;
											var _p82 = _p80._0._0._0;
											var _p81 = _p80._0._0._2;
											var add2 = _user$project$Common_sequent$LabelForm(
												{
													ctor: '_Tuple4',
													_0: _p82,
													_1: _p84,
													_2: _p81,
													_3: A2(_user$project$Common_syntax$BoxAction, _p80._0._0._3._0._1, _p83)
												});
											var add1 = _user$project$Common_sequent$LabelForm(
												{
													ctor: '_Tuple4',
													_0: _p82,
													_1: _p84,
													_2: _p81,
													_3: A2(_user$project$Common_syntax$BoxAction, _p80._0._0._3._0._0, _p83)
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
																_p85)
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
																	_p85)
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
										priority: _user$project$Common_sequent$cupLN_DEL,
										category: _user$project$Common_sequent$Rule4LeftFormula,
										rulename: 'L;',
										rule: function (seq) {
											var _p86 = seq.leftForm;
											if ((((_p86.ctor === '::') && (_p86._0._0.ctor === '_Tuple4')) && (_p86._0._0._3.ctor === 'BoxAction')) && (_p86._0._0._3._0.ctor === 'ComposePoAM')) {
												var add1 = _user$project$Common_sequent$LabelForm(
													{
														ctor: '_Tuple4',
														_0: _p86._0._0._0,
														_1: _p86._0._0._1,
														_2: _p86._0._0._2,
														_3: A2(
															_user$project$Common_syntax$BoxAction,
															A2(_user$project$Common_syntax$composeAction, _p86._0._0._3._0._0, _p86._0._0._3._0._1),
															_p86._0._0._3._1)
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
																	_p86._1)
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
											priority: _user$project$Common_sequent$cupRN_DEL,
											category: _user$project$Common_sequent$Rule4RightFormula,
											rulename: 'R;',
											rule: function (seq) {
												var _p87 = seq.rightForm;
												if ((((_p87.ctor === '::') && (_p87._0._0.ctor === '_Tuple4')) && (_p87._0._0._3.ctor === 'BoxAction')) && (_p87._0._0._3._0.ctor === 'ComposePoAM')) {
													var add1 = _user$project$Common_sequent$LabelForm(
														{
															ctor: '_Tuple4',
															_0: _p87._0._0._0,
															_1: _p87._0._0._1,
															_2: _p87._0._0._2,
															_3: A2(
																_user$project$Common_syntax$BoxAction,
																A2(_user$project$Common_syntax$composeAction, _p87._0._0._3._0._0, _p87._0._0._3._0._1),
																_p87._0._0._3._1)
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
																		_p87._1)
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
												priority: _user$project$Common_sequent$relLN_DEL,
												category: _user$project$Common_sequent$Rule4LeftRel,
												rulename: 'Lrel',
												rule: function (seq) {
													var _p88 = seq.leftRel;
													if ((((_p88.ctor === '::') && (_p88._0.ctor === 'RelAtom')) && (_p88._0._0.ctor === '_Tuple4')) && (_p88._0._0._1.ctor === '[]')) {
														var _p89 = {ctor: '_Tuple2', _0: _p88._0._0._2, _1: _p88._0._0._3};
														if (((((((_p89.ctor === '_Tuple2') && (_p89._0.ctor === '_Tuple2')) && (_p89._0._1.ctor === '::')) && (_p89._0._1._0.ctor === 'PointAModel')) && (_p89._1.ctor === '_Tuple2')) && (_p89._1._1.ctor === '::')) && (_p89._1._1._0.ctor === 'PointAModel')) {
															var _p93 = _p89._1._0;
															var _p92 = _p89._0._0;
															var _p91 = _p89._1._1._1;
															var _p90 = _p89._0._1._1;
															var add3 = _user$project$Common_sequent$LabelForm(
																{
																	ctor: '_Tuple4',
																	_0: {ctor: '[]'},
																	_1: _p93,
																	_2: A2(
																		_elm_lang$core$List$map,
																		function (x) {
																			return _toastal$either$Either$Right(x);
																		},
																		_p91),
																	_3: A2(_user$project$Common_syntax$Precon, _p89._1._1._0._0, _p89._1._1._0._1)
																});
															var add2 = _user$project$Common_sequent$LabelForm(
																{
																	ctor: '_Tuple4',
																	_0: {ctor: '[]'},
																	_1: _p92,
																	_2: A2(
																		_elm_lang$core$List$map,
																		function (x) {
																			return _toastal$either$Either$Right(x);
																		},
																		_p90),
																	_3: A2(_user$project$Common_syntax$Precon, _p89._0._1._0._0, _p89._0._1._0._1)
																});
															var add1 = _user$project$Common_sequent$RelAtom(
																{
																	ctor: '_Tuple4',
																	_0: _p88._0._0._0,
																	_1: {ctor: '[]'},
																	_2: {ctor: '_Tuple2', _0: _p92, _1: _p90},
																	_3: {ctor: '_Tuple2', _0: _p93, _1: _p91}
																});
															return _elm_lang$core$Maybe$Just(
																{
																	ctor: '::',
																	_0: _elm_lang$core$Native_Utils.update(
																		seq,
																		{
																			leftRel: A2(
																				_elm_lang$core$Basics_ops['++'],
																				{
																					ctor: '::',
																					_0: add1,
																					_1: {ctor: '[]'}
																				},
																				_p88._1),
																			leftForm: A2(
																				_elm_lang$core$Basics_ops['++'],
																				{
																					ctor: '::',
																					_0: add2,
																					_1: {
																						ctor: '::',
																						_0: add3,
																						_1: {ctor: '[]'}
																					}
																				},
																				seq.leftForm)
																		}),
																	_1: {ctor: '[]'}
																});
														} else {
															return _elm_lang$core$Maybe$Nothing;
														}
													} else {
														return _elm_lang$core$Maybe$Nothing;
													}
												}
											},
											_1: {
												ctor: '::',
												_0: {
													priority: _user$project$Common_sequent$relRN_DEL,
													category: _user$project$Common_sequent$Rule4RightRel,
													rulename: 'Rrel',
													rule: function (seq) {
														var _p94 = seq.rightRel;
														if ((((_p94.ctor === '::') && (_p94._0.ctor === 'RelAtom')) && (_p94._0._0.ctor === '_Tuple4')) && (_p94._0._0._1.ctor === '[]')) {
															var _p95 = {ctor: '_Tuple2', _0: _p94._0._0._2, _1: _p94._0._0._3};
															if (((((((_p95.ctor === '_Tuple2') && (_p95._0.ctor === '_Tuple2')) && (_p95._0._1.ctor === '::')) && (_p95._0._1._0.ctor === 'PointAModel')) && (_p95._1.ctor === '_Tuple2')) && (_p95._1._1.ctor === '::')) && (_p95._1._1._0.ctor === 'PointAModel')) {
																var _p99 = _p95._1._0;
																var _p98 = _p95._0._0;
																var _p97 = _p95._1._1._1;
																var _p96 = _p95._0._1._1;
																var add3 = _user$project$Common_sequent$LabelForm(
																	{
																		ctor: '_Tuple4',
																		_0: {ctor: '[]'},
																		_1: _p99,
																		_2: A2(
																			_elm_lang$core$List$map,
																			function (x) {
																				return _toastal$either$Either$Right(x);
																			},
																			_p97),
																		_3: A2(_user$project$Common_syntax$Precon, _p95._1._1._0._0, _p95._1._1._0._1)
																	});
																var add2 = _user$project$Common_sequent$LabelForm(
																	{
																		ctor: '_Tuple4',
																		_0: {ctor: '[]'},
																		_1: _p98,
																		_2: A2(
																			_elm_lang$core$List$map,
																			function (x) {
																				return _toastal$either$Either$Right(x);
																			},
																			_p96),
																		_3: A2(_user$project$Common_syntax$Precon, _p95._0._1._0._0, _p95._0._1._0._1)
																	});
																var add1 = _user$project$Common_sequent$RelAtom(
																	{
																		ctor: '_Tuple4',
																		_0: _p94._0._0._0,
																		_1: {ctor: '[]'},
																		_2: {ctor: '_Tuple2', _0: _p98, _1: _p96},
																		_3: {ctor: '_Tuple2', _0: _p99, _1: _p97}
																	});
																return _elm_lang$core$Maybe$Just(
																	{
																		ctor: '::',
																		_0: _elm_lang$core$Native_Utils.update(
																			seq,
																			{
																				rightRel: A2(
																					_elm_lang$core$Basics_ops['++'],
																					{
																						ctor: '::',
																						_0: add1,
																						_1: {ctor: '[]'}
																					},
																					_p94._1)
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
																						seq.rightForm)
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
																								_0: add3,
																								_1: {ctor: '[]'}
																							},
																							seq.rightForm)
																					}),
																				_1: {ctor: '[]'}
																			}
																		}
																	});
															} else {
																return _elm_lang$core$Maybe$Nothing;
															}
														} else {
															return _elm_lang$core$Maybe$Nothing;
														}
													}
												},
												_1: {
													ctor: '::',
													_0: {
														priority: _user$project$Common_sequent$bigAndRN_DEL,
														category: _user$project$Common_sequent$Rule4RightFormula,
														rulename: 'R&&',
														rule: function (seq) {
															var _p100 = seq.rightForm;
															if (((((_p100.ctor === '::') && (_p100._0._0.ctor === '_Tuple4')) && (_p100._0._0._3.ctor === 'Bigwedge')) && (_p100._0._0._3._1.ctor === '_Tuple2')) && (_p100._0._0._3._1._1.ctor === '_Tuple3')) {
																var $new = function (n) {
																	return A2(_elm_lang$core$Basics_ops['++'], 'x', n);
																}(
																	_user$project$Util$show(
																		_user$project$Common_sequent$freshLabel(seq)));
																var add1 = _user$project$Common_sequent$LabelForm(
																	{
																		ctor: '_Tuple4',
																		_0: _p100._0._0._0,
																		_1: _p100._0._0._1,
																		_2: _p100._0._0._2,
																		_3: _user$project$DEL_sequent$substF(
																			{
																				ctor: '_Tuple2',
																				_0: _p100._0._0._3._2,
																				_1: {ctor: '_Tuple2', _0: _p100._0._0._3._1._1._2, _1: $new}
																			})
																	});
																var add2 = {
																	ctor: '_Tuple4',
																	_0: _p100._0._0._3._1._1._0,
																	_1: {
																		ctor: '::',
																		_0: _p100._0._0._3._1._0,
																		_1: {ctor: '[]'}
																	},
																	_2: _p100._0._0._3._1._1._1,
																	_3: $new
																};
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
																					_p100._1),
																				forDEL: A2(
																					_elm_lang$core$Basics_ops['++'],
																					{
																						ctor: '::',
																						_0: add2,
																						_1: {ctor: '[]'}
																					},
																					seq.forDEL)
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
															priority: _user$project$Common_sequent$bigAndLN_DEL,
															category: _user$project$Common_sequent$Rule4LeftFormula,
															rulename: 'L&&',
															rule: function (seq) {
																var _p101 = seq.leftForm;
																if (((((_p101.ctor === '::') && (_p101._0._0.ctor === '_Tuple4')) && (_p101._0._0._3.ctor === 'Bigwedge')) && (_p101._0._0._3._1.ctor === '_Tuple2')) && (_p101._0._0._3._1._1.ctor === '_Tuple3')) {
																	var _p107 = _p101._0._0._1;
																	var _p106 = _p101._0._0._3._2;
																	var _p105 = _p101._0._0._3._0;
																	var _p104 = _p101._0._0._2;
																	var _p103 = _p101._0._0._3._1._1._2;
																	var _p102 = _p101._0._0._0;
																	var orig = function (z) {
																		return _user$project$Common_sequent$LabelForm(
																			{
																				ctor: '_Tuple4',
																				_0: _p102,
																				_1: _p107,
																				_2: _p104,
																				_3: A3(
																					_user$project$Common_syntax$Bigwedge,
																					{ctor: '::', _0: z, _1: _p105},
																					{
																						ctor: '_Tuple2',
																						_0: _p101._0._0._3._1._0,
																						_1: {ctor: '_Tuple3', _0: _p101._0._0._3._1._1._0, _1: _p101._0._0._3._1._1._1, _2: _p103}
																					},
																					_p106)
																			});
																	};
																	var add1 = function (sel) {
																		return _user$project$Common_sequent$LabelForm(
																			{
																				ctor: '_Tuple4',
																				_0: _p102,
																				_1: _p107,
																				_2: _p104,
																				_3: _user$project$DEL_sequent$substF(
																					{
																						ctor: '_Tuple2',
																						_0: _p106,
																						_1: {ctor: '_Tuple2', _0: _p103, _1: sel}
																					})
																			});
																	};
																	var wholeVar = A2(
																		_user$project$DEL_sequent$sequent2freevar,
																		{ctor: '[]'},
																		seq);
																	var justLabel = _elm_lang$core$List$head(
																		_elm_lang$core$List$reverse(
																			A2(_user$project$Util$difference, wholeVar, _p105)));
																	return A2(
																		_user$project$Applicative_ops['?>'],
																		justLabel,
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
																							A2(
																								_elm_lang$core$Basics_ops['++'],
																								{
																									ctor: '::',
																									_0: orig(x),
																									_1: {ctor: '[]'}
																								},
																								_p101._1))
																					}),
																				_1: {ctor: '[]'}
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
																priority: _user$project$Common_sequent$bigAndRN_DEL,
																category: _user$project$Common_sequent$Rule4RightFormula,
																rulename: 'Rpre',
																rule: function (seq) {
																	var _p108 = seq.rightForm;
																	if (((_p108.ctor === '::') && (_p108._0._0.ctor === '_Tuple4')) && (_p108._0._0._3.ctor === 'Precon')) {
																		var _p109 = _p108._0._0._3._1;
																		if (A2(_elm_lang$core$String$contains, ',', _p109)) {
																			var add1 = A2(
																				_elm_lang$core$Maybe$map,
																				function (x) {
																					return _user$project$Common_sequent$LabelForm(
																						{ctor: '_Tuple4', _0: _p108._0._0._0, _1: _p108._0._0._1, _2: _p108._0._0._2, _3: x});
																				},
																				A2(_user$project$Common_syntax$lookPre, _p108._0._0._3._0.am_pre, _p109));
																			return A2(
																				_elm_lang$core$Maybe$map,
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
																										_0: x,
																										_1: {ctor: '[]'}
																									},
																									_p108._1)
																							}),
																						_1: {ctor: '[]'}
																					};
																				},
																				add1);
																		} else {
																			return _elm_lang$core$Maybe$Nothing;
																		}
																	} else {
																		return _elm_lang$core$Maybe$Nothing;
																	}
																}
															},
															_1: {
																ctor: '::',
																_0: {
																	priority: _user$project$Common_sequent$bigAndLN_DEL,
																	category: _user$project$Common_sequent$Rule4LeftFormula,
																	rulename: 'Lpre',
																	rule: function (seq) {
																		var _p110 = seq.leftForm;
																		if (((_p110.ctor === '::') && (_p110._0._0.ctor === '_Tuple4')) && (_p110._0._0._3.ctor === 'Precon')) {
																			var add1 = A2(
																				_elm_lang$core$Maybe$map,
																				function (x) {
																					return _user$project$Common_sequent$LabelForm(
																						{ctor: '_Tuple4', _0: _p110._0._0._0, _1: _p110._0._0._1, _2: _p110._0._0._2, _3: x});
																				},
																				A2(_user$project$Common_syntax$lookPre, _p110._0._0._3._0.am_pre, _p110._0._0._3._1));
																			return A2(
																				_elm_lang$core$Maybe$map,
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
																										_0: x,
																										_1: {ctor: '[]'}
																									},
																									_p110._1)
																							}),
																						_1: {ctor: '[]'}
																					};
																				},
																				add1);
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
				}
			}
		}
	}
};
var _user$project$DEL_sequent$actionCombi = function (list) {
	var ff = F2(
		function (xs, ys) {
			return A2(
				_user$project$Util_ops['$>>='],
				A2(_elm_lang$core$List$map, _elm_lang$core$List$singleton, xs),
				function (x) {
					return A2(
						_user$project$Util_ops['$>>='],
						ys,
						function (y) {
							return {
								ctor: '::',
								_0: A2(_elm_lang$core$Basics_ops['++'], x, y),
								_1: {ctor: '[]'}
							};
						});
				});
		});
	return A3(
		_elm_lang$core$List$foldr,
		ff,
		{
			ctor: '::',
			_0: {ctor: '[]'},
			_1: {ctor: '[]'}
		},
		list);
};
var _user$project$DEL_sequent$wholeActions = F3(
	function (acts, ag, seq) {
		var gg = F2(
			function (_p111, k0) {
				var _p112 = _p111;
				var _p119 = _p112._1;
				var _p113 = k0;
				if ((_p113.ctor === 'Right') && (_p113._0.ctor === 'PointAModel')) {
					return A2(
						_user$project$Util_ops['$>>='],
						A2(
							_elm_lang$core$List$map,
							function (_p114) {
								var _p115 = _p114;
								return {ctor: '_Tuple2', _0: _p115._1, _1: _p115._3};
							},
							_p119),
						function (_p116) {
							var _p117 = _p116;
							var _p118 = _p117._1;
							return A2(
								_elm_lang$core$List$member,
								{ctor: '_Tuple4', _0: _p112._0, _1: _p117._0, _2: _p113._0._1, _3: _p118},
								_p119) ? {
								ctor: '::',
								_0: A2(_user$project$Common_syntax$PointAModel, _p113._0._0, _p118),
								_1: {ctor: '[]'}
							} : {ctor: '[]'};
						});
				} else {
					return {ctor: '[]'};
				}
			});
		var _p120 = A2(
			_elm_lang$core$List$map,
			gg(
				{ctor: '_Tuple2', _0: ag, _1: seq.forDEL}),
			acts);
		if (_p120.ctor === '[]') {
			return {ctor: '[]'};
		} else {
			return _user$project$DEL_sequent$actionCombi(_p120);
		}
	});
var _user$project$DEL_sequent$substitution4Action = F2(
	function (act, _p121) {
		var _p122 = _p121;
		var _p124 = _p122;
		var gg = function (am) {
			return _elm_lang$core$Native_Utils.eq(am.am_name, _p124.am_name) ? _p124 : am;
		};
		var _p123 = act;
		switch (_p123.ctor) {
			case 'PointAModel':
				return A2(
					_user$project$Common_syntax$PointAModel,
					gg(_p123._0),
					_p123._1);
			case 'Cup':
				return A2(
					_user$project$Common_syntax$Cup,
					A2(_user$project$DEL_sequent$substitution4Action, _p123._0, _p124),
					A2(_user$project$DEL_sequent$substitution4Action, _p123._1, _p124));
			default:
				return A2(
					_user$project$Common_syntax$ComposePoAM,
					A2(_user$project$DEL_sequent$substitution4Action, _p123._0, _p124),
					A2(_user$project$DEL_sequent$substitution4Action, _p123._1, _p124));
		}
	});
var _user$project$DEL_sequent$substitution4AModel = F2(
	function (f, amWith) {
		var gg = function (am) {
			return _elm_lang$core$Native_Utils.eq(am.am_name, amWith.am_name) ? amWith : am;
		};
		var _p125 = f;
		_v54_13:
		do {
			switch (_p125.ctor) {
				case 'Bigwedge':
					if ((_p125._1.ctor === '_Tuple2') && (_p125._1._1.ctor === '_Tuple3')) {
						var _p131 = _p125._1._1._2;
						var _p130 = _p125._1._1._1;
						var _p129 = _p125._0;
						var _p128 = _p125._2;
						var _p127 = _p125._1._0;
						var _p126 = _p125._1._1._0;
						return _elm_lang$core$Native_Utils.eq(_p127.am_name, amWith.am_name) ? A3(
							_user$project$Common_syntax$Bigwedge,
							_p129,
							{
								ctor: '_Tuple2',
								_0: amWith,
								_1: {ctor: '_Tuple3', _0: _p126, _1: _p130, _2: _p131}
							},
							A2(_user$project$DEL_sequent$substitution4AModel, _p128, amWith)) : A3(
							_user$project$Common_syntax$Bigwedge,
							_p129,
							{
								ctor: '_Tuple2',
								_0: _p127,
								_1: {ctor: '_Tuple3', _0: _p126, _1: _p130, _2: _p131}
							},
							A2(_user$project$DEL_sequent$substitution4AModel, _p128, amWith));
					} else {
						break _v54_13;
					}
				case 'Bigvee':
					if ((_p125._1.ctor === '_Tuple2') && (_p125._1._1.ctor === '_Tuple3')) {
						var _p137 = _p125._1._1._2;
						var _p136 = _p125._1._1._1;
						var _p135 = _p125._0;
						var _p134 = _p125._2;
						var _p133 = _p125._1._0;
						var _p132 = _p125._1._1._0;
						return _elm_lang$core$Native_Utils.eq(_p133.am_name, amWith.am_name) ? A3(
							_user$project$Common_syntax$Bigvee,
							_p135,
							{
								ctor: '_Tuple2',
								_0: amWith,
								_1: {ctor: '_Tuple3', _0: _p132, _1: _p136, _2: _p137}
							},
							A2(_user$project$DEL_sequent$substitution4AModel, _p134, amWith)) : A3(
							_user$project$Common_syntax$Bigvee,
							_p135,
							{
								ctor: '_Tuple2',
								_0: _p133,
								_1: {ctor: '_Tuple3', _0: _p132, _1: _p136, _2: _p137}
							},
							A2(_user$project$DEL_sequent$substitution4AModel, _p134, amWith));
					} else {
						break _v54_13;
					}
				case 'Precon':
					var _p139 = _p125._1;
					var _p138 = _p125._0;
					return _elm_lang$core$Native_Utils.eq(_p138.am_name, amWith.am_name) ? A2(_user$project$Common_syntax$Precon, amWith, _p139) : A2(_user$project$Common_syntax$Precon, _p138, _p139);
				case 'And':
					return A2(
						_user$project$Common_syntax$And,
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._0, amWith),
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'Or':
					return A2(
						_user$project$Common_syntax$Or,
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._0, amWith),
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'Iff':
					return A2(
						_user$project$Common_syntax$Iff,
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._0, amWith),
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'Imply':
					return A2(
						_user$project$Common_syntax$Imply,
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._0, amWith),
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'Imply2':
					return A2(
						_user$project$Common_syntax$Imply2,
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._0, amWith),
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'Not':
					return _user$project$Common_syntax$Not(
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._0, amWith));
				case 'Box':
					return A2(
						_user$project$Common_syntax$Box,
						_p125._0,
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'Dia':
					return A2(
						_user$project$Common_syntax$Dia,
						_p125._0,
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'BoxAction':
					return A2(
						_user$project$Common_syntax$BoxAction,
						A2(_user$project$DEL_sequent$substitution4Action, _p125._0, amWith),
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				case 'DiaAction':
					return A2(
						_user$project$Common_syntax$DiaAction,
						A2(_user$project$DEL_sequent$substitution4Action, _p125._0, amWith),
						A2(_user$project$DEL_sequent$substitution4AModel, _p125._1, amWith));
				default:
					break _v54_13;
			}
		} while(false);
		return f;
	});
var _user$project$DEL_sequent$substitution4AModel4list = F2(
	function (f, listOfAM) {
		substitution4AModel4list:
		while (true) {
			var _p140 = listOfAM;
			if (_p140.ctor === '[]') {
				return f;
			} else {
				var changed = A2(_user$project$DEL_sequent$substitution4AModel, f, _p140._0);
				var _v56 = changed,
					_v57 = _p140._1;
				f = _v56;
				listOfAM = _v57;
				continue substitution4AModel4list;
			}
		}
	});
var _user$project$DEL_sequent$amNub = function (xs) {
	return A3(
		_elm_lang$core$List$foldr,
		F2(
			function (a, xss) {
				return A2(
					_elm_lang$core$List$member,
					a.am_name,
					A2(
						_elm_lang$core$List$map,
						function (x) {
							return x.am_name;
						},
						xss)) ? xss : {ctor: '::', _0: a, _1: xss};
			}),
		{ctor: '[]'},
		xs);
};
var _user$project$DEL_sequent$substPrecondition = F2(
	function (amWith, amNothing) {
		return _elm_lang$core$Native_Utils.update(
			amNothing,
			{
				am_pre: A2(
					_elm_lang$core$List$map,
					function (_p141) {
						var _p142 = _p141;
						return {
							ctor: '_Tuple2',
							_0: _p142._0,
							_1: A2(_user$project$DEL_sequent$substitution4AModel, _p142._1, amWith)
						};
					},
					amNothing.am_pre)
			});
	});
var _user$project$DEL_sequent$substitution4AModel4list_AModels = F2(
	function (listOfAM, result) {
		substitution4AModel4list_AModels:
		while (true) {
			var _p143 = listOfAM;
			if (_p143.ctor === '[]') {
				return result;
			} else {
				var subst = A2(
					_elm_lang$core$List$map,
					_user$project$DEL_sequent$substPrecondition(_p143._0),
					_p143._1);
				var _v60 = subst,
					_v61 = A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$DEL_sequent$amNub(result),
					subst);
				listOfAM = _v60;
				result = _v61;
				continue substitution4AModel4list_AModels;
			}
		}
	});
var _user$project$DEL_sequent$am_relation_f = F3(
	function (rel, ag, s) {
		return A2(
			_elm_lang$core$List$concatMap,
			function (_p144) {
				var _p145 = _p144;
				return (_elm_lang$core$Native_Utils.eq(s, _p145._1) && _elm_lang$core$Native_Utils.eq(ag, _p145._0)) ? {
					ctor: '::',
					_0: _p145._2,
					_1: {ctor: '[]'}
				} : {ctor: '[]'};
			},
			rel);
	});
var _user$project$DEL_sequent$forPAL = {ctor: '[]'};
var _user$project$DEL_sequent$ruleK_DEL = {
	ctor: '::',
	_0: {
		priority: _user$project$Common_sequent$boxLN,
		category: _user$project$Common_sequent$Rule4LeftFormula,
		rulename: 'L#1',
		rule: function (seq) {
			var _p146 = seq.leftForm;
			if ((((_p146.ctor === '::') && (_p146._0._0.ctor === '_Tuple4')) && (_p146._0._0._2.ctor === '[]')) && (_p146._0._0._3.ctor === 'Box')) {
				var _p157 = _p146._1;
				var _p156 = _p146._0._0._1;
				var _p155 = _p146._0._0._3._1;
				var _p154 = _p146._0._0._0;
				var _p153 = _p146._0._0._3._0;
				var add2 = function (_p147) {
					var _p148 = _p147;
					return _user$project$Common_sequent$LabelForm(
						{
							ctor: '_Tuple4',
							_0: {ctor: '[]'},
							_1: _p148._0,
							_2: {ctor: '[]'},
							_3: _p155
						});
				};
				var add1 = function (_p149) {
					var _p150 = _p149;
					return _user$project$Common_sequent$RelAtom(
						{
							ctor: '_Tuple4',
							_0: _p153,
							_1: {ctor: '[]'},
							_2: {
								ctor: '_Tuple2',
								_0: _p156,
								_1: {ctor: '[]'}
							},
							_3: {
								ctor: '_Tuple2',
								_0: _p150._0,
								_1: {ctor: '[]'}
							}
						});
				};
				var orig = function (_p151) {
					var _p152 = _p151;
					return _user$project$Common_sequent$LabelForm(
						{
							ctor: '_Tuple4',
							_0: {
								ctor: '::',
								_0: {ctor: '_Tuple2', _0: _p152._0, _1: _p152._1},
								_1: _p154
							},
							_1: _p156,
							_2: {ctor: '[]'},
							_3: A2(_user$project$Common_syntax$Box, _p153, _p155)
						});
				};
				var justlabel = function (wholeLabel2) {
					return _elm_community$list_extra$List_Extra$last(
						A2(_user$project$Util$difference, wholeLabel2, _p154));
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
					function ($new) {
						return {
							ctor: '::',
							_0: _elm_lang$core$Native_Utils.update(
								seq,
								{
									leftForm: A2(
										_elm_lang$core$Basics_ops['++'],
										{
											ctor: '::',
											_0: add2($new),
											_1: {ctor: '[]'}
										},
										A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: orig($new),
												_1: {ctor: '[]'}
											},
											_p157))
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
												_0: orig($new),
												_1: {ctor: '[]'}
											},
											_p157),
										rightRel: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: add1($new),
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
			priority: _user$project$Common_sequent$boxLN2_DEL,
			category: _user$project$Common_sequent$Rule4LeftFormula,
			rulename: 'L#2',
			rule: function (seq) {
				var _p158 = seq.leftForm;
				if ((((_p158.ctor === '::') && (_p158._0._0.ctor === '_Tuple4')) && (_p158._0._0._2.ctor === '::')) && (_p158._0._0._3.ctor === 'Box')) {
					var _p173 = _p158._1;
					var _p172 = _p158._0._0._1;
					var _p171 = _p158._0._0._3._1;
					var _p170 = _p158._0._0._0;
					var _p169 = _p158._0._0._3._0;
					var add2 = function (_p159) {
						var _p160 = _p159;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: _p170,
								_1: _p160._0,
								_2: A2(
									_elm_lang$core$List$map,
									function (x) {
										return _toastal$either$Either$Right(x);
									},
									_p160._1),
								_3: _p171
							});
					};
					var acts = {ctor: '::', _0: _p158._0._0._2._0, _1: _p158._0._0._2._1};
					var original = function (_p161) {
						var _p162 = _p161;
						return _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: {
									ctor: '::',
									_0: {ctor: '_Tuple2', _0: _p162._0, _1: _p162._1},
									_1: _p170
								},
								_1: _p172,
								_2: acts,
								_3: A2(_user$project$Common_syntax$Box, _p169, _p171)
							});
					};
					var wholeLabel2 = _user$project$Util$nub(
						A2(
							_user$project$Util$cartesian,
							_user$project$Common_sequent$wholeLabel(seq),
							A3(_user$project$DEL_sequent$wholeActions, acts, _p169, seq)));
					var justLabel = _elm_lang$core$List$head(
						A2(_user$project$Util$difference, wholeLabel2, _p170));
					var add1 = function (_p163) {
						var _p164 = _p163;
						return _user$project$Common_sequent$RelAtom(
							{
								ctor: '_Tuple4',
								_0: _p169,
								_1: _user$project$DEL_sequent$forPAL,
								_2: {
									ctor: '_Tuple2',
									_0: _p172,
									_1: _toastal$either$Either$rights(acts)
								},
								_3: {ctor: '_Tuple2', _0: _p164._0, _1: _p164._1}
							});
					};
					return A2(
						_user$project$Applicative_ops['?>'],
						justLabel,
						function (_p165) {
							var _p166 = _p165;
							var _p168 = _p166._0;
							var _p167 = _p166._1;
							return {
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									seq,
									{
										leftForm: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: original(
													{ctor: '_Tuple2', _0: _p168, _1: _p167}),
												_1: {ctor: '[]'}
											},
											A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add2(
														{ctor: '_Tuple2', _0: _p168, _1: _p167}),
													_1: {ctor: '[]'}
												},
												_p173))
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
													_0: original(
														{ctor: '_Tuple2', _0: _p168, _1: _p167}),
													_1: {ctor: '[]'}
												},
												_p173),
											rightRel: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add1(
														{ctor: '_Tuple2', _0: _p168, _1: _p167}),
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
				category: _user$project$Common_sequent$Rule4RightFormula,
				rulename: 'R#1',
				rule: function (seq) {
					var _p174 = seq.rightForm;
					if ((((_p174.ctor === '::') && (_p174._0._0.ctor === '_Tuple4')) && (_p174._0._0._2.ctor === '[]')) && (_p174._0._0._3.ctor === 'Box')) {
						var $new = _user$project$Common_sequent$freshLabel(seq);
						var add1 = _user$project$Common_sequent$RelAtom(
							{
								ctor: '_Tuple4',
								_0: _p174._0._0._3._0,
								_1: _user$project$DEL_sequent$forPAL,
								_2: {
									ctor: '_Tuple2',
									_0: _p174._0._0._1,
									_1: {ctor: '[]'}
								},
								_3: {
									ctor: '_Tuple2',
									_0: $new,
									_1: {ctor: '[]'}
								}
							});
						var add2 = _user$project$Common_sequent$LabelForm(
							{
								ctor: '_Tuple4',
								_0: _p174._0._0._0,
								_1: $new,
								_2: {ctor: '[]'},
								_3: _p174._0._0._3._1
							});
						return _elm_lang$core$Maybe$Just(
							{
								ctor: '::',
								_0: _elm_lang$core$Native_Utils.update(
									seq,
									{
										leftRel: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: add1,
												_1: {ctor: '[]'}
											},
											seq.leftRel),
										rightForm: A2(
											_elm_lang$core$Basics_ops['++'],
											{
												ctor: '::',
												_0: add2,
												_1: {ctor: '[]'}
											},
											_p174._1)
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
					priority: _user$project$Common_sequent$boxRN2_DEL,
					category: _user$project$Common_sequent$Rule4RightFormula,
					rulename: 'R#2',
					rule: function (seq) {
						var _p175 = seq.rightForm;
						if ((((((_p175.ctor === '::') && (_p175._0._0.ctor === '_Tuple4')) && (_p175._0._0._2.ctor === '::')) && (_p175._0._0._2._0.ctor === 'Right')) && (_p175._0._0._2._0._0.ctor === 'PointAModel')) && (_p175._0._0._3.ctor === 'Box')) {
							var _p184 = _p175._0._0._2._0._0._1;
							var _p183 = _p175._0._0._2._0._0._0;
							var _p182 = _p175._0._0._3._0;
							var $new = _user$project$Common_sequent$freshLabel(seq);
							var acts = {
								ctor: '::',
								_0: _toastal$either$Either$Right(
									A2(_user$project$Common_syntax$PointAModel, _p183, _p184)),
								_1: _p175._0._0._2._1
							};
							var ooo = function (newVar) {
								return A2(
									_elm_lang$core$List$map,
									function (_p176) {
										var _p177 = _p176;
										var _p178 = _p177._0;
										if ((_p178.ctor === 'Right') && (_p178._0.ctor === 'PointAModel')) {
											return A2(
												_user$project$Common_syntax$PointAModel,
												_p178._0._0,
												A2(
													_elm_lang$core$Basics_ops['++'],
													'x',
													_user$project$Util$show(_p177._1)));
										} else {
											return _elm_lang$core$Native_Utils.crashCase(
												'DEL_sequent',
												{
													start: {line: 254, column: 49},
													end: {line: 256, column: 76}
												},
												_p178)('error in R#2 (1)');
										}
									},
									A2(
										_elm_community$list_extra$List_Extra$zip,
										acts,
										A2(
											_elm_lang$core$List$range,
											newVar,
											newVar + _elm_lang$core$List$length(acts))));
							}($new);
							var add2 = _user$project$Common_sequent$LabelForm(
								{
									ctor: '_Tuple4',
									_0: {ctor: '[]'},
									_1: $new,
									_2: A2(
										_elm_lang$core$List$map,
										function (x) {
											return _toastal$either$Either$Right(x);
										},
										ooo),
									_3: _p175._0._0._3._1
								});
							var add3 = A2(
								_elm_lang$core$List$map,
								function (state2) {
									return {
										ctor: '_Tuple4',
										_0: _p182,
										_1: {
											ctor: '::',
											_0: _p183,
											_1: {ctor: '[]'}
										},
										_2: _p184,
										_3: state2
									};
								},
								A2(
									_elm_lang$core$List$map,
									function (act) {
										var _p180 = act;
										if (_p180.ctor === 'PointAModel') {
											return _p180._1;
										} else {
											return _elm_lang$core$Native_Utils.crashCase(
												'DEL_sequent',
												{
													start: {line: 260, column: 46},
													end: {line: 262, column: 80}
												},
												_p180)('error in R#2 (2)');
										}
									},
									ooo));
							var add1 = _user$project$Common_sequent$RelAtom(
								{
									ctor: '_Tuple4',
									_0: _p182,
									_1: _user$project$DEL_sequent$forPAL,
									_2: {
										ctor: '_Tuple2',
										_0: _p175._0._0._1,
										_1: _toastal$either$Either$rights(acts)
									},
									_3: {ctor: '_Tuple2', _0: $new, _1: ooo}
								});
							return _elm_lang$core$Maybe$Just(
								{
									ctor: '::',
									_0: _elm_lang$core$Native_Utils.update(
										seq,
										{
											leftRel: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add1,
													_1: {ctor: '[]'}
												},
												seq.leftRel),
											rightForm: A2(
												_elm_lang$core$Basics_ops['++'],
												{
													ctor: '::',
													_0: add2,
													_1: {ctor: '[]'}
												},
												_p175._1),
											forDEL: A2(_elm_lang$core$Basics_ops['++'], add3, seq.forDEL)
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
						priority: _user$project$Common_sequent$diaRN,
						category: _user$project$Common_sequent$Rule4RightFormula,
						rulename: 'R$1',
						rule: function (seq) {
							var _p185 = seq.rightForm;
							if ((((_p185.ctor === '::') && (_p185._0._0.ctor === '_Tuple4')) && (_p185._0._0._2.ctor === '[]')) && (_p185._0._0._3.ctor === 'Dia')) {
								var _p196 = _p185._1;
								var _p195 = _p185._0._0._1;
								var _p194 = _p185._0._0._3._1;
								var _p193 = _p185._0._0._0;
								var _p192 = _p185._0._0._3._0;
								var add2 = function (_p186) {
									var _p187 = _p186;
									return _user$project$Common_sequent$LabelForm(
										{
											ctor: '_Tuple4',
											_0: {ctor: '[]'},
											_1: _p187._0,
											_2: {ctor: '[]'},
											_3: _p194
										});
								};
								var add1 = function (_p188) {
									var _p189 = _p188;
									return _user$project$Common_sequent$RelAtom(
										{
											ctor: '_Tuple4',
											_0: _p192,
											_1: {ctor: '[]'},
											_2: {
												ctor: '_Tuple2',
												_0: _p195,
												_1: {ctor: '[]'}
											},
											_3: {
												ctor: '_Tuple2',
												_0: _p189._0,
												_1: {ctor: '[]'}
											}
										});
								};
								var orig = function (_p190) {
									var _p191 = _p190;
									return _user$project$Common_sequent$LabelForm(
										{
											ctor: '_Tuple4',
											_0: {
												ctor: '::',
												_0: {ctor: '_Tuple2', _0: _p191._0, _1: _p191._1},
												_1: _p193
											},
											_1: _p195,
											_2: {ctor: '[]'},
											_3: A2(_user$project$Common_syntax$Dia, _p192, _p194)
										});
								};
								var justlabel = function (wholeLabel2) {
									return _elm_lang$core$List$head(
										A2(_user$project$Util$difference, wholeLabel2, _p193));
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
									function ($new) {
										return {
											ctor: '::',
											_0: _elm_lang$core$Native_Utils.update(
												seq,
												{
													rightForm: A2(
														_elm_lang$core$Basics_ops['++'],
														{
															ctor: '::',
															_0: add2($new),
															_1: {ctor: '[]'}
														},
														A2(
															_elm_lang$core$Basics_ops['++'],
															{
																ctor: '::',
																_0: orig($new),
																_1: {ctor: '[]'}
															},
															_p196))
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
																_0: orig($new),
																_1: {ctor: '[]'}
															},
															_p196),
														rightRel: A2(
															_elm_lang$core$Basics_ops['++'],
															{
																ctor: '::',
																_0: add1($new),
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
							priority: _user$project$Common_sequent$boxLN2_DEL,
							category: _user$project$Common_sequent$Rule4RightFormula,
							rulename: 'R$2',
							rule: function (seq) {
								var _p197 = seq.rightForm;
								if ((((_p197.ctor === '::') && (_p197._0._0.ctor === '_Tuple4')) && (_p197._0._0._2.ctor === '::')) && (_p197._0._0._3.ctor === 'Dia')) {
									var _p212 = _p197._1;
									var _p211 = _p197._0._0._1;
									var _p210 = _p197._0._0._3._1;
									var _p209 = _p197._0._0._0;
									var _p208 = _p197._0._0._3._0;
									var add2 = function (_p198) {
										var _p199 = _p198;
										return _user$project$Common_sequent$LabelForm(
											{
												ctor: '_Tuple4',
												_0: _p209,
												_1: _p199._0,
												_2: A2(
													_elm_lang$core$List$map,
													function (x) {
														return _toastal$either$Either$Right(x);
													},
													_p199._1),
												_3: _p210
											});
									};
									var acts = {ctor: '::', _0: _p197._0._0._2._0, _1: _p197._0._0._2._1};
									var original = function (_p200) {
										var _p201 = _p200;
										return _user$project$Common_sequent$LabelForm(
											{
												ctor: '_Tuple4',
												_0: {
													ctor: '::',
													_0: {ctor: '_Tuple2', _0: _p201._0, _1: _p201._1},
													_1: _p209
												},
												_1: _p211,
												_2: acts,
												_3: A2(_user$project$Common_syntax$Dia, _p208, _p210)
											});
									};
									var wholeLabel2 = _user$project$Util$nub(
										A2(
											_user$project$Util$cartesian,
											_user$project$Common_sequent$wholeLabel(seq),
											A3(_user$project$DEL_sequent$wholeActions, acts, _p208, seq)));
									var justLabel = _elm_lang$core$List$head(
										A2(_user$project$Util$difference, wholeLabel2, _p209));
									var add1 = function (_p202) {
										var _p203 = _p202;
										return _user$project$Common_sequent$RelAtom(
											{
												ctor: '_Tuple4',
												_0: _p208,
												_1: _user$project$DEL_sequent$forPAL,
												_2: {
													ctor: '_Tuple2',
													_0: _p211,
													_1: _toastal$either$Either$rights(acts)
												},
												_3: {ctor: '_Tuple2', _0: _p203._0, _1: _p203._1}
											});
									};
									return A2(
										_user$project$Applicative_ops['?>'],
										justLabel,
										function (_p204) {
											var _p205 = _p204;
											var _p207 = _p205._0;
											var _p206 = _p205._1;
											return {
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													seq,
													{
														rightForm: A2(
															_elm_lang$core$Basics_ops['++'],
															{
																ctor: '::',
																_0: original(
																	{ctor: '_Tuple2', _0: _p207, _1: _p206}),
																_1: {ctor: '[]'}
															},
															A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add2(
																		{ctor: '_Tuple2', _0: _p207, _1: _p206}),
																	_1: {ctor: '[]'}
																},
																_p212))
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
																	_0: original(
																		{ctor: '_Tuple2', _0: _p207, _1: _p206}),
																	_1: {ctor: '[]'}
																},
																_p212),
															rightRel: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add1(
																		{ctor: '_Tuple2', _0: _p207, _1: _p206}),
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
								priority: _user$project$Common_sequent$diaLN,
								category: _user$project$Common_sequent$Rule4LeftFormula,
								rulename: 'L$1',
								rule: function (seq) {
									var _p213 = seq.leftForm;
									if ((((_p213.ctor === '::') && (_p213._0._0.ctor === '_Tuple4')) && (_p213._0._0._2.ctor === '[]')) && (_p213._0._0._3.ctor === 'Dia')) {
										var $new = _user$project$Common_sequent$freshLabel(seq);
										var add1 = _user$project$Common_sequent$RelAtom(
											{
												ctor: '_Tuple4',
												_0: _p213._0._0._3._0,
												_1: _user$project$DEL_sequent$forPAL,
												_2: {
													ctor: '_Tuple2',
													_0: _p213._0._0._1,
													_1: {ctor: '[]'}
												},
												_3: {
													ctor: '_Tuple2',
													_0: $new,
													_1: {ctor: '[]'}
												}
											});
										var add2 = _user$project$Common_sequent$LabelForm(
											{
												ctor: '_Tuple4',
												_0: _p213._0._0._0,
												_1: $new,
												_2: {ctor: '[]'},
												_3: _p213._0._0._3._1
											});
										return _elm_lang$core$Maybe$Just(
											{
												ctor: '::',
												_0: _elm_lang$core$Native_Utils.update(
													seq,
													{
														leftRel: A2(
															_elm_lang$core$Basics_ops['++'],
															{
																ctor: '::',
																_0: add1,
																_1: {ctor: '[]'}
															},
															seq.leftRel),
														leftForm: A2(
															_elm_lang$core$Basics_ops['++'],
															{
																ctor: '::',
																_0: add2,
																_1: {ctor: '[]'}
															},
															_p213._1)
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
									priority: _user$project$Common_sequent$boxRN2_DEL,
									category: _user$project$Common_sequent$Rule4LeftFormula,
									rulename: 'L$2',
									rule: function (seq) {
										var _p214 = seq.leftForm;
										if ((((((_p214.ctor === '::') && (_p214._0._0.ctor === '_Tuple4')) && (_p214._0._0._2.ctor === '::')) && (_p214._0._0._2._0.ctor === 'Right')) && (_p214._0._0._2._0._0.ctor === 'PointAModel')) && (_p214._0._0._3.ctor === 'Dia')) {
											var _p223 = _p214._0._0._2._0._0._1;
											var _p222 = _p214._0._0._2._0._0._0;
											var _p221 = _p214._0._0._3._0;
											var $new = _user$project$Common_sequent$freshLabel(seq);
											var acts = {
												ctor: '::',
												_0: _toastal$either$Either$Right(
													A2(_user$project$Common_syntax$PointAModel, _p222, _p223)),
												_1: _p214._0._0._2._1
											};
											var ooo = function (newVar) {
												return A2(
													_elm_lang$core$List$map,
													function (_p215) {
														var _p216 = _p215;
														var _p217 = _p216._0;
														if ((_p217.ctor === 'Right') && (_p217._0.ctor === 'PointAModel')) {
															return A2(
																_user$project$Common_syntax$PointAModel,
																_p217._0._0,
																A2(
																	_elm_lang$core$Basics_ops['++'],
																	'x',
																	_user$project$Util$show(_p216._1)));
														} else {
															return _elm_lang$core$Native_Utils.crashCase(
																'DEL_sequent',
																{
																	start: {line: 342, column: 49},
																	end: {line: 344, column: 76}
																},
																_p217)('error in R#2 (1)');
														}
													},
													A2(
														_elm_community$list_extra$List_Extra$zip,
														acts,
														A2(
															_elm_lang$core$List$range,
															newVar,
															newVar + _elm_lang$core$List$length(acts))));
											}($new);
											var add2 = _user$project$Common_sequent$LabelForm(
												{
													ctor: '_Tuple4',
													_0: {ctor: '[]'},
													_1: $new,
													_2: A2(
														_elm_lang$core$List$map,
														function (x) {
															return _toastal$either$Either$Right(x);
														},
														ooo),
													_3: _p214._0._0._3._1
												});
											var add3 = A2(
												_elm_lang$core$List$map,
												function (state2) {
													return {
														ctor: '_Tuple4',
														_0: _p221,
														_1: {
															ctor: '::',
															_0: _p222,
															_1: {ctor: '[]'}
														},
														_2: _p223,
														_3: state2
													};
												},
												A2(
													_elm_lang$core$List$map,
													function (act) {
														var _p219 = act;
														if (_p219.ctor === 'PointAModel') {
															return _p219._1;
														} else {
															return _elm_lang$core$Native_Utils.crashCase(
																'DEL_sequent',
																{
																	start: {line: 348, column: 46},
																	end: {line: 350, column: 80}
																},
																_p219)('error in R#2 (2)');
														}
													},
													ooo));
											var add1 = _user$project$Common_sequent$RelAtom(
												{
													ctor: '_Tuple4',
													_0: _p221,
													_1: _user$project$DEL_sequent$forPAL,
													_2: {
														ctor: '_Tuple2',
														_0: _p214._0._0._1,
														_1: _toastal$either$Either$rights(acts)
													},
													_3: {ctor: '_Tuple2', _0: $new, _1: ooo}
												});
											return _elm_lang$core$Maybe$Just(
												{
													ctor: '::',
													_0: _elm_lang$core$Native_Utils.update(
														seq,
														{
															leftRel: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add1,
																	_1: {ctor: '[]'}
																},
																seq.leftRel),
															leftForm: A2(
																_elm_lang$core$Basics_ops['++'],
																{
																	ctor: '::',
																	_0: add2,
																	_1: {ctor: '[]'}
																},
																_p214._1),
															forDEL: A2(_elm_lang$core$Basics_ops['++'], add3, seq.forDEL)
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
};
var _user$project$DEL_sequent$ra6 = A2(
	_user$project$Common_syntax$Iff,
	A2(
		_user$project$Common_syntax$BoxAction,
		A2(_user$project$Common_syntax$Cup, _user$project$Common_syntax$skip_point, _user$project$Common_syntax$reada_po),
		_user$project$Common_syntax$AnyFormula('A')),
	A2(
		_user$project$Common_syntax$And,
		A2(
			_user$project$Common_syntax$BoxAction,
			_user$project$Common_syntax$skip_point,
			_user$project$Common_syntax$AnyFormula('A')),
		A2(
			_user$project$Common_syntax$BoxAction,
			_user$project$Common_syntax$reada_po,
			_user$project$Common_syntax$AnyFormula('A'))));
var _user$project$DEL_sequent$dd = _user$project$Common_syntax$AnyFormula('D');
var _user$project$DEL_sequent$cc = _user$project$Common_syntax$AnyFormula('C');
var _user$project$DEL_sequent$bb = _user$project$Common_syntax$AnyFormula('B');
var _user$project$DEL_sequent$aa = _user$project$Common_syntax$AnyFormula('A');
var _user$project$DEL_sequent$p3 = _user$project$Common_syntax$Atom('p3');
var _user$project$DEL_sequent$p2 = _user$project$Common_syntax$Atom('p2');
var _user$project$DEL_sequent$p1 = _user$project$Common_syntax$Atom('p1');
var _user$project$DEL_sequent$ex638 = A2(
	_user$project$Common_syntax$BoxAction,
	_user$project$Common_syntax$reada_po,
	A2(_user$project$Common_syntax$Box, 'a', _user$project$DEL_sequent$p1));
var _user$project$DEL_sequent$ex639a = A2(
	_user$project$Common_syntax$BoxAction,
	_user$project$Common_syntax$reada_po,
	A2(
		_user$project$Common_syntax$Box,
		'b',
		A2(
			_user$project$Common_syntax$Or,
			A2(_user$project$Common_syntax$Box, 'a', _user$project$DEL_sequent$p1),
			A2(
				_user$project$Common_syntax$Box,
				'a',
				_user$project$Common_syntax$Not(_user$project$DEL_sequent$p1)))));
var _user$project$DEL_sequent$ex639b = A2(
	_user$project$Common_syntax$BoxAction,
	_user$project$Common_syntax$reada_po,
	A2(
		_user$project$Common_syntax$Or,
		A2(_user$project$Common_syntax$Box, 'a', _user$project$DEL_sequent$p1),
		_user$project$Common_syntax$Not(
			A2(_user$project$Common_syntax$Box, 'a', _user$project$DEL_sequent$p1))));

var _user$project$PAL_semantics$announceHexa3 = _user$project$Common_syntax$bigAnd(
	{
		ctor: '::',
		_0: _user$project$Common_syntax$Atom('0a'),
		_1: {
			ctor: '::',
			_0: _user$project$Common_syntax$Atom('1b'),
			_1: {
				ctor: '::',
				_0: _user$project$Common_syntax$Atom('2c'),
				_1: {ctor: '[]'}
			}
		}
	});
var _user$project$PAL_semantics$announceHexa2 = _user$project$Common_syntax$bigOr(
	{
		ctor: '::',
		_0: A2(
			_user$project$Common_syntax$notknow,
			'b',
			_user$project$Common_syntax$Atom('0a')),
		_1: {
			ctor: '::',
			_0: A2(
				_user$project$Common_syntax$know,
				'b',
				_user$project$Common_syntax$Atom('1a')),
			_1: {
				ctor: '::',
				_0: A2(
					_user$project$Common_syntax$know,
					'b',
					_user$project$Common_syntax$Atom('2a')),
				_1: {ctor: '[]'}
			}
		}
	});
var _user$project$PAL_semantics$announceHexa1 = _user$project$Common_syntax$Not(
	_user$project$Common_syntax$Atom('1a'));
var _user$project$PAL_semantics$hexamodel0 = _elm_lang$core$Result$Ok(_user$project$EModel$hexaModel);
var _user$project$PAL_semantics$announceMuddy3 = _user$project$Common_syntax$bigAnd(
	{
		ctor: '::',
		_0: A2(
			_user$project$Common_syntax$knowNeither,
			'a',
			_user$project$Common_syntax$Atom('0a')),
		_1: {
			ctor: '::',
			_0: A2(
				_user$project$Common_syntax$knowEither,
				'b',
				_user$project$Common_syntax$Atom('0b')),
			_1: {
				ctor: '::',
				_0: A2(
					_user$project$Common_syntax$knowEither,
					'c',
					_user$project$Common_syntax$Atom('0c')),
				_1: {ctor: '[]'}
			}
		}
	});
var _user$project$PAL_semantics$announceMuddy2 = _user$project$Common_syntax$bigAnd(
	{
		ctor: '::',
		_0: A2(
			_user$project$Common_syntax$knowNeither,
			'a',
			_user$project$Common_syntax$Atom('0a')),
		_1: {
			ctor: '::',
			_0: A2(
				_user$project$Common_syntax$knowNeither,
				'b',
				_user$project$Common_syntax$Atom('0b')),
			_1: {
				ctor: '::',
				_0: A2(
					_user$project$Common_syntax$knowNeither,
					'c',
					_user$project$Common_syntax$Atom('0c')),
				_1: {ctor: '[]'}
			}
		}
	});
var _user$project$PAL_semantics$announceMuddy1 = _user$project$Common_syntax$bigOr(
	{
		ctor: '::',
		_0: _user$project$Common_syntax$Atom('0a'),
		_1: {
			ctor: '::',
			_0: _user$project$Common_syntax$Atom('0b'),
			_1: {
				ctor: '::',
				_0: _user$project$Common_syntax$Atom('0c'),
				_1: {ctor: '[]'}
			}
		}
	});
var _user$project$PAL_semantics$knowEither4muddy = function (x) {
	return A2(
		_user$project$Common_syntax$knowEither,
		x,
		_user$project$Common_syntax$Atom(
			A2(_elm_lang$core$Basics_ops['++'], '0', x)));
};
var _user$project$PAL_semantics$knowNeither4muddy = function (ag) {
	return _user$project$Common_syntax$Not(
		_user$project$PAL_semantics$knowEither4muddy(ag));
};
var _user$project$PAL_semantics$muddymodel0 = _elm_lang$core$Result$Ok(_user$project$EModel$muddyModel);
var _user$project$PAL_semantics$formula2atoms = function (f) {
	var _p0 = f;
	switch (_p0.ctor) {
		case 'Top':
			return {
				ctor: '::',
				_0: _user$project$Common_syntax$Top,
				_1: {ctor: '[]'}
			};
		case 'Bot':
			return {
				ctor: '::',
				_0: _user$project$Common_syntax$Bot,
				_1: {ctor: '[]'}
			};
		case 'Atom':
			return {
				ctor: '::',
				_0: _user$project$Common_syntax$Atom(_p0._0),
				_1: {ctor: '[]'}
			};
		case 'AnyFormula':
			return {
				ctor: '::',
				_0: _user$project$Common_syntax$AnyFormula(_p0._0),
				_1: {ctor: '[]'}
			};
		case 'Not':
			return _user$project$Util$nub(
				_user$project$PAL_semantics$formula2atoms(_p0._0));
		case 'And':
			return _user$project$Util$nub(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$PAL_semantics$formula2atoms(_p0._0),
					_user$project$PAL_semantics$formula2atoms(_p0._1)));
		case 'Or':
			return _user$project$Util$nub(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$PAL_semantics$formula2atoms(_p0._0),
					_user$project$PAL_semantics$formula2atoms(_p0._1)));
		case 'Imply':
			return _user$project$Util$nub(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$PAL_semantics$formula2atoms(_p0._0),
					_user$project$PAL_semantics$formula2atoms(_p0._1)));
		case 'Imply2':
			return _user$project$Util$nub(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$PAL_semantics$formula2atoms(_p0._0),
					_user$project$PAL_semantics$formula2atoms(_p0._1)));
		case 'Iff':
			return _user$project$Util$nub(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$PAL_semantics$formula2atoms(_p0._0),
					_user$project$PAL_semantics$formula2atoms(_p0._1)));
		case 'Box':
			return _user$project$Util$nub(
				_user$project$PAL_semantics$formula2atoms(_p0._1));
		case 'Dia':
			return _user$project$Util$nub(
				_user$project$PAL_semantics$formula2atoms(_p0._1));
		case 'Announce':
			return _user$project$Util$nub(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$PAL_semantics$formula2atoms(_p0._0),
					_user$project$PAL_semantics$formula2atoms(_p0._1)));
		case 'Announce2':
			return _user$project$Util$nub(
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$PAL_semantics$formula2atoms(_p0._0),
					_user$project$PAL_semantics$formula2atoms(_p0._1)));
		default:
			return _elm_lang$core$Native_Utils.crashCase(
				'PAL_semantics',
				{
					start: {line: 116, column: 19},
					end: {line: 131, column: 48}
				},
				_p0)('undefined in valueF of PAL');
	}
};
var _user$project$PAL_semantics$atom2string = function (atm) {
	var _p2 = atm;
	switch (_p2.ctor) {
		case 'Top':
			return 'top';
		case 'Bot':
			return 'bot';
		case 'Atom':
			return _p2._0;
		case 'AnyFormula':
			return _p2._0;
		default:
			return 'parse error';
	}
};
var _user$project$PAL_semantics$truFalse2string = function (a) {
	var _p3 = a;
	if (_p3.ctor === 'Ok') {
		if (_p3._0 === true) {
			return 'true';
		} else {
			return 'false';
		}
	} else {
		return _p3._0;
	}
};
var _user$project$PAL_semantics$valueF = F3(
	function (mo, w, f) {
		valueF:
		while (true) {
			if (!A2(_elm_lang$core$List$member, w, mo.em_domain)) {
				return _elm_lang$core$Result$Err(
					A2(
						_elm_lang$core$Basics_ops['++'],
						w,
						A2(_elm_lang$core$Basics_ops['++'], ' is not a member of the domain of ', mo.em_name)));
			} else {
				var _p4 = f;
				switch (_p4.ctor) {
					case 'Top':
						return _elm_lang$core$Result$Ok(true);
					case 'Bot':
						return _elm_lang$core$Result$Ok(false);
					case 'Atom':
						return _elm_lang$core$Result$Ok(
							A2(
								_elm_lang$core$List$member,
								w,
								A2(_user$project$Util$lookVal, _p4._0, mo.em_value)));
					case 'AnyFormula':
						return _elm_lang$core$Result$Err(
							A2(_elm_lang$core$Basics_ops['++'], 'not allowed to include any formula ', _p4._0));
					case 'Not':
						return A2(
							_elm_lang$core$Result$map,
							_elm_lang$core$Basics$not,
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._0));
					case 'And':
						return A3(
							_elm_lang$core$Result$map2,
							F2(
								function (x, y) {
									return x && y;
								}),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._0),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._1));
					case 'Or':
						return A3(
							_elm_lang$core$Result$map2,
							F2(
								function (x, y) {
									return x || y;
								}),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._0),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._1));
					case 'Imply':
						return A3(
							_elm_lang$core$Result$map2,
							F2(
								function (x, y) {
									return A2(_user$project$Util_ops['==>'], x, y);
								}),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._0),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._1));
					case 'Imply2':
						return A3(
							_elm_lang$core$Result$map2,
							F2(
								function (x, y) {
									return A2(_user$project$Util_ops['==>'], x, y);
								}),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._1),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._0));
					case 'Iff':
						return A3(
							_elm_lang$core$Result$map2,
							F2(
								function (x, y) {
									return _elm_lang$core$Native_Utils.eq(x, y);
								}),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._1),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p4._0));
					case 'Box':
						return A2(
							_user$project$Util$forallResult,
							mo.em_domain,
							function (z) {
								return A3(
									_elm_lang$core$Result$map2,
									F2(
										function (x, y) {
											return A2(_user$project$Util_ops['==>'], x, y);
										}),
									_elm_lang$core$Result$Ok(
										A2(
											_elm_lang$core$List$member,
											{ctor: '_Tuple2', _0: w, _1: z},
											A2(_user$project$Util$lookRel, _p4._0, mo.em_relation))),
									A3(_user$project$PAL_semantics$valueF, mo, z, _p4._1));
							});
					case 'Dia':
						return A2(
							_user$project$Util$existsResult,
							mo.em_domain,
							function (z) {
								return A3(
									_elm_lang$core$Result$map2,
									F2(
										function (x, y) {
											return x && y;
										}),
									_elm_lang$core$Result$Ok(
										A2(
											_elm_lang$core$List$member,
											{ctor: '_Tuple2', _0: w, _1: z},
											A2(_user$project$Util$lookRel, _p4._0, mo.em_relation))),
									A3(_user$project$PAL_semantics$valueF, mo, z, _p4._1));
							});
					case 'Announce':
						var _p5 = _p4._0;
						return A3(
							_elm_lang$core$Result$map2,
							F2(
								function (x, y) {
									return A2(_user$project$Util_ops['==>'], x, y);
								}),
							A3(_user$project$PAL_semantics$valueF, mo, w, _p5),
							A2(
								_user$project$Util_ops['@>>='],
								A2(_user$project$PAL_semantics$modifyEModel, mo, _p5),
								function (km) {
									return A3(_user$project$PAL_semantics$valueF, km, w, _p4._1);
								}));
					case 'Announce2':
						var _v4 = mo,
							_v5 = w,
							_v6 = _user$project$Common_syntax$Not(
							A2(
								_user$project$Common_syntax$Announce,
								_p4._0,
								_user$project$Common_syntax$Not(_p4._1)));
						mo = _v4;
						w = _v5;
						f = _v6;
						continue valueF;
					default:
						return _elm_lang$core$Result$Err('undefined in valueF of PAL');
				}
			}
		}
	});
var _user$project$PAL_semantics$modifyEModel = F2(
	function (mo, f) {
		var mtrueR = A2(_user$project$PAL_semantics$trueEMRelation, mo, f);
		var mtrueW = A2(_user$project$PAL_semantics$trueWorld, mo, f);
		return A3(
			_elm_lang$core$Result$map2,
			F2(
				function (x, y) {
					return {
						em_name: A2(
							_elm_lang$core$Basics_ops['++'],
							mo.em_name,
							A2(
								_elm_lang$core$Basics_ops['++'],
								',',
								A2(_user$project$Common_syntax$outputForm, 0, f))),
						em_domain: x,
						em_relation: y,
						em_value: mo.em_value
					};
				}),
			mtrueW,
			mtrueR);
	});
var _user$project$PAL_semantics$trueEMRelation = F2(
	function (mo, f) {
		var _p6 = A2(_user$project$PAL_semantics$trueWorld, mo, f);
		if (_p6.ctor === 'Err') {
			return _elm_lang$core$Result$Err(_p6._0);
		} else {
			var _p12 = _p6._0;
			var gg = function (_p7) {
				var _p8 = _p7;
				var _p11 = _p8._2;
				var _p10 = _p8._1;
				var _p9 = _p8._0;
				return (A2(
					_elm_lang$core$List$member,
					{ctor: '_Tuple3', _0: _p9, _1: _p10, _2: _p11},
					mo.em_relation) && (A2(_elm_lang$core$List$member, _p10, _p12) && A2(_elm_lang$core$List$member, _p11, _p12))) ? {
					ctor: '::',
					_0: {ctor: '_Tuple3', _0: _p9, _1: _p10, _2: _p11},
					_1: {ctor: '[]'}
				} : {ctor: '[]'};
			};
			return _elm_lang$core$Result$Ok(
				A2(_elm_lang$core$List$concatMap, gg, mo.em_relation));
		}
	});
var _user$project$PAL_semantics$trueWorld = F2(
	function (mo, f) {
		return A2(
			_user$project$Util$filterR,
			function (w) {
				return A3(_user$project$PAL_semantics$valueF, mo, w, f);
			},
			mo.em_domain);
	});
var _user$project$PAL_semantics$validInModel = F2(
	function (mo, f) {
		return A2(
			_user$project$Util$forallResult,
			mo.em_domain,
			function (x) {
				return A3(_user$project$PAL_semantics$valueF, mo, x, f);
			});
	});
var _user$project$PAL_semantics$muddymodel1 = A2(
	_user$project$Util_ops['@>>='],
	_user$project$PAL_semantics$muddymodel0,
	function (em) {
		return A2(_user$project$PAL_semantics$modifyEModel, em, _user$project$PAL_semantics$announceMuddy1);
	});
var _user$project$PAL_semantics$muddymodel2 = A2(
	_user$project$Util_ops['@>>='],
	_user$project$PAL_semantics$muddymodel1,
	function (em) {
		return A2(_user$project$PAL_semantics$modifyEModel, em, _user$project$PAL_semantics$announceMuddy2);
	});
var _user$project$PAL_semantics$muddymodel3 = A2(
	_user$project$Util_ops['@>>='],
	_user$project$PAL_semantics$muddymodel2,
	function (em) {
		return A2(_user$project$PAL_semantics$modifyEModel, em, _user$project$PAL_semantics$announceMuddy3);
	});
var _user$project$PAL_semantics$hexamodel1 = A2(
	_user$project$Util_ops['@>>='],
	_user$project$PAL_semantics$hexamodel0,
	function (x) {
		return A2(_user$project$PAL_semantics$modifyEModel, x, _user$project$PAL_semantics$announceHexa1);
	});
var _user$project$PAL_semantics$hexamodel2 = A2(
	_user$project$Util_ops['@>>='],
	_user$project$PAL_semantics$hexamodel1,
	function (x) {
		return A2(_user$project$PAL_semantics$modifyEModel, x, _user$project$PAL_semantics$announceHexa2);
	});
var _user$project$PAL_semantics$hexamodel3 = A2(
	_user$project$Util_ops['@>>='],
	_user$project$PAL_semantics$hexamodel2,
	function (x) {
		return A2(_user$project$PAL_semantics$modifyEModel, x, _user$project$PAL_semantics$announceHexa3);
	});
var _user$project$PAL_semantics$checkEachAtoms = F3(
	function (em, w, f) {
		var hoge = function (a) {
			return _elm_lang$core$Native_Utils.eq(w, 'any') ? A2(_user$project$PAL_semantics$validInModel, em, a) : A3(_user$project$PAL_semantics$valueF, em, w, a);
		};
		var ff = function (a) {
			var _p13 = hoge(a);
			if (_p13.ctor === 'Ok') {
				return {
					atom: _user$project$PAL_semantics$atom2string(a),
					maybeBool: _user$project$PAL_semantics$truFalse2string(
						_elm_lang$core$Result$Ok(_p13._0))
				};
			} else {
				return {
					atom: _user$project$PAL_semantics$atom2string(a),
					maybeBool: _p13._0
				};
			}
		};
		return A2(
			_elm_lang$core$List$map,
			ff,
			_user$project$PAL_semantics$formula2atoms(f));
	});

var _user$project$Parser_Formula$jsonRel2AMRelation = function (x) {
	return {ctor: '_Tuple3', _0: x.agent, _1: x.from, _2: x.to};
};
var _user$project$Parser_Formula$parseFormatError = F2(
	function (ms, stream) {
		var expectationSeparator = '\n  * ';
		var separator = '| ';
		var separatorOffset = _elm_lang$core$String$length(separator);
		var location = _elm_community$parser_combinators$Combine$currentLocation(stream);
		var lineNumberOffset = _elm_lang$core$Basics$floor(
			A2(
				_elm_lang$core$Basics$logBase,
				10,
				_elm_lang$core$Basics$toFloat(location.line))) + 1;
		var padding = (location.column + separatorOffset) + 2;
		return A2(
			_elm_lang$core$Basics_ops['++'],
			'Parse error around line:\n\n',
			A2(
				_elm_lang$core$Basics_ops['++'],
				_elm_lang$core$Basics$toString(location.line),
				A2(
					_elm_lang$core$Basics_ops['++'],
					separator,
					A2(
						_elm_lang$core$Basics_ops['++'],
						location.source,
						A2(
							_elm_lang$core$Basics_ops['++'],
							'\n',
							A2(
								_elm_lang$core$Basics_ops['++'],
								A3(
									_elm_lang$core$String$padLeft,
									padding,
									_elm_lang$core$Native_Utils.chr(' '),
									'^'),
								A2(
									_elm_lang$core$Basics_ops['++'],
									'\nI expected one of the following:\n',
									A2(
										_elm_lang$core$Basics_ops['++'],
										expectationSeparator,
										A2(_elm_lang$core$String$join, expectationSeparator, ms)))))))));
	});
var _user$project$Parser_Formula$identifier_state_var = _elm_community$parser_combinators$Combine$lazy(
	function (_p0) {
		var _p1 = _p0;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<?>'],
			_elm_community$parser_combinators$Combine$regex('[x-z0-9]+'),
			'identifier_state');
	});
var _user$project$Parser_Formula$identifier_state = _elm_community$parser_combinators$Combine$lazy(
	function (_p2) {
		var _p3 = _p2;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<?>'],
			_elm_community$parser_combinators$Combine$regex('[e-g0-9]+'),
			'identifier_state');
	});
var _user$project$Parser_Formula$identifier_AModel = _elm_community$parser_combinators$Combine$lazy(
	function (_p4) {
		var _p5 = _p4;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			function (x) {
				return {
					am_name: x,
					am_domain: {ctor: '[]'},
					am_relation: {ctor: '[]'},
					am_pre: {ctor: '[]'}
				};
			},
			A2(
				_elm_community$parser_combinators$Combine_ops['<?>'],
				_elm_community$parser_combinators$Combine$regex('[A-Za-z0-9]+'),
				'identifier_AModel'));
	});
var _user$project$Parser_Formula$mixAM2AM = function (st) {
	var ff = function (x) {
		var _p6 = x;
		if (_p6.ctor === 'AModelAt') {
			return _p6._0;
		} else {
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					ff(_p6._0),
					A2(
						_elm_lang$core$Basics_ops['++'],
						';',
						A2(
							_elm_lang$core$Basics_ops['++'],
							ff(_p6._1),
							')'))));
		}
	};
	return {
		am_name: ff(st),
		am_domain: {ctor: '[]'},
		am_relation: {ctor: '[]'},
		am_pre: {ctor: '[]'}
	};
};
var _user$project$Parser_Formula$mixState2state = function (st) {
	var _p7 = st;
	switch (_p7.ctor) {
		case 'StateAt':
			return _p7._0;
		case 'StateVar':
			return _p7._0;
		default:
			return A2(
				_elm_lang$core$Basics_ops['++'],
				'(',
				A2(
					_elm_lang$core$Basics_ops['++'],
					_user$project$Parser_Formula$mixState2state(_p7._0),
					A2(
						_elm_lang$core$Basics_ops['++'],
						',',
						A2(
							_elm_lang$core$Basics_ops['++'],
							_user$project$Parser_Formula$mixState2state(_p7._1),
							')'))));
	}
};
var _user$project$Parser_Formula$parseForm0_identifier_atom = A2(
	_elm_community$parser_combinators$Combine_ops['<$>'],
	_user$project$Common_syntax$Atom,
	A2(
		_elm_community$parser_combinators$Combine_ops['<?>'],
		_elm_community$parser_combinators$Combine$regex('[_p-r][_p-r0-9]*'),
		'parseForm0_identifier_atom'));
var _user$project$Parser_Formula$parseForm0_identifier_formula = _elm_community$parser_combinators$Combine$lazy(
	function (_p8) {
		var _p9 = _p8;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_user$project$Common_syntax$AnyFormula,
			A2(
				_elm_community$parser_combinators$Combine_ops['<?>'],
				_elm_community$parser_combinators$Combine$regex('[_A-D][_A-D0-9]*'),
				'parseForm0_identifier_formula'));
	});
var _user$project$Parser_Formula$parseAgent_identifire_agent = _elm_community$parser_combinators$Combine$lazy(
	function (_p10) {
		var _p11 = _p10;
		var name = _elm_community$parser_combinators$Combine$regex('[a-e][a0-9]*');
		return A2(_elm_community$parser_combinators$Combine_ops['<?>'], name, 'agent');
	});
var _user$project$Parser_Formula$parseForm0_boolForm = _elm_community$parser_combinators$Combine$lazy(
	function (_p12) {
		var _p13 = _p12;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<?>'],
			_elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: A2(
						_elm_community$parser_combinators$Combine_ops['<$'],
						_user$project$Common_syntax$Top,
						_elm_community$parser_combinators$Combine$string('top')),
					_1: {
						ctor: '::',
						_0: A2(
							_elm_community$parser_combinators$Combine_ops['<$'],
							_user$project$Common_syntax$Bot,
							_elm_community$parser_combinators$Combine$string('bot')),
						_1: {ctor: '[]'}
					}
				}),
			'parseForm0_boolForm');
	});
var _user$project$Parser_Formula$parse_pair_states = _elm_community$parser_combinators$Combine$lazy(
	function (_p14) {
		var _p15 = _p14;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				F2(
					function (a, _p16) {
						var _p17 = _p16;
						return {ctor: '_Tuple3', _0: a, _1: _p17._0, _2: _p17._1};
					}),
				_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$parseAgent_identifire_agent)),
			_elm_community$parser_combinators$Combine$parens(
				A2(
					_elm_community$parser_combinators$Combine_ops['<*>'],
					A2(
						_elm_community$parser_combinators$Combine_ops['<*'],
						A2(
							_elm_community$parser_combinators$Combine_ops['<$>'],
							F2(
								function (x, y) {
									return {ctor: '_Tuple2', _0: x, _1: y};
								}),
							_user$project$Parser_Formula$identifier_state),
						_elm_community$parser_combinators$Combine$string(',')),
					_user$project$Parser_Formula$identifier_state_var)));
	});
var _user$project$Parser_Formula$parseAModel_amodel_p = _elm_community$parser_combinators$Combine$lazy(
	function (_p18) {
		var _p19 = _p18;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				F2(
					function (e, a) {
						return {ctor: '_Tuple2', _0: e, _1: a};
					}),
				A2(
					_elm_community$parser_combinators$Combine_ops['*>'],
					_elm_community$parser_combinators$Combine$string('Rel'),
					_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$identifier_AModel))),
			_user$project$Parser_Formula$parse_pair_states);
	});
var _user$project$Parser_Formula$AModelJSON = F5(
	function (a, b, c, d, e) {
		return {name: a, domain: b, relation: c, precondition: d, comment: e};
	});
var _user$project$Parser_Formula$AModelJSON_rel = F3(
	function (a, b, c) {
		return {agent: a, from: b, to: c};
	});
var _user$project$Parser_Formula$AModelJSON_pre = F2(
	function (a, b) {
		return {from: a, to: b};
	});
var _user$project$Parser_Formula$MixState = F2(
	function (a, b) {
		return {ctor: 'MixState', _0: a, _1: b};
	});
var _user$project$Parser_Formula$StateVar = function (a) {
	return {ctor: 'StateVar', _0: a};
};
var _user$project$Parser_Formula$identifier_State2 = _elm_community$parser_combinators$Combine$lazy(
	function (_p20) {
		var _p21 = _p20;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			function (x) {
				return _user$project$Parser_Formula$StateVar(x);
			},
			A2(
				_elm_community$parser_combinators$Combine_ops['<?>'],
				_elm_community$parser_combinators$Combine$regex('[x-z0-9]+'),
				'identifier_Stete2'));
	});
var _user$project$Parser_Formula$StateAt = function (a) {
	return {ctor: 'StateAt', _0: a};
};
var _user$project$Parser_Formula$identifier_State1 = _elm_community$parser_combinators$Combine$lazy(
	function (_p22) {
		var _p23 = _p22;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			function (x) {
				return _user$project$Parser_Formula$StateAt(x);
			},
			A2(
				_elm_community$parser_combinators$Combine_ops['<?>'],
				_elm_community$parser_combinators$Combine$regex('[e-gx-z0-9]+'),
				'identifier_State1'));
	});
var _user$project$Parser_Formula$parseStateSelect = _elm_community$parser_combinators$Combine$lazy(
	function (_p24) {
		var _p25 = _p24;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$parseState),
			_user$project$Parser_Formula$identifier_State1);
	});
var _user$project$Parser_Formula$parseState = _elm_community$parser_combinators$Combine$lazy(
	function (_p26) {
		var _p27 = _p26;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Parser_Formula$MixState,
			_elm_community$parser_combinators$Combine$string(','));
		return A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseStateSelect);
	});
var _user$project$Parser_Formula$MixAModel = F2(
	function (a, b) {
		return {ctor: 'MixAModel', _0: a, _1: b};
	});
var _user$project$Parser_Formula$AModelAt = function (a) {
	return {ctor: 'AModelAt', _0: a};
};
var _user$project$Parser_Formula$identifier_AModel1 = _elm_community$parser_combinators$Combine$lazy(
	function (_p28) {
		var _p29 = _p28;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_user$project$Parser_Formula$AModelAt,
			A2(
				_elm_community$parser_combinators$Combine_ops['<?>'],
				_elm_community$parser_combinators$Combine$regex('[A-Za-z0-9]+'),
				'identifier_AModel1'));
	});
var _user$project$Parser_Formula$parseAModelSelect = _elm_community$parser_combinators$Combine$lazy(
	function (_p30) {
		var _p31 = _p30;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$parseAModel2),
			_user$project$Parser_Formula$identifier_AModel1);
	});
var _user$project$Parser_Formula$parseAModel2 = _elm_community$parser_combinators$Combine$lazy(
	function (_p32) {
		var _p33 = _p32;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Parser_Formula$MixAModel,
			_elm_community$parser_combinators$Combine$string(';'));
		return A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseAModelSelect);
	});
var _user$project$Parser_Formula$test21 = A2(_elm_community$parser_combinators$Combine$parse, _user$project$Parser_Formula$parseAModel2, '(((E1;E2);E3))');
var _user$project$Parser_Formula$parseAction1_identifier_actionModel = _elm_community$parser_combinators$Combine$lazy(
	function (_p34) {
		var _p35 = _p34;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<*'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					_user$project$Common_syntax$PointAModel,
					A2(_elm_community$parser_combinators$Combine_ops['<$>'], _user$project$Parser_Formula$mixAM2AM, _user$project$Parser_Formula$parseAModel2)),
				_elm_community$parser_combinators$Combine$string(',')),
			A2(
				_elm_community$parser_combinators$Combine_ops['<?>'],
				A2(_elm_community$parser_combinators$Combine_ops['<$>'], _user$project$Parser_Formula$mixState2state, _user$project$Parser_Formula$parseState),
				'parseAction1_identifier_actionModel'));
	});
var _user$project$Parser_Formula$parseAction2_anyAction = _elm_community$parser_combinators$Combine$lazy(
	function (_p36) {
		var _p37 = _p36;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<?>'],
			_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$parseAction1_identifier_actionModel),
			'parseAction2_anyAction_p');
	});
var _user$project$Parser_Formula$parseAction3_composition = _elm_community$parser_combinators$Combine$lazy(
	function (_p38) {
		var _p39 = _p38;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Common_syntax$ComposePoAM,
			_elm_community$parser_combinators$Combine$string(';'));
		return A2(
			_elm_community$parser_combinators$Combine_ops['<?>'],
			A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseAction2_anyAction),
			'parseAction4_cup');
	});
var _user$project$Parser_Formula$parseAction4_cup = _elm_community$parser_combinators$Combine$lazy(
	function (_p40) {
		var _p41 = _p40;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Common_syntax$Cup,
			_elm_community$parser_combinators$Combine$string('U'));
		return A2(
			_elm_community$parser_combinators$Combine_ops['<?>'],
			A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseAction3_composition),
			'parseAction4_cup');
	});
var _user$project$Parser_Formula$parseForm0_identifier_precon = _elm_community$parser_combinators$Combine$lazy(
	function (_p42) {
		var _p43 = _p42;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$'],
					_user$project$Common_syntax$Precon,
					_elm_community$parser_combinators$Combine$string('Pre')),
				A2(_elm_community$parser_combinators$Combine_ops['<$>'], _user$project$Parser_Formula$mixAM2AM, _user$project$Parser_Formula$parseAModel2)),
			A2(
				_elm_community$parser_combinators$Combine_ops['<?>'],
				A2(_elm_community$parser_combinators$Combine_ops['<$>'], _user$project$Parser_Formula$mixState2state, _user$project$Parser_Formula$parseState),
				'parseForm0_identifier_atom'));
	});
var _user$project$Parser_Formula$parseForm_atom = _elm_community$parser_combinators$Combine$lazy(
	function (_p44) {
		var _p45 = _p44;
		return _elm_community$parser_combinators$Combine$choice(
			{
				ctor: '::',
				_0: _user$project$Parser_Formula$parseForm0_boolForm,
				_1: {
					ctor: '::',
					_0: _user$project$Parser_Formula$parseForm10_bigWedgep,
					_1: {
						ctor: '::',
						_0: _user$project$Parser_Formula$parseForm10_bigVee,
						_1: {
							ctor: '::',
							_0: _user$project$Parser_Formula$parseForm8_announce_p,
							_1: {
								ctor: '::',
								_0: _user$project$Parser_Formula$parseForm9_announce2_p,
								_1: {
									ctor: '::',
									_0: _user$project$Parser_Formula$parseForm11_action_p,
									_1: {
										ctor: '::',
										_0: _user$project$Parser_Formula$parseForm0_identifier_precon,
										_1: {
											ctor: '::',
											_0: _user$project$Parser_Formula$parseForm0_identifier_formula,
											_1: {
												ctor: '::',
												_0: _user$project$Parser_Formula$parseForm0_identifier_atom,
												_1: {ctor: '[]'}
											}
										}
									}
								}
							}
						}
					}
				}
			});
	});
var _user$project$Parser_Formula$parseForm10_bigVee = _elm_community$parser_combinators$Combine$lazy(
	function (_p46) {
		var _p47 = _p46;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$'],
					F2(
						function (mo, f) {
							return A3(
								_user$project$Common_syntax$Bigwedge,
								{ctor: '[]'},
								mo,
								f);
						}),
					_elm_community$parser_combinators$Combine$string('vv')),
				_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$parseAModel_amodel_p)),
			_user$project$Parser_Formula$parseForm2_unary);
	});
var _user$project$Parser_Formula$parseForm2_unary = _elm_community$parser_combinators$Combine$lazy(
	function (_p48) {
		var _p49 = _p48;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			_elm_community$parser_combinators$Combine$choice(
				{
					ctor: '::',
					_0: _user$project$Parser_Formula$knowp,
					_1: {
						ctor: '::',
						_0: _user$project$Parser_Formula$knowifp,
						_1: {
							ctor: '::',
							_0: _user$project$Parser_Formula$boxp,
							_1: {
								ctor: '::',
								_0: _user$project$Parser_Formula$diap,
								_1: {
									ctor: '::',
									_0: _user$project$Parser_Formula$notp,
									_1: {ctor: '[]'}
								}
							}
						}
					}
				}),
			_user$project$Parser_Formula$parseForm1_term);
	});
var _user$project$Parser_Formula$boxp = _elm_community$parser_combinators$Combine$lazy(
	function (_p50) {
		var _p51 = _p50;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$'],
					_user$project$Common_syntax$Box,
					_elm_community$parser_combinators$Combine$string('#')),
				_user$project$Parser_Formula$parseAgent_identifire_agent),
			_user$project$Parser_Formula$parseForm2_unary);
	});
var _user$project$Parser_Formula$diap = _elm_community$parser_combinators$Combine$lazy(
	function (_p52) {
		var _p53 = _p52;
		var unaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			F2(
				function (x, y) {
					return A2(_user$project$Common_syntax$Dia, x, y);
				}),
			_elm_community$parser_combinators$Combine$string('$'));
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(_elm_community$parser_combinators$Combine_ops['<*>'], unaryOp, _user$project$Parser_Formula$parseAgent_identifire_agent),
			_user$project$Parser_Formula$parseForm2_unary);
	});
var _user$project$Parser_Formula$knowifp = _elm_community$parser_combinators$Combine$lazy(
	function (_p54) {
		var _p55 = _p54;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$'],
				function (_p56) {
					var _p57 = _p56;
					var _p59 = _p57._1;
					var _p58 = _p57._0;
					return A2(
						_user$project$Common_syntax$Or,
						A2(_user$project$Common_syntax$Box, _p58, _p59),
						A2(
							_user$project$Common_syntax$Box,
							_p58,
							_user$project$Common_syntax$Not(_p59)));
				},
				_elm_community$parser_combinators$Combine$string('knows_if')),
			_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$knowp2));
	});
var _user$project$Parser_Formula$knowp2 = _elm_community$parser_combinators$Combine$lazy(
	function (_p60) {
		var _p61 = _p60;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<*'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$>'],
					F2(
						function (x, y) {
							return {ctor: '_Tuple2', _0: x, _1: y};
						}),
					_user$project$Parser_Formula$parseAgent_identifire_agent),
				_elm_community$parser_combinators$Combine$string(',')),
			_user$project$Parser_Formula$parseForm2_unary);
	});
var _user$project$Parser_Formula$knowp = _elm_community$parser_combinators$Combine$lazy(
	function (_p62) {
		var _p63 = _p62;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$'],
				function (_p64) {
					var _p65 = _p64;
					return A2(_user$project$Common_syntax$Box, _p65._0, _p65._1);
				},
				_elm_community$parser_combinators$Combine$string('knows')),
			_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$knowp2));
	});
var _user$project$Parser_Formula$notp = _elm_community$parser_combinators$Combine$lazy(
	function (_p66) {
		var _p67 = _p66;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<$>'],
			_user$project$Common_syntax$Not,
			A2(
				_elm_community$parser_combinators$Combine_ops['*>'],
				_elm_community$parser_combinators$Combine$string('~'),
				_user$project$Parser_Formula$parseForm2_unary));
	});
var _user$project$Parser_Formula$parseForm1_term = _elm_community$parser_combinators$Combine$lazy(
	function (_p68) {
		var _p69 = _p68;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<|>'],
			_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$parseForm7_expr),
			_user$project$Parser_Formula$parseForm_atom);
	});
var _user$project$Parser_Formula$parseForm7_expr = _elm_community$parser_combinators$Combine$lazy(
	function (_p70) {
		var _p71 = _p70;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Common_syntax$Iff,
			_elm_community$parser_combinators$Combine$string('<->'));
		return _elm_community$parser_combinators$Combine$lazy(
			function (_p72) {
				var _p73 = _p72;
				return A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseForm6_impl2);
			});
	});
var _user$project$Parser_Formula$parseForm6_impl2 = _elm_community$parser_combinators$Combine$lazy(
	function (_p74) {
		var _p75 = _p74;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Common_syntax$Imply2,
			_elm_community$parser_combinators$Combine$string('<-'));
		return _elm_community$parser_combinators$Combine$lazy(
			function (_p76) {
				var _p77 = _p76;
				return A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseForm5_impl);
			});
	});
var _user$project$Parser_Formula$parseForm5_impl = _elm_community$parser_combinators$Combine$lazy(
	function (_p78) {
		var _p79 = _p78;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Common_syntax$Imply,
			_elm_community$parser_combinators$Combine$string('->'));
		return _elm_community$parser_combinators$Combine$lazy(
			function (_p80) {
				var _p81 = _p80;
				return A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseForm4_or);
			});
	});
var _user$project$Parser_Formula$parseForm4_or = _elm_community$parser_combinators$Combine$lazy(
	function (_p82) {
		var _p83 = _p82;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Common_syntax$Or,
			_elm_community$parser_combinators$Combine$string('v'));
		return _elm_community$parser_combinators$Combine$lazy(
			function (_p84) {
				var _p85 = _p84;
				return A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseForm3_and);
			});
	});
var _user$project$Parser_Formula$parseForm3_and = _elm_community$parser_combinators$Combine$lazy(
	function (_p86) {
		var _p87 = _p86;
		var binaryOp = A2(
			_elm_community$parser_combinators$Combine_ops['<$'],
			_user$project$Common_syntax$And,
			_elm_community$parser_combinators$Combine$string('&'));
		return _elm_community$parser_combinators$Combine$lazy(
			function (_p88) {
				var _p89 = _p88;
				return A2(_elm_community$parser_combinators$Combine$chainl, binaryOp, _user$project$Parser_Formula$parseForm2_unary);
			});
	});
var _user$project$Parser_Formula$parseForm10_bigWedgep = _elm_community$parser_combinators$Combine$lazy(
	function (_p90) {
		var _p91 = _p90;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<*>'],
				A2(
					_elm_community$parser_combinators$Combine_ops['<$'],
					F2(
						function (mo, f) {
							return A3(
								_user$project$Common_syntax$Bigwedge,
								{ctor: '[]'},
								mo,
								f);
						}),
					_elm_community$parser_combinators$Combine$string('&&')),
				_elm_community$parser_combinators$Combine$parens(_user$project$Parser_Formula$parseAModel_amodel_p)),
			_user$project$Parser_Formula$parseForm2_unary);
	});
var _user$project$Parser_Formula$parseForm11_action_p = _elm_community$parser_combinators$Combine$lazy(
	function (_p92) {
		var _p93 = _p92;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_user$project$Common_syntax$BoxAction,
				_elm_community$parser_combinators$Combine$brackets(_user$project$Parser_Formula$parseAction4_cup)),
			A2(_elm_community$parser_combinators$Combine_ops['<?>'], _user$project$Parser_Formula$parseForm2_unary, 'parseForm11_action_p'));
	});
var _user$project$Parser_Formula$parseForm8_announce_p = _elm_community$parser_combinators$Combine$lazy(
	function (_p94) {
		var _p95 = _p94;
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_user$project$Common_syntax$Announce,
				_elm_community$parser_combinators$Combine$brackets(_user$project$Parser_Formula$parseForm7_expr)),
			A2(_elm_community$parser_combinators$Combine_ops['<?>'], _user$project$Parser_Formula$parseForm2_unary, 'parseForm8_announce_p'));
	});
var _user$project$Parser_Formula$parseForm9_announce2_p = _elm_community$parser_combinators$Combine$lazy(
	function (_p96) {
		var _p97 = _p96;
		var brackets2 = A2(
			_elm_community$parser_combinators$Combine$between,
			_elm_community$parser_combinators$Combine$string('<'),
			_elm_community$parser_combinators$Combine$string('>'));
		return A2(
			_elm_community$parser_combinators$Combine_ops['<*>'],
			A2(
				_elm_community$parser_combinators$Combine_ops['<$>'],
				_user$project$Common_syntax$Announce2,
				brackets2(_user$project$Parser_Formula$parseForm7_expr)),
			A2(_elm_community$parser_combinators$Combine_ops['<?>'], _user$project$Parser_Formula$parseForm2_unary, 'parseForm9_announce2_p'));
	});
var _user$project$Parser_Formula$programFormula = _elm_community$parser_combinators$Combine$lazy(
	function (_p98) {
		var _p99 = _p98;
		return A2(_elm_community$parser_combinators$Combine_ops['<?>'], _user$project$Parser_Formula$parseForm7_expr, 'error in parseForm7_expression');
	});
var _user$project$Parser_Formula$parseFormula2 = function (s) {
	var ss = _user$project$Util$removeWhiteSpaceFromString(s);
	return A2(
		_elm_community$parser_combinators$Combine$parse,
		A2(_elm_community$parser_combinators$Combine_ops['<*'], _user$project$Parser_Formula$programFormula, _elm_community$parser_combinators$Combine$end),
		ss);
};
var _user$project$Parser_Formula$test02 = _user$project$Parser_Formula$parseFormula2('&&(~(E)(a)(e,x))A');
var _user$project$Parser_Formula$test03 = _user$project$Parser_Formula$parseFormula2('&&(~(E)(a)(e,x))[(E,x)]A');
var _user$project$Parser_Formula$test04 = _user$project$Parser_Formula$parseFormula2('&&(~(E)(a)(e,x))#aA');
var _user$project$Parser_Formula$test05 = _user$project$Parser_Formula$parseFormula2('[(E,e)]A');
var _user$project$Parser_Formula$test06 = _user$project$Parser_Formula$parseFormula2('&&(~(E)(a)(e,x))#a[(E,e)]A');
var _user$project$Parser_Formula$test07 = _user$project$Parser_Formula$parseFormula2('&&(~(E)(a)(e,x))#a[(E,x1)]A');
var _user$project$Parser_Formula$test08 = _user$project$Parser_Formula$parseFormula2('[(E,e)]#aA <->(Pre(E)(e)->&&(~(E)(a)(e,x))#a[(E,x)]A)');
var _user$project$Parser_Formula$parseFormula = function (s) {
	var ss = _user$project$Util$removeWhiteSpaceFromString(s);
	var _p100 = A2(
		_elm_community$parser_combinators$Combine$parse,
		A2(_elm_community$parser_combinators$Combine_ops['<*'], _user$project$Parser_Formula$programFormula, _elm_community$parser_combinators$Combine$end),
		ss);
	if (_p100.ctor === 'Ok') {
		return _elm_lang$core$Result$Ok(_p100._0._2);
	} else {
		return _elm_lang$core$Result$Err(
			A2(_user$project$Parser_Formula$parseFormatError, _p100._0._2, _p100._0._1));
	}
};
var _user$project$Parser_Formula$test14 = _user$project$Parser_Formula$parseFormula('[((Skip;Skip),(e1,e1))]Pre(Skip)(e1)');
var _user$project$Parser_Formula$test15 = _user$project$Parser_Formula$parseFormula('[((Skip;Skip),(e1,e1))]top');
var _user$project$Parser_Formula$test11 = _user$project$Parser_Formula$parseFormula('Pre(((Skip;Ski);Crash))(((e2,e1),e3))');
var _user$project$Parser_Formula$test13 = _user$project$Parser_Formula$parseFormula('Pre((Crash;(Skip;Ski)))((e3,(e2,e1)))');
var _user$project$Parser_Formula$test12 = _user$project$Parser_Formula$parseFormula('Pre(Skip)(((e2,e1),e3))');
var _user$project$Parser_Formula$test80 = _user$project$Parser_Formula$parseFormula('Pre((Skip;Skip))((e2,e1))');
var _user$project$Parser_Formula$test91 = _user$project$Parser_Formula$parseFormula('Pre(Skip)(e1)');
var _user$project$Parser_Formula$test92 = _user$project$Parser_Formula$parseFormula('[(Skip,e1)]Pre(Skip)(e1)');
var _user$project$Parser_Formula$test0 = _user$project$Parser_Formula$parseFormula('[p1 & [q]p2]r');
var _user$project$Parser_Formula$test1 = _user$project$Parser_Formula$parseFormula('(A -> (B -> C)) -> ((A -> B)->(A -> C))');
var _user$project$Parser_Formula$test2 = _user$project$Parser_Formula$parseFormula('(p1 -> p9) v (p8 & ~top)');
var _user$project$Parser_Formula$test3 = _user$project$Parser_Formula$parseFormula('p1 & p9 -> (p8 <-> ~top)');
var _user$project$Parser_Formula$test4 = _user$project$Parser_Formula$parseFormula('#a~#a~#ap4');
var _user$project$Parser_Formula$test5 = _user$project$Parser_Formula$parseFormula('~#a1 (p1 v ~p4)');
var _user$project$Parser_Formula$test6 = _user$project$Parser_Formula$parseFormula('~#a~#b~ (p1 v ~p4)');
var _user$project$Parser_Formula$test7 = _user$project$Parser_Formula$parseFormula('[~#a<#ap5 v ~p8>p1]p2');
var _user$project$Parser_Formula$test8 = _user$project$Parser_Formula$parseFormula('#b8p');
var _user$project$Parser_Formula$test9 = _user$project$Parser_Formula$parseFormula('[(E,e)]p');
var _user$project$Parser_Formula$test10 = _user$project$Parser_Formula$parseFormula('[(E1,e1)U(E2,e2)]p');
var _user$project$Parser_Formula$testall = A2(
	_user$project$Util$forall,
	{
		ctor: '::',
		_0: _user$project$Parser_Formula$test2,
		_1: {
			ctor: '::',
			_0: _user$project$Parser_Formula$test3,
			_1: {
				ctor: '::',
				_0: _user$project$Parser_Formula$test4,
				_1: {
					ctor: '::',
					_0: _user$project$Parser_Formula$test5,
					_1: {
						ctor: '::',
						_0: _user$project$Parser_Formula$test6,
						_1: {
							ctor: '::',
							_0: _user$project$Parser_Formula$test7,
							_1: {
								ctor: '::',
								_0: _user$project$Parser_Formula$test8,
								_1: {
									ctor: '::',
									_0: _user$project$Parser_Formula$test9,
									_1: {
										ctor: '::',
										_0: _user$project$Parser_Formula$test10,
										_1: {
											ctor: '::',
											_0: _user$project$Parser_Formula$test11,
											_1: {
												ctor: '::',
												_0: _user$project$Parser_Formula$test12,
												_1: {
													ctor: '::',
													_0: _user$project$Parser_Formula$test91,
													_1: {
														ctor: '::',
														_0: _user$project$Parser_Formula$test92,
														_1: {
															ctor: '::',
															_0: _user$project$Parser_Formula$test80,
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
	},
	function (x) {
		var _p101 = x;
		if (_p101.ctor === 'Ok') {
			return true;
		} else {
			return false;
		}
	});
var _user$project$Parser_Formula$test111 = _user$project$Parser_Formula$parseFormula('knows(a,p)');
var _user$project$Parser_Formula$test112 = _user$project$Parser_Formula$parseFormula('knows_if(a,p)');
var _user$project$Parser_Formula$jsonPre2precondition = function (pre) {
	return function (x) {
		var _p102 = x;
		if (_p102.ctor === 'Ok') {
			return {ctor: '_Tuple2', _0: _p102._0._0, _1: _p102._0._1};
		} else {
			return _elm_lang$core$Native_Utils.crashCase(
				'Parser_Formula',
				{
					start: {line: 441, column: 38},
					end: {line: 443, column: 82}
				},
				_p102)('error in jsonPre2precondition');
		}
	}(
		A2(
			_user$project$Applicative_ops['@>'],
			_user$project$Parser_Formula$parseFormula(pre.to),
			function (x) {
				return {ctor: '_Tuple2', _0: pre.from, _1: x};
			}));
};
var _user$project$Parser_Formula$object2listOfActions = function (actionJSON) {
	return {
		am_name: actionJSON.name,
		am_domain: actionJSON.domain,
		am_relation: A2(_elm_lang$core$List$map, _user$project$Parser_Formula$jsonRel2AMRelation, actionJSON.relation),
		am_pre: A2(_elm_lang$core$List$map, _user$project$Parser_Formula$jsonPre2precondition, actionJSON.precondition)
	};
};

var _user$project$ElmFunctions_truthChecker$view = function (model) {
	return A2(
		_elm_lang$html$Html$div,
		{ctor: '[]'},
		{ctor: '[]'});
};
var _user$project$ElmFunctions_truthChecker$input1_truthCheck_PAL = _elm_lang$core$Native_Platform.incomingPort('input1_truthCheck_PAL', _elm_lang$core$Json_Decode$value);
var _user$project$ElmFunctions_truthChecker$input2_modifyKM_PAL = _elm_lang$core$Native_Platform.incomingPort('input2_modifyKM_PAL', _elm_lang$core$Json_Decode$value);
var _user$project$ElmFunctions_truthChecker$input3_modifyKM_DEL = _elm_lang$core$Native_Platform.incomingPort('input3_modifyKM_DEL', _elm_lang$core$Json_Decode$value);
var _user$project$ElmFunctions_truthChecker$output1_truthCheck_PAL = _elm_lang$core$Native_Platform.outgoingPort(
	'output1_truthCheck_PAL',
	function (v) {
		return {
			modelName: v.modelName,
			world: v.world,
			atomBool: _elm_lang$core$Native_List.toArray(v.atomBool).map(
				function (v) {
					return {atom: v.atom, maybeBool: v.maybeBool};
				}),
			formulaBool: {formula: v.formulaBool.formula, maybeBool: v.formulaBool.maybeBool},
			error: v.error,
			modifiedKM: _elm_lang$core$Native_List.toArray(v.modifiedKM).map(
				function (v) {
					return {
						name: v.name,
						domain: _elm_lang$core$Native_List.toArray(v.domain).map(
							function (v) {
								return v;
							}),
						relation: _elm_lang$core$Native_List.toArray(v.relation).map(
							function (v) {
								return {agent: v.agent, from: v.from, to: v.to};
							}),
						valuation: _elm_lang$core$Native_List.toArray(v.valuation).map(
							function (v) {
								return {
									prop: v.prop,
									worlds: _elm_lang$core$Native_List.toArray(v.worlds).map(
										function (v) {
											return v;
										})
								};
							}),
						comment: v.comment
					};
				})
		};
	});
var _user$project$ElmFunctions_truthChecker$output2_modifyKM_PAL = _elm_lang$core$Native_Platform.outgoingPort(
	'output2_modifyKM_PAL',
	function (v) {
		return {
			modelName: v.modelName,
			world: v.world,
			atomBool: _elm_lang$core$Native_List.toArray(v.atomBool).map(
				function (v) {
					return {atom: v.atom, maybeBool: v.maybeBool};
				}),
			formulaBool: {formula: v.formulaBool.formula, maybeBool: v.formulaBool.maybeBool},
			error: v.error,
			modifiedKM: _elm_lang$core$Native_List.toArray(v.modifiedKM).map(
				function (v) {
					return {
						name: v.name,
						domain: _elm_lang$core$Native_List.toArray(v.domain).map(
							function (v) {
								return v;
							}),
						relation: _elm_lang$core$Native_List.toArray(v.relation).map(
							function (v) {
								return {agent: v.agent, from: v.from, to: v.to};
							}),
						valuation: _elm_lang$core$Native_List.toArray(v.valuation).map(
							function (v) {
								return {
									prop: v.prop,
									worlds: _elm_lang$core$Native_List.toArray(v.worlds).map(
										function (v) {
											return v;
										})
								};
							}),
						comment: v.comment
					};
				})
		};
	});
var _user$project$ElmFunctions_truthChecker$output3_modifyKM_DEL = _elm_lang$core$Native_Platform.outgoingPort(
	'output3_modifyKM_DEL',
	function (v) {
		return {
			modelName: v.modelName,
			world: v.world,
			atomBool: _elm_lang$core$Native_List.toArray(v.atomBool).map(
				function (v) {
					return {atom: v.atom, maybeBool: v.maybeBool};
				}),
			formulaBool: {formula: v.formulaBool.formula, maybeBool: v.formulaBool.maybeBool},
			error: v.error,
			modifiedKM: _elm_lang$core$Native_List.toArray(v.modifiedKM).map(
				function (v) {
					return {
						name: v.name,
						domain: _elm_lang$core$Native_List.toArray(v.domain).map(
							function (v) {
								return v;
							}),
						relation: _elm_lang$core$Native_List.toArray(v.relation).map(
							function (v) {
								return {agent: v.agent, from: v.from, to: v.to};
							}),
						valuation: _elm_lang$core$Native_List.toArray(v.valuation).map(
							function (v) {
								return {
									prop: v.prop,
									worlds: _elm_lang$core$Native_List.toArray(v.worlds).map(
										function (v) {
											return v;
										})
								};
							}),
						comment: v.comment
					};
				})
		};
	});
var _user$project$ElmFunctions_truthChecker$JSON = F5(
	function (a, b, c, d, e) {
		return {kripkeModel: a, actionModel: b, world: c, formula: d, actionList: e};
	});
var _user$project$ElmFunctions_truthChecker$AModelJSON = F5(
	function (a, b, c, d, e) {
		return {name: a, domain: b, relation: c, precondition: d, comment: e};
	});
var _user$project$ElmFunctions_truthChecker$AModelJSON_pre = F2(
	function (a, b) {
		return {from: a, to: b};
	});
var _user$project$ElmFunctions_truthChecker$decodeJSON4action_pre = A3(
	_elm_lang$core$Json_Decode$map2,
	_user$project$ElmFunctions_truthChecker$AModelJSON_pre,
	A2(_elm_lang$core$Json_Decode$field, 'from', _elm_lang$core$Json_Decode$string),
	A2(_elm_lang$core$Json_Decode$field, 'to', _elm_lang$core$Json_Decode$string));
var _user$project$ElmFunctions_truthChecker$KModelJSON = F5(
	function (a, b, c, d, e) {
		return {name: a, domain: b, relation: c, valuation: d, comment: e};
	});
var _user$project$ElmFunctions_truthChecker$KModelJSON_rel = F3(
	function (a, b, c) {
		return {agent: a, from: b, to: c};
	});
var _user$project$ElmFunctions_truthChecker$decodeJSON4kripke_rel = A4(
	_elm_lang$core$Json_Decode$map3,
	_user$project$ElmFunctions_truthChecker$KModelJSON_rel,
	A2(_elm_lang$core$Json_Decode$field, 'agent', _elm_lang$core$Json_Decode$string),
	A2(_elm_lang$core$Json_Decode$field, 'from', _elm_lang$core$Json_Decode$string),
	A2(_elm_lang$core$Json_Decode$field, 'to', _elm_lang$core$Json_Decode$string));
var _user$project$ElmFunctions_truthChecker$decodeJSON4action = A6(
	_elm_lang$core$Json_Decode$map5,
	_user$project$ElmFunctions_truthChecker$AModelJSON,
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string),
	A2(
		_elm_lang$core$Json_Decode$field,
		'domain',
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)),
	A2(
		_elm_lang$core$Json_Decode$field,
		'relation',
		_elm_lang$core$Json_Decode$list(_user$project$ElmFunctions_truthChecker$decodeJSON4kripke_rel)),
	A2(
		_elm_lang$core$Json_Decode$field,
		'precondition',
		_elm_lang$core$Json_Decode$list(_user$project$ElmFunctions_truthChecker$decodeJSON4action_pre)),
	A2(_elm_lang$core$Json_Decode$field, 'comment', _elm_lang$core$Json_Decode$string));
var _user$project$ElmFunctions_truthChecker$KModelJSON_val = F2(
	function (a, b) {
		return {prop: a, worlds: b};
	});
var _user$project$ElmFunctions_truthChecker$decodeJSON4kripke_val = A3(
	_elm_lang$core$Json_Decode$map2,
	_user$project$ElmFunctions_truthChecker$KModelJSON_val,
	A2(_elm_lang$core$Json_Decode$field, 'prop', _elm_lang$core$Json_Decode$string),
	A2(
		_elm_lang$core$Json_Decode$field,
		'worlds',
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)));
var _user$project$ElmFunctions_truthChecker$decodeJSON4kripke = A6(
	_elm_lang$core$Json_Decode$map5,
	_user$project$ElmFunctions_truthChecker$KModelJSON,
	A2(_elm_lang$core$Json_Decode$field, 'name', _elm_lang$core$Json_Decode$string),
	A2(
		_elm_lang$core$Json_Decode$field,
		'domain',
		_elm_lang$core$Json_Decode$list(_elm_lang$core$Json_Decode$string)),
	A2(
		_elm_lang$core$Json_Decode$field,
		'relation',
		_elm_lang$core$Json_Decode$list(_user$project$ElmFunctions_truthChecker$decodeJSON4kripke_rel)),
	A2(
		_elm_lang$core$Json_Decode$field,
		'valuation',
		_elm_lang$core$Json_Decode$list(_user$project$ElmFunctions_truthChecker$decodeJSON4kripke_val)),
	A2(_elm_lang$core$Json_Decode$field, 'comment', _elm_lang$core$Json_Decode$string));
var _user$project$ElmFunctions_truthChecker$decodeJSON = A6(
	_elm_lang$core$Json_Decode$map5,
	_user$project$ElmFunctions_truthChecker$JSON,
	A2(_elm_lang$core$Json_Decode$field, 'kripkeModel', _user$project$ElmFunctions_truthChecker$decodeJSON4kripke),
	A2(_elm_lang$core$Json_Decode$field, 'actionModel', _user$project$ElmFunctions_truthChecker$decodeJSON4action),
	A2(_elm_lang$core$Json_Decode$field, 'world', _elm_lang$core$Json_Decode$string),
	A2(_elm_lang$core$Json_Decode$field, 'formula', _elm_lang$core$Json_Decode$string),
	A2(
		_elm_lang$core$Json_Decode$field,
		'actionList',
		_elm_lang$core$Json_Decode$list(_user$project$ElmFunctions_truthChecker$decodeJSON4action)));
var _user$project$ElmFunctions_truthChecker$update = F2(
	function (msg, model) {
		var _p0 = msg;
		switch (_p0.ctor) {
			case 'JsonFromJS1':
				var decodedJSON2 = function () {
					var _p1 = A2(_elm_lang$core$Json_Decode$decodeValue, _user$project$ElmFunctions_truthChecker$decodeJSON, _p0._0);
					if (_p1.ctor === 'Ok') {
						return _p1._0;
					} else {
						return _elm_lang$core$Native_Utils.crashCase(
							'ElmFunctions_truthChecker',
							{
								start: {line: 138, column: 36},
								end: {line: 140, column: 114}
							},
							_p1)(
							A2(_elm_lang$core$Basics_ops['++'], 'error in update ElmFunctions_truthChecker (1):', _p1._0));
					}
				}();
				var kmodel = {
					em_name: decodedJSON2.kripkeModel.name,
					em_domain: decodedJSON2.kripkeModel.domain,
					em_relation: A2(
						_elm_lang$core$List$map,
						function (x) {
							return {ctor: '_Tuple3', _0: x.agent, _1: x.from, _2: x.to};
						},
						decodedJSON2.kripkeModel.relation),
					em_value: A2(
						_elm_lang$core$List$map,
						function (x) {
							return {ctor: '_Tuple2', _0: x.prop, _1: x.worlds};
						},
						decodedJSON2.kripkeModel.valuation)
				};
				var wo = decodedJSON2.world;
				var formula = _user$project$Parser_Formula$parseFormula(decodedJSON2.formula);
				var formulaChecked_ = A2(
					_user$project$Util_ops['@>>='],
					formula,
					function (f) {
						return _elm_lang$core$Native_Utils.eq(wo, 'any') ? A2(_user$project$PAL_semantics$validInModel, kmodel, f) : A3(_user$project$PAL_semantics$valueF, kmodel, wo, f);
					});
				var atomsChecked_ = A2(
					_elm_lang$core$Result$map,
					function (f) {
						return A3(_user$project$PAL_semantics$checkEachAtoms, kmodel, wo, f);
					},
					formula);
				var newModel0 = {
					formulaBool: {formula: '', maybeBool: ''},
					modelName: decodedJSON2.kripkeModel.name,
					world: decodedJSON2.world,
					atomBool: {ctor: '[]'},
					error: '',
					modifiedKM: {ctor: '[]'}
				};
				var newModel = function () {
					var _p3 = {ctor: '_Tuple2', _0: formulaChecked_, _1: atomsChecked_};
					if (_p3._0.ctor === 'Ok') {
						if (_p3._1.ctor === 'Ok') {
							return _elm_lang$core$Native_Utils.update(
								newModel0,
								{
									formulaBool: {
										formula: decodedJSON2.formula,
										maybeBool: _elm_lang$core$Native_Utils.eq(_p3._0._0, true) ? 'true' : 'false'
									},
									atomBool: _p3._1._0
								});
						} else {
							return _elm_lang$core$Native_Utils.update(
								newModel0,
								{error: _p3._1._0});
						}
					} else {
						return _elm_lang$core$Native_Utils.update(
							newModel0,
							{error: _p3._0._0});
					}
				}();
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					{
						ctor: '::',
						_0: _user$project$ElmFunctions_truthChecker$output1_truthCheck_PAL(newModel),
						_1: {ctor: '[]'}
					});
			case 'JsonFromJS2_modifyKM_PAL':
				var newModel0 = {
					formulaBool: {formula: '', maybeBool: ''},
					modelName: '',
					world: '',
					atomBool: {ctor: '[]'},
					error: '',
					modifiedKM: {ctor: '[]'}
				};
				var decodedJSON2 = function () {
					var _p4 = A2(_elm_lang$core$Json_Decode$decodeValue, _user$project$ElmFunctions_truthChecker$decodeJSON, _p0._0);
					if (_p4.ctor === 'Ok') {
						return _p4._0;
					} else {
						return _elm_lang$core$Native_Utils.crashCase(
							'ElmFunctions_truthChecker',
							{
								start: {line: 174, column: 36},
								end: {line: 176, column: 114}
							},
							_p4)(
							A2(_elm_lang$core$Basics_ops['++'], 'error in update ElmFunctions_truthChecker (2):', _p4._0));
					}
				}();
				var kmodel = {
					em_name: decodedJSON2.kripkeModel.name,
					em_domain: decodedJSON2.kripkeModel.domain,
					em_relation: A2(
						_elm_lang$core$List$map,
						function (x) {
							return {ctor: '_Tuple3', _0: x.agent, _1: x.from, _2: x.to};
						},
						decodedJSON2.kripkeModel.relation),
					em_value: A2(
						_elm_lang$core$List$map,
						function (x) {
							return {ctor: '_Tuple2', _0: x.prop, _1: x.worlds};
						},
						decodedJSON2.kripkeModel.valuation)
				};
				var wo = decodedJSON2.world;
				var formula = _user$project$Parser_Formula$parseFormula(decodedJSON2.formula);
				var kmModified_ = A2(
					_user$project$Util_ops['@>>='],
					formula,
					function (x) {
						return A2(_user$project$PAL_semantics$modifyEModel, kmodel, x);
					});
				var newModel = function () {
					var _p6 = kmModified_;
					if (_p6.ctor === 'Ok') {
						var _p11 = _p6._0;
						var km_model = {
							name: A2(
								_elm_lang$core$Basics_ops['++'],
								decodedJSON2.kripkeModel.name,
								A2(_elm_lang$core$Basics_ops['++'], '|', decodedJSON2.formula)),
							domain: _p11.em_domain,
							relation: A2(
								_elm_lang$core$List$map,
								function (_p7) {
									var _p8 = _p7;
									return {agent: _p8._0, from: _p8._1, to: _p8._2};
								},
								_p11.em_relation),
							valuation: A2(
								_elm_lang$core$List$map,
								function (_p9) {
									var _p10 = _p9;
									return {prop: _p10._0, worlds: _p10._1};
								},
								_p11.em_value),
							comment: A2(_elm_lang$core$Basics_ops['++'], 'This is the KM restricted by formula ', decodedJSON2.formula)
						};
						return _elm_lang$core$Native_Utils.update(
							newModel0,
							{
								modifiedKM: {
									ctor: '::',
									_0: km_model,
									_1: {ctor: '[]'}
								}
							});
					} else {
						return _elm_lang$core$Native_Utils.update(
							newModel0,
							{error: _p6._0});
					}
				}();
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					{
						ctor: '::',
						_0: _user$project$ElmFunctions_truthChecker$output2_modifyKM_PAL(newModel),
						_1: {ctor: '[]'}
					});
			default:
				var newModel0 = {
					formulaBool: {formula: '', maybeBool: ''},
					modelName: '',
					world: '',
					atomBool: {ctor: '[]'},
					error: '',
					modifiedKM: {ctor: '[]'}
				};
				var parse2 = function (x) {
					var _p12 = _user$project$Parser_Formula$parseFormula(x.to);
					if (_p12.ctor === 'Ok') {
						return _elm_lang$core$Result$Ok(
							{ctor: '_Tuple2', _0: x.from, _1: _p12._0});
					} else {
						return _elm_lang$core$Result$Err(
							A2(_elm_lang$core$Basics_ops['++'], 'parseError:', _p12._0));
					}
				};
				var decodedJSON2 = function () {
					var _p13 = A2(_elm_lang$core$Json_Decode$decodeValue, _user$project$ElmFunctions_truthChecker$decodeJSON, _p0._0);
					if (_p13.ctor === 'Ok') {
						return _p13._0;
					} else {
						return _elm_lang$core$Native_Utils.crashCase(
							'ElmFunctions_truthChecker',
							{
								start: {line: 211, column: 36},
								end: {line: 213, column: 114}
							},
							_p13)(
							A2(_elm_lang$core$Basics_ops['++'], 'error in update ElmFunctions_truthChecker (2):', _p13._0));
					}
				}();
				var kmName = decodedJSON2.kripkeModel.name;
				var kmDomain = decodedJSON2.kripkeModel.domain;
				var kmRelaton = decodedJSON2.kripkeModel.relation;
				var kmValuation = decodedJSON2.kripkeModel.valuation;
				var kmodel = {
					em_name: kmName,
					em_domain: kmDomain,
					em_relation: A2(
						_elm_lang$core$List$map,
						function (x) {
							return {ctor: '_Tuple3', _0: x.agent, _1: x.from, _2: x.to};
						},
						kmRelaton),
					em_value: A2(
						_elm_lang$core$List$map,
						function (x) {
							return {ctor: '_Tuple2', _0: x.prop, _1: x.worlds};
						},
						kmValuation)
				};
				var amName = decodedJSON2.actionModel.name;
				var amDomain = decodedJSON2.actionModel.domain;
				var amRelation = decodedJSON2.actionModel.relation;
				var amPrecondition = decodedJSON2.actionModel.precondition;
				var precon = _elm_community$result_extra$Result_Extra$combine(
					A2(
						_elm_lang$core$List$map,
						function (x) {
							return parse2(x);
						},
						amPrecondition));
				var actionList = A2(_elm_lang$core$List$map, _user$project$Parser_Formula$object2listOfActions, decodedJSON2.actionList);
				var actionList2 = A2(_user$project$DEL_sequent$substitution4AModel4list_AModels, actionList, actionList);
				var preconSubst = function () {
					var _p15 = precon;
					if (_p15.ctor === 'Err') {
						return _elm_lang$core$Result$Err(_p15._0);
					} else {
						var ff = function (x) {
							return {
								ctor: '_Tuple2',
								_0: _user$project$Util$fst(x),
								_1: A2(
									_user$project$DEL_sequent$substitution4AModel4list,
									_user$project$Util$snd(x),
									actionList2)
							};
						};
						return _elm_lang$core$Result$Ok(
							A2(_elm_lang$core$List$map, ff, _p15._0));
					}
				}();
				var amodel = A2(
					_user$project$Applicative_ops['@>'],
					preconSubst,
					function (x) {
						return {
							am_name: amName,
							am_domain: amDomain,
							am_relation: A2(
								_elm_lang$core$List$map,
								function (x) {
									return {ctor: '_Tuple3', _0: x.agent, _1: x.from, _2: x.to};
								},
								amRelation),
							am_pre: x
						};
					});
				var kmModified_ = A2(
					_user$project$Applicative_ops['<@'],
					_user$project$DEL_semantics$composeKM(kmodel),
					amodel);
				var newModel = function () {
					var _p16 = kmModified_;
					if (_p16.ctor === 'Ok') {
						var _p21 = _p16._0;
						var km_model = {
							name: _p21.em_name,
							domain: _p21.em_domain,
							relation: A2(
								_elm_lang$core$List$map,
								function (_p17) {
									var _p18 = _p17;
									return {agent: _p18._0, from: _p18._1, to: _p18._2};
								},
								_p21.em_relation),
							valuation: A2(
								_elm_lang$core$List$map,
								function (_p19) {
									var _p20 = _p19;
									return {prop: _p20._0, worlds: _p20._1};
								},
								_p21.em_value),
							comment: A2(
								_elm_lang$core$Basics_ops['++'],
								'This is the KM ',
								A2(
									_elm_lang$core$Basics_ops['++'],
									kmName,
									A2(_elm_lang$core$Basics_ops['++'], ' restricted by AM ', amName)))
						};
						return _elm_lang$core$Native_Utils.update(
							newModel0,
							{
								modifiedKM: {
									ctor: '::',
									_0: km_model,
									_1: {ctor: '[]'}
								}
							});
					} else {
						return _elm_lang$core$Native_Utils.update(
							newModel0,
							{error: _p16._0});
					}
				}();
				var wo = decodedJSON2.world;
				return A2(
					_elm_lang$core$Platform_Cmd_ops['!'],
					newModel,
					{
						ctor: '::',
						_0: _user$project$ElmFunctions_truthChecker$output3_modifyKM_DEL(newModel),
						_1: {ctor: '[]'}
					});
		}
	});
var _user$project$ElmFunctions_truthChecker$Model = F6(
	function (a, b, c, d, e, f) {
		return {modelName: a, world: b, atomBool: c, formulaBool: d, error: e, modifiedKM: f};
	});
var _user$project$ElmFunctions_truthChecker$initModel = {
	ctor: '_Tuple2',
	_0: A6(
		_user$project$ElmFunctions_truthChecker$Model,
		'',
		'',
		{ctor: '[]'},
		{formula: '', maybeBool: ''},
		'',
		{ctor: '[]'}),
	_1: _elm_lang$core$Platform_Cmd$none
};
var _user$project$ElmFunctions_truthChecker$JsonFromJS3_modifyKM_DEL = function (a) {
	return {ctor: 'JsonFromJS3_modifyKM_DEL', _0: a};
};
var _user$project$ElmFunctions_truthChecker$JsonFromJS2_modifyKM_PAL = function (a) {
	return {ctor: 'JsonFromJS2_modifyKM_PAL', _0: a};
};
var _user$project$ElmFunctions_truthChecker$JsonFromJS1 = function (a) {
	return {ctor: 'JsonFromJS1', _0: a};
};
var _user$project$ElmFunctions_truthChecker$subscriptions = function (model) {
	return _elm_lang$core$Platform_Sub$batch(
		{
			ctor: '::',
			_0: _user$project$ElmFunctions_truthChecker$input1_truthCheck_PAL(_user$project$ElmFunctions_truthChecker$JsonFromJS1),
			_1: {
				ctor: '::',
				_0: _user$project$ElmFunctions_truthChecker$input2_modifyKM_PAL(_user$project$ElmFunctions_truthChecker$JsonFromJS2_modifyKM_PAL),
				_1: {
					ctor: '::',
					_0: _user$project$ElmFunctions_truthChecker$input3_modifyKM_DEL(_user$project$ElmFunctions_truthChecker$JsonFromJS3_modifyKM_DEL),
					_1: {ctor: '[]'}
				}
			}
		});
};
var _user$project$ElmFunctions_truthChecker$main = _elm_lang$html$Html$program(
	{init: _user$project$ElmFunctions_truthChecker$initModel, view: _user$project$ElmFunctions_truthChecker$view, update: _user$project$ElmFunctions_truthChecker$update, subscriptions: _user$project$ElmFunctions_truthChecker$subscriptions})();

var Elm = {};
Elm['ElmFunctions_truthChecker'] = Elm['ElmFunctions_truthChecker'] || {};
if (typeof _user$project$ElmFunctions_truthChecker$main !== 'undefined') {
    _user$project$ElmFunctions_truthChecker$main(Elm['ElmFunctions_truthChecker'], 'ElmFunctions_truthChecker', undefined);
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

