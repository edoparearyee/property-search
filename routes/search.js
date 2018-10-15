const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const noResults = req.param('no-results');
  res.render('search', { title: 'Search', noResults });
});

module.exports = router;
