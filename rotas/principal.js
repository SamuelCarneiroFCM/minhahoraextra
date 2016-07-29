module.exports = function(app){

	var sistema    = app.controller.principal;
	var autenticar = require('../mediador/autenticar');

	app.route('/')
		.get(sistema.login)
		.post(sistema.autenticacao);
    
	app.route('/logout').get(sistema.logout);

}
