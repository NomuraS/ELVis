"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var tsmonad_1 = require("tsmonad");
function weagColorFunc1($aglist, $ag) {
    var g = function () { return _.map($aglist, function (x) { return _.nth(x, 0); }); };
    if (!_.includes(g(), $ag)) {
        var a = $aglist.concat([[$ag, colorGen2()]]);
        return tsmonad_1.Writer.writer(["step1: " + a], a);
    }
}
exports.weagColorFunc1 = weagColorFunc1;
function weagColorFunc2(aglist, ag) {
    var f = function (x) { if (_.nth(x, 0) === ag) {
        return _.nth(x, 1);
    }
    else {
        return undefined;
    } };
    var g = function (x) {
        if (_.head(x) !== undefined) {
            return tsmonad_1.Writer.writer(["step2: " + _.head(x)], _.head(x));
        }
    };
    return _.chain(aglist)
        .map(f)
        .compact()
        .thru(function (x) { return g(x); })
        .value();
}
exports.weagColorFunc2 = weagColorFunc2;
function weagColorFunc($aglist, $ag) {
    return weagColorFunc1($aglist, $ag)
        .bind(function (x) { return weagColorFunc2(x, $ag); });
}
function weitherColorFunc($aglist, $ag) {
    return weagColorFunc1($aglist, $ag)
        .bind(function (x) { return weagColorFunc2(x, $ag); })
        .caseOf({
        writer: function (a) { return a; }
    });
}
function eagColorFunc1($aglist, $ag) {
    var g = function () { return _.map($aglist, function (x) { return _.nth(x, 0); }); };
    if (!_.includes(g(), $ag)) {
        var a = $aglist.concat([[$ag, colorGen2()]]);
        return tsmonad_1.Either.right(a);
    }
    else {
        return tsmonad_1.Either.left(console.log("a"));
    }
}
exports.eagColorFunc1 = eagColorFunc1;
function eagColorFunc2(aglist, ag) {
    var f = function (x) { if (_.nth(x, 0) === ag) {
        return _.nth(x, 1);
    }
    else {
        return undefined;
    } };
    var g = function (x) {
        var headval = _.head(x);
        if (headval === undefined) {
            return tsmonad_1.Either.left(console.log("error in eagColorFunc2"));
        }
        else {
            return tsmonad_1.Either.right(headval);
        }
    };
    return _.chain(aglist)
        .map(f)
        .compact()
        .thru(function (x) { return g(x); })
        .value();
}
exports.eagColorFunc2 = eagColorFunc2;
function eagColorFunc($aglist, $ag) {
    return eagColorFunc1($aglist, $ag)
        .bind(function (x) { return eagColorFunc2(x, $ag); });
}
function eitherColorFunc($aglist, $ag) {
    return eagColorFunc1($aglist, $ag)
        .bind(function (x) { return eagColorFunc2(x, $ag); })
        .caseOf({
        right: function (a) { return a; },
        left: function () { return console.log("error"); }
    });
}
function agColorFunc1($aglist, $ag) {
    var g = function () { return _.map($aglist, function (x) { return _.nth(x, 0); }); };
    if (!_.includes(g(), $ag)) {
        var a = $aglist.concat([[$ag, colorGen2()]]);
        return tsmonad_1.Maybe.just(a);
    }
    else {
        return tsmonad_1.Maybe.nothing();
    }
}
exports.agColorFunc1 = agColorFunc1;
function agColorFunc2(aglist, ag) {
    var g = function (x) {
        if (_.head(x) === undefined) {
            return tsmonad_1.Maybe.nothing();
        }
        else {
            return tsmonad_1.Maybe.just(_.head(x));
        }
    };
    var f = function (x) { if (_.nth(x, 0) === ag) {
        return _.nth(x, 1);
    } };
    return _.chain(aglist)
        .map(f)
        .compact()
        .thru(function (x) { return g(x); })
        .value();
}
exports.agColorFunc2 = agColorFunc2;
function agColorFunc($aglist, $ag) {
    return agColorFunc1($aglist, $ag)
        .bind(function (x) { return agColorFunc2(x, $ag); });
}
function maybeagColorFunc($aglist, $ag) {
    return agColorFunc1($aglist, $ag)
        .bind(function (x) { return agColorFunc2(x, $ag); })
        .caseOf({
        just: function (a) { return a; },
        nothing: function () { return console.log("error"); }
    });
}
function colorGen2() {
    return '#' + Math.floor(Math.random() * 15000000).toString(16);
}
var global_aglist = [];
function agColor1($global_aglist, $ag) {
    var get_global_aglist = function () { return tsmonad_1.Either.right(global_aglist); };
    var addNewColor = _.curry(function ($ag, $aglist) {
        if (!_.includes(_.map($aglist, function (x) { return _.nth(x, 0); }), $ag)) {
            return tsmonad_1.Either.left(console.log("error in agColor (1)"));
        }
        else {
            return tsmonad_1.Either.right($aglist.concat([[$ag, colorGen2()]]));
        }
    });
    var global_change_aglist = function ($aglist) {
        global_aglist = $aglist;
        return tsmonad_1.Either.right(global_aglist);
    };
    var ff = function ($xss) {
        var ff2 = function (xs) {
            return (_.nth(xs, 0) === $ag) ? _.nth(xs, 1) : undefined;
        };
        return (_.map($xss, ff2));
    };
    var gg = function (x) {
        var hv = _.head(x);
        if (hv === undefined) {
            return tsmonad_1.Either.left(console.log("error in agColor (2)"));
        }
        else {
            return tsmonad_1.Either.right(hv);
        }
    };
    return get_global_aglist()
        .bind(addNewColor($ag))
        .bind(function (newAglist) { return global_change_aglist(newAglist); })
        .fmap(ff)
        .fmap(_.compact)
        .bind(gg);
}
