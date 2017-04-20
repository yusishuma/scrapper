/**
 * Created by tonghema on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var gamble = require('../controllers/gamble_controller');

/* GET 赌局 listing. */
router.get('/', gamble.getGamblesByList);

// /* 获取赌局信息 */
// router.get('/:gambleId', gamble.getGamble);

/* 更新赌局信息 */
router.put('/:gambleId', gamble.updateGamble);
module.exports = router;