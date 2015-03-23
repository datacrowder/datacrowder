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

/*
* Response Schema
*/
var ResponseSchema = new Schema({
    answerIds: {
        type: [Number]
    },
    answerText: {
        type: String
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

/*
* Question Schema
*/
var QuestionSchema = new Schema({
	text: {
		type: String,
		default: '',
		required: 'Please fill question',
		trim: true
	},
	type: {
		type: String,
		required: 'Please select question type'
	},
    startValue: {
        type: String,
        trim: true
    },
    endValue: {
        type: String,
        trim: true
    },
    responseData: {
        type: [String]
    },
    responses: [ResponseSchema]
});

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
	questions: [QuestionSchema],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Project', ProjectSchema);
