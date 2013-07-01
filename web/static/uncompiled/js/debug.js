//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

var bchanx = bchanx || {};

bchanx.require = function(url) {
  $.ajax({
    url: 'static/uncompiled/js/' + url,
    dataType: 'script',
    async: false,
    success: function() {
      // Script loaded
      console.log("[" + url + "] SUCCESS!");
    },
    error: function() {
      // Script failed
      console.log("[" + url + "] FAILED!");
    }
  });
};

