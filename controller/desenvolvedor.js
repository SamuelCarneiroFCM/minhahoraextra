module.exports = function(app){
	var validacao = require('../validacoes/desenvolvedor.js');
	var validacaohora = require('../validacoes/horaextra.js');
	var Desenvolvedor = app.esquemas.desenvolvedorModel;
	var Horaextra = app.esquemas.horatrabalhadaModel;
	var funcoes = require('../config/funcoes.js');


	var DesenvolvedorController = {

		addhoraextra: function(req,res){
    	res.render('horaextra/adicionar');
    },

		adicionarhoraextra: function(req,res){
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
						res.render('horaextra/adicionar');
					}else{
						req.flash('info', 'Registro cadastrado com sucesso!');
						res.redirect('/addhoraextra');
					}
				});
			}
			else{
				res.render('horaextra/adicionar');
			}
		},

		consultahoraextra: function(req, res){
			var dev = req.session.desenvolvedor;
			Horaextra.find({'email': dev.email},
				function(err, dados) {
					if(err){
						req.flash('erro', 'Erro ao localizar a hora extra' + err);
						res.render('horaextra/consultar', {listhoras : 0});
					}else{
						res.render('horaextra/consultar', {listhoras : dados});
					}
			});
    },

		filtrohoraextra: function(req, res){
      var email = req.query.email;
      var dataini = funcoes.DataEmISO(req.query.datainicial);
			var datafim = funcoes.DataEmISO(req.query.datafinal);

      if(dataini == null || datafim == null){
				req.flash('erro', 'Informe um período de data');
				res.render('horaextra/consultar', {listhoras : req.body});
			}
			else{
	      var filter = {
					  "email": email,
						$or:[{"datainicial": {$gte: dataini, $lte: dataini}}, {"datafinal": {$gte: datafim, $lte: datafim}}]
					};
				Horaextra.find(filter,
					function(err, dados) {
						if(err){
							req.flash('erro', 'Erro ao listar a hora extra' + err);
							res.render('horaextra/consultar', {listhoras : req.body});
						}else{
							res.render('horaextra/consultar', {listhoras : dados});
						}
				});
		 }
		},

		editarhoraextra: function(req, res){
			Horaextra.findById(req.params.id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao editar: ' + err);
					res.redirect('/horaextra/consultar');
				}else{
					res.render('horaextra/editar', {hora: dados});
				}
			});
		},

		gravarhoraextra: function(req, res){
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
							res.render('horaextra/editar', {hora: hora});
						}else{
							req.flash('info', 'Registro atualizado com sucesso!');
							res.render('horaextra/editar', {hora: req.body});
						}
					});
				});
			}else{
				res.render('horaextra/editar', {hora: req.body});
			}
		},

		excluirhoraextra: function(req, res){
			Horaextra.remove({'_id': req.params.id}, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao excluir: '+ err);
					res.render('horaextra/consultar');
				}else{
					req.flash('info', 'Registro excluído com sucesso!');
					res.render('horaextra/consultar', {listhoras : dados});
				}
			});
		}

	}

	return DesenvolvedorController;
}
