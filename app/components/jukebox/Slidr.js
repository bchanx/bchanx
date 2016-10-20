import React from 'react';
import { ReactScriptLoaderMixin } from 'react-script-loader';

var Slidr = React.createClass({

  mixins: [ReactScriptLoaderMixin],

  getInitialState: function() {
    return {
      loaded: false,
      callback: false
    };
  },

  getDefaultProps: function() {
    return {
      id: 'slidr',
      className: '',
      onLoaded: null
    };
  },

  getScriptURL: function() {
    return '/static/dist/js/lib/slidr.min.js';
  },

  onScriptLoaded: function() {
    this.setState({
      loaded: true
    });
  },

  componentDidUpdate: function() {
    if (this.state.loaded && !this.state.callback && this.props.onLoaded) {
      this.props.onLoaded(window.slidr);
      this.setState({
        callback: true
      });
    }
  },

  onScriptError: function() {
    // Script error
  },

  render: function() {
    return (
      <div id={this.props.id} className={this.props.className}>
        {this.props.children}  
      </div>
    )
  }
});

export default Slidr;
