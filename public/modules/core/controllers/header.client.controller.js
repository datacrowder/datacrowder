 'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$window', '$location', 'Authentication', 'Menus', 'Projects',
	function($scope, $window, $location, Authentication, Menus, Projects) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');
		$scope.feedParameters = Projects.getParameters();
        $scope.city = $scope.feedParameters.place;

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Perform a search query
		$scope.search = function() {
			Projects.setQuery($scope.query);

			// In case the current window location is not the feed page
			if ( $window.location.href.indexOf('feed') === -1 ) {
				$window.location.replace('http://localhost:3000/#!/feed');
			}
		};

		// Change the location
		$scope.changeLocation = function(location) {
			Projects.setPlace(location);
			$scope.city = $scope.feedParameters.place;

			// In case the current window location is not the feed page
			if ( $window.location.href.indexOf('feed') === -1 ) {
				$window.location.replace('http://localhost:3000/#!/feed');
			}
		};		

		$scope.resetParameters = function() {
			Projects.resetParameters();
			$scope.city = 'Projects';
		};

	}
]);
