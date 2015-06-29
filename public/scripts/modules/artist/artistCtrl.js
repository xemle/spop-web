"use strict";

angular
  .module('app')
  .controller('ArtistCtrl', [
    '$scope',
    'artist',
    function($scope, artist) {
      $scope.artist = artist;
      $scope.show = 'tracks';
    }
  ]);