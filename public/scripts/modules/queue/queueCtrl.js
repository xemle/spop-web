"use strict";

angular
  .module('app')
  .controller('QueueCtrl', [
    '$rootScope',
    '$scope',
    'QueueService',
    'queue',
    'status',
    function($rootScope, $scope, QueueService, queue, status) {
      $scope.queue = queue;

      $scope.prev = QueueService.prev;
      $scope.toggle = QueueService.toggle;
      $scope.next = QueueService.next;
      $scope.toggleShuffle = QueueService.toggleShuffle;
      $scope.toggleRepeat = QueueService.toggleRepeat;

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

      $scope.onSeek = function(position) {
        return QueueService.seek(position * 1000);
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