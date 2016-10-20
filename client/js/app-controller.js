(function() {
    'use strict';
    angular
        .module('app.event.controller',[])
        .controller('EventController', EventController);

    EventController.$inject =['$stateParams','Event'];

    function EventController($stateParams, Event){
        var vm = this;
        
        var id = $stateParams.id;

        function activate(){
            var event =  Event.get({id:id}, function(){
                vm.title = event.title;
                vm.text = event.text;
            });
        }

        activate();
    }
})();


(function() {
    'use strict';
    angular
        .module('app.main.controller',[])
        .controller('MainController', MainController);
    
    MainController.$inject = ['$http'];

    function MainController($http){
        var vm = this;

        function activate(){
            $http.get('/api/main')
                .success(function(data, status,headers,config){
                    vm = JSON.parse(data);
                })
                .error(function(data,status,headers,config){
                    console.log('error'); 
                });
             }
        activate();
        
    }
})();


(function(){
    'use strict';
    angular
        .module('app.about.controller',[])
        .controller('AboutController',AboutController);

    AboutController.$inject =['$http'];

    function AboutController($http){
        var vm =this;

                function activate(){
            $http.get('/api/about')
                .success(function(data, status,headers,config){
                    vm = JSON.parse(data);
                })
                .error(function(data,status,headers,config){
                    console.log('error'); 
                });
             }
        activate();
    }
})();
