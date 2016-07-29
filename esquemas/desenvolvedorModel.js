var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');

module.exports = function(){

	var desenvolvedoresSchema = mongoose.Schema({
		 nome     : {type: String, trim: true, required: true},
		 email    : {type: String, trim: true, unique: true, index: true},
		 senha    : {type: String, required: true},
		 data_cad : {type: Date, default: Date.now}
	}, {collection: 'desenvolvedores'});

	desenvolvedoresSchema.methods.generateHash = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
	};

	desenvolvedoresSchema.methods.validPassword = function(password, old_password){
		return bcrypt.compareSync(password, old_password, null);
	}

	return mongoose.model('desenvolvedores', desenvolvedoresSchema);
}
/*
var desenvolvedoresSchema = mongoose.Schema({
	 nome: {type: String, required: true},
	 email: {type: String, required: true},
	 senha: {type: String, required: true}
}, {collection: 'desenvolvedores'});

desenvolvedoresSchema.methods.gerarsenhaHASH = function(senha) {
    return bcrypt.hashSync(senha, bcrypt.genSaltSync(8), null);
};

desenvolvedoresSchema.methods.validarsenha = function(senha) {
    return bcrypt.compareSync(senha, this.senha);
};

exports.Desenvolvedores = mongoose.model('desenvolvedores', desenvolvedoresSchema);


exports.localizardesenvolvedor = function(email, callback) {

	var dev = mongoose.model('desenvolvedores', desenvolvedoresSchema);
  dev.findOne({email : email}, function(err, result){
		if(err)
		{
			 callback({err: 'Não foi possível localizar o desenvolvedor'})
		}
		else
		{
			callback(result);
			console.log('trance dev: ' + result);
		}
	});
}


//Usando a API do mlab

var mLab = require('./serverAPI')('4_ORRUAVsYvu05zO6yWPSvoctiAkTsQb');

exports.list = function(callback){
	var options = {
    database: 'horaextrafcm',
    collectionName: 'desenvolvedores'
  };

  mLab.listDocuments(options, function (err, data) {
	  console.log(data);
		if(err){
      	 callback({err: 'Não foi possível restonar os desenvolvedores'})
      	}
      else{
      	callback(data);
      }
  });
};

exports.user = function(id, callback){

	var options = {
    database: 'horaextrafcm',
    collectionName: 'desenvolvedores',
    id: id
  };

  mLab.viewDocument(options, function (err, data) {
    console.log(data);
		if(err){
      	 callback({err: 'Não foi possível restonar o desenvolvedor'})
      	}
      else{
      	callback(data)
      }
  });
};

exports.save = function(nome, email, senha, callback){

	var documento = {
		'nome': nome,
		'email': email,
		'senha': senha
		};

	var options = {
		database: 'horaextrafcm',
		collectionName: 'desenvolvedores',
		documents: documento
	 };

	mLab.insertDocuments(options, function (err, data) {
		console.log(data);
		if(err){
			 callback({err: 'Não foi possível criar o desenvolvedor'})
			}
		else{
			callback(data)
		}
	});
};

exports.update = function(id, nome, email, senha, callback){

	var documento = {
	'nome': nome,
	'email': email,
	'senha': senha
	};

	var options = {
		database: 'horaextrafcm',
		collectionName: 'desenvolvedores',
		id,
		updateObject: documento
	};

	mLab.updateDocument(options, function (err, data) {
		console.log(data);
		if(err){
			 callback({err: 'Não foi possível alterar os dados do desenvolvedor'})
			}
		else{
			callback(data)
		}
	});
}

exports.delete = function(id, callback){

	var options = {
		database: 'horaextrafcm',
		collectionName: 'desenvolvedores',
		id
	};

	mLab.deleteDocument(options, function (err, data) {
		console.log(data);
		if(err)
		{
			 callback({err: 'Não foi possível deletar o desenvolvedor'})
		}
		else
		{
			if(!err)
	   	{
				callback({reponse: 'Usuário excluido com sucesso.'})
		  }
	 }
	});
}
*/
