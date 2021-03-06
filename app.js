var   express          = require('express'),
      path             = require('path'),
	  logger           = require('morgan'),
	  cookieParser     = require('cookie-parser'),
	  bodyParser   	   = require('body-parser'),
	  session          = require('express-session'),
	  load             = require('express-load'),
	  mongoose         = require('mongoose'),
	  flash            = require('express-flash'),
	  moment           = require('moment'),
	  expressValidator = require('express-validator'),
      URLdb            = require('./config/URLdb');


//conexão com o mongodb
mongoose.connect(URLdb.url, function(err){
	if(err){
		console.log("Erro ao conectar no mongodb: " + err);
    mongoose.connect('mongodb://127.0.0.1:27017/horaextrafcm', function(local){
      if(local){
        console.log("Erro ao conectar banco local");
      }
        else{
        console.log("Conexão com o banco local efetuada com sucesso!");
      }
    });
	}else{
		console.log("Conexão com o mongodb efetuada com sucesso!");
	}
});

var app = express();
var port = process.env.PORT || 4000;
var erros = require("./mediador/erros");

moment.locale('pt-BR');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {layout: true});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
   secret: 'samuelcarneirofcmsistemas8118',
   resave: false,
   saveUninitialized: false
 }));
app.use(app.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(function(req, res, next){
	res.locals.session  = req.session.desenvolvedor;
	res.locals.taLogado = req.session.desenvolvedor? true : false;
	res.locals.moment   = moment;
	next();
});

load('esquemas').then('controller').then('rotas').into(app);

//mediador
app.use(erros.notfound);
app.use(erros.serverError);

app.listen(port, function(){
  console.log('Aplicativo foi ativado => ' + port);
});
