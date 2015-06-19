"use strict";

angular
  .module('app')
  .directive('longClick', [
    function() {
      return {
        scope: {
          longClick: '&'
        },
        link: function(scope, $element) {
          var INTERVAL = 500,
              pressed;

          function down() {
            pressed = +new Date();
          }

          function up() {
            var now = +new Date(),
                elapsed = now - pressed;
            if (elapsed > INTERVAL) {
              scope.longClick();
            }
          }

          $element.on('mousedown', down);
          $element.on('mouseup', up);
          $element.on('touchstart', down);
          $element.on('touchend', up);
        }
      };
    }
  ]);