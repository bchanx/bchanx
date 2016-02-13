import {
  PLAY,
  PAUSE,
  REPEAT,
  SHUFFLE,
  PLAYLIST,
  INVALID,
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
  RESTART_PLAYLIST
} from './actionTypes';

export function play(status) {
  return { type: PLAY, status: !!status };
}

export function pause(status) {
  return { type: PAUSE, status: !!status };
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

export function playNow(id, type, title, duration) {
  return { type: PLAY_NOW, media: { id: id, type: type, title: title, duration: duration } };
}

export function queueNext(id, type, title, duration) {
  return { type: QUEUE_NEXT, media: { id: id, type: type, title: title, duration: duration } };
}

export function selectPlaylist(index) {
  return { type: SELECT_PLAYLIST, playlist: index };
}
