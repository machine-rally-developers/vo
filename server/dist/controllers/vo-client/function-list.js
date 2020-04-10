"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var module_schema_1 = __importDefault(require("../../database/mongoose/schema/module.schema"));
var path_1 = __importDefault(require("path"));
//returns string path
var getModuleDirectory = function (id, cb) {
    module_schema_1["default"].findById(id, function (err, doc) {
        if (err) {
            return {};
        }
        else {
            var modulePath = path_1["default"].join(__dirname, "..", "..", "modules", doc.packageName);
            cb(modulePath);
        }
    });
};
exports.getModuleDirectory = getModuleDirectory;
//returns array
var getModuleVariables = function (id, cb) {
    module_schema_1["default"].findById(id, function (err, doc) {
        if (err) {
            return {};
        }
        else {
            cb(doc.variables);
        }
    });
};
exports.getModuleVariables = getModuleVariables;
//# sourceMappingURL=function-list.js.map