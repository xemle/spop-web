"use strict";

angular
  .module('app')
  .filter('shortBiography', [
    function() {
      return function(input) {
        var sentences = input.split(/\.\s/);
        return sentences.splice(0, Math.min(4, sentences.length)).join('. ');
      };
    }
  ]);