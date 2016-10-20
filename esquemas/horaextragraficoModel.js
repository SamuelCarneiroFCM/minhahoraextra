var mongoose = require('mongoose');

module.exports = function(){

	var horaextragraficoSchema = mongoose.Schema(
    {
		  email : {type: String, trim: true, unique: true, index: true},
		  semanalabreviada : [],
		  totalpordiasemanal: [],
		  valorpordiasemanal: [],
		  mensalabreviada : [],
          totalpormensal: [],
		  valorpormensal: []
	  }, {collection: 'horaextragrafico'});

	return mongoose.model('horaextragrafico', horaextragraficoSchema);
	
};


