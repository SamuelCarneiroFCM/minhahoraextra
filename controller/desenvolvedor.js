module.exports = function(app){
	var validacao = require('../validacoes/desenvolvedor');
	var Desenvolvedor = app.esquemas.desenvolvedorModel;

	var DesenvolvedorController = {
		novo: function(req,res){
			  res.render('home/novo', {dev: new Desenvolvedor()});
		},

		post: function(req,res){
			if(validacao(req, res)){
				var esquema      = new Desenvolvedor();
				esquema.nome     = req.body.nome;
				esquema.email    = req.body.email;
				esquema.senha    = esquema.generateHash(req.body.senha);

				Desenvolvedor.findOne({'email': esquema.email}, function(err,data){
					if(data){
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
						res.render('home/novo', {dev: esquema});
					}else{
						esquema.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar: '+err);
								res.render('home/novo', {dev: esquema});
							}else{
								req.flash('info', 'Registro cadastrado com sucesso!');
								res.render('/');
							}
						});
					}
				});
			}else{
				res.render('home/novo', {dev: esquema});
			}
		}
	}

	return DesenvolvedorController;
}
