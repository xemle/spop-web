angular
  .module('app')
  .directive('slider', [
    '$document',
    '$filter',
    function($document, $filter) {
      return {
        scope: {
          max: '=sliderMax',
          position: '=sliderPosition',
          onSlide: '&',
          onSlideEnd: '&'
        },
        templateUrl: 'scripts/directives/slider.html',
        link: function(scope, $element) {
          var handle = angular.element($element.find('div')[4]),
              body = angular.element($document[0].body),
              rect;

          function getRect() {
            rect = $element[0].getBoundingClientRect();
          }

          function getPercent(point) {
            var x = Math.min(Math.max(rect.left, point.x), rect.right);

            return 100 * (x - rect.left) / (rect.right - rect.left);
          }

          function activate() {
            body.on('mousemove touchmove', onMove);
            body.on('mouseup touchend', deactivate);
            // Get every time the rect to cover window resizes, too
            getRect();
          };

          function onMove($event) {
            var point = $filter('coordinates')($event),
                percent = getPercent(point);

            $event.preventDefault();

            scope.$apply(function() {
              scope.percent = percent.toFixed(2);
              scope.onSlide({percent: percent});
            });

            return false;
          };

          function deactivate($event) {
            var point = $filter('coordinates')($event),
                percent = getPercent(point);

            body.off('mousemove touchmove', onMove);
            body.off('mouseup touchend', deactivate);
            $event.preventDefault();

            scope.$apply(function() {
              scope.percent = percent.toFixed(2);
              scope.onSlideEnd({percent: percent});
            });

            return false;
          };

          handle.on('mousedown', activate);
          handle.on('touchstart', activate);

          scope.$watch('position', function(newPosition) {
            scope.percent = (100 * newPosition / scope.max).toFixed(2);
          });
        }
      };
    }
  ]);
