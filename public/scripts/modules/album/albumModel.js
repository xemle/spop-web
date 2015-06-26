"use strict";

angular
  .module('app')
  .factory('AlbumModel', [
    'TrackModel',
    function (TrackModel) {
      function AlbumModel(data) {
        angular.forEach(data, function(value, key) {
          if (key === 'tracks') {
            value = TrackModel.createList(value);
          }
          this[key] = value;
        }, this);
      }

      AlbumModel.createList = function(albums) {
        var result = [];
        angular.forEach(albums, function(album) {
          result.push(new AlbumModel(album));
        });
        return result;
      };

      return AlbumModel;
    }
  ]);