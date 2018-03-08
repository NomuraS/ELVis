// import * as VA from "../action/vis_action"
import { ACTION_DATA } from "../action/vis_action"
// import * as Vis from '../lib/vis';
import * as Vis from '../lib/vis';
import * as _ from 'lodash';
// import * as $ from 'jquery';
import * as Elm_sequent from './elmFunctions_sequent';
// declare let Elm: any; elm
const elm_main_sequent =
	Elm_sequent.ElmFunctions_sequent.embed(document.getElementById('elm_sequent') as HTMLInputElement);

//----------------------------------------
// global variable
//----------------------------------------
export let NODES_SEQ = new Vis.DataSet()
export let EDGES_SEQ = new Vis.DataSet()
export let PROOF_LATEX = { proofsty: "", ebproofsty: "" }
//------------------------------------------------------------------------------------------------
// radio check & innerHTML
//------------------------------------------------------------------------------------------------
// for el system
export function EL_system_string() {
	// const value = $("input[name='el_system']:checked").val();
	const value = document.getElementsByClassName("select_logic_for_labelled")[0].innerHTML;
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
export function Modal_system_string(): void {
	const ff = function () {
		return $(this).val();
	};
	const list_modal_system: string = $('[class="modal_system"]:checked').map(ff).get().join('');
	$(".select_modal_system").html(list_modal_system);
}
//----------------------------------------
// example formulas
//----------------------------------------
export function replace_string($event: any): string {
	return _.chain($event)
		.thru(x => x.target.innerHTML.replace(/&gt;/g, '>'))
		.replace(/&lt;/g, '<')
		.replace(/&amp;/g, '&')
		.value()
};

//------------------------------------------
// draw 証明図
//------------------------------------------
const $LEVEL_SEPARATION_INPUT = (document.getElementById("levelSeparation") as HTMLInputElement)
const $NODE_SPACING_INPUT = (document.getElementById("nodeSpacing") as HTMLInputElement)
const $DIRECTION_INPUT = "DU"
// (document.getElementById("direction") as HTMLInputElement)
const $SORT_METHOD_INPUT = "directed"
//  (document.getElementById("sortMethod") as HTMLInputElement)

export let OPTIONS: Vis.Options = {
	physics: {
		enabled: false,
		repulsion: {
			springLength: 2000
		}
	},
	layout: {
		hierarchical: {
			levelSeparation: Number($LEVEL_SEPARATION_INPUT.value), // 50
			nodeSpacing: Number($NODE_SPACING_INPUT.value), // 400,nodeの横の距離を広げる
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
			boldital: { color: '#CD2F77' }, // double arrow 
			ital: { color: '#656ABD' }, // rel atom  
			mono: { color: '#26978D' },  //formula
			bold: { color: '#1A85FF' } // label
		}
	}
};

// event: example setting
export function funcInput($event: any): void {
	const id_input_formula = (document.getElementById("input_formula") as HTMLInputElement);
	id_input_formula.value = replace_string($event)
	send_info2elm_proof_draw()
}
//-------------------------------------
// setting for vis.js
//-------------------------------------
export function makeEdgesFromElm($vismodel: any): any {
	let listOfEdges = [];
	for (let i = 0; i < $vismodel.edges.length; i++) {
		listOfEdges[i] = {
			from: $vismodel.edges[i].from,
			to: $vismodel.edges[i].to,
			label: $vismodel.edges[i].label
		};
	}
	return listOfEdges;
} // end of def  

export function makeNodesFromElm($vismodel: any): any {//Vis.DataSet<Vis.Node> {// 
	let listOfNodes = [];
	for (let i = 0; i < $vismodel.nodes.length; i++) {
		listOfNodes[i] = {
			id: $vismodel.nodes[i].id,
			label: $vismodel.nodes[i].label,
			title: $vismodel.nodes[i].label,
			font: { multi: true }  // color and bold arrow of Sequent  <b>==></b> in Common_sequent.elm 1003
		};

		if ($vismodel.nodes[i].color === 0) { // end node (red)
			listOfNodes[i].color = '#f0d9d9';
		} else if ($vismodel.nodes[i].color === 1) { // init node (green)
			listOfNodes[i].color = '#c1f0c1';
		} else if ($vismodel.nodes[i].color === 2) { // out of limit node
			listOfNodes[i].color = '#DDDA62';
		} else if ($vismodel.nodes[i].color === 3) { // normal node
			listOfNodes[i].color = '#FDF4DF';
		} else if ($vismodel.nodes[i].color === 9) { // any formula
			listOfNodes[i].color = '#FFA85A'; // oranges
		}
	}
	return listOfNodes;
} // end of def

//------------------------------------------------
// function : prove
//------------------------------------------------
export function send_info2elm_proof_draw(): void {
	const _input_formula = $('#input_formula').val();
	const _list_modal_system = $('[class="modal_system"]:checked').map(function () { return $(this).val(); }).get().join('');
	const _list_el_system = document.querySelector(".select_logic_for_labelled").innerHTML;
	// modal_systems
	const _num_expression = Number(document['form4number_of_expressions'].number_of_expressions.value);
	//send json to ELM
	const _json_data = {
		formula: _input_formula,
		action: ACTION_DATA,
		modalSystem: _list_modal_system,
		elSystem: _list_el_system,
		maxNumberOfExpressionsAppearingInANode: _num_expression,
		randomSeed: {
			randomNumber: 0,
			maxLengthOfRandomFormula: 0,
			maxNumberOfAgents: 0,
			maxNumberOfActions: 0
		},
		// latex_package:_latex_package
	};
	elm_main_sequent.ports.input4prove.send(_json_data);
}//input
elm_main_sequent.ports.output4prove.subscribe(function ($model) {
	if ($model.formula === "") {
		console.log("comment: error in port_sequent.ts")
	}

	// history 
	const hh = () => {
		const _replaced = ($model.formula).replace(/</g, '&lt;').replace(/>/g, '&gt;')
		if ($model.provable === 0) {
			return `<li><span style="color:#A44644">&#10008;</span><span class='colorOfError'> ${_replaced} </span> ${$model.system}</li>`;
		} else if ($model.provable === 1) {
			return `<li><span style="color:#346B36">&#10004;</span> <span class='colorOfSuccess'> ${_replaced} </span> ${$model.system}</li>`;
		} else if ($model.provable === 2) {
			return `<li><span class='colorOfWarning'>${_replaced}</span>${$model.system}</li>`;
		} else if ($model.provable === 9) {
			return `<li><span class='colorOfOrange'>${_replaced}</span>${$model.system}</li>`;
		}
	}
	$('#history').append(hh())
	// create a network 
	const newNode = makeNodesFromElm($model)
	const newEdge = makeEdgesFromElm($model)
	change_global_NODES_EDGES_update(newNode, newEdge);
	$('#latexOutput').html($model.tex)
	PROOF_LATEX = {
		proofsty: $model.tex.proofsty,
		ebproofsty: $model.tex.ebproofsty,
	}
})

export function change_global_NODES_EDGES_update($nodes: Vis.Node[], $edges: Vis.Edge[]): void {
	EDGES_SEQ.remove(EDGES_SEQ.getIds())
	NODES_SEQ.remove(NODES_SEQ.getIds())
	NODES_SEQ.update($nodes)
	EDGES_SEQ.update($edges)
}

//--------------------
export function create_random_formula(): void {
	elm_main_sequent.ports.input4randomFormula.send(json4elm());
}//input-elm output2 (random fomrula)
elm_main_sequent.ports.output4randomFormula.subscribe(function ($model) {
	const _input_formula = <HTMLInputElement>document.getElementById("input_formula");
	const _element_b = document.createElement('li');
	_element_b.className = 'random_formula';
	_element_b.innerHTML = '<a href=#Randoms>' + $model.formula + '</a>';
	document.getElementById('random_test').appendChild(_element_b);
	_element_b.addEventListener("click", function ($event) {
		const _str = replace_string($event);
		_input_formula.value = _str;
		send_info2elm_proof_draw();
	}, false);
});

export function create_random_formula_provable(): void {
	elm_main_sequent.ports.input4randomFormula_provable.send(json4elm());//out0
}//input-elm output3 (random fomrula provable)
elm_main_sequent.ports.output4randomFormula_provable.subscribe(function ($model) {//in0
	const _id_input_formula = (document.getElementById("input_formula") as HTMLInputElement);
	const _element_c = document.createElement('li');
	_element_c.className = 'random_formula2';
	_element_c.innerHTML = '<a href=#Randoms>' + $model.formula + '</a>';
	document.getElementById('random_test2').appendChild(_element_c);
	_element_c.addEventListener("click", function ($event) {
		const _str = replace_string($event);
		_id_input_formula.value = _str;
		if (_str === $model.formula) {
			send_info2elm_proof_draw();
		}
	}, false);
})

function json4elm(): any {
	const _random_number: number = Date.now(); //Math.floor(Math.random() * 10000);//
	const _num_connect: number = Number(document['form4connective'].number_of_connectives.value);
	const _num_agent: number = Number(document['form4agent'].number_of_agent.value);
	const _num_action: number = Number(document['form4action'].number_of_action.value);

	// EL_systems
	const _list_modal_system = $('[class="modal_system"]:checked').map(function () {
		return $(this).val();
	}).get().join('');
	// EL_systems
	const _list_el_system = document.querySelector(".select_logic_for_labelled").innerHTML
	const _randomSeed = {
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
	return _randomSeed
}

















