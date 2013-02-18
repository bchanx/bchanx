//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

bchanx.require('playlist.js');

bchanx.player = {};
function onYouTubeIframeAPIReady() {
  bchanx.player = new YT.Player('video-src', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(e) {
  e.target.setVolume(100);
  e.target.playVideo();
}

function onPlayerStateChange(e) {
  if (e.data == YT.PlayerState.ENDED) {
    $('#next').click();
  }
}

var formatTime = function(t) {
  return Math.floor(t / 60) + ':' + ("0" + t % 60).slice(-2);
};

$(function() {
  var createPlaylist = function(data) {
    var table = $('#video-table').clone();
    var playlist = $('<tbody></tbody>');
    for (var d = 0; d < data.length; d++) {
      var item = data[d];
      var track = item['meta']['title'];
      var length = formatTime(item['meta']['duration']);
      playlist.append('<tr><td class="track" title="' + track + '">' + track + '</td>' + 
        '<td class="length">' + length + '</td></tr>');
    }
    table.append(playlist.html());
    return table.html();
  };

  var onGetAllMedia = function(data) {
    var playlist = new Playlist('video-src', data, true);
    var normalPlaylist = createPlaylist(playlist.videos);
    var shuffledPlaylist = createPlaylist(playlist.shuffledVideos);
    if (playlist.isEmpty()) {
      $('#video-src-none').css('visibility', 'visible');
    } else {
      $('#video-src').attr('src', playlist.getUrl()).css('visibility', 'visible');
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
      $('#stop').click();
      if (bchanx.player.hasOwnProperty('loadVideoById')) {
        bchanx.player.loadVideoById(playlist.next());
      }
    });
    var setShuffle = function() {
      var s = playlist.isShuffled;
      $('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');
      $('#video-table').css('opacity', 0)
        .html((s) ? shuffledPlaylist : normalPlaylist )
        .animate({'opacity': 1}, 400);
    };
    setShuffle();
    $('#shuffle').bind('click', function() {
      playlist.toggleShuffle();
      setShuffle();
    });
    $('#video-player').fadeIn();
    setTimeout(function() {
      $('#video-settings').fadeIn();
    }, 200);
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
        $('form #url').val('');
        console.log(data);
      }
    });
  });
});

