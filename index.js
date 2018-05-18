const express = require('express'); //Express web server framework
const bodyParser = require("body-parser"); //Needed to parse the body of HTTP methods
const uuid = require('uuid'); //unique id for topics since title can be the same

const app = express();

class Topic {
  constructor(title, uuid) {
    this.uuid = uuid;
    this.title = title;
    this.upvotes = 0;
    this.downvotes = 0;
  }
}

/*
  Since we can't use a DB, using a map so we can retrieve topics by ID.
*/
var topics = new Map();

app.use(bodyParser.urlencoded({ extended: false })); //determines which nesting parsing algorithm to use
app.use(bodyParser.json()); //tells Express you're using JSON
app.use(express.static(__dirname + '/public'));

/*
  determines where to find views and which engine to use for templating.
*/
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

/*
  only reorders the topics when the page is refreshed
*/
app.get('/', function(req, res) {
  res.render('home.jade', {
    topics: Array.from(topics.values()).sort(compare)
  });
});

app.get('/submit', function(req, res) {
  res.render('createTopic.jade', {
  })
});

/*
  Normally, there'd be rate limiting or throttling to prevent people from hogging resources
*/
app.put('/upvote/:uuid', function(req, res) {
  var uuid = req.params.uuid;

  //error checking for id and sends results as a json object
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

  //error checking for id and sends results as a json object
  if(topics.get(uuid) === undefined) {
    res.send({"error": {"code": 400, "message": "ID not found."}})
  } else {
    topics.get(uuid).downvotes += 1;

    res.setHeader('Content-Type', 'application/json');
    res.send({"data": topics.get(uuid)});
  }
});

app.post('/addTopic', function(req, res) {

  //error checking for title length and sends results as a json object
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

app.listen(process.env.PORT || 5000)
