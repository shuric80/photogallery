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
            .state('news',{
                url:'/news',
                views:{
                    '':{
                        templateUrl:'static/templates/news.html',
                        controller:'NewsViewController',
                        controllerAs:'vm'
                    }
                }
            })
            .state('detailView', {
                url:'/event/:id',
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
