import React from 'react';
import classNames from 'classnames';
import { TYPES, SOURCES } from './redux/actionTypes';
import { playNow } from './redux/actions';

var MediaGroup = React.createClass({

  getDefaultProps: function() {
    return {
      name: '',
      type: SOURCES.UNKNOWN,
      playlist: [],
      current: {},
      search: '',
      dispatch: null
    };
  },

  playMedia: function(media) {
    this.props.dispatch(playNow(media, this.props.type));
  },

  render: function() {
    let searchMatches = false;
    let mediaUnplayed = false;
    let filteredPlaylist = this.props.playlist.map((p, idx) => {
      let hidden = p.title.toLowerCase().indexOf(this.props.search) < 0;
      let played = this.props.type === SOURCES.PLAYLIST ? idx < this.props.current.index : false;
      searchMatches = searchMatches || !hidden;
      mediaUnplayed = mediaUnplayed || !played;
      return {
        id: p.id,
        type: p.type,
        title: p.title,
        duration: p.duration,
        hidden: hidden,
        played: played,
        idx: idx
      };
    });
    
    filteredPlaylist = filteredPlaylist.map(p => {
      let onClickHandler = this.playMedia.bind(this, p);
      return (
        <div key={p.type + '_' + p.id} className={classNames("media-item", {
          active: this.props.current.source === this.props.type && this.props.current.media.id === p.id,
          hidden: p.hidden,
          played: !this.props.search && p.played
        })} onClick={onClickHandler}>
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
