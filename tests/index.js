const request = require('supertest');
const { expect } = require('chai');

describe('Index', function() {
  let app;

  // Called once before any of the tests in this block begin.
  before(function(done) {
    app = require('../app');
    app.listen(function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  it('should send 404 page', function(done) {
    request(app)
      .get('/')
      .set('Content-Type', 'text/html')
      .expect('Content-Type', /html/)
      .expect(404, function(err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('<h1>Requested page not found</h1>');
        // Done
        done();
      });
  });

});
