import React from 'react';
import { selectPlaylist, playCurrent } from './redux/actions';

var VideoPlaylists = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      playlists: [],
      slidr: null,
      dispatch: null
    }
  },

  loadPlaylist: function(index) {
    console.log("-->> playlist clicked!", index);
    this.props.dispatch(selectPlaylist(index), playCurrent());
    if (this.props.slidr) {
      console.log("-->> SLIDE!!");
      this.props.slidr().slide('video-player');
    }
  },

  render: function() {
    let playlists = this.props.playlists.map((p, idx) => {
      let onClickHandler = this.loadPlaylist.bind(this, idx);
      return (
        <div key={idx} className="playlist-item" onClick={onClickHandler}>
          <div className="playlist-name">{p.name}</div>
          <div className="playlist-length"> ({p.media.length})</div>
        </div>
      );
    });
    return (
      <div className="video-playlists" data-slidr="video-playlists">
        {playlists}
      </div>
    );
  }
});

export default VideoPlaylists;
