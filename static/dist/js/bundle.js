(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
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
      current: {},
      controls: {},
      overlay: {},
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      playPauseDisabled: false,
      previousDisabled: false,
      nextDisabled: false,
      repeatDisabled: false,
      shuffleDisabled: false
    };
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var mediaValid = nextProps.current.media.id && nextProps.current.media.type !== _actionTypes.TYPES.UNKNOWN;
    var endReached = !mediaValid && !nextProps.current.queue.length && (!nextProps.current.order.length || nextProps.current.index === nextProps.current.order.length);

    // Now set the control states
    this.setState({
      playPauseDisabled: !mediaValid || nextProps.current.isInvalid || nextProps.overlay.show,
      previousDisabled: nextProps.current.source === _actionTypes.SOURCES.QUEUE || !nextProps.current.index,
      nextDisabled: endReached,
      repeatDisabled: endReached || nextProps.current.isInvalid || nextProps.overlay.show,
      shuffleDisabled: nextProps.current.isInvalid || nextProps.overlay.show || !nextProps.current.order.length
    });
  },

  playPause: function playPause() {
    if (!this.state.playPauseDisabled) {
      this.props.dispatch(this.props.current.isPlaying ? (0, _actions.pause)(true) : (0, _actions.play)(true));
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
    this.props.dispatch((0, _actions.playlist)());
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("controls", {
          hidden: this.props.current.media.type === _actionTypes.TYPES.UNKNOWN && this.props.current.source === _actionTypes.SOURCES.UNKNOWN
        }) },
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
            active: this.props.controls.playlist
          }), onClick: this.playlist },
        _react2.default.createElement('span', { className: 'ion-ios-list-outline' })
      )
    );
  }
});

exports.default = Controls;

},{"./redux/actionTypes":19,"./redux/actions":20,"classnames":"classnames","react":"react"}],7:[function(require,module,exports){
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

var _reducers = require('./redux/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Jukebox = _react2.default.createClass({
  displayName: 'Jukebox',

  mixins: [_reactTimerMixin2.default],

  getInitialState: function getInitialState() {
    return {
      videoShowing: true,
      current: {
        isPlaying: false,
        isInvalid: false,
        isFullscreen: false,
        source: _actionTypes.SOURCES.UNKNOWN,
        playStates: [],
        index: null,
        playlist: {
          index: null,
          name: ''
        },
        order: [],
        queue: [],
        media: {
          id: null,
          type: _actionTypes.TYPES.UNKNOWN,
          title: '',
          duration: ''
        }
      },
      controls: {
        play: false,
        pause: false,
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
      playlists: [{
        name: 'EDM',
        created: Date.now(),
        modified: Date.now(),
        media: [{
          id: "JbH_Vn5pq8I",
          type: _actionTypes.TYPES.YOUTUBE,
          title: 'Hey there!',
          duration: '3:22'
        }, {
          id: "Csm3BX30jZQ",
          type: _actionTypes.TYPES.YOUTUBE,
          title: 'yo yo',
          duration: '1:23'
        }, {
          id: "Rhm_-gMbTGU",
          type: _actionTypes.TYPES.YOUTUBE,
          title: 'hi',
          duration: '3:33'
        }, {
          id: "cERIwGKSU1A",
          type: _actionTypes.TYPES.YOUTUBE,
          title: 'fourth',
          duration: '4:44'
        }, {
          id: "XWBEbR47Kwc",
          type: _actionTypes.TYPES.YOUTUBE,
          title: 'fifth',
          duration: '5:55'
        }]
      }]
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
          _this2.forceUpdate({
            videoShowing: false
          });
        } else if (e.in.slidr === 'video-player') {
          _this2.forceUpdate({
            videoShowing: true
          });
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
        keyboard: true,
        theme: '#f0f0f0',
        before: this.slidrHandler,
        after: this.slidrHandler
      }).add('h', ['playlists', 'video-player', 'playlists']).add('v', ['playlists', 'video-player', 'playlists']).start('video-player');
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
          { id: 'jukebox-slidr', className: this.state.videoShowing ? '' : 'video-not-showing', onLoaded: this.slidrCreate },
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
        search: this.state.search,
        slidr: this.slidr.ref,
        dispatch: this.dispatch
      })
    );
  }
});

exports.default = Jukebox;

},{"./Playlists":13,"./Search":14,"./Slidr":15,"./VideoPlayer":17,"./redux/actionTypes":19,"./redux/reducers":21,"classnames":"classnames","react":"react","react-timer-mixin":"react-timer-mixin"}],8:[function(require,module,exports){
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

var MediaGroup = _react2.default.createClass({
  displayName: 'MediaGroup',

  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      type: _actionTypes.SOURCES.UNKNOWN,
      playlist: [],
      current: {},
      search: ''
    };
  },

  render: function render() {
    var _this = this;

    var searchMatches = false;
    var mediaUnplayed = false;
    var filteredPlaylist = this.props.playlist.slice().map(function (p, idx) {
      var hidden = p.title.toLowerCase().indexOf(_this.props.search) < 0;
      var played = _this.props.type === _actionTypes.SOURCES.PLAYLIST ? idx < _this.props.current.index : false;
      searchMatches = searchMatches || !hidden;
      mediaUnplayed = mediaUnplayed || !played;
      p.hidden = hidden;
      p.played = played;
      p.idx = idx;
      return p;
    }).sort(function (a, b) {
      return !a.hidden ? -1 : !b.hidden ? 1 : 0;
    }).map(function (p) {
      return _react2.default.createElement(
        'div',
        { key: p.type + '_' + p.id, className: (0, _classnames2.default)("media-item", {
            active: _this.props.current.source === _this.props.type && _this.props.current.media.id === p.id,
            hidden: p.hidden,
            played: !_this.props.search && p.played
          }) },
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

},{"./redux/actionTypes":19,"classnames":"classnames","react":"react"}],9:[function(require,module,exports){
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
      current: {},
      controls: {},
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      value: ''
    };
  },

  handleChange: function handleChange(event) {
    this.setState({
      value: event.target.value,
      search: event.target.value.toLowerCase()
    });
  },

  onClick: function onClick(id, type, artist, title, duration, source) {
    this.props.dispatch(playNow(id, type, artist, title, duration, source));
  },

  clearSearch: function clearSearch() {
    this.setState({
      value: '',
      search: ''
    });
  },

  render: function render() {
    var _this = this;

    var queueMatches = this.props.current.queue.filter(function (x) {
      return x.title.toLowerCase().indexOf(_this.state.search) >= 0;
    }).length;

    var playlistMatches = this.props.current.order.filter(function (x) {
      return x.title.toLowerCase().indexOf(_this.state.search) >= 0;
    }).length;

    var totalMatches = queueMatches + playlistMatches;

    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("media-list", {
          hidden: this.props.current.source === _actionTypes.SOURCES.UNKNOWN
        }) },
      this.props.current.queue.length || this.props.current.order.length ? _react2.default.createElement(
        'div',
        { className: 'media-search' },
        _react2.default.createElement('div', { className: 'media-search-icon ion-ios-settings' }),
        _react2.default.createElement('input', {
          className: 'media-search-input',
          type: 'text',
          placeholder: 'Find from playlist...',
          value: this.state.value,
          onChange: this.handleChange
        }),
        this.state.search ? _react2.default.createElement(
          'div',
          { className: 'media-search-count' },
          totalMatches || 'No',
          ' Match',
          totalMatches === 1 ? '' : 'es'
        ) : null,
        this.state.search ? _react2.default.createElement('div', { className: 'media-search-clear ion-ios-close-empty', onClick: this.clearSearch }) : null
      ) : null,
      this.props.current.queue.length ? _react2.default.createElement(_MediaGroup2.default, {
        name: 'queue',
        type: _actionTypes.SOURCES.QUEUE,
        playlist: this.props.current.queue,
        current: this.props.current,
        search: this.state.search
      }) : null,
      this.props.current.order.length ? _react2.default.createElement(_MediaGroup2.default, {
        name: this.props.current.playlist.name,
        type: _actionTypes.SOURCES.PLAYLIST,
        playlist: this.props.current.order,
        current: this.props.current,
        search: this.state.search
      }) : null
    );
  }
});

exports.default = MediaList;

},{"./MediaGroup":8,"./redux/actionTypes":19,"classnames":"classnames","react":"react"}],10:[function(require,module,exports){
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
    var message = undefined;
    if (this.props.current.playlist.index !== null) {
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
          hidden: this.props.current.media.type !== _actionTypes.TYPES.UNKNOWN
        }) },
      message
    );
  }
});

exports.default = None;

},{"./redux/actionTypes":19,"./redux/actions":20,"classnames":"classnames","react":"react"}],11:[function(require,module,exports){
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

},{"./OverlayLoading":12,"./redux/actions":20,"classnames":"classnames","react":"react","react-timer-mixin":"react-timer-mixin"}],12:[function(require,module,exports){
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

},{"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Playlists = _react2.default.createClass({
  displayName: 'Playlists',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      playlists: [],
      slidr: null,
      dispatch: null
    };
  },

  loadPlaylist: function loadPlaylist(index) {
    this.props.dispatch((0, _actions.selectPlaylist)(index), (0, _actions.playCurrent)());
    if (this.props.slidr) {
      this.props.slidr.slide('video-player');
    }
  },

  render: function render() {
    var _this = this;

    var playlists = this.props.playlists.map(function (p, idx) {
      var onClickHandler = _this.loadPlaylist.bind(_this, idx);
      return _react2.default.createElement(
        'div',
        { key: idx, className: 'playlist-item', onClick: onClickHandler },
        _react2.default.createElement(
          'div',
          { className: 'playlist-name' },
          p.name
        ),
        _react2.default.createElement(
          'div',
          { className: 'playlist-length' },
          ' (',
          p.media.length,
          ')'
        )
      );
    });
    return _react2.default.createElement(
      'div',
      { className: 'playlists', 'data-slidr': 'playlists' },
      playlists
    );
  }
});

exports.default = Playlists;

},{"./redux/actions":20,"react":"react"}],14:[function(require,module,exports){
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
    }).join(':').replace(/^[0:]+/g, '');
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
              type: _actionTypes.TYPES.YOUTUBE,
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

    gapi.client.setApiKey("AIzaSyBC-AjnC8AeqQC2lLXAiOyDMln6RhwMhlA");
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
    var query = event.target.value.trim();
    this.setState({
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

  playResult: function playResult(id, type, title, duration) {
    if (!this.state.loading) {
      this.props.dispatch((0, _actions.playNow)(id, type, title, duration, _actionTypes.SOURCES.QUEUE));
      this.props.slidr.slide('video-player');
    }
  },

  queueResult: function queueResult(id, type, title, duration) {
    if (!this.state.loading) {
      this.props.dispatch((0, _actions.queueNext)(id, type, title, duration), (0, _actions.playCurrent)());
    }
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
              onChange: this.handleChange
            }),
            _react2.default.createElement(
              'div',
              { className: (0, _classnames2.default)("search-loading", {
                  hidden: !this.state.loading
                }) },
              _react2.default.createElement('span', { className: 'loading-spinner ion-load-c' })
            )
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
              var playHandler = _this4.playResult.bind(_this4, r.id, r.type, r.title, r.duration);
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
                  ' views  ·  ',
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

},{"./Common":5,"./redux/actionTypes":19,"./redux/actions":20,"classnames":"classnames","moment":"moment","react":"react","react-script-loader":"react-script-loader","react-timer-mixin":"react-timer-mixin"}],15:[function(require,module,exports){
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
    if (!this.state.callback && this.props.onLoaded) {
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

},{"react":"react","react-script-loader":"react-script-loader"}],16:[function(require,module,exports){
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
    if (nextProps.current.media.type === _actionTypes.TYPES.UNKNOWN && nextProps.current.isFullscreen) {
      // No video playing, make sure fullscreen is reset
      this.exitFullscreen();
    }
  },

  playNow: function playNow() {
    this.props.dispatch((0, _actions.playNow)('-_PIGQjrnjI', _actionTypes.TYPES.YOUTUBE, 'play test', '3:22', _actionTypes.SOURCES.QUEUE));
  },

  // Error: cERIwGKSU1A
  // Valid: OoDHA8dy7JM
  // Terminated: XWBEbR47Kwc
  queueNext: function queueNext() {
    this.props.dispatch((0, _actions.queueNext)('OoDHA8dy7JM', _actionTypes.TYPES.YOUTUBE, 'queue test', '3:22'), (0, _actions.playCurrent)());
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

},{"./None":10,"./Overlay":11,"./YouTube":18,"./redux/actionTypes":19,"./redux/actions":20,"react":"react"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Video = require('./Video');

var _Video2 = _interopRequireDefault(_Video);

var _Controls = require('./Controls');

var _Controls2 = _interopRequireDefault(_Controls);

var _MediaList = require('./MediaList');

var _MediaList2 = _interopRequireDefault(_MediaList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoPlayer = _react2.default.createClass({
  displayName: 'VideoPlayer',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      controls: {},
      overlay: {},
      slidr: null,
      dispatch: null
    };
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'video-player', 'data-slidr': 'video-player' },
      _react2.default.createElement(_Video2.default, {
        current: this.props.current,
        controls: this.props.controls,
        overlay: this.props.overlay,
        slidr: this.props.slidr,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(_Controls2.default, {
        current: this.props.current,
        controls: this.props.controls,
        overlay: this.props.overlay,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(_MediaList2.default, {
        current: this.props.current,
        controls: this.props.controls,
        dispatch: this.props.dispatch
      })
    );
  }
});

exports.default = VideoPlayer;

},{"./Controls":6,"./MediaList":9,"./Video":16,"react":"react"}],18:[function(require,module,exports){
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
      if (_this.props.current.media.type === _actionTypes.TYPES.YOUTUBE) {
        var iframe = _reactDom2.default.findDOMNode(_this).childNodes[0];
        if (iframe) {
          var isFullscreen = window.innerWidth === iframe.scrollWidth && window.innerHeight === iframe.scrollHeight;
          if (isFullscreen !== _this.props.current.isFullscreen) {
            _this.props.dispatch((0, _actions.fullscreen)(isFullscreen));
          }
        }
      } else {
        _this.clearInterval(_this._timer);
        _this._timer = null;
      }
    }, 1000);
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
      if (nextProps.current.media.type === _actionTypes.TYPES.YOUTUBE) {
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
    if (this.props.current.media.type === _actionTypes.TYPES.YOUTUBE) {
      var _props;

      var dispatchQueue = [];
      if (this.props.controls.play) {
        this._youtube.playVideo();
        dispatchQueue.push((0, _actions.play)(false));
      } else if (this.props.controls.pause) {
        this._youtube.pauseVideo();
        dispatchQueue.push((0, _actions.pause)(false));
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
          dispatchQueue.push((0, _actions.invalid)(false));
          dispatchQueue.push((0, _actions.hideOverlay)());
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
        origin: "development" === 'development' ? 'http://localhost:3000' : "http://www.bchanx.com",
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
    // TODO: set volume to 100
    event.target.setVolume(0);
    this.setState({
      ready: true
    });
  },

  onPlayerStateChange: function onPlayerStateChange(event) {
    var _props2;

    var dispatchQueue = [(0, _actions.nowPlaying)(event.data === YT.PlayerState.PLAYING, event.data)];

    if (event.data === YT.PlayerState.PLAYING && this.props.current.media.type === _actionTypes.TYPES.UNKNOWN) {
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
          hidden: this.props.current.media.type !== _actionTypes.TYPES.YOUTUBE
        }) },
      _react2.default.createElement('div', { id: 'youtube-iframe' })
    );
  }
});

exports.default = YouTube;

},{"./redux/actionTypes":19,"./redux/actions":20,"classnames":"classnames","react":"react","react-dom":"react-dom","react-script-loader":"react-script-loader","react-timer-mixin":"react-timer-mixin"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Controls
var PLAY = exports.PLAY = 'PLAY';
var PAUSE = exports.PAUSE = 'PAUSE';
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
var NOW_PLAYING = exports.NOW_PLAYING = 'NOW_PLAYING';
var PLAY_NEXT = exports.PLAY_NEXT = 'PLAY_NEXT';
var PLAY_PREV = exports.PLAY_PREV = 'PLAY_PREV';
var QUEUE_NEXT = exports.QUEUE_NEXT = 'QUEUE_NEXT';
var PLAY_NOW = exports.PLAY_NOW = 'PLAY_NOW';
var PLAY_CURRENT = exports.PLAY_CURRENT = 'PLAY_CURRENT';
var SELECT_PLAYLIST = exports.SELECT_PLAYLIST = 'SELECT_PLAYLIST';
var RESTART_PLAYLIST = exports.RESTART_PLAYLIST = 'RESTART_PLAYLIST';

// Playlist
var ADD_TO_PLAYLIST = exports.ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
var REMOVE_FROM_PLAYLIST = exports.REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';
var DELETE_PLAYLIST = exports.DELETE_PLAYLIST = 'DELETE_PLAYLIST';

// Media types
var TYPES = exports.TYPES = {
  UNKNOWN: '-1',
  YOUTUBE: '1'
};

// Media sources
var SOURCES = exports.SOURCES = {
  UNKNOWN: -1,
  PLAYLIST: 1,
  QUEUE: 2
};

// YT.PlayerState.UNSTARTED (-1)
// YT.PlayerState.ENDED (0)
// YT.PlayerState.PLAYING (1)
// YT.PlayerState.PAUSED (2)
// YT.PlayerState.BUFFERING (3)
// YT.PlayerState.CUED (5)

},{}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.play = play;
exports.pause = pause;
exports.repeat = repeat;
exports.shuffle = shuffle;
exports.playlist = playlist;
exports.invalid = invalid;
exports.fullscreen = fullscreen;
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

var _actionTypes = require('./actionTypes');

function play(status) {
  return { type: _actionTypes.PLAY, status: !!status };
}

function pause(status) {
  return { type: _actionTypes.PAUSE, status: !!status };
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

function playNow(id, type, title, duration, source) {
  return { type: _actionTypes.PLAY_NOW, media: { id: id, type: type, title: title, duration: duration }, source: source };
}

function queueNext(id, type, title, duration) {
  return { type: _actionTypes.QUEUE_NEXT, media: { id: id, type: type, title: title, duration: duration } };
}

function selectPlaylist(index) {
  return { type: _actionTypes.SELECT_PLAYLIST, playlist: index };
}

},{"./actionTypes":19}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _actionTypes = require('./actionTypes');

var update = function update(state, updated) {
  return Object.assign({}, state, updated);
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

    case _actionTypes.FULLSCREEN:
      return update(state, {
        isFullscreen: action.status
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
          type: _actionTypes.TYPES.UNKNOWN,
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
        var newOrder = playlists[state.playlist.index] && playlists[state.playlist.index].media || [];
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
        var newQueue = state.queue.slice();
        newQueue.push(action.media);

        return update(state, {
          queue: newQueue
        });
      }
      return state;

    case _actionTypes.SELECT_PLAYLIST:
      var playlistIndex = action.playlist || 0;
      var playlist = playlists[playlistIndex] || {};
      var playlistOrder = playlist.media || [];
      var playlistName = playlist.name || '';
      if (controls.shuffle) {
        playlistOrder = shuffle(playlistOrder);
      }

      return update(state, {
        playlist: {
          index: playlistIndex,
          name: playlistName
        },
        index: -1,
        order: playlistOrder
      });

    default:
      return state;
  }
};

var playlists = function playlists(state, action) {
  switch (action.type) {
    default:
      return state;
  }
};

function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  return {
    controls: controls(state.controls, action),
    search: search(state.search, action),
    overlay: overlay(state.overlay, action),
    playlists: playlists(state.playlists, action),
    current: current(state.current, action, state.controls, state.playlists)
  };
}

},{"./actionTypes":19}],22:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createBrowserHistory = require('history/lib/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var history = (0, _createBrowserHistory2.default)();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter2.default,
  { history: history },
  (0, _routes2.default)()
), document.getElementById('app'));

},{"./routes":23,"history/lib/createBrowserHistory":30,"react":"react","react-dom":"react-dom","react-router":"react-router"}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: _App2.default },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/jukebox', component: _Jukebox2.default })
  );
};

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

},{"./components/App":1,"./components/Home":3,"./components/jukebox/Jukebox":7,"react":"react","react-router":"react-router"}],24:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
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
    clearTimeout(timeout);
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
        setTimeout(drainQueue, 0);
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

},{}],25:[function(require,module,exports){
/**
 * Indicates that navigation was caused by a call to history.push.
 */
'use strict';

exports.__esModule = true;
var PUSH = 'PUSH';

exports.PUSH = PUSH;
/**
 * Indicates that navigation was caused by a call to history.replace.
 */
var REPLACE = 'REPLACE';

exports.REPLACE = REPLACE;
/**
 * Indicates that navigation was caused by some other action such
 * as using a browser's back/forward buttons and/or manually manipulating
 * the URL in a browser's location bar. This is the default.
 *
 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
 * for more information.
 */
var POP = 'POP';

exports.POP = POP;
exports['default'] = {
  PUSH: PUSH,
  REPLACE: REPLACE,
  POP: POP
};
},{}],26:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.loopAsync = loopAsync;

function loopAsync(turns, work, callback) {
  var currentTurn = 0;
  var isDone = false;

  function done() {
    isDone = true;
    callback.apply(this, arguments);
  }

  function next() {
    if (isDone) return;

    if (currentTurn < turns) {
      work.call(this, currentTurn++, next, done);
    } else {
      done.apply(this, arguments);
    }
  }

  next();
}
},{}],27:[function(require,module,exports){
(function (process){
/*eslint-disable no-empty */
'use strict';

exports.__esModule = true;
exports.saveState = saveState;
exports.readState = readState;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var KeyPrefix = '@@History/';
var QuotaExceededError = 'QuotaExceededError';
var SecurityError = 'SecurityError';

function createKey(key) {
  return KeyPrefix + key;
}

function saveState(key, state) {
  try {
    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

      return;
    }

    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
      // Safari "private mode" throws QuotaExceededError.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

      return;
    }

    throw error;
  }
}

function readState(key) {
  var json = undefined;
  try {
    json = window.sessionStorage.getItem(createKey(key));
  } catch (error) {
    if (error.name === SecurityError) {
      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
      // attempt to access window.sessionStorage.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

      return null;
    }
  }

  if (json) {
    try {
      return JSON.parse(json);
    } catch (error) {
      // Ignore invalid JSON.
    }
  }

  return null;
}
}).call(this,require('_process'))
},{"_process":24,"warning":42}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.addEventListener = addEventListener;
exports.removeEventListener = removeEventListener;
exports.getHashPath = getHashPath;
exports.replaceHashPath = replaceHashPath;
exports.getWindowPath = getWindowPath;
exports.go = go;
exports.getUserConfirmation = getUserConfirmation;
exports.supportsHistory = supportsHistory;
exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent('on' + event, listener);
  }
}

function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  return window.location.href.split('#')[1] || '';
}

function replaceHashPath(path) {
  window.location.replace(window.location.pathname + window.location.search + '#' + path);
}

function getWindowPath() {
  return window.location.pathname + window.location.search + window.location.hash;
}

function go(n) {
  if (n) window.history.go(n);
}

function getUserConfirmation(message, callback) {
  callback(window.confirm(message));
}

/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
 */

function supportsHistory() {
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  // FIXME: Work around our browser history not working correctly on Chrome
  // iOS: https://github.com/rackt/react-router/issues/2565
  if (ua.indexOf('CriOS') !== -1) {
    return false;
  }
  return window.history && 'pushState' in window.history;
}

/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  var ua = navigator.userAgent;
  return ua.indexOf('Firefox') === -1;
}
},{}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],30:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _Actions = require('./Actions');

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _DOMStateStorage = require('./DOMStateStorage');

var _createDOMHistory = require('./createDOMHistory');

var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

/**
 * Creates and returns a history object that uses HTML5's history API
 * (pushState, replaceState, and the popstate event) to manage history.
 * This is the recommended method of managing history in browsers because
 * it provides the cleanest URLs.
 *
 * Note: In browsers that do not support the HTML5 history API full
 * page reloads will be used to preserve URLs.
 */
function createBrowserHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Browser history needs a DOM') : _invariant2['default'](false) : undefined;

  var forceRefresh = options.forceRefresh;

  var isSupported = _DOMUtils.supportsHistory();
  var useRefresh = !isSupported || forceRefresh;

  function getCurrentLocation(historyState) {
    historyState = historyState || window.history.state || {};

    var path = _DOMUtils.getWindowPath();
    var _historyState = historyState;
    var key = _historyState.key;

    var state = undefined;
    if (key) {
      state = _DOMStateStorage.readState(key);
    } else {
      state = null;
      key = history.createKey();

      if (isSupported) window.history.replaceState(_extends({}, historyState, { key: key }), null, path);
    }

    var location = _parsePath2['default'](path);

    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
  }

  function startPopStateListener(_ref) {
    var transitionTo = _ref.transitionTo;

    function popStateListener(event) {
      if (event.state === undefined) return; // Ignore extraneous popstate events in WebKit.

      transitionTo(getCurrentLocation(event.state));
    }

    _DOMUtils.addEventListener(window, 'popstate', popStateListener);

    return function () {
      _DOMUtils.removeEventListener(window, 'popstate', popStateListener);
    };
  }

  function finishTransition(location) {
    var basename = location.basename;
    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;
    var state = location.state;
    var action = location.action;
    var key = location.key;

    if (action === _Actions.POP) return; // Nothing to do.

    _DOMStateStorage.saveState(key, state);

    var path = (basename || '') + pathname + search + hash;
    var historyState = {
      key: key
    };

    if (action === _Actions.PUSH) {
      if (useRefresh) {
        window.location.href = path;
        return false; // Prevent location update.
      } else {
          window.history.pushState(historyState, null, path);
        }
    } else {
      // REPLACE
      if (useRefresh) {
        window.location.replace(path);
        return false; // Prevent location update.
      } else {
          window.history.replaceState(historyState, null, path);
        }
    }
  }

  var history = _createDOMHistory2['default'](_extends({}, options, {
    getCurrentLocation: getCurrentLocation,
    finishTransition: finishTransition,
    saveState: _DOMStateStorage.saveState
  }));

  var listenerCount = 0,
      stopPopStateListener = undefined;

  function listenBefore(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listenBefore(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  function listen(listener) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    var unlisten = history.listen(listener);

    return function () {
      unlisten();

      if (--listenerCount === 0) stopPopStateListener();
    };
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (++listenerCount === 1) stopPopStateListener = startPopStateListener(history);

    history.registerTransitionHook(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    history.unregisterTransitionHook(hook);

    if (--listenerCount === 0) stopPopStateListener();
  }

  return _extends({}, history, {
    listenBefore: listenBefore,
    listen: listen,
    registerTransitionHook: registerTransitionHook,
    unregisterTransitionHook: unregisterTransitionHook
  });
}

exports['default'] = createBrowserHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./Actions":25,"./DOMStateStorage":27,"./DOMUtils":28,"./ExecutionEnvironment":29,"./createDOMHistory":31,"./parsePath":36,"_process":24,"invariant":41}],31:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _ExecutionEnvironment = require('./ExecutionEnvironment');

var _DOMUtils = require('./DOMUtils');

var _createHistory = require('./createHistory');

var _createHistory2 = _interopRequireDefault(_createHistory);

function createDOMHistory(options) {
  var history = _createHistory2['default'](_extends({
    getUserConfirmation: _DOMUtils.getUserConfirmation
  }, options, {
    go: _DOMUtils.go
  }));

  function listen(listener) {
    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

    return history.listen(listener);
  }

  return _extends({}, history, {
    listen: listen
  });
}

exports['default'] = createDOMHistory;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./DOMUtils":28,"./ExecutionEnvironment":29,"./createHistory":32,"_process":24,"invariant":41}],32:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _deepEqual = require('deep-equal');

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _AsyncUtils = require('./AsyncUtils');

var _Actions = require('./Actions');

var _createLocation2 = require('./createLocation');

var _createLocation3 = _interopRequireDefault(_createLocation2);

var _runTransitionHook = require('./runTransitionHook');

var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

var _deprecate = require('./deprecate');

var _deprecate2 = _interopRequireDefault(_deprecate);

function createRandomKey(length) {
  return Math.random().toString(36).substr(2, length);
}

function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search &&
  //a.action === b.action && // Different action !== location change.
  a.key === b.key && _deepEqual2['default'](a.state, b.state);
}

var DefaultKeyLength = 6;

function createHistory() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var getCurrentLocation = options.getCurrentLocation;
  var finishTransition = options.finishTransition;
  var saveState = options.saveState;
  var go = options.go;
  var keyLength = options.keyLength;
  var getUserConfirmation = options.getUserConfirmation;

  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

  var transitionHooks = [];

  function listenBefore(hook) {
    transitionHooks.push(hook);

    return function () {
      transitionHooks = transitionHooks.filter(function (item) {
        return item !== hook;
      });
    };
  }

  var allKeys = [];
  var changeListeners = [];
  var location = undefined;

  function getCurrent() {
    if (pendingLocation && pendingLocation.action === _Actions.POP) {
      return allKeys.indexOf(pendingLocation.key);
    } else if (location) {
      return allKeys.indexOf(location.key);
    } else {
      return -1;
    }
  }

  function updateLocation(newLocation) {
    var current = getCurrent();

    location = newLocation;

    if (location.action === _Actions.PUSH) {
      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
    } else if (location.action === _Actions.REPLACE) {
      allKeys[current] = location.key;
    }

    changeListeners.forEach(function (listener) {
      listener(location);
    });
  }

  function listen(listener) {
    changeListeners.push(listener);

    if (location) {
      listener(location);
    } else {
      var _location = getCurrentLocation();
      allKeys = [_location.key];
      updateLocation(_location);
    }

    return function () {
      changeListeners = changeListeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function confirmTransitionTo(location, callback) {
    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
        if (result != null) {
          done(result);
        } else {
          next();
        }
      });
    }, function (message) {
      if (getUserConfirmation && typeof message === 'string') {
        getUserConfirmation(message, function (ok) {
          callback(ok !== false);
        });
      } else {
        callback(message !== false);
      }
    });
  }

  var pendingLocation = undefined;

  function transitionTo(nextLocation) {
    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

    pendingLocation = nextLocation;

    confirmTransitionTo(nextLocation, function (ok) {
      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

      if (ok) {
        // treat PUSH to current path like REPLACE to be consistent with browsers
        if (nextLocation.action === _Actions.PUSH) {
          var prevPath = createPath(location);
          var nextPath = createPath(nextLocation);

          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
        }

        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
      } else if (location && nextLocation.action === _Actions.POP) {
        var prevIndex = allKeys.indexOf(location.key);
        var nextIndex = allKeys.indexOf(nextLocation.key);

        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
      }
    });
  }

  function push(location) {
    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
  }

  function replace(location) {
    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function createKey() {
    return createRandomKey(keyLength);
  }

  function createPath(location) {
    if (location == null || typeof location === 'string') return location;

    var pathname = location.pathname;
    var search = location.search;
    var hash = location.hash;

    var result = pathname;

    if (search) result += search;

    if (hash) result += hash;

    return result;
  }

  function createHref(location) {
    return createPath(location);
  }

  function createLocation(location, action) {
    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

    if (typeof action === 'object') {
      //warning(
      //  false,
      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
      //  'location descriptor instead'
      //)

      if (typeof location === 'string') location = _parsePath2['default'](location);

      location = _extends({}, location, { state: action });

      action = key;
      key = arguments[3] || createKey();
    }

    return _createLocation3['default'](location, action, key);
  }

  // deprecated
  function setState(state) {
    if (location) {
      updateLocationState(location, state);
      updateLocation(location);
    } else {
      updateLocationState(getCurrentLocation(), state);
    }
  }

  function updateLocationState(location, state) {
    location.state = _extends({}, location.state, state);
    saveState(location.key, location.state);
  }

  // deprecated
  function registerTransitionHook(hook) {
    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
  }

  // deprecated
  function unregisterTransitionHook(hook) {
    transitionHooks = transitionHooks.filter(function (item) {
      return item !== hook;
    });
  }

  // deprecated
  function pushState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    push(_extends({ state: state }, path));
  }

  // deprecated
  function replaceState(state, path) {
    if (typeof path === 'string') path = _parsePath2['default'](path);

    replace(_extends({ state: state }, path));
  }

  return {
    listenBefore: listenBefore,
    listen: listen,
    transitionTo: transitionTo,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    createKey: createKey,
    createPath: createPath,
    createHref: createHref,
    createLocation: createLocation,

    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
  };
}

exports['default'] = createHistory;
module.exports = exports['default'];
},{"./Actions":25,"./AsyncUtils":26,"./createLocation":33,"./deprecate":34,"./parsePath":36,"./runTransitionHook":37,"deep-equal":38}],33:[function(require,module,exports){
//import warning from 'warning'
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Actions = require('./Actions');

var _parsePath = require('./parsePath');

var _parsePath2 = _interopRequireDefault(_parsePath);

function createLocation() {
  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  if (typeof location === 'string') location = _parsePath2['default'](location);

  if (typeof action === 'object') {
    //warning(
    //  false,
    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
    //  'location descriptor instead'
    //)

    location = _extends({}, location, { state: action });

    action = key || _Actions.POP;
    key = _fourthArg;
  }

  var pathname = location.pathname || '/';
  var search = location.search || '';
  var hash = location.hash || '';
  var state = location.state || null;

  return {
    pathname: pathname,
    search: search,
    hash: hash,
    state: state,
    action: action,
    key: key
  };
}

exports['default'] = createLocation;
module.exports = exports['default'];
},{"./Actions":25,"./parsePath":36}],34:[function(require,module,exports){
//import warning from 'warning'

"use strict";

exports.__esModule = true;
function deprecate(fn) {
  return fn;
  //return function () {
  //  warning(false, '[history] ' + message)
  //  return fn.apply(this, arguments)
  //}
}

exports["default"] = deprecate;
module.exports = exports["default"];
},{}],35:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],36:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _extractPath = require('./extractPath');

var _extractPath2 = _interopRequireDefault(_extractPath);

function parsePath(path) {
  var pathname = _extractPath2['default'](path);
  var search = '';
  var hash = '';

  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

  var hashIndex = pathname.indexOf('#');
  if (hashIndex !== -1) {
    hash = pathname.substring(hashIndex);
    pathname = pathname.substring(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');
  if (searchIndex !== -1) {
    search = pathname.substring(searchIndex);
    pathname = pathname.substring(0, searchIndex);
  }

  if (pathname === '') pathname = '/';

  return {
    pathname: pathname,
    search: search,
    hash: hash
  };
}

exports['default'] = parsePath;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"./extractPath":35,"_process":24,"warning":42}],37:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function runTransitionHook(hook, location, callback) {
  var result = hook(location, callback);

  if (hook.length < 2) {
    // Assume the hook runs synchronously and automatically
    // call the callback with the return value.
    callback(result);
  } else {
    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
  }
}

exports['default'] = runTransitionHook;
module.exports = exports['default'];
}).call(this,require('_process'))
},{"_process":24,"warning":42}],38:[function(require,module,exports){
var pSlice = Array.prototype.slice;
var objectKeys = require('./lib/keys.js');
var isArguments = require('./lib/is_arguments.js');

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;

  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

  // 7.3. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

  // 7.4. For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
}

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer (x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
    return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {//happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

},{"./lib/is_arguments.js":39,"./lib/keys.js":40}],39:[function(require,module,exports){
var supportsArgumentsClass = (function(){
  return Object.prototype.toString.call(arguments)
})() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object){
  return object &&
    typeof object == 'object' &&
    typeof object.length == 'number' &&
    Object.prototype.hasOwnProperty.call(object, 'callee') &&
    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
    false;
};

},{}],40:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],41:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))
},{"_process":24}],42:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))
},{"_process":24}]},{},[22]);
