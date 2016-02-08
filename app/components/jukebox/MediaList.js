import React from 'react';
import classNames from 'classnames';

var MediaList = React.createClass({

  getDefaultProps: function() {
    return {
      current: {},
      controls: {},
      dispatch: null
    }
  },

  render: function() {
    return (
      <div className={classNames("media-list", {
        hidden: !this.props.current.order.length
      })}>
        {this.props.current.order.map((p, idx) => {
          return (
            <div key={idx} className="media-item">
              {idx}. {p.mediaType} - {p.mediaId} {this.props.current.mediaId === p.mediaId ? '*' : ''}
            </div>
          );
        })}
      </div>
    );
  }
});

export default MediaList;
