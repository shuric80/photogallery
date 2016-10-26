(function() {
    'use strict';
    angular
        .module('app.detail.controller',[])
        .controller('DetailViewController', DetailViewController);

    DetailViewController.$inject =['$stateParams','factoryEvent'];

    function DetailViewController($stateParams, factoryEvent){
        var vm = this;
        
        var id = $stateParams.id;

        function activate(){
            factoryEvent.getDetailPage(id)
                .then(function(data){
                    vm.data = data;
                }, function(err){
                    vm.err= err;
                });
        }
        activate();
    }
})();


(function() {
    'use strict';
    angular
        .module('app.list.controller',[])
        .controller('ListViewController',ListViewController);

    ListViewController.$inject = ['factoryEvent'];

    function ListViewController(factoryEvent){
        function activate(){
            factoryEvent.getListPage()
                .then(function(data){
                    vm.data = data;
                }, function(err){
                    vm.err= err;
                });
        }
        activate();
    }
})();


(function() {
    'use strict';
    angular
        .module('app.index.controller',[])
        .controller('IndexViewController', IndexViewController);
    
    IndexViewController.$inject = ['factoryEvent'];

    function IndexViewController(factoryEvent){
        var vm = this;
<<<<<<< HEAD
        var events = Event.query(function(){
            console.log(events);
});
        
        vm.posts = ["ping","pong"];
=======

        function activate(){
            factoryEvent.getIndexPage()
                .then(function(data){
                    vm.data = data;
                    
                }, function(err){
                    vm.err = err;
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

    AboutController.$inject =['factoryEvent'];

    function AboutController(factoryEvent){
        var vm =this;

        function activate(){
            factoryEvent.getAboutPage()
                .then(function(data){
                    vm.data = data;
                }, function(err){
                    vm.err = err;
                });
        }
        activate();
>>>>>>> f12637452271e1e30e17fce80fcefd2a078c302c
    }
})();
