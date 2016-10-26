( function(){
    'use strict';

    angular
        .module('app.factory',[])
        .factory('factoryEvent', factoryEvent);

    factoryEvent.$inject = ['$http'];

    function factoryEvent($http){

<<<<<<< HEAD
        return $resource('/api/events/:id');
=======
        var factory = {};
        factory.getIndexPage = getIndexPage;
        factory.getAboutPage = getAboutPage;
        factory.getListPage = getListPage;
        factory.getDetailPage = getDetailPage;
        factory.register = register;

        return factory;

        function getIndexPage(){
            return $http.get('/api/index').then(handleSuccess, handleError('Error index page'));    
        }
        function getAboutPage(){
            return $http.get('/api/about').then(handleSuccess, handleError('Error about page'));    
        }
        function getListPage(){
            return $http.get('/api/events').then(handleSuccess, handleError('Error events page'));    
        }
        function getDetailPage(id){
            return $http.get('/api/event/'+id).then(handleSuccess, handleError('Error event page'));    
        }

        function getNewsPage(){
            return $http.get('/api/news').then(handleSuccess, handleError());
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
>>>>>>> f12637452271e1e30e17fce80fcefd2a078c302c
    }
})();
