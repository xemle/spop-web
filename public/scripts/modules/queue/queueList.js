"use strict";

angular
  .module('app')
  .directive('queueList', [
    '$rootScope',
    '$location',
    'StatusService',
    'QueueService',
    function($rootScope, $location, StatusService, QueueService) {
      return {
        scope: {
          tracks: '=queueList'
        },
        templateUrl: 'scripts/modules/queue/queueList.html',
        link: function(scope) {
          scope.itemClick = function(data, item) {
            scope.trackMenuClick(data, item);
          };
          scope.items = [
            { icon: 'fa-play', action: 'play', text: 'Play' },
            { icon: 'fa-music', action: 'title', text: 'Search title' },
            { icon: 'fa-user', action: 'artist', text: 'Search artist' },
            { icon: 'fa-play-circle', action: 'album', text: 'Search album' },
            { icon: 'fa-trash-o', action: 'remove', text: 'Remove' }
          ];
          scope.itemClick = function(track, item) {
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

          scope.trackClass = function(track) {
            if (scope.status && scope.status.isPlaying() && scope.status.uri === track.uri) {
              return {active: true};
            }
            return {};
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