(function() {
    'use strict';
    angular
        .module('app.route',['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('test', {
                    url:'/test',
                    views:{
                        '':{
                            templateUrl:'static/js/test.html',
                            controller:'IndexController'
                        }
                    }
                }
                      )
        })
})()
