const DATE_RE = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+\d{2}:\d{2}/;

Vue.component('player-tile', {
  props: ['player', 'index'],
  template: `
    <div class="player-tile">
      <div>
        <span class="index">{{index}}. </span>
        <span class="name">{{player.name}}</span>
      </div>
      <div>
        <span class="date">{{dateAchieved}}</span>
        <span class="region">{{player.region}}</span>
        <span class="role">{{player.role}}</span>
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
        Filters
        <input v-model.trim="filterInput"/>
      </div>
      <div class="results">
        <div v-if="isLoading">
          Loading...
        </div>
        <div v-else-if="!players.length">
          No player info available.
        </div>
        <div v-else-if="!filteredPlayers.length">
          No players found.
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
    isLoading: false,
    players: [],
    filterInput: ''
  },
  mounted: function() {
    this.isLoading = true;
    superagent.get('/static/data/9kmmr.json')
      .accept('application/json')
      .end((err, res) => {
        this.isLoading = false;
        if (!err && res.ok) {
          // TODO: sort by date and add a global rank
          this.players = res.body;
        }
      });
  },
  computed: {
    filteredPlayers: function() {
      let players = this.players;
      let filterInput = this.filterInput.toLowerCase();
      return this.players.filter(p => {
        return (p.name || '').toLowerCase().indexOf(filterInput) >= 0;
      });
    }
  }
});


