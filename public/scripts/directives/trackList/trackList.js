"use strict";

angular
  .module('app')
  .directive('trackList', [
    '$rootScope',
    'StatusService',
    'QueueService',
    function($rootScope, StatusService, QueueService) {
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
          scope.$trackClass = function(track) {
            var classes = (scope.trackClass && scope.trackClass(track)) || {};

            if (scope.status && scope.status.uri === track.uri) {
              classes.active = true;
            }
            return classes;
          };
          scope.play = function(track) {
            QueueService.playTrack(track);
          };

          scope.$on('$destroy', $rootScope.$on('status:change', function(event, status) {
            scope.status = status;
          }));
          StatusService.status().then(function(status) {
            scope.status = status;
          });
        }
      };
    }
  ]);