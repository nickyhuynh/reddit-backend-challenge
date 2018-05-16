const express = require('express'); //Express web server framework

const app = express();

class Topic {
  constructor(title) {
    this.title = title;
    this.upvotes = 0;
    this.downvotes = 0;
  }
}

var topics = [];

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('home.jade', {
    topics: topics
  });
});

app.listen(8888);
