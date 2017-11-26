const DATE_RE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/;
const DATE_FORMAT = 'MMM Do, YYYY';

const SOCIAL_TYPES = {
  liquipedia: 1,
  dotabuff: 2,
  opendota: 3,
  twitter: 4,
//  facebook: 5,
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

const ROUTES = {
  HOME: 'home',
  COMMENTS: 'comments',
  ABOUT: 'about'
};

const DEFAULT_ROUTE = ROUTES.HOME;

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
  template: `
    <div class="player-tile" :class="{ 'not-verified' : !player.isVerified }" @click="hasSource ? showSource() : null">
      <div class="player-rank">{{player.rank}}</div>
      <div class="player-image" v-if="player.image">
        <img :src="player.image"/>
      </div>
      <div class="player-details">
        <div class="player-profile">
          <span class="name">{{player.name}}</span>
          <span class="aliases" v-if="player.aliases">
            <span class="alias" v-for="alias in player.aliases" :key="alias">{{alias}}</span>
          </span>
        </div>
        <div class="player-metadata">
          <span class="region" :class="{ active: filters.region === player.region }">{{player.region}}</span>
          <span class="role" :class="{ active: filters.role === player.role }">{{player.role}}</span>
          <span class="social" v-if="socialTypes.length">
            <a :class="socialType" :href="player.social[socialType]" @click.stop v-for="socialType in socialTypes" :key="socialType" target="_blank"></a>
          </span>
          <span class="date">
            <span :title="player.dateAchieved">{{dateAchieved}}</span>
          </span>
          <span class="verification"></span>
        </div>
      </div>
    </div>
  `,
  computed: {
    dateAchieved: function() {
      // date should have been sanitized as a moment.js object
      let dateObject = this.player.dateObject;
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
    hasSource: function() {
      return !!(this.player.sources || []).length;
    }
  },
  methods: {
    showSource: function() {
      // TODO: toggle source data for player tile
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
        no player info available
      </div>
      <div v-else-if="!filteredPlayers.length" class="placeholder">
        no player matches found
      </div>
      <div v-else class="player-list">
        <div class="placeholder">
          {{!hasSetInputFilters ? 'listing ' + players.length + ' total player' : 'matching ' + filteredPlayers.length + ' / ' + players.length + '  player'}}{{players.length === 1 ? '' : 's'}}
        </div>
        <template v-for="player in filteredPlayers">
          <player-tile :player="player" :filters="filters" :key="player.name"/>
        </template>
      </div>
    </div>
  `,
  computed: {
    hasSetInputFilters: function() {
      return Object.keys(this.filters).filter(x => x !== 'sort' && !!this.filters[x]).length;
    },
    filteredPlayers: function() {
      let players = this.players;
      let input = this.filters.input.toLowerCase();
      let region = this.filters.region;
      let role = this.filters.role;
      let sort = this.filters.sort;

      return this.players.filter(p => {
        return (!region || p.region === region) &&
          (!role || p.role === role) &&
          ((p.name || '').toLowerCase().indexOf(input) >= 0 ||
           !!(p.aliases || []).map(alias => alias.toLowerCase().indexOf(input) >= 0).filter(x => !!x).length);
      }).sort((a, b) => {
        let aDate = a.dateObject;
        let bDate = b.dateObject;
        if (sort === SORT_TYPES.ALPHABETICALLY) {
          return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        } else if (sort === SORT_TYPES.DATE_ACHIEVED) {
          return aDate > bDate ? 1 : aDate < bDate ? -1 : 0;
        } else if (sort === SORT_TYPES.MOST_RECENT) {
          return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
        }
      });
    }
  }
});

Vue.component('filters', {
  props: ['players', 'filters', 'constants'],
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
          <span :class="[showFilters ? 'ion-ios-arrow-up' : 'ion-ios-arrow-down']"></span>
        </div>
        <div class="filter-preview">
          <template v-if="!showFilters && hasSetFilters">
            <div class="username" v-if="filters.input">{{filters.input}}</div>
            <div class="region active" v-if="filters.region">{{filters.region}}</div>
            <div class="role active" v-if="filters.role">{{filters.role}}</div>
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
              <div :class="[key, { active: filters[key] === value }]"
                v-for="value in types"
                :key="value"
                @click="toggleFilter(key, value)">
                {{value}}
              </div>
            </div>
          </div>
        </div>
        <div class="sort-filters">
          <div class="filter-option" v-for="sort in sortTypes" :key="sort">
            <input type="radio" :id="sort" :value="sort" v-model="filterSort"/>
            <label :for="sort">{{constants.SORT_LABELS[sort]}}</label>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    toggleShowFilters: function() {
      this.showFilters = !this.showFilters;
    },
    toggleFilter: function(type, value) {
      this.$emit('setFilter', type, this.filters[type] === value ? '' : value);
    },
    resetFilters: function() {
      this.$emit('resetFilters');
    },
    clearInput: function() {
      this.$emit('setFilter', 'input', '');
    }
  },
  computed: {
    filterInput: {
      get: function getInput() {
        return this.filters.input;
      },
      set: function setInput(newVal) {
        this.$emit('setFilter', 'input', newVal);
      }
    },
    filterSort: {
      get: function getSort() {
        return this.filters.sort;
      },
      set: function setSort(newVal) {
        this.$emit('setFilter', 'sort', newVal);
      }
    },
    hasSetFilters: function() {
      return Object.keys(this.filters).filter(x => x === 'sort' ? this.filters[x] !== DEFAULT_SORT : !!this.filters[x]).length;
    },
    filterTypes: function() {
      let players = this.players;
      let regions = [... new Set(this.players.map(p => p.region.toLowerCase()))].sort();
      let roles = [... new Set(this.players.map(p => p.role.toLowerCase()))].sort();
      return {
        region: regions,
        role: roles
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
      length: Object.keys(sources).length
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
        If there are any mistakes, inconsistencies, or you want to provide a source or general feedback, please leave a <v-link :hash="$root.constants.ROUTES.COMMENTS">comment</v-link>.
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
      sort: DEFAULT_SORT
    },
    currentRoute: DEFAULT_ROUTE,
    constants: {
      SORT_TYPES: SORT_TYPES,
      SORT_LABELS: SORT_LABELS,
      DEFAULT_SORT: DEFAULT_SORT,
      SOCIAL_TYPES: SOCIAL_TYPES,
      ROUTES: ROUTES
    },
  },
  template: `
    <div class="container">
      <navigation
        :routes="constants.ROUTES"
      />
      <template v-if="currentRoute === constants.ROUTES.HOME">
        <filters
          :players="players"
          :filters="filters"
          :constants="constants"
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
    }
    else {
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
            p.region = (p.region || '').toLowerCase();
            p.role = (p.role || '').toLowerCase();
            let date = p.dateAchieved;
            date = DATE_RE.test(date) ? moment(date) : moment(date, DATE_FORMAT);
            // Default malformed dates to current
            p.dateObject = date.isValid() ? date : moment();
            p.isVerified = !date.isValid() ? false : !!p.isVerified;
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
        this.$set(this.filters, filterType, filterType === 'sort' ? DEFAULT_SORT : '');
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
