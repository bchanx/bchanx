var knex = require('knex');
var config = require('../config');

var db = knex({
  client: 'pg',
  connection: config.get('DATABASE_URL') || 'postgres://localhost/bchanx',
  pool: {
    min: 0,
    max: 20
  }
});

var log = function(table, fn, error) {
  console.error('[ POSTGRES ] Something went wrong for table (' + table + ') from function (' + fn + '):', error);
};

var result = function(error, results, callback) {
  var r = {
    error: error,
    results: results || []
  };
  if (callback) {
    return callback(r);
  }
  else {
    return r;
  }
};

var success = function(callback) {
  return function(results) {
    result(null, results, callback);
  };
};

var error = function(table, type, callback) {
  return function(error) {
    log(table, type, error);
    result(error, null, callback);
  };
};

module.exports = {
  client: db,
  log: log,
  result: result,
  success: success,
  error: error
};
