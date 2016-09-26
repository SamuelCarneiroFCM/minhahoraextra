var dados = {};
var optionsSemanal =
  {
   low: 0,
   high: 20,
   showArea: true,
   showPoint: true,
   fullWidth: false,
   plugins: [Chartist.plugins.tooltip()]
  };

var chartsemanal = new Chartist.Line('#chartsemanal', dados, optionsSemanal);

chartsemanal.on('draw', function(data) {
  if(data.type === 'line' || data.type === 'area') {
    data.element.animate({
      d: {
        begin: 2000 * data.index,
        dur: 2000,
        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
        to: data.path.clone().stringify(),
        easing: Chartist.Svg.Easing.easeOutQuint
      }
    });
  }
});

var data = {};
var options = {
  seriesBarDistance: 15,
  plugins: [Chartist.plugins.tooltip()]
};
var responsiveOptions = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 10,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];
var chartanual = new Chartist.Bar('#chartanual', data, options, responsiveOptions);

$.get( "/graficos", function( dados ) {
  chartanual.update(dados.graficoanual);
  chartsemanal.update(dados.graficosemanal);
});



/*

var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var randomScalingFactor = function() {
    return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
    return Math.round(Math.random() * 255);
};
var randomColor = function() {
    return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
};
var barChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        label: 'Dataset 1',
        backgroundColor: "rgba(220,220,220,0.5)",
        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    }, {
        hidden: true,
        label: 'Dataset 2',
        backgroundColor: "rgba(151,187,205,0.5)",
        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    }, {
        label: 'Dataset 3',
        backgroundColor: "rgba(151,187,205,0.5)",
        data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
    }]
};

window.onload = function() {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myBar = new Chart(ctx, {
      type: 'bar',
      data: barChartData,
      options: {
          elements: {
              rectangle: {
                  borderWidth: 2,
                  borderColor: 'rgb(0, 255, 0)',
                  borderSkipped: 'bottom'
              }
          },
          responsive: true,
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Chart.js Bar Chart'
          }
      }
  });
};

*/
