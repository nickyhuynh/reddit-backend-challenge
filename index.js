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
    topics: Array.from(topics.values()).sort(compare)
  });
});

app.get('/submit', function(req, res) {
  res.render('createTopic.jade', {

  })
});

app.put('/upvote/:uuid', function(req, res) {
  var uuid = req.params.uuid;

  if(topics.get(uuid) === undefined) {
    res.send({"error": {"code": 400, "message": "ID not found."}})
  } else {
    topics.get(uuid).upvotes += 1;

    res.setHeader('Content-Type', 'application/json');
    res.send({"data": topics.get(uuid)});
  }
});

app.put('/downvote/:uuid', function(req, res) {
  var uuid = req.params.uuid;

  if(topics.get(uuid) === undefined) {
    res.send({"error": {"code": 400, "message": "ID not found."}})
  } else {
    topics.get(uuid).downvotes += 1;

    res.setHeader('Content-Type', 'application/json');
    res.send({"data": topics.get(uuid)});
  }
});

app.post('/addTopic', function(req, res) {
  if(req.body.title.length > 0 && req.body.title.length <= 255) {
    var topic = new Topic(req.body.title, uuid.v1());
    topics.set(topic.uuid, topic);

    res.setHeader('Content-Type', 'application/json');
    res.send({"data": topic});
  } else {
    res.send({"error": {"code": 400, "message": "Topic must be between 0 and 256 characters long, Non-inclusive."}})
  }
});

function compare(t1, t2) {
  var firstOverall = t1.upvotes - t1.downvotes;
  var secondOverall = t2.upvotes - t2.downvotes;
  return secondOverall-firstOverall;
}

app.listen(3000);
