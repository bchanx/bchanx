import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/menu" component={Menu} />
    <Route path="/about" component={About} />
  </Route>
);

export default routes;
