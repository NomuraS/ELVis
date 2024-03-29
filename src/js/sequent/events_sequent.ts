import * as PS from "./port_sequent"
import * as Rx from 'rx-dom';
// import * as Vis from 'vis';
import * as Vis from '../lib/vis';
import * as Checker from '../syntaxChecker/events_syntaxChecker';


//--------------------------------------------------
// global veriable 
//-------------------------------------------------- 
export let NETWORK_SEQUENT: Vis.Network
//--------------------------------------------------
// constants
//--------------------------------------------------
export const $CONTAINER = document.getElementById('network_sequent')
//--------------------------------------------------
// event
//--------------------------------------------------
$(document).ready(function (): void {
    PS.EL_system_string();
    PS.Modal_system_string();

    PS.NODES_SEQ.add([]);
    PS.EDGES_SEQ.add([]);
    NETWORK_SEQUENT = new Vis.Network($CONTAINER, { nodes: PS.NODES_SEQ, edges: PS.EDGES_SEQ }, PS.OPTIONS);
    PS.send_info2elm_proof_draw()
});

$("#modalbutton1").on('click', function () {
    const _latex_package = $('[name="proofdownload"]:checked').map(function () { return $(this).val(); }).get().join('');
    if (_latex_package === "proof_sty") {
        $('#latexOutput').html(PS.PROOF_LATEX.proofsty)
    } else if (_latex_package === "ebproof_sty") {
        $('#latexOutput').html(PS.PROOF_LATEX.ebproofsty)
    }
})

for (let i = 0; i < $('.example_formula').length; i++) {
    $('.example_formula')[i].addEventListener("click",
        x => {
            PS.funcInput(x);
            Checker.syntaxCheck(PS.replace_string(x))
        }
        , false);
}

// for modal system
$("input[class='modal_system']").on("click", function (): void {
    PS.Modal_system_string();
});

$("#levelSeparation").change(function () {
    const range_value: Number = Number($(this).val());
    PS.OPTIONS.layout.hierarchical.levelSeparation = range_value
    NETWORK_SEQUENT.setOptions(PS.OPTIONS)
    PS.send_info2elm_proof_draw()
})
$("#nodeSpacing").change(function () {
    let range_value: Number = Number($(this).val());
    PS.OPTIONS.layout.hierarchical.nodeSpacing = range_value
    NETWORK_SEQUENT.setOptions(PS.OPTIONS)
    PS.send_info2elm_proof_draw()
})

$("input[name='seqent_config_direction']").on("click", function (): void {
    let value = $("input[name='seqent_config_direction']:checked").val();
    let _direction = "UD"
    switch (value) {
        case "Up-Down":
            _direction = "UD"
            break;
        case "Down-Up":
            _direction = "DU"
            break;
        case "Left-Right":
            _direction = "LR"
            break;
        case "Right-Left":
            _direction = "RL"
            break;
    }
    PS.OPTIONS.layout.hierarchical.direction = _direction
    NETWORK_SEQUENT.setOptions(PS.OPTIONS)
    PS.send_info2elm_proof_draw()
});

$("input[name='seqent_config_sortMethod']").on("click", function (): void {
    let value = $("input[name='seqent_config_sortMethod']:checked").val();
    let _sortMethod = "directed"
    switch (value) {
        case "directed":
            _sortMethod = "directed"
            break;
        case "hubsize":
            _sortMethod = "hubsize"
            break;
    }
    PS.OPTIONS.layout.hierarchical.sortMethod = _sortMethod
    NETWORK_SEQUENT.setOptions(PS.OPTIONS)
    // 次を書かないとsyntax highliteされない
    PS.send_info2elm_proof_draw()
});

$('#button_create_random_formula').on('click', function () {
    PS.create_random_formula()
});
$('#button_create_random_formula_provable').on('click', function () {
    PS.create_random_formula_provable()
});
Rx.Observable.fromEvent($('#prove_sequent'), 'click')
    .subscribe(
        () => {
            PS.send_info2elm_proof_draw()
        },
        (error: Error) => console.log(error),
        () => console.log('draw and write new graph'), 
);




