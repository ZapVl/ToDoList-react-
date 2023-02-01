import './AppHeader.css';

import React from 'react';

const AppHeader = (props) => {
  return (
    <div className="app-header d-flex">
      <h1>Todo List</h1>
      <h2>
        {" "}
        Done:{props.todoDone} <br />
        in anticipation:{props.todoCount}
      </h2>
    </div>
  );
};

export default AppHeader;
