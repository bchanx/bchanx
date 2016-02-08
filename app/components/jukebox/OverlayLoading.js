import React from 'react';

var OverlayLoading = React.createClass({

  getDefaultProps: function() {
    return {
      duration: 5
    };
  },

  render: function() {
    return (
      <svg className="overlay-loading" height="100px" width="100px">
        <circle r="47px" cx="50px" cy="50px" style={{animation: 'overlay-progress ' + this.props.duration + 's linear'}}></circle>
      </svg>
    );
  }
});

export default OverlayLoading;
