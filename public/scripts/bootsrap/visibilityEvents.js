"use strict";

angular
  .module('app')
  .run([
    '$document',
    '$rootScope',
    function($document, $rootScope) {
      function visibilitychanged() {
        var d = $document[0],
            isHidden = d.hidden || d.webkitHidden || d.mozHidden || d.msHidden;
        $rootScope.$emit('visibility:changed', isHidden);
      }

      $document.on('visibilitychange',visibilitychanged);
      $document.on('webkitvisibilitychange', visibilitychanged);
      $document.on('msvisibilitychange', visibilitychanged);
    }
  ]);