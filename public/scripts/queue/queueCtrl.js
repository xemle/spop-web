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
      $scope.clear = function() {
        QueueService.clear().then(function() {
          return QueueService.get()
        }).then(function(queue) {
          $scope.queue = queue;
        });
      };

      $scope.trackMenu = [
        { icon: 'fa-play', action: 'play', text: 'Play' },
        { icon: 'fa-trash-o', action: 'remove', text: 'Remove' }
      ];
      $scope.trackMenuClick = function(track, item) {
        if (item.action === 'play') {
          QueueService.goto(track);
        } else if (item.action === 'remove') {
          QueueService.removeTrack(track).then(function() {
            return QueueService.get()
          }).then(function(queue) {
            $scope.queue = queue;
          });
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