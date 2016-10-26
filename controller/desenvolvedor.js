module.exports = function(app){
	var validacao         = require('../validacoes/desenvolvedor.js'),
	    validacaohora     = require('../validacoes/horaextra.js'),
	    Desenvolvedor     = app.esquemas.desenvolvedorModel,
	    Horaextra         = app.esquemas.horatrabalhadaModel,
			HoraExtraGrafico  = app.esquemas.horaextragraficoModel,
      moment            = require('moment'),
	    funcoes           = require('../config/funcoes.js');


	var DesenvolvedorController = {
		addhoraextra: function(req, res){
    	res.render('horaextra/adicionar');
    },

		adicionarhoraextra: function(req, res){
			if(validacaohora(req, res)){
					var qtdhora = funcoes.qtdHora(req.body.datainicial, req.body.horainicial, req.body.datafinal, req.body.horafinal);

					var hora = {
							email: req.body.email,
							solicitacao: req.body.solicitacao,
							datainicial: new Date(req.body.datainicial),
							horainicial: req.body.horainicial,
							datafinal: new Date(req.body.datafinal),
							horafinal: req.body.horafinal,
							quantidadejornada: qtdhora
					};
					console.log(hora);
					var horas = new Horaextra(hora);
					horas.save(function(erro, hora) {
							if(erro)
							{
								req.flash('erro', 'Erro ao cadastrar a hora extra' + erro);
								res.render('horaextra/adicionar');
							}
							else
							{

								var data1 = hora.datafinal;
								var data2 = moment().subtract(7, 'days')._d;
								var AtualizarGF = (moment(data2).isBefore(data1));

				        if(AtualizarGF)
								{
								    var UpdateDiaSemanal = funcoes.UpdateDiaSemanalAtual(qtdhora);

									HoraExtraGrafico.findOneAndUpdate({'email': hora.email}, UpdateDiaSemanal, {upsert: true}, function(erro){
										if(erro){
											 req.flash('erro', 'Erro ao atualizar o gráfico: ' + erro);
										};
									});
								}
								req.flash('info', 'Registro cadastrado com sucesso!');
								res.redirect('/addhoraextra');
							}
					});
			}else{
				 res.render('horaextra/adicionar');
			}
		},

		consultahoraextra: function(req, res){
			var dev = req.session.desenvolvedor;
			var email = dev.email;
		 	var data = funcoes.DataEmISO(moment().subtract(20, 'days').calendar());
            var filter = {
				  "email": email,
				  "datainicial": {"$gte": data}
		    };
			Horaextra.find(filter,
				function(err, dados) {
					if(err){
						req.flash('erro', 'Erro ao localizar a hora extra' + err);
						res.render('horaextra/consultar', {listhoras : 0});
					}else{
						console.log(dados);
						res.render('horaextra/consultar', {listhoras : dados});
					}
			});
    },

		filtrohoraextra: function(req, res){
      var email = req.query.email;
			var solicitacao = req.query.solicitacao;
      var dataini = funcoes.DataEmISO(moment(req.query.datainicial).format('L'));
			var datafim = funcoes.DataEmISO(moment(req.query.datafinal).format('L'));
      if (solicitacao == ''){
				solicitacao = {$ne: ""};
			}
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
			console.log(req.params.id);
			Horaextra.findById(req.params.id, function(err, dados){
				if(err){
					req.flash('erro', 'Erro ao editar: ' + err);
					res.redirect('/horaextra/consultar');
				}else{
					console.log(dados);
					console.log(moment(dados.datainicial).format('L'));
					res.render('horaextra/editar', {hora: dados});
				}
			});
		},

		gravarhoraextra: function(req, res){
    		if(validacaohora(req, res)){
				Horaextra.findById(req.params.id, function(erro, dados){

					if(erro){
						req.flash('erro', 'Erro ao gravar: ' + erro);
						res.render('horaextra/editar', {hora: dados});

					}
					else{
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
					}

				});
			}else{
				res.render('horaextra/editar', {hora: req.body});
			}
		},

		excluirhoraextra: function(req, res){

			Horaextra.findById(req.params.id, function(erro, dados){

				if(erro){
					req.flash('erro', 'Erro ao excluir: '+ erro);
          res.render('horaextra/consultar');
				}
				else{

  					var data1 = dados.datafinal;
	  				var data2 = moment().subtract(7, 'days')._d;
		  			var AtualizarGF = (moment(data2).isBefore(data1));

            if (AtualizarGF){
							  var qtdHora =  dados.quantidadejornada;
						    var UpdateDiaSemanal = funcoes.UpdateDiaSemanalAtual(-qtdHora);

								HoraExtraGrafico.findOneAndUpdate({'email': dados.email}, UpdateDiaSemanal, {upsert: true}, function(erro){
									if(erro){
									    req.flash('erro', 'Erro ao atualizar o gráfico: ' + erro);
									}
								});
            };

						dados.remove({'_id': req.params.id}, function(err, resultado){
							if(err){
								req.flash('erro', 'Erro ao excluir: '+ err);
								res.render('horaextra/consultar');
							}else{
								req.flash('info', 'Registro excluído com sucesso!');
								res.render('horaextra/consultar', {listhoras : resultado});
					   }
						});

				}

			});
		}

	}

	return DesenvolvedorController;
}
