"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Elm_syntaxChecker = require("./elmFunctions_syntaxChecker");
var Util = require("../lib/util");
var $ELM_SYNTAX = Elm_syntaxChecker.ElmFunctions_syntaxChecker.embed(document.getElementById('elm_syntaxChecker'));
var $$INPUT_FORM = document.querySelector('#input_formula');
$('#input_formula').on('keyup', function () {
    syntaxCheck($$INPUT_FORM.value.toString());
});
function syntaxFail() {
    Util.writeDOM_html('#error_input')('syntax &#10008;');
    $('#error_input').css("color", "#A44644");
}
function syntaxSuccess() {
    Util.writeDOM_html('#error_input')('syntax &#10004;'); // green 
    $('#error_input').css("color", "#346B36");
}
function syntaxCheck(str) {
    var _elsystem = document.querySelector(".select_logic_for_labelled").innerHTML;
    var _form = {
        system: _elsystem,
        formula: str
    };
    console.log(_form);
    $ELM_SYNTAX.ports.input1.send(_form);
}
exports.syntaxCheck = syntaxCheck;
$ELM_SYNTAX.ports.output1.subscribe(function ($model) {
    console.log($model);
    if ($model.result === 'parseError') {
        syntaxFail();
    }
    else {
        syntaxSuccess();
    }
});
