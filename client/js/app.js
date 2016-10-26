(function () {
	'use strict';
	angular.module('myApp', [
        'ngSanitize',
        'markdown',
        //        'ngResource',
   	'app.detail.controller',
	    'app.index.controller',
        'app.about.controller',
        'app.list.controller',
        'app.news.controller',
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
