//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

bchanx.require('playlist.js');
bchanx.require('controls.js');

bchanx.player = {};

// Callback for initializing YT Iframe API.
function onYouTubeIframeAPIReady() {
  bchanx.player = new YT.Player('video-src', {
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// Callback when YT.Player is ready.
function onPlayerReady(e) {
  e.target.setVolume(100);
  e.target.playVideo();
}

// Callback when YT.Player changes state.
function onPlayerStateChange(e) {
  if (e.data == YT.PlayerState.PLAYING) {
    $('#play').hide();
    $('#pause').css('display', 'inline-block');
  } else if (e.data == YT.PlayerState.PAUSED) {
    $('#pause').hide();
    $('#play').css('display', 'inline-block');
  } else if  (e.data == YT.PlayerState.ENDED) {
    $('#next').trigger('click', [true]);
  }
}

// Main jukebox object.
bchanx.Jukebox = function(controls) {
  var self = this;
  self.controls = controls;
  self.playlist = null;
  self.playlistData = {};

  // Format a timestamp into (MM:SS).
  var formatTime = function(t) {
    return Math.floor(t / 60) + ':' + ("0" + t % 60).slice(-2);
  };

  // Returns a jquery escaped id.
  var jq = function(id) {
    return '#' + id.replace(/(:|\.|\[|\])/g, '\\$1');
  };

  // Static bindings for Jukebox.
  var staticBindings = function() {
    $('#pause').bind('click', function() {
      if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('pauseVideo')) {
        bchanx.player.pauseVideo();
      }
    });
    $('#play').bind('click', function() {
      if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('playVideo')) {
        bchanx.player.playVideo();
      }
    });
    $('#prev').bind('click', function() {
      if (self.playlist && !self.playlist.isEmpty() && bchanx.player.hasOwnProperty('loadVideoById')) {
        bchanx.player.loadVideoById(self.playlist.prev());
        self.updateNowPlaying();
      }
    });
    $('#next').bind('click', function(event, mediaHasEnded) {
      if (self.playlist && !self.playlist.isEmpty()) {
        if (mediaHasEnded && self.playlist.isRepeat) {
          bchanx.player.seekTo(0);
        } else if (bchanx.player.hasOwnProperty('loadVideoById')) {
          bchanx.player.loadVideoById(self.playlist.next());
          self.updateNowPlaying();
        }
      }
    });
    $('#repeat').bind('click', function() {
      if (self.playlist && !self.playlist.isEmpty()) {
        self.playlist.toggleRepeat();
        var r = self.playlist.isRepeat;
        $('#repeat').removeClass((r) ? 'off' : 'on').addClass((r) ? 'on' : 'off');
      }
    });
    $('#shuffle').bind('click', function() {
      if (self.playlist && !self.playlist.isEmpty()) {
        self.toggleShuffle();
      }
    });
    $('#playlist').bind('click', function() {
      if (self.playlist && !self.playlist.isEmpty()) {
        self.toggleTracklist();
      }
    });
  };

  // Dynamic bindings for Jukebox.
  var dynamicBindings = function() {
    $(document).on('click', '.mediaItem', function() {
      if (self.playlist && !self.playlist.isEmpty()) {
        if (self.playlist.setCurrent($(this).attr('mediaid'))) {
          bchanx.player.loadVideoById(self.playlist.getMediaId());
          self.updateNowPlaying();
        }
      }
    });
    $(document).on('click', 'li[pid]', function() {
      self.loadPlaylist($(this).attr('pid'));
    });
    $(document).keydown(function(e) {
      // Right arrow
      if (e.which === 39) {
        self.controls.next();
      // Left arrow
      } else if (e.which === 37) {
        self.controls.prev();
      // n
      } else if (e.which === 78) {
        $('#next').click();
      // p
      } else if (e.which === 80) {
        $('#prev').click();
      // s
      } else if (e.which === 83) {
        $('#shuffle').click();
      }
      // Up (38), Down (40)
    });
  };

  // Initialize bindings and go!
  self.init = function() {
    staticBindings();
    dynamicBindings();
    $.ajax({
      'url': '/jukebox/playlistGetAll',
      'type': 'GET',
      'dataType': 'json',
      'success': self.onPlaylistGetAll
    });
  };

  // Callback for retrieving playlists.
  self.onPlaylistGetAll = function(data) {
    if (data.length) {
      data = data.sort(function(a, b) {return a.pid - b.pid;});
      var playlists = $('<ul></ul>');
      for (var i = 0; i < data.length; i++) {
        playlists.append('<li pid="' + data[i].pid + '">' + data[i].title + '</li>');
      }
      $('#playlists').append(playlists);
    }
    var fadeIn = ['#controls', '#playlists'];
    for (var f in fadeIn) {
      $(fadeIn[f] + '-container').fadeIn();
    }
  };

  // Loads a playlist.
  self.loadPlaylist = function(pid) {
    self.controls.select('video');
    self.controls.disable();
    setTimeout(function() {
      if (self.playlistData[pid]) {
        return self.onLoadPlaylist(pid, self.playlistData[pid]);
      }
      $.ajax({
        'url': '/jukebox/playlistLoad',
        'type': 'POST',
        'data': {'pid': pid},
        'dataType': 'json',
        'success': function(result) {
          self.playlistData[result.pid] = result.data;
          self.onLoadPlaylist(result.pid, result.data);
        }
      });
    }, 600);
  };

  // Callback after selecting a playlist.
  self.onLoadPlaylist = function(pid, data) {
    self.playlist = new Playlist('video-src', data, true);
    if (self.playlist.isEmpty()) {
      self.toggleVideoDisplay(true);
    } else {
      self.toggleVideoDisplay();
      $('tbody').remove();
      var normalTracklist = self.createTracklist(self.playlist.videos, 'normal-tracklist');
      var shuffledTracklist = self.createTracklist(self.playlist.shuffledVideos, 'shuffled-tracklist');
      $('#video-table').append(normalTracklist, shuffledTracklist);
      $('tr.themeable').addClass($('#theme').attr('current-theme'));
      if (!$('#video-src').attr('src') || !bchanx.player.hasOwnProperty('playVideo')) {
        $('#video-src').attr('src', self.playlist.getUrl()).css('visibility', 'visible');
      } else {
        bchanx.player.loadVideoById(self.playlist.getMediaId());
      }
      self.toggleTracklist(true);
      self.toggleShuffle(true);
      $('#video-settings').fadeIn();
    }
    self.updateNowPlaying(pid);
    self.controls.enable();
  };

  // Toggles video display.
  self.toggleVideoDisplay = function(hide) {
    if (hide) {
      if (bchanx.player.hasOwnProperty('stopVideo')) {
        bchanx.player.stopVideo();
      }
      $('.playlist-playing').removeClass('playlist-playing');
      $('#video-src').hide();
      $('#video-settings').hide();
      $('#video-src-none').css('visibility', 'visible');
    } else {
      $('#video-src-none').css('visibility', 'hidden');
      $('#video-src').show();
    }
  };

  // Update now playing status.
  self.updateNowPlaying = function(pid) {
    if (self.playlist && !self.playlist.isEmpty()) {
      $('.playing').removeClass('playing');
      $('tr[mediaid="' + self.playlist.getId() + '"]').addClass('playing');
      var title = self.playlist.current['meta']['title'];
      var length = self.playlist.current['meta']['duration'];
      $('#video-title').attr('title', title).text(title);
      $('#video-length').text(formatTime(length));
    }
    if (pid) {
      $('.playlist-playing').removeClass('playlist-playing');
      $('li[pid="' + pid + '"]').addClass('playlist-playing');
    }
  };

  // Toggle tracklist between normal/shuffle.
  self.toggleShuffle = function(opt_reset) {
    if (self.playlist) {
      if (!opt_reset) {
        self.playlist.toggleShuffle();
      }
      var s = self.playlist.isShuffled;
      $('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');
      var oldPlaylist = 'tbody.' + ((s) ? 'normal' : 'shuffled') + '-tracklist';
      var switchingPlaylist = 'tbody.' + ((s) ? 'shuffled' : 'normal') + '-tracklist';
      $(oldPlaylist).css('opacity', 0).hide();
      $(switchingPlaylist).show().animate({'opacity': 1}, 400);
    }
  };

  // Toggles display/hiding the tracklist.
  self.toggleTracklist = function(opt_reset) {
    if (opt_reset || $('#playlist').hasClass('hide')) {
      $('#playlist').removeClass('hide').addClass('show');
      $('#video-playlist').hide();
      $('#video-playing-info').fadeIn();
    } else {
      $('#playlist').removeClass('show').addClass('hide');
      $('#video-playing-info').hide();
      $('#video-playlist').fadeIn();
    }
  };

  // Create a tracklist.
  self.createTracklist = function(data, className) {
    var tracklist = $('<tbody class="' + className + '" style="display: none"></tbody>');
    for (var d = 0; d < data.length; d++) {
      var item = data[d];
      var track = item['meta']['title'];
      var length = formatTime(item['meta']['duration']);
      tracklist.append('<tr mediaid="' + item['id'] + '" class="mediaItem themeable">' + 
        '<td class="track" title="' + track + '">' + track + '</td><td class="length">' + length + '</td></tr>');
    }
    return tracklist;
  };
};


$(function() {
  $('.themeable').addClass($('#theme').attr('current-theme'));
  $('#theme span').bind('click', function() {
    var currentTheme = $(this).parent().attr('current-theme');
    var selectedTheme = $(this).attr('id');
    $('.themeable').removeClass(currentTheme).addClass(selectedTheme);
    $('#theme').attr('current-theme', selectedTheme);
    $('#theme span').show();
    $('#theme span#' + selectedTheme).hide();
  });

  var controls = new bchanx.Controls();
  controls.init();
  var jukebox = new bchanx.Jukebox(controls);
  jukebox.init();

  var formIds = ['#playlist-create'];
  for (var f in formIds) {
    if ($(formIds[f]).length) {
      $(formIds[f]).bind('submit', function(e) {
        e.preventDefault();
        $.ajax({
          'url': this.action,
          'data': $(this).serialize(), 
          'type': 'POST',
          'dataType': 'json',
          'success': function(data) {
            // Add to playlist
            $('input[type="text"]').val('');
            console.log(data);
          }
        });
      });
    }
  }
});

