import React from 'react';
import classNames from 'classnames';
import { TYPES, SOURCES } from './redux/actionTypes';
import { play, pause, mute, unmute, repeat, shuffle, playlist, playNext, playPrev, hideOverlay, videoShowing } from './redux/actions';

var Controls = React.createClass({

  getDefaultProps: function() {
    return {
      style: null,
      current: {},
      controls: {},
      overlay: {},
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      playPauseDisabled: false,
      muteDisabled: false,
      previousDisabled: false,
      nextDisabled: false,
      repeatDisabled: false,
      shuffleDisabled: false,
      playlistDisabled: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let mediaValid = nextProps.current.media.id && nextProps.current.media.type !== TYPES.UNKNOWN;
    let endReached = !mediaValid && !nextProps.current.queue.length && (!nextProps.current.order.length || nextProps.current.index === nextProps.current.order.length);

    // Now set the control states
    this.setState({
      playPauseDisabled: !mediaValid || nextProps.current.isInvalid || nextProps.overlay.show,
      muteDisabled: endReached,
      previousDisabled: nextProps.current.source === SOURCES.QUEUE || !nextProps.current.index,
      nextDisabled: endReached,
      repeatDisabled: endReached || nextProps.current.isInvalid || nextProps.overlay.show,
      shuffleDisabled: nextProps.current.isInvalid || nextProps.overlay.show || !nextProps.current.order.length,
      playlistDisabled: !(nextProps.current.order.length || nextProps.current.queue.length)
    });
  },

  playPause: function() {
    if (!this.state.playPauseDisabled) {
      this.props.dispatch(this.props.current.isPlaying ? pause(true) : play(true));
    }
  },

  mute: function() {
    if (!this.state.muteDisabled) {
      this.props.dispatch(this.props.current.isMuted ? unmute(true) : mute(true));
    }
  },

  previous: function() {
    if (!this.state.previousDisabled) {
      this.props.dispatch(hideOverlay(), playPrev());
    }
  },

  next: function() {
    if (!this.state.nextDisabled) {
      this.props.dispatch(hideOverlay(), playNext());
    }
  },

  repeat: function() {
    if (!this.state.repeatDisabled) {
      this.props.dispatch(repeat());
    }
  },

  shuffle: function() {
    if (!this.state.shuffleDisabled) {
      this.props.dispatch(shuffle());
    }
  },

  playlist: function() {
    if (!this.state.playlistDisabled) {
      this.props.dispatch(playlist(), videoShowing(true));
    }
  },

  render: function() {
    return (
      <div className={classNames("controls", {
        hidden: this.props.current.media.type === TYPES.UNKNOWN && this.props.current.source === SOURCES.UNKNOWN
      })} style={this.props.style}>
        <div className={classNames("play-pause-button", {
          disabled: this.state.playPauseDisabled
        })} onClick={this.playPause}>
          <span className={classNames({
            'ion-ios-play': !this.props.current.isPlaying,
            'ion-ios-pause': this.props.current.isPlaying
          })}></span>
        </div>
        <div className={classNames("mute-button", {
          disabled: this.state.muteDisabled
        })} onClick={this.mute}>
          <span className={classNames({
            'ion-android-volume-up': !this.props.current.isMuted,
            'ion-android-volume-off': this.props.current.isMuted
          })}></span>
        </div>
        <div className={classNames("prev-button", {
          disabled: this.state.previousDisabled
        })} onClick={this.previous}>
          <span className="ion-ios-skipbackward"></span>
        </div>
        <div className={classNames("next-button", {
          disabled: this.state.nextDisabled
        })} onClick={this.next}>
          <span className="ion-ios-skipforward"></span>
        </div>
        <div className={classNames("repeat-button", {
          active: this.props.controls.repeat,
          disabled: this.state.repeatDisabled
        })} onClick={this.repeat}>
          <span className="ion-ios-loop-strong"></span>
        </div>
        <div className={classNames("shuffle-button", {
          active: this.props.controls.shuffle,
          disabled: this.state.shuffleDisabled
        })} onClick={this.shuffle}>
          <span className="ion-ios-shuffle-strong"></span>
        </div>
        <div className={classNames("playlist-button", {
          active: this.props.controls.playlist,
          disabled: this.state.playlistDisabled
        })} onClick={this.playlist}>
          <span className="ion-ios-list-outline"></span>
        </div>
      </div>
    );
  }
});

export default Controls;
