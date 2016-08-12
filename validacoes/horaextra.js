module.exports = function(req, res){

	req.assert('solicitacao', 'Informe a solicitação.').notEmpty();
  req.assert('email', 'E-mail inválido.').isEmail();
	req.assert('solicitacao', 'Informe uma solicitação.').notEmpty();
  req.assert('datainicial', 'Informe a data inicial.').notEmpty();

	var validateErros = req.validationErrors() || [];

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
