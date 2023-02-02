import './TodoListItem.css';

import React from 'react';

class ToDoListItem extends React.Component {
  render() {
    const {
      label,
      onDeleteTask,
      onToggleImportant,
      onToggleDone,
      done,
      important,
    } = this.props;

    let classNames = "todo-list-item d-grid";

    if (done) {
      classNames += " done";
    }
    if (important) {
      classNames += " mark";
    }
    

    return (
      <>
        <div className={classNames}>
          <span className="todo-list-label" onClick={onToggleImportant}>
            {label}
          </span>
          <button
            type="button"
            className="btn btn-outline-success btn-sm float-right"
            onClick={onToggleDone}
          >
          &#33;
          </button>
          <button
            type="button"
            className="btn btn-outline-danger btn-sm float-right"
            onClick={onDeleteTask}
          >
           	
&#128465;
          </button>
        </div>
      </>
    );
  }
}

export default ToDoListItem;
// onClick={onDeleteLi}   ========  onDeleteLi
