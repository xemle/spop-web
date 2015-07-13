"use strict";

angular
  .module('app')
  .factory('StatusModel', [
    function () {
      function StatusModel(data) {
        angular.forEach(data, function(value, key) {
          this[key] = value;
        }, this);
        // duration is in ms, while position is in sec. Set duration to sec, too
        this.duration = (this.duration || 0) / 1000;
        this.created = +new Date();
      }

      StatusModel.prototype.isPlaying = function() {
        return this.status === 'playing';
      };

      StatusModel.prototype.isStopped = function() {
        return this.status === 'stopped';
      };

      StatusModel.prototype.getTime = function() {
        var now = +new Date(),
            diff = now - this.created;

        if (!this.isPlaying()) {
          return this.position;
        }
        return this.position + (diff / 1000);
      };

      StatusModel.prototype.getRemainingTime = function() {
        return this.duration - this.getTime();
      };

      StatusModel.prototype.isShuffle = function() {
        return this.shuffle;
      };

      StatusModel.prototype.isRepeat = function() {
        return this.repeat;
      };

      return StatusModel;
    }
  ]);