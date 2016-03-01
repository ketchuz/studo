app = angular.module 'studo'

app.directive 'navigationBar', [ 'UserInfo', (UserInfo) ->

	restrict: 'E'
	transclude: true
	scope: true
	replace: true
	templateUrl: '/shared/navigation/navbar.html'

]