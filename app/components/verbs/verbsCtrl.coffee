app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', ($scope, $http) ->

	$scope.test = 'HELLO VERBS'

	$http
		method: 'GET'
		url: 'http://www.localhost:3000/verbs.json'
	.then (response) ->
		console.log(response)
	, (response) ->
		console.log(response)

]