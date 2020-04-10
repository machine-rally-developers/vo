"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var module_schema_1 = __importDefault(require("../schema/module.schema"));
function DeleteModule(variableId, moduleId) {
    return new Promise(function (resolve, reject) {
        module_schema_1["default"].findByIdAndUpdate(moduleId, {
            $pull: {
                variables: {
                    _id: variableId
                }
            }
        }, function (err, doc) {
            if (err) {
                reject(err.message);
            }
            else {
                resolve(doc);
            }
        });
    });
}
exports["default"] = DeleteModule;
//# sourceMappingURL=variable.delete.js.map