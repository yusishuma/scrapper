/**
 * Created by matonghe on 15/03/2017.
 */
var passport = require("passport");
var User = require("../../models/index").UserModel;
var models = require('../../models/index');
var UserModel = models.UserModel;
var AccessTokenModel = models.AccessTokenModel;
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var CONSTANTS = require('../../utils/constants');

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
    console.log(user, 'deserializeUser');
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
passport.use(new BasicStrategy(function (username, password, done) {
    ClientModel.findOne({
        clientId: username

    }, function (err, client) {
        if (err) {
            return done(err);
        }
        if (!client) {
            return done(null, false);
        }
        if (client.clientSecret !== password) {
            return done(null, false);
        }

        return done(null, client);
    });
}));

passport.use(new ClientPasswordStrategy(function (clientId, clientSecret, done) {
    ClientModel.findOne({
        clientId: clientId

    }, function (err, client) {
        if (err) {
            return done(err);
        }
        if (!client) {
            return done(null, false);
        }
        if (client.clientSecret !== clientSecret) {
            return done(null, false);
        }

        return done(null, client);
    });
}));

passport.use(new BearerStrategy(function (accessToken, done) {
    var info = {
        scope: '*'

    };
    AccessTokenModel.findOne({
        token: accessToken

    }).then(function (token) {

        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        if (Math.round((Date.now() - token.created) / 1000) > CONSTANTS.SESSION.TOKEN_LIFE) {
            return AccessTokenModel.remove({
                token: accessToken

            }, function (err) {
                if (err) {
                    return done(err);
                }
                return done(null, false, {
                    message: 'Token expired'

                });
            });

        }
        else
            return UserModel.findById(token.userId, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'

                    });
                }

                return done(null, Object.assign(user, {
                    authorized: true
                }), info);
            })
    })
})
)
