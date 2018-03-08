
import * as Rx from 'rx-dom';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import * as R from 'ramda';
import * as Kr from "./vis_kripke"
import { Either } from 'tsmonad';
import * as Vis from '../lib/vis';
import * as Util from '../lib/util';
import * as Elm_frame from '../frame/elmFunctions_frame';
import * as Elm_randomKM from '../action/elmFunctions_randomAM';
import * as Elm_truthChecker from './elmFunctions_truthChecker';
import * as Ac from '../action/vis_action';

declare let MathJax: any
declare let $: any

//----------------------------------------------      
// event listners 
//----------------------------------------------  
// keyup event 
const $$FORM2_KRIPKE: HTMLInputElement | null = document.querySelector('#form2_kripke') as HTMLInputElement
// click events 
const $BUTTON_CHECK_FRAME_PROPERTIES: Element | null = document.querySelector('#button_check_frame_properties_kripke')
const $BUTTON_MAKEITREFLEXIVE: Element | null = document.querySelector('#button_makeItReflexive_kripke')
const $BUTTON_MAKEITTRANSITIVE: Element | null = document.querySelector('#button_makeItTransitive_kripke')
const $BUTTON_MAKEITSYMMETRIC: Element | null = document.querySelector('#button_makeItSymmetric_kripke')
const $BUTTON_MAKEITEUCLEADIAN: Element | null = document.querySelector('#button_makeItEucleadian_kripke')
const $BUTTON_COMPOSITION_KRIPKE_PAL = document.querySelector('#button_composition_kripke_pal') as HTMLInputElement
const $BUTTON_COMPOSITION_KRIPKE_DEL = document.querySelector("#button_composition_kripke_DEL") as HTMLInputElement
//
const $KRIPKE_SAMPLE1: Element | null = document.querySelector('#kripke_sample1')
const $KRIPKE_SAMPLE2: Element | null = document.querySelector('#kripke_sample2')
const $EXPORT_KRIPKE_MODELS: Element | null = document.querySelector('#export_kripke_models')
const $BUTTON_ADD_KRIPKE: Element | null = document.querySelector("#button_add_kripke")
const $BUTTON_ADD_ATOM: Element | null = document.querySelector("#button_add_atom")
const $SELECT_COMPOSITION_KRIPKE1: HTMLInputElement = document.querySelector('#select_composition_kripke1') as HTMLInputElement
// modify KM
const $INPUT_TEXT_FOR_MODIFYKM_PAL = document.querySelector('#input_text_for_modifyKM_pal') as HTMLInputElement
const $SELECT_COMPOSITION_KRIPKE1_PAL: HTMLInputElement = document.querySelector('#select_composition_kripke1_pal') as HTMLInputElement
const $SELECT_COMPOSITION_KRIPKE1_DEL: HTMLInputElement = document.querySelector('#select_composition_kripke1_DEL') as HTMLInputElement
const $SELECT_COMPOSITION_ACTION1_DEL: HTMLInputElement = document.querySelector('#select_composition_action1_DEL') as HTMLInputElement

// truthChecker
const $SELECT_KRIPKE_FOR_TRUTHCHECKER: HTMLInputElement = document.querySelector('#select_kripke_for_truthChecker') as HTMLInputElement
const $SELECT_WORLD_FOR_TRUTHCHECKER: HTMLInputElement = document.querySelector('#select_world_for_truthChecker') as HTMLInputElement
const $BUTTON_TRUTH_CHECK_PAL: Element | null = document.querySelector('#button_truth_check_pal')
//composition
const $BUTTON_COMPOSITION_KRIPKE: Element | null = document.querySelector('#button_composition_kripke')
// const $COMP_BUTTON_ADD_KRIPKE: Element | null = document.querySelector('#comp_button_add_kripke')
const $BUTTON_CREATE_RANDOM_KRIPKE: Element | null = document.querySelector("#button_create_random_kripke")



// change events
const $INPUT_CHECK_KRIPKE: Element | null = document.querySelector('input[name="check_kripke"]') // straight arrow
const $INPUT_CHECK_KRIPKE2: Element | null = document.querySelector('input[name="check_kripke2"]') // invisible arrows
const $INPUT_NODETYPE_CHECK_KRIPKE = $('input[name="nodeType_check_kripke"]:radio')
const $FILE_KRIPKE: Element | null = document.querySelector("#file_kripke")
const $ELM_FRAME = Elm_frame.ElmFunctions_frame.embed(document.getElementById('elm_frame'));
const $ELM_TRUTHcHECKER = Elm_truthChecker.ElmFunctions_truthChecker.embed(document.getElementById('elm_truthChecker'));

//---------------------------------------------- 

// constants 
//----------------------------------------------
const $$INITIAL_NODES: Vis.Node[] = [
    { label: "w0", id: "w0", font: { multi: true } },
    { label: "w1", id: "w1" },
    { label: "w2", id: "w2" }
]
const $$INITIAL_EDGES: Vis.Edge[] = [
    { from: "w1", to: "w1", label: "a", id: "w1_w1_a", color: Ac.agColor("a", Kr.AGENT_COLOR_K) },
    { from: "w0", to: "w1", label: "a", id: "w0_w1_a", color: Ac.agColor("a", Kr.AGENT_COLOR_K) },
    { from: "w0", to: "w2", label: "b", id: "w0_w2_b", color: Ac.agColor("b", Kr.AGENT_COLOR_K) },
]

//----------------------------------------------
// global variables
//----------------------------------------------
let CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_kripke').prop('checked');
let CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_kripke').prop('checked');
let NODE_TYPE = (document.querySelector("input[name='nodeType_check_kripke']:checked") as HTMLInputElement).value;
let CHECK_PHYSICS_ENABLE: boolean = $('#checkbox_physics_kripke').prop('checked');
let CHECK_HIERARCHICAL_KRIPKE = $('#checkbox_hierarchical_kripke_auto').prop('checked');

let COMPOSED_KRIPKE: Kr.KripkeModel;
let NETWORK_KRIPKE: Vis.Network
let NUM_OF_RANDOMKM: number = 0

export function change_global_KRIPKE_DATA($add) {
    Kr.KRIPKE_DATA.push($add);
}

export function change_global_COMPOSED_KRIPKE($model) {
    COMPOSED_KRIPKE = $model
}
export function change_global_NUM_OF_RANDOMKM() {
    NUM_OF_RANDOMKM = NUM_OF_RANDOMKM + 1
}


//----------------------------------------------
// initials
//----------------------------------------------
Rx.DOM.ready().subscribe(
    () => {
        // variable settngs
        const _name_kripke: string = $$FORM2_KRIPKE.value.toString();
        // setting for the initial graph
        document.getElementById('network-popUp_edge_kripke').style.display = 'none';
        Kr.NODES.add($$INITIAL_NODES);
        Kr.EDGES.add($$INITIAL_EDGES);
        // Kr.NODES.add([]);
        // Kr.EDGES.add([]);
        const _change_valuation_in_topPanel = true
        const _initialAM: Kr.KripkeModel = Kr.graph2kripkeObject(_name_kripke, Kr.NODES, Kr.EDGES)    // (I). setting for the graph
        Kr.OPTION_KRIPKE.manipulation = {
            editEdge: false,
            deleteNode: ($data: any, $callback: any) => {
                Kr.watchRemoveNodefunction($data, $callback, Kr.NODES, Kr.EDGES)
            },
            deleteEdge: ($data: any, $callback: any) => {
                Kr.watchRemoveDeletefunction($data, $callback, Kr.NODES, Kr.EDGES)
            },
            addNode: ($data: Vis.Node, $callback: any) => {
                Kr.watchAddNodefunction($data, $callback, Kr.NODES, Kr.EDGES)
            },
            addEdge: ($data: Kr.Relation, $callback: any) => {
                Kr.watchAddEdgefunction($data, $callback, Kr.NODES, Kr.EDGES, Kr.$id_of_input_for_arrow_backup_kripke());
            }
        }
        // (II). draw the graph      
        NETWORK_KRIPKE = new Vis.Network(Kr.$CONTAINER_KRIPKE, { nodes: Kr.NODES, edges: Kr.EDGES }, Kr.OPTION_KRIPKE);
        // 2. write TopPanel
        Kr.kripkeObject2writeTopPanel(_initialAM, !_change_valuation_in_topPanel)

        Kr.KRIPKE_DATA.forEach(x => {
            // 3. add kripke to composition select 
            Kr.addKripke2compositionSelect(x.name, true)
            // 4. write kripke list
            $("#kripke_list").append(Kr.kripkeObject2string(x));
            // 5. kripke listにevent割り当て
            Kr.addEvent2kripkeList(x, Kr.NODES, Kr.EDGES, _change_valuation_in_topPanel);
        });
        // 7. add worlds for TruthChecker
        // select_kripke_for_truthChecker
        Kr.addWorlds2worldSelect_for_truthChecker($SELECT_KRIPKE_FOR_TRUTHCHECKER.value, Kr.KRIPKE_DATA)
        // 6. check frame property
        checkFrameProperty(Kr.EDGES, Kr.NODES);
        // 8 mathjax
        MathJax.Hub.Typeset();
    },
    (error: Error) => console.log(error),
    () => console.log('initialization for Kripke Model completed'),
)
//------------------------------------------------------------
//button for modifying KM by a formula (PAL)
//------------------------------------------------------------

Rx.Observable.fromEvent($BUTTON_COMPOSITION_KRIPKE_PAL, 'click')
    .subscribe(
        () => {
            const _km: string = $SELECT_COMPOSITION_KRIPKE1_PAL.value.toString()
            // const _km2 = _km.replace(/\%/g, "") 
            // console.log(_km)
            const _model: Kr.KripkeModel = Kr.kmName2km(_km, Kr.KRIPKE_DATA)
            const _formula = $INPUT_TEXT_FOR_MODIFYKM_PAL.value
            const _sendingModel = {
                kripkeModel: _model,
                actionModel: { name: "", domain: [], relation: [], precondition: [], comment: "" },
                world: "",
                formula: _formula,
                actionList: []
            }
            $ELM_TRUTHcHECKER.ports.input2_modifyKM_PAL.send(_sendingModel)
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
$ELM_TRUTHcHECKER.ports.output2_modifyKM_PAL.subscribe($output => { // 
    const _km: Kr.KripkeModel = _.head($output.modifiedKM)
    if ($output.modifiedKM === undefined) {
        alert($output.error)
    } else if (_.every(Kr.KRIPKE_DATA, x => x.name !== _km.name)) {
        // 4. write kripke list2
        change_global_KRIPKE_DATA(_km);
        // 3. add kripke to composition select 
        Kr.addKripke2compositionSelect(_km.name, false);
        // 4. write kripke list
        $("#kripke_list_PAL").append(Kr.kripkeObject2string(_km));
        $("#kripke_list").append(Kr.kripkeObject2string(_km));
        // 5. kripke listにevent割当
        Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
        MathJax.Hub.Typeset();
    } else {
        alert(`The name "${_km.name}" already exists in the list. Change the name.`)
    }
})

// { 
//     name: string,
//     domain: string[],
//     relation: Relation[],
//     valuation: Valuation[],
//     comment: string
// }
//------------------------------------------------------------
//button for modifying KM by a formula (DEL)
//------------------------------------------------------------
Rx.Observable.fromEvent($BUTTON_COMPOSITION_KRIPKE_DEL, 'click')
    .subscribe(
        () => {
            const _km: string = $SELECT_COMPOSITION_KRIPKE1_DEL.value.toString()
            const _am: string = $SELECT_COMPOSITION_ACTION1_DEL.value.toString()
            const _kmodel: Kr.KripkeModel = Kr.kmName2km(_km, Kr.KRIPKE_DATA)
            const _amodel: Ac.ActionModel = Ac.acName2ac(_am, Ac.ACTION_DATA)
            const _sendingModel = {
                kripkeModel: _kmodel,
                actionModel: _amodel,
                world: "",
                formula: "",
                actionList: Ac.ACTION_DATA
            }
            // console.log(_sendingModel) 
            $ELM_TRUTHcHECKER.ports.input3_modifyKM_DEL.send(_sendingModel)
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
$ELM_TRUTHcHECKER.ports.output3_modifyKM_DEL.subscribe($output => {
    // console.log($output)
    const _km: Kr.KripkeModel = _.head($output.modifiedKM)
    if ($output.modifiedKM === undefined) {
        alert($output.error)
    } else if (_.every(Kr.KRIPKE_DATA, x => x.name !== _km.name)) {
        // 4. write kripke list2 
        change_global_KRIPKE_DATA(_km);
        // 3. add kripke to composition select  
        Kr.addKripke2compositionSelect(_km.name, false);
        // 4. write kripke list 
        $("#kripke_list_DEL").append(Kr.kripkeObject2string(_km));
        $("#kripke_list").append(Kr.kripkeObject2string(_km));
        // 5. kripke listにevent割当   
        Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
        //9 mathjax
        MathJax.Hub.Typeset();

    } else {
        alert(`The name "${_km.name}" already exists in the list. Change the name.`)
    }
})
// ----------------------------------------------------  
// button_add_kripke
//------------------------------------------------------------

Rx.Observable.fromEvent($BUTTON_ADD_KRIPKE, 'click')
    .subscribe(
        () => {
            // open panel of kripke list
            $('#kripkeListPanel').show(500);
            const _nameInfo: string = $('#form2_kripke').val().toString();
            const _commentInfo: string = $('#textarea_comment_kripke').val().toString();
            const _fromInfo: JQuery<HTMLElement> = $(".classOfPrecondition_kripke > .color_text_panel_kripke") //e0 
            const _toInfo: JQuery<HTMLElement> = $(".classOfPrecondition_kripke > .precondition4state_kripke") //top
            const _km: Kr.KripkeModel =
                Kr.button2kripkeObject(_nameInfo, _commentInfo, _fromInfo, _toInfo, Kr.NODES, Kr.EDGES, Kr.KRIPKE_DATA)

            if (_.every(Kr.KRIPKE_DATA, x => x.name !== _km.name)) {
                // 7. Kr.KRIPKE_DATA.push(_kripke_object);
                change_global_KRIPKE_DATA(_km);
                // 3. add kripke to composition select
                Kr.addKripke2compositionSelect(_km.name, false);
                // 4. write kripke list
                $("#kripke_list").append(Kr.kripkeObject2string(_km));
                $("#kripke_list_editor").append(Kr.kripkeObject2string(_km));
                // 5. kripke listにevent割当
                Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
                //9 mathjax
                MathJax.Hub.Typeset();

                // success message
                alert(`new Kripke Model "${_km.name}" has been successfully added to Kripke Model List.`)
            } else {
                alert(`The name "${_km.name}" already exists in the list. Change the name.`)
            }
            // }) 
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
//------------------------------------------------------------
// BUTTON_TRUTH_CHECK 
//------------------------------------------------------------

Rx.Observable.fromEvent($BUTTON_TRUTH_CHECK_PAL, 'click')
    .subscribe(
        () => {
            const _km: string = $SELECT_KRIPKE_FOR_TRUTHCHECKER.value.toString()
            const _model: Kr.KripkeModel = Kr.kmName2km(_km, Kr.KRIPKE_DATA)
            const _world: string = $SELECT_WORLD_FOR_TRUTHCHECKER.value.toString()
            const _formula: string = $('#input_formula_for_check').val().toString();
            const _sendingModel = {
                kripkeModel: _model,
                actionModel: { name: "", domain: [], relation: [], precondition: [], comment: "" },
                world: _world,
                formula: _formula,
                actionList: []
            }
            console.log(_sendingModel)
            $ELM_TRUTHcHECKER.ports.input1_truthCheck_PAL.send(_sendingModel)
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
$ELM_TRUTHcHECKER.ports.output1_truthCheck_PAL.subscribe(model => { //result from Elm
    const _formula = model.formulaBool.formula
    const _bool: string = model.formulaBool.maybeBool
    const _km = model.modelName
    const _err = model.error
    const _atoms = model.atomBool
    const _world = model.world
    const h = () => {
        if (_bool === "true") {
            return `<li><span style="color:#346B36">&#10004;</span> <span class="colorOfSuccess">${_formula}</span> (${_km}, ${_world})</li>`
        } else if (_bool === "false") {
            return `<li><span style="color:#A44644">&#10008;</span> <span class="colorOfError">${_formula}</span> (${_km}, ${_world})</li>`
        }
    }
    const hh = ($bool, $world) => {
        if (($bool === 'false') && ($world === 'any')) {
            return "some world"
        } else if (($bool === 'true') && ($world === 'any')) {
            return "any world"
        } return $world
    }
    const ff = ($bool: string): string => {
        if ($bool === "true") {
            return `<li><span style="color:#346B36">&#10004; </span><span  class="colorOfSuccess">formula ${_formula}: ${$bool} at ${hh($bool, _world)}</span></li>`
        } else if ($bool === "false") {
            return `<li><span style="color:#A44644">&#10008; </span><span  class="colorOfError">formula ${_formula}: ${$bool} at ${hh($bool, _world)}</span></li>`
        } else {
            return `<li class="colorOfWarning">${_err}</li>`
        }
    }
    const gg = ($atomBool) => {
        const _atom = $atomBool.atom
        const _bool: string = $atomBool.maybeBool
        if (_bool === "true") {
            return `<li><span style="color:#346B36">&#10004; </span><span  class="colorOfSuccess">atom ${_atom}: ${_bool} at ${hh(_bool, _world)}</span</li>`
        } else if (_bool === "false") {
            return `<li><span style="color:#A44644">&#10008; </span><span  class="colorOfError">atom ${_atom}: ${_bool} at ${hh(_bool, _world)}</span</li>`
        } else {
            return `<li class="colorOfWarning">${_atom}</li>`
        }
    }
    $("#results_check_formula_html").empty()
    _.forEach(_atoms, (x) => {
        $("#results_check_formula_html").append(gg(x))
    })
    $("#results_check_formula_html").append(ff(_bool))
    $("#results_check_formula").append(h())
})

// change worlds by kripke
$SELECT_KRIPKE_FOR_TRUTHCHECKER.addEventListener('change', function () {
    const chosenKripke: string = $SELECT_KRIPKE_FOR_TRUTHCHECKER.value.toString()
    const kmDom = Kr.kmName2km(chosenKripke, Kr.KRIPKE_DATA).domain
    $("#select_world_for_truthChecker").empty()
    $("#select_world_for_truthChecker").append(`<option value="any" selected>any</option>`)
    _.forEach(kmDom, x => {
        $("#select_world_for_truthChecker").append(`<option>${x}</option>`)
    })
})



//------------------------------------------------------------
// button_add_atom
//------------------------------------------------------------

// let NUM_OF_ATOM: number = 1

// export function change_global_NUM_OF_ATOM() {
//     NUM_OF_ATOM = NUM_OF_ATOM + 1
// }


Rx.Observable.fromEvent($BUTTON_ADD_ATOM, 'click')
    .subscribe(
        () => {
            // let elements:string[]=[]
            // const addedAtomsList = $('.color_text_panel')
            // for (let i = 0; i < addedAtomsList.length; i++) {
            //     elements[i] = _.trim(addedAtomsList[i].innerHTML);
            // }
            const atom: number = $('#kripke_valuation')[0].childElementCount
            const h =
                `<li class='classOfPrecondition'>Value(` +
                `<span class='color_text_panel'> p${atom.toString()} </span>) = { ` +
                `<input type='text' class='precondition4state input_width_small'> }` +
                `</li>`;
            $("#kripke_valuation").append(h);
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
//------------------------------------------------------------
// button for frme properties
//------------------------------------------------------------

function checkFrameProperty($edges, $nodes) {
    const sendingFrame = Kr.edges2relation($edges)
    const sendingJSON = {
        frame: sendingFrame,
        property: "",
        agents: _.uniq(_.map($edges.get(), (x: Vis.Edge) => x.label)),
        domain: _.map($nodes.get(), (x: Vis.Node) => x.label),
    }
    $ELM_FRAME.ports.input2.send(sendingJSON)
}
$ELM_FRAME.ports.output2.subscribe(model => { //result from Elm
    const ff = (x: Boolean, str) => {
        if (x) {
            Util.writeDOM_html(str + "> .table1-yw4l", "&#10004;")
            $(str).css("background-color", "#DBEED3");
            $(str + "> .table1-yw4l").css("color", "#346B36"); //red
        } else {
            Util.writeDOM_html(str + "> .table1-yw4l", "&#10008;")
            $(str).css("background-color", "#F0D9D9");
            $(str + "> .table1-yw4l").css("color", "#A44644 "); //green
        }
    }
    ff(model.checkRef, '#result_isReflexive_kripke')
    ff(model.checkTra, '#result_isTransitive_kripke')
    ff(model.checkEuc, '#result_isEucleadian_kripke')
    ff(model.checkSym, '#result_isSymmetric_kripke')
    ff(model.checkSer, '#result_isSerial_kripke')
})

// button_check_frame_properties
Rx.Observable.fromEvent($BUTTON_CHECK_FRAME_PROPERTIES, 'click')
    .subscribe(
        () => checkFrameProperty(Kr.EDGES, Kr.NODES),
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);

// make it ref
Rx.Observable.fromEvent($BUTTON_MAKEITREFLEXIVE, 'click')
    .subscribe(
        () => {
            const sendingFrame = Kr.edges2relation(Kr.EDGES)
            const sendingJSON = {
                frame: sendingFrame,
                property: "T",
                // agents: _.map(Kr.AGENT_COLOR, (x: Kr.AgentColor) => x.agent),
                agents: _.uniq(_.map(Kr.EDGES.get(), (x: Vis.Edge) => x.label)),
                // agents: _.map(Kr.AGENT_LIST, (x: string[]) => _.nth(x, 0)),
                domain: _.map(Kr.NODES.get(), (x: Vis.Node) => x.label),
            }
            $ELM_FRAME.ports.input1.send(sendingJSON)
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);

// make it tra
Rx.Observable.fromEvent($BUTTON_MAKEITTRANSITIVE, 'click')
    .subscribe(
        () => {
            const _sendingFrame = Kr.edges2relation(Kr.EDGES)
            const _sendingJSON = {
                frame: _sendingFrame,
                property: "4",
                // agents: _.map(Kr.AGENT_COLOR, (x: Kr.AgentColor) => x.agent),
                agents: _.uniq(_.map(Kr.EDGES.get(), (x: Vis.Edge) => x.label)),
                domain: _.map(Kr.NODES.get(), (x: Vis.Node) => x.label),
            }
            $ELM_FRAME.ports.input1.send(_sendingJSON)
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
// make it symm
Rx.Observable.fromEvent($BUTTON_MAKEITSYMMETRIC, 'click')
    .subscribe(
        () => {
            const sendingFrame = Kr.edges2relation(Kr.EDGES)
            const sendingJSON = {
                frame: sendingFrame,
                property: "B",
                // agents: _.map(Kr.AGENT_COLOR, (x: Kr.AgentColor) => x.agent),
                agents: _.uniq(_.map(Kr.EDGES.get(), (x: Vis.Edge) => x.label)),
                domain: _.map(Kr.NODES.get(), (x: Vis.Node) => x.label),
            }
            $ELM_FRAME.ports.input1.send(sendingJSON)
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);

// make it tra
Rx.Observable.fromEvent($BUTTON_MAKEITEUCLEADIAN, 'click')
    .subscribe(
        () => {
            const _sendingFrame = Kr.edges2relation(Kr.EDGES)
            const _sendingJSON = {
                frame: _sendingFrame,
                property: "5",
                // agents: _.map(Kr.AGENT_COLOR, (x: Kr.AgentColor) => x.agent), 
                agents: _.uniq(_.map(Kr.EDGES.get(), (x: Vis.Edge) => x.label)),
                domain: _.map(Kr.NODES.get(), (x: Vis.Node) => x.label),
            }
            $ELM_FRAME.ports.input1.send(_sendingJSON)
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
$ELM_FRAME.ports.output1.subscribe(model => { //result from Elm
    const ff = (x: Kr.Relation): Vis.Edge => {
        return {
            label: x.agent,
            from: x.from,
            to: x.to,
            color: Ac.agColor(x.agent, Kr.AGENT_COLOR_K),
            id: `${x.from}_${x.to}_${x.agent}`
        }
    }
    const _addingEdges = _.map(model.resultProperty, ff)
    const _kmName = $$FORM2_KRIPKE.value.toString();
    Kr.EDGES.update(_addingEdges)
    const _kmobject = Kr.graph2kripkeObject(_kmName, Kr.NODES, Kr.EDGES)
    Kr.kripkeObject2writeTopPanel(_kmobject, false)
    checkFrameProperty(Kr.EDGES, Kr.NODES);
})



//------------------------------------------------------------
// composition
//------------------------------------------------------------

// Rx.Observable.fromEvent($BUTTON_COMPOSITION_KRIPKE, 'click')
//     .subscribe(
//     () => {
//         const _ac1: string = $SELECT_COMPOSITION_KRIPKE.value.toString()
//         const _ac2: string = $SELECT_COMPOSITION_KRIPKE2.value.toString()
//         const _sendingJSON = {
//             kripke1: Kr.acName2ac(_ac1, Kr.KRIPKE_DATA),
//             kripke2: Kr.acName2ac(_ac2, Kr.KRIPKE_DATA),
//         }
//         $ELM_KRIPKE.ports.input1.send(_sendingJSON)
//     },
//     (error: Error) => console.log(error),
//     () => console.log('draw and write new graph, completed'),
// );


// $ELM_KRIPKE.ports.output1.subscribe((model: Kr.KripkeModel) => { //result from Elm
//     change_global_COMPOSED_KRIPKE(model)
//     Kr.kripkeObject2writeComposePanel(model)
// })

//------------------------------------------------------------------------------------
// add kripke (composition)
//------------------------------------------------------------------------------------

// Rx.Observable.fromEvent($COMP_BUTTON_ADD_KRIPKE, 'click')
//     .subscribe(
//     () => {
//         const _nameInfo: string = $('#comp_form2_kripke').val().toString()
//         const _commentInfo: string = $('#comp_textarea_comment_kripke').val().toString()
//         const _fromInfo: JQuery<HTMLElement> = $(".classOfPrecondition > .color_text_panel")
//         const _toInfo: JQuery<HTMLElement> = $(".classOfPrecondition > .precondition4state")
//         const _km: Kr.KripkeModel =
//             Kr.button2kripkeObject(_nameInfo, _commentInfo, _fromInfo, _toInfo, Kr.NODES, Kr.EDGES, Kr.KRIPKE_DATA)
//         const _changeValuation = true

//         if (_.every(Kr.KRIPKE_DATA, x => x.name !== _km.name)) {
//             // 7. Kr.KRIPKE_DATA.push(_kripke_object);
//             change_global_KRIPKE_DATA(COMPOSED_KRIPKE);
//             // 3. add kripke to composition select
//             Kr.addKripke2compositionSelect(COMPOSED_KRIPKE.name);
//             // 4. write kripke list
//             $("#kripke_list").append(Kr.kripkeObject2string(COMPOSED_KRIPKE));
//             // 5. kripke listにevent割当
//             Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, _changeValuation);
//             // success message
//             alert(`new Kripke Model "${_km.name}" has been successfully added to Kripke Model List.`)
//         } else {
//             alert(`The name "${_km.name}" already exists in the list. Change the name.`)
//         }
//     },
//     (error: Error) => console.log(error),
//     () => console.log('draw and write new graph, completed'),
// );

//------------------------------------------------------------------------------------
// add kripke (random)
//------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------
// add action (random)
//------------------------------------------------------------------------------------
const $ELM_RANDOM_KM = Elm_randomKM.ElmFunctions_randomAM.embed(document.getElementById('elm_randomAM'));

Rx.Observable.fromEvent($BUTTON_CREATE_RANDOM_KRIPKE, 'click')
    .subscribe(
        () => {
            const _numAgt = Number(document['form4agent_randomKM'].number_of_agent_randomKM.value);
            const _numAct = Number(document['form4act_randomKM'].number_of_act_randomKM.value);
            const _randomSeed = Date.now()
            $ELM_RANDOM_KM.ports.input2.send({
                numOfAgt: _numAgt,
                numOfAct: _numAct,
                randomSeed: _randomSeed
            })
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph, completed'),
);
$ELM_RANDOM_KM.ports.output2.subscribe((model: Kr.KripkeModel) => {
    const _km = {
        name: model.name + String(NUM_OF_RANDOMKM),
        domain: model.domain,
        relation: model.relation,
        valuation: model.valuation,
        comment: "Random Kripke Model" + String(NUM_OF_RANDOMKM)
    }
    change_global_NUM_OF_RANDOMKM()
    // 7. Ac.KRIPKE_DATA.push(_kripke_object);
    change_global_KRIPKE_DATA(_km);
    // 3. add kripke to composition select
    Kr.addKripke2compositionSelect(_km.name, false);
    // 4. write action list
    $("#kripke_list").append(Kr.kripkeObject2string(_km));
    $("#kripke_list_random").append(Kr.kripkeObject2string(_km));
    // 5. action listにevent割当
    Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
    // applying mathjax
    MathJax.Hub.Typeset();
    // success message
    alert(`new Kripke Model "${_km.name}" has been successfully added to Kripke Model List.`)
})
//------------------------------------------------------------------------------------
// Figure Configurations 
//------------------------------------------------------------------------------------

// hierarchical
$INPUT_CHECK_KRIPKE.addEventListener('change', function () {
    CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ edges: { smooth: !CHECK_STRAIGHT_LINE } });
    reflect_checkbox()
})
// チェックボックスをチェックしたら発動2 reflexive arrowsを透明にする
$INPUT_CHECK_KRIPKE2.addEventListener('change', function () {
    CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_kripke').prop('checked');
    if (CHECK_INVISIBLE_ARROWS) {
        _.chain(Kr.EDGES.get())
            .filter((x: Vis.Edge) => { if (x.from === x.to) { return true } else { return false } })
            .forEach((y: Vis.Edge) => Kr.EDGES.update({ id: y.id, color: Kr.$$BACKGROUND_COLOR, font: { color: Kr.$$BACKGROUND_COLOR } }))
            .value()
    } else {
        _.chain(Kr.EDGES.get())
            .filter((x: Vis.Edge) => { if (x.from === x.to) { return true } else { return false } })
            .forEach((y: Vis.Edge) => Kr.EDGES.update({ id: y.id, color: Ac.agColor(y.label, Kr.AGENT_COLOR_K), font: { color: "black" } }))
            .value()
    }
})
// node type
$INPUT_NODETYPE_CHECK_KRIPKE.on('change', function () {
    NODE_TYPE = (document.querySelector("input[name='nodeType_check_kripke']:checked") as HTMLInputElement).value
    if (NODE_TYPE === 'type1') {
        NETWORK_KRIPKE.setOptions({ nodes: { shape: 'ellipse' } });
    } else if (NODE_TYPE === 'type2') {
        NETWORK_KRIPKE.setOptions({ nodes: { shape: 'dot' } });
    }
})

$('#checkbox_hierarchical_kripke_auto').on("change", function (): void {
    CHECK_HIERARCHICAL_KRIPKE = $('#checkbox_hierarchical_kripke_auto').prop('checked');
    if (CHECK_HIERARCHICAL_KRIPKE) {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: { enabled: true } } })
    } else {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: false } })
    }
    reflect_checkbox()
})


$('#checkbox_physics_kripke').on("change", function (): void {
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } })
    reflect_checkbox()
})

$("#gravitationalConstant_kripke").on('change', function () {
    const range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.gravitationalConstant = range_value
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE)
    reflect_checkbox()
})

$("#centralGravity_kripke").on('change', function () {
    const range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.centralGravity = range_value
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE)
    reflect_checkbox()
})

$("#springLength_kripke").on('change', function () {
    const range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.springLength = range_value
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE)
    reflect_checkbox()
})

$("#springConstant_kripke").on('change', function () {
    const range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.springConstant = range_value
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE)
    reflect_checkbox()
})

function reflect_checkbox() {
    // CHECK_STRAOGHT_LINE
    CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ edges: { smooth: !CHECK_STRAIGHT_LINE } });
    // CHECK_HIERARCHICAL_KRIPKE
    CHECK_HIERARCHICAL_KRIPKE = $('#checkbox_hierarchical_kripke_auto').prop('checked');
    if (CHECK_HIERARCHICAL_KRIPKE) {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: { enabled: true } } })
    } else {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: false } })
    }
    // CHECK_PHYSICS_ENABLE
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } })
}

//----------------------------------------------------------------------------------------
// keyup 
//----------------------------------------------------------------------------------------
// setting (write figure's title) 
$$FORM2_KRIPKE.addEventListener('keyup', function () {
    const _name_kripke: string = $$FORM2_KRIPKE.value.toString()
    Util.writeDOM_html('#kripkeNameOnGraph')(_name_kripke)
})

//------------------------------------------------------------
// download the kripke list
//------------------------------------------------------------
Rx.Observable.fromEvent($EXPORT_KRIPKE_MODELS, 'click')
    .subscribe(
        () => {
            const FOR_DOWNLOAD = _.map(Kr.KRIPKE_DATA, (x) => JSON.stringify(x, null, "\t"))
            let _link = document.createElement('a');
            _link.href = window.URL.createObjectURL(new Blob(["[" + FOR_DOWNLOAD + "]"]));
            _link.download = "KripkeModels.json";
            _link.click();
        },
        (error: Error) => console.log(error),
        () => console.log('drawand write new graph completed'),
);

//------------------------------------------------------------
// kripke_sample1
$KRIPKE_SAMPLE1.addEventListener('click', function (): void {
    Kr.ajax_output('./files/KModels/MuddyChildren.json');
});
$KRIPKE_SAMPLE2.addEventListener('click', function (): void {
    Kr.ajax_output('./files/AModels/MayReada.json');
});
//--------------------------------------------------------------
//load json (kripke models)
//--------------------------------------------------------------

Rx.Observable.fromEvent($FILE_KRIPKE, 'change')
    .subscribe(
        () => {
            if ((window as any).File) {
                const _input = (document.querySelector('#file_kripke') as any).files[0]
                const reader = new FileReader()
                const _json2html = () => Kr.json2kripkeData(JSON.parse(reader.result))
                reader.addEventListener('load', _json2html, true)
                reader.readAsText(_input, 'UTF-8')
                alert("load succeeded. See Kripke Model List.")
            }
        },
        (error: Error) => console.log(error),
        () => console.log('load completed'),
);




////////////////////////////////////////////////////// 
//// multilineSelectmenu
////////////////////////////////////////////////////// 


function chosenKM_for_select_world_for_truthChecker() {
    const _chosenKripke: string = (document.querySelector('#select_kripke_for_truthChecker') as HTMLInputElement).value.toString()
    const _kmDom = Kr.kmName2km(_chosenKripke, Kr.KRIPKE_DATA).domain
    $("#select_world_for_truthChecker").empty()
    $("#select_world_for_truthChecker").append(`<option value="any" selected>any</option>`)
    _.forEach(_kmDom, x => {
        $("#select_world_for_truthChecker").append(`<option>${x}</option>`)
    })
}


let multilineSelectmenu_kripke = $.widget("ui.multilineSelectmenu", $.ui.selectmenu, {
    _setText: function (element, value) {
        chosenKM_for_select_world_for_truthChecker();
        if (value) {
            if (value.indexOf('%') !== -1) {
                var lines = value.split('%');
                value = '<span class="ui-selectmenu-menu-item-header">' + lines[0].trim() +
                    '</span>';
                for (var i = 1; i < lines.length; i++) {
                    value = value + '<span class="ui-selectmenu-menu-item-content">' + lines[i].trim() +
                        '</span>';
                }
            }
            element.html(value);
        } else {
            element.html("&#160;");
        }
    }
});

let multilineSelectmenu_action = $.widget("ui.multilineSelectmenu_action", $.ui.selectmenu, {
    _setText: function (element, value) {
        if (value) {
            if (value.indexOf('%') !== -1) {
                var lines = value.split('%');
                value = '<span class="ui-selectmenu-menu-item-header">' + lines[0].trim() +
                    '</span>';
                for (var i = 1; i < lines.length; i++) {
                    value = value + '<span class="ui-selectmenu-menu-item-content">' + lines[i].trim() +
                        '</span>';
                }
            }
            element.html(value);
        } else {
            element.html("&#160;");
        }
    }
});


// // vis-button vis-add
// $(".vis-label").on('click', function () {
//     console.log("eo")
//     // $(document).on('click',function(){
//     $('#node-label_kripke').val("aoe")
// })