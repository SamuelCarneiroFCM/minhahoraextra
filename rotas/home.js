module.exports = function(app){

	var sistema    = app.controller.home;
	var autenticar = require('../mediador/autenticar');

	app.route('/')
		.get(sistema.login)
		.post(sistema.autenticacao);

  app.route('/home').get(autenticar, sistema.index);
	app.route('/logout').get(sistema.logout);

}
