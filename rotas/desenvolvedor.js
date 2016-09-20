module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;
	var autenticar = require('../mediador/autenticar');

	app.route('/registro').get(desenvolvedor.novo);
	app.route('/registro/novo').get(desenvolvedor.novo);
	app.route('/listahoraextra').get(autenticar, desenvolvedor.listahoraextra);
	app.route('/editarhoraextra/:id').get(autenticar, desenvolvedor.editarhoraextra);
	app.route('/graficos').get(autenticar, desenvolvedor.graficos);

	app.route('/registro/novo').post(desenvolvedor.post);
	app.route('/horastrabalhadas').post(autenticar, desenvolvedor.addhoraextra);
	app.route('/editarhoraextra').post(autenticar, desenvolvedor.updatehoraextra);
  app.route('/excluirhoraextra').post(autenticar, desenvolvedor.excluirhoraextra);
}
