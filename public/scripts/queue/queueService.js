"use strict";

angular
  .module('app')
  .factory('QueueService', [
    '$rootScope',
    '$http',
    'StatusService',
    'QueueModel',
    function($rootScope, $http, StatusService, QueueModel) {
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
          return $http.get('/spop/uadd ' + track.uri).then(function(response) {
            $rootScope.$emit('queue:change');
            return response;
          });
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
          return this.get().then(function(queue) {
            var queueTrack = queue.tracks.filter(function(t) {
              return t.uri === track.uri;
            }).pop();
            if (queueTrack) {
              return $http.get('/spop/qrm ' + queueTrack.index).then(function(response) {
                $rootScope.$emit('queue:change');
                return response;
              });
            }
          });
        },
        moveTrackNext: function(track) {
          return this.get().then(function(queue) {
            var queueTrack = queue.tracks.filter(function(t) {
              return t.uri === track.uri;
            }).pop();
            if (queueTrack) {
              return StatusService.status().then(function(status) {
                var next = status.current_track || 1;
                return $http.get('/spop/qrm ' + queueTrack.index + ' ' + (next + 1)).then(function(response) {
                  $rootScope.$emit('queue:change');
                  return response;
                });
              });
            }
          });

        }
      };
    }
  ]);