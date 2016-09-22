var funcoes = require('../config/funcoes.js');

module.exports = function(req, res){

  req.assert('email', 'E-mail inválido.').isEmail();
	req.assert('solicitacao', 'Informe uma solicitação.').notEmpty();
  req.assert('datainicial', 'Informe a data inicial.').notEmpty();
	req.assert('horainicial', 'Informe a hora inicial.').notEmpty();
	req.assert('datafinal', 'Informe a data final.').notEmpty();
	req.assert('horafinal', 'Informe a hora final.').notEmpty();


	var validateErros = req.validationErrors() || [];
/*
	var qtdhora = funcoes.qtdHora(req.body.datainicial, req.body.horainicial,
		req.body.datafinal, req.body.horafinal);
	var h = qtdhora.substr(0, qtdhora.indexOf(":"));
	var m = qtdhora.substr(qtdhora.indexOf(":")+1, qtdhora.length);
	if ((h <= 0) == (m <= 0)) {
	  validateErros.push({msg: 'Data e hora final não pode ser inferior ou igual a data e hora inicial.'});
	}
*/
	//verificar se a senha confere
	if(req.body.senha != req.body.senha_confirmar){
		validateErros.push({msg: 'Senha não confere.'});
	}

	if(validateErros.length > 0){
		validateErros.forEach(function(e){
			req.flash('erro', e.msg);
		});
		return false;
	}else{
		return true;
	}
}
