"use strict";

angular
  .module('app')
  .factory('QueueService', [
    '$http',
    'QueueModel',
    function($http, QueueModel) {
      return {
        get: function() {
          return $http.get('/spop/qls').then(function(response) {
            return new QueueModel(response.data);
          });
        },
        prev: function() {
          return $http.get('/spop/prev');
        },
        stop: function() {
          return $http.get('/spop/stop');
        },
        play: function() {
          return $http.get('/spop/play');
        },
        toggle: function() {
          return $http.get('/spop/toggle');
        },
        next: function() {
          return $http.get('/spop/next');
        },
        goto: function(track) {
          return $http.get('/spop/goto ' + track.index);
        },
        clear: function() {
          return $http.get('/spop/qclear');
        },
        addTrack: function(track) {
          return $http.get('/spop/uadd ' + track.uri);
        },
        playTrack: function(track) {
          var _this = this;
          return this.get().then(function(queue) {
            var queueTrack = queue.tracks.filter(function(t) {
              return t.uri === track.uri;
            }).pop();
            if (queueTrack) {
              return _this.goto(queueTrack);
            }
          });
        },
        removeTrack: function(track) {
          var _this = this;
          return this.get().then(function(queue) {
            var queueTrack = queue.tracks.filter(function(t) {
              return t.uri === track.uri;
            }).pop();
            if (queueTrack) {
              return $http.get('/spop/qrm ' + queueTrack.index);
            }
          });
        }
      };
    }
  ]);