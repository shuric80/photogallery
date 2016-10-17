( function(){
    'use strict';

    angular
        .module('app.factory',['ngResource'])
        .factory('Event', Event);

    Event.$inject = ['$resource'];

    function Event($resource){

        function get(id){
            return $resource('/api/event/:id');
        }

        function all(){
            return $resource('/api/event.all/');
        }
        
        return {
            all:all,
            get:get
        };
    }
})();
