require('babel-register');

import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import fs from 'fs';
import compress from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import consolidate from 'consolidate';
import nunjucks from 'nunjucks';
import subdomain from 'express-subdomain';

const app = express();

app.set('views', ['html', 'jade'].map((ext) => {
  return path.join(__dirname, 'views', ext);
}));
app.engine('html', consolidate.nunjucks);
app.set('view engine', 'jade');
app.disable('x-powered-by');

// Add 'views' path for nunjuck template lookup
consolidate.nunjucks.render = (str, options, fn) => {
  let env = nunjucks.configure('views');
  env.renderString(str, options, fn);
};

const ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const LOCAL_HOST = !!process.env.LOCAL_HOST;
app.set('env', ENV);
app.set('port', PORT);

app.use(compress());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/cestlacreme', express.static(path.join(__dirname, 'subdomains/cestlacreme/static')));

app.locals = {
  env: ENV,
  min: ENV === 'production' ? '.min' : ''
};

// Setup favicon
app.use(favicon(__dirname + '/static/favicon' + (ENV === 'development' ? '-dev' : '') + '.ico'));

// Setup logging middleware
app.use((req, res, next) => {
  console.log('[ ' + req.method + ' ]', req.url, req.query, req.body);
  next();
});

// No caching
app.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  next();
});

// Allow CORS
const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  next();
}
app.use(allowCrossDomain);

// Setup subdomains
const SUBDOMAIN_DIR = './subdomains';
const subdomains = fs.readdirSync(SUBDOMAIN_DIR);
subdomains.forEach(subdomainName => {
  let subdomainApp = `${SUBDOMAIN_DIR}/${subdomainName}/app.js`;
  app.use(subdomain(subdomainName, require(subdomainApp).router));
});

// Setup custom routes
const ROUTE_DIR = './routes';
const customRoutes = fs.readdirSync(ROUTE_DIR);
customRoutes.forEach((r) => {
  if (r.endsWith('.js')) {
    let filepath = ROUTE_DIR + '/' + r;
    let routename = '/' + (r.startsWith('index') ? '' : r.split('.js')[0]);
    app.use(routename, require(filepath).router);
  }
});

import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
const routes = require('./app/routes').default;

app.use((req, res) => {
  match({
    routes: routes,
    location: req.url
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    }
    else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    }
    else if (!renderProps) {
      res.status(404).send('Not found');
    }
    else {
      let html = renderToString(
        <RouterContext {...renderProps}/>
      );
      res.render('index', { html: html });
    }
  });
});

app.listen(PORT, () => {
  console.log('Server running in [%s] on port [%s]', ENV, PORT);
});
