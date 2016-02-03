/*!
 * Copyright (c) 2015 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

(function(root, factory) {

  root['playlist'] = factory();

}(this, function() {

  var TYPE = {
    'UNKNOWN': -1,
    'YOUTUBE': 0
  };

  var resources = {
    getUrl: function(mediaId, mediaType) {
      if (mediaId) {
        switch (mediaType) {
          case TYPE.YOUTUBE:
            return 'https://www.youtube.com/embed/' + mediaId + '?rel=0&enablejsapi=1&iv_load_policy=3&showinfo=0&theme=light';
            break;
          default:
            return null;
        }
      }
      return null;
    },
    id: function(_) {
      return _.current ? _.current['id'] : '';
    },
    mediaId: function(_) {
      return _.current ? _.current['meta']['mediaId'] : '';
    },
    type: function(_) {
      return _.current ? _.current['meta']['mediaType'] : '';
    },
    url: function(_) {
      return _.current && resources.getUrl(resources.mediaId(_), resources.type(_)) || '';
    },
    title: function(_) {
      return _.current && _.current['meta']['title'] || 'UNKNOWN';
    },
    duration: function(_) {
      return _.current && _.current['meta']['duration'] || '0';
    }
  };

  var actions = {
    toggleShuffle: function(_) {
      _.isShuffled = !_.isShuffled;
    },
    toggleRepeat: function(_) {
      _.isRepeat = !_.isRepeat;
    },
    prev: function(_) {
      var cur = _.currentList();
      if (cur.indexOf(_.current) >= 0) {
        var index = (cur.indexOf(_.current) + cur.length - 1) % cur.length;
        _.current = cur[index];
      }
      return resources.mediaId(_);
    },
    next: function(_) {
      var cur = _.currentList();
      if (cur.indexOf(_.current) >= 0) {
        var index = (cur.indexOf(_.current) + 1) % cur.length;
        _.current = cur[index];
      }
      return resources.mediaId(_);
    },
    isEmpty: function(_) {
      return !_.current;
    },
    setCurrent: function(_, id) {
      if (id in _.idToVideo) {
        _.current = _.idToVideo[id];
        return true;
      }
      return false;
    }
  };

  var Playlist = function(data) {

    var _ = {
      videos: data || [],
      idToVideo: (function(videos) {
        for (var i = 0, map = {}; i < videos.length; i++) map[videos[i]['id']] = videos[i];
        return map;
      })(data || []),
      shuffledVideos: (function(videos) {
        var order = videos.slice(0);
        for (var i = order.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = order[i];
          order[i] = order[j];
          order[j] = tmp;
        }
        return order;
      })(data),
      isShuffled: true,
      isRepeat: false,
      currentList: function() { return (_.isShuffled) ? _.shuffledVideos : _.videos; },
      current: null
    };
    _.current = _.currentList()[0];

    return {
      'videos': function() {
        return _.videos;
      },
      'shuffledVideos': function() {
        return _.shuffledVideos;
      },
      'prev': function() {
        return actions.prev(_);
      },
      'next': function() {
        return actions.next(_);
      },
      'toggleShuffle': function() {
        actions.toggleShuffle(_);
        return this;
      },
      'toggleRepeat': function() {
        actions.toggleRepeat(_);
        return this;
      },
      'setCurrent': function(id) {
        return actions.setCurrent(_, id);
      },
      'isEmpty': function() {
        return actions.isEmpty(_);
      },
      'isShuffled': function() {
        return _.isShuffled;
      },
      'isRepeat': function() {
        return _.isRepeat;
      },
      'getMediaId': function() {
        return resources.mediaId(_);
      },
      'getUrl': function() {
        return resources.url(_);
      },
      'getId': function() {
        return resources.id(_);
      },
      'getTitle': function() {
        return resources.title(_);
      },
      'getDuration': function() {
        return resources.duration(_);
      }
    }
  };

  return {
    'type': TYPE,
    'getUrl': resources.getUrl,
    'create': function(data) {
      return new Playlist(data); 
    }
  }
}));

