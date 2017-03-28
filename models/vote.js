/**
 * Created by tonghema on 24/03/2017.
 */

var mongoose = require("mongoose");
var moment = require("moment");
var CONSTANTS = require("../utils/constants");
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var VoteSchema = new Schema({
        /**
         * 投票用户
         */
        owner: {
            type: ObjectId,
            ref: 'user'
        },

        /**
         * 所投的产品ID
         */
        production: {
            type: ObjectId,
            ref: 'production'
        },

        /**
         * 发起 投票 活动 ID
         */
        strategy: {
            type: ObjectId,
            ref: 'strategy'
        },

        /**
         * 选票描述
         */
        description: {
            type: String
        },

        /**
         * 选票状态
         */
        status:{
            type: Number,
            default: CONSTANTS.STATUS.UNPUBLISHED
        },

        createdAt: {//创建时间
            type: Date,
            required: true,
            default: Date.now,
            get: function (date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {//更新时间
            type: Date,
            required: true,
            default: Date.now,
            get: function (date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },
    {
        id: false,
        toJSON: {
            getters: true
        }
    });
VoteSchema.pre('save', function (next) {
    next();
});
VoteSchema.options.toJSON.transform = function (doc, ret) {
    ret.userId = ret._id.toString();
    delete ret.__v;
    delete ret._id;
};
module.exports = VoteSchema;