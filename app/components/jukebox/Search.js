import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import moment from 'moment';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import { searchToggle, searchFocus, playNow, queueNext, playCurrent } from './redux/actions';
import { TYPES, SOURCES } from './redux/actionTypes';
import { Debounce } from './Common';

var Search = React.createClass({

  mixins: [ReactTimerMixin, ReactScriptLoaderMixin, Debounce],

  getDefaultProps: function() {
    return {
      search: {},
      className: '',
      slidr: null,
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      query: '',
      last: '',
      token: null,
      loading: false,
      error: false,
      results: []
    };
  },

  getScriptURL: function() {
    return 'https://apis.google.com/js/client.js?onload=onLoadCallback';
  },

  onScriptLoaded: function() {
    // Google JS script loaded
  },

  onScriptError: function() {
    // Google JS script failed
  },

  _cache: {},

  _addToCache: function(query, token, results, error) {
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

  _finishSearch: function(query, token, results, opt_error) {
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

  _formatTime: function(timestamp) {
    let m = moment.duration(timestamp);
    let seconds = String(m.asSeconds() % 60);
    let minutes = String(Math.floor(m.asMinutes() % 60));
    let hours = String(Math.floor(m.asHours() % 60));
    return [hours, minutes, seconds].map(x => x.length === 1 ? '0' + x : x).join(':').replace(/^[0:]+/g, '');
  },

  _formatViews: function(views) {
    let result = [];
    while(views.length > 3) {
      result.push(views.slice(-3));
      views = views.slice(0, -3);
    }
    result.push(views);
    return result.reverse().join(',');
  },

  _getVideoDetails: function(query, token, items) {
    if (this._youtube && items && items.length) {
      this._youtube.videos.list({
        part: 'contentDetails, statistics',
        id: items.map(item => item.id).join(', ')
      }).then((response) => {
        if (query !== this.state.query) {
          // Query is no longer the latest, ignore
          return;
        }

        if (response && response.result && response.result.items && response.result.items.length) {
          let formatted = response.result.items.map((item, idx) => {
            return {
              id: item.id,
              type: TYPES.YOUTUBE,
              title: items[idx].snippet.title,
              duration: this._formatTime(item.contentDetails.duration),
              thumbnail: items[idx].snippet.thumbnails.medium.url,
              artist: items[idx].snippet.channelTitle,
              description: items[idx].snippet.description,
              publishedAt: moment(items[idx].snippet.publishedAt).fromNow(),
              viewCount: this._formatViews(item.statistics.viewCount)
            };
          });
          this._finishSearch(query, token, formatted);
        }
        else {
          // We reached the end
          this._finishSearch(query, null, []);
        }
      }, (error) => {
        this._finishSearch(query, null, [], true);
      });
    }
  },

  _search: function(query, opt_token) {
    if (this._youtube) {
      if (!query) {
        // Empty query, do nothing
        return;
      }
      else if (query === this.state.last && !opt_token) {
        // Exact same as our last query, do nothing
        return;
      }
      else if (query !== this.state.query) {
        // Query is no longer the latest, ignore
        return;
      }
      else if (this._cache[query] && !opt_token) {
        // Return from cache
        let { token, results, error } = this._cache[query];
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
      }).then((response) => {
        let token = response && response.result && response.result.nextPageToken || null;
        if (response && response.result && response.result.items && response.result.items.length) {
          let items = response.result.items.map(item => {
            return {
              id: item.id.videoId,
              snippet: item.snippet
            };
          });
          this._getVideoDetails(query, token, items);
        }
        else {
          // Empty result, return
          this._finishSearch(query, token, []);
        }
      }, (error) => {
        this._finishSearch(query, null, [], true);
      });
    }
  },

  componentWillMount: function() {
    this.debouncedSearch = this.debounce(this._search, 500);
  },

  _youtube: null,

  onLoadCallback: function() {
    gapi.client.setApiKey(process.env.GOOGLE_BROWSER_API_KEY);
    gapi.client.load('youtube', 'v3').then(() => {
      this._youtube = gapi.client.youtube;
    });
  },

  componentDidMount: function() {
    window.onLoadCallback = this.onLoadCallback;
  },

  componentDidUpdate: function() {
    if (this.props.search.focus) {
      this.refs.searchInput.focus();
      this.props.dispatch(searchFocus(false));
    }
  },

  toggleSearch: function() {
    this.props.dispatch(searchToggle());
  },

  loadMore: function() {
    this.runSearch(this.state.query, this.state.token);
  },

  runSearch: function(query, opt_token) {
    this.setState({
      loading: true
    });
    this.debouncedSearch(query, opt_token);
  },

  handleChange: function(event) {
    let query = event.target.value.trim();
    this.setState({
      query: query,
      error: false
    });
    if (!query) {
      // The empty case, reset
      this._finishSearch('', null, []);
    }
    else if (query === this.state.last) {
      // No change from last successful query
      return this.setState({
        loading: false
      });
    }
    else {
      // Trying to search a new, different query
      this.runSearch(query);
    }
  },

  playResult: function(id, type, title, duration) {
    if (!this.state.loading) {
      this.props.dispatch(playNow(id, type, title, duration, SOURCES.SEARCH));
      this.props.slidr.slide('video-player');
    }
  },

  queueResult: function(id, type, title, duration) {
    if (!this.state.loading) {
      this.props.dispatch(queueNext(id, type, title, duration), playCurrent());
    }
  },

  render: function() {
    return (
      <div className={classNames("search-container", this.props.className, {
        expanded: this.props.search.expand
      })}>
        <div className="search">
          <div className="search-icon" onClick={this.toggleSearch}>
            <span className="ion-ios-search-strong"></span>
          </div>
          <div className="search-content">
            <div className="search-bar">
              <input
                className="search-input"
                type="text"
                ref="searchInput"
                placeholder="Search for..."
                onChange={this.handleChange}
                />
              <div className={classNames("search-loading", {
                hidden: !this.state.loading
              })}>
                <span className="loading-spinner ion-load-c"></span>
              </div>
            </div>
            <div className={classNames("search-results", {
              hidden: !this.state.last,
              disabled: this.state.loading
            })}>
              {this.state.error ? <div className="search-error">An error occured.</div> : null}
              {this.state.results.map((r) => {
                let playHandler = this.playResult.bind(this, r.id, r.type, r.title, r.duration);
                let queueHandler = this.queueResult.bind(this, r.id, r.type, r.title, r.duration);
                return (
                  <div key={r.id} className="search-result">
                    <div className="search-result-thumbnail">
                      <img src={r.thumbnail}/>
                      <div className="search-result-duration">{r.duration}</div>
                      <div className="search-result-overlay">
                        <div className="search-result-action queue" onClick={queueHandler}>
                          <span className="ion-ios-timer"></span>
                          <div className="search-result-action-text">+ QUEUE</div>
                        </div>
                        <div className="search-result-action play" onClick={playHandler}>
                          <span className="ion-ios-play"></span>
                          <div className="search-result-action-text">PLAY</div>
                        </div>
                      </div>
                    </div>
                    <div className="search-result-title">
                      <a href={"https://www.youtube.com/watch?v=" + r.id} target="_blank">{r.title}</a>
                    </div>
                    <div className="search-result-statistics">
                      <span className={classNames("search-result-artist", {
                        unknown: !r.artist
                      })}>{r.artist || 'unknown'}</span>
                    </div>
                    <div className="search-result-statistics">{r.viewCount} views  ·  {r.publishedAt}</div>
                  </div>
                );
              })}
              {!this.state.results.length ?
                <div className="search-none">
                  <span>No results found.</span>
                </div> : null}
              {this.state.results.length && this.state.token ?
                <div className="search-result search-more">
                  <span onClick={this.loadMore}>Load more...</span>
                </div>
              : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Search;
