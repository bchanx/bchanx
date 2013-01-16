$(function() {
  $('.tab').bind('click', function() {
    $('#all').hide();
    var pos = $(this).attr('pos');
    if (pos == 'ALL') {
      $('.player').show();
    } else {
      $('.player').hide();
      $('.player').each(function() {
        if ($(this).attr('pos') == pos) {
          $(this).show();
        }
      });
    }
    $('#all').fadeIn();
  });

  $('.player').bind('click', function() {
    console.log(this);
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
  });
});
