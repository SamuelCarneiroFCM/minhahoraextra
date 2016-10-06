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
      return diffInHours + '.' + diffInMinutes;
  };

  data1 = moment(data1, "DD/MM/YYYY hh:mm");
  data2 = moment(data2, "DD/MM/YYYY hh:mm");
  return obterquantidadehora(data1, data2);
};


exports.DataEmISO = function (data) {
  var datastr = new String(data);
  if (datastr == ''){
    return null;
  }
  else{
    console.log(data);
    var anoini = datastr.substr(6, 4);
    var mesini = datastr.substr(3, 2);
    var diaini = datastr.substr(0, 2);
    console.log(anoini);
    console.log(mesini);
    console.log(diaini);

    var datacorreta = new Date(anoini, mesini-1, diaini, 0, 0).toISOString();
    return datacorreta;
 }
};

exports.UpdateDiaSemanalAtual = function(QtdJornada){
  var up;
  switch (new Date().getDay()) {
      case 0:
          up = {$inc: {"totalpordiasemanal.0": parseFloat(QtdJornada)}};
          break;
      case 1:
          up = {$inc: {"totalpordiasemanal.1": parseFloat(QtdJornada)}};
          break;
      case 2:
          up = {$inc: {"totalpordiasemanal.2": parseFloat(QtdJornada)}};
          break;
      case 3:
          up = {$inc: {"totalpordiasemanal.3": parseFloat(QtdJornada)}};
          break;
      case 4:
          up = {$inc: {"totalpordiasemanal.4": parseFloat(QtdJornada)}};
          break;
      case 5:
          up = {$inc: {"totalpordiasemanal.5": parseFloat(QtdJornada)}};
          break;
      case  6:
          up = {$inc: {"totalpordiasemanal.6": parseFloat(QtdJornada)}};
  };
  return up;
};
