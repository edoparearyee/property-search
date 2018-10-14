const express = require('express');
const router = express.Router();

/* GET results page. */
router.get('/', function(req, res, next) {
  res.render('results', { title: 'Results' });
});

module.exports = router;
