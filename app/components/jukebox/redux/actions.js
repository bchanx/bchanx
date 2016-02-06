import {
  PLAY,
  PAUSE,
  REPEAT,
  SHUFFLE,
  PLAYLIST,
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

export function searchToggle() {
  return { type: SEARCH_TOGGLE };
}

export function searchFocus(opt_focus) {
  return { type: SEARCH_FOCUS, focus: opt_focus };
}

export function nowPlaying(status) {
  return { type: NOW_PLAYING, status: !!status };
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

export function playNow(mediaId, mediaType) {
  return { type: PLAY_NOW, mediaId: mediaId, mediaType: mediaType };
}

export function queueNext(mediaId, mediaType) {
  return { type: QUEUE_NEXT, mediaId: mediaId, mediaType: mediaType };
}

export function selectPlaylist(index) {
  return { type: SELECT_PLAYLIST, playlist: index };
}
