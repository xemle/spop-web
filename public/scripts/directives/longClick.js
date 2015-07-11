"use strict";

angular
  .module('app')
  .directive('longClick', [
    '$timeout',
    '$parse',
    '$filter',
    function($timeout, $parse, $filter) {
      return {
        link: function(scope, $element, $attrs) {
          var WAIT_INTERVAL = 500,
              MAX_MOVE_DELTA = 10,
              longClickExp = $parse($attrs.longClick),
              startPoint,
              timer;

          function start($event) {
            if (timer) {
              return eventBlackhole($event);
            }
            startPoint = $filter('coordinates')($event);
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

            var point = $filter('coordinates')($event),
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