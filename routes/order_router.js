/**
 * Created by tonghema on 30/03/2017.
 */
var express = require('express');
var router = express.Router();
var order_controller = require('../controllers/order_controller');

/* 获取订单列表 */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* 生成新订单 */
router.post('/', order_controller.createOrder);

/* 获取订单详情 */
router.get('/:orderId', order_controller.getOrder);


module.exports = router;
