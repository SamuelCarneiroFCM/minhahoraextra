var mongoose = require('mongoose');

module.exports = function(){

	var horatrabalhadaSchema = mongoose.Schema({
		 email    : {type: String, trim: true, unique: true, index: true},
		 solicitacao: {type: String, required: true},
		 datainicial: {type: String, required: true},
	   horainicial: {type: String, required: true},
	   datafinal: {type: String, required: true},
	   horafinal: {type: String, required: true},
		 quantidadejornada: {type: String, required: true},
		 data_cad : {type: Date, default: Date.now}
	}, {collection: 'horatrabalhada'});

	return mongoose.model('horatrabalhada', horatrabalhadaSchema);
}



/*
var mongoose = require('mongoose');


var horatrabalhadaSchema = mongoose.Schema({
	 email: {type: String, required: true},
   solicitacao: {type: String, required: true},
	 datainicial: {type: String, required: true},
   horainicial: {type: String, required: true},
   datafinal: {type: String, required: true},
   horafinal: {type: String, required: true},
	 quantidadejornada: {type: String, required: true}
}, {collection: 'horatrabalhada'});

exports.HoraTrabalhada = mongoose.model('horatrabalhada', horatrabalhadaSchema);


exports.savar = function(hora, callback) {

	var horaextra = mongoose.model('horatrabalhada', horatrabalhadaSchema);
	var novahoraextra = new horaextra(hora);

	novahoraextra.save(function(err, result) {

		  if(err)
			{
				 callback({err: 'Não foi possível aplicar a hora trabalhada'})
			}
			else
			{
				callback(result);
        console.log(result);
			}

	});
};


//var mLab = require('../config/serverAPI')('4_ORRUAVsYvu05zO6yWPSvoctiAkTsQb');

exports.list = function(callback){

	var options = {
    database: 'horaextrafcm',
    collectionName: 'horatrabalhada'
  };

  mLab.listDocuments(options, function (err, data) {
	  console.log(data);
		if(err){
      	 callback({err: 'Não foi possível restonar as horas trabalhadas'})
      	}
      else{
      	callback(data);
      }
  });
};


exports.user = function(id, callback){

	var options = {
    database: 'horaextrafcm',
    collectionName: 'horatrabalhada',
    id: id
  };

  mLab.viewDocument(options, function (err, data) {
    console.log(data);
		if(err){
      	 callback({err: 'Não foi possível restonar a hora trabalhada'})
      	}
      else{
      	callback(data)
      }
  });
};


exports.save = function(email, solicitacao, datainicial, horainicial, datafinal, horafinal, callback){
	var documento = {
		'email': email,
    'solicitacao': solicitacao,
    'datainicial': datainicial,
    'horainicial': horainicial,
    'datafinal': datafinal,
    'horafinal': horafinal
		};

	var options = {
		database: 'horaextrafcm',
		collectionName: 'horatrabalhada',
		documents: documento
	 };

	mLab.insertDocuments(options, function (err, data) {
		console.log(data);
		if(err){
			 callback({err: 'Não foi possível gravar a hora extra'})
			}
		else{
			callback(data)
		}
	});
};

exports.update = function(id, solicitacao, datainicial, horainicial, datafinal, horafinal, callback){

	var documento = {
    'solicitacao': solicitacao,
    'datainicial': datainicial,
    'horainicial': horainicial,
    'datafinal': datafinal,
    'horafinal': horafinal
	};

	var options = {
		database: 'horaextrafcm',
		collectionName: 'horatrabalhada',
		id,
		updateObject: documento
	};


	mLab.updateDocument(options, function (err, data) {
		console.log(data);
		if(err){
			 callback({err: 'Não foi possível atualizar os dados da hora extra'})
			}
		else{
			callback(data)
		}
	});
};

exports.delete = function(id, callback){

	var options = {
		database: 'horaextrafcm',
		collectionName: 'horatrabalhada',
		id
	};

	mLab.deleteDocument(options, function (err, data) {
		console.log(data);
		if(err)
		{
			 callback({err: 'Não foi possível deletar hora extra'})
		}
		else
		{
			if(!err){
				callback({reponse: 'hora extra excluido com sucesso.'})
			}
		}
	});
};
*/
