 'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$window', '$location', 'Authentication', 'Menus', 'Projects',
	function($scope, $window, $location, Authentication, Menus, Projects) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Perform a search query
		$scope.search = function() {
			$window.location.replace('http://localhost:3000/#!/feed?q=' + $scope.query);
			
			if ( $window.location.href.indexOf('feed') > -1 ) {
				// In case currently the window location is the feed page, reload it
				$window.location.reload(true);
			}
		};

		// Change the location
		$scope.changeLocation = function(location) {
			if ( location === 'all' ) {
				$window.location.replace('http://localhost:3000/#!/feed');
			}
			else {
				$window.location.replace('http://localhost:3000/#!/feed?place=' + location);
			}

			if ( $window.location.href.indexOf('feed') > -1 ) {
				// In case currently the window location is the feed page, reload it
				$window.location.reload(true);
			}
		};		

		// Collapsing the menu after navigation
        $scope.city = 'Projects';
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
            if (typeof $location.search().place === 'undefined') {
                $scope.city = 'Projects';
            } else {
                $scope.city = $location.search().place;
            }
		});

	}
]);
