/**
 * Created by tonghema on 30/03/2017.
 */
/**
 * Created by matonghe on 15/03/2017.
 */
var mongoose = require("mongoose");
var moment = require("moment");
var Schema = mongoose.Schema,
    ObjectId = Schema.Types.ObjectId;

var ContactSchema = new Schema({

        /**
         * 收货人名称
         */
        name: {
            type: String,
            trim: true,
            default: "荧光粉"
        },
        owner: {
            type: ObjectId,
            ref: 'user'
        },
        /**
         * 收货地址
         */
        shippingAddress: {
            province: {
                type: String
            },
            city: {
                type: String
            },
            area: {
                type: String
            },
            details: {
                type: String
            }
        },
        /* 联系电话 */
        phone: {
            type: String
        },
        /* 是否为默认地址 */
        isDefault: {
            type: Boolean,
            default: true
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


ContactSchema.options.toJSON.transform = function (doc, ret) {
    ret.contactId = ret._id.toString();

    delete ret.__v;
    delete ret._id;
};
module.exports = ContactSchema;