'use strict';

//Setting up route
angular.module('projects').config(['$stateProvider',
	function($stateProvider) {
		// Projects state routing
		$stateProvider.
		state('feed', {
			url: '/feed',
			templateUrl: 'modules/projects/views/feed.client.view.html'
		}).
		state('research', {
			url: '/projects',
			templateUrl: 'modules/projects/views/research.client.view.html'
		}).
		state('createProject', {
			url: '/projects/create',
			templateUrl: 'modules/projects/views/create.client.view.html'
		}).
		state('viewProject', {
			url: '/projects/:projectId',
			templateUrl: 'modules/projects/views/view.client.view.html'
		}).
		state('editProject', {
			url: '/projects/:projectId/edit',
			templateUrl: 'modules/projects/views/edit.client.view.html'
		}).
		state('answer', {
			url: '/projects/:projectId/answer',
			templateUrl: 'modules/projects/views/contribute.client.view.html'
		}).
		state('results', {
			url: '/projects/:projectId/results',
			templateUrl: 'modules/projects/views/results.client.view.html'
		});
	}
]);