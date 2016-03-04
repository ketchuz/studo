app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', ($scope, $http) ->

	$scope.test = 'HELLO VERBS'

	$scope.verbs = []

	$http
		method: 'GET'
		url: 'http://www.localhost:3000/verbs.json'
	.then (response) ->
		console.log(response)
		$scope.verbs = response.data
	, (response) ->
		console.log(response)

]