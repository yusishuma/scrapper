/**
 * Created by tonghema on 13/04/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CONSTANTS = require('../utils/CONSTANTS');
var eventSchema = new Schema({
    leagueId: String,
    leagueName: String,
    id:  {
            type: String,
            unique: true
        },
    starts: Number,
    home: String,
    away: String,
    rotNum: String,
    liveStatus: Number,
    status: String,
    parlayRestriction: Number,
    settled: {
        type: Boolean,
        default: false
    },
    odds: [],
    periods: [
        // {
        //     "number": 0,
        //     "status": 1,
        //     "settlementId": 1278497,
        //     "settledAt": "2017-04-13T10:13:49Z",
        //     "team1Score": 0,
        //     "team2Score": 1
        // }1
    ],
    exist_production: {
        type: Number,
        default: CONSTANTS.EXIST_PRODUCTION.NO_EXIST
    }
});
module.exports = eventSchema;