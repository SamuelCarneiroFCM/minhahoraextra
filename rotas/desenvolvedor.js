module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;

<<<<<<< HEAD
	app.route('/registro')
=======
	app.route('/desenvolvedor').get(desenvolvedor.novo);

	app.route('/registro/novo')
>>>>>>> 8dce35f467c970308392532c8a7fe8058ca2a388
		.get(desenvolvedor.novo)
		.post(desenvolvedor.post);

}
