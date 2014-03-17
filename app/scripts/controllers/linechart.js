'use strict';

angular.module('angularD3App')
  .controller('LinechartCtrl', function ($scope) {

    function getRandomInt(min, max) {
      return Math.round(Math.random() * (max - min + 1)) + min;
    }

    $scope.chartData = [
      ['date', 'col1', 'col2', 'col3']
    ];

    var startYear = 2001,
      years = 6;
    for (var yearsIndex = 0; yearsIndex < years; yearsIndex += 1) {
      var year = startYear + yearsIndex;
      for (var monthIndex = 1, months = 12; monthIndex < months; monthIndex += 1) {
        $scope.chartData.push(
          [year + '-' + monthIndex, getRandomInt(20, 1200), getRandomInt(20, 1200), getRandomInt(20, 1200)]
        );
      }
    }

  });
