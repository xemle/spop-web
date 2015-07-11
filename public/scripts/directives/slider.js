angular
  .module('app')
  .directive('slider', [
    function() {
      return {
        scope: {
          max: '=sliderMax',
          position: '=sliderPosition'
        },
        templateUrl: 'scripts/directives/slider.html',
        link: function(scope) {
          scope.$watch('position', function(newPosition) {
            scope.percent = 100 * (newPosition / scope.max);
          })
        }
      };
    }
  ]);
