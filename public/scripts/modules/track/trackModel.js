"use strict";

angular
  .module('app')
  .factory('TrackModel', [
    function () {
      function TrackModel(data) {
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, this);
      }

      TrackModel.createList = function(tracks) {
        var result = [];
        angular.forEach(tracks, function(track) {
          result.push(new TrackModel(track));
        });
        return result;
      };
      
      return TrackModel;
    }
  ]);