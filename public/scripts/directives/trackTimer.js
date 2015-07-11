angular
  .module('app')
  .directive('trackTimer', [
    '$interval',
    function($interval) {
      return {
        scope: {
          status: '=trackTimer'
        },
        templateUrl: 'scripts/directives/trackTimer.html',
        link: function(scope) {
          function setTime() {
            if (!scope.status) {
              scope.position = 0;
              scope.duration = 0;
            } else {
              scope.position = scope.status.getTime();
              scope.duration = scope.status.duration;
            }
          }
          var fps = 1000 / 12;
          var timer = $interval(setTime, fps);

          scope.$watch('status', setTime());
          scope.$on('$destroy', function() {
            $interval.cancel(timer);
          });
        }
      };
    }
  ]);
