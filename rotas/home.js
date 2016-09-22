module.exports = function(app){

	var home    = app.controller.home;
	var autenticar = require('../mediador/autenticar');

	app.route('/')
		.get(home.login)
		.post(home.autenticacao);

  app.route('/home').get(autenticar, home.index);
	app.route('/home/novo').get(home.novo);

	//Novo desenvolvedor
	app.route('/registro').get(home.novo);
	app.route('/registro/novo').post(home.novo_desenvolvedor);

	app.route('/logout').get(home.logout);
	app.route('/graficos').get(autenticar, home.graficos);

}
