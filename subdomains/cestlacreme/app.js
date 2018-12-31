import fs from 'fs';
import path from 'path';

let router = require('express').Router();

// Setup custom routes
let ROUTE_DIR = './routes';
let customRoutes = fs.readdirSync(path.join(__dirname, ROUTE_DIR));
customRoutes.forEach(function(r) {
  if (r.endsWith('.js')) {
    let filepath = ROUTE_DIR + '/' + r;
    let routeName = '/' + (r.startsWith('index') ? '' : r.split('.js')[0]);
    router.use(routeName, require(filepath).router);
  }
});

// Setup server side react router
import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
const routes = require('./app/routes').default;

router.get('*', (req, res) => {
  match({
    routes: routes,
    location: req.url
  }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).send(err.message);
    }
    else if (redirectLocation) {
      res.status(301).redirect(redirectLocation.pathname + redirectLocation.search);
    }
    else if (!renderProps) {
      res.status(404).send('C\'est la Creme - Not found');
    }
    else {
      let html = renderToString(
        <RouterContext {...renderProps} />
      );
      res.render(__dirname + '/views/index', { html, title: 'C\'est la Creme' });
    }
  });
});

module.exports = {
  router
};

