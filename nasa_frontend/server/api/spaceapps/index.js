'use strict';

var express = require('express');
var controller = require('./spaceapps.controller');

var router = express.Router();

router.get('/',            controller.index);

router.post('/raspberry',  controller.raspberry);
router.post('/camera',     controller.camera);
router.get('/camera',      controller.camera);
router.get('/getMap',       controller.getMap);



module.exports = router;
