var mongoose = require('mongoose');

module.exports = function(){

	var horatrabalhadaSchema = mongoose.Schema({
		 email    : {type: String, trim: true, required: true},
		 solicitacao: {type: String, required: true},
		 datainicial: {type: Date, required: true},
	   horainicial: {type: String, required: true},
	   datafinal: {type: Date, required: true},
	   horafinal: {type: String, required: true},
		 quantidadejornada: {type: String, required: true},
		 data_cad : {type: Date, default: Date.now}
	}, {collection: 'horatrabalhada'});

	return mongoose.model('horatrabalhada', horatrabalhadaSchema);
};


