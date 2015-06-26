"use strict";

angular
  .module('app')
  .controller('MenuCtrl', [
    '$scope',
    function($scope) {
      $scope.title = 'Menu';
    }
  ]);