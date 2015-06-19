"use strict";

angular
  .module('app')
  .directive('trackList', [
    'QueueService',
    function(QueueService) {
      return {
        scope: {
          trackList: '=',
          trackClass: '=',
          trackMenu: '=',
          trackMenuClick: '=',
          track: '='
        },
        templateUrl: 'scripts/directives/trackList/view.html',
        link: function(scope) {
          scope.itemClick = function(data, item) {
            scope.trackMenuClick(data, item);
          };
          scope.play = function(track) {
            QueueService.playTrack(track);
          }
        }
      };
    }
  ]);