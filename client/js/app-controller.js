(function() {
    'use strict';
    angular
        .module('app.controller',[])
        .controller('EventController', EventController);

    EventController.$inject =['$stateParams','Event'];

    function EventController($http, $stateParams, Event){
        var pid = $stateParams.id;
        var vm = this;
        var event =  Event.get({id:pid}, function(){
            vm.title = event.title;
            vm.text = event.text;
            vm.hide_registration = event.hide_registration;});
    }
})();


(function() {
    'use strict';
    angular
        .module('app.controller',[])
        .controller('IndexController', IndexController);

    
    IndexController.$inject = ['Event'];

    function IndexController(Event){
        console.log('index');
        var vm = this;
        var events = Event.query(function(){
            console.log(events);
});
        
        vm.posts = ["ping","pong"];
    }
})();
