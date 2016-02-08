import React from 'react';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import classNames from 'classnames';
import { TYPES } from './redux/actionTypes';
import { play, pause, nowPlaying, playNext, invalid, showOverlay, hideOverlay } from './redux/actions';

var YouTube = React.createClass({

  mixins: [ReactScriptLoaderMixin],

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      dispatch: null
    };
  },

  getScriptURL: function() {
    return 'http://www.youtube.com/iframe_api';
  },

  onScriptLoaded: function() {
    // Script loaded
  },

  onScriptError: function() {
    // Script failed
  },

  componentDidMount: function() {
    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
  },

  _youtube: null,

  componentWillReceiveProps: function(nextProps) {
    if (this._youtube) {
      if (nextProps.current.mediaType === TYPES.YOUTUBE) {
        if (nextProps.current.mediaId !== this.props.current.mediaId) {
          this._youtube.loadVideoById(nextProps.current.mediaId);
        }
      }
      else if (this.props.current.isPlaying) {
        this._youtube.pauseVideo();
      }
    }
  },

  _isInvalid: function() {
    let states = this.props.current.playStates;
    if (states.length === 3 &&
        states[0] === YT.PlayerState.UNSTARTED &&
        states[1] === YT.PlayerState.BUFFERING &&
        states[2] === YT.PlayerState.UNSTARTED) {
      // Pattern to detect invalid videos
      return true;
    }
    return false;
  },

  componentDidUpdate: function() {
    if (this.props.current.mediaType === TYPES.YOUTUBE) {
      let dispatchQueue = [];
      if (this.props.controls.play) {
        this._youtube.playVideo();
        dispatchQueue.push(play(false));
      }
      else if (this.props.controls.pause) {
        this._youtube.pauseVideo();
        dispatchQueue.push(pause(false));
      }
      // Check whether the current state is valid
      if (this._isInvalid()) {
        if (!this.props.current.isInvalid) {
          dispatchQueue.push(invalid(true));
          dispatchQueue.push(showOverlay(5, playNext()));
        }
      }
      else {
        if (this.props.current.isInvalid) {
          dispatchQueue.push(invalid(false));
          dispatchQueue.push(hideOverlay());
        }
      }
      this.props.dispatch(...dispatchQueue);
    }
  },

  onYouTubeIframeAPIReady: function() {
    this._youtube = new YT.Player('youtube-iframe', {
      width: '640',
      height: '360',
      videoId: null,
      playerVars: {
        enablejsapi: 1,
        iv_load_policy: 3,
        origin: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.HOSTNAME,
        rel: 0,
        showinfo: 0,
        autoplay: 1
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      }
    });
  },

  onPlayerReady: function(event) {
    // TODO: set volume to 100
    event.target.setVolume(0);
  },

  onPlayerStateChange: function(event) {
    let dispatchQueue = [nowPlaying(event.data === YT.PlayerState.PLAYING, event.data)];

    if (event.data === YT.PlayerState.PLAYING && this.props.current.index === this.props.current.order.length) {
      // We reach this state by clicking really fast
      this._youtube.pauseVideo();
    }

    if (event.data === YT.PlayerState.BUFFERING) {
      // Sometimes it gets stuck, help it play
      this._youtube.playVideo();
    }
    else if (event.data === YT.PlayerState.ENDED) {
      if (this.props.controls.repeat) {
        this._youtube.playVideo();
      }
      else {
        dispatchQueue.push(showOverlay(5, playNext()));
      }
    }

    this.props.dispatch(...dispatchQueue);
  },

  stopVideo: function() {
    this._youtube.stopVideo();
  },

  render: function() {
    return (
      <div className={classNames("youtube", {
        hidden: this.props.current.mediaType !== TYPES.YOUTUBE
      })}>
        <div id="youtube-iframe"></div>
      
      </div>
    );
  }
});

export default YouTube;
