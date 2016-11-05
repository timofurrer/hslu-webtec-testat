/*
 * Configuration for site app
 */

(function(app) {
    app.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'assets/js/apps/site/templates/home.html',
            })
            .when('/canvas', {
                templateUrl: 'assets/js/apps/site/templates/canvas.html',
            })
            .when('/form', {
                templateUrl: 'assets/js/apps/site/templates/form.html',
            })
            .when('/images', {
                templateUrl: 'assets/js/apps/site/templates/images.html',
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})(angular.module('siteApp'));
