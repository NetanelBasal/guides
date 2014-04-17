/*=============================================
=            navbarController            =
=============================================*/

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
            $scope.$state = $state;
        }
    ])

/*=============================================
=           mainController           =
=============================================*/

.controller('mainController', ['$scope',
    function($scope) {

    }
])

/*=============================================
=            registerController            =
=============================================*/

.controller('registerController', ['$scope', 'registerService', '$state', 'flashService',
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
])
/*=============================================
=            loginController            =
=============================================*/

.controller('loginController', ['$scope', 'authService', 'sessionService', '$state', 'flashService', '$rootScope',
    function($scope, authService, sessionService, $state, flashService, $rootScope) {

        $scope.loginUser = function() {
            authService.checkIfUserValid($scope.cred).success(function(data) {
                flashService.clearError();
                if (data.admin) {
                    sessionService.set('admin', true);
                }
                sessionService.set('loggedin', true);
                sessionService.set('token', data.session_token);
                sessionService.set('user_id', data.id);
                sessionService.set('firstname', data.firstname);
                sessionService.set('email', data.email);

                $state.go('home');
            }).error(function(data) {
                flashService.showError(data.flash);
            })

        }
    }
])

/*=============================================
=            guidesController           =
=============================================*/

.controller('guidesController', ['$scope', '$http',
    function($scope, $http) {


    }
])

/*=============================================
=            newguideController            =
=============================================*/


.controller('newguideController', ['$scope', 'newguideService', 'categoryService',
    function($scope, newguideService, categoryService) {


        categoryService.getCategories().success(function(res) {
            $scope.categories = res;
        })

        $scope.$watch('categoryid', function(newval) {
            if (newval) {
                $scope.n.category_id = newval.id;
            }
        })

        $scope.addnewguide = function() {
            newguideService.saveGuide($scope.n).success(function(re) {
                if (re.save) $scope.successaddguide = 'Thanks you the Guide is saved!';
            })

        }

    }
])

/*=============================================
=            userprofileController            =
=============================================*/

.controller('userprofileController', ['$scope',
    function($scope) {

    }
])
/*=============================================
=            categoryController            =
=============================================*/

.controller('categoryController', ['$scope', 'categoryService',
    function($scope, categoryService) {
        $scope.addcategory = function() {
            categoryService.addCategory({
                name: $scope.category
            }).success(function(res) {
                if (res.save) {
                    $scope.categoryMessage = "Category been saved!"
                } else {
                    $scope.categoryMessage = "something went wrong"
                }
            })
        }
    }
])