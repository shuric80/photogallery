(function() {
    'use strict';
    angular
        .module('app.event.controller',[])
        .controller('EventController', EventController);

    EventController.$inject =['$stateParams','Event'];

    function EventController($stateParams, Event){
        var vm = this;
        var id = $stateParams.id;
        var event =  Event.get({id:id}, function(){
            vm.title = event.title;
            vm.text = event.text;
            
        });
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
        var events = Event.query(function(){
            //console.log(events);
            vm.posts = events;
        });
        
        
    }
})();
