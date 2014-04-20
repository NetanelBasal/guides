/*================================================
=            App init and set symbols            =
================================================*/


var Guides = angular.module('Guides', ['ui.router', 'ngAnimate'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}).



/*===============================================
=            Configure Autourization            =
===============================================*/


run(['$rootScope', 'authService', '$state', 'flashService', 'sessionService',
    function($rootScope, authService, $state, flashService, sessionService) {

        $rootScope.$auth = authService;
        $rootScope.$session = sessionService;

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            flashService.clearError();
            if (toState.admin && !authService.isAdmin()) {
                $state.go("home");
                event.preventDefault();
            } else if (toState.authenticate && !authService.isLoggedIn()) {
                // User isn’t authenticated
                $state.go("login");
                flashService.showError('please login to access this page')
                event.preventDefault();
            }
        });
    }
]).


/*=====================================
=            Routes Config            =
=====================================*/


config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');

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
            url: '/guides/:id',
            templateUrl: 'partials/all-guides.html',
            controller: 'guidesController',

        }).
        state('new-guide', {
            url: '/new-guide',
            templateUrl: 'partials/new-guide.html',
            controller: 'newguideController',
            authenticate: true,
        }).
        state('user-profile', {
            url: '/profile',
            templateUrl: 'partials/user-profile.html',
            controller: 'userprofileController',
            authenticate: true
        }).
        state('new-category', {
            url: '/add-category',
            templateUrl: 'partials/admin/add-category.html',
            controller: 'categoryController',
            admin: true
        }).
        state('oneguide', {
            url: '/guide/:id',
            templateUrl: 'partials/one-guide.html',
            controller: 'oneGuideController'
        })
    }
])