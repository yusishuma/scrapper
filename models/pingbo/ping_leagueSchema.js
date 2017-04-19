/**
 * Created by tonghema on 13/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../../utils/constants');
var ping_leagueSchema = new Schema({
    "id":  {
        type: String,
        unique: true
    },
    "name": String,
    "homeTeamType": String,
    "hasOfferings": Boolean,
    "allowRoundRobins": Boolean
});
module.exports = ping_leagueSchema;