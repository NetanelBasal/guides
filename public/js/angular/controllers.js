Guides
    .controller('navbarController', ['$scope', 'authService', '$location', 'sessionService',
        function($scope, authService, $location, sessionService) {
            $scope.logout = function() {
                authService.logout().success(function() {
                    sessionService.unset('token');
                    $location.path('/');
                })
            }
        }
    ])
    .controller('mainController', ['$scope',
        function($scope) {

        }
    ]).controller('registerController', ['$scope',
        function($scope) {

        }
    ]).controller('loginController', ['$scope', 'authService', 'sessionService', '$location', 'flashService',
        function($scope, authService, sessionService, $location, flashService) {

            $scope.loginUser = function() {
                var cred = {
                    email: $scope.email,
                    password: $scope.password
                }
                authService.checkIfUserValid(cred).success(function(data) {
                    flashService.clearError();
                    sessionService.set('token', data.session_token);
                    $location.path('/');
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