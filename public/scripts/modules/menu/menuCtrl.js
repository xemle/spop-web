"use strict";

angular
  .module('app')
  .controller('MenuCtrl', [
    '$scope',
    '$location',
    function($scope, $location) {
      $scope.open = function(path) {
        $scope.$hide();
        $location.path(path);
      };
    }
  ]);