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
          break;
  };
  return up;
};

exports.UpdatePorMensalAtual = function(QtdJornada){
  var up;
  switch (new Date().getMonth()) {
      case 0:
          up = {$inc: {"totalpormensal.0": parseFloat(QtdJornada)}};
          break;
      case 1:
          up = {$inc: {"totalpormensal.1": parseFloat(QtdJornada)}};
          break;
      case 2:
          up = {$inc: {"totalpormensal.2": parseFloat(QtdJornada)}};
          break;
      case 3:
          up = {$inc: {"totalpormensal.3": parseFloat(QtdJornada)}};
          break;
      case 4:
          up = {$inc: {"totalpormensal.4": parseFloat(QtdJornada)}};
          break;
      case 5:
          up = {$inc: {"totalpormensal.5": parseFloat(QtdJornada)}};
          break;
      case 6:
          up = {$inc: {"totalpormensal.6": parseFloat(QtdJornada)}};
          break;
      case 7:
          up = {$inc: {"totalpormensal.7": parseFloat(QtdJornada)}};
          break;
      case 8:
          up = {$inc: {"totalpormensal.8": parseFloat(QtdJornada)}};
          break;
      case 9:
          up = {$inc: {"totalpormensal.9": parseFloat(QtdJornada)}};
          break;
      case 10:
          up = {$inc: {"totalpormensal.10": parseFloat(QtdJornada)}};
          break;
      case 11:
          up = {$inc: {"totalpormensal.11": parseFloat(QtdJornada)}};
          break;
  };
  return up;
};
