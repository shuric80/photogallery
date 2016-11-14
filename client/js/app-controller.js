(function() {
    'use strict';
    angular
        .module('app.detail.controller',[])
        .controller('DetailViewController', DetailViewController);

    DetailViewController.$inject =['$stateParams','factoryEvent'];

    function DetailViewController($stateParams, factoryEvent){
        var vm = this;
        
        var id = $stateParams.id;

        vm.user ={};
        vm.submit = function (user){
            vm.user = angular.copy(user);
            factoryEvent.addUser(user);
        };
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
        var vm = this;
        
        function activate(){
            factoryEvent.getListPage()
                .then(function(data){
                    vm.data = data;
                    console.log(vm.data);
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
        .controller('AboutViewController',AboutViewController);

    AboutViewController.$inject =['factoryEvent'];

    function AboutViewController(factoryEvent){
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

    }
})();


(function(){
    'use strict';

    angular
        .module('app.news.controller',[])
        .controller('NewsViewController', NewsViewController);

    NewsViewController.$inject = ['factoryEvent'];
    function NewsViewController(factoryEvent){
        var vm = this;
        vm.data = "test";
        console.log("news");
        function activate(){
            factoryEvent.getNewsPage()
                .then(function(data){
                    vm.data = data;
                }, function(err){
                    vm.err = err;
                });
            
        }
        //activate();
    }
})();
