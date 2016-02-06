import {
  SHUFFLE,
  REPEAT,
  PLAYLIST,
  NOW_PLAYING,
  PLAY_NEXT,
  QUEUE_NEXT,
  PLAY_PREV,
  PLAY_NOW,
  PLAY_CURRENT,
  SELECT_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  DELETE_PLAYLIST,
  SEARCH_TOGGLE,
  SEARCH_FOCUS,
  TYPES
} from './actionTypes';

let update = function(state, updated) {
  return Object.assign({}, state, updated);
};

let controls = function(state, action) {
  switch (action.type) {
    case SHUFFLE:
      return update(state, {
        shuffle: !state.shuffle
      });

    case REPEAT:
      return update(state, {
        repeat: !state.repeat
      });

    case PLAYLIST:
      return update(state, {
        playlist: !state.playlist
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
  var order = list.slice(0);
  for (var i = order.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  return order;
};

let getVideoMetadata = function(video) {
  let mediaType = TYPES.UNKNOWN;
  let mediaId = null;
  if (video) {
    let meta = video.split(':');
    if (meta.length === 2) {
      mediaType = meta[0];
      mediaId = meta[1];
    }
  }
  return [ mediaId, mediaType ];
};

let current = function(state, action, controls, playlists) {
  switch (action.type) {
    case NOW_PLAYING:
      return update(state, {
        isPlaying: action.status
      });

    case PLAY_CURRENT:
      if (!state.isPlaying) {
        // If no song is playing, load the next song in queue
        if (state.queue.length) {
          let { mediaId, mediaType } = state.queue.shift();
          return update(state, {
            mediaId: mediaId,
            mediaType: mediaType,
            isQueue: true
          });
        }
        // Nothing in queue, load the current indexed track
        else if (state.order[state.index]) {
          let { mediaId, mediaType } = state.order[state.index];
          return update(state, {
            mediaId: mediaId,
            mediaType: mediaType,
            isQueue: false
          });
        }
      }
      return state;

    case PLAY_NEXT:
      if (state.queue.length) {
        // Play next in queue
        let { mediaId, mediaType } = state.queue.shift();
        return update(state, {
          mediaId: mediaId,
          mediaType: mediaType,
          isQueue: true
        });
      }
      else if (state.index !== null) {
        // Play next in playlist
        let nextIndex = Math.min(state.index + 1, state.order.length);
        if (nextIndex <= state.order.length - 1) {
          let { mediaId, mediaType } = state.order[nextIndex];

          return update(state, {
            mediaId: mediaId,
            mediaType: mediaType,
            index: nextIndex,
            isQueue: false
          });
        }

        // Else just update the index so PLAY_PREV works properly
        return update(state, {
          mediaId: null,
          mediaType: TYPES.UNKNOWN,
          index: nextIndex
        });
      }

      // Nothing to play next
      return update(state, {
        mediaId: null,
        mediaType: TYPES.UNKNOWN
      });

    case PLAY_PREV:
      if (!state.isQueue && state.index !== null) {
        // We don't allow going back in the queue
        let prevIndex = Math.min(state.index - 1, state.order.length - 1);
        if (prevIndex >= 0) {
          let { mediaId, mediaType } = state.order[prevIndex];

          return update(state, {
            mediaId: mediaId,
            mediaType: mediaType,
            index: prevIndex
          });
        }
      }
      return state;

    case SHUFFLE:
      if (state.playlist !== null) {
        let newOrder = playlists[state.playlist] && playlists[state.playlist].media || [];
        let currentVideo = state.mediaType + ':' + state.mediaId;
        if (!controls.shuffle) {
          // If shuffle was previously off, then it means we need to shuffle 
          newOrder = shuffle(newOrder);
        }
        // If we were previously at the end of the list, keep it there
        let newIndex = (state.index >= newOrder.length) ? newOrder.length : Math.max(newOrder.indexOf(currentVideo), 0);
        newOrder = newOrder.map(video => {
          let [ mediaId, mediaType ] = getVideoMetadata(video);
          return {
            mediaId: mediaId,
            mediaType: mediaType
          };
        });

        return update(state, {
          index: newIndex,
          order: newOrder
        });
      }
      return state;

    case PLAY_NOW:
      return update(state, {
        mediaId: action.mediaId,
        mediaType: action.mediaType
      });

    case QUEUE_NEXT:
      let newQueue = state.queue.slice();
      newQueue.push({
        mediaId: action.mediaId,
        mediaType: action.mediaType
      });

      return update(state, {
        queue: newQueue
      });

    case SELECT_PLAYLIST:
      let currentPlaylist = action.playlist || 0;
      let playlistOrder = playlists[currentPlaylist] && playlists[currentPlaylist].media || [];
      if (controls.shuffle) {
        playlistOrder = shuffle(playlistOrder);
      }
      playlistOrder = playlistOrder.map(video => {
        let [ mediaId, mediaType ] = getVideoMetadata(video);
        return {
          mediaId: mediaId,
          mediaType: mediaType
        };
      });

      return update(state, {
        playlist: currentPlaylist,
        index: 0,
        order: playlistOrder
      });

    default:
      return state;
  }
};

let playlists = function(state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

export default function reducer(state = {}, action) {
  return {
    controls: controls(state.controls, action),
    search: search(state.search, action),
    playlists: playlists(state.playlists, action),
    current: current(state.current, action, state.controls, state.playlists),
  };
}
