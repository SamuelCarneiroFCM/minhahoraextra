/**
 * Module dependencies.
 */
var passport = rutil = require('util')
  , lookup = require('./utils').lookup;

function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }

  this._firstnameField = options.firstnameField || 'firstname';
  this._usernameField = options.usernameField || 'username';
  this._passwordField = options.passwordField || 'password';

//  passport.Strategy.call(this);
  this.name = 'local';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var firstname = lookup(req.body, this._firstnameField) || lookup(req.query, this._firstnameField);
  var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
  var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);

  if (!username || !password) {
    return this.fail({ message: options.badRequestMessage || 'Falta as credenciais' }, 400);
  }

  var self = this;

  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }

  try {
    if (self._passReqToCallback) {
      this._verify(req, username, password, firstname, verified);
    } else {
      this._verify(username, password, firstname, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};

module.exports = Strategy;
