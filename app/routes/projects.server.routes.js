'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var projects = require('../../app/controllers/projects.server.controller');

	// Projects Routes
	app.route('/feed')
		.get(function (req,res,next) {
			console.log('feed');
			next();
		},projects.feed);

	app.route('/projects')
		.get(function (req,res,next) {
			console.log('general');
			next();
		},projects.list)
		.post(users.requiresLogin, projects.create);

	app.route('/projects/:projectId/view')
		.get(function (req,res,next) {
			console.log('view');
			next();
		}, projects.read)
		.put(users.requiresLogin, projects.update);

	app.route('/projects/:projectId/edit')
		.get(function (req,res,next) {
			console.log('edit');
			next();
		},projects.read)
		.delete(users.requiresLogin, projects.hasAuthorization, projects.delete)
		.put(users.requiresLogin, projects.hasAuthorization, projects.update);

	// Finish by binding the Project middleware
	app.param('projectId', projects.projectByID);
};
