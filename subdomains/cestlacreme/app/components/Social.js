import React from 'react';

var Social = React.createClass({
  render: function() {
    return (
      <div className="nav-social">
        <a href="https://www.instagram.com/cestlacreme/" target="_blank" className="ion-icon ion-social-instagram"></a>
        <a href="https://www.facebook.com/cestlacreme" target="_blank" className="ion-icon ion-social-facebook"></a>
        <a href="https://www.twitter.com/cestlacreme" target="_blank" className="ion-icon ion-social-twitter"></a>
      </div>
    );
  }
});

export default Social;
