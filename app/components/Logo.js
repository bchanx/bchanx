import React from 'react';

var Logo = React.createClass({
  render: function() {
    return (
      <div className="logo-bchanx">
        <div className="logo-content themeable">
          <div className="logo-text">
            <div className="logo-b"></div>
          </div>
          <div className="logo-pic">
            <img src="http://www.gravatar.com/avatar/c43834b8380872e2bca1bf624c6a693f.jpg"/>
          </div>
        </div>
      </div>
    );
  }
});

export default Logo;
