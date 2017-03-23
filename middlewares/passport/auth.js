/**
 * Created by matonghe on 15/03/2017.
 */
var passport = require("passport");
var User = require("../../models/index");
var BasicStrategy = require("passport-http");
var local
passport.use(new BasicStrategy(
    function(username, password, done) {
        User.findOne({ "phone": username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.validPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));
