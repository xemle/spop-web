"use strict";

angular
  .module('app')
  .run([
    '$rootScope',
    'StatusService',
    function ($rootScope, StatusService) {
      var last;

      function update(status) {
        if (!status.isPlaying() || last === status.uri) {
          return;
        }
        last = status.uri;
        var $img = angular.element('<img>');
        $img.attr('src', '/spop/uimage/' + status.uri + '/1');
        $img.on('load', function() {
          var favicon = new Favico();
          favicon = favicon.image($img[0]);
        });
      };

      $rootScope.$on('status:change', function(event, status) {
        update(status);
      });

      StatusService.status().then(update);
    }
  ]);
