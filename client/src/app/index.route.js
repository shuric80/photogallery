(function() {
  'use strict';

  angular
    .module('client')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/content',
        templateUrl: 'app/main/main.html',
        controller: 'ContentController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
