"use strict";

angular
  .module('app')
  .controller('SearchCtrl', [
    '$scope',
    '$location',
    'SearchService',
    'QueueService',
    'search',
    function($scope, $location, SearchService, QueueService, search) {
      $scope.search = search;

      if ($location.search().q) {
        $scope.term = $location.search().q;
      }
      $scope.doSearch = function() {
        $location.search({q: $scope.term});
        //$location.path('/search'); //?q=' + $scope.term);
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
          QueueService.addTrack(track).then(function() {
            QueueService.playTrack(track);
          });
        } else if (item.action === 'append') {
          QueueService.addTrack(track);
        } else if (item.action === 'title') {
          $location.search({q: 'track:\'' + track.title + '\''});
        } else if (item.action === 'artist') {
          $location.search({q: 'artist:\'' + track.artist.replace(/,.*/, '') + '\''});
        } else if (item.action === 'album') {
          $location.search({q: 'album:\'' + track.album + '\''});
        }
      };

    }
  ]);