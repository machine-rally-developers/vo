"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var express_1 = __importDefault(require("express"));
var module_route_1 = __importDefault(require("./routes/module.route"));
var voclient_route_1 = __importDefault(require("./routes/voclient.route"));
var body_parser_1 = __importDefault(require("body-parser"));
var connection_1 = __importDefault(require("./database/connection/connection"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
//start environmental variables
connection_1["default"]()
    .then(function () {
    console.log("Connected to database " + new Date());
    //check if module and temp folder exists
    var moduleFolderPath = path_1["default"].join(__dirname, "modules");
    var tempFolderPath = path_1["default"].join(__dirname, "temp");
    if (!fs_1["default"].existsSync(moduleFolderPath)) {
        fs_1["default"].mkdir(moduleFolderPath, function (err) {
            if (err)
                console.error("Could not make a module folder. Please do this manually");
        });
    }
    if (!fs_1["default"].existsSync(tempFolderPath)) {
        fs_1["default"].mkdir(tempFolderPath, function (err) {
            if (err)
                console.error("Could not make a temp folder. Please do this manually");
        });
    }
    var app = express_1["default"]();
    var port = process.env.APP_PORT;
    //add bodyparser to parse json content
    app.use(body_parser_1["default"].json());
    //add routes middleware
    app.use("/", [module_route_1["default"], voclient_route_1["default"]]);
    app.listen(port, function () {
        return console.log("Listening at port " + port + " at " + new Date());
    });
})["catch"](function (error) {
    console.log("Error starting app. Make sure environment variables is configured\n      Required variables{\n        PORT\n        DATABASE\n        DATABASE_ADDRESS\n        DATABASE_PORT\n        DATABASE_USER\n        DATABASE_PASSWORD\n      }\n      App error message{\n        " + error + "\n      }");
});
//# sourceMappingURL=app.js.map