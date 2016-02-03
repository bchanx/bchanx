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
      dispatch: null
    };
  },

  playPause: function playPause() {
    this.props.dispatch((0, _actions.nowPlaying)(!this.props.current.isPlaying));
  },

  previous: function previous() {
    this.props.dispatch((0, _actions.playPrev)());
  },

  next: function next() {
    this.props.dispatch((0, _actions.playNext)());
  },

  repeat: function repeat() {
    this.props.dispatch((0, _actions.repeat)());
  },

  shuffle: function shuffle() {
    this.props.dispatch((0, _actions.shuffle)());
  },

  playlist: function playlist() {
    this.props.dispatch((0, _actions.playlist)());
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("controls", {
          hidden: this.props.current.mediaType === _actionTypes.TYPES.UNKNOWN && !this.props.current.isQueue && this.props.current.playlist === null
        }) },
      _react2.default.createElement(
        'div',
        { className: 'play-pause-button', onClick: this.playPause },
        _react2.default.createElement('span', { className: (0, _classnames2.default)({
            'ion-ios-play': !this.props.current.isPlaying,
            'ion-ios-pause': this.props.current.isPlaying
          }) })
      ),
      _react2.default.createElement(
        'div',
        { className: 'prev-button', onClick: this.previous },
        _react2.default.createElement('span', { className: 'ion-ios-skipbackward' })
      ),
      _react2.default.createElement(
        'div',
        { className: 'next-button', onClick: this.next },
        _react2.default.createElement('span', { className: 'ion-ios-skipforward' })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("repeat-button", {
            active: this.props.controls.repeat
          }), onClick: this.repeat },
        _react2.default.createElement('span', { className: 'ion-ios-loop-strong' })
      ),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)("shuffle-button", {
            active: this.props.controls.shuffle
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

},{"./redux/actionTypes":15,"./redux/actions":16,"classnames":"classnames","react":"react"}],6:[function(require,module,exports){
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

var _VideoPlaylists = require('./VideoPlaylists');

var _VideoPlaylists2 = _interopRequireDefault(_VideoPlaylists);

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
      current: {
        isPlaying: false,
        isLoading: false,
        mediaId: null,
        mediaType: _actionTypes.TYPES.UNKNOWN,
        playlist: null,
        index: null,
        order: [],
        queue: [],
        isQueue: false
      },
      controls: {
        repeat: false,
        shuffle: true,
        playlist: false
      },
      playlists: [{
        name: 'EDM',
        media: ["0:JbH_Vn5pq8I", "0:Csm3BX30jZQ", "0:Rhm_-gMbTGU", "0:cERIwGKSU1A", "0:XWBEbR47Kwc"]
      }]
    };
  },

  _slidr: null,

  _shouldUpdate: false,

  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    var result = this._shouldUpdate;
    this._shouldUpdate = false;
    return result;
  },

  dispatch: function dispatch() {
    var newState = this.state;

    for (var _len = arguments.length, actions = Array(_len), _key = 0; _key < _len; _key++) {
      actions[_key] = arguments[_key];
    }

    actions.forEach(function (action) {
      newState = (0, _reducers2.default)(newState, action);
    });
    this._shouldUpdate = true;
    this.setState(newState);
  },

  slidr: function slidr() {
    return this._slidr;
  },

  createSlidr: function createSlidr(slidr) {
    var _this = this;

    if (!this._slidr) {
      this._slidr = slidr.create('jukebox-slidr', {
        transition: 'cube',
        overflow: true,
        controls: 'border',
        keyboard: true
      }).add('h', ['video-playlists', 'video-player', 'video-playlists']).add('v', ['video-playlists', 'video-player', 'video-playlists']).start('video-player');
      this.setTimeout(function () {
        _this._shouldUpdate = true;
        _this.setState(_this.state);
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
            active: !!this._slidr
          }) },
        _react2.default.createElement(
          _Slidr2.default,
          { id: 'jukebox-slidr', onLoaded: this.createSlidr },
          _react2.default.createElement(_VideoPlaylists2.default, {
            current: this.state.current,
            playlists: this.state.playlists,
            slidr: this.slidr,
            dispatch: this.dispatch
          }),
          _react2.default.createElement(_VideoPlayer2.default, {
            current: this.state.current,
            controls: this.state.controls,
            dispatch: this.dispatch
          })
        )
      ),
      _react2.default.createElement(_Search2.default, { className: (0, _classnames2.default)({
          active: !!this._slidr
        }) })
    );
  }
});

exports.default = Jukebox;

},{"./Search":9,"./Slidr":10,"./VideoPlayer":12,"./VideoPlaylists":13,"./redux/actionTypes":15,"./redux/reducers":17,"classnames":"classnames","react":"react","react-timer-mixin":"react-timer-mixin"}],7:[function(require,module,exports){
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

var None = _react2.default.createClass({
  displayName: 'None',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {}
    };
  },

  triggerSearch: function triggerSearch() {
    console.log("-->> trigger search!");
  },

  render: function render() {
    var message = undefined;
    if (this.props.current.playlist !== null) {
      message = _react2.default.createElement(
        'div',
        null,
        'You\'ve reached the end of the playlist!',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        'Restart this playlist, choose another, or search a video.'
      );
    } else if (this.props.current.isQueue) {
      message = _react2.default.createElement(
        'div',
        null,
        'You\'ve reached the end of the queue!',
        _react2.default.createElement('br', null),
        _react2.default.createElement('br', null),
        'Please ',
        _react2.default.createElement(
          'span',
          { onClick: this.triggerSearch },
          'search'
        ),
        ' for another video, or select a playlist.'
      );
    } else {
      message = _react2.default.createElement(
        'div',
        null,
        'Select a playlist, or search for a video.'
      );
    }
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("video-none", {
          hidden: this.props.current.mediaType !== _actionTypes.TYPES.UNKNOWN
        }) },
      message
    );
  }
});

exports.default = None;

},{"./redux/actionTypes":15,"classnames":"classnames","react":"react"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Playlist = _react2.default.createClass({
  displayName: "Playlist",

  render: function render() {
    return _react2.default.createElement(
      "div",
      { className: "playlist" },
      "Playlist!"
    );
  }
});

exports.default = Playlist;

},{"react":"react"}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Search = _react2.default.createClass({
  displayName: 'Search',

  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      dispatch: null
    };
  },

  getInitialState: function getInitialState() {
    return {
      expanded: false
    };
  },

  toggleSearch: function toggleSearch() {
    this.setState({
      expanded: !this.state.expanded
    });
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("search", this.props.className, {
          expanded: this.state.expanded
        }) },
      _react2.default.createElement(
        'div',
        { className: 'search-icon', onClick: this.toggleSearch },
        _react2.default.createElement('span', { className: 'ion-ios-search-strong' })
      ),
      _react2.default.createElement('div', { className: 'search-results' })
    );
  }
});

exports.default = Search;

},{"classnames":"classnames","react":"react"}],10:[function(require,module,exports){
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
      { id: this.props.id },
      this.props.children
    );
  }
});

exports.default = Slidr;

},{"react":"react","react-script-loader":"react-script-loader"}],11:[function(require,module,exports){
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

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Video = _react2.default.createClass({
  displayName: 'Video',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      dispatch: null
    };
  },

  playNow: function playNow() {
    this.props.dispatch((0, _actions.playNow)('-_PIGQjrnjI', _actionTypes.TYPES.YOUTUBE));
  },

  // Error: cERIwGKSU1A
  // Valid: OoDHA8dy7JM
  // Terminated: XWBEbR47Kwc
  queueNext: function queueNext() {
    this.props.dispatch((0, _actions.queueNext)('OoDHA8dy7JM', _actionTypes.TYPES.YOUTUBE), (0, _actions.playCurrent)());
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'video' },
      _react2.default.createElement(_None2.default, {
        current: this.props.current
      }),
      _react2.default.createElement(_YouTube2.default, {
        current: this.props.current,
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

},{"./None":7,"./YouTube":14,"./redux/actionTypes":15,"./redux/actions":16,"react":"react"}],12:[function(require,module,exports){
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

var _Playlist = require('./Playlist');

var _Playlist2 = _interopRequireDefault(_Playlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoPlayer = _react2.default.createClass({
  displayName: 'VideoPlayer',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      controls: {},
      dispatch: null
    };
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'video-player', 'data-slidr': 'video-player' },
      _react2.default.createElement(_Video2.default, {
        current: this.props.current,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(_Controls2.default, {
        current: this.props.current,
        controls: this.props.controls,
        dispatch: this.props.dispatch
      }),
      _react2.default.createElement(_Playlist2.default, null)
    );
  }
});

exports.default = VideoPlayer;

},{"./Controls":5,"./Playlist":8,"./Video":11,"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VideoPlaylists = _react2.default.createClass({
  displayName: 'VideoPlaylists',

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      playlists: [],
      slidr: null,
      dispatch: null
    };
  },

  loadPlaylist: function loadPlaylist(index) {
    console.log("-->> playlist clicked!", index);
    this.props.dispatch((0, _actions.selectPlaylist)(index), (0, _actions.playCurrent)());
    if (this.props.slidr) {
      console.log("-->> SLIDE!!");
      this.props.slidr().slide('video-player');
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
      { className: 'video-playlists', 'data-slidr': 'video-playlists' },
      playlists
    );
  }
});

exports.default = VideoPlaylists;

},{"./redux/actions":16,"react":"react"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactScriptLoader = require('react-script-loader');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _actionTypes = require('./redux/actionTypes');

var _actions = require('./redux/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YouTube = _react2.default.createClass({
  displayName: 'YouTube',

  mixins: [_reactScriptLoader.ReactScriptLoaderMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      current: {},
      dispatch: null
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

  componentDidMount: function componentDidMount() {
    window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this._player) {
      if (nextProps.current.mediaType === _actionTypes.TYPES.YOUTUBE) {
        if (nextProps.current.mediaId !== this.props.current.mediaId) {
          this._player.loadVideoById(nextProps.current.mediaId);
        } else if (this.props.current.isPlaying && !nextProps.current.isPlaying) {
          this._player.pauseVideo();
        } else if (!this.props.current.isPlaying && nextProps.current.isPlaying) {
          this._player.playVideo();
        }
      } else if (this.props.current.isPlaying) {
        this._player.pauseVideo();
      }
    }
  },

  _player: null,

  onYouTubeIframeAPIReady: function onYouTubeIframeAPIReady() {
    this._player = new YT.Player('youtube-iframe', {
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
    event.target.setVolume(0);
  },

  onPlayerStateChange: function onPlayerStateChange(event) {
    var _props;

    console.log("-->> PLAYER STATE:", event.data);
    var dispatchQueue = [(0, _actions.nowPlaying)(event.data === YT.PlayerState.PLAYING)];

    if (event.data === YT.PlayerState.BUFFERING) {
      // Sometimes it gets stuck, help it play
      this._player.playVideo();
    }
    if (event.data === YT.PlayerState.ENDED) {
      dispatchQueue.push((0, _actions.playNext)());
    }

    (_props = this.props).dispatch.apply(_props, dispatchQueue);
  },

  stopVideo: function stopVideo() {
    this._player.stopVideo();
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)("youtube", {
          hidden: this.props.current.mediaType !== _actionTypes.TYPES.YOUTUBE
        }) },
      _react2.default.createElement('div', { id: 'youtube-iframe' })
    );
  }
});

exports.default = YouTube;

},{"./redux/actionTypes":15,"./redux/actions":16,"classnames":"classnames","react":"react","react-script-loader":"react-script-loader"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Controls
var SHUFFLE = exports.SHUFFLE = 'SHUFFLE';
var REPEAT = exports.REPEAT = 'REPEAT';
var PLAYLIST = exports.PLAYLIST = 'PLAYLIST';

// Current
var NOW_PLAYING = exports.NOW_PLAYING = 'NOW_PLAYING';
var PLAY_NEXT = exports.PLAY_NEXT = 'PLAY_NEXT';
var PLAY_PREV = exports.PLAY_PREV = 'PLAY_PREV';
var QUEUE_NEXT = exports.QUEUE_NEXT = 'QUEUE_NEXT';
var PLAY_NOW = exports.PLAY_NOW = 'PLAY_NOW';
var PLAY_CURRENT = exports.PLAY_CURRENT = 'PLAY_CURRENT';
var SELECT_PLAYLIST = exports.SELECT_PLAYLIST = 'SELECT_PLAYLIST';

// Playlist
var ADD_TO_PLAYLIST = exports.ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST';
var REMOVE_FROM_PLAYLIST = exports.REMOVE_FROM_PLAYLIST = 'REMOVE_FROM_PLAYLIST';
var DELETE_PLAYLIST = exports.DELETE_PLAYLIST = 'DELETE_PLAYLIST';

// Media types
var TYPES = exports.TYPES = {
  UNKNOWN: '-1',
  YOUTUBE: '0'
};

// YT.PlayerState.UNSTARTED (-1)
// YT.PlayerState.ENDED (0)
// YT.PlayerState.PLAYING (1)
// YT.PlayerState.PAUSED (2)
// YT.PlayerState.BUFFERING (3)
// YT.PlayerState.CUED (5)

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffle = shuffle;
exports.repeat = repeat;
exports.playlist = playlist;
exports.nowPlaying = nowPlaying;
exports.playPrev = playPrev;
exports.playNext = playNext;
exports.playCurrent = playCurrent;
exports.playNow = playNow;
exports.queueNext = queueNext;
exports.selectPlaylist = selectPlaylist;

var _actionTypes = require('./actionTypes');

function shuffle() {
  return { type: _actionTypes.SHUFFLE };
}

function repeat() {
  return { type: _actionTypes.REPEAT };
}

function playlist() {
  return { type: _actionTypes.PLAYLIST };
}

function nowPlaying(status) {
  return { type: _actionTypes.NOW_PLAYING, status: status };
}

function playPrev() {
  return { type: _actionTypes.PLAY_PREV };
}

function playNext() {
  return { type: _actionTypes.PLAY_NEXT };
}

function playCurrent() {
  return { type: _actionTypes.PLAY_CURRENT };
}

function playNow(mediaId, mediaType) {
  return { type: _actionTypes.PLAY_NOW, mediaId: mediaId, mediaType: mediaType };
}

function queueNext(mediaId, mediaType) {
  return { type: _actionTypes.QUEUE_NEXT, mediaId: mediaId, mediaType: mediaType };
}

function selectPlaylist(index) {
  return { type: _actionTypes.SELECT_PLAYLIST, playlist: index };
}

},{"./actionTypes":15}],17:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
    case _actionTypes.SHUFFLE:
      return update(state, {
        shuffle: !state.shuffle
      });

    case _actionTypes.REPEAT:
      return update(state, {
        repeat: !state.repeat
      });

    case _actionTypes.PLAYLIST:
      return update(state, {
        playlist: !state.playlist
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

var getVideoMetadata = function getVideoMetadata(video) {
  var mediaType = _actionTypes.TYPES.UNKNOWN;
  var mediaId = null;
  if (video) {
    var meta = video.split(':');
    if (meta.length === 2) {
      mediaType = meta[0];
      mediaId = meta[1];
    }
  }
  return [mediaId, mediaType];
};

var current = function current(state, action, controls, playlists) {
  switch (action.type) {
    case _actionTypes.NOW_PLAYING:
      return update(state, {
        isPlaying: action.status
      });

    case _actionTypes.PLAY_CURRENT:
      if (!state.isPlaying) {
        // If no song is playing, load the next song in queue
        if (state.queue.length) {
          var _state$queue$shift = state.queue.shift();

          var mediaId = _state$queue$shift.mediaId;
          var mediaType = _state$queue$shift.mediaType;

          return update(state, {
            mediaId: mediaId,
            mediaType: mediaType,
            isQueue: true
          });
        }
        // Nothing in queue, load the current indexed track
        else if (state.order[state.index]) {
            var _state$order$state$in = state.order[state.index];
            var mediaId = _state$order$state$in.mediaId;
            var mediaType = _state$order$state$in.mediaType;

            return update(state, {
              mediaId: mediaId,
              mediaType: mediaType,
              isQueue: false
            });
          }
      }
      return state;

    case _actionTypes.PLAY_NEXT:
      if (state.queue.length) {
        // Play next in queue

        var _state$queue$shift2 = state.queue.shift();

        var mediaId = _state$queue$shift2.mediaId;
        var mediaType = _state$queue$shift2.mediaType;

        return update(state, {
          mediaId: mediaId,
          mediaType: mediaType,
          isQueue: true
        });
      } else if (state.index !== null) {
        // Play next in playlist
        var nextIndex = Math.min(state.index + 1, state.order.length);
        if (nextIndex <= state.order.length - 1) {
          var _state$order$nextInde = state.order[nextIndex];
          var mediaId = _state$order$nextInde.mediaId;
          var mediaType = _state$order$nextInde.mediaType;

          return update(state, {
            mediaId: mediaId,
            mediaType: mediaType,
            index: nextIndex,
            isQueue: false
          });
        }

        // Else just update the index so PLAY_PREV works properly
        return update(state, {
          mediaId: null,
          mediaType: _actionTypes.TYPES.UNKNOWN,
          index: nextIndex
        });
      }

      // Nothing to play next
      return update(state, {
        mediaId: null,
        mediaType: _actionTypes.TYPES.UNKNOWN
      });

    case _actionTypes.PLAY_PREV:
      if (!state.isQueue && state.index !== null) {
        // We don't allow going back in the queue
        var prevIndex = Math.min(state.index - 1, state.order.length - 1);
        if (prevIndex >= 0) {
          var _state$order$prevInde = state.order[prevIndex];
          var mediaId = _state$order$prevInde.mediaId;
          var mediaType = _state$order$prevInde.mediaType;

          return update(state, {
            mediaId: mediaId,
            mediaType: mediaType,
            index: prevIndex
          });
        }
      }
      return state;

    case _actionTypes.SHUFFLE:
      if (state.playlist !== null) {
        var newOrder = playlists[state.playlist] && playlists[state.playlist].media || [];
        var currentVideo = state.mediaType + ':' + state.mediaId;
        if (!controls.shuffle) {
          // If shuffle was previously off, then it means we need to shuffle
          newOrder = shuffle(newOrder);
        }
        // If we were previously at the end of the list, keep it there
        var newIndex = state.index >= newOrder.length ? newOrder.length : Math.max(newOrder.indexOf(currentVideo), 0);
        newOrder = newOrder.map(function (video) {
          var _getVideoMetadata = getVideoMetadata(video);

          var _getVideoMetadata2 = _slicedToArray(_getVideoMetadata, 2);

          var mediaId = _getVideoMetadata2[0];
          var mediaType = _getVideoMetadata2[1];

          return {
            mediaId: mediaId,
            mediaType: mediaType
          };
        });

        return update(state, {
          index: newIndex,
          order: newOrder
        });
      }
      return state;

    case _actionTypes.PLAY_NOW:
      return update(state, {
        mediaId: action.mediaId,
        mediaType: action.mediaType
      });

    case _actionTypes.QUEUE_NEXT:
      var newQueue = state.queue.slice();
      newQueue.push({
        mediaId: action.mediaId,
        mediaType: action.mediaType
      });

      return update(state, {
        queue: newQueue
      });

    case _actionTypes.SELECT_PLAYLIST:
      var currentPlaylist = action.playlist || 0;
      var playlistOrder = playlists[currentPlaylist] && playlists[currentPlaylist].media || [];
      if (controls.shuffle) {
        playlistOrder = shuffle(playlistOrder);
      }
      playlistOrder = playlistOrder.map(function (video) {
        var _getVideoMetadata3 = getVideoMetadata(video);

        var _getVideoMetadata4 = _slicedToArray(_getVideoMetadata3, 2);

        var mediaId = _getVideoMetadata4[0];
        var mediaType = _getVideoMetadata4[1];

        return {
          mediaId: mediaId,
          mediaType: mediaType
        };
      });

      return update(state, {
        playlist: currentPlaylist,
        index: 0,
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
    playlists: playlists(state.playlists, action),
    current: current(state.current, action, state.controls, state.playlists)
  };
}

},{"./actionTypes":15}],18:[function(require,module,exports){
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

},{"./routes":19,"history/lib/createBrowserHistory":26,"react":"react","react-dom":"react-dom","react-router":"react-router"}],19:[function(require,module,exports){
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

},{"./components/App":1,"./components/Home":3,"./components/jukebox/Jukebox":6,"react":"react","react-router":"react-router"}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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
},{}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
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
},{"_process":20,"warning":38}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
exports.canUseDOM = canUseDOM;
},{}],26:[function(require,module,exports){
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
},{"./Actions":21,"./DOMStateStorage":23,"./DOMUtils":24,"./ExecutionEnvironment":25,"./createDOMHistory":27,"./parsePath":32,"_process":20,"invariant":37}],27:[function(require,module,exports){
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
},{"./DOMUtils":24,"./ExecutionEnvironment":25,"./createHistory":28,"_process":20,"invariant":37}],28:[function(require,module,exports){
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
},{"./Actions":21,"./AsyncUtils":22,"./createLocation":29,"./deprecate":30,"./parsePath":32,"./runTransitionHook":33,"deep-equal":34}],29:[function(require,module,exports){
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
},{"./Actions":21,"./parsePath":32}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
"use strict";

exports.__esModule = true;
function extractPath(string) {
  var match = string.match(/^https?:\/\/[^\/]*/);

  if (match == null) return string;

  return string.substring(match[0].length);
}

exports["default"] = extractPath;
module.exports = exports["default"];
},{}],32:[function(require,module,exports){
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
},{"./extractPath":31,"_process":20,"warning":38}],33:[function(require,module,exports){
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
},{"_process":20,"warning":38}],34:[function(require,module,exports){
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

},{"./lib/is_arguments.js":35,"./lib/keys.js":36}],35:[function(require,module,exports){
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

},{}],36:[function(require,module,exports){
exports = module.exports = typeof Object.keys === 'function'
  ? Object.keys : shim;

exports.shim = shim;
function shim (obj) {
  var keys = [];
  for (var key in obj) keys.push(key);
  return keys;
}

},{}],37:[function(require,module,exports){
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
},{"_process":20}],38:[function(require,module,exports){
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
},{"_process":20}]},{},[18]);
