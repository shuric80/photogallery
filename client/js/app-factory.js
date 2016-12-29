( function(){
    'use strict';

    angular
        .module('app.factory',[])
        .factory('factoryEvent', factoryEvent);

    factoryEvent.$inject = ['$http'];

    function factoryEvent($http){

        var factory = {};
        factory.getIndexPage = getIndexPage;
        factory.getDetailPage = getDetailPage;
        factory.register = register;

        return factory;

        function getIndexPage(){
            return $http.get('/api/index').then(handleSuccess, handleError('Error index page'));    
        }
        function getDetailPage(id){
            return $http.get('/api/event/'+id).then(handleSuccess, handleError('Error event page'));    
        }

        function register(id, user){
            return $http.post('/api/registration', {event_id:id,user:user}).then(handleSuccess, handleError('Error register'));
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
