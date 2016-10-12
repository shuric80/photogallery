(function(){

    'use strict';

    angular
        .module("app",['ngRoute'])
        .controller("IndexController", IndexController)
        .config(config);
    
    console.log('loaded');

    function IndexController(){
        console.log('index');
    };

    
    config.$inject = ['$routeProvider'];

    function config($routeProvider) {

        $routeProvider.when('/ping', {
            controller: 'IndexController',
            templateUrl: '/templates/test.html'
        }).otherwise('/');
    }

})();

