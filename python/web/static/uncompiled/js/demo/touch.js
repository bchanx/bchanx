/*!
 * Copyright (c) 2015 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

if (bchanx.type === 'devel') bchanx.require('slidr.js');


$(function() {
 
  var start = {};
  var delta = {};
  var width = $('#touch').width();
  var height = $('#touch').height();
  var touch = document.getElementById('touch');

  console.log("-->> OK");

  var moveListener = function(e) {
    $('#touch').text('touchmove');
    if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
    var touches = e.touches[0];
    delta.x = touches.pageX - start.x;
    delta.y = touches.pageY - start.y;
    $('#deltax').text(delta.x);
    $('#deltay').text(delta.y);
    var duration = Number(+new Date - start.time);
    var total = Math.abs(delta.x) + Math.abs(delta.y);
    if (duration > 100) {
      console.log("-->> DURATION: " + duration + ", total: " + total);
      console.log("-->> RATE: " + total/duration);
      if (total/duration < 0.25) {
        console.log("-->> prob not swiping, abort!");
        $('#scrolling').text('YES');
        return;
      }
    }
    $('#scrolling').text('NO');
    e.preventDefault();
  };

  var endListener = function(e) {
    console.log("-->> END LISTENER!");
    $('#touch').text('touchend');
    var duration = Number(+new Date - start.time);
    $('#duration').text(duration);
    if (duration < 250) {
      var dx = Math.abs(delta.x);
      var dy = Math.abs(delta.y);
      var validH = dx > 20;
      var validV = dy > 20;
      var dirH = delta.x < 0 ? 'right': 'left';
      var dirV = delta.y < 0 ? 'down' : 'up';
      $('#valid').text(validH || validV);
      var dir = (validH && validV ? (dx > dy ? dirH : dirV) : (validH ? dirH : (validV ? dirV : null))); 
      if (dir) $('#dir').text(dir);
    }
    $('#touch').css('border-color', 'black');
  };

  touch.addEventListener('touchstart', function(e) {
    console.log("-->> START LISTENER!");
    $('#dir').text('');
    $('#valid').text('');
    $('#scrolling').text('');
    $('#touch').css('border-color', 'green').text('touchstart');
    isScrolling = false;
    var touches = e.touches[0];
    start = {
      x: touches.pageX,
      y: touches.pageY,
      time: +new Date
    };
    $('#x').text(start.x);
    $('#y').text(start.y);
    $('#time').text(start.time);
    delta.x = 0;
    delta.y = 0;
    touch.addEventListener('touchmove', moveListener);
    touch.addEventListener('touchend', endListener);
  });

  slidr.create('slidr-demo', {'keyboard': true, 'touch': true}).add('h', ['1', '2', '3', '1']).start();
});
