(function(module) {

    var Scratchboard = function($log, $compile) {
        var self = this;

        self.name = 'HodorCanvas';

        self.canvas = null;
        self.context = null;
        self.isDrawing = false;

        self.previousCoordinates = {};

        self.draw = function(from, to) {
            self.context.moveTo(from.x, from.y);
            self.context.lineTo(to.x, to.y);
            self.context.strokeStyle = '#333333';
            self.context.stroke();
        }

        self.getCoordinates = function(evt) {
            coordinates = {};

            if(evt.offsetX === undefined || evt.offsetY === undefined) {
                coordinates['x'] = evt.layerX - evt.currentTarget.offsetLeft;
                coordinates['y'] = evt.layerY - evt.currentTarget.offsetTop;
            }
            else {
                coordinates['x'] = evt.offsetX;
                coordinates['y'] = evt.offsetY;
            }

            return coordinates;
        }

        self.mousedownEventHandler = function(evt) {
            self.previousCoordinates = self.getCoordinates(evt);

            self.context.beginPath();
            self.isDrawing = true;
        };

        self.mousemoveEventHandler = function(evt) {
            if(!self.isDrawing) {
                return;
            }

            currentCoordinates = self.getCoordinates(evt);
            self.draw(self.previousCoordinates, currentCoordinates);

            self.previousCoordinates = currentCoordinates;
        };

        self.mouseupEventHandler = function(evt) {
            self.isDrawing = false;
        };

        self.store = function() {
            $log.info('Store canvas to localstorage');
            localStorage.setItem(self.name, self.canvas.toDataURL());
        };

        self.load = function() {
            var dataURL = localStorage.getItem(self.name);
            if(dataURL === null) {
                return;
            }

            var img = new Image;
            img.src = dataURL;
            img.onload = function() {
                self.context.drawImage(img, 0, 0);
            };
        };

        self.clear = function() {
            self.context.clearRect(0, 0, 800, 500);
        };

        return {
            restrict: 'A',
            link: function(scope, element) {
                self.canvas = element[0];
                self.context = element[0].getContext('2d');

                $log.info('Load canvas from local storage if available');
                self.load();

                element.bind('mousedown', self.mousedownEventHandler);
                element.bind('mousemove', self.mousemoveEventHandler);
                element.bind('mouseup', self.mouseupEventHandler);

                var storeButton = $compile('<button type="button" class="btn btn-primary btn-lg">Store</button>')(scope);
                storeButton.bind('click', self.store);
                element.parent().append(storeButton);

                var clearButton = $compile('<button type="button" class="btn btn-warning btn-lg button-margin">Clear</button>')(scope);
                clearButton.bind('click', self.clear);
                element.parent().append(clearButton);
            }
        }
    };

    module.directive('scratchboard', Scratchboard);
}(angular.module('siteApp')));
