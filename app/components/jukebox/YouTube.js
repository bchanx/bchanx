import React from 'react';
import ReactDOM from 'react-dom';
import ReactTimerMixin from 'react-timer-mixin';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import classNames from 'classnames';
import { MEDIA_TYPES } from './redux/actionTypes';
import { play, pause, mute, unmute, nowPlaying, playNext, invalid, showOverlay, hideOverlay, fullscreen, audioMuted } from './redux/actions';

var YouTube = React.createClass({

  mixins: [ReactScriptLoaderMixin, ReactTimerMixin],

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      ready: false
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

  _timer: null,

  monitorFullScreen: function() {
    return this.setInterval(() => {
      if (this.props.current.media.type === MEDIA_TYPES.YOUTUBE) {
        let iframe = ReactDOM.findDOMNode(this).childNodes[0];
        if (iframe) {
          let isFullscreen = (window.innerWidth === iframe.scrollWidth && window.innerHeight === iframe.scrollHeight);
          if (isFullscreen !== this.props.current.isFullscreen) {
            this.props.dispatch(fullscreen(isFullscreen));
          }
        }

        if (this._youtube) {
          if (this._youtube.isMuted() && !this.props.current.isMuted) {
            this.props.dispatch(audioMuted(true));
          }
          else if (!this._youtube.isMuted() && this.props.current.isMuted) {
            this.props.dispatch(audioMuted(false));
          }
        }
      }
      else {
        this.clearInterval(this._timer);
        this._timer = null;
      }
    }, 250);
  },

  componentDidMount: function() {
    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
  },

  componentWillUnmount: function() {
    this.clearInterval(this._timer);
    this._timer = null;
  },

  _youtube: null,

  componentWillReceiveProps: function(nextProps) {
    if (this.state.ready) {
      if (nextProps.current.media.type === MEDIA_TYPES.YOUTUBE) {
        if (!this._timer) {
          this._timer = this.monitorFullScreen();
        }
        if (nextProps.current.media.id !== this.props.current.media.id) {
          this._youtube.loadVideoById(nextProps.current.media.id);
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
    if (this.props.current.media.type === MEDIA_TYPES.YOUTUBE) {
      let dispatchQueue = [];

      // Check playback state
      if (this.props.controls.play) {
        this._youtube.playVideo();
        dispatchQueue.push(play(false));
      }
      else if (this.props.controls.pause) {
        this._youtube.pauseVideo();
        dispatchQueue.push(pause(false));
      }

      // Check volume
      if (this.props.controls.mute) {
        this._youtube.mute();
        dispatchQueue.push(mute(false), audioMuted(true));
      }
      else if (this.props.controls.unmute) {
        this._youtube.unMute();
        dispatchQueue.push(unmute(false), audioMuted(false));
      }

      // Check whether the current state is valid
      if (this._isInvalid()) {
        if (!this.props.current.isInvalid) {
          dispatchQueue.push(invalid(true));
          if (!this.props.current.isFullscreen) {
            dispatchQueue.push(showOverlay(5, playNext()));
          }
          else {
            dispatchQueue.push(playNext());
          }
        }
      }
      else {
        if (this.props.current.isInvalid) {
          dispatchQueue.push(invalid(false), hideOverlay());
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
    event.target.setVolume(100);
    this.setState({
      ready: true
    });
    this.props.dispatch(mute(true));
  },

  onPlayerStateChange: function(event) {
    let dispatchQueue = [nowPlaying(event.data === YT.PlayerState.PLAYING, event.data)];

    if (event.data === YT.PlayerState.PLAYING && this.props.current.media.type === MEDIA_TYPES.UNKNOWN) {
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
        if (!this.props.current.isFullscreen) {
          dispatchQueue.push(showOverlay(5, playNext()));
        }
        else {
          dispatchQueue.push(playNext());
        }
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
        hidden: this.props.current.media.type !== MEDIA_TYPES.YOUTUBE
      })}>
        <div id="youtube-iframe"></div>
      </div>
    );
  }
});

export default YouTube;
