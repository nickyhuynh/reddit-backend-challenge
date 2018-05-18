const express = require('express'); //Express web server framework
const bodyParser = require("body-parser");
const uuid = require('uuid');

const app = express();

class Topic {
  constructor(title, uuid) {
    this.uuid = uuid;
    this.title = title;
    this.upvotes = 0;
    this.downvotes = 0;
  }
}

var topics = new Map();

var id = uuid.v1();

topics.set(id, new Topic("hello world", id))

id = uuid.v1();

topics.set(id, new Topic("mellow world", id));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res) {
  res.render('home.jade', {
    topics: Array.from(topics.values())
  });
});

app.get('/submit', function(req, res) {
  res.render('createTopic.jade', {

  })
});

app.put('/upvote/:uuid', function(req, res) {
  var uuid = req.params.uuid;

  topics.get(uuid).upvotes += 1;

  console.log(topics.get(uuid));

  res.setHeader('Content-Type', 'application/json');
  res.send({"data": topics.get(uuid)});
});

app.put('/downvote/:uuid', function(req, res) {
  var uuid = req.params.uuid;

  topics.get(uuid).downvotes += 1;

  res.setHeader('Content-Type', 'application/json');
  res.send({"data": topics.get(uuid)});
});

app.post('/addTopic', function(req, res) {
  var topic = new Topic(req.body.title, uuid.v1());
  topics.set(topic.uuid, topic);

  res.setHeader('Content-Type', 'application/json');
  res.send({"data": topic});
});

app.listen(8888);
