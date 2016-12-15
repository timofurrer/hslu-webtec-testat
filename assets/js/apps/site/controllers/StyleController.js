(function(module) {
    var StyleController = function($log, $cookies) {
        var self = this;

        self.styles = [
            'assets/css/template.css',
            'assets/css/template_ugly.css',
        ]

        self.currentStyle = $cookies.get('style') || 0;

        self.choose = function(style) {
            $log.info('Switch to style ' + style);
            self.currentStyle = style;
            $cookies.put('style', self.currentStyle);
        };
    };

    module.controller('StyleController', StyleController);
}(angular.module('siteApp')));
