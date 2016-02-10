import React from 'react';
import None from './None';
import YouTube from './YouTube';
import Overlay from './Overlay';
import { TYPES } from './redux/actionTypes';
import { playNow, playCurrent, queueNext } from './redux/actions';

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

  playNow: function() {
    this.props.dispatch(playNow('-_PIGQjrnjI', TYPES.YOUTUBE));
  },

  // Error: cERIwGKSU1A
  // Valid: OoDHA8dy7JM
  // Terminated: XWBEbR47Kwc
  queueNext: function() {
    this.props.dispatch(queueNext('OoDHA8dy7JM', TYPES.YOUTUBE), playCurrent());
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