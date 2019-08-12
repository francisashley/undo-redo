import React from "react";
import PropTypes from "prop-types";
import ControlPanel from "./ControlPanel";
import ExampleSubject from "./ExampleSubject";
import arrayMove from "array-move";
import History from "@fa-repo/undo-redo";
import "./BasicUsage.scss";

/**
 * BasicUsage
 */

class BasicUsage extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    items: [
      { title: "Item A", bg: "#F79F79", fg: "black" },
      { title: "Item B", bg: "#F7D08A", fg: "black" },
      { title: "Item C", bg: "#E3F09B", fg: "black" },
      { title: "Item D", bg: "#87B6A7", fg: "black" },
      { title: "Item E", bg: "#5B5941", fg: "white" }
    ]
  };

  constructor(props) {
    super(props);

    this.appHistory = new History();
  }

  moveItem = (from, to) => {
    if (from !== to) {
      this.appHistory.do(`Move item from ${from} to ${to}`, {
        do: () => this.setState(prev => ({ items: arrayMove(prev.items, from, to) })),
        undo: () => this.setState(prev => ({ items: arrayMove(prev.items, to, from) }))
      });
    }
  };

  deleteItem = index => {
    const deletedItem = this.state.items[index];
    if (deletedItem) {
      const purgeArray = (items, index) => items.filter((item, i) => i !== index);
      const insertArray = (index, item, arr) => {
        arr.splice(index, 0, item);
        return arr;
      };

      this.appHistory.do(`Delete item at ${index}`, {
        do: () => this.setState(prev => ({ items: purgeArray(prev.items, index) })),
        undo: () => this.setState(prev => ({ items: insertArray(index, deletedItem, prev.items) }))
      });
    }
  };

  /* -- Render methods -- */

  render() {
    return (
      <div className="basic-usage-example">
        <ControlPanel
          historyStack={this.appHistory.stack()}
          historyIndex={this.appHistory.currentIndex()}
          onUndoHistory={() => this.appHistory.undo()}
          onRedoHistory={() => this.appHistory.redo()}
          onSelectHistory={id => this.appHistory.select(id)}
          onClearHistory={() => {
            this.appHistory.clear();
            this.forceUpdate();
          }}
          canUndo={this.appHistory.canUndo()}
          canRedo={this.appHistory.canRedo()}
          canClear={this.appHistory.canUndo() || this.appHistory.canRedo()}
        />
        <h4>Make changes to the list below to test an implementation of the history lib above.</h4>
        <ExampleSubject
          items={this.state.items}
          onMoveDown={this.moveItemDown}
          onMoveUp={this.moveItemUp}
          onMove={this.moveItem}
          onDelete={this.deleteItem}
        />
      </div>
    );
  }
}

export default BasicUsage;
