var mqtt = require('mqtt')

client = mqtt.connect('mqtt://demo:demo@connect.shiftr.io', function(){
  client.publish('/example', 'Hello world!');

  client.subscribe('/another/example');

  client.on('message', function (topic, message) {
    console.log(topic, message);
  });
});

