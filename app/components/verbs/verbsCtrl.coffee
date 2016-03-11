app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', 'VerbsService', '$location', '$filter', ($scope, $http, VerbsService, $location, $filter) ->

	# VERBS INDEX / PLAY ALL
	$scope.verbs = VerbsService.getTen()
	$scope.isCorrect = no
	$scope.isImprove = no
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
		$scope.isImprove = no
		$scope.verb = $scope.verbs[0]

	$scope.startImprove = ->
		$scope.answer = ''
		$isImprove = yes
		$scope.verbs = []
		toImproveCall = VerbsService.getTenToImprove($scope.range)
		toImproveCall.$promise.then (data) ->
			$scope.verbs = data
			$scope.verb = $scope.verbs[0]
			console.log $scope.verbs
			console.log $scope.verb

	$scope.evaluateQuestion = (verb, answer) ->

		if answer == null
			$scope.isCorrect = no
			scope.evaluate = !$scope.evaluate
			return results.push
				'verbId': verb.id
				'isCorrect': $scope.isCorrect

		$scope.isCorrect = if verb.german.toLowerCase() == answer.toLowerCase() then yes else no
		results.push
			'verbId': verb.id
			'isCorrect': $scope.isCorrect
		$scope.evaluate = !$scope.evaluate

	
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
			VerbsService.registerScore(results)
			results = []
			console.log results

			if !$scope.isImprove
				anotherVerbsCall = VerbsService.getTen()
				anotherVerbsCall.$promise.then (data) ->
				      $scope.verbs = data
				      $scope.verb = $scope.verbs[0]
			else
				toImproveCall = VerbsService.getTenToImprove($scope.range)
				toImproveCall.$promise.then (data) ->
					$scope.verbs = data
					$scope.verb = $scope.verbs[0]

			  
		$scope.answer = ''
		$scope.verb = $scope.verbs[0]
		$scope.evaluate = !$scope.evaluate


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