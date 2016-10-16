(function() {
    'use strict';
    angular.module('app.controller',[])
        .controller('EventController', EventController);

    EventController.$inject =['$http','$stateParams','Event'];

    function EventController($http, $stateParams, Event){
        var pid = $stateParams.id;
        var vm = this;
        var event =  Event.get({id:pid}, function(){
            console.log(event);
        });
    }
})()
