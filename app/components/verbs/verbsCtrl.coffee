app = angular.module 'studo'

app.controller 'VerbsCtrl', [ '$scope', '$http', 'VerbsService', ($scope, $http, VerbsService) ->

	$scope.verbs = VerbsService.getAll()

]