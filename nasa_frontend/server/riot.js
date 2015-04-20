#!/usr/bin/env node


/**
 * createClient - create a Riot  client
 *
 * @param {Number} [port] - broker port
 * @param {String} [host] - broker host
 * @param {Object} [opts] - see MqttClient#constructor
 * @api public
 */

var request = require('request');
var apiKey = '';
var bot1 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0, "distance" : 0, "compass" : 0};
var bot2 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0};
var bot3 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0};
var bot4 = { "x" : 0, "y" : 0, "t" : 0, "g" : 0};

var index = 1;


module.exports.getApiKey = function() {
  return apiKey;
}

module.exports.getIndex = function() {

  data = [
  {
    "bot1" : { "x" :  10, "y" : 100, "t" : 40, "g" : 20, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 520, "y" : 200, "t" :  6, "g" : 20 } ,
    "bot3" : { "x" : 200, "y" : 450, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 250, "y" :  10, "t" : 35, "g" : 0 }
  },
  {
    "bot1" : { "x" :  30, "y" : 105, "t" : 39, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 490, "y" : 200, "t" :  8, "g" : 0 } ,
    "bot3" : { "x" : 230, "y" : 420, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 245, "y" :  30, "t" : 35, "g" : 0 }
  },
  {
    "bot1" : { "x" :  50, "y" : 110, "t" : 38, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 470, "y" : 200, "t" :  8, "g" : 0 } ,
    "bot3" : { "x" : 260, "y" : 400, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 240, "y" :  70, "t" : 35, "g" : 0 }
  },
  {
    "bot1" : { "x" :  70, "y" : 115, "t" : 36, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 450, "y" : 200, "t" :  8, "g" : 0 } ,
    "bot3" : { "x" : 290, "y" : 380, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 235, "y" : 100, "t" : 36, "g" : 0 }
  },
  {
    "bot1" : { "x" :  90, "y" : 120, "t" : 35, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 425, "y" : 200, "t" :  8, "g" : 0 } ,
    "bot3" : { "x" : 310, "y" : 360, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 230, "y" : 130, "t" : 36, "g" : 0 }
  },
  {
    "bot1" : { "x" : 110, "y" : 125, "t" : 33, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 400, "y" : 200, "t" :  8, "g" : 0 } ,
    "bot3" : { "x" : 340, "y" : 340, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 225, "y" : 160, "t" : 36, "g" : 0 }
  },
  {
    "bot1" : { "x" : 130, "y" : 130, "t" : 31, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 370, "y" : 200, "t" : 10 , "g" : 0 } ,
    "bot3" : { "x" : 370, "y" : 320, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 220, "y" : 190, "t" : 37, "g" : 0 }
  },
  {
    "bot1" : { "x" : 150, "y" : 135, "t" : 30, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 340, "y" : 200, "t" : 12, "g" : 0 } ,
    "bot3" : { "x" : 400, "y" : 300, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 215, "y" : 220, "t" : 37, "g" : 0 }
  },
  {
    "bot1" : { "x" : 170, "y" : 140, "t" : 27, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 310, "y" : 200, "t" : 13, "g" : 0 } ,
    "bot3" : { "x" : 430, "y" : 280, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 210, "y" : 250, "t" : 38, "g" : 0 }
  },
  {
    "bot1" : { "x" : 190, "y" : 145, "t" : 25, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 280, "y" : 200, "t" : 15, "g" : 0 } ,
    "bot3" : { "x" : 460, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 205, "y" : 280, "t" : 30, "g" : 0 }
  },


  {
    "bot1" : { "x" : 210, "y" : 145, "t" : 21, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 255, "y" : 200, "t" : 15, "g" : 0 } ,
    "bot3" : { "x" : 490, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 200, "y" : 310, "t" : 28, "g" : 0 }
  },
  {
    "bot1" : { "x" : 230, "y" : 145, "t" : 20, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 220, "y" : 200, "t" : 17, "g" : 0 } ,
    "bot3" : { "x" : 500, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 195, "y" : 340, "t" : 25, "g" : 0 }
  },
  {
    "bot1" : { "x" : 250, "y" : 145, "t" : 15, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 190, "y" : 200, "t" : 19, "g" : 0 } ,
    "bot3" : { "x" : 520, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 190, "y" : 370, "t" : 23, "g" : 0 }
  },
  {
    "bot1" : { "x" : 270, "y" : 145, "t" : 13, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 160, "y" : 200, "t" : 21, "g" : 0 } ,
    "bot3" : { "x" : 540, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 180, "y" : 400, "t" : 18, "g" : 0 }
  },
  {
    "bot1" : { "x" : 290, "y" : 145, "t" : 12, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 130, "y" : 200, "t" : 23, "g" : 0 } ,
    "bot3" : { "x" : 560, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 170, "y" : 430, "t" : 15, "g" : 0 }
  },
  {
    "bot1" : { "x" : 310, "y" : 145, "t" : 10, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" : 100, "y" : 200, "t" : 25, "g" : 0 } ,
    "bot3" : { "x" : 580, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 160, "y" : 460, "t" : 15, "g" : 0 }
  },
  {
    "bot1" : { "x" : 330, "y" : 145, "t" : 10, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" :  70, "y" : 200, "t" : 27, "g" : 0 } ,
    "bot3" : { "x" : 600, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 150, "y" : 460, "t" : 10, "g" : 0 }
  },
  {
    "bot1" : { "x" : 350, "y" : 145, "t" : 10, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" :  40, "y" : 200, "t" : 28, "g" : 0 } ,
    "bot3" : { "x" : 620, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 140, "y" : 460, "t" : 10, "g" : 0 }
  },
  {
    "bot1" : { "x" : 370, "y" : 145, "t" : 10, "g" : 0, "distance" : 0, "compass" : 0} ,
    "bot2" : { "x" :  10, "y" : 200, "t" : 29, "g" : 0 } ,
    "bot3" : { "x" : 620, "y" : 260, "t" : 10, "g" : 0 } ,
    "bot4" : { "x" : 130, "y" : 460, "t" : 10, "g" : 0 }
  }
  ];

  res = data[index];
  index ++;
  if (index == data.length) {
    index = 0;
  }
  return res;
}

module.exports.getBot1 = function() {
  return bot1;
}

module.exports.getBot2 = function() {
  return bot2;
}

module.exports.getBot3 = function() {
  return bot3;
}

module.exports.getBot4 = function() {
  return bot4;
}

module.exports.getHostUrl = function() {
  return hostUrl;
}

module.exports.createClient = function(app) {
  console.log('creating a bots client');
  apiKey = "abc";

  return this;

  hostUrl = url;

  body = JSON.stringify(
    { 'username' : user, 'password' : pass }
  );
  request(
    {
      method: 'POST',
      url: hostUrl + '/riot-core-services/api/user/login',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
    },
    function (error, response, body) {
      jsonBody = JSON.parse(body);
      apiKey = jsonBody.apiKey;
      console.log("the apiKey is: " + jsonBody.apiKey);
    }
  );

  return this;
};

module.exports.thingTypes = function(cb) {
  //console.log('retrieving all things');

  body = JSON.stringify( {} );
  request(
    {
      method: 'GET',
      url: hostUrl + '/riot-core-services/api/thingType',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api_key': apiKey
      },
      body: body
    },
    function (error, response, body) {
      //console.log ("calling callback");
      cb(error, body);
    }
  );

  return body;
};

/*
childrenIdList: []
fields: [{id: 71, unit: "cars", timeSeries: false, symbol: "cars", name: "cars", type: 4,…},…]
0: {id: 71, unit: "cars", timeSeries: false, symbol: "cars", name: "cars", type: 4,…}
id: 71
name: "cars"
symbol: "cars"
timeSeries: false
type: 4
typeLabel: "Number(float)"
unit: "cars"
1: {id: 73, unit: "temperature", timeSeries: false, symbol: "temperature", name: "temperature", type: 4,…}
id: 73
name: "temperature"
symbol: "temperature"
timeSeries: false
type: 4
typeLabel: "Number(float)"
unit: "temperature"
2: {id: 72, unit: "seconds", timeSeries: true, symbol: "date", name: "date", type: 4,…}
id: 72
name: "date"
symbol: "date"
timeSeries: true
type: 4
typeLabel: "Number(float)"
unit: "seconds"
group.id: 13
name: "aa"
serial: "a1"
thingType.id: 17



http://one.hackiot.com:8080/riot-core-services/api/thing/20/field/83?extra=parent,group,group.groupType,thingType,thingType.children,thingType&ts=1426317978714

http://one.hackiot.com:8080/riot-core-services/api/thing/24?extra=parent,group,group.groupType,thingType,thingType.children,thingType&ts=1426319350803
{ 'value' : 1 }
*/


module.exports.thingSetValue = function(thingId, fieldId, value, cb) {
  body = { 'value' : "" + value };

  if (value == null || value == '') {
    console.log('       value ' + value + ' is null');
    cb(false, body, fieldId);
  }
  console.log('Setting value ' + value + ' to field ' + fieldId);

  request(
    {
      method: 'POST',
      url: hostUrl + '/riot-core-services/api/thing/' + thingId + '/field/' + fieldId + '?extra=parent,group,group.groupType,thingType,thingType.children,thingType&ts=1426319350803',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api_key': apiKey
      },
      body: JSON.stringify(body)
    },
    function (error, response, body) {
      //console.log('Response:', body);
      cb(error, body, fieldId);
    }
  );

  return true;
};

module.exports.thingInfo = function(thingId, cb) {
  console.log('getting info from a thing ' + thingId);

  //var dateFormat = require('dateformat');
  //var dfNow = dateFormat(new Date(), "yyyymmddhhMMss");
  //console.log (dfNow);

  request(
    {
      method: 'GET',
      url: hostUrl + '/riot-core-services/api/thing/' + thingId + '?extra=parent,group,group.groupType,thingType,thingType.children,thingType&ts=1426319350803',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api_key': apiKey
      },
      body: ""
    },
    function (error, response, body) {
      //console.log('Response:', body);
      cb(error, body);
    }
  );

  return true;
};


module.exports.newThing = function(thingId, cb) {
  if (apiKey == '') {
      cb(true, "retry in a few seconds, we are connecting");
    return false;
  }

  console.log('creating a thing with type: ' + thingId);

  var dateFormat = require('dateformat');
  var dfNow = dateFormat(new Date(), "yyyymmddhhMMss");
  //console.log (dfNow);

  if (thingId == 17) {
    body = JSON.stringify(
      {
        'group.id' : 13,
        'name' : "b" + dfNow,
        'serial' : "b" + dfNow,
        'fields' : [
          {
            'id'         : 83,
            'thingTypeFieldId' : 83,
            'name'       : "cars",
            'symbol'     : "cars",
            'timeSeries' : false,
            'type'       : 4,
            'typeLabel'  : "Number(float)",
            'unit'       : "cars",
            'value'      : 1234
          },
          {
            'id'         : 84,
            'thingTypeFieldId' : 84,
            'name'       : "temperature",
            'symbol'     : "temperature",
            'timeSeries' : false,
            'type'       : 4,
            'typeLabel'  : "Number(float)",
            'unit'       : "temperature",
            'value'      : 1234
          }
        ],
        'thingType.id' : thingId,
        'childrenIdList' : []
       }
    );
  }

  if (thingId == 14) {
    body = JSON.stringify(
      {
        'group.id' : 13,
        'name' : "b" + dfNow,
        'serial' : "b" + dfNow,
        'fields' : [
          {
            'id'         : 49,
            'thingTypeFieldId' : 49,
            'name'       : "heading",
            'symbol'     : "",
            'timeSeries' : false,
            'type'       : 4,
            'unit'       : ""
          },
/*
          {
            'id'         : 50,
            'thingTypeFieldId' : 50,
            'name'       : "lastDetectTime",
            'symbol'     : "ms",
            'timeSeries' : false,
            'type'       : 4,
            'unit'       : "millisecond"
          },
          {
            'id'         : 51,
            'thingTypeFieldId' : 51,
            'name'       : "lastLocateTime",
            'symbol'     : "ms",
            'timeSeries' : false,
            'type'       : 4,
            'unit'       : "millisecond"
          },
*/
          {
            'id'         : 52,
            'thingTypeFieldId' : 52,
            'name'       : "location",
            'symbol'     : "",
            'timeSeries' : true,
            'type'       : 2,
            'unit'       : ""
          },
          {
            'id'         : 53,
            'thingTypeFieldId' : 53,
            'name'       : "locationXYZ",
            'symbol'     : "",
            'timeSeries' : true,
            'type'       : 3,
            'unit'       : ""
          },
/*          ,
          {
            'id'         : 54,
            'thingTypeFieldId' : 54,
            'name'       : "shift",
            'symbol'     : "",
            'timeSeries' : true,
            'type'       : 7,
            'unit'       : ""
          }
          ,
          {
            'id'         : 55,
            'thingTypeFieldId' : 55,
            'name'       : "speed",
            'symbol'     : "",
            'timeSeries' : false,
            'type'       : 4,
            'unit'       : ""
          },
          */
          {
            'id'         : 56,
            'thingTypeFieldId' : 50,
            'name'       : "zone",
            'symbol'     : "",
            'timeSeries' : true,
            'type'       : 1,
            'unit'       : ""
          }
        ],
        'thingType.id' : thingId,
        'childrenIdList' : []
       }
    );
  }

  request(
    {
      method: 'PUT',
      url: hostUrl + '/riot-core-services/api/thing',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api_key': apiKey
      },
      body: body
    },
    function (error, response, body) {
      console.log('Response:', body);
      cb(error, body);
    }
  );

  return true;
};
