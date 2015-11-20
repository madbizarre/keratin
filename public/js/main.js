;(function (){
    angular.module('keratin', ['ngRoute', 'ngResource'])

        .config([
            '$routeProvider', '$locationProvider',
            function($routeProvide, $locationProvider){
                $routeProvide
                    .when('/',{
                        templateUrl:'template/home.html',
                        controller: ''
                    })
                    .when('/product/:productId', {
                        templateUrl:'template/detail.html',
                        controller:'ProductDetailController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ])

        .controller('ProductListController',[ '$scope', '$http', function ($scope, $http){
            $http.get('/products.json').success(function(data){
                $scope.products = data;
            }).error(function(data){

            });

        }])

        .controller('ProductDetailController',[
            '$scope','$http', '$routeParams',
            function($scope, $http, $routeParams) {
                $scope.productId = $routeParams.productId;

                $http.get('/products.json').success(function(data){
                    $scope.product = data[$scope.productId];
                }).error(function(data){

                });
            }
        ])

    ;
})();