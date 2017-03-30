/**
 * Created by tonghema on 24/03/2017.
 */

var mongoose = require("mongoose");
var moment = require("moment");
var CONSTANTS = require("../utils/constants");
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var deepPopulate = require('mongoose-deep-populate')(mongoose);

var OrderSchema = new Schema({

        /**
         * 订单编号
         */
        order_code: {
            type: String,
            trim: true
        },

        /**
         * 订单描述
         */
        description: {
            type: String
        },
        /**
         * 下单用户
         */
        owner: {
            type: ObjectId,
            ref: 'user'
        },
        /**
         * 订单状态
         */
        status: {
            type: Number,
            default: CONSTANTS.STATUS.UNPUBLISHED
        },
        productions: {
            type: [{
                production: {//下单商品
                    type: ObjectId,
                    ref: 'production'
                },
                count: {//下单数量
                    type: Number
                }
            }]
        },
        /**
         * 带支付金额
         */
        payment:{
            type: Number
        },
        paymentDec: {
            type: Number
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now,
            get: function (date) {
                return moment(date).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
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
OrderSchema.pre('save', function (next) {
    this.paymentDec = this.payment;
    this.payment = this.payment * 100;
    this.order_code = moment().format('x') + '' + Math.floor(Math.random() * 9999 + 1000);
    next();
});
OrderSchema.plugin(deepPopulate, {
    populate: {
        'productions': {
            select: 'production_code title description status priceDec price amount showImages cover designers', match: { status: CONSTANTS.STATUS.PUBLISHED }
        },
        'productions.designers': {
            select: 'nickname gender avatar username design'
        }
    }
});
OrderSchema.options.toJSON.transform = function (doc, ret) {
    ret.userId = ret._id.toString();
    delete ret.__v;
    delete ret._id;
};
module.exports = OrderSchema;