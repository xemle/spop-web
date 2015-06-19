"use strict";

angular
  .module('app')
  .controller('QueueCtrl', [
    '$rootScope',
    '$scope',
    '$location',
    'QueueService',
    'queue',
    'status',
    function($rootScope, $scope, $location, QueueService, queue, status) {
      $scope.queue = queue;

      $scope.prev = QueueService.prev;
      $scope.toggle = QueueService.toggle;
      $scope.next = QueueService.next;

      function reloadQueue() {
        return QueueService.get().then(function(queue) {
          $scope.queue = queue;
          return queue;
        });
      }

      $scope.clear = function() {
        return QueueService.clear().then(function() {
          return reloadQueue();
        });
      };

      $scope.trackMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' },
        { icon: 'fa-music', action: 'title', text: 'Search title' },
        { icon: 'fa-user', action: 'artist', text: 'Search artist' },
        { icon: 'fa-play-circle', action: 'album', text: 'Search album' },
        { icon: 'fa-trash-o', action: 'remove', text: 'Remove' }
      ];
      $scope.trackMenuClick = function(track, item) {
        if (item.action === 'play') {
          QueueService.goto(track);
        } else if (item.action === 'remove') {
          QueueService.removeTrack(track);
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
      $scope.trackClass = function(track) {
        return {
          active: track.index === $scope.currentTrack
        };
      };

      function setStatus(status) {
        $scope.status = status;
        $scope.currentTrack = status.current_track;
      }
      setStatus(status);

      $scope.$on('$destroy', $rootScope.$on('status:change', function(event, status) {
        setStatus(status);
      }));
      $scope.$on('$destroy', $rootScope.$on('queue:change', function() {
        reloadQueue();
      }));
      $scope.$on('$destroy', $rootScope.$on('visibility:change', function() {
        reloadQueue();
      }));

    }
  ]);