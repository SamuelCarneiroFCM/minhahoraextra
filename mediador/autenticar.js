module.exports = function(req, res, next){
	if(req.session.desenvolvedor){
		return next();
	} 
	return res.redirect('/');
}
