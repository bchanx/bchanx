/*!
 * Copyright (c) 2014 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

if (bchanx.type === 'devel') bchanx.require('slidr.js');
bchanx.require('playlist.js');

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
var Jukebox = function() {
  var self = this;
  self.slidr = null;
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
      if (e.which === 78) { $('#next').click(); } // n
      else if (e.which === 80) { $('#prev').click(); } // p
      else if (e.which === 83) { $('#shuffle').click(); } // s
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
    return self;
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

    // Go go gadget slidr.
    self.slidr = slidr.create('jukebox', {
      'transition': 'cube',
      'overflow': true,
      'controls': 'none',
      'keyboard': true
    }).add('h', ['playlists', 'video', 'about', 'playlists'])
      .add('v', ['playlists', 'video', 'about', 'playlists'])
      .start();

    // Show search.
    $('#search-container').fadeIn(400);

    // Start resize watching.
    setInterval(function() {
      var searchActive = $('#jukebox-container').hasClass('search-active');
      var jukeboxHeight = $('#jukebox-container').outerHeight();
      var searchHeight = (searchActive) ? $('#search-container').outerHeight() : 0;
      $('#body').css('height', Math.max(jukeboxHeight, searchHeight));
    }, 200);
  };

  // Loads a playlist.
  self.loadPlaylist = function(pid) {
    self.slidr.slide('right');
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
      tracklist.append('<tr mediaid="' + item['id'] + '" class="mediaItem">' + 
        '<td class="track" title="' + track + '">' + track + '</td><td class="length">' + length + '</td></tr>');
    }
    return tracklist;
  };

  return self;
};


var Search = function() {

  var _ = {
    cache: {},
    timeRe: /^PT(\d+H)?(\d+M)?(\d+S)?$/i
  };

  var util = {
    escape: function(str) {
      return $('<div>').text(str).html();
    },
    formatDigit: function(str) {
      str = str || 0;
      str = String(parseInt(str, 10));
      return (str.length == 1) ? '0' + str : str;
    },
    formatTime: function(str) {
      var t = _.timeRe.exec(str);
      var formatted = [];
      for (var i = 1; i != 4; i++) formatted.push(util.formatDigit(t[i]));
      return formatted.join(':');
    },
    resultTemplate: function(item) {
      return '<div class="search-result" data-id="' + util.escape(item.id) + '">' +
               '<div class="actions"><div class="addto">+</div></div>' +
               '<div class="title">' + util.escape(item.snippet.title) + '</div>' + 
               '<div class="thumbnail">' +
                 '<img src="' + item.snippet.thumbnails.default.url + '"/>' +
                 '<div class="length">' + util.escape(util.formatTime(item.contentDetails.duration)) + '</div>' + 
               '</div>' +
             '</div>';
    },
    navTemplate: function(prev, next, current) {
      var prev = (prev != undefined) ?
        '<div class="search-button prev" data-token="' + util.escape(prev) + '">prev</div>' : '';
      var next = (next !== undefined) ?
        '<div class="search-button next" data-token="' + util.escape(next) + '">next</div>' : '';
      return '<div class="search-nav" data-token="' + current + '">' + prev + next + '</div>';
    }
  };

  var cache = {
    hit: function(query, token) {
      return query && _.cache[query] && _.cache[query][token];
    },
    get: function(query, token) {
      return _.cache[query][token];     
    },
    set: function(query, token, results) {
      if (!_.cache[query]) _.cache[query] = {};
      _.cache[query][token] = results;
      return results;
    }
  };

  var api = {
    search: function(query, token, cb) {
      // Cache hit, return results.
      if (cache.hit(query, token)) {
        cb(cache.get(query, token));
        return;
      }

      // Make a search request.
      if (query && query.length && gapi.client.youtube) {
        var request = gapi.client.youtube.search.list({
          maxResults: 5,
          pageToken: token,
          part: 'snippet',
          q: query,
          type: 'video'
        });

        request.execute(function(r) {
          if (r.items && r.items.length) {
            var ids = [];
            var prev = $('.search-nav').length ? $('.search-nav').attr('data-token') : undefined;
            var next = r.nextPageToken;
            for (var i in r.items) ids.push(r.items[i].id.videoId);

            // Get video details.
            request = gapi.client.youtube.videos.list({
              part: 'contentDetails, snippet',
              id: ids.join(', ')
            });

            request.execute(function(resp) {
              var results = [];
              for (var i in resp.items) results.push(util.resultTemplate(resp.items[i]));
              results.push(util.navTemplate(prev, next, token));
              cb(cache.set(query, token, results));
            });
          } else {
            cb(cache.set(query, token, []));
          }
         // api.details(response, query, token, cb);
        });
      } else {
        cb([]);
      }
    }
  };

  return {
    search: api.search,
  };
};

googleApiClientReady = function() {
  gapi.client.setApiKey(bchanx.googleApiKey);
  gapi.client.load('youtube', 'v3');
};

var GETPX = function(str) {
  return parseInt(str.slice(0, str.length - 2), 10);
};

var LINECLAMP = function(element, lines) {
  var lineHeight = GETPX($(element).css('line-height'));
  var limit = lineHeight * lines;
  var color = $(element).css('color');
  var orig = $(element).text();
  var text = orig.split(' ');
  if (GETPX($(element).css('height')) > limit) {
    $(element).attr('title', orig);
    text.push('...');
    $(element).css('color', 'transparent');
    while (GETPX($(element).css('height')) > limit) {
      if (text.length <= 2) break;
      text = text.splice(0, text.length - 2);
      text.push('...');
      $(element).text(text.join(' '));
    }
  }
  if (text.length <= 2) {
    $(element).attr('title', orig);
    $(element).text(text.join(' '))
      .css({'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'});
  }
  $(element).css({ 'height': limit, 'color': color });
};

$(function() {
  var jukebox = new Jukebox().init();
  var search = new Search();

  var searchTimer;
  var searchFn = function(query, token) {
    search.search(query, token, function(results) {
      $('.search-results').children().remove();
      if (results.length) {
        for (var r in results) $('.search-results').append($(results[r]));
        $.each($('.search-result .title'), function() { LINECLAMP($(this), 3); });
      }
    });
  };

  $('#search-box').bind('paste keyup', function() {
    var searchTerm = $(this).val();
    clearInterval(searchTimer);
    searchTimer = setTimeout(function() { searchFn(searchTerm, ''); }, 300);
  });

  $(document).on('click', '.search-button', function() {
    var query = $('#search-box').val();
    var token = $(this).attr('data-token');
    if (query) searchFn(query, token);
  });

  $('#search-icon').bind('click', function() {
    var searchActive = $('#jukebox-container').hasClass('search-active');
    if (searchActive) {
      $('#jukebox-container').removeClass('search-active');
    } else {
      $('#jukebox-container').addClass('search-active');
    }
  });

  $(document).on('click', '.search-result', function() {
    var videoId = $(this).attr('data-id');
    console.log(videoId);
  });

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
          }
        });
      });
    }
  }
});

