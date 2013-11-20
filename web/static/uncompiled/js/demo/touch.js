/*!
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

$(function() {
 
  var start = {};
  var delta = {};
  var isScrolling = undefined;
  var width = $('#touch').width();

  $('#touch').bind('touchstart', function(e) {
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

    isScrolling = undefined;

    $('#touch').bind('touchmove', function(e) {
      if (e.touches.length > 1 || e.scale && e.scale !== 1) return;
      var touches = e.touches[0];
      delta = {
        x: touches.pageX - start.x,
        y: touches.pageY - start.y
      };
      $('#deltax').text(delta.x);
      $('#deltay').text(delta.y);

      if (typeof isScrolling == 'undefined') {
        isScrolling = !!( isScrolling || Math.abs(delta.x) < Math.abs(delta.y) );
      }
      $('#scrolling').text(isScrolling);

      if (!isScrolling) {
        e.preventDefault();
      }
    });

    $('#touch').bind('touchend', function(e) {
       var duration = +new Date - start.time;
       var isValidSlide = Number(duration) < 250 && Math.abs(delta.x) > 20 || Math.abs(delta.x) > width/2;
       var right = delta.x < 0;
       if (!isScrolling && isValidSlide) {
         if (right) {
           $('#right').text('YEAH!');
           // SLIDE RIGHT!
         } else {
            // SLIDE LEFT!
           $('#left').text('YEAH!');
         }
       }
       $('#touch').unbind('touchmove');
       $('#touch').unbind('touchend');
    });

  });


});
