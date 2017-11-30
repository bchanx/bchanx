const DATE_RE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{2}:\d{2}/;
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
  STATS: 'stats',
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

const capitalize = function(str) {
  return (str[0] || '').toUpperCase() + str.slice(1);
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

Vue.component('player-info', {
  props: ['player', 'filters'],
  template: `
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
  `,
  computed: {
    socialTypes: function() {
      return Object.keys(this.player.social || {}).filter(x => !!SOCIAL_TYPES[x]).sort((a, b) => {
        a = SOCIAL_TYPES[a];
        b = SOCIAL_TYPES[b];
        return a > b ? 1 : a < b ? -1 : 0;
      });
    },
    dateAchieved: function() {
      // date should have been sanitized as a moment.js object
      let is10k = this.filters.misc === '10k' && this.player['10k'];
      let dateObject = is10k ? this.player['10k'].dateObject : this.player.dateObject;
      if (dateObject && moment.isMoment(dateObject)) {
        return dateObject.format(DATE_FORMAT);
      }
      return 'N/A';
    }
  }
});

Vue.component('player-sources', {
  props: ['player', 'filters', 'getHeroImageURL', 'width'],
  template: ` 
    <div class="player-sources">
      <div class="source-row">
        <div class="source-type">details</div>
        <div class="source-details match-info">
          <div class="match-hero" v-if="matchSources.hero">
            <img :title="matchSources.title" :src="getHeroImageURL(matchSources.hero)"/>
          </div>
          <template v-if="matchSources.matches.length">
            <a class="match-link action" :href="match.url" target="_blank" @click.stop v-for="match in matchSources.matches" :key="match.type">{{match.type}}</a>
          </template>
          <template v-else>
            <span class="placeholder">missing match id.</span>
          </template>
          <span class="player-age">Age Achieved: <b>{{ageAchieved}}</b></span>
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
            <iframe :width="width" height="280" :src="getYouTubeURL(source.url)" frameborder="0" allowfullscreen></iframe>
          </template>
          <template v-else-if="source.type === $root.constants.SOURCE_TYPES.FACEBOOK">
            <div class="fb-post" :data-href="source.url" :data-width="width"></div>
          </template>
          <template v-else>
            <a :href="source.url" target="_blank">{{source.url}}</a>
          </template>
        </div>
      </div>
    </div>
  `,
  computed: {
    matchSources: function() {
      let is10k = !!(this.filters.misc === '10k' && !!this.player.misc['10k']);
      let matches = ((is10k ? this.player.misc['10k'].sources : this.player.sources) || []).filter(s => s.type === SOURCE_TYPES.DOTABUFF || s.type === SOURCE_TYPES.OPENDOTA).sort((a, b) => a.type > b.type ? 1 : a.type < b.type ? -1 : 0);
      let hero = (is10k ? this.player.misc['10k'].hero : this.player.hero) || '';
      return {
        matches,
        hero: hero,
        title: hero && hero.split('_').map(capitalize).join(' ')
      };
    },
    mediaSources: function() {
      let is10k = !!(this.filters.misc === '10k' && !!this.player.misc['10k']);
      let media = ((is10k ? this.player.misc['10k'].sources : this.player.sources) || []).filter(s => s.type !== SOURCE_TYPES.DOTABUFF && s.type !== SOURCE_TYPES.OPENDOTA);
      return media;
    },
    ageAchieved: function() {
      let is10k = !!(this.filters.misc === '10k' && this.player.misc['10k']);
      return (is10k ? this.player['10k'].ageAchieved : this.player.ageAchieved) || '?';
    }
  },
  methods: {
    getYouTubeURL: function(url) {
      return url.replace('/watch?v=', '/embed/');
    },
    getFacebookURL: function(url) {
      let isVideo = url.indexOf('/videos/') > 0;
      return 'https://www.facebook.com/plugins/' + (isVideo ? 'video' : 'post') + '.php?href=' + encodeURIComponent(url) + (isVideo ? '&show_text=0&width=500' : '');
    }
  }
});

Vue.component('player-tile', {
  props: ['player', 'filters', 'getHeroImageURL'],
  data: function() {
    return {
      showPlayerSource: false
    };
  },
  template: `
    <div class="player-tile" :class="{ 'not-verified' : !player.isVerified, 'active': showPlayerSource }" @click="showSource">
      <div class="player-rank">{{filters.misc === '10k' && !!player['10k'] ? player['10k'].rank : player.rank}}</div>
      <player-info :player="player" :filters="filters"/>
      <player-sources v-bind="{ player, filters, getHeroImageURL }" :width="getElementWidth()" v-if="showPlayerSource"/>
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
  methods: {
    showSource: function() {
      this.showPlayerSource = !this.showPlayerSource;
    },
    getElementWidth: function() {
      return Math.min(this.$el.querySelector('.player-details').offsetWidth, 500);
    }
  }
});

Vue.component('results', {
  props: ['isLoading', 'players', 'filters', 'getHeroImageURL'],
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
          <player-tile v-bind="{ player, filters, getHeroImageURL }" :key="player.name"/>
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
        <div class="filter-reset" v-if="hasSetFilters">
          <span class="action" @click="resetFilters">reset</span>
        </div>
      </div>
      <div class="filter-types" v-if="showFilters">
        <div class="input-filters" v-if="showFilters">
          <!--
          <div class="filter-option">
            <div class="filter-label">username</div>
            <div class="filter-input">
              <input v-model.trim="filterInput"/>
              <span class="filter-input-clear action ion-close" v-if="filters.input.length" @click="clearInput"></span>
            </div>
          </div>-->
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
      <share/>
      <div class="links">
        reddit: <a class="action" href="https://www.reddit.com/r/DotA2/comments/7gi91n/all_the_stats_about_players_that_reached_9_0_0_0" target="_blank">thread</a>
        site: <a class="action" href="http://bchanx.com" target="_blank">bchanx.com</a>
        me: <a class="action" href="https://twitter.com/bchanx" target="_blank">@bchanx</a>
      </div>
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
        The raw list of compiled data can be viewed <a class="action" :href="dataURL" target="_blank">here</a>. If there are any mistakes, inconsistencies, or you want to add to the list or give feedback, leave me a <v-link :hash="$root.constants.ROUTES.COMMENTS">comment</v-link>.
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

Vue.component('share', {
  template: `
    <div class="share">
      <div class="fb-like" data-href="http://bchanx.com/9kmmr" data-layout="button" data-action="like" data-size="small" data-show-faces="false" data-share="true"></div>
      <a class="twitter-share-button" href="https://twitter.com/intent/tweet" data-via="bchanx"></a>
    </div>
  `
});

Vue.component('hero-chart', {
  props: ['data'],
  template: `
    <div class="hero-chart">
      <div class="hero-row" v-for="row in data" :key="row.count">
        <div class="hero-count">{{row.count}}x</div>
        <div class="hero-images">
          <div class="match-hero" v-for="hero in row.heroes" :key="hero.name" :data-hero="hero.hero" :data-players="hero.players">
            <img :src="hero.url"/>
          </div>
        </div>
      </div>
    </div>
  `
});

Vue.component('stats', {
  props: ['players', 'isLoading', 'getHeroImageURL'],
  data: function() {
    return {
      MONTHS: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      COLORS: {
        facebook: '#3B5998',
        twitter: '#1DA1F2',
        weibo: '#df2029',
        instagram: '#262626',
        default: '#d8d8d8'
      }
    };
  },
  template: `
    <div class="stats">
      <div v-if="isLoading" class="placeholder">
        loading...
      </div>
      <div v-else-if="!players.length" class="placeholder">
        something went wrong
      </div>
      <template v-else>
        <div class="chart-title"># players achieved by date</div>
        <line-chart :data="dateData" :discrete="true" :colors="['#125c9e']" :library="playerTooltipOptions"/>
        <div class="chart-title">players by date achieved vs age{{ageData.length < players.length ? ' (for ' + ageData.length + ' players with age data)' : ''}}</div>
        <scatter-chart :data="ageData" xtitle="date" ytitle="age" :colors="['#309eff']" :library="ageDataOptions"/>
        <div class="chart-title"># players by role</div>
        <bar-chart :data="roleData" :colors="['#0074D9']" :library="playerTooltipOptions"/>
        <div class="chart-title">heroes used for 9k match{{hasHeroCount < players.length ? ' (for ' + hasHeroCount + ' players with hero data)' : ''}}</div>
        <hero-chart :data="heroData"/>
        <div class="chart-title"># players by region</div>
        <column-chart :data="regionData" :colors="['#0074D9']" :library="playerTooltipOptions"/>
        <div class="chart-title"># players by country</div>
        <geo-chart :data="countryData" :library="{ backgroundColor: 'transparent', colorAxis: { colors: ['#d6ebff', '#125c9e'] } }"/>
        <div class="chart-title"># players that posted their achievement on social media</div>
        <pie-chart :data="socialData.result" :colors="socialData.colors" :donut="true"/>
      </template>
    </div>
  `,
  computed: {
    dateData: function() {
      let data = {};
      this.players.forEach(p => {
        let date = p.dateObject;
        let month = date.format('MMM');
        let year = date.year().toString();
        if (!data[year]) {
          data[year] = {};
        }
        data[year][month] = (data[year][month] || 0) + 1;
      });
      let years = Object.keys(data).sort();
      years.forEach(y => {
        this.MONTHS.forEach(m => {
          if (!data[y][m]) {
            data[y][m] = 0;
          }
        });
      });

      let result = [];
      years.forEach((y, ydx) => {
        let crawlIdx = 0;
        if (ydx === 0) {
          // If this is the first year, find the first datapoint
          while(!data[y][this.MONTHS[crawlIdx]]) crawlIdx++;
        } else if (ydx === years.length - 1) {
          // If this is the last year, find the last datapoint
          crawlIdx = this.MONTHS.length - 1;
          while(!data[y][this.MONTHS[crawlIdx]]) crawlIdx--;
        }
        this.MONTHS.forEach((m, mdx) => {
          let skip = (ydx === 0) ? mdx < crawlIdx : (ydx === years.length - 1) ? mdx > crawlIdx : false;
          if (!skip) {
            let key = m + ' ' + y;
            result.push([key, data[y][m]]);
          }
        });
      });
      return result;
    },
    ageData: function() {
      let result = [];
      this.players.filter(p => !!p.ageAchieved && !!p.dateObject).forEach(p => {
        result.push([p.dateObject.unix(), p.ageAchieved, p.name]);
      });
      return result;
    },
    ageDataOptions: function() {
      return {
        scales: {
          xAxes: [{
            ticks: {
              userCallback: function(label, index, labels) {
                return moment.unix(label).format(DATE_FORMAT)
              }
            }
          }]
        },
        tooltips: {
          callbacks: {
            title: this.titleCallback,
            label: function(tooltipItem, data) {
              let timestamp = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].x;
              return moment.unix(timestamp).format(DATE_FORMAT);
            }
          }
        }
      };
    },
    playerTooltipOptions: function() {
      return {
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              return 'Players: ' + (data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || "0");
            }
          }
        }
      };
    },
    regionData: function() {
      let data = {};
      this.players.forEach(p => {
        data[p.region] = (data[p.region] || 0) + 1;
      });
      let result = [];
      Object.keys(data).sort().forEach(d => {
        result.push([[d.toUpperCase()], data[d]]);
      });
      return result;
    },
    roleData: function() {
      let data = {};
      this.players.forEach(p => {
        data[p.role] = (data[p.role] || 0) + 1;
      });
      let result = [];
      Object.keys(data).sort().forEach(d => {
        result.push([[capitalize(d)], data[d]]);
      });
      return result;
    },
    hasHeroCount: function() {
      return this.players.filter(p => !!p.hero).length;
    },
    heroData: function() {
      let data = {};
      this.players.filter(p => !!p.hero).forEach(p => {
        if (!data[p.hero]) {
          data[p.hero] = {
            count: 0,
            players: []
          };
        }
        data[p.hero].count += 1;
        data[p.hero].players.push(p.name);
      });

      let byCount = {};
      Object.keys(data).forEach(d => {
        let count = data[d].count;
        if (!byCount[count]) {
          byCount[count] = [];
        }
        byCount[count].push(d);
      });

      let result = [];
      Object.keys(byCount).sort().reverse().forEach(count => {
        result.push({
          count: count,
          heroes: byCount[count].sort().map(name => {
            return {
              name: name,
              url: this.getHeroImageURL(name),
              hero: name.split('_').map(capitalize).join(' '),
              players: '(' + data[name].players.sort().join(', ') + ')'
            };
          })
        });
      });
      return result;
    },
    countryData: function() {
      let data = {};
      this.players.forEach(p => {
        data[p.country] = (data[p.country] || 0) + 1;
      });

      let result = Object.keys(data).map(country => [country.split('_').map(capitalize).join(' '), data[country]]);
      return result;
    },
    socialData: function() {
      let data = {};

      this.players.forEach(p => {
        let selfPost = null;
        (p.sources || []).forEach(source => {
          if (!selfPost && !!source.self) {
            selfPost = source;
          }
        });
        let type = selfPost ? (selfPost.source || selfPost.type) : 'N/A';
        if (!data[type]) {
          data[type] = { count: 0, players: [] };
        }
        data[type].count += 1;
        data[type].players.push(p.name);
      });

      let result = Object.keys(data).sort((a, b) => data[a].count > data[b].count ? -1 : data[a].count < data[b].count ? 1 : 0);
      let colors = result.map(type => this.COLORS[type] || this.COLORS.default);

      result = result.map(socialType => {
        return [capitalize(socialType), data[socialType].count];
      });

      return {
        result,
        colors
      };
    }
  },
  methods: {
    titleCallback: function(tooltipItem, data) {
      let index = tooltipItem[0].index;
      let name = this.ageData[index][2];
      let age = this.ageData[index][1];
      return name + ' (' + age + ')';
    },
    numPlayerCallback: function(tooltipItem, data) {
      return 'value';
    }
  }
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
      <navigation :routes="constants.ROUTES"/>
      <template v-if="currentRoute === constants.ROUTES.HOME">
        <filters
          v-if="!isLoading && players.length"
          v-bind="{ players, filters }"
          v-on:setFilter="setFilter"
          v-on:resetFilters="resetFilters"
        />
        <results v-bind="{ isLoading, players, filters, getHeroImageURL }"/>
      </template>
      <template v-else-if="currentRoute === constants.ROUTES.STATS">
        <stats v-bind="{ players, isLoading, getHeroImageURL }"/>
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
          players = players.filter(p => !!(p.name && p.region && p.role));
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

            if (date.isValid()) {
              let age = moment(p.dob, DATE_FORMAT);
              if (age.isValid()) {
                // Both age and date achieved is known, figure out age at time of achievement
                p.ageAchieved = Math.floor(moment.duration(date.diff(age)).asYears());
                if (p['10k'] && p['10k'].dateObject) {
                  // Add 10k age achieved
                  p['10k'].ageAchieved = Math.floor(moment.duration(p['10k'].dateObject.diff(age)).asYears());
                }
              }
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
    },
    getHeroImageURL: function(hero) {
      return window.location.origin + '/static/images/9kmmr/heroes/' + hero + '.png';
    }
  }
});

window.addEventListener('popstate', () => {
  let newRoute = window.location.hash.slice(1) || DEFAULT_ROUTE;
  if (Object.keys(ROUTES).map(x => ROUTES[x]).indexOf(newRoute) >= 0) {
    APP.currentRoute = newRoute;
  }
});
