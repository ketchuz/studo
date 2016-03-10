app = angular.module 'studo'

app.factory 'VerbsService', ['$http', '$resource', 'serverURL', ($http, $resource, serverURL) ->

	o = {

	}

	o.service = ->
		$resource(serverURL + 'verbs/:id', {id: '@id'},{
			'create': method: 'POST'
			'index': method: 'GET', isArray: true
			'ten_random' : method: 'GET', isArray: true, url: serverURL + 'verbs/ten_random'
			'register_score' : method: 'POST', url: serverURL + 'verbs/register_score'
	})

	o.getAll = ->
		o.service().index()

	o.getTen = ->
		o.service().ten_random()

	o.registerScore = (scores) ->
		o.service().register_score({scores: scores})
	o
]