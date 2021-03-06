/**
 * Created by matonghe on 15/03/2017.
 */
"use strict";

var mongoose = require("mongoose");
var moment = require("moment");
var CONSTANTS = require("../utils/constants");
var Schema = mongoose.Schema;
var crypto = require('crypto');

var UserSchema = new Schema({

    /**
     * 昵称
     */
    nickname: {
        type: String,
        trim: true,
        "default": "荧光粉"
    },

    /**
     * 性别
     * {UNKNOWN: 0, MALE: 1, FEMALE: 2}
     */
    gender: {
        type: Number,
        "default": CONSTANTS.GENDER.UNKNOWN,
        "enum": [0, 1, 2]

    },

    /**
     * 头像
     */
    avatar: {
        type: String
    },

    /**
     * 用户名 即 用户手机号
     */
    username: {
        type: String,
        trim: true
    },
    // phone: {
    //     type: String,
    //     trim: true,
    //     index: true
    // },
    password: {
        type: String,
        trim: true
    },
    salt: { //密码加盐
        type: String
    },
    createdAt: {
        type: Date,
        required: true,
        "default": Date.now,
        get: function get(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Date,
        required: true,
        "default": Date.now,
        get: function get(date) {
            return moment(date).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
    id: false,
    toJSON: {
        getters: true
    }
});
UserSchema.pre('save', function (next) {
    this.salt = crypto.randomBytes(32).toString('base64');
    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods.encryptPassword = function (password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

//验证密码
UserSchema.methods.validPassword = function (password) {
    return this.encryptPassword(password) === this.password;
};

UserSchema.options.toJSON.transform = function (doc, ret) {
    ret.userId = ret._id.toString();
    delete ret.__v;
    delete ret._id;
    delete ret.password;
};
module.exports = UserSchema;
//# sourceMappingURL=user_controller.js.map