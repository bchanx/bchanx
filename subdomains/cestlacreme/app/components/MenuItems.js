import React from 'react';
import Select from 'react-select';
import { Break } from './Common';
import Selection from './Selection';
import ImageOverlay from './ImageOverlay';

var MenuItems = React.createClass({

  getDefaultProps: function() {
    return {
      product: null,
      selection: null,
      onSelectionChange: null,
      disabled: false
    };
  },

  getInitialState: function() {
    return {
      overlayImages: [],
      imageOverlayShow: false,
      imageOverlayStartIndex: 0
    };
  },

  handleSelectChange: function(name) {
    return function(val) {
      this.props.onSelectionChange(name, val);
    }.bind(this);
  },

  getImages: function(type) {
    return ['ingredients', 'torched', 'spoon'].map(suffix => {
      return '/cestlacreme/images/' + type + '/' + type + '-' + suffix + '-low-min.jpg';
    });
  },

  openOverlay: function(images, index) {
    this.setState({
      overlayImages: images,
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
    return (
      <div className="selection">
        {(() => {
          return Object.keys(this.props.selection).map(type => {
            let images = this.getImages(type);
            let onClickHandler = this.openOverlay.bind(this, images);
            return (
              <div key={type}>
                <Selection
                  type={type}
                  product={this.props.product}
                  selection={this.props.selection}
                  disabled={this.props.disabled}
                  onChange={this.handleSelectChange(type)}
                  images={images}
                  onClick={onClickHandler}
                />
                <Break/>
              </div>
            );
          });
        })()}
        <ImageOverlay
          images={this.state.overlayImages}
          show={this.state.imageOverlayShow}
          startIndex={this.state.imageOverlayStartIndex}
          onClose={this.onOverlayClose}/>
      </div>
    );
  }
});

export default MenuItems;
