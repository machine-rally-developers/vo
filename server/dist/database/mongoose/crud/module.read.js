"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var module_schema_1 = __importDefault(require("../schema/module.schema"));
var boom_1 = __importDefault(require("boom"));
function ListModule(data) {
    return new Promise(function (resolve, reject) {
        module_schema_1["default"].find(data, function (err, res) {
            if (err) {
                var error = new Error(err.message);
                reject(boom_1["default"].boomify(error, { statusCode: 400 }).output);
            }
            else {
                resolve(res);
            }
        });
    });
}
exports["default"] = ListModule;
//# sourceMappingURL=module.read.js.map