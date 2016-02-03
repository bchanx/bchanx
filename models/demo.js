var db = require('./database');

var DEMO_TABLE = 'demo';

var setup = function() {
  db.client.schema.hasTable(DEMO_TABLE).then(function(exists) {
    if (!exists) {
      // First creation
      db.client.schema.createTable(DEMO_TABLE, function(table) {
        table.increments();
        table.string('name');
        table.json('metadata');
        table.timestamp('created_at').defaultTo(db.client.fn.now());
      }).catch(function(e) {
        db.log(DEMO_TABLE, 'setup', e);
      });
    }
  });
};

var log = function(params, callback) {
  db.client.insert(params)
    .into(DEMO_TABLE)
    .then(db.success(callback))
    .catch(db.error(DEMO_TABLE, 'create', callback));
};

module.exports = {
  setup: setup,
  log: log
};
