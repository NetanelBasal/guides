var Guides = angular.module('Guides', ['ui.router', 'ngAnimate'], function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
});

Guides.run(['$rootScope', 'authService', '$state', 'flashService',
    function($rootScope, authService, $state, flashService) {
        $rootScope.$auth = authService;
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
]);

Guides.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
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
                authenticate: true,
                admin: true
            }).
            state('new-category', {
                url: '/add-category',
                templateUrl: 'partials/admin/add-category.html',
                controller: 'categoryController',
                admin: true
            })
        }
    ])