const DATE_RE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/;

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

Vue.component('player-tile', {
  props: ['player', 'index'],
  template: `
    <div class="player-tile" :class="{ 'not-verified' : !player.isVerified }" @click="hasSource ? showSource() : null">
      <div class="player-index">{{index}}.</div>
      <div class="player-image" v-if="player.image">
        <img :src="player.image"/>
      </div>
      <div class="player-details">
        <div class="player-profile">
          <span class="name">{{player.name}}</span>
          <span class="date">{{dateAchieved}}</span>
        </div>
        <div class="player-metadata">
          <span class="region">{{player.region}}</span>
          <span class="role">{{player.role}}</span>
          <span class="social" v-if="socialTypes.length">
            <a :class="socialType" :href="player.social[socialType]" @click.stop v-for="socialType in socialTypes" target="_blank"></a>
          </span>
        </div>
      </div>
    </div>
  `,
  computed: {
    dateAchieved: function() {
      let date = this.player.dateAchieved;
      if (DATE_RE.test(date)) {
        let momentized = moment(date);
        if (momentized.isValid()) {
          return momentized.format('MMMM Do, YYYY');
        }
      }
      return date;
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
            <div class="filter-option">
              <input type="radio" :id="constants.SORT_TYPES.DATE_ACHIEVED" :value="constants.SORT_TYPES.DATE_ACHIEVED" v-model="filters.sort"/>
              <label :for="constants.SORT_TYPES.DATE_ACHIEVED">Date Achieved</label>
            </div>
            <div class="filter-option">
              <input type="radio" :id="constants.SORT_TYPES.MOST_RECENT" :value="constants.SORT_TYPES.MOST_RECENT" v-model="filters.sort"/>
              <label :for="constants.SORT_TYPES.MOST_RECENT">Most Recent</label>
            </div>
            <div class="filter-option">
              <input type="radio" :id="constants.SORT_TYPES.ALPHABETICALLY" :value="constants.SORT_TYPES.ALPHABETICALLY" v-model="filters.sort"/>
              <label :for="constants.SORT_TYPES.ALPHABETICALLY">Alphabetically</label>
            </div>
          </div>
        </div>
      </div>
      <div class="results">
        <div v-if="isLoading" class="placeholder">
          Loading...
        </div>
        <div v-else-if="!players.length" class="placeholder">
          No player info available.
        </div>
        <div v-else-if="!filteredPlayers.length" class="placeholder">
          No player matches found.
        </div>
        <div v-else class="player-list">
          <template v-for="(player, index) in filteredPlayers">
            <player-tile :player="player" :index="(index + 1)"/>
          </template>
        </div>
      </div>
      <div class="footer">
        Footer
      </div>
    </div>
  `,
  data: {
    constants: {
      SORT_TYPES: SORT_TYPES,
      SOCIAL_TYPES: SOCIAL_TYPES
    },
    isLoading: false,
    players: [],
    showFilters: true,
    filters: {
      input: '',
      region: '',
      role: '',
      sort: SORT_TYPES.DATE_ACHIEVED
    }
  },
  mounted: function() {
    this.isLoading = true;
    superagent.get('/static/data/9kmmr.json')
      .accept('application/json')
      .end((err, res) => {
        this.isLoading = false;
        if (!err && res.ok) {
          // TODO: sort by date and add a global rank
          let players = res.body;
          // Sanitize
          players.forEach(p => {
            p.region = (p.region || '').toLowerCase();
            p.role = (p.role || '').toLowerCase();
          });
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
        this.$set(this.filters, filterType, filterType === 'sort' ? SORT_TYPES.DATE_ACHIEVED : '');
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

      return this.players.filter(p => {
        return (!region || p.region === region) &&
          (!role || p.role === role) &&
          (p.name || '').toLowerCase().indexOf(input) >= 0;
      });
    },
    hasSetFilters: function() {
      return Object.keys(this.filters).filter(x => x === 'sort' ? this.filters[x] !== SORT_TYPES.DATE_ACHIEVED : !!this.filters[x]).length;
    },
    regionTypes: function() {
      let players = this.players;
      let regions = [... new Set(this.players.map(p => p.region.toLowerCase()))].sort();
      return regions;
    },
    roleTypes: function() {
      let players = this.players;
      let roles = [... new Set(this.players.map(p => p.role.toLowerCase()))].sort();
      return roles;
    }
  }
});


