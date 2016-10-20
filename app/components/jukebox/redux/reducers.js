import {
  PLAY,
  PAUSE,
  MUTE,
  UNMUTE,
  REPEAT,
  SHUFFLE,
  PLAYLIST,
  INVALID,
  FULLSCREEN,
  AUDIO_MUTED,
  VIDEO_SHOWING,
  NOW_PLAYING,
  PLAY_NEXT,
  QUEUE_NEXT,
  PLAY_PREV,
  PLAY_NOW,
  PLAY_CURRENT,
  RESTART_PLAYLIST,
  SELECT_PLAYLIST,
  RESTORE_PLAYLISTS,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  UPDATE_PLAYLIST,
  SEARCH_TOGGLE,
  SEARCH_FOCUS,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  MEDIA_TYPES,
  SOURCES,
  PLAYLIST_ACTIONS
} from './actionTypes';

let update = function(state, updated) {
  return Object.assign({}, state, updated);
};

let KEY_CONSTANTS = {
  values: 'abcdefghijklmnopqrstuvwxyz1234567890',
  length: 6
};

let generatePlaylistKey = function(playlists) {
  let existingKeys = playlists.map(p => p.key);
  let newKeys = [];
  while (!newKeys.length) {
    for (let i = 0; i < KEY_CONSTANTS.length; i++) {
      newKeys.push(KEY_CONSTANTS.values[Math.floor(Math.random() * KEY_CONSTANTS.values.length)]);
    }
    let newKey = newKeys.join('').toUpperCase();
    if (existingKeys.indexOf(newKey) < 0) {
      return newKey;
    }
    newKeys.length = 0;
  }
};

let controls = function(state, action) {
  switch (action.type) {
    case PLAY:
      return update(state, {
        play: action.status
      });

    case PAUSE:
      return update(state, {
        pause: action.status
      });

    case MUTE:
      return update(state, {
        mute: action.status
      });

    case UNMUTE:
      return update(state, {
        unmute: action.status
      });

    case REPEAT:
      return update(state, {
        repeat: !state.repeat
      });

    case SHUFFLE:
      return update(state, {
        shuffle: !state.shuffle
      });

    case PLAYLIST:
      return update(state, {
        playlist: !state.playlist
      });

    default:
      return state;
  }
};

let overlay = function(state, action) {
  switch (action.type) {
    case SHOW_OVERLAY:
      return update(state, {
        show: true,
        duration: action.duration,
        action: action.action
      });

    case HIDE_OVERLAY:
      return update(state, {
        show: false,
        duration: 0,
        callback: null
      });

    default:
      return state;
  }
};

let search = function(state, action) {
  switch (action.type) {
    case SEARCH_TOGGLE:
      let expand = !state.expand;
      return update(state, {
        expand: expand,
        focus: expand
      });

    case SEARCH_FOCUS:
      return update(state, {
        expand: true,
        focus: action.focus !== undefined ? action.focus : true
      });

    default:
      return state;
  }
};

let shuffle = function(list) {
  let order = list.slice(0);
  for (let i = order.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  return order;
};

let current = function(state, action, controls, playlists) {
  switch (action.type) {
    case INVALID:
      return update(state, {
        isInvalid: action.status
      });

    case AUDIO_MUTED:
      return update(state, {
        isMuted: action.status
      });

    case FULLSCREEN:
      return update(state, {
        isFullscreen: action.status
      });

    case VIDEO_SHOWING:
      return update(state, {
        isVideoShowing: action.status
      });

    case NOW_PLAYING:
      let newPlayStates = state.playStates.slice(state.playStates.length >= 3 ? 1 : 0, state.playStates.length);
      newPlayStates.push(action.state);
      return update(state, {
        isPlaying: action.status,
        playStates: newPlayStates
      });

    case PLAY_CURRENT:
      if (!state.isPlaying) {
        // If no song is playing, load the next song in queue
        if (state.queue.length) {
          return update(state, {
            media: state.queue[0],
            source: SOURCES.QUEUE
          });
        }
        // Nothing in queue, load the current indexed track
        else {
          let index = Math.max(0, state.index);
          if (state.order[index]) {
            return update(state, {
              media: state.order[index],
              index: index,
              source: SOURCES.PLAYLIST
            });
          }
        }
      }
      return state;

    case PLAY_NEXT:
      let nextIndex = state.index;
      if (state.index !== null && state.source === SOURCES.PLAYLIST) {
        // If we're currently playing from a playlist, update the index
        nextIndex = Math.min(state.index + 1, state.order.length);
      }

      if (state.queue.length &&
          state.source === SOURCES.QUEUE &&
          state.media.type === state.queue[0].type &&
          state.media.id === state.queue[0].id) {
          // If we just finished something in the queue, pop it off
          state.queue.shift();
      }

      if (state.queue.length) {
        // Play next in queue
        return update(state, {
          media: state.queue[0],
          source: SOURCES.QUEUE,
          index: nextIndex
        });
      }
      else if (state.index !== null) {
        // Play next in playlist.
        nextIndex = Math.max(nextIndex, 0);
        if (nextIndex <= state.order.length - 1) {
          return update(state, {
            media: state.order[nextIndex],
            index: nextIndex,
            source: SOURCES.PLAYLIST
          });
        }
      }

      // Else just update the index so PLAY_PREV works properly
      return update(state, {
        media: {
          id: null,
          type: MEDIA_TYPES.UNKNOWN,
          title: '',
          duration: ''
        },
        index: nextIndex
      });

    case PLAY_PREV:
      if (state.source !== SOURCES.QUEUE && state.index !== null) {
        // We don't allow going back in the queue
        let prevIndex = Math.min(state.index - 1, state.order.length - 1);
        if (prevIndex >= 0) {

          return update(state, {
            media: state.order[prevIndex],
            index: prevIndex,
            isPlaylist: true
          });
        }
      }
      return state;

    case RESTART_PLAYLIST:
      if (state.order.length) {
        return update(state, {
          isPlaying: false,
          index: 0
        });
      }
      return state;

    case SHUFFLE:
      if (state.playlist.index !== null) {
        let newOrder = playlists[state.playlist.type] &&
          playlists[state.playlist.type][state.playlist.index] &&
          playlists[state.playlist.type][state.playlist.index].media || [];
        if (!controls.shuffle) {
          // If shuffle was previously off, then it means we need to shuffle 
          newOrder = shuffle(newOrder);
        }
        // If we were previously at the end of the list, keep it there
        let newIndex = (state.index >= newOrder.length) ? newOrder.length : Math.max(newOrder.map(x => x.type + ':' + x.id).indexOf(state.media.type + ':' + state.media.id), 0);

        return update(state, {
          index: newIndex,
          order: newOrder
        });
      }
      return state;

    case PLAY_NOW:
      if (action.source === SOURCES.QUEUE) {
        // If it exists in the queue, remove
        let queueIndex = -1;
        let queueExists = state.queue.filter((q, idx) => {
          if (q.type === action.media.type && q.id === action.media.id) {
            queueIndex = idx;
            return true;
          }
          return false;
        });

        let newQueue = state.queue.slice();
        if (queueExists.length) {
          newQueue = newQueue.slice(0, queueIndex).concat(newQueue.slice(queueIndex + 1));
        }

        // Now add newest media to top of the queue
        newQueue = [action.media].concat(newQueue);
        return update(state, {
          media: action.media,
          source: action.source,
          queue: newQueue
        });
      }
      else if (action.source === SOURCES.PLAYLIST) {
        // Just update media and index
        let playlistIndex = -1;
        let playlistExists = state.order.filter((o, idx) => {
          if (o.type === action.media.type && o.id === action.media.id) {
            playlistIndex = idx;
            return true;
          }
          return false;
        });

        if (playlistExists.length) {
          return update(state, {
            media: action.media,
            source: action.source,
            index: playlistIndex
          });
        }
      }

      return state;

    case QUEUE_NEXT:
      if (!(state.media.id === action.media.id &&
          state.media.type === action.media.type) &&
          !state.queue.filter(s => {
            return s.id === action.media.id && s.type === action.media.type;
          }).length) {
        let newQueue = state.queue.slice();
        newQueue.push(action.media);

        return update(state, {
          queue: newQueue
        });
      }
      return state;

    case SELECT_PLAYLIST:
      let playlistType = action.playlistType;
      let playlistIndex = action.index || 0;
      let playlist = playlists[playlistType] && playlists[playlistType][playlistIndex] || {};
      let playlistOrder = playlist.media || [];
      let playlistName = playlist.name || '';
      if (controls.shuffle) {
        playlistOrder = shuffle(playlistOrder);
      }

      let updated = {
        playlist: {
          type: playlistType,
          index: playlistIndex,
          name: playlistName
        },
        index: -1,
        order: playlistOrder
      };

      if (state.source === SOURCES.PLAYLIST) {
        // If we're currently in a playlist already, reset the isPlaying
        // flag in order for playCurrent() to trigger a new song.
        updated.isPlaying = false;  
      }

      return update(state, updated);

    default:
      return state;
  }
};

let playlists = function(state, action) {
  let playlists;
  let playlist;
  switch (action.type) {
    case RESTORE_PLAYLISTS:
      playlists = action.playlists;
      break;
    case CREATE_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlists.push({
        name: action.name,
        key: generatePlaylistKey(state[action.playlistType]),
        created: Date.now(),
        modified: Date.now(),
        media: []
      });
      break;
    case DELETE_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlists.splice(action.index, 1);
      break;
    case ADD_TO_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlist = playlists[action.index];
      playlist.media.push(action.media);
      playlist.modified = Date.now();
      break;
    case REMOVE_FROM_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlist = playlists[action.index];
      playlist.media.splice(action.mediaIndex, 1);
      playlist.modified = Date.now();
      break;
    case UPDATE_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlist = playlists[action.index];
      playlist.name = action.name;
      playlist.modified = Date.now();
      break;
    default:
      return state;
  }

  console.log("-->> CURRENT state:", state);
  console.log("-->> UPDATED STATE:", update(state, {
    [action.playlistType]: playlists
  }));

  return update(state, {
    [action.playlistType]: playlists
  });
};

export default function reducer(state = {}, action) {
  return {
    controls: controls(state.controls, action),
    search: search(state.search, action),
    overlay: overlay(state.overlay, action),
    playlists: playlists(state.playlists, action),
    current: current(state.current, action, state.controls, state.playlists),
  };
}
