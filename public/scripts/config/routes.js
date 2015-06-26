"use strict";

angular
  .module('app')
  .config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'scripts/modules/home/view.html',
          controller: 'HomeCtrl'
        }).
        when('/playlists', {
          templateUrl: 'scripts/modules/playlist/view.html',
          controller: 'PlaylistCtrl',
          resolve: {
            playlists: [
              'PlaylistService',
              function (PlaylistService) {
                return PlaylistService.list();
              }
            ],
            playlist: [
              '$q',
              function ($q) {
                return $q.resolve(false);
              }
            ]
          }
        }).
        when('/playlists/:playlistId', {
          templateUrl: 'scripts/modules/playlist/view.html',
          controller: 'PlaylistCtrl',
          resolve: {
            playlists: [
              '$q',
              function ($q) {
                return $q.resolve(false);
              }
            ],
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
          templateUrl: 'scripts/modules/queue/view.html',
          controller: 'QueueCtrl',
          resolve: {
            queue: [
              'QueueService',
              function (QueueService) {
                return QueueService.get();
              }
            ],
            status: [
              'StatusService',
              function(StatusService) {
                return StatusService.status();
              }
            ]
          }
        }).
        when('/search', {
          templateUrl: 'scripts/modules/search/view.html',
          controller: 'SearchCtrl',
          resolve: {
            search: [
              '$location',
              'SearchService',
              function ($location, SearchService) {
                var term = $location.search().q || '';
                return SearchService.search(term);
              }
            ]
          }
        }).
        when('/debug', {
          templateUrl: 'scripts/modules/debug/view.html',
          controller: 'DebugCtrl'
        }).
        otherwise({
          redirectTo: '/'
        });
    }]);