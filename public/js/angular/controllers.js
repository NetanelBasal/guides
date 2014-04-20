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

.controller('guidesController', ['$scope', '$http', 'Guides', '$state', '$window',
    function($scope, $http, Guides, $state, $window) {


        $scope.currentPage = 1;
        $scope.pagesNumber = [];

        Guides.getAllGuides($scope.currentPage).success(function(data) {
            $scope.totalPages = data.last_page;
            $scope.currentPage = data.current_page;
            $scope.guides = data.data;
            for (var i = 1; i <= $scope.totalPages; i++) {
                $scope.pagesNumber.push(i);
            }

        });


        $scope.setPage = function(page) {
            Guides.getAllGuides(page).success(function(data) {
                $scope.currentPage = data.current_page;
                $scope.guides = data.data;
            });
        }

        $scope.isCurrentPage = function(page) {
            return $scope.currentPage == page;
        }


        $scope.pageBack = function() {
            page = $scope.currentPage - 1;
            if (page >= 1) {
                $scope.setPage(page);
            }

        }
        $scope.pageForward = function() {
            page = $scope.currentPage + 1;
            if (page <= $scope.totalPages) {
                $scope.setPage(page);
            }
        }

        /*====================================
        =            delete Guide            =
        ====================================*/


        $scope.deleteGuide = function(id) {
            $http.delete('/api/guides/' + id).success(function(data) {

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
])