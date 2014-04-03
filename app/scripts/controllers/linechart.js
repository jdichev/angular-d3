'use strict';

angular.module('angularD3App')
  .controller('LinechartCtrl', function ($scope) {

    function getRandomInt(min, max) {
      return Math.round(Math.random() * (max - min + 1)) + min;
    }

    function getChartData() {
      return [year + '-' + monthIndex, getRandomInt(20, 400), getRandomInt(20, 1200), getRandomInt(20, 1200)];
    }

    $scope.chartData = [
      ['date', 'col1', 'col2', 'col3']
    ];

    var startYear = 2001,
      years = 6;
    for (var yearsIndex = 0; yearsIndex < years; yearsIndex += 1) {
      var year = startYear + yearsIndex;

      var curChartData;

      for (var monthIndex = 1, months = 12; monthIndex < months; monthIndex += 1) {
        curChartData = curChartData || getChartData();
        if (Math.random() > 0.75) {
          curChartData = getChartData();
          $scope.chartData.push(curChartData);
        }
        else {
          $scope.chartData.push(curChartData);
        }
      }
    }

  });
