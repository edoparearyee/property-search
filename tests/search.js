const request = require('supertest');
const { expect } = require('chai');

describe('Search', function() {
  let app;

  // Called once before any of the tests in this block begin.
  before(function(done) {
    app = require('../app');
    app.listen(function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  it('should show title', function(done) {
    request(app)
      .get('/search')
      .set('Content-Type', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('Search for houses and flats for sale across the UK');
        // Done
        done();
      });
  });

  it('should show no results', function(done) {
    request(app)
      .get('/search?no-results=true')
      .set('Content-Type', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('No Results');
        // Done
        done();
      });
  });

});
