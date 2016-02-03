import React from 'react';
import ReactDOM from 'react-dom';

var Content = React.createClass({
  componentDidUpdate: function() {
    let node = ReactDOM.findDOMNode(this);
    node.scrollTop = 0;
    let app = node.parentNode.parentNode;
    app.scrollTop = 0;
  },

  render: function() {
    return (
      <div className="content">
        {this.props.children}
      </div>
    );
  }
});

export default Content;
