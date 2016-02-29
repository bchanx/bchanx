import React from 'react';
import classNames from 'classnames';
import { TYPES } from './redux/actionTypes';

var NowPlaying = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      dispatch: null
    };
  },

  render: function() {
    return (
      <div className={classNames("now-playing", {
        invisible: this.props.controls.playlist,
        hidden: this.props.current.media.type === TYPES.UNKNOWN
      })}>
        <div className="now-playing-icon ion-ios-volume-high"></div>
        <div className="now-playing-display">
          <div className="now-playing-name">now playing:</div>
          <div className="now-playing-title">{this.props.current.media.title}</div>
        </div>
      </div>
    );
  }
});

export default NowPlaying;
