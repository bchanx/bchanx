import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import Playlists from './Playlists';
import VideoPlayer from './VideoPlayer';
import Search from './Search';
import Slidr from './Slidr';
import { TYPES, SOURCES } from './redux/actionTypes';
import reducer from './redux/reducers';

var Jukebox = React.createClass({

  mixins: [ReactTimerMixin],

  getInitialState: function() {
    return {
      videoShowing: true,
      current: {
        isPlaying: false,
        isInvalid: false,
        isFullscreen: false,
        source: SOURCES.UNKNOWN,
        playStates: [],
        index: null,
        playlist: {
          index: null,
          name: ''
        },
        order: [],
        queue: [],
        media: {
          id: null,
          type: TYPES.UNKNOWN,
          title: '',
          duration: ''
        },
      },
      controls: {
        play: false,
        pause: false,
        repeat: false,
        shuffle: true,
        playlist: false
      },
      overlay: {
        show: false,
        duration: 0,
        action: null
      },
      search: {
        expand: false,
        focus: false
      },
      playlists: [{
        name: 'EDM',
        created: Date.now(),
        modified: Date.now(),
        media: [{
          id: "JbH_Vn5pq8I",
          type: TYPES.YOUTUBE,
          title: 'Hey there!',
          duration: '3:22'
        }, {
          id: "Csm3BX30jZQ",
          type: TYPES.YOUTUBE,
          title: 'yo yo',
          duration: '1:23'
        }, {
          id: "Rhm_-gMbTGU",
          type: TYPES.YOUTUBE,
          title: 'hi',
          duration: '3:33'
        }, {
          id: "cERIwGKSU1A",
          type: TYPES.YOUTUBE,
          title: 'fourth',
          duration: '4:44'
        }, {
          id: "XWBEbR47Kwc",
          type: TYPES.YOUTUBE,
          title: 'fifth',
          duration: '5:55'
        }]
      }]
    };
  },

  _shouldUpdate: false,

  shouldComponentUpdate: function(nextProps, nextState) {
    var result = this._shouldUpdate;
    this._shouldUpdate = false;
    return result;
  },

  forceUpdate: function(state) {
    this._shouldUpdate = true;
    this.setState(state);
  },

  dispatch: function(...actions) {
    if (actions && actions.length) {
      let newState = this.state;
      actions.forEach(action => {
        if (action) {
          newState = reducer(newState, action);
        }
      });
      this.forceUpdate(newState);
    }
  },

  slidr: {
    ref: null,
    loaded: false,
    timer: null
  },

  slidrHandler: function(e) {
    if (!this.slidr.timer) {
      this.slidr.timer = this.setTimeout(() => {
        if (e.out.slidr === 'video-player') {
          this.forceUpdate({
            videoShowing: false
          });
        }
        else if (e.in.slidr === 'video-player') {
          this.forceUpdate({
            videoShowing: true
          });
        }
        this.slidr.timer = null;
      }, 100);
    }
  },

  slidrCreate: function(slidr) {
    if (!this.slidr.ref) {
      this.slidr.ref = slidr.create('jukebox-slidr', {
        transition: 'cube',
        overflow: true,
        controls: 'border',
        keyboard: true,
        theme: '#f0f0f0',
        before: this.slidrHandler,
        after: this.slidrHandler
      }).add('h', ['playlists', 'video-player', 'playlists'])
        .add('v', ['playlists', 'video-player', 'playlists'])
        .start('video-player');
      this.setTimeout(() => {
        this.slidr.loaded = true;
        this._shouldUpdate = true;
        this.setState(this.state);
      }, 200);
    }
  },

  render: function() {
    return (
      <div className="jukebox-container">
        <div className={classNames("jukebox", {
          active: this.slidr.loaded
        })}>
          <Slidr id="jukebox-slidr" className={this.state.videoShowing ? '' : 'video-not-showing'} onLoaded={this.slidrCreate}>
            <Playlists
              current={this.state.current}
              playlists={this.state.playlists}
              slidr={this.slidr.ref}
              dispatch={this.dispatch}
              />
            <VideoPlayer
              current={this.state.current}
              controls={this.state.controls}
              overlay={this.state.overlay}
              slidr={this.slidr.ref}
              dispatch={this.dispatch}
              />
          </Slidr>
        </div>
        <Search className={classNames({
          active: this.slidr.loaded
        })}
          search={this.state.search}
          slidr={this.slidr.ref}
          dispatch={this.dispatch}
          />
      </div>
    );
  }
});

export default Jukebox;
