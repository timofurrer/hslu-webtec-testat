(function(module) {

    var WeirdImage = function($log) {
        var self = this;

        self.name = 'HodorCanvas_weird';

        self.load_weird = function(img) {
            var dataURL = localStorage.getItem(self.name);
            if(dataURL === null || img === undefined) {
                $log.info('No weird image found to load');
                return;
            }

            $log.info('Loading weird image from the world wide web');
            img.src = dataURL;
        };

        return {
            restrict: 'A',
            link: function(scope, element) {
                self.load_weird(element[0]);
            }
        }
    };

    module.directive('weird', WeirdImage);
}(angular.module('siteApp')));
