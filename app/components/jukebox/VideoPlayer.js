import React from 'react';
import Video from './Video';
import Controls from './Controls';
import MediaList from './MediaList';

var VideoPlayer = React.createClass({
  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      overlay: {},
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
          overlay={this.props.overlay}
          slidr={this.props.slidr}
          dispatch={this.props.dispatch}
          />
        <Controls
          current={this.props.current}
          controls={this.props.controls}
          overlay={this.props.overlay}
          dispatch={this.props.dispatch}
          />
        <MediaList
          current={this.props.current}
          controls={this.props.controls}
          dispatch={this.props.dispatch}
          />
      </div>
    );
  }
});

export default VideoPlayer;
