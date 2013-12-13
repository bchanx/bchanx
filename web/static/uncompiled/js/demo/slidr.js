/*!
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

if (bchanx.type === 'devel') bchanx.require('slidr.js');

$(function() {

  var indexOf = function(list, val) {
    if (Array.prototype.indexOf) return list.indexOf(val);
    if (list && list.length) for (var i = 0, len = list.length; i < len; i++) if (list[i] == val) return i;
    return -1;
  };

  var h = ['one', 'two', 'three', 'four', 'one'];
  var v = ['six', 'five', 'four', 'six'];

  var updateEffect = function(s, effect) {
    $('#slidr-home-demo-effects > div').removeClass('active');
    $('#slidr-home-demo-effects > div.' + effect).addClass('active');
    $('#slidr-home-demo > div').text(effect);
  };

  var addEffect = function(s, effect) {
    effect = effect || 'linear';
    s.add('h', h, effect, true).add('v', v, effect, true).start();
    updateEffect(s, effect);
  };

  var s1 = slidr.create('slidr-home-demo', {
    'overflow': true,
    'keyboard': true
  });
  addEffect(s1, 'linear');
  s1.auto();

  var eventType = ('ontouchstart' in window) ? 'touchend' : 'click';
  $('aside[id="slidr-home-demo-control"]').one(eventType, function() {
    s1.stop();
  });

  $(document).one('keydown', function() {
    s1.stop();
  });

  $('aside[id="slidr-home-demo-breadcrumbs"]').one(eventType, function() {
    s1.stop();
  });

  $('#slidr-home-demo-effects > div').each(function() {
    $(this).bind(eventType, function() { addEffect(s1, $(this).text()); });
  });

  var controls = ['border', 'corner', 'none'];
  $('#slidr-home-demo-settings > div').each(function() {
    $(this).bind(eventType, function() {
      var type = $(this).text();
      var meta = $(this).attr('data-meta');
      if (type === 'controls') {
        var newIndex = (indexOf(controls, meta) + 1) % controls.length;
        var style = controls[newIndex];
        $(this).attr('data-meta', style);
        s1.controls(style);
        (style === 'none') ? $(this).removeClass('active') : $(this).addClass('active');
      } else if (type === 'breadcrumbs') {
        var next = (meta === 'off') ? 'on' : 'off';
        (next === 'on') ? $(this).addClass('active') : $(this).removeClass('active');
        $(this).attr('data-meta', next);
        s1.breadcrumbs();
      }
    });
  });

  // IF <= IE8, abort.
  if (bchanx.isIE) {
    $('.slidr-docs').remove();
    $('a[href="#docs"]').attr('href', 'https://github.com/bchanx/slidr');
  } else {
    // Highlight markdown.
    $('.markdown').each(function() {
      this.innerHTML = marked(("".trim) ? this.innerHTML.trim() : this.innerHTML.replace(/^\s+|\s+$/g, ''));
    });

    // Highlight code blocks.
    hljs.initHighlightingOnLoad();

    // Set up Slidr nav demo.
    slidr.create('slidr-nav-demo', {
      'controls': 'none',
      'overflow': true,
      'keyboard': true,
      'touch': true
    }).add('h', ['one', 'two', 'three', 'one'], 'cube')
      .add('v', ['one', 'two', 'three', 'one'], 'linear')
      .start();

    // Set up demo slidr's.
    var demos = [slidr.create('slidr-div', {'theme': '#222'}).start(),
                 slidr.create('slidr-img', {'theme': '#222'}).start(),
                 slidr.create('slidr-ul', {'theme': '#222'}).start()];
    var demoNames = ['#slidr-div-control', '#slidr-img-control', '#slidr-ul-control'];
    for (var i = 0, demo; demo = demoNames[i]; i++) {
      $(demo + ' .slidr-control.left').bind(eventType, function(e) {
        (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation();
        for (var d = 0, dd; dd = demos[d]; d++) dd.slide('left');
      });
      $(demo + ' .slidr-control.right').bind(eventType, function(e) {
        (e.preventDefault) ? e.preventDefault() : e.returnValue = false;
        e.stopPropagation();
        for (var d = 0, dd; dd = demos[d]; d++) dd.slide('right');
      });
    }

    // Set up Slidr API demo.
    slidr.create('slidr-api-demo', {
      breadcrumbs: true,
      overflow: true
    }).add('h', ['one', 'two', 'three', 'one'])
      .add('v', ['five', 'four', 'three', 'five'], 'cube')
      .start();

    // Set up Slidr CSS demo.
    slidr.create('slidr-css-demo', {
      breadcrumbs: true,
      overflow: true,
      transition: 'cube'
    }).add('h', ['one', 'two', 'three', 'one'], 'linear')
      .start();

    // Set up Slidr auto resize demo.
    slidr.create('slidr-inline-dynamic', {
      transition: 'cube',
      controls: 'none'
    }).add('v', ['one', 'three', 'two', 'one']).auto(3000, 'up');
    slidr.create('slidr-inline-static', {
      transition: 'cube',
      controls: 'none'
    }).add('v', ['one', 'three', 'two', 'one']).auto(3000, 'up');

    // Add breadcrumb links.
    var anchors = [];
    $('.markdown[id]').each(function() {
      var h2 = $(this).find('h2').get(0);
      if (h2) {
        var newNode = $(
          '<div class="breadcrumb-link">' +
            '<div class="action">' +
              '<a href="#' + h2.innerHTML.toLowerCase() + '">' + h2.innerHTML + '</a>' +
            '</div>' +
            '<div class="top"><a href="#">Top</a></div>' +
            '<h2>' + h2.innerHTML + '</h2>' +
          '</div>').get(0);
        h2.parentNode.insertBefore(newNode, h2);
        h2.parentNode.removeChild(h2);
        anchors.push('#' + h2.innerHTML.toLowerCase());
      }
    });
  }

	// Setup master slidr, breadcrumbs and hash changes.
  var pages = ['#home', '#docs'];
  var checkPage = function() {
    var hash = window.location.hash;
    if (indexOf(pages, hash) >= 0) return hash.slice(1);
    else if (indexOf(anchors, hash) >= 0) return 'docs';
    else if (hash === '' && indexOf(window.location.href, '#') < 0) return 'home';
    return null;
  };

  var checkAnchor = function() {
    var hash = window.location.hash;
    var href = $('a[href="' + hash + '"]');
    if (indexOf(anchors, hash) >= 0 && href) {
      href.get(0).click();
    }
  };

  var page = checkPage();
  var master = slidr.create('slidr', {
    'controls': 'none',
    'transition': 'cube',
    'overflow': true
  }).start(page);
  if (page === 'docs') checkAnchor();

  $(window).bind('hashchange', function(e) {
    var newPage = checkPage();
    if (newPage) {
      master.slide(newPage);
      checkAnchor();
    }
  });

});
