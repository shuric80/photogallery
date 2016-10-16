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
    }
})()
