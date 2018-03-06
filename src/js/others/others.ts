import * as _ from 'lodash';
import { Maybe, Either, Writer } from 'tsmonad';
import * as R from 'ramda';
//------------------------------------------------------
// writer test
//------------------------------------------------------
export function weagColorFunc1($aglist: string[][], $ag: string): Writer<string, string[][]> {
    const g = () => _.map($aglist, x => _.nth(x, 0))
    if (!_.includes(g(), $ag)) {
        const a: string[][] = $aglist.concat([[$ag, colorGen2()]])
        return Writer.writer([`step1: ${a}`], a); //Just [ag, colorGen()]
    }
}
export function weagColorFunc2(aglist: string[][], ag: string): Writer<string, string> {
    const f = (x: string[]): string => { if (_.nth(x, 0) === ag) { return _.nth(x, 1) } else { return undefined } };
    const g = (x: string[]): Writer<string, string> => {
        if (_.head(x) !== undefined) {
            return Writer.writer([`step2: ${_.head(x)}`], _.head(x))
        }
    }
    return _.chain(aglist)
        .map(f)
        .compact()
        .thru(x => g(x))
        .value()
}

function weagColorFunc($aglist: string[][], $ag: string): Writer<string, string> {
    return weagColorFunc1($aglist, $ag)
        .bind(x => weagColorFunc2(x, $ag))
}

// console.log(weagColorFunc2([], "a"))
// console.log(weagColorFunc([], "start vvv: "))

function weitherColorFunc($aglist: string[][], $ag: string): string[] {
    return weagColorFunc1($aglist, $ag)
        .bind(x => weagColorFunc2(x, $ag))
        .caseOf({
            writer: a => a
        })
}


//------------------------------------------------------
// either test
//------------------------------------------------------
export function eagColorFunc1($aglist: string[][], $ag: string): Either<void, string[][]> {
    const g = () => _.map($aglist, x => _.nth(x, 0))
    if (!_.includes(g(), $ag)) {
        const a: string[][] = $aglist.concat([[$ag, colorGen2()]])
        return Either.right<void, string[][]>(a); //Just [ag, colorGen()]
    } else {
        return Either.left<void, string[][]>(console.log("a")) //Nothing
    }

}
export function eagColorFunc2(aglist: string[][], ag: string): Either<void, string> {
    const f = (x: string[]): string => { if (_.nth(x, 0) === ag) { return _.nth(x, 1) } else { return undefined } };
    const g = (x: string[]): Either<void, string> => {
        const headval: string | undefined = _.head(x)
        if (headval === undefined) {
            return Either.left<void, string>(console.log("error in eagColorFunc2"))
        } else {
            return Either.right<void, string>(headval)
        }
    }
    return _.chain(aglist)
        .map(f)
        .compact()
        .thru(x => g(x))
        .value()
}
function eagColorFunc($aglist: string[][], $ag: string): Either<void, string> {
    return eagColorFunc1($aglist, $ag)
        .bind(x => eagColorFunc2(x, $ag))
}

// console.log(eagColorFunc2([],"a"))

function eitherColorFunc($aglist: string[][], $ag: string): string | void {
    return eagColorFunc1($aglist, $ag)
        .bind(x => eagColorFunc2(x, $ag))
        .caseOf({
            right: a => a,
            left: () => console.log("error")
        })
}


//------------------------------------------------------
// maybe test
//------------------------------------------------------
export function agColorFunc1($aglist: string[][], $ag: string): Maybe<string[][]> {
    const g = () => _.map($aglist, x => _.nth(x, 0))
    if (!_.includes(g(), $ag)) {
        const a: string[][] = $aglist.concat([[$ag, colorGen2()]])
        return Maybe.just<string[][]>(a); //Just [ag, colorGen()]
    } else {
        return Maybe.nothing<string[][]>() //Nothing
    }

}
export function agColorFunc2(aglist: string[][], ag: string): Maybe<string> {
    const g = (x: string[]): Maybe<string> => {
        if (_.head(x) === undefined) {
            return Maybe.nothing<string>()
        } else {
            return Maybe.just<string>(_.head(x))
        }
    }
    const f = (x: string[]): string => { if (_.nth(x, 0) === ag) { return _.nth(x, 1) } };
    return _.chain(aglist)
        .map(f)
        .compact()
        .thru(x => g(x))
        .value()
}
function agColorFunc($aglist: string[][], $ag: string): Maybe<string> {
    return agColorFunc1($aglist, $ag)
        .bind(x => agColorFunc2(x, $ag))
}

function maybeagColorFunc($aglist: string[][], $ag: string): string | void {
    return agColorFunc1($aglist, $ag)
        .bind(x => agColorFunc2(x, $ag))
        .caseOf({
            just: a => a,
            nothing: () => console.log("error")
        })
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

let global_aglist: string[][] = []

function agColor1($global_aglist: string[][], $ag: string): Either<void, string> {

    const get_global_aglist = (): Either<void, string[][]> => Either.right(global_aglist)

    const addNewColor = _.curry(($ag: string, $aglist: string[][]): Either<void, string[][]> => {
        if (!_.includes(_.map($aglist, x => _.nth(x, 0)), $ag)) {
            return Either.left(console.log("error in agColor (1)"))
        } else {
            return Either.right($aglist.concat([[$ag, colorGen2()]])); //Just [ag, colorGen()]
        }
    })
    const global_change_aglist = ($aglist: string[][]): Either<void, string[][]> => {
        global_aglist = $aglist
        return Either.right(global_aglist)
    }
    const ff = ($xss: string[][]): string[] => {
        const ff2 = (xs: string[]): string | undefined => {
            return (_.nth(xs, 0) === $ag) ? _.nth(xs, 1) : undefined
        }
        return (_.map($xss, ff2))
    };
    const gg = (x: string[]): Either<void, string> => {
        const hv = _.head(x)
        if (hv === undefined) {
            return Either.left(console.log("error in agColor (2)"))
        } else {
            return Either.right(hv)
        }
    }
    // return  addNewColor($global_aglist, $ag).do()
    return get_global_aglist()
        .bind(addNewColor($ag)) //Either.right(string[][])
        .bind(newAglist => global_change_aglist(newAglist))//Either.right(string[][])
        .fmap(ff)
        // .fmap(x => _.map(x, ff1))
        .fmap(_.compact)
        .bind(gg)
}

