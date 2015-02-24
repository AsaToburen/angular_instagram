angular.module('InstaMod', ['ngAnimate'])
  .controller('searchCtrl', ['$scope', '$timeout', '$q', '$http',
    function($scope, $timeout, $q, $http) {

      function emptyImageData() {
        $scope.imageData = {
          imageUrl: [],
          instagramUrl: []
        };
        return $scope.imageData;
      }

      $scope.loadMsg = false;
      $scope.errorMsg = false;

      function parseCallback(result) {
        $scope.loadMsg = false;
        for (var i = 0; i < 20; i++) {
          $scope.imageData.imageUrl.push(result.data[i].images.low_resolution
            .url);
          $scope.imageData.instagramUrl.push(result.data[i].link);
        }
      }

      $scope.searchInstagram = function(userInput) {
        emptyImageData();
        $scope.data.queryValue = userInput || null;
        $scope.data.search_text = null;
        $scope.loadMsg = true;
        var url = "https://api.instagram.com/v1/tags/" + userInput +
          "/media/recent";
        var request = {
          callback: "JSON_CALLBACK",
          client_id: "1901232dbce1407c82f4c0b4a90152b7"
        };

        $http({
            method: 'JSONP',
            url: url,
            params: request
        })
          .success(function(result) {
            parseCallback(result);
          })
          .error(function() {
            $scope.loadMsg = false;
            $scope.successMsg = false;
            $scope.errorMsg = true;
          });
      };
    }
  ]);