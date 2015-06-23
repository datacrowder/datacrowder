'use strict';


angular.module('core').controller('HomeController', ['$scope', '$q', 'Authentication', 'Projects', 'Regions',
	function($scope, $q, Authentication, Projects, Regions) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
		$scope.feedParameters = Projects.getParameters();
		$scope.counts = {London: 0, Berlin: 0};

		// Get all the projects
		$scope.getProjects = function() {
			$scope.projects = Projects.Feed.query({all: true}, function () {
				$scope.regions = Regions.query({}, function () {
					$scope.countProjects('London');
					$scope.countProjects('Berlin');
				});
			});
		};

		// Count the projects from a certain country
		$scope.countProjects = function(country) {
			var count = 0;
			var id;

			// Find the country
			for (var i = 0; i < $scope.regions.length; i++) {
				if ( $scope.regions[i].name === country ) {
					id = $scope.regions[i]._id;
					break;
				}
			}

			// Count the projects
			for (var j = 0; j < $scope.projects.length; j++) {
				// Only works for a two-level hierarchy
				if ( $scope.projects[j].region && 
					( $scope.projects[j].region._id === id || 
						( $scope.projects[j].region.parent && $scope.projects[j].region.parent === id) )) {
					count = count + 1;
				}
			}

			$scope.counts[country] = count;
		};

		// Change the location
		$scope.changeLocation = function(location) {
			Projects.setPlace(location);
		};	
	}
]);