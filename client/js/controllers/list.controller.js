angular.module('CryptoWatch')
  .controller('ListController', listController);

listController.$inject = ['ListRepo', '$stateParams']

function listController(listRepo, $stateParams) {
  var self = this;

  self.removeCoinFromList = function(coin) {
    listRepo.removeCoin(self.user._id, coin._id).then(function(res) {
      var coinToRemove = _.indexOf(self.list, coin)
      self.list.splice(coinToRemove, 1)
    })
  }

  listRepo.get($stateParams.id).then(function(res) {
    self.list = res.data;
  });

}
