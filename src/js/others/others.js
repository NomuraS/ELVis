"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var tsmonad_1 = require("tsmonad");
//------------------------------------------------------
// writer test
//------------------------------------------------------
function weagColorFunc1($aglist, $ag) {
    var g = function () { return _.map($aglist, function (x) { return _.nth(x, 0); }); };
    if (!_.includes(g(), $ag)) {
        var a = $aglist.concat([[$ag, colorGen2()]]);
        return tsmonad_1.Writer.writer(["step1: " + a], a); //Just [ag, colorGen()]
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
// console.log(weagColorFunc2([], "a"))
// console.log(weagColorFunc([], "start vvv: "))
function weitherColorFunc($aglist, $ag) {
    return weagColorFunc1($aglist, $ag)
        .bind(function (x) { return weagColorFunc2(x, $ag); })
        .caseOf({
        writer: function (a) { return a; }
    });
}
//------------------------------------------------------
// either test
//------------------------------------------------------
function eagColorFunc1($aglist, $ag) {
    var g = function () { return _.map($aglist, function (x) { return _.nth(x, 0); }); };
    if (!_.includes(g(), $ag)) {
        var a = $aglist.concat([[$ag, colorGen2()]]);
        return tsmonad_1.Either.right(a); //Just [ag, colorGen()]
    }
    else {
        return tsmonad_1.Either.left(console.log("a")); //Nothing
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
// console.log(eagColorFunc2([],"a"))
function eitherColorFunc($aglist, $ag) {
    return eagColorFunc1($aglist, $ag)
        .bind(function (x) { return eagColorFunc2(x, $ag); })
        .caseOf({
        right: function (a) { return a; },
        left: function () { return console.log("error"); }
    });
}
//------------------------------------------------------
// maybe test
//------------------------------------------------------
function agColorFunc1($aglist, $ag) {
    var g = function () { return _.map($aglist, function (x) { return _.nth(x, 0); }); };
    if (!_.includes(g(), $ag)) {
        var a = $aglist.concat([[$ag, colorGen2()]]);
        return tsmonad_1.Maybe.just(a); //Just [ag, colorGen()]
    }
    else {
        return tsmonad_1.Maybe.nothing(); //Nothing
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
    // const a = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return '#' + Math.floor(Math.random() * 15000000).toString(16);
}
// // agent to backup to agent's label
// function inputTextArea4Agent() {
// 	$(".vis-connect").after(
// 		'<div class="vis-button_textarea" >' +
// 		'<input type="text" value="a"  id="id_of_input_for_arrow" onclick="inputFocus();" >' +
// 		'</div>'
// 		// +'<input type="button" id="asas" value="test">'
// 	)
// }
// function inputFocus() {
// 	document.getElementById('id_of_input_for_arrow').focus();
// }
// function backup2manipulation() {
// 	let val2 = (document.getElementById('id_of_input_for_arrow_backup') as HTMLInputElement).value
// 	$('#id_of_input_for_arrow').val(val2)
// }
// $(document).ready(function () {
// 	// console.log($(".vis-add"))
// 	// console.log($(".vis-connect"))
// 	// console.log($(".vis-delete"))
// 	// console.log($(".vis-back"))
// 	// console.log($(".vis-manipulation"))
// 	inputTextArea4Agent();
// 	backup2manipulation();
// })
// // // $(document).on('mousemove', '#network_action', function () {
// // // $(document).on('contextmenu',".vis-delete" ,function () {
// // $(document).on('click',"#asas" ,function () {
// // 	// console.log(  ".vis-add")
// // 	// console.log($(".vis-add"))
// // 	// console.log(  ".vis-connect")
// // 	// console.log($(".vis-connect"))
// // 	// console.log(".vis-delete")
// // 	// console.log($("div.vis-button.vis-delete"))
// // 	// console.log(".vis-back")
// // 	// console.log($(".vis-back"))
// // 	// console.log(".vis-manipulation")
// // 	// console.log($(".vis-manipulation"))
// // 	// console.log($("div.vis-button.vis-delete").html())
// // 	console.log("mousemove")
// // 	inputTextArea4Agent();
// // })
// $(document).on('change', '#id_of_input_for_arrow', function () {
// 	let val1 = (document.getElementById('id_of_input_for_arrow') as HTMLInputElement).value
// 	$('#id_of_input_for_arrow_backup').val(val1)
// 	// console.log("asdfa")
// 	// $('#id_backup').html(val1)
// })
// //---------------------------
// // console.log($('.vis-delete'))
// // console.log($('.vis-manipulation'))
// // console.log($('#network_action'))
// // console.log($('#network_action,.vis-connect'))
// // console.log($('#network_action,.vis-manipulation'))
// $(document).on('click', '#id_of_input_for_arrow', function () { console.log('click id_of_input_for_arrow') });// ok 
// $(document).on('click', '.vis-button_textarea', function () { console.log('click button_textarea') }); // ok 
// $(document).on('click', '.vis-button', function () { console.log('click button') }) // ok 
// $(document).on('click', '.vis-connect', function () { console.log('click connect') }) // ng 
// $(document).on('click', '.vis-delete', function () { console.log('click delete') }) // ng 
// // $(document).on('click', '.vis-delete',function () { console.log('aaeeemm9') })
// // $(document).on('click', '.vis-connect',function () { console.log('aaeeemm2') })
var global_aglist = [];
function agColor1($global_aglist, $ag) {
    var get_global_aglist = function () { return tsmonad_1.Either.right(global_aglist); };
    var addNewColor = _.curry(function ($ag, $aglist) {
        if (!_.includes(_.map($aglist, function (x) { return _.nth(x, 0); }), $ag)) {
            return tsmonad_1.Either.left(console.log("error in agColor (1)"));
        }
        else {
            return tsmonad_1.Either.right($aglist.concat([[$ag, colorGen2()]])); //Just [ag, colorGen()]
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
    // return  addNewColor($global_aglist, $ag).do()
    return get_global_aglist()
        .bind(addNewColor($ag)) //Either.right(string[][])
        .bind(function (newAglist) { return global_change_aglist(newAglist); }) //Either.right(string[][])
        .fmap(ff)
        .fmap(_.compact)
        .bind(gg);
}
