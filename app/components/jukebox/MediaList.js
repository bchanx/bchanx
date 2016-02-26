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
      value: event.target.value.toLowerCase()
    });
  },

  onClick: function(id, type, artist, title, duration, source) {
    this.props.dispatch(playNow(id, type, artist, title, duration, source));
  },

  render: function() {
    let hasNowPlaying = this.props.current.media.title.toLowerCase().indexOf(this.state.value) >= 0;
    let hasQueue = this.props.current.queue.filter(x => {
      return x.title.toLowerCase().indexOf(this.state.value) >= 0;
    }).length;
    let hasPlaylist = this.props.current.order.filter(x => {
      return x.title.toLowerCase().indexOf(this.state.value) >= 0
    }).length;
    return (
      <div className={classNames("media-list", {
        hidden: this.props.current.source === SOURCES.UNKNOWN
      })}>

        {this.props.current.queue.length || this.props.current.order.length ?
          <div className="media-search">
            <span className="ion-ios-settings"></span>
            <input
              className="media-search-input"
              type="text"
              placeholder="Filter playlist..."
              onChange={this.handleChange}
              />
          </div> : null}

        {this.props.current.queue.length ?
          <MediaGroup
            name="queue"
            type={SOURCES.QUEUE}
            playlist={this.props.current.queue}
            current={this.props.current}
            search={this.state.value}
            /> : null}

        {this.props.current.order.length ?
          <MediaGroup
            name={this.props.current.playlist.name}
            type={SOURCES.PLAYLIST}
            playlist={this.props.current.order}
            current={this.props.current}
            search={this.state.value}
            /> : null}

      </div>
    );
  }
});

export default MediaList;
