"use strict";

angular
  .module('app')
  .factory('QueueModel', [
    'TrackModel',
    function (TrackModel) {
      function QueueModel(data) {
        angular.forEach(data, function(value, key) {
          if (key === 'tracks') {
            value = TrackModel.createList(value);
          }
          this[key] = value;
        }, this);
      }

      return QueueModel;
    }
  ]);