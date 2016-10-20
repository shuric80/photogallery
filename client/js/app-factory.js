( function(){
    'use strict';

    angular
        .module('app.factory',['ngResource'])
        .factory('eventSession', eventSession);

    eventSession.$inject = ['$http'];

    function eventSession($http){

        var factory = {};
        factory.getMainPage = getMainPage;
        factory.getAbout = getAbout;
        factory.getEvents = getEvents;
        factory.getEvent = getEvent;
        factory.register = register;

        return factory;

        function getIndexPage(){
            return $http.get('/api/index').then(handleSuccess, handleError('Error index page'));    
        }
        function getAboutPage(){
            return $http.get('/api/about').then(handleSuccess, handleError('Error about page'));    
        }
        function getEventsPage(){
            return $http.get('/api/events').then(handleSuccess, handleError('Error events page'));    
        }
        function getEvent(){
            return $http.get('/api/event').then(handleSuccess, handleError('Error event page'));    
        }
        function register(){
            return $http.post('/api/register').then(handleSuccess, handleError('Error register'));
        }
        
        // private functions
        
        function handleSuccess(res) {
            return res.data;
        }
        
        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();
