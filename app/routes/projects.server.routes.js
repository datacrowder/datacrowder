'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var projects = require('../../app/controllers/projects.server.controller');

	// Feed Routes
	app.route('/feed')
		.get(function (req,res,next) {
			console.log('feed');
			next();
		},projects.feed);

	app.route('/feed/:projectId')
		.get(function (req,res,next) {
			console.log('feed/projectId');
			next();
		}, projects.read)
		.put(projects.update);

	// Projects Routes
	app.route('/projects')
		.get(function (req,res,next) {
			console.log('projects');
			next();
		},projects.list)
		.post(users.requiresLogin, projects.create);

	app.route('/projects/:projectId')
		.get(function (req,res,next) {
			console.log('projects/projectId');
			next();
		}, projects.read)
		.delete(users.requiresLogin, projects.hasAuthorization, projects.delete)
		.put(users.requiresLogin, projects.hasAuthorization, projects.update);

	// Finish by binding the Project middleware
	app.param('projectId', projects.projectByID);
};
