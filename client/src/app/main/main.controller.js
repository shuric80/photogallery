(function() {
    'use strict';

    angular
        .module('client')
        .controller('ContentController', ContentController);

    /** @ngInject */
    function ContentController() {
        var vm = this;

        //vm.awesomeThings = [];
        //vm.classAnimation = '';
        //vm.creationDate = 1476367748828;
        //vm.showToastr = showToastr;

        activate();

        function activate() {
            //getWebDevTec();
            // $timeout(function() {
            //  vm.classAnimation = 'rubberBand';
            // }, 4000);
        }
    }
}
)();
