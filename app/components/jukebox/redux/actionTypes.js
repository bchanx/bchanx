// Controls
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const REPEAT = 'REPEAT';
export const SHUFFLE = 'SHUFFLE';
export const PLAYLIST = 'PLAYLIST';

// Search
export const SEARCH_TOGGLE = 'SEARCH_TOGGLE';
export const SEARCH_FOCUS = 'SEARCH_FOCUS';

// Overlay
export const SHOW_OVERLAY = 'SHOW_OVERLAY';
export const HIDE_OVERLAY = 'HIDE_OVERLAY';

// Current
export const INVALID = 'INVALID';
export const NOW_PLAYING = 'NOW_PLAYING';
export const PLAY_NEXT = 'PLAY_NEXT';
export const PLAY_PREV = 'PLAY_PREV';
export const QUEUE_NEXT = 'QUEUE_NEXT';
export const PLAY_NOW = 'PLAY_NOW';
export const PLAY_CURRENT = 'PLAY_CURRENT';
export const SELECT_PLAYLIST = 'SELECT_PLAYLIST';
export const RESTART_PLAYLIST = 'RESTART_PLAYLIST';

// Playlist
export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
export const REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';

// Media types
export const TYPES = {
  UNKNOWN: '-1',
  YOUTUBE: '0'
};

// YT.PlayerState.UNSTARTED (-1)
// YT.PlayerState.ENDED (0)
// YT.PlayerState.PLAYING (1)
// YT.PlayerState.PAUSED (2)
// YT.PlayerState.BUFFERING (3)
// YT.PlayerState.CUED (5)