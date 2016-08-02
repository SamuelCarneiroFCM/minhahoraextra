module.exports = function(app){

	var desenvolvedor = app.controller.desenvolvedor;

	app.route('/registro')
		.get(desenvolvedor.novo)
		.post(desenvolvedor.post);

}
