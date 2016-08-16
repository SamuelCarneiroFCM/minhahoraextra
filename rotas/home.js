module.exports = function(app){

	var home    = app.controller.home;
	var autenticar = require('../mediador/autenticar');

	app.route('/')
		.get(home.login)
		.post(home.autenticacao);

	app.route('/home/novo').get(home.novo);
  app.route('/home').get(autenticar, home.index);
	app.route('/logout').get(home.logout);
	app.route('/addhoraextra').get(autenticar, home.addhoraextra);
	
}
