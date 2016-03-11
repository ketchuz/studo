(function() {
  var app;

  app = angular.module('studo', ['ngRoute', 'ngAnimate', 'auth0', 'angular-storage', 'ngResource', 'angular-jwt', 'ui.bootstrap', 'ngSanitize', 'puigcerber.capitalize']);

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

  app.value('serverURL', 'http://localhost:3000/');

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
        templateUrl: 'components/verbs/verbsAll.html',
        requiresLogin: true,
        resolve: {
          postPromise: [
            'VerbsService', function(VerbsService) {
              return VerbsService.service().ten_random();
            }
          ]
        }
      }).when('/verbs/new', {
        controller: 'VerbsCtrl',
        templateUrl: 'components/verbs/verbsNew.html',
        requiresLogin: true
      }).when('/verbs/improve', {
        controller: 'VerbsCtrl',
        templateUrl: 'components/verbs/verbsToImprove.html',
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
      $scope.GoToNew = function(section) {
        return $location.path('/' + section + '/new');
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
          console.log(watchers);
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
    '$scope', '$http', 'VerbsService', '$location', '$filter', function($scope, $http, VerbsService, $location, $filter) {
      var results;
      $scope.verbs = VerbsService.getTen();
      $scope.isCorrect = false;
      $scope.isImprove = false;
      results = [];
      $scope.createVerb = function(verb) {
        return verb = {
          'verb': {
            'german': verb.german,
            'english': verb.english,
            'spanish': verb.spanish
          }
        };
      };
      $scope.startAll = function() {
        $scope.answer = '';
        $scope.isImprove = false;
        return $scope.verb = $scope.verbs[0];
      };
      $scope.startImprove = function() {
        var $isImprove, toImproveCall;
        $scope.answer = '';
        $isImprove = true;
        $scope.verbs = [];
        toImproveCall = VerbsService.getTenToImprove($scope.range);
        return toImproveCall.$promise.then(function(data) {
          $scope.verbs = data;
          $scope.verb = $scope.verbs[0];
          console.log($scope.verbs);
          return console.log($scope.verb);
        });
      };
      $scope.evaluateQuestion = function(verb, answer) {
        if (answer === null) {
          $scope.isCorrect = false;
          scope.evaluate = !$scope.evaluate;
          return results.push({
            'verbId': verb.id,
            'isCorrect': $scope.isCorrect
          });
        }
        $scope.isCorrect = verb.german.toLowerCase() === answer.toLowerCase() ? true : false;
        results.push({
          'verbId': verb.id,
          'isCorrect': $scope.isCorrect
        });
        return $scope.evaluate = !$scope.evaluate;
      };
      $scope.nextQuestion = function() {
        var anotherVerbsCall, toImproveCall;
        console.log($scope.verbs.length);
        if ($scope.verbs.length > 1) {
          $scope.verbs.splice(0, 1);
        } else {
          $scope.verbs.splice(0, 1);
          console.log(results);
          VerbsService.registerScore(results);
          results = [];
          console.log(results);
          if (!$scope.isImprove) {
            anotherVerbsCall = VerbsService.getTen();
            anotherVerbsCall.$promise.then(function(data) {
              $scope.verbs = data;
              return $scope.verb = $scope.verbs[0];
            });
          } else {
            toImproveCall = VerbsService.getTenToImprove($scope.range);
            toImproveCall.$promise.then(function(data) {
              $scope.verbs = data;
              return $scope.verb = $scope.verbs[0];
            });
          }
        }
        $scope.answer = '';
        $scope.verb = $scope.verbs[0];
        return $scope.evaluate = !$scope.evaluate;
      };
      return $scope.submitForm = function(verb) {
        if ($scope.verbForm.$valid) {
          verb = {
            'verb': {
              'german': $filter('lowercase')(verb.german),
              'english': $filter('lowercase')(verb.english),
              'spanish': $filter('lowercase')(verb.spanish)
            }
          };
          return VerbsService.service().create(verb, function() {
            alert('Verb successfully created!');
            return $location.path('/');
          }, function(error) {
            return console.log(error);
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  var app;

  app = angular.module('studo');

  app.factory('VerbsService', [
    '$http', '$resource', 'serverURL', function($http, $resource, serverURL) {
      var o;
      o = {};
      o.service = function() {
        return $resource(serverURL + 'verbs/:id', {
          id: '@id'
        }, {
          'create': {
            method: 'POST'
          },
          'index': {
            method: 'GET',
            isArray: true
          },
          'ten_random': {
            method: 'GET',
            isArray: true,
            url: serverURL + 'verbs/ten_random'
          },
          'register_score': {
            method: 'POST',
            url: serverURL + 'verbs/register_score'
          },
          'ten_to_improve': {
            method: 'GET',
            isArray: true,
            url: serverURL + 'verbs/ten_to_improve'
          }
        });
      };
      o.getAll = function() {
        return o.service().index();
      };
      o.getTen = function() {
        return o.service().ten_random();
      };
      o.getTenToImprove = function(range) {
        return o.service().ten_to_improve({
          range: range
        });
      };
      o.registerScore = function(scores) {
        return o.service().register_score({
          scores: scores
        });
      };
      return o;
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
