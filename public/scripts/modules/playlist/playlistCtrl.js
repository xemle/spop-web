"use strict";

angular
  .module('app')
  .controller('PlaylistCtrl', [
    '$scope',
    '$location',
    'PlaylistService',
    'QueueService',
    'playlists',
    'playlist',
    function($scope, $location, PlaylistService, QueueService, playlists, playlist) {
      $scope.playlists = playlists;
      $scope.playlist = playlist;

      $scope.play = function() {
        PlaylistService.play($scope.playlist);
      };
    }
  ]);