"use strict";

angular
  .module('app')
  .directive('loadSrc', [
    function() {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          function updateImage(url) {
            var $img = angular.element('<img>');
            $img.attr('src', url);
            $img.on('load', function() {
              element.attr('src', url);
            });
          }

          scope.$watch(function() {
            return attrs.loadSrc;
          }, function(src) {
            if (src) {
              updateImage(src);
            }
          });
        }
      };
    }
  ]);