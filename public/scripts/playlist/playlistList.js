"use strict";

angular
  .module('app')
  .directive('playlistList', [
    '$location',
    'PlaylistService',
    function($location, PlaylistService) {
      return {
        scope: {
          playlists: '=playlistList'
        },
        templateUrl: 'scripts/modules/playlist/playlistList.html',
        link: function(scope) {
          scope.playlistMenu = [
            { icon: 'fa-play', action: 'play', text: 'Play' }
          ];
          scope.itemClick = function(playlist, item) {
            if (item.action === 'play') {
              PlaylistService.play(playlist);
            }
          };
          scope.openPlaylist = function(playlist) {
            $location.path('/playlists/' + playlist.index);
          };

        }
      };
    }
  ]);