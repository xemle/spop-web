"use strict";

angular
  .module('app')
  .run([
    'StatusService',
    function(StatusService) {
      StatusService.start();
    }
  ]);