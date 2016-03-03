app = angular.module 'studo'

app.factory 'authInterceptor', [ '$q', 'store', ($q, store) ->

	request: (config) ->
		config.headers['Authentication'] = store.get 'token'
		config || $q.when(config)

]