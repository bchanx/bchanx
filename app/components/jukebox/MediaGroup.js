import React from 'react';
import classNames from 'classnames';
import { TYPES, SOURCES } from './redux/actionTypes';

var MediaGroup = React.createClass({

  getDefaultProps: function() {
    return {
      name: '',
      type: SOURCES.UNKNOWN,
      playlist: [],
      current: {},
      search: ''
    };
  },

  render: function() {
    let searchMatches = false;
    let mediaUnplayed = false;
    let filteredPlaylist = this.props.playlist.slice().map((p, idx) => {
      let hidden = p.title.toLowerCase().indexOf(this.props.search) < 0;
      let played = this.props.type === SOURCES.PLAYLIST ? idx < this.props.current.index : false;
      searchMatches = searchMatches || !hidden;
      mediaUnplayed = mediaUnplayed || !played;
      p.hidden = hidden;
      p.played = played;
      p.idx = idx;
      return p;
    }).sort((a, b) => {
      return !a.hidden ? -1 : !b.hidden ? 1 : 0;
    }).map(p => {
      return (
        <div key={p.type + '_' + p.id} className={classNames("media-item", {
          active: this.props.current.source === this.props.type && this.props.current.media.id === p.id,
          hidden: p.hidden,
          played: !this.props.search && p.played
        })}>
          <div className="media-number">{p.idx + 1}</div>
          <div className="media-title">{p.title}</div>
          <div className="media-duration">{p.duration}</div>
        </div>
      );
    });

    return (
      <div className={classNames("media-group", {
        queue: this.props.type === SOURCES.QUEUE,
        noresults: !searchMatches
      })}>
        <div className={classNames("media-group-name", {
          hidden: !(this.props.search && searchMatches || !this.props.search && mediaUnplayed)
        })}>{this.props.name}</div>
        <div className="media-items">{filteredPlaylist}</div>
      </div>
    );
  }
});

export default MediaGroup;
