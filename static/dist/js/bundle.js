(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _Content = require('./Content');

var _Content2 = _interopRequireDefault(_Content);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _Content2.default,
        null,
        this.props.children
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;

},{"./Content":2,"react":"react","react-router":"react-router"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

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
      this.props.children
    );
  }
});

exports.default = Content;

},{"react":"react","react-dom":"react-dom"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Logo = require('./Logo');

var _Logo2 = _interopRequireDefault(_Logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'bchanx' },
        _react2.default.createElement(
          'div',
          { id: 'banner' },
          _react2.default.createElement(
            'div',
            { id: 'bchanx-logo' },
            _react2.default.createElement(_Logo2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { id: 'bchanx-text' },
            'bchanx'
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'projects' },
          _react2.default.createElement(
            'a',
            { href: '/9kmmr' },
            '9k MMR'
          ),
          ' (2017)',
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'a',
            { href: 'http://www.cestlacreme.ca', target: '_blank' },
            'C\'est la Creme'
          ),
          ' (2016)',
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'a',
            { href: '/animated-gameboy-in-css' },
            'Animated Gameboy in CSS'
          ),
          ' (2015)',
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'a',
            { href: '/slidr' },
            'slidr.js'
          ),
          ' (2014)',
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'a',
            { href: '/logos-in-pure-css' },
            'Logos in Pure CSS'
          ),
          ' (2013)'
        ),
        _react2.default.createElement(
          'div',
          { id: 'social' },
          _react2.default.createElement('a', { href: 'https://www.twitter.com/bchanx', className: 'ion-social-twitter' }),
          _react2.default.createElement('a', { href: 'https://www.instagram.com/bchanx', className: 'ion-social-instagram' }),
          _react2.default.createElement('a', { href: 'https://www.github.com/bchanx', className: 'ion-social-github' }),
          _react2.default.createElement('a', { href: 'https://www.linkedin.com/bchanx', className: 'ion-social-linkedin' })
        )
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = Home;

},{"./Logo":4,"react":"react"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = _react2.default.createClass({
  displayName: "Logo",

  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "logo-bchanx" },
      _react2.default.createElement(
        "div",
        { className: "logo-content themeable" },
        _react2.default.createElement(
          "div",
          { className: "logo-text" },
          _react2.default.createElement("div", { className: "logo-b" })
        ),
        _react2.default.createElement(
          "div",
          { className: "logo-pic" },
          _react2.default.createElement("img", { src: "http://www.gravatar.com/avatar/c43834b8380872e2bca1bf624c6a693f.jpg" })
        )
      )
    );
  }
});

exports.default = Logo;

},{"react":"react"}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Debounce = exports.Debounce = {
  debounce: function debounce(fn, delay) {
    var timer = null;
    var inProgress = false;

    var debounced = function debounced() {
      var args = arguments;
      if (inProgress) {
        this.clearTimeout(timer);
      }
      inProgress = true;
      timer = this.setTimeout(function () {
        inProgress = false;
        fn.apply(undefined, _toConsumableArray(args));
      }, delay);
    };

    return debounced;
  }
};

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controls = _react2.default.createClass({
  displayName: 'Controls',


  getDefaultProps: function getDefaultProps() {
    return {
      style: null,
      current: {},
      controls: {},
      overlay: {},
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      playPauseDisabled: false,
      muteDisabled: false,
      previousDisabled: false,
      nextDisabled: false,
      repeatDisabled: false,
      shuffleDisabled: false,
      playlistDisabled: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var mediaValid = nextProps.current.media.id && nextProps.current.media.type !== _actionTypes.MEDIA_TYPES.UNKNOWN;
    var endReached = !mediaValid && !nextProps.current.queue.length && (!nextProps.current.order.length || nextProps.current.index === nextProps.current.order.length);

    // Now set the control states
    this.setState({
      playPauseDisabled: !mediaValid || nextProps.current.isInvalid || nextProps.overlay.show,
      muteDisabled: endReached,
      previousDisabled: nextProps.current.source === _actionTypes.SOURCES.QUEUE || !nextProps.current.index,
      nextDisabled: endReached,
      repeatDisabled: endReached || nextProps.current.isInvalid || nextProps.overlay.show,
      shuffleDisabled: nextProps.current.isInvalid || nextProps.overlay.show || !nextProps.current.order.length,
      playlistDisabled: !(nextProps.current.order.length || nextProps.current.queue.length)
    });
  },

  playPause: function playPause() {
    if (!this.state.playPauseDisabled) {
      this.props.dispatch(this.props.current.isPlaying ? (0, _actions.pause)(true) : (0, _actions.play)(true));
    }
  },

  mute: function mute() {
    if (!this.state.muteDisabled) {
      this.props.dispatch(this.props.current.isMuted ? (0, _actions.unmute)(true) : (0, _actions.mute)(true));
    }
  },

  previous: function previous() {
    if (!this.state.previousDisabled) {
      this.props.dispatch((0, _actions.hideOverlay)(), (0, _actions.playPrev)());
    }
  },

  next: function next() {
    if (!this.state.nextDisabled) {
      this.props.dispatch((0, _actions.hideOverlay)(), (0, _actions.playNext)());
    }
  },

  repeat: function repeat() {
    if (!this.state.repeatDisabled) {
      this.props.dispatch((0, _actions.repeat)());
    }
  },

  shuffle: function shuffle() {
    if (!this.state.shuffleDisabled) {
      this.props.dispatch((0, _actions.shuffle)());
    }
  },

  playlist: function playlist() {
    if (!this.state.playlistDisabled) {
      this.props.dispatch((0, _actions.playlist)(), (0, _actions.videoShowing)(true));
    }
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("controls", {
          hidden: this.props.current.media.type === _actionTypes.MEDIA_TYPES.UNKNOWN && this.props.current.source === _actionTypes.SOURCES.UNKNOWN
        }), style: this.props.style },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("play-pause-button", {
            disabled: this.state.playPauseDisabled
          }), onClick: this.playPause },
        _react2.default.createElement('span', { className: (0, _classnames2.default)({
            'ion-ios-play': !this.props.current.isPlaying,
            'ion-ios-pause': this.props.current.isPlaying
          }) })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("mute-button", {
            disabled: this.state.muteDisabled
          }), onClick: this.mute },
        _react2.default.createElement('span', { className: (0, _classnames2.default)({
            'ion-android-volume-up': !this.props.current.isMuted,
            'ion-android-volume-off': this.props.current.isMuted
          }) })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("prev-button", {
            disabled: this.state.previousDisabled
          }), onClick: this.previous },
        _react2.default.createElement('span', { className: 'ion-ios-skipbackward' })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("next-button", {
            disabled: this.state.nextDisabled
          }), onClick: this.next },
        _react2.default.createElement('span', { className: 'ion-ios-skipforward' })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("repeat-button", {
            active: this.props.controls.repeat,
            disabled: this.state.repeatDisabled
          }), onClick: this.repeat },
        _react2.default.createElement('span', { className: 'ion-ios-loop-strong' })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("shuffle-button", {
            active: this.props.controls.shuffle,
            disabled: this.state.shuffleDisabled
          }), onClick: this.shuffle },
        _react2.default.createElement('span', { className: 'ion-ios-shuffle-strong' })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("playlist-button", {
            active: this.props.controls.playlist,
            disabled: this.state.playlistDisabled
          }), onClick: this.playlist },
        _react2.default.createElement('span', { className: 'ion-ios-list-outline' })
      )
    );
  }
});

exports.default = Controls;

},{"./redux/actionTypes":22,"./redux/actions":23,"classnames":"classnames","react":"react"}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Playlists = require('./Playlists');

var _Playlists2 = _interopRequireDefault(_Playlists);

var _VideoPlayer = require('./VideoPlayer');

var _VideoPlayer2 = _interopRequireDefault(_VideoPlayer);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _Slidr = require('./Slidr');

var _Slidr2 = _interopRequireDefault(_Slidr);

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

var _reducers = require('./redux/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Jukebox = _react2.default.createClass({
  displayName: 'Jukebox',


  mixins: [_reactTimerMixin2.default],

  getInitialState: function getInitialState() {
    return {
      current: {
        isPlaying: false,
        isMuted: false,
        isInvalid: false,
        isFullscreen: false,
        isVideoShowing: true,
        source: _actionTypes.SOURCES.UNKNOWN,
        playStates: [],
        index: null,
        playlist: {
          type: _actionTypes.PLAYLIST_TYPES.UNKNOWN,
          index: null,
          name: ''
        },
        order: [],
        queue: [],
        media: {
          id: null,
          type: _actionTypes.MEDIA_TYPES.UNKNOWN,
          title: '',
          duration: ''
        }
      },
      controls: {
        play: false,
        pause: false,
        mute: false,
        unmute: false,
        repeat: false,
        shuffle: true,
        playlist: false
      },
      overlay: {
        show: false,
        duration: 0,
        action: null
      },
      search: {
        expand: false,
        focus: false
      },
      playlists: {
        global: [{
          name: 'Number two',
          created: Date.now(),
          modified: Date.now(),
          media: [{
            id: "m4RbODbWRVI",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "BwWzSyxNc9I",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }]
        }, {
          name: 'EDM',
          created: Date.now(),
          modified: Date.now(),
          media: [{
            id: "JbH_Vn5pq8I",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'Hey there!',
            duration: '3:22'
          }, {
            id: "Csm3BX30jZQ",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'yo yo',
            duration: '1:23'
          }, {
            id: "Rhm_-gMbTGU",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'hi',
            duration: '3:33'
          }, {
            id: "cERIwGKSU1A",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "XWBEbR47Kwc",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fifth',
            duration: '5:55'
          }, {
            id: "2EaE0_gQLw0",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "Qsy7kJyizoc",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "Vsy1URDYK88",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "nT3pHuebr4U",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "hT_nvWreIhg",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "OIRE6iw-ws4",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "WFkCO4jVRg4",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "uJorl7V3uNk",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "qXuuh49aF1M",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "YaikPv034Hc",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "wxvz_w2JUkU",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "OPf0YbXqDm0",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }, {
            id: "WoCfFoQeWoU",
            type: _actionTypes.MEDIA_TYPES.YOUTUBE,
            title: 'fourth',
            duration: '4:44'
          }]
        }],
        personal: []
      }
    };
  },

  _shouldUpdate: false,

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var result = this._shouldUpdate;
    this._shouldUpdate = false;
    return result;
  },

  forceUpdate: function forceUpdate(state) {
    this._shouldUpdate = true;
    this.setState(state);
  },

  dispatch: function dispatch() {
    var _this = this;

    for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
      actions[_key] = arguments[_key];
    }

    if (actions && actions.length) {
      (function () {
        var newState = _this.state;
        actions.forEach(function (action) {
          if (action) {
            newState = (0, _reducers2.default)(newState, action);
          }
        });
        _this.forceUpdate(newState);
      })();
    }
  },

  slidr: {
    ref: null,
    loaded: false,
    timer: null
  },

  slidrHandler: function slidrHandler(e) {
    var _this2 = this;

    if (!this.slidr.timer) {
      this.slidr.timer = this.setTimeout(function () {
        if (e.out.slidr === 'video-player') {
          _this2.dispatch((0, _actions.videoShowing)(false));
        } else if (e.in.slidr === 'video-player') {
          _this2.dispatch((0, _actions.videoShowing)(true));
        }
        _this2.slidr.timer = null;
      }, 100);
    }
  },

  slidrCreate: function slidrCreate(slidr) {
    var _this3 = this;

    if (!this.slidr.ref) {
      this.slidr.ref = slidr.create('jukebox-slidr', {
        transition: 'cube',
        overflow: true,
        controls: 'border',
        keyboard: false,
        theme: '#e8e8e8',
        before: this.slidrHandler,
        after: this.slidrHandler
      }).add('h', ['playlists', 'video-player', 'playlists']).start('playlists');
      this.setTimeout(function () {
        _this3.slidr.loaded = true;
        _this3._shouldUpdate = true;
        _this3.setState(_this3.state);
      }, 200);
    }
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'jukebox-container' },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("jukebox", {
            active: this.slidr.loaded
          }) },
        _react2.default.createElement(
          _Slidr2.default,
          { id: 'jukebox-slidr', className: this.state.current.isVideoShowing ? '' : 'video-not-showing', onLoaded: this.slidrCreate },
          _react2.default.createElement(_Playlists2.default, {
            current: this.state.current,
            playlists: this.state.playlists,
            slidr: this.slidr.ref,
            dispatch: this.dispatch
          }),
          _react2.default.createElement(_VideoPlayer2.default, {
            current: this.state.current,
            controls: this.state.controls,
            overlay: this.state.overlay,
            slidr: this.slidr.ref,
            dispatch: this.dispatch
          })
        )
      ),
      _react2.default.createElement(_Search2.default, { className: (0, _classnames2.default)({
          active: this.slidr.loaded
        }),
        current: this.state.current,
        search: this.state.search,
        slidr: this.slidr.ref,
        dispatch: this.dispatch
      })
    );
  }
});

exports.default = Jukebox;

},{"./Playlists":16,"./Search":17,"./Slidr":18,"./VideoPlayer":20,"./redux/actionTypes":22,"./redux/actions":23,"./redux/reducers":24,"classnames":"classnames","react":"react","react-timer-mixin":"react-timer-mixin"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaGroup = _react2.default.createClass({
  displayName: 'MediaGroup',


  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      type: _actionTypes.SOURCES.UNKNOWN,
      playlist: [],
      current: {},
      search: '',
      dispatch: null
    };
  },

  playMedia: function playMedia(media) {
    this.props.dispatch((0, _actions.playNow)(media, this.props.type));
  },

  render: function render() {
    var _this = this;

    var searchMatches = false;
    var mediaUnplayed = false;
    var filteredPlaylist = this.props.playlist.map(function (p, idx) {
      var hidden = p.title.toLowerCase().indexOf(_this.props.search) < 0;
      var played = _this.props.type === _actionTypes.SOURCES.PLAYLIST ? idx < _this.props.current.index : false;
      searchMatches = searchMatches || !hidden;
      mediaUnplayed = mediaUnplayed || !played;
      return {
        id: p.id,
        type: p.type,
        title: p.title,
        duration: p.duration,
        hidden: hidden,
        played: played,
        idx: idx
      };
    });

    filteredPlaylist = filteredPlaylist.map(function (p) {
      var onClickHandler = _this.playMedia.bind(_this, p);
      return _react2.default.createElement(
        'div',
        { key: p.type + '_' + p.id, className: (0, _classnames2.default)("media-item", {
            active: _this.props.current.source === _this.props.type && _this.props.current.media.id === p.id,
            hidden: p.hidden,
            played: !_this.props.search && p.played
          }), onClick: onClickHandler },
        _react2.default.createElement(
          'div',
          { className: 'media-number' },
          p.idx + 1
        ),
        _react2.default.createElement(
          'div',
          { className: 'media-title' },
          p.title
        ),
        _react2.default.createElement(
          'div',
          { className: 'media-duration' },
          p.duration
        )
      );
    });

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("media-group", {
          queue: this.props.type === _actionTypes.SOURCES.QUEUE,
          noresults: !searchMatches
        }) },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("media-group-name", {
            hidden: !(this.props.search && searchMatches || !this.props.search && mediaUnplayed)
          }) },
        this.props.name
      ),
      _react2.default.createElement(
        'div',
        { className: 'media-items' },
        filteredPlaylist
      )
    );
  }
});

exports.default = MediaGroup;

},{"./redux/actionTypes":22,"./redux/actions":23,"classnames":"classnames","react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionTypes = require('./redux/actionTypes');

var _MediaGroup = require('./MediaGroup');

var _MediaGroup2 = _interopRequireDefault(_MediaGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaList = _react2.default.createClass({
  displayName: 'MediaList',


  getDefaultProps: function getDefaultProps() {
    return {
      style: null,
      current: {},
      controls: {},
      search: '',
      dispatch: null
    };
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("media-list", {
          invisible: !this.props.controls.playlist,
          hidden: this.props.current.source === _actionTypes.SOURCES.UNKNOWN
        }), style: this.props.style },
      this.props.current.queue.length ? _react2.default.createElement(_MediaGroup2.default, {
        name: 'queue',
        type: _actionTypes.SOURCES.QUEUE,
        playlist: this.props.current.queue,
        current: this.props.current,
        search: this.props.search,
        dispatch: this.props.dispatch
      }) : null,
      this.props.current.order.length ? _react2.default.createElement(_MediaGroup2.default, {
        name: this.props.current.playlist.name,
        type: _actionTypes.SOURCES.PLAYLIST,
        playlist: this.props.current.order,
        current: this.props.current,
        search: this.props.search,
        dispatch: this.props.dispatch
      }) : null
    );
  }
});

exports.default = MediaList;

},{"./MediaGroup":8,"./redux/actionTypes":22,"classnames":"classnames","react":"react"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MediaSearch = _react2.default.createClass({
  displayName: 'MediaSearch',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      controls: {},
      value: '',
      search: '',
      updateSearch: null
    };
  },

  handleChange: function handleChange(event) {
    this.props.updateSearch(event.target.value);
  },

  clearSearch: function clearSearch() {
    this.props.updateSearch('');
    this.refs.mediaSearchInput.focus();
  },

  render: function render() {
    var _this = this;

    var queueMatches = this.props.current.queue.filter(function (x) {
      return x.title.toLowerCase().indexOf(_this.props.search) >= 0;
    }).length;

    var playlistMatches = this.props.current.order.filter(function (x) {
      return x.title.toLowerCase().indexOf(_this.props.search) >= 0;
    }).length;

    var totalMatches = queueMatches + playlistMatches;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("media-search", {
          hidden: !(this.props.current.queue.length || this.props.current.order.length),
          invisible: !this.props.controls.playlist
        }) },
      _react2.default.createElement('div', { className: 'media-search-icon ion-ios-settings' }),
      _react2.default.createElement('input', {
        ref: 'mediaSearchInput',
        className: 'media-search-input',
        type: 'text',
        placeholder: 'Find from playlist...',
        value: this.props.value,
        onChange: this.handleChange
      }),
      this.props.search ? _react2.default.createElement(
        'div',
        { className: 'media-search-count' },
        totalMatches || 'No',
        ' Match',
        totalMatches === 1 ? '' : 'es'
      ) : null,
      this.props.search ? _react2.default.createElement('div', { className: 'search-clear ion-ios-close-empty', onClick: this.clearSearch }) : null
    );
  }
});

exports.default = MediaSearch;

},{"classnames":"classnames","react":"react"}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var None = _react2.default.createClass({
  displayName: 'None',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      slidr: null,
      dispatch: null
    };
  },

  triggerSearch: function triggerSearch() {
    this.props.dispatch((0, _actions.searchFocus)());
  },

  triggerPlaylist: function triggerPlaylist() {
    this.props.slidr.slide('playlists');
  },

  triggerRestart: function triggerRestart() {
    this.props.dispatch((0, _actions.restartPlaylist)(), (0, _actions.playCurrent)());
  },

  render: function render() {
    var message = void 0;
    if (this.props.current.playlist.index !== null) {
      if (!this.props.current.order.length) {
        message = _react2.default.createElement(
          'div',
          null,
          'This playlist is empty!',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { className: 'action', onClick: this.triggerSearch },
            'Search'
          ),
          ' for videos to add, or select another ',
          _react2.default.createElement(
            'span',
            { className: 'action', onClick: this.triggerPlaylist },
            'playlist'
          ),
          '.'
        );
      } else {
        message = _react2.default.createElement(
          'div',
          null,
          'You\'ve reached the end of the playlist!',
          _react2.default.createElement('br', null),
          _react2.default.createElement('br', null),
          _react2.default.createElement(
            'span',
            { className: 'action', onClick: this.triggerRestart },
            'Restart'
          ),
          ' this playlist, choose ',
          _react2.default.createElement(
            'span',
            { className: 'action', onClick: this.triggerPlaylist },
            'another'
          ),
          ', or ',
          _react2.default.createElement(
            'span',
            { className: 'action', onClick: this.triggerSearch },
            'search'
          ),
          ' a video.'
        );
      }
    } else if (this.props.current.source === _actionTypes.SOURCES.QUEUE) {
      message = _react2.default.createElement(
        'div',
        null,
        'You\'ve reached the end of the queue!',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        'Please ',
        _react2.default.createElement(
          'span',
          { className: 'action', onClick: this.triggerSearch },
          'search'
        ),
        ' for another video, or select a ',
        _react2.default.createElement(
          'span',
          { className: 'action', onClick: this.triggerPlaylist },
          'playlist'
        ),
        '.'
      );
    } else {
      message = _react2.default.createElement(
        'div',
        null,
        'Select a ',
        _react2.default.createElement(
          'span',
          { className: 'action', onClick: this.triggerPlaylist },
          'playlist'
        ),
        ', or ',
        _react2.default.createElement(
          'span',
          { className: 'action', onClick: this.triggerSearch },
          'search'
        ),
        ' for a video.'
      );
    }
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("video-none", {
          hidden: this.props.current.media.type !== _actionTypes.MEDIA_TYPES.UNKNOWN
        }) },
      message
    );
  }
});

exports.default = None;

},{"./redux/actionTypes":22,"./redux/actions":23,"classnames":"classnames","react":"react"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionTypes = require('./redux/actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NowPlaying = _react2.default.createClass({
  displayName: 'NowPlaying',


  getDefaultProps: function getDefaultProps() {
    return {
      style: null,
      current: {},
      controls: {},
      dispatch: null
    };
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("now-playing", {
          hidden: this.props.current.media.type === _actionTypes.MEDIA_TYPES.UNKNOWN && !this.props.current.order.length
        }), style: this.props.style },
      _react2.default.createElement('div', { className: 'now-playing-icon ion-ios-volume-high' }),
      _react2.default.createElement(
        'div',
        { className: 'now-playing-display' },
        _react2.default.createElement(
          'div',
          { className: 'now-playing-name' },
          'now playing:'
        ),
        _react2.default.createElement(
          'div',
          { className: 'now-playing-title' },
          this.props.current.media.title || _react2.default.createElement(
            'span',
            { className: 'none' },
            '\u2014'
          )
        )
      )
    );
  }
});

exports.default = NowPlaying;

},{"./redux/actionTypes":22,"classnames":"classnames","react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actions = require('./redux/actions');

var _OverlayLoading = require('./OverlayLoading');

var _OverlayLoading2 = _interopRequireDefault(_OverlayLoading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Overlay = _react2.default.createClass({
  displayName: 'Overlay',


  mixins: [_reactTimerMixin2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      overlay: {},
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      hidden: true,
      count: 0
    };
  },

  cancel: function cancel() {
    this.props.dispatch((0, _actions.hideOverlay)());
  },

  continue: function _continue() {
    this.clearInterval(this._timer);
    this.props.dispatch((0, _actions.hideOverlay)(), this.props.overlay.action);
  },

  _timer: null,

  overlayTimer: function overlayTimer() {
    var _this = this;

    this.clearInterval(this._timer);
    this._timer = this.setInterval(function () {
      var count = _this.state.count - 1;
      if (count <= 0) {
        _this.continue();
      } else {
        _this.setState({
          count: count
        });
      }
    }, 1000);
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.overlay.show) {
      if (this.state.hidden) {
        this.setState({
          hidden: false,
          count: nextProps.overlay.duration
        });
        this.overlayTimer();
      }
    } else {
      if (!this.state.hidden) {
        this.setState({
          hidden: true,
          count: 0
        });
        this.clearInterval(this._timer);
      }
    }
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("overlay", {
          hidden: this.state.hidden
        }) },
      _react2.default.createElement(
        'div',
        { className: 'overlay-message' },
        'Next in ',
        this.state.count,
        '...'
      ),
      _react2.default.createElement(
        'div',
        { className: 'overlay-continue', onClick: this.continue },
        _react2.default.createElement(_OverlayLoading2.default, { duration: this.props.overlay.duration }),
        _react2.default.createElement('span', { className: 'ion-ios-play' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'overlay-cancel', onClick: this.cancel },
        'Cancel'
      )
    );
  }
});

exports.default = Overlay;

},{"./OverlayLoading":14,"./redux/actions":23,"classnames":"classnames","react":"react","react-timer-mixin":"react-timer-mixin"}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OverlayLoading = _react2.default.createClass({
  displayName: "OverlayLoading",


  getDefaultProps: function getDefaultProps() {
    return {
      duration: 5
    };
  },

  render: function render() {
    return _react2.default.createElement(
      "svg",
      { className: "overlay-loading", height: "100px", width: "100px" },
      _react2.default.createElement("circle", { r: "47px", cx: "50px", cy: "50px", style: { animation: 'overlay-progress ' + this.props.duration + 's linear' } })
    );
  }
});

exports.default = OverlayLoading;

},{"react":"react"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactLocalstorage = require('react-localstorage');

var _reactLocalstorage2 = _interopRequireDefault(_reactLocalstorage);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actions = require('./redux/actions');

var _actionTypes = require('./redux/actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PersonalPlaylists = _react2.default.createClass({
  displayName: 'PersonalPlaylists',

  mixins: [_reactLocalstorage2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      currentPlaylist: {},
      personalPlaylists: [],
      slidr: null,
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: '',
      playlists: [],
      actions: {},
      showPlaylistCreate: false
    };
  },

  /*
  [{
    name: 'PERSONAL',
    created: Date.now(),
    modified: Date.now(),
    media: [{
      id: "WoCfFoQeWoU",
      type: MEDIA_TYPES.YOUTUBE,
      title: 'blah',
      duration: '4:44'
    }]
  }]
  */

  getStateFilterKeys: function getStateFilterKeys() {
    return ['playlists'];
  },

  _initialSync: false,

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var personalJSON = JSON.stringify(nextProps.personalPlaylists);
    var stateJSON = JSON.stringify(this.state.playlists);
    if (personalJSON !== stateJSON) {
      this.setState({
        playlists: JSON.parse(personalJSON)
      });
    }
  },

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    if (this._initialSync) {
      this._initialSync = false;
      if (nextState.playlists.length) {
        // No personal playlists loaded, restore
        this.props.dispatch((0, _actions.restorePlaylists)(_actionTypes.PLAYLIST_TYPES.PERSONAL, nextState.playlists));
      }
    }
    return true;
  },

  componentDidMount: function componentDidMount() {
    // Initialize the first update to sync playlists
    this._initialSync = true;
  },

  loadPlaylist: function loadPlaylist(index) {
    this.props.dispatch((0, _actions.selectPlaylist)(_actionTypes.PLAYLIST_TYPES.PERSONAL, index), (0, _actions.playCurrent)());
    if (this.props.slidr) {
      this.props.slidr.slide('video-player');
    }
  },

  createPlaylist: function createPlaylist() {
    if (this.state.value) {
      this.props.dispatch((0, _actions.createPlaylist)(_actionTypes.PLAYLIST_TYPES.PERSONAL, this.state.value));
      this.setState({
        value: ''
      });
    }
  },

  deletePlaylist: function deletePlaylist(index) {
    this.props.dispatch((0, _actions.deletePlaylist)(_actionTypes.PLAYLIST_TYPES.PERSONAL, index));
  },

  updatePlaylist: function updatePlaylist(index, playlist) {
    var key = playlist.key;
    var actionState = this.state.actions[key];
    var name = actionState.name.trim();
    if (name) {
      this.props.dispatch((0, _actions.updatePlaylist)(_actionTypes.PLAYLIST_TYPES.PERSONAL, index, name));
      this.updateClicked('edit', key, name);
    }
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.target.value
    });
  },

  stopPropagation: function stopPropagation(event) {
    event.stopPropagation();
  },

  updateClicked: function updateClicked(type, key, name) {
    var actions = JSON.parse(JSON.stringify(this.state.actions));
    var current = actions[key] || {};
    current[type] = !current[type];
    current.name = name;
    actions[key] = current;
    this.setState({
      actions: actions
    });
  },

  editClicked: function editClicked(playlist) {
    this.updateClicked('edit', playlist.key, playlist.name);
  },

  deleteClicked: function deleteClicked(playlist) {
    this.updateClicked('delete', playlist.key, playlist.name);
  },

  togglePlaylistCreate: function togglePlaylistCreate() {
    this.setState({
      showPlaylistCreate: !this.state.showPlaylistCreate
    });
  },

  handleNameChange: function handleNameChange(key, event) {
    var actions = JSON.parse(JSON.stringify(this.state.actions));
    var current = actions[key];
    current.name = event.target.value;
    actions[key] = current;
    this.setState({
      actions: actions
    });
  },

  moveCaretToEnd: function moveCaretToEnd(event) {
    var tmp = event.target.value;
    event.target.value = '';
    event.target.value = tmp;
  },

  render: function render() {
    var _this = this;

    var personalPlaylists = this.props.personalPlaylists.map(function (p, idx) {
      var onClickHandler = _this.loadPlaylist.bind(_this, idx);
      var actionState = _this.state.actions[p.key] || {};
      return _react2.default.createElement(
        'div',
        { key: p.key, className: (0, _classnames2.default)("playlist-item", {
            active: idx === _this.props.currentPlaylist.index && p.name === _this.props.currentPlaylist.name,
            editing: actionState.edit,
            deleting: actionState.delete
          }), onClick: onClickHandler },
        _react2.default.createElement(
          'div',
          { className: 'playlist-meta' },
          actionState.edit ? _react2.default.createElement('input', {
            className: 'playlist-edit-input',
            type: 'text',
            autoFocus: true,
            ref: "playlistEdit" + p.key,
            placeholder: 'New playlist name',
            value: actionState.name,
            onClick: _this.stopPropagation,
            onKeyDown: _this.stopPropagation,
            onChange: _this.handleNameChange.bind(_this, p.key),
            onFocus: _this.moveCaretToEnd
          }) : _react2.default.createElement(
            'div',
            { className: 'playlist-name' },
            p.name
          ),
          !actionState.edit ? _react2.default.createElement(
            'div',
            { className: 'playlist-length' },
            ' [',
            p.media.length,
            ' item',
            p.media.length === 1 ? '' : 's',
            ']'
          ) : null
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)("playlist-actions", {
              editing: actionState.edit || actionState.delete
            }), onClick: _this.stopPropagation },
          actionState.edit ? _react2.default.createElement(
            'div',
            { className: 'edit-mode' },
            _react2.default.createElement(
              'div',
              { className: 'playlist-edit-save action', onClick: _this.updatePlaylist.bind(_this, idx, p) },
              'save'
            ),
            _react2.default.createElement(
              'div',
              { className: 'playlist-cancel action default', onClick: _this.editClicked.bind(_this, p) },
              'cancel'
            )
          ) : actionState.delete ? _react2.default.createElement(
            'div',
            { className: 'delete-mode' },
            _react2.default.createElement(
              'div',
              { className: 'playlist-delete-confirm action danger', onClick: _this.deletePlaylist.bind(_this, idx) },
              'delete?'
            ),
            _react2.default.createElement(
              'div',
              { className: 'playlist-cancel action default', onClick: _this.deleteClicked.bind(_this, p) },
              'cancel'
            )
          ) : _react2.default.createElement(
            'div',
            { className: 'normal-mode' },
            _react2.default.createElement(
              'div',
              { className: 'playlist-edit action', onClick: _this.editClicked.bind(_this, p) },
              'edit'
            ),
            _react2.default.createElement(
              'div',
              { className: 'playlist-delete action', onClick: _this.deleteClicked.bind(_this, p) },
              'delete'
            )
          )
        )
      );
    });

    return _react2.default.createElement(
      'div',
      { className: 'playlists-content personal' },
      _react2.default.createElement(
        'div',
        { className: 'playlists-group-name' },
        'Personal Playlists (',
        personalPlaylists.length,
        ')'
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("playlist-items", {
            create: !personalPlaylists.length && this.state.showPlaylistCreate
          }) },
        personalPlaylists.length ? personalPlaylists : !this.state.showPlaylistCreate ? _react2.default.createElement(
          'div',
          { className: 'playlist-item placeholder' },
          'You have no personal playlists.\xA0',
          _react2.default.createElement(
            'span',
            { className: 'action', onClick: this.togglePlaylistCreate },
            'Create one'
          ),
          '.'
        ) : null
      ),
      this.state.showPlaylistCreate ? _react2.default.createElement(
        'div',
        { className: 'playlist-create' },
        _react2.default.createElement('input', {
          className: 'playlist-create-input',
          type: 'text',
          autoFocus: true,
          ref: 'playlistCreate',
          placeholder: 'New playlist name...',
          value: this.state.value,
          onChange: this.handleChange
        }),
        _react2.default.createElement(
          'span',
          { className: 'action', onClick: this.createPlaylist },
          'create'
        ),
        _react2.default.createElement(
          'span',
          { className: 'action default', onClick: this.togglePlaylistCreate },
          'cancel'
        )
      ) : null
    );
  }
});

exports.default = PersonalPlaylists;

},{"./redux/actionTypes":22,"./redux/actions":23,"classnames":"classnames","react":"react","react-localstorage":"react-localstorage"}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PersonalPlaylists = require('./PersonalPlaylists');

var _PersonalPlaylists2 = _interopRequireDefault(_PersonalPlaylists);

var _actions = require('./redux/actions');

var _actionTypes = require('./redux/actionTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Playlists = _react2.default.createClass({
  displayName: 'Playlists',


  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      playlists: {},
      slidr: null,
      dispatch: null
    };
  },

  loadPlaylist: function loadPlaylist(index) {
    this.props.dispatch((0, _actions.selectPlaylist)(_actionTypes.PLAYLIST_TYPES.GLOBAL, index), (0, _actions.playCurrent)());
    if (this.props.slidr) {
      this.props.slidr.slide('video-player');
    }
  },

  render: function render() {
    var _this = this;

    var globalPlaylists = this.props.playlists.global.map(function (p, idx) {
      var onClickHandler = _this.loadPlaylist.bind(_this, idx);
      return _react2.default.createElement(
        'div',
        { key: idx, className: (0, _classnames2.default)("playlist-item", {
            active: idx === _this.props.current.playlist.index && p.name === _this.props.current.playlist.name
          }), onClick: onClickHandler },
        _react2.default.createElement(
          'div',
          { className: 'playlist-name' },
          p.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'playlist-length' },
          ' [',
          p.media.length,
          ' item',
          p.media.length === 1 ? '' : 's',
          ']'
        )
      );
    });
    return _react2.default.createElement(
      'div',
      { className: 'playlists', 'data-slidr': 'playlists' },
      _react2.default.createElement(
        'div',
        { className: 'playlists-content global' },
        _react2.default.createElement(
          'div',
          { className: 'playlists-group-name' },
          'Global Playlists (',
          this.props.playlists.global.length,
          ')'
        ),
        _react2.default.createElement(
          'div',
          { className: 'playlist-items' },
          globalPlaylists
        )
      ),
      _react2.default.createElement(_PersonalPlaylists2.default, {
        currentPlaylist: this.props.current.playlist,
        personalPlaylists: this.props.playlists.personal,
        slidr: this.props.slidr,
        dispatch: this.props.dispatch
      })
    );
  }
});

exports.default = Playlists;

},{"./PersonalPlaylists":15,"./redux/actionTypes":22,"./redux/actions":23,"classnames":"classnames","react":"react"}],17:[function(require,module,exports){
(function (process){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactScriptLoader = require('react-script-loader');

var _actions = require('./redux/actions');

var _actionTypes = require('./redux/actionTypes');

var _Common = require('./Common');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = _react2.default.createClass({
  displayName: 'Search',


  mixins: [_reactTimerMixin2.default, _reactScriptLoader.ReactScriptLoaderMixin, _Common.Debounce],

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      search: {},
      className: '',
      slidr: null,
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      query: '',
      last: '',
      token: null,
      loading: false,
      error: false,
      results: []
    };
  },

  getScriptURL: function getScriptURL() {
    return 'https://apis.google.com/js/client.js?onload=onLoadCallback';
  },

  onScriptLoaded: function onScriptLoaded() {
    // Google JS script loaded
  },

  onScriptError: function onScriptError() {
    // Google JS script failed
  },

  _cache: {},

  _addToCache: function _addToCache(query, token, results, error) {
    if (!this._cache[query]) {
      this._cache[query] = {};
    }
    this._cache[query].token = token;
    if (!this._cache[query].results) {
      this._cache[query].results = [];
    }
    this._cache[query].results = this._cache[query].results.concat(results);
    this._cache[query].error = error;
  },

  _finishSearch: function _finishSearch(query, token, results, opt_error) {
    this._addToCache(query, token, results, !!opt_error);
    this.setState({
      query: query,
      last: query,
      token: token,
      loading: false,
      error: !!opt_error,
      results: this._cache[query].results
    });
  },

  _formatTime: function _formatTime(timestamp) {
    var m = _moment2.default.duration(timestamp);
    var seconds = String(m.asSeconds() % 60);
    var minutes = String(Math.floor(m.asMinutes() % 60));
    var hours = String(Math.floor(m.asHours() % 60));
    return [hours, minutes, seconds].map(function (x) {
      return x.length === 1 ? '0' + x : x;
    }).join(':').replace(/^[0:]+(.*?\d:\d{2})$/g, '$1');
  },

  _formatViews: function _formatViews(views) {
    var result = [];
    while (views.length > 3) {
      result.push(views.slice(-3));
      views = views.slice(0, -3);
    }
    result.push(views);
    return result.reverse().join(',');
  },

  _getVideoDetails: function _getVideoDetails(query, token, items) {
    var _this = this;

    if (this._youtube && items && items.length) {
      this._youtube.videos.list({
        part: 'contentDetails, statistics',
        id: items.map(function (item) {
          return item.id;
        }).join(', ')
      }).then(function (response) {
        if (query !== _this.state.query) {
          // Query is no longer the latest, ignore
          return;
        }

        if (response && response.result && response.result.items && response.result.items.length) {
          var formatted = response.result.items.map(function (item, idx) {
            return {
              id: item.id,
              type: _actionTypes.MEDIA_TYPES.YOUTUBE,
              title: items[idx].snippet.title,
              duration: _this._formatTime(item.contentDetails.duration),
              thumbnail: items[idx].snippet.thumbnails.medium.url,
              artist: items[idx].snippet.channelTitle,
              description: items[idx].snippet.description,
              publishedAt: (0, _moment2.default)(items[idx].snippet.publishedAt).fromNow(),
              viewCount: _this._formatViews(item.statistics.viewCount)
            };
          });
          _this._finishSearch(query, token, formatted);
        } else {
          // We reached the end
          _this._finishSearch(query, null, []);
        }
      }, function (error) {
        _this._finishSearch(query, null, [], true);
      });
    }
  },

  _search: function _search(query, opt_token) {
    var _this2 = this;

    if (this._youtube) {
      if (!query) {
        // Empty query, do nothing
        return;
      } else if (query === this.state.last && !opt_token) {
        // Exact same as our last query, do nothing
        return;
      } else if (query !== this.state.query) {
        // Query is no longer the latest, ignore
        return;
      } else if (this._cache[query] && !opt_token) {
        // Return from cache
        var _cache$query = this._cache[query];
        var token = _cache$query.token;
        var results = _cache$query.results;
        var error = _cache$query.error;

        return this.setState({
          query: query,
          last: query,
          token: token,
          loading: false,
          error: error,
          results: results
        });
      }

      this._youtube.search.list({
        maxResults: opt_token ? 10 : 9,
        pageToken: opt_token,
        part: 'snippet',
        q: query,
        type: 'video'
      }).then(function (response) {
        var token = response && response.result && response.result.nextPageToken || null;
        if (response && response.result && response.result.items && response.result.items.length) {
          var items = response.result.items.map(function (item) {
            return {
              id: item.id.videoId,
              snippet: item.snippet
            };
          });
          _this2._getVideoDetails(query, token, items);
        } else {
          // Empty result, return
          _this2._finishSearch(query, token, []);
        }
      }, function (error) {
        _this2._finishSearch(query, null, [], true);
      });
    }
  },

  componentWillMount: function componentWillMount() {
    this.debouncedSearch = this.debounce(this._search, 500);
  },

  _youtube: null,

  onLoadCallback: function onLoadCallback() {
    var _this3 = this;

    gapi.client.setApiKey(process.env.GOOGLE_BROWSER_API_KEY);
    gapi.client.load('youtube', 'v3').then(function () {
      _this3._youtube = gapi.client.youtube;
    });
  },

  componentDidMount: function componentDidMount() {
    window.onLoadCallback = this.onLoadCallback;
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.search.focus) {
      this.refs.searchInput.focus();
      this.props.dispatch((0, _actions.searchFocus)(false));
    }
  },

  toggleSearch: function toggleSearch() {
    this.props.dispatch((0, _actions.searchToggle)());
  },

  loadMore: function loadMore() {
    this.runSearch(this.state.query, this.state.token);
  },

  runSearch: function runSearch(query, opt_token) {
    this.setState({
      loading: true
    });
    this.debouncedSearch(query, opt_token);
  },

  handleChange: function handleChange(event) {
    var value = event.target.value;
    var query = value.trim();
    this.setState({
      value: value,
      query: query,
      error: false
    });
    if (!query) {
      // The empty case, reset
      this._finishSearch('', null, []);
    } else if (query === this.state.last) {
      // No change from last successful query
      return this.setState({
        loading: false
      });
    } else {
      // Trying to search a new, different query
      this.runSearch(query);
    }
  },

  playResult: function playResult(media) {
    if (!this.state.loading) {
      this.props.dispatch((0, _actions.playNow)(media, _actionTypes.SOURCES.QUEUE));
      this.props.slidr.slide('video-player');
    }
  },

  queueResult: function queueResult(id, type, title, duration) {
    if (!this.state.loading) {
      this.props.dispatch((0, _actions.queueNext)(id, type, title, duration), (0, _actions.playCurrent)());
      if (!this.props.current.isPlaying) {
        this.props.slidr.slide('video-player');
      }
    }
  },

  clearSearch: function clearSearch() {
    this.handleChange({
      target: {
        value: ''
      }
    });
  },

  render: function render() {
    var _this4 = this;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("search-container", this.props.className, {
          expanded: this.props.search.expand
        }) },
      _react2.default.createElement(
        'div',
        { className: 'search' },
        _react2.default.createElement(
          'div',
          { className: 'search-icon', onClick: this.toggleSearch },
          _react2.default.createElement('span', { className: 'ion-ios-search-strong' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'search-content' },
          _react2.default.createElement(
            'div',
            { className: 'search-bar' },
            _react2.default.createElement('input', {
              className: 'search-input',
              type: 'text',
              ref: 'searchInput',
              placeholder: 'Search for...',
              value: this.state.value,
              onChange: this.handleChange
            }),
            this.state.loading ? _react2.default.createElement(
              'div',
              { className: 'search-loading' },
              _react2.default.createElement('span', { className: 'loading-spinner ion-load-c' })
            ) : null,
            this.state.value && !this.state.loading ? _react2.default.createElement('div', { className: 'search-clear ion-ios-close-empty', onClick: this.clearSearch }) : null
          ),
          _react2.default.createElement(
            'div',
            { className: (0, _classnames2.default)("search-results", {
                hidden: !this.state.last,
                disabled: this.state.loading
              }) },
            this.state.error ? _react2.default.createElement(
              'div',
              { className: 'search-error' },
              'An error occured.'
            ) : null,
            this.state.results.map(function (r) {
              var playHandler = _this4.playResult.bind(_this4, r);
              var queueHandler = _this4.queueResult.bind(_this4, r.id, r.type, r.title, r.duration);
              return _react2.default.createElement(
                'div',
                { key: r.id, className: 'search-result' },
                _react2.default.createElement(
                  'div',
                  { className: 'search-result-thumbnail' },
                  _react2.default.createElement('img', { src: r.thumbnail }),
                  _react2.default.createElement(
                    'div',
                    { className: 'search-result-duration' },
                    r.duration
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'search-result-overlay' },
                    _react2.default.createElement(
                      'div',
                      { className: 'search-result-action queue', onClick: queueHandler },
                      _react2.default.createElement('span', { className: 'ion-ios-timer' }),
                      _react2.default.createElement(
                        'div',
                        { className: 'search-result-action-text' },
                        '+ QUEUE'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'search-result-action play', onClick: playHandler },
                      _react2.default.createElement('span', { className: 'ion-ios-play' }),
                      _react2.default.createElement(
                        'div',
                        { className: 'search-result-action-text' },
                        'PLAY'
                      )
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'search-result-title' },
                  _react2.default.createElement(
                    'a',
                    { href: "https://www.youtube.com/watch?v=" + r.id, target: '_blank' },
                    r.title
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'search-result-statistics' },
                  _react2.default.createElement(
                    'span',
                    { className: (0, _classnames2.default)("search-result-artist", {
                        unknown: !r.artist
                      }) },
                    r.artist || 'unknown'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'search-result-statistics' },
                  r.viewCount,
                  ' views  \xB7  ',
                  r.publishedAt
                )
              );
            }),
            !this.state.results.length ? _react2.default.createElement(
              'div',
              { className: 'search-none' },
              _react2.default.createElement(
                'span',
                null,
                'No results found.'
              )
            ) : null,
            this.state.results.length && this.state.token ? _react2.default.createElement(
              'div',
              { className: 'search-result search-more' },
              _react2.default.createElement(
                'span',
                { onClick: this.loadMore },
                'Load more...'
              )
            ) : null
          )
        )
      )
    );
  }
});

exports.default = Search;

}).call(this,require('_process'))
},{"./Common":5,"./redux/actionTypes":22,"./redux/actions":23,"_process":27,"classnames":"classnames","moment":"moment","react":"react","react-script-loader":"react-script-loader","react-timer-mixin":"react-timer-mixin"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScriptLoader = require('react-script-loader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Slidr = _react2.default.createClass({
  displayName: 'Slidr',


  mixins: [_reactScriptLoader.ReactScriptLoaderMixin],

  getInitialState: function getInitialState() {
    return {
      loaded: false,
      callback: false
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      id: 'slidr',
      className: '',
      onLoaded: null
    };
  },

  getScriptURL: function getScriptURL() {
    return '/static/dist/js/lib/slidr.min.js';
  },

  onScriptLoaded: function onScriptLoaded() {
    this.setState({
      loaded: true
    });
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.state.loaded && !this.state.callback && this.props.onLoaded) {
      this.props.onLoaded(window.slidr);
      this.setState({
        callback: true
      });
    }
  },

  onScriptError: function onScriptError() {
    // Script error
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { id: this.props.id, className: this.props.className },
      this.props.children
    );
  }
});

exports.default = Slidr;

},{"react":"react","react-script-loader":"react-script-loader"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _None = require('./None');

var _None2 = _interopRequireDefault(_None);

var _YouTube = require('./YouTube');

var _YouTube2 = _interopRequireDefault(_YouTube);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Video = _react2.default.createClass({
  displayName: 'Video',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      controls: {},
      overlay: {},
      slidr: null,
      dispatch: null
    };
  },

  exitFullscreen: function exitFullscreen() {
    if (document.exitFullScreen) {
      document.exitFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    this.props.dispatch((0, _actions.fullscreen)(false));
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.current.media.type === _actionTypes.MEDIA_TYPES.UNKNOWN && nextProps.current.isFullscreen) {
      // No video playing, make sure fullscreen is reset
      this.exitFullscreen();
    }
  },

  playNow: function playNow() {
    this.props.dispatch((0, _actions.playNow)({
      id: '-_PIGQjrnjI',
      type: _actionTypes.MEDIA_TYPES.YOUTUBE,
      title: 'play test',
      duration: '3:22'
    }, _actionTypes.SOURCES.QUEUE));
  },

  // Error: cERIwGKSU1A
  // Valid: OoDHA8dy7JM
  // Terminated: XWBEbR47Kwc
  queueNext: function queueNext() {
    this.props.dispatch((0, _actions.queueNext)('OoDHA8dy7JM', _actionTypes.MEDIA_TYPES.YOUTUBE, 'queue test', '3:22'), (0, _actions.playCurrent)());
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'video' },
      _react2.default.createElement(_None2.default, {
        current: this.props.current,
        slidr: this.props.slidr,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(_Overlay2.default, {
        overlay: this.props.overlay,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(_YouTube2.default, {
        current: this.props.current,
        controls: this.props.controls,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(
        'div',
        { className: 'click' },
        _react2.default.createElement(
          'div',
          { onClick: this.playNow },
          'PLAY_NOW!'
        ),
        _react2.default.createElement(
          'div',
          { onClick: this.queueNext },
          'QUEUE_NEXT!'
        )
      )
    );
  }
});

exports.default = Video;

},{"./None":11,"./Overlay":13,"./YouTube":21,"./redux/actionTypes":22,"./redux/actions":23,"react":"react"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTimerMixin = require('react-timer-mixin');

var _reactTimerMixin2 = _interopRequireDefault(_reactTimerMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _Controls = require('./Controls');

var _Controls2 = _interopRequireDefault(_Controls);

var _MediaList = require('./MediaList');

var _MediaList2 = _interopRequireDefault(_MediaList);

var _MediaSearch = require('./MediaSearch');

var _MediaSearch2 = _interopRequireDefault(_MediaSearch);

var _NowPlaying = require('./NowPlaying');

var _NowPlaying2 = _interopRequireDefault(_NowPlaying);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoPlayer = _react2.default.createClass({
  displayName: 'VideoPlayer',

  mixins: [_reactTimerMixin2.default],

  componentDidMount: function componentDidMount() {
    var _this = this;

    var isChrome = !!window.chrome;
    this.setState({
      isChrome: isChrome
    });
    this.setInterval(function () {
      var video = _this.refs.videoPlayer.children[0];
      if (video) {
        var bottom = video.getBoundingClientRect().bottom;
        if (_this.state.sticky + bottom !== 0) {
          _this.setState({
            sticky: -bottom
          });
        }
      }
    }, isChrome ? undefined : 0);
  },

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      controls: {},
      overlay: {},
      slidr: null,
      dispatch: null,
      stickyOffset: 25
    };
  },

  getInitialState: function getInitialState() {
    return {
      isChrome: false,
      sticky: 0,
      value: '',
      search: ''
    };
  },

  updateSearch: function updateSearch(value) {
    this.setState({
      value: value,
      search: value.toLowerCase()
    });
  },

  getStickyStyling: function getStickyStyling() {
    var stickyStyling = {};
    var stickyThreshold = this.state.sticky + this.props.stickyOffset;

    if (stickyThreshold > 0) {
      stickyStyling.controls = {
        marginTop: (stickyThreshold <= 10 ? 0 : -Math.min(stickyThreshold - 10, 10)) + 'px'
      };
      stickyStyling.nowPlaying = {
        paddingBottom: Math.min(5 + (stickyThreshold <= 10 ? 2 * stickyThreshold : 10 + stickyThreshold), 35) + 'px'
      };
      if (this.state.isChrome) {
        // Chrome, Opera
        stickyStyling.videoController = {
          paddingTop: Math.min(stickyThreshold, 200 - 10) + 10 + 'px',
          top: 200 - 10 - Math.min(stickyThreshold, 200 - 10) + 170 + 25 + this.state.sticky + 'px'
        };
      } else {
        // Safari, Mozilla
        var offsetPadding = Math.min(stickyThreshold, this.props.stickyOffset);
        stickyStyling.videoController = {
          paddingTop: offsetPadding + 10 + 'px',
          top: -100 - offsetPadding + 'px'
        };
        stickyStyling.mediaList = {
          marginTop: -offsetPadding + 'px'
        };
      }
    }
    return stickyStyling;
  },

  render: function render() {
    var stickyThreshold = this.state.sticky + this.props.stickyOffset;
    var stickyStyling = this.getStickyStyling();

    return _react2.default.createElement(
      'div',
      { 'data-slidr': 'video-player', ref: 'videoPlayer', className: (0, _classnames2.default)("video-player", {
          sticky: stickyThreshold > 0,
          'is-chrome': this.state.isChrome
        }) },
      _react2.default.createElement(_Video2.default, {
        current: this.props.current,
        controls: this.props.controls,
        overlay: this.props.overlay,
        slidr: this.props.slidr,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(
        'div',
        { className: 'video-controller',
          style: stickyStyling.videoController },
        _react2.default.createElement(_Controls2.default, {
          style: stickyStyling.controls,
          current: this.props.current,
          controls: this.props.controls,
          overlay: this.props.overlay,
          dispatch: this.props.dispatch
        }),
        _react2.default.createElement(_NowPlaying2.default, {
          style: stickyStyling.nowPlaying,
          current: this.props.current,
          controls: this.props.controls,
          dispatch: this.props.dispatch
        }),
        _react2.default.createElement(_MediaSearch2.default, {
          current: this.props.current,
          controls: this.props.controls,
          value: this.state.value,
          search: this.state.search,
          updateSearch: this.updateSearch
        })
      ),
      _react2.default.createElement(_MediaList2.default, {
        style: stickyStyling.mediaList,
        current: this.props.current,
        controls: this.props.controls,
        search: this.state.search,
        dispatch: this.props.dispatch
      })
    );
  }
});

exports.default = VideoPlayer;

},{"./Controls":6,"./MediaList":9,"./MediaSearch":10,"./NowPlaying":12,"./Video":19,"classnames":"classnames","react":"react","react-timer-mixin":"react-timer-mixin"}],21:[function(require,module,exports){
(function (process){
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

var _reactScriptLoader = require('react-script-loader');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YouTube = _react2.default.createClass({
  displayName: 'YouTube',


  mixins: [_reactScriptLoader.ReactScriptLoaderMixin, _reactTimerMixin2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      controls: {},
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      ready: false
    };
  },

  getScriptURL: function getScriptURL() {
    return 'http://www.youtube.com/iframe_api';
  },

  onScriptLoaded: function onScriptLoaded() {
    // Script loaded
  },

  onScriptError: function onScriptError() {
    // Script failed
  },

  _timer: null,

  monitorFullScreen: function monitorFullScreen() {
    var _this = this;

    return this.setInterval(function () {
      if (_this.props.current.media.type === _actionTypes.MEDIA_TYPES.YOUTUBE) {
        var iframe = _reactDom2.default.findDOMNode(_this).childNodes[0];
        if (iframe) {
          var isFullscreen = window.innerWidth === iframe.scrollWidth && window.innerHeight === iframe.scrollHeight;
          if (isFullscreen !== _this.props.current.isFullscreen) {
            _this.props.dispatch((0, _actions.fullscreen)(isFullscreen));
          }
        }

        if (_this._youtube) {
          if (_this._youtube.isMuted() && !_this.props.current.isMuted) {
            _this.props.dispatch((0, _actions.audioMuted)(true));
          } else if (!_this._youtube.isMuted() && _this.props.current.isMuted) {
            _this.props.dispatch((0, _actions.audioMuted)(false));
          }
        }
      } else {
        _this.clearInterval(_this._timer);
        _this._timer = null;
      }
    }, 250);
  },

  componentDidMount: function componentDidMount() {
    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
  },

  componentWillUnmount: function componentWillUnmount() {
    this.clearInterval(this._timer);
    this._timer = null;
  },

  _youtube: null,

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.state.ready) {
      if (nextProps.current.media.type === _actionTypes.MEDIA_TYPES.YOUTUBE) {
        if (!this._timer) {
          this._timer = this.monitorFullScreen();
        }
        if (nextProps.current.media.id !== this.props.current.media.id) {
          this._youtube.loadVideoById(nextProps.current.media.id);
        }
      } else if (this.props.current.isPlaying) {
        this._youtube.pauseVideo();
      }
    }
  },

  _isInvalid: function _isInvalid() {
    var states = this.props.current.playStates;
    if (states.length === 3 && states[0] === YT.PlayerState.UNSTARTED && states[1] === YT.PlayerState.BUFFERING && states[2] === YT.PlayerState.UNSTARTED) {
      // Pattern to detect invalid videos
      return true;
    }
    return false;
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this.props.current.media.type === _actionTypes.MEDIA_TYPES.YOUTUBE) {
      var _props;

      var dispatchQueue = [];

      // Check playback state
      if (this.props.controls.play) {
        this._youtube.playVideo();
        dispatchQueue.push((0, _actions.play)(false));
      } else if (this.props.controls.pause) {
        this._youtube.pauseVideo();
        dispatchQueue.push((0, _actions.pause)(false));
      }

      // Check volume
      if (this.props.controls.mute) {
        this._youtube.mute();
        dispatchQueue.push((0, _actions.mute)(false), (0, _actions.audioMuted)(true));
      } else if (this.props.controls.unmute) {
        this._youtube.unMute();
        dispatchQueue.push((0, _actions.unmute)(false), (0, _actions.audioMuted)(false));
      }

      // Check whether the current state is valid
      if (this._isInvalid()) {
        if (!this.props.current.isInvalid) {
          dispatchQueue.push((0, _actions.invalid)(true));
          if (!this.props.current.isFullscreen) {
            dispatchQueue.push((0, _actions.showOverlay)(5, (0, _actions.playNext)()));
          } else {
            dispatchQueue.push((0, _actions.playNext)());
          }
        }
      } else {
        if (this.props.current.isInvalid) {
          dispatchQueue.push((0, _actions.invalid)(false), (0, _actions.hideOverlay)());
        }
      }
      (_props = this.props).dispatch.apply(_props, dispatchQueue);
    }
  },

  onYouTubeIframeAPIReady: function onYouTubeIframeAPIReady() {
    this._youtube = new YT.Player('youtube-iframe', {
      width: '640',
      height: '360',
      videoId: null,
      playerVars: {
        enablejsapi: 1,
        iv_load_policy: 3,
        origin: "development" === 'development' ? 'http://localhost:3000' : process.env.HOSTNAME,
        rel: 0,
        showinfo: 0,
        autoplay: 1
      },
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange
      }
    });
  },

  onPlayerReady: function onPlayerReady(event) {
    event.target.setVolume(100);
    this.setState({
      ready: true
    });
    this.props.dispatch((0, _actions.mute)(true));
  },

  onPlayerStateChange: function onPlayerStateChange(event) {
    var _props2;

    var dispatchQueue = [(0, _actions.nowPlaying)(event.data === YT.PlayerState.PLAYING, event.data)];

    if (event.data === YT.PlayerState.PLAYING && this.props.current.media.type === _actionTypes.MEDIA_TYPES.UNKNOWN) {
      // We reach this state by clicking really fast
      this._youtube.pauseVideo();
    }

    if (event.data === YT.PlayerState.BUFFERING) {
      // Sometimes it gets stuck, help it play
      this._youtube.playVideo();
    } else if (event.data === YT.PlayerState.ENDED) {
      if (this.props.controls.repeat) {
        this._youtube.playVideo();
      } else {
        if (!this.props.current.isFullscreen) {
          dispatchQueue.push((0, _actions.showOverlay)(5, (0, _actions.playNext)()));
        } else {
          dispatchQueue.push((0, _actions.playNext)());
        }
      }
    }

    (_props2 = this.props).dispatch.apply(_props2, dispatchQueue);
  },

  stopVideo: function stopVideo() {
    this._youtube.stopVideo();
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("youtube", {
          hidden: this.props.current.media.type !== _actionTypes.MEDIA_TYPES.YOUTUBE
        }) },
      _react2.default.createElement('div', { id: 'youtube-iframe' })
    );
  }
});

exports.default = YouTube;

}).call(this,require('_process'))
},{"./redux/actionTypes":22,"./redux/actions":23,"_process":27,"classnames":"classnames","react":"react","react-dom":"react-dom","react-script-loader":"react-script-loader","react-timer-mixin":"react-timer-mixin"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Controls
var PLAY = exports.PLAY = 'PLAY';
var PAUSE = exports.PAUSE = 'PAUSE';
var MUTE = exports.MUTE = 'MUTE';
var UNMUTE = exports.UNMUTE = 'UNMUTE';
var REPEAT = exports.REPEAT = 'REPEAT';
var SHUFFLE = exports.SHUFFLE = 'SHUFFLE';
var PLAYLIST = exports.PLAYLIST = 'PLAYLIST';

// Search
var SEARCH_TOGGLE = exports.SEARCH_TOGGLE = 'SEARCH_TOGGLE';
var SEARCH_FOCUS = exports.SEARCH_FOCUS = 'SEARCH_FOCUS';

// Overlay
var SHOW_OVERLAY = exports.SHOW_OVERLAY = 'SHOW_OVERLAY';
var HIDE_OVERLAY = exports.HIDE_OVERLAY = 'HIDE_OVERLAY';

// Current
var INVALID = exports.INVALID = 'INVALID';
var FULLSCREEN = exports.FULLSCREEN = 'FULLSCREEN';
var AUDIO_MUTED = exports.AUDIO_MUTED = 'AUDIO_MUTED';
var VIDEO_SHOWING = exports.VIDEO_SHOWING = 'VIDEO_SHOWING';
var NOW_PLAYING = exports.NOW_PLAYING = 'NOW_PLAYING';
var PLAY_NEXT = exports.PLAY_NEXT = 'PLAY_NEXT';
var PLAY_PREV = exports.PLAY_PREV = 'PLAY_PREV';
var QUEUE_NEXT = exports.QUEUE_NEXT = 'QUEUE_NEXT';
var PLAY_NOW = exports.PLAY_NOW = 'PLAY_NOW';
var PLAY_CURRENT = exports.PLAY_CURRENT = 'PLAY_CURRENT';
var SELECT_PLAYLIST = exports.SELECT_PLAYLIST = 'SELECT_PLAYLIST';
var RESTART_PLAYLIST = exports.RESTART_PLAYLIST = 'RESTART_PLAYLIST';

// Playlist
var RESTORE_PLAYLISTS = exports.RESTORE_PLAYLISTS = 'RESTORE_PLAYLISTS';
var CREATE_PLAYLIST = exports.CREATE_PLAYLIST = 'CREATE_PLAYLIST';
var DELETE_PLAYLIST = exports.DELETE_PLAYLIST = 'DELETE_PLAYLIST';
var ADD_TO_PLAYLIST = exports.ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
var REMOVE_FROM_PLAYLIST = exports.REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';
var UPDATE_PLAYLIST = exports.UPDATE_PLAYLIST = 'UPDATE_PLAYLIST';

// Media types
var MEDIA_TYPES = exports.MEDIA_TYPES = {
  UNKNOWN: '-1',
  YOUTUBE: '1'
};

// Media sources
var SOURCES = exports.SOURCES = {
  UNKNOWN: -1,
  PLAYLIST: 1,
  QUEUE: 2
};

// Playlist types
var PLAYLIST_TYPES = exports.PLAYLIST_TYPES = {
  UNKNOWN: 'unknown',
  GLOBAL: 'global',
  PERSONAL: 'personal'
};

// YT.PlayerState.UNSTARTED (-1)
// YT.PlayerState.ENDED (0)
// YT.PlayerState.PLAYING (1)
// YT.PlayerState.PAUSED (2)
// YT.PlayerState.BUFFERING (3)
// YT.PlayerState.CUED (5)

},{}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.play = play;
exports.pause = pause;
exports.mute = mute;
exports.unmute = unmute;
exports.repeat = repeat;
exports.shuffle = shuffle;
exports.playlist = playlist;
exports.invalid = invalid;
exports.fullscreen = fullscreen;
exports.audioMuted = audioMuted;
exports.videoShowing = videoShowing;
exports.showOverlay = showOverlay;
exports.hideOverlay = hideOverlay;
exports.searchToggle = searchToggle;
exports.searchFocus = searchFocus;
exports.nowPlaying = nowPlaying;
exports.playPrev = playPrev;
exports.playNext = playNext;
exports.restartPlaylist = restartPlaylist;
exports.playCurrent = playCurrent;
exports.playNow = playNow;
exports.queueNext = queueNext;
exports.selectPlaylist = selectPlaylist;
exports.restorePlaylists = restorePlaylists;
exports.createPlaylist = createPlaylist;
exports.deletePlaylist = deletePlaylist;
exports.addToPlaylist = addToPlaylist;
exports.removeFromPlaylist = removeFromPlaylist;
exports.updatePlaylist = updatePlaylist;

var _actionTypes = require('./actionTypes');

function play(status) {
  return { type: _actionTypes.PLAY, status: !!status };
}

function pause(status) {
  return { type: _actionTypes.PAUSE, status: !!status };
}

function mute(status) {
  return { type: _actionTypes.MUTE, status: !!status };
}

function unmute(status) {
  return { type: _actionTypes.UNMUTE, status: !!status };
}

function repeat() {
  return { type: _actionTypes.REPEAT };
}

function shuffle() {
  return { type: _actionTypes.SHUFFLE };
}

function playlist() {
  return { type: _actionTypes.PLAYLIST };
}

function invalid(status) {
  return { type: _actionTypes.INVALID, status: !!status };
}

function fullscreen(status) {
  return { type: _actionTypes.FULLSCREEN, status: !!status };
}

function audioMuted(status) {
  return { type: _actionTypes.AUDIO_MUTED, status: !!status };
}

function videoShowing(status) {
  return { type: _actionTypes.VIDEO_SHOWING, status: !!status };
}

function showOverlay(duration, action) {
  return { type: _actionTypes.SHOW_OVERLAY, duration: duration, action: action };
}

function hideOverlay() {
  return { type: _actionTypes.HIDE_OVERLAY };
}

function searchToggle() {
  return { type: _actionTypes.SEARCH_TOGGLE };
}

function searchFocus(opt_focus) {
  return { type: _actionTypes.SEARCH_FOCUS, focus: opt_focus };
}

function nowPlaying(status, state) {
  return { type: _actionTypes.NOW_PLAYING, status: !!status, state: state };
}

function playPrev() {
  return { type: _actionTypes.PLAY_PREV };
}

function playNext() {
  return { type: _actionTypes.PLAY_NEXT };
}

function restartPlaylist() {
  return { type: _actionTypes.RESTART_PLAYLIST };
}

function playCurrent() {
  return { type: _actionTypes.PLAY_CURRENT };
}

function playNow(media, source) {
  return { type: _actionTypes.PLAY_NOW, media: { id: media.id, type: media.type, title: media.title, duration: media.duration }, source: source };
}

function queueNext(id, type, title, duration) {
  return { type: _actionTypes.QUEUE_NEXT, media: { id: id, type: type, title: title, duration: duration } };
}

function selectPlaylist(playlistType, index) {
  return { type: _actionTypes.SELECT_PLAYLIST, playlistType: playlistType, index: index };
}

function restorePlaylists(playlistType, playlists) {
  return { type: _actionTypes.RESTORE_PLAYLISTS, playlistType: playlistType, playlists: playlists };
}

function createPlaylist(playlistType, name) {
  return { type: _actionTypes.CREATE_PLAYLIST, playlistType: playlistType, name: name };
}

function deletePlaylist(playlistType, index) {
  return { type: _actionTypes.DELETE_PLAYLIST, playlistType: playlistType, index: index };
}

function addToPlaylist(playlistType, index, media) {
  return { type: _actionTypes.DELETE_PLAYLIST, playlistType: playlistType, index: index, media: media };
}

function removeFromPlaylist(playlistType, index, mediaIndex) {
  return { type: _actionTypes.DELETE_PLAYLIST, playlistType: playlistType, index: index, mediaIndex: mediaIndex };
}

function updatePlaylist(playlistType, index, name) {
  return { type: _actionTypes.UPDATE_PLAYLIST, playlistType: playlistType, index: index, name: name };
}

},{"./actionTypes":22}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _actionTypes = require('./actionTypes');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var update = function update(state, updated) {
  return Object.assign({}, state, updated);
};

var KEY_CONSTANTS = {
  values: 'abcdefghijklmnopqrstuvwxyz1234567890',
  length: 6
};

var generatePlaylistKey = function generatePlaylistKey(playlists) {
  var existingKeys = playlists.map(function (p) {
    return p.key;
  });
  var newKeys = [];
  while (!newKeys.length) {
    for (var i = 0; i < KEY_CONSTANTS.length; i++) {
      newKeys.push(KEY_CONSTANTS.values[Math.floor(Math.random() * KEY_CONSTANTS.values.length)]);
    }
    var newKey = newKeys.join('').toUpperCase();
    if (existingKeys.indexOf(newKey) < 0) {
      return newKey;
    }
    newKeys.length = 0;
  }
};

var controls = function controls(state, action) {
  switch (action.type) {
    case _actionTypes.PLAY:
      return update(state, {
        play: action.status
      });

    case _actionTypes.PAUSE:
      return update(state, {
        pause: action.status
      });

    case _actionTypes.MUTE:
      return update(state, {
        mute: action.status
      });

    case _actionTypes.UNMUTE:
      return update(state, {
        unmute: action.status
      });

    case _actionTypes.REPEAT:
      return update(state, {
        repeat: !state.repeat
      });

    case _actionTypes.SHUFFLE:
      return update(state, {
        shuffle: !state.shuffle
      });

    case _actionTypes.PLAYLIST:
      return update(state, {
        playlist: !state.playlist
      });

    default:
      return state;
  }
};

var overlay = function overlay(state, action) {
  switch (action.type) {
    case _actionTypes.SHOW_OVERLAY:
      return update(state, {
        show: true,
        duration: action.duration,
        action: action.action
      });

    case _actionTypes.HIDE_OVERLAY:
      return update(state, {
        show: false,
        duration: 0,
        callback: null
      });

    default:
      return state;
  }
};

var search = function search(state, action) {
  switch (action.type) {
    case _actionTypes.SEARCH_TOGGLE:
      var expand = !state.expand;
      return update(state, {
        expand: expand,
        focus: expand
      });

    case _actionTypes.SEARCH_FOCUS:
      return update(state, {
        expand: true,
        focus: action.focus !== undefined ? action.focus : true
      });

    default:
      return state;
  }
};

var shuffle = function shuffle(list) {
  var order = list.slice(0);
  for (var i = order.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = order[i];
    order[i] = order[j];
    order[j] = tmp;
  }
  return order;
};

var current = function current(state, action, controls, playlists) {
  switch (action.type) {
    case _actionTypes.INVALID:
      return update(state, {
        isInvalid: action.status
      });

    case _actionTypes.AUDIO_MUTED:
      return update(state, {
        isMuted: action.status
      });

    case _actionTypes.FULLSCREEN:
      return update(state, {
        isFullscreen: action.status
      });

    case _actionTypes.VIDEO_SHOWING:
      return update(state, {
        isVideoShowing: action.status
      });

    case _actionTypes.NOW_PLAYING:
      var newPlayStates = state.playStates.slice(state.playStates.length >= 3 ? 1 : 0, state.playStates.length);
      newPlayStates.push(action.state);
      return update(state, {
        isPlaying: action.status,
        playStates: newPlayStates
      });

    case _actionTypes.PLAY_CURRENT:
      if (!state.isPlaying) {
        // If no song is playing, load the next song in queue
        if (state.queue.length) {
          return update(state, {
            media: state.queue[0],
            source: _actionTypes.SOURCES.QUEUE
          });
        }
        // Nothing in queue, load the current indexed track
        else {
            var index = Math.max(0, state.index);
            if (state.order[index]) {
              return update(state, {
                media: state.order[index],
                index: index,
                source: _actionTypes.SOURCES.PLAYLIST
              });
            }
          }
      }
      return state;

    case _actionTypes.PLAY_NEXT:
      var nextIndex = state.index;
      if (state.index !== null && state.source === _actionTypes.SOURCES.PLAYLIST) {
        // If we're currently playing from a playlist, update the index
        nextIndex = Math.min(state.index + 1, state.order.length);
      }

      if (state.queue.length && state.source === _actionTypes.SOURCES.QUEUE && state.media.type === state.queue[0].type && state.media.id === state.queue[0].id) {
        // If we just finished something in the queue, pop it off
        state.queue.shift();
      }

      if (state.queue.length) {
        // Play next in queue
        return update(state, {
          media: state.queue[0],
          source: _actionTypes.SOURCES.QUEUE,
          index: nextIndex
        });
      } else if (state.index !== null) {
        // Play next in playlist.
        nextIndex = Math.max(nextIndex, 0);
        if (nextIndex <= state.order.length - 1) {
          return update(state, {
            media: state.order[nextIndex],
            index: nextIndex,
            source: _actionTypes.SOURCES.PLAYLIST
          });
        }
      }

      // Else just update the index so PLAY_PREV works properly
      return update(state, {
        media: {
          id: null,
          type: _actionTypes.MEDIA_TYPES.UNKNOWN,
          title: '',
          duration: ''
        },
        index: nextIndex
      });

    case _actionTypes.PLAY_PREV:
      if (state.source !== _actionTypes.SOURCES.QUEUE && state.index !== null) {
        // We don't allow going back in the queue
        var prevIndex = Math.min(state.index - 1, state.order.length - 1);
        if (prevIndex >= 0) {

          return update(state, {
            media: state.order[prevIndex],
            index: prevIndex,
            isPlaylist: true
          });
        }
      }
      return state;

    case _actionTypes.RESTART_PLAYLIST:
      if (state.order.length) {
        return update(state, {
          isPlaying: false,
          index: 0
        });
      }
      return state;

    case _actionTypes.SHUFFLE:
      if (state.playlist.index !== null) {
        var newOrder = playlists[state.playlist.type] && playlists[state.playlist.type][state.playlist.index] && playlists[state.playlist.type][state.playlist.index].media || [];
        if (!controls.shuffle) {
          // If shuffle was previously off, then it means we need to shuffle 
          newOrder = shuffle(newOrder);
        }
        // If we were previously at the end of the list, keep it there
        var newIndex = state.index >= newOrder.length ? newOrder.length : Math.max(newOrder.map(function (x) {
          return x.type + ':' + x.id;
        }).indexOf(state.media.type + ':' + state.media.id), 0);

        return update(state, {
          index: newIndex,
          order: newOrder
        });
      }
      return state;

    case _actionTypes.PLAY_NOW:
      if (action.source === _actionTypes.SOURCES.QUEUE) {
        // If it exists in the queue, remove
        var queueIndex = -1;
        var queueExists = state.queue.filter(function (q, idx) {
          if (q.type === action.media.type && q.id === action.media.id) {
            queueIndex = idx;
            return true;
          }
          return false;
        });

        var newQueue = state.queue.slice();
        if (queueExists.length) {
          newQueue = newQueue.slice(0, queueIndex).concat(newQueue.slice(queueIndex + 1));
        }

        // Now add newest media to top of the queue
        newQueue = [action.media].concat(newQueue);
        return update(state, {
          media: action.media,
          source: action.source,
          queue: newQueue
        });
      } else if (action.source === _actionTypes.SOURCES.PLAYLIST) {
        // Just update media and index
        var _playlistIndex = -1;
        var playlistExists = state.order.filter(function (o, idx) {
          if (o.type === action.media.type && o.id === action.media.id) {
            _playlistIndex = idx;
            return true;
          }
          return false;
        });

        if (playlistExists.length) {
          return update(state, {
            media: action.media,
            source: action.source,
            index: _playlistIndex
          });
        }
      }

      return state;

    case _actionTypes.QUEUE_NEXT:
      if (!(state.media.id === action.media.id && state.media.type === action.media.type) && !state.queue.filter(function (s) {
        return s.id === action.media.id && s.type === action.media.type;
      }).length) {
        var _newQueue = state.queue.slice();
        _newQueue.push(action.media);

        return update(state, {
          queue: _newQueue
        });
      }
      return state;

    case _actionTypes.SELECT_PLAYLIST:
      var playlistType = action.playlistType;
      var playlistIndex = action.index || 0;
      var playlist = playlists[playlistType] && playlists[playlistType][playlistIndex] || {};
      var playlistOrder = playlist.media || [];
      var playlistName = playlist.name || '';
      if (controls.shuffle) {
        playlistOrder = shuffle(playlistOrder);
      }

      var updated = {
        playlist: {
          type: playlistType,
          index: playlistIndex,
          name: playlistName
        },
        index: -1,
        order: playlistOrder
      };

      if (state.source === _actionTypes.SOURCES.PLAYLIST) {
        // If we're currently in a playlist already, reset the isPlaying
        // flag in order for playCurrent() to trigger a new song.
        updated.isPlaying = false;
      }

      return update(state, updated);

    default:
      return state;
  }
};

var playlists = function playlists(state, action) {
  var playlists = void 0;
  var playlist = void 0;
  switch (action.type) {
    case _actionTypes.RESTORE_PLAYLISTS:
      playlists = action.playlists;
      break;
    case _actionTypes.CREATE_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlists.push({
        name: action.name,
        key: generatePlaylistKey(state[action.playlistType]),
        created: Date.now(),
        modified: Date.now(),
        media: []
      });
      break;
    case _actionTypes.DELETE_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlists.splice(action.index, 1);
      break;
    case _actionTypes.ADD_TO_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlist = playlists[action.index];
      playlist.media.push(action.media);
      playlist.modified = Date.now();
      break;
    case _actionTypes.REMOVE_FROM_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlist = playlists[action.index];
      playlist.media.splice(action.mediaIndex, 1);
      playlist.modified = Date.now();
      break;
    case _actionTypes.UPDATE_PLAYLIST:
      playlists = state[action.playlistType].slice();
      playlist = playlists[action.index];
      playlist.name = action.name;
      playlist.modified = Date.now();
      break;
    default:
      return state;
  }

  console.log("-->> CURRENT state:", state);
  console.log("-->> UPDATED STATE:", update(state, _defineProperty({}, action.playlistType, playlists)));

  return update(state, _defineProperty({}, action.playlistType, playlists));
};

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  return {
    controls: controls(state.controls, action),
    search: search(state.search, action),
    overlay: overlay(state.overlay, action),
    playlists: playlists(state.playlists, action),
    current: current(state.current, action, state.controls, state.playlists)
  };
}

},{"./actionTypes":22}],25:[function(require,module,exports){
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

},{"./routes":26,"react":"react","react-dom":"react-dom","react-router":"react-router"}],26:[function(require,module,exports){
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

var _Jukebox = require('./components/jukebox/Jukebox');

var _Jukebox2 = _interopRequireDefault(_Jukebox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _App2.default },
  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/jukebox', component: _Jukebox2.default })
);

exports.default = routes;

},{"./components/App":1,"./components/Home":3,"./components/jukebox/Jukebox":7,"react":"react","react-router":"react-router"}],27:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[25]);
