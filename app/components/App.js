import React from 'react';
import { Link, IndexLink } from 'react-router';
import Content from './Content';

class App extends React.Component {
  render() {
    return (
      <Content>{this.props.children}</Content>
    );
  }
}

export default App;
