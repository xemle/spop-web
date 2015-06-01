"use strict";

angular
  .module('app')
  .controller('PlaylistListCtrl', [
    '$scope',
    'playlists',
    function($scope, playlists) {
      $scope.playlists = playlists;
    }
  ]);