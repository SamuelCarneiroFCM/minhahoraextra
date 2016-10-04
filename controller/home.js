module.exports = function(app){
	var Desenvolvedor       = app.esquemas.desenvolvedorModel,
	    Horaextra           = app.esquemas.horatrabalhadaModel,
			HoraExtraGrafico    = app.esquemas.horaextragraficoModel,
	    validacao           = require('../validacoes/autenticacao'),
	    moment              = require('moment');

	var SistemaController = {

    //====================================================HOME==================
		autenticacao: function(req, res){
			var desenvolvedor  = new Desenvolvedor();
			var email          = req.body.email;
			var senha          = req.body.senha;

			if(validacao(req, res)){
				Desenvolvedor.findOne({'email': email}, function(err, data){
					if(err){
						req.flash('erro', 'Erro ao entrar no sistema: ' + err);
						res.redirect('/');
					}else if(!data){
						req.flash('erro', 'E-mail não encontrado!');
						res.redirect('/');
					}else if(!desenvolvedor.validPassword(senha, data.senha)){
						req.flash('erro', 'Senha não confere!');
						res.redirect('/');
					}else{
						req.session.desenvolvedor = data;
						res.redirect('/home');
					}
				});
			}else{
				res.redirect('/');
			}
		},

		graficos: function(req,res){
			var dev = req.session.desenvolvedor;
			HoraExtraGrafico.findOne({'email': dev.email}, function(err, data){
				if(err){
					req.flash('erro', 'Erro ao carregar gráfico: ' + err);
				}
				else{
					if (data == null) {
						var esquemagrafico = new HoraExtraGrafico();
						esquemagrafico.email = dev.email;
						esquemagrafico.semanalabreviada   = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
						esquemagrafico.totalpordiasemanal = [0, 0, 0, 0, 0, 0, 0];
            esquemagrafico.valorpordiasemanal = [0, 0, 0, 0, 0, 0, 0];
						esquemagrafico.mensalabreviada   = ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
						esquemagrafico.totalpormensal    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						esquemagrafico.valorpormensal    = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
						esquemagrafico.save(function(erro){
						  if(erro)
							{
								 req.flash('erro', 'Erro ao carregar gráfico: ' + err);
						  }
						 });
						 res.json({
									'graficomensal': {labels: esquemagrafico.mensalabreviada, series: [esquemagrafico.totalpormensal]},
									'graficosemanal': {labels: esquemagrafico.semanalabreviada, series: [esquemagrafico.totalpordiasemanal]}
								});
					} else {
   						res.json({
								 'graficomensal': {labels: data.mensalabreviada, series: [data.totalpormensal]},
								 'graficosemanal': {labels: data.semanalabreviada, series: [data.totalpordiasemanal]}
							 });
					}
			  }
			});
		},

		index: function(req, res){
			var TotalAnual = "179.00";
      var TotalSemanal = "100.00";
			res.render('home/index', {totais : {TotalAnual, TotalSemanal}});
    },

		novo: function(req,res){
    	res.render('home/novo');
    },

		novo_desenvolvedor: function(req,res){
			if(validacao(req, res)){
				var esquema         = new Desenvolvedor();
				esquema.nome        = req.body.nome;
				esquema.email       = req.body.email;
				esquema.senha       = esquema.generateHash(req.body.senha);
				esquema.salario     = req.body.salario;
				esquema.horasemanal = req.body.horasemanal;
				esquema.fator       = req.body.fator;

				Desenvolvedor.findOne({'email': esquema.email}, function(err, data){
					if(data){
						req.flash('erro', 'E-mail encontra-se cadastrado, tente outro.');
						res.render('home/novo', {dev: data});
					}else{
						esquema.save(function(err){
							if(err){
								req.flash('erro', 'Erro ao cadastrar: ' + err);
								res.render('home/novo');
							}else{
								req.flash('info', 'Registro cadastrado com sucesso!');
								req.session.desenvolvedor = esquema;
								res.redirect('/home');
							}
						});
					}
				});
			}else{
				res.render('home/novo');
			}
		},

		login: function(req,res){
			res.render('home/login');
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		}

//=============================================================================

	}

	return SistemaController;
}
