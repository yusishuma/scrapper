var express = require('express');
var router = express.Router();
var user = require('../controllers/user_controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
router.get('/:userId', user.getUser);

/* 验证手机号是否存在 */
router.post('/validatePhone', user.validatePhone);


module.exports = router;
