import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import Playlists from './Playlists';
import VideoPlayer from './VideoPlayer';
import Search from './Search';
import Slidr from './Slidr';
import { MEDIA_TYPES, SOURCES, PLAYLIST_TYPES } from './redux/actionTypes';
import { videoShowing } from './redux/actions';
import reducer from './redux/reducers';

var Jukebox = React.createClass({

  mixins: [ReactTimerMixin],

  getInitialState: function() {
    return {
      current: {
        isPlaying: false,
        isMuted: false,
        isInvalid: false,
        isFullscreen: false,
        isVideoShowing: true,
        source: SOURCES.UNKNOWN,
        playStates: [],
        index: null,
        playlist: {
          type: PLAYLIST_TYPES.UNKNOWN,
          index: null,
          name: ''
        },
        order: [],
        queue: [],
        media: {
          id: null,
          type: MEDIA_TYPES.UNKNOWN,
          title: '',
          duration: ''
        },
      },
      controls: {
        play: false,
        pause: false,
        mute: false,
        unmute: false,
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
      playlists: {
        global: [{
          name: 'Number two',
          created: Date.now(),
          modified: Date.now(),
          media: [{
            id: "m4RbODbWRVI",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "BwWzSyxNc9I",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }]
        }, {
          name: 'EDM',
          created: Date.now(),
          modified: Date.now(),
          media: [{
            id: "JbH_Vn5pq8I",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'Hey there!',
            duration: '3:22'
          }, {
            id: "Csm3BX30jZQ",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'yo yo',
            duration: '1:23'
          }, {
            id: "Rhm_-gMbTGU",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'hi',
            duration: '3:33'
          }, {
            id: "cERIwGKSU1A",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "XWBEbR47Kwc",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fifth',
            duration: '5:55'
          }, {
            id: "2EaE0_gQLw0",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "Qsy7kJyizoc",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "Vsy1URDYK88",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "nT3pHuebr4U",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "hT_nvWreIhg",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "OIRE6iw-ws4",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "WFkCO4jVRg4",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "uJorl7V3uNk",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "qXuuh49aF1M",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "YaikPv034Hc",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "wxvz_w2JUkU",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "OPf0YbXqDm0",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "WoCfFoQeWoU",
            type: MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }]
        }],
        personal: []
      }
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
          this.dispatch(videoShowing(false));
        }
        else if (e.in.slidr === 'video-player') {
          this.dispatch(videoShowing(true));
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
        keyboard: false,
        theme: '#e8e8e8',
        before: this.slidrHandler,
        after: this.slidrHandler
      }).add('h', ['playlists', 'video-player', 'playlists'])
        .start('playlists');
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
          <Slidr id="jukebox-slidr" className={this.state.current.isVideoShowing ? '' : 'video-not-showing'} onLoaded={this.slidrCreate}>
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
          current={this.state.current}
          search={this.state.search}
          slidr={this.slidr.ref}
          dispatch={this.dispatch}
          />
      </div>
    );
  }
});

export default Jukebox;
