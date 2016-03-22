app = angular.module 'studo'

app.factory 'VerbsService', ['$http', '$resource', 'serverURL', ($http, $resource, serverURL) ->

	o = {

	}

	o.service = ->
		$resource(serverURL + 'verbs/:id', {id: '@id'},{
			'create': method: 'POST'
			'index': method: 'GET', isArray: true
			'update': method: 'PUT'
			'ten_random' : method: 'GET', isArray: true, url: serverURL + 'verbs/ten_random'
			'register_score' : method: 'POST', url: serverURL + 'verbs/register_score'
			'ten_to_improve': method: 'GET', isArray: true, url: serverURL + 'verbs/ten_to_improve'
			'existingVerbs': method: 'GET', isArray: true, url: serverURL + 'verbs/query_verb'
	})

	o.getAll = ->
		o.service().index()

	o.getTen = ->
		o.service().ten_random()

	o.updateVerb = (verb) ->
		o.service().update
			id: verb.id, verb: verb
			, () ->
				alert 'Verb Updated Successfuly!'
				true
			, (error) ->
				console.log error

	o.createVerb = (verb) ->
		o.service().create 
			verb: verb, 
			() ->
				alert('Verb successfully created!')
				true
			(error) ->
				console.log error

	o.queryVerbs = (input) ->
		o.service().existingVerbs({q: input})

	o.getTenToImprove = (range) ->
		o.service().ten_to_improve({range: range})


	o.registerScore = (scores) ->
		o.service().register_score({scores: scores})
	o
]