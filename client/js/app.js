(function () {
	'use strict';
	angular.module('myApp', [
        'ui.bootstrap',
        'ngSanitize',
        'markdown',
        //        'ngResource',
   	'app.event.controller',
	    'app.index.controller',
        'app.register.controller',
        'app.route',
        'app.factory',
        'app.directive',
        
	]);

	angular.module('myApp').run(run);

	run.$inject = ['$http'];
	/**
	 * @name run
	 * @desc Update xsrf $http headers to align with Django's defaults
	 */
	function run($http) {
        
		$http.defaults.xsrfHeaderName = 'X-CSRFToken';
		$http.defaults.xsrfCookieName = 'csrftoken';
	}
})();
