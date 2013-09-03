/*!
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

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

