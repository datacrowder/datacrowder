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
        type: String,
        trim: true  
    },
    population: {
        type: Number
    },
    parent: {
        type: Schema.ObjectId,
        ref: 'Region'    	
    },
    updated: {
        type: Date,
        default: Date.now    	
    }
});

mongoose.model('Region', RegionSchema);