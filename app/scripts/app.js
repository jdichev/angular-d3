'use strict';

angular.module('angularD3App', [
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/lineChart', {
        templateUrl: 'views/linechart.html',
        controller: 'LinechartCtrl'
      })
      .when('/lineChart', {
        templateUrl: 'views/linechart.html',
        controller: 'LinechartCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
