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
          var MODE_POSITION = 0,
              MODE_REMAINING = 1,
              MODE_MAX = 2,
              mode = MODE_POSITION,
              fps = 12,
              timer;

          function setTime() {
            if (!scope.status) {
              scope.position = 0;
              scope.duration = 0;
              scope.remaining = 0;
            } else {
              scope.position = scope.status.getTime();
              scope.duration = scope.status.duration;
              scope.remaining = scope.status.getRemainingTime();
            }
          }

          function setTimer() {
            timer = $interval(setTime, 1000 / fps);
          }

          scope.getTime = function() {
            if (mode === MODE_POSITION) {
              return scope.position;
            } else if (mode === MODE_REMAINING) {
              return -1 * scope.remaining;
            } else {
              return 0;
            }
          };

          scope.changeTimeMode = function() {
            mode = (mode + 1) % MODE_MAX;
          };

          scope.onSlide = function(percent) {
            $interval.cancel(timer);
            scope.position = scope.duration * percent / 100;
            scope.remaining = scope.duration - scope.position;
          };

          scope.onSlideEnd = function(percent) {
            scope.position = scope.duration * percent / 100;
            scope.remaining = scope.duration - scope.position;
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
