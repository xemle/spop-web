"use strict";

angular
  .module('app')
  .directive('albumList', [
    '$location',
    'QueueService',
    function($location, QueueService) {
      return {
        scope: {
          albums: '=albumList'
        },
        templateUrl: 'scripts/modules/album/albumList.html',
        link: function(scope) {
          scope.menu = [
            { icon: 'fa-play', action: 'play', text: 'Play' },
            { icon: 'fa-plus', action: 'append', text: 'Append' },
            { icon: 'fa-music', action: 'title', text: 'Search title' },
            { icon: 'fa-user', action: 'artist', text: 'Search artist' }
          ];
          scope.itemClick = function(album, item) {
            if (item.action === 'play') {
              scope.playAlbum(album);
            } else if (item.action === 'append') {
              scope.addAlbum(album);
            } else if (item.action === 'title') {
              $location.search({q: album.title});
              $location.path('/search');
            } else if (item.action === 'artist') {
              $location.search({q: album.artist});
              $location.path('/search');
            }
          };

          scope.showAlbum = function(album) {
            $location.search({});
            $location.path('/album/' + album.uri);
          };
          scope.playAlbum = function(album) {
            QueueService.playAlbum(album);
          };
          scope.addAlbum = function(album) {
            return QueueService.addAlbum(album);
          };

        }
      };
    }
  ]);