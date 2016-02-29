(function() {
  var app;

  app = angular.module('studo', ['ngRoute', 'ngAnimate']);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        controller: 'HomeCtrl',
        templateUrl: 'components/home/homeView.html'
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.controller('HomeCtrl', [
    '$scope', function($scope) {
      return $scope.test = 'Hello from controller';
    }
  ]);

}).call(this);
