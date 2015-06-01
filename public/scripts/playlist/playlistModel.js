"use strict";

angular
  .module('app')
  .factory('PlaylistModel', [
    function () {
      function PlaylistModel(data) {
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, this);
        this.name = this.name || 'Starred';
      }

      return PlaylistModel;
    }
  ]);