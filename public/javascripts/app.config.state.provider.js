/**
 * Configure the Routes
 */
App.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};

	//rutas
	// * : todos los roles
	$stateProvider
		.state('chat',{
			url: "/",
			templateUrl: 'javascripts/views/main_content.html',
			controller: 'startController'
		})

			//default route
		$urlRouterProvider.otherwise('/');
	}
]);