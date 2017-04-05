var express = require('express');
var router = express.Router();
var user = require('../controllers/user_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* 获取用户信息 */
router.get('/:userId', user.getUser);

/* 验证手机号是否存在 */
router.post('/validatePhone', user.validatePhone);

/* 验证手机号是否存在 */
router.put('/:userId', user.updateUser);
module.exports = router;
