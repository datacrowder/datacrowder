'use strict';

angular.module('projects').controller('ViewController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
    function($scope, $stateParams, $location, Authentication, Projects) {
		$scope.authentication = Authentication;
		$scope.newComment = '';

		// Get existing Project
		$scope.getProject = function() {
			$scope.project = Projects.View.get({
				projectId: $stateParams.projectId
			});
		};

		// Add a Comment
		$scope.addComment = function() {
			if ( $scope.authentication.user )
				$scope.newComment.user = $scope.authentication.user._id;
			$scope.project.comments.push($scope.newComment);

			$scope.project.$update(function() {}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);