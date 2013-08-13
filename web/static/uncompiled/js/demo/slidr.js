//
// Copyright 2013. All Rights Reserved.
// Author: Brian Chan
// Contact: bchanx@gmail.com
//

$(function() {
  var s1 = slidr.create('slidr1', {'breadcrumbs': true, 'controls': 'border'})
    .add('h', ['one', 'two'], 'linear').add('h', ['two', 'three'], 'cube').add('h', ['three', 'four'], 'fade').add('h', ['four', 'one'], 'none')
    .add('v', ['five', 'three'], 'linear').add('v', ['six', 'five'], 'cube').add('v', ['three', 'six'], 'cube')
    .add('h', ['six', 'seven'], 'linear').add('h', ['seven', 'eight'], 'cube').start();
  var s2 = slidr.create('slidr2', {'breadcrumbs': true, 'transition': 'linear', 'fading': false, 'controls': 'border', 'clipping': true}).auto();
  window.s1 = s1;
  window.s2 = s2;
});
