/**
 * Created by tonghema on 27/03/2017.
 */
var app = require('../../app');
var request = require('supertest');
var mongoose = require('mongoose');
var Strategy = require('../../models/index').StrategyModel;
describe('Testing normal strategy controller', function () {
    var strategy, strategyId;
    var agent = request.agent(app);
    before(function (done) {
        strategy = new Strategy({
            title: 'test strategy',
            description: 'test strategy description'
        });

        strategy.save(function (err, result) {
            if (!!err) {
                done(err);
                return;
            }
            console.log(result);
            strategyId = result._id;
            done();
        });
    });
    // after(function (done) {
    //     Strategy.remove(done);
    // });
    it('should be able get a strategy', function (done) {
        console.log(strategyId);
        done();
    });
});