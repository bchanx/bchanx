import React from 'react';
import classNames from 'classnames';
import { SOURCES } from './redux/actionTypes';
import MediaGroup from './MediaGroup';

var MediaList = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      search: '',
      dispatch: null
    }
  },

  render: function() {
    return (
      <div className={classNames("media-list", {
        invisible: !this.props.controls.playlist,
        hidden: this.props.current.source === SOURCES.UNKNOWN
      })}>

        {this.props.current.queue.length ?
          <MediaGroup
            name="queue"
            type={SOURCES.QUEUE}
            playlist={this.props.current.queue}
            current={this.props.current}
            search={this.props.search}
            dispatch={this.props.dispatch}
            /> : null}

        {this.props.current.order.length ?
          <MediaGroup
            name={this.props.current.playlist.name}
            type={SOURCES.PLAYLIST}
            playlist={this.props.current.order}
            current={this.props.current}
            search={this.props.search}
            dispatch={this.props.dispatch}
            /> : null}

      </div>
    );
  }
});

export default MediaList;
