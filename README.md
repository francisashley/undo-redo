<div align="center">

# Undo/Redo

A javascript package for handling undo/redo functionality<br/>

[Read the docs](https://skystash.github.io/undo-redo/#/)<br/>

[![NPM](https://img.shields.io/npm/v/@fa-repo/undo-redo.svg)](https://www.npmjs.com/package/@fa-repo/undo-redo)
</div>

## Install

```bash
yarn add @fa-repo/undo-redo
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

## License

MIT
