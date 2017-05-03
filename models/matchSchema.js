/**
 * Created by tonghema on 25/04/2017.
 */
/**
 * Created by tonghema on 18/04/2017.
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../utils/constants');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var matchSchema = new Schema({

        // 创建时间，默认生成
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        /**
         * 赛程是否存在
         */
        isExist: {
            type: Number,
            default: CONSTANTS.EXIST_PRODUCTION.NO_EXIST,
            require: true
        },
        matchId: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        // 正服 队伍ID
            type: String
        },
        // 游戏的类型
        gameType: {
            type: Number,
            required: true
        },
        // 赛程名称
        matchName: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        teamA: String,
        teamAScore: Number,
        teamB: String,
        teamBScore: Number,
        // 所属赛事
        league: String,
        // 结束时间
        endTime: {
            type: Number,
            default: Date.now.valueOf()
        },
        // 赛程状态
        matchStatus: {
            type: Number,
            required: true,
            default: CONSTANTS.MATCH_STATUS.BETTING
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
    });

matchSchema.plugin(deepPopulate, {});
matchSchema.options.toJSON.transform = function (doc, ret) {
    ret.matchId = ret._id.toString();
    var games = ['CSGO', 'LOL', 'DOTA2'];
    ret.gameType = games[ret.gameType - 1];
    delete ret.__v;
    delete ret._id;
};
module.exports = matchSchema;