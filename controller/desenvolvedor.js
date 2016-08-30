module.exports = function(app){
	var validacao = require('../validacoes/desenvolvedor.js');
	var validacaohora = require('../validacoes/horaextra.js');
	var Desenvolvedor = app.esquemas.desenvolvedorModel;
	var Horaextra = app.esquemas.horatrabalhadaModel;
	var funcoes = require('../config/funcoes.js');


	var DesenvolvedorController = {

		novo: function(req,res){
			  res.render('home/novo');
		},

		editarhoraextra: function(req,res){
			Horaextra.findById(req.params.id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao editar: ' + err);
					res.render('home/index', {dev : req.session.desenvolvedor});
				}else{
					res.render('home/edithoraextra', {hora: dados});
				}
			});
		},

		listahoraextra: function(req, res){
      var email = req.query.email;
      var datainicial = funcoes.DataEmISO(req.query.datainicial);
			var datafinal = funcoes.DataEmISO(req.query.datafinal);
      var filter = {
				  "email": email,
					'$or': [{"datainicial": {'$gte': datainicial}}, {"datafinal": {'$lte': datafinal}}]
				};

			Horaextra.find(filter,
				function(err, dados) {
					if(err){
						req.flash('erro', 'Erro ao listar a hora extra' + err);
						res.render('/consultahoraextra', {'dev' : req.session.desenvolvedor, listhoras : req.body});
					}else{
						res.render('home/consultahoraextra', {'dev' : req.session.desenvolvedor, listhoras : dados});
					}
			});
		},

		addhoraextra: function(req,res){

			if(validacaohora(req, res)){
				var qtdhora = funcoes.qtdHora(req.body.datainicial, req.body.horainicial,
					req.body.datafinal, req.body.horafinal);

				var hora = {
					email: req.body.email,
					solicitacao: req.body.solicitacao,
					datainicial: funcoes.DataEmISO(req.body.datainicial),
					horainicial: req.body.horainicial,
					datafinal: funcoes.DataEmISO(req.body.datafinal),
					horafinal: req.body.horafinal,
					quantidadejornada: qtdhora
				};

				var horas = new Horaextra(hora);

				horas.save(function(err, result) {
					if(err){
						req.flash('erro', 'Erro ao cadastrar a hora extra' + err);
						res.render('home/addhoraextra', {dev : req.session.desenvolvedor});
					}else{
						req.flash('info', 'Registro cadastrado com sucesso!');
						res.render('home/addhoraextra', {dev: req.session.desenvolvedor});
					}
				});
			}
			else{
				res.render('home/addhoraextra', {dev : req.session.desenvolvedor});
			}
		},

		updatehoraextra: function(req,res){
			if(validacaohora(req, res)){
				Horaextra.findById(req.params.id, function(err, dados){
					var hora    = dados;
					var qtdhora = funcoes.qtdHora(req.body.datainicial, req.body.horainicial,
						req.body.datafinal, req.body.horafinal);

					hora.email       = req.body.email;
					hora.solicitacao = req.body.solicitacao;
					hora.datainicial = req.body.datainicial;
					hora.horainicial = req.body.horainicial;
					hora.datafinal   = req.body.datafinal;
					hora.horafinal   = req.body.horafinal;
					hora.quantidadejornada = qtdhora;

					hora.save(function(err){
						if(err){
							req.flash('erro', 'Erro ao atualizar: ' + err);
							res.render('home/edithoraextra', {hora: hora});
						}else{
							req.flash('info', 'Registro atualizado com sucesso!');
							res.render('home/edithoraextra', {hora: req.body});
						}
					});
				});
			}else{
				res.render('home/edithoraextra', {hora: req.body});
			}
		},

		excluirhoraextra: function(req, res){
      console.log(req.query.id);

			Horaextra.remove({_id: req.query.id}, function(err){
				if(err){
					req.flash('erro', 'Erro ao excluir: '+ err);
					res.redirect('/listahoraextra');

				}else{
					req.flash('info', 'Registro excluído com sucesso!');
					res.redirect('/listahoraextra');
				}
			});
		},

		post: function(req,res){
			if(validacao(req, res)){
				var esquema         = new Desenvolvedor();
				esquema.nome        = req.body.nome;
				esquema.email       = req.body.email;
				esquema.senha       = esquema.generateHash(req.body.senha);
				esquema.salario     = req.body.salario;
				esquema.horasemanal = req.body.horasemanal;
				esquema.fator       = req.body.fator;

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
