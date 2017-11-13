(function() {
  var app = angular.module('myApp', ['ngRoute', 'ui.router']);
  
  app.run(function($rootScope, $location, $state, LoginService) {
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ 
          console.log('Changed state to: ' + toState);
      });
    
      if(!LoginService.isAuthenticated()) {
        $state.transitionTo('login');
      }
  });

  // app.config(function($routeProvider) {
  //   $routeProvider
  //   .when("/", {
  //       templateUrl : "main.htm"
  //   })
  //   .when("/red", {
  //       templateUrl : "red.htm"
  //   })
  //   .when("/green", {
  //       templateUrl : "green.htm"
  //   })
  //   .when("/blue", {
  //       templateUrl : "blue.htm"
  //   });
  // });
  
  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
      .state('login', {
        url : '/login',
        templateUrl : 'partials/login.html',
        controller : 'LoginController'
      })
      .state('home', {
        url : '/home',
        templateUrl : 'home.html',
        controller : 'HomeController'
      })
      .state('about', {
        url : '/about',
        templateUrl : 'about.html',
        controller : 'AboutController'
      })
      .state('contact', {
        url : '/contact',
        templateUrl : 'contact.html',
        controller : 'ContactController'
      });
  }]);



  app.controller('LoginController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "AngularJS Login Sample";
    
    $scope.formSubmit = function() {
      if(LoginService.login($scope.username, $scope.password)) {
        $scope.error = '';
        $scope.username = '';
        $scope.password = '';
        $state.transitionTo('home');
      } else {
        $scope.error = "Incorrect username/password !";
      }   
    };
    
  });
  
  app.controller('HomeController', function($scope, $rootScope, $stateParams, $state, LoginService) {
    $rootScope.title = "AngularJS Login Sample";
    
  });
  
  app.factory('LoginService', function() {
    var admin = 'a';
    var pass = 'a';
    var isAuthenticated = false;
    
    return {
      login : function(username, password) {
        isAuthenticated = username === admin && password === pass;
        return isAuthenticated;
      },
      isAuthenticated : function() {
        return isAuthenticated;
      }
    };
    
  });
  
})();