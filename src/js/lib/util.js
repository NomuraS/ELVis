"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var R = require("ramda");
// takeing from answer 13 of the following topic of stackoverflow.com
// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
function string2number($str) {
    var _array = $str.split("");
    for (var i = 0; i < _array.length; i++) {
        _array[i] = String(_array[i].charCodeAt(0));
    }
    return _array.join("");
}
exports.string2number = string2number;
function cartesianProduct(a) {
    var i, j, l, m, a1, o = [];
    if (!a || a.length == 0)
        return a;
    a1 = a.splice(0, 1)[0]; // the first array of a
    a = cartesianProduct(a);
    for (i = 0, l = a1.length; i < l; i++) {
        if (a && a.length)
            for (j = 0, m = a.length; j < m; j++)
                o.push([a1[i]].concat(a[j]));
        else
            o.push([a1[i]]);
    }
    return o;
}
exports.cartesianProduct = cartesianProduct;
function makePair(list, list2) {
    if (list.length === 0) {
        return list2;
    }
    else {
        var aa = list2.concat({ from: _.nth(list, 0), to: _.nth(list, 1) });
        return makePair(list.slice(2, list.length), aa);
    }
}
exports.makePair = makePair;
function colorGen() {
    // const a = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return '#' + Math.floor(Math.random() * 15000000).toString(16);
}
exports.colorGen = colorGen;
function cutHeadLastOfString(st) {
    return st.slice(1).slice(0, -1);
}
exports.cutHeadLastOfString = cutHeadLastOfString;
exports.writeDOM_html = R.curry(function ($selector, $val) {
    document.querySelector($selector).innerHTML = $val;
});
exports.writeDOM_append = R.curry(function ($selector, $val) {
    // document.querySelector($selector).appendChild($val)
    document.getElementById($selector).appendChild($val);
});
exports.writeDOM_value = R.curry(function ($selector, $val) {
    document.querySelector($selector).value = $val;
});
function parseRelation(str) {
    var aaa = _.chain(str)
        .replace(/ /g, "")
        .replace(/\{|\}/g, "")
        .toArray()
        .value();
    // return parseRelation2(aaa, [], [])
    // console.log(_.includes(str, "("))
    if (_.includes(str, "(")) {
        return parseRelation2(aaa, [], []);
    }
    else {
        return _.split(str, ",", 2);
    }
}
exports.parseRelation = parseRelation;
// export function parseRelationWithCut(str: string): string[] {
//     const aaa = _.chain(str)
//         .replace(/ /g, "")
//         .replace(/\{|\}/g, "")
//         .thru(x => cutHeadLastOfString(x))
//         .toArray()
//         .value()
//         console.log(_.includes(str, "("))
//     if (_.includes(str, "(")) {
//         return parseRelation2(aaa, [], [])
//     } else {
//         return _.split(str, ",", 2)
//     }
// }
function countx(array, x) {
    return array.filter(function (y) { return y === x; }).length;
}
function parseRelation2(str, stack, queue) {
    if (_.isEmpty(str) && _.isEmpty(stack)) {
        return queue;
    }
    else {
        switch (_.head(str)) {
            case "(":
                var numBlacket2 = stack.concat("(");
                return parseRelation2(_.tail(str), numBlacket2, queue);
            case ")":
                var numBlacket = stack.concat(")");
                if (countx(numBlacket, "(") === countx(numBlacket, ")")) {
                    return parseRelation2(_.tail(str), [], queue.concat(numBlacket.join("")));
                }
                else {
                    return parseRelation2(_.tail(str), numBlacket, queue);
                }
            default:
                var aaa = stack.concat(_.head(str));
                if (_.head(str) === "," && _.isEmpty(stack)) {
                    return parseRelation2(_.tail(str), [], queue);
                }
                else {
                    return parseRelation2(_.tail(str), aaa, queue);
                }
        }
    }
}
