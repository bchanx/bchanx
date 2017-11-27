const DATE_RE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/;
const DATE_FORMAT = 'MMM Do, YYYY';

const SOCIAL_TYPES = {
  liquipedia: 1,
  dotabuff: 2,
  opendota: 3,
  twitter: 4,
  weibo: 5,
  instagram: 6,
  twitch: 7,
};

const SORT_TYPES = {
  DATE_ACHIEVED: 'dateAchieved',
  MOST_RECENT: 'mostRecent',
  ALPHABETICALLY: 'alphabetically'
};

const SORT_LABELS = {
  [SORT_TYPES.DATE_ACHIEVED]: 'Date Achieved',
  [SORT_TYPES.MOST_RECENT]: 'Most Recent',
  [SORT_TYPES.ALPHABETICALLY]: 'Alphabetically'
};

const DEFAULT_SORT = SORT_TYPES.DATE_ACHIEVED;

const FILTER_TYPES = {
  INPUT: 'input',
  REGION: 'region',
  ROLE: 'role',
  SORT: 'sort',
  MISC: 'misc'
};

const MISC_FILTER_TYPES = {
  'ti winner': 'wonTI',
  '10k': '10k'
};

const ROUTES = {
  HOME: 'home',
  COMMENTS: 'comments',
  ABOUT: 'about'
};

const DEFAULT_ROUTE = ROUTES.HOME;

const SOURCE_TYPES = {
  REDDIT: 'reddit',
  DOTABUFF: 'dotabuff',
  OPENDOTA: 'opendota',
  IMGUR: 'imgur',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  FACEBOOK: 'facebook',
  YOUTUBE: 'youtube'
};

const CONSTANTS = {
  FILTER_TYPES,
  MISC_FILTER_TYPES,
  SORT_TYPES,
  SORT_LABELS,
  DEFAULT_SORT,
  SOCIAL_TYPES,
  SOURCE_TYPES,
  ROUTES
};


Vue.component('v-link', {
  template: `
    <a
      :href="href"
      class="action"
      :class="{ active: isActive }"
      @click="go"
    >
      #<slot></slot>
    </a>
  `,
  props: {
    hash: {
      type: String,
      required: true
    }
  },
  computed: {
    isActive: function() {
      return this.hash === this.$root.currentRoute;
    },
    href: function() {
      return window.location.pathname + (this.hash === DEFAULT_ROUTE ? '' : '#' + this.hash);
    }
  },
  methods: {
    go: function(event) {
      event.preventDefault();
      this.$root.currentRoute = this.hash;
      let route = window.location.pathname;
      if (this.hash !== DEFAULT_ROUTE) {
        route += '#' + this.hash;
      }
      window.history.pushState(
        null,
        ROUTES[this.hash],
        route
      )
    }
  }
});

Vue.component('player-tile', {
  props: ['player', 'filters'],
  data: function() {
    return {
      showPlayerSource: false
    };
  },
  template: `
    <div class="player-tile" :class="{ 'not-verified' : !player.isVerified, 'active': showPlayerSource }" @click="showSource">
      <div class="player-rank">{{filters.misc === '10k' && !!player['10k'] ? player['10k'].rank : player.rank}}</div>
      <div class="player-info">
        <div class="player-image" v-if="player.image">
          <img :src="player.image"/>
        </div>
        <div class="player-details">
          <div class="player-profile">
            <span class="name">{{player.name}}</span>
            <span class="aliases" v-if="player.aliases">
              <span class="alias" v-for="alias in player.aliases" :key="alias">{{alias}}</span>
            </span>
            <span class="social" v-if="socialTypes.length">
              <a :class="socialType" :href="player.social[socialType]" @click.stop v-for="socialType in socialTypes" :key="socialType" target="_blank"></a>
            </span>
          </div>
          <div class="player-metadata">
            <span class="region" :class="{ active: filters.region === player.region }">{{player.region}}</span>
            <span class="role" :class="{ active: filters.role === player.role }">{{player.role}}</span>
            <template v-if="!!player.misc">
              <span class="misc" :class="{ active: !!player.misc[$root.constants.MISC_FILTER_TYPES[filters.misc]], 'ti-winner': type === 'ti winner' }" v-for="type in Object.keys($root.constants.MISC_FILTER_TYPES)" :key="type" v-if="player.misc[$root.constants.MISC_FILTER_TYPES[type]]">{{type === 'ti winner' ? 'ti ' + player.misc[$root.constants.MISC_FILTER_TYPES[type]] : type}}</span>
            </template>
            <span class="date">
              <span :title="player.dateAchieved">{{dateAchieved}}</span>
            </span>
            <span class="verification"></span>
          </div>
        </div>
      </div>
      <div class="player-sources" v-if="showPlayerSource">
        <div class="source-row">
          <div class="source-type">details</div>
          <div class="source-details match-info">
            <div class="match-hero" v-if="matchSources.hero">
              <img :title="matchSources.hero" :src="getHeroImageURL(matchSources.hero)"/>
            </div>
            <template v-if="matchSources.matches.length">
              <a class="match-link action" :href="match.url" target="_blank" @click.stop v-for="match in matchSources.matches" :key="match.type">{{match.type}}</a>
            </template>
            <template v-else>
              <span class="placeholder">missing match id.</span>
            </template>
          </div>
        </div>
        <div class="source-row" v-for="source in mediaSources">
          <div class="source-type">{{source.type}}</div>
          <div class="source-details" :class="source.type" @click.stop>
            <template v-if="source.type === $root.constants.SOURCE_TYPES.REDDIT">
              <blockquote class="reddit-card" data-card-preview="0"><a :href="source.url"></a><span>loading...</span></blockquote>
            </template>
            <template v-else-if="source.type === $root.constants.SOURCE_TYPES.IMGUR">
              <a :href="source.url.replace('i.imgur', 'imgur')" target="_blank"><img :src="source.url"/></a>
            </template>
            <template v-else-if="source.type === $root.constants.SOURCE_TYPES.TWITTER">
              <blockquote class="twitter-tweet" data-lang="en"><a :href="source.url" target="_blank"></a><span>loading...</span></blockquote>
            </template>
            <template v-else-if="source.type === $root.constants.SOURCE_TYPES.INSTAGRAM">
              <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-version="7" style="width:100%"><a :href="source.url" target="_blank"></a><span>loading...</span></blockquote>
            </template>
            <template v-else-if="source.type === $root.constants.SOURCE_TYPES.YOUTUBE">
              <iframe :width="getElementWidth()" height="280" :src="getYouTubeURL(source.url)" frameborder="0" allowfullscreen></iframe>
            </template>
            <template v-else-if="source.type === $root.constants.SOURCE_TYPES.FACEBOOK">
              <div class="fb-post" :data-href="source.url" :data-width="getElementWidth()"></div>
            </template>
            <template v-else>
              <a :href="source.url" target="_blank">{{source.url}}</a>
            </template>
          </div>
        </div>
      </div>
    </div>
  `,
  watch: {
    filters: {
      handler:  function() {
        // Whenever filter changes, collapse the source cause some embeds stop working
        this.showPlayerSource = false;
      },
      deep: true
    }
  },
  updated: function() {
    if (this.showPlayerSource) {
      if (window.instgrm) {
        instgrm.Embeds.process();
      }
      if (window.FB) {
        FB.XFBML.parse(this.$el);
      }
      // Need to load twitter embeds on a timeout otherwise the layout gets all chopped...
      setTimeout(() => {
        if (window.twttr) {
          twttr.widgets.load(this.$el);
        }
      }, 500);
    }
  },
  computed: {
    dateAchieved: function() {
      // date should have been sanitized as a moment.js object
      let is10k = this.filters.misc === '10k' && this.player['10k'];
      let dateObject = is10k ? this.player['10k'].dateObject : this.player.dateObject;
      if (dateObject && moment.isMoment(dateObject)) {
        return dateObject.format(DATE_FORMAT);
      }
      return 'N/A';
    },
    socialTypes: function() {
      return Object.keys(this.player.social || {}).filter(x => !!SOCIAL_TYPES[x]).sort((a, b) => {
        a = SOCIAL_TYPES[a];
        b = SOCIAL_TYPES[b];
        return a > b ? 1 : a < b ? -1 : 0;
      });
    },
    matchSources: function() {
      let matches = this.player.sources.filter(s => s.type === SOURCE_TYPES.DOTABUFF || s.type === SOURCE_TYPES.OPENDOTA).sort((a, b) => a.type > b.type ? 1 : a.type < b.type ? -1 : 0);
      return {
        matches,
        hero: this.player.hero
      };
    },
    mediaSources: function() {
      let media = this.player.sources.filter(s => s.type !== SOURCE_TYPES.DOTABUFF && s.type !== SOURCE_TYPES.OPENDOTA);
      return media;
    }
  },
  methods: {
    showSource: function() {
      this.showPlayerSource = !this.showPlayerSource;
    },
    getHeroImageURL: function(hero) {
      return window.location.origin + '/static/images/9kmmr/heroes/' + hero + '.png';
    },
    getYouTubeURL: function(url) {
      return url.replace('/watch?v=', '/embed/');
    },
    getFacebookURL: function(url) {
      let isVideo = url.indexOf('/videos/') > 0;
      return 'https://www.facebook.com/plugins/' + (isVideo ? 'video' : 'post') + '.php?href=' + encodeURIComponent(url) + (isVideo ? '&show_text=0&width=500' : '');
    },
    getElementWidth: function() {
      return Math.min(this.$el.querySelector('.player-details').offsetWidth, 500);
    }
  }
});

Vue.component('results', {
  props: ['isLoading', 'players', 'filters'],
  template: `
    <div class="results">
      <div v-if="isLoading" class="placeholder">
        loading...
      </div>
      <div v-else-if="!players.length" class="placeholder">
        something went wrong
      </div>
      <div v-else-if="!filteredPlayers.length" class="placeholder">
        no player matches found
      </div>
      <div v-else class="player-list">
        <div class="placeholder">
          {{!hasSetInputFilters ? 'listing ' + players.length + ' total player' : 'matching ' + filteredPlayers.length + ' / ' + playerList.length + '  player'}}{{playerList.length === 1 ? '' : 's'}}
        </div>
        <template v-for="player in filteredPlayers">
          <player-tile :player="player" :filters="filters" :key="player.name"/>
        </template>
      </div>
    </div>
  `,
  computed: {
    hasSetInputFilters: function() {
      return Object.keys(this.filters).filter(x => x !== FILTER_TYPES.SORT && !!this.filters[x]).length;
    },
    filteredPlayers: function() {
      let players = this.players;
      let input = this.filters.input.toLowerCase();
      let region = this.filters.region;
      let role = this.filters.role;
      let misc = this.filters.misc;
      let sort = this.filters.sort;

      return this.players.filter(p => {
        return (!region || p.region === region) &&
          (!role || p.role === role) &&
          (!misc || p.misc && !!p.misc[MISC_FILTER_TYPES[misc]]) &&
          ((p.name || '').toLowerCase().indexOf(input) >= 0 ||
           !!(p.aliases || []).map(alias => alias.toLowerCase().indexOf(input) >= 0).filter(x => !!x).length);
      }).sort((a, b) => {
        let aDate = misc === '10k' && a['10k'] ? a['10k'].dateObject : a.dateObject;
        let bDate = misc === '10k' && b['10k'] ? b['10k'].dateObject : b.dateObject;
        let aName = a.name.toLowerCase();
        let bName = b.name.toLowerCase();
        if (sort === SORT_TYPES.ALPHABETICALLY) {
          return aName > bName ? 1 : aName < bName ? -1 : 0;
        } else if (sort === SORT_TYPES.DATE_ACHIEVED) {
          return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
        } else if (sort === SORT_TYPES.MOST_RECENT) {
          return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
        }
      });
    },
    playerList: function() {
      let is10k = this.filters.misc === '10k';
      return is10k ? this.players.filter(p => !!p['10k']) : this.players;
    }
  }
});

Vue.component('filters', {
  props: ['players', 'filters'],
  data: function() {
    return {
      showFilters: true
    };
  },
  template: `
    <div class="filters">
      <div class="filter-header">
        <div class="filter-toggle" @click="toggleShowFilters">
          Filters
          <span :class="[showFilters ? 'ion-ios-arrow-down' : 'ion-ios-arrow-up']"></span>
        </div>
        <div class="filter-preview">
          <template v-if="!showFilters && hasSetFilters">
            <div class="username" v-if="filters.input">{{filters.input}}</div>
            <div class="active" :class="type" v-for="type in Object.keys(filterTypes)" v-if="filters[type]" :key="type">{{filters[type]}}</div>
          </template>
        </div>
        <div class="filter-reset">
          <span class="action" v-if="hasSetFilters" @click="resetFilters">reset</span>
        </div>
      </div>
      <div class="filter-types" v-if="showFilters">
        <div class="input-filters" v-if="showFilters">
          <div class="filter-option">
            <div class="filter-label">username</div>
            <div class="filter-input">
              <input v-model.trim="filterInput"/>
              <span class="filter-input-clear action ion-close" v-if="filters.input.length" @click="clearInput"></span>
            </div>
          </div>
          <div class="filter-option" v-for="(types, key) in filterTypes">
            <div class="filter-label">{{key}}</div>
            <div class="filter-input">
              <div :class="[key, 'has-hover', { active: filters[key] === value, 'ti-winner': key === $root.constants.FILTER_TYPES.MISC && value === 'ti winner' }]"
                v-for="value in types"
                :key="value"
                @click="toggleFilter(key, value)">{{value}}</div>
            </div>
          </div>
        </div>
        <div class="sort-filters">
          <div class="filter-option" v-for="sort in sortTypes" :key="sort">
            <input type="radio" :id="sort" :value="sort" v-model="filterSort"/>
            <label :for="sort">{{$root.constants.SORT_LABELS[sort]}}</label>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    toggleShowFilters: function() {
      // TODO: turn this back on if needed
      // this.showFilters = !this.showFilters;
    },
    toggleFilter: function(type, value) {
      this.$emit('setFilter', type, this.filters[type] === value ? '' : value);
    },
    resetFilters: function() {
      this.$emit('resetFilters');
    },
    clearInput: function() {
      this.$emit('setFilter', FILTER_TYPES.INPUT, '');
    }
  },
  computed: {
    filterInput: {
      get: function getInput() {
        return this.filters.input;
      },
      set: function setInput(newVal) {
        this.$emit('setFilter', FILTER_TYPES.INPUT, newVal);
      }
    },
    filterSort: {
      get: function getSort() {
        return this.filters.sort;
      },
      set: function setSort(newVal) {
        this.$emit('setFilter', FILTER_TYPES.SORT, newVal);
      }
    },
    hasSetFilters: function() {
      return Object.keys(this.filters).filter(x => x === FILTER_TYPES.SORT ? this.filters[x] !== DEFAULT_SORT : !!this.filters[x]).length;
    },
    filterTypes: function() {
      let players = this.players;
      let regions = [... new Set(this.players.map(p => p.region.toLowerCase()))].sort();
      let roles = [... new Set(this.players.map(p => p.role.toLowerCase()))].sort();
      let misc = Object.keys(MISC_FILTER_TYPES);
      return {
        region: regions,
        role: roles,
        misc: misc
      };
    },
    sortTypes: function() {
      return Object.keys(SORT_TYPES).map(x => SORT_TYPES[x]);
    }
  }
});

Vue.component('footnote', {
  template: `
    <div class="footnote">
      site: <a class="action" href="http://bchanx.com" target="_blank">@bchanx</a>
    </div>
  `
});

Vue.component('navigation', {
  props: ['routes'],
  template: `
    <div class="navigation">
      <v-link class="route" v-for="routeName in routes" :hash="routeName" :key="routeName">{{routeName}}</v-link>
    </div>
  `
});

Vue.component('about', {
  data: function() {
    let sources = {
      "Dotabuff": "https://www.dotabuff.com/",
      "OpenDota": "https://www.opendota.com/",
      "Liquipedia": "http://wiki.teamliquid.net/dota2/Main_Page",
      "GosuGamers": "http://www.gosugamers.net/dota2",
      "G:G": "https://ggscore.com/en/dota-2",
      "GT": "http://en.game-tournaments.com/dota-2"
    };
    return {
      sources,
      length: Object.keys(sources).length,
      dataURL: window.location.origin + '/static/data/9kmmr.json'
    };
  },
  template: `
    <div class="about">
      <p>
        This project is an effort to document all players who achieved over <b>9 0 0 0</b> solo ranked matchmaking points in Dota 2 before the <a href="http://blog.dota2.com/2017/11/seasonal-ranked-update/" target="_blank" class="action">seasonal ranked update</a> and recalibration on November 22nd, 2017.
      </p>
      <br/>
      <p>
        A big thank you to
        <span class="sources">
          <template v-for="(href, name, index) in sources">
            <template v-if="length === index + 1"> and </template>
            <a class="action" :key="name" :href="href" target="_blank">{{name}}</a>
            <template v-if="length !== index + 1">,</template>
          </template>
        </span>
        for sourcing player information, images, and match details.
      </p>
      <br/>
      <p>
        The raw list of compiled data can be viewed <a class="action" :href="dataURL" target="_blank">here</a>. If there are any mistakes, inconsistencies, or you want to provide a source or give feedback, please leave a <v-link :hash="$root.constants.ROUTES.COMMENTS">comment</v-link>.
      </p>
      <br/>
      <p>
        Dota is a trademark of Valve Corporation.
      </p>
    </div>
  `
});

Vue.component('comments', {
  template: `
    <div class="comments">
      <vue-disqus shortname="bchanx" title="9 0 0 0 Matchmaking Points" identifier="9kmmr" url="http://www.bchanx.com/9kmmr""></vue-disqus>
    </div>
  `
});

const APP = new Vue({
  el: '#app',
  data: {
    isLoading: false,
    players: [],
    filters: {
      input: '',
      region: '',
      role: '',
      sort: DEFAULT_SORT,
      misc: ''
    },
    currentRoute: DEFAULT_ROUTE,
    constants: CONSTANTS
  },
  template: `
    <div class="container">
      <navigation
        :routes="constants.ROUTES"
      />
      <template v-if="currentRoute === constants.ROUTES.HOME">
        <filters
          v-if="!isLoading && players.length"
          :players="players"
          :filters="filters"
          v-on:setFilter="setFilter"
          v-on:resetFilters="resetFilters"
        />
        <results :isLoading="isLoading" :players="players" :filters="filters"/>
      </template>
      <template v-else-if="currentRoute === constants.ROUTES.COMMENTS">
        <comments/>
      </template>
      <template v-else-if="currentRoute === constants.ROUTES.ABOUT">
        <about/>
      </template>
      <footnote/>
    </div>
  `,
  beforeMount: function() {
    let route = window.location.hash.slice(1);
    if (Object.keys(ROUTES).map(x => ROUTES[x]).indexOf(route) >= 0) {
      this.currentRoute = route;
    } else {
      if (window.location.href.indexOf('#') > 0) {
        window.history.replaceState(
          null,
          DEFAULT_ROUTE,
          window.location.pathname
        )
      }
    }
  },
  mounted: function() {
    this.isLoading = true;
    superagent.get('/static/data/9kmmr.json')
      .accept('application/json')
      .end((err, res) => {
        this.isLoading = false;
        if (!err && res.ok) {
          let players = res.body;

          // Sanitize
          players.forEach(p => {
            p.name = p.name || '';
            p.region = (p.region || '').toLowerCase();
            p.role = (p.role || '').toLowerCase();
            let date = p.dateAchieved;
            date = DATE_RE.test(date) ? moment(date) : moment(date, DATE_FORMAT);
            // Default malformed dates to current
            p.dateObject = date.isValid() ? date : moment();
            p.isVerified = !date.isValid() ? false : !!p.hasMatchInfo;

            let is10k = p.misc && !!p.misc[MISC_FILTER_TYPES['10k']];
            if (is10k) {
              p['10k'] = {
                dateObject: moment(p.misc[MISC_FILTER_TYPES['10k']].dateAchieved)
              };
            }
          });

          // Sort by date achieved
          players = players.sort((a, b) => {
            let aDate = a.dateObject;
            let bDate = b.dateObject;
            return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
          });

          // Add global ranking
          players.forEach((p, idx) => {
            p.rank = idx + 1;
          });

          // Add 10k ranking
          players.filter(p => !!p['10k']).sort((a, b) => {
            let aDate = a['10k'].dateObject;
            let bDate = b['10k'].dateObject;
            return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
          }).forEach((p, idx) => {
            p['10k'].rank = idx + 1;
          });

          // Set the list of players
          this.players = players;
        }
      });
  },
  methods: {
    setFilter: function(key, value) {
      this.$set(this.filters, key, value);
    },
    resetFilters: function() {
      Object.keys(this.filters).forEach(filterType => {
        this.$set(this.filters, filterType, filterType === FILTER_TYPES.SORT ? DEFAULT_SORT : '');
      });
    }
  }
});

window.addEventListener('popstate', () => {
  let newRoute = window.location.hash.slice(1) || DEFAULT_ROUTE;
  if (Object.keys(ROUTES).map(x => ROUTES[x]).indexOf(newRoute) >= 0) {
    APP.currentRoute = newRoute;
  }
});
