app = angular.module 'studo'

app.directive 'navigationBar', [ () ->

	restrict: 'E'
	templateUrl: '/shared/navigation/navbar.html'
	controler: 'UserInfoCtrl'
]