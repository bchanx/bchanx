//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

var Playlist = function(player, videos, shuffled) {
  var self = this;
  self.player = '#' + player;
  self.videos = videos || [];
  self.getVideoOrder = function() {
    var order = [];
    if (self.videos.length) {
      for (var i = 0; i < self.videos.length; i++) {
        order.push(self.videos[i]['mediaId']);
      }
    }
    return order;
  };
  self.getShuffleOrder = function() {
    var order = self.currentVideoOrder.slice(0);
    for (var i = order.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = order[i];
      order[i] = order[j];
      order[j] = tmp;
    }
    return order;
  };
  self.currentVideoOrder = self.getVideoOrder();
  self.currentShuffleOrder = self.getShuffleOrder();
  self.isShuffled = !!shuffled;
  self.current = (self.isShuffled) ? self.currentShuffleOrder[0] : self.currentVideoOrder[0];
  self.valid = function(vid) {
    return (vid && self.currentVideoOrder.indexOf(vid) > -1);
  };
  self.getUrl = function(vid) {
    if (self.valid(vid)) {
      return 'https://www.youtube.com/embed/' + vid + '?rel=0&enablejsapi=1';
    }
  };
  self.getTag = function(vid) {
    if (self.valid(vid)) {
      return self.videos[self.currentVideoOrder.indexOf(vid)].tag;
    }
  };
  self.toggleShuffle = function() {
    self.isShuffled = !self.isShuffled;
  };
  self.next = function() {
    var current = (self.isShuffled) ? self.currentShuffleOrder : self.currentVideoOrder;
    var index = current.indexOf(self.current);
    self.current = current[(index + 1) % current.length];
    return self.current;
  };
  self.load = function(vid) {
    vid = vid || self.current;
    if (!self.isEmpty()) {
      $(self.player).attr('src', self.getUrl(vid));
    }
  };
  self.isEmpty = function() {
    return !self.current;
  };
};

