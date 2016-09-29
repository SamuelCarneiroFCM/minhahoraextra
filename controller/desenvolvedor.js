module.exports = function(app){
	var validacao         = require('../validacoes/desenvolvedor.js'),
	    validacaohora     = require('../validacoes/horaextra.js'),
	    Desenvolvedor     = app.esquemas.desenvolvedorModel,
	    Horaextra         = app.esquemas.horatrabalhadaModel,
			HoraExtraGrafico  = app.esquemas.horaextragraficoModel,
      moment            = require('moment'),
	    funcoes           = require('../config/funcoes.js');


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
					datainicial: moment(req.body.datainicial).format('L'),
					horainicial: req.body.horainicial,
					datafinal: moment(req.body.datafinal).format('L'),
					horafinal: req.body.horafinal,
					quantidadejornada: qtdhora
				};

				var horas = new Horaextra(hora);
				horas.save(function(err, hora) {
					if(err){
						req.flash('erro', 'Erro ao cadastrar a hora extra' + err);
						res.render('horaextra/adicionar');
					}else{
						/*
						var DiaDeSemanaValido = moment(hora.datafinal).weekday();
            HoraExtraGrafico.findOneAndUpdate({'email': hora.email}, {$set: {"totalpordiasemnal.2": 15}}, function(erro, grafico){
              if(erro){
								req.flash('erro', 'Erro ao atualizar o gráfico' + erro);
							}else{
							}
						});
						*/
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
			var email = dev.email;
			var dataini = moment().subtract(20, 'days').calendar();
			var datafim = moment().format('L');
			console.log(dataini);
			console.log(datafim);
      var filter = {
				  "email": email,
					$or:[{"datainicial": {$gte: dataini, $lte: dataini}}, {"datafinal": {$gte: datafim, $lte: datafim}}]
				};
			Horaextra.find(filter,
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
			var solicitacao = req.query.solicitacao;
      var dataini = moment(req.query.datainicial).format('L');
			var datafim = moment(req.query.datafinal).format('L');
      if (solicitacao == ''){
				solicitacao = {$ne: ""};
			}
			console.log(dataini);
			console.log(datafim);
			//Se tiver nulas as datas pego de 20 dias atrás
      if(dataini == '' || datafim == ''){
				var dataini = moment().subtract(20, 'days').calendar();
				var datafim = moment().format('L');
			};
			console.log(dataini);
			console.log(datafim);
      var filter = {
				  "email": email,
					"solicitacao": solicitacao,
					$or:[{"datainicial": {$gte: dataini, $lte: dataini}}, {"datafinal": {$gte: datafim, $lte: datafim}}]
				};
			Horaextra.find(filter, function(err, dados) {
					if(err){
						req.flash('erro', 'Erro ao localizar a hora extra' + err);
						res.render('horaextra/consultar', {listhoras : req.body});
					}else{
						res.render('horaextra/consultar', {listhoras : dados});
					}
			});
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
							req.flash('erro', 'Erro ao gravar: ' + err);
							res.render('horaextra/editar', {hora: hora});
						}else{
							req.flash('info', 'Registro gravado com sucesso!');
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
