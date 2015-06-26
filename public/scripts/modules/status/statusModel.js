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

      StatusModel.prototype.isPlaying = function() {
        return this.status === 'playing';
      };

      return StatusModel;
    }
  ]);