(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Common = require('./Common');

var _GoogleMaps = require('./GoogleMaps');

var _FAQ = require('./FAQ');

var _FAQ2 = _interopRequireDefault(_FAQ);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = _react2.default.createClass({
  displayName: 'About',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'about' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Common.Bold,
          null,
          'Hi! I\'m Samson, creator of C\'est la Creme!'
        ),
        _react2.default.createElement(
          'div',
          { className: 'about-me-picture' },
          ' '
        ),
        'I love food. For as long as I can remember I\'ve been eating my way through all different ethnic cuisines! I started cooking for myself ever since I was little and have always been cooking as a hobby. One day I decided to make my mom\'s favorite dessert - the ',
        _react2.default.createElement(
          _Common.Bold,
          null,
          'Creme Brulee'
        ),
        '.',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        'As an engineer by day, and an amateur foodie at night, I\'ve often dreamt about making something special and sharing it with everyone.',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        'Well, here it is: My goal is to make the absolute best creme brulee I can make with the best ingredients I can find. That\'s it!'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        { className: 'faq' },
        _react2.default.createElement(
          'div',
          { className: 'faq-title' },
          _react2.default.createElement(
            _Common.Bold,
            null,
            'F.A.Q'
          )
        ),
        _react2.default.createElement(
          _FAQ2.default,
          { question: "How do I create the sugar glaze on top?" },
          'Dab the surface of the creme brulee with a paper towel to rid of any moisture, then spread 3/4 to a 1 teaspoon of white sugar on top evenly.',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          'Next, grab a food torch on medium flame, and gently melt the sugar until browned! Alternatively, you can set the oven to "Broil" with the temperature at 500F, then place the creme brulee on the top rack for 5-10 minutes or until golden brown and bubbling.',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          'Finally, let sit for 10 minutes and eat! Or, if a cold creme brulee is desired, place the jars back into the fridge for up to 30 minutes and serve. Although the longer you wait, the softer the sugar crust will get.',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            _Common.Note,
            null,
            '*Please be safe!!! If you are torching and have an open flame, please do so at your own risk and be fire safe ready.*'
          )
        ),
        _react2.default.createElement(
          _FAQ2.default,
          { question: "Can you make me a custom flavor?" },
          _react2.default.createElement(
            'a',
            { href: 'mailto:cestlacreme@gmail.com' },
            'Email us'
          ),
          '! Let\'s make it happen!',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            _Common.Note,
            null,
            '*Please note, we will try our best to accommodate but may be restricted by minimum quantities and flavor limitations.*'
          )
        ),
        _react2.default.createElement(
          _FAQ2.default,
          { question: "How many can I order?" },
          'Each order requires a ',
          _react2.default.createElement(
            _Common.Bold,
            null,
            'minimum of 4'
          ),
          ', and a ',
          _react2.default.createElement(
            _Common.Bold,
            null,
            'maximum of 12'
          ),
          ' creme brulee\'s.',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          'For larger quantities, please ',
          _react2.default.createElement(
            'a',
            { href: 'mailto:cestlacreme@gmail.com' },
            'email us'
          ),
          ' and request for a special order.'
        ),
        _react2.default.createElement(
          _FAQ2.default,
          { question: "When and where is pickup?" },
          'Orders are collected bi-weekly, closing on ',
          _react2.default.createElement(
            _Common.Bold,
            null,
            '8pm PST Tuesday'
          ),
          ' every other week. Pickup is scheduled for the Thursday right after orders close. Orders after each deadline will be scheduled for pickup the Thursday two weeks after.',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          'Pickup location is at the McDonalds parking lot, next to the Main Skytrain station.',
          _react2.default.createElement('br', null),
          'The exact address is ',
          _react2.default.createElement(
            _Common.Bold,
            null,
            '1527 Main St, Vancouver, BC V6A 2W5'
          ),
          '.',
          _react2.default.createElement('br', null),
          'Pickup time is between ',
          _react2.default.createElement(
            _Common.Bold,
            null,
            '6pm - 7pm'
          ),
          '.',
          _react2.default.createElement(_GoogleMaps.GoogleMapsEmbed, { placeId: 'ChIJARg-smZxhlQRfhMPDMXsgL4' }),
          'If things are unclear, or you\'d like to schedule an order for a later date, send us an ',
          _react2.default.createElement(
            'a',
            { href: 'mailto:cestlacreme@gmail.com' },
            'email'
          ),
          '.'
        ),
        _react2.default.createElement(
          _FAQ2.default,
          { question: "What happens if I miss the weekly meetup for my order?" },
          'Things happen, we understand.',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'a',
            { href: 'mailto:cestlacreme@gmail.com' },
            'Email us'
          ),
          ' with your ',
          _react2.default.createElement(
            _Common.Bold,
            null,
            'order number'
          ),
          ' and we\'ll reschedule your pickup time.'
        ),
        _react2.default.createElement(
          _FAQ2.default,
          { question: "Can we keep the jars?" },
          'Of course! However we gladly accept returns as we can clean and sustainably re-use the jars. Meet us at our drop off if you decide to do so!'
        )
      )
    );
  }
});

exports.default = About;

},{"./Common":4,"./FAQ":6,"./GoogleMaps":8,"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = _react2.default.createClass({
  displayName: 'App',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'container' },
      _react2.default.createElement(_Navigation2.default, null),
      _react2.default.createElement(
        _Content2.default,
        null,
        this.props.children
      )
    );
  }
});

exports.default = App;

},{"./Content":5,"./Navigation":15,"react":"react"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Carousel = _react2.default.createClass({
  displayName: 'Carousel',

  mixins: [_reactTimerMixin2.default],

  componentDidMount: function componentDidMount() {
    this.nextImageTimeout();
  },

  nextImageTimeout: function nextImageTimeout() {
    var _this = this;

    this.setTimeout(function () {
      if (!_this.state.imageHovered) {
        var isVisible = _reactDom2.default.findDOMNode(_this).offsetHeight;
        if (isVisible) {
          _this.nextImage();
        }
        _this.nextImageTimeout();
      } else {
        _this.setState({
          transitionPending: true
        });
      }
    }, this.props.timeout);
  },

  nextImage: function nextImage() {
    var newState = {
      transitionPending: false
    };
    if (this.props.images.length) {
      var newIndex = (this.state.currentIndex + 1) % this.props.images.length;
      newState.currentIndex = newIndex;
    }
    this.setState(newState);
  },

  getDefaultProps: function getDefaultProps() {
    return {
      images: [],
      timeout: 5000,
      startIndex: 0,
      onCarouselClick: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      currentIndex: this.props.startIndex,
      imageHovered: false,
      transitionPending: false
    };
  },

  onMouseOver: function onMouseOver() {
    this.setState({
      imageHovered: true
    });
  },

  onMouseLeave: function onMouseLeave() {
    this.setState({
      imageHovered: false
    });
    if (this.state.transitionPending) {
      this.nextImage();
      this.nextImageTimeout();
    }
  },

  onCarouselClick: function onCarouselClick(index) {
    if (this.props.onCarouselClick) {
      this.props.onCarouselClick(index);
    }
  },

  render: function render() {
    var _this2 = this;

    var images = this.props.images.map(function (img, idx) {
      var imgURL = img.url || img;
      var backgroundImage = {
        backgroundImage: 'url(' + imgURL + ')'
      };
      var onClickHandler = _this2.onCarouselClick.bind(_this2, idx);
      return _react2.default.createElement('div', { key: imgURL, className: (0, _classnames2.default)("carousel-image", {
          active: idx === _this2.state.currentIndex
        }), style: backgroundImage, onClick: onClickHandler });
    });
    return _react2.default.createElement(
      'div',
      { className: 'carousel-images' },
      images
    );
  }
});

exports.default = Carousel;

},{"classnames":"classnames","react":"react","react-dom":"react-dom","react-timer-mixin":"react-timer-mixin"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = exports.Loading = exports.Note = exports.Bold = exports.Break = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Break = exports.Break = _react2.default.createClass({
  displayName: 'Break',

  render: function render() {
    return _react2.default.createElement('div', _extends({}, this.props, { className: (0, _classnames2.default)("break", this.props.className) }));
  }
});

var Bold = exports.Bold = _react2.default.createClass({
  displayName: 'Bold',

  render: function render() {
    return _react2.default.createElement(
      'span',
      _extends({}, this.props, { className: (0, _classnames2.default)("bold", this.props.className) }),
      this.props.children
    );
  }
});

var Note = exports.Note = _react2.default.createClass({
  displayName: 'Note',

  render: function render() {
    return _react2.default.createElement(
      'span',
      { className: 'note' },
      this.props.children
    );
  }
});

var Loading = exports.Loading = _react2.default.createClass({
  displayName: 'Loading',

  getDefaultProps: function getDefaultProps() {
    return {
      size: 'small',
      inline: false
    };
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("loading", this.props.size, {
          inline: this.props.inline
        }) },
      _react2.default.createElement('span', { className: 'ion-load-c' })
    );
  }
});

var Button = exports.Button = _react2.default.createClass({
  displayName: 'Button',

  render: function render() {
    return _react2.default.createElement(
      'button',
      _extends({}, this.props, { className: (0, _classnames2.default)("btn", this.props.className) }),
      this.props.children
    );
  }
});

},{"classnames":"classnames","react":"react","react-timer-mixin":"react-timer-mixin"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Common = require('./Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Content = _react2.default.createClass({
  displayName: 'Content',

  componentDidUpdate: function componentDidUpdate() {
    var node = _reactDom2.default.findDOMNode(this);
    node.scrollTop = 0;
    var app = node.parentNode.parentNode;
    app.scrollTop = 0;
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'content' },
      this.props.children,
      _react2.default.createElement(_Common.Break, { className: 'mobile' })
    );
  }
});

exports.default = Content;

},{"./Common":4,"react":"react","react-dom":"react-dom"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _Mixins = require('./Mixins');

var _Common = require('./Common');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FAQ = _react2.default.createClass({
  displayName: 'FAQ',

  mixins: [_reactTimerMixin2.default, _Mixins.ScrollToMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      question: '?'
    };
  },

  getInitialState: function getInitialState() {
    return {
      expanded: false
    };
  },

  questionExpanded: false,

  componentDidUpdate: function componentDidUpdate() {
    if (this.questionExpanded) {
      var node = _reactDom2.default.findDOMNode(this);
      var content = node.parentNode.parentNode.parentNode;
      var app = content.parentNode.parentNode;
      this.scrollTo('content', content, node.offsetTop - 10, 300);
      this.scrollTo('app', app, node.offsetTop - 10, 300);
    } else {
      this.scrollCancel('content');
      this.scrollCancel('app');
    }
  },

  toggleQuestion: function toggleQuestion() {
    var expanded = !this.state.expanded;
    this.setState({
      expanded: expanded,
      classname: expanded ? 'expanded' : 'collapsed'
    });
    this.questionExpanded = expanded;
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("qa", this.state.classname) },
      _react2.default.createElement(
        'div',
        { className: 'question', onClick: this.toggleQuestion },
        _react2.default.createElement(
          _Common.Bold,
          null,
          this.props.question
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'answer' },
        this.props.children
      )
    );
  }
});

exports.default = FAQ;

},{"./Common":4,"./Mixins":14,"classnames":"classnames","react":"react","react-dom":"react-dom","react-timer-mixin":"react-timer-mixin"}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = _react2.default.createClass({
  displayName: "Footer",

  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "footer" },
      _react2.default.createElement(
        "span",
        { className: "email" },
        "email: ",
        _react2.default.createElement(
          "a",
          { href: "mailto:cestlacreme@gmail.com" },
          "cestlacreme@gmail.com"
        )
      ),
      _react2.default.createElement(
        "span",
        { className: "site" },
        "site: ",
        _react2.default.createElement(
          "a",
          { href: "http://bchanx.com", target: "_blank" },
          "@bchanx"
        )
      )
    );
  }
});

exports.default = Footer;

},{"react":"react"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleMapsEmbed = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GoogleMapsEmbed = exports.GoogleMapsEmbed = _react2.default.createClass({
  displayName: 'GoogleMapsEmbed',


  getDefaultProps: function getDefaultProps() {
    return {
      placeId: null
    };
  },

  render: function render() {
    return this.props.placeId ? _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("google-maps", this.props.className) },
      _react2.default.createElement('iframe', {
        width: '100%',
        height: '100%',
        frameBorder: '0',
        style: { border: '0' },
        allowFullScreen: true,
        src: "https://www.google.com/maps/embed/v1/place?q=place_id:" + this.props.placeId + "&key=" + "AIzaSyBC-AjnC8AeqQC2lLXAiOyDMln6RhwMhlA" })
    ) : null;
  }
});

},{"classnames":"classnames","react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Instagram = require('./Instagram');

var _Instagram2 = _interopRequireDefault(_Instagram);

var _Common = require('./Common');

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _GoogleMaps = require('./GoogleMaps');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = _react2.default.createClass({
  displayName: 'Home',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'home' },
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Common.Bold,
          null,
          'C\'est la Creme'
        ),
        ' is an online creme brulee shop, crafting quality desserts for lucky folks in the Vancouver area. Our goal is to source the freshest local ingredients and deliver an indulgence to your taste buds with every bite.'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_Instagram2.default, null),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(
        'div',
        { className: 'hidden' },
        _react2.default.createElement(
          'div',
          null,
          'We operate solely through online purchases, market pop-ups, and catering for events and weddings.'
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(
          _Common.Note,
          null,
          '*Please bear with us as we are limited by the current size of our operations and may sell out!*'
        ),
        _react2.default.createElement(_Common.Break, null),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _Common.Bold,
            null,
            'How it works:'
          ),
          ' Our online schedule runs bi-weekly, with orders closing every other Tuesday at 8pm. The following Thursday (two days later) is pickup day!',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          'Current pickup point is at the McDonalds parking lot next to the Main Skytrain station (1527 Main St, Vancouver, BC V6A 2W5). Pickup time is between 6pm - 7pm.'
        ),
        _react2.default.createElement(_GoogleMaps.GoogleMapsEmbed, { placeId: 'ChIJARg-smZxhlQRfhMPDMXsgL4' }),
        _react2.default.createElement(_Common.Break, null),
        _react2.default.createElement(
          'div',
          { className: 'pickup' },
          _react2.default.createElement(
            _Common.Bold,
            null,
            'Next scheduled pickup date:'
          ),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'div',
            { className: 'pickup-date' },
            _react2.default.createElement(
              _Common.Bold,
              null,
              'Thursday, February 25th, 6pm - 7pm'
            )
          )
        ),
        _react2.default.createElement(_Common.Break, null),
        _react2.default.createElement(
          'div',
          null,
          'Interested? Check out our\xA0',
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/menu' },
            'menu'
          ),
          '\xA0and see what\'s available for ordering!'
        )
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_Footer2.default, null)
    );
  }
});

exports.default = Home;

},{"./Common":4,"./Footer":7,"./GoogleMaps":8,"./Instagram":11,"react":"react","react-router":"react-router"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Common = require('./Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ImageOverlay = _react2.default.createClass({
  displayName: 'ImageOverlay',

  getDefaultProps: function getDefaultProps() {
    return {
      show: false,
      images: [],
      startIndex: 0,
      onClose: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      currentIndex: this.props.startIndex
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState({
      currentIndex: newProps.startIndex
    });
  },

  componentDidMount: function componentDidMount() {
    if (document) {
      document.addEventListener('keydown', this.handleKeydown, false);
      document.addEventListener('click', this.handleClick, false);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    if (document) {
      document.removeEventListener('keydown', this.handleKeydown, false);
      document.removeEventListener('click', this.handleClick, false);
    }
  },

  handleClick: function handleClick(event) {
    event && event.stopPropagation();
    if (event.target.classList.contains('image-overlay') || event.target.classList.contains('image-overlay-container')) {
      // Clicked on empty space, close overlay
      this.close();
    }
  },

  handleKeydown: function handleKeydown(event) {
    if (this.props.show) {
      if (event.keyCode === 27) {
        // Esc key
        this.close();
      } else if (event.keyCode === 37) {
        // Left
        this.gotoPrev();
      } else if (event.keyCode === 39) {
        // Right
        this.gotoNext();
      }
    }
  },

  close: function close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  },

  gotoNext: function gotoNext() {
    if (this.props.images.length) {
      this.setState({
        currentIndex: (this.state.currentIndex + 1) % this.props.images.length
      });
    }
  },

  gotoPrev: function gotoPrev() {
    if (this.props.images.length) {
      this.setState({
        currentIndex: (this.props.images.length + (this.state.currentIndex - 1)) % this.props.images.length
      });
    }
  },

  render: function render() {
    var backgroundImage = null;
    var timestamp = null;
    var description = null;
    var source = null;
    if (this.props.images.length > this.state.currentIndex) {
      var image = this.props.images[this.state.currentIndex];
      var imageURL = image.url || image;
      if (imageURL) {
        backgroundImage = {
          backgroundImage: 'url(' + imageURL + ')'
        };
      }
      timestamp = image.timestamp;
      description = image.description;
      source = image.source;
    }
    var hasMeta = timestamp || description || source;
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("image-overlay", {
          active: this.props.show
        }) },
      _react2.default.createElement(
        'div',
        { className: 'image-overlay-close', onClick: this.props.onClose },
        _react2.default.createElement('span', { className: 'ion-close' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'image-overlay-container' },
        this.props.images.length > 1 ? _react2.default.createElement(
          'div',
          { className: 'chevron left', onClick: this.gotoPrev },
          _react2.default.createElement('span', { className: 'ion-chevron-left' })
        ) : null,
        backgroundImage ? _react2.default.createElement(
          'div',
          { className: 'image-background' },
          _react2.default.createElement('div', { className: 'image-picture', style: backgroundImage }),
          hasMeta ? _react2.default.createElement(
            'div',
            { className: 'image-meta' },
            timestamp || source ? _react2.default.createElement(
              'div',
              { className: 'image-header' },
              timestamp ? _react2.default.createElement(
                'div',
                { className: 'image-timestamp' },
                _react2.default.createElement(
                  _Common.Bold,
                  null,
                  _moment2.default.unix(timestamp).fromNow()
                )
              ) : null,
              source ? _react2.default.createElement(
                'div',
                { className: 'image-source' },
                _react2.default.createElement(
                  'a',
                  { href: source, target: '_blank' },
                  'Source'
                )
              ) : null
            ) : null,
            description ? _react2.default.createElement(
              'div',
              { className: 'image-description' },
              description
            ) : null
          ) : null
        ) : null,
        this.props.images.length > 1 ? _react2.default.createElement(
          'div',
          { className: 'chevron right', onClick: this.gotoNext },
          _react2.default.createElement('span', { className: 'ion-chevron-right' })
        ) : null
      )
    );
  }
});

exports.default = ImageOverlay;

},{"./Common":4,"classnames":"classnames","moment":"moment","react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _Common = require('./Common');

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _ImageOverlay = require('./ImageOverlay');

var _ImageOverlay2 = _interopRequireDefault(_ImageOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Instagram = _react2.default.createClass({
  displayName: 'Instagram',

  getInitialState: function getInitialState() {
    return {
      recent: [],
      loading: true,
      showDefault: false,
      imageOverlayShow: false,
      imageOverlayStartIndex: 0
    };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    _superagent2.default.get(window.location.origin + '/instagram/recent').accept('json').end(function (error, response) {
      var newState = {
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
      _this.setState(newState);
    });
  },

  openOverlay: function openOverlay(index) {
    this.setState({
      imageOverlayShow: true,
      imageOverlayStartIndex: index
    });
  },

  onOverlayClose: function onOverlayClose() {
    this.setState({
      imageOverlayShow: false
    });
  },

  render: function render() {
    var _this2 = this;

    var instagramImages = this.state.recent.map(function (r, index) {
      var onClickHandler = _this2.openOverlay.bind(_this2, index);
      return _react2.default.createElement(
        'div',
        { className: 'instagram-image', key: r.source, onClick: onClickHandler },
        _react2.default.createElement(
          'div',
          { className: 'instagram-thumbnail' },
          _react2.default.createElement('img', { src: r.url })
        )
      );
    });
    var defaultImageURL = '/cestlacreme/images/default-brulee-low-min.jpg';
    var defaultImage = _react2.default.createElement('img', { className: 'default-image', src: defaultImageURL, onClick: this.openOverlay.bind(this, 0) });
    return _react2.default.createElement(
      'div',
      { className: 'instagram' },
      this.state.loading ? _react2.default.createElement(_Common.Loading, { size: 'large' }) : this.state.showDefault ? defaultImage : instagramImages,
      this.state.recent.length ? _react2.default.createElement(
        'div',
        { className: 'instagram-carousel' },
        _react2.default.createElement(_Carousel2.default, { images: this.state.recent, onCarouselClick: this.openOverlay })
      ) : null,
      _react2.default.createElement(_ImageOverlay2.default, {
        images: this.state.recent.length ? this.state.recent : [defaultImageURL],
        show: this.state.imageOverlayShow,
        startIndex: this.state.imageOverlayStartIndex,
        onClose: this.onOverlayClose })
    );
  }
});

exports.default = Instagram;

},{"./Carousel":3,"./Common":4,"./ImageOverlay":10,"react":"react","superagent":"superagent"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Common = require('./Common');

var _Stripe = require('./Stripe');

var _Stripe2 = _interopRequireDefault(_Stripe);

var _MenuItems = require('./MenuItems');

var _MenuItems2 = _interopRequireDefault(_MenuItems);

var _OrderSummary = require('./OrderSummary');

var _OrderSummary2 = _interopRequireDefault(_OrderSummary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRODUCT = {
  price: 500, // cents
  minimum: 4,
  maximum: 12
};

var Menu = _react2.default.createClass({
  displayName: 'Menu',

  getInitialState: function getInitialState() {
    return {
      selection: {
        vanilla: {
          name: 'Vanilla',
          value: 0
        },
        matcha: {
          name: 'Matcha',
          value: 0
        },
        earlgrey: {
          name: 'Earl Grey',
          value: 0
        }
      },
      disabled: false,
      orderSuccessful: null
    };
  },

  updateState: function updateState(state) {
    this.setState(state);
  },

  resetState: function resetState() {
    this.setState(this.getInitialState());
  },

  onSelectionChange: function onSelectionChange(name, val) {
    var selection = this.state.selection;
    selection[name].value = val.value;
    this.setState(selection);
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'menu' },
      _react2.default.createElement(
        'div',
        null,
        'Our creme brulee\'s are sold at a flat rate of $',
        PRODUCT.price / 100,
        ' each. However due to the nature of our business, we require at least ',
        PRODUCT.minimum,
        ' brulee\'s per order, meaning a ',
        _react2.default.createElement(
          _Common.Bold,
          null,
          'minimum $',
          PRODUCT.price / 100 * PRODUCT.minimum,
          ' purchase'
        ),
        '.',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        'Flavors can be mixed and matched to your preference.',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        '(For orders of more than a dozen, please ',
        _react2.default.createElement(
          'a',
          { href: 'mailto:cestlacreme@gmail.com' },
          'email us'
        ),
        ' to set up a specialty order.)'
      ),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_MenuItems2.default, {
        product: PRODUCT,
        selection: this.state.selection,
        onSelectionChange: this.onSelectionChange,
        disabled: this.state.disabled }),
      _react2.default.createElement(_OrderSummary2.default, {
        product: PRODUCT,
        selection: this.state.selection,
        orderSuccessful: this.state.orderSuccessful }),
      _react2.default.createElement(_Common.Break, null),
      _react2.default.createElement(_Stripe2.default, {
        product: PRODUCT,
        selection: this.state.selection,
        disabled: this.state.disabled,
        orderSuccessful: this.state.orderSuccessful,
        updateState: this.updateState,
        resetState: this.resetState })
    );
  }
});

exports.default = Menu;

},{"./Common":4,"./MenuItems":13,"./OrderSummary":16,"./Stripe":19,"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _Common = require('./Common');

var _Selection = require('./Selection');

var _Selection2 = _interopRequireDefault(_Selection);

var _ImageOverlay = require('./ImageOverlay');

var _ImageOverlay2 = _interopRequireDefault(_ImageOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItems = _react2.default.createClass({
  displayName: 'MenuItems',


  getDefaultProps: function getDefaultProps() {
    return {
      product: null,
      selection: null,
      onSelectionChange: null,
      disabled: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      overlayImages: [],
      imageOverlayShow: false,
      imageOverlayStartIndex: 0
    };
  },

  handleSelectChange: function handleSelectChange(name) {
    return function (val) {
      this.props.onSelectionChange(name, val);
    }.bind(this);
  },

  getImages: function getImages(type) {
    return ['ingredients', 'torched', 'spoon'].map(function (suffix) {
      return '/cestlacreme/images/' + type + '/' + type + '-' + suffix + '-low-min.jpg';
    });
  },

  openOverlay: function openOverlay(images, index) {
    this.setState({
      overlayImages: images,
      imageOverlayShow: true,
      imageOverlayStartIndex: index
    });
  },

  onOverlayClose: function onOverlayClose() {
    this.setState({
      imageOverlayShow: false
    });
  },

  render: function render() {
    var _this = this;

    return _react2.default.createElement(
      'div',
      { className: 'selection' },
      function () {
        return Object.keys(_this.props.selection).map(function (type) {
          var images = _this.getImages(type);
          var onClickHandler = _this.openOverlay.bind(_this, images);
          return _react2.default.createElement(
            'div',
            { key: type },
            _react2.default.createElement(_Selection2.default, {
              type: type,
              product: _this.props.product,
              selection: _this.props.selection,
              disabled: _this.props.disabled,
              onChange: _this.handleSelectChange(type),
              images: images,
              onClick: onClickHandler
            }),
            _react2.default.createElement(_Common.Break, null)
          );
        });
      }(),
      _react2.default.createElement(_ImageOverlay2.default, {
        images: this.state.overlayImages,
        show: this.state.imageOverlayShow,
        startIndex: this.state.imageOverlayStartIndex,
        onClose: this.onOverlayClose })
    );
  }
});

exports.default = MenuItems;

},{"./Common":4,"./ImageOverlay":10,"./Selection":17,"react":"react","react-select":"react-select"}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ScrollToMixin = exports.ScrollToMixin = {
  componentDidMount: function componentDidMount() {
    this._fn.requestAnimationFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback, element, delay) {
        this.setTimeout(callback, delay || 1000 / 60, new Date().getTime());
      };
    }();
  },

  _easing: function _easing(x) {
    return x < 0.5 ? Math.pow(x * 2, 2) / 2 : 1 - Math.pow((1 - x) * 2, 2) / 2;
  },

  _fn: {
    requestAnimationFrame: null
  },

  _scroll: {},

  _animateScroll: function _animateScroll(id, timestamp) {
    var s = this._scroll[id];
    if (s.cancel) {
      return;
    }
    if (s.start === null) {
      s.start = timestamp;
    }
    s.progress = timestamp - s.start;
    s.percent = s.progress >= s.duration ? 1 : this._easing(s.progress / s.duration);
    s.currentY = s.startY + Math.ceil(s.delta * s.percent);
    s.element.scrollTop = s.currentY;

    if (s.percent < 1) {
      this._fn.requestAnimationFrame.call(window, this._animateScroll.bind(this, id));
    }
  },

  scrollTo: function scrollTo(id, element, y, duration) {
    if (id) {
      if (!this._scroll[id]) {
        this._scroll[id] = {};
      }
      var s = this._scroll[id];
      s.start = null;
      s.cancel = false;
      s.element = element;
      s.startY = element.scrollTop;
      s.targetY = y;
      s.delta = Math.round(s.targetY - s.startY);
      s.duration = duration;
      s.progress = 0;
      if (this._fn.requestAnimationFrame) {
        this._fn.requestAnimationFrame.call(window, this._animateScroll.bind(this, id));
      }
    }
  },

  scrollCancel: function scrollCancel(id) {
    if (id && this._scroll[id]) {
      this._scroll[id].cancel = true;
    }
  }
};

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Social = require('./Social');

var _Social2 = _interopRequireDefault(_Social);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = _react2.default.createClass({
  displayName: 'Navigation',

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'nav' },
      _react2.default.createElement(
        'div',
        { className: 'nav-brand' },
        _react2.default.createElement(
          _reactRouter.IndexLink,
          { to: '/' },
          _react2.default.createElement('div', { className: 'nav-logo' })
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'nav-links' },
        _react2.default.createElement(
          'div',
          { className: 'nav-link' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/menu', activeClassName: 'active' },
            'menu'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'nav-link' },
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/about', activeClassName: 'active' },
            'about'
          )
        )
      ),
      _react2.default.createElement(_Social2.default, null)
    );
  }
});

exports.default = Navigation;

},{"./Social":18,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Common = require('./Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderSummary = _react2.default.createClass({
  displayName: 'OrderSummary',

  getDefaultProps: function getDefaultProps() {
    return {
      product: null,
      selection: null,
      orderSuccessful: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var totalSelected = Object.keys(nextProps.selection).map(function (type) {
      return nextProps.selection[type].value;
    }).reduce(function (a, b) {
      return a + b;
    });
    var success = nextProps.orderSuccessful;
    var totalCharged = ((success && success.charge && success.charge.amount || totalSelected * this.props.product.price) / 100).toFixed(2);
    this.setState({
      totalSelected: totalSelected,
      totalCharged: totalCharged
    });
  },

  getInitialState: function getInitialState() {
    return {
      totalSelected: 0,
      totalCharged: 0.00
    };
  },

  render: function render() {
    var _this = this;

    var items = Object.keys(this.props.selection);
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("order-summary", {
          success: this.props.orderSuccessful
        }) },
      _react2.default.createElement(
        'div',
        { className: 'order-icon' },
        _react2.default.createElement('span', { className: 'ion-spoon' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'order-title' },
        _react2.default.createElement(
          _Common.Bold,
          null,
          !this.state.totalSelected ? _react2.default.createElement(
            'span',
            { className: 'warning' },
            'You currently have no items selected.'
          ) : this.props.orderSuccessful ? 'You have successfully ordered:' : 'You have currently selected:'
        )
      ),
      this.state.totalSelected ? _react2.default.createElement(
        'div',
        null,
        function () {
          return items.filter(function (itm) {
            return _this.props.selection[itm].value;
          }).map(function (itm) {
            return _react2.default.createElement(
              'div',
              { key: itm, className: 'order-item' },
              _this.props.selection[itm].name,
              ' x ',
              _this.props.selection[itm].value,
              _react2.default.createElement(
                'span',
                { className: 'order-price' },
                '$',
                (_this.props.selection[itm].value * _this.props.product.price / 100).toFixed(2)
              )
            );
          });
        }(),
        _react2.default.createElement(
          'div',
          { className: 'order-total' },
          this.state.totalSelected < this.props.product.minimum ? _react2.default.createElement(
            'div',
            { className: 'order-warning' },
            _react2.default.createElement(
              _Common.Note,
              null,
              _react2.default.createElement(
                _Common.Bold,
                null,
                '*Minimum $20.00 required*'
              )
            )
          ) : null,
          _react2.default.createElement(
            _Common.Bold,
            null,
            'Total: $',
            this.state.totalCharged
          )
        )
      ) : null
    );
  }
});

exports.default = OrderSummary;

},{"./Common":4,"classnames":"classnames","react":"react"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Selection = _react2.default.createClass({
  displayName: 'Selection',


  getDefaultProps: function getDefaultProps() {
    return {
      type: null, // earlgrey
      images: null,
      selection: null,
      product: null,
      onChange: null,
      disabled: false,
      onClick: null
    };
  },

  getOptions: function getOptions() {
    var _this = this;

    var othersSelected = Object.keys(this.props.selection).filter(function (s) {
      return s !== _this.props.type;
    }).map(function (s) {
      return _this.props.selection[s].value;
    }).reduce(function (a, b) {
      return a + b;
    });
    var options = [];
    for (var i = 0; i <= this.props.product.maximum - othersSelected; i++) {
      options.push({
        value: i,
        label: String(i)
      });
    }
    return options;
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'menu-images' },
        _react2.default.createElement(_Carousel2.default, {
          images: this.props.images,
          onCarouselClick: this.props.onClick })
      ),
      _react2.default.createElement(
        'div',
        { className: 'menu-options' },
        _react2.default.createElement(
          'div',
          { className: 'menu-caption' },
          this.props.selection[this.props.type].name
        ),
        _react2.default.createElement(_reactSelect2.default, {
          name: this.props.type + '-select',
          searchable: false,
          clearable: false,
          value: this.props.selection[this.props.type].value,
          options: this.getOptions(),
          onChange: this.props.onChange,
          disabled: this.props.disabled
        })
      )
    );
  }
});

exports.default = Selection;

},{"./Carousel":3,"classnames":"classnames","react":"react","react-select":"react-select"}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Social = _react2.default.createClass({
  displayName: "Social",

  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "nav-social" },
      _react2.default.createElement("a", { href: "https://www.instagram.com/cestlacreme/", target: "_blank", className: "ion-icon ion-social-instagram" }),
      _react2.default.createElement("a", { href: "https://www.facebook.com/cestlacreme", target: "_blank", className: "ion-icon ion-social-facebook" }),
      _react2.default.createElement("a", { href: "https://www.twitter.com/cestlacreme", target: "_blank", className: "ion-icon ion-social-twitter" })
    );
  }
});

exports.default = Social;

},{"react":"react"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactScriptLoader = require('react-script-loader');

var _reactCreditCard = require('react-credit-card');

var _reactCreditCard2 = _interopRequireDefault(_reactCreditCard);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _emailValidator = require('email-validator');

var _emailValidator2 = _interopRequireDefault(_emailValidator);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _Common = require('./Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StripeReact = _react2.default.createClass({
  displayName: 'StripeReact',

  mixins: [_reactScriptLoader.ReactScriptLoaderMixin, _reactTimerMixin2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      product: null,
      selection: null,
      disabled: false,
      orderSuccessful: null,
      updateState: null,
      resetState: null,
      formParams: [{
        type: 'number',
        placeholder: 'Card number'
      }, {
        type: 'name',
        placeholder: 'Full name'
      }, {
        type: 'expiry',
        placeholder: 'MM/YY'
      }, {
        type: 'cvc',
        placeholder: 'CVC'
      }, {
        type: 'email',
        placeholder: 'Email'
      }, {
        type: 'coupon',
        placeholder: 'Coupon code (optional)'
      }, {
        type: 'comments',
        placeholder: 'Additional comments (optional)',
        textarea: true
      }],
      cardDisclosure: 'We do not store any credit card information on our servers. All payments are securely handled with Stripe. Learn more at stripe.com/about.'
    };
  },

  // Internal state
  _: {},
  getInternalState: function getInternalState() {
    this._ = {
      mounted: false,
      paymentsToggleClicked: false,
      input: {
        number: null,
        name: null,
        expiry: null,
        cvc: null
      },
      backslash: {
        add: false,
        remove: false
      }
    };
  },

  getInitialState: function getInitialState(opt_force) {
    // Get internal state
    this.getInternalState();
    return {
      loading: !!opt_force ? false : true,
      loadingError: false,
      totalSelected: 0,
      showPayments: false,
      form: {
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        email: '',
        coupon: '',
        comments: ''
      },
      focused: 'number',
      error: null
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var totalSelected = Object.keys(nextProps.selection).map(function (type) {
      return nextProps.selection[type].value;
    }).reduce(function (a, b) {
      return a + b;
    });
    var isValidOrder = totalSelected >= this.props.product.minimum && totalSelected <= this.props.product.maximum;
    this.setState({
      totalSelected: totalSelected,
      isValidOrder: isValidOrder,
      showPayments: this.state.showPayments && isValidOrder
    });
  },

  getScriptURL: function getScriptURL() {
    return 'https://js.stripe.com/v2/';
  },

  onScriptLoaded: function onScriptLoaded() {
    if (this._.mounted) {
      var ready = Stripe && "pk_test_IaT5HSSG1P7dpsq44cKF4Ypr";
      this.setState({
        loading: false,
        loadingError: !ready
      });
      if (ready) {
        Stripe.setPublishableKey("pk_test_IaT5HSSG1P7dpsq44cKF4Ypr");
      }
    }
  },

  onScriptError: function onScriptError() {
    if (this._.mounted) {
      this.setState({
        loading: false,
        loadingError: true
      });
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._.mounted = false;
  },

  componentWillMount: function componentWillMount() {
    this._.mounted = true;
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this._.paymentsToggleClicked) {
      if (this.state.showPayments) {
        var node = _reactDom2.default.findDOMNode(this).parentNode.parentNode;
        node.scrollTop = node.scrollHeight;
        var focus = this.state.error && this.state.error.type || 'number';
        if (this._.input[focus]) {
          this._.input[focus].focus();
        }
      }
      this._.paymentsToggleClicked = false;
    }
  },

  togglePayments: function togglePayments(event) {
    event && event.preventDefault();
    if (this.state.isValidOrder) {
      this._.paymentsToggleClicked = true;
      this.setState({
        showPayments: !this.state.showPayments
      });
    }
  },

  resetOrder: function resetOrder(event) {
    event && event.preventDefault();
    this.props.resetState();
    this.setState(this.getInitialState(true));
  },

  focusError: function focusError(error) {
    error = error || this.state.error;
    if (this._.input[error.type]) {
      this._.input[error.type].focus();
    }
    this.scrollToBottom();
  },

  onFormChange: function onFormChange(type, event) {
    if (!this.props.disabled) {
      var form = this.state.form;
      form[type] = event.target.value;
      if (type === 'expiry') {
        if (this._.backslash.add) {
          event.target.value += '/';
          form[type] = event.target.value;
          this._.backslash.add = false;
        } else if (this._.backslash.remove) {
          event.target.value = event.target.value.slice(0, event.target.value.length - 1);
          form[type] = event.target.value;
          this._.backslash.remove = false;
        }
      }
      this.setState(form);
    }
  },

  onFocusChange: function onFocusChange(type) {
    if (!this.props.disabled) {
      this.setState({
        focused: type
      });
    }
  },

  validateForm: function validateForm() {
    var error = null;
    if (!Stripe.card.validateCardNumber(this.state.form.number)) {
      error = {
        type: 'number',
        message: 'Card number is invalid.'
      };
    } else if (!this.state.form.name) {
      error = {
        type: 'name',
        message: 'Name is invalid.'
      };
    } else if (!Stripe.card.validateExpiry(this.state.form.expiry)) {
      error = {
        type: 'expiry',
        message: 'Expiry is invalid.'
      };
    } else if (!Stripe.card.validateCVC(this.state.form.cvc)) {
      error = {
        type: 'cvc',
        message: 'CVC is invalid.'
      };
    } else if (!_emailValidator2.default.validate(this.state.form.email)) {
      error = {
        type: 'email',
        message: 'Email is invalid.'
      };
    }
    // Returns error if any, otherwise null
    return error;
  },

  scrollToBottom: function scrollToBottom() {
    var _this = this;

    this.setTimeout(function () {
      var node = _reactDom2.default.findDOMNode(_this);
      var content = node.parentNode.parentNode;
      content.scrollTop = content.scrollHeight;
      var app = content.parentNode.parentNode;
      app.scrollTop = app.scrollHeight;
    }, 50);
  },

  submitOrder: function submitOrder(event) {
    event && event.preventDefault();
    if (!this.state.isValidOrder) {
      this.setState({
        error: {
          message: 'Order selection is invalid.'
        }
      });
      return;
    }

    // Reset errors
    this.setState({
      error: null
    });
    var error = this.validateForm();
    if (error) {
      // Show error
      this.setState({
        error: error
      });
      this.focusError(error);
    } else {
      // Things look good, submit!
      this.props.updateState({
        disabled: true
      });
      this.scrollToBottom();

      // Disable payments
      /*
      Stripe.card.createToken({
        number: this.state.form.number,
        name: this.state.form.name,
        exp: this.state.form.expiry,
        cvc: this.state.form.cvc
      }, this.onCreateResponse);*/
    }
  },

  onCreateResponse: function onCreateResponse(status, response) {
    var _this2 = this;

    if (response.error) {
      // Stripe error
      this.props.updateState({
        disabled: false
      });
      this.setState({
        error: response.error
      });
      this.scrollToBottom();
    } else {
      // Send form data to server for charge
      _superagent2.default.post(window.location.origin + '/stripe/order').send({
        stripeToken: response.id,
        created: response.created,
        livemode: response.livemode,
        email: this.state.form.email,
        coupon: this.state.form.coupon,
        comments: this.state.form.comments,
        selection: this.props.selection
      }).accept('json').end(function (error, response) {
        if (response && response.body && response.body.error) {
          // Charge failed.
          error = response.body.error;
        } else if (!(response && response.body && response.body.success)) {
          // No valid response body...
          error = {
            message: 'The charge could not be made.'
          };
        }
        if (error) {
          // Could also be network error. Make sure error message is present.
          error.message = error.message || 'Something went wrong.';
          _this2.focusError(error);
        }
        _this2.setState({
          error: error,
          showPayments: !!error
        });
        _this2.props.updateState({
          disabled: !error,
          orderSuccessful: !error ? response.body : null
        });
      });
    }
  },

  onBlurChange: function onBlurChange(type) {
    if (!this.props.disabled && type === 'cvc') {
      this.setState({
        focused: 'number'
      });
    }
  },

  onFormMount: function onFormMount(type, input) {
    if (input) {
      this._.input[type] = input;
    }
  },

  _validKeys: [8, // backspace
  9, // tab
  13, // enter
  37, 38, 39, 40],

  _validNumbers: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57 // 0-9
  ],

  _validActions: [65, // a
  67, // c
  86, // v
  88, // x
  90 // z
  ],

  onKeyDown: function onKeyDown(type, event) {
    if (type === 'number' || type === 'expiry' || type === 'cvc') {
      // Restrict number input keys
      var keyCode = event.keyCode;
      var isValidKey = this._validKeys.indexOf(keyCode) >= 0;
      var isValidNumber = this._validNumbers.indexOf(keyCode) >= 0;
      if (!isValidKey && !isValidNumber) {
        // Not a valid key
        var isValidAction = this._validActions.indexOf(keyCode) >= 0;
        if (!((event.ctrlKey || event.metaKey) && isValidAction)) {
          // Not a valid action either
          event.preventDefault();
        }
      } else if ((event.shiftKey || event.altKey) && isValidNumber) {
        // No shift numbers
        event.preventDefault();
      } else if (isValidNumber) {
        // We're adding a number!
        var length = event.target.value.length;
        if (type === 'number' && length >= 16) {
          // Restrict maximum card # to 16 digits
          event.preventDefault();
        } else if (type === 'expiry') {
          if (length >= 7) {
            // Max expiry is 7 "MM/YYYY"
            event.preventDefault();
          } else if (length === 1) {
            // Insert backslash after change
            this._.backslash.add = true;
          }
        } else if (type === 'cvc') {
          if (length >= 4) {
            // Max CVC is 4
            event.preventDefault();
          }
        }
      } else if (keyCode === 8 && type === 'expiry') {
        if (event.target.value.length === 3 && event.target.value[2] === '/') {
          // Special handling to remove backslash after change
          this._.backslash.remove = true;
        }
      }
    }
  },

  getFormParams: function getFormParams() {
    var _this3 = this;

    return this.props.formParams.map(function (p) {
      var type = p.type;
      var placeholder = p.placeholder;
      var onChangeHandler = _this3.onFormChange.bind(_this3, type);
      var onFocusHandler = _this3.onFocusChange.bind(_this3, type);
      var onBlurHandler = _this3.onBlurChange.bind(_this3, type);
      var formMountHandler = _this3.onFormMount.bind(_this3, type);
      var onKeyDownHandler = _this3.onKeyDown.bind(_this3, type);
      return p.textarea ? _react2.default.createElement('textarea', {
        key: type,
        name: type,
        className: 'stripe-textarea',
        value: _this3.state.form[type],
        placeholder: placeholder,
        disabled: _this3.props.disabled,
        onChange: onChangeHandler,
        onFocus: onFocusHandler
      }) : _react2.default.createElement('input', {
        key: type,
        type: 'text',
        className: (0, _classnames2.default)("stripe-input", {
          error: _this3.state.error && _this3.state.error.type === type
        }),
        placeholder: placeholder,
        disabled: _this3.props.disabled,
        name: type,
        value: _this3.state.form[type],
        onChange: onChangeHandler,
        onFocus: onFocusHandler,
        onBlur: onBlurHandler,
        onKeyDown: onKeyDownHandler,
        ref: formMountHandler });
    });
  },

  loadingMessages: ['Preparing Eggs', 'Adding Vanilla', 'Blending Cream', 'Caramelizing Sugar'],

  getLoadingMessage: function getLoadingMessage() {
    return this.loadingMessages[Math.floor(Math.random() * this.loadingMessages.length)] + '...';
  },

  render: function render() {
    var payment = _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("stripe-payment", {
            active: this.state.showPayments
          }) },
        _react2.default.createElement(
          'div',
          { className: 'stripe-card' },
          _react2.default.createElement(_reactCreditCard2.default, {
            number: this.state.form.number,
            name: this.state.form.name,
            expiry: this.state.form.expiry,
            cvc: this.state.form.cvc,
            focused: this.state.focused,
            shinyAfterBack: this.props.cardDisclosure })
        ),
        _react2.default.createElement(
          'form',
          { className: 'stripe-form' },
          this.getFormParams(),
          this.state.error ? _react2.default.createElement(
            'div',
            { className: 'stripe-form-error' },
            _react2.default.createElement(
              _Common.Note,
              null,
              _react2.default.createElement(
                _Common.Bold,
                null,
                this.state.error.message
              )
            )
          ) : null,
          _react2.default.createElement(
            _Common.Button,
            { className: 'btn-success', onClick: this.submitOrder, disabled: true },
            this.props.disabled ? this.getLoadingMessage() : 'Place Order',
            this.props.disabled ? _react2.default.createElement(_Common.Loading, { inline: true }) : null
          ),
          _react2.default.createElement(
            _Common.Button,
            { className: 'btn-default', onClick: this.togglePayments, disabled: this.props.disabled },
            'Cancel'
          )
        )
      ),
      this.props.orderSuccessful ? _react2.default.createElement(
        'div',
        { className: 'stripe-success' },
        _react2.default.createElement(
          'div',
          { className: 'stripe-success-text' },
          'Hurray! Your order was successfully created! ',
          _react2.default.createElement('span', { className: 'ion-checkmark' }),
          _react2.default.createElement('br', null),
          this.props.orderSuccessful.coupon ? _react2.default.createElement(
            'div',
            null,
            'Coupon code ',
            _react2.default.createElement(
              _Common.Bold,
              null,
              this.props.orderSuccessful.coupon
            ),
            ' was applied.',
            _react2.default.createElement('br', null)
          ) : null,
          'Your order number is ',
          _react2.default.createElement(
            _Common.Bold,
            { className: 'stripe-order-number' },
            this.props.orderSuccessful.orderNumber
          ),
          '.',
          _react2.default.createElement('br', null),
          'A receipt has been sent to ',
          _react2.default.createElement(
            _Common.Bold,
            null,
            this.state.form.email
          ),
          '.'
        ),
        _react2.default.createElement(
          _Common.Button,
          { className: 'btn-success', onClick: this.resetOrder },
          'Make another order?'
        )
      ) : !this.state.showPayments ? _react2.default.createElement(
        'div',
        { className: 'stripe-ready' },
        _react2.default.createElement(
          _Common.Button,
          { className: (0, _classnames2.default)({
              "btn-default": !this.state.isValidOrder,
              "btn-success": this.state.isValidOrder
            }), onClick: this.togglePayments, disabled: !this.state.isValidOrder },
          'Ready to order?'
        )
      ) : null
    );

    // Disable payments
    /*
    payment = (
      <div>
        We are no longer accepting payments at this time.
        <br/>
        Please <a href="mailto:cestlacreme@gmail.com">contact us</a> if you would like to request a custom order.
        <br/>
        <br/>
        Thank you for your interest.
      </div>
    );*/
    return _react2.default.createElement(
      'div',
      { className: 'stripe' },
      this.state.loading ? _react2.default.createElement(
        _Common.Button,
        { disabled: 'true' },
        'Payments Loading...'
      ) : this.state.loadingError ? _react2.default.createElement(
        _Common.Button,
        { className: 'btn-danger' },
        'Payments Error'
      ) : payment
    );
  }
});

exports.default = StripeReact;

},{"./Common":4,"classnames":"classnames","email-validator":"email-validator","react":"react","react-credit-card":"react-credit-card","react-dom":"react-dom","react-script-loader":"react-script-loader","react-timer-mixin":"react-timer-mixin","superagent":"superagent"}],20:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _routes2.default
), document.getElementById('app'));

},{"./routes":21,"react":"react","react-dom":"react-dom","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _About = require('./components/About');

var _About2 = _interopRequireDefault(_About);

var _Menu = require('./components/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _App2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/menu', component: _Menu2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/about', component: _About2.default })
);

exports.default = routes;

},{"./components/About":1,"./components/App":2,"./components/Home":9,"./components/Menu":12,"react":"react","react-router":"react-router"}]},{},[20]);
