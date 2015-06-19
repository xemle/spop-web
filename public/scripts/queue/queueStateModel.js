"use strict";

angular
  .module('app')
  .factory('QueueStateModel', [
    function () {
      function QueueStateModel(data) {
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, this);
      }

      return QueueStateModel;
    }
  ]);