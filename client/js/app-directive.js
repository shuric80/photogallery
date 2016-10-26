(function(){
    'use strict';

    angular.module('app.directive',[])
        .directive('post', post);

    post.$inject = ['$location'];
    function post($location){
        return {
            scope:{
                post:'@',
                odd:'@'
            },
            restrict:'E',
            controller: function($scope){
                $scope.vm = JSON.parse($scope.post);
                $scope.vm.odd = $scope.odd;
                console.log($scope.vm.odd);
                $scope.loadPostExt = function(){
                      $location.path('/event/'+$scope.vm.id);
                };
            },
            templateUrl: 'static/templates/post.html',
            link: function(scope,element, attrs){
                //scope.vm.odd = attrs.odd;
            }
        };
    }
})();
