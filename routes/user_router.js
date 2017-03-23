var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
/* 验证手机号是否存在 */
router.post('/validatePhone', user.validatePhone);

module.exports = router;
