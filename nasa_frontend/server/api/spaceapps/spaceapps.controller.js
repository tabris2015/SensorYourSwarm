
var riotclient = require('../../riot');

var Promise = require('promise');
var Q = require("q");


// Get apikey

exports.index = function(req, res) {
  res.header(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  );

  //return res.json( 200, riotclient.getApiKey() );
  return res.json( 200, {} );
};



exports.raspberry = function(req, res) {
  bot1 = riotclient.getBot1();
  bot2 = riotclient.getBot2();
  bot3 = riotclient.getBot3();
  bot4 = riotclient.getBot4();

  if (typeof req.body.datos != "undefined" ) {
    var id  = req.body.datos[0];
    var tem = req.body.datos[1];
    var gas = req.body.datos[2];

    if (typeof req.body.datos[2] != "undefined" ) {
      if (id == 1) {
        bot1.compass  = tem;
        bot1.distance = gas;
      }

      if (id == 2) {
        bot2.t = tem;
        bot2.g = gas;
      }

      if (id == 3) {
        bot3.t = tem;
        bot3.g = gas;
      }

      if (id == 4) {
        bot4.t = tem;
        bot4.g = gas;
      }
    }
  }

  console.log ("data sent from raspberry ... ");
  console.log ( bot1 );
  console.log ( bot2 );
  console.log ( bot3 );
  console.log ( bot4 );
  return res.json(200, "ok");
};


exports.camera = function(req, res) {
  bot1 = riotclient.getBot1();
  bot2 = riotclient.getBot2();
  bot3 = riotclient.getBot3();
  bot4 = riotclient.getBot4();

  if (typeof req.body.x1 != "undefined") {
    bot1.x = req.body.x1;
  }
  if (typeof req.body.y1 != "undefined") {
    bot1.y = req.body.y1;
  }

  if (typeof req.body.x2 != "undefined") {
    bot2.x = req.body.x2;
  }
  if (typeof req.body.y2 != "undefined") {
    bot2.y = req.body.y2;
  }

  if (typeof req.body.x3 != "undefined") {
    bot3.x = req.body.x3;
  }
  if (typeof req.body.y3 != "undefined") {
    bot3.y = req.body.y3;
  }

  if (typeof req.body.x4 != "undefined") {
    bot4.x = req.body.x4;
  }
  if (typeof req.body.y4 != "undefined") {
    bot4.y = req.body.y4;
  }

  //console.log (req.body);
  console.log ( bot1 );
  console.log ( bot2 );
  console.log ( bot3 );
  console.log ( bot4 );
  return res.json(200, "ok");
};

exports.getMap = function(req, res) {
  return res.json(200, riotclient.getIndex() );

  result = {};
  result.bot1 = riotclient.getBot1();
  result.bot2 = riotclient.getBot2();
  result.bot3 = riotclient.getBot3();
  result.bot4 = riotclient.getBot4();

  return res.json(200, result );
};


exports.thingTypes = function(req, res) {

  var deferred = Q.defer();

  riotclient.thingTypes( function(err,body) {
    if (err) {
      console.log ('error in calling riot server', err);
      deferer.reject(err);
    } else {
      deferred.resolve();
      res.header(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
      );
      return res.json(200, JSON.parse(body));
    }
  }
  );

  return deferred.promise;
};

