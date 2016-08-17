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
				var qtdhora = funcoes.qtdHora(req.body.datainicial, req.body.horainicial,
					req.body.datafinal, req.body.horafinal);

				var hora = {
					email: req.body.email,
					solicitacao: req.body.solicitacao,
					datainicial: req.body.datainicial,
					horainicial: req.body.horainicial,
					datafinal: req.body.datafinal,
					horafinal: req.body.horafinal,
					quantidadejornada: qtdhora
				};

				var horas = new Horaextra(hora);

				horas.save(function(err, result) {
					if(err){
						req.flash('erro', 'Erro ao cadastrar a hora extra' + err);
						res.render('home/addhoraextra', {dev : req.session.desenvolvedor});
					}else{
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
					}
				});
			}
			else{
				res.render('home/addhoraextra', {dev : req.session.desenvolvedor});
			}
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
