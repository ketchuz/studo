app = angular.module 'studo'

app.factory 'UserInfo', [ 'auth', '$rootScope', 'store', '$location', '$http', (auth, $rootScope, store, $location, $http) ->

	o = {
		user: auth.profile,
		isAuthenticated: auth.isAuthenticated
	}

	o.loginServer = (profile, token) ->
		$http
			method: 'POST'
			url: 'http://www.localhost:3000/login',
		.then (response) ->
			console.log response
		, (response) ->
			console.log response
			


	o.authenticate = (profile, token) ->
		console.log(profile)
		o.user = profile
		$rootScope.$broadcast 'login-done'
		u = auth.authenticate(profile, token)

	o.login = ->
		auth.signin
			authParams:
				scope: 'openid name email'
		, (profile, token) ->
			store.set 'profile', profile
			store.set 'token', token
			o.user = profile
			o.isAuthenticated = true
			o.loginServer profile, token
			$rootScope.$broadcast "login-done"
			$location.path '/'
		, (err) ->
			console.log 'There was an error: ', err

	o.logout = ->
		auth.signout()
		store.remove 'profile'
		store.remove 'token'
		o.user = null
		o.isAuthenticated = false
		$location.path '/login'
		$rootScope.$broadcast 'logout-done'


	o.getUserInfo = ->
		o.user = auth.profile

	return o

]