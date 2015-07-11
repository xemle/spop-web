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
        var time, sec, min, hour;
        time = (+input).toFixed(0);
        sec = time % 60;
        min = ((time - sec) / 60) % 60;
        hour = (time - sec - min * 60) / 3600;

        if (!input) {
          return '';
        } else if (hour > 0) {
          return hour + ':' + prefix(min) + ':' + prefix(sec);
        } else {
          return min + ':' + prefix(sec);
        }
      };
    }
  ]);

