/*!
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

if (bchanx.type === 'devel') bchanx.require('slidr.js');

$(function() {

  var h1 = ['one', 'two', 'three', 'four', 'one'];
  var v1 = ['three', 'six', 'five', 'three'];
  var h2 = ['six', 'seven', 'eight'];

  var updateEffect = function(s, effect) {
    $('.effect.button').removeClass('active');
    $('.effect.button.' + effect).addClass('active');
    $('.demo-slide').text(effect);
  };

  var addEffect = function(s, effect) {
    effect = effect || 'random';
    if (effect === 'random') {
      s.add('h', ['one', 'two'], 'linear', true).add('h', ['two', 'three'], 'cube', true)
       .add('h', ['three', 'four'], 'fade', true).add('h', ['four', 'one'], 'none', true)
       .add('v', ['five', 'three'], 'linear', true).add('v', ['six', 'five'], 'cube', true)
       .add('v', ['three', 'six'], 'cube', true).add('h', ['six', 'seven'], 'linear', true)
       .add('h', ['seven', 'eight'], 'cube', true).start();
    } else {
      s.add('h', h1, effect, true).add('v', v1, effect, true).add('h', h2, effect, true).start();
    }
    updateEffect(s, effect);
  };

  var s1 = slidr.create('slidr1', {'breadcrumbs': true, 'controls': 'border'});
  addEffect(s1, 'random');
  window.s1 = s1;

  $('.effect.button').each(function() {
    $(this).bind('click', function() {
      addEffect(s1, $(this).text());     
    });
  });

  var controls = ['', 'corner', 'border'];
  $('.settings.button').each(function() {
    $(this).bind('click', function() {
      var type = $(this).text();
      var meta = $(this).attr('data-meta');
      if (type === 'controls') {
        var newIndex = (controls.indexOf(meta) + 1) % controls.length;
        var style = controls[newIndex];
        $(this).attr('data-meta', style);
        s1.controls(style);
        (style === '') ? $(this).addClass('off') : $(this).removeClass('off');
      } else if (type === 'breadcrumbs') {
        var next = (meta === 'off') ? 'on' : 'off';
        (next === 'on') ? $(this).removeClass('off') : $(this).addClass('off');
        $(this).attr('data-meta', next);
        s1.breadcrumbs()
      } else {
        if (meta === 'on') {
          $(this).addClass('off');
          $(this).attr('data-meta', 'off');
          s1.stop();
        } else {
          $(this).removeClass('off');
          $(this).attr('data-meta', 'on');
          s1.auto(null, 2000);
        }
      }
    });
  });
});
