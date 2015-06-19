"use strict";

angular
  .module('app')
  .factory('QueueService', [
    '$rootScope',
    '$http',
    'StatusService',
    'QueueModel',
    'QueueStateModel',
    function($rootScope, $http, StatusService, QueueModel, QueueStateModel) {
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
          return $http.get('/spop/goto ' + track.index).then(function(response) {
            return new QueueStateModel(response.data);
          });
        },
        clear: function() {
          return $http.get('/spop/qclear');
        },
        addTrack: function(track) {
          return $http.get('/spop/uadd ' + track.uri).then(function(response) {
            $rootScope.$emit('queue:change');
            return new QueueStateModel(response.data);
          });
        },
        playTrack: function(track) {
          var _this = this;
          return this.get().then(function(queue) {
            var queueTrack = queue.tracks.filter(function(t) {
              return t.uri === track.uri;
            }).pop();
            if (queueTrack) {
              return _this.goto(queueTrack).then(function(queueStatus) {
                if (queueStatus.status !== 'playing') {
                  return _this.toggle();
                }
              });
            } else {
              // Track is not in the queue. We add and play it
              _this.addTrack(track).then(function() {
                _this.playTrack(track);
              });
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