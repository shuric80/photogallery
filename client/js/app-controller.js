(function() {
    'use strict';
    IndexController.$inject =['$scope'];

    function IndexController($scope){
        $scope.test = 'test';
    }
    
    angular.module('app.controller',[])
        .controller('IndexController',IndexController);

})()
