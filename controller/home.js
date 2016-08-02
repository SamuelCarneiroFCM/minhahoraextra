module.exports = function(app){

	var Desenvolvedor    = app.esquemas.desenvolvedorModel;
	var validacao  = require('../validacoes/autenticacao');

	var SistemaController = {

		index: function(req,res){
    	res.render('home/index');
    },

		login: function(req,res){
<<<<<<< HEAD:controller/home.js
			res.render('home/login');
=======
			console.log('passou aqui login');
			res.render('login');
>>>>>>> 8dce35f467c970308392532c8a7fe8058ca2a388:controller/principal.js
		},

		autenticacao: function(req,res){
			var desenvolvedor  = new Desenvolvedor();
			var email          = req.body.email;
			var senha          = req.body.senha;

			if(validacao(req, res)){
				Desenvolvedor.findOne({'email': email}, function(err,data){
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
						res.render('home/index', {'dev': data.nome})
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
