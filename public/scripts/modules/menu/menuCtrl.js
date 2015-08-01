"use strict";

angular
  .module('app')
  .controller('MenuCtrl', [
    '$scope',
    '$location',
    'throttle',
    'VolumeService',
    function($scope, $location, throttle, VolumeService) {
      $scope.open = function(path) {
        $scope.$hide();
        $location.path(path);
      };
      function setVolume(volume) {
        $scope.volume = volume.left;
      }
      VolumeService.get().then(setVolume);

      var throttledVolumeSet = throttle(function(percent) {
        VolumeService.set(percent);
      }, 200);

      $scope.onSlide = function(percent) {
        throttledVolumeSet(percent);
      };
      $scope.onSlideEnd = function(percent) {
        VolumeService.set(percent).then(setVolume);
      };
    }
  ]);