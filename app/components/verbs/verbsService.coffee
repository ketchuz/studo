app = angular.module 'studo'

app.factory 'VerbsService', ['$http', ($http) ->

	$http
		method: 'GET'
		url: 'localhost:3000/verbs.json'

]