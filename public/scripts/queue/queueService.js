"use strict";

angular
  .module('app')
  .factory('QueueService', [
    '$http',
    'QueueModel',
    function($http, QueueModel) {
      return {
        get: function() {
          return $http.get('/spop/qls').then(function(response) {
            return new QueueModel(response.data);
          });
        },
        prev: function() {
          return $http.get('/spop/prev');
        },
        stop: function() {
          return $http.get('/spop/stop');
        },
        play: function() {
          return $http.get('/spop/play');
        },
        toggle: function() {
          return $http.get('/spop/toggle');
        },
        next: function() {
          return $http.get('/spop/next');
        }
      };
    }
  ]);