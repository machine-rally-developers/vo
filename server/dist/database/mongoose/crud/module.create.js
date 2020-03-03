"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var module_schema_1 = __importDefault(require("../schema/module.schema"));
var boom_1 = __importDefault(require("boom"));
function createModule(moduleData) {
    var saveModule = new module_schema_1["default"](moduleData);
    return new Promise(function (resolve, reject) {
        saveModule
            .save()
            .then(function (result) {
            resolve({ message: "Successfully created database entry for module" });
        })["catch"](function (error) {
            var err = new Error(error.message);
            reject(boom_1["default"].boomify(err, { statusCode: 400 }).output);
        });
    });
}
exports["default"] = createModule;
//# sourceMappingURL=module.create.js.map