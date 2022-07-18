# @fa-repo/undo-redo

> A javascript package for handling basic undo/redo functionality

[![NPM](https://img.shields.io/npm/v/@fa-repo/undo-redo.svg)](https://www.npmjs.com/package/@fa-repo/undo-redo)

## Install

```bash
npm install --save @fa-repo/undo-redo
```

## Basic usage

```jsx
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
```

## Docs / examples
Discover api and use cases [here](https://skystash.github.io/undo-redo/#/docs).

## License

mit © [@fa-repo](https://github.com/@fa-repo)
