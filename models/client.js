/**
 * Created by tonghema on 07/04/2017.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClientSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true

    },
    clientId: {
        type: String,
        unique: true,
        required: true

    },
    clientSecret: {
        type: String,
        required: true

    }

});
module.exports = ClientSchema;