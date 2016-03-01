app = angular.module 'studo'

app.config [ '$routeProvider', ($routeProvider) ->

	$routeProvider
		.when '/',
			controller: 'HomeCtrl',
			templateUrl: 'components/home/homeView.html'
		.when '/login',
			controller: 'authenticationCtrl',
			templateUrl: 'shared/authentication/login.html'
]