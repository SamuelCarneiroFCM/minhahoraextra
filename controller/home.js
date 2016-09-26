module.exports = function(app){
//	const co          = require('co');
//	const generate    = require('node-chartist');

	var Desenvolvedor = app.esquemas.desenvolvedorModel,
	    Horaextra     = app.esquemas.horatrabalhadaModel,
	    validacao     = require('../validacoes/autenticacao'),
	    moment        = require('moment');

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
			var graficoanual =
				 {
					 labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
					 series: [[5.22, 4, 3, 7, 5, 10, 3, 4, 8, 10, 15, 8]]
				 }
			 var graficosemanal =
			   {
			     labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
			     series: [[5, 4, 3, 2, 1, 0.5]]
			   };
			var data = {'graficoanual': graficoanual, 'graficosemanal': graficosemanal};
			res.json(data);
		},

		index: function(req, res){
      /*
		  var bar = {};
			co(function * (bar) {
			  const options = {width: 400, height: 200};
			  const data = {
			    labels: ['a','b','c','d','e'],
			    series: [
			      [1, 2, 3, 4, 5],
			      [3, 4, 5, 6, 7]
			    ]
			  };
			  bar = yield generate('bar', options, data); //=> chart HTML
			});
      */
			var TotalAnual = "179.00";
      var TotalSemanal = "85.00";
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
