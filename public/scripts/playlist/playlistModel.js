"use strict";

angular
  .module('app')
  .factory('PlaylistModel', [
    'TrackModel',
    function (TrackModel) {
      function PlaylistModel(data) {
        angular.forEach(data, function(value, key) {
          if (key === 'tracks') {
            value = TrackModel.createList(value);
          }
          this[key] = value;
        }, this);
        this.name = this.name || 'Starred';
      }

      return PlaylistModel;
    }
  ]);