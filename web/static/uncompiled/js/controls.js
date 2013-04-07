//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

bchanx.Controls = function() {

  //var controllers = ['#playlists-container', '#video-container', '#about-container'];

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

  self.enable = function() {
    self.active = false;
  };

  self.disable = function() {
    self.active = true;
  };

  var clickAndRotate = function(key) {
    var current = key != 'none' && controllers[key];
    if (!self.active && current) {
      self.active = true;
      $('#controls-container').hide();
      var p = current['prev'];
      var n = current['next'];
      $('#controls-prev').attr('meta', p).html(controllers[p]['name']);
      $('#controls-next').attr('meta', n).html(controllers[n]['name']);
      for (var c in controllers) {
        if (controllers[c]['id'] != current['id']) {
          $(controllers[c]['id']).fadeOut(800);
        }
      }
      $('#cube-frontback').css(transform("rotateY(" + current['frontback'] + "deg)"));
      $('#cube-sides').css(transform("rotateY(" + current['sides'] + "deg)"));
      $(current['id']).fadeIn(800);
      $('#controls-container').fadeIn(800);
      self.active = false;
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
};

