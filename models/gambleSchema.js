/**
 * Created by tonghema on 19/04/2017.
 */
'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;
var CONSTANTS = require('../utils/constants');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var gambleSchema = new Schema({

    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    // 游戏类型
    gameType: {
        type: Number,
        required: true
    },
    // 赌局类型 { 话题赌局2 赛事赌局1 }
    gambleType: {
        type: Number,
        required: true
    },
    // 赌局名称
    gambleName: {
        type: String,
        required: true
    },
    // 下注选项A
    optionA: {
        // optionA的赔率
        name: String,
        teamA: String,
        odds: {
            type: Number,
            required: true,
            default: 0
        },
        win: {
            type: Number,
            required: true,
            default: 0
        },// 风险金
        riskFund: {
            type: Number
        },
        // 单注赔付上限
        payCeiling: {
            type: Number
        }
    },
    // 下注选项B
    optionB: {
        // optionB的赔率
        name: String,
        teamB: String,
        odds: {
            type: Number,
            required: true,
            default: 0
        },
        win: {
            type: Number,
            required: true,
            default: 0
        },
        // 风险金
        riskFund: {
            type: Number
        },
        // 单注赔付上限
        payCeiling: {
            type: Number
        }
    },
    // 结束日期
    endTime: {
        type: Number,
        required: true
    },
    // 本赌局的总下注金额
    allBetAmount: {
        type: Number,
        default: 0
    },
    // 本赌局的总参与人数
    allBetPeopleNum: {
        type: Number,
        default: 0
    },
    // 赌局状态 3 代表已结束 4 留盘
    gambleStatus: Number,
    /**
     *  赌局添加到正服的状态
     */
    isExist: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.EXIST,
        require: true
    },
    isRefreshed: {//正服数据是否需要更新
        type: Boolean,
        default: false
    },
    /********赛事赌局独有信息********/
    // 归属赛事
    league: {
        type: ObjectId,
        ref: 'league'
    },
    // 归属赛程
    match: String,
    // 赌局数据来源ID
    gambleSourceId: String,
    // 赌局来源
    gambleSource: Number,
    gambleSourceAndSourceId: {
        type: String,
        index: true,
        unique: true
    },
    /***********************话题赌局特有字段***/
    // 话题赌局icon
    topicGambleIcon: String,
    // 赌局简介
    gambleDesc: String,
    // 赌局评论数
    commentNum: {
        type: Number,
        default: 0
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
gambleSchema.plugin(deepPopulate, {
    populate: {
        'league': {
            select: 'leagueId leagueName'
        }
    }

});
gambleSchema.options.toJSON.transform = function (doc, ret) {
    ret.gambleId = ret._id.toString();
    var games = ['CSGO', 'LOL', 'DOTA 2'];
    ret.gameType = games[ret.gameType - 1];
    delete ret.__v;
    delete ret._id;
};
module.exports = gambleSchema;