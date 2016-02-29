import React from 'react';
import None from './None';
import YouTube from './YouTube';
import Overlay from './Overlay';
import { TYPES, SOURCES } from './redux/actionTypes';
import { playNow, playCurrent, queueNext, fullscreen } from './redux/actions';

var Video = React.createClass({
  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      overlay: {},
      slidr: null,
      dispatch: null
    };
  },

  exitFullscreen: function() {
    if (document.exitFullScreen) {
      document.exitFullScreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    this.props.dispatch(fullscreen(false));
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.current.media.type === TYPES.UNKNOWN && nextProps.current.isFullscreen) {
      // No video playing, make sure fullscreen is reset
      this.exitFullscreen();
    }
  },

  playNow: function() {
    this.props.dispatch(playNow({
      id: '-_PIGQjrnjI',
      type: TYPES.YOUTUBE,
      title: 'play test',
      duration: '3:22'
    }, SOURCES.QUEUE));
  },

  // Error: cERIwGKSU1A
  // Valid: OoDHA8dy7JM
  // Terminated: XWBEbR47Kwc
  queueNext: function() {
    this.props.dispatch(queueNext('OoDHA8dy7JM', TYPES.YOUTUBE, 'queue test', '3:22'), playCurrent());
  },

  render: function() {
    return (
      <div className="video">
        <None
          current={this.props.current}
          slidr={this.props.slidr}
          dispatch={this.props.dispatch}
          />
        <Overlay
          overlay={this.props.overlay}
          dispatch={this.props.dispatch}
          />
        <YouTube
          current={this.props.current}
          controls={this.props.controls}
          dispatch={this.props.dispatch}
          />
        <div className="click">
          <div onClick={this.playNow}>PLAY_NOW!</div>
          <div onClick={this.queueNext}>QUEUE_NEXT!</div>
        </div>
      </div>
    );
  }
});

export default Video;
