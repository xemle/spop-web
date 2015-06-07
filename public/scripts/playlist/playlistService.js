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
            return new PlaylistModel(response.data);
          });
        }
      };
    }
  ]);