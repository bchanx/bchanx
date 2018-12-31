var fs = require('fs');

var ENV = process.env.NODE_ENV || 'development';
var ENV_FILE = './.env';
var PROPERTIES = {};

try {
  var env = fs.readFileSync(ENV_FILE).toString();
  env = env.split('\n');
  env.forEach(function(line) {
    if (!!~line.indexOf('=')) {
      var keyValue = line.split('=');
      PROPERTIES[keyValue[0]] = keyValue[1];
    }
  });
}
catch (e) {
  // No .env file on server, continue
  console.error(e);
}

var get = function(key) {
  if (key.indexOf('STRIPE') >= 0) {
    // Special handling for Stripe env vars
    // key = key.replace('STRIPE_', 'STRIPE_' + (ENV === 'development' ? 'TEST_' : 'LIVE_'));
    key = key.replace('STRIPE_', 'STRIPE_' + (ENV === 'development' ? 'TEST_' : 'TEST_'));
  }
  return process.env[key] || PROPERTIES[key];
};

var all = function(env) {
  var config = JSON.parse(JSON.stringify(PROPERTIES));
  config.NODE_ENV = env || 'development';
  // Handle Stripe env vars separately
  ['STRIPE_PUBLISHABLE_KEY', 'STRIPE_SECRET_KEY'].forEach(function(key) {
    // var selectedKey = key.replace('STRIPE_', 'STRIPE_' + (config.NODE_ENV === 'development' ? 'TEST_' : 'LIVE_'));
    var selectedKey = key.replace('STRIPE_', 'STRIPE_' + (config.NODE_ENV === 'development' ? 'TEST_' : 'TEST_'));
    config[key] = config[selectedKey];
  });
  return config;
};

module.exports = {
  get: get,
  all: all
};
