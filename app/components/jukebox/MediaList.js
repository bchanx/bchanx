import React from 'react';
import classNames from 'classnames';
import { SOURCES } from './redux/actionTypes';
import MediaGroup from './MediaGroup';

var MediaList = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      dispatch: null
    }
  },

  getInitialState: function() {
    return {
      value: ''
    };
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value,
      search: event.target.value.toLowerCase()
    });
  },

  clearSearch: function() {
    this.setState({
      value: '',
      search: ''
    });
  },

  render: function() {
    let queueMatches = this.props.current.queue.filter(x => {
      return x.title.toLowerCase().indexOf(this.state.search) >= 0;
    }).length;

    let playlistMatches = this.props.current.order.filter(x => {
      return x.title.toLowerCase().indexOf(this.state.search) >= 0
    }).length;

    let totalMatches = queueMatches + playlistMatches;

    return (
      <div className={classNames("media-list", {
        hidden: this.props.current.source === SOURCES.UNKNOWN
      })}>

        {this.props.current.queue.length || this.props.current.order.length ?
          <div className="media-search">
            <div className="media-search-icon ion-ios-settings"></div>
            <input
              className="media-search-input"
              type="text"
              placeholder="Find from playlist..."
              value={this.state.value}
              onChange={this.handleChange}
              />
            {this.state.search ? <div className="media-search-count">{totalMatches || 'No'} Match{totalMatches === 1 ? '' : 'es'}</div> : null}
            {this.state.search ? <div className="media-search-clear ion-ios-close-empty" onClick={this.clearSearch}></div> : null}
          </div> : null}

        {this.props.current.queue.length ?
          <MediaGroup
            name="queue"
            type={SOURCES.QUEUE}
            playlist={this.props.current.queue}
            current={this.props.current}
            search={this.state.search}
            dispatch={this.props.dispatch}
            /> : null}

        {this.props.current.order.length ?
          <MediaGroup
            name={this.props.current.playlist.name}
            type={SOURCES.PLAYLIST}
            playlist={this.props.current.order}
            current={this.props.current}
            search={this.state.search}
            dispatch={this.props.dispatch}
            /> : null}

      </div>
    );
  }
});

export default MediaList;
