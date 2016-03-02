app = angular.module 'studo'

app.controller 'authenticationCtrl', [ '$scope', '$http', '$location', 'UserInfo', '$rootScope', ($scope, $http, $location, UserInfo, $rootScope) ->
	
	$scope.profile = UserInfo.user

	$rootScope.$on 'login-done', ->
	    $scope.profile = UserInfo.user
	   
	
	$scope.signIn = ->
		UserInfo.login()

	$scope.logout = ->
		UserInfo.logout()

]