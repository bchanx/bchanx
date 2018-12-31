var router = require('express').Router();

router.get('/splash', function(req, res) {
  res.render(__dirname + '/../views/splash');
});

module.exports = {
  router
};
