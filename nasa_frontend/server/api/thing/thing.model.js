'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  topic: String,
  device: String,
  message: String,
  date: String
});

module.exports = mongoose.model('Thing', ThingSchema);
