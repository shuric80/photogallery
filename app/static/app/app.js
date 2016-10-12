(function(){

    'use strict';

    var app= angular
        .module("app",[])
        .controller("IndexController", IndexController)
        
    console.log('loaded');

    function IndexController(){
        console.log('index');
    };
})();


