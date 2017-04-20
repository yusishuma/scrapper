/**
 * Created by tonghema on 19/04/2017.
 */
var express = require('express');
var router = express.Router();
var team = require('../controllers/team_controller');

/* GET 队伍 listing. */
router.get('/', team.getTeamsByList);

/* 获取队伍信息 */
router.get('/:teamId', team.getTeam);

/* 更新队伍信息 */
router.put('/:teamId', team.updateTeam);
module.exports = router;
