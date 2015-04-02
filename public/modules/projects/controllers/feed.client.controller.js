'use strict';

angular.module('projects').controller('FeedController', ['$scope', '$stateParams', '$location', 'Authentication', 'Feed',
    function($scope, $stateParams, $location, Authentication, Feed) {
    	$scope.authentication = Authentication;

		// Find a list of Projects
		$scope.feed = function() {
			$scope.projects = Feed.query();
		};
	}
]);