import React from 'react';

var Footer = React.createClass({
  render: function() {
    return (
      <div className="footer">
        <span className="email">email: <a href="mailto:cestlacreme@gmail.com">cestlacreme@gmail.com</a></span>
        <span className="site">site: <a href="http://bchanx.com" target="_blank">@bchanx</a></span>
      </div>
    );
  }
});

export default Footer;
