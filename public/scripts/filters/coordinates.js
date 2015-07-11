"use strict";

angular
  .module('app')
  /**
   * Filter to get mouse and touch coordinates from $event
   */
  .filter('coordinates', [
    function() {
      //! coordinates filter functionality borrowed from ng-touch: https://github.com/angular/angular.js/blob/master/src/ngTouch/swipe.js getCoordinates()
      return function($event) {
        var originalEvent = $event.originalEvent || $event;
        var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
        var e = (originalEvent.changedTouches && originalEvent.changedTouches[0]) || touches[0];

        return {
          x: e.clientX,
          y: e.clientY
        };
      };
    }
  ]);

