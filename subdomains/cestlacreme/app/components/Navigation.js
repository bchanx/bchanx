import React from 'react';
import { Link, IndexLink } from 'react-router';
import Social from './Social';

var Navigation = React.createClass({
  render: function() {
    return (
      <div className="nav">
        <div className="nav-brand">
          <IndexLink to="/">
            <div className="nav-logo"></div>
          </IndexLink>
        </div>
        <div className="nav-links">
          <div className="nav-link">
            <Link to="/menu" activeClassName="active">menu</Link>
          </div>
          <div className="nav-link">
            <Link to="/about" activeClassName="active">about</Link>
          </div>
        </div>
        <Social/>
      </div>
    )
  }
});

export default Navigation;
