import React from "react";
import PropTypes from "prop-types";
import "./ExampleSubject.scss";

/**
 * Example subject
 */

const ListSubject = ({ items, ...props }) => {
  return (
    <ul className="example-subject">
      {items.map((item, index) => {
        const prevIndex = index - 1 < 0 ? 0 : index - 1;
        const nextIndex = index + 1 > items.length - 1 ? items.length - 1 : index + 1;

        return (
          <li key={index} style={{ background: item.bg, color: item.fg }}>
            {item.title}
            <button className="up" onClick={() => props.onMove(index, prevIndex)}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M3,19h18c0.372,0,0.713-0.207,0.886-0.536c0.173-0.329,0.148-0.727-0.063-1.033l-9-13c-0.373-0.539-1.271-0.539-1.645,0 l-9,13c-0.212,0.306-0.236,0.704-0.063,1.033C2.287,18.793,2.628,19,3,19z" />
              </svg>
            </button>
            <button className="down" onClick={() => props.onMove(index, nextIndex)}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M11.178,19.569C11.364,19.839,11.672,20,12,20s0.636-0.161,0.822-0.431l9-13c0.212-0.306,0.236-0.704,0.063-1.033 C21.713,5.207,21.372,5,21,5H3C2.628,5,2.287,5.207,2.114,5.536C1.941,5.865,1.966,6.263,2.178,6.569L11.178,19.569z" />
              </svg>
            </button>
            <button className="delete" onClick={() => props.onDelete(index)}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M5 8v12c0 1.104.896 2 2 2h10c1.104 0 2-.896 2-2V8c0 0-.447 0-1 0H6C5.447 8 5 8 5 8zM14 11h2v8h-2V11zM8 11h2v8H8V11zM16 6L21 6 21 4 16.618 4 15 2 9 2 7.382 4 3 4 3 6 8 6z" />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ListSubject.propTypes = {
  items: PropTypes.array,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  onDelete: PropTypes.func
};
ListSubject.defaultProps = {
  items: [],
  onMoveUp: () => {},
  onMoveDown: () => {},
  onDelete: () => {}
};

export default ListSubject;
