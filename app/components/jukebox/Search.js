import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import { searchToggle, searchFocus, playNow, queueNext, playCurrent } from './redux/actions';
import { TYPES } from './redux/actionTypes';
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

  _addToCache: function(query, token, results) {
    if (!this._cache[query]) {
      this._cache[query] = {};
    }
    this._cache[query].token = token;
    if (!this._cache[query].results) {
      this._cache[query].results = [];
    }
    this._cache[query].results = this._cache[query].results.concat(results);
  },

  _getVideoDetails: function(query, token, items) {
    if (this._youtube && items && items.length) {
      this._youtube.videos.list({
        part: 'contentDetails, statistics',
        id: items.map(item => item.id).join(', ')
      }).then((response) => {
        console.log("-->> video response:", response);
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
              thumbnail: items[idx].snippet.thumbnails.medium.url,
              duration: item.contentDetails.duration,
              channelTitle: items[idx].snippet.channelTitle,
              description: items[idx].snippet.description,
              publishedAt: items[idx].snippet.publishedAt,
              viewCount: item.statistics.viewCount
            };
          });
          this._addToCache(query, token, formatted);
          this.setState({
            query: query,
            last: query,
            loading: false,
            token: token,
            results: formatted
          });
        }
        else {
          // Uh.. something went wrong
          this.setState({
            query: query,
            last: query,
            loading: false,
            token: null,
            results: []
          });
        }
      }, (error) => {
        console.log("-->> video error:", error);
      });
    }
  },

  _search: function(query, opt_token) {
    // TODO: paginated search
    console.log("-->> perform search!!", query, 'state:', this.state.query, 'token:', opt_token, 'cache:', this._cache);
    if (this._youtube) {
      if (!query) {
        // Empty query, do nothing
        console.log("-->> do nothing..");
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
        let { token, results } = this._cache[query];
        console.log("-->> CACHE HIT!!", token, results);
        return this.setState({
          query: query,
          last: query,
          loading: false,
          token: token,
          results: results
        });
      }

      console.log("-->> NOW actually perform!!:", query);
      this._youtube.search.list({
        maxResults: 5,
        pageToken: opt_token,
        part: 'snippet',
        q: query,
        type: 'video'
      }).then((response) => {
        console.log("-->> query response:", response);
        let token = response && response.result && response.result.nextPageToken || '';
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
          this.setState({
            query: query,
            last: query,
            loading: false,
            token: token,
            results: []
          });
        }
      }, (error) => {
        // TODO: error handling (take out 'snippet')
        console.log("-->> query error:", error);
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

  handleChange: function(event) {
    let query = event.target.value.trim();
    this.setState({
      query: query
    });
    if (!query) {
      // The empty case, reset
      this.setState({
        query: '',
        last: '',
        token: null,
        loading: false,
        results: []
      });
    }
    else if (query === this.state.last) {
      // No change from last successful query
      return this.setState({
        loading: false
      });
    }
    else {
      // Trying to search a new, different query
      this.setState({
        loading: true
      });
      this.debouncedSearch(query);
    }
  },

  playResult: function(id, type) {
    console.log("-->> PLAY RESULT:", id, type);
    if (!this.state.loading) {
      this.props.dispatch(playNow(id, type));
      this.props.slidr.slide('video-player');
    }
  },

  queueResult: function(id, type) {
    console.log("-->> QUEUE RESULT:", id, type);
    if (!this.state.loading) {
      this.props.dispatch(queueNext(id, type), playCurrent());
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
                placeholder="Enter search here..."
                onChange={this.handleChange}
                />
              <div className={classNames("search-loading", {
                hidden: !this.state.loading
              })}>
                <span className="loading-spinner ion-load-c"></span>
              </div>
            </div>
            <div className={classNames("search-results", {
              disabled: this.state.loading
            })}>
              {this.state.results.map((r) => {
                let playHandler = this.playResult.bind(this, r.id, r.type);
                let queueHandler = this.queueResult.bind(this, r.id, r.type);
                return (
                  <div key={r.id} className="search-result">
                    <div className="media-thumbnail">
                      <img src={r.thumbnail}/>
                      <div className="media-overlay">
                        <div className="media-action" onClick={queueHandler}>
                          <span className="ion-ios-list"></span>
                          <div className="media-action-text">+ QUEUE</div>
                        </div>
                        <div className="media-action" onClick={playHandler}>
                          <span className="ion-ios-play"></span>
                          <div className="media-action-text">PLAY</div>
                        </div>
                      </div>
                    </div>
                    <div className="media-title">
                      <a href={"https://www.youtube.com/watch?v=" + r.id} target="_blank">{r.title}</a>
                    </div>
                    <div className="media-channel">{r.channelTitle} - {r.duration}</div>
                    <div className="media-duration">{r.viewCount} - {r.publishedAt}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Search;
