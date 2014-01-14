/*!
 * Copyright (c) 2014 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

bchanx.Controls = function() {

  var controllers = {
    'playlists': {
      'id': '#playlists-container',
      'name': 'Playlists',
      'prev': 'none',
      'next': 'video',
      'frontback': 90,
      'sides': 0
    },
    'video': {
      'id': '#video-container',
      'name': 'Video',
      'prev': 'playlists',
      'next': 'about',
      'frontback': 0,
      'sides': -90
    },
    'about': {
      'id': '#about-container',
      'name': 'About',
      'prev': 'video',
      'next': 'none',
      'frontback': -90,
      'sides': -180
    },
    'none': {
      'name': ''
    }
  };

  var transform = function(rules) {
    return {
      '-webkit-transform': rules,
      '-moz-transform': rules,
      '-o-transform': rules,
      'transform': rules
    }
  };

  var self = this;

  self.active = false;

  self.current = 'playlists';

  self.enable = function() {
    self.active = false;
  };

  self.disable = function() {
    self.active = true;
  };

  var clickAndRotate = function(key) {
    var show = key != 'none' && controllers[key];
    if (!self.active && show) {
      self.active = true;
      $('#controls-container').hide();
      var p = show['prev'];
      var n = show['next'];
      $('#controls-prev').attr('meta', p).html(controllers[p]['name']);
      $('#controls-next').attr('meta', n).html(controllers[n]['name']);
      for (var c in controllers) {
        if (controllers[c]['id'] != show['id']) {
          $(controllers[c]['id']).fadeOut(800);
        }
      }
      self.current = key;
      $('#cube-frontback').css(transform("rotateY(" + show['frontback'] + "deg)"));
      $('#cube-sides').css(transform("rotateY(" + show['sides'] + "deg)"));
      $(show['id']).fadeIn(800, function() {
        $('#controls-container').fadeIn(100);
        self.active = false;
      });
    }
  };

  self.init = function() {
    $('#controls-prev').bind('click', function() {
      clickAndRotate($(this).attr('meta'));
    });
    $('#controls-next').bind('click', function() {
      clickAndRotate($(this).attr('meta'));
    });
  };

  self.select = function(key) {
    clickAndRotate(key);
  };

  self.next = function() {
    if (self.current) {
      self.select(controllers[self.current]['next']);
    } 
  };

  self.prev = function() {
    if (self.current) {
      self.select(controllers[self.current]['prev']);
    } 
  };
};

