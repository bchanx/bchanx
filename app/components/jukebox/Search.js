import React from 'react';
import classNames from 'classnames';
import { searchToggle, searchFocus } from './redux/actions';

var Search = React.createClass({

  getDefaultProps: function() {
    return {
      search: {},
      className: '',
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      value: '',
      results: ['a', 'b', 'c', 'd', 'e', 'f', 'g']
    };
  },

  componentDidUpdate: function() {
    if (this.props.search.focus) {
      this.refs.searchBar.focus();
      this.props.dispatch(searchFocus(false));
    }
  },

  toggleSearch: function() {
    this.props.dispatch(searchToggle());
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  render: function() {
    return (
      <div className={classNames("search-container", this.props.className, {
        expanded: this.props.search.expand
      })}>
        <div className="search">
          <div className="search-icon" onClick={this.toggleSearch}>
            <span className="ion-ios-search-strong"></span>
          </div>
          <div className="search-content">
            <input
              className="search-bar"
              type="text"
              ref="searchBar"
              placeholder="Enter search here..."
              value={this.state.value}
              onChange={this.handleChange}
              onInput={this.handleInput}
              onSubmit={this.handleSubmit}
              />
            <div className="search-options">
              Results:
            </div>
            <div className="search-results">
              {this.state.results.map((r, idx) => {
                return (
                  <div key={idx} className="search-result">
                    <div className="media-screencap">

                    </div>
                    <div className="media-title">

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Search;
