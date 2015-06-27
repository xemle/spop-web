"use strict";

angular
  .module('app')
  .factory('ArtistModel', [
    function () {
      function ArtistModel(data) {
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, this);
        this.tracks = (this.tracks || []).slice(0, 100);
      }

      ArtistModel.createList = function(artists) {
        var result = [];
        angular.forEach(artists, function(artist) {
          result.push(new ArtistModel(artist));
        });
        return result;
      };

      return ArtistModel;
    }
  ]);