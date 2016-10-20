import React from 'react';
import classNames from 'classnames';
import { MEDIA_TYPES } from './redux/actionTypes';

var NowPlaying = React.createClass({

  getDefaultProps: function() {
    return {
      style: null,
      current: {},
      controls: {},
      dispatch: null
    };
  },

  render: function() {
    return (
      <div className={classNames("now-playing", {
        hidden: this.props.current.media.type === MEDIA_TYPES.UNKNOWN && !this.props.current.order.length
      })} style={this.props.style}>
        <div className="now-playing-icon ion-ios-volume-high"></div>
        <div className="now-playing-display">
          <div className="now-playing-name">now playing:</div>
          <div className="now-playing-title">{this.props.current.media.title || <span className="none">—</span>}</div>
        </div>
      </div>
    );
  }
});

export default NowPlaying;
