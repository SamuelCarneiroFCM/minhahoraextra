'use strict';

var moment = require("moment");

exports.qtdHora = function (datainicial, horainicial, datafinal, horafinal) {

  var dataIni = new String(datainicial);
  var HoraIni = new String(horainicial);
  var anoini = dataIni.substr(0, 4);
  var mesini = dataIni.substr(5, 2);
  var diaini = dataIni.substr(8, 2);
  var data1 = new Date(anoini, mesini-1, diaini, HoraIni.substr(0, 2), HoraIni.substr(3, 2));

  var dataFin = new String(datafinal);
  var HoraFin = new String(horafinal);
  var anoini = dataFin.substr(0, 4);
  var mesini = dataFin.substr(5, 2);
  var diaini = dataFin.substr(8, 2);
  var data2 = new Date(anoini, mesini-1, diaini, HoraFin.substr(0, 2), HoraFin.substr(3, 2));

  var obterquantidadehora = function(dateOne, dateTwo) {
      var diffInMinutes = dateTwo.diff(dateOne, 'minutes'),
          diffInHours = Math.floor(diffInMinutes / 60); // desconsiderando casas decimais
      diffInMinutes = diffInMinutes - (60 * diffInHours);
      return diffInHours + ':' + diffInMinutes;
  };

  data1 = moment(data1, "DD/MM/YYYY hh:mm");
  data2 = moment(data2, "DD/MM/YYYY hh:mm");
  return obterquantidadehora(data1, data2);
};
