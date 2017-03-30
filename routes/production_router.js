/**
 * Created by tonghema on 27/03/2017.
 */

var express = require('express');
var router = express.Router();
var production = require('../controllers/production_controller');

/* GET productions listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* 获取商品详情 */
router.get('/:productionId', production.getProduction);


module.exports = router;