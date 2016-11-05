(function(module) {
    var NavigationController = function($location) {
        var self = this;

        self.isActive = function(route) {
            var currentRoute = $location.path();
            if(route === '/' && route !== currentRoute) {
                return false;
            }
            return currentRoute.substr(0, route.length) === route
        };
    };

    module.controller('NavigationController', NavigationController);
}(angular.module('siteApp')));
