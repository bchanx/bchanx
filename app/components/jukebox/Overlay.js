import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import { hideOverlay } from './redux/actions';
import OverlayLoading from './OverlayLoading';

var Overlay = React.createClass({

  mixins: [ReactTimerMixin],

  getDefaultProps: function() {
    return {
      overlay: {},
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      hidden: true,
      count: 0
    };
  },

  cancel: function() {
    this.props.dispatch(hideOverlay());
  },

  continue: function() {
    this.clearInterval(this._timer);
    this.props.dispatch(hideOverlay(), this.props.overlay.action);
  },

  _timer: null,

  overlayTimer: function() {
    this.clearInterval(this._timer);
    this._timer = this.setInterval(() => {
      let count = this.state.count - 1;
      if (count <= 0) {
        this.continue();
      }
      else {
        this.setState({
          count: count
        });
      }
    }, 1000);
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.overlay.show) {
      if (this.state.hidden) {
        this.setState({
          hidden: false,
          count: nextProps.overlay.duration
        });
        this.overlayTimer();
      }
    }
    else {
      if (!this.state.hidden) {
        this.setState({
          hidden: true,
          count: 0
        });
        this.clearInterval(this._timer);
      }
    }
  },

  render: function() {
    return (
      <div className={classNames("overlay", {
        hidden: this.state.hidden
      })}>
        <div className="overlay-message">
          Next in {this.state.count}...
        </div>
        <div className="overlay-continue" onClick={this.continue}>
          <OverlayLoading duration={this.props.overlay.duration}/>
          <span className="ion-ios-play"></span>
        </div>
        <div className="overlay-cancel" onClick={this.cancel}>Cancel</div>
      </div>
    );
  }
});

export default Overlay;
