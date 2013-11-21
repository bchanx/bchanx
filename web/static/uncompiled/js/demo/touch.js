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
  touch.addEventListener('touchstart', function(e) {
    $('#dir').text('');
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
    delta = {};

    touch.addEventListener('touchmove', function(e) {
      $('#touch').text('touchmove');
      if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
      var touches = e.touches[0];
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      };
      $('#deltax').text(delta.x);
      $('#deltay').text(delta.y);

      e.preventDefault();
    });

    touch.addEventListener('touchend', function(e) {
      $('#touch').text('touchend');
      var duration = +new Date - start.time;
      $('#duration').text(duration);
      var validH = Number(duration) < 250 && Math.abs(delta.x) > 20 || Math.abs(delta.x) > width/2;
      var validV = Number(duration) < 250 && Math.abs(delta.y) > 20 || Math.abs(delta.y) > height/2;
      $('#valid').text(validH || validV);
      if (validH || validV) {
        if (validH) {
          $('#dir').text((delta.x < 0) ? '#right' : '#left');
        } else {
          $('#dir').text((delta.y < 0) ? '#down' : '#up');
        }
      }
      $('#touch').unbind('touchmove');
      $('#touch').unbind('touchend');
      $('#touch').css('border-color', 'black');
    });

  });

});
