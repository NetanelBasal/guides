var Guides = angular.module('Guides', ['ui.router', 'ngAnimate'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});





Guides
    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'partials/main-page.html',
                    controller: 'mainController'
                }).
            state('register', {
                url: '/register',
                templateUrl: 'partials/register-page.html',
                controller: 'registerController'
            }).
            state('login', {
                url: '/login',
                templateUrl: 'partials/login-page.html',
                controller: 'loginController'
            }).
            state('guides', {
                url: '/guides',
                templateUrl: 'partials/all-guides.html',
                controller: 'guidesController'
            }).
            state('new-guide', {
                url: '/new-guide',
                templateUrl: 'partials/new-guide.html',
                controller: 'newguideController'
            }).
            state('user-profile', {
                url: '/profile',
                templateUrl: 'partials/user-profile.html',
                controller: 'userprofileController'
            })
        }
    ])