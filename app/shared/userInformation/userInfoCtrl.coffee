app = angular.module 'studo'

app.controller 'UserInfoCtrl', [ '$scope', 'UserInfo', '$rootScope', '$location', ($scope, UserInfo, $rootScope, $location) ->

	$scope.isAuthenticated = UserInfo.isAuthenticated

	$scope.profile = UserInfo.user

	$rootScope.$on 'login-done', ->
	    $scope.profile = UserInfo.user
	    $scope.isAuthenticated = true

	$rootScope.$on 'logout-done', ->
		$scope.profile = null
		$scope.isAuthenticated = false		
		$location.path '/login'



	$scope.signIn = ->
		UserInfo.login()

	$scope.logout = ->
		UserInfo.logout()



]