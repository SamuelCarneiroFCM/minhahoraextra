module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;
	var autenticar = require('../mediador/autenticar');

	app.route('/registro').get(desenvolvedor.novo);

	app.route('/registro/novo')
		.get(desenvolvedor.novo)
		.post(desenvolvedor.post);

	app.route('/horastrabalhadas').
	  post(autenticar, desenvolvedor.addhoraextra);	

}
