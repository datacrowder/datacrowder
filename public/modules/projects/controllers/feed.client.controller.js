'use strict';

angular.module('projects').controller('FeedController', ['$scope', '$stateParams', '$location', 'Authentication', 'Feed', 'Projects',
    function($scope, $stateParams, $location, Authentication, Feed, Projects) {
    	$scope.authentication = Authentication;
    	$scope.formAnswers = {};

		// Find a list of Projects
		$scope.feed = function() {
			$scope.projects = Feed.query();
		};

		// Find existing Project form
		$scope.findForm = function() {
			$scope.project = Projects.Answer.get({
				projectId: $stateParams.projectId
			});
		};

		// Build array of aswers for interval question
		$scope.interval = function(start, stop, step) {
			var values = [];
			var n = (stop - start + 1) / step;
			start = parseInt(start);

			for (var i = 0; i < n; i++) {
				values.push(start + i * step);
			}

			return values;
		};

		// Submit answer
		$scope.answer = function() {
			var project = $scope.project;

			// For each question
			for (var i = 0; i < project.questions.length; i++) {
				var answer = {};

				switch ( project.questions[i].type) {
					case 'multiple choice': {
						answer.answerIds = [];

						if ( typeof $scope.formAnswers[i] !== 'undefined' ) {
							// Check all possible answers
							for (var j = 0; j < project.questions[i].responseData.length; j++) {
								if ( $scope.formAnswers[i].answer[j] === true )
									answer.answerIds.push(j);
							}
						}
						break;
					}
					case 'text': {
						answer.answerText = $scope.formAnswers[i];
						break;
					}
					default: {
						answer.answerIds = [$scope.formAnswers[i]];
						break;
					}
				}

				// Check if user is authenticated
				if ( typeof $scope.authentication.user._id !== 'undefined' )
					answer.user = $scope.authentication.user._id;

				project.questions[i].responses.push(answer);
			}
			
			project.$update(function() {
				$location.path('feed'); // projects/id
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);