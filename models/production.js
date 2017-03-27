/**
 * Created by tonghema on 24/03/2017.
 */
var mongoose = require("mongoose");
var moment = require("moment");
var CONSTANTS = require("../utils/constants");
var deepPopulate = require('mongoose-deep-populate')(mongoose);
const Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

const ProductionSchema = new Schema({

        /**
         * 商品编号
         */
        production_code: {
            type: String,
            trim: true
        },
        /**
         * 商品标题
         */
        title: {
            type: String
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
         *
         */
        amount: {
            type: Number
        },
        /**
         * 首页封面头图
         */
        cover: {
            type: String
        },
        /**
         * 展示页
         */
        showImages: {
            type: []
        },
        /**
         * 投稿人
         */
        designer: {
            type: ObjectId,
            ref: 'user'
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
ProductionSchema.plugin(deepPopulate, {
    populate: {
        'designer': {
            select: 'nickname gender avatar username design'
        }
    }
});
ProductionSchema.options.toJSON.transform = function (doc, ret) {
    ret.productionId = ret._id.toString();
    ret.price = ret.priceDec;
    delete ret.priceDec;
    delete ret.__v;
    delete ret._id;
};
module.exports = ProductionSchema;