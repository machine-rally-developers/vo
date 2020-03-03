"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express")); //package for running server. Used in tis file to create routes
var boom_1 = __importDefault(require("boom")); //for creating error response
var vo_client_controller_1 = require("../controllers/vo-client/vo.client.controller");
var voClientRouter = express_1["default"].Router();
voClientRouter
    .route("/question")
    .post(function (req, res) {
    if (!req.body.question) {
        var error = new Error("Please enter a question");
        var boomifyError = boom_1["default"].boomify(error, { statusCode: 400 }).output;
        res.status(boomifyError.statusCode).json(boomifyError);
        return;
    }
    vo_client_controller_1.askQuestion(req.body)
        .then(function (result) {
        res.json(result);
    })["catch"](function (error) {
        res.status(error.statusCode).json(error);
    });
});
exports["default"] = voClientRouter;
//# sourceMappingURL=voclient.route.js.map