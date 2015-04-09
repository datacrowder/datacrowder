'use strict';

//Projects service used to communicate Projects REST endpoints
angular.module('projects').factory('Projects', ['$resource',
	function($resource) {
		return {
			General: $resource('projects', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			View: $resource('projects/:projectId/view', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			Answer: $resource('projects/:projectId/answer', { projectId: '@_id' }, { update: { method: 'PUT' } })
		};
	}
]);