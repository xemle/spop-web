"use strict";

angular
  .module('app')
  .directive('artistList', [
    '$location',
    function($location) {
      return {
        scope: {
          artists: '=artistList'
        },
        templateUrl: 'scripts/modules/artist/artistList.html',
        link: function(scope) {
          scope.showArtist = function(artist) {
            $location.search({});
            $location.path('/artist/' + artist.uri);
          };
        }
      };
    }
  ]);