(function() {
    var app = angular.module('myApp', ['ngRoute', 'ui.router']);

    app.run(function($rootScope, $location, $state, LoginService) {
        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                console.log('Changed state to: ' + toState);
            });

        if (!LoginService.isAuthenticated()) {
            $state.transitionTo('login');
        }
    });


    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'LoginController'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'partials/dashboard.html',
                controller: 'HomeController'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'partials/about.html'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'partials/contact.html',
                controller: 'ContactController'
            });
    }]);



    app.controller('LoginController', function($scope, $stateParams, $state, LoginService) {

        $scope.formSubmit = function() {
            if (LoginService.login($scope.username, $scope.password)) {
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
        // function initMap() {
        //   var uluru = {lat: -25.363, lng: 131.044};
        //   var map = new google.maps.Map(document.getElementById('map'), {
        //     zoom: 4,
        //     center: uluru
        //   });
        //   var marker = new google.maps.Marker({
        //     position: uluru,
        //     map: map
        //   });
        // }
    });


    app.factory('LoginService', function() {
        var admin = 'a';
        var pass = 'a';
        var isAuthenticated = false;

        return {
            login: function(username, password) {
                isAuthenticated = username === admin && password === pass;
                return isAuthenticated;
            },
            isAuthenticated: function() {
                return isAuthenticated;
            }
        };

    });

    app.directive('myMap', function() {

        var link = function(scope, element, attrs) {
            var map, infoWindow;
            var markers = [];

            var mapOptions = {
                center: new google.maps.LatLng(50, 2),
                zoom: 4,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false
            };

            function initMap() {
                if (map === void 0) {
                    map = new google.maps.Map(element[0], mapOptions);
                }
            }

            function setMarker(map, position, title, content) {
                var marker;
                var markerOptions = {
                    position: position,
                    map: map,
                    title: title,
                    icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
                };

                marker = new google.maps.Marker(markerOptions);
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {

                    if (infoWindow !== void 0) {
                        infoWindow.close();
                    }

                    var infoWindowOptions = {
                        content: content
                    };
                    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                    infoWindow.open(map, marker);
                });
            }

            initMap();

            setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
            setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
            setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
        };

        return {
            restrict: 'A',
            template: '<div id="gmaps"></div>',
            replace: true,
            link: link
        };
    });

})();