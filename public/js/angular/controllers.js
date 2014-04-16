Guides
    .controller('navbarController', ['$scope', 'authService', '$state', 'sessionService',
        function($scope, authService, $state, sessionService) {
            $scope.logout = function() {
                authService.logout().success(function() {
                    sessionService.unset('token');
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
    ]).controller('loginController', ['$scope', 'authService', 'sessionService', '$state', 'flashService',
        function($scope, authService, sessionService, $state, flashService) {

            $scope.loginUser = function() {
                var cred = {
                    email: $scope.email,
                    password: $scope.password
                }
                authService.checkIfUserValid(cred).success(function(data) {
                    flashService.clearError();
                    sessionService.set('token', data.session_token);
                    $state.go('home');
                }).error(function(data) {
                    flashService.showError(data.flash);
                })

            }
        }
    ]).controller('guidesController', ['$scope',
        function($scope) {

        }
    ]).controller('newguideController', ['$scope',
        function($scope) {

        }
    ]).controller('userprofileController', ['$scope',
        function($scope) {

        }
    ])