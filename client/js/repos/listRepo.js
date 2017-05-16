angular.module('CryptoWatch')
  .factory('ListRepo', listRepo);

listRepo.inject = ['$http']

function listsRepo($http) {
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
    }
  }
}
