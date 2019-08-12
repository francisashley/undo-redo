import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./ControlPanel.scss";

/**
 * ControlPanel
 */

class ControlPanel extends React.Component {
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
    canClear: PropTypes.bool,
    onUndoHistory: PropTypes.func,
    onRedoHistory: PropTypes.func,
    onSelectHistory: PropTypes.func,
    onClearHistory: PropTypes.func
  };

  static defaultProps = {
    historyStack: [],
    historyIndex: -1,
    canUndo: false,
    canRedo: false,
    canClear: false,
    onUndoHistory: () => {},
    onRedoHistory: () => {},
    onSelectHistory: () => {},
    onClearHistory: () => {}
  };

  /* -- Lifecycle methods -- */
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.historyStack.length !== this.props.historyStack.length ||
      prevProps.historyIndex !== this.props.historyIndex
    ) {
      const item = this.ref.querySelector(".list li.active");
      if (item) {
        this.ref.querySelector(".list").scrollTop = item.offsetTop;
      }
    }
  }

  render() {
    const { historyStack, historyIndex } = this.props;
    const { canUndo, canRedo, canClear } = this.props;
    const { onSelectHistory, onUndoHistory, onRedoHistory, onClearHistory } = this.props;

    return (
      <table className="control-panel" ref={ref => (this.ref = ref)}>
        <thead>
          <tr>
            <th>Actions</th>
            <th>
              History{" "}
              <input
                type="range"
                min={-1}
                max={historyStack.length - 1}
                value={historyIndex}
                onInput={e => onSelectHistory(Number(e.target.value))}
                disabled={!historyStack.length}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="actions">
              <button onClick={onUndoHistory} disabled={!canUndo}>
                Undo history
              </button>
              <button onClick={onRedoHistory} disabled={!canRedo}>
                Redo history
              </button>
              <button onClick={onClearHistory} disabled={!canClear}>
                Clear history
              </button>
            </td>
            <td className="history">
              <ul className="list">
                {historyStack.map((item, i) => {
                  return (
                    <li
                      key={i}
                      className={classnames(
                        "item",
                        historyIndex === i && "active",
                        historyIndex < i && "inactive"
                      )}
                    >
                      <button onClick={() => onSelectHistory(i)}>
                        <span className="indicator" />
                        {item.annotation}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default ControlPanel;
