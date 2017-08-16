angular.module('CryptoWatch')
  .controller('ListController', listController);

listController.$inject = ['$scope', 'ListRepo']

function listController($scope, ListRepo) {
  var self = this;

  self.removeCoinFromList = function(coin) {
    ListRepo.removeCoin(self.user._id, coin._id).then(function(res) {
      var coinToRemove = _.indexOf(self.list, coin)
      self.list.splice(coinToRemove, 1)
    })
  }

  self.addCoinToList = function(coin) {
    ListRepo.addCoin(self.user._id, coin._id).then(function(res) {
      self.list.push(coin)
    })
  }

  // ListRepo.get($stateParams.id).then(function(res) {
  //   self.list = res.data;
  // });

  ListRepo.get('59938d9aa1685101dbc72c9d').then(function(data) {
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

}
