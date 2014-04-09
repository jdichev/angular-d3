'use strict';

angular.module('angularD3App')
  .controller('LinechartCtrl', function ($scope) {

    function RandomGenerator() {
      this.randomCache = {};
    }

    RandomGenerator.prototype.getInt = function(min, max, cacheId) {
      if (this.randomCache.hasOwnProperty(cacheId) && Math.random() > 0.33) {
        return this.randomCache[cacheId];
      }

      var randomInt = Math.round(Math.random() * (max - min + 1)) + min;
      this.randomCache[cacheId] = randomInt;
      return randomInt;
    };

    var randomGenerator = new RandomGenerator();

    function getChartData(year, monthIndex) {
      return [
        year + '-' + monthIndex,
        randomGenerator.getInt(20, 400, '1'),
        randomGenerator.getInt(20, 1200, '2'),
        randomGenerator.getInt(20, 1200, '3')
      ];
    }

    var chartData = [
      ['date', 'col1', 'col2', 'col3']
    ];

    var startYear = 2001,
      years = 6;
    for (var yearsIndex = 0; yearsIndex < years; yearsIndex += 1) {
      var year = startYear + yearsIndex;

      for (var monthIndex = 1, months = 12; monthIndex < months; monthIndex += 1) {
        chartData.push(getChartData(year, monthIndex));
      }
    }

    $scope.chartData = chartData;

  });
