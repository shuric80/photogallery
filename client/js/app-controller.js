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
                
            });}

        activate();
    }
})();


(function() {
    'use strict';
    angular
        .module('app.index.controller',[])
        .controller('IndexController', IndexController);

    
    IndexController.$inject = ['Event'];

    function IndexController(Event){
        var vm = this;

        function activate(){
            var events = Event.query(function(){
                //console.log(events);
                vm.posts = events;
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
            $http({
                method:'GET',
                url:'/api/about',
            }).then(function successCallback(response){
                vm.text = response.data;
            }, function errorCallback(response){
                vm.text = "error";
}
                   );
        }

        activate();
    }
})();
