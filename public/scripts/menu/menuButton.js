"use strict";

angular
  .module('app')
  .directive('menuButton', [
    '$aside',
    function($aside) {
      return {
        restrict: 'C',
        template: '<span ng-click="openMenu()" class="btn"><i class="fa fa-fw fa-bars fa-2x"></i></span>',
        link: function(scope) {
          scope.openMenu = function() {
            $aside({template: 'scripts/menu/view.html', placement: 'top-left'});
          };
        }
      };
    }
  ]);