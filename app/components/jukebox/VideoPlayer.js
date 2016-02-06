import React from 'react';
import Video from './Video';
import Controls from './Controls';
import Playlist from './Playlist';

var VideoPlayer = React.createClass({
  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      slidr: null,
      dispatch: null
    };
  },

  render: function() {
    return (
      <div className="video-player" data-slidr="video-player">
        <Video
          current={this.props.current}
          controls={this.props.controls}
          slidr={this.props.slidr}
          dispatch={this.props.dispatch}
          />
        <Controls
          current={this.props.current}
          controls={this.props.controls}
          dispatch={this.props.dispatch}
          />
        <Playlist/>
      </div>
    );
  }
});

export default VideoPlayer;
