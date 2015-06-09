"use strict";

angular
  .module('app')
  .controller('QueueCtrl', [
    '$scope',
    'QueueService',
    'queue',
    function($scope, QueueService, queue) {
      $scope.queue = queue;

      $scope.prev = QueueService.prev;
      $scope.stop = QueueService.stop;
      $scope.toggle = QueueService.toggle;
      $scope.start = QueueService.start;
      $scope.next = QueueService.next;
    }
  ]);