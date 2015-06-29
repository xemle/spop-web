"use strict";

angular
  .module('app')
  .controller('AlbumCtrl', [
    '$scope',
    'QueueService',
    'album',
    function($scope, QueueService, album) {
      $scope.album = album;

      $scope.playAlbum = function(album) {
        QueueService.playAlbum(album);
      };
      $scope.addAlbum = function(album) {
        QueueService.addAlbum(album);
      };

    }
  ]);