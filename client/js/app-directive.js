(function(){
    'use strict';

    angular.module('app.directive',[])
        .directive('post', post);

    function post(){
        return {
            scope:{
                post:'@',
            },
            restrict:'E',
            templateUrl: 'static/templates/post.html',
            link: function(scope,element, attrs){
                element.on('click',function(){
                    console.log('click');
                  });
            }
        };
    }
})();
