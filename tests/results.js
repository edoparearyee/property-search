const request = require('supertest');
const { expect } = require('chai');

describe('Results', function() {
  let app;

  // Called once before any of the tests in this block begin.
  before(function(done) {
    app = require('../app');
    app.listen(function(err) {
      if (err) { return done(err); }
      done();
    });
  });

  it('should show results', function(done) {
    request(app)
      .get('/results?query=N11')
      .set('Content-Type', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, function(err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('5 Results found');
        expect(res.text).to.include('5 bedroom Detached house for sale');
        expect(res.text).to.include('£1,800,000');
        expect(res.text).to.include('Built in 1949 on the site of the former Friern Barnet junior school this substantial ');
        expect(res.text).to.include(`src="http://li.zoocdn.com/91062b96be923536c8505e18a132a53f684360d1_354_255.jpg"`);
        expect(res.text).to.include(`src="http://st.zoocdn.com/zoopla_static_agent_logo_(326525).png"`);
        expect(res.text).to.include(`Your Move - Spencer &amp; Sener`);
        expect(res.text).to.include(`4-6 Station Road, New Barnet, EN5 1QW`);
        expect(res.text).to.include(`T: 020 3478 3306`);
        done();
      });
  });

  it('should show no results', function(done) {
    request(app)
      .get('/results?query=SE1')
      .set('Content-Type', 'text/html')
      .expect('Content-Type', /plain/)
      .expect(302, function(err, res) {
        if (err) { return done(err); }
        expect(res.text).to.include('/search?no-results=true');
        // Done
        done();
      });
  });

});
