/*!
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

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
    if (Number(+new Date - start.time) < 250) {
      e.preventDefault();
    } else {
      $('#touch').css('border-color', 'black');
      return;
    }
  };

  var endListener = function(e) {
    console.log("-->> END LISTENER!");
    $('#touch').text('touchend');
    var duration = Number(+new Date - start.time);
    $('#duration').text(duration);
    var dx = Math.abs(delta.x);
    var dy = Math.abs(delta.y);
    var validH = duration < 250 && dx > 20 || dx > width/2;
    var validV = duration < 250 && dy > 20 || dy > height/2;
    var dirH = delta.x < 0 ? 'right': 'left';
    var dirV = delta.y < 0 ? 'down' : 'up';
    $('#valid').text(validH || validV);
    var dir = (validH && validV ? (dx > dy ? dirH : dirV) : (validH ? dirH : (validV ? dirV : null))); 
    if (dir) $('#dir').text(dir);
    $('#touch').css('border-color', 'black');
  };

  touch.addEventListener('touchstart', function(e) {
    console.log("-->> START LISTENER!");
    $('#dir').text('');
    $('#valid').text('');
    $('#touch').css('border-color', 'green').text('touchstart');
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

});
