"use strict";

angular
  .module('app')
  .factory('AlbumService', [
    '$http',
    'AlbumModel',
    function($http, AlbumModel) {
      return {
        get: function(uri) {
          return $http.get('/spop/uinfo ' + uri).then(function (response) {
            var data = angular.extend({uri: uri}, response.data);
            return new AlbumModel(data);
          });
        }
      };
    }
  ]);