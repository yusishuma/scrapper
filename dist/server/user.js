/**
 * Created by matonghe on 15/03/2017.
 */
"use strict";

var User = require("../models").User;
exports.login = function (req, res) {
    var reqBody = req.body;
    User.find().then(function (user) {
        return res.json(user);
    });
};
//# sourceMappingURL=user.js.map