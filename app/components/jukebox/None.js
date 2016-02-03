import React from 'react';
import classNames from 'classnames';
import { TYPES } from './redux/actionTypes';

var None = React.createClass({
  getDefaultProps: function() {
    return {
      current: {}
    }
  },

  triggerSearch: function() {
    console.log("-->> trigger search!");
  },

  render: function() {
    let message;
    if (this.props.current.playlist !== null) {
      message = (
        <div>
          You've reached the end of the playlist!
          <br/>
          <br/>
          Restart this playlist, choose another, or search a video.</div>
      );
    }
    else if (this.props.current.isQueue) {
      message = (
        <div>
          You've reached the end of the queue!
          <br/>
          <br/>
          Please <span onClick={this.triggerSearch}>search</span> for another video, or select a playlist.</div>
      );
    }
    else {
      message = (
        <div>Select a playlist, or search for a video.</div>
      );
    }
    return (
      <div className={classNames("video-none", {
        hidden: this.props.current.mediaType !== TYPES.UNKNOWN
      })}>
        {message}
      </div>
    );
  }
});

export default None;
