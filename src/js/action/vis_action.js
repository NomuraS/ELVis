"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Util = require("../lib/util");
var Vis = require("../lib/vis");
var tsmonad_1 = require("tsmonad");
var util_1 = require("../lib/util");
var $$NODES_COLOR = "mediumturquoise";
exports.$$BACKGROUND_COLOR = "whitesmoke";
exports.$A1 = document.getElementById('node-label_action');
exports.$A2 = document.getElementById('saveButton_action');
exports.$A3 = document.getElementById('cancelButton_action');
exports.$A4 = document.getElementById('network-popUp_node');
exports.$AGENT_LABEL = document.getElementById('id_of_input_for_arrow_backup').value;
exports.$CONFIG_ACTION = document.getElementById('config_action');
exports.$CONTAINER_ACTION = document.getElementById('network_action');
function makeRefl($agt, $listWorld) {
    return _.chain(Util.cartesianProduct([$agt, $listWorld]))
        .map(function (pair) { return { "agent": _.nth(pair, 0), "from": _.nth(pair, 1), "to": _.nth(pair, 1) }; })
        .value();
}
exports.AGENT_COLOR = [{ agent: "a", color: "orangered" }, { agent: "b", color: "royalblue" }];
exports.NODES = new Vis.DataSet();
exports.EDGES = new Vis.DataSet();
var ActionModel_Skip = {
    "name": "Skip",
    "domain": ["e1"],
    "relation": [
        { "agent": "a", "from": "e1", "to": "e1" }
    ],
    "precondition": [
        { "from": "e1", "to": "top" }
    ],
    "comment": "top"
};
var ActionModel_Crash = {
    "name": "Crash",
    "domain": ["e0"],
    "relation": [
        { "agent": "a", "from": "e0", "to": "e0" }
    ],
    "precondition": [
        { "from": "e0", "to": "bot" }
    ],
    "comment": "bot"
};
var ActionModel_Reada = {
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
};
var ActionModel_MayReada = function () {
    var domOfmayRead = ["e0", "e1", "e9"];
    var reflOfmayRead = makeRefl(["a", "b"], domOfmayRead);
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
    };
}();
var ActionModel_MayReadb = function () {
    var domOfmayRead = ["e0", "e1", "e9"];
    var reflOfmayRead = makeRefl(["a", "b"], domOfmayRead);
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
    };
}();
exports.ACTION_DATA = [
    ActionModel_Skip,
    ActionModel_Crash,
    ActionModel_Reada,
];
function publicAnnouncement($agts, $f) {
    var pubName = "pub(" + $f + ")";
    var pubDomain = ["pub"];
    var pubRel = _.map($agts, function (x) { return { "agent": x, "from": "pub", "to": "pub" }; });
    var pubPre = [{ "from": "pub", "to": $f }];
    return {
        "name": pubName,
        "domain": pubDomain,
        "relation": pubRel,
        "precondition": pubPre,
        "comment": "public announcement of " + $f
    };
}
exports.OPTION_ACTION = {
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
        color: $$NODES_COLOR,
        font: {
            face: 'Comic Sans MS',
        },
    },
    edges: {
        arrows: 'to',
        smooth: false
    },
    layout: {
        hierarchical: false
    },
};
function agColor($ag, $AGENT_COLOR) {
    var gg = function () { return _.map(exports.AGENT_COLOR, function (x) { return x.agent; }); };
    if (!_.includes(gg(), $ag)) {
        $AGENT_COLOR.push({ agent: $ag, color: Util.colorGen() });
    }
    var ff = function (x) { if (x.agent === $ag) {
        return x.color;
    } };
    return _($AGENT_COLOR)
        .map(ff)
        .compact()
        .head();
}
exports.agColor = agColor;
function change_global_NODES_EDGES_update($nodes, $edges) {
    exports.EDGES.remove(exports.EDGES.getIds());
    exports.NODES.remove(exports.NODES.getIds());
    exports.NODES.update($nodes);
    exports.EDGES.update($edges);
}
function $id_of_input_for_arrow_backup() {
    var _a = document.getElementById('id_of_input_for_arrow_backup');
    return _a.value;
}
exports.$id_of_input_for_arrow_backup = $id_of_input_for_arrow_backup;
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
function watchRemoveEdgeFunction($data, $callback, $nodes, $edges) {
    var _selectedEdge = _.head($data.edges);
    $edges.remove(_selectedEdge);
    nodeEdge2writeTopPanel($nodes, $edges);
}
exports.watchRemoveEdgeFunction = watchRemoveEdgeFunction;
function watchAddNodefunction($nod, $func, $nodes, $edges, $label_action, $saveButton_action, $cancelButton_action, $popUp_node) {
    var clearPopUp_action = function () {
        $saveButton_action.onclick = null;
        $cancelButton_action.onclick = null;
        $popUp_node.style.display = 'none';
    };
    var saveData_action = function ($data, $callback) {
        $data.label = document.getElementById('node-label_action').value;
        var _domain2 = _.map($nodes.get(), function (x) { return x.label; });
        $data.id = $data.label;
        if (_domain2.indexOf($data.label) === -1) {
            $nodes.add($data);
            nodeEdge2writeTopPanel($nodes, $edges);
            clearPopUp_action();
            $callback($data);
        }
        else {
            alert("The state '" + $data.label + "' already exists. Change the name.");
        }
    };
    Util.writeDOM_value('#node-label_action')($nod.label);
    $saveButton_action.onclick = saveData_action.bind(this, $nod, $func);
    $cancelButton_action.onclick = clearPopUp_action.bind(null);
    $popUp_node.style.display = 'block';
}
exports.watchAddNodefunction = watchAddNodefunction;
function watchAddEdgefunction($rel, $func, $nodes, $edges, $agent) {
    var agtInput = $agent;
    var addingArrow = $rel.from + "_" + $rel.to + "_" + agtInput;
    var addEdge_checked = function () {
        $edges.add({
            from: $rel.from,
            to: $rel.to,
            label: agtInput,
            color: agColor(agtInput, exports.AGENT_COLOR),
            id: addingArrow
        });
    };
    if (!_.includes($edges.getIds(), addingArrow)) {
        addEdge_checked();
        nodeEdge2writeTopPanel($nodes, $edges);
        $func($rel);
    }
    else {
        alert("The arrow of 'agent " + agtInput + " from " + $rel.from + " to " + $rel.to + "' already exists. Change the name.");
    }
}
exports.watchAddEdgefunction = watchAddEdgefunction;
function overlay4action($ACTION_LIST_NAME) {
    $('#input_formula').overlay([
        {
            match: $ACTION_LIST_NAME,
            css: {
                'background-color': '#91fdfc'
            }
        }
    ]);
}
exports.overlay4action = overlay4action;
function rel2anotherRel($rel) {
    var customizer = function (x, y) {
        if (_.isArray(x)) {
            return _.uniq(x.concat(y));
        }
        else {
            return undefined;
        }
    };
    var ff = function (r) {
        return {
            agent: r.agent,
            relation: ["(" + r.from + "," + r.to + ")"]
        };
    };
    var bundleRel = function (x) {
        var gg = function (z, w) { return _.mergeWith(z, w, customizer); };
        return _.reduce(x, gg, {});
    };
    return _.chain($rel)
        .map(ff)
        .groupBy('agent')
        .sortBy('agent')
        .map(bundleRel)
        .value();
}
exports.rel2anotherRel = rel2anotherRel;
function actionObject2string($actionModel) {
    var _name = $actionModel.name;
    var _domain = $actionModel.domain;
    var _relation = $actionModel.relation;
    var _precondition = $actionModel.precondition;
    var _comment = $actionModel.comment;
    var _relation2 = rel2anotherRel(_relation);
    var _amname = util_1.string2number(_name);
    var h = "<li>" +
        "<div class=\"btn-group model-title\" data-toggle=\"buttons\">" +
        ("<input value=\"" + _name + "\" type=\"button\" class=\"panel_in_panel3 btn btn-danger btn-danger-overwrite btn-xs\">") +
        ("<input value=\"show graph\" type=\"button\" class=\"btn btn-info btn-info-overwrite btn-xs see_graph_" + _amname + "111\">") +
        "</div>" +
        "<div class=\"close_panel action_list_panel\" style=\"display:none\">" +
        "<ul class=\"css_border_left\">" +
        "<li class='class_name_of_action'>Name of Action Model " +
        ("<p>" + _name + "</p>") +
        "</li>" +
        "<li>Domain" +
        ("<p>{" + _domain + "}</p>") +
        "</li>";
    h += _.map(_relation2, function (x) {
        return "<li><span style=\"color:" + agColor(x.agent, exports.AGENT_COLOR) + "\">Relation of " + x.agent + " </span><p style=\"margin-left:1em;\"> { " + x.relation.join(" , ") + " }</p></li>";
    }).join(" ");
    h += "<li>Precondition:<ul>" +
        _.map(_precondition, function (x) { return "<li>pre( <span>" + x.from + "</span> ) = <p style=\"margin-left:1em;\">" + x.to + "</p></li>"; }).join(" ") +
        "</ul></li>";
    h += "<li>Comment <p>" + _comment + "</p></li>" +
        "</ul>" +
        "</div>" +
        "</li>";
    return h;
}
exports.actionObject2string = actionObject2string;
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
function amRelation2html($edge) {
    var _ff = function (k) {
        return "<li>Relation of <span class='textarea4agents'>" + k.agent + "</span>: <br>" +
            "{" +
            "<span class='textarea4relations' id='id_text_textarea4relations_for_" + k.agent + "_action'  cols='35' rows='3'>" +
            _.join((k.relation), ", ") +
            "</span>" +
            "}" +
            "</li>";
    };
    var _html = _.chain(rel2anotherRel($edge))
        .map(_ff)
        .uniq()
        .join(' ')
        .value();
    return _html;
}
exports.amRelation2html = amRelation2html;
function nodes2htmlPrecondition($dom) {
    var _arrayNodes = $dom.get().map(function (x) { return x.label; });
    return amDomain2htmlPrecondition(_arrayNodes);
}
exports.nodes2htmlPrecondition = nodes2htmlPrecondition;
function amDomain2htmlPrecondition(dom) {
    $('#action_precondition').empty();
    var _ff = function (x) {
        return "<li class='classOfPrecondition'>pre(<span class='color_text_panel'>" + x + "</span>) = " +
            "<input type='text' value='top' class='precondition4state input_width'>" +
            "</input>" +
            "</li>";
    };
    var _html = _(dom).map(_ff).join(" ");
    return _html;
}
exports.amDomain2htmlPrecondition = amDomain2htmlPrecondition;
function nodeEdge2writeTopPanel($nodes, $edges) {
    Util.writeDOM_html("#number_of_domain")(nodes2string($nodes));
    Util.writeDOM_html('#action_relation')(amRelation2html(edges2html($edges)));
    $("#action_precondition").append(nodes2htmlPrecondition($nodes));
}
exports.nodeEdge2writeTopPanel = nodeEdge2writeTopPanel;
function actionObject2writeTopPanel($act) {
    Util.writeDOM_value('#form2_action')($act.name);
    Util.writeDOM_html('#actionNameOnGraph')($act.name);
    $('#number_of_domain').empty();
    Util.writeDOM_html("#number_of_domain")($act.domain.join(" , "));
    Util.writeDOM_html("#action_relation")(amRelation2html($act.relation));
    $("#action_precondition").append(amDomain2htmlPrecondition($act.domain));
    $('#textarea_comment').val($act.comment);
}
exports.actionObject2writeTopPanel = actionObject2writeTopPanel;
function actionObject2writeComposePanel(act) {
    $('#composedAction').css('display', 'block');
    Util.writeDOM_value('#comp_form2_action')(act.name);
    $('#comp_number_of_domain').empty();
    Util.writeDOM_html("#comp_number_of_domain")(act.domain.join(" , "));
    Util.writeDOM_html("#comp_action_relation")(amRelation2html(act.relation));
    $('#comp_action_precondition').empty();
    _.map(act.precondition, function (x) {
        return $('#comp_action_precondition').append("<li> pre(" + x.from + ")=" + x.to + "</li>");
    });
    $('#comp_textarea_comment').val(act.comment);
}
exports.actionObject2writeComposePanel = actionObject2writeComposePanel;
function addAction2compositionSelect(name, $ready) {
    $("#select_composition_action1").append($('<option>').html(name).val(name));
    $("#select_composition_action2").append($('<option>').html(name).val(name));
    $("#select_composition_action1_DEL").append($('<option>').html(name).val(name));
    $("#select_composition_kripke_action2").append($('<option>').html(name).val(name));
    if ($ready) {
        $(".multiSelect_action").multilineSelectmenu_action();
    }
    else {
        $(".multiSelect_action").multilineSelectmenu_action('destroy');
        $(".multiSelect_action").multilineSelectmenu_action();
    }
}
exports.addAction2compositionSelect = addAction2compositionSelect;
function graph2actionObject($name, $nodes, $edges) {
    return {
        name: $name,
        domain: _.map($nodes.get(), function (x) { return x.label; }),
        relation: _.map($edges.get(), function (x) { return { agent: x.label, from: String(x.from), to: String(x.to) }; }),
        precondition: _.map($nodes.get(), function (x) { return { from: x.label, to: "top" }; }),
        comment: ""
    };
}
exports.graph2actionObject = graph2actionObject;
function addEvent2actionList($am, $nodes, $edges) {
    var modifyName = function (str) { return Util.string2number(str); };
    var _amname = modifyName($am.name);
    $(".see_graph_" + _amname + "111").on('click', function () {
        var _am = function () {
            var aa = _.find(exports.ACTION_DATA, function (x) { return modifyName(x.name) === _amname; });
            if (aa !== undefined) {
                return aa;
            }
            else {
                alert("undefined in addEvent2actionList");
            }
        };
        var _newNodes = _.map(_am().domain, function (x) { return { label: x, id: x }; });
        var _newEdges = _.map(_am().relation, function (x) {
            return {
                from: x.from,
                to: x.to,
                label: x.agent,
                color: agColor(x.agent, exports.AGENT_COLOR),
                id: x.from + "_" + x.to + "_" + x.agent
            };
        });
        actionObject2writeTopPanel(_am());
        change_global_NODES_EDGES_update(_newNodes, _newEdges);
    });
}
exports.addEvent2actionList = addEvent2actionList;
function acName2ac(name, acs) {
    var ff = function (x) {
        return {
            name: x.name,
            domain: x.domain,
            relation: x.relation,
            precondition: x.precondition,
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
function button2actionObject($nameInfo, $commentInfo, $fromInfo, $toInfo, $nodes, $edges, $action_data) {
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
                from: _dom,
                to: _to.value
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
    var action_object = {
        name: $nameInfo,
        domain: _domain4output,
        relation: _rel4output,
        precondition: _pre4output,
        comment: $commentInfo
    };
    if (_.every($action_data, function (x) { return x.name !== action_object.name; })) {
        return tsmonad_1.Either.right(action_object);
    }
    else {
        return tsmonad_1.Either.left(alert('The name "' + action_object.name + '" already exists in the list. Change the name.'));
    }
}
exports.button2actionObject = button2actionObject;
function ajax_output($e) {
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
}
exports.ajax_output = ajax_output;
;
function json2actionData($json) {
    var namelist = _.map(exports.ACTION_DATA, function (x) { return x.name; });
    var ff = function (name) {
        return !_.includes(namelist, name);
    };
    var AMsFromJSON = $json.filter(function (y) { return ff(y.name); });
    exports.ACTION_DATA = _.concat(exports.ACTION_DATA, AMsFromJSON);
    $("#action_list").empty();
    _.chain(exports.ACTION_DATA)
        .uniqBy('name')
        .forEach(function (x) {
        addAction2compositionSelect(x.name, false);
        $("#action_list").append(actionObject2string(x));
        addEvent2actionList(x, exports.NODES, exports.EDGES);
    })
        .value();
    $('.close_panel').hide();
}
exports.json2actionData = json2actionData;
