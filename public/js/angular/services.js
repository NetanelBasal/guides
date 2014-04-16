Guides.factory('authService', ['$http', 'sessionService',
    function($http, sessionService) {
        var checkIfUserValid = function(cred) {
            return $http.post('/login', cred);
        }

        var logout = function() {
            return $http.post('/logout');
        }

        var isLoggedIn = function() {
            return sessionService.get('token');
        }

        return {
            checkIfUserValid: checkIfUserValid,
            logout: logout,
            isLoggedIn: isLoggedIn
        };
    }
]).
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
factory("flashService", function($rootScope) {
    return {
        showError: function(message) {
            $rootScope.flasherror = message;
        },
        clearError: function() {
            $rootScope.flasherror = "";
        }
    }
});