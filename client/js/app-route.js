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
            .state('event', {
                url:'/event/{id}',
                views:{
                    '':{
                        templateUrl:'static/templates/content.html',
                        controller:'EventController',
                        controllerAs: 'vm'
                    }}
            })
    }
})()
