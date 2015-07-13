"use strict";

angular
  .module('app')
  .factory('QueueService', [
    '$rootScope',
    '$http',
    '$q',
    'StatusService',
    'QueueModel',
    'StatusModel',
    function($rootScope, $http, $q, StatusService, QueueModel, StatusModel) {
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
        seek: function(position) {
          return $http.get('/spop/seek ' + position.toFixed(0)).then(function(response) {
            return new StatusModel(response.data);
          });
        },
        next: function() {
          return $http.get('/spop/next');
        },
        goto: function(track) {
          return $http.get('/spop/goto ' + track.index).then(function(response) {
            return new StatusModel(response.data);
          });
        },
        clear: function() {
          return $http.get('/spop/qclear');
        },
        toggleRepeat: function() {
          return $http.get('/spop/repeat').then(function(response) {
            return new StatusModel(response.data);
          });
        },
        toggleShuffle: function() {
          return $http.get('/spop/shuffle').then(function(response) {
            return new StatusModel(response.data);
          });
        },
        addTrack: function(track) {
          return $http.get('/spop/uadd ' + track.uri).then(function(response) {
            $rootScope.$emit('queue:change');
            return new StatusModel(response.data);
          });
        },
        addTracks: function(tracks) {
          var promises = [];

          angular.forEach(tracks, function(track) {
            promises.push($http.get('/spop/uadd ' + track.uri));
          }, this);
          return $q.all(promises).then(function(result) {
            $rootScope.$emit('queue:change');
            return result;
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
                if (!queueStatus.isPlaying()) {
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
        },
        addAlbum: function(album) {
          return $http.get('/spop/uadd ' + album.uri).then(function(response) {
            $rootScope.$emit('queue:change');
            return response;
          });
        },
        playAlbum: function(album) {
          return $http.get('/spop/uplay ' + album.uri).then(function(response) {
            $rootScope.$emit('queue:change');
            return response;
          });
        }
      };
    }
  ]);