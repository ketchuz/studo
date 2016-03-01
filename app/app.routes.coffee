app = angular.module 'studo'

app.config [ '$routeProvider', ($routeProvider) ->

	$routeProvider
		.when '/',
			controller: 'HomeCtrl',
			templateUrl: 'components/home/homeView.html'
			requiresLogin: true
		.when '/login',
			controller: 'authenticationCtrl',
			templateUrl: 'shared/authentication/login.html'
]