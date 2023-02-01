import './TodoList.css';

import React from 'react';

import ToDoListItem from '../todoListItem/ToDoListItem';

const ToDoList = ({ todos, onDeleteTask, onToggleImportant, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <li className="list-group-item" key={item.id}>
        <ToDoListItem
          {...itemProps}
          onDeleteTask={() => onDeleteTask(id)}
          //эти и другие функции передают слушатель событий с параметром исходного id
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
        />
      </li>
    );
  });

  return (
    <div>
      <ul className="list-group todo-list">{elements}</ul>
    </div>
  );
};

export default ToDoList;
// onDeleteLi={()=> onDeleteLi(id)}
