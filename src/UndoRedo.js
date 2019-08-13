import slice from "array-slice";

class UndoRedo {
  historyStack = [];
  historyIndex = -1;

  /**
   * Add action to UndoRedo history.
   *
   * @param {object} annotation - A human readable description of the action
   * @param {object} item.do - A function that is called when redo is triggered
   * @param {object} item.undo - A function that is called when undo is triggered
   */
  add = (annotation, { do: redo, undo }) => {
    const nextHistoryIndex = this.historyIndex + 1;
    const action = { annotation, redo, undo };

    // Remove all actions after the current historyIndex
    let historyStack = slice(this.historyStack, 0, nextHistoryIndex);
    historyStack = [...historyStack, action];

    // Update state
    this.historyStack = historyStack;
    this.historyIndex = nextHistoryIndex;

    // Execute first use of the 'do' event
    action.redo();
  };

  /**
   * Call undo() on current action and update historyIndex to previous action
   */
  undo = () => {
    if (this.canUndo()) {
      const action = this.historyStack[this.historyIndex];
      this.historyIndex = this.historyIndex - 1;
      action.undo();
    }
  };

  /**
   * Call undo() on all actions up to an earlier action in history
   *
   * @param {integer} index - index of action earlier in historyStack().
   */
  undoTo = index => {
    if (this.canUndo() && index < this.historyIndex) {
      // Select historyStack between target index and current index
      let historyStack = slice(this.historyStack, index + 1, this.historyIndex + 1);

      // Reverse historyStack so as to call each action in the right order
      historyStack = historyStack.reverse();

      // Call each action
      // historyStack.map((action, i) => setTimeout(() => action.undo(), 1));
      historyStack.map((action, i) => action.undo());

      // Point historyIndex to target action
      this.historyIndex = index;
    }
  };

  /**
   * Call redo() on current action and update historyIndex to next action
   */
  redo = () => {
    if (this.canRedo()) {
      const action = this.historyStack[this.historyIndex + 1];
      this.historyIndex = this.historyIndex + 1;
      action.redo();
    }
  };

  /**
   * Call redo() on all actions up to an earlier action in history
   *
   * @param {integer} index - index of action later in historyStack().
   */
  redoTo = index => {
    if (this.canRedo() && index > this.historyIndex) {
      // Select historyStack between current index and target index
      const historyStack = slice(this.historyStack, this.historyIndex + 1, index + 1);

      // Call each action
      // historyStack.map((action, i) => setTimeout(() => action.redo(), 1));
      historyStack.map((action, i) => action.redo());

      // Point historyIndex to target action
      this.historyIndex = index;
    }
  };

  /**
   * Select an action in historyStack and call all un/redo functions between current and that action
   *
   * @param {integer} index - index of target action in historyStack().
   */
  select = index => {
    if (index === this.historyIndex) return;
    else if (index < this.historyIndex) this.undoTo(index);
    else if (index >= this.historyIndex) this.redoTo(index);
  };

  /**
   * Clear history.
   */
  clear = () => {
    this.historyStack = [];
    this.historyIndex = -1;
  };

  /**
   * @return {array} - return an immutable historyStack
   */
  stack = () => {
    return Object.freeze(
      this.historyStack.map((item, i) => ({ ...item, active: i === this.historyIndex }))
    );
  };

  /**
   * @return {number} - return current historyIndex
   */
  currentIndex = () => {
    return this.historyIndex;
  };

  /**
   * Check whether can undo.
   */
  canUndo = () => {
    return this.historyIndex > -1;
  };

  /**
   * Check whether can redo.
   */
  canRedo = () => {
    return this.historyIndex < this.historyStack.length - 1;
  };
}

export default UndoRedo;
