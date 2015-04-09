'use strict';

angular.module('projects').controller('FeedController', ['$scope', '$stateParams', '$location', 'Authentication', 'Feed', 'Projects',
    function($scope, $stateParams, $location, Authentication, Feed, Projects) {
    	$scope.authentication = Authentication;
    	$scope.formData = {};

		// Find a list of Projects
		$scope.feed = function() {
			$scope.projects = Feed.query();
		};


		// Find existing Project
		$scope.findOne = function() {
			$scope.project = Projects.Answer.get({
				projectId: $stateParams.projectId
			});
		};

		// Submit answer
		$scope.answer = function() {
			//alert($scope.project.questions[0]._id);
			//$scope.project.questions[0].responseData.push({text: 'inca unul'});
			//$scope.project.headline = 'H2';
			var project = $scope.project;

			project.$update(function() {
				$location.path('/feed');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				alert($scope.error);
			});
		};
	}
]);