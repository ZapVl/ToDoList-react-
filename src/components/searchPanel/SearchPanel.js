import './SearchPanel.css';

import React, { Component } from 'react';

export default class SearchPanel extends Component {
  state = {
    term: "",
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="search"
          className="form-control search-input"
          onChange={this.onSearchChange}
          value={this.state.term}
        />
      </div>
    );
  }
}
