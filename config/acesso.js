var LocalStrategy  = require('./lib/index.js').Strategy;
var Devs = require('../esquemas/desenvolvedorModel.js');
var assert = require('assert');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });

    passport.use('local', new LocalStrategy(
       {passReqToCallback : true},
       function(req, username, password, firstname, done){
         process.nextTick(function()
         {
           Devs.Desenvolvedores.findOne(
             {email : username.toUpperCase()},
             function(err, dev)
             {
               if (err) {return done(err);}
               if (!dev) {return done(null, false, req.flash('loginMessage', 'Nenhum desenvolvedor encontrado.'));}
               if (!dev.validarsenha(password)){return done(null, false, req.flash('loginMessage', 'Ops! Senha incorreta.'));}
               return done(null, dev);
              });
           });
         }
      ));

      passport.use('registro', new LocalStrategy(
         {passReqToCallback : true},
         function(req, username, password, firstname, done)
         {
           process.nextTick(function()
           {
             Devs.Desenvolvedores.findOne(
               {email : username.toUpperCase()},
               function(err, dev)
               {
                 if (err) {return done(err);}
                 if (dev) {return done(null, false, req.flash('registroMessage', 'Esse email já foi cadastrado.'));}
                 else{
                   var novoDev = new Devs.Desenvolvedores();
                   novoDev.email = username.toUpperCase();
                   novoDev.senha = novoDev.gerarsenhaHASH(password);
                   novoDev.nome = firstname;
                   novoDev.save(function(err, result) {
                          assert.equal(null, err);
                          console.log(result);
                   });
                   return done(null, novoDev);
                 }
                });
            })
          }
        ));

};
