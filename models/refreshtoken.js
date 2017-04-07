/**
 * Created by tonghema on 07/04/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RefreshTokenSchema = new Schema({
    userId: {
        type: String,
        required: true

    },
    clientId: {
        type: String,
        required: true

    },
    token: {
        type: String,
        unique: true,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now

    }

});
module.exports = RefreshTokenSchema;