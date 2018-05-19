let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../index');

chai.use(chaiHttp);

describe('/upvote/ topic', () => {
      it('should upvote a topic', (done) => {
        chai.request(server)
            .get('/upvote/')
            .end((err, res) => {
              res.should.have.property('error');
              done();
            });
      });
});
