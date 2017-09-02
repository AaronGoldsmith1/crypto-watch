angular.module('CryptoWatch')
  .controller('ListController', listController);

listController.$inject = ['$scope', 'ListRepo']

function listController($scope, ListRepo) {
  const self = this;

  self.removeCoinFromList = coin => {
    ListRepo.removeCoin(self.user._id, coin._id).then(res => {
      const coinToRemove = _.indexOf(self.list, coin);
      self.list.splice(coinToRemove, 1)
    })
  }

  self.addCoinToList = coin => {
    ListRepo.addCoin(self.user._id, coin._id).then(res => {
      self.list.push(coin)
    })
  }

  // ListRepo.get($stateParams.id).then(function(res) {
  //   self.list = res.data;
  // });

  ListRepo.get('59938d9aa1685101dbc72c9d').then(data => {
    console.log(data)
    $scope.coins = data.data;
  })

  $scope.getSuggestions = _.debounce(() => {
    console.log("Searching for ", $scope.currentModel);
    const searchTerm = $scope.currentModel;
    ListRepo.search(searchTerm).then(data => {
      console.log("Search results for", searchTerm, data.data.length)
      $scope.suggestions = data.data;
    })
  }, 500);

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
