angular
  .module('app')
  .factory('throttle', [
    '$timeout',
    function ($timeout) {
      function throttle(callback, interval, immediate, context) {
        var timer, last;

        if (angular.isObject(immediate)) {
          context = immediate;
          immediate = false;
        }

        interval = interval || 250;
        context = context || this;

        return function() {
          var now = +new Date(),
              elapsed = now - (last || 0),
              args = Array.prototype.splice.call(arguments, 0);

          if (timer) {
            return;
          } else if (immediate || elapsed > interval) {
            last = now;
            callback.apply(context, args);
          } else {
            timer = $timeout(function() {
              timer = null;
              last = +new Date();
              callback.apply(context, args);
            }, interval - elapsed);
          }
        };
      }
      return throttle;
    }
  ]);
