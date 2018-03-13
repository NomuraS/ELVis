
import * as Rx from 'rx-dom';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import * as R from 'ramda';
import * as Ac from "./vis_action"
import { Either } from 'tsmonad';
// import * as Vis from 'vis';
import * as Vis from '../lib/vis';
// import * as IO from '../lib/io_monad';
import * as Util from '../lib/util';
import * as Elm_action from './elmFunctions_action';
import * as Elm_frame from '../frame/elmFunctions_frame';
import * as Elm_randomAM from './elmFunctions_randomAM';
declare let $: any
// declare let Vis: any


//----------------------------------------------
// event listners 
//----------------------------------------------
// keyup event 
const $$FORM2_ACTION: HTMLInputElement | null = document.querySelector('#form2_action') as HTMLInputElement
// click events 
const $BUTTON_CHECK_FRAME_PROPERTIES: Element | null = document.querySelector('#button_check_frame_properties')
// const $BUTTON_ISREFLEXIVE: Element | null = document.querySelector('#button_isReflexive')
// const $BUTTON_ISTRANSITIVE: Element | null = document.querySelector('#button_isTransitive')
// const $BUTTON_ISSYMMETRIC: Element | null = document.querySelector('#button_isSymmetric')
// const $BUTTON_ISEUCLEADIAN: Element | null = document.querySelector('#button_isEucleadian')

const $BUTTON_MAKEITREFLEXIVE: Element | null = document.querySelector('#button_makeItReflexive')
const $BUTTON_MAKEITTRANSITIVE: Element | null = document.querySelector('#button_makeItTransitive')
const $BUTTON_MAKEITSYMMETRIC: Element | null = document.querySelector('#button_makeItSymmetric')
const $BUTTON_MAKEITEUCLEADIAN: Element | null = document.querySelector('#button_makeItEucleadian')
//
const $ACTION_SAMPLE1: Element | null = document.querySelector('#action_sample1')
const $ACTION_SAMPLE2: Element | null = document.querySelector('#action_sample2')
const $EXPORT_ACTION_MODELS: Element | null = document.querySelector('#export_action_models')
const $BUTTON_ADD_ACTION: Element | null = document.querySelector("#button_add_action")
const $SELECT_COMPOSITION_ACTION1: HTMLInputElement = document.querySelector('#select_composition_action1') as HTMLInputElement
const $SELECT_COMPOSITION_ACTION2: HTMLInputElement = document.querySelector('#select_composition_action2') as HTMLInputElement
const $BUTTON_COMPOSITION_ACTION: Element | null = document.querySelector('#button_composition_action')
const $COMP_BUTTON_ADD_ACTION: Element | null = document.querySelector('#comp_button_add_action')
const $BUTTON_CREATE_RANDOM_ACTION: Element | null = document.querySelector("#button_create_random_action")

// change events
const $INPUT_CHECK_ACTION: Element | null = document.querySelector('input[name="check_action"]') // straight arrow
const $INPUT_CHECK_ACTION2: Element | null = document.querySelector('input[name="check_action2"]') // invisible arrows
const $INPUT_NODETYPE_CHECK_ACTION = $('input[name="nodeType_check_action"]:radio')
const $ELM_ACTION = Elm_action.ElmFunctions_action.embed(document.getElementById('elm_action'));
const $ELM_FRAME = Elm_frame.ElmFunctions_frame.embed(document.getElementById('elm_frame'));
const $ELM_RANDOM_AM = Elm_randomAM.ElmFunctions_randomAM.embed(document.getElementById('elm_randomAM'));
const $FILE_ACTION: Element | null = document.querySelector("#file_action")

//----------------------------------------------
// constants
//----------------------------------------------
const $$INITIAL_NODES: Vis.Node[] = [
    { label: "e0", id: "e0", font: { multi: true } },
    { label: "e1", id: "e1" },
    { label: "e2", id: "e2" }
]
const $$INITIAL_EDGES: Vis.Edge[] = [
    { from: "e1", to: "e1", label: "a", id: "e1_e1_a", color: Ac.agColor("a", Ac.AGENT_COLOR) },
    { from: "e0", to: "e1", label: "a", id: "e0_e1_a", color: Ac.agColor("a", Ac.AGENT_COLOR) },
    { from: "e0", to: "e2", label: "b", id: "e0_e2_b", color: Ac.agColor("b", Ac.AGENT_COLOR) },
]
//----------------------------------------------
// global variables
//----------------------------------------------
let CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_action').prop('checked');
let CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_action').prop('checked');
let NODE_TYPE = (document.querySelector("input[name='nodeType_check_action']:checked") as HTMLInputElement).value;
// let NODE_TYPE = $('#checkbox_node_action').prop('checked');
let CHECK_PHYSICS_ENABLE: boolean = $('#checkbox_physics_action').prop('checked');
let CHECK_HIERARCHICAL_ACTION = $('#checkbox_hierarchical_action_auto').prop('checked');

let COMPOSED_ACTION: Ac.ActionModel;
let NETWORK_ACTION: Vis.Network

export function change_global_ACTION_DATA($add) {
    Ac.ACTION_DATA.push($add);
}

export function change_global_COMPOSED_ACTION($model) {
    COMPOSED_ACTION = $model
}
export function change_global_NUM_OF_RANDOMAM() {
    NUM_OF_RANDOMAM = NUM_OF_RANDOMAM + 1
}

//----------------------------------------------
// initials
//----------------------------------------------
Rx.DOM.ready().subscribe(
    () => {
        // variable settngs
        const _name_action: string = $$FORM2_ACTION.value.toString();
        // setting for the initial graph
        document.getElementById('network-popUp_edge').style.display = 'none';
        Ac.NODES.add($$INITIAL_NODES);
        Ac.EDGES.add($$INITIAL_EDGES);
        const _initialAM: Ac.ActionModel = Ac.graph2actionObject(_name_action, Ac.NODES, Ac.EDGES)    // (I). setting for the graph
        Ac.OPTION_ACTION.manipulation = {
            editEdge: false,
            deleteNode: ($data: any, $callback: any) => {
                Ac.watchRemoveNodefunction($data, $callback, Ac.NODES, Ac.EDGES)
            },
            deleteEdge: ($data: any, $callback: any) => {
                Ac.watchRemoveEdgeFunction($data, $callback, Ac.NODES, Ac.EDGES)
            },
            addNode: ($data: Vis.Node, $callback: any) => {
                Ac.watchAddNodefunction($data, $callback, Ac.NODES, Ac.EDGES, Ac.$A1, Ac.$A2, Ac.$A3, Ac.$A4)
            },
            addEdge: ($data: Ac.Relation, $callback: any) => {
                Ac.watchAddEdgefunction($data, $callback, Ac.NODES, Ac.EDGES, Ac.$id_of_input_for_arrow_backup());
            }
        }
        // (II). draw the graph
        NETWORK_ACTION = new Vis.Network(Ac.$CONTAINER_ACTION, { nodes: Ac.NODES, edges: Ac.EDGES }, Ac.OPTION_ACTION);
        // 2. write TopPanel
        Ac.actionObject2writeTopPanel(_initialAM)
        Ac.ACTION_DATA.forEach((x) => {
            // 3. add action to composition select
            Ac.addAction2compositionSelect(x.name, true)
            // 4. write action list
            $("#action_list").append(Ac.actionObject2string(x));
            // 5. action listにevent割り当て
            Ac.addEvent2actionList(x, Ac.NODES, Ac.EDGES);
        });
        // 6. check frame property
        checkFrameProperty(Ac.EDGES, Ac.NODES);
        // 7. overlay adding
        Ac.overlay4action(Ac.ACTION_DATA.map(x => x.name))
    },
    (error: Error) => console.log(error),
    () => console.log('initialization completed'),
)
//------------------------------------------------------------
// button_add

//------------------------------------------------------------
Rx.Observable.fromEvent($BUTTON_ADD_ACTION, 'click')
    .subscribe(
    () => {
        // open panel of action list
        $('#actionListPanel').show(500);
        const _nameInfo: string = $('#form2_action').val().toString();
        const _commentInfo: string = $('#textarea_comment').val().toString();
        const _fromInfo: JQuery<HTMLElement> = $(".classOfPrecondition > .color_text_panel") //e0
        const _toInfo: JQuery<HTMLElement> = $(".classOfPrecondition > .precondition4state") //top
        const _action_object: Either<void, Ac.ActionModel> = Ac.button2actionObject(_nameInfo, _commentInfo, _fromInfo, _toInfo, Ac.NODES, Ac.EDGES, Ac.ACTION_DATA)
        _action_object.caseOf({
            right: _am => {
                // 7. Ac.ACTION_DATA.push(_action_object);
                change_global_ACTION_DATA(_am);
                // 3. add action to composition select
                Ac.addAction2compositionSelect(_am.name, false);
                // 4. write action list
                $("#action_list").append(Ac.actionObject2string(_am));
                $("#action_list_editor").append(Ac.actionObject2string(_am));
                // 5. action listにevent割当
                Ac.addEvent2actionList(_am, Ac.NODES, Ac.EDGES);
                // 7. overlay adding
                Ac.overlay4action(Ac.ACTION_DATA.map(x => x.name))
                // success message
                alert(`new Action Model "${_am.name}" has been successfully added to Action Model List.`)
            },
            left: errorMsg => console.log(`error in events_action.ts (1): ${errorMsg}`)
        })
    },
    (error: Error) => console.log(error),
    () => console.log('draw and write new graph, completed'),
);
//------------------------------------------------------------
// button for frme properties
//------------------------------------------------------------

function checkFrameProperty($edges, $nodes) {
    const sendingFrame = Ac.edges2relation($edges)
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
    ff(model.checkRef, '#result_isReflexive')
    ff(model.checkTra, '#result_isTransitive')
    ff(model.checkEuc, '#result_isEucleadian')
    ff(model.checkSym, '#result_isSymmetric')
    ff(model.checkSer, '#result_isSerial')
})

// button_check_frame_properties
Rx.Observable.fromEvent($BUTTON_CHECK_FRAME_PROPERTIES, 'click')
    .subscribe(
    () => checkFrameProperty(Ac.EDGES, Ac.NODES),
    (error: Error) => console.log(error),
    () => console.log('draw and write new graph, completed'),
);

// make it ref
Rx.Observable.fromEvent($BUTTON_MAKEITREFLEXIVE, 'click')
    .subscribe(
    () => {
        const sendingFrame = Ac.edges2relation(Ac.EDGES)
        const sendingJSON = {
            frame: sendingFrame,
            property: "T",
            // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
            agents: _.uniq(_.map(Ac.EDGES.get(), (x: Vis.Edge) => x.label)),
            // agents: _.map(Ac.AGENT_LIST, (x: string[]) => _.nth(x, 0)),
            domain: _.map(Ac.NODES.get(), (x: Vis.Node) => x.label),
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
        const _sendingFrame = Ac.edges2relation(Ac.EDGES)
        const _sendingJSON = {
            frame: _sendingFrame,
            property: "4",
            // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
            agents: _.uniq(_.map(Ac.EDGES.get(), (x: Vis.Edge) => x.label)),
            domain: _.map(Ac.NODES.get(), (x: Vis.Node) => x.label),
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
        const sendingFrame = Ac.edges2relation(Ac.EDGES)
        const sendingJSON = {
            frame: sendingFrame,
            property: "B",
            // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
            agents: _.uniq(_.map(Ac.EDGES.get(), (x: Vis.Edge) => x.label)),
            domain: _.map(Ac.NODES.get(), (x: Vis.Node) => x.label),
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
        const _sendingFrame = Ac.edges2relation(Ac.EDGES)
        const _sendingJSON = {
            frame: _sendingFrame,
            property: "5",
            // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
            agents: _.uniq(_.map(Ac.EDGES.get(), (x: Vis.Edge) => x.label)),
            domain: _.map(Ac.NODES.get(), (x: Vis.Node) => x.label),
        }
        $ELM_FRAME.ports.input1.send(_sendingJSON)
    },
    (error: Error) => console.log(error),
    () => console.log('draw and write new graph, completed'),
);
$ELM_FRAME.ports.output1.subscribe(model => { //result from Elm
    const ff = (x: Ac.Relation): Vis.Edge => {
        return {
            label: x.agent,
            from: x.from,
            to: x.to,
            color: Ac.agColor(x.agent, Ac.AGENT_COLOR),
            id: `${x.from}_${x.to}_${x.agent}`
        }
    }
    const _addingEdges = _.map(model.resultProperty, ff)
    const _amName = $$FORM2_ACTION.value.toString();
    Ac.EDGES.update(_addingEdges)
    const _amobject = Ac.graph2actionObject(_amName, Ac.NODES, Ac.EDGES)
    Ac.actionObject2writeTopPanel(_amobject)
    checkFrameProperty(Ac.EDGES, Ac.NODES);
})



//------------------------------------------------------------
//------------------------------------------------------------

Rx.Observable.fromEvent($BUTTON_COMPOSITION_ACTION, 'click')
    .subscribe(
    () => {
        const _ac1: string = $SELECT_COMPOSITION_ACTION1.value.toString()
        const _ac2: string = $SELECT_COMPOSITION_ACTION2.value.toString()
        const _sendingJSON = {
            action1: Ac.acName2ac(_ac1, Ac.ACTION_DATA),
            action2: Ac.acName2ac(_ac2, Ac.ACTION_DATA),
        }
        $ELM_ACTION.ports.input1.send(_sendingJSON)
    },
    (error: Error) => console.log(error),
    () => console.log('draw and write new graph, completed'),
);
$ELM_ACTION.ports.output1.subscribe((model: Ac.ActionModel) => { //result from Elm
    change_global_COMPOSED_ACTION(model)
    // console.log(Ac.ACTION_DATA) 
    Ac.actionObject2writeComposePanel(model)
})

//------------------------------------------------------------------------------------
// add action (composition)
//------------------------------------------------------------------------------------

// $COMP_BUTTON_ADD_ACTION.addEventListener('click', function () {
Rx.Observable.fromEvent($COMP_BUTTON_ADD_ACTION, 'click')
    .subscribe(
    () => {
        const _nameInfo: string = $('#comp_form2_action').val().toString()
        const _commentInfo: string = $('#comp_textarea_comment').val().toString()
        const _fromInfo: JQuery<HTMLElement> = $(".classOfPrecondition > .color_text_panel")
        const _toInfo: JQuery<HTMLElement> = $(".classOfPrecondition > .precondition4state")
        const _action_object: Either<void, Ac.ActionModel> =
            Ac.button2actionObject(_nameInfo, _commentInfo, _fromInfo, _toInfo, Ac.NODES, Ac.EDGES, Ac.ACTION_DATA)

        _action_object.caseOf({
            right: _am => {
                // 7. Ac.ACTION_DATA.push(_action_object);
                change_global_ACTION_DATA(COMPOSED_ACTION);
                // 3. add action to composition select
                Ac.addAction2compositionSelect(COMPOSED_ACTION.name, false);
                // 4. write action list
                $("#action_list").append(Ac.actionObject2string(COMPOSED_ACTION));
                $("#action_list_composition").append(Ac.actionObject2string(COMPOSED_ACTION));
                // 5. action listにevent割当
                Ac.addEvent2actionList(_am, Ac.NODES, Ac.EDGES);
                // success message
                alert(`new Action Model "${_am.name}" has been successfully added to Action Model List.`)
            },
            left: errorMsg => console.log(`error in events_action.ts (2): ${errorMsg}`)
        })
    },
    (error: Error) => console.log(error),
    () => console.log('draw and write new graph, completed'),
);

//------------------------------------------------------------------------------------
// add action (random)
//------------------------------------------------------------------------------------

let NUM_OF_RANDOMAM: number = 0

Rx.Observable.fromEvent($BUTTON_CREATE_RANDOM_ACTION, 'click')
    .subscribe(
    () => {
        const _numAgt = Number(document['form4agent_randomAM'].number_of_agent_randomAM.value);
        const _numAct = Number(document['form4act_randomAM'].number_of_act_randomAM.value);
        const _randomSeed = Date.now()
        $ELM_RANDOM_AM.ports.input1.send({
            numOfAgt: _numAgt,
            numOfAct: _numAct,
            randomSeed: _randomSeed
        })
    },
    (error: Error) => console.log(error),
    () => console.log('draw and write new graph, completed'),
);
$ELM_RANDOM_AM.ports.output1.subscribe((model: Ac.ActionModel) => {
    const _am = {
        name: model.name + String(NUM_OF_RANDOMAM),
        domain: model.domain,
        relation: model.relation,
        precondition: model.precondition,
        comment: "Random Action Model" + String(NUM_OF_RANDOMAM)
    }
    change_global_NUM_OF_RANDOMAM()
    // 7. Ac.ACTION_DATA.push(_action_object);
    change_global_ACTION_DATA(_am);
    // 3. add action to composition select
    Ac.addAction2compositionSelect(_am.name, false);
    // 4. write action list
    $("#action_list").append(Ac.actionObject2string(_am));
    $("#action_list_random").append(Ac.actionObject2string(_am));

    // 5. action listにevent割当
    Ac.addEvent2actionList(_am, Ac.NODES, Ac.EDGES);
    // success message
    alert(`new Action Model "${_am.name}" has been successfully added to Action Model List.`)
})


// export interface Relation {
//     agent: string,
//     from: string,
//     to: string
// }
// export interface Precondition {
//     from: string,
//     to: string
// }
// export interface ActionModel {
//     name: string,
//     domain: string[],
//     relation: Relation[],
//     precondition: Precondition[],
//     comment: string
// }
//------------------------------------------------------------------------------------
// Figure Configurations 
//------------------------------------------------------------------------------------

// hierarchical
$INPUT_CHECK_ACTION.addEventListener('change', function () {
    CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_action').prop('checked');
    NETWORK_ACTION.setOptions({ edges: { smooth: !CHECK_STRAIGHT_LINE } });
    reflect_checkbox()
})
// チェックボックスをチェックしたら発動2 reflexive arrowsを透明にする
$INPUT_CHECK_ACTION2.addEventListener('change', function () {
    CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_action').prop('checked');
    if (CHECK_INVISIBLE_ARROWS) {
        _.chain(Ac.EDGES.get())
            .filter((x: Vis.Edge) => { if (x.from === x.to) { return true } else { return false } })
            .forEach((y: Vis.Edge) => Ac.EDGES.update({ id: y.id, color: Ac.$BACKGROUND_COLOR, font: { color: Ac.$BACKGROUND_COLOR } }))
            .value()
    } else {
        _.chain(Ac.EDGES.get())
            .filter((x: Vis.Edge) => { if (x.from === x.to) { return true } else { return false } })
            .forEach((y: Vis.Edge) => Ac.EDGES.update({ id: y.id, color: Ac.agColor(y.label, Ac.AGENT_COLOR), font: { color: "black" } }))
            .value()
    }
})
// node type
$INPUT_NODETYPE_CHECK_ACTION.on('change', function () {
    NODE_TYPE = (document.querySelector("input[name='nodeType_check_action']:checked") as HTMLInputElement).value
    if (NODE_TYPE === 'type1') {
        NETWORK_ACTION.setOptions({ nodes: { shape: 'ellipse' } });
    } else if (NODE_TYPE === 'type2') {
        NETWORK_ACTION.setOptions({ nodes: { shape: 'dot' } });
    }
})

$('#checkbox_hierarchical_action_auto').on("change", function (): void {
    CHECK_HIERARCHICAL_ACTION = $('#checkbox_hierarchical_action_auto').prop('checked');
    if (CHECK_HIERARCHICAL_ACTION) {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: { enabled: true } } })
    } else {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: false } })
    }
    reflect_checkbox()
})


$('#checkbox_physics_action').on("change", function (): void {
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_action').prop('checked');
    NETWORK_ACTION.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } })
    reflect_checkbox()
})

$("#gravitationalConstant_action").on('change', function () {
    const range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.gravitationalConstant = range_value
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION)
    reflect_checkbox()
})

$("#centralGravity_action").on('change', function () {
    const range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.centralGravity = range_value
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION)
    reflect_checkbox()
})

$("#springLength_action").on('change', function () {
    const range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.springLength = range_value
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION)
    reflect_checkbox()
})

$("#springConstant_action").on('change', function () {
    const range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.springConstant = range_value
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION)
    reflect_checkbox()
})

function reflect_checkbox() {
    // CHECK_STRAOGHT_LINE
    CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_action').prop('checked');
    NETWORK_ACTION.setOptions({ edges: { smooth: !CHECK_STRAIGHT_LINE } });
    // CHECK_HIERARCHICAL_ACTION
    CHECK_HIERARCHICAL_ACTION = $('#checkbox_hierarchical_action_auto').prop('checked');
    if (CHECK_HIERARCHICAL_ACTION) {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: { enabled: true } } })
    } else {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: false } })
    }
    // CHECK_PHYSICS_ENABLE
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_action').prop('checked');
    NETWORK_ACTION.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } })
}

//----------------------------------------------------------------------------------------
// keyup 
//----------------------------------------------------------------------------------------
// setting (write figure's title) 
$$FORM2_ACTION.addEventListener('keyup', function () {
    const name_action: string = $$FORM2_ACTION.value.toString()
    Util.writeDOM_html('#actionNameOnGraph')(name_action)
})

//------------------------------------------------------------
// download the action list
//------------------------------------------------------------
Rx.Observable.fromEvent($EXPORT_ACTION_MODELS, 'click')
    .subscribe(
    () => {
        const FOR_DOWNLOAD = _.map(Ac.ACTION_DATA, (x) => JSON.stringify(x, null, "\t"))
        let _link = document.createElement('a');
        _link.href = window.URL.createObjectURL(new Blob(["[" + FOR_DOWNLOAD + "]"]));
        _link.download = "ActionModels.json";
        _link.click();
    },
    (error: Error) => console.log(error),
    () => console.log('drawandwritenewgraph completed'),
);

//------------------------------------------------------------
//action_sample1
$ACTION_SAMPLE1.addEventListener('click', function (): void {
    Ac.ajax_output('./src/files/AModels/MayReada.json');
});
$ACTION_SAMPLE2.addEventListener('click', function (): void {
    Ac.ajax_output('./src/files/AModels/MayReada.json');
});
//--------------------------------------------------------------
//load json (action models)
//--------------------------------------------------------------

Rx.Observable.fromEvent($FILE_ACTION, 'change')
    .subscribe(
    () => {
        if ((window as any).File) {
            const _input = (document.querySelector('#file_action') as any).files[0]
            const _reader = new FileReader()
            const _json2html = () => Ac.json2actionData(JSON.parse(_reader.result))
            _reader.addEventListener('load', _json2html, true)
            _reader.readAsText(_input, 'UTF-8')
            alert("load succeeded. See Action Model List.")
        }
    },
    (error: Error) => console.log(error),
    () => console.log('load completed'),
);





//------------------------------------------------------------
//// undo redo
//------------------------------------------------------------
$(document).ready(function () {
    // event on
    Ac.NODES.on("add", Ac.change_history_back_action);
    Ac.NODES.on("remove", Ac.change_history_back_action);
    Ac.EDGES.on("add", Ac.change_history_back_action);
    Ac.EDGES.on("remove", Ac.change_history_back_action);
    // initial data
    Ac.history_list_back_action.push({
        nodes_his: Ac.NODES.get(Ac.NODES.getIds()),
        edges_his: Ac.EDGES.get(Ac.EDGES.getIds())
    });
    // apply css
    Ac.css_for_undo_redo_chnage_action();
})


$("#button_undo_action").on("click", function () {
    if (Ac.history_list_back_action.length > 1) {
        const current_nodes = Ac.NODES.get(Ac.NODES.getIds());
        const current_edges = Ac.EDGES.get(Ac.EDGES.getIds());
        const previous_nodes = Ac.history_list_back_action[1].nodes_his;
        const previous_edges = Ac.history_list_back_action[1].edges_his;
        // event off
        Ac.NODES.off("add", Ac.change_history_back_action);
        Ac.NODES.off("remove", Ac.change_history_back_action);
        Ac.EDGES.off("add", Ac.change_history_back_action);
        Ac.EDGES.off("remove", Ac.change_history_back_action);
        // undo without events
        if (current_nodes.length > previous_nodes.length) {
            const previous_nodes_diff = _.differenceBy(
                current_nodes,
                previous_nodes,
                "id"
            );
            Ac.NODES.remove(previous_nodes_diff);
        } else {
            Ac.NODES.update(previous_nodes);
        }

        if (current_edges.length > previous_edges.length) {
            const previous_edges_diff = _.differenceBy(
                current_edges,
                previous_edges,
                "id"
            );
            Ac.EDGES.remove(previous_edges_diff);
        } else {
            Ac.EDGES.update(previous_edges);
        }
        // recover event on
        Ac.NODES.on("add", Ac.change_history_back_action);
        Ac.NODES.on("remove", Ac.change_history_back_action);
        Ac.EDGES.on("add", Ac.change_history_back_action);
        Ac.EDGES.on("remove", Ac.change_history_back_action);

        Ac.history_list_forward_action.unshift({
            nodes_his: Ac.history_list_back_action[0].nodes_his,
            edges_his: Ac.history_list_back_action[0].edges_his
        });
        Ac.history_list_back_action.shift();
        // apply css
        Ac.css_for_undo_redo_chnage_action();
        // reflect graph to panel
        Ac.nodeEdge2writeTopPanel(Ac.NODES, Ac.EDGES)
    }
});

$("#button_redo_action").on("click", function () {
    if (Ac.history_list_forward_action.length > 0) {
        const current_nodes = Ac.NODES.get(Ac.NODES.getIds());
        const current_edges = Ac.EDGES.get(Ac.EDGES.getIds());
        const forward_nodes = Ac.history_list_forward_action[0].nodes_his;
        const forward_edges = Ac.history_list_forward_action[0].edges_his;
        // event off
        Ac.NODES.off("add", Ac.change_history_back_action);
        Ac.NODES.off("remove", Ac.change_history_back_action);
        Ac.EDGES.off("add", Ac.change_history_back_action);
        Ac.EDGES.off("remove", Ac.change_history_back_action);
        // redo without events
        if (current_nodes.length > forward_nodes.length) {
            const forward_nodes_diff = _.differenceBy(
                current_nodes,
                forward_nodes,
                "id"
            );
            Ac.NODES.remove(forward_nodes_diff);
        } else {
            Ac.NODES.update(forward_nodes);
        }
        if (current_edges.length > forward_edges.length) {
            const forward_edges_diff = _.differenceBy(
                current_edges,
                forward_edges,
                "id"
            );
            Ac.EDGES.remove(forward_edges_diff);
        } else {
            Ac.EDGES.update(forward_edges);
        }
        // recover event on
        Ac.NODES.on("add", Ac.change_history_back_action);
        Ac.NODES.on("remove", Ac.change_history_back_action);
        Ac.EDGES.on("add", Ac.change_history_back_action);
        Ac.EDGES.on("remove", Ac.change_history_back_action);
        Ac.history_list_back_action.unshift({
            nodes_his: Ac.history_list_forward_action[0].nodes_his,
            edges_his: Ac.history_list_forward_action[0].edges_his
        });
        // history_list_forward_action
        Ac.history_list_forward_action.shift();
        // apply css
        Ac.css_for_undo_redo_chnage_action();
        // reflect graph to panel
        Ac.nodeEdge2writeTopPanel(Ac.NODES, Ac.EDGES)
    }
});
