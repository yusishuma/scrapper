/**
 * Created by matonghe on 15/03/2017.
 */
"use strict";

var passport = require("passport");
var User = require("../../models/index");

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.validPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));
//# sourceMappingURL=auth.js.map