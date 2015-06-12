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

      $scope.trackMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' }
      ];
      $scope.trackMenuClick = function(track, item) {
        if (item.action === 'play') {
          QueueService.goto(track);
        }
      };
      $scope.trackClass = function(track) {
        return {
          active: track.index === $scope.currentTrack
        };
      };

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