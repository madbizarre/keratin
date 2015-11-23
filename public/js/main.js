;(function (){
    angular.module('keratin', ['ngRoute', 'ngResource'])

        .config([
            '$routeProvider', '$locationProvider',
            function ($routeProvide, $locationProvider){
                $routeProvide
                    .when('/', {
                        templateUrl: 'template/home.html',
                        controller: ''
                    })
                    .when('/delivery', {
                        templateUrl: 'template/delivery.html',
                        controller: ''
                    })
                    .when('/product/:productId', {
                        templateUrl: 'template/detail.html',
                        controller: 'ProductDetailController'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ])

        .controller('ProductListController', ['$scope', '$http', function ($scope, $http){
            $http.get('/products.json').success(function (data){
                $scope.products = data;
            }).error(function (data){

            });

        }])

        .controller('ProductDetailController', [
            '$scope', '$http', '$routeParams',
            function ($scope, $http, $routeParams){
                $scope.productId = $routeParams.productId;
                $scope.error = null;
                if (isNaN($scope.productId) || (+$scope.productId < 0)) {
                    $scope.error = true;
                } else {
                    $http.get('/products.json').success(function (data){
                        if (+$scope.productId >= data.length) {
                            $scope.error = true;
                        } else {
                            $scope.product = data[$scope.productId];
                        }
                        console.log($scope.product.length, $scope.error);
                    }).error(function (data){

                    });
                }
            }
        ]);

    var Menu = (function (){
        var burger = document.querySelector('.burger');
        var menu = document.querySelector('.menu');
        var menuList = document.querySelector('.menu__list');
        var brand = document.querySelector('.menu__brand');
        var menuItems = document.querySelectorAll('.menu__item');

        var active = false;

        var toggleMenu = function (){
            if (!active) {
                menu.classList.add('menu--active');
                menuList.classList.add('menu__list--active');
                brand.classList.add('menu__brand--active');
                burger.classList.add('burger--close');
                for (var i = 0, ii = menuItems.length; i < ii; i++) {
                    menuItems[i].classList.add('menu__item--active');
                }

                active = true;
            } else {
                menu.classList.remove('menu--active');
                menuList.classList.remove('menu__list--active');
                brand.classList.remove('menu__brand--active');
                burger.classList.remove('burger--close');
                for (var i = 0, ii = menuItems.length; i < ii; i++) {
                    menuItems[i].classList.remove('menu__item--active');
                }

                active = false;
            }
        };

        var bindActions = function (){
            burger.addEventListener('click', toggleMenu, false);
        };

        var init = function (){
            bindActions();
        };

        return {
            init: init
        };

    }());

    Menu.init();


})();