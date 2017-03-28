define({ api: [
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/index",
    "title": "获取首页信息",
    "name": "GetIndexInfo",
    "group": "Index",
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
            "field": "data.title",
            "optional": false,
            "description": "<p>活动 标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.cover",
            "optional": false,
            "description": "<p>活动 封面</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.description",
            "optional": false,
            "description": "<p>活动 描述</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "data.startDate",
            "optional": false,
            "description": "<p>活动 开始时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Date",
            "field": "data.endDate",
            "optional": false,
            "description": "<p>活动 结束时间</p>"
          },
          {
            "group": "Success 200",
            "type": "Objects",
            "field": "data.productions",
            "optional": false,
            "description": "<p>活动 商品列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.status",
            "optional": false,
            "description": "<p>{0 未发布，1 已发布} 活动状态 接口得到的数据都是已发布的.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n    \"msg\": \"success\",\n    \"status\": 1,\n    \"data\": {\n        \"title\": \"test strategy\",\n        \"description\": \"test strategy description\",\n        \"updatedAt\": \"2017-03-27 16:38:57\",\n        \"createdAt\": \"2017-03-27 16:38:57\",\n        \"endDate\": \"2017-03-27 16:38:57\",\n        \"startDate\": \"2017-03-27 16:38:57\",\n        \"productions\": [\n            {\n                \"price\": 100,\n                \"amount\": 50,\n                \"cover\": \"http:// 192.168.2.29:3060/test1_cover.png\",\n                \"title\": \"精品卫衣\",\n                \"designer\": {\n                    \"username\": \"15911020373\",\n                    \"avatar\": \"http:// 192.168.2.29:3060/test1_avatar.jpg\",\n                    \"design\": {\n                        \"title\": \"一个好的创意\",\n                        \"img\": \"\",\n                        \"content\": \"就是个好的创意，就这么不讲理\"\n                    },\n                    \"gender\": 1,\n                    \"nickname\": \"yusi\",\n                    \"updatedAt\": \"2017-03-28 10:43:30\",\n                    \"createdAt\": \"2017-03-28 10:43:30\",\n                    \"userId\": \"58d878838b81190732fdd202\"\n                },\n                \"description\": \"test production description\",\n                \"showImages\": [\n                    \"http:// 192.168.2.29:3060/test1_show1.png\",\n                    \"http:// 192.168.2.29:3060/test1_show2.png\",\n                    \"http:// 192.168.2.29:3060/test1_show3.png\"\n                ],\n                \"status\": 1,\n                \"updatedAt\": \"2017-03-28 10:43:30\",\n                \"createdAt\": \"2017-03-28 10:43:30\",\n                \"productionId\": \"58d8d1ae56e9cb0ee6235303\"\n            }\n        ],\n        \"status\": 1,\n        \"strategyId\": \"58d8cfa18c9c200ebaae2239\",\n        \"cover\": \"http:// 192.168.2.29:3060/undefined\"\n    }\n}\n",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "field": "UserNotFound",
            "optional": false,
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "Error-Response:\n   HTTP/1.1 404 Not Found\n   {\n     \"error\": \"UserNotFound\"\n   }\n",
          "type": "json"
        }
      ]
    },
    "filename": "routes/apidoc/index.js"
  }
] });