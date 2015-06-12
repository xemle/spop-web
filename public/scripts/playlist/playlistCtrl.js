"use strict";

angular
  .module('app')
  .controller('PlaylistCtrl', [
    '$scope',
    'PlaylistService',
    'QueueService',
    'playlist',
    function($scope, PlaylistService, QueueService, playlist) {
      $scope.playlist = playlist;

      $scope.play = function() {
        PlaylistService.play($scope.playlist);
      };

      $scope.trackMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' }
      ];
      $scope.trackMenuClick = function(track, item) {
        if (item.action === 'play') {
          QueueService.addTrack(track).then(QueueService.playTrack(track));
        }
      };
    }
  ]);