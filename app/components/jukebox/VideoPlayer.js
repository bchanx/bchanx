import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import Video from './Video';
import Controls from './Controls';
import MediaList from './MediaList';
import MediaSearch from './MediaSearch';
import NowPlaying from './NowPlaying';

var VideoPlayer = React.createClass({
  mixins: [ReactTimerMixin],

  componentDidMount: function() {
    let isChrome = !!window.chrome;
    this.setState({
      isChrome: isChrome
    });
    this.setInterval(() => {
      let video = this.refs.videoPlayer.children[0];
      if (video) {
        let bottom = video.getBoundingClientRect().bottom;
        if (this.state.sticky + bottom !== 0) {
          this.setState({
            sticky: -bottom
          });
        }
      }
    }, isChrome ? undefined : 0);
  },

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      overlay: {},
      slidr: null,
      dispatch: null,
      stickyOffset: 25
    };
  },

  getInitialState: function() {
    return {
      isChrome: false,
      sticky: 0,
      value: '',
      search: '',
    };
  },
  
  updateSearch: function(value) {
    this.setState({
      value: value,
      search: value.toLowerCase()
    });
  },

  getStickyStyling: function() {
    let stickyStyling = {};
    let stickyThreshold = this.state.sticky + this.props.stickyOffset;

    if (stickyThreshold > 0) {
      stickyStyling.controls = {
        marginTop: -Math.min(stickyThreshold, 10) + 'px',
        marginBottom: ((stickyThreshold <= 10) ? stickyThreshold : Math.max(0, (20 - stickyThreshold))) + 'px'
      };
      stickyStyling.nowPlaying = {
        paddingBottom: Math.min(5 + (stickyThreshold <= 10 ? 2 * stickyThreshold : 10 + stickyThreshold), 35) + 'px'
      };
      if (this.state.isChrome) {
        // Chrome, Opera
        stickyStyling.videoController = {
          paddingTop: (Math.min(stickyThreshold, 200 - 10) + 10) + 'px',
          top: (200 - 10 - Math.min(stickyThreshold, 200 - 10) + 170 + 25 + this.state.sticky) + 'px'
        };
      }
      else {
        // Safari, Mozilla
        let offsetPadding = Math.min(stickyThreshold, this.props.stickyOffset);
        stickyStyling.videoController = {
          paddingTop: (offsetPadding + 10) + 'px',
          top: (-100 - offsetPadding) + 'px'
        };
        stickyStyling.mediaList = {
          marginTop: -offsetPadding + 'px'
        };
      }
    }
    return stickyStyling;
  },

  render: function() {
    let stickyThreshold = this.state.sticky + this.props.stickyOffset;
    let stickyStyling = this.getStickyStyling();

    return (
      <div data-slidr="video-player" ref="videoPlayer" className={classNames("video-player", {
        sticky: stickyThreshold > 0,
        'is-chrome': this.state.isChrome
      })}>
        <Video
          current={this.props.current}
          controls={this.props.controls}
          overlay={this.props.overlay}
          slidr={this.props.slidr}
          dispatch={this.props.dispatch}
          />
        <div className="video-controller"
          style={stickyStyling.videoController}>
          <Controls
            style={stickyStyling.controls}
            current={this.props.current}
            controls={this.props.controls}
            overlay={this.props.overlay}
            dispatch={this.props.dispatch}
            />
          <NowPlaying
            style={stickyStyling.nowPlaying}
            current={this.props.current}
            controls={this.props.controls}
            dispatch={this.props.dispatch}
            />
          <MediaSearch
            current={this.props.current}
            controls={this.props.controls}
            value={this.state.value}
            search={this.state.search}
            updateSearch={this.updateSearch}
            />
        </div>
        <MediaList
          style={stickyStyling.mediaList}
          current={this.props.current}
          controls={this.props.controls}
          search={this.state.search}
          dispatch={this.props.dispatch}
          />
      </div>
    );
  }
});

export default VideoPlayer;
