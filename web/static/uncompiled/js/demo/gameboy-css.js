/*!
 * Copyright (c) 2014 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

$(function() {
  console.log('hi');

  $('#button').bind('click', function() {
    $('#gameboy').hide(50, function() {
      setTimeout(function() {
        $('#gameboy').show();
      }, 100);
    });
  });
});
