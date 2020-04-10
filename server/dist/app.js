"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var express_graphql_1 = __importDefault(require("express-graphql"));
var root_schema_1 = __importDefault(require("./database/graphql/root.schema"));
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
    //initialize graphql root
    app.use("/graphql", express_graphql_1["default"](function (request, response, graphQLParams) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ({
                    schema: root_schema_1["default"],
                    graphiql: process.env.APP_ENV === "development" ? true : false
                    //context: authentication(request, response, graphQLParams)
                })];
        });
    }); }));
    app.listen(port, function () {
        return console.log("Listening at port " + port + " at " + new Date());
    });
})["catch"](function (error) {
    console.log("Error starting app. Make sure environment variables is configured\n      Required variables{\n        PORT\n        DATABASE\n        DATABASE_ADDRESS\n        DATABASE_PORT\n        DATABASE_USER\n        DATABASE_PASSWORD\n      }\n      App error message{\n        " + error + "\n      }");
});
//# sourceMappingURL=app.js.map