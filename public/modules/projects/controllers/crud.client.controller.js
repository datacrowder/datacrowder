'use strict';

angular.module('projects').controller('CrudController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', 'Regions',
    function($scope, $stateParams, $location, Authentication, Projects, Regions) {
		$scope.authentication = Authentication;
		$scope.questionTypes = ['single choice', 'multiple choice', 'interval', 'dropdown', 'text'];
		$scope.statusTypes = [{ value: true, name: 'Story' }, { value: false, name: 'Project' }];
		$scope.questions = [{text: '', type: ''}];
		$scope.genderTypes = ['all', 'male', 'female'];
		$scope.genderGroup = $scope.genderTypes[0];

		// Create new Project
		$scope.create = function() {

			// Create new Project object
			var project = new Projects.Research ({
				headline: this.headline,
				description: this.description,
				questions: this.questions,
				comments: [],
				genderGroup: this.genderGroup
			});

			// Redirect after save
			project.$save(function(response) {
				$location.path('projects/' + response._id);

				// Clear form fields
				$scope.headline = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Project
		$scope.remove = function(project) {
			if ( project ) {
				project.$remove();

				for (var i in $scope.projects) {
					if ($scope.projects [i] === project) {
						$scope.projects.splice(i, 1);
					}
				}
			} else {
				$scope.project.$remove(function() {
					$location.path('projects');
				});
			}
		};

		// Update existing Project
		$scope.update = function() {
			var project = $scope.project;

			project.$update(function() {
				$location.path('projects/' + project._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Get existing Project
		$scope.getProject = function() {
			$scope.project = Projects.Edit.get({
				projectId: $stateParams.projectId
			});
		};

		// Add a Question
		$scope.addQuestion = function(project) {
			if ( project.questions.length < ApplicationConfiguration.maxQuestions )
				project.questions.push({ text : '', type: '' });
		};

		// Remove a Question
		$scope.removeQuestion = function(project, index) {
			project.questions.splice(index, 1);
		};

		// Change type of Question
		$scope.changeType = function(project, index) {
			if ( project.questions[index].type === 'interval' )
				project.questions[index].responseData = [{text : ''}];
			else if ( project.questions[index].type === 'text' )
				project.questions[index].responseData = [];				
			else
				project.questions[index].responseData = [{text : ''}, {text : ''}];

		};

		// Add a Response
		$scope.addResponse = function(question) {
			question.responseData.push({ text : '' });
		};

		// Remove a Response
		$scope.removeResponse = function(question, index) {
			question.responseData.splice(index, 1);
		};


		/*$scope.addRegion = function() {

			// Create new Region object
			var region = new Regions ({
				name: 'Mitte',
				population: 332100,
				parent: $scope.regions[34]._id
			});

			// Redirect after save
			region.$save(function(response) {

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			
		};*/


		$scope.getRegions = function() {
			$scope.regions = Regions.query();
		};

	}
]);