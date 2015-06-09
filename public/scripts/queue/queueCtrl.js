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
      $scope.stop = QueueService.stop;
      $scope.toggle = QueueService.toggle;
      $scope.start = QueueService.start;
      $scope.next = QueueService.next;

      function setStatus(status) {
        $scope.status = status.status;
        $scope.currentTrack = status.current_track;
      }
      setStatus(status);

      $rootScope.$on('status:change', function(event, data) {
        setStatus(data);
      });

    }
  ]);