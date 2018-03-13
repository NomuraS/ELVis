import * as _ from 'lodash';
import * as Util from '../lib/util';
import * as Vis from '../lib/vis';
// import * as Vis from 'vis';
// import * as $ from 'jquery';
import { Either } from 'tsmonad';
import { string2number } from '../lib/util';
 
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

export interface Precondition {
      from: string, 
      to: string
}
export interface ActionModel {
      name: string,
      domain: string[],
      relation: Relation[],
      precondition: Precondition[],
      comment: string
}
export interface AgentColor {
      agent: string,
      color: string
}

// constant symbols
const $NODES_COLOR: string = "mediumturquoise"
export const $BACKGROUND_COLOR: string = "whitesmoke"
export const $A1 = (document.getElementById('node-label_action') as HTMLInputElement)//.value = $data.label;
export const $A2 = document.getElementById('saveButton_action')//.onclick = saveData_action.bind(this, $data, $callback);
export const $A3 = document.getElementById('cancelButton_action')//.onclick = clearPopUp_action.bind(null);
export const $A4 = document.getElementById('network-popUp_node')//.style.display = 'block';
export const $AGENT_LABEL = (document.getElementById('id_of_input_for_arrow_backup') as HTMLInputElement).value
export const $CONFIG_ACTION = document.getElementById('config_action')
export const $CONTAINER_ACTION = document.getElementById('network_action')

function makeRefl($agt: string[], $listWorld: string[]): Relation[] {
      return _.chain(Util.cartesianProduct([$agt, $listWorld]))
            .map((pair: string[]) => { return { "agent": _.nth(pair, 0), "from": _.nth(pair, 1), "to": _.nth(pair, 1) } })
            .value()
}

//global variables 
export let AGENT_COLOR: AgentColor[] = [{ agent: "a", color: "orangered" }, { agent: "b", color: "royalblue" }]
export let NODES = new Vis.DataSet();
export let EDGES = new Vis.DataSet();


const ActionModel_Skip = {
      "name": "Skip",
      "domain": ["e1"],
      "relation": [
            { "agent": "a", "from": "e1", "to": "e1" }
      ],
      "precondition": [
            { "from": "e1", "to": "top" }
      ],
      "comment": "top"
}

const ActionModel_Crash = {
      "name": "Crash",
      "domain": ["e0"],
      "relation": [
            { "agent": "a", "from": "e0", "to": "e0" }
      ],
      "precondition": [
            { "from": "e0", "to": "bot" }
      ],
      "comment": "bot"
}
const ActionModel_Reada = {
      "name": "Reada",
      "domain": ["e0", "e1"],
      "relation": [
            { "agent": "a", "from": "e0", "to": "e0" },
            { "agent": "a", "from": "e1", "to": "e1" },
            { "agent": "b", "from": "e0", "to": "e0" },
            { "agent": "b", "from": "e1", "to": "e1" },
            { "agent": "b", "from": "e0", "to": "e1" },
            { "agent": "b", "from": "e1", "to": "e0" }
      ],
      "precondition": [
            { "from": "e0", "to": "~p" },
            { "from": "e1", "to": "p" }
      ],
      "comment": "Ann (agent a) reads the letter containing information of p in the presence of Bill (agent b). [Dit, p142]"
}
const ActionModel_MayReada = function () {
      const domOfmayRead = ["e0", "e1", "e9"]
      const reflOfmayRead = makeRefl(["a", "b"], domOfmayRead)
      return {
            "name": "MayReada",
            "domain": domOfmayRead,
            "relation": reflOfmayRead.concat([
                  { "agent": "b", "from": "e0", "to": "e1" },
                  { "agent": "b", "from": "e1", "to": "e0" },
                  { "agent": "b", "from": "e0", "to": "e9" },
                  { "agent": "b", "from": "e9", "to": "e0" },
                  { "agent": "b", "from": "e9", "to": "e1" },
                  { "agent": "b", "from": "e1", "to": "e9" },
            ]),
            "precondition": [
                  { "from": "e0", "to": "~p" },
                  { "from": "e1", "to": "p" },
                  { "from": "e9", "to": "top" },
            ],
            "comment": "Ann (agent a) reads the letter containing information of p in the presence of Bill (agent b). [Dit, p142]"
      }
}()
const ActionModel_MayReadb = function () {
      const domOfmayRead = ["e0", "e1", "e9"]
      const reflOfmayRead = makeRefl(["a", "b"], domOfmayRead)
      return {
            "name": "MayReadb",
            "domain": domOfmayRead,
            "relation": reflOfmayRead.concat([
                  { "agent": "a", "from": "e0", "to": "e1" },
                  { "agent": "a", "from": "e1", "to": "e0" },
                  { "agent": "a", "from": "e0", "to": "e9" },
                  { "agent": "a", "from": "e9", "to": "e0" },
                  { "agent": "a", "from": "e9", "to": "e1" },
                  { "agent": "a", "from": "e1", "to": "e9" },
            ]),
            "precondition": [
                  { "from": "e0", "to": "~p" },
                  { "from": "e1", "to": "p" },
                  { "from": "e9", "to": "top" },
            ],
            "comment": "agent b may read the letter."
      }
}()

export let ACTION_DATA: ActionModel[] = [
      ActionModel_Skip,
      ActionModel_Crash,
      ActionModel_Reada, 
      // ActionModel_MayReada,
      // ActionModel_MayReadb,
      // publicAnnouncement(["a","b","c",],"p1vq1vr1"),
      // publicAnnouncement(["a","b","c",],"(~#ap0 & ~#a~p0)"),
      // publicAnnouncement(["a","b","c",],"(#ap0 v #a~p0)"),
      // publicAnnouncement(["a","b","c",],"~(#bq0 v #b~q0)"),
      // publicAnnouncement(["a","b","c",],"~(#cr0 v #c~r0)"),
      // publicAnnouncement(["a","b","c",],"~(#ap0 v #a~p0) & ~(#bq0 v #b~q0) & ~(#cr0 v #c~r0)"),
      // publicAnnouncement(["a","b","c",],"~(#ap0 v #a~p0) & (#bq0 v #b~q0) & (#cr0 v #c~r0)"),
      // publicAnnouncement(["a","b","c",],"p1"),
      // publicAnnouncement(["a","b","c",],"q1"),
      // publicAnnouncement(["a","b","c",],"p&r"),
]


function publicAnnouncement($agts: string[], $f: string): ActionModel {
      const pubName = `pub(${$f})`
      const pubDomain = ["pub"]
      const pubRel = _.map($agts, x => { return { "agent": x, "from": "pub", "to": "pub" } })
      const pubPre = [{ "from": "pub", "to": $f }]
      return {
            "name": pubName,
            "domain": pubDomain,
            "relation": pubRel,
            "precondition": pubPre, 
            "comment": `public announcement of ${$f}`
      }
}

// let $centralGravity_action = (document.getElementById("centralGravity_action") as HTMLInputElement)
// let $SPRING_LENGTH_ACTION = (document.getElementById("springLength_action") as HTMLInputElement)
// let $springConstant_action = (document.getElementById("springConstant_action") as HTMLInputElement)
// let $nodeDistance_action = (document.getElementById("nodeDistance_action") as HTMLInputElement)

export let OPTION_ACTION: Vis.Options = {
      physics: {
            barnesHut: {
                  gravitationalConstant: -2000,
                  // centralGravity: Number($centralGravity_action),
                  centralGravity: 0.2,
                  // springLength: Number($SPRING_LENGTH_ACTION.value),
                  springLength: 100,
                  // springConstant: Number($springConstant_action),
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
                  edgeDescription: 'Click on a state and drag the arrow to another state.',
                  editEdgeDescription: 'Click on the control points and drag them to a state.',
                  createEdgeError: 'Cannot link arrows to a cluster.',
                  deleteClusterError: 'Clusters cannot be deleted.',
                  editClusterError: 'Clusters cannot be edited.'
            }
      },
      nodes: {
            shape: 'ellipse',
            size: 15,
            color: $NODES_COLOR,
            font: {
                  // color:'#cae6fc',
                  // strokeWidth:2,
                  // strokeColor:'#18171A',
                  face: 'Comic Sans MS',
            },

      },
      edges: {
            arrows: 'to',
            smooth: false // デフォルト:true、falseにするとエッジが直線になる
      },
      layout: {
            hierarchical: false
      },
}

export function agColor($ag: string, $AGENT_COLOR): string { // impure by AGENT_LIST
      const gg = () => _.map(AGENT_COLOR, x => x.agent)
      if (!_.includes(gg(), $ag)) { $AGENT_COLOR.push({ agent: $ag, color: Util.colorGen() }) }

      const ff = (x: AgentColor): string => { if (x.agent === $ag) { return x.color } };
      return _($AGENT_COLOR)
            .map(ff)
            .compact()
            .head()
}

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
//ここにonclickと繋がったdomain追加のevent listenerがある(saveData_action)
export function $id_of_input_for_arrow_backup(): string { //impure getElementById
      const _a = (document.getElementById('id_of_input_for_arrow_backup') as HTMLInputElement)
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
export function watchRemoveEdgeFunction($data: any, $callback: any, $nodes, $edges: Vis.DataSet<Vis.Edge>): void { //impure NODES,EDGES
      const _selectedEdge: string = _.head($data.edges)
      $edges.remove(_selectedEdge)
      nodeEdge2writeTopPanel($nodes, $edges)
}
// watch nodes add --not pure
export function watchAddNodefunction($nod: Vis.Node, $func: any, $nodes: Vis.DataSet<Vis.Node>, $edges: Vis.DataSet<Vis.Edge>, $label_action, $saveButton_action, $cancelButton_action, $popUp_node) { //impure: getElementById
      const clearPopUp_action = (): void => { //impure
            $saveButton_action.onclick = null;
            $cancelButton_action.onclick = null;
            $popUp_node.style.display = 'none';
      }

      const saveData_action = ($data: any, $callback: any): void => { // impure $node_label_action, NODES, alert
            // function saveData_action(nodes,edges,$data, $callback): void {
            $data.label = (document.getElementById('node-label_action') as HTMLInputElement).value
            const _domain2: string[] = _.map($nodes.get(), (x: Vis.Node) => x.label)
            $data.id = $data.label
            if (_domain2.indexOf($data.label) === -1) {
                  $nodes.add($data)
                  //htmlのpanelに反映する
                  nodeEdge2writeTopPanel($nodes, $edges)
                  //figureに反映する
                  clearPopUp_action();
                  $callback($data);
            } else {
                  alert(`The state '${$data.label}' already exists. Change the name.`)
            }
      }
      Util.writeDOM_value('#node-label_action')($nod.label)
      $saveButton_action.onclick = saveData_action.bind(this, $nod, $func);
      $cancelButton_action.onclick = clearPopUp_action.bind(null);
      $popUp_node.style.display = 'block';
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
                  color: agColor(agtInput, AGENT_COLOR),
                  id: addingArrow
            })
      };
      if (!_.includes($edges.getIds(), addingArrow)) {
            addEdge_checked()
            nodeEdge2writeTopPanel($nodes, $edges)      // $('#action_relation').html(edges2html($edges));
            $func($rel);
      } else {
            alert(`The arrow of 'agent ${agtInput} from ${$rel.from} to ${$rel.to}' already exists. Change the name.`)
      }
}

export function overlay4action($ACTION_LIST_NAME) {
      $('#input_formula').overlay([
          {
              match: $ACTION_LIST_NAME,
              css: {
                  'background-color': '#91fdfc'
              }
          }
      ]);
  }

//---------------------------------------------------------------------------------------
// action editor
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

export function actionObject2string($actionModel: ActionModel): string { // pure 

      const _name: string = $actionModel.name
      const _domain: string[] = $actionModel.domain
      const _relation: Relation[] = $actionModel.relation
      const _precondition: Precondition[] = $actionModel.precondition
      const _comment: string = $actionModel.comment
      const _relation2 = rel2anotherRel(_relation)
      // const _amname = _name.replace(/\(|\)|\;/g, "")
      const _amname = string2number(_name)
      let h =
            `<li>` +
            `<div class="btn-group model-title" data-toggle="buttons">`+
              `<input value="${_name}" type="button" class="panel_in_panel3 btn btn-danger btn-danger-overwrite btn-xs">`+
              `<input value="show graph" type="button" class="btn btn-info btn-info-overwrite btn-xs see_graph_${_amname}111">`+
            `</div>`+
            `<div class="close_panel action_list_panel" style="display:none">` +
            //            ここに隠す中身
            `<ul class="css_border_left">` +
            `<li class='class_name_of_action'>Name of Action Model ` +
            `<p>${_name}</p>` +
            `</li>` +
            `<li>Domain` +
            `<p>{${_domain}}</p>` +
            `</li>`;
      h += _.map(_relation2, x =>
            `<li><span style="color:${agColor(x.agent, AGENT_COLOR)}">Relation of ${x.agent} </span><p style="margin-left:1em;"> { ${x.relation.join(" , ")} }</p></li>`).join(" ");
      h += "<li>Precondition:<ul>" +
            _.map(_precondition, x => `<li>pre( <span>${x.from}</span> ) = <p style="margin-left:1em;">${x.to}</p></li>`).join(" ") +
            "</ul></li>";
      h += `<li>Comment <p>${_comment}</p></li>` +
            "</ul>" +
            "</div>" +
            //            ここまで隠す   
            "</li>";
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
export function amRelation2html($edge: Relation[]): string { //pure
      // const _arrayEdges2: any[]/*Relation[]*/ = $edge
      const _ff = (k: Relation2): string => {
            return "<li>Relation of <span class='textarea4agents'>" + k.agent + "</span>: <br>" +
                  "{" +
                  "<span class='textarea4relations' id='id_text_textarea4relations_for_" + k.agent + "_action'  cols='35' rows='3'>" +
                  _.join((k.relation), ", ") +
                  "</span>" +
                  "}" +
                  "</li>";
      }
      const _html: string = _.chain(rel2anotherRel($edge))
            .map(_ff)
            .uniq()
            .join(' ')
            .value()
      //reset
      // $('#action_relation').empty();
      return _html
}

// change precondition text (by save button in graph)
export function nodes2htmlPrecondition($dom: Vis.DataSet<Vis.Node>): string { //pure
      const _arrayNodes = $dom.get().map(x => x.label)
      return amDomain2htmlPrecondition(_arrayNodes)
}
export function amDomain2htmlPrecondition(dom: string[]): string { //pure
      $('#action_precondition').empty();
      const _ff = x =>
            `<li class='classOfPrecondition'>pre(<span class='color_text_panel'>${x}</span>) = ` +
            "<input type='text' value='top' class='precondition4state input_width'>" +
            "</input>" +
            "</li>";
      const _html = _(dom).map(_ff).join(" ")
      return _html
}

//-------------------------------------------------------------------
// write top panel
//-------------------------------------------------------------------
export function nodeEdge2writeTopPanel($nodes, $edges): void {
      Util.writeDOM_html("#number_of_domain")(nodes2string($nodes))
      Util.writeDOM_html('#action_relation')(amRelation2html(edges2html($edges)))
      $("#action_precondition").append(nodes2htmlPrecondition($nodes));
}
export function actionObject2writeTopPanel($act: ActionModel): void {

      Util.writeDOM_value('#form2_action')($act.name);
      //text of inputarea on figure
      Util.writeDOM_html('#actionNameOnGraph')($act.name)
      $('#number_of_domain').empty();
      Util.writeDOM_html("#number_of_domain")($act.domain.join(" , "))
      Util.writeDOM_html("#action_relation")(amRelation2html($act.relation))
      // $("#action_relation").append(amRelation2html($act.relation))
      // Util.writeDOM_html("#number_of_domain")(nodes2string(NODES))
      // Util.writeDOM_html("#action_relation")(edges2html(EDGES))
      $("#action_precondition").append(amDomain2htmlPrecondition($act.domain));
      $('#textarea_comment').val($act.comment);
}

export function actionObject2writeComposePanel(act: ActionModel): void {

      $('#composedAction').css('display', 'block');
      Util.writeDOM_value('#comp_form2_action')(act.name);
      //text of inputarea on figure
      $('#comp_number_of_domain').empty();
      Util.writeDOM_html("#comp_number_of_domain")(act.domain.join(" , "))
      Util.writeDOM_html("#comp_action_relation")(amRelation2html(act.relation))
      $('#comp_action_precondition').empty();
      // $("#comp_action_precondition").append(amDomain2htmlPrecondition(act.domain));
      _.map(act.precondition, x =>
            $('#comp_action_precondition').append(`<li> pre(${x.from})=${x.to}</li>`));
      $('#comp_textarea_comment').val(act.comment);
}
export function addAction2compositionSelect(name: string,$ready:boolean) {
      $("#select_composition_action1").append($('<option>').html(name).val(name))
      $("#select_composition_action2").append($('<option>').html(name).val(name))
      $("#select_composition_action1_DEL").append($('<option>').html(name).val(name))
      $("#select_composition_kripke_action2").append($('<option>').html(name).val(name))

      if ($ready) {
            $(".multiSelect_action").multilineSelectmenu_action()
      } else {
            $(".multiSelect_action").multilineSelectmenu_action('destroy');
            $(".multiSelect_action").multilineSelectmenu_action()
      }
}


export function graph2actionObject($name: string, $nodes: Vis.DataSet<Vis.Node>, $edges: Vis.DataSet<Vis.Edge>): ActionModel {
      return {
            name: $name,
            domain: _.map($nodes.get(), (x: Vis.Node) => x.label),//Ac.NODES,
            relation: _.map($edges.get(), (x: Vis.Edge) => { return { agent: x.label, from: String(x.from), to: String(x.to) } }),//Ac.NODES,,// Ac.EDGES,
            precondition: _.map($nodes.get(), (x: Vis.Node) => { return { from: x.label, to: "top" } }),
            comment: ""
      }
}
export function addEvent2actionList($am: ActionModel, $nodes, $edges): void {

      // const modifyName = (str) => str.replace(/\(|\)|\;/g, "")
      const modifyName = (str) => Util.string2number(str)
      const _amname = modifyName($am.name)//$am.name.replace(/\(|\)|\;/g, "")

      $(`.see_graph_${_amname}111`).on('click', () => {

            const _am = () => {
                  const aa = _.find(ACTION_DATA, x => modifyName(x.name) === _amname)
                  if (aa !== undefined) { return aa } else { alert("undefined in addEvent2actionList") }
            }
            const _newNodes = _.map(_am().domain, x => { return { label: x, id: x } })
            const _newEdges = _.map(_am().relation, x => {
                  return {
                        from: x.from,
                        to: x.to,
                        label: x.agent,
                        color: agColor(x.agent, AGENT_COLOR),
                        // id: x.from + x.to + x.agent
                        id: `${x.from}_${x.to}_${x.agent}`
                  }
            })

            actionObject2writeTopPanel(_am())
            change_global_NODES_EDGES_update(_newNodes, _newEdges)
      })
}



export function acName2ac(name: string, acs: ActionModel[]): ActionModel | undefined { //pure // introduce Either
      const ff = (x: any) => {
            return {
                  name: x.name,
                  domain: x.domain,
                  relation: x.relation,
                  precondition: x.precondition,
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

export function button2actionObject( // pure
      $nameInfo: string,
      $commentInfo: string,
      $fromInfo: any,
      $toInfo: any,
      $nodes: Vis.DataSet<Vis.Node>,
      $edges: Vis.DataSet<Vis.Edge>,
      $action_data: ActionModel[]): Either<void, ActionModel> {

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
      const preMake = (x: any[]): Precondition | undefined => {//index: number, elem) {
            const _dom: string = _.nth(x, 0)
            const _fromTo: any = _.nth(x, 1)
            const _from: any = _.nth(_fromTo, 0)
            const _to: any = _.nth(_fromTo, 1)
            if (_dom === _from.innerHTML) {
                  return {
                        from: _dom,
                        to: _to.value
                  }
            } else { return undefined }
      }
      const _pre4output: Precondition[] =
            _.chain(_cart)
                  .map(preMake)
                  .compact()
                  .value()
      // action_json 
      const action_object: ActionModel = {
            name: $nameInfo,
            domain: _domain4output,
            relation: _rel4output,
            precondition: _pre4output,
            comment: $commentInfo
      };
      //check if the name of action model exists.
      if (_.every($action_data, x => x.name !== action_object.name)) {
            return Either.right(action_object)
      } else {
            return Either.left(alert('The name "' + action_object.name + '" already exists in the list. Change the name.'))
      }
}

//--------------------------------------------------------------
//sample load (action models)
//--------------------------------------------------------------

export function ajax_output($e: string) {
      $.ajax({
            url: $e,
            dataType: 'html',
            success: function ($data) {
                  json2actionData($.parseJSON($data));
            },
            error: function () {
                  $('#sample-result').html('<font color="red">This is a browser error. Please try using a different browser.</font>');
            }
      });
};

export function json2actionData($json: any) {
      const namelist = _.map(ACTION_DATA, x => x.name)
      const ff = (name): boolean => {
            return !_.includes(namelist, name)
      }
      const AMsFromJSON = $json.filter(y => ff(y.name))

      ACTION_DATA = _.concat(ACTION_DATA, AMsFromJSON)
      // ACTION_DATA = AMsFromJSON
      $("#action_list").empty();
      // $("#select_composition_action1").empty()

      _.chain(ACTION_DATA)
            .uniqBy('name')
            .forEach(x => {
                  // 3. add action to composition select
                  addAction2compositionSelect(x.name,false)
                  // 4. write action list
                  $("#action_list").append(actionObject2string(x));
                  // 5. action listにevent割り当て
                  addEvent2actionList(x, NODES, EDGES)
            })
            .value()
      $('.close_panel').hide();
}


//------------------------------------------------------------
// undo redo
//------------------------------------------------------------
//history
export let history_list_back_action = [];
export let history_list_forward_action = [];

export function change_history_back_action() {
      history_list_back_action.unshift({
            nodes_his: NODES.get(NODES.getIds()),
            edges_his: EDGES.get(EDGES.getIds())
      });
      //reset forward history
      history_list_forward_action = [];
      // apply css
      css_for_undo_redo_chnage_action();
      console.log(EDGES)//aaa
}
export function redo_css_active_action() {
      $("#button_undo_action").css({
            color: "#878787",
            cursor: "pointer"
      });
};
export function undo_css_active_action() {
      $("#button_redo_action").css({
            color: "#878787",
            cursor: "pointer"
      });
};

export function redo_css_inactive_action() {
      $("#button_undo_action").css({
            color: "#EBEBEB",
            cursor: "default"
      });
};

export function undo_css_inactive_action() {
      $("#button_redo_action").css({
            color: "#EBEBEB",
            cursor: "default"
      });
};

export function css_for_undo_redo_chnage_action() {
      if (history_list_back_action.length === 1) {
            redo_css_inactive_action();
      } else {
            redo_css_active_action();
      };
      if (history_list_forward_action.length === 0) {
            undo_css_inactive_action();
      } else {
            undo_css_active_action();
      };
};














