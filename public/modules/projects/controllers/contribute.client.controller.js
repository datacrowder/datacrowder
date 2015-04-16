'use strict';

angular.module('projects').controller('ContributeController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects',
    function($scope, $stateParams, $location, Authentication, Projects) {
    	$scope.authentication = Authentication;
    	$scope.formAnswers = {};

		// Find existing Project form
		$scope.getProject = function() {
			$scope.project = Projects.Contribute.get({
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

		// Get the values of interval answers 
		$scope.getIntervalValues = function(question) {
			var start = parseInt(question.startValue), step = parseInt(question.responseData[0].text);
			var answerValues = [];

			for (var i = 0; i < question.responses.length; i++) {
				answerValues.push(start + question.responses[i].answerIds[0] * step);
			}

			return answerValues;
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
				if ( $scope.authentication.user && typeof $scope.authentication.user._id !== 'undefined' )
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