app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', 'VerbsService', '$location', ($scope, $http, VerbsService, $location) ->

	# VERBS INDEX / PLAY ALL
	$scope.verbs = VerbsService.getAll()

	$scope.verb

	# VERBS CREATE
	$scope.createVerb = (verb) ->
		verb = 
			'verb':
				'german': verb.german
				'english': verb.english
				'spanish': verb.spanish

	$scope.submitForm = (verb) ->
		if $scope.verbForm.$valid
			verb = 
				'verb':
					'german': verb.german
					'english': verb.english
					'spanish': verb.spanish

			VerbsService.service().create verb, 
				() ->
					alert('Verb successfully created!')
					$location.path '/'
				(error) ->
					console.log error

	

]