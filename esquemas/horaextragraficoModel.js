var mongoose = require('mongoose');

module.exports = function(){

	var horaextragraficoSchema = mongoose.Schema(
    {
			email : {type: String, trim: true, unique: true, index: true},
		  semanaabreviada : [],
		  totalpordiasemnal: [],
			mensalabreviada : [],
      totalpormensal: []
	  }, {collection: 'horaextragrafico'});

	return mongoose.model('horaextragrafico', horaextragraficoSchema);
}
