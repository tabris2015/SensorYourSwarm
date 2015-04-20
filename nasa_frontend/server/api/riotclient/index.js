'use strict';

var express = require('express');
var controller = require('./riotclient.controller');

var router = express.Router();

router.get('/',            controller.index);
router.get('/thingTypes',  controller.thingTypes);
router.post('/newThing',   controller.newThing);
router.post('/postGPS',    controller.postGPS);

router.post('/raspberry',  controller.raspberry);



/*
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/

module.exports = router;
