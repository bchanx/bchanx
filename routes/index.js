var router = require('express').Router();
var config = require('../config');
var path = require('path');
var fs = require('fs');

var gameboyCode = () => {
  var components = ['processor', 'text', 'color', 'cover', 'shapes'];
  var code = {};
  components.forEach((c) => {
    ['html', 'css'].forEach((type) => {
      if (!code[c]) {
        code[c] = {};
      }
      var pathname = path.join(__dirname, '../views/html/animated-gameboy-in-css/code', c + '.' + type);
      code[c][type] = fs.readFileSync(pathname, 'utf8');
    });
  });
  return code;
};

router.get('/animated-gameboy-in-css', (req, res) => {
  res.render('animated-gameboy-in-css/demo.html');
});

router.get('/animated-gameboy-in-css-blog', (req, res) => {
  res.render('animated-gameboy-in-css/blog.html', {
    code: gameboyCode()  
  });
});

router.get('/logos-in-pure-css', (req, res) => {
  res.render('logos-in-pure-css/demo.html');
});

router.get('/logos-in-pure-css-blog', (req, res) => {
  res.render('logos-in-pure-css/blog.html');
});

router.get('/logos-in-pure-css-demo', (req, res) => {
  res.redirect('/logos-in-pure-css');
});

router.get('/slidr', (req, res) => {
  res.render('slidr/demo.html');
});

router.get('/9kmmr', (req, res) => {
  res.render('9kmmr/index.html');
});

module.exports = {
  router: router
};
