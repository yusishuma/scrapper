/**
 * Created by tonghema on 19/04/2017.
 */
'use strict';
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var gambleSchema = new Schema({

    // 添加到数据库的时间
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
    // 赌局类型 { 话题赌局 赛事赌局 }
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
    gambleOptionA: {
        type: String,
        required: true
    },
    // 下注选项B
    gambleOptionB: {
        type: String,
        required: true
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
    // optionA的赔率
    optionAOdds: {
        type: Number,
        required: true,
        default: 0
    },
    // optionB的赔率
    optionBOdds: {
        type: Number,
        required: true,
        default: 0
    },
    // 赌局状态 3 代表已结束
    gambleStatus: Number,
    optionAWin: {
        type: Boolean,
        required: true,
        default: false
    },
    optionBWin: {
        type: Boolean,
        required: true,
        default: false
    },
    /********赛事赌局独有信息********/
    // 归属赛程
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Match'
    },//:TODO
    // 赌局数据来源ID
    gambleSourceId: String,
    // 赌局来源
    gambleSource: Number,
    gambleSourceAndSourceId: {//:todo 临时库不保存该字段
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
});
module.exports = gambleSchema;