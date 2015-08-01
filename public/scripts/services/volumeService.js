"use strict";

angular
  .module('app')
  .factory('VolumeService', [
    '$http',
    function($http) {
      return {
        get: function() {
          return $http.get('/volume').then(function(response) {
            return response.data;
          });
        },
        set: function(percent) {
          percent = Math.min(100, Math.max(0, +percent)).toFixed(0);
          return $http.get('/volume/' + percent).then(function(response) {
            return response.data;
          });
        }
      };
    }
  ]);