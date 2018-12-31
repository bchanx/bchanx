import React from 'react';
import Navigation from './Navigation';
import Content from './Content';

var App = React.createClass({
  render: function() {
    return (
      <div className="container">
        <Navigation/>
        <Content>{this.props.children}</Content>
      </div>
    );
  }
});

export default App;
