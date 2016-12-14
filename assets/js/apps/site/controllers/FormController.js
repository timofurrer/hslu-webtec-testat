(function(module) {
    var FormController = function($log) {
        var self = this;

        self.submitted = false;
        self.name = '';
        self.email = '';

        self.submit = function(element) {
            $log.info(self.name + ' <' + self.email + '>');
            self.submitted = true;
        }
    };

    module.controller('FormController', FormController);
}(angular.module('siteApp')));
