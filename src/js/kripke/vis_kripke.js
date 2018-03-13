"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Util = require("../lib/util");
var Vis = require("../lib/vis");
var Ac = require("../action/vis_action");
var $$NODES_COLOR_KRIPKE = "#C38728";
exports.$$BACKGROUND_COLOR = "#333333";
exports.$AGENT_LABEL = document.getElementById('id_of_input_for_arrow_backup_kripke').value;
exports.$CONFIG_KRIPKE = document.getElementById('config_kripke');
exports.$CONTAINER_KRIPKE = document.getElementById('network_kripke');
exports.AGENT_COLOR_K = [
    { agent: "a", color: "#9CDD29" },
    { agent: "b", color: "#5BD4ED" },
    { agent: "c", color: "#F82167" }
];
exports.NODES = new Vis.DataSet();
exports.EDGES = new Vis.DataSet();
function makeRefl($agt, $listWorld) {
    return _.chain(Util.cartesianProduct([$agt, $listWorld]))
        .map(function (pair) { return { "agent": _.nth(pair, 0), "from": _.nth(pair, 1), "to": _.nth(pair, 1) }; })
        .value();
}
var MuddyChildren = function () {
    var domOfMuddy = ["w000", "w100", "w001", "w010", "w011", "w110", "w101", "w111"];
    var reflOfMuddy = makeRefl(["a", "b", "c"], domOfMuddy);
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
    };
}();
var HexaModel = function () {
    var domOfHexa = ["w012", "w021", "w102", "w201", "w210", "w120"];
    var reflOfHexa = makeRefl(["a", "b", "c"], domOfHexa);
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
    };
}();
var Letter = function () {
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
    };
}();
exports.KRIPKE_DATA = [MuddyChildren, Letter, HexaModel];
exports.OPTION_KRIPKE = {
    physics: {
        barnesHut: {
            gravitationalConstant: -2000,
            centralGravity: 0.2,
            springLength: 100,
            springConstant: 0.05,
        }
    },
    locales: {
        en: {
            edit: 'Edit',
            del: 'Delete selected',
            back: 'Back',
            addNode: 'Add World',
            addEdge: 'Add Arrow of&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp; ',
            editNode: 'Edit World',
            editEdge: 'Edit Arrow',
            addDescription: 'Click in an empty space to place a new world.',
            edgeDescription: 'Click on a world and drag the arrow to another world.',
            editEdgeDescription: 'Click on the control points and drag them to a world to connect to it.',
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
            face: 'Comic Sans MS',
        },
        color: $$NODES_COLOR_KRIPKE
    },
    edges: {
        arrows: 'to',
        smooth: false
    },
    layout: {
        hierarchical: false
    },
};
function change_global_NODES_EDGES_update($nodes, $edges) {
    exports.EDGES.remove(exports.EDGES.getIds());
    exports.NODES.remove(exports.NODES.getIds());
    exports.NODES.update($nodes);
    exports.EDGES.update($edges);
}
function $id_of_input_for_arrow_backup_kripke() {
    var _a = document.getElementById('id_of_input_for_arrow_backup_kripke');
    return _a.value;
}
exports.$id_of_input_for_arrow_backup_kripke = $id_of_input_for_arrow_backup_kripke;
function watchRemoveNodefunction($data, $callback, $nodes, $edges) {
    var _arrayEdges = $edges.get();
    var _selectednode = _.head($data.nodes);
    var _ff = function (x) {
        var _a = x.from === _selectednode;
        var _b = x.to === _selectednode;
        var _c = x.id;
        _a || _b ? $edges.remove(_c) : undefined;
    };
    $nodes.remove(_selectednode);
    _.forEach(_arrayEdges, _ff);
    nodeEdge2writeTopPanel($nodes, $edges);
}
exports.watchRemoveNodefunction = watchRemoveNodefunction;
function watchRemoveDeletefunction($data, $callback, $nodes, $edges) {
    var _selectedEdge = _.head($data.edges);
    $edges.remove(_selectedEdge);
    nodeEdge2writeTopPanel($nodes, $edges);
}
exports.watchRemoveDeletefunction = watchRemoveDeletefunction;
function watchAddNodefunction($nod, $func, $nodes, $edges) {
    var _label_kripke = document.getElementById('node-label_kripke');
    var _saveButton_kripke = document.getElementById('saveButton_kripke');
    var _cancelButton_kripke = document.getElementById('cancelButton_kripke');
    var _popUp_node_kripke = document.getElementById('network-popUp_node_kripke');
    var _clearPopUp_kripke = function () {
        _saveButton_kripke.onclick = null;
        _cancelButton_kripke.onclick = null;
        _popUp_node_kripke.style.display = 'none';
    };
    var _saveData_kripke = function ($data, $callback) {
        $data.label = document.getElementById('node-label_kripke').value;
        var _domain2 = _.map($nodes.get(), function (x) { return x.label; });
        $data.id = $data.label;
        if (_domain2.indexOf($data.label) === -1) {
            $nodes.add($data);
            nodeEdge2writeTopPanel($nodes, $edges);
            _clearPopUp_kripke();
            $callback($data);
        }
        else {
            alert("The world '" + $data.label + "' already exists. Change the name.");
        }
    };
    Util.writeDOM_value('#node-label_kripke')($nod.label);
    _saveButton_kripke.onclick = _saveData_kripke.bind(this, $nod, $func);
    _cancelButton_kripke.onclick = _clearPopUp_kripke.bind(null);
    _popUp_node_kripke.style.display = 'block';
}
exports.watchAddNodefunction = watchAddNodefunction;
function watchAddEdgefunction($rel, $func, $nodes, $edges, $agent) {
    var _agtInput = $agent;
    var _addingArrow = $rel.from + "_" + $rel.to + "_" + _agtInput;
    var _addEdge_checked = function () {
        $edges.add({
            from: $rel.from,
            to: $rel.to,
            label: _agtInput,
            color: Ac.agColor(_agtInput, exports.AGENT_COLOR_K),
            id: _addingArrow
        });
    };
    if (!_.includes($edges.getIds(), _addingArrow)) {
        _addEdge_checked();
        nodeEdge2writeTopPanel($nodes, $edges);
        $func($rel);
    }
    else {
        alert("The arrow of 'agent " + _agtInput + " from " + $rel.from + " to " + $rel.to + "' already exists. Change the name.");
    }
}
exports.watchAddEdgefunction = watchAddEdgefunction;
function rel2anotherRel($rel) {
    var _customizer = function (x, y) {
        if (_.isArray(x)) {
            return _.uniq(x.concat(y));
        }
        else {
            return undefined;
        }
    };
    var _ff = function (r) {
        return {
            agent: r.agent,
            relation: ["(" + r.from + "," + r.to + ")"]
        };
    };
    var _bundleRel = function (x) {
        var gg = function (z, w) { return _.mergeWith(z, w, _customizer); };
        return _.reduce(x, gg, {});
    };
    return _.chain($rel)
        .map(_ff)
        .groupBy('agent')
        .sortBy('agent')
        .map(_bundleRel)
        .value();
}
exports.rel2anotherRel = rel2anotherRel;
function kripkeObject2string($kripkeModel) {
    var _name = $kripkeModel.name;
    var _name2 = _name.replace(/\|/g, "<br>|").replace(/\*/g, "<br>*");
    var _domain = $kripkeModel.domain.join(" , ");
    var _relation = $kripkeModel.relation;
    var _valuation = $kripkeModel.valuation;
    var _comment = $kripkeModel.comment;
    var _relation2 = rel2anotherRel(_relation);
    var _amname = Util.string2number(_name);
    var h = "<li>" +
        "<div class=\"btn-group model-title\" data-toggle=\"buttons\">" +
        ("<button type=\"button\" class=\"panel_in_panel3 btn btn-success btn-success-overwrite btn-xs\">" + _name2 + "</button>") +
        ("<button type=\"button\" class=\"btn btn-info btn-info-overwrite btn-xs see_graph_" + _amname + "\">show graph</button>") +
        "</div>" +
        "<div class=\"close_panel kripke_list_panel\" style=\"display:none\">" +
        "<ul class=\"css_border_left_green\">" +
        "<li class='class_name_of_kripke'>Name of Kripke Model " +
        ("<p>" + _name + "</p>") +
        "</li>" +
        "<li>Domain" +
        ("<p>{" + _domain + "}</p>") +
        "</li>";
    h += _.map(_relation2, function (x) {
        return "<li><span style=\"color:" + Ac.agColor(x.agent, exports.AGENT_COLOR_K) + "\">Relation of " + x.agent + " </span><p style=\"margin-left:1em;\">{ " + x.relation.join(" , ") + " }</p></li>";
    }).join(" ");
    h += "<li>Valuation" +
        "<ul>" +
        _.map(_valuation, function (x) { return "<li>Value( <span>" + x.prop + "</span> ) = <p style=\"margin-left:1em;\">{ " + x.worlds.join(", ") + " }</p></li>"; }).join(" ") +
        "</ul>" +
        "<ul class=\"list-unstyled2\">" +
        "<li class='classOfPrecondition_kripke'>Value(" +
        "<span class='color_text_panel_kripke'> x </span>) =" +
        "&empty;, &nbsp; if other x  &isin;  Atom" +
        "</li>" +
        "</ul>" +
        "</li>";
    h += "<li>Comment <p>" + _comment + "</p></li>" +
        "</ul>" +
        "</div>" +
        "</li>";
    return h;
}
exports.kripkeObject2string = kripkeObject2string;
function edges2html($edge) {
    var _arrayEdges = $edge.get();
    var _arrayEdges2 = _.map(_arrayEdges, function (x) {
        return { agent: x.label, from: x.from, to: x.to };
    });
    return (_arrayEdges2);
}
exports.edges2html = edges2html;
function edges2relation($edge) {
    var _arrayEdges = $edge.get();
    var _arrayEdges2 = _.map(_arrayEdges, function (x) {
        return { agent: x.label, from: x.from, to: x.to };
    });
    return _arrayEdges2;
}
exports.edges2relation = edges2relation;
function kmRelation2html($edge) {
    var _arrayEdges2 = $edge;
    var _ff = function (k) {
        return "<li>Relation of <span class='textarea4agents'>" + k.agent + "</span>: <br>" +
            "{" +
            "<span  id='id_text_textarea4relations_for_" + k.agent + "_kripke'  cols='35' rows='3'>" +
            _.join((k.relation), ", ") +
            "</span>" +
            "}" +
            "</li>";
    };
    var _html = _.chain(rel2anotherRel(_arrayEdges2))
        .map(_ff)
        .uniq()
        .join(' ')
        .value();
    return _html;
}
exports.kmRelation2html = kmRelation2html;
function kmDomain2htmlValuation($val) {
    $('#kripke_valuation').empty();
    var _ff = function (x) {
        return "<li class='classOfPrecondition_kripke'>Value(<span class='color_text_panel_kripke'> " + x.prop + " </span>) = " +
            ("{ <input type='text' value='" + x.worlds + "' class='precondition4state_kripke input_width_small'> }") +
            "</li>";
    };
    return _($val).map(_ff).join(" ");
}
function kmDomain2htmlValuation_for_display($val) {
    var _ff = function (x) {
        return "<li class='classOfPrecondition_kripke'>Value(<span class='color_text_panel_kripke'> " + x.prop + " </span>) = { " + x.worlds + " }" +
            "</li>";
    };
    return _($val).map(_ff).join(" ");
}
exports.kmDomain2htmlValuation_for_display = kmDomain2htmlValuation_for_display;
function nodeEdge2writeTopPanel($nodes, $edges) {
    Util.writeDOM_html("#number_of_domain_kripke")(nodes2string($nodes));
    Util.writeDOM_html('#kripke_relation')(kmRelation2html(edges2html($edges)));
}
exports.nodeEdge2writeTopPanel = nodeEdge2writeTopPanel;
function kripkeObject2writeTopPanel($act, $change_val) {
    Util.writeDOM_value('#form2_kripke')($act.name);
    Util.writeDOM_html('#kripkeNameOnGraph')($act.name);
    $('#number_of_domain_kripke').empty();
    Util.writeDOM_html("#number_of_domain_kripke")($act.domain.join(" , "));
    Util.writeDOM_html("#kripke_relation")(kmRelation2html($act.relation));
    $('#textarea_comment_kripke').val($act.comment);
    if ($change_val) {
        $("#kripke_valuation").append(kmDomain2htmlValuation($act.valuation));
    }
}
exports.kripkeObject2writeTopPanel = kripkeObject2writeTopPanel;
function addKripke2compositionSelect($name, $ready) {
    var _name = $name;
    _name = _name.replace(/\|/g, "%|");
    _name = _name.replace(/\*/g, "%*");
    $("#select_composition_kripke1").append($('<option>').html(_name).val(_name));
    $("#select_composition_kripke1_pal").append($('<option>').html(_name).val(_name));
    $("#select_composition_kripke1_DEL").append($('<option>').html(_name).val(_name));
    $("#select_kripke_for_truthChecker").append($('<option>').html(_name).val(_name));
    if ($ready) {
        $(".multiSelect_kripke").multilineSelectmenu();
    }
    else {
        $(".multiSelect_kripke").multilineSelectmenu('destroy');
        $(".multiSelect_kripke").multilineSelectmenu();
    }
}
exports.addKripke2compositionSelect = addKripke2compositionSelect;
function addWorlds2worldSelect_for_truthChecker($name, $KRIPKE_LIST) {
    var kmodel = _.find($KRIPKE_LIST, function (o) { return o.name === $name; });
    var ff = function (x) {
        $("#select_world_for_truthChecker").append($('<option>').html(x).val(x));
    };
    _.map(kmodel.domain, ff);
}
exports.addWorlds2worldSelect_for_truthChecker = addWorlds2worldSelect_for_truthChecker;
function graph2kripkeObject($name, $nodes, $edges) {
    return {
        name: $name,
        domain: _.map($nodes.get(), function (x) { return x.label; }),
        relation: _.map($edges.get(), function (x) { return { agent: x.label, from: String(x.from), to: String(x.to) }; }),
        valuation: [],
        comment: ""
    };
}
exports.graph2kripkeObject = graph2kripkeObject;
function addEvent2kripkeList($km, $nodes, $edges, $change_val) {
    var modifyName = function (str) { return Util.string2number(str); };
    var _kmname = modifyName($km.name);
    $(".see_graph_" + _kmname).on('click', function () {
        var _km = function () {
            var aa = _.find(exports.KRIPKE_DATA, function (x) { return modifyName(x.name) === _kmname; });
            if (aa !== undefined) {
                return aa;
            }
            else {
                alert("undefined in addEvent2kripkeList");
            }
        };
        var _newNodes = _.map(_km().domain, function (x) { return { label: x, id: x }; });
        var _newEdges = _.map(_km().relation, function (x) {
            return {
                from: x.from,
                to: x.to,
                label: x.agent,
                color: Ac.agColor(x.agent, exports.AGENT_COLOR_K),
                id: x.from + "_" + x.to + "_" + x.agent
            };
        });
        kripkeObject2writeTopPanel(_km(), $change_val);
        change_global_NODES_EDGES_update(_newNodes, _newEdges);
    });
}
exports.addEvent2kripkeList = addEvent2kripkeList;
function acName2ac(name, acs) {
    var ff = function (x) {
        return {
            name: x.name,
            domain: x.domain,
            relation: x.relation,
            valuation: x.valuation,
            comment: "",
        };
    };
    return ff(_.find(acs, function (x) { return x.name === name; }));
}
exports.acName2ac = acName2ac;
function nodes2string($nodes) {
    $('#number_of_domain').empty();
    return _($nodes.get())
        .map(function (x) { return x.label; })
        .join(" , ");
}
exports.nodes2string = nodes2string;
function button2kripkeObject($nameInfo, $commentInfo, $fromInfo, $toInfo, $nodes, $edges, $KRIPKE_DATA) {
    var _domain4output = _.map($nodes.get(), function (x) { return x.label; });
    var _arrayEdges = $edges.get();
    var relMake = function (x) {
        var z = _.nth(x, 0);
        if (z.label === _.nth(x, 1)) {
            return { agent: z.label, from: z.from, to: z.to };
        }
        else {
            return undefined;
        }
    };
    var _rel4output = _.chain(_arrayEdges)
        .map(function (x) { return x.label; })
        .uniq()
        .thru(function (x) { return Util.cartesianProduct([_arrayEdges, x]); })
        .map(relMake)
        .uniqWith(_.isEqual)
        .compact()
        .value();
    var _fromTo = (_.zip($fromInfo, $toInfo));
    var _cart = Util.cartesianProduct([_domain4output, _fromTo]);
    var preMake = function (x) {
        var _dom = _.nth(x, 0);
        var _fromTo = _.nth(x, 1);
        var _from = _.nth(_fromTo, 0);
        var _to = _.nth(_fromTo, 1);
        if (_dom === _from.innerHTML) {
            return {
                prop: _dom,
                worlds: _to.value
            };
        }
        else {
            return undefined;
        }
    };
    var _pre4output = _.chain(_cart)
        .map(preMake)
        .compact()
        .value();
    var _kripke_object = {
        name: $nameInfo,
        domain: _domain4output,
        relation: _rel4output,
        valuation: _pre4output,
        comment: $commentInfo
    };
    return _kripke_object;
}
exports.button2kripkeObject = button2kripkeObject;
function kmName2km($name, $kms) {
    var _nameWithout = $name.replace(/\%| /g, "");
    var ff = function (x) {
        return {
            name: x.name,
            domain: x.domain,
            relation: x.relation,
            valuation: x.valuation,
            comment: "",
        };
    };
    return ff(_.find($kms, function (x) { return x.name === _nameWithout; }));
}
exports.kmName2km = kmName2km;
function ajax_output($e) {
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
}
exports.ajax_output = ajax_output;
;
function json2kripkeData($json) {
    var namelist = _.map(exports.KRIPKE_DATA, function (x) { return x.name; });
    var ff = function (name) {
        return !_.includes(namelist, name);
    };
    var _KMsFromJSON = $json.filter(function (y) { return ff(y.name); });
    exports.KRIPKE_DATA = _.concat(exports.KRIPKE_DATA, _KMsFromJSON);
    $("#kripke_list").empty();
    _.chain(exports.KRIPKE_DATA)
        .uniqBy('name')
        .forEach(function (x) {
        addKripke2compositionSelect(x.name, false);
        $("#kripke_list").append(kripkeObject2string(x));
        addEvent2kripkeList(x, exports.NODES, exports.EDGES, true);
    })
        .value();
    $('.close_panel').hide();
}
exports.json2kripkeData = json2kripkeData;
exports.history_list_back_kripke = [];
exports.history_list_forward_kripke = [];
function change_history_back_kripke() {
    exports.history_list_back_kripke.unshift({
        nodes_his: exports.NODES.get(exports.NODES.getIds()),
        edges_his: exports.EDGES.get(exports.EDGES.getIds())
    });
    exports.history_list_forward_kripke = [];
    css_for_undo_redo_chnage_kripke();
}
exports.change_history_back_kripke = change_history_back_kripke;
function redo_css_active_kripke() {
    $("#button_undo_kripke").css({
        color: "#878787",
        cursor: "pointer"
    });
}
exports.redo_css_active_kripke = redo_css_active_kripke;
;
function undo_css_active_kripke() {
    $("#button_redo_kripke").css({
        color: "#878787",
        cursor: "pointer"
    });
}
exports.undo_css_active_kripke = undo_css_active_kripke;
;
function redo_css_inactive_kripke() {
    $("#button_undo_kripke").css({
        color: "#EBEBEB",
        cursor: "default"
    });
}
exports.redo_css_inactive_kripke = redo_css_inactive_kripke;
;
function undo_css_inactive_kripke() {
    $("#button_redo_kripke").css({
        color: "#EBEBEB",
        cursor: "default"
    });
}
exports.undo_css_inactive_kripke = undo_css_inactive_kripke;
;
function css_for_undo_redo_chnage_kripke() {
    if (exports.history_list_back_kripke.length === 1) {
        redo_css_inactive_kripke();
    }
    else {
        redo_css_active_kripke();
    }
    ;
    if (exports.history_list_forward_kripke.length === 0) {
        undo_css_inactive_kripke();
    }
    else {
        undo_css_active_kripke();
    }
    ;
}
exports.css_for_undo_redo_chnage_kripke = css_for_undo_redo_chnage_kripke;
;
