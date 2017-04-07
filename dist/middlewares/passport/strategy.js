/**
 * Created by matonghe on 15/03/2017.
 */
"use strict";

var passport = require("passport");
var User = require("../../models/index");
var BasicStrategy = require("passport-http");
passport.use(new BasicStrategy(function (phone, password, done) {
    User.findOne({ "account.phone": phone }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        if (!user.account.validPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));
//# sourceMappingURL=strategy.js.map