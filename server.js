'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _consolidate = require('consolidate');

var _consolidate2 = _interopRequireDefault(_consolidate);

var _nunjucks = require('nunjucks');

var _nunjucks2 = _interopRequireDefault(_nunjucks);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _server = require('react-dom/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('babel-register');

var app = (0, _express2.default)();

app.set('views', ['html', 'jade'].map(function (ext) {
  return _path2.default.join(__dirname, 'views', ext);
}));
app.engine('html', _consolidate2.default.nunjucks);
app.set('view engine', 'jade');
app.disable('x-powered-by');

// Add 'views' path for nunjuck template lookup
_consolidate2.default.nunjucks.render = function (str, options, fn) {
  var env = _nunjucks2.default.configure('views');
  env.renderString(str, options, fn);
};

var ENV = process.env.NODE_ENV || 'development';
var PORT = process.env.PORT || 3000;
var LOCAL_HOST = !!process.env.LOCAL_HOST;
app.set('env', ENV);
app.set('port', PORT);

app.use((0, _compression2.default)());
app.use(_bodyParser2.default.json({ limit: '500mb' }));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.use('/static', _express2.default.static(_path2.default.join(__dirname, 'static')));

app.locals = {
  env: ENV,
  min: ENV === 'production' ? '.min' : ''
};

// Setup favicon
app.use((0, _serveFavicon2.default)(__dirname + '/static/favicon' + (ENV === 'development' ? '-dev' : '') + '.ico'));

// Setup logging middleware
app.use(function (req, res, next) {
  console.log('[ ' + req.method + ' ]', req.url, req.query, req.body);
  next();
});

// No caching
app.use(function (req, res, next) {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  next();
});

// Allow CORS
var allowCrossDomain = function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
};
app.use(allowCrossDomain);

// Setup custom routes
var ROUTE_DIR = './routes';
var customRoutes = _fs2.default.readdirSync(ROUTE_DIR);
customRoutes.forEach(function (r) {
  if (r.endsWith('.js')) {
    var filepath = ROUTE_DIR + '/' + r;
    var routename = '/' + (r.startsWith('index') ? '' : r.split('.js')[0]);
    app.use(routename, require(filepath).router);
  }
});

var routes = require('./app/routes').default;

app.use(function (req, res) {
  (0, _reactRouter.match)({
    routes: routes,
    location: req.url
  }, function (err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (!renderProps) {
      res.status(404).send('Not found');
    } else {
      var html = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, renderProps));
      res.render('index', { html: html });
    }
  });
});

app.listen(PORT, function () {
  console.log('Server running in [%s] on port [%s]', ENV, PORT);
});