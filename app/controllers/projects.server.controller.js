'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Project = mongoose.model('Project'),
	_ = require('lodash');

/**
 * Create a Project
 */
exports.create = function(req, res) {
	var project = new Project(req.body);
	project.user = req.user;

	project.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * Show the current Project
 */
exports.read = function(req, res) {
	res.jsonp(req.project);
};

/**
 * Show the current Project plus get the authors of its comments
 */
exports.readWithComments = function(req, res) {
	Project.findOne({ '_id' : req.project._id }).populate('user').populate('comments.user').populate('region', 'name').exec(function(err, project) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * Update a Projects
 */
exports.update = function(req, res) {
	var project = req.project;

	project = _.extend(project , req.body);

	project.save(function(err) {
		if (err) {
			console.log(err);
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * Delete a Project
 */
exports.delete = function(req, res) {
	var project = req.project;

	project.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(project);
		}
	});
};

/**
 * List of user's Projects
 */
exports.list = function(req, res) { 
	Project.find({ 'user' : req.user._id }).sort('-created').populate('user', 'displayName').exec(function(err, projects) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(projects);
		}
	});
};

/**
 * Feed of Projects
 */
exports.feed = function(req, res) { 

	// Build the search query
	var query = {};

	// If user is logged in, only return the other projects
	if ( req.user ) {
		query.user = { $ne : req.user._id };
	}

	// If the user entered a project query, check the headline or the description
	if ( typeof req.query.q !== 'undefined' ){
		query.$or = [ {headline : { '$regex': req.query.q, '$options': 'i' }}, {description : { '$regex': req.query.q, '$options': 'i' }} ];
	}

	// If the user selected a  type of project, check the project status
	if ( typeof req.query.type !== 'undefined' ){
		if ( req.query.type === 'true' )
			query.closed = true;
		else if ( req.query.type === 'false' )
			query.closed = false;
	}

	Project.find(query).sort('-created').populate('user', 'displayName').exec(function(err, projects) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(projects);
			}
		});
};

/**
 * Project middleware
 */
exports.projectByID = function(req, res, next, id) { 
	Project.findById(id).populate('user', 'displayName').exec(function(err, project) {
		if (err) return next(err);
		if (! project) return next(new Error('Failed to load Project ' + id));
		req.project = project ;
		next();
	});
};

/**
 * Project authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.project.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

/**
 * Check if a Project is closed
 */
exports.isClosed = function(req, res, next) {
	if (req.project.closed === true ) {
		return res.status(400).send('Project is closed.');
	}
	else {
		next();
	}
};