app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', ($scope, $http) ->

	$scope.headline = 'Some text'

	$scope.list = [
		'One'
		'Two'
		'tree'
	]

	index = 0

	$scope.changeHeadline = ->
		$scope.headline = $scope.list[index]
		index++

	$http
		method: 'GET'
		url: 'http://www.localhost:3000/verbs.json'
	.then (response) ->
		console.log(response)
		$scope.verbs = response.data
	, (response) ->
		console.log(response)

]