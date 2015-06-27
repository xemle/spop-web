"use strict";

angular
  .module('app')
  .factory('ArtistService', [
    '$http',
    'ArtistModel',
    function($http, ArtistModel) {
      return {
        get: function(uri) {
          return $http.get('/spop/uinfo ' + uri).then(function (response) {
            var data = angular.extend({uri: uri}, response.data);
            return new ArtistModel(data);
          });
        }
      };
    }
  ]);