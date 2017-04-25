define({ api: [
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/gambles/:gambleId",
    "title": "获取赌局详情",
    "name": "GetGamble",
    "group": "Gambles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "gambleId",
            "optional": false,
            "description": "<p>赌局ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.gambleName",
            "optional": false,
            "description": "<p>赌局名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.level",
            "optional": false,
            "description": "<p>赌局等级</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.riskFund",
            "optional": false,
            "description": "<p>赌局风险金</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.payCeiling",
            "optional": false,
            "description": "<p>赌局单注赔付上限</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gambleStatus",
            "optional": false,
            "description": "<p>赌局正服是否存在【 0 不存在 1 存在 】</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n  \"msg\": \"success\",\n  \"status\": 1,\n  \"data\": {\n    \"gameType\": \"CSGO\",\n    \"gambleName\": \"CS:GO - Assembly AMD Challenge\",\n    \"level\": 1,\n    \"gambleSource\": 2,\n    \"riskFund\": 10000,\n    \"payCeiling\": 1000,\n    \"gambleStatus\": 2,\n    \"createdAt\": \"2017-04-19T09:43:30.377Z\",\n    \"gambleId\": \"58f70f261b00bbf93204fea7\"\n  }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/gamble.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/gambles?limit=12&gameType=1&page=1",
    "title": "获取赌局列表",
    "name": "GetGambles",
    "group": "Gambles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "gameType",
            "optional": false,
            "description": "<p>游戏类型【CSGO：1， LOL: 2, DOTA2: 3】</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "limit",
            "optional": false,
            "description": "<p>每页显示条目数（步长）默认为 20</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "optional": false,
            "description": "<p>当前页数 &gt; = 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.gambles",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.league",
            "optional": false,
            "description": "<p>所属赛事</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.league.leagueName",
            "optional": false,
            "description": "<p>所属赛事名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.league.leagueId",
            "optional": false,
            "description": "<p>所属赛事ID</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.gambles.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.gambles.gambleName",
            "optional": false,
            "description": "<p>赌局名称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.gambles.match",
            "optional": false,
            "description": "<p>赌局所属比赛</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gambles.endTime",
            "optional": false,
            "description": "<p>赌局结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gambles.gambleSource",
            "optional": false,
            "description": "<p>赌局来源</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.gambles.optionA",
            "optional": false,
            "description": "<p>赌局下注项A</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gambles.optionA.riskFund",
            "optional": false,
            "description": "<p>赌局风险金</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gambles.optionA.payCeiling",
            "optional": false,
            "description": "<p>赌局单注赔付上限</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.gambles.optionB",
            "optional": false,
            "description": "<p>赌局下注项A</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gambles.optionB.riskFund",
            "optional": false,
            "description": "<p>赌局风险金</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gambles.optionB.payCeiling",
            "optional": false,
            "description": "<p>赌局单注赔付上限</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": {\n       \"gambles\": [\n           {\n               \"gameType\": 1,\n               \"gambleType\": 1,\n               \"gambleName\": \"胜负\",\n               \"endTime\": 1492768800,\n               \"gambleStatus\": 2,\n               \"league\": {\n                   \"leagueName\": \"CS:GO - Assembly AMD Challenge\",\n                   \"leagueId\": \"58f70f261b00bbf93204fea7\"\n               },\n               \"match\": \"Fnatic vs Misfits\",\n               \"gambleSourceId\": \"261799\",\n               \"gambleSource\": 2,\n               \"commentNum\": 0,\n               \"isExist\": 0,\n               \"allBetPeopleNum\": 0,\n               \"allBetAmount\": 0,\n               \"optionB\": {\n                   \"riskFund\": 20000,\n                   \"payCeiling\": 2000,\n                   \"win\": false,\n                   \"odds\": 1.45\n               },\n               \"optionA\": {\n                   \"riskFund\": 10000,\n                   \"payCeiling\": 1000,\n                   \"win\": false,\n                   \"odds\": 1.65\n               },\n               \"createdAt\": \"2017-04-21T10:59:11.301Z\",\n               \"gambleId\": \"58f9c2681b00bbf932055dfa\"\n           },\n           {\n               \"gameType\": 1,\n               \"gambleType\": 1,\n               \"gambleName\": \"胜负\",\n               \"endTime\": 1492764454,\n               \"gambleStatus\": 2,\n               \"league\": {\n                   \"leagueName\": \"CS:GO - Assembly AMD Challenge\",\n                   \"leagueId\": \"58f70f261b00bbf93204fea7\"\n               },\n               \"match\": \"Fnatic vs Misfits\",\n               \"gambleSourceId\": \"261799\",\n               \"gambleSource\": 2,\n               \"commentNum\": 0,\n               \"isExist\": 0,\n               \"allBetPeopleNum\": 0,\n               \"allBetAmount\": 0,\n               \"optionB\": {\n                   \"riskFund\": 20000,\n                   \"payCeiling\": 2000,\n                   \"win\": false,\n                   \"odds\": 1.67\n               },\n               \"optionA\": {\n                   \"riskFund\": 10000,\n                   \"payCeiling\": 1000,\n                   \"win\": true,\n                   \"odds\": 1.25\n               },\n               \"createdAt\": \"2017-04-21T10:59:11.304Z\",\n               \"gambleId\": \"58f9c7951b00bbf93205630a\"\n           }\n       ],\n       \"count\": 2\n   }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/gamble.js"
  },
  {
    "version": "1.0.0",
    "type": "POST",
    "url": "/gambles",
    "title": "同步创建赌局",
    "name": "synchroGambleToPro",
    "group": "Gambles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "gambleId",
            "optional": false,
            "description": "<p>赌局ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"同步创建赌局成功\",\n   \"status\": 1,\n   \"data\": {}\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/gamble.js"
  },
  {
    "version": "1.0.0",
    "type": "PUT",
    "url": "/gambles/:gambleId",
    "title": "更新赌局",
    "name": "updateGamble",
    "group": "Gambles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "gambleId",
            "optional": false,
            "description": "<p>赌局ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "field": "optionA",
            "optional": false,
            "description": "<p>赌局下注项A</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "optionA.riskFund",
            "optional": false,
            "description": "<p>赌局下注项A</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "optionA.payCeiling",
            "optional": false,
            "description": "<p>赌局下注项A</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "field": "optionB",
            "optional": false,
            "description": "<p>赌局下注项B</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "optionB.riskFund",
            "optional": false,
            "description": "<p>赌局下注项B</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "optionB.payCeiling",
            "optional": false,
            "description": "<p>赌局下注项B</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request-Example:",
        "content": "{\"optionB\": {\n         \"riskFund\": 20000,\n         \"payCeiling\": 2000\n       },\n       \"optionA\": {\n         \"riskFund\": 10000,\n         \"payCeiling\": 1000\n       }\n}\n",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"更新赌局成功\",\n   \"status\": 1,\n   \"data\": {}\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/gamble.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/leagues/:leagueId",
    "title": "获取赛事详情",
    "name": "GetLeague",
    "group": "Leagues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "leagueId",
            "optional": false,
            "description": "<p>赛事ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.leagueName",
            "optional": false,
            "description": "<p>赛事名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.level",
            "optional": false,
            "description": "<p>赛事等级</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.riskFund",
            "optional": false,
            "description": "<p>赛事风险金</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.payCeiling",
            "optional": false,
            "description": "<p>赛事单注赔付上限</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.isExist",
            "optional": false,
            "description": "<p>赛事正服是否存在【 0 不存在 1 存在 】</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n  \"msg\": \"success\",\n  \"status\": 1,\n  \"data\": {\n    \"gameType\": \"CSGO\",\n    \"leagueName\": \"CS:GO - Assembly AMD Challenge\",\n    \"level\": 1,\n    \"leagueSource\": 2,\n    \"riskFund\": 10000,\n    \"payCeiling\": 1000,\n    \"isExist\": 2,\n    \"createdAt\": \"2017-04-19T09:43:30.377Z\",\n    \"leagueId\": \"58f70f261b00bbf93204fea7\"\n  }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/league.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/leagues?limit=12&gameType=1&page=1",
    "title": "获取赛事列表",
    "name": "GetLeagues",
    "group": "Leagues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "gameType",
            "optional": false,
            "description": "<p>游戏类型【CSGO：1， LOL: 2, DOTA2: 3】</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "limit",
            "optional": false,
            "description": "<p>每页显示条目数（步长）默认为 20</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "optional": false,
            "description": "<p>当前页数 &gt; = 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.leagues",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.leagues.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.leagues.leagueName",
            "optional": false,
            "description": "<p>赛事名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.leagues.level",
            "optional": false,
            "description": "<p>赛事等级</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.leagues.riskFund",
            "optional": false,
            "description": "<p>赛事风险金</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.leagues.payCeiling",
            "optional": false,
            "description": "<p>赛事单注赔付上限</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n \"msg\": \"success\",\n \"status\": 1,\n \"data\": {\n   \"leagues\": [\n     {\n       \"gameType\": \"CSGO\",\n       \"leagueName\": \"CS:GO - Assembly AMD Challenge\",\n       \"level\": 1,\n       \"leagueSource\": 2,\n       \"riskFund\": 10000,\n       \"payCeiling\": 1000,\n       \"isExist\": 2,\n       \"createdAt\": \"2017-04-19T08:31:16.291Z\",\n       \"leagueId\": \"58f70f261b00bbf93204fea7\"\n     }\n   ],\n   \"count\": 1\n }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/league.js"
  },
  {
    "version": "1.0.0",
    "type": "POST",
    "url": "/leagues",
    "title": "同步创建赛事",
    "name": "synchroLeagueToPro",
    "group": "Leagues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "leagueId",
            "optional": false,
            "description": "<p>赛事ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"同步创建赛事成功\",\n   \"status\": 1,\n   \"data\": {}\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/league.js"
  },
  {
    "version": "1.0.0",
    "type": "PUT",
    "url": "/leagues/:leagueId",
    "title": "更新赛事",
    "name": "updateLeague",
    "group": "Leagues",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "leagueId",
            "optional": false,
            "description": "<p>赛事ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "level",
            "optional": false,
            "description": "<p>赛事等级</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request-Example:",
        "content": "{\n\"level\":\"2\"\n}\n",
        "type": "json"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"更新赛事成功\",\n   \"status\": 1,\n   \"data\": {}\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/league.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/matches?limit=12&gameType=1&page=1",
    "title": "获取赛程列表",
    "name": "GetMatches",
    "group": "Matches",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "gameType",
            "optional": false,
            "description": "<p>游戏类型【CSGO：1， LOL: 2, DOTA2: 3】</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "limit",
            "optional": false,
            "description": "<p>每页显示条目数（步长）默认为 20</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "optional": false,
            "description": "<p>当前页数 &gt; = 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.matches",
            "optional": false,
            "description": "<p>赛程</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.matches.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.matches.matchName",
            "optional": false,
            "description": "<p>赛程名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n    \"msg\": \"success\",\n    \"status\": 1,\n    \"data\": {\n        \"matches\": [\n            {\n                \"matchName\": \"Tricked\",\n                \"gameType\": \"CSGO\",\n                \"isExist\": 0,\n                \"createdAt\": \"2017-04-24T03:30:29.810Z\",\n                \"matchId\": \"58fd65801b00bbf932058b6e\"\n            },\n            {\n                \"matchName\": \"passions\",\n                \"gameType\": \"CSGO\",\n                \"isExist\": 0,\n                \"createdAt\": \"2017-04-24T03:30:29.812Z\",\n                \"matchId\": \"58fd71121b00bbf9320593ec\"\n            }\n        ],\n        \"count\": 2\n    }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/match.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/teams/:teamId",
    "title": "获取战队详情",
    "name": "GetTeam",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "teamId",
            "optional": false,
            "description": "<p>战队ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.teamName",
            "optional": false,
            "description": "<p>战队名称</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.isExist",
            "optional": false,
            "description": "<p>战队正服是否存在【 0 不存在 1 存在 】</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n  \"msg\": \"success\",\n  \"status\": 1,\n  \"data\": {\n    \"teamName\": \"Tricked\",\n    \"gameType\": \"CSGO\",\n    \"isExist\": 0,\n    \"createdAt\": \"2017-04-24T03:38:21.178Z\",\n    \"teamId\": \"58fd65801b00bbf932058b6e\"\n  }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/team.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/teams?limit=12&gameType=1&page=1",
    "title": "获取战队列表",
    "name": "GetTeams",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "field": "gameType",
            "optional": false,
            "description": "<p>游戏类型【CSGO：1， LOL: 2, DOTA2: 3】</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "limit",
            "optional": false,
            "description": "<p>每页显示条目数（步长）默认为 20</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "optional": false,
            "description": "<p>当前页数 &gt; = 1</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.teams",
            "optional": false,
            "description": "<p>战队</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.teams.gameType",
            "optional": false,
            "description": "<p>游戏类型</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.teams.teamName",
            "optional": false,
            "description": "<p>战队名称</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n    \"msg\": \"success\",\n    \"status\": 1,\n    \"data\": {\n        \"teams\": [\n            {\n                \"teamName\": \"Tricked\",\n                \"gameType\": \"CSGO\",\n                \"isExist\": 0,\n                \"createdAt\": \"2017-04-24T03:30:29.810Z\",\n                \"teamId\": \"58fd65801b00bbf932058b6e\"\n            },\n            {\n                \"teamName\": \"passions\",\n                \"gameType\": \"CSGO\",\n                \"isExist\": 0,\n                \"createdAt\": \"2017-04-24T03:30:29.812Z\",\n                \"teamId\": \"58fd71121b00bbf9320593ec\"\n            }\n        ],\n        \"count\": 2\n    }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/team.js"
  },
  {
    "version": "1.0.0",
    "type": "POST",
    "url": "/teams",
    "title": "同步创建战队",
    "name": "synchroTeamToPro",
    "group": "Teams",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "teamId",
            "optional": false,
            "description": "<p>赌局ID</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"同步创建战队成功\",\n   \"status\": 1,\n   \"data\": {}\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/team.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/users/:userId",
    "title": "获取用户信息",
    "name": "GetUserInfo",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "userId",
            "optional": false,
            "description": "<p>[userId, me]参数为me时，获取登陆用户自己的信息</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.nickname",
            "optional": false,
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.avatar",
            "optional": false,
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.role",
            "optional": false,
            "description": "<p>用户角色</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"role\": 0,\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/login",
    "title": "登陆",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.nickname",
            "optional": false,
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.avatar",
            "optional": false,
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.role",
            "optional": false,
            "description": "<p>用户角色</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.gender",
            "optional": false,
            "description": "<p>{ 0 未知，1 男 2 女 } 用户性别.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"role\": \"0\",\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/register",
    "title": "用户注册",
    "name": "register",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "password",
            "optional": false,
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "nickname",
            "optional": false,
            "description": "<p>用户密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.nickname",
            "optional": false,
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.avatar",
            "optional": false,
            "description": "<p>用户头像</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.role",
            "optional": false,
            "description": "<p>用户角色</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"role\": \"0\",\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/requestSmsCode",
    "title": "获取短信验证码",
    "name": "requestSmsCode",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"获取短信验证码成功\",\n     \"status\": 1,\n     \"data\": {\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/users/:userId",
    "title": "更新用户信息",
    "name": "updateUser",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "userId",
            "optional": false,
            "description": "<p>用户信息Id∑</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request-Example:",
        "content": "{\n\"userId\":\"58d878838b81190732fdd202\",\n\"nickname\": \"昵称\",\n\"avatar\": \"avatar.jpg\",\n}\n",
        "type": "json"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n    \"msg\": \"更新成功！\",\n    \"status\": 1,\n    \"data\": {}\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/verifySmsCode",
    "title": "验证短信验证码",
    "name": "verifySmsCode",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "username",
            "optional": false,
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "field": "smsCode",
            "optional": false,
            "description": "<p>短信验证码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"验证成功\",\n     \"status\": 1,\n     \"data\": {\n     }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "NotFound",
            "optional": false,
            "description": "<p>.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"NotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/user.js"
  }
] });