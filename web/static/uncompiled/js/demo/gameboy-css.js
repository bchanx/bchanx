/*!
 * Copyright (c) 2014 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

$(function() {

  var colors = ['red', 'purple', 'green', 'yellow', 'teal', 'transparent'];

  $('.color-selection').bind('click', function(element) {
    $('.color-selection').removeClass('active');
    var color = $(element.target).addClass('active').data('color');
    $('#gameboy').css('opacity', 0).removeClass(colors.join(' ')).addClass(color);
    var clone = $('#gameboy').clone(true);
    clone.css('opacity', '');
    $('#gameboy').remove();
    $('#colors').before(clone);
    $('#gameboy').fadeIn(100);
  });

  $('.color-selection[data-color="green"]').click();
});
