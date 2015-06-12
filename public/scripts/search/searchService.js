"use strict";

angular
  .module('app')
  .factory('SearchService', [
    '$q',
    '$http',
    'SearchModel',
    function($q, $http, SearchModel) {
      return {
        search: function(term) {
          if (!angular.isString(term) || !term.length) {
            return $q.when(new SearchModel());
          }
          return $http.get('/spop/search "' + term + '"').then(function(response) {
            return new SearchModel(response.data);
          });
        }
      };
    }
  ]);