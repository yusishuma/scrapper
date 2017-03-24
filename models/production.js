/**
 * Created by tonghema on 24/03/2017.
 */
var mongoose = require("mongoose");
var moment = require("moment");
var CONSTANTS = require("../utils/constants");
const Schema = mongoose.Schema;
var crypto = require('crypto');

const ProductionSchema = new Schema({

        /**
         * 商品编号
         */
        production_code: {
            type: String,
            trim: true
        },

        /**
         * 商品描述
         */
        description: {
            type: String
        },

        /**
         * 商品状态
         */
        status:{
            type: Number,
            default: CONSTANTS.STATUS.UNPUBLISHED
        },

        /**
         * 商品价格
         */
        price:{
            type: Number
        },
        priceDec: {
            type: Number
        },

        /**
         * 商品总量
         */
        amount: {
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
ProductionSchema.pre('save', function (next) {
    this.priceDec = this.price;
    this.price = this.price * 100;
    next();
});
ProductionSchema.options.toJSON.transform = function (doc, ret) {
    ret.userId = ret._id.toString();
    delete ret.__v;
    delete ret._id;
};
module.exports = ProductionSchema;