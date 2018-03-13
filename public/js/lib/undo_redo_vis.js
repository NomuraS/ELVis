
// event on
NODES.on("*", change_history_back_kripke);
EDGES.on("*", change_history_back_kripke);

//initialize
let history_list_back_kripke = [];
let history_list_forward_kripke = [];

// initial data
history_list_back_kripke.push({
  nodes_his: NODES.get(NODES.getIds()),
  edges_his: EDGES.get(EDGES.getIds())
});

function change_history_back_kripke() {
  history_list_back_kripke.unshift({
    nodes_his: NODES.get(NODES.getIds()),
    edges_his: EDGES.get(EDGES.getIds())
  });
  //reset forward history
  history_list_forward_kripke = [];
  // apply css
  css_for_undo_redo_chnage_kripke();
}
function redo_css_active_kripke() {
  $("#button_undo_kripke").css({
    "background-color": "inherit",
    color: "#878787",
    cursor: "pointer"
  });
};
function undo_css_active_kripke() {
  $("#button_redo_kripke").css({
    "background-color": "inherit",
    color: "#878787",
    cursor: "pointer"
  });
};

function redo_css_inactive_kripke() {
  $("#button_undo_kripke").css({
    "background-color": "inherit",
    color: "#EBEBEB",
    cursor: "inherit"
  });
};

function undo_css_inactive_kripke() {
  $("#button_redo_kripke").css({
    "background-color": "inherit",
    color: "#EBEBEB",
    cursor: "inherit"
  });
};

function css_for_undo_redo_chnage_kripke() {
  if (history_list_back_kripke.length === 1) {
    redo_css_inactive_kripke();
  } else {
    redo_css_active_kripke();
  };
  if (history_list_forward_kripke.length === 0) {
    undo_css_inactive_kripke();
  } else {
    undo_css_active_kripke();
  };
};

// event

$(document).ready(function() {
  // apply css
  css_for_undo_redo_chnage_kripke();
});

$("#button_undo_kripke").on("click", function() {
  if (history_list_back_kripke.length > 1) {
    const current_nodes = NODES.get(NODES.getIds());
    const current_edges = EDGES.get(EDGES.getIds());
    const previous_nodes = history_list_back_kripke[1].nodes_his;
    const previous_edges = history_list_back_kripke[1].edges_his;
    // event off
    NODES.off("*", change_history_back_kripke);
    EDGES.off("*", change_history_back_kripke);
    // undo without events
    if (current_nodes.length > previous_nodes.length) {
      const previous_nodes_diff = _.differenceBy(
        current_nodes,
        previous_nodes,
        "id"
      );
      NODES.remove(previous_nodes_diff);
    } else {
      NODES.update(previous_nodes);
    }

    if (current_edges.length > previous_edges.length) {
      const previous_edges_diff = _.differenceBy(
        current_edges,
        previous_edges,
        "id"
      );
      EDGES.remove(previous_edges_diff);
    } else {
      EDGES.update(previous_edges);
    }
    // recover event on
    NODES.on("*", change_history_back_kripke);
    EDGES.on("*", change_history_back_kripke);

    history_list_forward_kripke.unshift({
      nodes_his: history_list_back_kripke[0].nodes_his,
      edges_his: history_list_back_kripke[0].edges_his
    });
    history_list_back_kripke.shift();
            // apply css
    css_for_undo_redo_chnage_kripke();
  }
});

$("#button_redo_kripke").on("click", function() {
  if (history_list_forward_kripke.length > 0) {
    const current_nodes = NODES.get(NODES.getIds()); 
    const current_edges = EDGES.get(EDGES.getIds());
    const forward_nodes = history_list_forward_kripke[0].nodes_his; 
    const forward_edges = history_list_forward_kripke[0].edges_his; 
    // event off
    NODES.off("*", change_history_back_kripke);
    EDGES.off("*", change_history_back_kripke);
    // redo without events
    if (current_nodes.length > forward_nodes.length) {
      const forward_nodes_diff = _.differenceBy(
        current_nodes,
        forward_nodes,
        "id"
      );
      NODES.remove(forward_nodes_diff);
    } else {
      NODES.update(forward_nodes);
    }
    if (current_edges.length > forward_edges.length) {
      const forward_edges_diff = _.differenceBy(
        current_edges,
        forward_edges,
        "id"
      );
      EDGES.remove(forward_edges_diff);
    } else {
      EDGES.update(forward_edges);
    }
    // recover event on
    NODES.on("*", change_history_back_kripke);
    EDGES.on("*", change_history_back_kripke);
    history_list_back_kripke.unshift({
      nodes_his: history_list_forward_kripke[0].nodes_his,
      edges_his: history_list_forward_kripke[0].edges_his
    });
    // history_list_forward_kripke
    history_list_forward_kripke.shift();
        // apply css
    css_for_undo_redo_chnage_kripke();
  }
});
