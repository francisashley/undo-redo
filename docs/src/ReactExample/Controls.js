import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import "./Controls.scss";

/**
 * Controls
 */

class Controls extends React.Component {
  static propTypes = {
    historyStack: PropTypes.arrayOf(
      PropTypes.shape({
        annotiation: PropTypes.string,
        active: PropTypes.bool
      })
    ),
    historyIndex: PropTypes.number,
    canUndo: PropTypes.bool,
    canRedo: PropTypes.bool,
    canReset: PropTypes.bool,
    canConsolidate: PropTypes.bool,
    onUndoHistory: PropTypes.func,
    onRedoHistory: PropTypes.func,
    onSelectHistory: PropTypes.func,
    onResetHistory: PropTypes.func,
    onConsolidateHistory: PropTypes.func
  };

  static defaultProps = {
    historyStack: [],
    historyIndex: -1,
    canUndo: false,
    canRedo: false,
    canReset: false,
    canConsolidate: false,
    onUndoHistory: () => {},
    onRedoHistory: () => {},
    onSelectHistory: () => {},
    onResetHistory: () => {},
    onConsolidateHistory: () => {}
  };

  /* -- Lifecycle methods -- */

  render() {
    const { historyStack, historyIndex } = this.props;
    const { canUndo, canRedo, canReset, canConsolidate } = this.props;
    const {
      onSelectHistory,
      onUndoHistory,
      onRedoHistory,
      onResetHistory,
      onConsolidateHistory
    } = this.props;

    return (
      <>
        <input
          type="range"
          min={-1}
          max={historyStack.length - 1}
          value={historyIndex}
          onInput={e => onSelectHistory(Number(e.target.value))}
          disabled={!historyStack.length}
        />{" "}
        <Button onClick={onUndoHistory} disabled={!canUndo}>
          Undo
        </Button>
        <Button onClick={onRedoHistory} disabled={!canRedo}>
          Redo
        </Button>
        <Button onClick={onResetHistory} disabled={!canReset}>
          Reset
        </Button>
        <Button onClick={onConsolidateHistory} disabled={!canConsolidate}>
          Consolidate changes
        </Button>
      </>
    );
  }
}

export default Controls;
