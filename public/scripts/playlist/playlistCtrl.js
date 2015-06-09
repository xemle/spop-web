"use strict";

angular
  .module('app')
  .controller('PlaylistCtrl', [
    '$scope',
    'PlaylistService',
    'playlist',
    function($scope, PlaylistService, playlist) {
      $scope.playlist = playlist;

      $scope.play = function() {
        PlaylistService.play($scope.playlist);
      };
    }
  ]);