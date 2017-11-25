const DATE_RE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/;
const DATE_FORMAT = 'MMMM Do, YYYY';

const SOCIAL_TYPES = {
  liquipedia: 1,
  dotabuff: 2,
  twitter: 4,
  facebook: 5,
  instagram: 6,
  twitch: 3,
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
      return !!(this.player.source || []).length;
    }
  },
  methods: {
    showSource: function() {
      console.log("-->> show source!!");
    }
  }
});

const APP = new Vue({
  el: '#app',
  template: `
    <div class="container">
      <div class="navigation">
        Navigation
      </div>
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
                <input v-model.trim="filters.input"/>
                <span class="filter-input-clear action ion-close" v-if="filters.input.length" @click="clearInput"></span>
              </div>
            </div>
            <div class="filter-option">
              <div class="filter-label">region</div>
              <div class="filter-input">
                <div class="region"
                  :class="{ active: filters.region === region }"
                  v-for="region in regionTypes"
                  :key="region"
                  @click="toggleFilter('region', region)">
                  {{region}}
                </div>
              </div>
            </div>
            <div class="filter-option">
              <div class="filter-label">role</div>
              <div class="filter-input">
                <div class="role"
                  :class="{ active: filters.role === role }"
                  v-for="role in roleTypes"
                  :key="role"
                  @click="toggleFilter('role', role)">
                  {{role}}
                </div>
              </div>
            </div>
          </div>
          <div class="sort-filters">
            <div class="filter-option" v-for="sort in sortTypes" :key="sort">
              <input type="radio" :id="sort" :value="sort" v-model="filters.sort"/>
              <label :for="sort">{{constants.SORT_LABELS[sort]}}</label>
            </div>
          </div>
        </div>
      </div>
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
      <div class="footer">
        site: <a class="action" href="http://bchanx.com" target="_blank">@bchanx</a>
      </div>
    </div>
  `,
  data: {
    constants: {
      SORT_TYPES: SORT_TYPES,
      SORT_LABELS: SORT_LABELS,
      DEFAULT_SORT: DEFAULT_SORT,
      SOCIAL_TYPES: SOCIAL_TYPES
    },
    isLoading: false,
    players: [],
    showFilters: true,
    filters: {
      input: '',
      region: '',
      role: '',
      sort: DEFAULT_SORT
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
    toggleShowFilters: function() {
      this.showFilters = !this.showFilters;
    },
    toggleFilter: function(type, name) {
      this.$set(this.filters, type, this.filters[type] === name ? '' : name);
    },
    resetFilters: function() {
      Object.keys(this.filters).forEach(filterType => {
        this.$set(this.filters, filterType, filterType === 'sort' ? DEFAULT_SORT : '');
      });
    },
    clearInput: function() {
      this.$set(this.filters, 'input', '');
    }
  },
  computed: {
    filteredPlayers: function() {
      let players = this.players;
      let input = this.filters.input.toLowerCase();
      let region = this.filters.region;
      let role = this.filters.role;
      let sort = this.filters.sort;

      return this.players.filter(p => {
        return (!region || p.region === region) &&
          (!role || p.role === role) &&
          (p.name || '').toLowerCase().indexOf(input) >= 0;
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
    },
    hasSetFilters: function() {
      return Object.keys(this.filters).filter(x => x === 'sort' ? this.filters[x] !== DEFAULT_SORT : !!this.filters[x]).length;
    },
    hasSetInputFilters: function() {
      return Object.keys(this.filters).filter(x => x !== 'sort' && !!this.filters[x]).length;
    },
    /*
    filterPreview: function() {
      let preview = '';
      let input = this.filters.input;
      if (input) {
        preview += '"' + input + '"';
      }
      let region = this.filters.region;
      if (region) {
        preview += 
      }
    },*/
    regionTypes: function() {
      let players = this.players;
      let regions = [... new Set(this.players.map(p => p.region.toLowerCase()))].sort();
      return regions;
    },
    roleTypes: function() {
      let players = this.players;
      let roles = [... new Set(this.players.map(p => p.role.toLowerCase()))].sort();
      return roles;
    },
    sortTypes: function() {
      return Object.keys(SORT_TYPES).map(x => SORT_TYPES[x]);
    }
  }
});


