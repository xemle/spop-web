"use strict";

angular
  .module('app')
  .factory('PlaylistService', [
    '$http',
    'PlaylistModel',
    function($http, PlaylistModel) {
      return {
        get: function(playlistId) {
          return $http.get('/spop/ls ' + playlistId).then(function (response) {
            // Extend response data with playlist index
            var data = angular.extend({index: playlistId}, response.data);
            return new PlaylistModel(data);
          });
        },
        play: function(playlist) {
          return $http.get('/spop/play ' + playlist.index);
      }
      };
    }
  ]);