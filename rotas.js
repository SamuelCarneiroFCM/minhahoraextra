//Controller
var validator = require('validator');
var dburl = require('./config/URLdb.js');
var mongoose = require('mongoose');
var assert = require('assert');
var funcoes = require("./config/funcoes.js");
var moment = require("moment");


mongoose.connect(dburl.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados'));

var Horadb = require('./esquemas/horatrabalhadaModel.js');


module.exports = function(app, passport) {

    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    app.post('/',
      passport.authenticate('local', {
    		successRedirect : '/profile',
    		failureRedirect : '/',
    		failureFlash : true
      })
    );

    app.get('/horatrabalhadaatual', isLoggedIn, function(req, res){
       console.log("test");
    });

    app.get('/profile', isLoggedIn, function(req, res) {
       res.render('profile.ejs', {user : req.user});
    });

    app.get('/registro', function(req, res) {
        res.render('registro.ejs', {message: req.flash('registroMessage')});
    });

    app.post('/registro',
    passport.authenticate('registro', {
  		successRedirect : '/',
  		failureRedirect : '/registro',
  		failureFlash : true
  	}));

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/horastrabalhadas', isLoggedIn, function(req, res){

      var emailUPPER = req.body.email;
      if(!validator.isEmail(emailUPPER)){
        throw new Error('Email é inválido');
      };

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

      Horadb.savar(hora, function(err, succ){
         if(!err){
           assert.equal(null, err);
         }
      });
      res.redirect('/profile');
    });

    app.post('/horatrabalhadaatual', isLoggedIn, function(req, res){

      console.log(req.body.tempo);

      var emailUPPER = req.body.email;
      if(!validator.isEmail(emailUPPER)){
        throw new Error('Email é inválido');
      };

      var tempo = new String(req.body.tempo);
      var qtdhora = tempo.substr(0, 2) + ":" + tempo.substr(3, 2);

      var hora = {
        email: emailUPPER.toUpperCase(),
        solicitacao: req.body.solicitacao,
        datainicial: moment(new Date()).format("YYYY-MM-DD"),
        horainicial: "00:00",
        datafinal: moment(new Date()).format("YYYY-MM-DD"),
        horafinal: "00:00",
        quantidadejornada: qtdhora
      };
      Horadb.savar(hora, function(err, succ){
         if(!err){
           assert.equal(null, err);
         }
      });
      res.redirect('/profile');
    });

    /*
    //Lista todos os desenvolvedores
    app.get('/desenvolvedores', isLoggedIn, function(req, res){
      desenvolvedorController.list(function(resp){
      	res.json(resp);
      });
    });

    // Traz um único desenvolvedor
    app.get('/desenvolvedores/:id', isLoggedIn, function(req, res){

      var id = validator.trim(validator.escape(req.param('id')));
      desenvolvedorController.user(id, function(resp){
          res.json(resp)
       })
    });

    //Grava o desenvolvedor
    app.post('/desenvolvedores', isLoggedIn, function(req, res){

      var nome = validator.trim(validator.escape(req.param('nome')));
      var email = validator.trim(validator.escape(req.param('email')));
      var senha = validator.trim(validator.escape(req.param('senha')));

      if(!validator.isEmail(email)){
        res.json('Email informado é inválido');
      }else{
        desenvolvedorController.save(nome, email, senha, function(resp){
          res.json(resp)
        });
      };
    });

    //Atualiza o desenvolvedor
    app.put('/desenvolvedores', isLoggedIn, function(req, res){

      var id = validator.trim(validator.escape(req.param('id')));
      var nome = validator.trim(validator.escape(req.param('nome')));
      var email = validator.trim(validator.escape(req.param('email')));
      var senha = validator.trim(validator.escape(req.param('senha')));


      if(!validator.isEmail(email)){
        res.json('Email informado é inválido');
       }
       else {
         desenvolvedorController.update(id, nome, email, senha, function(resp){
           res.json(resp)
         });
       };
    });

    //deleta o desenvolvedor
    app.delete('/desenvolvedores/:id', isLoggedIn, function(req, res){

        var id = validator.trim(validator.escape(req.param('id')));

       desenvolvedorController.delete(id, function(resp){
        res.json(resp)
      });
    });

    //------------------------------horas

    //Lista todos as horas de todos os desenvolvedores
    app.get('/horastrabalhadas', isLoggedIn, function(req, res){

      horatrabalhadaController.list(function(resp){
        res.json(resp);
      });

    });


    // Traz as horas trabalhada daquele desenvolvedor
    app.get('/horastrabalhadas/:id', isLoggedIn, function(req, res){

       var id = validator.trim(validator.escape(req.param('id')));

       if(!validator.isEmail(id)){
         res.json('Email informado é inválido');
       } else {
         horatrabalhadaController.user(id, function(resp){
            res.json(resp)
         })

       };
    });


    //Grava as horas daquele desenvolvedor
    app.post('/horastrabalhadas', isLoggedIn, function(req, res){
      var email = validator.trim(validator.escape(req.param('email')));
      var solicitacao = validator.trim(validator.escape(req.param('solicitacao')));
      var datainicial = validator.trim(validator.escape(req.param('datainicial')));
      var horainicial = validator.trim(validator.escape(req.param('horainicial')));
      var datafinal = validator.trim(validator.escape(req.param('datafinal')));
      var horafinal = validator.trim(validator.escape(req.param('horafinal')));

      if(!validator.isEmail(email)){
        res.json('Email informado é inválido');
      };

      horatrabalhadaController.save(email, solicitacao, datainicial, horainicial, datafinal, horafinal, function(resp){
        res.json(resp)
      })

    });

    //Atualiza as hora trabalhada daquele desenvolvedor
    app.put('/horastrabalhadas', isLoggedIn, function(req, res){

      var id = validator.trim(validator.escape(req.param('id')));
      var solicitacao = validator.trim(validator.escape(req.param('solicitacao')));
      var datainicial = validator.trim(validator.escape(req.param('datainicial')));
      var horainicial = validator.trim(validator.escape(req.param('horainicial')));
      var datafinal = validator.trim(validator.escape(req.param('datafinal')));
      var horafinal = validator.trim(validator.escape(req.param('horafinal')));

      horatrabalhadaController.update(id, solicitacao, datainicial, horainicial, datafinal, horafinal, function(resp){
        res.json(resp)
      })
    });

    //deleta as horas trabalhada daquele desenvolvedor
    app.delete('/horastrabalhadas/:id', isLoggedIn, function(req, res){

       var id = validator.trim(validator.escape(req.param('id')));
       horatrabalhadaController.delete(id, function(resp){
        res.json(resp)
       })
    });
 */
 };


function isLoggedIn(req, res, next) {

	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
