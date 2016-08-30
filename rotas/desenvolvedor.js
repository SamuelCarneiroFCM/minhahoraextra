module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;
	var autenticar = require('../mediador/autenticar');

	app.route('/registro').get(desenvolvedor.novo);
	app.route('/registro/novo').get(desenvolvedor.novo).post(desenvolvedor.post);
	app.route('/listahoraextra').get(autenticar, desenvolvedor.listahoraextra);
	app.route('/edithoraextra/:id').get(autenticar, desenvolvedor.editarhoraextra);

	app.route('/horastrabalhadas').post(autenticar, desenvolvedor.addhoraextra);
	app.route('/edithoraextra/edit/:id').post(desenvolvedor.updatehoraextra);
  app.route('/horaextraatual/delete/:id').post(desenvolvedor.excluirhoraextra);
}
