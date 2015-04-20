/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

//module.exports = function(app, riotclient) {
module.exports = function(app, bot1, bot2, bot3, bot4) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  /*
  app.use('/api/curriculums', require('./api/curriculum'));
  app.use('/api/courses', require('./api/course'));
  app.use('/api/students', require('./api/student'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  */

  //my API
  //the riotclient
  //app.use('/api/riotclient', require('./api/riotclient'));
  app.use('/api/spaceapps', require('./api/spaceapps'));


  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
