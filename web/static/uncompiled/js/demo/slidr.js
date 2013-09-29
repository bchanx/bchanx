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

  var s1 = slidr.create('slidr-demo', {'breadcrumbs': true, 'fade': true, 'overflow': true});
  addEffect(s1, 'random');
  window.s1 = s1;

  $('.effect.button').each(function() {
    $(this).bind('click', function() {
      addEffect(s1, $(this).text());     
    });
  });

  var controls = ['border', 'corner', 'none'];
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
        s1.breadcrumbs();
      } else {
        if (meta === 'on') {
          $(this).addClass('off');
          $(this).attr('data-meta', 'off');
          s1.stop();
        } else {
          $(this).removeClass('off');
          $(this).attr('data-meta', 'on');
          s1.auto(2000);
        }
      }
    });
  });

  var anchors = ['#instructions', '#html', '#javascript'];
  var pages = ['#home', '#docs'];

  var checkHash = function() {
    var hash = window.location.hash;
    if (pages.indexOf(hash) >= 0) return hash.slice(1);
    else if (anchors.indexOf(hash) >= 0) return 'docs';
    return null;
  };

  var master = slidr.create('slidr', {
    'controls': 'none',
    'transition': 'cube',
    'overflow': true,
    'fade': true
  }).start(checkHash());

  $(window).bind('hashchange', function(e) {
    master.slide(checkHash());
  });

  $('.slidr-nav').click(function() {
    var nav = $(this).attr('nav');
    if (nav === 'home') master.slide('left');
    else if (nav === 'docs') master.slide('right');
  });

  $('.markdown').each(function() {
    this.innerHTML = markdown.toHTML(this.innerHTML.trim());
  });

  var demos = [slidr.create('slidr-div', {'theme': '#222'}).start(),
               slidr.create('slidr-img', {'theme': '#222'}).start(),
               slidr.create('slidr-ul', {'theme': '#222'}).start()];
  var demoNames = ['#slidr-div-control', '#slidr-img-control', '#slidr-ul-control'];
  for (var i = 0, demo; demo = demoNames[i]; i++) {
    $(demo + ' .slidr-control.left').bind('click', function(e) {
      e.stopPropagation();
      for (var d = 0, dd; dd = demos[d]; d++) dd.slide('left');
    });
    $(demo + ' .slidr-control.right').bind('click', function(e) {
      e.stopPropagation();
      for (var d = 0, dd; dd = demos[d]; d++) dd.slide('right');
    });
  }

});
