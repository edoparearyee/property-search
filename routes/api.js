const express = require('express');
const router = express.Router();

/* GET search listing. */
router.get('/search', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
