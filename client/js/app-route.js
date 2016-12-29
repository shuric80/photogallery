(function() {
    'use strict';
    angular
        .module('app.route',['ui.router'])
        .config(config);
    
    function config ($stateProvider, $urlRouterProvider, $interpolateProvider){
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        $stateProvider
            .state('main',{
                url:'/',
                views:{
                    'main':{
                        templateUrl:'static/templates/main.html',
                        controller:'IndexViewController',
                        controllerAs:'vm'
                    }}
            })
            .state('event', {
                url:'/event/:id',
                views:{
                    'main': {
                        templateUrl:'static/templates/event.html',
                        controller: 'EventViewController',
                        controllerAs: 'vm'
                    }}
            })
            .state('event.register', {
                url: '/register',
                views: {
                    'modal': {
                        templateUrl:'static/templates/register.html',
                        controller:'RegisterController',
                        controllerAs:'vm'
                    }
                }
            });
             $urlRouterProvider.otherwise('/');

    }
})();
