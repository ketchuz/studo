app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', ($scope, $http) ->

	$scope.list = [
		'one',
		'two',
		'three'
	]

	index = 0
	$scope.name = $scope.list[0]
	$scope.headline = '<h1>'+$scope.name+'</h1>'

	$scope.changeHeadline = ->
		$scope.name = $scope.list[++index]

	$http
		method: 'GET'
		url: 'http://www.localhost:3000/verbs.json'
	.then (response) ->
		console.log(response)
		$scope.verbs = response.data
	, (response) ->
		console.log(response)

]