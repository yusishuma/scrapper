/**
 * Created by matonghe on 15/03/2017.
 */
var passport = require("passport");
var User = require("../../models/index").UserModel;

var LocalStrategy = require('passport-local').Strategy;
/**
 * passport 配置及应用
 */
passport.serializeUser(function (user, done) {
    "use strict";
    console.log(user, 'serializeUser');
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    "use strict";
    done(null, user);
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username, password);
        User.findOne({ username: username }, function (err, user) {
            console.log('new localStrategy');
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
