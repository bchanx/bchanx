/*!
 * Copyright (c) 2015 Brian Chan (bchanx.com)
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

// Callback for Google client API.
function googleApiClientReady() {
  gapi.client.setApiKey(bchanx.googleApiKey);
  gapi.client.load('youtube', 'v3');
}

// Main jukebox object.
var Jukebox = function() {

  var _ = {
    slidr: null,
    playlist: null,
    playlistData: {}
  };

  var util = {
    // TOOD: fix me up.
    // Format a timestamp into (HH:MM:SS).
    formatTime:function(t) {
      return (t.indexOf(':') > 0) ? t : Math.floor(t / 60) + ':' + ("0" + t % 60).slice(-2);
    },
    // Returns a jquery escaped id.
    jq: function(id) {
      return '#' + id.replace(/(:|\.|\[|\])/g, '\\$1');
    }
  };

  var template = {
    // Create a tracklist.
    createTracklist: function(data, className) {
      var tracklist = $('<tbody class="' + className + '" style="display: none"></tbody>');
      for (var d = 0; d < data.length; d++) {
        var item = data[d];
        var track = item['meta']['title'];
        var length = util.formatTime(item['meta']['duration']);
        tracklist.append('<tr mediaid="' + item['id'] + '" class="mediaItem">' + 
          '<td class="track" title="' + track + '">' + track + '</td><td class="length">' + length + '</td></tr>');
      }
      return tracklist;
    }
  };

  var bindings = {
    static: function() {
      $('#pause').bind('click', function() {
        if (_.playlist && !_.playlist.isEmpty() && bchanx.player.hasOwnProperty('pauseVideo')) {
          bchanx.player.pauseVideo();
        }
      });
      $('#play').bind('click', function() {
        if (_.playlist && !_.playlist.isEmpty() && bchanx.player.hasOwnProperty('playVideo')) {
          bchanx.player.playVideo();
        }
      });
      $('#prev').bind('click', function() {
        if (_.playlist && !_.playlist.isEmpty() && bchanx.player.hasOwnProperty('loadVideoById')) {
          bchanx.player.loadVideoById(_.playlist.prev());
          actions.updateNowPlaying();
        }
      });
      $('#next').bind('click', function(event, mediaHasEnded) {
        if (_.playlist && !_.playlist.isEmpty()) {
          if (mediaHasEnded && _.playlist.isRepeat()) {
            bchanx.player.seekTo(0);
          } else if (bchanx.player.hasOwnProperty('loadVideoById')) {
            bchanx.player.loadVideoById(_.playlist.next());
            actions.updateNowPlaying();
          }
        }
      });
      $('#repeat').bind('click', function() {
        if (_.playlist && !_.playlist.isEmpty()) {
          _.playlist.toggleRepeat();
          var r = _.playlist.isRepeat();
          $('#repeat').removeClass((r) ? 'off' : 'on').addClass((r) ? 'on' : 'off');
        }
      });
      $('#shuffle').bind('click', function() {
        if (_.playlist && !_.playlist.isEmpty()) actions.toggleShuffle();
      });
      $('#playlist').bind('click', function() {
        if (_.playlist && !_.playlist.isEmpty()) actions.toggleTracklist();
      });
    },
    dynamic: function() {
      $(document).on('click', '.mediaItem', function() {
        if (_.playlist && !_.playlist.isEmpty()) {
          if (_.playlist.setCurrent($(this).attr('mediaid'))) {
            bchanx.player.loadVideoById(_.playlist.getMediaId());
            actions.updateNowPlaying();
          }
        }
      });
      $(document).on('click', 'li[pid]', function() {
        actions.loadPlaylist($(this).attr('pid'));
      });
      $(document).keydown(function(e) {
        if ($(e.target).attr('id') !== 'search-box') {
          if (e.which === 78) { $('#next').click(); } // n
          else if (e.which === 80) { $('#prev').click(); } // p
          else if (e.which === 83) { $('#shuffle').click(); } // s
        }
      });
    }
  };

  var callbacks = {
    // Callback for retrieving playlists.
    onPlaylistGetAll: function(data) {
      if (data.length) {
        data = data.sort(function(a, b) {return a.pid - b.pid;});
        var playlists = $('<ul></ul>');
        for (var i = 0; i < data.length; i++) {
          playlists.append('<li pid="' + data[i].pid + '">' + data[i].title + '</li>');
        }
        $('#playlists').append(playlists);
      }

      // Go go gadget slidr.
      _.slidr = slidr.create('jukebox', {
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
    },
    // Callback after selecting a playlist.
    onLoadPlaylist: function(pid, videos) {
      _.playlist = playlist.create(videos);
      if (_.playlist.isEmpty()) {
        actions.toggleVideoDisplay(true);
      } else {
        actions.toggleVideoDisplay();
        $('tbody').remove();
        var normalTracklist = template.createTracklist(_.playlist.videos(), 'normal-tracklist');
        var shuffledTracklist = template.createTracklist(_.playlist.shuffledVideos(), 'shuffled-tracklist');
        $('#video-table').append(normalTracklist, shuffledTracklist);
        actions.loadVideo();
        actions.toggleTracklist(true);
        actions.toggleShuffle(true);
        $('#video-settings').fadeIn();
      }
      actions.updateNowPlaying(pid);
    }
  };

  var actions = {
    loadVideo: function(mediaId, mediaType) {
      if (!$('#video-src').attr('src') || !bchanx.player.hasOwnProperty('playVideo')) {
        var src = playlist.getUrl(mediaId, mediaType) || _.playlist.getUrl();
        console.log("-->> SRC: " + src);
        $('#video-src').attr('src', src).css('visibility', 'visible');
      } else {
        bchanx.player.loadVideoById(mediaId || _.playlist.getMediaId());
      }
    },
    // Loads a playlist.
    loadPlaylist: function(pid) {
      _.slidr.slide('video');
      setTimeout(function() {
        if (_.playlistData[pid]) {
          return callbacks.onLoadPlaylist(pid, _.playlistData[pid]);
        }
        $.ajax({
          'url': '/jukebox/playlistLoad',
          'type': 'POST',
          'data': {'pid': pid},
          'dataType': 'json',
          'success': function(result) {
            _.playlistData[result.pid] = result.data;
            callbacks.onLoadPlaylist(result.pid, result.data);
          }
        });
      }, 600);
    },
    // Toggles video display.
    toggleVideoDisplay: function(hide) {
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
    },
    // Update now playing status.
    updateNowPlaying: function(pid, title, length) {
      if (_.playlist && !_.playlist.isEmpty()) {
        $('.playing').removeClass('playing');
        $('tr[mediaid="' + _.playlist.getId() + '"]').addClass('playing');
        var title = title || _.playlist.getTitle();
        var length = length || _.playlist.getDuration();
        $('#video-title').attr('title', title).text(title);
        $('#video-length').text(util.formatTime(length));
      }
      if (pid) {
        $('.playlist-playing').removeClass('playlist-playing');
        $('li[pid="' + pid + '"]').addClass('playlist-playing');
      }
    },
    // Toggle tracklist between normal/shuffle.
    toggleShuffle: function(opt_reset) {
      if (_.playlist) {
        if (!opt_reset) {
          _.playlist.toggleShuffle();
        }
        var s = _.playlist.isShuffled();
        $('#shuffle').removeClass((s) ? 'off' : 'on').addClass((s) ? 'on' : 'off');
        var oldPlaylist = 'tbody.' + ((s) ? 'normal' : 'shuffled') + '-tracklist';
        var switchingPlaylist = 'tbody.' + ((s) ? 'shuffled' : 'normal') + '-tracklist';
        $(oldPlaylist).css('opacity', 0).hide();
        $(switchingPlaylist).show().animate({'opacity': 1}, 400);
      }
    },
    // Toggles display/hiding the tracklist.
    toggleTracklist: function(opt_reset) {
      if (opt_reset || $('#playlist').hasClass('hide')) {
        $('#playlist').removeClass('hide').addClass('show');
        $('#video-playlist').hide();
        $('#video-playing-info').fadeIn();
      } else {
        $('#playlist').removeClass('show').addClass('hide');
        $('#video-playing-info').hide();
        $('#video-playlist').fadeIn();
      }
    }
  };

  // Initialize bindings and go!
  bindings.static();
  bindings.dynamic();
  $.ajax({
    'url': '/jukebox/playlistGetAll',
    'type': 'GET',
    'dataType': 'json',
    'success': callbacks.onPlaylistGetAll
  });

  return {
    play: function(videoId, title, length) {
      actions.toggleVideoDisplay();
      actions.loadVideo(videoId, playlist.type.YOUTUBE);
      _.slidr.slide('video');
      actions.updateNowPlaying(null, title, length);
    }
  }
};


var Search = function(j) {

  var _ = {
    jukebox: j,
    cache: {},
    timeRe: /^PT(\d+H)?(\d+M)?(\d+S)?$/i,
    searchTimer: null,
    inProgress: false
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
    getPx: function(str) {
      return parseInt(str.slice(0, str.length - 2), 10);
    },
    lineclamp: function(element, lines) {
      var lineHeight = util.getPx($(element).css('line-height'));
      var limit = lineHeight * lines;
      var color = $(element).css('color');
      var orig = $(element).text();
      var text = orig.split(' ');
      if (util.getPx($(element).css('height')) > limit) {
        $(element).attr('title', orig);
        text.push('...');
        $(element).css('color', 'transparent');
        while (util.getPx($(element).css('height')) > limit) {
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
    }
  };

  var template = {
    result: function(item) {
      return '<div class="search-result" data-id="' + util.escape(item.id) + '">' +
               '<div class="actions"><div class="addto">+</div></div>' +
               '<div class="title">' + util.escape(item.snippet.title) + '</div>' + 
               '<div class="thumbnail">' +
                 '<img src="' + item.snippet.thumbnails.default.url + '"/>' +
                 '<div class="length">' + util.escape(util.formatTime(item.contentDetails.duration)) + '</div>' + 
               '</div>' +
             '</div>';
    },
    nav: function(prev, next, current) {
      var prev = (prev != undefined) ?
        '<div class="search-nav-button prev" data-token="' + util.escape(prev) + '">prev</div>' : '';
      var next = (next !== undefined) ?
        '<div class="search-nav-button next" data-token="' + util.escape(next) + '">next</div>' : '';
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

  var bindings = {
    static: function() {
      $('#search-box').bind('paste keyup', function() {
        var searchTerm = $(this).val();
        clearInterval(_.searchTimer);
        _.searchTimer = setTimeout(function() { actions.search(searchTerm, ''); }, 300);
      });
      $('#search-icon').bind('click', function() {
        var searchActive = $('#jukebox-container').hasClass('search-active');
        if (searchActive) {
          $('#jukebox-container').removeClass('search-active');
        } else {
          $('#jukebox-container').addClass('search-active');
          $('#search-box').focus();
        }
      });
    },
    dynamic: function() {
      $(document).on('click', '.search-nav-button', function() {
        var query = $('#search-box').val();
        var token = $(this).attr('data-token');
        if (query) actions.search(query, token);
      });
      $(document).on('click', '.search-result', function() {
        var videoId = $(this).attr('data-id');
        var title = $(this).children('.title').text();
        var length = $(this).children('.thumbnail').children('.length').text();
        _.jukebox.play(videoId, title, length);
      });
      // TODO: make this work in prod.
      if (bchanx.type === 'devel') {
        $(document).on('click', '.actions .addto', function(e) {
          e.stopPropagation();
          var videoId = $(this).parents('.search-result').attr('data-id');
          var pid = $('li[pid].playlist-playing').attr('pid') || 2; // Relax
          var jukeboxKey = $('#jukebox-key').text();
          $.ajax({
            'url': '/jukebox/playlistAddMedia?pid=' + pid + '&media-url=' + encodeURIComponent('http://www.youtube.com/watch?v=' + videoId) + '&key=' + jukeboxKey,
            'type': 'GET',
            'success': function(data) {
              // Added to playlist!
              console.log(data);
            }
          });
        });
      }
    }
  };

  var actions = {
    search: function(query, token) {
      if (!_.inProgress) {
        _.inProgress = true;
        $('.search-results').addClass('disabled');
        actions.request(query, token, function(results) {
          $('.search-results').children().remove();
          if (results.length) {
            for (var r in results) $('.search-results').append($(results[r]));
            $.each($('.search-result .title'), function() { util.lineclamp($(this), 3); });
          }
          _.inProgress = false;
          $('.search-results').removeClass('disabled');
        });
      }
    },
    request: function(query, token, cb) {
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
              for (var i in resp.items) results.push(template.result(resp.items[i]));
              results.push(template.nav(prev, next, token));
              cb(cache.set(query, token, results));
            });
          } else {
            cb(cache.set(query, token, []));
          }
        });
      } else {
        cb([]);
      }
    }
  };

  bindings.static();
  bindings.dynamic();
};

$(function() {
  var j = new Jukebox();
  new Search(j);

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

