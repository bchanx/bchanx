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
  if (e.data == YT.PlayerState.PLAYING) {
    showPause();
  } else if (e.data == YT.PlayerState.PAUSED) {
    showPlay();
  } else if  (e.data == YT.PlayerState.ENDED) {
    $('#next').trigger('click', [true]);
  }
}

var showPlay = function() {
  $('#pause').hide();
  $('#play').css('display', 'inline-block');
};

var showPause = function() {
  $('#play').hide();
  $('#pause').css('display', 'inline-block');
};

var formatTime = function(t) {
  return Math.floor(t / 60) + ':' + ("0" + t % 60).slice(-2);
};

var jq = function(id) {
  return '#' + id.replace(/(:|\.|\[|\])/g, '\\$1');
};

$(function() {
  var createPlaylist = function(data, className) {
    var playlist = $('<tbody class="' + className + '" style="display: none"></tbody>');
    for (var d = 0; d < data.length; d++) {
      var item = data[d];
      var track = item['meta']['title'];
      var length = formatTime(item['meta']['duration']);
      playlist.append('<tr mediaid="' + item['id'] + '" class="mediaItem themeable">' + 
        '<td class="track" title="' + track + '">' + track + '</td><td class="length">' + length + '</td></tr>');
    }
    return playlist;
  };

  var onGetAllMedia = function(data) {
    var playlist = new Playlist('video-src', data, true);

    if (playlist.isEmpty()) {
      $('#video-src-none').css('visibility', 'visible');
    } else {
      $('#video-src').attr('src', playlist.getUrl()).css('visibility', 'visible');
      var normalPlaylist = createPlaylist(playlist.videos, 'normal-playlist');
      var shuffledPlaylist = createPlaylist(playlist.shuffledVideos, 'shuffled-playlist');
      $('#video-table').append(normalPlaylist, shuffledPlaylist);
      $('tr.themeable').addClass($('#theme').attr('current-theme'));
    }

    var updateNowPlaying = function() {
      $('.playing').removeClass('playing');
      $('tr[mediaid="' + playlist.getId() + '"]').addClass('playing');
      var title = playlist.current['meta']['title'];
      var length = playlist.current['meta']['duration'];
      $('#video-title').attr('title', title).text(title);
      $('#video-length').text(formatTime(length));
    };

    $('#pause').bind('click', function() {
      if (bchanx.player.hasOwnProperty('pauseVideo')) {
        bchanx.player.pauseVideo();
      }
    });

    $('#play').bind('click', function() {
      if (bchanx.player.hasOwnProperty('playVideo')) {
        bchanx.player.playVideo();
      }
    });

    $('#prev').bind('click', function() {
      if (bchanx.player.hasOwnProperty('loadVideoById')) {
        bchanx.player.loadVideoById(playlist.prev());
        updateNowPlaying();
      }
    });

    $('#next').bind('click', function(event, mediaHasEnded) {
      if (mediaHasEnded && playlist.isRepeat) {
        bchanx.player.seekTo(0);
      } else if (bchanx.player.hasOwnProperty('loadVideoById')) {
        bchanx.player.loadVideoById(playlist.next());
        updateNowPlaying();
      }
    });

    $('#repeat').bind('click', function() {
      playlist.toggleRepeat();
      var r = playlist.isRepeat;
      $('#repeat').removeClass((r) ? 'off' : 'on').addClass((r) ? 'on' : 'off');
    });

    var setShuffle = function() {
      var s = playlist.isShuffled;
      $('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');
      var oldPlaylist = 'tbody.' + ((s) ? 'normal' : 'shuffled') + '-playlist';
      var switchingPlaylist = 'tbody.' + ((s) ? 'shuffled' : 'normal') + '-playlist';
      $(oldPlaylist).css('opacity', 0).hide();
      $(switchingPlaylist).show().animate({'opacity': 1}, 400, function() { updateNowPlaying(); });
    };
    setShuffle();

    $('#shuffle').bind('click', function() {
      playlist.toggleShuffle();
      setShuffle();
    });

    $('#playlist').bind('click', function() {
      if ($(this).hasClass('hide')) {
        $(this).removeClass('hide').addClass('show');
        $('#video-playing-info').hide();
        $('#video-playlist').fadeIn();
      } else {
        $(this).removeClass('show').addClass('hide');
        $('#video-playlist').hide();
        $('#video-playing-info').fadeIn();
      }
    });

    $('#video-player').fadeIn();
    setTimeout(function() {
      $('#video-settings').fadeIn();
    }, 200);

    $(document).on('click', '.mediaItem', function() {
      if (playlist.setCurrent($(this).attr('mediaid'))) {
        bchanx.player.loadVideoById(playlist.getMediaId());
        updateNowPlaying();
      }
    });
  };
  
  $('.themeable').addClass($('#theme').attr('current-theme'));

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

  $('#theme span').bind('click', function() {
    var currentTheme = $(this).parent().attr('current-theme');
    var selectedTheme = $(this).attr('id');
    $('.themeable').removeClass(currentTheme).addClass(selectedTheme);
    $('#theme').attr('current-theme', selectedTheme);
    $('#theme span').show();
    $('#theme span#' + selectedTheme).hide();
  });

});

