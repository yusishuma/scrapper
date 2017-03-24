/**
 * Created by tonghema on 24/03/2017.
 */

var mongoose = require("mongoose");
var moment = require("moment");
var CONSTANTS = require("../utils/constants");
const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const StrategySchema = new Schema({

        /**
         * 活动描述
         */
        title: {
            type: String
        },

        /**
         * 活动描述
         */
        description: {
            type: String
        },

        /**
         * 活动状态
         */
        status:{
            type: Number,
            default: CONSTANTS.STATUS.UNPUBLISHED
        },

        /**
         * 产品列表
         */
        productions: {
            type: [{
                type: ObjectId,
                ref: 'production'
            }]
        },
        startDate: {//开始时间
            type: Date,
            required: true,
            default: Date.now,
            get: function (date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        endDate: {//结束时间
            type: Date,
            required: true,
            default: Date.now,
            get: function (date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
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
StrategySchema.pre('save', function (next) {
    next();
});
StrategySchema.options.toJSON.transform = function (doc, ret) {
    ret.userId = ret._id.toString();
    delete ret.__v;
    delete ret._id;
};
module.exports = StrategySchema;