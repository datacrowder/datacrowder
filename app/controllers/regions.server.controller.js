'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Region = mongoose.model('Region'),
    _ = require('lodash');

/**
 * Create a Region
 */
exports.create = function(req, res) {
	var region = new Region(req.body);

	region.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(region);
		}
	});
};

/**
 * Show the current Region
 */ 
exports.read = function(req, res) {
	res.jsonp(req.region);
};

/**
 * Update a Region
 */
exports.update = function(req, res) {

};

/**
 * Delete an Region
 */
exports.delete = function(req, res) {

};

/**
 * List of Regions
 */
exports.list = function(req, res) {
	Region.find().exec(function(err, regions) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(regions);
		}
	});
};
