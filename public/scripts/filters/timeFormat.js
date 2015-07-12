"use strict";

angular
  .module('app')
  .filter('timeFormat', [
    function() {
      function prefix(s, len, char) {
        s = '' + s;
        len = len || 2;
        char = char || '0';
        while (s.length < len){
          s = char + s;
        }
        return s;
      }
      return function(input) {
        var time, negPrefix, sec, min, hour;
        time = Math.abs((+input).toFixed(0));
        sec = time % 60;
        min = ((time - sec) / 60) % 60;
        hour = (time - sec - min * 60) / 3600;
        negPrefix = (+input) < 0 ? '-' : '';

        if (angular.isUndefined(input)) {
          return '';
        } else if (hour > 0) {
          return negPrefix + hour + ':' + prefix(min) + ':' + prefix(sec);
        } else {
          return negPrefix + min + ':' + prefix(sec);
        }
      };
    }
  ]);

