/*!
 * Copyright (c) 2013 Brian Chan (bchanx.com)
 * All Rights Reserved.
 */

if (bchanx.type === 'devel') bchanx.require('slidr.js');

$(function() {

  var h = ['one', 'two', 'three', 'four', 'one'];
  var v = ['six', 'five', 'four', 'six'];

  var updateEffect = function(s, effect) {
    $('.effect.button').removeClass('active');
    $('.effect.button.' + effect).addClass('active');
    $('#slidr-home-demo > div').text(effect);
  };

  var addEffect = function(s, effect) {
    effect = effect || 'linear';
    s.add('h', h, effect, true).add('v', v, effect, true).start();
    updateEffect(s, effect);
  };

  var s1 = slidr.create('slidr-home-demo', {
    'breadcrumbs': true,
    'overflow': true
  });
  addEffect(s1, 'linear');
  s1.auto();
  window.s1 = s1;

  $('aside[id="slidr-home-demo-control"]').one('click', function() {
    s1.stop();
  });

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
      }
    });
  });

	// Setup nav controls.
  $('.slidr-nav').click(function() {
    var nav = $(this).attr('nav');
    if (nav === 'home') master.slide('left');
    else if (nav === 'docs') master.slide('right');
  });

  // Highlight markdown.
  $('.markdown').each(function() {
    this.innerHTML = marked(this.innerHTML.trim());
  });

  // Highlight code blocks.
  hljs.initHighlightingOnLoad();

  // Set up demo slidr's.
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
  $('.markdown[id]').each(function() {
    var h2 = $(this).find('h2').get(0);
		if (h2) {
			var newNode = $(
				'<div class="breadcrumb-link">' +
					'<div class="action">' +
						'<a href="#' + h2.innerHTML.toLowerCase() + '">' + h2.innerHTML + '</a>' +
					'</div>' +
					'<h2>' + h2.innerHTML + '</h2>' +
				'</div>').get(0);
			h2.parentNode.insertBefore(newNode, h2);
			h2.remove();
		}
  });

	// Setup master slidr, breadcrumbs and hash changes.
  var anchors = ['#instructions', '#html', '#javascript', '#css'];
  var pages = ['#home', '#docs'];

  var checkHash = function() {
    var hash = window.location.hash;
    if (hash === '') return 'home';
    else if (pages.indexOf(hash) >= 0) return hash.slice(1);
    else if (anchors.indexOf(hash) >= 0) return 'docs';
    return null;
  };

	var checkAnchor = function() {
    master.slide(checkHash());
		var hash = window.location.hash;
		var href = $('a[href="' + hash + '"]');
		if (anchors.indexOf(hash) >= 0 && href) {
			href.get(0).click();
		}
	};

  var master = slidr.create('slidr', {
    'controls': 'none',
    'transition': 'cube',
    'overflow': true
  }).start(checkHash());
	checkAnchor();

  $(window).bind('hashchange', function(e) {
		checkAnchor();
  });

});
