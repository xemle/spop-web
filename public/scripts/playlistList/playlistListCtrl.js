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
        { icon: 'fa-th-list', action: 'show', text: 'Show' }
      ];
      $scope.itemClick = function(playlist, item) {
        if (item.action === 'play') {
          PlaylistService.play(playlist);
        } else if (item.action === 'show') {
          $location.path('/playlists/' + playlist.index);
        }
      };

    }
  ]);