(function() {
  var app;

  app = angular.module('studo', ['ngRoute', 'ngAnimate', 'auth0', 'angular-storage', 'angular-jwt', 'ui.bootstrap']);

  app.config([
    'authProvider', '$routeProvider', '$httpProvider', 'jwtInterceptorProvider', function(authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
      authProvider.init({
        domain: 'unity-software.auth0.com',
        clientID: '87LRyzwpfbQ8fpT2J4DGEm1pxCR41WGl',
        loginUrl: '/login'
      });
      jwtInterceptorProvider.tokenGetter([
        'store', function(store) {
          return store.get('token');
        }
      ]);
      return $httpProvider.interceptors.push('jwtInterceptor');
    }
  ]);

  app.run([
    'auth', function(auth) {
      return auth.hookEvents();
    }
  ]);

  app.run([
    '$rootScope', 'auth', 'store', 'jwtHelper', '$location', 'UserInfo', function($rootScope, auth, store, jwtHelper, $location, UserInfo) {
      return $rootScope.$on('$locationChangeStart', function() {
        var token;
        token = store.get('token');
        if (token) {
          if (!jwtHelper.isTokenExpired(token)) {
            if (!auth.isAuthenticated) {
              return UserInfo.authenticate(store.get('profile'), token);
            } else {
              return $location.path('/');
            }
          }
        }
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.config([
    '$routeProvider', function($routeProvider) {
      return $routeProvider.when('/', {
        controller: 'HomeCtrl',
        templateUrl: 'components/home/homeView.html',
        requiresLogin: true
      }).when('/login', {
        controller: 'authenticationCtrl',
        templateUrl: 'shared/authentication/login.html'
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.controller('HomeCtrl', [
    '$scope', function($scope) {
      $(function() {
        return $('[data-toggle="tooltip"').hover(function() {
          return $(this).tooltip('show');
        }, function() {
          return $(this).tooltip('hide');
        });
      });
      return $scope.items = [
        {
          title: 'Verbs',
          description: "In this section you will be able to play the verbs you know so far. Not only can you revise its infinitive form but also it's most common future and past form.",
          icon: 'fa fa-bicycle',
          img: 'http://ep1.pinkbike.org/p5pb7291062/p5pb7291062.jpg',
          order: 'first'
        }, {
          title: 'Nouns',
          description: "You might know the rule but...  do you know the gender? Was it 'das', or 'die'? Play this section to help you remember which gender the noun is.",
          icon: 'fa fa-cubes',
          img: 'http://www.desktopdress.com/desktopwallpapers/3d/orange-cube-boxes.jpg',
          order: 'second'
        }, {
          title: 'Adjectives',
          description: 'Beautify your speech. Adjectives are a fundamental and beautiful part of any language. The more you know, the easier you will be able to express what you think.',
          icon: 'fa fa-heart',
          img: 'http://dpshots.com/images/selective_coloring/umbrella_lake.jpg',
          order: 'third'
        }
      ];
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.controller('authenticationCtrl', [
    '$scope', '$http', '$location', 'UserInfo', '$rootScope', function($scope, $http, $location, UserInfo, $rootScope) {
      $scope.profile = UserInfo.user;
      $rootScope.$on('login-done', function() {
        return $scope.profile = UserInfo.user;
      });
      $scope.signIn = function() {
        return UserInfo.login();
      };
      return $scope.logout = function() {
        UserInfo.logout();
        return console.log('log');
      };
    }
  ]);

}).call(this);

(function() {


}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.directive('navigationBar', [
    'UserInfo', function(UserInfo) {
      return {
        restrict: 'E',
        transclude: true,
        scope: true,
        replace: true,
        templateUrl: '/shared/navigation/navbar.html'
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.controller('UserInfoCtrl', [
    '$scope', 'UserInfo', '$rootScope', function($scope, UserInfo, $rootScope) {
      $scope.isAuthenticated = UserInfo.isAuthenticated;
      $scope.profile = UserInfo.user;
      $rootScope.$on('login-done', function() {
        $scope.profile = UserInfo.user;
        return $scope.isAuthenticated = true;
      });
      $rootScope.$on('logout-done', function() {
        $scope.profile = null;
        $scope.isAuthenticated = false;
        return $location.path('/login');
      });
      $scope.signIn = function() {
        return UserInfo.login();
      };
      return $scope.logout = function() {
        return UserInfo.logout();
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.factory('UserInfo', [
    'auth', '$rootScope', 'store', '$location', function(auth, $rootScope, store, $location) {
      var o;
      o = {
        user: auth.profile,
        isAuthenticated: auth.isAuthenticated
      };
      o.authenticate = function(profile, token) {
        var u;
        console.log(profile.name);
        o.user = profile;
        $rootScope.$broadcast('login-done');
        return u = auth.authenticate(profile, token);
      };
      o.login = function() {
        return auth.signin({
          authParams: {
            scope: 'openid name email'
          }
        }, function(profile, token) {
          store.set('profile', profile);
          store.set('token', token);
          o.user = profile;
          o.isAuthenticated = true;
          $rootScope.$broadcast("login-done");
          return $location.path('/');
        }, function(err) {
          return console.log('There was an error: ', err);
        });
      };
      o.logout = function() {
        auth.signout();
        store.remove('profile');
        store.remove('token');
        o.user = null;
        o.isAuthenticated = false;
        $location.path('/login');
        return $rootScope.$broadcast('logout-done');
      };
      o.getUserInfo = function() {
        return o.user = auth.profile;
      };
      return o;
    }
  ]);

}).call(this);
