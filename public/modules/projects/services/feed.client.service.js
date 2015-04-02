'use strict';

angular.module('projects').factory('Feed', ['$resource',
	function($resource) {
		return $resource('feed/:projectId', { projectId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);