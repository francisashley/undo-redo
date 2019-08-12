# @fa-repo/undo-redo

> A javascript package for handling basic undo/redo functionality

[![NPM](https://img.shields.io/npm/v/@fa-repo/undo-redo.svg)](https://www.npmjs.com/package/@fa-repo/undo-redo)

## Install

```bash
npm install --save @fa-repo/undo-redo
```

## Usage

```jsx
import UndoRedo from '@fa-repo/undo-redo';
import arrayMove from 'array-move';

let items = [];

const undoRedo = new UndoRedo();

// On an event i.e. create, move, delete an item. Add a `do` function to apply changes and an `undo` function to revert changes.
(from, to) => {
  undoRedo.add({
    annotation: `Move item from ${from} to ${to}`,
    do: () => arrayMove(items, from, to),
    undo:() => arrayMove(items, to, from),
  })
}

// Call undo function to revert changes
undoRedo.undo();

// Call redo function apply changes
undoRedo.redo();

// Select an index in historyStack and starting from current index, loop through each action (undo()/redo()) to get to that point.
undoRedo.select(historyIndex);

// Clear history
undoRedo.clear();

// Get the history array (helpful for building a visual representation of history)
undoRedo.stack();

// Get the current historyIndex
undoRedo.currentIndex(historyIndex);

// Check whether the current position in history can undo any further
undoRedo.canUndo();

// Check whether the current position in history can redo any further
undoRedo.canRedo();
```

## Docs / examples
Discover api and use cases [here](/docs).

## License

mit © [@fa-repo](https://github.com/@fa-repo)
