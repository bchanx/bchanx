import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';

export var Break = React.createClass({
  render: function() {
    return (
      <div {...this.props} className={classNames("break", this.props.className)}></div>
    );
  }
});

export var Bold = React.createClass({
  render: function() {
    return (
      <span {...this.props} className={classNames("bold", this.props.className)}>
        {this.props.children}
      </span>
    );
  }
});

export var Note = React.createClass({
  render: function() {
    return (
      <span className="note">{this.props.children}</span>
    );
  }
});

export var Loading = React.createClass({
  getDefaultProps: function() {
    return {
      size: 'small',
      inline: false
    };
  },

  render: function() {
    return (
      <div className={classNames("loading", this.props.size, {
        inline: this.props.inline 
      })}>
        <span className="ion-load-c"></span>
      </div>
    );
  }
});

export var Button = React.createClass({
  render: function() {
    return (
      <button {...this.props} className={classNames("btn", this.props.className)}>
        {this.props.children}
      </button>
    );
  }
});
