app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', 'VerbsService', '$location', '$filter', ($scope, $http, VerbsService, $location, $filter) ->

	# VERBS INDEX / PLAY ALL
	$scope.verbs = VerbsService.getTen()
	$scope.isCorrect = no

	results = []

	# VERBS CREATE
	$scope.createVerb = (verb) ->
		verb = 
			'verb':
				'german': verb.german
				'english': verb.english
				'spanish': verb.spanish

	$scope.startAll = ->
		$scope.answer = ''
		$scope.verb = $scope.verbs[0]

	$scope.evaluateQuestion = (verb, answer) ->
		if answer == null
			$scope.isCorrect = no
			return results.push
				'verbId': verb.id
				'isCorrect': $scope.isCorrect

		$scope.isCorrect = if verb.german.toLowerCase() == answer.toLowerCase() then yes else no
		results.push
			'verbId': verb.id
			'isCorrect': $scope.isCorrect

	
	# MOVE TO NEXT QUESTION
	$scope.nextQuestion = () ->
		console.log $scope.verbs.length
		if $scope.verbs.length > 1
			$scope.verbs.splice(0, 1);
		# IF THE ARRAY IS ABOUT TO BE EMPTY, MAKE ANOTHER CALL 
		# TO GET MORE VERBS
		else
			$scope.verbs.splice(0, 1);
			console.log results
			anotherVerbsCall = VerbsService.getTen()
			anotherVerbsCall.$promise.then (data) ->
			      $scope.verbs = data
			      $scope.verb = $scope.verbs[0]

			  
		$scope.answer = ''
		$scope.verb = $scope.verbs[0]


	$scope.submitForm = (verb) ->
		if $scope.verbForm.$valid
			verb = 
				'verb':
					'german': $filter('lowercase')(verb.german)
					'english': $filter('lowercase')(verb.english)
					'spanish': $filter('lowercase')(verb.spanish)

			VerbsService.service().create verb, 
				() ->
					alert('Verb successfully created!')
					$location.path '/'
				(error) ->
					console.log error



	

]