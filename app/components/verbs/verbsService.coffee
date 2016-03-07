app = angular.module 'studo'

app.factory 'VerbsService', ['$http', '$resource', 'serverURL', ($http, $resource, serverURL) ->

	o = {

	}

	o.service = ->
		$resource(serverURL + 'verbs/:id', {id: '@id'},{
			'create': method: 'POST'
			'index': method: 'GET', isArray: true
	})

	o.getAll = ->
		o.service().index()

	o
]