angular
  .module('app', [])
  .controller('MainCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
      $scope.execute = function() {
        $http.get('/spopd/' + $scope.command).then(function(response) {
          $scope.data = JSON.stringify(response.data, 0, 2);
        });
      };
    }
  ]);
