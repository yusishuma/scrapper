define({ api: [
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/contacts/:contactId",
    "title": "获取收货信息详情",
    "name": "GetContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "contactId",
            "optional": false,
            "description": ""
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
            "field": "data.name",
            "optional": false,
            "description": "<p>收货人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.phone",
            "optional": false,
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.owner",
            "optional": false,
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.shippingAddress",
            "optional": false,
            "description": "<p>用户设计思路文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.province",
            "optional": false,
            "description": "<p>省</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.city",
            "optional": false,
            "description": "<p>市</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.area",
            "optional": false,
            "description": "<p>区</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.details",
            "optional": false,
            "description": "<p>详细地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.isDefault",
            "optional": false,
            "description": "<p>是否为默认地址</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": {\n       \"owner\": \"58d878838b81190732fdd202\",\n       \"phone\": \"15911020373\",\n       \"updatedAt\": \"2017-03-30 17:13:10\",\n       \"createdAt\": \"2017-03-30 17:13:10\",\n       \"isDefault\": true,\n       \"shippingAddress\": {\n           \"province\": \"北京\",\n           \"city\": \"北京市\",\n           \"area\": \"朝阳区\",\n           \"details\": \"东方科技园\"\n       },\n       \"name\": \"首单人\",\n       \"contactId\": \"58dccc26541a09a0a5b61b73\"\n   }\n}\n",
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
    "filename": "routes/apidoc/contact.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/contacts",
    "title": "获取收货信息列表",
    "name": "GetContactList",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "userId",
            "optional": false,
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data",
            "optional": false,
            "description": "<p>请求结果</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.name",
            "optional": false,
            "description": "<p>收货人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.phone",
            "optional": false,
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.owner",
            "optional": false,
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.shippingAddress",
            "optional": false,
            "description": "<p>用户设计思路文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.province",
            "optional": false,
            "description": "<p>省</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.city",
            "optional": false,
            "description": "<p>市</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.area",
            "optional": false,
            "description": "<p>区</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.details",
            "optional": false,
            "description": "<p>详细地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.isDefault",
            "optional": false,
            "description": "<p>是否为默认地址</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": [\n       {\n           \"owner\": \"58d878838b81190732fdd202\",\n           \"phone\": \"15911020373\",\n           \"updatedAt\": \"2017-03-30 17:13:10\",\n           \"createdAt\": \"2017-03-30 17:13:10\",\n           \"isDefault\": true,\n           \"shippingAddress\": {\n               \"province\": \"北京\",\n               \"city\": \"北京市\",\n               \"area\": \"朝阳区\",\n               \"details\": \"东方科技园\"\n           },\n           \"name\": \"首单人\",\n           \"contactId\": \"58dccc26541a09a0a5b61b73\"\n       }\n   ]\n}\n",
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
    "filename": "routes/apidoc/contact.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/contacts",
    "title": "创建收货信息",
    "name": "createContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "owner",
            "optional": false,
            "description": "<p>用户Id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request-Example:",
        "content": "{\n\"owner\":\"58d878838b81190732fdd202\",\n\"phone\": \"15911020373\",\n\"name\": \"首单人\",\n\"shippingAddress\":{\n\t\"province\":\"北京\",\n\t\"city\":\"北京市\",\n\t\"area\":\"朝阳区\",\n\t\"details\":\"东方科技园\"\n}\n}\n",
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
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.name",
            "optional": false,
            "description": "<p>收货人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.phone",
            "optional": false,
            "description": "<p>联系电话</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.owner",
            "optional": false,
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.shippingAddress",
            "optional": false,
            "description": "<p>用户设计思路文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.province",
            "optional": false,
            "description": "<p>省</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.city",
            "optional": false,
            "description": "<p>市</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.area",
            "optional": false,
            "description": "<p>区</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.shippingAddress.details",
            "optional": false,
            "description": "<p>详细地址</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.isDefault",
            "optional": false,
            "description": "<p>是否为默认地址</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": {\n       \"owner\": \"58d878838b81190732fdd202\",\n       \"phone\": \"15911020373\",\n       \"updatedAt\": \"2017-03-30 17:13:10\",\n       \"createdAt\": \"2017-03-30 17:13:10\",\n       \"isDefault\": true,\n       \"shippingAddress\": {\n           \"province\": \"北京\",\n           \"city\": \"北京市\",\n           \"area\": \"朝阳区\",\n           \"details\": \"东方科技园\"\n       },\n       \"name\": \"首单人\",\n       \"contactId\": \"58dccc26541a09a0a5b61b73\"\n   }\n}\n",
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
    "filename": "routes/apidoc/contact.js"
  },
  {
    "version": "1.0.0",
    "type": "put",
    "url": "/contacts/:contactId",
    "title": "更新收货信息",
    "name": "updateContact",
    "group": "Contact",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "contactId",
            "optional": false,
            "description": "<p>收货信息Id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request-Example:",
        "content": "{\n\"owner\":\"58d878838b81190732fdd202\",\n\"phone\": \"15911020373\",\n\"name\": \"首单人\",\n\"shippingAddress\":{\n\t\"province\":\"北京\",\n\t\"city\":\"北京市\",\n\t\"area\":\"朝阳区\",\n\t\"details\":\"东方科技园\"\n}\n}\n",
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
    "filename": "routes/apidoc/contact.js"
  },
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
            "type": "Objects",
            "field": "data.productions.designers",
            "optional": false,
            "description": "<p>活动 商品设计师列表</p>"
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
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n    \"msg\": \"success\",\n    \"status\": 1,\n    \"data\": {\n        \"title\": \"test strategy\",\n        \"description\": \"test strategy description\",\n        \"updatedAt\": \"2017-03-27 16:38:57\",\n        \"createdAt\": \"2017-03-27 16:38:57\",\n        \"endDate\": \"2017-03-27 16:38:57\",\n        \"startDate\": \"2017-03-27 16:38:57\",\n        \"productions\": [\n            {\n                \"price\": 100,\n                \"amount\": 50,\n                \"cover\": \"http://192.168.2.29:3000/test1_cover.png\",\n                \"title\": \"精品卫衣\",\n                \"designers\": [{\n                    \"username\": \"15911020373\",\n                    \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n                    \"design\": {\n                        \"title\": \"一个好的创意\",\n                        \"img\": \"\",\n                        \"content\": \"就是个好的创意，就这么不讲理\"\n                    },\n                    \"gender\": 1,\n                    \"nickname\": \"yusi\",\n                    \"updatedAt\": \"2017-03-28 10:43:30\",\n                    \"createdAt\": \"2017-03-28 10:43:30\",\n                    \"userId\": \"58d878838b81190732fdd202\"\n                }],\n                \"description\": \"test production description\",\n                \"showImages\": [\n                    \"http://192.168.2.29:3000/test1_show1.png\",\n                    \"http://192.168.2.29:3000/test1_show2.png\",\n                    \"http://192.168.2.29:3000/test1_show3.png\"\n                ],\n                \"status\": 1,\n                \"updatedAt\": \"2017-03-28 10:43:30\",\n                \"createdAt\": \"2017-03-28 10:43:30\",\n                \"productionId\": \"58d8d1ae56e9cb0ee6235303\"\n            }\n        ],\n        \"status\": 1,\n        \"strategyId\": \"58d8cfa18c9c200ebaae2239\",\n        \"cover\": \"http://192.168.2.29:3000/undefined\"\n    }\n}\n",
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
    "filename": "routes/apidoc/index.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/login",
    "title": "登陆",
    "name": "login",
    "group": "Index",
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
            "type": "Object",
            "field": "data.design",
            "optional": false,
            "description": "<p>用户设计思路文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.title",
            "optional": false,
            "description": "<p>用户设计标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.content",
            "optional": false,
            "description": "<p>用户设计内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.img",
            "optional": false,
            "description": "<p>用户设计图</p>"
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
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"design\": {\n         \"title\": \"一个好的创意\",\n         \"img\": \"http://192.168.2.29:3000/test1_img.png\",\n         \"content\": \"我总是发誓平安夜不睡觉，我想听屋顶上驯鹿奔跑的舞步，想在烟囱那儿与圣诞老人握手。 而这个圣诞节在我看来，似乎没有比什么比保持清醒更容易做到的事情了。\"\n       },\n       \"role\": \"0\",\n       \"gender\": 1,\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
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
    "filename": "routes/apidoc/index.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/register",
    "title": "用户注册",
    "name": "register",
    "group": "Index",
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
            "type": "Object",
            "field": "data.design",
            "optional": false,
            "description": "<p>用户设计思路文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.title",
            "optional": false,
            "description": "<p>用户设计标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.content",
            "optional": false,
            "description": "<p>用户设计内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.img",
            "optional": false,
            "description": "<p>用户设计图</p>"
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
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"role\": \"0\",\n       \"gender\": 1,\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
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
    "filename": "routes/apidoc/index.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/requestSmsCode",
    "title": "获取短信验证码",
    "name": "requestSmsCode",
    "group": "Index",
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
    "filename": "routes/apidoc/index.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/verifySmsCode",
    "title": "验证短信验证码",
    "name": "verifySmsCode",
    "group": "Index",
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
    "filename": "routes/apidoc/index.js"
  },
  {
    "version": "1.0.0",
    "type": "post",
    "url": "/orders",
    "title": "创建订单信息",
    "name": "createOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "owner",
            "optional": false,
            "description": "<p>用户Id</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Request-Example:",
        "content": "{\n\"owner\":\"58d878838b81190732fdd202\",\n\"productions\": [{\n\t\"production\":\"58d8d1ae56e9cb0ee6235303\",\n\t\"count\":1\n}],\n\"name\": \"首单人\"\n}\n",
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
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.order_code",
            "optional": false,
            "description": "<p>订单编号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.paymentDec",
            "optional": false,
            "description": "<p>订单价格</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.payment",
            "optional": false,
            "description": "<p>订单价格 * 100</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.owner",
            "optional": false,
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.productions",
            "optional": false,
            "description": "<p>订单中的商品</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.productions.production",
            "optional": false,
            "description": "<p>商品ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.productions.count",
            "optional": false,
            "description": "<p>商品数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": {\n       \"order_code\": \"149102235610110860\",\n       \"paymentDec\": 1020.11,\n       \"payment\": 102011,\n       \"owner\": {\n           \"username\": \"15811020373\",\n           \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n           \"design\": {\n               \"title\": \"一个好的创意\",\n               \"img\": \"\",\n               \"content\": \"就是个好的创意，就这么不讲理\"\n           },\n           \"gender\": 1,\n           \"nickname\": \"yusi\",\n           \"updatedAt\": \"2017-04-01 12:52:36\",\n           \"createdAt\": \"2017-04-01 12:52:36\",\n           \"userId\": \"58d878838b81190732fdd202\"\n       },\n       \"updatedAt\": \"2017-04-01 12:52:36\",\n       \"createdAt\": \"2017-04-01 12:52:36\",\n       \"productions\": [\n           {\n               \"production\": {\n                   \"price\": 1020.11,\n                   \"amount\": 50,\n                   \"cover\": \"http://192.168.2.29:3000/test1_cover.png\",\n                   \"title\": \"精品卫衣\",\n                   \"description\": \"test production description\",\n                   \"designers\": [\n                       {\n                           \"username\": \"15811020373\",\n                           \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n                           \"design\": {\n                               \"title\": \"一个好的创意\",\n                               \"img\": \"\",\n                               \"content\": \"就是个好的创意，就这么不讲理\"\n                           },\n                           \"gender\": 1,\n                           \"nickname\": \"yusi\",\n                           \"updatedAt\": \"2017-04-01 12:52:36\",\n                           \"createdAt\": \"2017-04-01 12:52:36\",\n                           \"userId\": \"58d878838b81190732fdd202\"\n                       }\n                   ],\n                   \"showImages\": [\n                       \"http://192.168.2.29:3000/test1_show1.png\",\n                       \"http://192.168.2.29:3000/test1_show2.png\",\n                       \"http://192.168.2.29:3000/test1_show3.png\"\n                   ],\n                   \"status\": 1,\n                   \"updatedAt\": \"2017-04-01 12:52:36\",\n                   \"createdAt\": \"2017-04-01 12:52:36\",\n                   \"productionId\": \"58d8d1ae56e9cb0ee6235303\"\n               },\n               \"count\": 1,\n               \"_id\": \"58df321411b1b510f5132eae\"\n           }\n       ],\n       \"status\": 0,\n       \"orderId\": \"58df321411b1b510f5132ead\"\n   }\n}\n",
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
    "filename": "routes/apidoc/order.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/orders",
    "title": "获取订单详情",
    "name": "getOrder",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "orderId",
            "optional": false,
            "description": "<p>订单Id</p>"
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
            "field": "data.order_code",
            "optional": false,
            "description": "<p>订单编号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.paymentDec",
            "optional": false,
            "description": "<p>订单价格</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.payment",
            "optional": false,
            "description": "<p>订单价格 * 100</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.owner",
            "optional": false,
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.productions",
            "optional": false,
            "description": "<p>订单中的商品</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.productions.production",
            "optional": false,
            "description": "<p>商品ID</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.productions.count",
            "optional": false,
            "description": "<p>商品数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": {\n       \"order_code\": \"14910219386387376\",\n       \"paymentDec\": 1020.11,\n       \"payment\": 102011,\n       \"owner\": {\n           \"username\": \"15811020373\",\n           \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n           \"design\": {\n               \"title\": \"一个好的创意\",\n               \"img\": \"\",\n               \"content\": \"就是个好的创意，就这么不讲理\"\n           },\n           \"gender\": 1,\n           \"nickname\": \"yusi\",\n           \"updatedAt\": \"2017-04-01 13:08:04\",\n           \"createdAt\": \"2017-04-01 13:08:04\",\n           \"userId\": \"58d878838b81190732fdd202\"\n       },\n       \"updatedAt\": \"2017-04-01 12:45:38\",\n       \"createdAt\": \"2017-04-01 12:45:38\",\n       \"productions\": [\n           {\n               \"production\": {\n                   \"price\": 1020.11,\n                   \"amount\": 50,\n                   \"cover\": \"http://192.168.2.29:3000/test1_cover.png\",\n                   \"title\": \"精品卫衣\",\n                   \"description\": \"test production description\",\n                   \"designers\": [\n                       {\n                           \"username\": \"15811020373\",\n                           \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n                           \"design\": {\n                               \"title\": \"一个好的创意\",\n                               \"img\": \"\",\n                               \"content\": \"就是个好的创意，就这么不讲理\"\n                           },\n                           \"gender\": 1,\n                           \"nickname\": \"yusi\",\n                           \"updatedAt\": \"2017-04-01 13:08:04\",\n                           \"createdAt\": \"2017-04-01 13:08:04\",\n                           \"userId\": \"58d878838b81190732fdd202\"\n                       }\n                   ],\n                   \"showImages\": [\n                       \"http://192.168.2.29:3000/test1_show1.png\",\n                       \"http://192.168.2.29:3000/test1_show2.png\",\n                       \"http://192.168.2.29:3000/test1_show3.png\"\n                   ],\n                   \"status\": 1,\n                   \"updatedAt\": \"2017-04-01 13:08:04\",\n                   \"createdAt\": \"2017-04-01 13:08:04\",\n                   \"productionId\": \"58d8d1ae56e9cb0ee6235303\"\n               },\n               \"count\": 1,\n               \"_id\": \"58df3072e910851057162399\"\n           }\n       ],\n       \"status\": 6,\n       \"orderId\": \"58df3072e910851057162398\"\n   }\n}\n",
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
    "filename": "routes/apidoc/order.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/orders",
    "title": "获取订单列表",
    "name": "getOrderList",
    "group": "Order",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "userId",
            "optional": false,
            "description": "<p>用户Id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "page",
            "optional": false,
            "description": "<p>页码 默认为 1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "field": "limit",
            "optional": false,
            "description": "<p>步长 默认为 20</p>"
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
            "field": "data.orders",
            "optional": false,
            "description": "<p>订单列表</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.count",
            "optional": false,
            "description": "<p>订单数量</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 201 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": {\n       \"orders\": [\n           {\n               \"order_code\": \"14910219386387376\",\n               \"paymentDec\": 1020.11,\n               \"payment\": 102011,\n               \"owner\": \"58d878838b81190732fdd202\",\n               \"updatedAt\": \"2017-04-01 12:45:38\",\n               \"createdAt\": \"2017-04-01 12:45:38\",\n               \"productions\": [\n                   {\n                       \"production\": \"58d8d1ae56e9cb0ee6235303\",\n                       \"count\": 1,\n                       \"_id\": \"58df3072e910851057162399\"\n                   }\n               ],\n               \"status\": 6,\n               \"orderId\": \"58df3072e910851057162398\"\n           }\n       ],\n       \"count\": 1\n   }\n}\n",
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
    "filename": "routes/apidoc/order.js"
  },
  {
    "version": "1.0.0",
    "type": "get",
    "url": "/productions/:productionId",
    "title": "获取商品信息",
    "name": "GetProductionInfo",
    "group": "Production",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "field": "productionId",
            "optional": false,
            "description": "<p>商品Id</p>"
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
            "field": "data.price",
            "optional": false,
            "description": "<p>商品名</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.amount",
            "optional": false,
            "description": "<p>昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.title",
            "optional": false,
            "description": "<p>商品标题</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.designers",
            "optional": false,
            "description": "<p>商品投稿人</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.designers.nickname",
            "optional": false,
            "description": "<p>投稿人昵称</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.designers.avatar",
            "optional": false,
            "description": "<p>投稿人头像</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "field": "data.designers.design",
            "optional": false,
            "description": "<p>投稿人设计文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "field": "data.showImages",
            "optional": false,
            "description": "<p>商品图列</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "field": "data.status",
            "optional": false,
            "description": "<p>{ 0 未发布，1 已发布 5 被删除 } 商品性别.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n   \"status\": 1,\n   \"data\": {\n       \"price\": 100,\n       \"amount\": 50,\n       \"cover\": \"http://192.168.2.29:3000/test1_cover.png\",\n       \"title\": \"签名限量版卫衣超级限量版天霸动霸\",\n       \"designers\": [{\n           \"username\": \"15911020373\",\n           \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n           \"design\": {\n               \"title\": \"一个好的创意\",\n               \"img\": \"http://192.168.2.29:3000/test1_img.png\",\n               \"content\": \"我总是发誓平安夜不睡觉，我想听屋顶上驯鹿奔跑的舞步，想在烟囱那儿与圣诞老人握手。 而这个圣诞节在我看来，似乎没有比什么比保持清醒更容易做到的事情了。\"\n           },\n           \"gender\": 1,\n           \"nickname\": \"yusi\",\n           \"updatedAt\": \"2017-03-28 15:08:18\",\n           \"createdAt\": \"2017-03-28 15:08:18\",\n           \"userId\": \"58d878838b81190732fdd202\"\n       }],\n       \"description\": \"test production description\",\n       \"updatedAt\": \"2017-03-27 16:47:42\",\n       \"createdAt\": \"2017-03-27 16:47:42\",\n       \"showImages\": [\n           \"http://192.168.2.29:3000/test1_show1.png\",\n           \"http://192.168.2.29:3000/test1_show2.png\",\n           \"http://192.168.2.29:3000/test1_show3.png\"\n       ],\n       \"production_code\": 1,\n       \"status\": 1,\n       \"productionId\": \"58d8d1ae56e9cb0ee6235303\"\n   }\n}\n",
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
    "filename": "routes/apidoc/production.js"
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
            "type": "Object",
            "field": "data.design",
            "optional": false,
            "description": "<p>用户设计思路文稿</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.title",
            "optional": false,
            "description": "<p>用户设计标题</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.content",
            "optional": false,
            "description": "<p>用户设计内容</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.img",
            "optional": false,
            "description": "<p>用户设计图</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.weibo",
            "optional": false,
            "description": "<p>微博</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.description",
            "optional": false,
            "description": "<p>自我评价</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.qq",
            "optional": false,
            "description": "<p>qq号</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "field": "data.design.work",
            "optional": false,
            "description": "<p>作品链接</p>"
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
          "content": "Success-Response:\n   HTTP/1.1 200 OK\n{\n   \"msg\": \"success\",\n     \"status\": 1,\n     \"data\": {\n       \"salt\": \"J14RTuneqmJMBD8/d/Jm3gTA6sjbaXNyI1HJIfiEuyo=\",\n       \"username\": \"15911020373\",\n       \"avatar\": \"http://192.168.2.29:3000/test1_avatar.jpg\",\n       \"updatedAt\": \"2017-03-27 10:27:15\",\n       \"createdAt\": \"2017-03-27 10:27:15\",\n       \"design\": {\n         \"title\": \"一个好的创意\",\n         \"img\": \"http://192.168.2.29:3000/test1_img.png\",\n         \"content\": \"我总是发誓平安夜不睡觉，我想听屋顶上驯鹿奔跑的舞步，想在烟囱那儿与圣诞老人握手。 而这个圣诞节在我看来，似乎没有比什么比保持清醒更容易做到的事情了。\"\n       },\n       \"role\": \"0\",\n       \"gender\": 1,\n       \"nickname\": \"yusi\",\n       \"userId\": \"58d878838b81190732fdd202\"\n     }\n}\n",
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
        "content": "{\n\"userId\":\"58d878838b81190732fdd202\",\n\"nickname\": \"昵称\",\n\"avatar\": \"avatar.jpg\",\n\"design\":{\n\t\"title\":\"北京\",\n\t\"content\":\"北京市\",\n\t\"img\":\"\"\n}\n}\n",
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
  }
] });