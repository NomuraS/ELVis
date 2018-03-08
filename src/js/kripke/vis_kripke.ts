import * as _ from 'lodash';
import * as Util from '../lib/util';
import * as Vis from '../lib/vis';
import * as Ac from '../action/vis_action';
// import * as $ from 'jquery';
import { Either } from 'tsmonad';

// import "jquery-ui";
// import '../lib/fnagel-jquery-ui-678127e/ui/jquery.ui.selectmenu'
// import '../lib/fnagel-jquery-ui-678127e/ui/jquery.ui.position'
// import '../lib/fnagel-jquery-ui-678127e/ui/jquery.ui.core'
// import '../lib/fnagel-jquery-ui-678127e/ui/jquery.ui.widget'
declare let $: any

//------------------------------------------------------
//------------------------------------------------------
//------------------------------------------------------
//type defs
export interface Relation {
      agent: string,
      from: string,
      to: string
}
export interface Relation2 {
      agent: string,
      relation: string[]
}
export interface Valuation {
      prop: string,
      worlds: string[]
}
export interface KripkeModel {
      name: string,
      domain: string[],
      relation: Relation[],
      valuation: Valuation[],
      comment: string
}
export interface AgentColor {
      agent: string,
      color: string
}

// constant symbols
// const $$NODES_COLOR_KRIPKE: string = "#BF8736 ffc966 FD8C1D "  // orange
const $$NODES_COLOR_KRIPKE: string = "#C38728"  // blue
export const $$BACKGROUND_COLOR: string = "#333333"
// export const $A1 = (document.getElementById('node-label_kripke') as HTMLInputElement)//.value = $data.label;
// export const $A2 = document.getElementById('saveButton_kripke')//.onclick = saveData_kripke.bind(this, $data, $callback);
// export const $A3 = document.getElementById('cancelButton_kripke')//.onclick = clearPopUp_kripke.bind(null);
// export const $A4 = document.getElementById('network-popUp_node_kripke')//.style.display = 'block';
export const $AGENT_LABEL = (document.getElementById('id_of_input_for_arrow_backup_kripke') as HTMLInputElement).value
export const $CONFIG_KRIPKE = document.getElementById('config_kripke')
export const $CONTAINER_KRIPKE = document.getElementById('network_kripke')

//global variables 

export let AGENT_COLOR_K: AgentColor[] = [
      { agent: "a", color: "#9CDD29" },
      { agent: "b", color: "#5BD4ED" },
      { agent: "c", color: "#F82167" }
]


export let NODES = new Vis.DataSet();
export let EDGES = new Vis.DataSet();


function makeRefl($agt: string[], $listWorld: string[]): Relation[] {
      return _.chain(Util.cartesianProduct([$agt, $listWorld]))
            .map((pair: string[]) => { return { "agent": _.nth(pair, 0), "from": _.nth(pair, 1), "to": _.nth(pair, 1) } })
            .value()
}

const MuddyChildren = function () {
      const domOfMuddy = ["w000", "w100", "w001", "w010", "w011", "w110", "w101", "w111"]
      const reflOfMuddy = makeRefl(["a", "b", "c"], domOfMuddy)
      return {
            "name": "MuddyChildren",
            "domain": domOfMuddy,
            "relation": reflOfMuddy.concat([
                  { "agent": "a", "from": "w000", "to": "w100" },
                  { "agent": "a", "from": "w100", "to": "w000" },
                  { "agent": "a", "from": "w010", "to": "w110" },
                  { "agent": "a", "from": "w110", "to": "w010" },
                  { "agent": "a", "from": "w001", "to": "w101" },
                  { "agent": "a", "from": "w101", "to": "w001" },
                  { "agent": "a", "from": "w011", "to": "w111" },
                  { "agent": "a", "from": "w111", "to": "w011" },

                  { "agent": "b", "from": "w000", "to": "w010" },
                  { "agent": "b", "from": "w010", "to": "w000" },
                  { "agent": "b", "from": "w100", "to": "w110" },
                  { "agent": "b", "from": "w110", "to": "w100" },
                  { "agent": "b", "from": "w001", "to": "w011" },
                  { "agent": "b", "from": "w011", "to": "w001" },
                  { "agent": "b", "from": "w101", "to": "w111" },
                  { "agent": "b", "from": "w111", "to": "w101" },

                  { "agent": "c", "from": "w000", "to": "w001" },
                  { "agent": "c", "from": "w001", "to": "w000" },
                  { "agent": "c", "from": "w010", "to": "w011" },
                  { "agent": "c", "from": "w011", "to": "w010" },
                  { "agent": "c", "from": "w100", "to": "w101" },
                  { "agent": "c", "from": "w101", "to": "w100" },
                  { "agent": "c", "from": "w110", "to": "w111" },
                  { "agent": "c", "from": "w111", "to": "w110" },
            ]),
            "valuation": [
                  { "prop": "p1", "worlds": ["w111", "w101", "w100", "w110"] },
                  { "prop": "p0", "worlds": ["w011", "w001", "w000", "w010"] },
                  { "prop": "q1", "worlds": ["w010", "w111", "w110", "w011"] },
                  { "prop": "q0", "worlds": ["w000", "w101", "w100", "w001"] },
                  { "prop": "r1", "worlds": ["w001", "w011", "w101", "w111"] },
                  { "prop": "r0", "worlds": ["w000", "w100", "w010", "w110"] }
            ],
            "comment": "muddy children"
      }
}()


const HexaModel = function () {
      const domOfHexa = ["w012", "w021", "w102", "w201", "w210", "w120"]
      const reflOfHexa = makeRefl(["a", "b", "c"], domOfHexa)
      return {
            "name": "HexaModel",
            "domain": domOfHexa,
            "relation": reflOfHexa.concat([
                  { "agent": "a", "from": "w012", "to": "w021" },
                  { "agent": "a", "from": "w102", "to": "w120" },
                  { "agent": "a", "from": "w201", "to": "w210" },
                  { "agent": "a", "from": "w021", "to": "w012" },
                  { "agent": "a", "from": "w120", "to": "w102" },
                  { "agent": "a", "from": "w210", "to": "w201" },

                  { "agent": "b", "from": "w021", "to": "w120" },
                  { "agent": "b", "from": "w012", "to": "w210" },
                  { "agent": "b", "from": "w102", "to": "w201" },
                  { "agent": "b", "from": "w120", "to": "w021" },
                  { "agent": "b", "from": "w210", "to": "w012" },
                  { "agent": "b", "from": "w201", "to": "w102" },

                  { "agent": "c", "from": "w012", "to": "w102" },
                  { "agent": "c", "from": "w021", "to": "w201" },
                  { "agent": "c", "from": "w120", "to": "w210" },
                  { "agent": "c", "from": "w102", "to": "w012" },
                  { "agent": "c", "from": "w201", "to": "w021" },
                  { "agent": "c", "from": "w210", "to": "w120" }
            ]),
            "valuation": [
                  { "prop": "0a", "worlds": ["w012", "w021"] },
                  { "prop": "1a", "worlds": ["w102", "w120"] },
                  { "prop": "2a", "worlds": ["w201", "w210"] },
                  { "prop": "0b", "worlds": ["w102", "w201"] },
                  { "prop": "1b", "worlds": ["w012", "w210"] },
                  { "prop": "2b", "worlds": ["w021", "w120"] },
                  { "prop": "0c", "worlds": ["w120", "w210"] },
                  { "prop": "1c", "worlds": ["w021", "w201"] },
                  { "prop": "2c", "worlds": ["w012", "w102"] }
            ],
            "comment": "Hexa model"

      }
}()


const Letter = function () {
      return {
            "name": "Letter",
            "domain": ["w0", "w1"],
            "relation": [
                  { "agent": "a", "from": "w0", "to": "w0" },
                  { "agent": "b", "from": "w0", "to": "w0" },
                  { "agent": "a", "from": "w1", "to": "w1" },
                  { "agent": "b", "from": "w1", "to": "w1" },

                  { "agent": "a", "from": "w1", "to": "w0" },
                  { "agent": "a", "from": "w0", "to": "w1" },
                  { "agent": "b", "from": "w1", "to": "w0" },
                  { "agent": "b", "from": "w0", "to": "w1" },
            ],
            "valuation": [
                  { "prop": "p", "worlds": ["w1"] }
            ],
            "comment": "Letter model"
      }
}();
export let KRIPKE_DATA: KripkeModel[] = [MuddyChildren, Letter, HexaModel]

// let $centralGravity_kripke = (document.getElementById("centralGravity_kripke") as HTMLInputElement)
// let $SPRING_LENGTH_KRIPKE = (document.getElementById("springLength_kripke") as HTMLInputElement)
// let $springConstant_kripke = (document.getElementById("springConstant_kripke") as HTMLInputElement)
// let $nodeDistance_kripke = (document.getElementById("nodeDistance_kripke") as HTMLInputElement)

export let OPTION_KRIPKE: Vis.Options = {
      physics: {
            barnesHut: {
                  gravitationalConstant: -2000,
                  // centralGravity: Number($centralGravity_kripke),
                  centralGravity: 0.2,
                  // springLength: Number($SPRING_LENGTH_KRIPKE.value),
                  springLength: 100,
                  // springConstant: Number($springConstant_kripke),
                  springConstant: 0.05,
            }
      },
      locales: {
            en: {
                  edit: 'Edit',
                  del: 'Delete selected',
                  back: 'Back',
                  addNode: 'Add State',
                  addEdge: 'Add Arrow of&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; ',
                  editNode: 'Edit State',
                  editEdge: 'Edit Arrow',
                  addDescription: 'Click in an empty space to place a new state.',
                  edgeDescription: 'Click on a state and drag the arrow to another state to connect them.',
                  editEdgeDescription: 'Click on the control points and drag them to a state to connect to it.',
                  createEdgeError: 'Cannot link arrows to a cluster.',
                  deleteClusterError: 'Clusters cannot be deleted.',
                  editClusterError: 'Clusters cannot be edited.'
            }
      },
      nodes: {
            shape: 'ellipse',
            size: 15,
            font: {
                  color: '#ffffff',
                  // color:'#cae6fc',
                  // strokeWidth:2,
                  // strokeColor:'#18171A',
                  face: 'Comic Sans MS',
            },
            color: $$NODES_COLOR_KRIPKE
            // color: { 
            //       border: $$NODES_COLOR_KRIPKE,
            //       background: $$NODES_COLOR_KRIPKE 
            // }
      },
      edges: {
            arrows: 'to',
            smooth: false // デフォルト:true、falseにするとエッジが直線になる
      },
      layout: {
            hierarchical: false
      },
}

// export function agColor($ag: string): string { // impure by AGENT_LIST
//       const gg = () => _.map(AGENT_COLOR, x => x.agent)
//       if (!_.includes(gg(), $ag)) { AGENT_COLOR.push({ agent: $ag, color: Util.colorGen() }) }

//       const ff = (x: AgentColor): string => { if (x.agent === $ag) { return x.color } };
//       return _(AGENT_COLOR)
//             .map(ff)
//             .compact()
//             .head()
// }

//------------------------------------------------------------------------------------------------------------------
// functions which change global variables
//------------------------------------------------------------------------------------------------------------------
function change_global_NODES_EDGES_update($nodes: Vis.Node[], $edges: Vis.Edge[]): void {
      EDGES.remove(EDGES.getIds())
      NODES.remove(NODES.getIds())
      //nodes
      NODES.update($nodes)
      EDGES.update($edges)
}
//------------------------------------------------------------------------------------------------------------------ 
//------------------------------------------------------------------------------------------------------------------
//ここにonclickと繋がったdomain追加のevent listenerがある(saveData_kripke)
export function $id_of_input_for_arrow_backup_kripke(): string { //impure getElementById
      const _a = (document.getElementById('id_of_input_for_arrow_backup_kripke') as HTMLInputElement)
      return _a.value
}

// watch nodes remove --not pure
export function watchRemoveNodefunction($data: any, $callback: any, $nodes: Vis.DataSet<Vis.Node>, $edges: Vis.DataSet<Vis.Edge>): void { //impure NODES,EDGES

      const _arrayEdges: Vis.Edge[] = $edges.get()
      const _selectednode: string = _.head($data.nodes)
      const _ff = x => {
            const _a = x.from === _selectednode
            const _b = x.to === _selectednode
            const _c = x.id
            _a || _b ? $edges.remove(_c) : undefined
      }
      $nodes.remove(_selectednode)
      _.forEach(_arrayEdges, _ff)
      nodeEdge2writeTopPanel($nodes, $edges)
}
// watch nodes remove --not pure
export function watchRemoveDeletefunction($data: any, $callback: any, $nodes, $edges: Vis.DataSet<Vis.Edge>): void { //impure NODES,EDGES
      const _selectedEdge: string = _.head($data.edges)
      $edges.remove(_selectedEdge)
      nodeEdge2writeTopPanel($nodes, $edges)
}
// watch nodes add --not pure  
export function watchAddNodefunction(
      $nod: Vis.Node,
      $func: any,
      $nodes: Vis.DataSet<Vis.Node>,
      $edges: Vis.DataSet<Vis.Edge>) { //impure: getElementById
      const _label_kripke = (document.getElementById('node-label_kripke') as HTMLInputElement)//.value = $data.label;
      const _saveButton_kripke = document.getElementById('saveButton_kripke')//.onclick = saveData_kripke.bind(this, $data, $callback);
      const _cancelButton_kripke = document.getElementById('cancelButton_kripke')//.onclick = clearPopUp_kripke.bind(null);
      const _popUp_node_kripke = document.getElementById('network-popUp_node_kripke')//.style.display = 'block';
      const clearPopUp_kripke = (): void => { //impure
            _saveButton_kripke.onclick = null;
            _cancelButton_kripke.onclick = null;
            _popUp_node_kripke.style.display = 'none';
      }

      const saveData_kripke = ($data: any, $callback: any): void => { // impure
            $data.label = (document.getElementById('node-label_kripke') as HTMLInputElement).value
            const _domain2: string[] = _.map($nodes.get(), (x: Vis.Node) => x.label)
            $data.id = $data.label
            if (_domain2.indexOf($data.label) === -1) {
                  $nodes.add($data)
                  //htmlのpanelに反映する
                  nodeEdge2writeTopPanel($nodes, $edges)
                  //figureに反映する
                  clearPopUp_kripke();
                  $callback($data);
            } else {
                  alert(`The world '${$data.label}' already exists. Change the name.`)
            }
      }
      Util.writeDOM_value('#node-label_kripke')($nod.label)
      _saveButton_kripke.onclick = saveData_kripke.bind(this, $nod, $func);
      _cancelButton_kripke.onclick = clearPopUp_kripke.bind(null);
      _popUp_node_kripke.style.display = 'block';
}
// watch edges --not pure
export function watchAddEdgefunction($rel: Relation, $func: any, $nodes, $edges: Vis.DataSet<Vis.Edge>, $agent) { // impure: addEdge, alert
      const agtInput = $agent//= $id_of_input_for_arrow_backup()
      const addingArrow = `${$rel.from}_${$rel.to}_${agtInput}`
      const addEdge_checked = () => {
            $edges.add({
                  from: $rel.from,
                  to: $rel.to,
                  label: agtInput,
                  color: Ac.agColor(agtInput, AGENT_COLOR_K),
                  id: addingArrow
            })
      };
      if (!_.includes($edges.getIds(), addingArrow)) {
            addEdge_checked()
            nodeEdge2writeTopPanel($nodes, $edges)
            $func($rel);
      } else {
            alert(`The arrow of 'agent ${agtInput} from ${$rel.from} to ${$rel.to}' already exists. Change the name.`)
      }
}

//--------------------------------------------------------------------------------------- 
// kripke editor
//---------------------------------------------------------------------------------------
export function rel2anotherRel($rel: Relation[]): Relation2[] { // pure
      const customizer = (x: any[], y: any[]) => {
            if (_.isArray(x)) { return _.uniq(x.concat(y)) }
            else { return undefined }
      }
      const ff = (r: Relation) => {
            return {
                  agent: r.agent,
                  relation: ["(" + r.from + "," + r.to + ")"]
            }
      }
      const bundleRel = (x: Relation2[]): Relation2 => {
            const gg = (z: any, w: any) => _.mergeWith(z, w, customizer)
            return _.reduce(x, gg, {})
      }
      return _.chain($rel)
            .map(ff)
            .groupBy('agent')
            .sortBy('agent')
            .map(bundleRel)
            .value()
}



// export function kripkeObject2string_withoutBar($kripkeModel: KripkeModel): string { // pure 
export function kripkeObject2string($kripkeModel: KripkeModel): string { // pure 

      const _name: string = $kripkeModel.name
      const _name2: string = _name.replace(/\|/g, "<br>|").replace(/\*/g, "<br>*")
      const _domain: string = $kripkeModel.domain.join(" , ")
      const _relation: Relation[] = $kripkeModel.relation
      const _valuation: Valuation[] = $kripkeModel.valuation
      const _comment: string = $kripkeModel.comment
      const _relation2 = rel2anotherRel(_relation)
      const _amname = Util.string2number(_name)
      let h =
            `<li>` +
            `<div class="btn-group model-title" data-toggle="buttons">` +
            // `<input value="${_name}" type="button" class="panel_in_panel3 btn btn-success btn-success-overwrite btn-xs">` +
            // `<input value="show graph" type="button" class="btn btn-info btn-info-overwrite btn-xs see_graph_${_amname}">` +
            `<button type="button" class="panel_in_panel3 btn btn-success btn-success-overwrite btn-xs">${_name2}</button>` +
            `<button type="button" class="btn btn-info btn-info-overwrite btn-xs see_graph_${_amname}">show graph</button>` +
            `</div>` +
            `<div class="close_panel kripke_list_panel" style="display:none">` +
            //            ここに隠す中身
            `<ul class="css_border_left_green">` +
            `<li class='class_name_of_kripke'>Name of Kripke Model ` +
            `<p>${_name}</p>` +
            `</li>` +
            `<li>Domain` +
            `<p>{${_domain}}</p>` +
            `</li>`;
      h += _.map(_relation2, x =>
            `<li><span style="color:${Ac.agColor(x.agent, AGENT_COLOR_K)}">Relation of ${x.agent} </span><p style="margin-left:1em;">{ ${x.relation.join(" , ")} }</p></li>`).join(" ");
      h += "<li>Valuation" +
            `<ul>` +
            _.map(_valuation, x => `<li>Value( <span>${x.prop}</span> ) = <p style="margin-left:1em;">{ ${x.worlds.join(", ")} }</p></li>`).join(" ") +
            "</ul>" +
            `<ul class="list-unstyled2">` +
            `<li class='classOfPrecondition_kripke'>Value(` +
            `<span class='color_text_panel_kripke'> x </span>) =` +
            `&empty;, &nbsp; if other x  &isin;  Atom` +
            `</li>` +
            `</ul>` +
            "</li>";
      h += `<li>Comment <p>${_comment}</p></li>` +
            "</ul>" +
            "</div>" +
            //            ここまで隠す   
            `</li>`
      return h;
}


export function edges2html($edge: Vis.DataSet<Vis.Edge>): Relation[] { //pure
      const _arrayEdges: Vis.Edge[] = $edge.get()
      const _arrayEdges2: any[]/*Relation[]*/ = _.map(_arrayEdges, x => {
            return { agent: x.label, from: x.from, to: x.to }
      })
      return (_arrayEdges2)
}
export function edges2relation($edge: Vis.DataSet<Vis.Edge>): Relation[] { //pure ppp
      const _arrayEdges: Vis.Edge[] = $edge.get()
      const _arrayEdges2: any[]/*Relation[]*/ = _.map(_arrayEdges, x => {
            return { agent: x.label, from: x.from, to: x.to }
      })
      return _arrayEdges2
}
export function kmRelation2html($edge: Relation[]): string { //pure
      const _arrayEdges2: any[]/*Relation[]*/ = $edge
      //newvalue
      const _ff = (k: Relation2): string => {
            return "<li>Relation of <span class='textarea4agents'>" + k.agent + "</span>: <br>" +
                  "{" +
                  "<span  id='id_text_textarea4relations_for_" + k.agent + "_kripke'  cols='35' rows='3'>" +
                  _.join((k.relation), ", ") +
                  "</span>" +
                  "}" +
                  "</li>";
      }
      const _html: string = _.chain(rel2anotherRel(_arrayEdges2))
            .map(_ff)
            .uniq()
            .join(' ')
            .value()
      //reset
      return _html
}

// change precondition text (by save button in graph)
//  function nodes2htmlPrecondition($dom: Vis.DataSet<Vis.Node>): string { //pure
//       const _arrayNodes = $dom.get().map(x => x.label)
//       return kmDomain2htmlPrecondition(_arrayNodes)
// }
function kmDomain2htmlValuation($val: Valuation[]): string { //pure
      $('#kripke_valuation').empty();
      const _ff = (x: Valuation) =>
            `<li class='classOfPrecondition_kripke'>Value(<span class='color_text_panel_kripke'> ${x.prop} </span>) = ` +
            `{ <input type='text' value='${x.worlds}' class='precondition4state_kripke input_width_small'> }` +
            `</li>`;
      return _($val).map(_ff).join(" ")
}
export function kmDomain2htmlValuation_for_display($val: Valuation[]): string { //pure
      const _ff = (x: Valuation) =>
            `<li class='classOfPrecondition_kripke'>Value(<span class='color_text_panel_kripke'> ${x.prop} </span>) = { ${x.worlds} }` +
            // `{ <input type='text' value='${x.worlds}' class='precondition4state_kripke input_width_small'> }` +
            `</li>`;
      return _($val).map(_ff).join(" ")
}
//-------------------------------------------------------------------
// write top panel
//-------------------------------------------------------------------
export function nodeEdge2writeTopPanel($nodes, $edges): void {
      Util.writeDOM_html("#number_of_domain_kripke")(nodes2string($nodes))
      Util.writeDOM_html('#kripke_relation')(kmRelation2html(edges2html($edges)))
}
export function kripkeObject2writeTopPanel($act: KripkeModel, $change_val: Boolean): void {

      Util.writeDOM_value('#form2_kripke')($act.name);
      //text of inputarea on figure
      Util.writeDOM_html('#kripkeNameOnGraph')($act.name)
      $('#number_of_domain_kripke').empty();
      Util.writeDOM_html("#number_of_domain_kripke")($act.domain.join(" , "))
      Util.writeDOM_html("#kripke_relation")(kmRelation2html($act.relation))
      $('#textarea_comment_kripke').val($act.comment);
      if ($change_val) {
            $("#kripke_valuation").append(kmDomain2htmlValuation($act.valuation));
      }
}

export function addKripke2compositionSelect($name: string, $ready: boolean) {
      let _name = $name
      _name = _name.replace(/\|/g, "%|")
      _name = _name.replace(/\*/g, "%*")
      $("#select_composition_kripke1").append($('<option>').html(_name).val(_name))
      $("#select_composition_kripke1_pal").append($('<option>').html(_name).val(_name))
      $("#select_composition_kripke1_DEL").append($('<option>').html(_name).val(_name))
      $("#select_kripke_for_truthChecker").append($('<option>').html(_name).val(_name))


      if ($ready) {
            $(".multiSelect_kripke").multilineSelectmenu()
      } else {
            $(".multiSelect_kripke").multilineSelectmenu('destroy');
            $(".multiSelect_kripke").multilineSelectmenu()
      }
      // $(".multiSelect").multilineSelectmenu('destroy');
      // $(".multiSelect").multilineSelectmenu();
      // $(".multiSelect").selectmenu({ style: "dropdown", width:140 });
      // $('select.multiLineOption').selectmenu();
      // $(".multiSelect").multilineSelectmenu('destroy');
      // $(".multiSelect").multilineSelectmenu()
}
// $('#button').click(function(){
//       $('#select').append($('<option>').html('new| option'));
//       $("#select").multilineSelectmenu('destroy');
//       $("#select").multilineSelectmenu();  
// })

export function addWorlds2worldSelect_for_truthChecker($name: string, $KRIPKE_LIST) {
      const kmodel = _.find($KRIPKE_LIST, o => o.name === $name)
      const ff = x => {
            $("#select_world_for_truthChecker").append($('<option>').html(x).val(x))
      }
      _.map(kmodel.domain, ff)
}
export function graph2kripkeObject($name: string, $nodes: Vis.DataSet<Vis.Node>, $edges: Vis.DataSet<Vis.Edge>): KripkeModel {
      return {
            name: $name,
            domain: _.map($nodes.get(), (x: Vis.Node) => x.label),//Ac.NODES,
            relation: _.map($edges.get(), (x: Vis.Edge) => { return { agent: x.label, from: String(x.from), to: String(x.to) } }),//Ac.NODES,,// Ac.EDGES,
            valuation: [],//$val, //[{ prop: "p", worlds: [] }],  　
            comment: ""
      }
}


// console.log(string2number("p&p")) 

export function addEvent2kripkeList($km: KripkeModel, $nodes, $edges, $change_val: boolean): void {

      // const modifyName = (str) => str.replace(/\&|\(|\)|\<|\>|\;|\||\*| |\~/g, "")
      const modifyName = (str) => Util.string2number(str)
      const _kmname = modifyName($km.name)

      $(`.see_graph_${_kmname}`).on('click', () => {
            const _km = () => {
                  const aa = _.find(KRIPKE_DATA, x => modifyName(x.name) === _kmname)
                  if (aa !== undefined) { return aa } else { alert("undefined in addEvent2kripkeList") }
            }
            const _newNodes = _.map(_km().domain, x => { return { label: x, id: x } })
            const _newEdges = _.map(_km().relation, x => {
                  return {
                        from: x.from,
                        to: x.to,
                        label: x.agent,
                        color: Ac.agColor(x.agent, AGENT_COLOR_K),
                        id: `${x.from}_${x.to}_${x.agent}`
                  }
            })

            kripkeObject2writeTopPanel(_km(), $change_val)
            change_global_NODES_EDGES_update(_newNodes, _newEdges)
      })
      // document.querySelector("#see_graph_" + _kmname).addEventListener('click', () => {
      //       const _km = () => {
      //             const aa = _.find(KRIPKE_DATA, x => modifyName(x.name) === _kmname)
      //             if (aa !== undefined) { return aa } else { alert("undefined in addEvent2kripkeList") }
      //       }
      //       const _newNodes = _.map(_km().domain, x => { return { label: x, id: x } })
      //       const _newEdges = _.map(_km().relation, x => {
      //             return {
      //                   from: x.from,
      //                   to: x.to,
      //                   label: x.agent,
      //                   color: Ac.agColor(x.agent, AGENT_COLOR_K),
      //                   id: `${x.from}_${x.to}_${x.agent}`
      //             }
      //       })

      //       kripkeObject2writeTopPanel(_km(), $change_val)
      //       change_global_NODES_EDGES_update(_newNodes, _newEdges)
      // })
}



export function acName2ac(name: string, acs: KripkeModel[]): KripkeModel | undefined { //pure // introduce Either
      const ff = (x: any) => {
            return {
                  name: x.name,
                  domain: x.domain,
                  relation: x.relation,
                  valuation: x.valuation,
                  comment: "",
            }
      };
      return ff(_.find(acs, x => x.name === name))
}

// change domain text (by save button in graph)
export function nodes2string($nodes: Vis.DataSet<Vis.Node>): string { //pure
      //reset
      $('#number_of_domain').empty();
      // add list 
      return _($nodes.get())
            .map((x: any) => x.label)
            .join(" , ")
}

export function button2kripkeObject( // pure
      $nameInfo: string,
      $commentInfo: string,
      $fromInfo: any,
      $toInfo: any,
      $nodes: Vis.DataSet<Vis.Node>,
      $edges: Vis.DataSet<Vis.Edge>,
      $KRIPKE_DATA: KripkeModel[]): KripkeModel {

      //domain
      const _domain4output: string[] = _.map($nodes.get(), (x: Vis.Node) => x.label)
      //relation 
      const _arrayEdges: Vis.Edge[] = $edges.get()
      const relMake = (x: any[]): Relation | undefined => {
            const z = _.nth(x, 0)
            if (z.label === _.nth(x, 1)) {
                  return { agent: z.label, from: z.from, to: z.to }
            } else { return undefined }
      }
      const _rel4output: Relation[] =
            _.chain(_arrayEdges)
                  .map(x => x.label)
                  .uniq()//whole agent in arrayEdges
                  .thru(x => Util.cartesianProduct([_arrayEdges, x]))
                  .map(relMake)
                  .uniqWith(_.isEqual)
                  .compact()// .filter(x => x !== undefined)
                  .value();
      //precondition
      const _fromTo = (_.zip($fromInfo, $toInfo))
      const _cart = Util.cartesianProduct([_domain4output, _fromTo])

      const preMake = (x: any[]): Valuation | undefined => {//index: number, elem) {
            const _dom: string = _.nth(x, 0)
            const _fromTo: any = _.nth(x, 1)
            const _from: any = _.nth(_fromTo, 0)
            const _to: any = _.nth(_fromTo, 1)
            if (_dom === _from.innerHTML) {
                  return {
                        prop: _dom,
                        worlds: _to.value
                  }
            } else { return undefined }
      }
      const _pre4output: Valuation[] = //_.compact(_.map(cat2, kk))
            _.chain(_cart)
                  .map(preMake)
                  .compact()
                  .value()
      // kripke_json
      const _kripke_object: KripkeModel = {
            name: $nameInfo,
            domain: _domain4output,
            relation: _rel4output,
            valuation: _pre4output,
            comment: $commentInfo
      };
      return _kripke_object
}

export function kmName2km($name: string, $kms: KripkeModel[]): KripkeModel | undefined { //pure // introduce Either
      const _nameWithout = $name.replace(/\%| /g, "")
      const ff = (x: any) => {
            return {
                  name: x.name,
                  domain: x.domain,
                  relation: x.relation,
                  valuation: x.valuation,
                  comment: "",
            }
      };
      return ff(_.find($kms, x => x.name === _nameWithout))
}


//--------------------------------------------------------------
//sample load (kripke models)
//--------------------------------------------------------------

export function ajax_output($e: string) {
      $.ajax({
            url: $e,
            dataType: 'html',
            success: function ($data) {
                  json2kripkeData($.parseJSON($data));
            },
            error: function () {
                  $('#sample-result').html('<font color="red">This is a browser error. Please try using a different browser.</font>');
            }
      });
};

export function json2kripkeData($json: any) {
      const namelist = _.map(KRIPKE_DATA, x => x.name)
      const ff = (name): boolean => {
            return !_.includes(namelist, name)
      }
      const _KMsFromJSON = $json.filter(y => ff(y.name))

      KRIPKE_DATA = _.concat(KRIPKE_DATA, _KMsFromJSON)
      $("#kripke_list").empty();

      _.chain(KRIPKE_DATA)
            .uniqBy('name')
            .forEach(x => {
                  // 3. add kripke to composition select
                  addKripke2compositionSelect(x.name, false)
                  // 4. write kripke list
                  $("#kripke_list").append(kripkeObject2string(x));
                  // 5. kripke listにevent割り当て
                  addEvent2kripkeList(x, NODES, EDGES, true)
            })
            .value()
      $('.close_panel').hide();
}
