angular
  .module('app')
  .directive('trackTimer', [
    '$interval',
    '$q',
    function($interval, $q) {
      return {
        scope: {
          status: '=trackTimer',
          onSeek: '&'
        },
        templateUrl: 'scripts/directives/trackTimer.html',
        link: function(scope) {
          var fps = 12,
              timer;

          function setTime() {
            if (!scope.status) {
              scope.position = 0;
              scope.duration = 0;
            } else {
              scope.position = scope.status.getTime();
              scope.duration = scope.status.duration;
            }
          }

          function setTimer() {
            timer = $interval(setTime, 1000 / fps);
          }

          scope.onSlide = function(percent) {
            $interval.cancel(timer);
            scope.position = scope.duration * percent / 100;
          };

          scope.onSlideEnd = function(percent) {
            scope.position = scope.duration * percent / 100;
            $q.resolve(scope.onSeek({position: scope.position})).then(function() {
              if (scope.status && scope.status.isPlaying()) {
                setTimer();
              }
            });
          };

          // Update time on position changes
          scope.$watch(function() {
            return scope.status && scope.status.position;
          }, setTime());
          // Update time on duration changes
          scope.$watch(function() {
            return scope.status && scope.status.duration;
          }, setTime());

          // Enable or disable timer on playing status
          scope.$watch(function() {
            return scope.status && scope.status.isPlaying();
          }, function (newValue) {
            if (newValue) {
              setTimer();
            } else {
              $interval.cancel(timer);
            }
          });
          scope.$on('$destroy', function() {
            $interval.cancel(timer);
          });
        }
      };
    }
  ]);
