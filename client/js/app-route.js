(function() {
    'use strict';
    angular
        .module('app.route',['ui.router'])
        .config(config);
    
    function config ($stateProvider, $urlRouterProvider, $interpolateProvider){
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');

        //$urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main',{
                url:'/main',
                views:{
                    '':{
                    templateUrl:'static/templates/main.html',
                    controller:'IndexController',
                    controllerAs:'vm'
                }}
            })
            .state('event', {
                url:'/event/{id}',
                views:{
                    '':{
                        templateUrl:'static/templates/content.html',
                        controller:'EventController',
                        controllerAs: 'vm'
                    }}
            });
    }
})();
