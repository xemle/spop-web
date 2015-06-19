"use strict";

angular
  .module('app')
  .directive('cover', [
    function() {
      return {
        priority: -10000,
        scope: {
          track: '='
        },
        template: '<img ng-src="{{url}}" width="48" height="48" visible="visible = 1" visible-options="{top: -100}" />',
        link: function(scope, element, attrs) {
          scope.$watch('visible', function(newValue) {
            if (newValue) {
              scope.url = '/spop/uimage/' + scope.track.uri;
            }
          });
        }
      };
    }
  ]);