import React from 'react';
import classNames from 'classnames';

var Search = React.createClass({

  getDefaultProps: function() {
    return {
      className: '',
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      expanded: false
    };
  },

  toggleSearch: function() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function() {
    return (
      <div className={classNames("search", this.props.className, {
        expanded: this.state.expanded
      })}>
        <div className="search-icon" onClick={this.toggleSearch}>
          <span className="ion-ios-search-strong"></span>
        </div>
        <div className="search-results"></div>
      </div>
    );
  }
});

export default Search;
