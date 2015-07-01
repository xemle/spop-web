"use strict";

angular
  .module('app')
  .directive('dropdown', [
    '$timeout',
    '$dropdown',
    function($timeout, $dropdown) {
      return {
        scope: {
          data: '=dropdown',
          items: '=dropdownItems',
          itemClick: '&dropdownItemClick'
        },
        link: function(scope, element) {
          var dropdown = false;

          element.bind('click', function() {
            scope.$apply(function() {
              scope.showDropdown();
            });
          });

          scope.destroyDropdown = function() {
            if (dropdown) {
              dropdown.hide();
              dropdown.destroy();
            }
          };
          scope.showDropdown = function($event) {
            var options = {
                  container: 'body',
                  template: 'scripts/directives/dropdown.html',
                  show: true,
                  trigger: 'manual',
                  placement: 'auto bottom-left'
                };
            if (!dropdown) {
              dropdown = $dropdown(element, options);
              dropdown.$scope.items = scope.items;
              dropdown.$scope.itemClick = function(item) {
                dropdown.hide();
                scope.itemClick({data: scope.data, item: item});
              };
              dropdown.$scope.$on('$destroy', function() {
                dropdown = false;
              });
              dropdown.$scope.$watch('$isShown', function(newVal, oldVal) {
                if (newVal === false && oldVal === true) {
                  $timeout(function() {
                    dropdown.destroy();
                  });
                }
              });
            } else {
              dropdown.hide();
            }
          };
        }
      };
    }
  ]);

