"use strict";

angular
  .module('app')
  .factory('ArtistModel', [
    'TrackModel',
    'AlbumModel',
    function (TrackModel, AlbumModel) {
      function ArtistModel(data) {
        angular.forEach(data, function(value, key) {
          if (key === 'tracks') {
            value = TrackModel.createList(value);
            value.sort(function(a, b) {
              return b.popularity - a.popularity;
            });
          } else if (key === 'albums') {
            value = AlbumModel.createList(value);
            value.sort(function(a, b) {
              return b.popularity - a.popularity;
            });
          }
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