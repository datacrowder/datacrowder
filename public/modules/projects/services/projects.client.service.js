'use strict';

//Projects service used to communicate Projects REST endpoints
angular.module('projects').factory('Projects', ['$resource',
	function($resource) {

		var feedParameters = {
			q: '',
			place: 'all'
		};

		return {
			Research: $resource('projects', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			Feed: $resource('feed', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			Contribute: $resource('projects/:projectId/contribute', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			View: $resource('projects/:projectId/view', { projectId: '@_id' }, { update: { method: 'PUT' } }),
			Edit: $resource('projects/:projectId/edit', { projectId: '@_id' }, { update: { method: 'PUT' } }),

			getParameters: function() {
				return feedParameters;
			},

			setQuery: function(query) {
				feedParameters.q = query;
			},

			setClosed: function(closed) {
				feedParameters.closed = closed;
			},

			setPlace: function(place) {
				delete feedParameters.closed;
				feedParameters.q = '';
				feedParameters.place = place;
			},

			resetParameters: function() {
				delete feedParameters.closed;
				feedParameters.q = '';
				feedParameters.place = 'all';
			}

		};
	}
]);