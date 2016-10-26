(function() {
    'use strict';
    angular
        .module('app.route',['ui.router'])
        .config(config);
    
    function config ($stateProvider, $urlRouterProvider, $interpolateProvider){
        $interpolateProvider.startSymbol('{[');
        $interpolateProvider.endSymbol(']}');
<<<<<<< HEAD
=======

>>>>>>> f12637452271e1e30e17fce80fcefd2a078c302c
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('main',{
                url:'/',
                views:{
                    '':{
                        templateUrl:'static/templates/main.html',
<<<<<<< HEAD
                        controller:'IndexController',
                        controllerAs:'vm'
                    }}
            })
            .state('event', {
                url:'/event/{id}',
=======
                        controller:'IndexViewController',
                        controllerAs:'vm'
                    }}
            }).state('detailView', {
                url:'/event/:id',
>>>>>>> f12637452271e1e30e17fce80fcefd2a078c302c
                views:{
                    '':{
                        templateUrl:'static/templates/content.html',
                        controller: 'DetailViewController',
                        controllerAs: 'vm'
                    }}
            }).state('about',{
                url:'/about',
                views:{
                    '':{
                        templateUrl:'static/templates/about.html',
                        controller:'AboutViewController',
                        controllerAs:'vm'
                    }}
            }).state('listView',{
                url:'/events',
                views:{
                    '':{
                        templateUrl:'static/templates/events.html',
                        controller:'ListViewController',
                        controllerAs:'vm'
                    }}
            });
    }
})();
