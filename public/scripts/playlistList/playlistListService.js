"use strict";

angular
  .module('app')
  .factory('PlaylistListService', [
    '$http',
    'PlaylistListModel',
    function($http, PlaylistListModel) {
      return {
        get: function() {
          return $http.get('/spopd/ls').then(function(response) {
            var result = [];
            angular.forEach(response.data.playlists || [], function(data) {
              result.push(new PlaylistListModel(data));
            });
            return result;
          });
        }
      };
    }
  ]);