"use strict";

angular
  .module('app')
  .config([
    '$provide',
    function($provide) {
      $provide.decorator('$http', function($delegate) {
        var oldGet = $delegate['get'];
        $delegate['get'] = function() {
          var args = Array.prototype.slice.apply(arguments);
          var start = +new Date();
          return oldGet.apply($delegate, args).then(function(result) {
            var diff = +new Date() - start;
            if (args[0].match(/^\/spop/)) {
              console.log(args[0] + ' took ' + diff + 'ms');
            }
            return result;
          });
        };
        return $delegate;
      });
    }
  ]);