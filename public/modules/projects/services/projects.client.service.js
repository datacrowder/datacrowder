'use strict';

//Projects service used to communicate Projects REST endpoints
angular.module('projects').factory('Projects', ['$resource',
	function($resource) {
		return {
			Research: $resource('projects', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			Feed: $resource('feed', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			Contribute: $resource('projects/:projectId/contribute', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			View: $resource('projects/:projectId/view', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			Edit: $resource('projects/:projectId/edit', { projectId: '@_id' }, { update: { method: 'PUT' } })
		};
	}
]);