import React from 'react';
import ReactDOM from 'react-dom';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';

var Carousel = React.createClass({
  mixins: [ReactTimerMixin],

  componentDidMount: function() {
    this.nextImageTimeout();
  },

  nextImageTimeout: function() {
    this.setTimeout(() => {
      if (!this.state.imageHovered) {
        let isVisible = ReactDOM.findDOMNode(this).offsetHeight;
        if (isVisible) {
          this.nextImage();
        }
        this.nextImageTimeout();
      }
      else {
        this.setState({
          transitionPending: true
        });
      }
    }, this.props.timeout);
  },

  nextImage: function() {
    let newState = {
      transitionPending: false
    };
    if (this.props.images.length) {
      let newIndex = (this.state.currentIndex + 1) % this.props.images.length;
      newState.currentIndex = newIndex;
    }
    this.setState(newState);
  },

  getDefaultProps: function() {
    return {
      images: [],
      timeout: 5000,
      startIndex: 0,
      onCarouselClick: null
    };
  },

  getInitialState: function() {
    return {
      currentIndex: this.props.startIndex,
      imageHovered: false,
      transitionPending: false
    };
  },

  onMouseOver: function() {
    this.setState({
      imageHovered: true
    });
  },

  onMouseLeave: function() {
    this.setState({
      imageHovered: false
    });
    if (this.state.transitionPending) {
      this.nextImage();
      this.nextImageTimeout();
    }
  },

  onCarouselClick: function(index) {
    if (this.props.onCarouselClick) {
      this.props.onCarouselClick(index);
    }
  },

  render: function() {
    let images = this.props.images.map((img, idx) => {
      let imgURL = img.url || img;
      let backgroundImage = {
        backgroundImage: 'url(' + imgURL + ')'
      };
      let onClickHandler = this.onCarouselClick.bind(this, idx);
      return (
        <div key={imgURL} className={classNames("carousel-image", {
          active: idx === this.state.currentIndex
        })} style={backgroundImage} onClick={onClickHandler}></div>
      );
    });
    return (
      <div className="carousel-images">
        {images}
      </div>
    );
  }
});

export default Carousel;
