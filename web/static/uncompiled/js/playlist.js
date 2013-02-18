//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

var Playlist = function(player, videos, shuffled) {
  var self = this;
  self.TYPE = {
    'UNKNOWN': -1,
    'YOUTUBE': 0
  };
  self.player = '#' + player;
  self.videos = videos || [];
  self.idToVideo = {};
  for (var i = 0; i < self.videos.length; i++) {
    self.idToVideo[self.videos[i]['id']] = self.videos[i];
  }
  self.getShuffleOrder = function() {
    var order = self.videos.slice(0);
    for (var i = order.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = order[i];
      order[i] = order[j];
      order[j] = tmp;
    }
    return order;
  };
  self.shuffledVideos = self.getShuffleOrder();
  self.isShuffled = !!shuffled;
  self.currentList = function() {
    return (self.isShuffled) ? self.shuffledVideos : self.videos;
  };
  self.current = self.currentList()[0];
  self.getResource = function(id, type) {
    if (id) {
      if (type == self.TYPE.YOUTUBE) {
        return 'https://www.youtube.com/embed/' + id + '?rel=0&enablejsapi=1&iv_load_policy=3&showinfo=0&theme=light';
      }
    }
    return '';
  };
  self.getUrl = function() {
    return (self.current) ? self.getResource(self.current['meta']['mediaId'], self.current['meta']['mediaType']) : '';
  };
  self.getId = function() {
    return (self.current) ? self.current['id'] : '';
  };
  self.getMediaId = function() {
    return (self.current) ? self.current['meta']['mediaId'] : '';
  };
  self.toggleShuffle = function() {
    self.isShuffled = !self.isShuffled;
  };
  self.next = function() {
    var cur = self.currentList();
    if (cur.indexOf(self.current) >= 0) {
      var index = cur.indexOf(self.current);
      self.current = cur[(index + 1) % cur.length];
    }
    return self.getMediaId();
  };
  self.isEmpty = function() {
    return !self.current;
  };
  self.setCurrent = function(id) {
    if (id in self.idToVideo) {
      self.current = self.idToVideo[id];
      return true;
    }
    return false;
  };
};

