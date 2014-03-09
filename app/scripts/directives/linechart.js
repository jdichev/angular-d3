'use strict';

angular.module('angular-D3-lineChart', [])
  .directive('lineChart', function () {
    return {
      template: '<div></div>',
      scope: {
        lineChartData: '=chartData',
        lineChartConfig: '=chartConfig'
      },
      replace: true,
      restrict: 'AE',
      link: function postLink(scope, element) {
        scope.$watch('lineChartData', function (val) {
          if (typeof val !== 'undefined') {
            go();
          }
        });

        function go() {
          var margins = {
              top: 20,
              right: 20,
              bottom: 30,
              left: 50
            },

            width = element.width() - margins.left - margins.right,

            height = 200 - margins.top - margins.bottom,

            color = d3.scale.category10(),

            parseDate = d3.time.format('%Y-%m').parse,

            x = d3.time.scale()
              .range([0, width]),

            y = d3.scale.linear()
              .range([height, 0]),

            xAxis = d3.svg.axis()
              .scale(x)
              .orient('bottom'),

            yAxis = d3.svg.axis()
              .scale(y)
              .orient('left'),

            line = d3.svg.line()
              // .interpolate('basis')
              .x(function (d) {
                return x(d.date);
              })
              .y(function (d) {
                return y(d.value);
              }),

            svg = d3.select(element[0]).append('svg')
              .attr('width', width + margins.left + margins.right)
              .attr('height', height + margins.top + margins.bottom)
              .append('g')
              .attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

          var data = [];
          for (var i = 1, dataHeaderLength = scope.lineChartData[0].length; i < dataHeaderLength; i += 1) {
            var colData = {
              name: scope.lineChartData[0][i],
              values: []
            }
            for (var j = 1, dataLength = scope.lineChartData.length; j < dataLength; j += 1) {
              colData.values.push({
                date: parseDate(scope.lineChartData[j][0]),
                value: scope.lineChartData[j][i]
              });
            }
            data.push(colData);
          }

          x.domain(d3.extent(scope.lineChartData, function (d) {
            return parseDate(d[0]);
          }));

          y.domain([
            d3.min(data, function (c) {
              return d3.min(c.values, function (v) {
                return v.value;
              });
            }),
            d3.max(data, function (c) {
              return d3.max(c.values, function (v) {
                return v.value;
              });
            })
          ]);

          svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

          svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('values');

          var column = svg.selectAll('.data-column')
            .data(data)
            .enter().append('g')
            .attr('class', 'data-column');

          column.append('path')
            .attr('class', 'line')
            .attr('d', function(d) { return line(d.values); })
            .style('stroke', function(d) { return color(d.name); });

        } // end go()

      }
    };
  });

