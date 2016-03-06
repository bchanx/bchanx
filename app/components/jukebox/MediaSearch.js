import React from 'react';
import classNames from 'classnames';

var MediaSearch = React.createClass({
  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      value: '',
      search: '',
      updateSearch: null
    };
  },

  handleChange: function(event) {
    this.props.updateSearch(event.target.value);
  },

  clearSearch: function() {
    this.props.updateSearch('');
    this.refs.mediaSearchInput.focus();
  },

  render: function() {
    let queueMatches = this.props.current.queue.filter(x => {
      return x.title.toLowerCase().indexOf(this.props.search) >= 0;
    }).length;

    let playlistMatches = this.props.current.order.filter(x => {
      return x.title.toLowerCase().indexOf(this.props.search) >= 0
    }).length;

    let totalMatches = queueMatches + playlistMatches;

    return (
      <div className={classNames("media-search", {
        hidden: !(this.props.current.queue.length || this.props.current.order.length),
        invisible: !this.props.controls.playlist
      })}>
        <div className="media-search-icon ion-ios-settings"></div>
        <input
          ref="mediaSearchInput"
          className="media-search-input"
          type="text"
          placeholder="Find from playlist..."
          value={this.props.value}
          onChange={this.handleChange}
          />
        {this.props.search ? <div className="media-search-count">{totalMatches || 'No'} Match{totalMatches === 1 ? '' : 'es'}</div> : null}
        {this.props.search ? <div className="search-clear ion-ios-close-empty" onClick={this.clearSearch}></div> : null}
      </div>
    );
  }
});

export default MediaSearch;
