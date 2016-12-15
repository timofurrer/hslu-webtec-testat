(function(module) {
    var QuoteController = function($http) {
        var self = this;

        self.text = 'Loading ...';

        $http.get('assets/quote.txt').then(function(response) {
            self.text = response.data;
        });
    };

    module.controller('QuoteController', QuoteController);
}(angular.module('siteApp')));
