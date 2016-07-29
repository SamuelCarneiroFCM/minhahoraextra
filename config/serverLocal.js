var mongoose = require('mongoose');

var mongodbUri = 'mongodb://admin:f22ab212ce@ds021943.mlab.com:21943/horaextrafcm';

mongoose.connect(mongodbUri);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));

db.once('open', function() {

  var desenvolvedoresSchema = mongoose.Schema({
  	 nome: String,
  	 email: String,
  	 senha: String
  });

  exports.Desenvolvedores = mongoose.model('desenvolvedores', desenvolvedoresSchema);

  var horastrabalhadasSchema = mongoose.Schema({
  	email: String,
  	solicitacao: String,
    datainicial: String,
    horainicial: String,
    datafinal: String,
    horafinal: String
  });

  exports.Horatrabalhada = mongoose.model('horatrabalhada', horastrabalhadasSchema);

});
