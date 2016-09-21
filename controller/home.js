module.exports = function(app){
//	const co          = require('co');
//	const generate    = require('node-chartist');

	var Desenvolvedor = app.esquemas.desenvolvedorModel,
	    Horaextra     = app.esquemas.horatrabalhadaModel,
	    validacao     = require('../validacoes/autenticacao'),
	    moment        = require('moment');

	var SistemaController = {

		consultahoraextra: function(req, res){
			var dev = req.session.desenvolvedor;
			Horaextra.find({'email': dev.email},
				function(err, dados) {
					if(err){
						req.flash('erro', 'Erro ao listar a hora extra' + err);
						res.render('home/consultahoraextra', {listhoras : 0});
					}else{
						res.render('home/consultahoraextra', {listhoras : dados});
					}
			});
    },

		addhoraextra: function(req,res){
    	res.render('home/addhoraextra');
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

		excluir: function(req, res){
			Horaextra.remove({_id: req.params.id}, function(err){
				if(err)
				  {req.flash('erro', 'Erro ao excluir: ' + err);
			  };
			});
			res.redirect('home/index');
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},

	}

	return SistemaController;
}
