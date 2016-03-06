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
    this.setState({
      isChrome: !!window.chrome
    });
    this.setInterval(() => {
      let video = this.refs.videoPlayer.children[0];
      if (video) {
        let bottom = video.getBoundingClientRect().bottom;
        this.setState({
          sticky: -bottom
        });
      }
    }, 0);
  },

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      overlay: {},
      slidr: null,
      dispatch: null
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

  render: function() {
    return (
      <div data-slidr="video-player" ref="videoPlayer" className={classNames("video-player", {
        sticky: this.state.sticky > 0,
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
          style={this.state.isChrome && this.state.sticky > 0 ? {paddingTop: '200px', top: (170 + this.state.sticky) + 'px'} : null}>
          <Controls
            current={this.props.current}
            controls={this.props.controls}
            overlay={this.props.overlay}
            dispatch={this.props.dispatch}
            />
          <NowPlaying
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
