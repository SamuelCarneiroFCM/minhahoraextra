module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;
	var autenticar = require('../mediador/autenticar');

	app.route('/registro').get(desenvolvedor.novo);
	app.route('/registro/novo').get(desenvolvedor.novo);
	app.route('/listahoraextra').get(autenticar, desenvolvedor.listahoraextra);
	app.route('/edithoraextra').get(autenticar, desenvolvedor.editarhoraextra);
	app.route('/graficos').get(autenticar, desenvolvedor.graficos);

	app.route('/registro/novo').post(desenvolvedor.post);
	app.route('/horastrabalhadas').post(autenticar, desenvolvedor.addhoraextra);
	app.route('/edithoraextra').post(autenticar, desenvolvedor.updatehoraextra);
  app.route('/horaextraatual/delete/:id').post(autenticar, desenvolvedor.excluirhoraextra);
}
