/**
 * Created by tonghema on 18/04/2017.
 */
'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var CONSTANTS = require('../utils/constants');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

// 赛事schema
var leagueSchema = new Schema({
    // 创建时间，默认生成
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    // 所属游戏
    gameType: {
        type: Number,
        required: true
    },
    // 赛事名称
    leagueName: {
        type: String,
        required: true
    },
    // 赛事图片
    leagueImageUrl: {
        type: String
    },
    // 风险金
    riskFund: {
        type: Number
    },
    // 单注赔付上限
    payCeiling: {
        type: Number
    },
    level: {
        type: Number,
        default: CONSTANTS.LEAGUE_LEVEL.FIRST
    },
    /**
     * 赛事是否存在
     */
    isExist: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.EXIST,
        require: true
    },
    // 赛事来源(1 后台 2 egb 3 pingbo)
    leagueSource: {
        type: Number
    }
},
    {
        id: false,
        toObject: {
            getters: true

        },
        toJSON: {
            getters: true
        }
    }
);
leagueSchema.plugin(deepPopulate, {});
leagueSchema.pre('save', function (next) {
    this.riskFund = CONSTANTS.translaterRiskFund(this.level);
    this.payCeiling = CONSTANTS.translaterPayCeiling(this.level);
    this.gameType = CONSTANTS.translateGameType(this.gameType);
    next();
});
leagueSchema.options.toJSON.transform = function (doc, ret) {
    ret.leagueId = ret._id.toString();
    var games = ['CSGO', 'LOL', 'DOTA'];
    ret.gameType = games[ret.gameType - 1];
    delete ret.__v;
    delete ret._id;
};

module.exports = leagueSchema;