/**
 * Created by matonghe on 14/03/2017.
 */
var Q = require("q");
var mongoose = require("mongoose");
mongoose.Promise = require('q').Promise;
var CONSTANTS = require("../utils/constants");
var UserSchema = require("./user");
var betSchema = require("./egb/betSchema");
var AccessTokenSchema = require("./accesstoken");
var RefreshTokenSchema = require("./refreshtoken");
var ClientSchema = require("./client");
var nestedBetSchema = require("./egb/nestedBetSchema");
var ping_leagueSchema = require("./pingbo/ping_leagueSchema");
var eventSchema = require("./pingbo/ping_eventSchema");
var gambleSchema = require("./gambleSchema");
var leagueSchema = require("./leagueSchema");
var teamSchema = require("./teamSchema");
var matchSchema = require("./matchSchema");

/**
 * 分页
 * @param options
 * @returns {*}
 */
mongoose.Model.findAllAndCount = function(options) {
    var searchOption = options.searchOption || {};
    var sortOption = options.sortOption || {};
    var limit = options.limit || CONSTANTS.PAGINATE.LIMIT;
    var field = options.field || {};
    var page = options.page || 1;
    var skipNum = (page * limit) - limit;
    var populateOpt;
    switch (this.modelName) {
        case 'gamble':
            populateOpt = ['league'];
            break;
        default:
            populateOpt = '';
            break;
    }
    return Q.all([
        this.find(searchOption, field).deepPopulate(populateOpt).skip(skipNum).limit(limit).sort(sortOption),
        this.count(searchOption)
    ]);
};

// 数组属性分页
mongoose.Model.paginateForPro = function (id, property, options, callback) {
    var searchOption = options.searchOption || {};
    searchOption._id = id;
    var limit = options.limit || CONSTANTS.PAGE.NUM;
    var totalCount = options.totalCount;
    var page = options.page || 1;
    var field = options.field || {};
    if (totalCount - page * limit < 0) {
        field[property] = {
            '$slice': totalCount - (page - 1) * limit
        };
    }
    else {
        field[property] = {
            '$slice': [
                totalCount - page * limit,
                limit
            ]

        };
    }

    return this.findOne(searchOption, field)
};

exports.UserModel = mongoose.model("user", UserSchema);
exports.AccessTokenModel = mongoose.model("accesstoken", AccessTokenSchema);
exports.ClientModel = mongoose.model("client", ClientSchema);
exports.RefreshTokenModel = mongoose.model("refreshtoken", RefreshTokenSchema);
exports.GambleModel = mongoose.model('gamble', gambleSchema);
exports.LeagueModel = mongoose.model('league', leagueSchema);
exports.TeamModel = mongoose.model('team', teamSchema);
exports.MatchModel = mongoose.model('match', matchSchema);

/**
 * EGB models
 */
exports.BetModel = mongoose.model("egb_bet", betSchema);
exports.NestedBetModel = mongoose.model('egb_nestedBet', nestedBetSchema);
exports.ping_LeagueModel = mongoose.model('ping_league', ping_leagueSchema);
exports.EventModel = mongoose.model('ping_event', eventSchema);
