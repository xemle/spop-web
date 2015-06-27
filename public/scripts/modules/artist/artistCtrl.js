"use strict";

angular
  .module('app')
  .controller('ArtistCtrl', [
    '$scope',
    '$location',
    'QueueService',
    'artist',
    function($scope, $location, QueueService, artist) {
      $scope.artist = artist;
      $scope.show = 'tracks';
      console.log(artist);

      $scope.trackMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' },
        { icon: 'fa-plus', action: 'append', text: 'Append' },
        { icon: 'fa-music', action: 'title', text: 'Search title' }
      ];
      $scope.trackMenuClick = function(track, item) {
        if (item.action === 'play') {
          QueueService.addTrack(track).then(function() {
            QueueService.playTrack(track);
          });
        } else if (item.action === 'append') {
          QueueService.addTrack(track);
        } else if (item.action === 'title') {
          $location.search({q: 'track:\'' + track.title + '\''});
          $location.path('/search');
        }
      };
    }
  ]);