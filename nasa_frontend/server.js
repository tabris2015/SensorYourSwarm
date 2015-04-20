// most basic dependencies
var express = require('express')
  , http = require('http')
  , os = require('os')
  , path = require('path')
  , url = require('url')
  , mqtt = require('mqtt');

// create the app
var app = express();

// configure everything, just basic setup
//app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  //app.use(express.serveFavicon());
  //app.use(express.logger('dev'));
  //app.use(express.bodyParser());
  //app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
//});


// development only
if ('development' == app.get('env')) {
  app.set('mongodb_uri', 'mongo://localhost/dev');
}

// production only
if ('production' == app.get('env')) {
  app.set('mongodb_uri', 'mongo://localhost/prod');
}

//app.configure('development', function(){
//  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//});

//app.configure('production', function(){
//  app.use(express.errorHandler());
//});

var mqtt_url = url.parse(process.env.CLOUDMQTT_URL);
var auth = mqtt_url.auth.split(':');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/publish', function(req, res) {
  var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
    username: auth[0],
    password: auth[1]
  });
  client.on('connect', function() {
    client.publish('t1', new Date().toString(), function() {
      client.end();
      res.writeHead(204, { 'Connection': 'keep-alive' });
      res.end();
    });
  });
});

app.get('/stream', function(req, res) {
  // set timeout as high as possible
  req.socket.setTimeout(Infinity);

  // send headers for event-stream connection
  // see spec for more information
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });
  res.write('\n');

  // Timeout timer, send a comment line every 20 sec
  var timer = setInterval(function() {
    res.write(':' + '\n');
  }, 20000);


  var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
    username: auth[0],
    password: auth[1]
  });
  client.on('connect', function() {
    client.subscribe('t1', function() {
      client.on('message', function(topic, msg, pkt) {
        res.write('data:' + msg + '\n\n');
      });
    });
  });

  // When the request is closed, e.g. the browser window
  // is closed. We search through the open connections
  // array and remove this connection.
  req.on("close", function() {
    clearTimeout(timer);
    client.end();
  });
});

// startup everything
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
