app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', 'VerbsService', ($scope, $http, VerbsService) ->

	# VERBS INDEX / PLAY ALL
	$scope.verbs = VerbsService.getAll()

	$scope.verb

	# VERBS CREATE
	$scope.createVerb = (verb) ->
		verb = 
			'Verb':
				'german': verb.german
				'english': verb.english
				'spanish': verb.spanish

		VerbsService.service().create verb, 
			() ->
				console.log 'Created'
			(error) ->
				console.log error

	

]