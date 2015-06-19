"use strict";

angular
  .module('app')
  .factory('StatusModel', [
    function () {
      function StatusModel(data) {
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, this);
      }

      return StatusModel;
    }
  ]);