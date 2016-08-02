module.exports = function(app){

	var Desenvolvedor    = app.esquemas.desenvolvedorModel;
	var validacao  = require('../validacoes/autenticacao');

	var SistemaController = {

		index: function(req,res){
    	res.render('home/index');
    },

		login: function(req,res){
			res.render('home/login');
		},

		autenticacao: function(req,res){
			var desenvolvedor  = new Desenvolvedor();
			var email          = req.body.email;
			var senha          = req.body.senha;

			if(validacao(req, res)){
				Desenvolvedor.findOne({'email': email}, function(err, data){
					if(err){
						req.flash('erro', 'Erro ao entrar no sistema: '+err);
						res.redirect('/');
					}else if(!data){
						req.flash('erro', 'E-mail não encontrado!');
						res.redirect('/');
					}else if(!desenvolvedor.validPassword(senha, data.senha)){
						req.flash('erro', 'Senha não confere!');
						res.redirect('/');
					}else{
						console.log(data);
						req.session.desenvolvedor = data;
						res.render('home/index', {'dev': data})
					//	res.redirect('/home');
					}
				});
			}else{
				res.redirect('/');
			}
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},

	}

	return SistemaController;
}
