angular
  .module('app')
  .factory('debounce', [
    '$timeout',
    function ($timeout) {
      function debounce(callback, interval, context) {
        interval = interval || 250;
        context = context || this;
        var timer;

        return function() {
          var args = Array.prototype.splice.call(arguments, 0);
          $timeout.cancel(timer);
          timer = $timeout(function() {
            callback.apply(context, args);
          }, interval);
        };
      }
      return debounce;
    }
  ]);