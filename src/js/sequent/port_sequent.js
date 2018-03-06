"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as VA from "../action/vis_action"
var vis_action_1 = require("../action/vis_action");
// import * as Vis from '../lib/vis';
var Vis = require("../lib/vis");
var _ = require("lodash");
// import * as $ from 'jquery';
var Elm_sequent = require("./elmFunctions_sequent");
// declare let Elm: any; elm
var elm_main_sequent = Elm_sequent.ElmFunctions_sequent.embed(document.getElementById('elm_sequent'));
//----------------------------------------
// global variable
//----------------------------------------
exports.NODES_SEQ = new Vis.DataSet();
exports.EDGES_SEQ = new Vis.DataSet();
//------------------------------------------------------------------------------------------------
// radio check & innerHTML
//------------------------------------------------------------------------------------------------
// for el system
function EL_system_string() {
    // const value = $("input[name='el_system']:checked").val();
    var value = document.getElementsByClassName("select_logic_for_labelled")[0].innerHTML;
    switch (value) {
        case "EL":
            $(".radio_el_system").html("EL");
            $(".radio_el_sysem2").html("knowledge operator #");
            break;
        case "PAL":
            $(".radio_el_system").html("PAL");
            $(".radio_el_system2").html("announcement operator [.]");
            break;
        case "IntPAL":
            $(".radio_el_system").html("IntPAL");
            $(".radio_el_system2").html("announcement operator [.]");
            break;
        case "DEL":
            $(".radio_el_system").html("DEL");
            $(".radio_el_system2").html("action operator [.]");
            break;
        default:
            $(".radio_el_system").html(".radio_el_system");
            $(".radio_el_system2").html(".radio_el_system2");
            break;
    }
}
exports.EL_system_string = EL_system_string;
function Modal_system_string() {
    var ff = function () {
        return $(this).val();
    };
    var list_modal_system = $('[class="modal_system"]:checked').map(ff).get().join('');
    $(".select_modal_system").html(list_modal_system);
}
exports.Modal_system_string = Modal_system_string;
//----------------------------------------
// example formulas
//----------------------------------------
function replace_string($event) {
    return _.chain($event)
        .thru(function (x) { return x.target.innerHTML.replace(/&gt;/g, '>'); })
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
        .value();
}
exports.replace_string = replace_string;
;
//------------------------------------------
// draw 証明図
//------------------------------------------
var $LEVEL_SEPARATION_INPUT = document.getElementById("levelSeparation");
var $NODE_SPACING_INPUT = document.getElementById("nodeSpacing");
var $DIRECTION_INPUT = "DU";
// (document.getElementById("direction") as HTMLInputElement)
var $SORT_METHOD_INPUT = "directed";
//  (document.getElementById("sortMethod") as HTMLInputElement)
exports.OPTIONS = {
    physics: {
        enabled: false,
        repulsion: {
            springLength: 2000
        }
    },
    layout: {
        hierarchical: {
            levelSeparation: Number($LEVEL_SEPARATION_INPUT.value),
            nodeSpacing: Number($NODE_SPACING_INPUT.value),
            direction: $DIRECTION_INPUT,
            sortMethod: $SORT_METHOD_INPUT
        }
    },
    edges: {
        smooth: false,
        arrows: {
            to: false,
            from: false,
        }
    },
    nodes: {
        shape: 'box',
        font: {
            boldital: { color: '#CD2F77' },
            ital: { color: '#656ABD' },
            mono: { color: '#26978D' },
            bold: { color: '#1A85FF' } // label
        }
    }
};
// event: example setting
function funcInput($event) {
    var id_input_formula = document.getElementById("input_formula");
    id_input_formula.value = replace_string($event);
    send_info2elm_proof_draw();
}
exports.funcInput = funcInput;
//-------------------------------------
// setting for vis.js
//-------------------------------------
function makeEdgesFromElm($vismodel) {
    var listOfEdges = [];
    for (var i = 0; i < $vismodel.edges.length; i++) {
        listOfEdges[i] = {
            from: $vismodel.edges[i].from,
            to: $vismodel.edges[i].to,
            label: $vismodel.edges[i].label
        };
    }
    return listOfEdges;
} // end of def  
exports.makeEdgesFromElm = makeEdgesFromElm;
function makeNodesFromElm($vismodel) {
    var listOfNodes = [];
    for (var i = 0; i < $vismodel.nodes.length; i++) {
        listOfNodes[i] = {
            id: $vismodel.nodes[i].id,
            label: $vismodel.nodes[i].label,
            title: $vismodel.nodes[i].label,
            font: { multi: true } // color and bold arrow of Sequent  <b>==></b> in Common_sequent.elm 1003
        };
        if ($vismodel.nodes[i].color === 0) {
            listOfNodes[i].color = '#f0d9d9';
        }
        else if ($vismodel.nodes[i].color === 1) {
            listOfNodes[i].color = '#c1f0c1';
        }
        else if ($vismodel.nodes[i].color === 2) {
            listOfNodes[i].color = '#DDDA62';
        }
        else if ($vismodel.nodes[i].color === 3) {
            listOfNodes[i].color = '#FDF4DF';
        }
        else if ($vismodel.nodes[i].color === 9) {
            listOfNodes[i].color = '#FFA85A'; // oranges
        }
    }
    return listOfNodes;
} // end of def
exports.makeNodesFromElm = makeNodesFromElm;
//------------------------------------------------
// function : prove
//------------------------------------------------
function send_info2elm_proof_draw() {
    var _input_formula = $('#input_formula').val();
    var _list_modal_system = $('[class="modal_system"]:checked').map(function () { return $(this).val(); }).get().join('');
    var _list_el_system = document.querySelector(".select_logic_for_labelled").innerHTML;
    // modal_systems
    var _num_expression = Number(document['form4number_of_expressions'].number_of_expressions.value);
    //send json to ELM
    var _json_data = {
        formula: _input_formula,
        action: vis_action_1.ACTION_DATA,
        modalSystem: _list_modal_system,
        elSystem: _list_el_system,
        maxNumberOfExpressionsAppearingInANode: _num_expression,
        randomSeed: {
            randomNumber: 0,
            maxLengthOfRandomFormula: 0,
            maxNumberOfAgents: 0,
            maxNumberOfActions: 0
        }
    };
    elm_main_sequent.ports.input4prove.send(_json_data);
} //input
exports.send_info2elm_proof_draw = send_info2elm_proof_draw;
elm_main_sequent.ports.output4prove.subscribe(function (model) {
    if (model.formula === "") {
        console.log("comment: error in port_sequent.ts");
    }
    // history 
    var hh = function () {
        if (model.provable === 0) {
            return "<li><span style=\"color:#A44644\">&#10008;</span><span class='colorOfError'> " + model.formula + " </span> " + model.system + "</li>";
        }
        else if (model.provable === 1) {
            return "<li><span style=\"color:#346B36\">&#10004;</span> <span class='colorOfSuccess'> " + model.formula + " </span> " + model.system + "</li>";
        }
        else if (model.provable === 2) {
            return "<li><span class='colorOfWarning'>" + model.formula + "</span>" + model.system + "</li>";
        }
        else if (model.provable === 9) {
            return "<li><span class='colorOfOrange'>" + model.formula + "</span>" + model.system + "</li>";
        }
    };
    $('#history').append(hh());
    // create a network
    var newNode = makeNodesFromElm(model);
    var newEdge = makeEdgesFromElm(model);
    change_global_NODES_EDGES_update(newNode, newEdge);
});
function change_global_NODES_EDGES_update($nodes, $edges) {
    exports.EDGES_SEQ.remove(exports.EDGES_SEQ.getIds());
    exports.NODES_SEQ.remove(exports.NODES_SEQ.getIds());
    exports.NODES_SEQ.update($nodes);
    exports.EDGES_SEQ.update($edges);
}
exports.change_global_NODES_EDGES_update = change_global_NODES_EDGES_update;
//--------------------
function create_random_formula() {
    elm_main_sequent.ports.input4randomFormula.send(json4elm());
} //input-elm output2 (random fomrula)
exports.create_random_formula = create_random_formula;
elm_main_sequent.ports.output4randomFormula.subscribe(function ($model) {
    var _input_formula = document.getElementById("input_formula");
    var _element_b = document.createElement('li');
    _element_b.className = 'random_formula';
    _element_b.innerHTML = '<a href=#Randoms>' + $model.formula + '</a>';
    //element_b.innerHTML =  model.formula;
    document.getElementById('random_test').appendChild(_element_b);
    _element_b.addEventListener("click", function ($event) {
        var _str = replace_string($event);
        _input_formula.value = _str;
        send_info2elm_proof_draw();
    }, false);
});
function create_random_formula_provable() {
    elm_main_sequent.ports.input4randomFormula_provable.send(json4elm()); //out0
} //input-elm output3 (random fomrula provable)
exports.create_random_formula_provable = create_random_formula_provable;
elm_main_sequent.ports.output4randomFormula_provable.subscribe(function ($model) {
    var _id_input_formula = document.getElementById("input_formula");
    var _element_c = document.createElement('li');
    _element_c.className = 'random_formula2';
    _element_c.innerHTML = '<a href=#Randoms>' + $model.formula + '</a>';
    document.getElementById('random_test2').appendChild(_element_c);
    _element_c.addEventListener("click", function ($event) {
        var _str = replace_string($event);
        _id_input_formula.value = _str;
        if (_str === $model.formula) {
            send_info2elm_proof_draw();
        }
    }, false);
});
function json4elm() {
    var _random_number = Date.now(); //Math.floor(Math.random() * 10000);//
    var _num_connect = Number(document['form4connective'].number_of_connectives.value);
    var _num_agent = Number(document['form4agent'].number_of_agent.value);
    var _num_action = Number(document['form4action'].number_of_action.value);
    // EL_systems
    var _list_modal_system = $('[class="modal_system"]:checked').map(function () {
        return $(this).val();
    }).get().join('');
    // EL_systems
    var _list_el_system = document.querySelector(".select_logic_for_labelled").innerHTML;
    var _randomSeed = {
        formula: "",
        action: [],
        modalSystem: _list_modal_system,
        elSystem: _list_el_system,
        maxNumberOfExpressionsAppearingInANode: 0,
        randomSeed: {
            randomNumber: _random_number,
            maxLengthOfRandomFormula: _num_connect,
            maxNumberOfAgents: _num_agent,
            maxNumberOfActions: _num_action
        }
    };
    return _randomSeed;
}
