import React from "react";
import PropTypes from "prop-types";
import MarkdownShard from "@fa-repo/shard-docs/dist/shards/markdown-shard";

/**
 * APIReference
 */

const APIReference = props => (
  <MarkdownShard
    markdown={`## undoRedo.add(annotation, { undo, redo })
Add an action to undoRedo history.
| Name       | Type     | Required | Description  |
|------------|----------|----------|--------------|
| annotation | string   | Required | A description of the current action. Useful for debugging or outputted in a visual representation history visualiser type thing (see react example).        |
| do         | function | Required | Perform a task. Called once by undoRedo.add() then subsequentally by undoRedo.redo().  |
| undo       | function | Required | Reverse changes performed by \`do()\`. |
| ...        |          |          | Anything else can go in this object and accessed later after crawling undoRedo.stack(). |

#### Example
\`\`\`js
let items = ['apple', 'pear', 'mango'];

const moveItems = (from, to) => {
  undoRedo.add(\`Move item from $\{from} to $\{to}\`, {
    do: () => arrayMove(items, from, to),
    undo:() => arrayMove(items, to, from)
  });
}
\`\`\`

<br />

## undoRedo.undo()
Call undo() on the current history action.
#### Example
\`\`\`js
undoRedo.undo();
\`\`\`

<br />

## undoRedo.redo()
Call redo() on the current history action.
#### Example
\`\`\`js
undoRedo.redo();
\`\`\`

<br />

## undoRedo.select(historyIndex)
Select an index in historyStack and call all undo/redo actions between current and target action.

**React users must take care** when setState() is involved. Since undoRedo.select() may loop through multiple actions to get to the target point in history, it is likely that you will run up against one of Reacts optimisations which entails batching all setState calls into the same cycle before updating state. Basically that means that each undo/redo call will only apply to the state at the beginning of the cycle and not the result of the state after the previous undo/redo action, so you will only see changes from the last action that was called. The solution is [explained here](https://stackoverflow.com/questions/51099321/setstate-is-only-executing-once-in-array-map-function). *TL;DR you must force the state to depend on the previous state. Use \`this.setState(prev=> { items: arrayMove(prev.items, from, to)})\` instead of \`this.setState({ items: arrayMove(this.state.items, from, to)})\`*.

| Name  | Type  | Required | Description  |
|-------|-------|----------|--------------|
| historyIndex  | string  | Required | Index of an action in \`undoRedo.stack()\` array. |
#### Example
\`\`\`js
undoRedo.currentIndex(); // 4
undoRedo.select(1);
undoRedo.currentIndex(); // 1
\`\`\`

<br />

## undoRedo.clear()
Reset state.
#### Example
\`\`\`js
undoRedo.clear();
\`\`\`

<br />

## undoRedo.stack()
Get all of the actions that have been added with undoRedo.add().
#### Example
\`\`\`js
undoRedo.stack(); // [action, action, ...]
\`\`\`

<br />

## undoRedo.currentIndex()
Get the current history index.
#### Example
\`\`\`js
undoRedo.currentIndex(); // 4
\`\`\`

<br />

## undoRedo.canUndo()
Check whether can undo history any further.
\`\`\`js
undoRedo.canUndo(); // true
\`\`\`

<br />

## undoRedo.canRedo()
Check whether can redo history any further.
\`\`\`js
undoRedo.canRedo(); // false
\`\`\`
`}
  />
);

APIReference.propTypes = {};
APIReference.defaultProps = {};

export default APIReference;
