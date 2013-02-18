//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

var Playlist = function(player, videos, shuffled) {
  var self = this;
  self.id = 'mediaId';
  self.player = '#' + player;
  self.videos = videos || [];
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
  self.current = (self.isShuffled) ? self.shuffledVideos[0] : self.videos[0];
  self.getUrl = function(vid) {
    vid = vid || self.current && self.id in self.current && self.current[self.id];
    return (vid) ? 'https://www.youtube.com/embed/' + vid + '?rel=0&enablejsapi=1&iv_load_policy=3&showinfo=0&theme=light' : '';
  };
  self.toggleShuffle = function() {
    self.isShuffled = !self.isShuffled;
  };
  self.next = function() {
    var current = (self.isShuffled) ? self.shuffledVideos : self.videos;
    var index = current.indexOf(self.current);
    self.current = current[(index + 1) % current.length];
    return self.current['mediaId'];
  };
  self.isEmpty = function() {
    return !self.current;
  };
};

