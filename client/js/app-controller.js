(function() {
    'use strict';
    angular
        .module('app.event.controller',[])
        .controller('DetailViewController', DetailViewController);

    DetailViewController.$inject =['$stateParams','factoryEvent'];

    
    function DetailViewController($stateParams, factoryEvent){
        var vm = this;
        var id = $stateParams.id;
        vm.id = id;

        function activate(){
            factoryEvent.getDetailPage(id)
                .then(function(data){
                    vm.event = data;
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
        .module('app.register.controller',[])
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$stateParams', 'factoryEvent'];

    function RegisterController($stateParams, factoryEvent){
        var vm = this;
        var id = $stateParams.id;
        vm.submit = function (form, user){
         if(form.$valid){
                vm.user = angular.copy(user);
                console.log(id);
                factoryEvent.register(id, vm.user).then(
                    function(res){
                        vm.rg = {};
                        vm.res= res;
                        
                    }, function(error){vm.error = error;});
            }
            console.log(vm.ret);
        };
    }
})();


(function() {
    'use strict';
    angular
        .module('app.index.controller',[])
        .controller('IndexViewController', IndexViewController);
    
    IndexViewController.$inject = ['factoryEvent','$anchorScroll','$location'];

    function IndexViewController(factoryEvent, $anchorScroll, $location){
        var vm = this;
        vm.myInterval = 3000;
        vm.scrollTo = function(x){
            var newHash = x;
            vm.active = x;
            if ($location.hash() !== newHash) {
                $location.hash(x);
            } else {
                
                $anchorScroll();
            }
        };
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
