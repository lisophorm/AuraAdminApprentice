/**
 * Created by osboxes on 23/04/15.
 */
myApp.controller('FlotCtrl', ['$scope',  function($scope) {
    $scope.ticks = [
        [0, "London"], [1, "New York"], [2, "New Delhi"], [3, "Taipei"], [4, "Beijing"], [5, "Sydney"]
    ];
    $scope.dataset = [{ data: [], yaxis: 1, label: "sin" }];
    $scope.options = {
        series: {
            bars: {
                show: true
            }
        },
        bars: {
            align: "center",
            barWidth: 0.5
        },
        xaxis: {
            axisLabel: "World Cities",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 10,
            ticks: ticks
        },
        yaxis: {
            axisLabel: "Average Temperature",
            axisLabelUseCanvas: true,
            axisLabelFontSizePixels: 12,
            axisLabelFontFamily: 'Verdana, Arial',
            axisLabelPadding: 3,
            tickFormatter: function (v, axis) {
                return v + "°C";
            }
        },
        legend: {
            noColumns: 0,
            labelBoxBorderColor: "#000000",
            position: "nw"
        },
        grid: {
            hoverable: true,
            borderWidth: 2,
            backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
        }
    };
    console.log("calling chart controller");
    for (var i = 0; i < 14; i += 0.5) {
        $scope.dataset[0].data.push([i, Math.sin(i)]);
    }
}]);

