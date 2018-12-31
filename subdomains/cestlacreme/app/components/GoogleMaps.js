import React from 'react';
import classNames from 'classnames';

export var GoogleMapsEmbed = React.createClass({

  getDefaultProps: function() {
    return {
      placeId: null
    };
  },

  render: function() {
    return (
      this.props.placeId ?
      <div className={classNames("google-maps", this.props.className)}>
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{border: '0'}}
          allowFullScreen
          src={"https://www.google.com/maps/embed/v1/place?q=place_id:" + this.props.placeId + "&key=" + process.env.GOOGLE_BROWSER_API_KEY}>
        </iframe>
      </div> : null
    );
  }
});
