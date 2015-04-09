'use strict';

//Setting up route
angular.module('projects').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('viewFeedProject', {
			url: '/feed/:projectId',
			templateUrl: 'modules/projects/views/view-project.client.view.html'
		}).
		state('answer', {
			url: '/feed/:projectId/answer',
			templateUrl: 'modules/projects/views/answer.client.view.html'
		}).
		state('feed', {
			url: '/feed',
			templateUrl: 'modules/projects/views/feed.client.view.html'
		}).
		state('listProjects', {
			url: '/projects',
			templateUrl: 'modules/projects/views/list-projects.client.view.html'
		}).
		state('createProject', {
			url: '/projects/create',
			templateUrl: 'modules/projects/views/create-project.client.view.html'
		}).
		state('viewProject', {
			url: '/projects/:projectId',
			templateUrl: 'modules/projects/views/view-project.client.view.html'
		}).
		state('editProject', {
			url: '/projects/:projectId/edit',
			templateUrl: 'modules/projects/views/edit-project.client.view.html'
		});
	}
]);