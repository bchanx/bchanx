// Controls
export const PLAY = 'PLAY';
export const PAUSE = 'PAUSE';
export const MUTE = 'MUTE';
export const UNMUTE = 'UNMUTE';
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
export const FULLSCREEN = 'FULLSCREEN';
export const AUDIO_MUTED = 'AUDIO_MUTED';
export const VIDEO_SHOWING = 'VIDEO_SHOWING';
export const NOW_PLAYING = 'NOW_PLAYING';
export const PLAY_NEXT = 'PLAY_NEXT';
export const PLAY_PREV = 'PLAY_PREV';
export const QUEUE_NEXT = 'QUEUE_NEXT';
export const PLAY_NOW = 'PLAY_NOW';
export const PLAY_CURRENT = 'PLAY_CURRENT';
export const SELECT_PLAYLIST = 'SELECT_PLAYLIST';
export const RESTART_PLAYLIST = 'RESTART_PLAYLIST';

// Playlist
export const RESTORE_PLAYLISTS = 'RESTORE_PLAYLISTS';
export const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
export const REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';
export const UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

// Media types
export const MEDIA_TYPES = {
  UNKNOWN: '-1',
  YOUTUBE: '1'
};

// Media sources
export const SOURCES = {
  UNKNOWN: -1,
  PLAYLIST: 1,
  QUEUE: 2
};

// Playlist types
export const PLAYLIST_TYPES = {
  UNKNOWN: 'unknown',
  GLOBAL: 'global',
  PERSONAL: 'personal'
};

// YT.PlayerState.UNSTARTED (-1)
// YT.PlayerState.ENDED (0)
// YT.PlayerState.PLAYING (1)
// YT.PlayerState.PAUSED (2)
// YT.PlayerState.BUFFERING (3)
// YT.PlayerState.CUED (5)
