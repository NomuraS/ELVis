import * as _ from 'lodash';
import * as R from 'ramda';
// takeing from answer 13 of the following topic of stackoverflow.com
// https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript


export function string2number($str: string): string {
    let _array = $str.split("")
    for (var i = 0; i < _array.length; i++) {
        _array[i] = String(_array[i].charCodeAt(0))   
    }
    return _array.join("") 
}

export function cartesianProduct(a) { // a = array of array
    var i, j, l, m, a1, o = [];
    if (!a || a.length == 0) return a;

    a1 = a.splice(0, 1)[0]; // the first array of a
    a = cartesianProduct(a);
    for (i = 0, l = a1.length; i < l; i++) {
        if (a && a.length) for (j = 0, m = a.length; j < m; j++)
            o.push([a1[i]].concat(a[j]));
        else
            o.push([a1[i]]);
    }
    return o;
}
export function makePair(list: any[], list2): any {
    if (list.length === 0) {
        return list2
    } else {
        const aa = list2.concat({ from: _.nth(list, 0), to: _.nth(list, 1) })
        return makePair(list.slice(2, list.length), aa)
    }
}
export function colorGen() {
    // const a = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return '#' + Math.floor(Math.random() * 15000000).toString(16);
}

export function cutHeadLastOfString(st: string): string {
    return st.slice(1).slice(0, -1)
}

export const writeDOM_html = R.curry(($selector: string, $val: string) => {
    document.querySelector($selector).innerHTML = $val
})

export const writeDOM_append = R.curry(($selector: string, $val: any) => {
    // document.querySelector($selector).appendChild($val)
    document.getElementById($selector).appendChild($val)
})

export const writeDOM_value = R.curry(($selector: string, $val: any) => {
    (document.querySelector($selector) as HTMLInputElement).value = $val
})

export function parseRelation(str: string): string[] {
    const aaa = _.chain(str)
        .replace(/ /g, "")
        .replace(/\{|\}/g, "")
        .toArray()
        .value()
    // return parseRelation2(aaa, [], [])
    // console.log(_.includes(str, "("))
    if (_.includes(str, "(")) {
        return parseRelation2(aaa, [], [])
    } else {
        return _.split(str, ",", 2)
    }
}
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
function countx(array: any[], x): number {
    return array.filter(y => y === x).length
}
function parseRelation2(str: string[], stack: string[], queue: string[]): string[] {
    if (_.isEmpty(str) && _.isEmpty(stack)) { return queue } else {
        switch (_.head(str)) {
            case "(":
                const numBlacket2 = stack.concat("(")
                return parseRelation2(_.tail(str), numBlacket2, queue)
            case ")":
                const numBlacket = stack.concat(")")
                if (countx(numBlacket, "(") === countx(numBlacket, ")")) {
                    return parseRelation2(_.tail(str), [], queue.concat(numBlacket.join("")))
                } else {
                    return parseRelation2(_.tail(str), numBlacket, queue)
                }
            default:
                const aaa = stack.concat(_.head(str))
                if (_.head(str) === "," && _.isEmpty(stack)) {
                    return parseRelation2(_.tail(str), [], queue)
                } else {
                    return parseRelation2(_.tail(str), aaa, queue)
                }
        }
    }
}




