import React from 'react';
import classNames from 'classnames';
import PersonalPlaylists from './PersonalPlaylists';
import { selectPlaylist, playCurrent } from './redux/actions';
import { PLAYLIST_TYPES } from './redux/actionTypes';

var Playlists = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      playlists: {},
      slidr: null,
      dispatch: null
    }
  },

  loadPlaylist: function(index) {
    this.props.dispatch(selectPlaylist(PLAYLIST_TYPES.GLOBAL, index), playCurrent());
    if (this.props.slidr) {
      this.props.slidr.slide('video-player');
    }
  },

  render: function() {
    let globalPlaylists = this.props.playlists.global.map((p, idx) => {
      let onClickHandler = this.loadPlaylist.bind(this, idx);
      return (
        <div key={idx} className={classNames("playlist-item", {
          active: idx === this.props.current.playlist.index && p.name === this.props.current.playlist.name
        })} onClick={onClickHandler}>
          <div className="playlist-name">{p.name}</div>
          <div className="playlist-length"> [{p.media.length} item{p.media.length === 1 ? '' : 's'}]</div>
        </div>
      );
    });
    return (
      <div className="playlists" data-slidr="playlists">
        <div className="playlists-content global">
          <div className="playlists-group-name">Global Playlists ({this.props.playlists.global.length})</div>
          <div className="playlist-items">{globalPlaylists}</div>
        </div>
        <PersonalPlaylists
          currentPlaylist={this.props.current.playlist}
          personalPlaylists={this.props.playlists.personal}
          slidr={this.props.slidr}
          dispatch={this.props.dispatch}
          />
      </div>
    );
  }
});

export default Playlists;
