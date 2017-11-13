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
        templateUrl : 'partials/dashboard.html',
        controller : 'HomeController'
      })
      .state('about', {
        url : '/about',
        templateUrl : 'partials/about.html'
      })
      .state('contact', {
        url : '/contact',
        templateUrl : 'contact.html',
        controller : 'ContactController'
      });
  }]);



  app.controller('LoginController', function($scope, $stateParams, $state, LoginService) {
    
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
  
  app.controller('HomeController', function($scope, $stateParams, $state) {

  });
  
  app.controller('ContactController', function($scope, $stateParams, $state) {
    
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