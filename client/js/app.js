(function() {


  var app = angular.module('CryptoWatch', ['ngMaterial', 'md.data.table']);
  app.config(['$mdThemingProvider', function($mdThemingProvider) {
    'use strict';

    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  }])

  app.factory('ListRepo', function($http) {
    const baseUrl = 'http://localhost:3000/api/lists/';
    return {
      'get': function(userId) {
        return $http.get(baseUrl + userId);
      },
      'addCoin': function(userId, coinId) {
        return $http.post(baseUrl + userId + '/coins', {
          coinId: coinId
        })
      },
      'removeCoin': function(userId, coinId) {
        return $http.delete(baseUrl + userId + '/coins', {
          coinId: coinId
        })
      },
      'update': function(userId, coinId, data) {
        return $http.put(baseUrl + userId + '/coins', {
          coinId: coinId,
          data: data
        })
      },
      'search': function(keyword) {
        return $http.get(baseUrl + 'search/' + keyword);
      },
    }
  });


  // http://localhost:3000/api/lists/search/eth





  app.controller('ListController', function($scope, ListRepo) {


    ListRepo.get('59192ebfc8ca0c09706f50b0').then(function(data) {
      console.log(data)
      $scope.coins = data.data;
    })

    $scope.getSuggestions = function() {
      ListRepo.search($scope.currentModel).then(function(data) {
        $scope.suggestions = data.data;
      })
    }

    $scope.selectedItem = undefined;
    $scope.currentModel = ''
    $scope.suggestions = []
    $scope.selected = [];


    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };

  });


  document.addEventListener("DOMContentLoaded", function() {
    angular.bootstrap(document.body, ['CryptoWatch']);
  });



}());
