"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));
var databaseAddress = process.env.DATABASE_ADDRESS;
var database = process.env.DATABASE;
var databasePort = process.env.DATABASE_PORT;
exports["default"] = (function () {
    return mongoose_1["default"].connect("mongodb://" + databaseAddress + ":" + databasePort, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: database
    });
});
//# sourceMappingURL=connection.js.map