module.exports = function(app){
	var validacao = require('../validacoes/desenvolvedor');
	var Desenvolvedor = app.esquemas.desenvolvedorModel;

	var DesenvolvedorController = {

		novo: function(req,res){
			  res.render('home/novo');
		},

		post: function(req,res){
			if(validacao(req, res)){
				var esquema         = new Desenvolvedor();
				esquema.nome        = req.body.nome;
				esquema.email       = req.body.email;
				esquema.senha       = esquema.generateHash(req.body.senha);
				esquema.salario     = req.body.salario;
				esquema.horasemanal = req.body.horasemanal; 

				Desenvolvedor.findOne({'email': esquema.email}, function(err,data){
					if(data){
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
						res.render('home/novo', {'dev': data});
					}else{
						esquema.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar: ' + err);
								res.render('home/novo');
							}else{
								req.flash('info', 'Registro cadastrado com sucesso!');
								req.session.desenvolvedor = esquema;
								res.render('home/index', {'dev': esquema});
							}
						});
					}
				});
			}else{
				res.render('home/novo', {'dev': esquema});
			}
		}
	}

	return DesenvolvedorController;
}
