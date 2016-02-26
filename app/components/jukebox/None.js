import React from 'react';
import classNames from 'classnames';
import { TYPES, SOURCES } from './redux/actionTypes';
import { searchFocus, restartPlaylist, playCurrent } from './redux/actions';

var None = React.createClass({
  getDefaultProps: function() {
    return {
      current: {},
      slidr: null,
      dispatch: null
    }
  },

  triggerSearch: function() {
    this.props.dispatch(searchFocus());
  },

  triggerPlaylist: function() {
    this.props.slidr.slide('playlists');
  },

  triggerRestart: function() {
    this.props.dispatch(restartPlaylist(), playCurrent());
  },

  render: function() {
    let message;
    if (this.props.current.playlist.index !== null) {
      message = (
        <div>
          You've reached the end of the playlist!
          <br/>
          <br/>
          <span className="action" onClick={this.triggerRestart}>Restart</span> this playlist, choose <span className="action" onClick={this.triggerPlaylist}>another</span>, or <span className="action" onClick={this.triggerSearch}>search</span> a video.</div>
      );
    }
    else if (this.props.current.source === SOURCES.QUEUE) {
      message = (
        <div>
          You've reached the end of the queue!
          <br/>
          <br/>
          Please <span className="action" onClick={this.triggerSearch}>search</span> for another video, or select a <span className="action" onClick={this.triggerPlaylist}>playlist</span>.</div>
      );
    }
    else {
      message = (
        <div>Select a <span className="action" onClick={this.triggerPlaylist}>playlist</span>, or <span className="action" onClick={this.triggerSearch}>search</span> for a video.</div>
      );
    }
    return (
      <div className={classNames("video-none", {
        hidden: this.props.current.media.type !== TYPES.UNKNOWN
      })}>
        {message}
      </div>
    );
  }
});

export default None;
