import React from 'react';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import classNames from 'classnames';
import { TYPES } from './redux/actionTypes';
import { nowPlaying, playNext } from './redux/actions';

var YouTube = React.createClass({

  mixins: [ReactScriptLoaderMixin],

  getDefaultProps: function() {
    return {
      current: {},
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

  componentWillReceiveProps: function(nextProps) {
    if (this._player) {
      if (nextProps.current.mediaType === TYPES.YOUTUBE) {
        if (nextProps.current.mediaId !== this.props.current.mediaId) {
          this._player.loadVideoById(nextProps.current.mediaId);
        }
        else if (this.props.current.isPlaying && !nextProps.current.isPlaying) {
          this._player.pauseVideo();
        }
        else if (!this.props.current.isPlaying && nextProps.current.isPlaying) {
          this._player.playVideo();
        }
      }
      else if (this.props.current.isPlaying) {
        this._player.pauseVideo();
      }
    }
  },

  _player: null,

  onYouTubeIframeAPIReady: function() {
    this._player = new YT.Player('youtube-iframe', {
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
    event.target.setVolume(0);
  },

  onPlayerStateChange: function(event) {
    console.log("-->> PLAYER STATE:", event.data);
    let dispatchQueue = [nowPlaying(event.data === YT.PlayerState.PLAYING)];

    if (event.data === YT.PlayerState.BUFFERING) {
      // Sometimes it gets stuck, help it play
      this._player.playVideo();
    }
    if (event.data === YT.PlayerState.ENDED) {
      dispatchQueue.push(playNext());
    }

    this.props.dispatch(...dispatchQueue);
  },

  stopVideo: function() {
    this._player.stopVideo();
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
