app = angular.module 'studo'

app.factory 'VerbsService', ['$http', '$resource', 'serverURL', ($http, $resource, serverURL) ->

	o = {

	}

	o.service = ->
		$resource(serverURL + 'verbs/:id', {id: '@id'},{
			'create': method: 'POST'
			'index': method: 'GET', isArray: true
			'ten_random' : method: 'GET', isArray: true, url: serverURL + 'verbs/ten_random'
	})

	o.getAll = ->
		o.service().index()

	o.getTen = ->
		o.service().ten_random()

	o
]