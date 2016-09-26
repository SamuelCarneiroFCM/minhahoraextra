module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;
	var autenticar = require('../mediador/autenticar');

  //Adicionar hora extra
	app.route('/addhoraextra')
	    .get(autenticar, desenvolvedor.addhoraextra)
	    .post(autenticar, desenvolvedor.adicionarhoraextra);

  //Consultar lançamento hora extra
	app.route('/consultahoraextra')
	    .get(autenticar, desenvolvedor.consultahoraextra);
	app.route('/filtrohoraextra')
	    .get(autenticar, desenvolvedor.filtrohoraextra);

  //Editar e exluir hora extra
	app.route('/editar/:id')
	    .get(autenticar, desenvolvedor.editarhoraextra)
	    .post(autenticar, desenvolvedor.gravarhoraextra);

  app.route('/excluir/:id')
        .post(autenticar, desenvolvedor.excluirhoraextra);

}
