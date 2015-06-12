"use strict";

angular
  .module('app')
  .factory('StatusService', [
    '$rootScope',
    '$http',
    function($rootScope, $http) {
      var isRunning = false;

      function doPoll() {
        return $http.get('/spop/idle').then(function(response) {
          $rootScope.$emit('status:change', response.data);
          console.log(response.data);
          if (isRunning) {
            return doPoll();
          }
        });
      }

      $rootScope.$on('visibility:changed', function($ev, isHidden) {
        console.log('visibility:changed ' + isHidden);
        if (isHidden) {
          service.stop();
        } else {
          service.start();
        }
      });

      var service = {
        start: function() {
          if (isRunning) {
            return;
          }
          isRunning = true;
          doPoll().then(doPoll()).catch(function() {
            isRunning = false;
          });
        },
        stop: function() {
          if (!isRunning) {
            return;
          }
          isRunning = false;
          $http.get('/spop/notify');
        },
        status: function() {
          return $http.get('/spop/status').then(function(response) {
            return response.data;
          });
        }
      };

      return service;
    }
  ]);