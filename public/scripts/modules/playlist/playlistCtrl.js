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

      $scope.trackMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' },
        { icon: 'fa-plus', action: 'append', text: 'Append' },
        { icon: 'fa-music', action: 'title', text: 'Search title' },
        { icon: 'fa-user', action: 'artist', text: 'Search artist' },
        { icon: 'fa-play-circle', action: 'album', text: 'Search album' }
      ];
      $scope.trackMenuClick = function(track, item) {
        if (item.action === 'play') {
          QueueService.addTrack(track).then(QueueService.playTrack(track));
        } else if (item.action === 'append') {
          QueueService.addTrack(track);
        } else if (item.action === 'title') {
          $location.search({q: 'track:\'' + track.title + '\''});
          $location.path('/search');
        } else if (item.action === 'artist') {
          $location.search({q: 'artist:\'' + track.artist.replace(/,.*/, '') + '\''});
          $location.path('/search');
        } else if (item.action === 'album') {
          $location.search({q: 'album:\'' + track.album + '\''});
          $location.path('/search');
        }
      };
    }
  ]);