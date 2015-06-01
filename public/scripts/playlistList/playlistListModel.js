"use strict";

angular
  .module('app')
  .factory('PlaylistListModel', [
    function () {
      function PlaylistListModel(data) {
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, this);
        this.name = this.name || 'Starred';
      }

      return PlaylistListModel;
    }
  ]);