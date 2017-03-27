/**
 * Created by tonghema on 27/03/2017.
 */

var express = require('express');
var router = express.Router();
var production = require('../controllers/production_controller');

/* GET strategies listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* GET strategy by strategyId */
router.get('/:productionId', production.getProduction);


module.exports = router;