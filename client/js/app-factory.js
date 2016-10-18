( function(){
    'use strict';

    angular
        .module('app.factory',['ngResource'])
        .factory('Event', Event);

    Event.$inject = ['$resource'];

    function Event($resource){
            return $resource('/api/event/');
        }
})();
