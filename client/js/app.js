(function() {


  var app = angular.module('CryptoWatch', ['ngMaterial', 'md.data.table', 'ngRoute']);
  app.config(['$mdThemingProvider', '$locationProvider', '$routeProvider', function($mdThemingProvider, $locationProvider, $routeProvider) {
    'use strict';
    $routeProvider
      .when('/list', {
        templateUrl: 'templates/list.html',
        controller: 'ListController',
      })

    $mdThemingProvider.theme('default')
      .primaryPalette('blue');
  }])





  document.addEventListener("DOMContentLoaded", function() {
    angular.bootstrap(document.body, ['CryptoWatch']);
  });



}());
