'use strict';

angular.module('projects').factory('Regions', ['$resource',
	function($resource) {
		return $resource('regions', {}, { update: { method: 'PUT' } });
	}
]);