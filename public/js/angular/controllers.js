/*=============================================
=            navbarController            =
=============================================*/

Guides
    .controller('navbarController', ['$scope', 'authService', '$state', 'sessionService', '$rootScope',
        function($scope, authService, $state, sessionService, $rootScope) {
            $scope.logout = function() {
                authService.logout().success(function() {
                    sessionStorage.clear();
                    $state.go('home');
                })
            }
            $rootScope.$state = $state;
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
                sessionService.set('loggedin', true);
                _.forEach(data, function(value, key) {
                    if (data.admin) {
                        sessionService.set('admin', true);
                    }
                        sessionService.set(key,value);
                });

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

.controller('guidesController', ['$scope', '$http', 'Guides', 'categories',
    function($scope, $http, Guides, categories) {

        $scope.categories = categories.data;

        /*====================================
        =            delete Guide            =
        ====================================*/

        $scope.deleteGuide = function(id) {

            $http.delete('/api/guides/' + id).success(function(data) {
//                location.reload();
            })
        }
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
]).
/*==========================================
=            oneGuideController            =
==========================================*/
controller('oneGuideController', ['$scope', 'Guides', '$http', '$stateParams',
    function($scope, Guides, $http, $stateParams) {
        var id = $stateParams.id;
        $http.get('/api/guides/' + id).success(function(data) {
            $scope.guide = data;
        })

    }
]).

    /*==========================================
     =            myGuidesController           =
     ==========================================*/
    controller('myGuidesController', function($scope,Guides, sessionService, $http) {
        $scope.net = true;
        Guides.getMyGuides(sessionService.get('id')).success(function(res) {

            $scope.guides = res;
            $scope.net = false;
        });

        $scope.deleteGuide = function(id) {
            $http.delete('/api/guides/' + id).success(function(data) {
                location.reload();
            })
        }

        $scope.editGuide = function(id) {
            console.log('f');
        }
    });