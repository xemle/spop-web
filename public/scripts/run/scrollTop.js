"use strict";

angular
  .module('app')
  .run([
    '$rootScope',
    '$anchorScroll',
    function($rootScope, $anchorScroll) {
      $rootScope.$on('$routeChangeSuccess', function() {
        $anchorScroll();
      });
    }
  ]);