//var url = require('url');

module.exports = function(req, res){
  /*
	var createUrl = url.parse(req.url).pathname == "/registro/novo";
	var updateUrl = !createUrl;
  */

	req.assert('nome', 'Informe o seu Nome.').notEmpty();
  req.assert('email', 'E-mail inválido.').isEmail();
  req.assert('senha', 'Sua senha deve conter de 6 a 10 caracteres.').len(6,10);

  /*
	if(createUrl){
		req.assert('email', 'E-mail inválido.').isEmail();
		req.assert('senha', 'Sua senha deve conter de 6 a 10 caracteres.').len(6,10);
	}
  */
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
