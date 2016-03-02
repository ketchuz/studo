app = angular.module 'studo', ['ngRoute', 'ngAnimate', 'auth0', 'angular-storage', 'angular-jwt', 'ui.bootstrap']

app.config [ 'authProvider', '$routeProvider', '$httpProvider', 'jwtInterceptorProvider', (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) ->
	
	authProvider.init
		domain: 'unity-software.auth0.com',
		clientID: '87LRyzwpfbQ8fpT2J4DGEm1pxCR41WGl',
		loginUrl: '/login'

	
	jwtInterceptorProvider.tokenGetter ['store', (store) ->
		store.get 'token'
	]

	$httpProvider.interceptors.push 'jwtInterceptor'


]

app.run [ 'auth', (auth) ->
	auth.hookEvents()
]

app.run [ '$rootScope', 'auth', 'store', 'jwtHelper', '$location', 'UserInfo', ($rootScope, auth, store, jwtHelper, $location, UserInfo) ->

	$rootScope.$on '$locationChangeStart', ->
		token = store.get 'token'
		if token
			if !jwtHelper.isTokenExpired(token)
				if !auth.isAuthenticated
					UserInfo.authenticate((store.get 'profile'), token)
				else
					$location.path '/'

]