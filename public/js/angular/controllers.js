Guides
    .controller('navbarController', ['$scope', 'authService', '$state', 'sessionService', '$rootScope',
        function($scope, authService, $state, sessionService, $rootScope) {
            $scope.logout = function() {
                authService.logout().success(function() {
                    sessionService.unset('loggedin');
                    sessionService.unset('admin');
                    $rootScope.$user = {};
                    $state.go('home');
                })
            }
        }
    ])
    .controller('mainController', ['$scope',
        function($scope) {

        }
    ]).controller('registerController', ['$scope', 'registerService', '$state', 'flashService',
        function($scope, registerService, $state, flashService) {
            $scope.user = {};

            $scope.login = function() {
                registerService.signup($scope.user).success(function(res) {
                    flashService.clearError();
                    $state.go('login');
                }).error(function() {
                    flashService.showError('Something is wrong, please try again later');
                })
            }

        }
    ]).controller('loginController', ['$scope', 'authService', 'sessionService', '$state', 'flashService', '$rootScope',
        function($scope, authService, sessionService, $state, flashService, $rootScope) {

            $scope.loginUser = function() {
                var cred = {
                    email: $scope.email,
                    password: $scope.password
                }
                authService.checkIfUserValid(cred).success(function(data) {
                    flashService.clearError();
                    if (data.admin) {
                        sessionService.set('admin', true);
                    }
                    sessionService.set('loggedin', true);
                    $rootScope.$user = data;
                    $state.go('home');
                }).error(function(data) {
                    flashService.showError(data.flash);
                })

            }
        }
    ]).controller('guidesController', ['$scope', '$http',
        function($scope, $http) {


        }
    ]).controller('newguideController', ['$scope',
        function($scope) {

        }
    ]).controller('userprofileController', ['$scope',
        function($scope) {

        }
    ])