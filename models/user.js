/**
 * Created by matonghe on 15/03/2017.
 */
var mongoose = require("mongoose");
var moment = require("moment");
var CONSTANTS = require("../utils/constants");
const Schema = mongoose.Schema;
var crypto = require('crypto');

const UserSchema = new Schema({

    /**
     * 昵称
     */
    nickname: {
        type: String,
        trim: true,
        default: "荧光粉"
    },

    /**
     * 性别
     * {UNKNOWN: 0, MALE: 1, FEMALE: 2}
     */
    gender: {
        type: Number,
        default: CONSTANTS.GENDER.UNKNOWN,
        enum: [
            0,
            1,
            2
        ]

    },

    /**
     * 头像
     */
    avatar: {
        type: String
    },

    /**
     * 用户账号信息
     */
    username: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        index: true
    },
    password: {
        type: String,
        trim: true,
        set: function (password) {
            this.salt = crypto.randomBytes(32).toString('base64');
            this.password = this.encryptPassword(password);
        }
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
};
module.exports = UserSchema;