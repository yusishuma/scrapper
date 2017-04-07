/**
 * Created by tonghema on 07/04/2017.
 */
/**
 * Created by matonghe on 15/3/16.
 */
var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');
var models = require('../../models/index');
var UserModel = models.UserModel;
var AccessTokenModel = models.AccessTokenModel;
var RefreshTokenModel = models.RefreshTokenModel;
var CONSTANTS = require('../../utils/constants');

var Q = require('q');
var server = oauth2orize.createServer();

// Exchange username & password for access token.
server.exchange(oauth2orize.exchange.password(function (client, username, password, scope, done) {

    UserModel.findOne({
        'username': username
    }).then(function(user){
        if (err || !user || !user.validPassword(password)) {
            return done(null, false);
        }
        var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');
        return Q.all([
            RefreshTokenModel.remove({
                userId: user.userId,
                clientId: client.clientId

            }),
            AccessTokenModel.remove({
                userId: user.userId,
                clientId: client.clientId

            }),
            new RefreshTokenModel({
                token: refreshTokenValue,
                clientId: client.clientId,
                userId: user.userId

            }).save(),
            new AccessTokenModel({
                token: tokenValue,
                clientId: client.clientId,
                userId: user.userId

            }).save()
        ]).then(function(){
            done(null, tokenValue, refreshTokenValue, {
                'expires_in': CONSTANTS.SESSION.TOKEN_LIFE

            });
        })

    }).fail(function (defer, err) {
        done(err);
    });
}));

// Exchange refreshToken for access token.
server.exchange(oauth2orize.exchange.refreshToken(function (client, refreshToken, scope, done) {
    RefreshTokenModel.findOne({
        token: refreshToken

    }, function (err, token) {
        if (err) {
            return done(err);
        }
        if (!token) {
            return done(null, false);
        }

        UserModel.findById(token.userId, function (err, user) {
            if (err || !user) {
                return done(null, false);
            }
            var tokenValue = crypto.randomBytes(32).toString('base64');
            var refreshTokenValue = crypto.randomBytes(32).toString('base64');
            return Q.all([
                RefreshTokenModel.remove({
                    userId: user.userId,
                    clientId: client.clientId

                }),
                AccessTokenModel.remove({
                    userId: user.userId,
                    clientId: client.clientId

                }),
                new RefreshTokenModel({
                    token: refreshTokenValue,
                    clientId: client.clientId,
                    userId: user.userId

                }).save(),
                new AccessTokenModel({
                    token: tokenValue,
                    clientId: client.clientId,
                    userId: user.userId

                }).save()
            ]).then(function(){
                done(null, tokenValue, refreshTokenValue, {
                    'expires_in': CONSTANTS.SESSION.TOKEN_LIFE

                });
            })
        });
    });
}));
// token endpoint
exports.token = [
    passport.authenticate([
        'basic',
        'oauth2-client-password'
    ], {
        session: false

    }),
    server.token(),
    server.errorHandler()
];
