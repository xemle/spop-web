"use strict";

angular
  .module('app')
  .controller('PlaylistCtrl', [
    '$scope',
    'playlist',
    function($scope, playlist) {
      $scope.playlist = playlist;
    }
  ]);