import * as Elm_syntaxChecker from './elmFunctions_syntaxChecker';
import * as Util from '../lib/util';

const $ELM_SYNTAX = Elm_syntaxChecker.ElmFunctions_syntaxChecker.embed(document.getElementById('elm_syntaxChecker'));
const $$INPUT_FORM: HTMLInputElement | null = document.querySelector('#input_formula') as HTMLInputElement

$('#input_formula').on('keyup', function () {
    syntaxCheck($$INPUT_FORM.value.toString())
})

function syntaxFail() {
    Util.writeDOM_html('#error_input')('syntax &#10008;');
    $('#error_input').css("color", "#A44644");
}
function syntaxSuccess() {
    Util.writeDOM_html('#error_input')('syntax &#10004;'); // green 
    $('#error_input').css("color", "#346B36");
}
  
export function syntaxCheck(str: string) {
    const _elsystem = document.querySelector(".select_logic_for_labelled").innerHTML
    const _form = {
        system: _elsystem,
        formula: str
    }
    console.log(_form) 
    $ELM_SYNTAX.ports.input1.send(_form)
} 
$ELM_SYNTAX.ports.output1.subscribe($model => {
    console.log($model)
    if ($model.result === 'parseError') {
        syntaxFail()
    } else {
        syntaxSuccess()
    }
})














