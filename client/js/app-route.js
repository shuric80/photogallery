(function() {
    'use strict';
    angular
        .module('app.route',['ui.router'])
        .config(config);
    
    function config ($stateProvider, $urlRouterProvider, $interpolateProvider){
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main',{
                url:'/',
                views:{
                    '':{
                        templateUrl:'static/templates/main.html',
                        controller:'IndexViewController',
                        controllerAs:'vm'
                    }}
            })
            .state('detailView', {
                url:'/event/:id',
                views:{
                    '':{
                        templateUrl:'static/templates/event.html',
                        controller: 'DetailViewController',
                        controllerAs: 'vm'
                    }}
            })
            .state('register', {
                url:'/register/:id',
                views:{
                    '':{
                        templateUrl:'static/templates/register.html',
                        controller:'RegisterController',
                        controllerAs:'vm'
                    }
                }
            });
    }
})();
