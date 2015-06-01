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
              '$http',
              'PlaylistListModel',
              function ($http, PlaylistListModel) {
                return $http.get('/spopd/ls').then(function(response) {
                  var result = [];
                  angular.forEach(response.data.playlists || [], function(data) {
                    result.push(new PlaylistListModel(data));
                  });
                  return result;
                });
              }]
          }
        }).
        when('/playlists/:playlistId', {
          templateUrl: 'scripts/playlist/view.html',
          controller: 'PlaylistCtrl',
          resolve: {
            playlist: [
              '$http',
              '$route',
              'PlaylistModel',
              function ($http, $route, PlaylistModel) {
                return $http.get('/spopd/ls ' + $route.current.params.playlistId).then(function (response) {
                  return new PlaylistModel(response.data);
                });
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