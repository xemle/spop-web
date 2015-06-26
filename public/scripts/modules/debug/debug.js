angular
  .module('app')
  .controller('DebugCtrl', [
    '$scope',
    '$http',
    function($scope, $http) {
      $scope.command = 'help';
      $scope.execute = function() {
        $http.get('/spop/' + $scope.command).then(function(response) {
          $scope.data = JSON.stringify(response.data, 0, 2);
        });
      };
    }
  ]);