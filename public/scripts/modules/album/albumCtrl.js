"use strict";

angular
  .module('app')
  .controller('AlbumCtrl', [
    '$scope',
    '$location',
    'QueueService',
    'album',
    function($scope, $location, QueueService, album) {
      $scope.album = album;

      $scope.trackMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' },
        { icon: 'fa-plus', action: 'append', text: 'Append' },
        { icon: 'fa-music', action: 'title', text: 'Search title' }
      ];
      $scope.trackMenuClick = function(album, item) {
        if (item.action === 'play') {
          $scope.playAlbum(album);
        } else if (item.action === 'append') {
          $scope.addAlbum(album);
        } else if (item.action === 'title') {
          $location.search({q: album.title});
          $location.path('/search');
        }
      };

      $scope.playAlbum = function(album) {
        QueueService.playAlbum(album);
      };
      $scope.addAlbum = function(album) {
        QueueService.addAlbum(album);
      };


    }
  ]);