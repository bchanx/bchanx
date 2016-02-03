import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Jukebox from './components/jukebox/Jukebox';

export default function() {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/jukebox" component={Jukebox} />
    </Route>
  );
}
