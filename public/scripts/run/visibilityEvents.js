"use strict";

angular
  .module('app')
  .run([
    '$document',
    '$rootScope',
    function($document, $rootScope) {
      var last;

      function visibilitychanged() {
        var d = $document[0],
            isHidden = d.hidden || d.webkitHidden || d.mozHidden || d.msHidden;
        if (isHidden !== last) {
          $rootScope.$emit('visibility:change', isHidden);
          last = isHidden;
        }
      }

      $document.on('visibilitychange',visibilitychanged);
      $document.on('webkitvisibilitychange', visibilitychanged);
      $document.on('msvisibilitychange', visibilitychanged);
    }
  ]);