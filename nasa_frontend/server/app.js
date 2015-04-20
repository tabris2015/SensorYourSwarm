/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express  = require('express');
var mongoose = require('mongoose');
var url = require('url');
//var mqtt = require('mqtt');
var riot = require('./riot');
var request = require('request');

var config   = require('./config/environment');

// Connect to database
//mongoose.connect(config.mongo.uri, config.mongo.options);

// Setup server
var app = express();
var server = require('http').createServer(app);
/*
var server.bot1 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0, "dig" : 0};
var app.bot2 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0, "dig" : 0};
var app.bot3 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0, "dig" : 0};
var app.bot4 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0, "dig" : 0};
*/
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);

require('./config/express')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


var riotclient = riot.createClient(app);
//require('./routes')(app, riotclient);
require('./routes')(app);


//mqtt server
//var mqtt_url = url.parse('mqtt://localhost:1883');
//var auth = (mqtt_url.auth) ? mqtt_url.auth.split(':') : ['',''];

//my mqtt server
//  var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
//    username: auth[0],
//    password: auth[1]
//  });
//  client.on('connect', function() {
//    console.log ('connected to ' + mqtt_url.href);
//    client.subscribe('dev/#', function() {

//      client.on('message', function(topic, msg, pkt) {

//        console.log(topic+':' + msg );
//        //var riotController = require('./api/riotclient/riotclient.controller');
//        //riotController.newThing( {}, {} );
//        var arr = msg.toString().split(",")
//        body = { 'cars' : arr[1], 'temperature' : arr[2]};
//        request(
//          {
//            method: 'POST',
//            url: 'http://localhost:5000/api/riotclient/newThing',
//            headers: {
//              'Content-Type': 'application/json',
//              'Accept': 'application/json',
//            },
//            body: JSON.stringify(body)
//          },
//          function (error, response, body) {
//            //console.log('Response:', body);
//          }
//        );
//
//        var postData = {
//                      topic : topic,
//                      device  : topic.substring(4,8),
//                      message : msg,
//                      date  : Date(),

//        }
//        var Thing = require('./api/thing/thing.model');
//        Thing.create(postData, function(err, thing) {
//          if (err) {
//            console.log (err);
//          } else {
//            console.log (thing);
//          }
//        });
//
//        });
//    });
//  });


// Expose app
exports = module.exports = app;

//app.use(express.static(__dirname + '/public'));
/*

app.get('/', function(request, response) {
  response.send('Hello World this is my heroku app');
});


app.post('/publish', function(request, response) {
    'use strict';
  response.send('Hello World this is my heroku app');
  console.log(request.body);
    //response.sendStatus(200);

  var client = mqtt.createClient(mqtt_url.port, mqtt_url.hostname, {
    username: auth[0],
    password: auth[1]
  });
  client.on('connect', function() {
      var msg = request.body.longitude + "," + request.body.latitude + "," +  request.body.altitude;
      client.publish('dev/web/greetings', msg, function() {
      client.end();
      //response.sendStatus(200);
      response.end();
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
    client.subscribe('hello/world', function() {
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

*/
