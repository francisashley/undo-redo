import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import "./Button.scss";

/**
 * Button
 */

const Button = props => (
  <button {...props} className={classnames("button", props.className)}>
    {props.text || props.children}
  </button>
);

Button.propTypes = { text: PropTypes.string };
Button.defaultProps = { text: "" };

export default Button;
