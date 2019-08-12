import React from "react";
import { MarkdownShard } from "@fa-repo/shard-docs";

/**
 * GettingStarted
 */

const markdown = `
# @fa-repo/undo-redo

A package for handling undo/redo in javascript.

## Install

\`\`\`bash
npm install --save @fa-repo/undo-redo
\`\`\`

## Basic usage

\`\`\`jsx
import UndoRedo from '@fa-repo/undo-redo';
import arrayMove from 'array-move';

let items = ['apple', 'pear', 'mango'];

const undoRedo = new UndoRedo();

const moveItem = (from, to) => {
  undoRedo.add({
    do: () => arrayMove(items, from, to),
    undo:() => arrayMove(items, to, from),
  })
}

const undoChanges = () => {
  undoRedo.undo();
}

const redoChanges = () => {
  undoRedo.redo();
}
`;

const GettingStarted = props => <MarkdownShard markdown={markdown} />;

GettingStarted.propTypes = {};
GettingStarted.defaultProps = {};

export default GettingStarted;
