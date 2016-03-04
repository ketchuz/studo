(function() {
  var app;

  app = angular.module('studo', ['ngRoute', 'ngAnimate', 'auth0', 'angular-storage', 'angular-jwt', 'ui.bootstrap', 'ngSanitize']);

  app.config([
    'authProvider', '$routeProvider', '$httpProvider', 'jwtInterceptorProvider', function(authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
      authProvider.init({
        domain: 'unity-software.auth0.com',
        clientID: '87LRyzwpfbQ8fpT2J4DGEm1pxCR41WGl',
        loginUrl: '/login'
      });
      jwtInterceptorProvider.tokenGetter([
        'store', function(store) {
          return config.headers.Authorization = 'Bearer ' + store.get('token');
        }
      ]);
      return $httpProvider.interceptors.push('authInterceptor');
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
              return console.log('change of url');
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
      }).when('/verbs/all', {
        controller: 'VerbsCtrl',
        templateUrl: 'components/verbs/all.html',
        requiresLogin: true
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.controller('HomeCtrl', [
    '$scope', '$location', function($scope, $location) {
      $(function() {
        return $('[data-toggle="tooltip"').hover(function() {
          return $(this).tooltip('show');
        }, function() {
          return $(this).tooltip('hide');
        });
      });
      $scope.GoToAll = function(section) {
        return $location.path('/' + section + '/all');
      };
      return $scope.items = [
        {
          title: 'Verbs',
          description: "In this section you will be able to play the verbs you know so far. Not only can you revise its infinitive form but also it's most common future and past form.",
          icon: 'fa fa-bicycle',
          img: 'http://ep1.pinkbike.org/p5pb7291062/p5pb7291062.jpg',
          order: 'first',
          section: 'verbs'
        }, {
          title: 'Nouns',
          description: "You might know the rule but...  do you know the gender? Was it 'das', or 'die'? Play this section to help you remember which gender the noun is.",
          icon: 'fa fa-cubes',
          img: 'http://www.desktopdress.com/desktopwallpapers/3d/orange-cube-boxes.jpg',
          order: 'second',
          section: 'nouns'
        }, {
          title: 'Adjectives',
          description: 'Beautify your speech. Adjectives are a fundamental and beautiful part of any language. The more you know, the easier you will be able to express what you think.',
          icon: 'fa fa-heart',
          img: 'http://dpshots.com/images/selective_coloring/umbrella_lake.jpg',
          order: 'third',
          section: 'adjectives'
        }
      ];
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.directive('quizVerbDirective', [
    '$animate', '$compile', function($animate, $compile) {
      var watchers;
      watchers = {};
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          watchers[scope.$id] && watchers[scope.$id]();
          return watchers[scope.$id] = scope.$watch(attrs.quizVerbDirective, function(newValue, oldValue) {
            if (newValue !== oldValue) {
              $animate.enter($compile(element.clone())(scope), element.parent(), element);
              element.html(oldValue);
              return $animate.leave(element);
            }
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.controller('VerbsCtrl', [
    '$scope', '$http', function($scope, $http) {
      var index;
      $scope.headline = 'Some text';
      $scope.list = ['One', 'Two', 'tree'];
      index = 0;
      $scope.changeHeadline = function() {
        $scope.headline = $scope.list[index];
        return index++;
      };
      return $http({
        method: 'GET',
        url: 'http://www.localhost:3000/verbs.json'
      }).then(function(response) {
        console.log(response);
        return $scope.verbs = response.data;
      }, function(response) {
        return console.log(response);
      });
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.factory('VerbsService', [
    '$http', function($http) {
      return $http({
        method: 'GET',
        url: 'localhost:3000/verbs.json'
      });
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
        return UserInfo.logout();
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.factory('authInterceptor', [
    '$q', 'store', function($q, store) {
      return {
        request: function(config) {
          config.headers['Authentication'] = store.get('token');
          return config || $q.when(config);
        }
      };
    }
  ]);

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
    '$scope', 'UserInfo', '$rootScope', '$location', function($scope, UserInfo, $rootScope, $location) {
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
    'auth', '$rootScope', 'store', '$location', '$http', function(auth, $rootScope, store, $location, $http) {
      var o;
      o = {
        user: auth.profile,
        isAuthenticated: auth.isAuthenticated
      };
      o.loginServer = function(profile, token) {
        return $http({
          method: 'POST',
          url: 'http://www.localhost:3000/login'
        }).then(function(response) {
          return console.log(response);
        }, function(response) {
          return console.log(response);
        });
      };
      o.authenticate = function(profile, token) {
        var u;
        console.log(profile);
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
          o.loginServer(profile, token);
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
