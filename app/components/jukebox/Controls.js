import React from 'react';
import classNames from 'classnames';
import { TYPES } from './redux/actionTypes';
import { play, pause, repeat, shuffle, playlist, playNext, playPrev, hideOverlay } from './redux/actions';

var Controls = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      overlay: {},
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      playPauseDisabled: false,
      previousDisabled: false,
      nextDisabled: false,
      repeatDisabled: false,
      shuffleDisabled: false
    };
  },

  componentWillReceiveProps: function(nextProps) {
    let mediaValid = nextProps.current.mediaId && nextProps.current.mediaType !== TYPES.UNKNOWN;
    let endReached = !mediaValid && !nextProps.current.queue.length && (!nextProps.current.order.length || nextProps.current.index === nextProps.current.order.length);

    // Now set the control states
    this.setState({
      playPauseDisabled: !mediaValid || nextProps.current.isInvalid || nextProps.overlay.show,
      previousDisabled: nextProps.current.isQueue || !nextProps.current.index,
      nextDisabled: endReached,
      repeatDisabled: endReached || nextProps.current.isInvalid || nextProps.overlay.show,
      shuffleDisabled: nextProps.current.isInvalid || nextProps.overlay.show || !nextProps.current.order.length
    });
  },

  playPause: function() {
    if (!this.state.playPauseDisabled) {
      this.props.dispatch(this.props.current.isPlaying ? pause(true) : play(true));
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
    this.props.dispatch(playlist());
  },

  render: function() {
    return (
      <div className={classNames("controls", {
        hidden: this.props.current.mediaType === TYPES.UNKNOWN && !this.props.current.isQueue && this.props.current.playlist === null
      })}>
        <div className={classNames("play-pause-button", {
          disabled: this.state.playPauseDisabled
        })} onClick={this.playPause}>
          <span className={classNames({
            'ion-ios-play': !this.props.current.isPlaying,
            'ion-ios-pause': this.props.current.isPlaying
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
          active: this.props.controls.playlist
        })} onClick={this.playlist}>
          <span className="ion-ios-list-outline"></span>
        </div>
      </div>
    );
  }
});

export default Controls;
