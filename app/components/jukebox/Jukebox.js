import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import VideoPlaylists from './VideoPlaylists';
import VideoPlayer from './VideoPlayer';
import Search from './Search';
import Slidr from './Slidr';
import { TYPES } from './redux/actionTypes';
import reducer from './redux/reducers';

var Jukebox = React.createClass({

  mixins: [ReactTimerMixin],

  getInitialState: function() {
    return {
      current: {
        isPlaying: false,
        isLoading: false,
        mediaId: null,
        mediaType: TYPES.UNKNOWN,
        playlist: null,
        index: null,
        order: [],
        queue: [],
        isQueue: false
      },
      controls: {
        repeat: false,
        shuffle: true,
        playlist: false
      },
      playlists: [{
        name: 'EDM',
        media: [
          "0:JbH_Vn5pq8I",
          "0:Csm3BX30jZQ",
          "0:Rhm_-gMbTGU",
          "0:cERIwGKSU1A",
          "0:XWBEbR47Kwc"
        ]
      }]
    };
  },

  _slidr: null,

  _shouldUpdate: false,

  shouldComponentUpdate: function(nextProps, nextState) {
    var result = this._shouldUpdate;
    this._shouldUpdate = false;
    return result;
  },

  dispatch: function(...actions) {
    let newState = this.state;
    actions.forEach(action => {
      newState = reducer(newState, action);
    });
    this._shouldUpdate = true;
    this.setState(newState);
  },

  slidr: function() {
    return this._slidr;
  },

  createSlidr: function(slidr) {
    if (!this._slidr) {
      this._slidr = slidr.create('jukebox-slidr', {
        transition: 'cube',
        overflow: true,
        controls: 'border',
        keyboard: true
      }).add('h', ['video-playlists', 'video-player', 'video-playlists'])
        .add('v', ['video-playlists', 'video-player', 'video-playlists'])
        .start('video-player');
      this.setTimeout(() => {
        this._shouldUpdate = true;
        this.setState(this.state);
      }, 200);
    }
  },

  render: function() {
    return (
      <div className="jukebox-container">
        <div className={classNames("jukebox", {
          active: !!this._slidr
        })}>
          <Slidr id="jukebox-slidr" onLoaded={this.createSlidr}>
            <VideoPlaylists
              current={this.state.current}
              playlists={this.state.playlists}
              slidr={this.slidr}
              dispatch={this.dispatch}
              />
            <VideoPlayer
              current={this.state.current}
              controls={this.state.controls}
              dispatch={this.dispatch}
              />
          </Slidr>
        </div>
        <Search className={classNames({
          active: !!this._slidr
        })}/>
      </div>
    );
  }
});

export default Jukebox;
