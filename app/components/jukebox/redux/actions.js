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
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  SEARCH_TOGGLE,
  SEARCH_FOCUS,
  NOW_PLAYING,
  PLAY_PREV,
  PLAY_NEXT,
  PLAY_NOW,
  PLAY_CURRENT,
  QUEUE_NEXT,
  SELECT_PLAYLIST,
  RESTART_PLAYLIST,
  RESTORE_PLAYLISTS,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  ADD_TO_PLAYLIST,
  REMOVE_FROM_PLAYLIST,
  UPDATE_PLAYLIST
} from './actionTypes';

export function play(status) {
  return { type: PLAY, status: !!status };
}

export function pause(status) {
  return { type: PAUSE, status: !!status };
}

export function mute(status) {
  return { type: MUTE, status: !!status };
}

export function unmute(status) {
  return { type: UNMUTE, status: !!status };
}

export function repeat() {
  return { type: REPEAT };
}

export function shuffle() {
  return { type: SHUFFLE };
}

export function playlist() {
  return { type: PLAYLIST };
}

export function invalid(status) {
  return { type: INVALID, status: !!status };
}

export function fullscreen(status) {
  return { type: FULLSCREEN, status: !!status };
}

export function audioMuted(status) {
  return { type: AUDIO_MUTED, status: !!status };
}

export function videoShowing(status) {
  return { type: VIDEO_SHOWING, status: !!status };
}

export function showOverlay(duration, action) {
  return { type: SHOW_OVERLAY, duration: duration, action: action };
}

export function hideOverlay() {
  return { type: HIDE_OVERLAY };
}

export function searchToggle() {
  return { type: SEARCH_TOGGLE };
}

export function searchFocus(opt_focus) {
  return { type: SEARCH_FOCUS, focus: opt_focus };
}

export function nowPlaying(status, state) {
  return { type: NOW_PLAYING, status: !!status, state: state };
}

export function playPrev() {
  return { type: PLAY_PREV };
}

export function playNext() {
  return { type: PLAY_NEXT };
}

export function restartPlaylist() {
  return { type: RESTART_PLAYLIST };
}

export function playCurrent() {
  return { type: PLAY_CURRENT };
}

export function playNow(media, source) {
  return { type: PLAY_NOW, media: { id: media.id, type: media.type, title: media.title, duration: media.duration }, source: source };
}

export function queueNext(id, type, title, duration) {
  return { type: QUEUE_NEXT, media: { id: id, type: type, title: title, duration: duration } };
}

export function selectPlaylist(playlistType, index) {
  return { type: SELECT_PLAYLIST, playlistType: playlistType, index: index };
}

export function restorePlaylists(playlistType, playlists) {
  return { type: RESTORE_PLAYLISTS, playlistType: playlistType, playlists: playlists };
}

export function createPlaylist(playlistType, name) {
  return { type: CREATE_PLAYLIST, playlistType: playlistType, name: name };
}

export function deletePlaylist(playlistType, index) {
  return { type: DELETE_PLAYLIST, playlistType: playlistType, index: index };
}

export function addToPlaylist(playlistType, index, media) {
  return { type: DELETE_PLAYLIST, playlistType: playlistType, index: index, media: media };
}

export function removeFromPlaylist(playlistType, index, mediaIndex) {
  return { type: DELETE_PLAYLIST, playlistType: playlistType, index: index, mediaIndex: mediaIndex };
}

export function updatePlaylist(playlistType, index, name) {
  return { type: UPDATE_PLAYLIST, playlistType: playlistType, index: index, name: name };
}
