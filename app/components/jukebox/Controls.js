import React from 'react';
import classNames from 'classnames';
import { TYPES } from './redux/actionTypes';
import { repeat, shuffle, playlist, playNext, playPrev, nowPlaying } from './redux/actions';

var Controls = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      dispatch: null
    };
  },

  playPause: function() {
    this.props.dispatch(nowPlaying(!this.props.current.isPlaying));
  },

  previous: function() {
    this.props.dispatch(playPrev());
  },

  next: function() {
    this.props.dispatch(playNext());

  },

  repeat: function() {
    this.props.dispatch(repeat());
  },

  shuffle: function() {
    this.props.dispatch(shuffle());
  },

  playlist: function() {
    this.props.dispatch(playlist());
  },

  render: function() {
    return (
      <div className={classNames("controls", {
        hidden: this.props.current.mediaType === TYPES.UNKNOWN && !this.props.current.isQueue && this.props.current.playlist === null
      })}>
        <div className="play-pause-button" onClick={this.playPause}>
          <span className={classNames({
            'ion-ios-play': !this.props.current.isPlaying,
            'ion-ios-pause': this.props.current.isPlaying
          })}></span>
        </div>
        <div className="prev-button" onClick={this.previous}>
          <span className="ion-ios-skipbackward"></span>
        </div>
        <div className="next-button" onClick={this.next}>
          <span className="ion-ios-skipforward"></span>
        </div>
        <div className={classNames("repeat-button", {
          active: this.props.controls.repeat
        })} onClick={this.repeat}>
          <span className="ion-ios-loop-strong"></span>
        </div>
        <div className={classNames("shuffle-button", {
          active: this.props.controls.shuffle
        })} onClick={this.shuffle}>
          <span className="ion-ios-shuffle-strong"></span>
        </div>
        <div className={classNames("playlist-button", {
          active: this.props.controls.playlist
        })} onClick={this.playlist}>
          <span className="ion-ios-list-outline"></span>
        </div>
      </div>
    );
  }
});

export default Controls;
