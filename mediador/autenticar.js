module.exports = function(req, res, next){
	if(req.session.desenvolvedor){
		res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
		res.header('Expires', '-1');
		res.header('Pragma', 'no-cache');		
		return next();
	}
	return res.redirect('/');
}
