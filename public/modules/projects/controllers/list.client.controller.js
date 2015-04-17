'use strict';

angular.module('projects').controller('ListController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
    function($scope, $stateParams, $location, Authentication, Projects) {
		$scope.authentication = Authentication;

		// Get the user's research
		$scope.research = function() {
			$scope.projects = Projects.Research.query();
		};

		// Get the feed
		$scope.feed = function() {
			$scope.projects = Projects.Feed.query({q: $location.search().q, type: $location.search().type});
		};

		// Get the feed
		$scope.changeType = function(projectType) {
			$scope.projects = Projects.Feed.query({q: $location.search().q, type: projectType});
		};
	}
]);