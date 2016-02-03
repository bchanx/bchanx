var router = require('express').Router();
var config = require('../config');
var path = require('path');
var fs = require('fs');

var gameboyCode = function() {
  var components = ['processor', 'text', 'color', 'cover', 'shapes'];
  var code = {};
  components.forEach(function(c) {
    ['html', 'css'].forEach(function(type) {
      if (!code[c]) {
        code[c] = {};
      }
      var pathname = path.join(__dirname, '../views/html/animated-gameboy-in-css/code', c + '.' + type);
      code[c][type] = fs.readFileSync(pathname, 'utf8');
    });
  });
  return code;
};

router.get('/animated-gameboy-in-css', function(req, res) {
  res.render('animated-gameboy-in-css/demo.html');
});

router.get('/animated-gameboy-in-css-blog', function(req, res) {
  res.render('animated-gameboy-in-css/blog.html', {
    code: gameboyCode()  
  });
});

router.get('/logos-in-pure-css', function(req, res) {
  res.render('logos-in-pure-css/demo.html');
});

router.get('/logos-in-pure-css-blog', function(req, res) {
  res.render('logos-in-pure-css/blog.html');
});

router.get('/logos-in-pure-css-demo', function(req, res) {
  res.redirect('/logos-in-pure-css');
});

router.get('/slidr', function(req, res) {
  res.render('slidr/demo.html');
});

module.exports = {
  router: router
};
