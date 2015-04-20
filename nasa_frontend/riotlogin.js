var request = require('request');

var qs = require('querystring');

request({
  method: 'POST',
  url: 'http://one.hackiot.com:8080/riot-core-services/api/user/login',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: "{  \"username\": \"team26\",  \"password\": \"team26\"}"
}, function (error, response, body) {
  jsonBody = JSON.parse(body);
  var apiKey = jsonBody.apiKey;
  console.log(jsonBody.apiKey);
  //console.log(jsonBody.groupType);
  //console.log(jsonBody.username);

  //console.log('Status:', response.statusCode);
  //console.log('Headers:', JSON.stringify(response.headers));
  //console.log('Response:', body);

  request(
    {
      method: 'GET',
      url: 'http://one.hackiot.com:8080/riot-core-services/api/thingType',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Api_key': apiKey
      },
      body: ""
    },
    function (error, response, body) {
      jsonBody = JSON.parse(body);
      console.log('Status:', response.statusCode);
      console.log('Headers:', JSON.stringify(response.headers));
      console.log('Response:', body);
    }
  );
});


