import React from 'react';
import Logo from './Logo';

class Home extends React.Component {
  render() {
    return (
      <div id="bchanx">
        <div id="banner">
          <div id="bchanx-logo"><Logo/></div>
          <div id="bchanx-text">bchanx</div>
        </div>
        <div id="projects">
          <a href="/animated-gameboy-in-css">Animated Gameboy in CSS</a> (2015)
          <br/>
          <a href="/slidr">slidr.js</a> (2014)
          <br/>
          <a href="/logos-in-pure-css">Logos in Pure CSS</a> (2013)
        </div>
        <div id="social">
          <a href="https://www.twitter.com/bchanx" className="ion-social-twitter"></a>
          <a href="https://www.instagram.com/bchanx" className="ion-social-instagram"></a>
          <a href="https://www.github.com/bchanx" className="ion-social-github"></a>
          <a href="https://www.linkedin.com/bchanx" className="ion-social-linkedin"></a>
        </div>
      </div>
    );
  }
}

export default Home;
