'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Region Schema
 */
var RegionSchema = new Schema({
    name: {
        type: String
    },
    population: {
        type: Number
    }
});

mongoose.model('Region', RegionSchema);