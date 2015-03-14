'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * A Validation function for headlines
 */
var validateHeadline = function(headline) {
	return (headline.length <= 90);
};

/**
 * A Validation function for descriptions
 */
var validateDescription = function(description) {
	return (description.length <= 141);
};

/**
 * Project Schema
 */
var ProjectSchema = new Schema({
	headline: {
		type: String,
		default: '',
		required: 'Please fill project headline',
		validate: [validateHeadline, 'Headline is longer than 90 characters'],
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill project description',
		validate: [validateDescription, 'Description is longer than 141 characters'],
		trim: true
	},
	closed: {
		type: Boolean,
		default: false
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Project', ProjectSchema);
