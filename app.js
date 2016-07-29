var express = require('express');
var app  = express();
var port = process.env.PORT || 5000;
var passport = require('passport');
var flash = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

app.set('visoes', 'ejs');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret:'fcmsistemassamuelcarneiro',
  resave: false,
  saveUninitialized: false})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/public'));

require('./config/acesso.js')(passport);

require('./rotas.js')(app, passport);

app.listen(port);
console.log('Aplicativo foi ativado ' + port);

//app.listen(app.get('port'), function() {
//  console.log('Aplicativo foi ativado', app.get('port'));
//});
