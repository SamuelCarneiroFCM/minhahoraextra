module.exports = function(app){
	var validacao = require('../validacoes/desenvolvedor');
	var validacaohora = require('../validacoes/Horaextra');
	var Desenvolvedor = app.esquemas.desenvolvedorModel;
	var Horaextra = app.esquemas.horatrabalhadaModel;
	var funcoes = require('../config/funcoes.js');


	var DesenvolvedorController = {

		novo: function(req,res){
			  res.render('home/novo');
		},
    novoaddhoraextra: function(req,res){
			res.render('home/addhoraextra');
		},

		addhoraextra: function(req,res){
			if(validacaohora(req, res)){
				var emailUPPER = req.body.email;

				var qtdhora = funcoes.qtdHora(req.body.datainicial, req.body.horainicial,
					req.body.datafinal, req.body.horafinal);

				var hora = {
					email: emailUPPER.toUpperCase(),
					solicitacao: req.body.solicitacao,
					datainicial: req.body.datainicial,
					horainicial: req.body.horainicial,
					datafinal: req.body.datafinal,
					horafinal: req.body.horafinal,
					quantidadejornada: qtdhora
				};

				var horas = new Horaextra(hora);

				horas.save(function(err, horas) {
					if(err){
						req.flash('erro', 'Erro ao cadastrar a hora extra' + err);
						res.render('home/index', {'dev' : req.session.desenvolvedor});
					}else{
            console.log('passou hora extra');
						res.render('home/index', {'dev' : req.session.desenvolvedor});
					}
				});

			}
			else{
				res.render('home/addhoraextra', {'dev' : req.session.desenvolvedor});
			}
		},

		post: function(req,res){
			if(validacao(req, res)){
				var emailUPPER = req.body.email;

				var esquema         = new Desenvolvedor();
				esquema.nome        = req.body.nome;
				esquema.email       = emailUPPER;
				esquema.senha       = esquema.generateHash(req.body.senha);
				esquema.salario     = req.body.salario;
				esquema.horasemanal = req.body.horasemanal;

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
