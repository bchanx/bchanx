import React from 'react';
import LocalStorageMixin from 'react-localstorage';
import classNames from 'classnames';
import { restorePlaylists, selectPlaylist, createPlaylist, deletePlaylist, updatePlaylist, playCurrent } from './redux/actions';
import { MEDIA_TYPES, PLAYLIST_TYPES } from './redux/actionTypes';

var PersonalPlaylists = React.createClass({
  displayName: 'PersonalPlaylists',

  mixins: [LocalStorageMixin],

  getDefaultProps: function() {
    return {
      currentPlaylist: {},
      personalPlaylists: [],
      slidr: null,
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      value: '',
      playlists: [],
      actions: {},
      showPlaylistCreate: false
    };
  },

  /*
  [{
    name: 'PERSONAL',
    created: Date.now(),
    modified: Date.now(),
    media: [{
      id: "WoCfFoQeWoU",
      type: MEDIA_TYPES.YOUTUBE,
      title: 'blah',
      duration: '4:44'
    }]
  }]
  */

  getStateFilterKeys: function() {
    return ['playlists'];
  },

  _initialSync: false,

  componentWillReceiveProps: function(nextProps) {
    let personalJSON = JSON.stringify(nextProps.personalPlaylists);
    let stateJSON = JSON.stringify(this.state.playlists);
    if (personalJSON !== stateJSON) {
      this.setState({
        playlists: JSON.parse(personalJSON)
      });
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    if (this._initialSync) {
      this._initialSync = false;
      if (nextState.playlists.length) {
        // No personal playlists loaded, restore
        this.props.dispatch(restorePlaylists(PLAYLIST_TYPES.PERSONAL, nextState.playlists));
      }
    }
    return true;
  },

  componentDidMount: function() {
    // Initialize the first update to sync playlists
    this._initialSync = true;
  },

  loadPlaylist: function(index) {
    this.props.dispatch(selectPlaylist(PLAYLIST_TYPES.PERSONAL, index), playCurrent());
    if (this.props.slidr) {
      this.props.slidr.slide('video-player');
    }
  },

  createPlaylist: function() {
    if (this.state.value) {
      this.props.dispatch(createPlaylist(PLAYLIST_TYPES.PERSONAL, this.state.value));
      this.setState({
        value: ''
      });
    }
  },

  deletePlaylist: function(index) {
    this.props.dispatch(deletePlaylist(PLAYLIST_TYPES.PERSONAL, index));
  },

  updatePlaylist: function(index, playlist) {
    let key = playlist.key;
    let actionState = this.state.actions[key];
    let name = actionState.name.trim();
    if (name) {
      this.props.dispatch(updatePlaylist(PLAYLIST_TYPES.PERSONAL, index, name));
      this.updateClicked('edit', key, name);
    }
  },

  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  stopPropagation: function(event) {
    event.stopPropagation();
  },

  updateClicked: function(type, key, name) {
    let actions = JSON.parse(JSON.stringify(this.state.actions));
    let current = actions[key] || {};
    current[type] = !current[type];
    current.name = name;
    actions[key] = current;
    this.setState({
      actions: actions
    });
  },

  editClicked: function(playlist) {
    this.updateClicked('edit', playlist.key, playlist.name);
  },

  deleteClicked: function(playlist) {
    this.updateClicked('delete', playlist.key, playlist.name);
  },

  togglePlaylistCreate: function() {
    this.setState({
      showPlaylistCreate: !this.state.showPlaylistCreate
    });
  },

  handleNameChange: function(key, event) {
    let actions = JSON.parse(JSON.stringify(this.state.actions));
    let current = actions[key];
    current.name = event.target.value;
    actions[key] = current;
    this.setState({
      actions: actions
    });
  },

  moveCaretToEnd: function(event) {
    let tmp = event.target.value;
    event.target.value = '';
    event.target.value = tmp;
  },
    
  render: function() {
    let personalPlaylists = this.props.personalPlaylists.map((p, idx) => {
      let onClickHandler = this.loadPlaylist.bind(this, idx);
      let actionState = this.state.actions[p.key] || {};
      return (
        <div key={p.key} className={classNames("playlist-item", {
          active: idx === this.props.currentPlaylist.index && p.name === this.props.currentPlaylist.name,
          editing: actionState.edit,
          deleting: actionState.delete
        })} onClick={onClickHandler}>
          <div className="playlist-meta">
            {actionState.edit ?
              <input
                className="playlist-edit-input"
                type="text"
                autoFocus
                ref={"playlistEdit" + p.key}
                placeholder="New playlist name"
                value={actionState.name}
                onClick={this.stopPropagation}
                onKeyDown={this.stopPropagation}
                onChange={this.handleNameChange.bind(this, p.key)}
                onFocus={this.moveCaretToEnd}
                /> :
            <div className="playlist-name">{p.name}</div>}
            {!actionState.edit ?
              <div className="playlist-length"> [{p.media.length} item{p.media.length === 1 ? '' : 's'}]</div> : null}
          </div>
          <div className={classNames("playlist-actions", {
            editing: actionState.edit || actionState.delete
          })} onClick={this.stopPropagation}>
            {actionState.edit ?
              <div className="edit-mode">
                <div className="playlist-edit-save action" onClick={this.updatePlaylist.bind(this, idx, p)}>save</div>
                <div className="playlist-cancel action default" onClick={this.editClicked.bind(this, p)}>cancel</div>
              </div> :
             actionState.delete ?
              <div className="delete-mode">
                <div className="playlist-delete-confirm action danger" onClick={this.deletePlaylist.bind(this, idx)}>delete?</div>
                <div className="playlist-cancel action default" onClick={this.deleteClicked.bind(this, p)}>cancel</div>
              </div> :
              <div className="normal-mode">
                <div className="playlist-edit action" onClick={this.editClicked.bind(this, p)}>edit</div>
                <div className="playlist-delete action" onClick={this.deleteClicked.bind(this, p)}>delete</div>
              </div>}
          </div>
        </div>
      );
    });

    return (
      <div className="playlists-content personal">
        <div className="playlists-group-name">Personal Playlists ({personalPlaylists.length})</div>
        <div className={classNames("playlist-items", {
          create: !personalPlaylists.length && this.state.showPlaylistCreate
        })}>
          {personalPlaylists.length ? personalPlaylists :
            !this.state.showPlaylistCreate ?
            <div className="playlist-item placeholder">
              You have no personal playlists.&nbsp;<span className="action" onClick={this.togglePlaylistCreate}>Create one</span>.
            </div> : null}
        </div>

        {this.state.showPlaylistCreate ?
          <div className="playlist-create">
            <input
              className="playlist-create-input"
              type="text"
              autoFocus
              ref="playlistCreate"
              placeholder="New playlist name..."
              value={this.state.value}
              onChange={this.handleChange}
              />
            <span className="action" onClick={this.createPlaylist}>create</span>
            <span className="action default" onClick={this.togglePlaylistCreate}>cancel</span>
          </div> : null}
      </div>
    );
  }
});

export default PersonalPlaylists;
