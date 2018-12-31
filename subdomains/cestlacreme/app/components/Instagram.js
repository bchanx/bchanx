import React from 'react';
import request from 'superagent';
import { Loading } from './Common';
import Carousel from './Carousel';
import ImageOverlay from './ImageOverlay';

var Instagram = React.createClass({
  getInitialState: function() {
    return {
      recent: [],
      loading: true,
      showDefault: false,
      imageOverlayShow: false,
      imageOverlayStartIndex: 0
    };
  },

  componentDidMount: function() {
    request.get(window.location.origin + '/instagram/recent')
      .accept('json')
      .end((error, response) => {
        let newState = {
          recent: [],
          loading: false,
          showDefault: true
        };
        if (response && response.body) {
          newState.recent = response.body;
        }
        if (newState.recent.length) {
          newState.showDefault = false;
        }
        this.setState(newState);
      });
  },

  openOverlay: function(index) {
    this.setState({
      imageOverlayShow: true,
      imageOverlayStartIndex: index
    });
  },

  onOverlayClose: function() {
    this.setState({
      imageOverlayShow: false
    });
  },

  render: function() {
    let instagramImages = this.state.recent.map((r, index) => {
      let onClickHandler = this.openOverlay.bind(this, index);
      return (
        <div className="instagram-image" key={r.source} onClick={onClickHandler}>
          <div className="instagram-thumbnail">
            <img src={r.url}/>
          </div>
        </div>
      );
    });
    let defaultImageURL = '/cestlacreme/images/default-brulee-low-min.jpg';
    let defaultImage = (
      <img className="default-image" src={defaultImageURL} onClick={this.openOverlay.bind(this, 0)}/>
    );
    return (
      <div className="instagram">
        {this.state.loading ? <Loading size="large"/> : this.state.showDefault ? defaultImage : instagramImages}
        {this.state.recent.length ?
          <div className="instagram-carousel">
            <Carousel images={this.state.recent} onCarouselClick={this.openOverlay}/>
          </div> : null}
        <ImageOverlay
          images={this.state.recent.length ? this.state.recent : [defaultImageURL]}
          show={this.state.imageOverlayShow}
          startIndex={this.state.imageOverlayStartIndex}
          onClose={this.onOverlayClose}/>
      </div>
    );
  }
});

export default Instagram;
