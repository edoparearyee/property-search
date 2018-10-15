const express = require('express');
const request = require('request-promise-native');
const router = express.Router();

/* GET results page. */
router.get('/', async function(req, res, next) {
  const data = JSON.parse(await getData());
  const area = data.area.toLowerCase();
  const query = req.param('query').toLowerCase();


  // Return to search page if no results
  if (query !== area) {
    res.redirect('/search?no-results=true');
    return;
  }

  // Format price field to currency value in listings
  data.listing.forEach(listing => {
    listing.price = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(listing.price);
  });

  // Render page
  res.render('results', {
    title: 'Results',
    data
  });
});

async function getData() {
  const port = process.env.PORT || '3000';
  const url = `http://localhost:${port}/data/data.json`;
  return await request(url);
}

module.exports = router;
