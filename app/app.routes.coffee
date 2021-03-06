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
		.when '/verbs/all',
			controller: 'VerbsCtrl'
			templateUrl: 'components/verbs/verbsAll.html'
			requiresLogin: true
			resolve:
				postPromise: ['VerbsService', (VerbsService) ->
					VerbsService.service().ten_random()
				]
		.when '/verbs/new',
			controller: 'VerbsCtrl'
			templateUrl: 'components/verbs/verbsNew.html'
			requiresLogin: true
		.when '/verbs/improve',
			controller: 'VerbsCtrl'
			templateUrl: 'components/verbs/verbsToImprove.html'
			requiresLogin: true
]