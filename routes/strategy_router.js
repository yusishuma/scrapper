/**
 * Created by tonghema on 27/03/2017.
 */
var express = require('express');
var router = express.Router();
var strategy = require('../controllers/strategy_controller');

/* GET strategies listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* GET strategy by strategyId */
router.get('/:strategyId', strategy.getStrategy);


module.exports = router;