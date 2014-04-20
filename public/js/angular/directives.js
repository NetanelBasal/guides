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

/*===================================
=            Pagintation Directive  =
===================================*/

directive('pagination', [

    function() {
        return {
            restrict: 'A',
            templateUrl: 'partials/pagination.html'
        };
    }
]).

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
])