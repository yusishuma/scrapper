/**
 * Created by tonghema on 18/04/2017.
 */

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../utils/constants');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var teamSchema = new Schema({

    // 创建时间，默认生成
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    /**
     * 战队是否存在
     */
    isExist: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.NO_EXIST,
        require: true
    },
    // 游戏的类型
    gameType: {
        type: Number,
        required: true
    },
    // 战队名称
    teamName: {
        type: String,
        required: true,
        // unique: true,
        // index: true
    },
    teamSource: {
        type: Number
    }
    // ,
    // alias: { // 别名
    //     type: [{
    //         id: String,
    //         source: Number,
    //         name: String
    //     }]
    // }
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

teamSchema.plugin(deepPopulate, {});
teamSchema.options.toJSON.transform = function (doc, ret) {
    ret.teamId = ret._id.toString();
    var games = ['CSGO', 'LOL', 'DOTA2'];
    var source = ['后台添加', 'EGB网站', '平博网站'];
    ret.gameType = games[ret.gameType - 1];
    ret.teamSource = source[ret.teamSource - 1];
    delete ret.__v;
    delete ret._id;
};
module.exports = teamSchema;