/*===================================
 =            AuthService            =
 ===================================*/

Guides.factory('authService', ['$http', 'sessionService',

    function($http, sessionService) {
        var checkIfUserValid = function(cred) {
            return $http.post('/login', cred);
        }

        var logout = function() {
            return $http.post('/logout');
        }

        var isLoggedIn = function() {
            return sessionService.get('loggedin');
        }

        var isAdmin = function() {
            return sessionService.get('admin');
        }

        return {
            checkIfUserValid: checkIfUserValid,
            logout: logout,
            isLoggedIn: isLoggedIn,
            isAdmin: isAdmin
        };
    }
]).

/*=======================================
=            registerService            =
=======================================*/


factory('registerService', ['$http',
    function($http) {

        var signup = function(user) {
            return $http.post('/signup', user);
        }
        return {
            signup: signup
        };
    }
]).

/*======================================
=            sessionService            =
======================================*/


factory('sessionService', [

    function() {
        return {
            get: function(key) {
                return sessionStorage.getItem(key);
            },
            set: function(key, val) {
                return sessionStorage.setItem(key, val);
            },
            unset: function(key) {
                return sessionStorage.removeItem(key);
            }
        }
    }
]).

/*====================================
=            flashService            =
====================================*/


factory("flashService", function($rootScope) {
    return {
        showError: function(message) {
            $rootScope.flasherror = message;
        },
        clearError: function() {
            $rootScope.flasherror = "";
        }
    }
}).

/*===============================================
=            authInterceptor Service            =
===============================================*/


factory('authInterceptor', function($rootScope, $q, sessionService, $location, flashService) {
    return {
        request: function(config) {
            return config;
        },
        response: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                flashService.showError('please login to access this page')
            }
            return response || $q.when(response);
        }
    };
}).

/*=========================================
=            categoery Service            =
=========================================*/

factory('categoryService', function($http) {
    return {
        addCategory: function(category) {
            return $http.post('/addcategory', category)
        }
    }
})