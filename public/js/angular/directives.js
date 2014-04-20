/*====================================================
=            passwordMatchCheck Directive            =
====================================================*/

Guides.directive('passwordMatchCheck', [

    function() {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                var firstPassword = '.' + attrs.pwCheck;
                elem.add(firstPassword).on('keyup', function() {
                    scope.$apply(function() {
                        var v = elem.val() === $(firstPassword).val();
                        ctrl.$setValidity('pwmatch', v);
                    });
                });
            }
        }
    }
])


/*=============================================
=            checkIfEmailExits Directive           =
=============================================*/

.directive('checkIfEmailExits', ['$http',

    function($http) {
        return {
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrl) {
                elem.on('blur', function() {
                    scope.$apply(function() {
                        var checkemail = $http.post('/checkifemailexits', {
                            email: elem.val()
                        });
                        checkemail.success(function(res) {
                            ctrl.$setValidity('checkifemailexits', res.email);
                        })

                    });
                });
            }
        }
    }
]).directive('copyToModel', function($parse) {
    return function(scope, element, attrs) {
        $parse(attrs.ngModel).assign(scope, attrs.value);
    }
}).

/*=========================================
=            go Back Directive            =
=========================================*/

directive('goBack', ['$window',
    function($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function() {
                    $window.history.back();
                });
            }
        };
    }
]).


/*===================================
=            Pagintation Directive  =
===================================*/


directive('pagination', ['Guides',

    function(Guides) {
        return {
            restrict: 'A',
            templateUrl: 'partials/pagination.html',
            link: function(scope) {


                scope.currentPage = 1;
                scope.pagesNumber = [];

                Guides.getAllGuides(scope.currentPage).success(function(data) {
                    scope.totalPages = data.last_page;
                    scope.currentPage = data.current_page;
                    scope.guides = data.data;
                    for (var i = 1; i <= scope.totalPages; i++) {
                        scope.pagesNumber.push(i);
                    }

                });


                scope.setPage = function(page) {
                    Guides.getAllGuides(page).success(function(data) {
                        scope.currentPage = data.current_page;
                        scope.guides = data.data;
                    });
                }

                scope.isCurrentPage = function(page) {
                    return scope.currentPage == page;
                }


                scope.pageBack = function() {
                    page = scope.currentPage - 1;
                    if (page >= 1) {
                        scope.setPage(page);
                    }

                }
                scope.pageForward = function() {
                    page = scope.currentPage + 1;
                    if (page <= scope.totalPages) {
                        scope.setPage(page);
                    }
                }



            }
        }
    }
]);