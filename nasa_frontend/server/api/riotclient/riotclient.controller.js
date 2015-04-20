

var riotclient = require('../../riot');
var Promise = require('promise');
var Q = require("q");


// Get apikey

exports.index = function(req, res) {
  res.header(
    'Cache-Control',
    'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
  );

  return res.json( 200, riotclient.getApiKey() );
};

exports.newThing = function(req, res) {

  var deferred = Q.defer();
  var postedData = [];
  var dataindex = 0;
  for (datavar in req.body) {
    postedData[dataindex++] = req.body[datavar];
  }

  var thingId = 17;
  riotclient.newThing(17, function(err,body) {
    if (err) {
      console.log ('error in calling riot server', err);
      deferer.reject(err);
    } else {
      var bodyJson = JSON.parse(body);
      thingId = bodyJson.id;

      riotclient.thingInfo( thingId, function(err,body) {
        console.log ("trying to get thing " + thingId );

        if (err) {
          console.log ('error in calling riot server', err);
          deferer.reject(err);
        } else {
          var bodyJson = JSON.parse(body);
          newFields = bodyJson.fields;

          var lastFieldId = newFields[newFields.length -1].id;
          for (index in newFields) {
            riotclient.thingSetValue( thingId, newFields[index].id, postedData[index], function(err,body, fieldId) {
              if (fieldId == lastFieldId ) {
                deferred.resolve();
                res.header(
                  'Cache-Control',
                  'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
                );
                return res.json(200, JSON.parse(body));
              }
            });
          }

        }
      }
      );
      return true;
    }
  }
  );

  return deferred.promise;
};

exports.postGPS = function(req, res) {

  var deferred = Q.defer();
  var postedData = [];
  var dataindex = 0;
  if ( typeof req.body["zone"] != "undefined") {
    var lon = req.body["longitude"]/1000000;
    var lat = req.body["latitude"] /1000000;

    var i = 0, heading = 0;
    if ( req.body["heading"] == "GT-S5830M" ) {
      heading = 1;
    }
    if ( req.body["heading"] == "GT-I8200L" ) {
      heading = 2;
      lon -= 0.00002;
      lat -= 0.00001;
    }
    console.log(req.body);
    postedData[i++] = heading; //req.body["heading"];
    //postedData[1] = '';
    //postedData[2] = '';
    postedData[i++] = lon + ";" + lat + ";" + req.body["altitude"];
    postedData[i++] = ''; //locationxyz
    //postedData[5] = ''; //shift
    //postedData[6] = '0'; //speed
    postedData[i++] = ''; //req.body["zone"];
  } else {
      console.log ('error posted data is not valid');
      res.header(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
      );
      deferred.resolve();
      return res.json(400);
  }
  console.log (postedData);

  var thingId = 14;
  riotclient.newThing(thingId, function(err,body) {
    if (err) {
      console.log ('error in calling riot server', body);
      res.header(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
      );
      deferred.resolve();
      //body = { 'msg' : body};
      return res.json(200);
    } else {
      var bodyJson = JSON.parse(body);
      thingId = bodyJson.id;

      riotclient.thingInfo( thingId, function(err,body) {
        console.log ("trying to get thing " + thingId );

        if (err) {
          console.log ('error in calling riot server', err);
          deferer.reject(err);
        } else {
          var bodyJson = JSON.parse(body);
          newFields = bodyJson.fields;

          var lastFieldId = newFields[newFields.length -1].id;
          var totalFields = newFields.length;
          var arrived = 0;
          for (index in newFields) {
            riotclient.thingSetValue( thingId, newFields[index].id, postedData[index], function(err,body, fieldId) {
              arrived++;
              if (arrived == totalFields ) {
                deferred.resolve();
                res.header(
                  'Cache-Control',
                  'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
                );
                return res.json(200);
                //return res.json(200, JSON.parse(body));
              }
            });
          }

        }
      }
      );
      return true;
    }
  }
  );

  return deferred.promise;
};


exports.raspberry = function(req, res) {
  console.log ("data sent from raspberry ... ");
  console.log (req.body);
  return true;
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

