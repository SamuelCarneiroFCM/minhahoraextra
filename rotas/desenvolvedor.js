module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;

	app.route('/desenvolvedor').get(desenvolvedor.novo);

	app.route('/registro/novo')
		.get(desenvolvedor.novo)
		.post(desenvolvedor.post);

}
