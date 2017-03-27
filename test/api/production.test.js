/**
 * Created by tonghema on 27/03/2017.
 */

var app = require('../../app');
var request = require('supertest');
var mongoose = require('mongoose');
var Production = require('../../models/index').ProductionModel;
describe('Testing normal production controller', function () {
    var production, productionId;
    var agent = request.agent(app);
    before(function (done) {
        production = new Production({
            price: 100,
            amount: 50,
            cover:'',
            showImages:[],
            description: 'test production description'
        });

        production.save(function (err, result) {
            if (!!err) {
                done(err);
                return;
            }
            console.log(result);
            productionId = result._id;
            done();
        });
    });
    // after(function (done) {
    //     Strategy.remove(done);
    // });
    it('should be able get a production', function (done) {
        console.log(productionId);
        done();
    });
});