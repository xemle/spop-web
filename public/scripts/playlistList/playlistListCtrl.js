"use strict";

angular
  .module('app')
  .controller('PlaylistListCtrl', [
    '$scope',
    '$location',
    'PlaylistService',
    'playlists',
    function($scope, $location, PlaylistService, playlists) {
      $scope.playlists = playlists;

      $scope.playlistMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' },
      ];
      $scope.itemClick = function(playlist, item) {
        if (item.action === 'play') {
          PlaylistService.play(playlist);
        }
      };
      $scope.openPlaylist = function(playlist) {
        $location.path('/playlists/' + playlist.index);
      };

    }
  ]);