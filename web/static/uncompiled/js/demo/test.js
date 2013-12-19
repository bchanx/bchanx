/*!
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

if (bchanx.type === 'devel') bchanx.require('slidr.js');


$(function() {
  var s = slidr.create('slidr', {'theme': '#222', 'before': function() { console.log('before'); }, 'after': function() { console.log('after'); }}).add('h', ['1', '2', '3', '1']).add('v', ['1', '2', '3', '1']).start();
  $('#breadcrumbs').bind('click', function() {
    s.breadcrumbs();
  });
  var controls = ['border', 'corner', 'none'];
  var current = 'border';
  $('#controls').bind('click', function() {
    current = controls[(controls.indexOf(current) + 1) % controls.length];
    s.controls(current);
  });
});