import './ItemAddForm.css';

import React, { Component } from 'react';

export default class ItemAddForm extends Component {
  state = {
    label: "",
  };
  chengeLabel = (e) => {
    this.setState({
      label: e.target.value,
    });
  };
  addTask = (e) => {
    e.preventDefault();
    this.props.onAddTaskTodo(this.state.label);
    this.setState({
      label: "",
    });
  };
  render() {
    return (
      <form className="d-grid ItemAddForm" onSubmit={this.addTask}>
        <input
          type="text"
          onChange={this.chengeLabel}
          value={this.state.label}
          className="search-panel form-control search-input"
        />
        <button className="btn btn-outline-success btn-sm float-right">
          Add
        </button>
      </form>
    );
  }
}

// onClick={() => this.props.onAddTask('Hello')}
