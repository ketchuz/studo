app = angular.module 'studo'

app.factory 'authInterceptor', [ '$q', 'store', ($q, store) ->

	request: (config) ->
		config.headers['Authentication-Ketchuz'] = store.get 'token'
		config || $q.when(config)

]