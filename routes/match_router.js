/**
 * Created by tonghema on 25/04/2017.
 */
/**
 * Created by tonghema on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var match = require('../controllers/match_controller');

/* GET 赛程 listing. */
router.get('/', match.getMatchesByList);

/* 获取赛程信息 */
// router.get('/:matchId', match.getMatch);

/* 更新赛程信息 */
// router.put('/:matchId', match.updateMatch);

/* 保存赛程信息到正服数据 */
// router.post('/', match.synchroMatchToPro);
module.exports = router;
