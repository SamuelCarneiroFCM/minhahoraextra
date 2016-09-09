module.exports = function(app){

	var Desenvolvedor = app.esquemas.desenvolvedorModel;
	var Horaextra     = app.esquemas.horatrabalhadaModel;
	var validacao     = require('../validacoes/autenticacao');
	var moment        = require('moment');
	const co = require('co');
	const generate = require('node-chartist');

	var SistemaController = {
		consultahoraextra: function(req, res){
			var dev = req.session.desenvolvedor;
			Horaextra.find({'email': dev.email},
				function(err, dados) {
					if(err){
						req.flash('erro', 'Erro ao listar a hora extra' + err);
						res.render('/consultahoraextra', {dev : dev, listhoras : 0});
					}else{
						res.render('home/consultahoraextra', {dev : dev, listhoras : dados});
					}
			});
    },

		addhoraextra: function(req,res){
    	res.render('home/addhoraextra', {dev : req.session.desenvolvedor});
    },

		index: function(req, res){
			co(function * () {
				  const options = {width: 400, height: 200};
				  const data = {
				    labels: ['a','b','c','d','e'],
				    series: [
				      [1, 2, 3, 4, 5],
				      [3, 4, 5, 6, 7]
				    ]
				  };
				  const bar = yield generate('bar', options, data); //=> chart HTML
				});
			res.render('home/index', {dev: req.session.desenvolvedor});
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
			res.render('home/index', {'dev': req.session.desenvolvedor});
		},

		logout: function(req,res){
			req.session.destroy();
			res.redirect('/');
		},

	}

	return SistemaController;
}
