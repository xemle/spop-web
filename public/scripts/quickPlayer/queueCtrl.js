"use strict";

angular
  .module('app')
  .controller('QuickPlayerCtrl', [
    '$rootScope',
    '$scope',
    'QueueService',
    'StatusService',
    function($rootScope, $scope, QueueService, StatusService) {
      $scope.status = '';
      QueueService.get().then(function(queue) {
        $scope.queue = queue;
      });
      StatusService.status().then(function(status) {
        setStatus(status);
      });

      $scope.prev = QueueService.prev;
      $scope.toggle = QueueService.toggle;

      $scope.next = QueueService.next;
      $scope.clear = function() {
        QueueService.clear();
      };

      function setStatus(status) {
        $scope.status = status.status;
        $scope.currentTrack = status.current_track;
      }

      $rootScope.$on('status:change', function(event, data) {
        setStatus(data);
      });
      $rootScope.$on('queue:change', function() {
        QueueService.get().then(function(queue) {
          $scope.queue = queue;
        });
      });

    }
  ]);