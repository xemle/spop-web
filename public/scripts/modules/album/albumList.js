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
          scope.showAlbum = function(album) {
            $location.search({});
            $location.path('/album/' + album.uri);
          };
          scope.playAlbum = function(album) {
            QueueService.playAlbum(album);
          };

        }
      };
    }
  ]);