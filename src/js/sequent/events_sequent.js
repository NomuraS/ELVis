"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PS = require("./port_sequent");
var Rx = require("rx-dom");
var Vis = require("../lib/vis");
var Checker = require("../syntaxChecker/events_syntaxChecker");
exports.$CONTAINER = document.getElementById('network_sequent');
$(document).ready(function () {
    PS.EL_system_string();
    PS.Modal_system_string();
    PS.NODES_SEQ.add([]);
    PS.EDGES_SEQ.add([]);
    exports.NETWORK_SEQUENT = new Vis.Network(exports.$CONTAINER, { nodes: PS.NODES_SEQ, edges: PS.EDGES_SEQ }, PS.OPTIONS);
    PS.send_info2elm_proof_draw();
});
$("#modalbutton1").on('click', function () {
    var _latex_package = $('[name="proofdownload"]:checked').map(function () { return $(this).val(); }).get().join('');
    if (_latex_package === "proof_sty") {
        $('#latexOutput').html(PS.PROOF_LATEX.proofsty);
    }
    else if (_latex_package === "ebproof_sty") {
        $('#latexOutput').html(PS.PROOF_LATEX.ebproofsty);
    }
});
for (var i = 0; i < $('.example_formula').length; i++) {
    $('.example_formula')[i].addEventListener("click", function (x) {
        PS.funcInput(x);
        Checker.syntaxCheck(PS.replace_string(x));
    }, false);
}
$("input[class='modal_system']").on("click", function () {
    PS.Modal_system_string();
});
$("#levelSeparation").change(function () {
    var range_value = Number($(this).val());
    PS.OPTIONS.layout.hierarchical.levelSeparation = range_value;
    exports.NETWORK_SEQUENT.setOptions(PS.OPTIONS);
    PS.send_info2elm_proof_draw();
});
$("#nodeSpacing").change(function () {
    var range_value = Number($(this).val());
    PS.OPTIONS.layout.hierarchical.nodeSpacing = range_value;
    exports.NETWORK_SEQUENT.setOptions(PS.OPTIONS);
    PS.send_info2elm_proof_draw();
});
$("input[name='seqent_config_direction']").on("click", function () {
    var value = $("input[name='seqent_config_direction']:checked").val();
    var _direction = "UD";
    switch (value) {
        case "Up-Down":
            _direction = "UD";
            break;
        case "Down-Up":
            _direction = "DU";
            break;
        case "Left-Right":
            _direction = "LR";
            break;
        case "Right-Left":
            _direction = "RL";
            break;
    }
    PS.OPTIONS.layout.hierarchical.direction = _direction;
    exports.NETWORK_SEQUENT.setOptions(PS.OPTIONS);
    PS.send_info2elm_proof_draw();
});
$("input[name='seqent_config_sortMethod']").on("click", function () {
    var value = $("input[name='seqent_config_sortMethod']:checked").val();
    var _sortMethod = "directed";
    switch (value) {
        case "directed":
            _sortMethod = "directed";
            break;
        case "hubsize":
            _sortMethod = "hubsize";
            break;
    }
    PS.OPTIONS.layout.hierarchical.sortMethod = _sortMethod;
    exports.NETWORK_SEQUENT.setOptions(PS.OPTIONS);
    PS.send_info2elm_proof_draw();
});
$('#button_create_random_formula').on('click', function () {
    PS.create_random_formula();
});
$('#button_create_random_formula_provable').on('click', function () {
    PS.create_random_formula_provable();
});
Rx.Observable.fromEvent($('#prove_sequent'), 'click')
    .subscribe(function () {
    PS.send_info2elm_proof_draw();
}, function (error) { return console.log(error); }, function () { return console.log('draw and write new graph'); });
