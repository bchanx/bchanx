//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

bchanx.require('playlist.js');

bchanx.player = {};
function onYouTubePlayerAPIReady() {
  bchanx.player = new YT.Player('video-src');
  bchanx.player.addEventListener('onStateChange', function(res) {
    if (res.data == YT.PlayerState.ENDED) {
      $('#next').click();
    }
  });
}

$(function() {
  var onGetAllMedia = function(data) {
    var playlist = new Playlist('video-src', data, true);
    if (playlist.isEmpty()) {
      $('#video-src-none').css('visibility', 'visible');
    } else {
      playlist.load();
      $('#video-src').css('visibility', 'visible');
    }
    $('#stop').bind('click', function() {
      if (bchanx.player.hasOwnProperty('pauseVideo')) {
        bchanx.player.pauseVideo();
      }
    });
    $('#play').bind('click', function() {
      if (bchanx.player.hasOwnProperty('playVideo')) {
        bchanx.player.playVideo();
      }
    });
    $('#next').bind('click', function() {
      if (bchanx.player.hasOwnProperty('loadVideoById')) {
        bchanx.player.loadVideoById(playlist.next());
      }
    });
    var setShuffle = function() {
      var s = playlist.isShuffled;
      $('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');
    };
    setShuffle();
    $('#shuffle').bind('click', function() {
      playlist.toggleShuffle();
      setShuffle();
    });
    $('#video-player').fadeIn();
    $('#video-add').fadeIn();
  };

  $.ajax({
    'url': '/jukebox/getAll',
    'type': 'GET',
    'dataType': 'json',
    'success': onGetAllMedia
  });

  $('#video-add').bind('submit', function(e) {
    e.preventDefault();
    $.ajax({
      'url': this.action,
      'data': $(this).serialize(), 
      'type': 'POST',
      'dataType': 'json',
      'success': function(data) {
        // Insert to playlist
      }
    });
  });
});

