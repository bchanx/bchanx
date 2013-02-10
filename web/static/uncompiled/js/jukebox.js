//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

bchanx.require('videomanager.js');

bchanx.player = {};
function onYouTubePlayerAPIReady() {
  bchanx.player = new YT.Player('video-src');
  bchanx.player.addEventListener('onStateChange', function(res) {
    if (res.data == YT.PlayerState.ENDED) {
      $('#next').click();
    }
  });
  $('#video-controls').fadeIn();
}

$(function() {
  var videoManager = new VideoManager('video-src', true);
  videoManager.load();
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
      bchanx.player.loadVideoById(videoManager.next());
    }
  });
  var setShuffle = function() {
    var s = videoManager.isShuffled;
    $('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');
  };
  setShuffle();
  $('#shuffle').bind('click', function() {
    videoManager.toggleShuffle();
    console.log("currently shuffle is: " + videoManager.isShuffled);
    setShuffle();
  });
});

