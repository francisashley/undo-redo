import React from "react";
import PropTypes from "prop-types";
import Controls from "./Controls";
import ColourfulList from "./ColourfulList";
import arrayMove from "array-move";
import UndoRedo from "@fa-repo/undo-redo";
import HistoryList from "./HistoryList";
import { MarkdownShard } from "@fa-repo/shard-docs";
import WarningNote from "./WarningNote";
import "./ReactExample.scss";

/**
 * ReactExample
 */

const items = [
  { title: "Item A", bg: "#F79F79", fg: "black" },
  { title: "Item B", bg: "#F7D08A", fg: "black" },
  { title: "Item C", bg: "#E3F09B", fg: "black" },
  { title: "Item D", bg: "#87B6A7", fg: "black" },
  { title: "Item E", bg: "#5B5941", fg: "white" }
];

class ReactExample extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    items: items,
    originalItems: items
  };

  constructor(props) {
    super(props);
    this.undoRedo = new UndoRedo();
  }

  moveItem = (from, to) => {
    if (from !== to) {
      this.undoRedo.add(`Move item from ${from} to ${to}`, {
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

      this.undoRedo.add(`Delete item at ${index}`, {
        do: () => this.setState(prev => ({ items: purgeArray(prev.items, index) })),
        undo: () => this.setState(prev => ({ items: insertArray(index, deletedItem, prev.items) }))
      });
    }
  };

  resetChanges = () => {
    this.undoRedo.clear();
    this.setState({ items: this.state.originalItems });
  };

  consolidateChanges = () => {
    this.undoRedo.clear();
    this.setState({ originalItems: this.state.items });
  };

  /* -- Render methods -- */

  render() {
    return (
      <>
        <h3>Example</h3>
        <div className="react-example">
          <div className="react-example-controls">
            <Controls
              historyStack={this.undoRedo.stack()}
              historyIndex={this.undoRedo.currentIndex()}
              onUndoHistory={() => this.undoRedo.undo()}
              onRedoHistory={() => this.undoRedo.redo()}
              onSelectHistory={historyIndex => this.undoRedo.select(historyIndex)}
              onResetHistory={() => this.resetChanges()}
              onConsolidateHistory={() => this.consolidateChanges()}
              canUndo={this.undoRedo.canUndo()}
              canRedo={this.undoRedo.canRedo()}
              canReset={this.undoRedo.canUndo() || this.undoRedo.canRedo()}
              canConsolidate={this.undoRedo.canUndo() || this.undoRedo.canRedo()}
            />
          </div>
          <div className="react-example-subject">
            <ColourfulList
              items={this.state.items}
              onMove={this.moveItem}
              onDelete={this.deleteItem}
            />
          </div>
          <div className="react-example-history">
            <HistoryList
              historyStack={this.undoRedo.stack()}
              historyIndex={this.undoRedo.currentIndex()}
              onSelectHistory={historyIndex => this.undoRedo.select(historyIndex)}
            />
          </div>
        </div>
        <h3>
          <a href="#">Source code</a>
        </h3>
        <WarningNote title="Take note when using undoRedo.select()">
          <p>
            UndoRedo encounters a problem in reactJS when attempting to .select() a point in time 2
            or more steps away. Naturally we might use `() => this.setState({})` to apply changes,
            however we get into dodgy territory when using `this.setstate({})` in a loop. The issue
            and the solution is{" "}
            <a href="https://stackoverflow.com/questions/51099321/setstate-is-only-executing-once-in-array-map-function">
              explained here
            </a>
            . The TL;DR is basically, force setState to depend on the previous state. See the
            following code snippet.
          </p>
          <pre>
            {` // Do
 () => this.setState(prev => ({ items: purgeArray(prev.items, index) }))
 // Don't do
 () => this.setState(({ items: purgeArray(this.state.items, index) }))`}
          </pre>
        </WarningNote>
        <MarkdownShard
          markdown={`
\`\`\`js
import React from "react";
import UndoRedo from "@fa-repo/undo-redo";
...

const purgeArray = (items, index) => items.filter((item, i) => i !== index);

const insertArray = (index, item, arr) => {
  arr.splice(index, 0, item);
  return arr;
};

const items = [
  { title: "Item A", bg: "#F79F79", fg: "black" },
  { title: "Item B", bg: "#F7D08A", fg: "black" },
  { title: "Item C", bg: "#E3F09B", fg: "black" },
  { title: "Item D", bg: "#87B6A7", fg: "black" },
  { title: "Item E", bg: "#5B5941", fg: "white" }
];

class ReactExample extends React.Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    items: items,
    originalItems: items
  };

  constructor(props) {
    super(props);
    this.undoRedo = new UndoRedo();
  }

  moveItem = (from, to) => {
    this.undoRedo.add(\`Move item from \${from} to \${to}\`, {
      do: () => this.setState(prev => ({ items: arrayMove(prev.items, from, to) })),
      undo: () => this.setState(prev => ({ items: arrayMove(prev.items, to, from) }))
    });
  };

  deleteItem = index => {
    const deletedItem = this.state.items[index];

    if (deletedItem) {
      this.undoRedo.add(\`Delete item at \${index}\`, {
        do: () => this.setState(prev => ({ items: purgeArray(prev.items, index) })),
        undo: () => this.setState(prev => ({ items: insertArray(index, deletedItem, prev.items) }))
      });
    }
  };

  resetChanges = () => {
    this.undoRedo.clear();
    this.setState({ items: this.state.originalItems });
  };

  consolidateChanges = () => {
    this.undoRedo.clear();
    this.setState({ originalItems: this.state.items });
  };

  render() {
    return (
      <>
        <Controls
          historyStack={this.undoRedo.stack()}
          historyIndex={this.undoRedo.currentIndex()}
          onUndoHistory={() => this.undoRedo.undo()}
          onRedoHistory={() => this.undoRedo.redo()}
          onSelectHistory={historyIndex => this.undoRedo.select(historyIndex)}
          onResetHistory={() => this.resetChanges()}
          onConsolidateHistory={() => this.consolidateChanges()}
          canUndo={this.undoRedo.canUndo()}
          canRedo={this.undoRedo.canRedo()}
          canReset={this.undoRedo.canUndo() || this.undoRedo.canRedo()}
          canConsolidate={this.undoRedo.canUndo() || this.undoRedo.canRedo()}
        />
        <ColourfulList
          items={this.state.items}
          onMove={this.moveItem}
          onDelete={this.deleteItem}
        />
        <HistoryList
          historyStack={this.undoRedo.stack()}
          historyIndex={this.undoRedo.currentIndex()}
          onSelectHistory={historyIndex => this.undoRedo.select(historyIndex)}
        />
      </>
    );
  }
}

export default ReactExample;
\`\`\``}
        />
      </>
    );
  }
}

export default ReactExample;
