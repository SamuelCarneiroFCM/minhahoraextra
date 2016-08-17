module.exports = function(app){

	var Desenvolvedor    = app.esquemas.desenvolvedorModel;
	var Horaextra = app.esquemas.horatrabalhadaModel;

	var validacao  = require('../validacoes/autenticacao');

	var SistemaController = {

		addhoraextra: function(req,res){
    	res.render('home/addhoraextra', {'dev' : req.session.desenvolvedor});
    },

		index: function(req, res){
			var data = {dev : req.session.desenvolvedor};
			console.log(data);
			/*
			Horaextra.find({'email': data.email},
				function(err, dados){
					if(err){
						res.redirect('/');
					}else{
						console.log(dados);
						res.render('home/index', {dev: data, 'horas': dados});
					}
			});
      */
			res.render('home/index', {dev : data, horas : 0});
    },

		novo: function(req,res){
    	res.render('home/novo');
    },

		login: function(req,res){
			res.render('home/login');
		},

		autenticacao: function(req,res){
			var emailUPPER = req.body.email;
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
						req.session.desenvolvedor = data;
						Horaextra.find({'email': email},
						  function(err, dados){
								if(err){
									req.flash('erro', 'Erro ao visualizar as horas adicionadas: '+ err);
									res.redirect('/');
								}else{
									console.log(dados);
									res.render('home/index', {dev: data, 'horas': dados});
								}
						});
					}
				});
			}else{
				res.redirect('/');
			}
		},

		excluir: function(req, res){
      console.log(req.params.id);
			Horaextra.remove({_id: req.params.id}, function(err){
				if(err){req.flash('erro', 'Erro ao excluir: ' + err);};
			});

			var data = {dev : req.session.desenvolvedor};
			Horaextra.find({'email': data.email},
				function(err, dados){
					if(err){
						req.flash('erro', 'Erro ao visualizar as horas adicionadas: '+ err);
						res.redirect('/');
					}else{
						console.log(dados);
						res.render('home/index', {dev: data, 'horas': dados});
					}
			});

		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},

	}

	return SistemaController;
}
