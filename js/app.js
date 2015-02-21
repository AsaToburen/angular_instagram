
angular.module('InstaMod', ['ngAnimate'])
  .controller('searchCtrl', function($scope, $http) {

  

    $scope.searchInstagram = function(searchText) {
      var url = "https://api.instagram.com/v1/tags/"+ searchText +"/media/recent";
      var request = {
        callback: "JSON_CALLBACK",
        client_id: "1901232dbce1407c82f4c0b4a90152b7"
      };

        $scope.images = [];
    
    $http({
      method: 'JSONP',
      url: url,
      params: request
    })
      .success(function(result) {
      //  $scope.images = result.data[i].images.low_resolution.url;
        for(var i=0; i<20; i++) {
          $scope.images.push(result.data[i].images.low_resolution.url);
         // console.log(result.data[i].images.low_resolution.url);
        }
      })
      .error(function(){
        alert('error');
    });
  };
});