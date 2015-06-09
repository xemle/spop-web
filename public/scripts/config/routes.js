"use strict";

angular
  .module('app')
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'scripts/home/view.html',
          controller: 'HomeCtrl'
        }).
        when('/playlists', {
          templateUrl: 'scripts/playlistList/view.html',
          controller: 'PlaylistListCtrl',
          resolve: {
            playlists: [
              'PlaylistListService',
              function (PlaylistListService) {
                return PlaylistListService.get();
              }]
          }
        }).
        when('/playlists/:playlistId', {
          templateUrl: 'scripts/playlist/view.html',
          controller: 'PlaylistCtrl',
          resolve: {
            playlist: [
              '$route',
              'PlaylistService',
              function ($route, PlaylistService) {
                return PlaylistService.get($route.current.params.playlistId);
              }
            ]
          }
        }).
        when('/queue', {
          templateUrl: 'scripts/queue/view.html',
          controller: 'QueueCtrl',
          resolve: {
            queue: [
              'QueueService',
              function (QueueService) {
                return QueueService.get();
              }
            ]
          }
        }).
        when('/debug', {
          templateUrl: 'scripts/debug/view.html',
          controller: 'DebugCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);