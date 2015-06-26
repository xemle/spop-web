"use strict";

angular
  .module('app')
  .factory('SearchModel', [
    'TrackModel',
    function (TrackModel) {
      function SearchModel(data) {
        data = data || {};
        angular.forEach(data, function(value, key) {
          if (key === 'tracks') {
            value = TrackModel.createList(value);
          }
          this[key] = value;
        }, this);

        // Fill default values
        this.tracks = this.tracks || [];
        this.albums = this.albums || [];
        this.playlists = this.playlists || [];
      }

      SearchModel.prototype.isEmpty = function() {
        return this.tracks.length === 0;
      };

      return SearchModel;
    }
  ]);