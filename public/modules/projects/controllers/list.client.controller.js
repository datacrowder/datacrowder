'use strict';

angular.module('projects').controller('ListController', ['$scope', '$stateParams', 'Authentication', 'Projects', 'Regions',
    function($scope, $stateParams, Authentication, Projects, Regions) {
		$scope.authentication = Authentication;
		$scope.feedParameters = Projects.getParameters();

		// Get the user's research
		$scope.research = function() {
			$scope.projects = Projects.Research.query();
		};

		// Get the feed
		$scope.feed = function() {
			$scope.regions = Regions.query({}, function () {
				$scope.projects = Projects.Feed.query({q: $scope.feedParameters.q, closed: $scope.feedParameters.closed}, function () {
					// If there is a location, filter the results
					if ( $scope.feedParameters.place !== 'all' )
						$scope.filterLocation();
				});
			});
		};

		// Filter the projects according to their location
		$scope.filterLocation = function() {
			var id;

			// Find the country
			for (var i = 0; i < $scope.regions.length; i++) {
				if ( $scope.regions[i].name === $scope.feedParameters.place ) {
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
		$scope.changeType = function(closedProject) {
			Projects.setClosed(closedProject);
		};

		// Watch for changes of the feed parameters
		$scope.$watchCollection('feedParameters', function () {
			$scope.feed();
		});
	}
]);
