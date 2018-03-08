"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx = require("rx-dom");
var _ = require("lodash");
var Kr = require("./vis_kripke");
var Vis = require("../lib/vis");
var Util = require("../lib/util");
var Elm_frame = require("../frame/elmFunctions_frame");
var Elm_randomKM = require("../action/elmFunctions_randomAM");
var Elm_truthChecker = require("./elmFunctions_truthChecker");
var Ac = require("../action/vis_action");
var $$FORM2_KRIPKE = document.querySelector('#form2_kripke');
var $BUTTON_CHECK_FRAME_PROPERTIES = document.querySelector('#button_check_frame_properties_kripke');
var $BUTTON_MAKEITREFLEXIVE = document.querySelector('#button_makeItReflexive_kripke');
var $BUTTON_MAKEITTRANSITIVE = document.querySelector('#button_makeItTransitive_kripke');
var $BUTTON_MAKEITSYMMETRIC = document.querySelector('#button_makeItSymmetric_kripke');
var $BUTTON_MAKEITEUCLEADIAN = document.querySelector('#button_makeItEucleadian_kripke');
var $BUTTON_COMPOSITION_KRIPKE_PAL = document.querySelector('#button_composition_kripke_pal');
var $BUTTON_COMPOSITION_KRIPKE_DEL = document.querySelector("#button_composition_kripke_DEL");
var $KRIPKE_SAMPLE1 = document.querySelector('#kripke_sample1');
var $KRIPKE_SAMPLE2 = document.querySelector('#kripke_sample2');
var $EXPORT_KRIPKE_MODELS = document.querySelector('#export_kripke_models');
var $BUTTON_ADD_KRIPKE = document.querySelector("#button_add_kripke");
var $BUTTON_ADD_ATOM = document.querySelector("#button_add_atom");
var $SELECT_COMPOSITION_KRIPKE1 = document.querySelector('#select_composition_kripke1');
var $INPUT_TEXT_FOR_MODIFYKM_PAL = document.querySelector('#input_text_for_modifyKM_pal');
var $SELECT_COMPOSITION_KRIPKE1_PAL = document.querySelector('#select_composition_kripke1_pal');
var $SELECT_COMPOSITION_KRIPKE1_DEL = document.querySelector('#select_composition_kripke1_DEL');
var $SELECT_COMPOSITION_ACTION1_DEL = document.querySelector('#select_composition_action1_DEL');
var $SELECT_KRIPKE_FOR_TRUTHCHECKER = document.querySelector('#select_kripke_for_truthChecker');
var $SELECT_WORLD_FOR_TRUTHCHECKER = document.querySelector('#select_world_for_truthChecker');
var $BUTTON_TRUTH_CHECK_PAL = document.querySelector('#button_truth_check_pal');
var $BUTTON_COMPOSITION_KRIPKE = document.querySelector('#button_composition_kripke');
var $BUTTON_CREATE_RANDOM_KRIPKE = document.querySelector("#button_create_random_kripke");
var $INPUT_CHECK_KRIPKE = document.querySelector('input[name="check_kripke"]');
var $INPUT_CHECK_KRIPKE2 = document.querySelector('input[name="check_kripke2"]');
var $INPUT_NODETYPE_CHECK_KRIPKE = $('input[name="nodeType_check_kripke"]:radio');
var $FILE_KRIPKE = document.querySelector("#file_kripke");
var $ELM_FRAME = Elm_frame.ElmFunctions_frame.embed(document.getElementById('elm_frame'));
var $ELM_TRUTHcHECKER = Elm_truthChecker.ElmFunctions_truthChecker.embed(document.getElementById('elm_truthChecker'));
var $$INITIAL_NODES = [
    { label: "w0", id: "w0", font: { multi: true } },
    { label: "w1", id: "w1" },
    { label: "w2", id: "w2" }
];
var $$INITIAL_EDGES = [
    { from: "w1", to: "w1", label: "a", id: "w1_w1_a", color: Ac.agColor("a", Kr.AGENT_COLOR_K) },
    { from: "w0", to: "w1", label: "a", id: "w0_w1_a", color: Ac.agColor("a", Kr.AGENT_COLOR_K) },
    { from: "w0", to: "w2", label: "b", id: "w0_w2_b", color: Ac.agColor("b", Kr.AGENT_COLOR_K) },
];
var CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_kripke').prop('checked');
var CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_kripke').prop('checked');
var NODE_TYPE = document.querySelector("input[name='nodeType_check_kripke']:checked").value;
var CHECK_PHYSICS_ENABLE = $('#checkbox_physics_kripke').prop('checked');
var CHECK_HIERARCHICAL_KRIPKE = $('#checkbox_hierarchical_kripke_auto').prop('checked');
var COMPOSED_KRIPKE;
var NETWORK_KRIPKE;
var NUM_OF_RANDOMKM = 0;
function change_global_KRIPKE_DATA($add) {
    Kr.KRIPKE_DATA.push($add);
}
exports.change_global_KRIPKE_DATA = change_global_KRIPKE_DATA;
function change_global_COMPOSED_KRIPKE($model) {
    COMPOSED_KRIPKE = $model;
}
exports.change_global_COMPOSED_KRIPKE = change_global_COMPOSED_KRIPKE;
function change_global_NUM_OF_RANDOMKM() {
    NUM_OF_RANDOMKM = NUM_OF_RANDOMKM + 1;
}
exports.change_global_NUM_OF_RANDOMKM = change_global_NUM_OF_RANDOMKM;
Rx.DOM.ready().subscribe(function () {
    var _name_kripke = $$FORM2_KRIPKE.value.toString();
    document.getElementById('network-popUp_edge_kripke').style.display = 'none';
    Kr.NODES.add($$INITIAL_NODES);
    Kr.EDGES.add($$INITIAL_EDGES);
    var _change_valuation_in_topPanel = true;
    var _initialAM = Kr.graph2kripkeObject(_name_kripke, Kr.NODES, Kr.EDGES);
    Kr.OPTION_KRIPKE.manipulation = {
        editEdge: false,
        deleteNode: function ($data, $callback) {
            Kr.watchRemoveNodefunction($data, $callback, Kr.NODES, Kr.EDGES);
        },
        deleteEdge: function ($data, $callback) {
            Kr.watchRemoveDeletefunction($data, $callback, Kr.NODES, Kr.EDGES);
        },
        addNode: function ($data, $callback) {
            Kr.watchAddNodefunction($data, $callback, Kr.NODES, Kr.EDGES);
        },
        addEdge: function ($data, $callback) {
            Kr.watchAddEdgefunction($data, $callback, Kr.NODES, Kr.EDGES, Kr.$id_of_input_for_arrow_backup_kripke());
        }
    };
    NETWORK_KRIPKE = new Vis.Network(Kr.$CONTAINER_KRIPKE, { nodes: Kr.NODES, edges: Kr.EDGES }, Kr.OPTION_KRIPKE);
    Kr.kripkeObject2writeTopPanel(_initialAM, !_change_valuation_in_topPanel);
    Kr.KRIPKE_DATA.forEach(function (x) {
        Kr.addKripke2compositionSelect(x.name, true);
        $("#kripke_list").append(Kr.kripkeObject2string(x));
        Kr.addEvent2kripkeList(x, Kr.NODES, Kr.EDGES, _change_valuation_in_topPanel);
    });
    Kr.addWorlds2worldSelect_for_truthChecker($SELECT_KRIPKE_FOR_TRUTHCHECKER.value, Kr.KRIPKE_DATA);
    checkFrameProperty(Kr.EDGES, Kr.NODES);
    MathJax.Hub.Typeset();
}, function (error) { return console.log(error); }, function () { return console.log('initialization for Kripke Model completed'); });
Rx.Observable.fromEvent($BUTTON_COMPOSITION_KRIPKE_PAL, 'click')
    .subscribe(function () {
    var _km = $SELECT_COMPOSITION_KRIPKE1_PAL.value.toString();
    var _model = Kr.kmName2km(_km, Kr.KRIPKE_DATA);
    var _formula = $INPUT_TEXT_FOR_MODIFYKM_PAL.value;
    var _sendingModel = {
        kripkeModel: _model,
        actionModel: { name: "", domain: [], relation: [], precondition: [], comment: "" },
        world: "",
        formula: _formula,
        actionList: []
    };
    $ELM_TRUTHcHECKER.ports.input2_modifyKM_PAL.send(_sendingModel);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_TRUTHcHECKER.ports.output2_modifyKM_PAL.subscribe(function ($output) {
    var _km = _.head($output.modifiedKM);
    if ($output.modifiedKM === undefined) {
        alert($output.error);
    }
    else if (_.every(Kr.KRIPKE_DATA, function (x) { return x.name !== _km.name; })) {
        change_global_KRIPKE_DATA(_km);
        Kr.addKripke2compositionSelect(_km.name, false);
        $("#kripke_list_PAL").append(Kr.kripkeObject2string(_km));
        $("#kripke_list").append(Kr.kripkeObject2string(_km));
        Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
        MathJax.Hub.Typeset();
    }
    else {
        alert("The name \"" + _km.name + "\" already exists in the list. Change the name.");
    }
});
Rx.Observable.fromEvent($BUTTON_COMPOSITION_KRIPKE_DEL, 'click')
    .subscribe(function () {
    var _km = $SELECT_COMPOSITION_KRIPKE1_DEL.value.toString();
    var _am = $SELECT_COMPOSITION_ACTION1_DEL.value.toString();
    var _kmodel = Kr.kmName2km(_km, Kr.KRIPKE_DATA);
    var _amodel = Ac.acName2ac(_am, Ac.ACTION_DATA);
    var _sendingModel = {
        kripkeModel: _kmodel,
        actionModel: _amodel,
        world: "",
        formula: "",
        actionList: Ac.ACTION_DATA
    };
    $ELM_TRUTHcHECKER.ports.input3_modifyKM_DEL.send(_sendingModel);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_TRUTHcHECKER.ports.output3_modifyKM_DEL.subscribe(function ($output) {
    var _km = _.head($output.modifiedKM);
    if ($output.modifiedKM === undefined) {
        alert($output.error);
    }
    else if (_.every(Kr.KRIPKE_DATA, function (x) { return x.name !== _km.name; })) {
        change_global_KRIPKE_DATA(_km);
        Kr.addKripke2compositionSelect(_km.name, false);
        $("#kripke_list_DEL").append(Kr.kripkeObject2string(_km));
        $("#kripke_list").append(Kr.kripkeObject2string(_km));
        Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
        MathJax.Hub.Typeset();
    }
    else {
        alert("The name \"" + _km.name + "\" already exists in the list. Change the name.");
    }
});
Rx.Observable.fromEvent($BUTTON_ADD_KRIPKE, 'click')
    .subscribe(function () {
    $('#kripkeListPanel').show(500);
    var _nameInfo = $('#form2_kripke').val().toString();
    var _commentInfo = $('#textarea_comment_kripke').val().toString();
    var _fromInfo = $(".classOfPrecondition_kripke > .color_text_panel_kripke");
    var _toInfo = $(".classOfPrecondition_kripke > .precondition4state_kripke");
    var _km = Kr.button2kripkeObject(_nameInfo, _commentInfo, _fromInfo, _toInfo, Kr.NODES, Kr.EDGES, Kr.KRIPKE_DATA);
    if (_.every(Kr.KRIPKE_DATA, function (x) { return x.name !== _km.name; })) {
        change_global_KRIPKE_DATA(_km);
        Kr.addKripke2compositionSelect(_km.name, false);
        $("#kripke_list").append(Kr.kripkeObject2string(_km));
        $("#kripke_list_editor").append(Kr.kripkeObject2string(_km));
        Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
        MathJax.Hub.Typeset();
        alert("new Kripke Model \"" + _km.name + "\" has been successfully added to Kripke Model List.");
    }
    else {
        alert("The name \"" + _km.name + "\" already exists in the list. Change the name.");
    }
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
Rx.Observable.fromEvent($BUTTON_TRUTH_CHECK_PAL, 'click')
    .subscribe(function () {
    var _km = $SELECT_KRIPKE_FOR_TRUTHCHECKER.value.toString();
    var _model = Kr.kmName2km(_km, Kr.KRIPKE_DATA);
    var _world = $SELECT_WORLD_FOR_TRUTHCHECKER.value.toString();
    var _formula = $('#input_formula_for_check').val().toString();
    var _sendingModel = {
        kripkeModel: _model,
        actionModel: { name: "", domain: [], relation: [], precondition: [], comment: "" },
        world: _world,
        formula: _formula,
        actionList: []
    };
    console.log(_sendingModel);
    $ELM_TRUTHcHECKER.ports.input1_truthCheck_PAL.send(_sendingModel);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_TRUTHcHECKER.ports.output1_truthCheck_PAL.subscribe(function (model) {
    var _formula = model.formulaBool.formula;
    var _bool = model.formulaBool.maybeBool;
    var _km = model.modelName;
    var _err = model.error;
    var _atoms = model.atomBool;
    var _world = model.world;
    var h = function () {
        if (_bool === "true") {
            return "<li><span style=\"color:#346B36\">&#10004;</span> <span class=\"colorOfSuccess\">" + _formula + "</span> (" + _km + ", " + _world + ")</li>";
        }
        else if (_bool === "false") {
            return "<li><span style=\"color:#A44644\">&#10008;</span> <span class=\"colorOfError\">" + _formula + "</span> (" + _km + ", " + _world + ")</li>";
        }
    };
    var hh = function ($bool, $world) {
        if (($bool === 'false') && ($world === 'any')) {
            return "some world";
        }
        else if (($bool === 'true') && ($world === 'any')) {
            return "any world";
        }
        return $world;
    };
    var ff = function ($bool) {
        if ($bool === "true") {
            return "<li><span style=\"color:#346B36\">&#10004; </span><span  class=\"colorOfSuccess\">formula " + _formula + ": " + $bool + " at " + hh($bool, _world) + "</span></li>";
        }
        else if ($bool === "false") {
            return "<li><span style=\"color:#A44644\">&#10008; </span><span  class=\"colorOfError\">formula " + _formula + ": " + $bool + " at " + hh($bool, _world) + "</span></li>";
        }
        else {
            return "<li class=\"colorOfWarning\">" + _err + "</li>";
        }
    };
    var gg = function ($atomBool) {
        var _atom = $atomBool.atom;
        var _bool = $atomBool.maybeBool;
        if (_bool === "true") {
            return "<li><span style=\"color:#346B36\">&#10004; </span><span  class=\"colorOfSuccess\">atom " + _atom + ": " + _bool + " at " + hh(_bool, _world) + "</span</li>";
        }
        else if (_bool === "false") {
            return "<li><span style=\"color:#A44644\">&#10008; </span><span  class=\"colorOfError\">atom " + _atom + ": " + _bool + " at " + hh(_bool, _world) + "</span</li>";
        }
        else {
            return "<li class=\"colorOfWarning\">" + _atom + "</li>";
        }
    };
    $("#results_check_formula_html").empty();
    _.forEach(_atoms, function (x) {
        $("#results_check_formula_html").append(gg(x));
    });
    $("#results_check_formula_html").append(ff(_bool));
    $("#results_check_formula").append(h());
});
$SELECT_KRIPKE_FOR_TRUTHCHECKER.addEventListener('change', function () {
    var chosenKripke = $SELECT_KRIPKE_FOR_TRUTHCHECKER.value.toString();
    var kmDom = Kr.kmName2km(chosenKripke, Kr.KRIPKE_DATA).domain;
    $("#select_world_for_truthChecker").empty();
    $("#select_world_for_truthChecker").append("<option value=\"any\" selected>any</option>");
    _.forEach(kmDom, function (x) {
        $("#select_world_for_truthChecker").append("<option>" + x + "</option>");
    });
});
Rx.Observable.fromEvent($BUTTON_ADD_ATOM, 'click')
    .subscribe(function () {
    var atom = $('#kripke_valuation')[0].childElementCount;
    var h = "<li class='classOfPrecondition'>Value(" +
        ("<span class='color_text_panel'> p" + atom.toString() + " </span>) = { ") +
        "<input type='text' class='precondition4state input_width_small'> }" +
        "</li>";
    $("#kripke_valuation").append(h);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
function checkFrameProperty($edges, $nodes) {
    var sendingFrame = Kr.edges2relation($edges);
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
            $(str + "> .table1-yw4l").css("color", "#346B36");
        }
        else {
            Util.writeDOM_html(str + "> .table1-yw4l", "&#10008;");
            $(str).css("background-color", "#F0D9D9");
            $(str + "> .table1-yw4l").css("color", "#A44644 ");
        }
    };
    ff(model.checkRef, '#result_isReflexive_kripke');
    ff(model.checkTra, '#result_isTransitive_kripke');
    ff(model.checkEuc, '#result_isEucleadian_kripke');
    ff(model.checkSym, '#result_isSymmetric_kripke');
    ff(model.checkSer, '#result_isSerial_kripke');
});
Rx.Observable.fromEvent($BUTTON_CHECK_FRAME_PROPERTIES, 'click')
    .subscribe(function () { return checkFrameProperty(Kr.EDGES, Kr.NODES); }, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
Rx.Observable.fromEvent($BUTTON_MAKEITREFLEXIVE, 'click')
    .subscribe(function () {
    var sendingFrame = Kr.edges2relation(Kr.EDGES);
    var sendingJSON = {
        frame: sendingFrame,
        property: "T",
        agents: _.uniq(_.map(Kr.EDGES.get(), function (x) { return x.label; })),
        domain: _.map(Kr.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
Rx.Observable.fromEvent($BUTTON_MAKEITTRANSITIVE, 'click')
    .subscribe(function () {
    var _sendingFrame = Kr.edges2relation(Kr.EDGES);
    var _sendingJSON = {
        frame: _sendingFrame,
        property: "4",
        agents: _.uniq(_.map(Kr.EDGES.get(), function (x) { return x.label; })),
        domain: _.map(Kr.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(_sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
Rx.Observable.fromEvent($BUTTON_MAKEITSYMMETRIC, 'click')
    .subscribe(function () {
    var sendingFrame = Kr.edges2relation(Kr.EDGES);
    var sendingJSON = {
        frame: sendingFrame,
        property: "B",
        agents: _.uniq(_.map(Kr.EDGES.get(), function (x) { return x.label; })),
        domain: _.map(Kr.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
Rx.Observable.fromEvent($BUTTON_MAKEITEUCLEADIAN, 'click')
    .subscribe(function () {
    var _sendingFrame = Kr.edges2relation(Kr.EDGES);
    var _sendingJSON = {
        frame: _sendingFrame,
        property: "5",
        agents: _.uniq(_.map(Kr.EDGES.get(), function (x) { return x.label; })),
        domain: _.map(Kr.NODES.get(), function (x) { return x.label; }),
    };
    $ELM_FRAME.ports.input1.send(_sendingJSON);
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_FRAME.ports.output1.subscribe(function (model) {
    var ff = function (x) {
        return {
            label: x.agent,
            from: x.from,
            to: x.to,
            color: Ac.agColor(x.agent, Kr.AGENT_COLOR_K),
            id: x.from + "_" + x.to + "_" + x.agent
        };
    };
    var _addingEdges = _.map(model.resultProperty, ff);
    var _kmName = $$FORM2_KRIPKE.value.toString();
    Kr.EDGES.update(_addingEdges);
    var _kmobject = Kr.graph2kripkeObject(_kmName, Kr.NODES, Kr.EDGES);
    Kr.kripkeObject2writeTopPanel(_kmobject, false);
    checkFrameProperty(Kr.EDGES, Kr.NODES);
});
var $ELM_RANDOM_KM = Elm_randomKM.ElmFunctions_randomAM.embed(document.getElementById('elm_randomAM'));
Rx.Observable.fromEvent($BUTTON_CREATE_RANDOM_KRIPKE, 'click')
    .subscribe(function () {
    var _numAgt = Number(document['form4agent_randomKM'].number_of_agent_randomKM.value);
    var _numAct = Number(document['form4act_randomKM'].number_of_act_randomKM.value);
    var _randomSeed = Date.now();
    $ELM_RANDOM_KM.ports.input2.send({
        numOfAgt: _numAgt,
        numOfAct: _numAct,
        randomSeed: _randomSeed
    });
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph, completed'); });
$ELM_RANDOM_KM.ports.output2.subscribe(function (model) {
    var _km = {
        name: model.name + String(NUM_OF_RANDOMKM),
        domain: model.domain,
        relation: model.relation,
        valuation: model.valuation,
        comment: "Random Kripke Model" + String(NUM_OF_RANDOMKM)
    };
    change_global_NUM_OF_RANDOMKM();
    change_global_KRIPKE_DATA(_km);
    Kr.addKripke2compositionSelect(_km.name, false);
    $("#kripke_list").append(Kr.kripkeObject2string(_km));
    $("#kripke_list_random").append(Kr.kripkeObject2string(_km));
    Kr.addEvent2kripkeList(_km, Kr.NODES, Kr.EDGES, true);
    MathJax.Hub.Typeset();
    alert("new Kripke Model \"" + _km.name + "\" has been successfully added to Kripke Model List.");
});
$INPUT_CHECK_KRIPKE.addEventListener('change', function () {
    CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ edges: { smooth: !CHECK_STRAIGHT_LINE } });
    reflect_checkbox();
});
$INPUT_CHECK_KRIPKE2.addEventListener('change', function () {
    CHECK_INVISIBLE_ARROWS = $('#checkbox_invisibleArrows_kripke').prop('checked');
    if (CHECK_INVISIBLE_ARROWS) {
        _.chain(Kr.EDGES.get())
            .filter(function (x) { if (x.from === x.to) {
            return true;
        }
        else {
            return false;
        } })
            .forEach(function (y) { return Kr.EDGES.update({ id: y.id, color: Kr.$$BACKGROUND_COLOR, font: { color: Kr.$$BACKGROUND_COLOR } }); })
            .value();
    }
    else {
        _.chain(Kr.EDGES.get())
            .filter(function (x) { if (x.from === x.to) {
            return true;
        }
        else {
            return false;
        } })
            .forEach(function (y) { return Kr.EDGES.update({ id: y.id, color: Ac.agColor(y.label, Kr.AGENT_COLOR_K), font: { color: "black" } }); })
            .value();
    }
});
$INPUT_NODETYPE_CHECK_KRIPKE.on('change', function () {
    NODE_TYPE = document.querySelector("input[name='nodeType_check_kripke']:checked").value;
    if (NODE_TYPE === 'type1') {
        NETWORK_KRIPKE.setOptions({ nodes: { shape: 'ellipse' } });
    }
    else if (NODE_TYPE === 'type2') {
        NETWORK_KRIPKE.setOptions({ nodes: { shape: 'dot' } });
    }
});
$('#checkbox_hierarchical_kripke_auto').on("change", function () {
    CHECK_HIERARCHICAL_KRIPKE = $('#checkbox_hierarchical_kripke_auto').prop('checked');
    if (CHECK_HIERARCHICAL_KRIPKE) {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: { enabled: true } } });
    }
    else {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: false } });
    }
    reflect_checkbox();
});
$('#checkbox_physics_kripke').on("change", function () {
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } });
    reflect_checkbox();
});
$("#gravitationalConstant_kripke").on('change', function () {
    var range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.gravitationalConstant = range_value;
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE);
    reflect_checkbox();
});
$("#centralGravity_kripke").on('change', function () {
    var range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.centralGravity = range_value;
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE);
    reflect_checkbox();
});
$("#springLength_kripke").on('change', function () {
    var range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.springLength = range_value;
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE);
    reflect_checkbox();
});
$("#springConstant_kripke").on('change', function () {
    var range_value = Number($(this).val());
    Kr.OPTION_KRIPKE.physics.barnesHut.springConstant = range_value;
    NETWORK_KRIPKE.setOptions(Kr.OPTION_KRIPKE);
    reflect_checkbox();
});
function reflect_checkbox() {
    CHECK_STRAIGHT_LINE = $('#checkbox_hierarchical_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ edges: { smooth: !CHECK_STRAIGHT_LINE } });
    CHECK_HIERARCHICAL_KRIPKE = $('#checkbox_hierarchical_kripke_auto').prop('checked');
    if (CHECK_HIERARCHICAL_KRIPKE) {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: { enabled: true } } });
    }
    else {
        NETWORK_KRIPKE.setOptions({ layout: { hierarchical: false } });
    }
    CHECK_PHYSICS_ENABLE = $('#checkbox_physics_kripke').prop('checked');
    NETWORK_KRIPKE.setOptions({ physics: { enabled: CHECK_PHYSICS_ENABLE } });
}
$$FORM2_KRIPKE.addEventListener('keyup', function () {
    var _name_kripke = $$FORM2_KRIPKE.value.toString();
    Util.writeDOM_html('#kripkeNameOnGraph')(_name_kripke);
});
Rx.Observable.fromEvent($EXPORT_KRIPKE_MODELS, 'click')
    .subscribe(function () {
    var FOR_DOWNLOAD = _.map(Kr.KRIPKE_DATA, function (x) { return JSON.stringify(x, null, "\t"); });
    var _link = document.createElement('a');
    _link.href = window.URL.createObjectURL(new Blob(["[" + FOR_DOWNLOAD + "]"]));
    _link.download = "KripkeModels.json";
    _link.click();
}, function (error) { return console.log(error); }, function () { return console.log('drawand write new graph completed'); });
$KRIPKE_SAMPLE1.addEventListener('click', function () {
    Kr.ajax_output('./files/KModels/MuddyChildren.json');
});
$KRIPKE_SAMPLE2.addEventListener('click', function () {
    Kr.ajax_output('./files/AModels/MayReada.json');
});
Rx.Observable.fromEvent($FILE_KRIPKE, 'change')
    .subscribe(function () {
    if (window.File) {
        var _input = document.querySelector('#file_kripke').files[0];
        var reader_1 = new FileReader();
        var _json2html = function () { return Kr.json2kripkeData(JSON.parse(reader_1.result)); };
        reader_1.addEventListener('load', _json2html, true);
        reader_1.readAsText(_input, 'UTF-8');
        alert("load succeeded. See Kripke Model List.");
    }
}, function (error) { return console.log(error); }, function () { return console.log('load completed'); });
function chosenKM_for_select_world_for_truthChecker() {
    var _chosenKripke = document.querySelector('#select_kripke_for_truthChecker').value.toString();
    var _kmDom = Kr.kmName2km(_chosenKripke, Kr.KRIPKE_DATA).domain;
    $("#select_world_for_truthChecker").empty();
    $("#select_world_for_truthChecker").append("<option value=\"any\" selected>any</option>");
    _.forEach(_kmDom, function (x) {
        $("#select_world_for_truthChecker").append("<option>" + x + "</option>");
    });
}
var multilineSelectmenu_kripke = $.widget("ui.multilineSelectmenu", $.ui.selectmenu, {
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
        }
        else {
            element.html("&#160;");
        }
    }
});
var multilineSelectmenu_action = $.widget("ui.multilineSelectmenu_action", $.ui.selectmenu, {
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
        }
        else {
            element.html("&#160;");
        }
    }
});
