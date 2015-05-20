'use strict';

angular.module('projects').controller('ListController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', 'Regions',
    function($scope, $stateParams, $location, Authentication, Projects, Regions) {
		$scope.authentication = Authentication;

		// Get the user's research
		$scope.research = function() {
			$scope.projects = Projects.Research.query();
		};

		// Get the feed
		$scope.feed = function() {
			if ( typeof $location.search().place !== 'undefined' ) {
				$scope.regions = Regions.query({}, function () {
					$scope.projects = Projects.Feed.query({q: $location.search().q, type: $location.search().type}, function () {
						// If there is a location, filter the results
						$scope.filterLocation();
					});
				});
			}
			else {
				$scope.projects = Projects.Feed.query({q: $location.search().q, type: $location.search().type});
			}

		};

		// Filter the projects according to their location
		$scope.filterLocation = function() {
			var id;

			// Find the country
			for (var i = 0; i < $scope.regions.length; i++) {
				if ( $scope.regions[i].name === $location.search().place ) {
					id = $scope.regions[i]._id;
					break;
				}
			}

			// Remove the projects that do not belong to the place
			var j = 0; 
			while ( j < $scope.projects.length ) {

				// Only works for a two-level hierarchy
				if ( !$scope.projects[j].region || 
						($scope.projects[j].region._id !== id &&
						( !$scope.projects[j].region.parent || $scope.projects[j].region.parent !== id) )) {
					$scope.projects.splice(j, 1);
				}
				else {
					 j++;
				}
			}
		};

		// Change the type
		$scope.changeType = function(projectType) {
			$scope.projects = Projects.Feed.query({q: $location.search().q, type: projectType});
		};
	}
]);