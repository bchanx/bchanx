import React from 'react';
import ReactTimerMixin from 'react-timer-mixin';
import classNames from 'classnames';
import { ReactScriptLoaderMixin } from 'react-script-loader';
import { searchToggle, searchFocus, playNow, queueNext } from './redux/actions';
import { TYPES } from './redux/actionTypes';
import { Debounce } from './Common';

var Search = React.createClass({

  mixins: [ReactTimerMixin, ReactScriptLoaderMixin, Debounce],

  getDefaultProps: function() {
    return {
      search: {},
      className: '',
      dispatch: null
    };
  },

  getInitialState: function() {
    return {
      query: '',
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

  _getVideoDetails: function(query, ids) {
    if (this._youtube && ids && ids.length) {
      this._youtube.videos.list({
        part: 'contentDetails, snippet',
        id: ids.join(', ')
      }).then((response) => {
        console.log("-->> video response:", response);
        if (response && response.result && response.result.items && response.result.items.length) {
          let formatted = response.result.items.map(item => {
            return {
              id: item.id,
              type: TYPES.YOUTUBE,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.default.url,
              duration: item.contentDetails.duration,
              channel: item.snippet.channelTitle,
              description: item.snippet.description
            };
          });
          this.setState({
            query: query,
            results: formatted
          });
        }
      }, (error) => {
        console.log("-->> video error:", error);
      });
    }
  },

  _search: function(query, token) {
    // TODO: paginated search
    if (this._youtube && query) {
      console.log("-->> perform search!!", query);
      this._youtube.search.list({
        maxResults: 5,
//        pageToken: token,
        part: 'snippet',
        q: query,
        type: 'video'
      }).then((response) => {
        console.log("-->> query response:", response);
        if (response && response.result && response.result.items && response.result.items.length) {
          let ids = response.result.items.map(item => {
            return item.id.videoId;
          });
          this._getVideoDetails(query, ids);
        }
        else {
          this.setState({
            query: query,
            results: []
          });
        }
      }, (error) => {
        // TODO: error handling
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
      this.refs.searchBar.focus();
      this.props.dispatch(searchFocus(false));
    }
  },

  toggleSearch: function() {
    this.props.dispatch(searchToggle());
  },

  handleChange: function(event) {
    let value = event.target.value;
    if (!value) {
      console.log("-->> yo reset?!?");
      // TODO: CANCEL DEBOUNCED SEARCH
      this.setState({
        query: '',
        result: []  
      });
    }
    else {
      this.debouncedSearch(value);
    }
  },

  playResult: function(id, type) {
    console.log("-->> PLAY RESULT:", id, type);
    this.props.dispatch(playNow(id, type));
  },

  queueResult: function(id, type) {
    console.log("-->> QUEUE RESULT:", id, type);
    this.props.dispatch(queueNext(id, type));
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
            <input
              className="search-bar"
              type="text"
              ref="searchBar"
              placeholder="Enter search here..."
              onChange={this.handleChange}
              />
            <div className="search-options">
              Results:
            </div>
            <div className="search-results">
              {this.state.results.map((r) => {
                let onClickHandler = this.playResult.bind(this, r.id, r.type);
                return (
                  <div key={r.id} className="search-result" onClick={onClickHandler}>
                    <div className="media-thumbnail">
                      <img src={r.thumbnail}/>
                    </div>
                    <div className="media-title">{r.title}</div>
                    <div className="media-duration">{r.duration}</div>
                    <div className="media-channel">{r.channel}</div>
                    <div className="media-description">{r.description}</div>
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
