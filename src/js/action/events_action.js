"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = require("rx-dom");
var _ = require("lodash");
var Ac = require("./vis_action");
// import * as Vis from 'vis';
var Vis = require("../lib/vis");
// import * as IO from '../lib/io_monad';
var Util = require("../lib/util");
var Elm_action = require("./elmFunctions_action");
var Elm_frame = require("../frame/elmFunctions_frame");
var Elm_randomAM = require("./elmFunctions_randomAM");
// declare let Vis: any
//----------------------------------------------
// event listners 
//----------------------------------------------
// keyup event 
var $$FORM2_ACTION = document.querySelector('#form2_action');
// click events 
var $BUTTON_CHECK_FRAME_PROPERTIES = document.querySelector('#button_check_frame_properties');
// const $BUTTON_ISREFLEXIVE: Element | null = document.querySelector('#button_isReflexive')
// const $BUTTON_ISTRANSITIVE: Element | null = document.querySelector('#button_isTransitive')
// const $BUTTON_ISSYMMETRIC: Element | null = document.querySelector('#button_isSymmetric')
// const $BUTTON_ISEUCLEADIAN: Element | null = document.querySelector('#button_isEucleadian')
var $BUTTON_MAKEITREFLEXIVE = document.querySelector('#button_makeItReflexive');
var $BUTTON_MAKEITTRANSITIVE = document.querySelector('#button_makeItTransitive');
var $BUTTON_MAKEITSYMMETRIC = document.querySelector('#button_makeItSymmetric');
var $BUTTON_MAKEITEUCLEADIAN = document.querySelector('#button_makeItEucleadian');
//
var $ACTION_SAMPLE1 = document.querySelector('#action_sample1');
var $ACTION_SAMPLE2 = document.querySelector('#action_sample2');
var $EXPORT_ACTION_MODELS = document.querySelector('#export_action_models');
var $BUTTON_ADD_ACTION = document.querySelector("#button_add_action");
var $SELECT_COMPOSITION_ACTION1 = document.querySelector('#select_composition_action1');
var $SELECT_COMPOSITION_ACTION2 = document.querySelector('#select_composition_action2');
var $BUTTON_COMPOSITION_ACTION = document.querySelector('#button_composition_action');
var $COMP_BUTTON_ADD_ACTION = document.querySelector('#comp_button_add_action');
var $BUTTON_CREATE_RANDOM_ACTION = document.querySelector("#button_create_random_action");
// change events
var $INPUT_CHECK_ACTION = document.querySelector('input[name="check_action"]'); // straight arrow
var $INPUT_CHECK_ACTION2 = document.querySelector('input[name="check_action2"]'); // invisible arrows
var $INPUT_NODETYPE_CHECK_ACTION = $('input[name="nodeType_check_action"]:radio');
var $ELM_ACTION = Elm_action.ElmFunctions_action.embed(document.getElementById('elm_action'));
var $ELM_FRAME = Elm_frame.ElmFunctions_frame.embed(document.getElementById('elm_frame'));
var $ELM_RANDOM_AM = Elm_randomAM.ElmFunctions_randomAM.embed(document.getElementById('elm_randomAM'));
var $FILE_ACTION = document.querySelector("#file_action");
//----------------------------------------------
// constants
//----------------------------------------------
var $$INITIAL_NODES = [
    { label: "e0", id: "e0", font: { multi: true } },
    { label: "e1", id: "e1" },
    { label: "e2", id: "e2" }
];
var $$INITIAL_EDGES = [
    { from: "e1", to: "e1", label: "a", id: "e1_e1_a", color: Ac.agColor("a", Ac.AGENT_COLOR) },
    { from: "e0", to: "e1", label: "a", id: "e0_e1_a", color: Ac.agColor("a", Ac.AGENT_COLOR) },
    { from: "e0", to: "e2", label: "b", id: "e0_e2_b", color: Ac.agColor("b", Ac.AGENT_COLOR) },
];
//----------------------------------------------
// global variables
//----------------------------------------------
var CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_action').prop('checked');
var CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_action').prop('checked');
var NODE_TYPE = document.querySelector("input[name='nodeType_check_action']:checked").value;
// let NODE_TYPE = $('#checkbox_node_action').prop('checked');
var CHECK_PHYSICS_ENABLE = $('#checkbox_physics_action').prop('checked');
var CHECK_HIERARCHICAL_ACTION = $('#checkbox_hierarchical_action_auto').prop('checked');
var COMPOSED_ACTION;
var NETWORK_ACTION;
function change_global_ACTION_DATA($add) {
    Ac.ACTION_DATA.push($add);
}
exports.change_global_ACTION_DATA = change_global_ACTION_DATA;
function change_global_COMPOSED_ACTION($model) {
    COMPOSED_ACTION = $model;
}
exports.change_global_COMPOSED_ACTION = change_global_COMPOSED_ACTION;
function change_global_NUM_OF_RANDOMAM() {
    NUM_OF_RANDOMAM = NUM_OF_RANDOMAM + 1;
}
exports.change_global_NUM_OF_RANDOMAM = change_global_NUM_OF_RANDOMAM;
//----------------------------------------------
// initials
//----------------------------------------------
Rx.DOM.ready().subscribe(function () {
    // variable settngs
    var _name_action = $$FORM2_ACTION.value.toString();
    // setting for the initial graph
    document.getElementById('network-popUp_edge').style.display = 'none';
    Ac.NODES.add($$INITIAL_NODES);
    Ac.EDGES.add($$INITIAL_EDGES);
    var _initialAM = Ac.graph2actionObject(_name_action, Ac.NODES, Ac.EDGES); // (I). setting for the graph
    Ac.OPTION_ACTION.manipulation = {
        editEdge: false,
        deleteNode: function ($data, $callback) {
            Ac.watchRemoveNodefunction($data, $callback, Ac.NODES, Ac.EDGES);
        },
        deleteEdge: function ($data, $callback) {
            Ac.watchRemoveEdgeFunction($data, $callback, Ac.NODES, Ac.EDGES);
        },
        addNode: function ($data, $callback) {
            Ac.watchAddNodefunction($data, $callback, Ac.NODES, Ac.EDGES, Ac.$A1, Ac.$A2, Ac.$A3, Ac.$A4);
        },
        addEdge: function ($data, $callback) {
            Ac.watchAddEdgefunction($data, $callback, Ac.NODES, Ac.EDGES, Ac.$id_of_input_for_arrow_backup());
        }
    };
    // (II). draw the graph
    NETWORK_ACTION = new Vis.Network(Ac.$CONTAINER_ACTION, { nodes: Ac.NODES, edges: Ac.EDGES }, Ac.OPTION_ACTION);
    // 2. write TopPanel
    Ac.actionObject2writeTopPanel(_initialAM);
    Ac.ACTION_DATA.forEach(function (x) {
        // 3. add action to composition select
        Ac.addAction2compositionSelect(x.name, true);
        // 4. write action list
        $("#action_list").append(Ac.actionObject2string(x));
        // 5. action listにevent割り当て
        Ac.addEvent2actionList(x, Ac.NODES, Ac.EDGES);
    });
    // 6. check frame property
    checkFrameProperty(Ac.EDGES, Ac.NODES);
    // 7. overlay adding
    Ac.overlay4action(Ac.ACTION_DATA.map(function (x) { return x.name; }));
}, function (error) { return console.log(error); }, function () { return console.log('initialization completed'); });
//------------------------------------------------------------
// button_add
//------------------------------------------------------------
Rx.Observable.fromEvent($BUTTON_ADD_ACTION, 'click')
    .subscribe(function () {
    // open panel of action list
    $('#actionListPanel').show(500);
    var _nameInfo = $('#form2_action').val().toString();
    var _commentInfo = $('#textarea_comment').val().toString();
    var _fromInfo = $(".classOfPrecondition > .color_text_panel"); //e0
    var _toInfo = $(".classOfPrecondition > .precondition4state"); //top
    var _action_object = Ac.button2actionObject(_nameInfo, _commentInfo, _fromInfo, _toInfo, Ac.NODES, Ac.EDGES, Ac.ACTION_DATA);
    _action_object.caseOf({
        right: function (_am) {
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
            Ac.overlay4action(Ac.ACTION_DATA.map(function (x) { return x.name; }));
            // success message
            alert("new Action Model \"" + _am.name + "\" has been successfully added to Action Model List.");
        },
        left: function (errorMsg) { return console.log("error in events_action.ts (1): " + errorMsg); }
    });
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
//------------------------------------------------------------
// button for frme properties
//------------------------------------------------------------
function checkFrameProperty($edges, $nodes) {
    var sendingFrame = Ac.edges2relation($edges);
    var sendingJSON = {
        frame: sendingFrame,
        property: "",
        agents: _.uniq(_.map($edges.get(), function (x) { return x.label; })),
        domain: _.map($nodes.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input2.send(sendingJSON);
}
$ELM_FRAME.ports.output2.subscribe(function (model) {
    var ff = function (x, str) {
        if (x) {
            Util.writeDOM_html(str + "> .table1-yw4l", "&#10004;");
            $(str).css("background-color", "#DBEED3");
            $(str + "> .table1-yw4l").css("color", "#346B36"); //red
        }
        else {
            Util.writeDOM_html(str + "> .table1-yw4l", "&#10008;");
            $(str).css("background-color", "#F0D9D9");
            $(str + "> .table1-yw4l").css("color", "#A44644 "); //green
        }
    };
    ff(model.checkRef, '#result_isReflexive');
    ff(model.checkTra, '#result_isTransitive');
    ff(model.checkEuc, '#result_isEucleadian');
    ff(model.checkSym, '#result_isSymmetric');
    ff(model.checkSer, '#result_isSerial');
});
// button_check_frame_properties
Rx.Observable.fromEvent($BUTTON_CHECK_FRAME_PROPERTIES, 'click')
    .subscribe(function () { return checkFrameProperty(Ac.EDGES, Ac.NODES); }, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
// make it ref
Rx.Observable.fromEvent($BUTTON_MAKEITREFLEXIVE, 'click')
    .subscribe(function () {
    var sendingFrame = Ac.edges2relation(Ac.EDGES);
    var sendingJSON = {
        frame: sendingFrame,
        property: "T",
        // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
        agents: _.uniq(_.map(Ac.EDGES.get(), function (x) { return x.label; })),
        // agents: _.map(Ac.AGENT_LIST, (x: string[]) => _.nth(x, 0)),
        domain: _.map(Ac.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
// make it tra
Rx.Observable.fromEvent($BUTTON_MAKEITTRANSITIVE, 'click')
    .subscribe(function () {
    var _sendingFrame = Ac.edges2relation(Ac.EDGES);
    var _sendingJSON = {
        frame: _sendingFrame,
        property: "4",
        // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
        agents: _.uniq(_.map(Ac.EDGES.get(), function (x) { return x.label; })),
        domain: _.map(Ac.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(_sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
// make it symm
Rx.Observable.fromEvent($BUTTON_MAKEITSYMMETRIC, 'click')
    .subscribe(function () {
    var sendingFrame = Ac.edges2relation(Ac.EDGES);
    var sendingJSON = {
        frame: sendingFrame,
        property: "B",
        // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
        agents: _.uniq(_.map(Ac.EDGES.get(), function (x) { return x.label; })),
        domain: _.map(Ac.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
// make it tra
Rx.Observable.fromEvent($BUTTON_MAKEITEUCLEADIAN, 'click')
    .subscribe(function () {
    var _sendingFrame = Ac.edges2relation(Ac.EDGES);
    var _sendingJSON = {
        frame: _sendingFrame,
        property: "5",
        // agents: _.map(Ac.AGENT_COLOR, (x: Ac.AgentColor) => x.agent),
        agents: _.uniq(_.map(Ac.EDGES.get(), function (x) { return x.label; })),
        domain: _.map(Ac.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(_sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_FRAME.ports.output1.subscribe(function (model) {
    var ff = function (x) {
        return {
            label: x.agent,
            from: x.from,
            to: x.to,
            color: Ac.agColor(x.agent, Ac.AGENT_COLOR),
            id: x.from + "_" + x.to + "_" + x.agent
        };
    };
    var _addingEdges = _.map(model.resultProperty, ff);
    var _amName = $$FORM2_ACTION.value.toString();
    Ac.EDGES.update(_addingEdges);
    var _amobject = Ac.graph2actionObject(_amName, Ac.NODES, Ac.EDGES);
    Ac.actionObject2writeTopPanel(_amobject);
    checkFrameProperty(Ac.EDGES, Ac.NODES);
});
//------------------------------------------------------------
//------------------------------------------------------------
Rx.Observable.fromEvent($BUTTON_COMPOSITION_ACTION, 'click')
    .subscribe(function () {
    var _ac1 = $SELECT_COMPOSITION_ACTION1.value.toString();
    var _ac2 = $SELECT_COMPOSITION_ACTION2.value.toString();
    var _sendingJSON = {
        action1: Ac.acName2ac(_ac1, Ac.ACTION_DATA),
        action2: Ac.acName2ac(_ac2, Ac.ACTION_DATA),
    };
    $ELM_ACTION.ports.input1.send(_sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_ACTION.ports.output1.subscribe(function (model) {
    change_global_COMPOSED_ACTION(model);
    // console.log(Ac.ACTION_DATA) 
    Ac.actionObject2writeComposePanel(model);
});
//------------------------------------------------------------------------------------
// add action (composition)
//------------------------------------------------------------------------------------
// $COMP_BUTTON_ADD_ACTION.addEventListener('click', function () {
Rx.Observable.fromEvent($COMP_BUTTON_ADD_ACTION, 'click')
    .subscribe(function () {
    var _nameInfo = $('#comp_form2_action').val().toString();
    var _commentInfo = $('#comp_textarea_comment').val().toString();
    var _fromInfo = $(".classOfPrecondition > .color_text_panel");
    var _toInfo = $(".classOfPrecondition > .precondition4state");
    var _action_object = Ac.button2actionObject(_nameInfo, _commentInfo, _fromInfo, _toInfo, Ac.NODES, Ac.EDGES, Ac.ACTION_DATA);
    _action_object.caseOf({
        right: function (_am) {
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
            alert("new Action Model \"" + _am.name + "\" has been successfully added to Action Model List.");
        },
        left: function (errorMsg) { return console.log("error in events_action.ts (2): " + errorMsg); }
    });
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
//------------------------------------------------------------------------------------
// add action (random)
//------------------------------------------------------------------------------------
var NUM_OF_RANDOMAM = 0;
Rx.Observable.fromEvent($BUTTON_CREATE_RANDOM_ACTION, 'click')
    .subscribe(function () {
    var _numAgt = Number(document['form4agent_randomAM'].number_of_agent_randomAM.value);
    var _numAct = Number(document['form4act_randomAM'].number_of_act_randomAM.value);
    var _randomSeed = Date.now();
    $ELM_RANDOM_AM.ports.input1.send({
        numOfAgt: _numAgt,
        numOfAct: _numAct,
        randomSeed: _randomSeed
    });
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_RANDOM_AM.ports.output1.subscribe(function (model) {
    var _am = {
        name: model.name + String(NUM_OF_RANDOMAM),
        domain: model.domain,
        relation: model.relation,
        precondition: model.precondition,
        comment: "Random Action Model" + String(NUM_OF_RANDOMAM)
    };
    change_global_NUM_OF_RANDOMAM();
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
    alert("new Action Model \"" + _am.name + "\" has been successfully added to Action Model List.");
});
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
    reflect_checkbox();
});
// チェックボックスをチェックしたら発動2 reflexive arrowsを透明にする
$INPUT_CHECK_ACTION2.addEventListener('change', function () {
    CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_action').prop('checked');
    if (CHECK_INVISIBLE_ARROWS) {
        _.chain(Ac.EDGES.get())
            .filter(function (x) { if (x.from === x.to) {
            return true;
        }
        else {
            return false;
        } })
            .forEach(function (y) { return Ac.EDGES.update({ id: y.id, color: Ac.$$BACKGROUND_COLOR, font: { color: Ac.$$BACKGROUND_COLOR } }); })
            .value();
    }
    else {
        _.chain(Ac.EDGES.get())
            .filter(function (x) { if (x.from === x.to) {
            return true;
        }
        else {
            return false;
        } })
            .forEach(function (y) { return Ac.EDGES.update({ id: y.id, color: Ac.agColor(y.label, Ac.AGENT_COLOR), font: { color: "black" } }); })
            .value();
    }
});
// node type
$INPUT_NODETYPE_CHECK_ACTION.on('change', function () {
    NODE_TYPE = document.querySelector("input[name='nodeType_check_action']:checked").value;
    if (NODE_TYPE === 'type1') {
        NETWORK_ACTION.setOptions({ nodes: { shape: 'ellipse' } });
    }
    else if (NODE_TYPE === 'type2') {
        NETWORK_ACTION.setOptions({ nodes: { shape: 'dot' } });
    }
});
$('#checkbox_hierarchical_action_auto').on("change", function () {
    CHECK_HIERARCHICAL_ACTION = $('#checkbox_hierarchical_action_auto').prop('checked');
    if (CHECK_HIERARCHICAL_ACTION) {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: { enabled: true } } });
    }
    else {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: false } });
    }
    reflect_checkbox();
});
$('#checkbox_physics_action').on("change", function () {
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_action').prop('checked');
    NETWORK_ACTION.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } });
    reflect_checkbox();
});
$("#gravitationalConstant_action").on('change', function () {
    var range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.gravitationalConstant = range_value;
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION);
    reflect_checkbox();
});
$("#centralGravity_action").on('change', function () {
    var range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.centralGravity = range_value;
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION);
    reflect_checkbox();
});
$("#springLength_action").on('change', function () {
    var range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.springLength = range_value;
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION);
    reflect_checkbox();
});
$("#springConstant_action").on('change', function () {
    var range_value = Number($(this).val());
    Ac.OPTION_ACTION.physics.barnesHut.springConstant = range_value;
    NETWORK_ACTION.setOptions(Ac.OPTION_ACTION);
    reflect_checkbox();
});
function reflect_checkbox() {
    // CHECK_STRAOGHT_LINE
    CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_action').prop('checked');
    NETWORK_ACTION.setOptions({ edges: { smooth: !CHECK_STRAIGHT_LINE } });
    // CHECK_HIERARCHICAL_ACTION
    CHECK_HIERARCHICAL_ACTION = $('#checkbox_hierarchical_action_auto').prop('checked');
    if (CHECK_HIERARCHICAL_ACTION) {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: { enabled: true } } });
    }
    else {
        NETWORK_ACTION.setOptions({ layout: { hierarchical: false } });
    }
    // CHECK_PHYSICS_ENABLE
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_action').prop('checked');
    NETWORK_ACTION.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } });
}
//----------------------------------------------------------------------------------------
// keyup 
//----------------------------------------------------------------------------------------
// setting (write figure's title) 
$$FORM2_ACTION.addEventListener('keyup', function () {
    var name_action = $$FORM2_ACTION.value.toString();
    Util.writeDOM_html('#actionNameOnGraph')(name_action);
});
//------------------------------------------------------------
// download the action list
//------------------------------------------------------------
Rx.Observable.fromEvent($EXPORT_ACTION_MODELS, 'click')
    .subscribe(function () {
    var FOR_DOWNLOAD = _.map(Ac.ACTION_DATA, function (x) { return JSON.stringify(x, null, "\t"); });
    var _link = document.createElement('a');
    _link.href = window.URL.createObjectURL(new Blob(["[" + FOR_DOWNLOAD + "]"]));
    _link.download = "ActionModels.json";
    _link.click();
}, function (error) { return console.log(error); }, function () { return console.log('drawandwritenewgraph completed'); });
//------------------------------------------------------------
//action_sample1
$ACTION_SAMPLE1.addEventListener('click', function () {
    Ac.ajax_output('./src/files/AModels/MayReada.json');
});
$ACTION_SAMPLE2.addEventListener('click', function () {
    Ac.ajax_output('./src/files/AModels/MayReada.json');
});
//--------------------------------------------------------------
//load json (action models)
//--------------------------------------------------------------
Rx.Observable.fromEvent($FILE_ACTION, 'change')
    .subscribe(function () {
    if (window.File) {
        var _input = document.querySelector('#file_action').files[0];
        var _reader_1 = new FileReader();
        var _json2html = function () { return Ac.json2actionData(JSON.parse(_reader_1.result)); };
        _reader_1.addEventListener('load', _json2html, true);
        _reader_1.readAsText(_input, 'UTF-8');
        alert("load succeeded. See Action Model List.");
    }
}, function (error) { return console.log(error); }, function () { return console.log('load completed'); });
