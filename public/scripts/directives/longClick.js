"use strict";

angular
  .module('app')
  .directive('longClick', [
    '$timeout',
    '$parse',
    function($timeout, $parse) {
      return {
        link: function(scope, $element, $attrs) {
          var WAIT_INTERVAL = 500,
              MAX_MOVE_DELTA = 10,
              longClickExp = $parse($attrs.longClick),
              startPoint,
              timer;

          // Borrowed from ng-touch: https://github.com/angular/angular.js/blob/master/src/ngTouch/swipe.js getCoordinates()
          function getPoint($event) {
            var originalEvent = $event.originalEvent || $event;
            var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
            var e = (originalEvent.changedTouches && originalEvent.changedTouches[0]) || touches[0];

            return {
              x: e.clientX,
              y: e.clientY
            };
          }

          function start($event) {
            if (timer) {
              return eventBlackhole($event);
            }
            startPoint = getPoint($event);
            timer = $timeout(function() {
              longClickExp(scope);
              timer = false;
            }, WAIT_INTERVAL);
            return eventBlackhole($event);
          }

          function cancel($event) {
            $timeout.cancel(timer);
            timer = false;
            return eventBlackhole($event);
          }

          /**
           * Calculates distance from start and cancel on maximum distance
           *
           * @param {event} $event
           */
          function move($event){
            if (!timer) {
              return eventBlackhole($event);
            }

            var point = getPoint($event),
                deltaX = startPoint.x - point.x,
                deltaY = startPoint.y - point.y,
                delta = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (delta > MAX_MOVE_DELTA) {
              return cancel($event);
            }
            return eventBlackhole($event);
          }

          // http://stackoverflow.com/questions/3413683/disabling-the-context-menu-on-long-taps-on-android
          function eventBlackhole($event) {
            if (!$event) {
              return false;
            }
            $event.preventDefault && $event.preventDefault();
            $event.stopPropagation && $event.stopPropagation();
            $event.cancelBubble = true;
            $event.returnValue = false;
            return false;
          }

          $element.on('mousedown', start);
          $element.on('mousemove', move);
          $element.on('mouseleave', cancel);
          $element.on('mouseup', cancel);

          $element.on('touchstart', start);
          $element.on('touchmove', move);
          $element.on('touchend', cancel);
        }
      };
    }
  ]);