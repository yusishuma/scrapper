'use strict';

module.exports = {

    SOURCE: {
        // 后台添加
        BACKSTAGE: 1,
        // EGB网站
        EGB: 2,
        //平博网站
        PING_BO: 3
    },
    PING_BO: {
        HEADERS: {
            'Authorization': 'Basic eXVzaXNodW1hOnl1c2lzaHVtYTEyMw==',
            'Accept': 'application/json'
        }
    },
    SERVER_URL: 'http://47.94.3.18:8040',
    GAME_TYPE: {
        CSGO: 1,
        LOL: 2,
        DOTA2: 3
    },
    EGB_URL: 'https://egb.com/bets',
    HEADER: {
        'content-type': 'application/json; charset=utf8',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6',
        'Connection': 'keep-alive',
        'Host': 'egb.com',
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': 'https://egb.com/tables',
        'X-NewRelic-ID': 'XAYFUVVWGwIDUFhVBgIH',
        'X-CSRF-Token': 'VE0XH+M84l41R0n/P18ZNDuncpvnjjtOECtvx3iZJx0=',
        'If-None-Match': 'W/"19b462c07454d25fd54aa54fc6b6b037"',
        'Upgrade-Insecure-Requests': 1,
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        'Cookie': '__cfduid=d9c28475dd2ccaa971d1b9f18f22c30911490583933; lang=en; is_first_time=1; referer=; _ym_uid=1490583959307825007; cf_clearance=01d5351de66cf34b24b975401c764a289857be94-1491556743-604800; __utmt=1; _ym_isad=1; __utma=173397943.771898417.1490583957.1490583957.1491556749.2; __utmb=173397943.3.10.1491556749; __utmc=173397943; __utmz=173397943.1490583957.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ym_visorc_33090373=w; f=%5B1%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C0%2C7%5D; cloudflare_uid=GsQxoveppsJy9Us2tpKkp6FhxmnmRnKY_za6VwRj; _egb_session=bFpQSHhPa2YrQkVsMDBCUkExVXIxbjhJbFAvZTZSUzRPcFNnSHBQeG90cVR1Mk5BbTJhRkNkMWpwalRCeDJUbVd1Y2lOTVh6RHpodkZaSDIyeDJtUDZQT0JnbG1DSDhpS0dwaGpQVUJrYUJXWWwzQlF0RG5uVTJiRDRNT09IR0NDQUx5dmNYeElnY095N0RNRExxU3VzYkpscTMvVHFiSDYrcXdSaGFJeDdwYS9lSjMxZmtZWTROQ3dXVjVROTNILS1kNy9NV3VwSHdaUDluV1FLYVJMV3N3PT0%3D--5bce666515978bf46545aeb80a835b0f4bd279fd'
    },
    BET_STATUS: {
        END: 2,
        BEGINNING: 1,
        NOT_START: 0
    },
    EXIST_PRODUCTION: {
        NO_EXIST: 0,
        EXIST: 1
    },
    // 赛事状态
    MATCH_STATUS: {
        //竞猜中
        BETTING: 1,
        //获取中
        RESULTGETTING: 2,
        //已结束
        ISEND: 3,
        //流盘
        NORESULT: 4
    },
    /**
     * 转换游戏类型
     */
    translateGameType: function (gameType) {
        switch (gameType) {
            case 'Counter-Strike':
                return 1;
            case 'CS:GO':
                return 1;
            case 'CSGO':
                return 1;
            case 'LoL':
                return 2;
            case 'LOL':
                return 2;
            case 'League of Legends':
                return 2;
            case 'Dota2':
                return 3;
            case 'DOTA2':
                return 3;
            case 'Dota 2':
                return 3;

        }
    },
    /**
     * 转换战队名称
     */
    parseTeamName: function (teamName) {
        if (teamName.indexOf('(') !== -1) {
            teamName = teamName.substr(0, teamName.indexOf('('));
        }
        return teamName.trim();
    },
    /**
     * 转化赔率
     */
    parseOdds: function (number, maxNum) {
        if(number < 0){
            number = -number;
            return ((number + maxNum)/number).toFixed(3)
        }else{
            return ((number + maxNum)/maxNum).toFixed(3)
        }
    },
    /**
     * 生成Match名称
     */
    generateMatchName: function (teamA, teamB) {

        return teamA + ' VS ' + teamB;
    },
    PAGINATE: {
        PAGE: 1,
        LIMIT: 20
    },
    ROLE: {
        CUSTOMER: 0,
        ADMIN: 1,
        DESIGNER: 2
    },
    AVOS: {
        APP_ID: "odvAKLksl71NqBhYhRarjkWs-gzGzoHsz",
        APP_KEY: "Bt9HQ5dSsO1V8kvnT5oitEdF"
    },
    /**
     *session 配置
     *@type {{SECRET: string, MAX_AGE: number}}
     */
    SESSION: {
        SECRET: 'fluorescence',
        MAX_AGE: 24 * 60 * 60 * 1000 * 30,
        TOKEN_LIFE: 24 * 60 * 60 * 1000 * 30
    },
    /**
     * 数据库 配置
     * @type {{DB_URI: string, RECONNECT_TIME: number}}
     */
    MONGODB_ENV: {
        DB_URI: 'mongodb://47.93.44.14:27017/bets',
        RECONNECT_TIME: 300
    },
    /**
     *  赛事等级
     */
    LEAGUE_LEVEL: {
        FIRST: 1,
        SECOND: 2,
        THREE: 3
    },
    /**
     * 赛事等级转换风险金
     */
    translaterRiskFund: function (LEAGUE_LEVEL) {
        switch (LEAGUE_LEVEL) {
            case 1:
                return 10000;
            case 2:
                return 20000;
            case 3:
                return 30000;
            default:
                return 10000;

        }
    },
    /**
     * 赛事等级转换单注赔付上限
     */
    translaterPayCeiling: function (LEAGUE_LEVEL) {
        switch (LEAGUE_LEVEL) {
            case 1:
                return 1000;
            case 2:
                return 2000;
            case 3:
                return 3000;
            default:
                return 1000;

        }
    }
};
