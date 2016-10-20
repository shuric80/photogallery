(function() {
    'use strict';
    angular
        .module('app.event.controller',[])
        .controller('EventController', EventController);

    EventController.$inject =['$stateParams','eventSession'];

    function EventController($stateParams, eventSession){
        var vm = this;
        
        var id = $stateParams.id;

        function activate(){
            //            var event =  eventSession.get({id:id}, function(){
            //              vm.title = event.title;
            //            vm.text = event.text;
        }
        

        activate();
    }
})();


(function() {
    'use strict';
    angular
        .module('app.index.controller',[])
        .controller('IndexController', IndexController);
    
    IndexController.$inject = ['factoryEvent'];

    function IndexController(factoryEvent){
        var vm = this;

        function activate(){
            var data = factoryEvent.getIndexPage();
            console.log(data);
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

        }
        activate();
    }
})();
