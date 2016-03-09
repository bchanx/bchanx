import React from 'react';
import classNames from 'classnames';
import { selectPlaylist, playCurrent } from './redux/actions';

var Playlists = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      playlists: [],
      slidr: null,
      dispatch: null
    }
  },

  loadPlaylist: function(index) {
    this.props.dispatch(selectPlaylist(index), playCurrent());
    if (this.props.slidr) {
      this.props.slidr.slide('video-player');
    }
  },

  render: function() {
    let sharedPlaylists = this.props.playlists.map((p, idx) => {
      let onClickHandler = this.loadPlaylist.bind(this, idx);
      return (
        <div key={idx} className={classNames("playlist-item", {
          active: idx === this.props.current.playlist.index && p.name === this.props.current.playlist.name
        })} onClick={onClickHandler}>
          <div className="playlist-name">{p.name}</div>
          <div className="playlist-length"> ({p.media.length})</div>
        </div>
      );
    });
    return (
      <div className="playlists" data-slidr="playlists">
        <div className="playlists-content shared">
          <div className="playlists-group-name">Shared Playlists</div>
          {sharedPlaylists}
        </div>
        <div className="playlists-content local">
          <div className="playlists-group-name">Local Playlists</div>
          <span>local...</span>
        </div>
      </div>
    );
  }
});

export default Playlists;
