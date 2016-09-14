var dados = {};
var optionsSemanal =
  {
   low: 0,
   showArea: true,
   showPoint: true,
   fullWidth: true
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
  seriesBarDistance: 15
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
