import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Button from "./Button";
import "./HistoryList.scss";

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
    onSelectHistory: PropTypes.func
  };

  static defaultProps = {
    historyStack: [],
    historyIndex: -1,
    onSelectHistory: () => {}
  };

  /* -- Lifecycle methods -- */
  componentDidUpdate(prevProps, prevState) {
    const historyChanged =
      prevProps.historyStack.length !== this.props.historyStack.length ||
      prevProps.historyIndex !== this.props.historyIndex;

    if (historyChanged) {
      const item = this.ref.querySelector("li.active");
      if (item) {
        this.ref.scrollTop = item.offsetTop;
      }
    }
  }

  render() {
    return (
      <>
        <h3 className="history-list-header">History</h3>
        <ul className="history-list" ref={ref => (this.ref = ref)}>
          {this.props.historyStack.map((item, i) => {
            return (
              <li
                key={i}
                className={classnames(
                  "history-list-item",
                  this.props.historyIndex === i && "active",
                  this.props.historyIndex < i && "inactive"
                )}
              >
                <Button onClick={() => this.props.onSelectHistory(i)}>
                  <span className="indicator" />
                  {item.annotation}
                </Button>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

export default ControlPanel;
