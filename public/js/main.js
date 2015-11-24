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

    $(document).ready(function (){
        var $btnSubmit = $('button[type=submit]'),
            $contact = $('#contact'),
            $contactTitle = $('.contact-title'),
            $contactModal = $('#contactModal'),
            alert = $('.alert-danger');
        var closeAlert = function (){
                var alert = $('.alert-danger');
                if (alert.length) {
                    alert.alert('close');
                }
            },
            ajaxSuccess = function (data){
                $btnSubmit.button('reset');
                yaCounter33794384.reachGoal("sendData");
                closeAlert();
                $contactTitle.html('Спасибо, заявка отправлена');
                $contact.before('<div class="alert alert-success" role="alert"><strong>Мы свяжемся с Вами в ближайшее время.</strong></div>');
                $contact.css('display', 'none');
            },
            ajaxError = function (err){
                $btnSubmit.button('reset');
                if (alert.length) {
                    alert.alert('close');
                }
                $btnSubmit.button('reset');
                $contact.before('<div class="alert alert-danger" role="alert"><strong>Произошла ошибка! Пожалуйста, повторите попытку.</strong></div>');
            };

        $contact.on('submit', function (e){
            $btnSubmit.button('loading');
            e.preventDefault();
            closeAlert();
            if (document.all && !window.atob) {
                if ($('#inputTel').val().length == 0) {
                    $contact.before('<div class="alert alert-danger" role="alert"><strong>Поле телефон обязательно для заполнения!</strong></div>');
                    $btnSubmit.button('reset');
                    return;
                }
            }
            $.ajax({
                url: '/mail',
                method: 'post',
                data: {
                    name: $('#inputName').val(),
                    email: $('#inputEmail').val(),
                    tel: $('#inputTel').val(),
                    comment: $('#inputComment').val()
                },
                success: ajaxSuccess,
                error: ajaxError
            });
        });
        if (document.all && !window.atob) {
            $('label[for="inputComment"]').html('Комментарий:');
            $('label[for="inputName"]').html('Имя:');
            $('label[for="inputEmail"]').html('Email:');
            $('label[for="inputTel"]').html('Телефон*:');
        }
    });
})();