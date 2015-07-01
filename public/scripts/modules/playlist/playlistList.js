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
          scope.items = [
            { icon: 'fa-play', action: 'play', text: 'Play' },
            { icon: 'fa-plus', action: 'add', text: 'Add' }
          ];
          scope.itemClick = function(playlist, item) {
            if (item.action === 'play') {
              PlaylistService.play(playlist);
            } else if (item.action === 'add') {
              PlaylistService.add(playlist);
            }
          };
          scope.openPlaylist = function(playlist) {
            $location.path('/playlists/' + playlist.index);
          };

        }
      };
    }
  ]);